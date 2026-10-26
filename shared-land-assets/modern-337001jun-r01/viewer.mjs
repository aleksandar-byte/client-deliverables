import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {attachSiteWalk} from '../walk-r07.mjs';
import {enhanceEnvironment} from '../realistic-environment-r05.mjs';
import {addTerrain} from './terrain.mjs';
import {addPartner} from '../igor-pascal-site-r01.mjs';
import {installIgorPlan} from '../igor-pascal-plan-r01.mjs';
import {installWallDimensions} from '../wall-dimensions-r02.mjs';
import {installParcelReview} from '../cadastral-review-r01.mjs';
const $=s=>document.querySelector(s),view=$('#view'),loader=new GLTFLoader();
const json=async name=>{const r=await fetch(new URL(name,import.meta.url));if(!r.ok)throw Error(name+' unavailable');return r.json();};
const scene=new THREE.Scene();scene.background=new THREE.Color('#dbe4e3');
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.localClippingEnabled=true;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;view.prepend(renderer.domElement);
const camera=new THREE.PerspectiveCamera(43,1,.08,800),planCamera=new THREE.OrthographicCamera(-30,30,30,-30,.1,800);
scene.add(new THREE.HemisphereLight(0xffffff,0x7f8b6a,1.8));const sun=new THREE.DirectionalLight(0xfff5e6,2);sun.position.set(25,45,20);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
let active=camera,mode='3d',orbit=new OrbitControls(camera,renderer.domElement),walkConfig,walk,root,house,igorPlan,parcelReview,terrain,wallDimensions;
const contextRoots=[],markers=[],dimensions=new THREE.Group(),clips=[],caps=new THREE.Group();scene.add(dimensions,caps);
const frames={houses:[-4,18,-33,16],house:[-3,16,-3,16],partner:[-3,16,-34,-13],whole:[-12,28,-61,35],neighbourhood:[-45,73,-78,65]};
function meta(o,k){for(let p=o;p;p=p.parent)if(p.userData[k]!==undefined)return p.userData[k];}
function updateContext(){
 renderer.shadowMap.enabled=mode!=='plan';
 if(house)house.traverse(o=>{if(!o.isMesh)return;const k=o.userData.kind;o.visible=k==='roof'?$('#roof').checked&&mode!=='plan':true;const m=Array.isArray(o.material)?o.material:[o.material];for(const mat of m)mat.clippingPlanes=mode==='plan'&&!['slab','roof'].includes(k)?[new THREE.Plane(new THREE.Vector3(0,-1,0),1.15)]:[];});
 caps.visible=mode==='plan';
 for(const r of contextRoots)r.traverse(o=>{const k=o.userData.contextRole;if(k==='planting')o.visible=$('#planting').checked;else if(k==='neighbour')o.visible=$('#context').checked;else if(k==='partner')o.visible=$('#partner').checked;else if(k==='backdrop')o.visible=false;});
 igorPlan?.update();parcelReview?.update();
}
function fit(){
 updateContext();document.body.dataset.mode=mode;$('#walk-pad').hidden=mode!=='walk';$('#walk-menu').hidden=mode!=='walk';$('#frame').disabled=mode==='walk';walk?.setActive(mode==='walk');
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
 if(mode==='walk'){active=camera;orbit.enabled=false;camera.fov=Math.min(75,2*Math.atan(Math.tan(75*Math.PI/360)/camera.aspect)*180/Math.PI);camera.updateProjectionMatrix();walk?.sync();$('#caption').textContent='Drag to look · hold arrows / WASD. Enter either house; Igor’s stairs reach the upper floor.';return;}
 orbit.dispose();active=mode==='plan'?planCamera:camera;orbit=new OrbitControls(active,renderer.domElement);orbit.enableDamping=true;orbit.maxPolarAngle=Math.PI*.49;orbit.minDistance=2;orbit.maxDistance=260;orbit.enableRotate=mode!=='plan';
 const b=frames[$('#frame').value],cx=(b[0]+b[1])/2,cy=(b[2]+b[3])/2,aspect=view.clientWidth/view.clientHeight,span=Math.max(b[1]-b[0],(b[3]-b[2])*aspect),ground=terrain?.height(cx,cy)??0;
 if(mode==='plan'){const half=Math.max((b[3]-b[2])/2,(b[1]-b[0])/aspect/2)*1.10;planCamera.left=-half*aspect;planCamera.right=half*aspect;planCamera.top=half;planCamera.bottom=-half;planCamera.up.set(0,0,-1);planCamera.position.set(cx,180,-cy);planCamera.updateProjectionMatrix();}
 else{camera.fov=43;camera.updateProjectionMatrix();const size=Math.max(b[1]-b[0],b[3]-b[2]),d=size/(2*Math.tan(43*Math.PI/360))*Math.max(1,1/aspect)*.88;camera.position.set(cx-d*.61,ground+d*.64,-cy+d*.55);}
 orbit.target.set(cx,ground,-cy);active.lookAt(orbit.target);orbit.update();$('#caption').textContent=mode==='plan'?'Plan cutaway · select Igor’s ground or upper floor. Enable dimensions or labels when needed.':'Drag to orbit · pinch or scroll to zoom. Glazed face points toward the tree/view side.';
}
function resize(){renderer.setSize(view.clientWidth,view.clientHeight,false);camera.aspect=view.clientWidth/view.clientHeight;camera.updateProjectionMatrix();fit();}
function addMarker(label,x,y,z){const el=document.createElement('span');el.className='label';el.textContent=label;$('#labels').append(el);markers.push({el,p:new THREE.Vector3(x,z,-y)});}
function wallCaps(walls){for(const w of walls){const length=Math.hypot(w.b[0]-w.a[0],w.b[1]-w.a[1]),d=[(w.b[0]-w.a[0])/length,(w.b[1]-w.a[1])/length],holes=w.openings.filter(h=>h.bottom<1.15&&h.bottom+h.height>1.15).sort((a,b)=>a.start-b.start);let cur=0;
 const strip=(a,b)=>{if(b-a<.001)return;const p=new THREE.Mesh(new THREE.BoxGeometry(b-a,.015,w.thickness),new THREE.MeshBasicMaterial({color:0x586058}));p.position.set(w.a[0]+d[0]*(a+b)/2,1.147,-w.a[1]-d[1]*(a+b)/2);p.rotation.y=Math.atan2(d[1],d[0]);caps.add(p);};for(const h of holes){strip(cur,h.start);cur=h.start+h.width;}strip(cur,length);}}
