---
sortIndex: 12
---
**Inline Blueprint functions:**

Give BP compiler hints on inlining functions. Look at KismetMathLibrary.h for details:

```cpp

// Conditionally inlined

\#if KISMET_MATH_INLINE_ENABLED

\#include "KismetMathLibrary.inl"

\#endif
```