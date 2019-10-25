---
title: "Ghost Security"
meta_title: "Security and Privacy"
meta_description: "Ghost is committed to developing secure, reliable products utilising all modern security best practices. Find out more about our security and privacy."
keywords:
    - concepts
    - ghost
    - publishing
    - security
sidebar: "concepts"
---

Ghost is committed to developing secure, reliable products utilising all modern security best practices and processes.

The Ghost security team is made up of full time staff employed by the Ghost Foundation as well as volunteer open source contributors and security experts. We do both consultation and penetration testing of our software and infrastructure with external security researchers and agencies.

We take security very seriously at Ghost and welcome any peer review of our completely [open source codebase](https://github.com/tryghost/ghost) to help ensure that it remains completely secure.


## Security features

### Automatic SSL

Ghost's CLI tool attempts to automatically configure SSL certificates for all new Ghost installs with Let's Encrypt by default. In 2019 we intend to make SSL mandatory for all new installs.

### Standardised permissions

Ghost-CLI does not run as `root` and automatically configures all server directory permissions correctly according to [OWASP Standards](https://www.owasp.org/index.php/File_System).

### Brute force protection

User login attempts and password reset requests are all limited to 5 per hour per IP.

### Data validation and serialisation

Ghost performs strong serialisation and validation on all data that goes into the database, as well as automated symlink protection on all uploaded files.

### Encoded tokens everywhere

All user invitation and password reset tokens are base64 encoded with serverside secret. All tokens are always single use and always expire.

### Password hashing

Ghost follows [OWASP authentication standards](https://www.owasp.org/index.php/Top_10-2017_A2-Broken_Authentication) with all passwords hashed and salted properly using `bcrypt` to ensure password integrity.

### SQLi prevention

Ghost uses [Bookshelf](http://bookshelfjs.org) ORM + [Knex](https://knexjs.org) query builder and does not generate _any_ of its own raw SQL queries. Ghost has no interpolation of variables directly to SQL strings.

### XSS prevention

Ghost uses safe/escaped strings used everywhere, including and especially in all custom Handlebars helpers used in [Ghost Themes](/api/handlebars-themes/)

### Dependency management

All Ghost dependencies are continually scanned with [NSP](https://github.com/nodesecurity/nsp) to ensure their integrity.

---

## Privacy

Ghost as an organisation is profitable, wholly independent, and only makes revenue directly from its customers. It has zero business interests of any kind predicated on selling private user data to third parties.

In addition the Ghost software itself contains [a plainly written summary](https://github.com/TryGhost/Ghost/blob/master/PRIVACY.md) of every privacy-affecting feature within Ghost, along with detailed configuration options allowing any and all of them to be disabled at will.

We take user privacy extremely seriously.

