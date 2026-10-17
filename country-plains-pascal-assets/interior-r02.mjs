import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// Reversible finish/decor layer over the actual Pascal export. Metres, Y up.
// Original architecture, furniture transforms and navigation stay authoritative.
export function styleInterior(house, scene) {
  const group=new THREE.Group();group.name='Country Plains interior R02';scene.add(group);
  const originals=[], lights=[], additions=[];
  const palette={chalk:'#eee7da',linen:'#d4c3a6',olive:'#737c58',clay:'#ac6549',ink:'#363b35',oak:'#ad855b',brass:'#aa8750'};
  const mat=(name,color,roughness=.8,metalness=0)=>new THREE.MeshStandardMaterial({name,color,roughness,metalness});
  const M={chalk:mat('Warm chalk',palette.chalk),linen:mat('Oat linen',palette.linen),olive:mat('Muted olive',palette.olive),clay:mat('Terracotta',palette.clay),ink:mat('Soft charcoal',palette.ink),oak:mat('Natural oak',palette.oak),brass:mat('Aged brass',palette.brass,.35,.6),paper:mat('Art paper','#e9ddc6'),cream:mat('Warm ceramic','#e5d6bd'),blue:mat('Muted blue','#788b94')};
  function grain(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),d=x.createImageData(128,128);let seed=17;for(let i=0;i<d.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;let v=120+(seed%16);d.data.set([v,v,v,255],i);}x.putImageData(d,0,0);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(18,18);return t;}
  const weave=grain();M.linen.bumpMap=weave;M.linen.bumpScale=.008;M.chalk.bumpMap=weave;M.chalk.bumpScale=.002;
  const ancestors=n=>{const a=[];for(let p=n;p;p=p.parent)a.push(p);return a;};
  house.traverse(n=>{
    if(!n.isMesh)return;
    const chain=ancestors(n),labels=chain.map(p=>p.userData.label||p.name).join(' '),kinds=chain.map(p=>p.userData.kind);
    const source=Array.isArray(n.material)?n.material:[n.material];
    const changed=source.map(old=>{
      let c=old.clone(),name=old.name||'';
      if(kinds.includes('ceiling')){c.side=THREE.DoubleSide;c.color.set(palette.chalk);c.map=null;c.roughness=.92;}
      else if(n.name.startsWith('wall_')){c.color.set('#e8dfd0');c.roughness=.9;c.bumpMap=weave;c.bumpScale=.002;}
      if(name==='Interior_sage')c.color.set(palette.olive);
      if(name==='Interior_fabric'){
        c.color.set(/curtain/i.test(labels)?'#dfd1b8':/sofa/.test(labels)?'#c5b497':'#dfd1ba');c.roughness=.98;c.bumpMap=weave;c.bumpScale=.008;
      }
      if(name==='Interior_wood'){c.color.set('#c6ad8a');c.roughness=.66;}
      if(name==='Interior_quartz'){c.color.set('#e2d9c6');c.roughness=.42;}
      if(name==='Interior_brass'){c.color.set(palette.brass);c.metalness=.55;c.roughness=.38;}
      if(name==='Style_clay')c.color.set(/bedroom3/.test(labels)?'#9c7b51':/bedroom2/.test(labels)?'#778c99':palette.clay);
      if(name==='Interior_sage'&&/primary_bed/.test(labels))c.color.set('#6b7759');
      if(name==='Interior_sage'&&/bedroom2_bed/.test(labels))c.color.set('#6f8793');
      if(name==='Interior_shade'){c.color.set('#f0dfbc');c.emissive.set('#ffe1a0');c.emissiveIntensity=.45;}
      if(name==='CP_ceramic'&&/fireplace/.test(labels)){c.color.set('#b7ad98');c.roughness=.94;}
      return c;
    });
    originals.push({node:n,material:n.material,styled:Array.isArray(n.material)?changed:changed[0]});n.material=originals.at(-1).styled;
  });
  function add(mesh,name,p){mesh.name=name;mesh.position.set(...p);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;}
  function box(name,p,s,m){return add(new THREE.Mesh(new THREE.BoxGeometry(...s),m),name,p);}
  function sphere(name,p,s,m){const n=add(new THREE.Mesh(new THREE.SphereGeometry(1,24,16),m),name,p);n.scale.set(...s);return n;}
  function cylinder(name,p,r1,r2,h,m){return add(new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,32),m),name,p);}
  function rug(name,x,z,w,d,color){
    const body=box(name,[x,.009,z],[w,.014,d],mat(name,color));body.material.bumpMap=weave;body.material.bumpScale=.006;body.castShadow=false;
    for(const offset of [-1,1]){box(name+' woven border',[x,.018,z+offset*(d/2-.1)],[w-.08,.002,.035],M.clay).castShadow=false;}
    additions.push({name,type:'flat rug',bounds:{min:[x-w/2,0,z-d/2],max:[x+w/2,.02,z+d/2]}});
  }
  rug('Living woven rug',.1,2.75,2.7,3.2,'#c5b99e');
  rug('Primary bedside rug',-6.1,2.6,3,2.8,'#cbbca3');
  rug('Bedroom 2 rug',6.2,-2.8,2.4,2.5,'#b6c1bd');
  rug('Bedroom 3 rug',6.2,2.7,2.4,2.5,'#c9b497');
  // Wall reliefs face into each room; all details remain above furniture or on walls.
  function art(name,p,rotation,w,h,accent){
    const a=new THREE.Group();a.name=name;a.position.set(...p);a.rotation.y=rotation;group.add(a);
    const insert=(geo,m,pos)=>{const o=new THREE.Mesh(geo,m);o.position.set(...pos);o.castShadow=true;a.add(o);return o;};
    insert(new THREE.BoxGeometry(w+.06,h+.06,.04),M.oak,[0,0,0]);insert(new THREE.BoxGeometry(w,h,.012),M.paper,[0,0,.028]);
    insert(new THREE.CircleGeometry(w*.23,48),accent,[-w*.16,h*.13,.038]);
    insert(new THREE.PlaneGeometry(w*.72,h*.21),M.olive,[w*.05,-h*.22,.04]);
    const arch=new THREE.Shape();arch.moveTo(-w*.15,-h*.3);arch.lineTo(-w*.15,h*.05);arch.absarc(0,h*.05,w*.15,Math.PI,0,true);arch.lineTo(w*.15,-h*.3);arch.closePath();insert(new THREE.ShapeGeometry(arch),M.clay,[w*.21,0,.042]);
  }
  art('Living botanical geometry',[2.84,1.95,2.8],-Math.PI/2,1.5,.95,M.clay);
  art('Dining small landscape',[2.84,1.8,-1.65],-Math.PI/2,.75,.95,M.blue);
  art('Primary quiet landscape',[-7.48,1.95,2.6],Math.PI/2,1.4,.8,M.olive);
  art('Bedroom 2 print',[7.48,1.9,-2.8],-Math.PI/2,1,.7,M.blue);
  art('Bedroom 3 print',[7.48,1.9,2.7],-Math.PI/2,1,.7,M.clay);
  // Hearth insert stays inside the existing fireplace's envelope.
  box('Charcoal firebox',[-2.215,.54,2.9],[.012,.5,1.04],M.ink);
  box('Oak mantel',[-2.5,1.135,2.9],[.61,.03,1.72],M.oak);
  for(let i=0;i<3;i++)box('Coffee table books '+i,[.01,.48+i*.025,2.92],[.25,.022,.34],i===1?M.olive:M.paper);
  function vase(name,x,y,z,r=.09,h=.23){
    const pts=[[0,0],[r*.72,0],[r,h*.28],[r*.8,h*.7],[r*.42,h*.88],[r*.45,h]].map(p=>new THREE.Vector2(...p));
    const v=add(new THREE.Mesh(new THREE.LatheGeometry(pts,32),M.clay),name,[x,y,z]);
    cylinder(name+' dark opening',[x,y+h-.006,z],r*.35,r*.35,.005,M.ink);
    for(let i=0;i<3;i++){const stem=box(name+' stem',[x+(i-1)*.025,y+h+.12,z],[.004,.27,.004],M.olive);stem.rotation.z=(i-1)*.12;sphere(name+' leaf',[x+(i-1)*.06,y+h+.21,z],[.035,.08,.008],M.olive).rotation.z=(i-1)*.6;}
    return v;
  }
  vase('Dining terracotta vase',.42,.779,-.98,.1,.22);
  vase('Mantel vase',-2.5,1.15,3.45,.085,.2);
  vase('Kitchen ceramic herbs',-2.53,.914,-2.8,.075,.17);
  // Small tiled splashback and an oak display shelf above the existing worktop.
  const tiles=['#ded4bf','#d5cbb5','#e8dfca','#ddd0b9'].map((c,i)=>mat('Handmade tile '+i,c,.3));
  box('Splashback grout',[-2.866,1.22,-3.94],[.014,.58,2.78],M.paper);
  for(let row=0;row<4;row++)for(let col=0;col<9;col++)box('Cream splashback tile',[-2.854,.999+row*.145,-5.17+col*.307],[.018,.137,.298],tiles[(row*3+col)%4]);
  box('Oak kitchen shelf',[-2.7,1.82,-2.98],[.3,.035,.8],M.oak);
  cylinder('Shelf ceramic bowl',[-2.65,1.89,-2.9],.105,.065,.1,M.cream);
  cylinder('Shelf olive cup',[-2.66,1.91,-3.2],.05,.04,.14,M.olive);
  const oliveCushion=add(new THREE.Mesh(new RoundedBoxGeometry(.26,.38,.42,3,.08),M.olive),'Olive linen cushion',[1.79,.72,1.95]);oliveCushion.rotation.z=.15;
  const clayCushion=add(new THREE.Mesh(new RoundedBoxGeometry(.26,.34,.43,3,.075),M.clay),'Clay linen cushion',[1.79,.7,3.5]);clayCushion.rotation.z=.12;
  function light(p,intensity,color='#ffdfb1',distance=7){const l=new THREE.PointLight(color,intensity,distance,2);l.position.set(...p);l.userData.dayIntensity=intensity;group.add(l);lights.push(l);return l;}
  function tableLamp(x,z){
    cylinder('Bedside ceramic base',[x,.55,z],.06,.1,.18,M.cream);
    cylinder('Bedside shade',[x,.78,z],.105,.15,.23,M.linen);
    const glow=mat('Warm lamp lining','#f4dbad');glow.emissive.set('#ffd391');glow.emissiveIntensity=.65;
    cylinder('Bedside diffuser',[x,.665,z],.135,.135,.008,glow);light([x,.72,z],.65,'#ffd7a0',3);
  }
  tableLamp(-6.98,3.96);tableLamp(-6.98,1.27);tableLamp(7.01,-1.45);tableLamp(7.01,3.96);
  light([0,2.65,2.75],6,'#fff0d5',7);light([0,2.6,-2.8],8,'#fff0da',7);
  light([-5.8,2.65,2.6],5,'#fff0da',6);light([5.4,2.65,-2.8],5,'#ffefd9',6);light([5.4,2.65,2.8],5,'#ffefd9',6);
  light([-5.7,2.65,-1],4,'#fff0d7',5);light([5.5,2.65,0],4,'#fff0d7',4);
  const pool=new THREE.SpotLight('#fff0d7',9,6,1.05,.75,2);pool.position.set(0,2.07,-.95);pool.target.position.set(0,0,-.95);pool.castShadow=true;pool.shadow.mapSize.set(512,512);pool.shadow.bias=-.0001;pool.shadow.normalBias=.02;pool.userData.dayIntensity=9;group.add(pool,pool.target);lights.push(pool);
  const snapshot={revision:'interior-r02',palette,added: additions,architecture:'Unmodified actual Pascal version 82 export',sourceFurniture:'Original transforms retained',navigation:'Unchanged; additions are rugs, wall art, lights or within existing furniture envelopes'};
  let enabled=true;
  function enable(value){enabled=value;group.visible=value;originals.forEach(o=>o.node.material=value?o.styled:o.material);document.body.dataset.interior=value?'r02':'original';}
  function mood(evening){lights.forEach(l=>l.intensity=l.userData.dayIntensity*(evening?2.2:1));}
  function mode(value){group.children.forEach(n=>{if(n.isLight)n.visible=value!=='plan';});}
  enable(true);return {group,enable,mood,mode,snapshot};
}
