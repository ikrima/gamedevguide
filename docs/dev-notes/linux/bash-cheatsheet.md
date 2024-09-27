# Bash Cheatsheet

## Resources

- [Devhints Cheatsheet](https://devhints.io/bash)
- [Learn Bash in Y Minutes](https://learnxinyminutes.com/docs/bash/): short quickstart crash course
- [Bash Scripting 101](https://help.ubuntu.com/community/Beginners/BashScripting)
- [Bash Beginner Series](https://linuxhandbook.com/tag/bash-beginner/)

## Shell Customization

### Dotfiles

- [more details](https://www.webpro.nl/articles/getting-started-with-dotfiles)

- `.gitattributes`
  
  ```ini
  * text=auto eol=lf
  *.{cmd,[cC][mM][dD]} text eol=crlf
  *.{bat,[bB][aA][tT]} text eol=crlf
  ```

- better aliases using modern linux tools
  
  ```bash
  echo 'ls:  '; exp 'eza --icons --git'
  echo 'l:   '; exp 'eza -alg --color=always --group-directories-first --git'
  echo 'll:  '; exp 'eza -aliSgh --color=always --group-directories-first --icons --header --long --git'
  echo 'lt:  '; exp 'eza -@alT --color=always --git'
  echo 'llt: '; exp 'eza --oneline --tree --icons --git-ignore'
  echo 'lr:  '; exp 'eza -alg --sort=modified --color=always --group-directories-first --git'
  ```

### Startup Scripts

- simplified flow [(reference)](https://stackoverflow.com/a/9954208/21979545)
  
  ```txt
                      +-----------------+   +------FIRST------+   +-----------------+
                      |                 |   | ~/.bash_profile |   |                 |
  login shell -------->|  /etc/profile   |-->| ~/.bash_login ----->|  ~/.bashrc      |
                      |                 |   | ~/.profile      |   |                 |
                      +-----------------+   +-----------------+   +-----------------+
                      +-----------------+   +-----------------+
                      |                 |   |                 |
  interactive shell -->|  /etc/bashrc ------>| ~/.bashrc       |
                      |                 |   |                 |
                      +-----------------+   +-----------------+
                      +-----------------+
                      |                 |
  logout shell ------->|  ~/.bash_logout |
                      |                 |
                      +-----------------+
  ```
  
  - `[]-->[]`:  _**automatically**_ sourced by workflow
  - `[--->[]`:  _**manually**_ sourced by convention
  - `FIRST`:    _**only first available**_ executed
  - `echo "${BASH_SOURCE[0]}"`: use to inspect script's sourcing origins
- detailed flow [(reference)](https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/)
  
  ||Interactive Login|Non-Interactive Login|Interactive Non-Login|Non-Interactive Non-Login|Script|
  |--|:---------------:|:-------------------:|:-------------------:|:-----------------------:|:----:|
  |/etc/profile|1|1||||
  |/etc/bash.bashrc|||1|||
  |~/.bashrc|||2|||
  |~/.bash_profile|2.A|2.A||||
  |~/.bash_login|2.B|2.B||||
  |~/.profile|2.C|2.C||||
  |BASH_ENV||||1|1|
  |~/.bash_logout|3|3||||

## Variables

- generally quote your variables unless they contain wildcards to expand or command fragments
  ```bash
  name="John"
  echo $name  # see below
  echo "$name"
  echo "${name}!"
  wildcard="*.txt"
  option="iv"
  cp -$options $wildcard /tmp
  ```

### Special Variables

- [(Reference)](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables)

|Expression|Description|
|----------|-----------|
|`$?`|Exit status of last task|
|`$!`|PID of last background task|
|`$$`|PID of shell|
|`$0`|Filename of the shell script|
|`$_`|Last argument of the previous command|
|`${PIPESTATUS[n]}`|return value of piped commands (array)|

## String Quotes

```bash
name="John"
echo "Hi $name"  #=> Hi John
echo 'Hi $name'  #=> Hi $name
```

## Arrays

### Array Declaration

```bash
Fruits=('Apple' 'Banana' 'Orange')

Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### Array Access

```bash
echo "${Fruits[0]}"              # Element #0
echo "${Fruits[-1]}"             # Last element
echo "${Fruits[@]}"              # All elements, space-separated
echo "${Fruits[*]}"              # All elements, space-separated
echo "${#Fruits[@]}"             # Number of elements
echo "${#Fruits}"                # String length of the 1st element
echo "${#Fruits[3]}"             # String length of the Nth element
echo "${Fruits[@]:3:2}"          # Range (from position 3, length 2)
echo "${!Fruits[@]}"             # Keys of all elements, space-separated
for item in "${Fruits[@]}"; do   # Array iteration
  echo "$item"
done
```

### Array Operations

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also Push
Fruits=( "${Fruits[@]/Ap*/}" )          # Remove by regex match
unset Fruits[2]                         # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
lines=(`cat "logfile"`)                 # Read from file
```

## Conditionals

### `[` vs `[[`

- `[`: shell command shorthand for `test` command
- `[[`: shell keyword with quality of life nicities
  - integer comparison operators: `==`,`!=`,`<`,`<=`,`>`,`>=`
    ```bash
    [[ 1 < 2 ]] && echo "true"
    [ 1 \< 2  ] && echo "true"
    [ 1 -lt 2 ] && echo "true"
    ```
  
  - logic/grouping operators: `&&`,`||`,`(`,`)`
  - pattern matching: `[ $name = *c* ]`
  - regular expressions: `[[ $name =~ ^Ali ]]`

### Conditions

Any program that obeys the same logic (like all base utils, such as `grep(1)` or `ping(1)`) can be used as condition, see examples.

|Condition|Description|
|---------|-----------|
|`[[ -z STRING ]]`|Empty string|
|`[[ -n STRING ]]`|Not empty string|
|`[[ STRING == STRING ]]`|Equal|
|`[[ STRING != STRING ]]`|Not Equal|
|||
|`[[ NUM -eq NUM ]]`|Equal|
|`[[ NUM -ne NUM ]]`|Not equal|
|`[[ NUM -lt NUM ]]`|Less than|
|`[[ NUM -le NUM ]]`|Less than or equal|
|`[[ NUM -gt NUM ]]`|Greater than|
|`[[ NUM -ge NUM ]]`|Greater than or equal|
|||
|`[[ STRING =~ STRING ]]`|Regexp|
|||
|`(( NUM < NUM ))`|Numeric conditions|
|||
|`[[ -o noclobber ]]`|If OPTIONNAME is enabled|
|||
|`[[ ! EXPR ]]`|Not|
|`[[ X && Y ]]`|And|
|\`\[\[ X||

### File Conditions

|Condition|Description|
|---------|-----------|
|`[[ -e FILE ]]`|Exists|
|`[[ -r FILE ]]`|Readable|
|`[[ -h FILE ]]`|Symlink|
|`[[ -d FILE ]]`|Directory|
|`[[ -w FILE ]]`|Writable|
|`[[ -s FILE ]]`|Size is > 0 bytes|
|`[[ -f FILE ]]`|File|
|`[[ -x FILE ]]`|Executable|
|||
|`[[ FILE1 -nt FILE2 ]]`|1 is more recent than 2|
|`[[ FILE1 -ot FILE2 ]]`|2 is more recent than 1|
|`[[ FILE1 -ef FILE2 ]]`|Same files|

### Examples

```bash
# String
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
else
  echo "This never happens"
fi
```

```bash
# Combinations
if [[ X && Y ]]; then
  ...
fi
```

```bash
# Equal
if [[ "$A" == "$B" ]]
```

```bash
# Regex
if [[ "A" =~ . ]]
```

```bash
if (( $a < $b )); then
   echo "$a is smaller than $b"
fi
```

```bash
if [[ -e "file.txt" ]]; then
  echo "file exists"
fi
```

## Command Execution

### Shell Execution

```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`"  # deprecated
# Same
```

### Conditional Execution

```bash
git commit && git push
git commit || echo "Commit failed"
```

### Command substitution

[(Reference)](http://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

## Strict Mode

- [Reference](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

```bash
set -euo pipefail
IFS=$'\n\t'
```

## Parameter Expansions

### Basic Examples

```bash
name="John"
echo "${name}"
echo "${name/J/j}"    #=> "john" (substitution)
echo "${name:0:2}"    #=> "Jo" (slicing)
echo "${name::2}"     #=> "Jo" (slicing)
echo "${name::-1}"    #=> "Joh" (slicing)
echo "${name:(-1)}"   #=> "n" (slicing from right)
echo "${name:(-2):1}" #=> "h" (slicing from right)
echo "${food:-Cake}"  #=> $food or "Cake"
```

```bash
length=2
echo "${name:0:length}"  #=> "Jo"
```

### Expanded Examples

- [(Reference)](http://wiki.bash-hackers.org/syntax/pe)

```bash
str="/path/to/foo.cpp"
echo "${str%.cpp}"    # /path/to/foo
echo "${str%.cpp}.o"  # /path/to/foo.o
echo "${str%/*}"      # /path/to

echo "${str##*.}"     # cpp (extension)
echo "${str##*/}"     # foo.cpp (basepath)

echo "${str#*/}"      # path/to/foo.cpp
echo "${str##*/}"     # foo.cpp

echo "${str/foo/bar}" # /path/to/bar.cpp
```

```bash
str="Hello world"
echo "${str:6:5}"   # "world"
echo "${str: -5:5}"  # "world"
```

```bash
src="/path/to/foo.cpp"
base=${src##*/}   #=> "foo.cpp" (basepath)
dir=${src%$base}  #=> "/path/to/" (dirpath)
```

### Substitution

|Code|Description|
|----|-----------|
|`${foo%suffix}`|Remove suffix|
|`${foo#prefix}`|Remove prefix|
|||
|`${foo%%suffix}`|Remove long suffix|
|`${foo/%suffix}`|Remove long suffix|
|`${foo##prefix}`|Remove long prefix|
|`${foo/#prefix}`|Remove long prefix|
|||
|`${foo/from/to}`|Replace first match|
|`${foo//from/to}`|Replace all|
|||
|`${foo/%from/to}`|Replace suffix|
|`${foo/#from/to}`|Replace prefix|

### Comments

```bash
# Single line comment
```

```bash
: '
This is a
multi line
comment
'
```

### Substrings

|Expression|Description|
|----------|-----------|
|`${foo:0:3}`|Substring _(position, length)_|
|`${foo:(-3):3}`|Substring from the right|

### Length

|Expression|Description|
|----------|-----------|
|`${#foo}`|Length of `$foo`|

### Manipulation

```bash
str="HELLO WORLD!"
echo "${str,}"   #=> "hELLO WORLD!" (lowercase 1st letter)
echo "${str,,}"  #=> "hello world!" (all lowercase)

str="hello world!"
echo "${str^}"   #=> "Hello world!" (uppercase 1st letter)
echo "${str^^}"  #=> "HELLO WORLD!" (all uppercase)
```

### Default values

|Expression|Description|
|----------|-----------|
|`${foo:-val}`|`$foo`, or `val` if unset (or null)|
|`${foo:=val}`|Set `$foo` to `val` if unset (or null)|
|`${foo:+val}`|`val` if `$foo` is set (and not null)|
|`${foo:?message}`|Show error message and exit if `$foo` is unset (or null)|

 > 
 > \[!note\] Omitting the `:` removes the (non)nullity checks
 > e.g. `${foo-val}` expands to `val` if unset otherwise `$foo`

## Loops

### Basic for loop

```bash
for i in /etc/rc.*; do
  echo "$i"
done
```

### C-like for loop

```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo "$i"
done
```

### Ranges

```bash
# Basic
for i in {1..5}; do
  echo "Welcome $i"
done

# With step size
for i in {5..50..5}; do
  echo "Welcome $i"
done
```

### Reading lines

```bash
while read -r line; do
  echo "$line"
done <file.txt
```

### Forever

```bash
while true; do
  ...
done
```

## Functions

### Defining functions

```bash
myfunc() {
  echo "hello $1"
}
```

```bash
# Same as above (alternate syntax)
function myfunc() {
  echo "hello $1"
}
```

```bash
myfunc "John"
```

### Returning values

```bash
myfunc() {
  local myresult='some value'
  echo "$myresult"
}
```

```bash
result=$(myfunc)
```

### Raising errors

```bash
myfunc() {
  return 1
}
```

```bash
if myfunc; then
  echo "success"
else
  echo "failure"
fi
```

## Positional Parameters

|Expression|Description|
|----------|-----------|
|`$#`|Number of arguments|
|`$*`|All positional arguments  (as a single word)|
|`$@`|All positional arguments (as separate strings)|
|`$1`|First argument|
|`$_`|Last argument of the previous command|

 > 
 > \[!note\] `$@` and `$*` must be quoted; unquoted behavior is exactly the same i.e. args as separate strings

### `$@` vs `$*` Example

```bash
print_params() { 
  echo "\$1 = $1"
  echo "\$2 = $2"
  echo "\$3 = $3"
  echo "\$4 = $4"
}
pass_params() {
  echo -e "\n" '$* =>';   print_params $*
  echo -e "\n" '"$*" =>'; print_params "$*"
  echo -e "\n" '$@ =>';   print_params $@
  echo -e "\n" '"$@" =>'; print_params "$@"
}

pass_params "word" "words with spaces"
$* =>
  $1 = word
  $2 = words
  $3 = with
  $4 = spaces
"$*" =>
  $1 = word words with spaces
  $2 =
  $3 =
  $4 =
$@ =>
  $1 = word
  $2 = words
  $3 = with
  $4 = spaces
"$@" =>
  $1 = word
  $2 = words with spaces
  $3 =
  $4 =
```

### Special Parameters

- [(Reference)](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables)

## Color Formatting

![ANSI Escape Codes](../_assets/terminal-ansi-escape-codes.png)

- `\e`:  0x1b ascii escape character

- `\e[38;5;(n)m`: Select foreground color

- `\e[48;5;(n)m`: Select background color
  
  - _0..7:_      standard colors (e.g. `\e[30-37m`)
  - _8..15:_     high intensity colors (e.g. `\e[90-97m`)
  - _16..231:_   6 x 6 x 6 cube (216 colors): 16 + 36 x r + 6 x g + b (0 \<= r, g, b \<= 5)
  - _232..255:_  grayscale from black to white in 24 steps
- [(Reference)](https://en.wikipedia.org/wiki/ANSI_escape_code)
  
  - [more details](https://misc.flogisoft.com/bash/tip_colors_and_formatting)
