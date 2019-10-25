---
title: "Storage Adapters"
meta_title: "Custom Storage Adapters for Ghost"
meta_description: "Find out how to use custom storage adapters to store your publication's images to externally on S3, Google Drive, Azure, GitHub, Imgur and more."
keywords:
    - storage
    - concepts 
    - ghost
    - publishing
sidebar: "concepts"
---

It's possible to send your publication's images to a 3rd party service, CDN or database using a custom storage module. 

## Overview
The storage layer is used to store images from an upload admin UI, from the API, and also when images are included in a zip file uploaded to the importer. Using a custom storage module allows you to change where images are stored without changing Ghost core. 


## Using a custom storage adapter

By default Ghost stores images on your filesystem. The default location is the Ghost content path in your Ghost folder under `content/images`, or an alternative custom content path that you have configured. 

In order to use a custom storage adapter, your custom configuration file needs to be updated to provide config for your new storage module and set it as active:

```json
storage: {
    active: 'my-module',
    'my-module': {
        key: 'abcdef'
    }
}
```

The storage block should have 2 items:

* An active key, which contains the name* of your module
* A key which reflects the name* of your module, containing any config your module needs


## Available custom storage adapters

* [local-file-store](https://github.com/TryGhost/Ghost/blob/0304816/core/server/storage/local-file-store.js) (default) saves images to the local filesystem
* [http-store passes](https://gist.github.com/ErisDS/559e11bf3e84b89a9594) image requests through to an HTTP endpoint
* [s3-store](https://github.com/spanishdict/ghost-s3-compat) saves to Amazon S3 and proxies requests to S3
* [s3-store](https://github.com/colinmeinke/ghost-storage-adapter-s3) saves to Amazon S3 and works with 0.10+
* [qn-store](https://github.com/Minwe/qn-store) saves to Qiniu
* [ghost-cloudinary-store](https://github.com/mmornati/ghost-cloudinary-store) saves to Cloudinary
* [ghost-storage-cloudinary](https://github.com/eexit/ghost-storage-cloudinary) saves to Cloudinary with RetinaJS support
* [upyun-ghost-store](https://github.com/sanddudu/upyun-ghost-store) saves to Upyun
* [ghost-upyun-store](https://github.com/pupboss/ghost-upyun-store) saves to Upyun
* [ghost-google-drive](https://github.com/robincsamuel/ghost-google-drive) saves to Google Drive
* [ghost-azure-storage](https://github.com/tparnell8/ghost-azurestorage) saves to Azure Storage
* [ghost-imgur](https://github.com/wrenth04/ghost-imgur) saves to Imgur
* [google-cloud-storage](https://github.com/thombuchi/ghost-google-cloud-storage) saves to Google Cloud Storage
* [ghost-oss-store](https://github.com/MT-Libraries/ghost-oss-store) saves to Aliyun OSS
* [ghost-b2](https://github.com/martiendt/ghost-storage-adapter-b2) saves to Backblaze B2
* [ghost-github](https://github.com/ifvictr/ghost-github) saves to GitHub
* [pages-store](https://github.com/zce/pages-store) saves to GitHub Pages or other pages service, e.g. Coding Pages
* [WebDAV Storage](https://github.com/bartt/ghost-webdav-storage-adapter) saves to a WebDAV server.
* [ghost-qcloud-cos](https://github.com/ZhelinCheng/ghost-qcloud-cos) saves to Tencent Cloud COS.


## Creating a custom storage adapter

In order to replace the storage module, use these requirements. You can also take a look at our [default local storage implementation](https://github.com/TryGhost/Ghost/blob/master/core/server/adapters/storage/LocalFileStorage.js).

#### Location

1. Create a new folder named `storage` inside `content/adapters`
2. Inside of `content/adapters/storage` create a file or a folder: `content/adapters/storage/my-module.js` or `content/adapters/storage/my-module` - if using a folder, create a file called `index.js` inside it

#### Base adapter class inheritance

A custom storage adapter must inherit from your base storage adapter. By default the Base Storage Adapter is installed by Ghost and should be available in your custom adapter.

```javascript
'use strict';

var BaseAdapter = require('ghost-storage-base');

class MyCustomAdapter extends BaseAdapter{
  constructor() {
    super();
  }
}

module.exports = MyCustomAdapter;
```

#### Required methods

Your custom storage adapter must implement five required functions: 
* `save` - The `.save()` method stores the image and returns a promise which resolves the path from which the image should be requested in future.
* `exists` - Used by the base storage adapter to check whether a file exists or not
* `serve` - Ghost calls `.serve()` as part of its middleware stack, and mounts the returned function as the middleware for serving images
* `delete`
* `read`

```javascript
'use strict';

var BaseAdapter = require('ghost-storage-base');

class MyCustomAdapter extends BaseAdapter{
  constructor() {
    super();
  }
  
  exists() {

  }

  save() {

  }

  serve() {
    return function customServe(req, res, next) {
      next();
    }
  }

  delete() {

  }

  read() {

  }
}

module.exports = MyCustomAdapter;
```


## Summary
You have discovered how to use a custom storage module to replace the storage layer which handles images with custom code.

It's good practise to create a public GitHub repository to make your module available for others and you can share your new module in our [forum](https://forum.ghost.org/).

