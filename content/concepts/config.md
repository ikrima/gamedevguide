---
title: "Config"
meta_title: "Configuration - Adapt your publication to suit your needs"
meta_description: "Find out how to configure your Ghost publication or override Ghost's default behaviour with robust config options, including mail, storage, scheduling and more!"
keywords:
    - config
    - concepts
    - ghost
    - publishing
sidebar: "concepts"
---

For self-hosted Ghost users, a custom configuration file can be used to override Ghost's default behaviour. This provides you with a range of options to configure your publication to suit your needs.


## Overview

When you install Ghost using the supported and recommended method using `ghost-cli`, a custom configuration file is created for you by default. There are some configuration options which are required by default, and many optional configurations.

The three required options are `url` and `database` which are configured during setup, and `mail` which needs to be configured once you've installed Ghost.

This article explains how to setup your mail config, as well as walk you through all of the available config options.


## Custom configuration files

The configuration is managed by [nconf](https://github.com/indexzero/nconf/). A custom configuration file must be a valid JSON file located in the root folder and changes to the file can be implemented using `ghost restart`.

Since Node.js has the concept of environments built in, Ghost supports two environments: **development** and **production**. All public Ghost publications run in production mode, while development mode can be used to test or build on top of Ghost locally.

> Check out the official install guides for [development](/install/local/) and [production](/install/ubuntu/).

The configuration files reflect the environment you are using:

* `config.development.json`
* `config.production.json`


#### Ghost in development
If you would like to start Ghost in development, you don't have to specify any environment, because development is default. To test Ghost in production, you can use:

```bash
NODE_ENV=production node index.js
```

#### Debugging the configuration output
Start Ghost with:

```bash
DEBUG=ghost:*,ghost-config node index.js
```

#### Running Ghost with config env variables
Start Ghost using environment variables which match the name and case of each config option:

```bash
url=http://ghost.local:2368 node index.js
```

For nested config options, separate with two underscores:

```bash
database__connection__host=mysql node index.js
```


## Configuration options
There are a number of configuration options which are explained in detail in this article. Below is an index of all configuration options:

| Name      | Required?     | Description |
| --------- | ------------- | ----------- |
| `url`     | In production | Set the public URL for your blog |
| `database` | In production | Type of database used (default: MySQL) |
| `mail`    | In production | Add a mail service |
| `admin`   | Optional      | Set the protocol and hostname for your admin panel |
| `server`   | Optional | Host and port, or socket for Ghost to listen on |
| `privacy`  | Optional | Disable features set in [privacy.md](https://github.com/TryGhost/Ghost/blob/master/PRIVACY.md/) |
| `paths`   | Optional | Customise internal paths |
| `referrerPolicy` | Optional | Control the content attribute of the meta referrer tag |
| `useMinFiles`   | Optional | Generate assets url with .min notation |
| `storage`   | Optional | Set a custom storage adapter |
| `scheduling` | Optional | Set a custom scheduling adapter |
| `logging`   | Optional | Configure logging for Ghost |
| `spam`   | Optional | Configure spam settings |
| `caching` | Optional | Configure caching settings |
| `compress` | Optional | Disable compression of server responses |
| `imageOptimization` | Optional | Configure image manipulation and processing |


### URL

*(Required in production)*

Once a Ghost publication is installed, the first thing to do is set a url. When installing using `ghost-cli` the install process request the URL during the setup process.

Enter the URL that is used to access your publication. If using a subpath, enter the full path, `https://example.com/blog/`. If using SSL, always enter the URL with `https://`.

#### SSL
We always recommend using SSL to run your Ghost publication in production. Ghost has a number of configuration options for working with SSL, and securing the URLs for the admin `/ghost/` and the frontend of your publication. Without SSL your username and password are sent in plaintext.

`ghost-cli` prompts to setup SSL during the installation process. After a successful ssl setup, you can find your ssl certificate in `/etc/letsencrypt`.

If you see errors such as `access denied from url`, then the provided URL in your config file is incorrect and needs to be updated.


### Database

*(Required in production)*

Ghost is configured using MySQL by default:

```json
"database": {
  "client": "mysql",
  "connection": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "your_database_name"
  }
}
```

Alternatively you can configure sqlite3:

```json
"database": {
  "client": "sqlite3",
  "connection": {
    "filename": "content/data/ghost-test.db"
  },
  "useNullAsDefault": true,
  "debug": false
}
```

#### Number of connections
It's possible to limit the number of simultaneous connections using the pool setting. The default values are a minimum of 2 and a maximum of 10, which means Ghost always maintains two active database connections. You can set the minimum to 0 to prevent this:

```json
"database": {
  "client": ...,
  "connection": { ... },
  "pool": {
    "min": 2,
    "max": 20
  }
}
```

#### SSL
In a typical Ghost installation the MySQL database will be on the same server as Ghost itself. With cloud computing and database-as-a-service providers you might want to enable SSL connections to the database.

If your Certificate CA or the CA of your database provider is in the Mozilla trusted CA list you can enable SSL by adding `"ssl": true` to the database connection configuration:

```json
"database": {
  "client": "mysql",
  "connection": {
    "host": "your_cloud_database",
    "port": 3306,
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "your_database_name",
    "ssl": true
  }
}
```

This has been confirmed to work with Azure Database for MySQL. To find out if your provider is supported see the [Mozilla Included CA Certificate List](https://wiki.mozilla.org/CA/Included_Certificates).

For Amazon RDS you'll need to configure the connection with `"ssl": "Amazon RDS"`:

```json
"database": {
  "client": "mysql",
  "connection": {
    "host": "your_cloud_database",
    "port": 3306,
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "your_database_name",
    "ssl": "Amazon RDS"
  }
}
```

Custom or self-signed certificates are a little more advanced. You'll need to output your CA certificate (not your CA private key) as a single line string including literal new line characters `\n` (you can get the single line string with `awk '{printf "%s\\n", $0}' CustomRootCA.crt`) and add it to the configuration:

```json
"database": {
  "client": "mysql",
  "connection": {
    "host": "your_cloud_database",
    "port": 3306,
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "your_database_name",
    "ssl": {
      "ca": "-----BEGIN CERTIFICATE-----\nMIIFY... truncated ...pq8fa/a\n-----END CERTIFICATE-----\n"
    }
  }
}
```

For a certificate chain, include all CA certificates in the single line string:

```json
"database": {
  "client": "mysql",
  "connection": {
    "host": "your_cloud_database",
    "port": 3306,
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "your_database_name",
    "ssl": {
      "ca": "-----BEGIN CERTIFICATE-----\nMIIFY... truncated ...pq8fa/a\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFY... truncated ...wn8v90/a\n-----END CERTIFICATE-----\n"
    }
  }
}
```

### Mail

*(Required in production)*

The most important piece of configuration once you've been through the install process is to setup mail. Mail configuration allows Ghost to send emails such as lost password and user invite emails.

Ghost uses [Nodemailer 0.7](https://github.com/nodemailer/nodemailer/tree/0.7/) under the hood, and tries to use the direct mail service if available - but a more reliable solution is to setup mail using an external service.

#### Setup an email sending account

Choose an external email service and sign up and verify your account. We highly recommend using [Mailgun](https://www.mailgun.com/) which allows up to 10,000 emails per month for free.

#### Configure mail with Mailgun

Mailgun allows you to use your own domain for sending transactional emails. Otherwise you can use a subdomain that Mailgun provide you with (also known as the sandbox domain, limited to 300 emails per day). You can change this at any time.

**Make a note of your domain information**

Once your domain is setup, find your new email service SMTP username and password that has been created for you (this is not the ones you used to sign up for Mailgun with). You can find this under "Domain Information" and make a note of the following details:

* Default SMTP login
* Default password

#### Update your `config.production.json` file

Open your production config file in any code editor and paste the username and password you just copied into the defined fields, for example:

```json
"mail": {
    "transport": "SMTP",
    "options": {
        "service": "Mailgun",
        "auth": {
            "user": "postmaster@example.mailgun.org",
            "pass": "1234567890"
        }
    }
}
```

Once you are finished, hit save and then run `ghost restart` for your changes to take effect. It is possible to reuse your settings for a development environment if you have both, by making the same changes to `config.development.json`.

#### Secure connection

According your Mailgun settings you may want to force secure connection and the SMTP port.

```json
"mail": {
    "transport": "SMTP",
    "options": {
        "service": "Mailgun",
        "host": "smtp.eu.mailgun.org",
        "port": 465,
        "secureConnection": true,
        "auth": {
            "user": "postmaster@example.mailgun.org",
            "pass": "1234567890"
        }
    }
}
```

#### Amazon SES
It's also possible to use [Amazon Simple Email Service](https://aws.amazon.com/ses/). Use the SMTP username and password given when signing up and configure your `config.[env].json` file as follows:

```json
"mail": {
    "transport": "SMTP",
    "options": {
        "host": "YOUR-SES-SERVER-NAME",
        "port": 465,
        "service": "SES",
        "auth": {
            "user": "YOUR-SES-ACCESS-KEY-ID",
            "pass": "YOUR-SES-SECRET-ACCESS-KEY"
        }
    }
}
```

#### From address

By default the 'from' address for mail sent from Ghost is set to the title of your publication, for example `<ghost@your-publication.com>`. To override this to something different, use:

```json
"mail": {
    "from": "myemail@address.com",
}
```

A custom name can also be provided:

```json
"mail": {
    "from": "'Custom Name' <myemail@address.com>",
}
```


### Admin URL

Admin can be used to specify a different protocol for your admin panel or a different hostname (domain name). It can't affect the path at which the admin panel is served (this is always /ghost/).

```json
"admin": {
  "url": "http://example.com"
}
```

### Server

The server host and port are the IP address and port number that Ghost listens on for requests. By default, requests are routed from port 80 to Ghost by nginx (recommended), or apache.

```json
"server": {
    "host": "127.0.0.1",
    "port": 2368
}
```

#### Unix Sockets
Ghost can also be configured to listen on a unix socket by changing the server config:

```json
"server": {
    "socket": "path/to/socket.sock"
}
```

The default permissions are 0660, but this can be configured by expanding the socket config:

```json
"server": {
    "socket": {
        "path": "path/to/socket.sock",
        "permissions": "0666"
   }
}
```


### Privacy

All features inside the privacy.md file are enabled by default. It is possible to turn these off in order to protect privacy:

* Update check
* Gravatar
* RPC ping
* Structured data

For more information about the features, read the [privacy.md page](https://github.com/TryGhost/Ghost/blob/master/PRIVACY.md/).

To turn off **all** of the features, use:

```json
"privacy": {
    "useTinfoil": true
}
```

Alternatively, configure each feature individually:

```json
"privacy": {
    "useUpdateCheck": false,
    "useGravatar": false,
    "useRpcPing": false,
    "useStructuredData": false
}
```


### Paths

The configuration of paths can be relative or absolute. To use a content directory that does not live inside the Ghost folder, specify a paths object with a new contentPath:

```json
"paths": {
    "contentPath": "content/"
},
```
When using a custom content path, the content directory must exist and contain sub directories for data, images, themes, logs and adapters.

> If using an Sqlite database, you'll also need to update the path to your database to match the new location of the data folder.


### Referrer Policy

Set the value of the content attribute of the meta referrer HTML tag by adding referrerPolicy to your config. `origin-when-crossorigin` is default. Read through all possible [options](https://www.w3.org/TR/referrer-policy/#referrer-policies/).


### Logging

Configure how Ghost should log, for example:

```json
"logging": {
  "path": "something/",
  "level": "info",
  "rotation": {
    "enabled": true,
    "count": 15,
    "period": "1d"
  },
  "transports": ["stdout", "file"]
}
```

#### `level`

The default log level is `info` which prints all info, warning and error logs. Set it to `error` to only print errors.

#### `rotation`

Tell Ghost to rotate your log files. By default Ghost keeps 10 log files and rotates every day. Rotation is enabled by default in production and disabled in development.

#### `transports`

Define where Ghost should log to. By default Ghost writes to stdout and into file for production, and to stdout only for development.

#### `path`

Log your content path, e.g. `content/logs/`. Set any path but ensure the permissions are correct to write into this folder.


### Spam

Tell Ghost how to treat [spam requests](https://github.com/TryGhost/Ghost/blob/master/core/server/config/defaults.json#L31).


### Caching

Configure [caching](https://github.com/TryGhost/Ghost/blob/master/core/server/config/defaults.json#L57/) for sitemaps, redirects or assets.


### Compress

The compression flag is turned on by default using `"compress": true`. Alternatively you can turn it off with `"compress": false`.


### Image optimisation

When uploading images into the Ghost editor, they are automatically processed and compressed by default. This can be disabled in your `config.[env].json` file using:

```json
"imageOptimization": {
  "resize": false
}
```

Image compression details:

* Resize the image to 2000px max width
* JPEG's are compressed to 80% quality.
* Meta data removed

The original image is kept with the suffix `_o`.


## Summary

You've explored how to configure a self-hosted Ghost publication with the required config options, as well as discovered how to make use of the optional config options that are available in the `config.[env].json` file.

If you run into any issues when configuring your publication, try searching this site to find information about common error messages and issues.
