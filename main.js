(()=>{"use strict";document.querySelector("form.page-form").addEventListener("submit",(e=>{let t=0;e.target.querySelectorAll(".page-form__input").forEach((e=>{0===e.value.trim().length&&(e.classList.add("error"),t+=1),e.value.trim().length>0&&e.classList.contains("error")&&e.classList.remove("error")})),t>0&&e.preventDefault()}));const e=document.querySelector(".cookies"),t=e.querySelector("button");let r=!1;const o=()=>{let t;t=r?-300:0;let o=r?-5:5,l=parseInt(getComputedStyle(e).bottom),s=setInterval((()=>{l+=o,e.style.bottom=l+"px",l===t&&(clearTimeout(s),r=!r)}),20)};t.addEventListener("click",(()=>{o()})),setTimeout((()=>{o()}),1e3)})();