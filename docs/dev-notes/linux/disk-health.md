# Disk Health

<https://help.ubuntu.com/community/Smartmontools>

- [Failure Trends in a Large Disk Drive Population](../_assets/linux/failure-trends-in-large-disk-drive-population.pdf)
  
  - Google field study covering 100,000+ consumer-grade drives from 12/2005-08/2006
  - correlations between certain S.M.A.R.T. information and annualized failure rates:
  ||||
  |--|--|--|
  |`uncorrectable error`|`198 (0xC6)`|after _**1st**_ error drives are _**39x**_ more likely to fail _**within 60 days**_|
  |`reallocation count`|`5   (0x05)`|after _**1st**_ error drives are _**14x**_ more likely to fail _**within 60 days**_|
  |`offline reallocations`|`196 (0xC4)`|after _**1st**_ error drives are _**21x**_ more likely to fail _**within 60 days**_|
  |`probational/current pending sector counts`|`197 (0xC5)`|after _**1st**_ error drives are _**14x**_ more likely to fail _**within 60 days**_|
  |`Temperature`||little correlation except at at extremes _**40-45°**_,_**\>45°**_|
  |`Seek Errors`||little correlation|
  |`CRC Errors`||little correlation|
  |`Power Cycles`||little correlation|
  |`Calibration Retries`||little correlation|
  |`Spin Retries`||little correlation|
  |`Power-on hours`||little correlation|
  |`Vibration`||little correlation|
  
   > 
   > \[!warning\] Large number of drive failures occur with minimal to no warnings
   > 
   > - _**56%**_ failed drives: _**zero**_ counts in _**major**_ `SMART` errors (`scan errors`, `reallocation count`, `offline reallocation`, `probational count`)
   > - _**36%**_ failed drives: _**zero**_ counts in _**all**_ `SMART` errors
