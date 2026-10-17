import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {styleInterior as previousStyle} from './interior-r03.mjs';
import {createOfficeStudy} from './office-r05.mjs';

export async function styleInterior(house,scene){
 const previous=await previousStyle(house,scene),root=new URL('./kids-r04/',import.meta.url),loader=new GLTFLoader();
 const config=await fetch(new URL('./layout-r05.json',import.meta.url)).then(r=>{if(!r.ok)throw Error('Kids layout missing');return r.json();});
 const assets=Object.fromEntries(await Promise.all(['bed-120','desk','chair','wardrobe'].map(async id=>[id,(await loader.loadAsync(new URL(id+'.glb',root).href)).scene])));
 const group=new THREE.Group();group.name='Kids rooms R05';scene.add(group);
 const hidden=[],moves=[],fits=[];
 house.traverse(n=>{if(n.userData.kind!=='item')return;const label=n.userData.label||'';
  if(config.removePrefixes.some(p=>label.startsWith(p))){hidden.push({node:n,visible:n.visible});n.visible=false;}
  const move=config.bedsideMoves.find(x=>x.label===label);if(move){const before=n.position.clone(),world=n.getWorldPosition(new THREE.Vector3());world.z+=move.deltaZ;const after=n.parent.worldToLocal(world);moves.push({node:n,before,after});n.position.copy(after);}
 });
 const oldDecor=scene.getObjectByName('Country Plains interior R02');
 for(const n of oldDecor.children){
  const room=config.rooms.find(r=>Math.abs(n.position.x-7.01)<.02&&Math.abs(n.position.z-r.lampOldZ)<.02);
  if(room){const before=n.position.clone(),after=before.clone();after.z+=room.lampNewZ-room.lampOldZ;moves.push({node:n,before,after});n.position.copy(after);}
 }
 function place(asset,name,position,rotation,accent,localScale=[1,1,1]){
  const content=assets[asset].clone(true),outer=new THREE.Group();outer.name=name;outer.add(content);
  content.scale.set(...localScale);content.rotation.y=rotation;content.updateMatrixWorld(true);
  let box=new THREE.Box3().setFromObject(content);content.position.sub(new THREE.Vector3((box.min.x+box.max.x)/2,box.min.y,(box.min.z+box.max.z)/2));outer.position.set(...position);
  outer.traverse(n=>{if(!n.isMesh)return;n.castShadow=true;n.receiveShadow=true;
   const paint=m=>{const c=m.clone(),name=m.name.toLowerCase();if(name==='oak')c.color.set('#bba17b');if(name==='walnut')c.color.set('#8b7052');if(name==='carcass')c.color.set('#ded8c9');if(name==='linen')c.color.set('#e9e1d2');if(name==='sage'||name==='fabricgrey')c.color.set(accent);c.roughness=name==='black'?.55:.85;return c;};n.material=Array.isArray(n.material)?n.material.map(paint):paint(n.material);
  });
  group.add(outer);outer.updateMatrixWorld(true);box.setFromObject(outer);fits.push({name,asset,position,rotation,localScale,min:box.min.toArray(),max:box.max.toArray()});return outer;
 }
 function box(name,p,size,color){const m=new THREE.Mesh(new THREE.BoxGeometry(...size),new THREE.MeshStandardMaterial({color,roughness:.85}));m.name=name;m.position.set(...p);m.castShadow=m.receiveShadow=true;group.add(m);return m;}
 for(const room of config.rooms){
  place('bed-120',room.name+' small bed',[6.30,0,room.bedZ],-Math.PI/2,room.accent);
  place('desk',room.name+' writing desk',[room.deskX,0,room.deskZ],room.deskRotation,room.accent,room.deskScale||[1,1,1]);
  // Chair faces the work surface; tucked position leaves access around its side.
  place('chair',room.name+' task chair',[room.chairX,0,room.chairZ],room.chairRotation,room.accent);
  place('wardrobe',room.name+' sliding wardrobe',[3.31,0,room.wardrobeZ],Math.PI/2,room.accent,[1,1,.60/.669974]);
  box(room.name+' notebook',[room.deskX,.759,room.deskZ],[.28,.024,.21],room.accent);
  box(room.name+' notebook pages',[room.deskX,.773,room.deskZ],[.262,.004,.195],'#eee7d6');
  box(room.name+' pencil',[room.deskX,.751,room.deskZ+.28],[.012,.012,.18],'#ab7951');
 }
 const office=await createOfficeStudy(scene,assets);
 let active=true,officeRequested=false;
 function navigationData(source,enabled=true){
  if(!enabled)return source;const data=structuredClone(source);
  data.boxes=data.boxes.filter(b=>!config.removePrefixes.some(p=>b.name.startsWith(p)));
  for(const m of config.bedsideMoves)for(const b of data.boxes)if(b.name===m.label){b.min[2]+=m.deltaZ;b.max[2]+=m.deltaZ;}
  data.boxes.push(...fits.map(f=>({name:f.name,min:f.min,max:f.max})));return office.navigationData(data,officeRequested);
 }
 function enable(value){active=value;previous.enable(value);office.enable(value&&officeRequested);group.visible=value;hidden.forEach(h=>h.node.visible=value?false:h.visible);moves.forEach(m=>m.node.position.copy(value?m.after:m.before));house.updateMatrixWorld(true);document.body.dataset.interior=value?'r05':'original';}
 const snapshot={...previous.snapshot,revision:'interior-r05',kids:{fits,mattressMetres:[1.2,2],deskMetres:[1.4,.7],wardrobeDepthMetres:.60,source:'Existing CC0 3DAssets.dev library; study derivatives',navigation:'Furniture boxes replaced to match visible kids furniture; original comparison restores original boxes'}};
 function setOffice(value){officeRequested=value;office.enable(active&&value);}
 function mode(value){previous.mode(value);office.mode(value);}
 enable(true);return {group,enable,mode,mood:previous.mood,get snapshot(){return {...snapshot,office:office.snapshot};},navigationData,setOffice};
}
