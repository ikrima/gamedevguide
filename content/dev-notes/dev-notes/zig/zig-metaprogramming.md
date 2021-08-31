# Zig Metaprogramming

## Overview

Zig's metaprogramming is driven by a few basic concepts:

* Types are valid values at compile-time
* most runtime code will also work at compile-time
* struct field evaluation is compile-time duck-typed
* the zig standard library gives you tools to perform compile-time reflection.

Here's an example of multiple dispatch (though you have already seen this in action with `std.debug.print`, perhaps now you can imagine how it's implemented:

````zig
const std = @import("std");

fn foo(x : anytype) @TypeOf(x) {
    // note that this if statement happens at compile-time, not runtime.
    if (@TypeOf(x) == i64) {
        return x + 2;
    } else {
        return 2 * x;
    }
}

pub fn main() void {
    var x: i64 = 47;
    var y: i32 =  47;

    std.debug.print("i64-foo: {}\n", .{foo(x)});
    std.debug.print("i32-foo: {}\n", .{foo(y)});
}
````

Here's an example of generic types:

````zig
const std = @import("std");

fn Vec2Of(comptime T: type) type {
    return struct{
        x: T,
        y: T
    };
}

const V2i64 = Vec2Of(i64);
const V2f64 = Vec2Of(f64);

pub fn main() void {
    var vi = V2i64{.x = 47, .y = 47};
    var vf = V2f64{.x = 47.0, .y = 47.0};
    
    std.debug.print("i64 vector: {}\n", .{vi});
    std.debug.print("f64 vector: {}\n", .{vf});
}
````

````zig
const std = @import("std");
const math = std.math;
const assert = std.debug.assert;

// A struct definition doesn't include a name.
// Assigning the struct to a variable gives it a name.
const Point = struct {
    x: f64,
    y: f64,
    z: f64,
		
    // A struct definition can also contain namespaced functions.
    // This has no impact on the struct layout.
    // Struct functions that take a Self parameter, when
    // invoked through a struct instance, will automatically
    // fill the first argument, just like methods do.
    const Self = @This();
    pub fn distance(self: Self, p: Point) f64 {
        const x2 = math.pow(f64, self.x - p.x, 2);
        const y2 = math.pow(f64, self.y - p.y, 2);
        const z2 = math.pow(f64, self.z - p.z, 2);
        return math.sqrt(x2 + y2 + z2);
    }
};

pub fn main() !void {
    const p1 = Point{ .x = 0, .y = 2, .z = 8 };
    const p2 = Point{ .x = 0, .y = 6, .z = 8 };
    
    assert(p1.distance(p2) == 4);
    assert(Point.distance(p1, p2) == 4);
}
````

## Details

Blocks of code may be forcibly executed at compile time using the `comptime` keyword. In this example, the variables x and y are equivalent.

````zig
test "comptime blocks" {
    var x = comptime fibonacci(10);

    var y = comptime blk: {
        break :blk fibonacci(10);
    };
}
````

Integer literals are of the type `comptime_int`. These are special in that they have no size (they cannot be used at runtime!), and they have arbitrary precision. `comptime_int` values coerce to any integer type that can hold them. They also coerce to floats. Character literals are of this type.

````zig
test "comptime_int" {
    const a = 12;
    const b = a + 10;

    const c: u4 = a;
    const d: f32 = b;
}
````

`comptime_float` is also available, which internally is an `f128`. These cannot be coerced to integers, even if they hold an integer value.

Types in Zig are values of the type `type`. These are available at compile time

````zig
test "branching on types" {
    const a = 5;
    const b: if (a < 10) f32 else i32 = 5;
}
````

Function parameters in Zig can be tagged as being `comptime`. This means that the value passed to that function parameter must be known at compile time. Let’s make a function that returns a type. Notice how this function is PascalCase, as it returns a type.

````zig
fn Matrix(
    comptime T: type,
    comptime width: comptime_int,
    comptime height: comptime_int,
) type {
    return [height][width]T;
}

test "returning a type" {
    expect(Matrix(f32, 4, 4) == [4][4]f32);
}
````

We can reflect upon types using the built-in `@typeInfo`, which takes in a `type` and returns a tagged union. This tagged union type can be found in `std.builtin.TypeInfo` (info on how to make use of imports and std later).

````zig
fn addSmallInts(comptime T: type, a: T, b: T) T {
    return switch (@typeInfo(T)) {
        .ComptimeInt => a + b,
        .Int => |info| if (info.bits <= 16)
            a + b
        else
            @compileError("ints too large"),
        else => @compileError("only ints accepted"),
    };
}

test "typeinfo switch" {
    const x = addSmallInts(u16, 20, 30);
    expect(@TypeOf(x) == u16);
    expect(x == 50);
}
````

