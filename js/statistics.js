(()=>{"use strict";
function update(){
  const messages=window.ArchiveData?.sortedMessages||[];
  if(!messages.length)return;
  const newestMonth=messages[0].date.slice(0,7);
  const monthItems=messages.filter(m=>m.date.startsWith(newestMonth));
  const photos=monthItems.filter(m=>m.type==="image").length;
  const videos=monthItems.filter(m=>m.type==="video").length;
  const audio=monthItems.filter(m=>m.type==="audio").length;
  const target=document.querySelector("#monthlyBreakdown");
  if(target)target.textContent=`${photos} photo${photos===1?"":"s"} · ${videos} video${videos===1?"":"s"} · ${audio} voice message${audio===1?"":"s"}`;
}
document.addEventListener("archive:rendered",update);
})();