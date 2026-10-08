// Multi-level support: use the current feet height, never the highest floor overhead.
export function inPolygon(x,y,p){
 let c=false;
 for(let i=0,j=p.length-1;i<p.length;j=i++){
  const a=p[j],b=p[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));
  if(Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)<.00001)return true;
  if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;
 }return c;
}
export function createSiteWalker(config){
 const radius=.24,step=config.maxStep??.24,state={x:13,y:-10,z:config.groundZ??-.205,yaw:0,pitch:0,blocked:false,reason:''},limits=config.bounds;
 const enabled=b=>!b.role||!config.enabled||config.enabled(b.role);
 function heightAt(x,y,reference=state.z){
  const g=config.groundHeight?.(x,y)??config.groundZ??-.205;let best=Math.abs(g-reference)<=step+.002?g:-Infinity;
  for(const s of config.surfaces??[]){if(!enabled(s)||Math.abs(s.z-reference)>step+.002)continue;const b=s.bounds;if(x<b[0]-.00001||x>b[2]+.00001||y<b[1]-.00001||y>b[3]+.00001)continue;if(s.polygon&&!inPolygon(x,y,s.polygon))continue;best=Math.max(best,s.z);}
  return best;
 }
 function circleHit(x,y,b){
  if(!b.polygon){const cx=Math.max(b.min[0],Math.min(x,b.max[0])),cy=Math.max(b.min[1],Math.min(y,b.max[1]));return (x-cx)**2+(y-cy)**2<(radius-.008)**2;}
  if(inPolygon(x,y,b.polygon))return true;
  return b.polygon.some((a,i)=>{const c=b.polygon[(i+1)%b.polygon.length],dx=c[0]-a[0],dy=c[1]-a[1],u=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-u*dx,y-a[1]-u*dy)<radius-.008;});
 }
 function probe(x,y,reference=state.z){
  const z=heightAt(x,y,reference);if(!Number.isFinite(z))return {ok:false,reason:'floor edge'};
  if(x<=limits[0]+radius||x>=limits[1]-radius||y<=limits[2]+radius||y>=limits[3]-radius)return {ok:false,reason:'site edge'};
  if((config.boxes??[]).some(b=>enabled(b)&&x>b.min[0]-radius&&x<b.max[0]+radius&&y>b.min[1]-radius&&y<b.max[1]+radius))return {ok:false,reason:'building'};
  for(const b of [...(config.houseColliders??[]),...(config.buildingColliders??[])]){
   if(!enabled(b)||b.max[2]<=z+.028||b.min[2]>=z+1.8)continue;
   if(b.walkable&&b.max[2]<=z+step+.002)continue;
   if(b.kind==='stair'&&b.max[2]<=z+step+radius*.8)continue;
   if(circleHit(x,y,b))return {ok:false,reason:b.kind,id:b.id};
  }
  // Small foot footprint must stay supported at upper-floor and balcony edges.
  for(const [dx,dy] of [[.10,0],[-.10,0],[0,.10],[0,-.10]])if(!Number.isFinite(heightAt(x+dx,y+dy,z)))return {ok:false,reason:'floor edge'};
  return {ok:true,z};
 }
 function clear(x,y,z=state.z){return probe(x,y,z).ok;}
 function move(dx,dy){state.blocked=false;state.reason='';const n=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.035));for(let i=0;i<n;i++){
  const sx=dx/n,sy=dy/n,p=probe(state.x+sx,state.y+sy);if(p.ok){state.x+=sx;state.y+=sy;state.z=p.z;continue;}
  let moved=false;for(const [a,b] of [[sx,0],[0,sy]]){if(!a&&!b)continue;const q=probe(state.x+a,state.y+b);if(q.ok){state.x+=a;state.y+=b;state.z=q.z;moved=true;}}
  if(!moved){state.blocked=true;state.reason=p.id??p.reason;}
 }return state;}
 function teleport(p){const ref=p.feet[2]??(config.groundHeight?.(p.feet[0],p.feet[1])??config.groundZ??-.205),q=probe(p.feet[0],p.feet[1],ref);if(!q.ok)return false;Object.assign(state,{x:p.feet[0],y:p.feet[1],z:q.z,yaw:Math.atan2(p.look[0]-p.feet[0],p.look[1]-p.feet[1]),pitch:p.pitch??(p.look[2]!=null?Math.max(-1.15,Math.min(1.15,Math.atan2(p.look[2]-q.z-1.65,Math.hypot(p.look[0]-p.feet[0],p.look[1]-p.feet[1])))):0),blocked:false,reason:''});return true;}
 return {state,probe,move,clear,teleport,heightAt};
}

export function attachSiteWalk({camera,canvas,config,onChange}){
 canvas.tabIndex=0;const walker=createSiteWalker(config),held=new Set();let active=false,drag=null,last=0,eyeZ=walker.state.z+1.65;
 const speed=config.speed??3.465,tapScale=speed/2.1;
 function sync(){if(!active)return;const s=walker.state;camera.position.set(s.x,eyeZ,-s.y);camera.lookAt(s.x+Math.sin(s.yaw),eyeZ+Math.tan(s.pitch),-s.y-Math.cos(s.yaw));onChange?.(s);}
 function step(key,amount){const s=walker.state,forward=(key==='w'?1:key==='s'?-1:0),side=(key==='d'?1:key==='a'?-1:0);walker.move((Math.sin(s.yaw)*forward+Math.cos(s.yaw)*side)*amount,(Math.cos(s.yaw)*forward-Math.sin(s.yaw)*side)*amount);sync();}
 for(const button of document.querySelectorAll('[data-walk-key]')){
  button.addEventListener('pointerdown',e=>{if(!active)return;e.preventDefault();button.setPointerCapture(e.pointerId);held.add(button.dataset.walkKey);step(button.dataset.walkKey,.18*tapScale);});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>held.delete(button.dataset.walkKey));
  button.addEventListener('click',e=>{if(e.detail===0&&active)step(button.dataset.walkKey,.25*tapScale);});
 }
 const keys={ArrowUp:'w',ArrowDown:'s',ArrowLeft:'a',ArrowRight:'d',w:'w',a:'a',s:'s',d:'d'};
 window.addEventListener('keydown',e=>{if(!active||/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName))return;const k=keys[e.key];if(k){e.preventDefault();held.add(k);}});
 window.addEventListener('keyup',e=>held.delete(keys[e.key]));
 function stop(){held.clear();drag=null;}
 window.addEventListener('blur',stop);document.addEventListener('visibilitychange',stop);
 canvas.addEventListener('pointerdown',e=>{if(!active||drag)return;canvas.focus({preventScroll:true});drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!active||!drag||drag.id!==e.pointerId)return;walker.state.yaw+=(e.clientX-drag.x)*.004;walker.state.pitch=Math.max(-1.15,Math.min(1.15,walker.state.pitch-(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;sync();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,e=>{if(drag?.id===e.pointerId)drag=null;});
 return {walker,setActive(v){active=v;stop();eyeZ=walker.state.z+1.65;sync();},sync,teleport(p){const ok=walker.teleport(p);eyeZ=walker.state.z+1.65;sync();return ok;},tick(time){const dt=Math.min(.05,last?(time-last)/1000:0);last=time;if(active){const n=held.size>1?Math.SQRT1_2:1;for(const k of held)step(k,speed*dt*n);eyeZ+=(walker.state.z+1.65-eyeZ)*(1-Math.exp(-18*dt));sync();}}};
}
