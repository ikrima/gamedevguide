# NodeJS Cheatsheet

## Nvm

- [nvm-windows](https://github.com/coreybutler/nvm-windows): hassle free install means on windows
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates): utility package for major version package upgrades
- install/upgrade `nvm`, `node`, `npm`, `yarn`, `TypeScript`
  ```bash
  nvm install [version]
  nvm use [version]
  npm install -g npm@latest
  npm install -g typescript@latest
  npm install -g yarn@latest
  npm install -g npm-check-updates@latest
  ```

## Npm

|Command|Desc|
|-------|----|
|`nvm list available`|list available node versions to install|
|`nvm install [version]`|install node version; **_NOTE:_** global npm modules are not shared so must be reinstalled|
|`nvm use [version]`|switch node version|
|`nvm current`|info on currently selected node version|
|`npm install -g npm@latest`|upgrade npm to the latest version|
|`npm update [--omit=dev --package-lock=false]`|minor version package upgrade + package-lock.json|
|`npm cache verify`|verify npm cache|
|`npm -g list`|list globally installed packages|
|`npm cache clean [-force]`|clean npm cache|
|`npm outdated`|find outdated packages|
|`npm install -g npm-check-updates@latest`|install ncu package|
|`ncu`|'what if' version of `ncu -u` i.e. won't modify package.json|
|`ncu -g`|find global outdated packages|
|`ncu -u && npm update`|major version package upgrade + package.json version hints|
|`ncu -i`|interactive version of `ncu -u`|

## References

- [Update Node.js dependencies](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version)
