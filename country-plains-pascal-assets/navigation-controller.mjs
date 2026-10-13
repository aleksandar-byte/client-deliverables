export function createNavigation(data){
 const radius=.23;
 const inside=(p,poly)=>{let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;};
 function clear(p){
  if(!data.floors.some(f=>inside(p,f)))return false;
  for(const [dx,dz] of [[.1,0],[-.1,0],[0,.1],[0,-.1]])if(!data.floors.some(f=>inside([p[0]+dx,p[1]+dz],f)))return false;
  for(const w of data.walls){const dx=w.b[0]-w.a[0],dz=w.b[1]-w.a[1],len=Math.hypot(dx,dz),u=((p[0]-w.a[0])*dx+(p[1]-w.a[1])*dz)/len,v=Math.abs((p[0]-w.a[0])*dz-(p[1]-w.a[1])*dx)/len;if(u<-radius||u>len+radius||v>w.thickness/2+radius)continue;if(!w.holes.some(h=>u>h.center-h.width/2+radius+h.frame&&u<h.center+h.width/2-radius-h.frame))return false;}
  for(const b of data.boxes){const x=Math.max(b.min[0],Math.min(p[0],b.max[0])),z=Math.max(b.min[2],Math.min(p[1],b.max[2]));if((p[0]-x)**2+(p[1]-z)**2<radius**2)return false;}return true;
 }
 const rooms=[];
 for(const room of data.rooms){const xs=room.polygon.map(p=>p[0]),zs=room.polygon.map(p=>p[1]),center=[xs.reduce((a,b)=>a+b)/xs.length,zs.reduce((a,b)=>a+b)/zs.length];let point=null,best=Infinity;for(let x=Math.min(...xs);x<=Math.max(...xs);x+=.1)for(let z=Math.min(...zs);z<=Math.max(...zs);z+=.1){const d=(x-center[0])**2+(z-center[1])**2;if(d<best&&inside([x,z],room.polygon)&&clear([x,z])){point=[x,z];best=d;}}if(point)rooms.push({name:room.name,point});}
 function move(s,dx,dz){const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.035));dx/=count;dz/=count;for(let i=0;i<count;i++){if(clear([s.x+dx,s.z+dz])){s.x+=dx;s.z+=dz;}else{if(clear([s.x+dx,s.z]))s.x+=dx;if(clear([s.x,s.z+dz]))s.z+=dz;}}}
 return {rooms,clear,move,inside};
}
