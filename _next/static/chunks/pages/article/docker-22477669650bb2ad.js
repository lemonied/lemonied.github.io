(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6540],{4145:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/article/docker",function(){return r(8097)}])},8097:function(e,n,r){"use strict";r.r(n),r.d(n,{__N_SSG:function(){return t},frontMatter:function(){return d},tag:function(){return o},title:function(){return a},updated:function(){return l}});var c=r(4246),s=r(1670),i=r(5685),t=!0,d={title:"Docker 常用命令",tag:["docker"],updated:"2023-02-22T07:57:53.000Z"},a="Docker 常用命令",o=["docker"],l="2023-02-22T07:57:53.000Z",u=function(e){return(0,c.jsx)(i.s,e)};function h(e){var n=Object.assign({h1:"h1",pre:"pre",code:"code"},(0,s.ah)(),e.components);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h1,{id:"制作镜像",children:"制作镜像"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker build -f ./deploy/Dockerfile --progress plain -t image/name .\n"})}),"\n",(0,c.jsx)(n.h1,{id:"启动容器",children:"启动容器"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker run -p 9008:80 -d image/name\n"})}),"\n",(0,c.jsx)(n.h1,{id:"进入镜像",children:"进入镜像"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker exec -it 容器id bash\n"})}),"\n",(0,c.jsx)(n.h1,{id:"查看日志",children:"查看日志"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker logs 容器id -f --tail 100\n"})}),"\n",(0,c.jsx)(n.h1,{id:"释放无用资源",children:"释放无用资源"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker system prune -f\n"})}),"\n",(0,c.jsx)(n.h1,{id:"网络",children:"网络"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker network ls # 查看所有网络\n\n# 查看某个网络详情（如果出现网络不通的情况，可以查看容器所在子网网段是否被占用）\ndocker network inspect network-id\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,c.jsx)(u,Object.assign({},e,{children:(0,c.jsx)(h,e)}))}},3121:function(e){"use strict";e.exports=ReactTransitionGroup},9378:function(e){"use strict";e.exports=algoliasearch},7513:function(e){"use strict";e.exports=rxjs}},function(e){e.O(0,[9894,2128,3554,5685,9774,2888,179],function(){return e(e.s=4145)}),_N_E=e.O()}]);