---
title: "Hosting Ghost"
meta_title: "Hosting a Ghost publication - Fully-managed PaaS & self-hosted"
meta_description: "The most efficient way to deploy an instance of Ghost is on our official fully-managed PaaS. Or you can self-host using our recommended stack!"
keywords:
    - concepts
    - ghost
    - publishing
    - hosting
sidebar: "concepts"
---

A short guide to running Ghost in a production environment and setting it up to serve traffic at scale.


## Ghost(Pro)

The most efficient way to deploy a production-ready instance of Ghost is on our official fully-managed PaaS. **[Ghost(Pro)](https://ghost.org/pricing)** runs the exact same open source codebase and has no limitations compared to self hosting. It's the easiest way to save a lot of time installing and managing your environment.

<style>
.ghostpro-comparison th:not(:first-child),
.ghostpro-comparison td:not(:first-child) {
    text-align: center;
}
.ghostpro-comparison td:nth-child(1) {
    font-weight: 500;
}
.ghostpro-comparison td:nth-child(2) {
    background: #f7fcf3;
}
</style>

<table class="ghostpro-comparison">
    <thead>
        <tr>
            <th></th>
            <th>Ghost(Pro)</th>
            <th>Self-Hosting</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>🎛 Product features</td>
            <td>Identical</td>
            <td>Identical</td>
        </tr>
        <tr>
            <td>🖥 Managed install & setup</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>🔄 Automatic weekly updates</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>🚧 Server maintenance & backups</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>⚠️ Threat & uptime management</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>🔒 SSL Certificate</td>
            <td>Automatic</td>
            <td>Manual</td>
        </tr>
        <tr>
            <td>🌍 Worldwide CDN included</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>🥊 Enterprise-grade security</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>🚑 Customer Support</td>
            <td>Priority Email Support</td>
            <td>Community Support</td>
        </tr>
        <tr>
            <td>❤️ Helps to fund all future<br>development of Ghost software</td>
            <td>✅</td>
            <td>❌</td>
        </tr>
    </tbody>
</table>


## Self-hosting

For self-hosting Ghost in production our officially recommended stack is:

- **Ubuntu 16.04** or **18.04**
- MySQL 5.5, 5.6, or 5.7 (*not* >= 8.0)
- NGINX
- Systemd
- [Recommended Node version](https://docs.ghost.org/faq/node-versions/) installed via NodeSource
- A server with at least 1GB memory
- A non-root user for running `ghost` commands

**Ubuntu 16.04** and **Ubuntu 18.04** are the only officially supported operating systems. Our [Ubuntu install guide](/install/ubuntu/) walks you through how to get a server setup this way.

Other operating systems may work fine and you're welcome to use them, but we are unable to assist with debugging or optimising for them at present - so you're on your own there. Our recommendation: Use Ubuntu, because that's where you'll have the fewest headaches.

#### Selecting a webhost

You can use just about any hosting provider which provides a reasonable VPS to work with. Ghost officially partners with [Digital Ocean](https://digitalocean.com), who also offer a pre-made [Ghost image](https://www.digitalocean.com/docs/one-clicks/ghost/). We recommend them very highly.
