(()=>{"use strict";
const summary=document.querySelector("#statsSummary");
const body=document.querySelector("#statsTableBody");
const yearFilter=document.querySelector("#statsYearFilter");
let rows=[];

const esc=v=>window.ArchiveHelpers.escapeHTML(v??"");

function aggregate(messages){
  const map=new Map();
  for(const m of messages){
    const key=m.date.slice(0,7);
    if(!map.has(key))map.set(key,{month:key,messages:0,photos:0,videos:0,audio:0,days:new Set()});
    const row=map.get(key);
    row.messages++;
    row.days.add(m.date);
    if(m.type==="image")row.photos++;
    if(m.type==="video")row.videos++;
    if(m.type==="audio")row.audio++;
  }
  return [...map.values()].map(r=>({...r,activeDays:r.days.size})).sort((a,b)=>b.month.localeCompare(a.month));
}

function renderSummary(messages){
  const total=messages.length;
  const photos=messages.filter(m=>m.type==="image").length;
  const videos=messages.filter(m=>m.type==="video").length;
  const audio=messages.filter(m=>m.type==="audio").length;
  summary.innerHTML=`
    <article class="stats-card"><span>Messages</span><strong>${total}</strong></article>
    <article class="stats-card"><span>Photos</span><strong>${photos}</strong></article>
    <article class="stats-card"><span>Videos</span><strong>${videos}</strong></article>
    <article class="stats-card"><span>Voice messages</span><strong>${audio}</strong></article>`;
}

function renderTable(){
  const year=yearFilter.value;
  const filtered=rows.filter(r=>!year||r.month.startsWith(year));
  body.innerHTML=filtered.map(r=>{
    const label=new Intl.DateTimeFormat("en-GB",{month:"long",year:"numeric"}).format(new Date(`${r.month}-01T12:00:00`));
    return `<tr><td>${esc(label)}</td><td>${r.messages}</td><td>${r.photos}</td><td>${r.videos}</td><td>${r.audio}</td><td>${r.activeDays}</td></tr>`;
  }).join("")||'<tr><td colspan="6">No statistics available.</td></tr>';
}

async function init(){
  try{
    const response=await fetch("../data/messages.json",{cache:"no-store"});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    const messages=data.messages||[];
    rows=aggregate(messages);
    renderSummary(messages);
    const years=[...new Set(rows.map(r=>r.month.slice(0,4)))];
    yearFilter.innerHTML='<option value="">All years</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join("");
    renderTable();
  }catch(error){
    summary.innerHTML=`<p class="error-state">Could not load statistics: ${esc(error.message)}</p>`;
  }
}

yearFilter.addEventListener("change",renderTable);
addEventListener("DOMContentLoaded",init);
})();