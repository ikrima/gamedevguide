---
title: "How to install Ghost on Ubuntu"
date: "2018-10-01"
meta_title: "How to install & setup Ghost on Ubuntu 16.04 + 18.04"
meta_description: "A full production install guide for how to install the Ghost professional publishing platform on a production server running Ubuntu 16.04 or 18.04."
keywords:
    - setup
    - production
    - server
    - ubuntu
---

A full guide for installing, configuring and running Ghost on your Ubuntu **16.04** or **18.04** server, for use in production

## Overview

This the official guide for self-hosting Ghost using our recommended stack of Ubuntu 16.04 or 18.04. If you're comfortable installing, maintaining and updating your own software, this is the place for you. By the end of this guide you'll have a fully configured Ghost install running in production using MySQL.

This install is **not** suitable for [local use](/install/local/) or [contributing](/install/source/) to core.

<a class="sbox" href="https://www.digitalocean.com/docs/one-clicks/ghost/" target="_blank" rel="noopener">
    <div class="sbox-image">
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="65.2 173.5 180 180"><style>.st0{fill:#0080ff}</style><g id="XMLID_229_"><g id="XMLID_690_"><g id="XMLID_691_"><g id="XMLID_44_"><g id="XMLID_48_"><path id="XMLID_49_" class="st0" d="M155.2 351.7v-34.2c36.2 0 64.3-35.9 50.4-74-5.1-14.1-16.4-25.4-30.5-30.5-38.1-13.8-74 14.2-74 50.4H67c0-57.7 55.8-102.7 116.3-83.8 26.4 8.3 47.5 29.3 55.7 55.7 18.9 60.6-26 116.4-83.8 116.4z"/></g><path id="XMLID_47_" class="st0" d="M155.3 317.6h-34v-34h34z"/><path id="XMLID_46_" class="st0" d="M121.3 343.8H95.1v-26.2h26.2z"/><path id="XMLID_45_" class="st0" d="M95.1 317.6H73.2v-21.9h21.9v21.9z"/></g></g></g></g></svg>
    </div>
    <div class="sbox-content">
        <h4>Save time with our DigitalOcean One-Click Application</h4>
        <p>This is a detailed manual install guide, but we've also teamed up with our friends over at DigitalOcean to  automate nearly the entire process and have you up and running in just a few minutes 👉</p>
    </div>
</a>


## Prerequisites

The officially recommended production installation requires the following stack:

* Ubuntu 16.04 or Ubuntu 18.04
* NGINX (minimum of 1.9.5 for SSL)
* A [supported version](https://docs.ghost.org/faq/node-versions/) of [Node.js](https://nodejs.org)
* MySQL 5.5, 5.6, or 5.7 (*not* >= 8.0)
* Systemd
* A server with at least 1GB memory
* A registered domain name

Before getting started you should set an **A record** from the domain you plan to use, pointing at the server’s IP address and ensure that it's resolving correctly. This must be done in advance so that SSL can be properly configured during setup.


---


## Server Setup

This part of the guide will ensure all prerequisites are met for installing the Ghost-CLI.

### Create a new user 👋

Open up your terminal and login to your new server as the root user:

```bash
# Login via SSH
ssh root@your_server_ip

# Create a new user and follow prompts
adduser <user>
```

> Note: Using the user name `ghost` causes conflicts with the Ghost-CLI, so it’s important to use an alternative name.

```bash
# Add user to superuser group to unlock admin privileges
usermod -aG sudo <user>

# Then log in as the new user
su - <user>
```

### Update packages

Ensure package lists and installed packages are up to date.

```bash
# Update package lists
sudo apt-get update

# Update installed packages
sudo apt-get upgrade
```

Follow any prompts to enter the password you just created in the previous step.

### Install NGINX

Ghost uses an NGINX server and the SSL configuration requires NGINX 1.9.5 or higher.

```bash
# Install NGINX
sudo apt-get install nginx
```

If `ufw` was activated, the firewall allows HTTP and HTTPS connections. Open Firewall:

```bash
sudo ufw allow 'Nginx Full'
```

### Install MySQL

Next, you'll need to install MySQL to be used as the production database.

```bash
# Install MySQL
sudo apt-get install mysql-server
```

#### MySQL on Ubuntu 18.04

If you’re running Ubuntu 18.04, a password is required to ensure MySQL is compatible with `Ghost-CLI`. This requires a few extra steps!

```bash
# To set a password, run
sudo mysql

# Now update your user with this password
# Replace 'password' with your password, but keep the quote marks!
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

# Then exit MySQL
quit

# and login to your Ubuntu user again
su - <user>
```


### Install Node.js

You will need to have a [supported version](https://ghost.org/faq/node-versions/) of Node installed system-wide in the manner described below. If you have a different setup, you may encounter problems.

```bash
# Add the NodeSource APT repository for Node 10
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash

# Install Node.js
sudo apt-get install -y nodejs
```

---

## Install Ghost-CLI

[Ghost-CLI](/api/ghost-cli/) is a commandline tool to help you get Ghost installed and configured for use, quickly and easily. The npm module can be installed with `npm` or `yarn`.

```bash
sudo npm install ghost-cli@latest -g
```

Once installed, you can always run `ghost help` to see a list of available commands.


---


## Install Ghost

Once your server is correctly setup and the `ghost-cli` is installed, you can install Ghost. The following steps are the recommended setup. If you would prefer more fine-grained control, the CLI has [flags and options](/api/ghost-cli/) that allow you to break down the steps and customise exactly what they do.

> Note: Installing Ghost in the `/root` or `home/<user>` directories results in a broken setup. Always use a custom directory with properly configured permissions.


### Create a directory
Create a directory for your installation, then set the owner and permissions.

```bash
# We'll name ours 'ghost' in this example; you can use whatever you want
sudo mkdir -p /var/www/ghost

# Replace <user> with the name of your user who will own this directory
sudo chown <user>:<user> /var/www/ghost

# Set the correct permissions
sudo chmod 775 /var/www/ghost

# Then navigate into it
cd /var/www/ghost
```


### Run the install process

Now you've made it this far, it's time to install Ghost with a single command 😀

```bash
ghost install
```

### Install questions

During install, the CLI will ask a number of questions to configure your site.

#### Blog URL

Enter the exact URL your publication will be available at and include the protocol for HTTP or HTTPS. For example, `https://example.com`. If you use HTTPS, Ghost-CLI will offer to set up SSL for you. Using IP addresses will cause errors.


#### MySQL hostname

This determines where your MySQL database can be accessed from. When MySQL is installed on the same server, use `localhost` (press <kbd>Enter</kbd> to use the default value). If MySQL is installed on another server, enter the name manually.

#### MySQL username / password

If you already have an existing MySQL database enter the the username. Otherwise, enter `root`. Then supply the password for your user.


#### Ghost database name

Enter the name of your database. It will be automatically set up for you, unless you're using a **non**-root MySQL user/pass. In that case the database must already exist and have the correct permissions.

#### Set up a ghost MySQL user? <small>(Recommended)</small>

If you provided your root MySQL user, Ghost-CLI can create a custom MySQL user that can only access/edit your new Ghost database and nothing else.

#### Set up NGINX? <small>(Recommended)</small>

Sets NGINX up automatically enabling your site to be viewed by the outside world. Setting up NGINX manually is possible, but why would you choose a hard life?

#### Set up SSL? <small>(Recommended)</small>

If you used an `https` Blog URL and have already pointed your domain to the right place, Ghost-CLI can automatically set up SSL for you using [Let's Encrypt](https://letsencrypt.org). Alternatively you do this later by running `ghost setup ssl` at any time.

**Enter your email**<br>
SSL certification setup requires an email address so that you can be kept informed if there is any issue with your certificate, including during renewal.

#### Set up systemd? <small>(Recommended)</small>

`systemd` is the recommended process manager tool to keep Ghost running smoothly. We recommend choosing `yes` but it’s possible to set up your own process management.

#### Start Ghost?

Choosing `yes` runs Ghost, and makes your site work.


---


## Future maintenance

Once Ghost is properly set up it's important to keep it properly maintained and up to date. Fortunately, this is relatively easy to do using Ghost-CLI. Run `ghost help` for a list of available commands, or explore the full [Ghost-CLI documentation](/api/ghost-cli/).

---


## What to do if the install fails

If an install goes horribly wrong, use `ghost uninstall` to remove it and try again. This is preferable to deleting the folder to ensure no artifacts are left behind.

If an install is interrupted or the connection lost, use `ghost setup` to restart the configuration process.

For troubleshooting and errors, use the site search and [FAQ section](https://docs.ghost.org/faq/errors/) to find information about common error messages.


---

## What's next?

You're all set! Now you can start customising your site. Check out our range of [tutorials](https://docs.ghost.org/tutorials/) or the Ghost [API documentation](/api/) depending on which page of this choose-your-own-adventure experience you'd like to subject yourself to next.
