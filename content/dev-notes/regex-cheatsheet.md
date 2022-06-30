# Regex Cheat Sheet

## Common Regex Patterns

* **not**: e.g. any character except  `a`, `b`, or `c`
  
  ````regex
  [^abc]
  ````

* **!startsWith**: e.g. `b` not preceded by `a`
  
  ````regex
  (?<!a)b
  (?<!if\s|static\s)constexpr
  ````

* **!endsWith**: e.g. `a` not followed by `b`
  
  ````regex
  a(?!b)
  ````

## Useful  Links

* [regex101](https://regex101.com/)
* [regex debugger](https://www.debuggex.com/)
