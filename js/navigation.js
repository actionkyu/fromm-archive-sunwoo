(()=>{"use strict";
function goToDate(date){if(!date)return;const dateInput=document.querySelector("#dateFilter");if(dateInput){dateInput.value=date;dateInput.dispatchEvent(new Event("change",{bubbles:true}))}requestAnimationFrame(()=>document.querySelector(`.chat-day[data-date="${date}"]`)?.scrollIntoView({behavior:"smooth",block:"start"}))}
document.addEventListener("click",event=>{const button=event.target.closest("[data-go-date]");if(!button||button.disabled)return;goToDate(button.dataset.goDate)});
})();