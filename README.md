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
