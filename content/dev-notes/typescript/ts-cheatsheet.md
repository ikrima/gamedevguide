# TypeScript CheatSheet

## Resources

- [Typescript Handbook](https://www.typescriptlang.org/docs/handbook)
- [Typescript Type Search](https://www.typescriptlang.org/dt/search): find npm packages with queried type declarations
- [Typescript Playground](https://www.typescriptlang.org/play)
- [Typescript CheatSheet](https://www.typescriptlang.org/cheatsheets)

## Highlevel Differences

### Semantic departures

- _interfaces_ are duck typed

## Basic Syntax

### Modules

- defines own _scope_ for declarations (e.g. `#!ts variables, functions, classes, etc` declara declared in a module are not visible outside the module unless they are explicitly exported using one of the [`export` forms](https://github.com/microsoft/TypeScript-Website/blob/v2/packages/documentation/copy/en/reference/Modules.md#export). Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the [`import` forms](https://github.com/microsoft/TypeScript-Website/blob/v2/packages/documentation/copy/en/reference/Modules.md#import).
- modules are declarative with inter-dependencies specified in terms of file-level `imports/exports`
- any file containing a top-level `import` or `export` is considered a module; otherwise, treated as a script whose contents are available in the global scope
- import/export
  - specific decl declaration
    
    ```ts
    /* IFoo.ts */
    export const kFoo = 123;               // export 'kFoo' constant
    export interface IFoo{...};            // export 'IFoo' interface
    
    /* CFoo.ts */
    import { IFoo } from "./IFoo";         // import 'IFoo' interface
    export class CFoo implements IFoo{...} // export 'CFoo' class
    
    /* CBar.ts */
    export { CFoo as CFooB } from "./CFoo"; // export 'CFooB' class alias of 'CFoo' class
    export class CBar{...} 
    
    /* Test.ts */ 
    import ifm             from "./IFoo"; // import IFoo module
    import { kFoo }        from "./IFoo"; // import 'kFoo' constant
    import type { IFoo }   from "./IFoo"; // type only import 'IFoo' interface
    import { kFoo, type IFoo} from "./IFoo"; // Explicitly pull out a value (kFoo) and a type (IFoo) 
    import IFoo = ifm.IFoo;               // type only import statement version
    import { CFoo as CFA } from "./CFoo"; // import 'CFoo' class as 'CFA' class alias
    let myFoo = new CFA();
    let myNum = kFoo * rand(); 
    ```
  
  - combine/wrap in module
    
    ```ts
    /* FooLib.ts */
    export * from "./IFoo";        // exports 'kFoo' constant, 'IFoo' interface
    export * from "./CFoo";        // exports 'CFoo'  class
    export * from "./CBar";        // exports 'CFooB' class alias of 'CFoo' class, 'CBar' class
    export * as ifm from "./IFoo"; // export 'ifm' module alias of './IFoo' module
    export * as cfm from "./CFoo"; // export 'cfm' module alias of './CFoo' module
    export * as cbm from "./CBar"; // export 'cbm' module alias of './CBar' module
    
    /* Test.ts */ 
    import { kfoo, CFoo, CBar } from "./FooLib"; // import 'kFoo' constant, './CFoo' class, './CBar' class
    import { ifm, cfm, cbm }    from "./FooLib"; // import 'ifm' module alias of './IFoo', 'cfm' module alias of './CFoo', 'cbm' module alias of './CBar' module
    let myNum1  = kFoo * rand(); 
    let myFoo1  = new CFoo(); 
    let myBar1  = new CBar();
    let myNum2  = ifm.kFoo * rand(); 
    let myFoo2  = new cfm.CFoo(); 
    let myBar2  = new cbm.CBar();
    ```
  
  - default export
    
    ```ts
    /* value    */ export default "foo";                     | import v from "./V";
    /* function */ export default function (s: string){...}; | import f from "./F";
    /* class    */ export default class Klass{...};          | import c from "./C";
    ```
