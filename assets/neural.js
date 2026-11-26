/* OSINT Brain | Procedural neural field, real 3-axis perspective math on Canvas 2D. */
(() => {
  'use strict';
  const scene = document.getElementById('neural-scene');
  const canvas = document.getElementById('neural-canvas');
  const button = document.getElementById('neural-pause');
  if (!scene || !canvas || !button) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) { button.hidden = true; return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, raf = 0, last = 0, time = 0;
  let w = 1, h = 1, scale = 1, yaw = -.12, pitch = -.08;
  let px = 0, py = 0, active = false, mx = 0, my = 0;
  let seed = 91713;
  const rnd = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const nodes = [], edges = [], dust = [];
  // Two irregular three-dimensional hemispheres; denser surface and sparse internal cells.
  const count = 114;
  for (const side of [-1, 1]) {
    for (let i = 0; i < count; i++) {
      const a = rnd()*Math.PI*2, u = 2*rnd()-1, r = Math.sqrt(1-u*u);
      const shell = i < count*.78 ? .83+rnd()*.17 : .28+rnd()*.55;
      const folds = 1+.075*Math.sin(a*7+u*9)+.055*Math.cos(a*11-u*7);
      const x = side*(.49 + .47*r*Math.cos(a)*shell*folds);
      const y = u*.71*shell*folds - .04;
      const z = r*Math.sin(a)*.64*shell*folds;
      nodes.push({x,y,z,side,phase:rnd()*6.283, size:.65+rnd()*1.15, hub:rnd()>.91});
    }
  }
  // Local neuronal branches plus a few cross-hemisphere connections.
  const keys = new Set();
  nodes.forEach((n,i) => {
    const near = nodes.map((m,j)=>({j,d:Math.hypot(n.x-m.x,n.y-m.y,n.z-m.z)}))
      .filter(o=>o.j!==i && o.d<.46 && (nodes[o.j].side===n.side || o.d<.18)).sort((a,b)=>a.d-b.d).slice(0,n.hub?6:3);
    near.forEach(({j,d})=>{const key=[Math.min(i,j),Math.max(i,j)].join(':');if(keys.has(key))return;keys.add(key);edges.push({a:i,b:j,d,bend:(rnd()-.5)*.19,phase:rnd(),speed:.13+rnd()*.22,signal:rnd()<.20});});
  });
  for(let i=0;i<68;i++) dust.push({x:(rnd()-.5)*2.7,y:(rnd()-.5)*2.05,z:(rnd()-.5)*1.8,phase:rnd()*6.28});
  function sprite(){const c=document.createElement('canvas');c.width=c.height=80;const x=c.getContext('2d');const g=x.createRadialGradient(40,40,0,40,40,40);g.addColorStop(0,'rgba(255,226,223,1)');g.addColorStop(.09,'rgba(255,120,131,.94)');g.addColorStop(.22,'rgba(255,56,87,.58)');g.addColorStop(.48,'rgba(199,23,56,.14)');g.addColorStop(1,'rgba(199,23,56,0)');x.fillStyle=g;x.fillRect(0,0,80,80);return c;}
  const glow=sprite();
  function resize(){const b=scene.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);const dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);scale=Math.min(w*.40,h*.54);draw(0);}
  function project(n,drift){
    const t=time;let x=n.x,y=n.y,z=n.z;
    if(drift){const s=n.phase; x+=Math.sin(t*.7+s)*.015;y+=Math.cos(t*.8+s)*.016;z+=Math.sin(t*.6+s)*.018;}
    const cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch);
    const X=x*cy+z*sy,Z=-x*sy+z*cy,Y=y*cx-Z*sx,depth=y*sx+Z*cx;
    const p=3.8/(3.8-depth);let X2=w*.5+X*p*scale,Y2=h*.47+Y*p*scale;
    const d=Math.hypot(X2-px,Y2-py),f=active?Math.max(0,1-d/(Math.min(w,h)*.34)):0;
    if(drift&&f){X2+=(X2-px)*f*.17;Y2+=(Y2-py)*f*.17;}
    return {x:X2,y:Y2,z:depth,p,f};
  }
  function draw(dt){
    time+=dt; const easing=dt?1-Math.exp(-dt*5):0;
    mx+=(active?(px/w-.5)*2-mx:-mx)*easing;my+=(active?(py/h-.5)*2-my:-my)*easing;
    const ty=-.15+Math.sin(time*.35)*.18+mx*.65,tx=-.13-my*.38+Math.cos(time*.25)*.07;
    yaw+=(ty-yaw)*easing;pitch+=(tx-pitch)*easing;
    ctx.clearRect(0,0,w,h);ctx.save();ctx.globalCompositeOperation='lighter';
    for(const d of dust){const p=project(d,false);ctx.fillStyle=`rgba(194,83,105,${.09+.11*(.5+.5*Math.sin(time*.8+d.phase))})`;ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.45,p.p*.7),0,Math.PI*2);ctx.fill();}
    const points=nodes.map(n=>project(n,true));
    // Connections are gently curved, depth shaded, and carry animated light impulses.
    for(const e of edges){const a=points[e.a],b=points[e.b];const z=(a.z+b.z)/2;const hot=Math.max(a.f,b.f);const dx=b.x-a.x,dy=b.y-a.y;const cx=(a.x+b.x)/2-dy*e.bend,cy=(a.y+b.y)/2+dx*e.bend;
      const alpha=Math.min(.65,.105+(z+.7)*.13+hot*.40);ctx.strokeStyle=`rgba(220,45,79,${alpha})`;ctx.lineWidth=(.45+Math.max(0,z)*.65+hot*.75);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(cx,cy,b.x,b.y);ctx.stroke();
      if(e.signal||hot>.22){const t=(time*(e.speed+hot*.6)+e.phase)%1,s=1-t;const X=s*s*a.x+2*s*t*cx+t*t*b.x,Y=s*s*a.y+2*s*t*cy+t*t*b.y;const radius=3.5+hot*5;ctx.globalAlpha=.45+hot*.4;ctx.drawImage(glow,X-radius,Y-radius,radius*2,radius*2);ctx.globalAlpha=1;}
    }
    const order=points.map((p,i)=>i).sort((a,b)=>points[a].z-points[b].z);
    for(const i of order){const p=points[i],n=nodes[i],pulse=.76+.24*Math.sin(time*1.8+n.phase);const radius=(n.hub?10:5.4)*n.size*p.p*(1+p.f*.8);ctx.globalAlpha=Math.min(1,(.43+(p.z+.8)*.27+p.f*.5)*pulse);ctx.drawImage(glow,p.x-radius,p.y-radius,radius*2,radius*2);ctx.globalAlpha=Math.min(1,.55+p.f*.45+(p.z+.4)*.20);ctx.fillStyle=n.hub?'#ffe0d9':'#ff9aa8';ctx.beginPath();ctx.arc(p.x,p.y,(n.hub?1.9:1.05)*n.size*p.p*(1+p.f*.35),0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;}
    ctx.restore();scene.classList.add('ready');
  }
  function tick(now){raf=0;if(paused||!visible||document.hidden){last=0;return;}const dt=last?Math.min(.05,(now-last)/1000):.016;last=now;draw(dt);raf=requestAnimationFrame(tick);}
  function sync(){button.textContent=paused?'Putar animasi':'Jeda animasi';button.setAttribute('aria-pressed',String(paused));if(paused||!visible||document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;last=0;}else if(!raf)raf=requestAnimationFrame(tick);}
  function pointer(e){const b=canvas.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top;active=true;}
  function leave(){active=false;}
  canvas.addEventListener('pointermove',pointer);canvas.addEventListener('pointerdown',pointer);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointercancel',leave);canvas.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')leave();});
  button.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',e=>{paused=e.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.03}).observe(scene);
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(scene);else window.addEventListener('resize',resize);
  resize();sync();
})();
