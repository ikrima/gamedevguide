```javascript
sortIndex: 1;
```

You can configure the module within your uplugin file as "LoadingPhase": "None", which will prevent it from loading at startup even if the plugin itself is enabled.

Then call FModuleManager::LoadModule in your code to load it by name when you need it.

*Reference From <https://forums.unrealengine.com/development-discussion/c-gameplay-programming/87848-plug-in-versus-modules>*
