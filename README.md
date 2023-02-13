# Github Page

## Install
```bash
npm install
# or
yarn
```

## Pre Dependencies
```bash
# 本地开发需要先执行（编译本地依赖包）
npm run pkgs:build
# 如果需要开发packages内的功能，则需要执行
npm run pkgs:dev
```

## Develop
```bash
npm run dev
# or
yarn dev
```

## Lint
```bash
npm run lint
```

## Git Hooks
```bash
# install
npx husky install
# add lint script
npx husky add .husky/pre-commit "npm run lint-staged"

# uninstall
npx husky uninstall
```

## Environment

### Example
file `.env.local` for development
```bash
SITE_URL=https://www.lemonied.cn
BASE_PATH=/
```

## Production
```bash
npm run pkgs:build && npm run build && npm run export
# or
yarn pkgs:build && yarn build && yarn export
```
And then, all static files will be generated to `out` directory

## Deployment
> 以GitHub Pages为例
1. `User` -> `Settings` -> `Developer settings` -> `Personal access tokens` -> `Tokens (classic)` 在这里生成一个`token`（需要有push权限），然后把`token`保存下来；
2. `Repository` -> `Settings` -> `Secrets and Variables` -> `Actions` 点击 `New repository secret`，`Name`填`TOKEN`，`Secret`填刚才保存的`token`；
3. `Repository` -> `Settings` -> `Environments`，这里默认会有一个`github-pages`的环境，如果没有，则创建一个`New environment`，`Name`填`github-pages`
4. 接上一步点击`github-pages` -> `Environment variables` -> `Add variable`，依次添加环境变量：
   1. Name:`CODE_GITHUB_REPOSITORY`，Value:`例 lemonied/lemonied.github.io.git`，说明：编译完成后的静态文件需要推送的仓库（github仓库）
   2. Name:`CODE_GITHUB_BRANCH`，Value:`例 blog`，说明：编译完成后的静态文件需要推送的分支
   3. Name:`SITE_URL`，Value:`例 https://www.lemonied.cn`，说明：网站的url
   4. Name:`USER_EMAIL`，Value:`例 chenjiyuan.super@gmail.com`，说明：邮箱，用于推送时的git配置
