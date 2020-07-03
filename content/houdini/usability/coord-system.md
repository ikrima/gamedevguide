---
sortIndex: 2
sidebar: houdini
---

# Coordinate System, Matrix Math, etc

**Coordinate System**: Right handed, Y-Up

**Matrix**
- Matrices are post multiplied (x * M * V * P)
- Row addressable M[RowIndex][ColumnIndex]
- Matrix stored as row major m[0]-m[3] = first row, m[4]-m[7] = second row

Note that Houdini’s matrices are stored in row-major format, and vectors that are multiplied with matrices are treated as row vectors. So, if p is a hou.Vector4 representing a point and M is a Matrix4, you write p\*M, *not* M\*p. Similarly, p\*M1\*M2 will first transform p by M1, and then transform it by M2.
From <http://www.sidefx.com/docs/houdini/hom/hou/Matrix4>

**IMPORTANT** however, in the houdini network editor, some nodes like channel **multiply** can be premutliplied/postmultipleid. For left to right  inputs A, B, C =>
	- Post-multiply (eg Multiplynode) means v * C * B * A
	- Pre-multiply (eg **Transform node**) means v * A * B * C

are connected in a left to right order bc they are "post-multiply  implying a premultiply order (eg: WorldSpace * ObjectSpace * v).  Others like **transform** give you the option to premultiply or post multiply
