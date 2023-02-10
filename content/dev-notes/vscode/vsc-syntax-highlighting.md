# VSCode Syntax Highlighting

## Token Highlighting

- colors/font styles applied through scopes
- scopes specified as least-to-most specific dotted string e.g.
- match resolution done on each dotted label from left to right
- prefix matching is the standard way to have a color scheme apply to multiple syntaxes
- Example
  - _**if** keyword in php_ := `keyword.control.php`
  - instead of matching `keyword.control.php`, most color schemes will instead assign a color to `keyword`
  - most common to match first one or two labels in a scope
  - including final label in scope (e.g. `php`) used for syntax-specific overrides/exceptions
- References
  - [SublimeText Scope Definitions & Naming Guide](https://www.sublimetext.com/docs/scope_naming.html)
  - [TextMate Scope Naming Conventions](https://macromates.com/manual/en/language_grammars#naming-conventions)
  - [TextMate Scope Selectors](https://macromates.com/manual/en/scope_selectors)

### Minimal Scope Coverage

- recommended minimal set of scopes to highlight
  
  - `entity.name`
  - `entity.other.inherited-class`
  - `entity.name.section`
  - `entity.name.tag`
  - `entity.other.attribute-name`
  - `variable`
  - `variable.language`
  - `variable.parameter`
  - `variable.function`
  - `constant`
  - `constant.numeric`
  - `constant.language`
  - `constant.character.escape`
  - `storage.type`
  - `storage.modifier`
  - `support`
  - `keyword`
  - `keyword.control`
  - `keyword.operator`
  - `keyword.declaration`
  - `string`
  - `comment`
  - `invalid`
  - `invalid.deprecated`
- `meta.*` scopes: refrain from directly styling
  
  - they're primarily intended to provide contextual information for preferences and plugins
- `entity.name`: specify color that will be applied to classes, types, structs, interfaces and many other data structures
  
  - then override for the two scopes `entity.name.tag` and `entity.name.section`, that are used for different types of constructs
  - rationale: historically, many color schemes provide one color for `entity.name.function` and `entity.name.type`, and a different color for `entity.name.tag` but leaves new `entity.name.*` scopes un-highlighted

### Example: C++ Tokens and Scopes using [IntelliSense](https://code.visualstudio.com/docs/cpp/colorization-cpp#_intellisense-tokens-and-scopes)

|Token|Semantic Token name|Fallback TextMate Scope|
|-----|-------------------|-----------------------|
|Class Template|`templateType`|`entity.name.type.class.templated`|
|Enumerator|`enumMember`|`variable.other.enummember`|
|Event (C++/CLI)|`event`|`variable.other.event`|
|Function|`function`|`entity.name.function`|
|Function Template|`templateFunction`|`entity.name.function.templated`|
|Generic Type (C++/CLI)|`genericType`|`entity.name.type.class.generic`|
|Global Variable|`variable.global`|`variable.other.global`|
|Label|`label`|`entity.name.label`|
|Local Variable|`variable.local`|`variable.other.local`|
|Macro|`macro`|`entity.name.function.preprocessor`|
|Member Field|`property`|`variable.other.property`|
|Member Function|`member`|`entity.name.function.member`|
|Namespace|`namespace`|`entity.name.namespace`|
|New / Delete|`newOperator`|`keyword.operator.new`|
|Operator Overload Function|`operatorOverload`|`entity.name.function.operator`|
|Operator Overload Member|`memberOperatorOverload`|`entity.name.function.operator.member`|
|Parameter|`parameter`|`variable.parameter`|
|Property (C++/CLI)|`cliProperty`|`variable.other.property.cli`|
|Reference Type (C++/CLI)|`referenceType`|`entity.name.type.class.reference`|
|Static Member Field|`property.static`|`variable.other.property.static`|
|Static Member Function|`member.static`|`entity.name.function.member.static`|
|Type|`type`|`entity.name.type`|
|User-Defined Literal - Number|`numberLiteral`|`entity.name.operator.custom-literal.number`|
|User-Defined Literal - Raw|`customLiteral`|`entity.name.operator.custom-literal`|
|User-Defined Literal - String|`stringLiteral`|`entity.name.operator.custom-literal.string`|
|Value Type (C++/CLI)|`valueType`|`entity.name.type.class.value`|

## Semantic Highlighting

### Semantic Token Types

|[Semantic Token Type](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#standard-token-types-and-modifiers)|Desc|
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

|[Semantic Token Modifier](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#standard-token-types-and-modifiers)|Desc|
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

theme applies highlighting with selector rule and style pair

- selector syntax: `(*|tokenType)(.tokenModifier)*(:tokenLanguage)?`
- on match rule: apply style to token; style format is same as in `tokenColors`
- on match fail: vscode attempts evaluating semantic rule as normal TextMate scope using `Semantic Token Scope Map`
- ex:
  ```json
  `"*.declaration": { "bold": true } // all declarations are bold
  `"class:java":    { "foreground": "#0f0", "italic": true } // classes in java
  ```

|[Semantic Token Selector](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#semantic-token-scope-map)|TextMate Scope|
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

### Custom Semantic Tokens

- extensions can extend/create new token types/modifiers/scope maps
  
  - `semanticTokenTypes`: contribution point for types
    - `id`: new type id
    - `superType`: optionally inherit styling rules from this type
  - `semanticTokenModifiers`: contribution point for modifiers
    - `id`: new modifier id
  - `semanticTokenScopes`: contribution point for scope mappings
    - `language`: optional language-specific scopes
    - `scopes`: semanticToken-to-textmateScopes map; each entry can be 1-to-many
- Ex:
  
  - 'my.foo-ext': _package.json_ file
    ```json
    {
      "contributes": {
        "semanticTokenTypes": [{
          "id":          "barType",
          "superType":   "type",
          "description": "custom bar type"
        }],
        "semanticTokenModifiers": [{
          "id":          "native",
          "description": "annotate symbol as native"
        }],
        "semanticTokenScopes": [{
          "language": "typescript",
          "scopes":   { "property.readonly": [ "variable.other.constant.property.ts" ] }
        }],
      }
    }
    ```
    
    - adds new semantic token type `barType` and semantic modifier `native`
    - theme styling rules for `type` will also apply to `barType`
- theme/color config elsewhere
  
  ```json
  {
    "name": "MyRedTheme",
    "semanticTokenColors": { "type": "#ff0011" }
  }
  ```
  
  - `semanticTokenColors` value `"#ff0011"` applies to both `type` and `barType`

## Resources

- [Scope Inspector](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector): extension dev tool for live inspecting scopes, semantic tokens, matched theme rules
- [Semantic Tokens Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/semantic-tokens-sample)
- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)
