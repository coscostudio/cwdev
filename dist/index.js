"use strict";(()=>{var u=()=>{let e=document.querySelector(".connect-trigger"),t=document.querySelector(".footer-connect-wrapper"),o=e?.querySelector(".connect-icon"),r=document.querySelector(".footer-main-wrapper");if(!e||!t){console.warn("Connect trigger or wrapper not found");return}let i=!1;t.style.opacity="0",t.style.display="none",t.style.transition="opacity 0.4s ease-out",o&&(o.style.transition="transform 0.3s ease-out");let c=()=>{t.style.display="flex",t.offsetHeight,t.style.opacity="1",o&&(o.style.transform="rotate(45deg)"),requestAnimationFrame(()=>{let l=t.getBoundingClientRect().top+window.pageYOffset-20;window.scrollTo({top:l,behavior:"smooth"})}),i=!0},p=()=>{t.style.opacity="0",o&&(o.style.transform="rotate(0deg)");let a=(r?r.getBoundingClientRect():e.getBoundingClientRect()).bottom+window.pageYOffset,l=window.innerHeight,n=a-l;window.scrollTo({top:Math.max(0,n),behavior:"smooth"}),setTimeout(()=>{t.style.display="none"},400),i=!1};e.addEventListener("click",d=>{d.preventDefault(),i?p():c()})};var f=document.createElement("style");f.textContent=`
  .splide.related-products {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in, visibility 0.5s ease-in;
  }
  .splide.related-products.is-visible {
    opacity: 1;
    visibility: visible;
  }

  /* Product grid image fade-in styles */
  .product-image-thumbnail {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }
  .product-image-thumbnail.fade-in {
    opacity: 1;
  }

  /* Product page slider image fade-in styles */
  .splide.product-images .image {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
  .splide.product-images.images-loaded .image {
    opacity: 1;
  }
`;document.head.appendChild(f);function h(){let e=document.querySelectorAll(".product-image-thumbnail");e.length&&e.forEach((t,o)=>{setTimeout(()=>{t.classList.add("fade-in")},o*50)})}function w(){let e=document.querySelector(".splide.product-images");e&&setTimeout(()=>{e.classList.add("images-loaded")},150)}function m(e,t,o=!1){let r=document.querySelectorAll(e);r.length&&r.forEach((i,c)=>{let p=`${e.replace(/\./g,"")}-${c}`;if(i.setAttribute("id",p),!i.querySelector(".splide__track")){console.error(`Splide track element missing for ${e}. Creating it.`);let s=document.createElement("div");for(s.className="splide__track";i.firstChild;)s.appendChild(i.firstChild);i.appendChild(s)}let a=i.querySelector(".splide__track"),l=a?.querySelector(".splide__list");if(a&&!l){console.error(`Splide list element missing for ${e}. Creating it.`);let s=document.createElement("div");for(s.className="splide__list";a.firstChild;)s.appendChild(a.firstChild);a.appendChild(s)}let n=new window.Splide(i,{...t});n.on("mounted",()=>{if(e===".splide.related-products"){requestAnimationFrame(()=>{i.classList.add("is-visible")});return}if(e===".splide.product-images"&&setTimeout(()=>{w()},100),n.Components&&n.Components.Elements){let{slides:s}=n.Components.Elements;s.forEach((g,y)=>{g.addEventListener("click",()=>{n.go(y)})})}}),o&&window.splide?.Extensions?n.mount(window.splide.Extensions):n.mount()})}document.addEventListener("DOMContentLoaded",()=>{u(),setTimeout(()=>{h()},150),[{selector:".splide.product-images",options:{type:"slide",autoWidth:!0,gap:"0px",arrows:!1,pagination:!1,drag:"free",focus:"left",snap:!0},useAutoScroll:!1}].forEach(t=>{m(t.selector,t.options,t.useAutoScroll)}),setTimeout(()=>{m(".splide.related-products",{type:"slide",autoWidth:!0,gap:"0px",arrows:!1,pagination:!1,drag:"free",focus:"left",snap:!0},!1)},500)});})();
