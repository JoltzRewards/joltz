# DEPLOY
## Debugging
1. Download the firebase emulator suite.
```sh
curl -sL firebase.tools | bash
```

2. Set up [frontend-brand-app](https://github.com/TrubitTech/frontend-brand-app) (will sync with other local builds).
```sh
git clone https://github.com/TrubitTech/frontend-brand-app

cd frontend-brand-app

yarn install
npm run dev
```

3. Set up the firebase functions emulator.
```sh
tmux

npm install
npm run dev

# press `control-b`` then `d` to detach.
```

4. Test.
```sh
# download hurl (https://hurl.dev/docs/installation.html)

hurl --test tests/deploy.hurl
```