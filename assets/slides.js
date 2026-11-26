/* Full-page scene navigation; no scroll animation and no dependencies. */
(()=>{'use strict';
 const root=document.documentElement, main=document.querySelector('main'), panels=[...main.querySelectorAll(':scope > section')], names=['Home','About','Services','Approach','Sectors','Contact','Index'];
 const controls=document.querySelector('.deck-nav'), links=document.getElementById('deck-links'), prev=document.getElementById('deck-prev'), next=document.getElementById('deck-next'), count=document.getElementById('deck-count'), header=document.getElementById('site-header');
 if(!panels.length||!controls)return;
 let current=-1, lockedUntil=0, lastWheel=0, wheelSum=0, wheelUsed=false, touch=null;
 panels.forEach((p,i)=>{const a=document.createElement('a');a.href='#'+p.id;a.textContent=names[i]||p.id;links.append(a);p.setAttribute('aria-label',names[i]||p.id);p.tabIndex=-1});
 const navAnchors=()=>[...document.querySelectorAll('a[href^="#"]')];
 function indexFor(hash){return panels.findIndex(p=>'#'+p.id===hash)}
 function show(i,source='direct',historyMode='push'){
   i=Math.max(0,Math.min(panels.length-1,i));if(i===current)return false;
   const old=panels[current], focusWasInside=old&&old.contains(document.activeElement);root.dataset.direction=i>current?'forward':'back';current=i;
   panels.forEach((p,j)=>{const on=j===i;p.classList.toggle('deck-active',on);p.classList.remove('deck-enter','deck-leaving');p.inert=!on;p.setAttribute('aria-hidden',String(!on));if(on)p.scrollTop=0});
   if(old&&!matchMedia('(prefers-reduced-motion: reduce)').matches){old.classList.add('deck-leaving');setTimeout(()=>old.classList.remove('deck-leaving'),480)}
   const p=panels[i];p.querySelector('.hero-inner')?.scrollTo(0,0);p.classList.add('deck-enter');
   if(focusWasInside)p.focus({preventScroll:true});
   header.classList.toggle('scrolled',i!==0);root.dataset.section=p.id;
   navAnchors().forEach(a=>{if(indexFor(a.hash)===i)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
   count.textContent=String(i+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');prev.disabled=i===0;next.disabled=i===panels.length-1;
   if(historyMode==='push'&&location.hash!=='#'+p.id){try{history.pushState(null,'','#'+p.id)}catch(e){}}
   if(source!=='init')lockedUntil=performance.now()+1050;
   window.dispatchEvent(new Event('ob-section-change'));return true;
 }
 root.classList.add('deck-mode');controls.hidden=false;show(Math.max(0,indexFor(location.hash)),'init','none');
 // Existing navigation and in-page calls to action switch scenes directly.
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const i=indexFor(a.hash);if(i<0)return;e.preventDefault();show(i,'direct');header.classList.toggle('scrolled',current!==0);});
 prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));
 function historySync(){const i=indexFor(location.hash);show(i<0?0:i,'history','none')};window.addEventListener('popstate',historySync);window.addEventListener('hashchange',historySync);
 // The old header handler can reset its scroll class when the menu closes.
 document.getElementById('menu-toggle')?.addEventListener('click',()=>header.classList.toggle('scrolled',current!==0));
 window.addEventListener('pageshow',()=>header.classList.toggle('scrolled',current!==0));
 function scroller(){const p=panels[current];return p.id==='home'?p.querySelector('.hero-inner'):p}
 function canScroll(dir){const s=scroller();if(!s)return false;return dir>0?s.scrollTop+s.clientHeight<s.scrollHeight-3:s.scrollTop>3}
 function menuOpen(){return document.getElementById('site-nav')?.classList.contains('open')||document.getElementById('contact-dialog')?.open}
 window.addEventListener('wheel',e=>{if(e.ctrlKey||menuOpen()||e.target.closest('textarea,select'))return;const now=performance.now();if(now-lastWheel>220){wheelSum=0;wheelUsed=false}lastWheel=now;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?window.innerHeight:1),dir=Math.sign(delta);if(!dir)return;if(canScroll(dir)&&!wheelUsed){wheelSum=0;return}e.preventDefault();if(wheelUsed||now<lockedUntil){wheelUsed=true;return}wheelSum+=delta;if(Math.abs(wheelSum)<42)return;wheelUsed=true;show(current+Math.sign(wheelSum),'wheel')},{passive:false});
 document.addEventListener('keydown',e=>{if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||menuOpen()||e.target.closest('input,textarea,select,[contenteditable=true]'))return;if(e.key===' '&&e.target.closest('button,a'))return;let dir=0;if(['ArrowDown','PageDown',' '].includes(e.key))dir=e.shiftKey&&e.key===' '?-1:1;if(['ArrowUp','PageUp'].includes(e.key))dir=-1;if(e.key==='Home'||e.key==='End'){e.preventDefault();show(e.key==='Home'?0:panels.length-1,'keyboard');return}if(!dir)return;if(canScroll(dir))return;e.preventDefault();if(!e.repeat&&performance.now()>=lockedUntil)show(current+dir,'keyboard')});
 main.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('input,textarea,select,button')){touch=null;return;}const t=e.touches[0];touch={x:t.clientX,y:t.clientY,up:canScroll(-1),down:canScroll(1)}},{passive:true});main.addEventListener('touchcancel',()=>touch=null,{passive:true});main.addEventListener('touchend',e=>{if(!touch||!e.changedTouches.length)return;const t=e.changedTouches[0],dy=touch.y-t.clientY,dx=touch.x-t.clientX,old=touch;touch=null;if(Math.abs(dy)<65||Math.abs(dy)<Math.abs(dx)*1.25||performance.now()<lockedUntil)return;if(dy>0&&!old.down)show(current+1,'touch');if(dy<0&&!old.up)show(current-1,'touch')},{passive:true});
})();