async function init(){
 const [siteGltf,contextGltf,homeGltf,nav,geometry,groups]=await Promise.all([loader.loadAsync(new URL('../country-site-r02.glb',import.meta.url).href),loader.loadAsync(new URL('../context-r05.glb',import.meta.url).href),loader.loadAsync(new URL('./model.glb',import.meta.url).href),json('./navigation.json'),json('./plan.json'),json('./dimension-groups.json')]);
 root=siteGltf.scene;const obsolete=[];root.traverse(o=>{if(!o.isMesh)return;const role=meta(o,'siteRole');if(!role||['tree','slope'].includes(role))obsolete.push(o);else o.userData.siteRole=role;});obsolete.forEach(o=>o.removeFromParent());scene.add(root);
 const ctx=contextGltf.scene;ctx.traverse(o=>{if(o.isMesh){for(const k of ['contextRole']){const m=meta(o,k);if(m!==undefined)o.userData[k]=m;}o.castShadow=true;o.receiveShadow=true;}});scene.add(ctx);contextRoots.push(ctx);
 house=homeGltf.scene;house.name='Alex · 337001JUN';house.traverse(o=>{if(!o.isMesh)return;o.userData.kind=meta(o,'kind');o.castShadow=!['window','slab'].includes(o.userData.kind);o.receiveShadow=true;for(const m of Array.isArray(o.material)?o.material:[o.material])m.side=THREE.DoubleSide;});scene.add(house);wallCaps(geometry.walls);
 walkConfig=nav;walkConfig.enabled=role=>role==='partner'?$('#partner').checked:role==='neighbour'?$('#context').checked:true;
 for(const [id,p] of Object.entries(walkConfig.places)){const opt=document.createElement('option');opt.value=id;opt.textContent=p.label;$('#walk-place').append(opt);}
 walk=attachSiteWalk({camera,canvas:renderer.domElement,config:walkConfig});resize();
 $('#status').textContent='Loading trees, ground and survey terrain…';
 await enhanceEnvironment({scene,renderer,sun,root,contextRoots,exteriorRoot:null,updateContext,planId:'country'});
 terrain=await addTerrain({scene,root,contextRoots,walkConfig,markers,dimensions,planId:'country'});
 const result=await addPartner({scene,contextRoots,walkConfig,markers,terrainHeight:terrain.height});
 wallDimensions=installWallDimensions({view,groups,getCamera:()=>active,getMode:()=>mode,getGroup:()=>$('#frame').value==='house'?'modern-ground':null,getBase:g=>g.id==='modern-ground'?0:result.group.position.y+(g.id.endsWith('upper')?3.3:0),getOccluders:()=>[house,result.group]});
 igorPlan=installIgorPlan({group:result.group,getMode:()=>mode,isVisible:()=>$('#partner').checked,getDimensions:()=>wallDimensions});
 parcelReview=await installParcelReview({scene,markers,terrainHeight:terrain.height,getMode:()=>mode});
 // Existing landscape batches use the former house exclusion. Clear the new footprint and entry path too.
 const matrix=new THREE.Matrix4(),v=new THREE.Vector3();for(const r of contextRoots)r.traverse(o=>{if(!o.isInstancedMesh)return;for(let i=0;i<o.count;i++){o.getMatrixAt(i,matrix);v.setFromMatrixPosition(matrix);const x=v.x,y=-v.z;if(x> -1.7&&x<14.5&&y> -1.5&&y<13.7||x>13.4&&x<15.4&&y> -7&&y<5){matrix.makeScale(0,0,0);o.setMatrixAt(i,matrix);}}o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere();});
 addMarker('Alex · 337001JUN',6,7,5);addMarker('Igor · LK1891',6,-23,terrain.height(6,-23.5)+8);addMarker('Shared parking',13,-10,terrain.height(13,-10)+.15);
 for(const r of geometry.floors[0].rooms)addMarker(r.label+' · ≈ '+r.reference_area_m2.toFixed(1)+' m²',...r.at,1.25);
 window.__sharedReview={scene,house,igor:result.group,walk,walkConfig,terrain,geometry,setMode:m=>{mode=m;fit();},get mode(){return mode;},setFrame:f=>{$('#frame').value=f;fit();}};
 const params=new URLSearchParams(location.search);if(frames[params.get('frame')])$('#frame').value=params.get('frame');if(['walk','plan','3d'].includes(params.get('view')))mode=params.get('view');
 const place=params.get('place')||'parking';if(walkConfig.places[place]){$('#walk-place').value=place;walk.teleport(walkConfig.places[place]);}
 document.body.dataset.loaded='true';document.body.dataset.revision='modern-shared-r01';$('#status').textContent='Ready · 337001JUN + Igor · survey-based terrain';fit();
}
for(const b of document.querySelectorAll('[data-mode]'))b.onclick=()=>{mode=b.dataset.mode;fit();};$('#frame').onchange=fit;
for(const id of ['roof','planting','context','partner','guides'])$('#'+id).onchange=updateContext;
$('#walk-place').onchange=()=>{mode='walk';fit();walk.teleport(walkConfig.places[$('#walk-place').value]);};
$('#reset').onclick=()=>{if(mode==='walk'){walk.teleport(walkConfig.places.parking);$('#walk-place').value='parking';}fit();};
new ResizeObserver(resize).observe(view);
renderer.setAnimationLoop(time=>{if(mode==='walk')walk?.tick(time);else orbit.update();wallDimensions?.update();renderer.render(scene,active);for(const m of markers){const p=m.p.clone().project(active);m.el.hidden=!$('#guides').checked||mode==='walk'||Math.abs(p.x)>1||Math.abs(p.y)>1||Math.abs(p.z)>1;m.el.style.left=(p.x+1)*view.clientWidth/2+'px';m.el.style.top=(1-p.y)*view.clientHeight/2+'px';}});
init().catch(e=>{console.error(e);document.body.dataset.loaded='error';$('#status').textContent='Could not finish loading. Reload to retry. '+e.message;});
