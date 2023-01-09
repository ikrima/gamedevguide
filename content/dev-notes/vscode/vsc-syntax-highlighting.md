# VSCode Syntax Highlighting

## Semantic Highlighting

### Semantic Token Types

|Semantic Token Type[^1]|Desc|
|-------------------|----|
|`namespace`|identifiers that declare or reference a namespace, module, or package|
|`class`|identifiers that declare or reference a class type|
|`enum`|identifiers that declare or reference an enumeration type|
|`interface`|identifiers that declare or reference an interface type|
|`struct`|identifiers that declare or reference a struct type|
|`typeParameter`|identifiers that declare or reference a type parameter|
|`type`|identifiers that declare or reference a type that is not covered above|
|`parameter`|identifiers that declare or reference a function or method parameters|
|`variable`|identifiers that declare or reference a local or global variable|
|`property`|identifiers that declare or reference a member property, member field, or member variable|
|`enumMember`|identifiers that declare or reference an enumeration property, constant, or member|
|`decorator`|identifiers that declare or reference decorators and annotations|
|`event`|identifiers that declare an event property|
|`function`|identifiers that declare a function|
|`method`|identifiers that declare a member function or method|
|`macro`|identifiers that declare a macro|
|`label`|identifiers that declare a label|
|`comment`|tokens that represent a comment|
|`string`|tokens that represent a string literal|
|`keyword`|tokens that represent a language keyword|
|`number`|tokens that represent a number literal|
|`regexp`|tokens that represent a regular expression literal|
|`operator`|tokens that represent an operator|

### Semantic Token Modifiers

|Semantic Token Modifier[^1]|Desc|
|-----------------------|----|
|`declaration`|declarations of symbols|
|`definition`|definitions of symbols, for example, in header files|
|`readonly`|readonly variables and member fields (constants)|
|`static`|class members (static members)|
|`deprecated`|symbols that should no longer be used|
|`abstract`|types and member functions that are abstract|
|`async`|functions that are marked async|
|`modification`|variable references where the variable is assigned to|
|`documentation`|occurrences of symbols in documentation|
|`defaultLibrary`|symbols that are part of the standard library|

### Semantic Token Scope Map

|Semantic Token Selector[^2]|TextMate Scope|
|-----------------------|--------------|
|`namespace`|`entity.name.namespace`|
|`type`|`entity.name.type`|
|`type.defaultLibrary`|`support.type`|
|`struct`|`storage.type.struct`|
|`class`|`entity.name.type.class`|
|`class.defaultLibrary`|`support.class`|
|`interface`|`entity.name.type.interface`|
|`enum`|`entity.name.type.enum`|
|`function`|`entity.name.function`|
|`function.defaultLibrary`|`support.function`|
|`method`|`entity.name.function.member`|
|`macro`|`entity.name.function.macro`|
|`variable`|`variable.other.readwrite` , `entity.name.variable`|
|`variable.readonly`|`variable.other.constant`|
|`variable.readonly.defaultLibrary`|`support.constant`|
|`parameter`|`variable.parameter`|
|`property`|`variable.other.property`|
|`property.readonly`|`variable.other.constant.property`|
|`enumMember`|`variable.other.enummember`|
|`event`|`variable.other.event`|

## Resources

- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)

[^1]: https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#standard-token-types-and-modifiers
[^2]: https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#semantic-token-scope-map
