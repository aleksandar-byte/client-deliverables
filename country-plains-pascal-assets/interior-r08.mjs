import * as THREE from 'three';
import {styleInterior as previousStyle} from './interior-r07.mjs';
export async function styleInterior(house,scene){
 const previous=await previousStyle(house,scene),group=new THREE.Group();group.name='Kitchen fitted design R08';scene.add(group);
 const mat=(name,color,roughness=.65,metalness=0)=>new THREE.MeshStandardMaterial({name,color,roughness,metalness});
 const sage=mat('R08 muted olive','#7a806c'),stone=mat('R08 warm limestone','#e1d9c9',.47),dark=mat('R08 recessed plinth','#343b33'),metal=mat('R08 brushed nickel','#969d98',.38,.65),ivory=mat('R08 warm pantry door','#ddd8cb');
 const hidden=[],paints=[],fits=[];let enabled=true,pantryOpen=false;
 const labels=n=>{const a=[];for(let p=n;p;p=p.parent)a.push(p.userData.label||p.name||'');return a.join(' ');};
 const bounds=(n,name)=>{n.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(n);return {name,min:b.min.toArray(),max:b.max.toArray()};};
 const hide=n=>hidden.push({node:n,visible:n.visible});
 function box(name,min,max,m,parent=group){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...max.map((v,i)=>v-min[i])),m);mesh.name=name;mesh.position.set(...max.map((v,i)=>(v+min[i])/2));mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 const originalFridge=scene.getObjectByName('Kitchen fridge R07');hide(originalFridge);hidden[hidden.length-1].visible=false;
 const oven=[];house.traverse(n=>{if(n.userData.kind==='item'){const id=n.userData.label||'';if(id.startsWith('CP_dishwasher_'))hide(n);if(id.startsWith('CP_oven_')){hide(n);oven.push(n);}}});
 if(oven.length!==3)throw Error('Expected all three imported oven parts');
 const fridge=new THREE.Group();fridge.name='Integrated fridge cabinet';group.add(fridge);
 const fb=previous.snapshot.kitchen.fridge,fx=fb.min[0],fz=fb.min[2],fw=fb.max[2]-fz,back=fb.max[0],end=fb.max[2];
 // Cabinet-front appliance concept; open toe ventilation is illustrative, not a selected installation detail.
 box('Fridge cabinet carcass',[fx+.03,.12,fz],[back,2.18,end],sage,fridge);
 box('Fridge recessed plinth',[fx+.065,0,fz+.018],[back,.12,end-.018],dark,fridge);
 for(const [lo,hi] of [[.125,.685],[.691,1.895],[1.901,2.175]])for(let i=0;i<2;i++){
  const a=fz+.006+i*fw/2,b=fz+(i+1)*fw/2-.006;box('Fridge cabinet front',[fx,lo,a],[fx+.022,hi,b],sage,fridge);
  if(lo<1.9)box('Fridge cabinet pull',[fx-.022,lo>.69?1.08:hi-.31,i===0?b-.055:a+.045],[fx-.010,lo>.69?1.40:hi-.07,i===0?b-.045:a+.055],metal,fridge);
 }
 fits.push(bounds(fridge,'Integrated fridge cabinet'));
 const dishwasher=new THREE.Group();dishwasher.name='Panel-front dishwasher';group.add(dishwasher);
 box('Dishwasher concealed body',[.4919,.12,-5.391134],[1.0919,.875,-4.89],dark,dishwasher);
 box('Dishwasher side filler',[.4419,.12,-4.883],[.4919,.875,-4.861],sage,dishwasher);
 box('Dishwasher matching front',[.4979,.125,-4.883],[1.0859,.875,-4.861],sage,dishwasher);
 box('Dishwasher pull',[.65,.795,-4.852],[.935,.807,-4.837],metal,dishwasher);
 box('Dishwasher stone top',[.4419,.88,-5.391134],[1.0919,.91,-4.832334],stone,dishwasher);
 box('Dishwasher recessed plinth',[.4919,0,-4.99],[1.0919,.12,-4.91],dark,dishwasher);
 fits.push(bounds(dishwasher,'Integrated dishwasher'));
 // Fit the existing imported oven and glass inside an open-front base cabinet.
 const ovenParts=oven.filter(n=>n.userData.label!=='CP_oven_0');const ob=new THREE.Box3();ovenParts.forEach(n=>ob.union(new THREE.Box3().setFromObject(n)));const appliance=new THREE.Group();appliance.name='Imported built-in oven';group.add(appliance);
 for(const n of ovenParts){const c=n.clone(true);c.matrixAutoUpdate=false;c.matrix.copy(n.matrixWorld);appliance.add(c);}
 const targetMin=new THREE.Vector3(-2.8321,.19,-4.624534),targetMax=new THREE.Vector3(-2.2606,.81,-4.024534),sz=ob.getSize(new THREE.Vector3());appliance.scale.copy(targetMax.clone().sub(targetMin).divide(sz));appliance.position.copy(targetMin).sub(ob.min.clone().multiply(appliance.scale));
 const ovenCab=new THREE.Group();ovenCab.name='Oven cabinet surround';group.add(ovenCab);
 box('Oven top',[-2.8321,.88,-4.674534],[-2.2606,.91,-3.974534],stone,ovenCab);
 box('Oven upper rail',[-2.31,.814,-4.674534],[-2.275,.88,-3.974534],sage,ovenCab);
 box('Oven lower drawer',[-2.31,.12,-4.674534],[-2.275,.185,-3.974534],sage,ovenCab);
 box('Oven left stile',[-2.31,.185,-4.674534],[-2.275,.814,-4.628534],sage,ovenCab);
 box('Oven right stile',[-2.31,.185,-4.020534],[-2.275,.814,-3.974534],sage,ovenCab);
 box('Oven recessed plinth',[-2.8321,0,-4.674534],[-2.36,.12,-3.974534],dark,ovenCab);
 // Simplify existing tile variation and harmonize all visible kitchen finishes.
 function paintTree(root){root.traverse(n=>{if(!n.isMesh)return;const text=labels(n),kitchen=/CP_(west_base|rear_|sink|oven|island)|Kitchen east counter/.test(text);if(!kitchen&&!/Cream splashback tile/.test(n.name))return;
  const old=n.material;const style=m=>{let c=m.clone();if(m.name==='Interior_sage'&&!text.includes('CP_island')){c.color.copy(sage.color);c.roughness=.7;}if(m.name==='Interior_quartz'){c.color.copy(stone.color);c.roughness=.47;}if(text.includes('CP_oven')&&m.name==='Style_ivory')c.color.copy(sage.color);if(text.includes('CP_sink')&&m.name==='Interior_brass'){c.color.set('#969d98');c.metalness=.7;c.roughness=.35;}else if(m.name==='Interior_brass'){c.color.copy(metal.color);c.metalness=.65;c.roughness=.38;}if(n.name==='Cream splashback tile'){c.color.set('#ded7c8');c.roughness=.45;}return c;};paints.push({node:n,before:old,after:Array.isArray(old)?old.map(style):style(old)});
 });}
 paintTree(house);paintTree(scene.getObjectByName('Kitchen east counter R07'));paintTree(appliance);scene.traverse(n=>{if(n.name==='Cream splashback tile')paintTree(n);});
 const pantry=house.getObjectByName('door_43exp1ax1eg1yszd'),leaf=pantry.children.find(n=>n.children.length===12);
 // Flat painted leaf replaces raised-panel detailing in the style layer, follows the same hinge.
 const leafChildren=leaf.children.slice();leafChildren.forEach(hide);const flatLeaf=new THREE.Group();flatLeaf.name='Quiet pantry slab';leaf.add(flatLeaf);
 box('Painted pantry door',[0,-1.065,-.02],[.758223,1.04,.02],ivory,flatLeaf);
 box('Pantry nickel pull',[.684,-.06,-.052],[.696,.14,-.035],metal,flatLeaf);
 const closed=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI),open=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);
 // Faucet is a small plan-specific detail; sink and plumbing location remain fixed.
 const path=new THREE.CatmullRomCurve3([new THREE.Vector3(-.008,.90,-5.31),new THREE.Vector3(-.008,1.17,-5.31),new THREE.Vector3(-.008,1.24,-5.24),new THREE.Vector3(-.008,1.23,-5.12),new THREE.Vector3(-.008,1.13,-5.09)]);
 const tap=new THREE.Mesh(new THREE.TubeGeometry(path,28,.012,8,false),metal);tap.name='Kitchen curved faucet';tap.castShadow=true;group.add(tap);
 box('Shelf task light',[-2.58,1.794,-3.34],[-2.565,1.802,-2.62],new THREE.MeshStandardMaterial({color:'#fff0d7',emissive:'#ffd6a1',emissiveIntensity:.65}));
 function applyDoor(){if(enabled)leaf.quaternion.copy(pantryOpen?open:closed);house.updateMatrixWorld(true);}
 function enable(on){enabled=on;previous.enable(on);group.visible=flatLeaf.visible=on;hidden.forEach(h=>h.node.visible=on?false:h.visible);paints.forEach(p=>{if(on)p.node.material=p.after;});applyDoor();document.body.dataset.interior=on?'r08':'original';}
 function setPantry(on){pantryOpen=!!on;applyDoor();}
 function navigationData(source,on=true){const data=previous.navigationData(source,on);if(!on)return data;data.boxes=data.boxes.filter(b=>!b.name.startsWith('CP_dishwasher_')&&b.name!=='Kitchen fridge R07');data.boxes.push(bounds(fridge,'Integrated fridge cabinet'),bounds(dishwasher,'Integrated dishwasher'));if(!pantryOpen)data.rooms=data.rooms.filter(r=>r.name!=='Pantry');return data;}
 enable(true);
 return {...previous,enable,setPantry,navigationData,get snapshot(){return {...previous.snapshot,revision:'interior-r08',kitchenDesign:{pantryOpen,fridge:bounds(fridge,'Integrated fridge cabinet'),dishwasher:bounds(dishwasher,'Integrated dishwasher'),oven:bounds(appliance,'Imported built-in oven'),finishes:'Muted olive / warm stone / oak island / brushed nickel. Matching appliance panels, aligned worktops and recessed plinths.',assumptions:'Concept cabinetry; panel-ready appliances and installation/ventilation details still require manufacturer selection. Closed pantry excludes its room shortcut and blocks physical entry. Native Pascal unchanged.'}};}};
}
