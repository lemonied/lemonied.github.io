(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8422],{5083:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/article/git/ssh",function(){return t(6764)}])},6764:function(n,e,t){"use strict";t.r(e),t.d(e,{__N_SSG:function(){return c},description:function(){return d},frontMatter:function(){return u},tag:function(){return o},title:function(){return a},updated:function(){return h}});var s=t(4246),r=t(1670),i=t(5685),c=!0,u={title:"SSH keys",description:"ssh的加密方式",tag:["git"],updated:"2023-02-22T07:57:53.000Z"},a="SSH keys",d="ssh的加密方式",o=["git"],h="2023-02-22T07:57:53.000Z",p=function(n){return(0,s.jsx)(i.s,n)};function l(n){var e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p"},(0,r.ah)(),n.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"rsa",children:"RSA"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# 生成\nssh-keygen -t rsa\n# 查看公钥\ncat ~/.ssh/id_rsa.pub\n"})}),"\n",(0,s.jsx)(e.h1,{id:"ed25519",children:"ed25519"}),"\n",(0,s.jsx)(e.p,{children:"常见的 SSH 登录密钥使用 RSA 算法。RSA 经典且可靠，但性能不够理想。"}),"\n",(0,s.jsx)(e.p,{children:"只要你的服务器上 OpenSSH 版本大于 6.5（2014 年的古早版本），就可以利用 Ed25519 算法生成的密钥对，减少你的登录时间。如果你使用 SSH 访问 Git，那么就更值得一试。"}),"\n",(0,s.jsx)(e.p,{children:"Ed25519 的安全性在 RSA 2048 与 RSA 4096 之间，且性能在数十倍以上。"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# 生成\nssh-keygen -t ed25519\n# 查看公钥\ncat ~/.ssh/id_ed25519.pub\n"})})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.jsx)(p,Object.assign({},n,{children:(0,s.jsx)(l,n)}))}},3121:function(n){"use strict";n.exports=ReactTransitionGroup},9378:function(n){"use strict";n.exports=algoliasearch},7513:function(n){"use strict";n.exports=rxjs}},function(n){n.O(0,[9894,2128,3554,5685,9774,2888,179],function(){return n(n.s=5083)}),_N_E=n.O()}]);