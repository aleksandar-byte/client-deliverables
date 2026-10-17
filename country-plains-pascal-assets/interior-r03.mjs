import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {styleInterior as baseStyle} from './interior-r02.mjs';

// Assets are reusable; these placements belong only to Country Plains Pascal v82.
// Building geometry, source furniture envelopes and walking controller are retained.
export async function styleInterior(house,scene){
 const base=baseStyle(house,scene), group=new THREE.Group();group.name='Interior R03 imported assets';scene.add(group);
 const root=new URL('./quality-r03/',import.meta.url),loader=new GLTFLoader(),tl=new THREE.TextureLoader();
 const ids=['glam_velvet_sofa','modern_coffee_table_01','modern_ceiling_lamp_01','ceramic_vase_04','potted_plant_01'];
 const sources=Object.fromEntries(await Promise.all(ids.map(async id=>[id,(await loader.loadAsync(new URL(id+'.glb',root).href)).scene])));
 const textures=Object.fromEntries(await Promise.all(['oak','oak_normal','oak_rough','linen','linen_normal','linen_rough'].map(async id=>{
  const t=await tl.loadAsync(new URL(id+'.jpg',root).href);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;if(id==='oak'||id==='linen')t.colorSpace=THREE.SRGBColorSpace;return [id,t];
 })));
 const hidden=[],changes=[],fits=[],pendants=[];
 const labels=n=>{const a=[];for(let p=n;p;p=p.parent)a.push(p.userData.label||p.name||'');return a.join(' ');};
 function hide(n){hidden.push({node:n,visible:n.visible});n.visible=false;}
 house.traverse(n=>{if(n.isMesh&&(/\bCP_sofa\b|\bCP_coffee_table\b|ID_pendant_[012]_/.test(labels(n))))hide(n);});
 for(const n of base.group.children){
  if(/^(Olive linen cushion|Clay linen cushion|Dining terracotta vase|Mantel vase|Kitchen ceramic herbs)/.test(n.name))hide(n);
  if(n.name.startsWith('Coffee table books'))n.position.y-=.077;
 }
 function place(id,name,position,{rotation=0,maxSize,scale=1}={}){
  const content=sources[id].clone(true),outer=new THREE.Group();outer.name=name;outer.add(content);content.rotation.y=rotation;content.updateMatrixWorld(true);
  let b=new THREE.Box3().setFromObject(content),size=b.getSize(new THREE.Vector3());
  if(maxSize)scale=Math.min(...maxSize.map((v,i)=>v/size.getComponent(i)));
  content.scale.multiplyScalar(scale);content.updateMatrixWorld(true);b.setFromObject(content);
  content.position.sub(new THREE.Vector3((b.min.x+b.max.x)/2,b.min.y,(b.min.z+b.max.z)/2));outer.position.set(...position);
  outer.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;n.material=Array.isArray(n.material)?n.material.map(m=>m.clone()):n.material.clone();}});
  group.add(outer);outer.updateMatrixWorld(true);b.setFromObject(outer);
  fits.push({name,asset:id,uniformScale:scale,position,rotation,bounds:{min:b.min.toArray(),max:b.max.toArray()}});
  return outer;
 }
 const sofa=place('glam_velvet_sofa','Imported velvet sofa',[1.5919,0,2.755466],{rotation:-Math.PI/2,maxSize:[.915,.99,2.49]});
 sofa.traverse(n=>{if(n.isMesh&&/fabric/i.test(n.material.name)){n.material.color.set('#b7aa94');n.material.roughness=.87;if(n.material.isMeshPhysicalMaterial){n.material.sheen=.55;n.material.sheenColor.set('#e9deca');n.material.sheenRoughness=.8;n.material.specularIntensity=.25;}}});
 place('modern_coffee_table_01','Imported stone and oak coffee table',[.0119,.003,2.755466],{maxSize:[.599,.466,1.199]});
 for(const [i,p] of [[0,[-.0281,2.12,-.944534]],[1,[-.6081,2.12,-3.251184]],[2,[.5919,2.12,-3.251184]]]){
  const pendant=place('modern_ceiling_lamp_01','Glass pendant '+i,p,{scale:i===0?.95:.64});pendants.push(pendant);
  pendant.traverse(n=>{if(n.isMesh&&/glass|globe/.test(n.material.name)){n.material.color.set('#f3e5cd');n.material.emissive.set('#ffe2b3');n.material.emissiveIntensity=.14;n.material.roughness=.35;n.castShadow=false;}});
 }
 place('ceramic_vase_04','Imported dining ceramic jug',[.42,.779,-.98],{scale:.82});
 place('ceramic_vase_04','Imported mantel ceramic jug',[-2.5,1.15,3.45],{scale:.72});
 place('potted_plant_01','Kitchen living herb',[-2.53,.916,-2.8],{scale:.245});
 // Real textile maps for the living rug and entry curtains. Kitchen keeps its
 // cabinet layout; oak finishes apply only to the island and tall cabinet faces.
 function finish(n,material,geometry=n.geometry){let isHouse=false;for(let p=n;p;p=p.parent)if(p===house)isHouse=true;changes.push({node:n,isHouse,before:n.material,after:material,geometry:n.geometry,afterGeometry:geometry});n.material=material;n.geometry=geometry;}
 function maps(material,kind,repeat){for(const [field,suffix] of [['map',''],['normalMap','_normal'],['roughnessMap','_rough']]){const t=textures[kind+suffix].clone();t.repeat.set(...repeat);material[field]=t;}material.normalScale=new THREE.Vector2(.16,kind==='oak'?-.16:.16);material.needsUpdate=true;return material;}
 function worldUV(n){const g=n.geometry.clone(),p=g.getAttribute('position'),normal=g.getAttribute('normal'),uv=new Float32Array(p.count*2),v=new THREE.Vector3(),dir=new THREE.Vector3(),nm=new THREE.Matrix3().getNormalMatrix(n.matrixWorld);
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(n.matrixWorld);dir.fromBufferAttribute(normal,i).applyMatrix3(nm);if(Math.abs(dir.y)>.7){uv[i*2]=v.x;uv[i*2+1]=v.z;}else{uv[i*2]=Math.abs(dir.x)>.7?v.z:v.x;uv[i*2+1]=v.y;}}g.setAttribute('uv',new THREE.BufferAttribute(uv,2));return g;
 }
 house.updateMatrixWorld(true);
 house.traverse(n=>{
  if(!n.isMesh||Array.isArray(n.material))return;const text=labels(n),m=n.material;
  if(/Entry curtain/.test(text)&&m.name==='Interior_fabric'){
   const c=maps(m.clone(),'linen',[5,7]);c.color.set('#eee5d3');c.roughness=.95;finish(n,c);
  }else if(/\bCP_island\b/.test(text)&&/Interior_wood|Interior_sage|Style_ivory/.test(m.name)){
   const c=maps(m.clone(),'oak',[1.6,.65]);c.color.set('#d3c0a3');c.roughness=.65;finish(n,c,worldUV(n));
  }else if(/CP_west_base|CP_sink/.test(text)&&m.name==='Interior_sage'){
   const c=m.clone();c.color.set('#69745c');c.roughness=.73;finish(n,c);
  }else if(/CP_island|CP_west_base|CP_sink/.test(text)&&m.name==='Interior_quartz'){
   const c=m.clone();c.color.set('#d5cbbb');c.roughness=.52;finish(n,c);
  }
 });
 for(const n of base.group.children){
  if(n.name==='Living woven rug'){const c=maps(n.material.clone(),'linen',[8,9]);c.color.set('#c7ba9d');c.roughness=1;finish(n,c);}
  if(n.name==='Oak kitchen shelf'||n.name==='Oak mantel'){const c=maps(n.material.clone(),'oak',[1,1]);c.color.set('#d6c2a0');finish(n,c);}
 }
 let enabled=true,currentMode='walk';
 function enable(value){enabled=value;base.enable(value);group.visible=value;hidden.forEach(h=>h.node.visible=value?false:h.visible);changes.forEach(c=>{if(value)c.node.material=c.after;else if(!c.isHouse)c.node.material=c.before;c.node.geometry=value?c.afterGeometry:c.geometry;});document.body.dataset.interior=value?'r03':'original';}
 function mode(value){currentMode=value;base.mode(value);pendants.forEach(p=>p.visible=value!=='plan');}
 const snapshot={revision:'interior-r03',fits,source:'Pascal v82 GLB unchanged',navigation:'Original conservative envelopes retained; replacements fit within them',licenses:'Poly Haven CC0; sofa CC-BY-4.0 Eric Chadwick / Wayfair, LLC',native:'Saved native Pascal and Unreal maps unchanged'};
 enable(true);return {group,enable,mode,mood:base.mood,snapshot};
}
