(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const u=document.querySelector(".header-mobi-menu-container"),s=document.querySelector(".header-open-menu-btn"),d=document.querySelector(".header-close-mob-menu-btn"),a=()=>{const n=s.getAttribute("aria-expanded")==="true"||!1;s.setAttribute("aria-expanded",!n),u.classList.toggle("header-is-open")};s.addEventListener("click",a);d.addEventListener("click",a);window.matchMedia("(min-width: 428px)").addEventListener("change",n=>{n.matches&&(u.classList.remove("is-open"),s.setAttribute("aria-expanded",!1))});const f=document.querySelector(".js-quote");async function l(){const n="https://your-energy.b.goit.study/api/quote";try{const o=await fetch(`${n}`),i=o.data;return l().then(r=>{if(f.innerHTML=`
        <p class="js-quote-text">${r.quote}</p>
        <p class="js-quote-autor">${r.author}</p>
        `,r){const e=new Date;localStorage.setItem("quote",r.quote),localStorage.setItem("author",r.author),localStorage.setItem("quoteDate",e)}}),o.json()}catch(o){console.log(o)}}l();
