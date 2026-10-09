import * as THREE from 'three';

// Floor inspection only. Navigation and original model transforms stay intact.
export function installIgorPlan({group,getMode,isVisible,getDimensions}){
 const control=document.createElement('label');control.id='igor-floor-control';
 control.innerHTML='Igor’s floor <select aria-label="Igor’s floor"><option value="ground">First floor (ground)</option><option value="upper">Second floor (upper)</option></select>';
 document.querySelector('.toolbar').append(control);
 const select=control.querySelector('select'),parts=[];
 group.traverse(o=>{
  if(!o.isMesh)return;
  const meta={...o.userData};
  for(let p=o.parent;p&&p!==group.parent;p=p.parent)for(const k of ['floor','kind'])if(meta[k]===undefined)meta[k]=p.userData[k];
  const materials=(Array.isArray(o.material)?o.material:[o.material]).map(m=>m.clone());
  o.material=Array.isArray(o.material)?materials:materials[0];
  parts.push({o,meta,materials,planes:materials.map(m=>m.clippingPlanes)});
 });
 function update(){
  const plan=getMode()==='plan',floor=select.value;
  control.hidden=!plan;
  const clip=new THREE.Plane(new THREE.Vector3(0,-1,0),group.position.y+(floor==='upper'?3.3:0)+1.15);
  for(const {o,meta,materials,planes} of parts){
   o.visible=isVisible()&&(!plan||((!meta.floor||meta.floor===floor||meta.floor==='both')&&meta.kind!=='ceiling'&&meta.kind!=='roof'&&(meta.kind!=='stair'||floor==='ground')));
   materials.forEach((m,i)=>{m.clippingPlanes=plan&&['wall','window','door'].includes(meta.kind)?[clip]:planes[i];});
  }
  document.body.dataset.igorPlanFloor=plan?floor:'all';
 }
 function chooseFloor(){
  update();const dims=getDimensions();
  dims.select.value='partner-lk1891-'+select.value;dims.update(true);
 }
 select.addEventListener('change',chooseFloor);
 const dims=getDimensions();
 dims.select.addEventListener('change',()=>{if(getMode()==='plan'&&dims.select.value.startsWith('partner-lk1891-')){select.value=dims.select.value.endsWith('-upper')?'upper':'ground';update();}});
 update();return {update,select};
}
