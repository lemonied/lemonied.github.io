(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2521],{8975:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return t(4607)}])},4607:function(e,n,t){"use strict";t.r(n);var r=t(851),i=t(4246),s=t(7060),c=t(2591);function a(){var e=(0,r._)(["\n  a{\n    color: var(--color-link);\n    &:hover{\n      color: var(--color-link-hover);\n    }\n    &:active{\n      color: var(--color-link-active);\n    }\n  }\n"]);return a=function(){return e},e}var o=t(7149).ZP.div.withConfig({componentId:"sc-7a7010ce-0"})(a());n.default=function(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(c.H,{title:"关于我们",description:"本网站的作者信息"}),(0,i.jsx)(s.A,{children:(0,i.jsxs)(o,{children:[(0,i.jsx)("span",{children:"本项目地址："}),(0,i.jsx)("a",{href:"https://github.com/lemonied/lemonied.github.io",rel:"noreferrer",target:"_blank",children:"https://github.com/lemonied/lemonied.github.io"})]})})]})}},7223:function(e,n,t){"use strict";t.d(n,{m:function(){return s}});var r=t(851);function i(){var e=(0,r._)(["\n  background: #fff;\n  border-radius: 10px;\n  border: 1px solid #dee2e8;\n  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 15%);\n"]);return i=function(){return e},e}var s=t(7149).ZP.div.withConfig({componentId:"sc-979d06bf-0"})(i())},7060:function(e,n,t){"use strict";t.d(n,{A:function(){return N}});var r=t(4246),i=t(6986),s=t.n(i),c=t(7232),a=t.n(c),o=t(9894),l=t.n(o),u=t(53),d=t(7667),h=t(9378),f=t.n(h),m=t(7513),_=t(1233),v=t.n(_),x=t(5644),j=t(7223),g=t(5360),p=f()("SRJNT7RL7L","dec5aa2f20e5786f271cfa2f8dc1ffe9").initIndex("blog"),b=function(e){var n=e.className,t=(0,d.useRef)(),i=(0,d.useRef)({value:"",page:0,hitsPerPage:10}),s=(0,u._)((0,d.useState)(null),2),c=s[0],a=s[1],o=(0,u._)((0,d.useState)(!1),2),l=o[0],h=o[1],f=(0,u._)((0,d.useState)(!1),2),_=f[0],b=f[1],k=(0,u._)((0,g.Nr)(function(e){var n,r=e.target.value;i.current.value=r,r?(null===(n=t.current)||void 0===n||n.unsubscribe(),h(!0),t.current=(0,m.from)(p.search(r,{page:i.current.page,hitsPerPage:i.current.hitsPerPage})).pipe((0,m.tap)(function(e){a(e.hits)}),(0,m.finalize)(function(){return h(!1)})).subscribe()):a(null)},800),1)[0],N=(0,d.useCallback)(function(e){e.stopPropagation()},[]),C=(0,d.useCallback)(function(e){N(e),b(!0)},[N]);return(0,d.useEffect)(function(){var e=function(){b(!1)};return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}},[]),(0,r.jsxs)("label",{className:(0,g.UU)(v()["search-box"],n),children:[(0,r.jsx)(x.Z,{onChange:k,placeholder:"搜索...",onClick:C}),(c||l)&&_?(0,r.jsx)(j.m,{className:v().hits,onClick:N,children:(null==c?void 0:c.length)?c.map(function(e){var n,t=e._highlightResult.hierarchy||{},i=Object.keys(t).map(function(e){return t[e].value}).join(" - "),s=null===(n=e._snippetResult)||void 0===n?void 0:n.content.value;return(0,r.jsxs)("a",{href:e.url,rel:"noreferrer",className:v().item,children:[i?(0,r.jsx)("div",{className:v().tit,dangerouslySetInnerHTML:{__html:i}}):null,s?(0,r.jsx)("div",{className:v().con,dangerouslySetInnerHTML:{__html:s}}):null]},e.objectID)}):l?(0,r.jsx)("div",{children:"搜索中。。。"}):(0,r.jsx)("div",{children:"无搜索结果"})}):null]})},k=function(){return(0,r.jsxs)("header",{className:a().header,children:[(0,r.jsx)("nav",{children:(0,r.jsxs)("div",{className:a()["nav-list"],children:[(0,r.jsx)(l(),{href:"/",children:"首页"}),(0,r.jsx)(l(),{href:"/tag",children:"我的笔记"}),(0,r.jsx)("a",{href:"/use-modal-service",target:"_blank",title:"更简单的使用antd modal",children:"useModalService"}),(0,r.jsx)("a",{href:"/bello",target:"_blank",title:"基于antd的表单差异对比组件",children:"bello"}),(0,r.jsx)(l(),{href:"/about",children:"关于我们"})]})}),(0,r.jsx)(b,{className:a().search})]})},N=function(e){var n=e.children,t=e.mainClassName,i=e.mainStyle;return(0,r.jsxs)("section",{className:s().layout,children:[(0,r.jsx)(k,{}),(0,r.jsx)("main",{className:(0,g.UU)(s().main,t),style:i,children:n})]})}},2591:function(e,n,t){"use strict";t.d(n,{H:function(){return a}});var r=t(4246),i=t(7667),s=t(8038),c=t.n(s),a=function(e){var n=e.title,t=e.description,s=e.tags,a=e.suffix,o=void 0===a||a,l=(0,i.useMemo)(function(){return"".concat(n).concat(o?" - Chicken Man":"")},[o,n]);return(0,r.jsxs)(c(),{children:[(0,r.jsx)("title",{children:l}),(0,r.jsx)("meta",{name:"description",content:t}),(0,r.jsx)("meta",{name:"og:title",content:l}),(0,r.jsx)("meta",{name:"og:description",content:t}),(0,r.jsx)("meta",{name:"og:image",content:"".concat("/","favicon.ico")}),s?(0,r.jsx)("meta",{name:"docsearch:tags",content:s.join(",")}):null]})}},1233:function(e){e.exports={"search-box":"search_search-box__K2yMn",hits:"search_hits__1gCXv",item:"search_item__z0sUP",tit:"search_tit__mvIAO",con:"search_con__B4TjX"}},7232:function(e){e.exports={header:"styles_header___Ivmm","nav-list":"styles_nav-list__UoHzq"}},6986:function(e){e.exports={main:"styles_main__TpZ7Y"}},9378:function(e){"use strict";e.exports=algoliasearch},7513:function(e){"use strict";e.exports=rxjs}},function(e){e.O(0,[9894,2128,9774,2888,179],function(){return e(e.s=8975)}),_N_E=e.O()}]);