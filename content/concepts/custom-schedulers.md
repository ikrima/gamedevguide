---
title: "Custom Schedulers"
meta_title: "Custom Scheduler Modules - Control your content schedule"
meta_description: "Discover how to use a custom adapter for scheduling content on your Ghost publication for advanced publications ⏰"
keywords:
    - schedulers
    - concepts 
    - ghost
    - publishing
sidebar: "concepts"
---

Ghost installs a default adapter for scheduling, or you can use a custom scheduling module instead.

## Overview

The default scheduling adapter in Ghost is configured by default. Once you run Ghost, the scheduling feature is ready to use once you have installed Ghost on your server. Scheduling posts can be accessed within individual posts in the editor within Ghost admin.

It's possible to use a custom scheduling module instead of the default adapter. This can be useful when: 

* You have a cache in front of your site and the default adapter is not able to clear a cache entry

* If you want to write custom adapters to communicate with external schedulers

## Custom adapters

The following guide explains how to write your own adapters, for example if you wanted to use the [Heroku Scheduler](https://elements.heroku.com/addons/scheduler/) or your own external logic. 

#### Writing your adapter

Use the file name `my-adapter.js`: 

```javascript
var util = require('util');

// If this require does not work, then your content folder structure is different
// So change the require path so that your adapter can import the scheduling base.
var SchedulingBase = require('../../core/server/adapters/scheduling/SchedulingBase');

function MyAdapter(options) {
    SchedulingBase.call(this, options);
}

util.inherits(MyAdapter, SchedulingBase);

// required functions you need to implement
MyAdapter.prototype.schedule = function(object) {
    // when the job should be executed (time is a UTC timestamp)
    var time = object.time;

    // the url you need to execute when the time is reached
    var url = object.url;

    // the HTTP method you need to use
    var httpMethod = object.extra.httpMethod;
};

MyAdapter.prototype.reschedule = function(object) {
    // see MyAdapter.prototype.schedule

    // the time when the url was scheduled before (oldTime is a UTC timestamp)
    var oldTime = object.extra.oldTime;
};

MyAdapter.prototype.unschedule = function(object) {
    // see MyAdapter.prototype.schedule
};

//this function is called on server bootstrap
MyAdapter.prototype.run = function() {};

module.exports = MyAdapter;
```

#### Implementing your adapter

Copy your new adapter to `content/scheduling/` and edit your config file to identify your new adapter: 

```json
"scheduling": {
  "active": 'my-adapter'
}
```


## Summary
You've found out how to implement a custom scheduling adapter to replace the default scheduler that is installed by Ghost. Utilise this method if you are using a cache in front of your site, or if you want to use external schedulers.

