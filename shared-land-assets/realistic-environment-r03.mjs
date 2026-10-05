import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {Sky} from 'three/addons/objects/Sky.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
const base=new URL('./realistic-r03/',import.meta.url);
export async function enhanceEnvironment({scene,renderer,sun,root,contextRoots,exteriorRoot,updateContext}){
 const config=await fetch(new URL('environment.json',base)).then(r=>{if(!r.ok)throw Error('Environment settings unavailable');return r.json();});
 const tl=new THREE.TextureLoader(),loader=new GLTFLoader(),materials={};
 const draco=new DRACOLoader();draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.167.1/examples/jsm/libs/draco/gltf/');draco.setWorkerLimit(1);loader.setDRACOLoader(draco);
 await Promise.all(Object.entries(config.textures).map(async([id,spec])=>{
  const maps=await Promise.all(['Diffuse','nor_gl','Rough'].map(async channel=>{const t=await tl.loadAsync(new URL(spec.maps[channel],base).href);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(1/spec.repeat_metres,1/spec.repeat_metres);t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());if(channel==='Diffuse')t.colorSpace=THREE.SRGBColorSpace;return t;}));
  materials[id]=new THREE.MeshStandardMaterial({map:maps[0],normalMap:maps[1],roughnessMap:maps[2],roughness:1,metalness:0,normalScale:new THREE.Vector2(id==='white_plaster_02'?.16:.55,id==='white_plaster_02'?.16:.55),side:THREE.DoubleSide});
 }));
 // Clean plaster keeps the existing light palette; microtexture supplies the detail.
 materials.white_plaster_02.map=null;materials.white_plaster_02.color.setHex(0xd9d4c8);
 materials.withered_grass.onBeforeCompile=shader=>{
  shader.uniforms.greenGround={value:materials.sparse_grass.map};
  shader.fragmentShader='uniform sampler2D greenGround;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#ifdef USE_MAP
   vec4 dryGround=texture2D(map,vMapUv);
   vec4 greenPatch=texture2D(greenGround,vMapUv);
   float meadowMix=.5+.25*sin(vMapUv.x*.51+sin(vMapUv.y*.43))+.25*sin(vMapUv.y*.29);
   diffuseColor *= mix(dryGround,greenPatch,smoothstep(.28,.8,meadowMix)*.48);
   #endif`);
 };
 materials.withered_grass.customProgramCacheKey=()=> 'mixed-meadow-r03';
 function metricUV(o){
  o.updateWorldMatrix(true,false);o.geometry=o.geometry.clone();const p=o.geometry.attributes.position,n=o.geometry.attributes.normal,uv=new Float32Array(p.count*2),v=new THREE.Vector3(),nn=new THREE.Vector3(),normal=new THREE.Matrix3().getNormalMatrix(o.matrixWorld);
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);nn.fromBufferAttribute(n,i).applyMatrix3(normal);const ax=Math.abs(nn.x),ay=Math.abs(nn.y),az=Math.abs(nn.z);uv[i*2]=ay>=ax&&ay>=az?v.x:ax>az?v.z:v.x;uv[i*2+1]=ay>=ax&&ay>=az?-v.z:v.y;}
  o.geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));
 }
 const oldPlanting=[];
 for(const group of contextRoots)group.traverse(o=>{
  if(!o.isMesh)return;
  const role=o.userData.contextRole;
  if(role==='planting'){oldPlanting.push(o);return;}
  const name=o.material?.name||'';let key;
  if(role==='ground')key='withered_grass';
  else if(/^wall\d/.test(name))key='white_plaster_02';
  else if(/^tile\d/.test(name))key='clay_roof_tiles';
  else if(name==='road')key='asphalt_02';
  else if(name==='verge'||name==='path')key='gravel_road';
  if(key){metricUV(o);o.material=materials[key];o.receiveShadow=true;}
 });
 // Remove the obsolete stylized vegetation from this loaded instance only.
 root.traverse(o=>{
  if(!o.isMesh)return;const role=o.userData.siteRole;
  const key=role==='land'?'withered_grass':role==='road'?'asphalt_02':['parking','path'].includes(role)?'gravel_road':null;
  if(key){metricUV(o);o.material=materials[key];o.receiveShadow=true;}
 });
 if(exteriorRoot)exteriorRoot.traverse(o=>{
  if(!o.isMesh||!o.material)return;
  const name=o.material.name.toLowerCase();
  if(name.includes('wall')||name.includes('render')||name.includes('plaster')){metricUV(o);o.material=materials.white_plaster_02;}
  // Retain the approved metal roof finish, adding restrained roughness instead of a tile substitution.
  if(name.includes('metal')){o.material=o.material.clone();o.material.roughness=.67;o.material.metalness=.18;}
 });
 const [tree,shrub]=await Promise.all(['tree_small_02','shrub_01'].map(id=>loader.loadAsync(new URL(id+'.glb',base).href)));
 draco.dispose();
 for(const o of oldPlanting)o.removeFromParent();
 const vegetation=new THREE.Group();vegetation.name='Imported realistic vegetation';scene.add(vegetation);contextRoots.push(vegetation);
 let totalTriangles=0,drawMeshes=0;
 function plant(gltf,positions){
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(src=>{
   if(!src.isMesh)return;
   const geo=src.geometry.clone().applyMatrix4(src.matrixWorld),mat=src.material.clone();
   mat.metalness=0;mat.roughness=.91;mat.side=THREE.DoubleSide;mat.transparent=false;mat.depthWrite=true;mat.alphaTest=mat.name.includes('leaves')||mat.name.includes('shrub')?.4:0;mat.needsUpdate=true;
   // Near plants cast shadows; distant vegetation is drawn once without another shadow pass.
   for(const near of [true,false]){
    const list=positions.filter(p=>(Math.abs(p.x)<22&&Math.abs(p.y)<45)===near);if(!list.length)continue;
    const inst=new THREE.InstancedMesh(geo,mat,list.length);inst.name='foliage_'+src.name;inst.userData.contextRole='planting';inst.castShadow=near;inst.receiveShadow=true;
    if(mat.alphaTest)inst.customDepthMaterial=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,map:mat.map,alphaTest:mat.alphaTest,side:THREE.DoubleSide});
    const dummy=new THREE.Object3D();list.forEach((p,i)=>{dummy.position.set(p.x,config.ground_z,-p.y);dummy.rotation.set(0,p.rotation,0);dummy.scale.setScalar(p.height);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);});inst.instanceMatrix.needsUpdate=true;inst.computeBoundingSphere();vegetation.add(inst);drawMeshes++;totalTriangles+=(geo.index?geo.index.count:geo.attributes.position.count)/3*list.length;
   }
  });
 }
 plant(tree,config.tree_positions);plant(shrub,config.shrub_positions);
 // Presentation daylight: fixed direction, no claim of local sun/date alignment.
 const sky=new Sky();sky.scale.setScalar(450);sky.material.depthWrite=false;scene.add(sky);
 const u=sky.material.uniforms;u.turbidity.value=3;u.rayleigh.value=1.6;u.mieCoefficient.value=.004;u.mieDirectionalG.value=.8;
 const sunDirection=new THREE.Vector3(25,42,28).normalize();u.sunPosition.value.copy(sunDirection);sun.position.copy(sunDirection).multiplyScalar(85);sun.intensity=2.5;sun.color.setHex(0xfff1d8);
 scene.children.filter(o=>o.isHemisphereLight).forEach(o=>{o.intensity=1.15;o.color.setHex(0xe4efff);o.groundColor.setHex(0x7e785d);});
 const pmrem=new THREE.PMREMGenerator(renderer);const skyScene=new THREE.Scene();skyScene.add(sky.clone());scene.environment=pmrem.fromScene(skyScene,.04,.1,1000).texture;scene.environmentIntensity=.32;pmrem.dispose();
 scene.background=null;scene.fog=new THREE.Fog(0xc4d3d8,130,420);renderer.toneMappingExposure=.91;
 sun.shadow.camera.left=-58;sun.shadow.camera.right=58;sun.shadow.camera.top=58;sun.shadow.camera.bottom=-58;sun.shadow.camera.far=230;sun.shadow.normalBias=.03;sun.shadow.bias=-.00015;sun.shadow.camera.updateProjectionMatrix();
 updateContext();
 return {revision:'realistic-r03',trees:config.tree_positions.length,shrubs:config.shrub_positions.length,vegetationDrawMeshes:drawMeshes,vegetationTriangles:totalTriangles,source:'Poly Haven CC0; optimized derivatives',fixedPresentationLighting:true};
}

