(() => {
 'use strict';
 document.documentElement.classList.add('js');
 const button=document.querySelector('#menu-toggle'),menu=document.querySelector('#site-menu'),label=button.querySelector('[data-menu-label]');
 const close=()=>{menu.classList.remove('is-open');button.setAttribute('aria-expanded','false');label.textContent='Menu';};
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));label.textContent=open?'Close':'Menu';menu.classList.toggle('is-open',open);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('is-open')){close();button.focus();}});
 document.addEventListener('click',event=>{if(menu.classList.contains('is-open')&&!menu.contains(event.target)&&!button.contains(event.target))close();});
 document.addEventListener('focusin',event=>{if(menu.classList.contains('is-open')&&!menu.contains(event.target)&&!button.contains(event.target))close();});
 menu.addEventListener('click',event=>{if(event.target.closest('a'))close();});
 window.matchMedia('(min-width:861px)').addEventListener('change',event=>{if(event.matches)close();});
})();
