import{u as l,j as s,L as g,c as _,r as i,H as u,a as m,P as h,A as x}from"./index-CAqOY3Qd.js";const j="_head_1j3bz_1",f={head:j},p="_head_qg0dc_1",v="_card_qg0dc_13",N="_footer_qg0dc_27",y="_title_qg0dc_35",q="_description_qg0dc_51",k="_link_qg0dc_67",E="_price_qg0dc_75",$="_currency_qg0dc_103",b="_rating_qg0dc_111",c={head:p,card:v,footer:N,title:y,description:q,link:k,price:E,currency:$,rating:b,"add-to-cart":"_add-to-cart_qg0dc_141"};function w(e){const t=l(),r=a=>{a.preventDefault(),t(_.add(e.id))};return s.jsx(g,{to:`/product/${e.id}`,className:c.link,children:s.jsxs("div",{className:c.card,children:[s.jsxs("div",{className:c.head,style:{backgroundImage:`url('${e.image}')`},children:[s.jsxs("div",{className:c.price,children:[e.price," ",s.jsx("span",{className:c.currency,children:"₽"})]}),s.jsx("button",{className:c["add-to-cart"],onClick:r,type:"button",children:s.jsx("img",{src:"/cart-button-icon.svg",alt:"Добавить в корзину"})}),s.jsxs("div",{className:c.rating,children:[e.rating," ",s.jsx("img",{src:"/star-icon.svg",alt:"Иконка звезды"})]})]}),s.jsxs("div",{className:c.footer,children:[s.jsx("div",{className:c.title,children:e.name}),s.jsx("div",{className:c.description,children:e.description})]})]})})}const L="_wrapper_1acr5_1",M={wrapper:L};function F({products:e}){return s.jsx("div",{className:M.wrapper,children:e.map(t=>s.jsx(w,{id:t.id,name:t.name,description:t.ingredients.join(", "),rating:t.rating,price:t.price,image:t.image},t.id))})}function I(){const[e,t]=i.useState([]),[r,a]=i.useState(!1),[d,o]=i.useState();return i.useEffect(()=>{(async()=>{try{a(!0);const{data:n}=await m.get(`${h}/products`);t(n),a(!1)}catch(n){console.log(n),n instanceof x&&o(n.message),a(!1);return}})()},[]),s.jsxs(s.Fragment,{children:[s.jsx("div",{className:f.head,children:s.jsx(u,{children:"Menu"})}),s.jsxs("div",{children:[d&&s.jsx(s.Fragment,{children:d}),!r&&s.jsx(F,{products:e}),r&&s.jsx(s.Fragment,{children:"Загрузка..."})]})]})}export{I as default};