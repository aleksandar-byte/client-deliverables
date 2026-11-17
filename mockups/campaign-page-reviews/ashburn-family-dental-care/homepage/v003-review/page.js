(() => {
  const menu=document.querySelector('.mobile-menu');
  const close=()=>{menu.open=false;menu.querySelector('summary').focus();};
  document.querySelector('.menu-close')?.addEventListener('click',close);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.open)close();});
  let refreshTimer;
  const updateHours=()=>{
  const now=new Date();
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'long',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);
  const value=type=>parts.find(x=>x.type===type)?.value;
  const weekday=value('weekday');
  const weekdayOpen=!['Saturday','Sunday'].includes(weekday);
  const minutes=Number(value('hour'))*60+Number(value('minute'));
  const open=weekdayOpen&&minutes>=480&&minutes<1020;
  const status=document.querySelector('#open-status');
  status.hidden=!open;status.textContent=open?'Open now':'';
  const hours=document.querySelector('#today-hours');
  hours.textContent=weekdayOpen?'8am–5pm':'Closed';
  document.querySelector('#hours-label').textContent='Today';
  document.querySelector('#weekly-hours summary').setAttribute('aria-label',`Today, ${hours.textContent}. Show all office hours`);
  clearTimeout(refreshTimer);
  refreshTimer=setTimeout(updateHours,60000-now.getSeconds()*1000-now.getMilliseconds());
  };
  updateHours();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateHours();});
  window.addEventListener('pagehide',()=>clearTimeout(refreshTimer));
})();
