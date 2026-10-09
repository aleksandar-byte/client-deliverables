import * as THREE from 'three';
import {createTerrain} from './terrain-height-r05.mjs';
export async function addTerrain({scene,root,contextRoots,walkConfig,markers,dimensions,planId}){
 const response=await fetch(new URL('./terrain-r07.json',import.meta.url));if(!response.ok)throw Error('Terrain data unavailable');
 const data=await response.json(),t=createTerrain(data,planId),remove=[],base=-.205;
 let groundMaterial,roadMaterial,pathMaterial,instances=0,buildings=0;
 const group=new THREE.Group();group.name='Approximate Copernicus terrain R05';scene.add(group);contextRoots.push(group);
 function deform(o,offset=null){
  // Split long triangles before draping, so roads/boundaries follow curved ground.
  o.updateWorldMatrix(true,false);const src=o.geometry.clone().applyMatrix4(o.matrixWorld).toNonIndexed(),p=src.attributes.position,uv=src.attributes.uv,verts=[],uvs=[];
  function triangle(a,b,c,depth=0){let edges=[[a,b,c],[b,c,a],[c,a,b]].sort((u,v)=>Math.hypot(v[0][0]-v[1][0],v[0][2]-v[1][2])-Math.hypot(u[0][0]-u[1][0],u[0][2]-u[1][2]));const [q,r,s]=edges[0];
   if(depth<16&&Math.hypot(q[0]-r[0],q[2]-r[2])>1.4){const mid=q.map((v,i)=>(v+r[i])/2);triangle(q,mid,s,depth+1);triangle(mid,r,s,depth+1);return;}
   for(const v of [a,b,c]){verts.push(v[0],t.height(v[0],-v[2])+(offset===null?v[1]-base:offset),v[2]);uvs.push(v[3],v[4]);}
  }
  for(let i=0;i<p.count;i+=3){const v=[];for(let j=0;j<3;j++)v.push([p.getX(i+j),p.getY(i+j),p.getZ(i+j),uv?.getX(i+j)??p.getX(i+j),uv?.getY(i+j)??-p.getZ(i+j)]);triangle(...v);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geo.computeVertexNormals();geo.computeBoundingSphere();
  const mesh=new THREE.Mesh(geo,o.material.clone());mesh.material.depthTest=true;mesh.name=o.name+'_terrain';mesh.userData={...o.userData};mesh.receiveShadow=true;mesh.castShadow=o.castShadow;group.add(mesh);remove.push(o);src.dispose();
 }
 root.traverse(o=>{if(!o.isMesh)return;const role=o.userData.siteRole;
  if(role==='land'){groundMaterial=o.material;remove.push(o);}
  else if(role==='road'){roadMaterial=o.material;remove.push(o);}
  else if(role==='path'){pathMaterial=o.material;remove.push(o);}
  else if(['parking','parking_mark','boundary','split'].includes(role))deform(o,role==='parking'?.025:role==='parking_mark'?.045:.055);
 });
 for(const ctx of contextRoots.filter(c=>c!==group)){
  // Anchored building groups translate as rigid units, keeping all floors level.
  ctx.traverse(o=>{if(o.userData.terrainAnchor){const a=o.userData.terrainAnchor;o.position.y+=t.natural(...a)-base;buildings++;}});
  ctx.traverse(o=>{if(!o.isMesh)return;const role=o.userData.contextRole,name=o.userData.sourceMaterialName??o.material?.name;
   if(o.isInstancedMesh){const m=new THREE.Matrix4(),v=new THREE.Vector3();for(let i=0;i<o.count;i++){o.getMatrixAt(i,m);v.setFromMatrixPosition(m);m.elements[13]+=t.height(v.x,-v.z)-base;o.setMatrixAt(i,m);instances++;}o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere();return;}
   if(role==='ground'||role==='backdrop'){remove.push(o);return;}
   if(['road','verge','path'].includes(name)){if(name==='road')roadMaterial??=o.material;if(name==='path')pathMaterial??=o.material;remove.push(o);return;}
   let anchored=false;for(let a=o;a;a=a.parent)if(a.userData.terrainAnchor){anchored=true;break;}
   if(!anchored&&role==='neighbour')deform(o); // utility poles / wires only
  });
 }
 // Remove obsolete flat surfaces and the unregistered decorative ridge.
 for(const o of remove)o.removeFromParent();
 function surface(xs,ys,material,offset=0){const positions=[],uv=[],idx=[];for(const y of ys)for(const x of xs){positions.push(x,t.height(x,y)+offset,-y);uv.push(x,y);}for(let j=0;j<ys.length-1;j++)for(let i=0;i<xs.length-1;i++){const k=j*xs.length+i;idx.push(k,k+1,k+xs.length,k+1,k+xs.length+1,k+xs.length);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();const m=new THREE.Mesh(geo,material);m.receiveShadow=true;group.add(m);return m;}
 const axis=[];for(let n=-300;n< -66;n+=6)axis.push(n);for(let n=-66;n<=66;n++)axis.push(n);for(let n=72;n<=300;n+=6)axis.push(n);
 const land=surface(axis,axis,groundMaterial);land.name='DSM terrain with provisional level platforms';
 function strip(points,width,material,role,offset=.035){for(let k=0;k<points.length-1;k++){const a=points[k],b=points[k+1],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),n=Math.ceil(len),w=Math.ceil(width),pos=[],uv=[],idx=[];for(let i=0;i<=n;i++)for(let j=0;j<=w;j++){const cross=(j/w-.5)*width,x=a[0]+dx*i/n-dy/len*cross,y=a[1]+dy*i/n+dx/len*cross;pos.push(x,t.height(x,y)+offset,-y);uv.push(x,y);}for(let i=0;i<n;i++)for(let j=0;j<w;j++){const q=i*(w+1)+j;idx.push(q,q+1,q+w+1,q+1,q+w+2,q+w+1);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();const m=new THREE.Mesh(geo,material);m.userData.contextRole=role;m.receiveShadow=true;group.add(m);}}
 for(const pts of [t.plan.road_centerline,t.context.context_road,t.context.road_connection]){strip(pts,6.3,pathMaterial,'road',.012);strip(pts,5,roadMaterial,'road',.025);}
 strip(t.plan.approach,1.2,pathMaterial,'path');strip(t.context.partner_path,1.2,pathMaterial,'partner');
 for(const marker of markers)marker.p.y+=t.height(marker.p.x,-marker.p.z)-base;
 dimensions.traverse(o=>{if(!o.isLine)return;const src=o.geometry.attributes.position,pts=[];for(let i=0;i<src.count-1;i++){const a=new THREE.Vector3().fromBufferAttribute(src,i),b=new THREE.Vector3().fromBufferAttribute(src,i+1),n=Math.max(1,Math.ceil(a.distanceTo(b)));for(let k=0;k<=n;k++){const v=a.clone().lerp(b,k/n);v.y+=t.height(v.x,-v.z)-base;pts.push(v);}}o.geometry=new THREE.BufferGeometry().setFromPoints(pts);});
 walkConfig.groundHeight=t.height;
 return {...t,revision:'terrain-r07-partner',instances,buildings,terrainTriangles:land.geometry.index.count/3};
}
