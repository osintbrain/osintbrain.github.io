/* OSINT Brain 1.4 — full-bleed neural tissue, projected from XYZ coordinates. */
(() => {
  'use strict';
  const hero = document.getElementById('home'), canvas = document.getElementById('neural-canvas');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let w=1,h=1, nodes=[], edges=[], dust=[], time=0, raf=0, last=0, visible=true, active=false, px=0,py=0, mx=0,my=0,seed=42;
  const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  function sprite(light=false){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,light?'rgba(112,15,40,1)':'rgba(255,245,239,1)');r.addColorStop(.065,light?'rgba(153,28,58,.98)':'rgba(255,172,166,.97)');r.addColorStop(.18,light?'rgba(173,45,76,.66)':'rgba(255,74,96,.65)');r.addColorStop(.42,light?'rgba(183,44,78,.16)':'rgba(214,30,66,.18)');r.addColorStop(1,'rgba(184,22,51,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return c;}
  const darkGlow=sprite(),lightGlow=sprite(true);
  function build(){
    seed=91713;nodes=[];edges=[];dust=[];
    const spacing=w<720?67:83, cols=Math.ceil(w/spacing)+2,rows=Math.ceil(h/spacing)+2;
    // A stratified 3-D volume extends past all four edges; nothing is boxed in.
    for(let iy=-1;iy<rows-1;iy++)for(let ix=-1;ix<cols-1;ix++){
      const x=(ix+.5+(rnd()-.5)*.94)*spacing-w/2,y=(iy+.5+(rnd()-.5)*.94)*spacing-h/2,z=(rnd()-.5)*1.65;
      nodes.push({x,y,z,phase:rnd()*6.283,size:.7+rnd()*1.3,hub:rnd()<.13});
      if(rnd()<.4)nodes.push({x:x+(rnd()-.5)*spacing,y:y+(rnd()-.5)*spacing,z:(rnd()-.5)*1.65,phase:rnd()*6.283,size:.55+rnd()*.8,hub:false});
    }
    const seen=new Set();
    nodes.forEach((n,i)=>{const near=nodes.map((m,j)=>({j,d:Math.hypot(n.x-m.x,n.y-m.y,(n.z-m.z)*spacing*.55)})).filter(v=>v.j!==i&&v.d<spacing*2.05).sort((a,b)=>a.d-b.d).slice(0,n.hub?5:3);for(const v of near){const key=[Math.min(i,v.j),Math.max(i,v.j)].join(':');if(seen.has(key))continue;seen.add(key);edges.push({a:i,b:v.j,bend:(rnd()-.5)*.48,phase:rnd(),speed:.12+rnd()*.24,signal:rnd()<.14});}});
    for(let i=0;i<Math.min(180,Math.round(w*h/6500));i++)dust.push({x:(rnd()-.5)*w*1.4,y:(rnd()-.5)*h*1.4,z:(rnd()-.5)*1.7,phase:rnd()*6.28});
  }
  function resize(){const b=hero.getBoundingClientRect(),nw=Math.max(1,b.width),nh=Math.max(1,b.height);if(nw===w&&nh===h)return;w=nw;h=nh;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);build();draw(0);}
  function project(n,drift){const p=3.6/(3.6-n.z);let x=w/2+n.x*p+mx*n.z*35,y=h/2+n.y*p+my*n.z*27;if(drift){x+=Math.sin(time*.52+n.phase)*9;y+=Math.cos(time*.46+n.phase)*9;}const dx=x-px,dy=y-py,d=Math.hypot(dx,dy),radius=w<720?135:230,f=active?Math.max(0,1-d/radius):0;if(drift&&f&&d>1){const push=32*f*f;x+=dx/d*push;y+=dy/d*push;}return{x,y,p,z:n.z,f};}
  function draw(dt){
    const light=document.documentElement.dataset.theme==='light',glow=light?lightGlow:darkGlow;time+=dt;const k=dt?1-Math.exp(-dt*5):0;mx+=((active?(px/w-.5)*2:0)-mx)*k;my+=((active?(py/h-.5)*2:0)-my)*k;
    ctx.clearRect(0,0,w,h);ctx.save();ctx.globalCompositeOperation=light?'source-over':'lighter';
    for(const n of dust){const p=project(n,false);ctx.fillStyle=`rgba(${light?'149,51,74':'227,101,119'},${.13+.15*(.5+.5*Math.sin(time*.6+n.phase))})`;ctx.beginPath();ctx.arc(p.x,p.y,p.p*.85,0,Math.PI*2);ctx.fill();}
    const pts=nodes.map(n=>project(n,true));
    for(const e of edges){const a=pts[e.a],b=pts[e.b];if((a.x<-50&&b.x<-50)||(a.y<-50&&b.y<-50)||(a.x>w+50&&b.x>w+50)||(a.y>h+50&&b.y>h+50))continue;const z=(a.z+b.z)/2,hot=Math.max(a.f,b.f),dx=b.x-a.x,dy=b.y-a.y,cx=(a.x+b.x)/2-dy*e.bend,cy=(a.y+b.y)/2+dx*e.bend;
      ctx.strokeStyle=`rgba(${light?'146,36,65':'222,47,76'},${Math.min(.75,.14+(z+.83)*.15+hot*.43)})`;ctx.lineWidth=.6+Math.max(0,z)*.65+hot*.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(cx,cy,b.x,b.y);ctx.stroke();
      if(e.signal||hot>.28){const t=(time*(e.speed+hot*.5)+e.phase)%1,s=1-t,x=s*s*a.x+2*s*t*cx+t*t*b.x,y=s*s*a.y+2*s*t*cy+t*t*b.y,r=5+hot*7;ctx.globalAlpha=.62+hot*.35;ctx.drawImage(glow,x-r,y-r,r*2,r*2);ctx.globalAlpha=1;}
    }
    const order=pts.map((_,i)=>i).sort((a,b)=>pts[a].z-pts[b].z);
    for(const i of order){const p=pts[i],n=nodes[i];if(p.x<-45||p.x>w+45||p.y<-45||p.y>h+45)continue;const pulse=.78+.22*Math.sin(time*1.45+n.phase),r=(n.hub?24:10)*n.size*p.p*(1+p.f*.65);ctx.globalAlpha=Math.min(1,(.48+(p.z+.83)*.25+p.f*.48)*pulse);ctx.drawImage(glow,p.x-r,p.y-r,r*2,r*2);ctx.globalAlpha=Math.min(1,.52+(p.z+.83)*.24+p.f*.4);ctx.fillStyle=light?(n.hub?'#78112f':'#b14461'):(n.hub?'#ffe2d9':'#ff9ba7');ctx.beginPath();ctx.arc(p.x,p.y,(n.hub?2.3:1.1)*n.size*p.p*(1+p.f*.3),0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;}
    ctx.restore();
  }
  function tick(now){raf=0;if(reduced.matches||!visible||document.hidden){last=0;return;}const dt=last?Math.min(.045,(now-last)/1000):.016;if(last&&dt<.026){raf=requestAnimationFrame(tick);return;}last=now;draw(dt);raf=requestAnimationFrame(tick);}
  function sync(){if(reduced.matches||!visible||document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;last=0;if(reduced.matches){active=false;mx=my=0;draw(0);}}else if(!raf)raf=requestAnimationFrame(tick);}
  function pointer(e){if(reduced.matches)return;const b=hero.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top;active=true;}
  function leave(){active=false;}
  hero.addEventListener('pointermove',pointer,{passive:true});hero.addEventListener('pointerdown',pointer,{passive:true});hero.addEventListener('pointerleave',leave);hero.addEventListener('pointercancel',leave);hero.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')leave();});
  reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;sync();},{threshold:.01}).observe(hero);
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(hero);else window.addEventListener('resize',resize);
  window.addEventListener('ob-theme-change',()=>draw(0));resize();sync();
})();
