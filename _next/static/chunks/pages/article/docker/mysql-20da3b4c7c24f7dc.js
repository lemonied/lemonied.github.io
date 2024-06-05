(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8397],{6919:function(n,e,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/article/docker/mysql",function(){return s(9787)}])},9787:function(n,e,s){"use strict";s.r(e),s.d(e,{__N_SSG:function(){return a},frontMatter:function(){return t},tag:function(){return d},title:function(){return l},updated:function(){return h}});var r=s(4246),c=s(1670),i=s(5685),a=!0,t={title:"Docker 运行 mysql",tag:["docker","mysql"],updated:"2023-02-22T07:57:53.000Z"},l="Docker 运行 mysql",d=["docker","mysql"],h="2023-02-22T07:57:53.000Z",o=function(n){return(0,r.jsx)(i.s,n)};function u(n){var e=Object.assign({h1:"h1",pre:"pre",code:"code",h2:"h2"},(0,c.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"下载镜像",children:"下载镜像"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"docker pull mysql:latest\n"})}),"\n",(0,r.jsx)(e.h1,{id:"启动镜像",children:"启动镜像"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"$ docker run -d --name mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql\n"})}),"\n",(0,r.jsx)(e.h1,{id:"命令行",children:"命令行"}),"\n",(0,r.jsx)(e.h2,{id:"连接数据库",children:"连接数据库"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"mysql -P 3307 -h 127.0.0.1 -u root -p\n"})}),"\n",(0,r.jsx)(e.h2,{id:"查看所有数据库",children:"查看所有数据库"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"show databases;\n"})}),"\n",(0,r.jsx)(e.h2,{id:"使用数据库",children:"使用数据库"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"use xxx;\n"})}),"\n",(0,r.jsx)(e.h2,{id:"显示所有表",children:"显示所有表"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"show tables;\n"})}),"\n",(0,r.jsx)(e.h2,{id:"查看表结构",children:"查看表结构"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"show columns from xxx;\n"})})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.jsx)(o,Object.assign({},n,{children:(0,r.jsx)(u,n)}))}},3121:function(n){"use strict";n.exports=ReactTransitionGroup},9378:function(n){"use strict";n.exports=algoliasearch},7513:function(n){"use strict";n.exports=rxjs}},function(n){n.O(0,[9894,2128,3554,5685,9774,2888,179],function(){return n(n.s=6919)}),_N_E=n.O()}]);