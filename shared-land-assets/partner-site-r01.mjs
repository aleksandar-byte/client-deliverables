import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export async function addPartner({scene,contextRoots,walkConfig,markers,terrainHeight}){
 const gltf=await new GLTFLoader().loadAsync(new URL('./partner-lk1891-r01/model.glb',import.meta.url).href);
 const remove=[];let removed=0,meshes=0;
 for(const ctx of contextRoots)ctx.traverse(o=>{const a=o.userData.terrainAnchor;if(a&&Math.abs(a[0]-6)<.01&&Math.abs(a[1]+23.5)<.01)remove.push(o);});
 // Flat comparison has the same anchored source group. Never remove paths tagged partner.
 for(const o of remove){o.traverse(c=>{if(c.isMesh)removed++;});o.removeFromParent();}
 const group=gltf.scene;group.name='Partner house · LK1891';group.rotation.y=Math.PI;
 group.position.set(11.5,(terrainHeight?.(6,-23.5)??-.205)+.205,18.5);
 group.traverse(o=>{if(!o.isMesh)return;meshes++;o.userData.contextRole='partner';o.castShadow=true;o.receiveShadow=true;
  if(o.userData.kind==='window'){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=.5;o.material.depthWrite=false;}
 });
 scene.add(group);contextRoots.push(group);
 // Remove grass/shrub instances inside the expanded footprint, including patios.
 const m=new THREE.Matrix4(),p=new THREE.Vector3();
 for(const ctx of contextRoots)ctx.traverse(o=>{if(!o.isInstancedMesh)return;for(let i=0;i<o.count;i++){o.getMatrixAt(i,m);p.setFromMatrixPosition(m);if(p.x> -1.25&&p.x<13.25&&-p.z> -31.25&&-p.z< -15.75){m.makeScale(0,0,0);o.setMatrixAt(i,m);}}o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere();});
 // Site walk stays outside this new shell; its two interior floors have a separate study.
 const old=walkConfig.boxes.filter(b=>b.role==='partner');walkConfig.boxes.splice(0,walkConfig.boxes.length,...walkConfig.boxes.filter(b=>b.role!=='partner'));
 walkConfig.boxes.push({role:'partner',min:[-1,-31],max:[13,-16]});
 for(const marker of markers)if(marker.el.textContent.includes('Partner')){marker.el.textContent='Partner · LK1891';marker.p.set(6,group.position.y+7.7,23.5);}
 return {meshes,removed,oldCollisionBoxes:old.length};
}
