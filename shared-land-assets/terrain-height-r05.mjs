// Pure height contract shared by display, planting and pedestrian navigation.
export function createTerrain(data,planId='country'){
 const g=data.grid,p=data.plans[planId],c=data.context,ground=-.205;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
 function raw(x,y){const u=clamp((x-g.min[0])/g.step,0,g.count-1),v=clamp((y-g.min[1])/g.step,0,g.count-1),i=Math.min(g.count-2,Math.floor(u)),j=Math.min(g.count-2,Math.floor(v)),a=u-i,b=v-j,at=(dx,dy)=>g.values[(j+dy)*g.count+i+dx];return (at(0,0)*(1-a)+at(1,0)*a)*(1-b)+(at(0,1)*(1-a)+at(1,1)*a)*b;}
 const bounds=pts=>[Math.min(...pts.map(p=>p[0])),Math.min(...pts.map(p=>p[1])),Math.max(...pts.map(p=>p[0])),Math.max(...pts.map(p=>p[1]))];
 const hb=bounds(p.house_envelope),centre=[(hb[0]+hb[2])/2,(hb[1]+hb[3])/2],datum=raw(...centre);
 const natural=(x,y)=>raw(x,y)-datum+ground;
 const pads=[...c.neighbours.map(n=>({...n,z:natural(...n.center),margin:.65,blend:3})),{...c.partner,z:natural(...c.partner.center),margin:.7,blend:3},
 {center:centre,size:[hb[2]-hb[0],hb[3]-hb[1]],z:ground,margin:.8,blend:4}];
 const pb=bounds(p.parking),pc=[(pb[0]+pb[2])/2,(pb[1]+pb[3])/2],parkingZ=natural(...pc);
 pads.push({center:pc,size:[pb[2]-pb[0],pb[3]-pb[1]],z:parkingZ,margin:.1,blend:2});
 function platform(x,y){let z=natural(x,y);for(const pad of pads){const a=(pad.angle_deg??0)*Math.PI/180,dx=x-pad.center[0],dy=y-pad.center[1],u=dx*Math.cos(a)+dy*Math.sin(a),v=-dx*Math.sin(a)+dy*Math.cos(a),d=Math.hypot(Math.max(0,Math.abs(u)-pad.size[0]/2-pad.margin),Math.max(0,Math.abs(v)-pad.size[1]/2-pad.margin));z+=(pad.z-z)*(1-smooth(d/pad.blend));}return z;}
 const paths=[{points:p.approach,z0:parkingZ,z1:ground},{points:c.partner_path,z0:parkingZ,z1:natural(...c.partner.center)}];
 function height(x,y){let z=platform(x,y);for(const path of paths){const lengths=path.points.slice(1).map((b,i)=>Math.hypot(b[0]-path.points[i][0],b[1]-path.points[i][1])),total=lengths.reduce((a,b)=>a+b,0);let best=Infinity,along=0,cumulative=0;for(let i=0;i<lengths.length;i++){const a=path.points[i],b=path.points[i+1],dx=b[0]-a[0],dy=b[1]-a[1],t=clamp(((x-a[0])*dx+(y-a[1])*dy)/lengths[i]**2,0,1),dist=Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy);if(dist<best){best=dist;along=(cumulative+t*lengths[i])/total;}cumulative+=lengths[i];}const target=path.z0+(path.z1-path.z0)*smooth(along),w=1-smooth((best-.65)/1.3);z+=(target-z)*w;}return z;}
 return {raw,natural,height,platform,pads,datum,plan:p,context:c,ground,parkingZ};
}
