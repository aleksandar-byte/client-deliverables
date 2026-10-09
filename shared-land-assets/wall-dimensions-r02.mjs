import * as THREE from 'three';

// Visual layer only: never alters model geometry, camera, or walking collisions.
export function installWallDimensions({view,groups,getCamera,getMode,getGroup,getBase=()=>0,getOccluders=()=>[]}){
 const controls=document.createElement('div');controls.className='wall-dimension-controls';
 controls.innerHTML='<label><input type="checkbox" aria-label="Wall dimensions"> Wall dimensions</label><select aria-label="Dimension floor" hidden></select><small hidden>≈ Full wall runs between centre lines, including openings · not clear room/window widths</small>';
 view.before(controls);const toggle=controls.querySelector('input'),select=controls.querySelector('select'),note=controls.querySelector('small');
 for(const g of groups){const o=document.createElement('option');o.value=g.id;o.textContent=g.label;select.append(o);}
 const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.classList.add('wall-dimension-overlay');svg.setAttribute('aria-hidden','true');svg.hidden=true;view.append(svg);
 const style=document.createElement('style');style.textContent='.wall-dimension-controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:8px 0;font:12px/1.4 system-ui}.wall-dimension-controls label{display:flex;align-items:center;gap:6px;min-height:36px}.wall-dimension-controls input{width:17px;height:17px;accent-color:#245d75}.wall-dimension-controls small{flex-basis:100%;color:#566b6c}.wall-dimension-controls select{min-height:36px;max-width:100%;font-size:12px}.wall-dimension-overlay{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}.wall-dimension-overlay[hidden]{display:none}.wall-dimension-controls [hidden]{display:none!important}';document.head.append(style);
 let last=0;const ray=new THREE.Raycaster();
 function update(force=false){
  if(!toggle.checked){svg.hidden=true;svg.replaceChildren();view.dataset.wallDimensionLabels='0';return;}
  const now=performance.now();if(!force&&now-last<100)return;last=now;
  const automatic=getGroup?.();if(automatic&&groups.some(g=>g.id===automatic))select.value=automatic;
  select.hidden=Boolean(automatic)||groups.length===1;
  const group=groups.find(g=>g.id===select.value),camera=getCamera();if(!group||!camera)return;
  camera.updateMatrixWorld();camera.updateProjectionMatrix();
  const mode=getMode(),walk=mode==='walk',plan=mode==='plan',w=view.clientWidth,h=view.clientHeight;
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.hidden=false;svg.replaceChildren();
  const base=getBase(group),obstacles=plan?[]:getOccluders(),labels=[],candidates=[];
  const toWorld=p=>new THREE.Vector3(p[0],p[2],-p[1]);
  function project(p){const world=toWorld(p),local=world.clone().applyMatrix4(camera.matrixWorldInverse),v=world.project(camera);return {x:(v.x+1)*w/2,y:(1-v.y)*h/2,z:v.z,front:!camera.isPerspectiveCamera||local.z< -camera.near};}
  function visible(p){const target=toWorld(p),delta=target.clone().sub(camera.position),distance=delta.length();if(!obstacles.length)return true;ray.set(camera.position,delta.normalize());ray.far=Math.max(0,distance-.035);return !ray.intersectObjects(obstacles,false).some(hit=>{for(let o=hit.object;o;o=o.parent)if(!o.visible)return false;const mat=Array.isArray(hit.object.material)?hit.object.material[hit.face?.materialIndex??0]:hit.object.material;if(mat?.clippingPlanes?.some(p=>p.distanceToPoint(hit.point)<0))return false;return true;});}
  for(const row of group.walls){
   const dx=row.b[0]-row.a[0],dy=row.b[1]-row.a[1],n=[-dy/row.length,dx/row.length],mid=[(row.a[0]+row.b[0])/2,(row.a[1]+row.b[1])/2];
   // Attach to the camera-facing wall face in perspective; retain centreline runs in plan.
   const cameraSide=(camera.position.x-mid[0])*n[0]+(-camera.position.z-mid[1])*n[1]>=0?1:-1;
   const face=plan?0:(row.thickness/2+.04)*cameraSide;
   const a=[row.a[0]+n[0]*face,row.a[1]+n[1]*face,base+(plan?1.14:1.05)],b=[row.b[0]+n[0]*face,row.b[1]+n[1]*face,base+(plan?1.14:1.05)];
   const center=a.map((v,i)=>(v+b[i])/2),distance=toWorld(center).distanceTo(camera.position);
   if(walk&&distance>10)continue;
   const pa=project(a),pb=project(b);if(!pa.front||!pb.front||[pa,pb].some(p=>p.z< -1||p.z>1))continue;
   // Never draw a misleading fragment whose endpoint is outside the view.
   if([pa,pb].some(p=>p.x<8||p.x>w-8||p.y<8||p.y>h-8))continue;
   const length=Math.hypot(pb.x-pa.x,pb.y-pa.y);if(length<(plan?44:90))continue;
   if(!plan&&(!visible(center)||!visible(a.map((v,i)=>v*.8+b[i]*.2))||!visible(a.map((v,i)=>v*.2+b[i]*.8))))continue;
   let sign=1;
   if(row.outward){const q=project([center[0]+row.outward[0],center[1]+row.outward[1],center[2]]);sign=((q.x-(pa.x+pb.x)/2)*(-(pb.y-pa.y))+(q.y-(pa.y+pb.y)/2)*(pb.x-pa.x))>=0?1:-1;}
   candidates.push({row,pa,pb,distance,length,sign});
  }
  candidates.sort((a,b)=>walk?a.distance-b.distance:Number(Boolean(b.row.outward))-Number(Boolean(a.row.outward))||b.length-a.length);
  const linesLayer=document.createElementNS(NS,'g'),labelsLayer=document.createElementNS(NS,'g');svg.append(linesLayer,labelsLayer);
  const element=(name,attrs,parent)=>{const e=document.createElementNS(NS,name);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));parent.append(e);return e;};
  for(const c of candidates){
   if(labels.length>=(walk?3:w<500?9:16))break;
   const {pa,pb,row,length}=c,nx=-(pb.y-pa.y)/length,ny=(pb.x-pa.x)/length;
   let angle=plan?Math.atan2(pb.y-pa.y,pb.x-pa.x)*180/Math.PI:0;if(angle>90)angle-=180;if(angle< -90)angle+=180;
   const label=(plan?'≈ ':'Wall ≈ ')+row.length.toFixed(2)+' m',bw=plan?68:94,bh=22,r=angle*Math.PI/180;
   const ew=Math.abs(Math.cos(r))*bw+Math.abs(Math.sin(r))*bh,eh=Math.abs(Math.sin(r))*bw+Math.abs(Math.cos(r))*bh;
   let fit=null;
   for(const sign of row.outward?[c.sign]:[1,-1])for(const offset of plan?[20,34]:[16,30]){
    const off=sign*offset,x=(pa.x+pb.x)/2+nx*off,y=(pa.y+pb.y)/2+ny*off,box={x:x-ew/2,y:y-eh/2,w:ew,h:eh};
    if(box.x<5||box.y<5||box.x+box.w>w-5||box.y+box.h>h-5)continue;
    if(labels.some(r=>box.x<r.x+r.w+7&&box.x+box.w>r.x-7&&box.y<r.y+r.h+7&&box.y+box.h>r.y-7))continue;
    if(!fit)fit={x,y,box,off};
   }
   if(!fit)continue;const {x,y,box,off}=fit;labels.push(box);
   const ax=pa.x+nx*off,ay=pa.y+ny*off,bx=pb.x+nx*off,by=pb.y+ny*off;
   element('path',{d:`M${pa.x},${pa.y} L${ax+nx*4},${ay+ny*4} M${pb.x},${pb.y} L${bx+nx*4},${by+ny*4}`,stroke:'#245d75','stroke-width':.8,opacity:.65,fill:'none'},linesLayer);
   element('path',{d:`M${ax},${ay} L${bx},${by} M${ax-nx*4},${ay-ny*4} l${nx*8},${ny*8} M${bx-nx*4},${by-ny*4} l${nx*8},${ny*8}`,stroke:'#245d75','stroke-width':1.2,fill:'none'},linesLayer);
   const g=element('g',{transform:`translate(${x} ${y}) rotate(${angle})`,'data-wall-id':row.id,'data-length-m':row.length.toFixed(4)},labelsLayer);
   element('rect',{x:-bw/2,y:-bh/2,width:bw,height:bh,rx:3,fill:'#fffef5',stroke:'#245d75','stroke-width':.6},g);
   const text=element('text',{x:0,y:4,'text-anchor':'middle',fill:'#173f51','font-family':'system-ui','font-size':11,'font-weight':600},g);text.textContent=label;
   element('title',{},g).textContent=row.id+' · full centreline wall run including openings; not clear room/window width';
  }
  view.dataset.wallDimensionLabels=String(labels.length);view.dataset.wallDimensionGroup=group.id;
  note.textContent='≈ Full wall runs between centre lines, including openings · not clear room/window widths'+(labels.length?(plan?' · zoom for short walls':''):' · zoom out or use Plan to see whole walls');
 }
 toggle.onchange=()=>{select.hidden=!toggle.checked||groups.length===1;note.hidden=!toggle.checked;update(true);};select.onchange=()=>update(true);
 return {update,toggle,select};
}
