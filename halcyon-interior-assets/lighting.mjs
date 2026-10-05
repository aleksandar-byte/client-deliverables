import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

// Geometry and movement stay in the plan viewer. This module owns presentation lighting.
export function createInteriorLighting(scene,renderer,config){
 const originalLights=scene.children.filter(o=>o.isLight),group=new THREE.Group();scene.add(group);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.04);room.dispose?.();pmrem.dispose();
 const originalEnvironment=scene.environment,originalExposure=renderer.toneMappingExposure;
 const hemi=new THREE.HemisphereLight(0xeaf1ff,0xb29b7b,.48);group.add(hemi);
 const sun=new THREE.DirectionalLight(0xffead4,3.0);sun.position.set(3.8,7,-18);sun.target.position.set(7,0,-4.5);group.add(sun,sun.target);
 sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-11,right:11,top:10,bottom:-10,near:.5,far:45});sun.shadow.bias=-.00012;sun.shadow.normalBias=.025;
 const fill=new THREE.HemisphereLight(0xfff0db,0xb7a88e,.25);group.add(fill);
 // Gentle local pendant fill, with fixed emitter positions above the accepted table/island.
 for(const p of config.pendants||[]){const light=new THREE.PointLight(0xffdbac,4.5,3,2);light.position.set(p[0],p[2],-p[1]);group.add(light);}
 renderer.shadowMap.enabled=true;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 let enabled=true,floorMaterials=[],ao=null;
 if(config.ao)ao=new THREE.TextureLoader().load(config.ao);if(ao){ao.flipY=true;ao.channel=1;ao.colorSpace=THREE.NoColorSpace;}
 function setEnabled(value){
  enabled=value;group.visible=value;originalLights.forEach(l=>l.visible=!value);scene.environment=value?environment.texture:originalEnvironment;scene.environmentIntensity=value?.25:1;renderer.toneMappingExposure=value?.87:originalExposure;renderer.shadowMap.enabled=value;renderer.shadowMap.needsUpdate=true;
  floorMaterials.forEach(m=>{m.aoMapIntensity=value?1:0;});
 }
 function connect(root){
  root.updateMatrixWorld(true);root.traverse(ob=>{
   if(!ob.isMesh)return;
   let kind=ob.userData.kind;for(let p=ob.parent;p&&!kind;p=p.parent)kind=p.userData.kind;
   const mats=Array.isArray(ob.material)?ob.material:[ob.material];
   ob.castShadow=kind!=='window' && !ob.name.startsWith('Style_');ob.receiveShadow=true;
   mats.forEach(m=>{m.clipShadows=true;m.envMapIntensity=.35;});
   if(ob.name===config.floorMesh||ob.userData.assetId===config.floorMesh){
    const geometry=ob.geometry.clone();ob.geometry=geometry;const pos=geometry.attributes.position,uv=new Float32Array(pos.count*2),point=new THREE.Vector3();const b=config.bounds;
    for(let i=0;i<pos.count;i++){point.fromBufferAttribute(pos,i).applyMatrix4(ob.matrixWorld);uv[2*i]=(point.x-b[0])/(b[2]-b[0]);uv[2*i+1]=(-point.z-b[1])/(b[3]-b[1]);}
    geometry.setAttribute('uv1',new THREE.BufferAttribute(uv,2));
    ob.material=ob.material.clone();ob.material.aoMap=ao;ob.material.aoMapIntensity=1;floorMaterials.push(ob.material);
   }
  });setEnabled(enabled);
 }
 setEnabled(true);
 return {connect,setEnabled,refresh:()=>{renderer.shadowMap.needsUpdate=true;}};
}
