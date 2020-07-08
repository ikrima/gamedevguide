<!-- markdownlint-disable -->

# Custom Secondary Assets

- You can create a custom Secondary Asset Base blueprint with config struct

- For autopopulating actors in a level, ideally should just be a blutility (ie populating spectators)
    - If needs to happen automatically, move to construction script, not on tick

- When adding functionality in the custom data asset, don't forget to tick `callineditor`
  ![970ceba7714480a06c3c1fe96aa52f3f.png](./assets/ae79f4df03b348d18af7063bdf44ec1f.png)


------------------------

# Fixup Tips

- Opt to put all assets into secondary asset collections
  - If you must, you can put them in blueprints as long as they are in leaf blueprints that don't get referenced or cast in other blueprints.

- If you see out dated stuff or assets:
  - For assets/structs/BPs you are sure you can delete, move to `Quarantine/ToDeleteSafe`
  - For unsure, move to: Quarantine/ToDeleteUnsure `SpectatorStruct`
      ![7060ed3c366105c92a27889106a447af.png](./assets/7173d863fc484d3785dba6f4894a54cf.png)
  - For functions/events, mark them as disabled by putting a comment bubble around it with ***"SAFETODELETE"***
  - The reason is that in a couple of days, after all the cleanup, we'll mark that perforce checkin so if anything breaks or data gets lost (sequences breaking/data configuration goes kaput), we'll have a safe point to rollback to

- For Config structs, you can change to SoftObject/SoftClass references and it doesn't seem to nuke your existing data
  ![c7c3b6ad4782ee2a691ea74763d71725.png](./assets/f9a5024568504ef1b6a6e0bb39eee259.png)

- Use Soft Object references for any asset variable references. To Load, call `LoadSynchronousSoftObject`.
 ![e0a3de588c87a7e6e223cb7e46ceaa75.png](./assets/b2106bb41e5c440892dd9cf00acc2bd8.png)

- Remember to run `MapCheck` & `Validate Asset` to see any errors in the blueprints or problem areas


------------------------

# Placeholder Assets

- Base Materials force load all asset references in the material graph all the time, even if that texture property gets overridden in a child material or material instance and even if the base material is never used
- If a texture property is going to be overridden, use placeholder assets located `/AssetTypes/DefaultAssets`; if there isn't one there for that asset type (eg HDR texture), add one that is white 1x1 pixels and suffix it with "PlaceHolder"
- There's also "AssetError" assets which are the same but instead all pink. We separate them out so it's easy to see if an asset is missing vs. a default asset that needs to be overridden
  ![1ee8d57cdec855daa6d4bb9b538594f0.png](./assets/15dfa30b326546e9ab2d10a7d97fff2d.png)
