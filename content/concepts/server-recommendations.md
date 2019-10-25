---
title: "Server Recommendations"
meta_title: "Server Recommendations – Considerations for self-hosting"
meta_description: "Find out what the recommended options are for self-hosting a Ghost publication on your server for the highest security and performance."
keywords:
    - concepts
    - ghost
    - publishing
    - server
sidebar: "concepts"
---

When self-hosting there are a few additional steps to consider for security and performance.

## Server hardening

After setting up a fresh Ubuntu install in production, it's worth considering the following steps to make your new environment extra secure and resilient:

### Securing MySQL

We strongly recommend running `mysql_secure_installation` after successful setup to significantly improve the security of your database.

### Setting up a firewall

Ubuntu 18.04 servers can use the UFW firewall to make sure only connections to certain services are allowed. We recommend setting up UFW rules for `ssh`, `nginx`, `http`, and `https`. If you do use UFW, make sure you don't use any other firewalls.

### Disable SSH Root & password logins

It's a very good idea to disable SSH password based login and *only* connect to your server via proper SSH keys. It's also a good idea to disable the root user. 


## Optimising for scale

The correct way to scale Ghost is by adding a CDN and/or caching layer in front of your Ghost instance. **Clustering or sharding is not supported in any way.** 

Every day 2-5 of the top stories on Hacker News are published with Ghost, and to the best of our knowledge no Ghost site has ever fallen over as a result of a traffic spike. Minimal, sensible caching is more than enough.


## Staying up to date

Whenever running a public-facing production web server it's **critically important** to keep all software up to date. If you don't keep everything up to date, you place your site and your server at risk of numerous potential exploits and hacks.

If you can't manage these things yourself, ensure that a systems administrator on your team is able to keep everything updated on your behalf.

If you don't have someone to manage your server and don't want to deal with any of the things on this page, consider using **[Ghost(Pro)](https://ghost.org/pricing)**, where all of this is handled on your behalf. It will save a significant amount of time.
