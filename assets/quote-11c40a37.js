(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const i=document.querySelector(".header-mobi-menu-container"),a=document.querySelector(".header-open-menu-btn"),l=document.querySelector(".header-close-mob-menu-btn"),u=()=>{const r=a.getAttribute("aria-expanded")==="true"||!1;a.setAttribute("aria-expanded",!r),i.classList.toggle("header-is-open")};a.addEventListener("click",u);l.addEventListener("click",u);window.matchMedia("(min-width: 428px)").addEventListener("change",r=>{r.matches&&(i.classList.remove("is-open"),a.setAttribute("aria-expanded",!1))});document.querySelector(".js-quote");async function d(){const r="https://your-energy.b.goit.study/api/quote";try{const o=await(await fetch(r)).json();if(o){const s=document.querySelector(".js-quote");s.innerHTML=`
        <p class="js-quote-text">${o.quote}</p>
        <p class="js-quote-autor">${o.author}</p>
      `;const e=new Date;localStorage.setItem("quote",o.quote),localStorage.setItem("author",o.author),localStorage.setItem("quoteDate",e)}}catch(n){console.error(n)}}d();
