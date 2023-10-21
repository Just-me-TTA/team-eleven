/* empty css               */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const c=document.querySelector(".js-container-for-images"),a=document.getElementById("bodyPartsFilterButton");function l(o){fetch(`https://your-energy.b.goit.study/api/filters?filter=${o}`).then(t=>t.json()).then(t=>u(t)).catch(t=>console.error("Помилка при отриманні категорій: ",t))}function u(o){const t=o.results.map(({filter:n,imgURL:s,name:e})=>` <div class="gallery__item">
        <a class="gallery__link" href="#">
            <img
            class="gallery__image"
            src="${s}"
            alt="${e}"
            />
        </a>
        <p class="textImage">${e}</p>
        <p class="filterImage">${n}</p>
        </div>`).join("");c.innerHTML=t}a.classList.add("active");l("Body parts");const d=document.querySelectorAll(".btn-categories");d.forEach(o=>{o.addEventListener("click",t=>{const n=t.target.dataset.cgid;l(n)})});
