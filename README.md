# Github Page

## Install
```bash
npm install
# or
yarn
```

## Develop
```bash
npm run pkgs:dev
npm run dev
# or
yarn pkgs:dev
yarn dev
```

## Lint
```bash
# install
npx husky install
# uninstall
npx husky uninstall
# add lint script
npx husky add .husky/pre-commit "npm run lint-staged"
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
and then, all static files will be generated to `out` directory
