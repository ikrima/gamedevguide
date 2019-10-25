---
title: "Reporting Vulnerabilities"
meta_title: "Reporting Security Vulnerabilities in Ghost Core"
meta_description: "Find out how to take part in responsible disclosure to the Ghost security team."
keywords:
    - concepts
    - ghost
    - publishing
    - vulnerabilities
sidebar: "concepts"
---

Take part in responsible disclosure to the Ghost Security team

Potential security vulnerabilities can be reported directly to us at `security@ghost.org`. The Ghost Security Team communicates privately and works in a secured, isolated repository for tracking, testing, and resolving security-related issues.


## Responsible disclosure guidelines

The Ghost Security team is committed to working with security researchers to verify, reproduce and respond to legitimate reported vulnerabilities.

- Provide details of the vulnerability, including information needed to reproduce and validate the vulnerability and a Proof of Concept
- Make a good faith effort to avoid privacy violations, destruction and modification of data on live sites
- Give reasonable time to correct the issue before making any information public

Security issues always take precedence over bug fixes and feature work. We can and do mark releases as "urgent" if they contain serious security fixes.

We will publicly acknowledge any report that results in a security commit to https://github.com/TryGhost/Ghost
  

## Issue triage

We're always interested in hearing about any reproducible vulnerability that affects the security of Ghost users, including...

- Cross Site Scripting (XSS)
- Cross Site Request Forgery (CSRF)
- Server Side Request Forgery (SSRF)
- Remote Code Execution (RCE)
- SQL Injection (SQLi)

#### However, we're generally _not_ interested in...

- [Privilege escalation](#privilege-escalation-attacks) as result of trusted users publishing arbitrary JavaScript<sup><a href="#privilege-escalation-attacks">1</a><sup>
- HTTP sniffing or HTTP tampering exploits
- Open API endpoints serving public data
- Ghost version number disclosure
- Brute force, DoS, DDoS, phishing, text injection, or social engineering attacks.
- Output from automated scans
- Clickjacking with minimal security implications

#### Privilege escalation attacks

Ghost is a content management system and all users are considered to be privileged/trusted. A user can only obtain an account and start creating content after they have been invited by the site owner or similar adminstrator-level user.

A basic feature of Ghost as a CMS is to allow content creators to make use of scripts, SVGs, or embedded content that is required for the content to display as intended. Because of this there will always be the possibility of "XSS" attacks, albeit only from users that have been trusted to build the site's content.

Ghost's admin application does a lot to ensure that unknown scripts are not run within the the admin application itself, however that only protects one side of a Ghost site. If the front-end (the rendered site that anonymous visitors see) shares the same domain as the admin application then browsers do not offer sufficient protections to prevent successful XSS attacks by trusted users.

If you are concerned that trusted users you invite to create your site will act maliciously the best advice is to split your front-end and admin area onto different domains (e.g. `https://mysite.com` and `https://mysiteadmin.com/ghost/`). This way browsers offer greater built-in protection because credentials cannot be read across domains. Even in this case it should be understood that you are giving invited users completely free reign in content creation so absolute security guarantees do not exist.

We take any attack vector where an untrusted user is able to inject malicious content very seriously and welcome any and all reports.

## How reports are handled

If you report a vulnerability to us through the security@ghost.org mailing list, we will:

- Acknowledge your email within a week
- Investigate and let you know our findings within two weeks
- Ensure any critical issues are resolved within a month
- Ensure any low-priority issues are resolved within three months
- Credit any open source commits to you
- Let you know when we have released fixes for issues you report
