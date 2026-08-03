(()=>{"use strict";
const back=document.querySelector("#backToTop");
back?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
addEventListener("scroll",()=>back?.classList.toggle("is-visible",scrollY>400),{passive:true});
})();