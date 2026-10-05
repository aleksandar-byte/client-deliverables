import * as THREE from 'three';
const base=new URL('./meadow-r04/',import.meta.url);
// Pure placement helpers keep living ground outside built/proposed surfaces.
export function inside(x,y,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
function lineDistance(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t);}
function nearLine(x,y,pts,gap){return pts.slice(1).some((b,i)=>lineDistance(x,y,pts[i],b)<gap);}
function nearPoly(x,y,poly,gap){return inside(x,y,poly)||nearLine(x,y,[...poly,poly[0]],gap);}
export function placements(c,planId){
 let seed=c.seed;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 const p=c.plans[planId],partner=c.partner,[px,py]=partner.center,[w,d]=partner.size;
 const partnerPoly=[[px-w/2,py-d/2],[px+w/2,py-d/2],[px+w/2,py+d/2],[px-w/2,py+d/2]];
 const xs=c.parcel.map(v=>v[0]),ys=c.parcel.map(v=>v[1]),points=[];
 for(let x=Math.min(...xs);x<Math.max(...xs);x+=.6)for(let y=Math.min(...ys);y<Math.max(...ys);y+=.6){
  const xx=x+(random()-.5)*.58,yy=y+(random()-.5)*.58;
  if(!inside(xx,yy,c.parcel)||nearLine(xx,yy,[...c.parcel,c.parcel[0]],.32)||nearPoly(xx,yy,p.house,.7)||nearPoly(xx,yy,partnerPoly,.7)||nearPoly(xx,yy,c.parking,.5)||nearLine(xx,yy,p.path,1.0)||nearLine(xx,yy,c.partner_path,1.0))continue;
  const patch=.5+.25*Math.sin(xx*.61+Math.sin(yy*.34))+.25*Math.sin(yy*.83);
  if(random()<.06+patch*.12)continue;
  const dry=random()>.17+patch*.25;
  points.push({x:xx,y:yy,height:.28+random()*.25,rotation:random()*Math.PI*2,wide:1.2+random()*.5,dry,variant:'clump'});
  if(random()<.19)points.push({x:xx+.1,y:yy-.06,height:.45+random()*.3,rotation:random()*Math.PI*2,wide:.85+random()*.35,dry:true,variant:'stalk'});
 }
 return points;
}
export async function addMeadow({scene,loader,contextRoots,planId='country'}){
 const [c,gltf,dry,green]=await Promise.all([fetch(new URL('settings.json',base)).then(r=>{if(!r.ok)throw Error('Meadow settings unavailable');return r.json();}),loader.loadAsync(new URL('grass.glb',base).href),new THREE.TextureLoader().loadAsync(new URL('dry.webp',base).href),new THREE.TextureLoader().loadAsync(new URL('green.webp',base).href)]);
 for(const t of [dry,green]){t.colorSpace=THREE.SRGBColorSpace;t.flipY=false;t.anisotropy=2;}
 const points=placements(c,planId),group=new THREE.Group();group.name='Photo-informed rough meadow';scene.add(group);contextRoots.push(group);
 const mats=[dry,green].map((map,i)=>new THREE.MeshStandardMaterial({map,color:i?0xc5d09b:0xaa9054,roughness:1,metalness:0,side:THREE.DoubleSide,alphaTest:.4}));
 let triangles=0,batches=0;const dummy=new THREE.Object3D();gltf.scene.updateMatrixWorld(true);
 gltf.scene.traverse(src=>{if(!src.isMesh)return;const geometry=src.geometry.clone().applyMatrix4(src.matrixWorld);
  for(const isDry of [true,false]){const list=points.filter(p=>p.variant===src.name&&p.dry===isDry);if(!list.length)continue;
   const inst=new THREE.InstancedMesh(geometry,mats[isDry?0:1],list.length);inst.name='meadow_'+src.name+(isDry?'_dry':'_green');inst.userData.contextRole='planting';inst.receiveShadow=true;inst.castShadow=false;
   list.forEach((p,i)=>{dummy.position.set(p.x,c.ground_z,-p.y);dummy.rotation.set(0,p.rotation,0);dummy.scale.set(p.height*p.wide,p.height,p.height*p.wide);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);});inst.instanceMatrix.needsUpdate=true;inst.computeBoundingSphere();group.add(inst);batches++;triangles+=(geometry.index?geometry.index.count:geometry.attributes.position.count)/3*list.length;
  }
 });return {instances:points.length,triangles,batches};
}
