# Node Cheat Sheet

## Nvm

* [nvm-windows](https://github.com/coreybutler/nvm-windows): hassle free install means on windows
* [npm-check-updates](https://www.npmjs.com/package/npm-check-updates): utility package for major version package upgrades
  * `npm install -g npm-check-updates`

## Npm

|Command|Desc|
|-------|----|
|`npm outdated`|find outdated files|
|`npm install -g npm@latest`|update npm|
|`npm update [--omit=dev --package-lock=false]`|minor version package upgrade + package-lock.json|
|`ncu -u && npm update`|major version package upgrade + package.json version hints|

## References

* [Update Node.js dependencies](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version)
