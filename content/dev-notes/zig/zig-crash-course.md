# Zig Crash Course

## Reference Material

- [ZigLearn](https://ziglearn.org/)
- [Zig in 30 minutes](https://gist.github.com/ityonemo/769532c2017ed9143f3571e5ac104e50)
- [Understanding the Zig Programming Language](https://medium.com/swlh/zig-the-introduction-dcd173a86975)
- [Awesome Zig](https://github.com/catdevnull/awesome-zig)
- [Awesome Zig Alternate](https://github.com/C-BJ/awesome-zig)

## Highlevel Differences

### Excluded features

- string type
- classes/inheritance/runtime polymorphism
- interfaces/protocols
- constructors/destructors/RAII (zig uses `defer/errdefer` keyword)
- function/operator overloading
- closures or lambdas
- garbage collection
- exceptions (zig uses error codes instead)

### Added features

- Optional Values are first class citizen, replacing null pointers
- Errors as first class citizen algebraic types
- Structs as namespaces
- Compile time code execution replace macros
- Loops, labeled blocks, and if statements are expressions
- Slices

### Semantic departures

- `const` is immutable and enforced

- variable shadowing not allowed

- there are no truthy values for if statements

- global scope constants are default comptime values; if type is omitted, they are comptime typed
  
  ```zig
  const x: i32 = 47;
  const y = -47;  // comptime integer.
  
  pub fn main() void {
      var a: i32 = y; // comptime constant coerced into correct type
      var b: i64 = y; // comptime constant coerced into correct type
      var c: u32 = y; // error: cannot cast negative value -47 to unsigned integer
  }
  ```

- return values must be used by default
  
  - ignore by assigning to `_ = foobar()`
  - all function arguments are immutable
- Integer conversion/overflow
  
  - Implicit integer widening casts allowed
  
  - Overflows are detectable illegal behavior
  
  - To explicitly allow overflow, use overflow operators
    
    |Normal Operator|Wrapping Operator|
    |---------------|-----------------|
    |+|+%|
    |\-|\-%|
    |\*|\*%|
    |+=|+%=|
    |\-=|\-%=|
    |\*=|\*%=|
  
  ```zig
  test "well defined overflow" {
      var a: u8 = 255;
      a +%= 1;
      expect(a == 0);
  }
  ```

- pointer syntax: (motivation: reduce ambiguities/make type inference easier)
  
  ```zig
  u8            : one u8 value
  ?u8           : one optional u8 value
  [2]u8         : array of 2 u8 values
  [2:0]u8       : zero-terminated array of 2 u8 values
  [2]*u8        : array of 2 u8 pointers
  *u8           : pointer to one u8 value
  *?u8          : pointer to one optional u8 value
  ?*u8          : optional pointer to u8 value
  *const u8     : pointer to immutable u8 value
  *const ?u8    : pointer to immutable optional u8 value
  ?*const u8    : optional pointer to immutable u8 value
  *[2]u8        : pointer to array of 2 u8 values      
  *[2:0]u8      : pointer to zero-terminated array of 2 u8 values      
  *const [2]u8  : pointer to immutable array of 2 u8 values      
  []u8          : slice(pointer + runtime len) of u8 values
  []?u8         : slice(pointer + runtime len) of optional u8 values
  ?[]u8         : optional slice(pointer + runtime len) of u8 values
  []*u8         : slice(pointer + runtime len) of pointers to u8 values      
  []*const u8   : slice(pointer + runtime len) of pointers to immutable u8 values      
  [*]u8         : pointer(unknown len) to of u8
  [*:0]u8       : pointer(unknown len) to but zero-terminated of u8 values
  *[]const u8   : pointer to slice of immutable u8 values      
  *[]*const ?u8 : pointer to slice of pointers to immutable optional u8 values  
  
  var x: i32 = 4;
  var ptr: *i32 = &x;
  ptr.* = 15;
  ```

- pointer type coercion
  
  ```zig
  [2]u8  -> *[2]u8    : by using address operator (&)
  [2]u8  -> []u8      : by using slice operator [..]
  *[2]u8 -> []u8      : automatic coercion from pointer to fixed size array to slice
  []u8   -> [*]u8     : by using .ptr
  any    -> ?any      : automatic coercion from non-optional to optional
  any    -> const any : automatic coercion from non-const to const
  ```

- pointers can't be assigned null by default (motivation: stricter type checking. Optional value types are used instead )

- no automatic allocation by convention; any allocation functions explicitly take an allocator argument

- compiler intrinsic functions are prefixed by @ e.g. `@This(), @typeInfo(@TypeOf(args))`

### Casting for C Programmers

- **@as**: only allowed when the casting operation is unambiguous and safe
  
  - use case: casting a compile-time integer for use in type inference:
    ```zig
    var x = 5;              // not allowed - should x be signed? unsigned? what size?
    var x = @as(u8, 5);     // type inference allows the compiler to determine that x is type u8
    ```
  
  - use case: casting an unsigned int to a larger signed int:
    ```zig
    var x : u8 = 5;
    var y = @as(i32, x);
    ```
  
  - use case: casting an int to a larger-size int of the same sign
    ```zig
    var x : u8 = 5;
    var y = @as(u32, x);
    ```

- **@truncate:** explicitly cast to a smaller-size integer with the same signedness, by removing the most-significant bits
  
  - **_NOTE:_** `@truncate()` on signed integers removes the most significant bits so the results may or may not remain negative
    ```zig
    var x = @as(u16, 513);    // x in binary: 0000001000000001
    var y = @truncate(u8, x); // y in binary:         00000001
    ```

- **@bitCast:** Used to to cast between same sized types, preserving the bitpattern
  
  - relevant when casting between signed and unsigned types (i.e. reinterpret cast)
    ```zig
    var x = @as(u8, 180);     // x in binary: 10110100 (value is 180)
    var y = @bitCast(i8, x);  // y in binary: 10110100 (value is -76)
    ```

- **@intCast:** for runtime safety-checked narrowing conversions
  
  - the dual of @bitCast i.e. preserves value but not the bitpattern
  - out of range cast is detectable illegal behavior
  - if `@setRuntimeSafety(true)`, invalid `@intCast` with panic; otherwise, it's undefined behavior
    ```zig
    var x = @as(i16, 180);
    var y = @intCast(u8, x); // this is fine
    var z = @intCast(i8, y); // this will crash
    ```

## Basic Syntax

### Imports

- `@import` is built-in function, evaluated at compile time.

- takes in a file, and gives you a struct type based on that file. All declarations labeled as `pub` will end up in result struct for use

- `@import("std")` is a special case in the compiler, and gives you access to the standard library. Other `@import`s will take in a file path, or a package name

- `@import` to import stdlib/files/etc and assign to a namespace
  
  ```zig
  const std = @import("std");
  
  ```

- almost everything needs to be assigned to an identifier

### Variables

- normal: `var x: i32 = 7;`
- const: `const x: i32 = 7;`
- uninit: `var x: i32 = undefined;`
  - Zig will fill with `0XAA` for debugging
- type coercion: `const inferred_constant = @as(i32, 5);`

### Integers

- Zig supports hex, octal and binary integer literals
  ```zig
  const decimal_int: i32 = 98222;
  const hex_int: u8 = 0xff;
  const another_hex_int: u8 = 0xFF;
  const octal_int: u16 = 0o755;
  const binary_int: u8 = 0b11110000;
  ```

- Underscores may also be placed between digits as a visual separator
  ```zig
  const one_billion: u64 = 1_000_000_000;
  const binary_mask: u64 = 0b1_1111_1111;
  const permissions: u64 = 0o7_5_5;
  const big_address: u64 = 0xFF80_0000_0000_0000;
  ```

### Floats

- use `@setFloatMode(.Optimized)` to enable -ffast-math

- Floats support multiple kinds of literal
  
  ```zig
  const floating_point: f64 = 123.0E+77;
  const another_float: f64 = 123.0;
  const yet_another: f64 = 123.0e+77;
  
  const hex_floating_point: f64 = 0x103.70p-5;
  const another_hex_float: f64 = 0x103.70;
  const yet_another_hex_float: f64 = 0x103.70P-5;
  ```

- Underscores may also be placed between digits
  
  ```zig
  const lightspeed: f64 = 299_792_458.000_000;
  const nanosecond: f64 = 0.000_000_001;
  const more_hex: f64 = 0x1234_5678.9ABC_CDEFp-10;
  ```

- int \<\-> float casts: `@intToFloat` and `@floatToInt`.
  
  - `@intToFloat` is always safe
  - `@floatToInt` is detectable illegal behavior if the float can't fit into integer

### Strings

- string literals are null-terminated utf-8 encoded arrays of `const u8` bytes.
- length does not include the null termination (officially called "sentinel termination")
- it's safe to access the null terminator.
- indices are by byte, not by unicode glyph

### Functions

- general syntax
  ```zig
  [pub] fn myFunName(arg: argType) returnType {
    ...body...
  }
  ```

- `pub` to mark function as exportable from current scope
- return values must be used but can be assigned to throw away e.g. `_ = foo();`

### Enums

- can be given namespaced methods
  
  ```zig
  const Suit = enum {
      clubs,
      spades,
      diamonds,
      hearts,
      pub fn isClubs(self: Suit) bool {
          return self == Suit.clubs;
      }
  };
  ```

- can also be given namespaced `const/var` variables, which act as namespaced globals. Values are unrelated and unattached to instances of the enum
  
  ```zig
  const Mode = enum {
      var count: u32 = 0;
      on,
      off,
  };
  
  test "hmm" {
      Mode.count += 1;
      expect(Mode.count == 1);
  }
  ```

### Structs

- can be named/anonymous

- the type name derived from the variable decl it's assigned to or the type constructor function

- can have default values and members can be init out of order

- can also contain namespaced functions

- can be coerced into other structs

- syntactic sugar: emulate member functions by having first param be a pointer to struct
  
  ```zig
  
  const Point = struct {
    const Self = @This();
  
    x: f64,
    y: f64,
    z: f64,
  
    pub fn distance(self: Self, p: Point) f64 {
      const x2 = math.pow(f64, self.x - p.x, 2);
      const y2 = math.pow(f64, self.y - p.y, 2);
      const z2 = math.pow(f64, self.z - p.z, 2);
      return math.sqrt(x2 + y2 + z2);
    }
    fn print(self: Point) void {
      std.debug.print("value: {}\n", .{self.x, self.y, self.z});
    }
  };
  
  pub fn main() !void {
    const p1 = Point{ .x = 0, .y = 2, .z = 8 };
    const p2 = .{ .x = 0, .y = 6, .z = 8 };
    assert(p1.distance(p2) == 4);
    assert(Point.distance(p1, p2) == 4);
    p1.print();
    Point.print(p2);
  }
  ```

### Unions

- Bare union types do not have a guaranteed memory layout
- bare unions cannot be used to reinterpret memory. Accessing a field in a union which is not active is detectable illegal behavior
  ```zig
  const Payload = union {
      int: i64,
      float: f64,
      bool: bool,
  };
  test "simple union" {
      var payload = Payload{ .int = 1234 };
      payload.float = 12.34; // error => test "simple union"...access of inactive union field
  }
  ```

### Tagged Unions

- Tagged unions are unions which use an enum used to detect which field is active. Here we make use of a switch with payload capturing; captured values are immutable so pointers must be taken to mutate the values.
  
  ```zig
  const Tag = enum { a, b, c };
  
  const Tagged = union(Tag) { a: u8, b: f32, c: bool };
  
  test "switch on tagged union" {
      var value = Tagged{ .b = 1.5 };
      switch (value) {
          .a => |*byte| byte.* += 1,
          .b => |*float| float.* *= 2,
          .c => |*b| b.* = !b.*,
      }
      expect(value.b == 3);
  }
  ```

- The tag type of a tagged union can also be inferred. Shorthand for above
  
  ```zig
  const Tagged = union(enum) { a: u8, b: f32, c: bool };
  ```

- `void` member types can have their type omitted from the syntax. Here, none is of type `void`
  
  ```zig
  const Tagged2 = union(enum) { a: u8, b: f32, c: bool, none };
  ```

### Array

- normal array: `var array: [3]u32 = [_]u32{47, 47, 47};`
- can also slice [zig-crash-course > Slices](zig-crash-course.md#slices)

### Control flow

- if/switch
  ```zig
  if (v < 0) {
    return "negative";
  }
  else {
    return "non-negative";
  }
  ```

- can also work as an expression: `x += if (a) 1 else 2;`
- switch (no case fall through, must be exhaustive)
  ```zig
  var x: i8 = 10;
      switch (x) {
          -1...1 => {
              x = -x;
          },
          10, 100 => {
              //special considerations must be made
              //when dividing signed integers
              x = @divExact(x, 10);
          },
          else => {},
      }
  ```

### Loops

- for loops over arrays or slices

```zig
const string = [_]u8{ 'a', 'b', 'c' };
for (string) |character, index| {}
for (string) |character| {}
for (string) |_, index| {}
for (string) |_| {}
```

- while: has three parts - a condition, a block and a continue expression
  
  ```zig
  var i: u8 = 2;
  while (i < 100) {
      i *= 2;
  }
  
  var sum: u8 = 0;
  var i: u8 = 0;
  while (i <= 3) : (i += 1) {
      if (i == 2) break;
      if (i == 1) continue;
      sum += i;
  }
  ```

### Pointers

- Pointer types are declared by prepending `*` to the front of the type. No spiral declarations like C!
- dereference with the `.*` field
  ```zig
  pub fn printer(value: *i32) void {
      std.debug.print("pointer: {}\n", .{value});
      std.debug.print("value: {}\n", .{value.*});
  }
  ```

- can't assign null or 0 to pointer
- `usize/isize`: pointer sized integral types
  ```zig
  expect(@sizeOf(usize) == @sizeOf(*u8));
  expect(@sizeOf(isize) == @sizeOf(*u8));
  ```

- unbounded array: `[*]T`
  - works like `*T` but supports indexing, pointer arithmetic, & slicing syntax

## New

### Defer

- allow statement to execute on lexical scope exit.
- multiple defers get executed in reverse order
  ```zig
  var x: i16 = 5;
  {
    defer x += 2;
    expect(x == 5);
  }
  expect(x == 7);
  ```

### Errors

- No exceptions
- Errors are values in a open union type, similar to enums
- Error sets coerce to their supersets.

### Safety

- if enabled, "detectable illegal behavior" will cause panic; undefined if off
- Ex: array out of bounds access
- selective toggle in a block with `@setRuntimeSafety(false);`
- `unreachable` is a keyword similar to llvm intrinsic
  ```zig
  return switch (x) {
          'a'...'z' => x + 'A' - 'a',
          'A'...'Z' => x,
          else => unreachable,
      };
  ```

### Labeled blocks

- Blocks in Zig are expressions and can be given labels, which are used to yield values. Here, we are using a label called blk. Blocks yield values, meaning that they can be used in place of a value. The value of an empty block `{}` is a value of the type `void`
  
  ```zig
  test "labelled blocks" {
      const count = blk: {
          var sum: u32 = 0;
          var i: u32 = 0;
          while (i < 10) : (i += 1) sum += i;
          break :blk sum;
      };
      expect(count == 45);
      expect(@TypeOf(count) == u32);
  }
  ```

- This can be seen as being equivalent to C’s `i++`
  
  ```zig
  blk: {
    const tmp = i;
    i += 1;
    break :blk tmp;
  }
  ```

- Loops can be given labels, allowing you to `break` and `continue` to outer loops
  
  ```zig
  test "nested continue" {
    var count: usize = 0;
    outer: for ([_]i32{ 1, 2, 3, 4, 5, 6, 7, 8 }) |_| {
      for ([_]i32{ 1, 2, 3, 4, 5 }) |_| {
        count += 1;
        continue :outer;
      }
    }
    expect(count == 8);
  }
  ```

- Loops can be expressions. Like `return`, `break` accepts a value. This can be used to yield a value from a loop. Loops in Zig also have an `else` branch on loops, which is evaluated when the loop is not exited from with a `break`.
  
  ```zig
  fn rangeHasNumber(begin: usize, end: usize, number: usize) bool {
    var i = begin;
    return while (i < end) : (i += 1) {
      if (i == number) {
        break true;
      }
    } else false;
  }
  
  test "while loop expression" {
    expect(rangeHasNumber(0, 10, 3));
  }
  ```

### Optionals

- nullable: any type, not just pointers, can be nullable
  
  - pointers aren't allowed to have 0 or null value
  - they are unions of the base type and the special value null
- Optionals use the syntax `?T` and are used to store the data `null`, or a value of type `T`
  
  ```zig
  test "optional" {
    var found_index: ?usize = null;
    const data = [_]i32{ 1, 2, 3, 4, 5, 6, 7, 8, 12 };
    for (data) |v, i| {
      if (v == 10) found_index = i;
    }
    expect(found_index == null);
  }
  ```

- Optionals support the `orelse` expression, which acts when the optional is `null`. This unwraps the optional to its child type
  
  ```zig
  test "orelse" {
    var a: ?f32 = null;
    var b = a orelse 0;
    expect(b == 0);
    expect(@TypeOf(b) == f32);
  }
  ```

- `.?` is a shorthand for `orelse unreachable`. This is used for when you know it is impossible for an optional value to be null, and using this to unwrap a `null` value is detectable illegal behaviour
  
  ```zig
  test "orelse unreachable" {
    const a: ?f32 = 5;
    const b = a orelse unreachable;
    const c = a.?;
    expect(b == c);
    expect(@TypeOf(c) == f32);
  }
  ```

- Payload capturing: if non-null, can “capture” value. `if (b) |value|` captures the value of `b` and copies it inside `value`.
  
  ```zig
  test "if optional payload capture" {
    const a: ?i32 = 5;
    if (a != null) {
      const value = a.?;
    }
  
    const b: ?i32 = 5;
    if (b) |value| {}
  }
  var numbers_left: u32 = 4;
  fn eventuallyNullSequence() ?u32 {
    if (numbers_left == 0) return null;
    numbers_left -= 1;
    return numbers_left;
  }
  
  test "while null capture" {
    var sum: u32 = 0;
    while (eventuallyNullSequence()) |value| {
      sum += value;
    }
    expect(sum == 6); // 3 + 2 + 1
  }
  ```

- Optional pointer and optional slice types do not take up any extra memory, compared to non-optional ones. This is because internally they use the 0 value of the pointer for `null`.

- This is how null pointers in Zig work - they must be unwrapped to a non-optional before dereferencing, which stops null pointer dereferences from happening accidentally.

### Payload Captures

Payload captures use the syntax `|value|` and appear in many places. These are used to “capture” the value from something.

With if statements and optionals.

```zig
test "optional-if" {
    var maybe_num: ?usize = 10;
    if (maybe_num) |n| {
        expect(@TypeOf(n) == usize);
        expect(n == 10);
    } else {
        unreachable;
    }
}
```

With if statements and error unions. The else with the error capture is required here.

```zig
test "error union if" {
    var ent_num: error{UnknownEntity}!u32 = 5;
    if (ent_num) |entity| {
        expect(@TypeOf(entity) == u32);
        expect(entity == 5);
    } else |err| {
        unreachable;
    }
}
```

With while loops and optionals. This may have an else block.

```zig
test "while optional" {
    var i: ?u32 = 10;
    while (i) |num| : (i.? -= 1) {
        expect(@TypeOf(num) == u32);
        if (num == 1) {
            i = null;
            break;
        }
    }
    expect(i == null);
}
```

With while loops and error unions. The else with the error capture is required here.

```zig
var numbers_left2: u32 = undefined;

fn eventuallyErrorSequence() !u32 {
    return if (numbers_left2 == 0) error.ReachedZero else blk: {
        numbers_left2 -= 1;
        break :blk numbers_left2;
    };
}

test "while error union capture" {
    var sum: u32 = 0;
    numbers_left2 = 3;
    while (eventuallyErrorSequence()) |value| {
        sum += value;
    } else |err| {
        expect(err == error.ReachedZero);
    }
}
```

For loops.

```zig
test "for capture" {
    const x = [_]i8{1, 5, 120, -5};
    for (x) |v| expect(@TypeOf(v) == i8);
}
```

Switch cases on tagged unions.

```zig
const Info = union(enum) {
    a: u32,
    b: []const u8,
    c,
    d: u32,
};

test "switch capture" {
    var b = Info{ .a = 10 };
    const x = switch (b) {
        .b => |str| blk: {
            expect(@TypeOf(str) == []const u8);
            break :blk 1;
        },
        .c => 2,
        //if these are of the same type, they
        //may be inside the same capture group
        .a, .d => |num| blk: {
            expect(@TypeOf(num) == u32);
            break :blk num * 2;
        },
    };
    expect(x == 20);
}
```

So far, we have only shown payload captures with copy semantics (i.e. the captured value is a copy of the original value). We can also modify captured values by taking them as pointers, using the `|*value|` syntax. This is called a _pointer capture_.

```zig
test "for with pointer capture" {
    var data = [_]u8{1, 2, 3};
    for (data) |*byte| byte.* += 1;
    expect(eql(u8, &data, &[_]u8{2, 3, 4}));
}
```

### Inline Loops

`inline` loops are unrolled, and allow some things to happen which only work at compile time. Here we use a `for`, but a `while` works similarly.

```zig
test "inline for" {
    const types = [_]type{ i32, f32, u8, bool };
    var sum: usize = 0;
    inline for (types) |T| sum += @sizeOf(T);
    expect(sum == 10);
}
```

Using these for performance reasons is inadvisable unless you’ve tested that explicitly unrolling is faster; the compiler tends to make better decisions here than you.

### Opaque

`opaque` types in Zig have an unknown (albeit non-zero) size and alignment. Because of this these data types cannot be stored directly. These are used to maintain type safety with pointers to types that we don’t have information about.

```zig
const Window = opaque {};
const Button = opaque {};

extern fn show_window(*Window) callconv(.C) void;

test "opaque" {
    var main_window: *Window = undefined;
    show_window(main_window);

    var ok_button: *Button = undefined;
    show_window(ok_button);
}
```

```zig
./test-c1.zig:653:17: error: expected type '*Window', found '*Button'
    show_window(ok_button);
                ^
./test-c1.zig:653:17: note: pointer type child 'Button' cannot cast into pointer type child 'Window'
    show_window(ok_button);
```

Opaque types may have declarations in their definitions (the same as structs, enums and unions).

```zig
const Window = opaque {
    fn show(self: *Window) void {
        show_window(self);
    }
};

extern fn show_window(*Window) callconv(.C) void;

test "opaque with declarations" {
    var main_window: *Window = undefined;
    main_window.show();
}
```

The typical use case of opaque is to maintain type safety when interoperating with C code that does not expose complete type information.

### Anonymous Structs

The struct type may be omitted from a struct literal. These literals may coerce to other struct types.

```zig
test "anonymous struct literal" {
    const Point = struct { x: i32, y: i32 };

    var pt: Point = .{
        .x = 13,
        .y = 67,
    };
    expect(pt.x == 13);
    expect(pt.y == 67);
}
```

Anonymous structs may be completely anonymous i.e. without being coerced to another struct type.

```zig
test "fully anonymous struct" {
    dump(.{
        .int = @as(u32, 1234),
        .float = @as(f64, 12.34),
        .b = true,
        .s = "hi",
    });
}

fn dump(args: anytype) void {
    expect(args.int == 1234);
    expect(args.float == 12.34);
    expect(args.b);
    expect(args.s[0] == 'h');
    expect(args.s[1] == 'i');
}
```

### Tuples

Anonymous structs without field names may be created, and are referred to as **tuples**. These have many of the properties that arrays do; tuples can be iterated over, indexed, can be used with the `++` and `**` operators, and have a len field. Internally, these have numbered field names starting at `"0"`, which may be accessed with the special syntax `@"0"` which acts as an escape for the syntax - things inside `@""` are always recognized as identifiers.

An `inline` loop must be used to iterate over the tuple here, as the type of each tuple field may differ.

```zig
test "tuple" {
    const values = .{
        @as(u32, 1234),
        @as(f64, 12.34),
        true,
        "hi",
    } ++ .{false} ** 2;
    expect(values[0] == 1234);
    expect(values[4] == false);
    inline for (values) |v, i| {
        if (i != 2) continue;
        expect(v);
    }
    expect(values.len == 6);
    expect(values.@"3"[0] == 'h');
}
```

### Slices

- can create slices of arrays/pointers/and other slices using `[n..m]` syntax
- **_NOTE:_** slice operator is `[n..m]` where n and m are `[idxStart,idxEnd)`
  ```zig
  var array = [_]u32{0,1,2,3,4,5};
  var slice0: []u32 = array[0..];  // => {0,1,2,3,4,5}
  var slice1: []u32 = array[3..5]; // => {3,4}
  var slice2: []u32 = array[3..];  // => {3,4}
  var slice3: []u32 = array[3..1]; // => invalid, will emit compile error
  ```

### Sentinel Termination

Arrays, slices and many pointers may be terminated by a value of their child type. This is known as sentinel termination. These follow the syntax `[N:t]T`, `[:t]T`, and `[*:t]T`, where `t` is a value of the child type `T`.

An example of a sentinel terminated array. The built-in `@bitCast` is used to perform an unsafe bitwise type conversion. This shows us that the last element of the array is followed by a 0 byte.

```zig
test "sentinel termination" {
    const terminated = [3:0]u8{ 3, 2, 1 };
    expect(terminated.len == 3);
    expect(@bitCast([4]u8, terminated)[3] == 0);
}
```

The types of string literals is `*const [N:0]u8`, where N is the length of the string. This allows string literals to coerce to sentinel terminated slices, and sentinel terminated many pointers. Note: string literals are UTF-8 encoded.

```zig
test "string literal" {
    expect(@TypeOf("hello") == *const [5:0]u8);
}
```

`[*:0]u8` and `[*:0]const u8` perfectly model C’s strings.

```zig
test "C string" {
    const c_string: [*:0]const u8 = "hello";
    var array: [5]u8 = undefined;

    var i: usize = 0;
    while (c_string[i] != 0) : (i += 1) {
        array[i] = c_string[i];
    }
}
```

Sentinel terminated types coerce to their non-sentinel-terminated counterparts.

```zig
test "coercion" {
    var a: [*:0]u8 = undefined;
    const b: [*]u8 = a;

    var c: [5:0]u8 = undefined;
    const d: [5]u8 = c;

    var e: [:10]f32 = undefined;
    const f = e;
}
```

Sentinel terminated slicing is provided which can be used to create a sentinel terminated slice with the syntax `x[n..m:t]`, where `t` is the terminator value. Doing this is an assertion from the programmer that the memory is terminated where it should be - getting this wrong is detectable illegal behavior.

```zig
test "sentinel terminated slicing" {
    var x = [_:0]u8{255} ** 3;
    const y = x[0..3 :0];
}
```
