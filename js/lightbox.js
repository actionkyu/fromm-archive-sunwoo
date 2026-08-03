(()=>{"use strict";
const box=document.querySelector("#lightbox"),stage=document.querySelector("#lightboxStage"),caption=document.querySelector("#lightboxCaption"),close=document.querySelector("#lightboxClose"),prev=document.querySelector("#lightboxPrev"),next=document.querySelector("#lightboxNext");
let items=[],index=0,lastFocus=null;
function collect(){items=[...document.querySelectorAll("[data-lightbox-src]")].filter(el=>!el.hidden&&el.offsetParent!==null)}
function render(){const item=items[index];if(!item)return;const src=item.dataset.lightboxSrc,type=item.dataset.lightboxType,text=item.dataset.lightboxCaption||"";stage.innerHTML=type==="video"?`<video controls autoplay playsinline><source src="${src}" type="video/mp4"></video>`:`<img src="${src}" alt="${text}">`;caption.textContent=text;prev.disabled=items.length<2;next.disabled=items.length<2}
function open(item){collect();index=Math.max(0,items.indexOf(item));lastFocus=document.activeElement;box.hidden=false;box.setAttribute("aria-hidden","false");document.body.classList.add("lightbox-open");render();close.focus()}
function hide(){stage.querySelector("video")?.pause();box.hidden=true;box.setAttribute("aria-hidden","true");document.body.classList.remove("lightbox-open");lastFocus?.focus?.()}
function move(delta){if(!items.length)return;index=(index+delta+items.length)%items.length;render()}
document.addEventListener("click",e=>{const trigger=e.target.closest("[data-lightbox-src]");if(trigger){e.preventDefault();open(trigger)}});
close?.addEventListener("click",hide);prev?.addEventListener("click",()=>move(-1));next?.addEventListener("click",()=>move(1));
box?.addEventListener("click",e=>{if(e.target===box)hide()});
document.addEventListener("keydown",e=>{if(box?.hidden)return;if(e.key==="Escape")hide();if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1)});
})();