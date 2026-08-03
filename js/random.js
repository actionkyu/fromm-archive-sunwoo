(()=>{"use strict";
function closeDrawer(){
  document.querySelector("#menuClose")?.click();
}
function goRandom(){
  const messages=window.ArchiveData?.sortedMessages||[];
  if(!messages.length)return;
  const selected=messages[Math.floor(Math.random()*messages.length)];
  closeDrawer();
  const dateFilter=document.querySelector("#dateFilter");
  const year=document.querySelector("#yearFilter");
  const month=document.querySelector("#monthFilter");
  const search=document.querySelector("#archiveSearch");
  if(year)year.value="";
  if(month)month.value="";
  if(search){search.value="";search.dispatchEvent(new Event("input",{bubbles:true}))}
  if(dateFilter){dateFilter.value=selected.date;dateFilter.dispatchEvent(new Event("change",{bubbles:true}))}
  location.hash=`msg-${selected.id}`;
  requestAnimationFrame(()=>document.getElementById(`msg-${selected.id}`)?.scrollIntoView({behavior:"smooth",block:"center"}));
}
document.querySelector("#randomMessage")?.addEventListener("click",goRandom);
})();