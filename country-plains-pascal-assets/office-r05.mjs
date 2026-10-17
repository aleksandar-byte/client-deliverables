import * as THREE from 'three';

// Reversible feasibility option. Existing shell, exterior openings and footprint retained.
export async function createOfficeStudy(scene,assets){
 const group=new THREE.Group();group.name='Office feasibility R05';scene.add(group);
 const walls=[],fits=[],moves=[];let enabled=false,currentMode='walk';
 const chalk=new THREE.MeshStandardMaterial({color:'#e7ddcc',roughness:.88});
 const oak=new THREE.MeshStandardMaterial({color:'#a88b63',roughness:.75});
 const glass=new THREE.MeshStandardMaterial({color:'#adc4c0',transparent:true,opacity:.22,roughness:.18,depthWrite:false});
 function box(name,p,size,material){const n=new THREE.Mesh(new THREE.BoxGeometry(...size),material);n.name=name;n.position.set(...p);n.castShadow=material!==glass;n.receiveShadow=true;group.add(n);return n;}
 function partition(name,a,b,holes=[]){
  walls.push({a,b,thickness:.10,holes:holes.map(h=>({...h,frame:0}))});
  const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz),along=(u,y)=>[a[0]+dx*u/length,y,a[1]+dz*u/length];
  const segments=[];let at=0;for(const h of holes){segments.push([at,h.center-h.width/2]);at=h.center+h.width/2;}segments.push([at,length]);
  for(const [i,[lo,hi]] of segments.entries()){
   if(hi<=lo)continue;const width=hi-lo,mid=(lo+hi)/2;
   for(const [suffix,y,height,material] of [['lower panel',.425,.85,chalk],['glass',1.71,1.72,glass],['cap',2.585,.03,oak]]){
    const n=box(name+' '+i+' '+suffix,along(mid,y),[width,height,.10],material);n.rotation.y=-Math.atan2(dz,dx);n.userData.upper=suffix!=='lower panel';
   }
  }
  for(const h of holes){for(const u of [h.center-h.width/2,h.center+h.width/2]){const n=box(name+' door jamb',along(u,1.3),[.03,2.6,.12],oak);n.userData.upper=true;}
   const lintel=box(name+' door head',along(h.center,2.4),[h.width,.4,.1],chalk);lintel.rotation.y=-Math.atan2(dz,dx);lintel.userData.upper=true;
   // Proposed sliding panel shown parked along the outside face, with a clear opening.
   const door=box(name+' parked sliding door',[a[0]-.09,1.1,a[1]+h.center-h.width-.05],[.035,2.2,h.width],oak);door.userData.upper=true;
   const rail=box(name+' sliding track',[a[0]-.1,2.23,a[1]+h.center-.45],[.05,.04,1.85],oak);rail.userData.upper=true;
  }
 }
 partition('Office west partition',[.75,.90],[.75,3.50],[{center:1.80,width:.90}]);
 partition('Office south partition',[.75,.90],[2.8575,.90]);
 partition('Office north partition',[.75,3.50],[2.8575,3.50]);
 function fit(node,name){node.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(node);return {name,min:b.min.toArray(),max:b.max.toArray()};}
 function place(id,name,p,rotation){const content=assets[id].clone(true),outer=new THREE.Group();outer.name=name;outer.add(content);content.rotation.y=rotation;content.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(content);content.position.sub(new THREE.Vector3((b.min.x+b.max.x)/2,b.min.y,(b.min.z+b.max.z)/2));outer.position.set(...p);outer.traverse(n=>{if(n.isMesh){n.castShadow=n.receiveShadow=true;}});group.add(outer);fits.push({...fit(outer,name),asset:id,position:p,rotation,localScale:[1,1,1]});}
 place('desk','Office writing desk',[1.85,0,1.31],0);
 place('chair','Office task chair',[2.10,0,2.23],Math.PI);
 box('Office monitor base',[1.85,.76,1.2],[.30,.025,.2],oak);
 box('Office monitor stem',[1.85,.89,1.2],[.035,.25,.035],oak);
 box('Office monitor',[1.85,1.09,1.17],[.54,.33,.025],new THREE.MeshStandardMaterial({color:'#293c3c',roughness:.5}));
 const screenLight=new THREE.PointLight('#ffe7c1',3,4);screenLight.position.set(1.7,2.35,2);group.add(screenLight);
 function move(name,p,rotation){const n=scene.getObjectByName(name);if(!n)throw Error('Office study cannot locate '+name);moves.push({node:n,position:n.position.clone(),rotation:n.rotation.clone(),to:p,turn:rotation});}
 move('Imported velvet sofa',[-.65,0,3.91],-Math.PI/2);
 move('Imported stone and oak coffee table',[-.65,.003,2.72],Math.PI/2);
 const decor=scene.getObjectByName('Country Plains interior R02');
 for(const n of decor.children){if(n.name.startsWith('Living woven rug'))move(n.name,[-.65,n.position.y,2.98+(n.position.z-2.75)],0);
  if(n.name.startsWith('Coffee table books'))move(n.name,[-.65,n.position.y,2.72+(n.position.z-2.92)],0);
 }
 function enable(value){enabled=value;group.visible=value;for(const m of moves){m.node.position.copy(value?new THREE.Vector3(...m.to):m.position);m.node.rotation.copy(m.rotation);if(value)m.node.rotation.y+=m.turn;}scene.updateMatrixWorld(true);mode(currentMode);}
 function mode(value){currentMode=value;for(const n of group.children)if(n.userData.upper||n.isLight)n.visible=value!=='plan';}
 function navigationData(source,on){if(!on)return source;const data=structuredClone(source);data.walls.push(...walls);data.boxes=data.boxes.filter(b=>!['CP_sofa','CP_coffee_table'].includes(b.name));data.boxes.push(...group.children.filter(n=>n.name.includes('parked sliding door')).map(n=>fit(n,n.name)),...fits.map(f=>({name:f.name,min:f.min,max:f.max})),...moves.filter(m=>m.node.name.startsWith('Imported ')).map(m=>fit(m.node,m.node.name)));data.rooms.push({name:'Office study',polygon:[[.80,.95],[2.8575,.95],[2.8575,3.45],[.80,3.45]]});return data;}
 enable(false);
 return {enable,mode,navigationData,get snapshot(){return {enabled,clearSize:[2.0575,2.50],clearArea:5.14375,walls,fits,moved:enabled?moves.filter(m=>m.node.name.startsWith('Imported ')).map(m=>fit(m.node,m.node.name)):[],note:'Feasibility option only: borrowed light through interior glazing; no external window. Ventilation, acoustic enclosure and ceiling junction need design. Door shown parked open; opening is 0.90 m before hardware.'};}};
}
