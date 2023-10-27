(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const c=document.querySelector(".header-mobi-menu-container"),i=document.querySelector(".header-open-menu-btn"),d=document.querySelector(".header-close-mob-menu-btn"),l=()=>{const e=i.getAttribute("aria-expanded")==="true"||!1;i.setAttribute("aria-expanded",!e),c.classList.toggle("header-is-open")};i.addEventListener("click",l);d.addEventListener("click",l);window.matchMedia("(min-width: 428px)").addEventListener("change",e=>{e.matches&&(c.classList.remove("is-open"),i.setAttribute("aria-expanded",!1))});const u=document.querySelectorAll(".header-menu-link");u.forEach(e=>{const r=new URL(e.href).pathname;document.location.pathname===r&&e.classList.add("home-nav")});document.querySelector(".js-quote");async function p(){const e="https://your-energy.b.goit.study/api/quote";try{const s=await(await fetch(e)).json();if(s){const n=document.querySelector(".js-quote");n.innerHTML=`
        <p class="js-quote-text">${s.quote}</p>
        <p class="js-quote-autor">${s.author}</p>
      `;const t=new Date;localStorage.setItem("quote",s.quote),localStorage.setItem("author",s.author),localStorage.setItem("quoteDate",t)}}catch(r){console.error(r)}}p();let h=[];async function m(){const e=document.querySelector(".exercise-list");for(const r of h)try{const s=await axios.get(`${BASE_URL}/exercises/${r}`);if(s.status===200){const n=s.data,t=f(n);e.appendChild(t)}else console.error("Помилка запиту до API")}catch(s){console.error("Помилка при взаємодії з API",s)}}function f(e){const r=document.createElement("li");return r.classList.add("exercise-item"),r.innerHTML=`
    <div class="rating-start-exercise">
      <div class="rating-start-exercise-wrap">
        <p class="workout">Workout</p>
        <p class="rating-exercise-card">${e.rating}</p>
        <svg class="icon-star-exercises" width="18" height="18" fill="rgba(238, 161, 12, 1)">
          <use href="/img/iconfull.svg#icon-star"></use>
        </svg>
        <button data-modal-open class="start-exercise openModalBtn" data-exercise-id="${e._id}">Start
          <svg class="icon-right-arrow" width="18" height="18" stroke="black">
            <use href="/img/iconfull.svg#icon-right-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="title-exercise-wrap">
        <svg class="icon-title-exercises" width="24" height="24" stroke="black">
          <use href="/img/iconfull.svg#icon-run-men"></use>
        </svg>
        <h2 class="title-exercise">${e.name}</h2>
      </div>
      <div class="calories-target">
        <p class="burned-calories">BurnedCalories: ${e.burnedCalories}/<span class="time-exercise">${e.time}</span></p>
        <p class="part-exercise">Bodypart: ${e.bodypart}</p>
        <p class="target">Target: ${e.target}</p>
      </div>
    </div>`,r}m();