We can use the `@Type` function to create a type from a `@typeInfo`. `@Type` is implemented for most types but is notably unimplemented for enums, unions, functions, and structs.

Here anonymous struct syntax is used with `.{}`, because the `T` in `T{}` can be inferred. Anonymous structs will be covered in detail later. In this example we will get a compile error if the `Int` tag isn’t set.

````zig
fn GetBiggerInt(comptime T: type) type {
    return @Type(.{
        .Int = .{
            .bits = @typeInfo(T).Int.bits + 1,
            .signedness = @typeInfo(T).Int.signedness,
        },
    });
}

test "@Type" {
    expect(GetBiggerInt(u8) == u9);
    expect(GetBiggerInt(i31) == i32);
}
````

Returning a struct type is how you make generic data structures in Zig. The usage of `@This` is required here, which gets the type of the innermost struct, union, or enum. Here `std.mem.eql` is also used which compares two slices.

````zig
fn Vec(
    comptime count: comptime_int,
    comptime T: type,
) type {
    return struct {
        data: [count]T,
        const Self = @This();

        fn abs(self: Self) Self {
            var tmp = Self{ .data = undefined };
            for (self.data) |elem, i| {
                tmp.data[i] = if (elem < 0)
                    -elem
                else
                    elem;
            }
            return tmp;
        }

        fn init(data: [count]T) Self {
            return Self{ .data = data };
        }
    };
}

const eql = @import("std").mem.eql;

test "generic vector" {
    const x = Vec(3, f32).init([_]f32{ 10, -10, 5 });
    const y = x.abs();
    expect(eql(f32, &y.data, &[_]f32{ 10, 10, 5 }));
}
````

The types of function parameters can also be inferred by using `anytype` in place of a type. `@TypeOf` can then be used on the parameter.

````zig
fn plusOne(x: anytype) @TypeOf(x) {
    return x + 1;
}

test "inferred function parameter" {
    expect(plusOne(@as(u32, 1)) == 2);
}
````

Comptime also introduces the operators `++` and `**` for concatenating and repeating arrays and slices. These operators do not work at runtime.

````zig
test "++" {
    const x: [4]u8 = undefined;
    const y = x[0..];

    const a: [6]u8 = undefined;
    const b = a[0..];

    const new = y ++ b;
    expect(new.len == 10);
}

test "**" {
    const pattern = [_]u8{ 0xCC, 0xAA };
    const memory = pattern ** 3;
    expect(eql(
        u8,
        &memory,
        &[_]u8{ 0xCC, 0xAA, 0xCC, 0xAA, 0xCC, 0xAA }
    ));
}
````

## Examples

### Generic Types through Functors

* The function returns a `type`, which means it can only be called at comptime. It defines two structs:
  ````zig
  fn LinkedList(comptime T: type) type {
      return struct {
          pub const Node = struct {
              prev: ?*Node = null,
              next: ?*Node = null,
              data: T,
          };
  
          first: ?*Node = null,
          last: ?*Node = null,
          len: usize = 0,
      };
  }
  ````
  
  * main `LinkedList` struct
  * `Node` struct, namespaced inside the main struct
* structs can namespace functions ***and*** variables
* useful for introspection when creating composite types
  ````zig
  // To try this code, paste both definitions in the same file.
  const PointList = LinkedList(Point);
  const p = Point{ .x = 0, .y = 2, .z = 8 };
  
  var my_list = PointList{};
  
  // A complete implementation would offer an `append` method.
  // For now let's add the new node manually.
  var node = PointList.Node{ .data = p };
  my_list.first = &node;
  my_list.last = &node;
  my_list.len = 1;
  ````

### Dynamic specialization

* type `var` binds to anything
  
  ````zig
  fn make_couple_of(x: var) [2]@typeOf(x) {
      return [2]@typeOf(x) {x, x};
  }
  ````

* allows specialization based on call types
  
  ````zig
  fn decide_return_type(comptime T: type) type {
      if (@typeId(T) == TypeId.Int) {
          return @IntType(false, T.bit_count / 2);
      } else {
          return T;
      }
  }
  
  pub fn sqrt(x: var) decide_return_type(@typeOf(x)) {
      const T = @typeOf(x);
      switch (@typeId(T)) {
          TypeId.ComptimeFloat => return T(@sqrt(f64, x)),
          TypeId.Float => return @sqrt(T, x),
          TypeId.ComptimeInt => comptime {
              if (x > maxInt(u128)) {
                  @compileError(
                      "sqrt not implemented for " ++ 
                      "comptime_int greater than 128 bits");
              }
              if (x < 0) {
                  @compileError("sqrt on negative number");
              }
              return T(sqrt_int(u128, x));
          },
          TypeId.Int => return sqrt_int(T, x),
          else => @compileError("not implemented for " ++ @typeName(T)),
      }
  }
  ````

### Snippets
