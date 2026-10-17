import * as THREE from 'three';
import {styleInterior as previousStyle} from './interior-r05.mjs';

// Correct the imported appliance study and pantry leaf; preserve the house shell.
export async function styleInterior(house,scene){
 const previous=await previousStyle(house,scene),parts=[],prep=[];
 house.traverse(n=>{if(n.userData.kind==='item'&&n.userData.label?.startsWith('CP_fridge_'))parts.push(n);if(n.userData.kind==='item'&&n.userData.label==='CP_east_prep')prep.push(n);});
 if(parts.length!==3||prep.length!==1)throw Error('Kitchen source parts do not match Pascal export');
 const group=new THREE.Group();group.name='Kitchen appliance correction R06';scene.add(group);
 const sourceBox=new THREE.Box3();for(const n of parts)sourceBox.union(new THREE.Box3().setFromObject(n));
 for(const n of parts){const clone=n.clone(true);clone.matrixAutoUpdate=false;clone.matrix.copy(n.matrixWorld);clone.traverse(o=>{if(!o.isMesh)return;const paint=m=>{const c=m.clone();if(m.name==='carcass'){c.color.set('#b8c0bc');c.metalness=.55;c.roughness=.42;}if(m.name==='metal'){c.color.set('#77817e');c.metalness=.8;c.roughness=.28;}return c;};o.material=Array.isArray(o.material)?o.material.map(paint):paint(o.material);});group.add(clone);}
 const size=sourceBox.getSize(new THREE.Vector3()),center=sourceBox.getCenter(new THREE.Vector3());
 // Existing Halcyon library study: width .60 m, depth .66 m, height 2.02 m.
 group.scale.set(.66/size.x,2.02/size.y,.60/size.z);
 const back=sourceBox.max.x,newCenterX=back-.33,newCenterZ=-3.114534;
 group.position.set(newCenterX-center.x*group.scale.x,-sourceBox.min.y*group.scale.y,newCenterZ-center.z*group.scale.z);group.updateMatrixWorld(true);
 const pantry=house.getObjectByName('door_43exp1ax1eg1yszd'),leaves=pantry?.children.filter(n=>n.children.length===12)||[];
 if(leaves.length!==1)throw Error('Cannot identify pantry door leaf');
 const leaf=leaves[0],before=leaf.quaternion.clone(),after=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2);
 const visibility=parts.map(n=>n.visible);
 const prepMaterials=[];prep[0].traverse(n=>{if(!n.isMesh)return;const paint=m=>{const c=m.clone();if(m.name==='Interior_sage')c.color.set('#69745c');if(m.name==='Interior_quartz')c.color.set('#d5cbbb');return c;};prepMaterials.push({node:n,styled:Array.isArray(n.material)?n.material.map(paint):paint(n.material)});});
 function bounds(n,name){n.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(n);return {name,min:b.min.toArray(),max:b.max.toArray()};}
 const beforeDoor=bounds(leaf,'Pantry door before');
 function enable(on){previous.enable(on);group.visible=on;parts.forEach((n,i)=>n.visible=on?false:visibility[i]);leaf.quaternion.copy(on?after:before);if(on)prepMaterials.forEach(m=>m.node.material=m.styled);house.updateMatrixWorld(true);document.body.dataset.interior=on?'r06':'original';}
 function navigationData(source,on=true){const data=previous.navigationData(source,on);if(!on)return data;data.boxes=data.boxes.filter(b=>!b.name.startsWith('CP_fridge_'));data.boxes.push(bounds(group,'Kitchen fridge R06'));leaf.updateMatrixWorld(true);const a=leaf.localToWorld(new THREE.Vector3(0,0,0)),b=leaf.localToWorld(new THREE.Vector3(.758223,0,0));data.walls.push({a:[a.x,a.z],b:[b.x,b.z],thickness:.125,holes:[],name:'Pantry inward door leaf including handles'});return data;}
 enable(true);
 return {...previous,enable,navigationData,get snapshot(){return {...previous.snapshot,revision:'interior-r06',kitchen:{sourceFridge:{min:sourceBox.min.toArray(),max:sourceBox.max.toArray()},fridge:bounds(group,'Kitchen fridge R06'),pantryDoorBefore:beforeDoor,pantryDoor:bounds(leaf,'Pantry inward door leaf'),assumptions:'60 cm wide, 66 cm deep, 202 cm tall library study; not a selected manufacturer product. Pantry shown fully inward open; static leaf collision included.',native:'Browser correction only; native Pascal unchanged'}};}};
}
