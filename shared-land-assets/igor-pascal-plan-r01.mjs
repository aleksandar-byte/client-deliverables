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

 // Native wall tops are clipped away in Plan; add explicit cut-face strips for legibility.
 const caps=new THREE.Group();caps.name='Plan wall cut faces';group.add(caps);
 const walls=[{"id":"ground/entrance","floor":"ground","a":[8.25195,0.25535],"b":[3.2422199999999997,0.25535],"thickness":0.5,"openings":[{"start":1.240272,"width":1.009241,"type":"door","bottom":0,"height":2.25},{"start":2.249514,"width":0.997082,"type":"window","bottom":0,"height":2.45}]},{"id":"ground/lobby-left","floor":"ground","a":[8.25195,2.85749],"b":[8.25195,0.25535],"thickness":0.5,"openings":[]},{"id":"ground/lobby-hall","floor":"ground","a":[8.25195,2.86965],"b":[3.2422199999999997,2.86965],"thickness":0.23,"openings":[{"start":1.240272,"width":1.009241,"type":"door","bottom":0,"height":2.25}]},{"id":"ground/east","floor":"ground","a":[3.2422199999999997,11.24757],"b":[3.2422199999999997,0.25535],"thickness":0.5,"openings":[]},{"id":"ground/living-rear","floor":"ground","a":[8.25195,11.24757],"b":[3.2422199999999997,11.24757],"thickness":0.5,"openings":[{"start":0.25535,"width":4.000486,"type":"window","bottom":0,"height":2.6}]},{"id":"ground/living-west","floor":"ground","a":[8.25195,11.24757],"b":[8.25195,8.7427],"thickness":0.5,"openings":[{"start":0.25535,"width":1.994163,"type":"window","bottom":0,"height":2.6}]},{"id":"ground/dining-rear","floor":"ground","a":[10.75681,8.7427],"b":[8.25195,8.7427],"thickness":0.5,"openings":[{"start":0.26751,"width":1.994163,"type":"window","bottom":0,"height":2.6}]},{"id":"ground/kitchen-west","floor":"ground","a":[10.75681,8.7427],"b":[10.75681,0.25535],"thickness":0.5,"openings":[{"start":0.2431909999999995,"width":0.49854099999999946,"type":"window","bottom":0,"height":2.6},{"start":1.042699999999999,"width":1.25,"type":"window","bottom":0.9,"height":1.5},{"start":5.242699999999999,"width":2.5,"type":"window","bottom":1.12,"height":1.1799999999999997}]},{"id":"ground/kitchen-front","floor":"ground","a":[10.75681,0.25535],"b":[8.25195,0.25535],"thickness":0.5,"openings":[{"start":0.4768100000000004,"width":1.5,"type":"window","bottom":1.12,"height":1.1799999999999997}]},{"id":"ground/wc","floor":"ground","a":[4.95671,2.85749],"b":[4.95671,0.25535],"thickness":0.115,"openings":[{"start":0.936284,"width":0.814689,"type":"door","bottom":0,"height":2.25}]},{"id":"ground/kitchen-hall","floor":"ground","a":[7.473739999999999,4.88813],"b":[7.473739999999999,2.99125],"thickness":0.25,"openings":[]},{"id":"ground/store-rear","floor":"ground","a":[3.2422199999999997,8.7427],"b":[-1.2568099999999998,8.7427],"thickness":0.5,"openings":[]},{"id":"ground/store-east","floor":"ground","a":[-1.2568099999999998,8.7427],"b":[-1.2568099999999998,6.73638],"thickness":0.5,"openings":[]},{"id":"ground/store-front","floor":"ground","a":[3.2422199999999997,6.73638],"b":[-1.2568099999999998,6.73638],"thickness":0.5,"openings":[{"start":1.750973,"width":0.997082,"type":"door","bottom":0,"height":2.25}]},{"id":"upper/front","floor":"upper","a":[10.75681,-0.74173],"b":[3.2422199999999997,-0.74173],"thickness":0.5,"openings":[{"start":1.763132,"width":1.860409,"type":"window","bottom":0,"height":2.6},{"start":3.878891,"width":1.872568,"type":"window","bottom":0,"height":2.6}]},{"id":"upper/west","floor":"upper","a":[10.75681,8.75486],"b":[10.75681,-0.74173],"thickness":0.5,"openings":[{"start":1.3548600000000004,"width":1.25,"type":"window","bottom":1.6,"height":0.7999999999999998},{"start":4.60486,"width":0.9000000000000004,"type":"window","bottom":1.2,"height":1.1500000000000001},{"start":7.10486,"width":1.75,"type":"window","bottom":1.05,"height":1.3}]},{"id":"upper/east","floor":"upper","a":[3.2422199999999997,10.23833],"b":[3.2422199999999997,-0.74173],"thickness":0.5,"openings":[]},{"id":"upper/primary-rear","floor":"upper","a":[8.25195,10.23833],"b":[3.2422199999999997,10.23833],"thickness":0.5,"openings":[{"start":0.25535,"width":3.988327,"type":"window","bottom":0,"height":2.6}]},{"id":"upper/primary-west","floor":"upper","a":[8.25195,10.23833],"b":[8.25195,6.06761],"thickness":0.5,"openings":[{"start":0.26751,"width":0.972763,"type":"window","bottom":0,"height":2.6}]},{"id":"upper/bath-rear","floor":"upper","a":[10.75681,8.75486],"b":[8.25195,8.75486],"thickness":0.5,"openings":[{"start":0.26751,"width":0.997082,"type":"window","bottom":0,"height":2.6}]},{"id":"upper/bath-east","floor":"upper","a":[8.17899,8.75486],"b":[8.17899,4.96109],"thickness":0.115,"openings":[{"start":2.881809,"width":0.802529,"type":"door","bottom":0,"height":2.25}]},{"id":"upper/bath-front","floor":"upper","a":[10.75681,4.97325],"b":[8.17899,4.97325],"thickness":0.115,"openings":[]},{"id":"upper/laundry-east","floor":"upper","a":[8.25195,4.96109],"b":[8.25195,2.99125],"thickness":0.115,"openings":[{"start":0.972763,"width":0.911965,"type":"door","bottom":0,"height":2.25}]},{"id":"upper/laundry-front","floor":"upper","a":[10.75681,2.86965],"b":[8.25195,2.86965],"thickness":0.115,"openings":[]},{"id":"upper/kids-rear-left","floor":"upper","a":[8.25195,2.86965],"b":[6.99951,2.86965],"thickness":0.115,"openings":[{"start":0.279669,"width":0.729572,"type":"door","bottom":0,"height":2.25}]},{"id":"upper/kids-rear-right","floor":"upper","a":[6.99951,2.86965],"b":[3.2422199999999997,2.86965],"thickness":0.25,"openings":[{"start":0.26751,"width":0.741732,"type":"door","bottom":0,"height":2.25}]},{"id":"upper/kids-divider","floor":"upper","a":[6.99951,2.86965],"b":[6.99951,-0.74173],"thickness":0.115,"openings":[]},{"id":"upper/primary-front","floor":"upper","a":[8.17899,6.07977],"b":[3.2422199999999997,6.07977],"thickness":0.115,"openings":[{"start":0.972763,"width":0.802529,"type":"door","bottom":0,"height":2.25}]}];
 for(const w of walls){
  const length=Math.hypot(w.b[0]-w.a[0],w.b[1]-w.a[1]),dx=(w.b[0]-w.a[0])/length,dy=(w.b[1]-w.a[1])/length;
  const gaps=(w.openings??[]).filter(o=>o.bottom<1.15&&o.bottom+o.height>1.15).sort((a,b)=>a.start-b.start);let cursor=0;
  function strip(a,b){if(b-a<.001)return;const mid=(a+b)/2,m=new THREE.Mesh(new THREE.BoxGeometry(b-a,.012,w.thickness),new THREE.MeshBasicMaterial({color:0x52615a}));m.position.set(w.a[0]+dx*mid,(w.floor==='upper'?3.3:0)+1.145,-w.a[1]-dy*mid);m.rotation.y=Math.atan2(dy,dx);m.userData.floor=w.floor;caps.add(m);}
  for(const o of gaps){strip(cursor,o.start);cursor=Math.max(cursor,o.start+o.width);}strip(cursor,length);
 }

 function update(){
  const plan=getMode()==='plan',floor=select.value;
  control.hidden=!plan;
  caps.visible=plan&&isVisible();for(const m of caps.children)m.visible=m.userData.floor===floor;
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
