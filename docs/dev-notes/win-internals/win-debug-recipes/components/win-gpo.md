# Group Policy

- Export GroupPolicy modifications: `gpresult /h './GPReport.html'`
- Query Sids:
  ```batch
  wmic useraccount where sid='S-1-5-18' get domain,name,sid ;@rem get user by SID
  wmic useraccount get disabled,domain,name,sid             ;@rem list all the users and their SIDs
  wmic sysaccount get domain,name,sid                       ;@rem list built-in accounts
  wmic group get domain,name,sid                            ;@rem list Active Directory groups
  net user <username>                                       ;@rem list all info for one user
  net localgroup Administrators                             ;@rem list users in the local Administrators group
  ```
