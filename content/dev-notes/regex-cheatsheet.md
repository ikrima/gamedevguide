# Regex Cheat Sheet

## Common Regex Patterns

* ***not***: `[^abc]` e.g. any character except  `a`, `b`, or `c`

* **preceededBy/startsWith**: `(?<=a)b`: find+capture the first `expr b` that ***is*** preceeded by `expr a` i.e. positive lookbehind
  
  ````js
  /(?<=foo)bar/
  "foobar"   => captures 'bar'
  "fffoobar" => captures 'bar'
  "fuubar"   => false
  ````

* **!preceededBy/!startsWith**: `(?<!a)b`: find+capture the first `expr b` that ***is not*** preceeded by `expr a` i.e. negative lookbehind
  
  ````js
  /(?<!not)foo/
  "notfoo"    => false
  "not foo"   => captures 'foo'
  "foo"       => captures 'foo'
  "foobaz"    => captures 'foo'
  ````

* **followedBy/endsWith**: `a(?=b)`: find+capture the first `expr a` that ***is*** followed by `expr b` i.e. positive lookahead
  
  ````js
  /foo(?=bar)/
  "foobar"    => captures 'foo' 
  "foobaz"    => false
  "fffoobaz"  => false
  ````

* **!followedBy/!endsWith**: `a(?!b)`: find+capture the first `expr a` that ***is not*** followed by `expr b` i.e. negative lookahead
  
  ````js
  /foo(?!bar)/
  "foobar"   => false
  "foobaz"   => captures 'foo'
  "fffoobaz" => captures 'foo'
  ````

* more misc examples
  
  ````js
  /(?<!if\s|static\s)constexpr/.match(["if constexpr", "static constexpr", "constexpr"]) => ['constexpr','constexpr', false]
  /\/\/(?! zig fmt: on|\/).*/
  ````

## Useful  Links

* [regex101](https://regex101.com)
* [regex debugger](https://www.debuggex.com)
