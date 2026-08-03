(()=>{"use strict";
let INITIAL_DAYS=30;
let STEP=30;
let visibleDays=INITIAL_DAYS;

function apply(){
  const days=[...document.querySelectorAll(".chat-day")];
  if(days.length<=INITIAL_DAYS)return;
  days.forEach((day,index)=>{
    const filteredOut=day.dataset.filteredOut==="1";
    day.classList.toggle("performance-hidden",index>=visibleDays && !filteredOut);
  });
  const controls=document.querySelector("#archiveLoadControls");
  const status=document.querySelector("#archiveLoadStatus");
  const button=document.querySelector("#loadMoreDays");
  if(!controls||!status||!button)return;
  const shown=Math.min(visibleDays,days.length);
  controls.hidden=shown>=days.length;
  status.textContent=`Showing ${shown} of ${days.length} days`;
}

function loadMore(){
  visibleDays+=STEP;
  apply();
}

async function loadConfig(){
  try{
    const response=await fetch("data/config.json",{cache:"no-store"});
    if(!response.ok)return;
    const config=await response.json();
    INITIAL_DAYS=Number(config.archive?.progressiveDays)||30;
    STEP=Number(config.archive?.progressiveStep)||30;
    visibleDays=INITIAL_DAYS;
  }catch{}
}
document.querySelector("#loadMoreDays")?.addEventListener("click",loadMore);
document.addEventListener("archive:rendered",apply);
window.addEventListener("DOMContentLoaded",loadConfig);
document.addEventListener("archive:visibility-changed",()=>{
  // Search and exact filters should never be blocked by pagination.
  const hasSearch=(document.querySelector("#archiveSearch")?.value||"").trim();
  const hasDate=document.querySelector("#dateFilter")?.value;
  const hasYear=document.querySelector("#yearFilter")?.value;
  const hasMonth=document.querySelector("#monthFilter")?.value;
  if(hasSearch||hasDate||hasYear||hasMonth){
    document.querySelectorAll(".chat-day").forEach(day=>day.classList.remove("performance-hidden"));
    document.querySelector("#archiveLoadControls")?.setAttribute("hidden","");
  }else{
    apply();
  }
});
})();