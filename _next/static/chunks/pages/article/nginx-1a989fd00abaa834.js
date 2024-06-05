(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2939],{3597:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/article/nginx",function(){return t(2637)}])},2637:function(n,e,t){"use strict";t.r(e),t.d(e,{__N_SSG:function(){return s},description:function(){return d},frontMatter:function(){return a},tag:function(){return u},title:function(){return c},updated:function(){return p}});var r=t(4246),i=t(1670),o=t(5685),s=!0,a={title:"Nginx的基础配置",description:"Nginx的常用配置",tag:["nginx"],updated:"2023-02-22T07:57:53.000Z"},c="Nginx的基础配置",d="Nginx的常用配置",u=["nginx"],p="2023-02-22T07:57:53.000Z",_=function(n){return(0,r.jsx)(o.s,n)};function l(n){var e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},(0,i.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"配置参考",children:"配置参考"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"user  root; # 运行用户\nworker_processes  auto; # Nginx进程，一般设置为和CPU核数一样\n\n\nevents {\n    worker_connections  1024; # 单个后台进程的最大并发数\n}\n\nhttp {\n    include       /etc/nginx/mime.types; # 文件扩展名与类型映射表\n    default_type  application/octet-stream; # 默认文件类型\n\n    # 设置日志模式\n    log_format  main  '$remote_addr - $remote_user [$time_local] \"$request\" '\n                      '$status $body_bytes_sent \"$http_referer\" '\n                      '\"$http_user_agent\" \"$http_x_forwarded_for\"';\n\n    sendfile        on;\n    server_tokens   off;\n\n    keepalive_timeout  65;\n\n    gzip              on;\n    gzip_types        application/javascript text/css;\n    gzip_min_length   2048;\n\n    map $http_upgrade $connection_upgrade {\n      default upgrade;\n      '' close;\n    }\n\n    add_header Cache-Control no-cache; # 协商缓存\n\n    server {\n      listen 80 default_server;\n      absolute_redirect off;\n      index index.html;\n      root /xxx-dashboard/; # 静态文件所在目录\n\n      error_page 404 = @redirect_to_404; # 定义变量404\n      location @redirect_to_404 {\n        return 302 /404.html; # 404页面重定向302到 /404.html\n      }\n\n      location / {\n        try_files $uri $uri/ /index.html; # 静态资源配置（单页面程序）\n      }\n\n      location /subapp {\n        alias /subapp-dashboard/;\n        try_files $uri $uri/ /subapp/index.html; # 静态资源配置（单页面程序）\n      }\n\n      location /subapp2 {\n        alias /subapp2-dashboard/;\n        try_files $uri $uri/ =404; # 非单页面\n      }\n\n      # 某些低版本nginx需要写成 /api, 结尾没有 /\n      location /api/ {\n        proxy_pass       http://localhost:5000/; # 将 /api/* 请求转发至 http://localhost:5000/*\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header Host $host;\n      }\n    }\n}\n"})}),"\n",(0,r.jsx)(e.h1,{id:"官方文档",children:"官方文档"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.a,{href:"https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/",children:"https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/"})})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.jsx)(_,Object.assign({},n,{children:(0,r.jsx)(l,n)}))}},3121:function(n){"use strict";n.exports=ReactTransitionGroup},9378:function(n){"use strict";n.exports=algoliasearch},7513:function(n){"use strict";n.exports=rxjs}},function(n){n.O(0,[9894,2128,3554,5685,9774,2888,179],function(){return n(n.s=3597)}),_N_E=n.O()}]);