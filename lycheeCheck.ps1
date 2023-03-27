$lycheeReport = normpath (New-TempDir 'lychee' -Prefix:'gdg') 'report.md'
$lychee_args = @(
  # '-vv'                                # Verbose program output
  # '--no-progress'                      # Don't show interactive progress bar while checking links

  '-o', $lycheeReport                    # Path to summary output file
  '-f', 'Markdown'                       # Format

  #================================================
  # Cache
  '--cache'                              # Enable link caching. This can be helpful to avoid checking the same links on multiple runs
  '--max-cache-age', '2d'                # Discard all cached requests older than this duration

  #================================================
  # Runtime

  # '--threads'       , 2                # Number of threads to utilize. Defaults to number of cores available to the system if omitted
  # '--max-redirects' , 10               # Maximum number of allowed redirects
  '--max-retries'     , 1                # Maximum number of allowed retries before a link is declared dead
  '--max-concurrency' , 14               # Maximum number of concurrent link checks

  #================================================
  # Requests

  '--timeout'         , 20               # Website timeout from connect to response finished
  '--retry-wait-time' , 2                # Minimum wait time in seconds between retries of failed requests

  #================================================
  # Exclusions

  # '--skip-missing'                     # Skip missing input files (default is to error if they don't exist)
  # '--include-verbatim'                 # Check links inside `<code>` and `<pre>` blocks as well as Markdown code blocks
  # '--glob-ignore-case'                 # Ignore case of paths when matching glob patterns
  # '--exclude-all-private'              # Exclude all private IPs from checking. Equivalent to setting `exclude-private`, `exclude-link-local`, and `exclude-loopback` to true
  # '--exclude-private'                  # Exclude private IP address ranges from checking
  # '--exclude-link-local'               # Exclude link-local IP address range from checking
  # '--exclude-loopback'                 # Exclude loopback IP address range and localhost from checking
  '--exclude-mail'                       # Exclude all mail addresses from checking
  # '--exclude-path', (@() -join ' ')    # Exclude these filesystem paths from getting checked


  #================================================
  # Base URL or website root directory to check relative URLs
  '--base', "file:///$(normpath -TrimEndSep $PSScriptRoot 'docs')/"

  # File list
  'docs\blog'
  'docs\design'
  'docs\dev-notes'
  'docs\graphics'
  'docs\houdini'
  'docs\math'
  'docs\pkm'
  # 'docs\ue4guide'
)

'================================================' | PPHeader
'Lychee Link Checker:'                             | PPHeader
'------------------------------------------------' | PPHeader
"  lychee.exe $($lychee_args -join ' ')"           | PPAction
& lychee.exe $lychee_args
''                                                 | PPInfo
"  Report: [$lycheeReport]"                        | PPNote
'================================================' | PPHeader

# $lychee_args -join ' ' | clip
# & lychee.exe -vv --dump $lychee_args
