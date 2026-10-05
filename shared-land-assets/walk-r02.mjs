// Flat-datum outdoor navigation; conservative building envelopes, no terrain physics.
export function createSiteWalker(config){
 const radius=.24,state={x:13,y:-10,yaw:Math.atan2(-6,13),pitch:0,blocked:false};
 const boxes=config.boxes,limits=config.bounds;
 function clear(x,y){return x>limits[0]+radius&&x<limits[1]-radius&&y>limits[2]+radius&&y<limits[3]-radius&&!boxes.some(b=>(!config.enabled||config.enabled(b.role))&&x>b.min[0]-radius&&x<b.max[0]+radius&&y>b.min[1]-radius&&y<b.max[1]+radius);}
 function move(dx,dy){state.blocked=false;const n=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.04));for(let i=0;i<n;i++){if(clear(state.x+dx/n,state.y))state.x+=dx/n;else state.blocked=true;if(clear(state.x,state.y+dy/n))state.y+=dy/n;else state.blocked=true;}}
 function teleport(p){if(!clear(p.feet[0],p.feet[1]))return false;state.x=p.feet[0];state.y=p.feet[1];state.yaw=Math.atan2(p.look[0]-state.x,p.look[1]-state.y);state.pitch=0;state.blocked=false;return true;}
 return {state,move,clear,teleport};
}

export function attachSiteWalk({camera,canvas,config,onChange}){
 canvas.tabIndex=0;const walker=createSiteWalker(config),held=new Set();let active=false,drag=null,last=0;
 function sync(){if(!active)return;const s=walker.state;camera.position.set(s.x,1.445,-s.y);camera.lookAt(s.x+Math.sin(s.yaw),1.445+Math.tan(s.pitch),-s.y-Math.cos(s.yaw));onChange?.(s);}
 function step(key,amount){const s=walker.state,forward=(key==='w'?1:key==='s'?-1:0),side=(key==='d'?1:key==='a'?-1:0);walker.move((Math.sin(s.yaw)*forward+Math.cos(s.yaw)*side)*amount,(Math.cos(s.yaw)*forward-Math.sin(s.yaw)*side)*amount);sync();}
 for(const button of document.querySelectorAll('[data-walk-key]')){
  button.addEventListener('pointerdown',e=>{if(!active)return;e.preventDefault();button.setPointerCapture(e.pointerId);held.add(button.dataset.walkKey);step(button.dataset.walkKey,.18);});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>held.delete(button.dataset.walkKey));
  button.addEventListener('click',e=>{if(e.detail===0&&active)step(button.dataset.walkKey,.25);});
 }
 const keys={ArrowUp:'w',ArrowDown:'s',ArrowLeft:'a',ArrowRight:'d',w:'w',a:'a',s:'s',d:'d'};
 window.addEventListener('keydown',e=>{if(!active||/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName))return;const k=keys[e.key];if(k){e.preventDefault();held.add(k);}});
 window.addEventListener('keyup',e=>held.delete(keys[e.key]));
 function stop(){held.clear();drag=null;}
 window.addEventListener('blur',stop);document.addEventListener('visibilitychange',stop);
 canvas.addEventListener('pointerdown',e=>{if(!active||drag)return;canvas.focus({preventScroll:true});drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!active||!drag||drag.id!==e.pointerId)return;walker.state.yaw+=(e.clientX-drag.x)*.004;walker.state.pitch=Math.max(-1.15,Math.min(1.15,walker.state.pitch-(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;sync();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,e=>{if(drag?.id===e.pointerId)drag=null;});
 return {walker,setActive(v){active=v;stop();sync();},sync,teleport(p){const ok=walker.teleport(p);sync();return ok;},tick(time){const dt=Math.min(.05,last?(time-last)/1000:0);last=time;if(active){const n=held.size>1?Math.SQRT1_2:1;for(const k of held)step(k,2.1*dt*n);}}};
}
