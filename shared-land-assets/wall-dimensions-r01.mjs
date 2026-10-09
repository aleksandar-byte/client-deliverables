import * as THREE from 'three';

// Visual layer only: never alters model geometry, camera, or walking collisions.
export function installWallDimensions({view,groups,getCamera,getMode,getGroup,getBase=()=>0,getOccluders=()=>[]}){
 const controls=document.createElement('div');controls.className='wall-dimension-controls';
 controls.innerHTML='<label><input type="checkbox" aria-label="Wall dimensions"> Wall dimensions</label><select aria-label="Dimension floor" hidden></select><small hidden>≈ Model wall lengths in metres · includes openings · zoom in for short walls</small>';
 view.before(controls);const toggle=controls.querySelector('input'),select=controls.querySelector('select'),note=controls.querySelector('small');
 for(const g of groups){const o=document.createElement('option');o.value=g.id;o.textContent=g.label;select.append(o);}
 const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.classList.add('wall-dimension-overlay');svg.setAttribute('aria-hidden','true');svg.hidden=true;view.append(svg);
 const style=document.createElement('style');style.textContent='.wall-dimension-controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:8px 0;font:12px/1.4 system-ui}.wall-dimension-controls label{display:flex;align-items:center;gap:6px;min-height:36px}.wall-dimension-controls input{width:17px;height:17px;accent-color:#245d75}.wall-dimension-controls small{flex-basis:100%;color:#566b6c}.wall-dimension-controls select{min-height:36px;max-width:100%;font-size:12px}.wall-dimension-overlay{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}.wall-dimension-overlay[hidden]{display:none}.wall-dimension-controls [hidden]{display:none!important}';document.head.append(style);
 let last=0;const ray=new THREE.Raycaster();
 function update(force=false){
  if(!toggle.checked){svg.hidden=true;svg.replaceChildren();view.dataset.wallDimensionLabels='0';return;}
  const now=performance.now();if(!force&&now-last<80)return;last=now;
  const automatic=getGroup?.();if(automatic&&groups.some(g=>g.id===automatic))select.value=automatic;
  select.hidden=Boolean(automatic)||groups.length===1;
  const group=groups.find(g=>g.id===select.value);if(!group)return;
  const camera=getCamera();if(!camera)return;camera.updateMatrixWorld();
  const walk=getMode()==='walk',w=view.clientWidth,h=view.clientHeight;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.hidden=false;svg.replaceChildren();
  const base=getBase(group),obstacles=walk?getOccluders():[],labels=[],candidates=[];
  function project(p){const v=new THREE.Vector3(p[0],p[2],-p[1]).project(camera);return {x:(v.x+1)*w/2,y:(1-v.y)*h/2,z:v.z};}
  for(const row of group.walls){
   const a=[...row.a,base+(walk?1.30:1.14)],b=[...row.b,base+(walk?1.30:1.14)],mid=a.map((v,i)=>(v+b[i])/2),world=new THREE.Vector3(mid[0],mid[2],-mid[1]),distance=world.distanceTo(camera.position);
   if(walk&&distance>12)continue;
   const q=project(mid),pa=project(a),pb=project(b);if(q.z< -1||q.z>1||q.x<20||q.x>w-20||q.y<22||q.y>h-22||pa.z< -1||pb.z< -1)continue;
   const length=Math.hypot(pb.x-pa.x,pb.y-pa.y);if(length<26)continue;
   if(walk&&obstacles.length){ray.set(camera.position,world.clone().sub(camera.position).normalize());ray.far=Math.max(0,distance-.35);if(ray.intersectObjects(obstacles,false).some(hit=>hit.object.visible))continue;}
   candidates.push({row,pa,pb,q,distance,length});
  }
  candidates.sort((a,b)=>walk?a.distance-b.distance:b.length-a.length);
  const linesLayer=document.createElementNS(NS,'g'),labelsLayer=document.createElementNS(NS,'g');svg.append(linesLayer,labelsLayer);
  for(const c of candidates){
   if(walk&&labels.length>=4)break;
   const {pa,pb,q,row,length}=c,nx=-(pb.y-pa.y)/length,ny=(pb.x-pa.x)/length,off=12;
   const x=q.x+nx*off,y=q.y+ny*off,box={x:x-33,y:y-11,w:66,h:22};
   if(labels.some(r=>box.x<r.x+r.w+3&&box.x+box.w>r.x-3&&box.y<r.y+r.h+3&&box.y+box.h>r.y-3))continue;
   labels.push(box);
   const path=document.createElementNS(NS,'path');const ax=pa.x+nx*off,ay=pa.y+ny*off,bx=pb.x+nx*off,by=pb.y+ny*off;
   path.setAttribute('d',`M${ax},${ay} L${bx},${by} M${ax-nx*5},${ay-ny*5} l${nx*10},${ny*10} M${bx-nx*5},${by-ny*5} l${nx*10},${ny*10}`);path.setAttribute('stroke','#245d75');path.setAttribute('stroke-width','1.5');path.setAttribute('fill','none');linesLayer.append(path);
   const rect=document.createElementNS(NS,'rect');for(const [k,v] of Object.entries({x:box.x,y:box.y,width:box.w,height:box.h,rx:4,fill:'#fffef5',stroke:'#245d75','stroke-width':.7}))rect.setAttribute(k,String(v));labelsLayer.append(rect);
   const text=document.createElementNS(NS,'text');text.setAttribute('x',String(x));text.setAttribute('y',String(y+4));text.setAttribute('text-anchor','middle');text.setAttribute('fill','#173f51');text.setAttribute('font-family','system-ui');text.setAttribute('font-size','11');text.setAttribute('font-weight','600');text.textContent='≈ '+row.length.toFixed(2)+' m';
   const title=document.createElementNS(NS,'title');title.textContent=row.id+' · wall run including openings';text.append(title);labelsLayer.append(text);
  }
  view.dataset.wallDimensionLabels=String(labels.length);view.dataset.wallDimensionGroup=group.id;
 }
 toggle.onchange=()=>{select.hidden=!toggle.checked||groups.length===1;note.hidden=!toggle.checked;update(true);};select.onchange=()=>update(true);
 return {update,toggle,select};
}
