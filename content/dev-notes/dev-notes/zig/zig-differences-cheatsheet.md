# Zig Notes

* Loops, labeled blocks, and if statements are expressions

* Zig Pointer Syntax
  
  ````zig
  u8           :  one u8
  *u8          :  pointer to one u8
  [2]u8        :  two u8s
  [*]u8        :  pointer to unknown number of u8s
  [*]const u8  :  pointer to unknown number of immutable u8s
  *[2]u8       :  pointer to an array of 2 u8s
  *const [2]u8 :  pointer to an immutable array of 2 u8s
  []u8         :  slice of u8s
  []const u8   :  slice of immutable u8s
  ````
