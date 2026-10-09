import * as THREE from 'three';
export async function installParcelReview({scene,markers,terrainHeight,getMode}){
 const r=await fetch(new URL('./cadastral-review-r01.json',import.meta.url));if(!r.ok)throw Error('Parcel review unavailable');const data=await r.json();
 const group=new THREE.Group();group.name='Approximate cadastral boundary review';scene.add(group);
 for(const row of data.lines){const points=[];for(let i=1;i<row.points.length;i++){const a=row.points[i-1],b=row.points[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1]));for(let j=0;j<=n;j++){const x=a[0]+(b[0]-a[0])*j/n,y=a[1]+(b[1]-a[1])*j/n;points.push(new THREE.Vector3(x,(terrainHeight?.(x,y)??-.205)+.12,-y));}}
 const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineDashedMaterial({color:0x274946,dashSize:.75,gapSize:.5,depthTest:false,transparent:true,opacity:.65}));line.computeLineDistances();group.add(line);}
 const label=document.createElement('label');label.innerHTML='<input type="checkbox" checked> Parcel boundaries (approx.)';label.style.fontSize='12px';document.querySelector('.toolbar').append(label);const check=label.querySelector('input');
 const els=data.labels.map(row=>{const el=document.createElement('div');el.className='label parcel-label';el.style.cssText='font-size:10px;color:#284f4e;background:#fffdf1c9';el.textContent=row.text;document.querySelector('#labels').append(el);const [x,y]=row.at;markers.push({el,p:new THREE.Vector3(x,(terrainHeight?.(x,y)??-.205)+.2,-y)});return el;});
 const style=document.createElement('style');style.textContent='body:not([data-parcel-review="true"]) .parcel-label{display:none!important}';document.head.append(style);
 function update(){label.hidden=getMode()!=='plan';group.visible=getMode()==='plan'&&check.checked;document.body.dataset.parcelReview=String(group.visible);}
 check.onchange=update;update();return {update};
}
