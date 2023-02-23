# Github Page

## Install
```bash
yarn
# or
npx lerna bootstrap
```

## Develop Blog
```bash
npm run dev
# or
yarn dev
```

## Run Tasks
> [lerna.js](https://lerna.js.org/docs/features/run-tasks)
```bash
npx lerna run dev --scope=@lemonied/mtime
```

## Dependencies
```bash
# Add
yarn workspace blog add typescript -D
# or
npx lerna add typescript --scope=blog --dev

# Remove
yarn workspace blog remove typescript
```

## Lint
```bash
npm run lint
```

## Production
```bash
npm run build
# or
yarn build
```
And then, all static files of blog will be generated to `blog/out` directory

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
