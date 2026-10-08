// Same source transform for GLB, collision, floors, stair polygons and room shortcuts.
export function partnerNavigation(world,z){
 const xy=p=>[11.5-p[0],-18.5-p[1]],point=p=>[...xy(p),z+p[2]];
 const bounds=b=>{const a=point(b.min),c=point(b.max);return {min:a.map((v,i)=>Math.min(v,c[i])),max:a.map((v,i)=>Math.max(v,c[i]))};};
 const colliders=world.colliders.map(b=>({...b,...bounds(b),role:'partner',polygon:b.polygon?.map(xy)}));
 const surfaces=world.surfaces.map(s=>{const a=xy(s.min),b=xy(s.max);return {id:s.id,role:'partner',bounds:[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[0],b[0]),Math.max(a[1],b[1])],z:z+s.z,polygon:s.polygon?.map(xy)};});
 const places=Object.fromEntries(world.viewpoints.map(v=>['lk-'+v.id,{label:'Partner · '+(v.floor==='upper'?'upstairs · ':'')+v.label,feet:point(v.feet),look:xy(v.look_at)}]));
 return {colliders,surfaces,places,xy,point};
}
