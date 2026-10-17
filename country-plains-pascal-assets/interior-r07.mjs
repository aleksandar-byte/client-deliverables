import * as THREE from 'three';
import {styleInterior as previousStyle} from './interior-r05.mjs';

// Source-calibrated kitchen arrangement. Pixel tracing is approximate, not appliance specifications.
export async function styleInterior(house,scene){
 const previous=await previousStyle(house,scene),parts=[],prep=[];
 house.traverse(n=>{if(n.userData.kind==='item'&&n.userData.label?.startsWith('CP_fridge_'))parts.push(n);if(n.userData.kind==='item'&&n.userData.label==='CP_east_prep')prep.push(n);});
 if(parts.length!==3||prep.length!==1)throw Error('Kitchen source parts do not match Pascal export');
 const x=px=>(px-64)*.0127-7.6581,z=py=>(py-250)*.0127-5.518134;
 const trace={fridge:{pixels:[839,414,891,490],min:[x(839),0,z(414)],max:[x(891),1.90,z(490)]},counter:{pixels:[842,359,891,410],min:[x(842),0,z(359)],max:[x(891),.91,z(410)]}};
 function bounds(n,name){n.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(n);return {name,min:b.min.toArray(),max:b.max.toArray()};}
 function fit(nodes,target,name){
  const group=new THREE.Group();group.name=name;scene.add(group);const sourceBox=new THREE.Box3();
  nodes.forEach(n=>sourceBox.union(new THREE.Box3().setFromObject(n)));
  for(const n of nodes){const clone=n.clone(true);clone.matrixAutoUpdate=false;clone.matrix.copy(n.matrixWorld);clone.traverse(o=>{if(!o.isMesh)return;const paint=m=>{const c=m.clone();if(m.name==='carcass'){c.color.set('#b8c0bc');c.metalness=.55;c.roughness=.42;}if(m.name==='metal'){c.color.set('#77817e');c.metalness=.8;c.roughness=.28;}if(m.name==='Interior_sage')c.color.set('#69745c');if(m.name==='Interior_quartz')c.color.set('#d5cbbb');return c;};o.material=Array.isArray(o.material)?o.material.map(paint):paint(o.material);});group.add(clone);}
  const size=sourceBox.getSize(new THREE.Vector3()),targetSize=new THREE.Vector3().fromArray(target.max).sub(new THREE.Vector3().fromArray(target.min));group.scale.copy(targetSize.divide(size));group.position.fromArray(target.min).sub(sourceBox.min.clone().multiply(group.scale));group.updateMatrixWorld(true);return group;
 }
 const fridge=fit(parts,trace.fridge,'Kitchen fridge R07'),counter=fit(prep,trace.counter,'Kitchen east counter R07');
 const pantry=house.getObjectByName('door_43exp1ax1eg1yszd'),leaves=pantry?.children.filter(n=>n.children.length===12)||[];
 if(leaves.length!==1)throw Error('Cannot identify pantry door leaf');
 const leaf=leaves[0],before={position:leaf.position.clone(),quaternion:leaf.quaternion.clone()},originalNodes=[...parts,...prep],visibility=originalNodes.map(n=>n.visible);
 // Original drawing: hinge at counter-side jamb, opening toward the kitchen.
 // Rotate the leaf 180 degrees to reverse its hinge end, then 90 degrees outward for walking (the drawing depicts a partially open leaf).
 const sourceOpen=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);
 function enable(on){previous.enable(on);fridge.visible=counter.visible=on;originalNodes.forEach((n,i)=>n.visible=on?false:visibility[i]);leaf.position.copy(before.position);if(on)leaf.position.x=-before.position.x;leaf.quaternion.copy(on?sourceOpen:before.quaternion);house.updateMatrixWorld(true);document.body.dataset.interior=on?'r07':'original';}
 function doorCollider(){leaf.updateMatrixWorld(true);const a=leaf.localToWorld(new THREE.Vector3(0,0,0)),b=leaf.localToWorld(new THREE.Vector3(.758223,0,0));return {a:[a.x,a.z],b:[b.x,b.z],thickness:.125,holes:[],name:'Pantry source-side hinge and outward leaf including handles'};}
 function navigationData(source,on=true){const data=previous.navigationData(source,on);if(!on)return data;data.boxes=data.boxes.filter(b=>!b.name.startsWith('CP_fridge_')&&b.name!=='CP_east_prep');data.boxes.push(bounds(fridge,'Kitchen fridge R07'),bounds(counter,'Kitchen east counter R07'));data.walls.push(doorCollider());return data;}
 enable(true);
 return {...previous,enable,navigationData,get snapshot(){return {...previous.snapshot,revision:'interior-r07',kitchen:{sourceImage:'sources/01-floor.webp',trace,fridge:bounds(fridge,'Kitchen fridge R07'),counter:bounds(counter,'Kitchen east counter R07'),pantryDoor:bounds(leaf,'Pantry outward door leaf'),doorCollider:doorCollider(),assumptions:'Fridge/counter footprints traced at .0127 m per pixel from the original marketing drawing. Refrigerator height 1.90 m and counter height .91 m are visualization assumptions; no manufacturer selected. Pantry hinge restored to counter-side jamb, held 90 degrees outward for walking; the drawing shows the same swing direction partially open. Full swing/storage fit not validated.',native:'Browser correction only; native Pascal unchanged'}};}};
}
