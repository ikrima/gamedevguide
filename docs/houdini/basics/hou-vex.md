# VEX

## Overview

VEX is Houdini's SIMD streaming scripting language

## Internals

- Houdini "JIT" compiles VEX code as part of node cook process  with `vcc.exe`
- execution is runtime bytecode interpreter
- using llvm for lowering/optimization for simple optimizations builtin like constant folding, dce, and outlining
- some useful commmands
  - dump ast: `vcc --vfl-input foo.vfl -c cvex --compile-all --compile-target dumpast`
  - dump IR:
    - vex program:             `vcc --vfl-input foo.vfl -c cvex`
    - unoptimized vex program: `vcc --vfl-input foo.vfl -c cvex --no-optimize`
    - force for all functions: `vcc --vfl-input foo.vfl -c cvex --compile-all --generate-intrinsic-lib`
  - [more details](https://www.sidefx.com/docs/houdini/vex/vcc.html)

## Useful Functions

| Function  | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| `primuv`  |                                                                                           |
| `xyzdist` | return the distance from the sample point pt to the nearest point on the surface geometry |
| `chramp`  |                                                                                           |
| `fit01`   |                                                                                           |

## Common Tasks
- Print to Console: `printf("boobs %s %f", "wee", 1.0);`
- Pipe operator output referenced by parameter:
  - Object Merge Object1 field: `chsop("../../../export_node")`
  - `opfullpath("..") + "/fluid_obj/TRIANGLE_CLOUD"`
- [Loop over primitive points](https://gist.github.com/NSDesign/983bb7df6d6a154e9a19)
- [Ryoji CG Useful Snippets](https://sites.google.com/site/fujitarium/Houdini/useful-expressions-houdini)
- [Create Geo](https://houdinitricks.com/cvex-wrangle-vop-nodes/)
- Iterate over points in a primitive
  ```vex
  int primpoints[] = primpoints(0, @primnum);
  int num_pts = len(primpoints);

  //Loop over the vertercies to find their associated points
  foreach (int pidx; int point_num; primpoints) {
    vector cd = {0.0};
    cd.g = chramp("n",pidx/float(num_pts));
    setpointattrib(0, "Cd", point_num, cd, "set");
  }
  ```

- More detailed method to iterate over vertices and points in a primitive
  ```vex
  i@prim;
  v@uv;
  float dist = xyzdist(1, @P, @prim, @uv);
  //Above gets the prim(n) and prim(uv) for a given point position
  //Also the distance between the given point and the prim returned
  //Although all we really need is the primitive number

  //Create array to store the primitive's point numbers
  v@primpoints;//This vector is used to store the 3 points instead of using an array, due to a limit with array attributes.

  // NOTE: Basically if you want to access the array in another wrangle
  // further down the chain, you need to use a data type other than an
  // array instead, a vector or matrix can be used to store array like data structures

  //Get the number of vertex for a given prim
  int nvtx = primvertexcount(0, @prim);

  //Loop over the vertercies to find their associated points
  for (int i = 0; i < nvtx; i++){
    //Get the linear vertex numbers for the prim(n)
    int linearvertex = vertexindex(0, @prim, i);

    //Get the point number from the linear vertex number
    int vertexpoint = vertexpoint(0, linearvertex);

    //Put point numbers into the points array
    @primpoints[i] = vertexpoint;
  }
  //Display primitive's point numbers
  //printf("%g \n", points);
  ```

## Parameter Binding

| VEX type               | Syntax   |
| ---------------------- | -------- |
| `float`                | `f@name` |
| `vector2` (2 floats)   | `u@name` |
| `vector` (3 floats)    | `v@name` |
| `vector4` (4 floats)   | `p@name` |
| `int`                  | `i@name` |
| `matrix2` (2×2 floats) | `2@name` |
| `matrix3` (3×3 floats) | `3@name` |
| `matrix` (4×4 floats)  | `4@name` |
| `string`               | `s@name` |

[(Reference)](http://www.sidefx.com/docs/houdini/vex/snippets)

## Tutorials
- [VEX tutorial](https://github.com/jtomori/vex_tutorial)
- [VEX Guide](http://www.tokeru.com/cgwiki/index.php?title=HoudiniVex)


## Kiryha's Snippets
[Kiryha's VEX Snippets Inlined below](https://github.com/kiryha/Houdini/wiki/vex-snippets)

### Basics
The VEX 101 and the most low-level solution blocks.

#### Datatypes
```vex
// Integers
int myInteger = 1;
i@myInteger = 1;

// Floats
float myFloat = 4.14;
f@myFloat = 3.14;

// Strings
string myStiring = 'C:/cache/animation.abc';
s@myString = 'C:/cache/animation.abc';

// Arrays
string variations[] = {'A','B','C'};
string variables[] = array(variable_A, variable_B, variable_C);
s[]@variations = {'A','B','C'};
```

#### Data type convertion
```vex
// interger >> string
int number = 123;
string text = itoa(number);

// string >> integer
string text = '123';
int number = atoi(text);
```

#### Strings
```vex
// Print strings
printf('Hello, World!');
// Result: Hello, World!

// Print string variable
string text = 'Hello, World!';
printf('The text is: %s \n', text);
// Result: The text is: Hello, World!

// Slice strings
// string[start:stop]  >> Use <start> through <stop>-1
string text = '123456';
text[:];     // Result: '123456'
text[:-1];   // Result: '12345'
text[1:];    // Result: '23456'
text[1:-1];  // Result: '2345'
text[-1];    // Result: '6'
text[0];     // Result: '1'

// Concatenate (join) strings
string node = 'SOP';
string value = '256';
string output = sprintf('%s%s%s', node, ' = ', value);
printf('%s', output);
// Result: 'SOP = 256'

// Reverse
string text = 'ABCD''
reverse(text);
// Result: 'DCBA'
```

#### Arrays
```vex
// Accessing, sorting, reversing elements
int numbers[] = {5, 4, 3, 2, 1};
printf(' %d\n', numbers[0]);                // Result: 5
printf(' %d\n', numbers[-1]);               // Result: 1
printf(' %d\n', numbers[2:]);               // Result: {3, 2, 1}
printf(' %d\n', sort(numbers));             // Result: {1, 2, 3, 4, 5}
printf(' %d\n', reverse(sort(numbers)));    // Result: {5, 4, 3, 2, 1}

// Add element to array
int numbers[] = {1, 2, 3, 4, 5, 6};
numbers[1] = 7;
// Result: {1, 7, 3, 4, 5, 6}
numbers[6] = 7;
// Result: {1, 2, 3, 4, 5, 6, 7}
append(numbers, 7);
// Result: {1, 2, 3, 4, 5, 6, 7}

// Find element in array
int numbers[] = {5, 4, 3, 2, 1};
int index_of_4 = find(numbers, 4);
printf('%d', index_of_4 );
// Result: 1

// Split string with a space to array of strings
string numbres = '1 2 3 4 5 6';
string array[] = split(numbres, ' ');
printf('%s', array);
// Result: {1, 2, 3, 4, 5, 6}

// Split integer into array of integers via strings
int int_number = 312654;
string string_number = itoa(int_number);
int int_numbers[];

for(int n=0; n<len(string_number); n++){
        int_numbers[n] = atoi(string_number[n]);
        }

printf('%s', int_numbers);
// Result: {3, 1, 2, 6, 5, 4}
printf('%s', sort(int_numbers));
// Result: {1, 2, 3, 4, 5, 6}
printf('%s', reverse(sort(int_numbers)));
// Result: {6, 5, 4, 3, 2, 1}
```

#### Get and set attribute values
```vex
// Get attribute value from first Wrangle input:
vector point_pos = v@opinput0_P;
vector point_pos = point(0, "P", @ptnum);

// Get attribute value from scene geometry:
vector point_pos = point("op:../geometry_name", "P", @ptnum);

// Get primitive attribute in point mode
primattrib(0, "attribute_name", @ptnum, 0);

// Create color attribute and set it`s value to red
addpointattrib(0, "Cd", {1,0,0});

// Create point attribute and set value
// Could be used to create and set point attributes in detail mode
setpointattrib(0, "<attribute_name>", <point_number>, <value>, "set");

// Set attribute value:
f@pi = 3.1415;
v@vector_a = {1, 2, 3};
v@vector_b = set(1, 2, @P.z);
```

#### Modify input values
```vex
float input;
// Modify with fit range
input = fit(input, <currentMinValue>,<currentMaxValue>, <outMin>, <outMax>);
// Modify with a ramp
input = chramp('Modify_Value', input);
```

#### Get points and primitives
```vex
// Run over points
int points[] = expandpointgroup(0, "!*");
int primitives[] = expandprimgroup(0, "!*");
// Run over primitives
int points[] = primpoints(0, @primnum);
```

#### Add point attribute in Detail mode
```vex
addpoint(0, {0,0,0});
setpointattrib(0, 'myAttribute', 0, 'attributrValue', "set");
```
#### Debug VEX with print
```vex
// Basic print
printf('Hello, World');

// Print data
printf('The string is %s', 'Eve');         // Result: The string is Eve
printf('The integer is %d', 256);          // Result: The integer is 256
printf('The float is %f', 3.14156);        // Result: The float is 3.14156
printf('The the float is %.2f', 3.14156);  // Result: The float is 3.14

// Get all primitives
int primitives[] = expandprimgroup(0, "*");

foreach (int currentPrim; primitives){
        // print primitive number
        printf('Prim %s \n', currentPrim);
        }
```

#### Create groups
```vex
// Add points with X position > 1 to group "high"
if (@P.x > 1){
    setpointgroup(0, 'high', @ptnum, 1, 'set');
    // Alternative: i@group_high = 1
    }

// To highlight VEX group in the viewport enter group name
// in the <Output Selection Group> field
// in <Bindings> tab of the Wrangler node.
```

#### Loops
```vex
for(first; last; increment) { // Do something }
foreach(element; array) { // Do something }
foreach(index; element; array) { // Do something }
```

```vex
// Create OPEN shape

// Create LINE primitive
int primitive = addprim(0, 'polyline');
// Calculate total number of points
int numberOfPoints = @numpt;

// Create a vertex for each point in primitive
for (int n=0; n<numberOfPoints; n++){
  addvertex(0, primitive, n);
}
```

```vex
// Create CLOSED shape

// Create POLYGON primitive
int primitive = addprim(0, 'poly');
// Store all points in array
int allPoints[] =  expandpointgroup(0, "!*");

// Create a vertex for each point in primitive
foreach(int currentPoint; allPoints){
  addvertex(0, primitive, currentPoint);
}
```

#### Conditions
```vex
// Scale 10 times first and last points
if ((@ptnum == 0) || (@ptnum == (@numpt-1))) f@pscale = 10;
else f@pscale = 1;

// Scale 10 times first and last points, short form
f@pscale = (@ptnum == 0) || @ptnum ==(@numpt-1) ? 10 : 1;
```

#### Vectors
```vex
// Find a vector between two points A and B (coords B - coords A)
vector vector_A = normalize(point(0, "P", <ptnum_B>));
vector vector_B = normalize(point(0, "P", <ptnum_A>));
vector vector_AB = vector_A-vector_B;

// Build tangent normals
vector vector_A = normalize(point(0, "P", @ptnum));
vector vector_B = normalize(point(0, "P", @ptnum + 1));
@N = vector_A-vector_B;

// Get angle between 2 vectors in radians
float angle = acos(dot(normalize(vector_A), normalize(vector_B)));
```

### Transformation matrix
```vex
// Get matrix from scene object
matrix matrx = optransform('obj/geometry_01');
// Apply object transforms to a points
@P *= matrx;
```

#### VEX functions
```vex
// Create array from point positions (Detail mode)
function vector[] get_point_positions(){
    vector points[];
    for(int i=0; i<npoints(0); i++){
        vector point_position = point(0, 'P', i);
        append(points, point_position);
    }
    return points;
}

printf('Array = %s\n',  get_point_positions());
// Result: Array = {{0,0,0}, {0,0.12,0}, {0,0.23,0}, {0,0.34,0}}
```

### Using custom VEX modules
It is possible to create custom VEX functions, save them in `*.h` files, and import them into the Attribute Wrangle. Importing is possible via `#include` statement, followed by the file name.

Import options:
- Direct import with a full path:
  `#include "D:/Eve/tools/houdini/vex/library.h"`
- The path to `library.h` file set via environment variable (os.environ['HOUDINI_VEX_PATH'] = "D:/Eve/tools/houdini/vex/"):
  `#include <library.h>`
- The path set via UI parameter. lib_path = `$EVE_ROOT`, where $EVE_ROOT is "EVE_ROOT" env variable set to "D:/Eve"):
  `#include "`chs('lib_path')`/tools/houdini/vex/library.h"`

The `library.h` file, located in `D:/Eve/tools/houdini/vex/library.h`:

```vex
void hello(){
    printf('Hello, Eve!\n');
}

```

The code in Attribute Wrangle:
```vex
#include "D:/Eve/tools/houdini/vex/library.h"

hello();

// Result: Hello, Eve!
```

### Custom data types in VEX
If the default data types are not sufficient for your needs you can implement custom data type in VEX using [struct](https://www.sidefx.com/docs/houdini/vex/lang#structs).

The **struct** works only if defined in a [custom module](#using-custom-vex-modules) or in the "Outer Code" parameter of the "snippet1" node. You can find it inside the Attribute Wrangle asset (need to unlock Attribute Wrangle to have access):
`attribwrangle1 > attribvop1 > snippet1`

#### VEX Hash Table
In this example, we would implement a Hash Table data structure, which allows storing key/value pairs. It is well known as a **dictionary** in Python or **object** in Javascript.

```vex
// The library.h content
// VEX Hash Table implementation for {string:float} pairs
struct hash_table{
    int array_len;  // Limit array length
    float data[];  // Init data

    int build_index(string key){
        // Build and return index for array from string
        int index = random_shash(key) % this.array_len*10;

        return index;
    }

    void add_item(string key; float value){
        // Place item value in array at index position
        int index = this -> build_index(key);
        this.data[index] = value;
    }

    float get_item(string key){
        // Get item from array by position
        int index = this -> build_index(key);
        float value = this.data[index];

        return value;
    }
}
```

If we would need to store integer values for several items, e.g. amount of fruits we need to bye, we can use our `hash_table` structure.
The Attribute Wrangle (detail mode) code:

```vex
#include <library.h>

// Initialize hash table
float data[];
int table_size = 10;
hash_table fruits_number = hash_table(table_size, data);

// Add elements to hash map
fruits_number->add_item('apple', 256);
fruits_number->add_item('banana', 1024);
fruits_number->add_item('strawberry', 512);

// Get element
float number_of_apples = fruits_number->get_item('apple');
printf('Amount = %s \n', number_of_apples);

// Result: Amount = 256
```

### VEX expressions
Using VEX in the parameter interface of Houdini nodes. See [documentation](http://www.sidefx.com/docs/houdini/expressions/index.html)

#### Get Attributes
```vex
detail("../nodeName/", 'attributeName', 0)
point("../nodeName/",@ptnum, 'attributeName',0)
```
#### Every N frame
```vex
if(($F % N == 0),$F,0)
// Hscript version: floor($F/N)*N
```

#### Select corner points
```vex
# create Groupexpreesion SOP
neighbourcount(0, @ptnum) == 2
```

### Tools
In this section, there are a bit more sophisticated VEX solutions. Each solves some particular task and can be considered as a custom tool.

### Hanging wire between two points controlled by ramp

```vex
/*
Build a hanging wire between 2 anchor points

Feed 2 points into detail wrangle
Define wire shape with a "Shape" ramp.
*/

// Define initial variables
int number_of_points = chi('number_of_points');
vector anchor_a = point(0, "P", 0);
vector anchor_b = point(0, "P", 1);

// Build arc
for(int i=1; i<number_of_points+1; i++){

    // Distribute points evenly between anchors
    vector segment_len = (anchor_b-anchor_a)/(number_of_points+1);
    vector position = anchor_a + i*segment_len;

    // Modify Y position with ramp via remapped iteration numbers
    float range = fit(i, 1, number_of_points, 0, 1);
    position.y -= chramp('Shape', range);
    vector point_position = set(position.x, position.y, position.z);

    // Create point
    int point = addpoint(0, point_position);

    // Build polygons
    if(i==1) addprim(0, 'polyline', 0, 2);  // Add first segment
    if(i!=0 && i!=number_of_points) addprim(0, 'polyline', i+1, i+2);  // Add inner segments
    if(i==number_of_points) addprim(0, 'polyline', number_of_points+1, 1);  // Add last segment
}

```

### Hanging wire between two points
```vex
/*
Build a hanging wire between 2 anchor points

Feed 2 points into detail wrangle
Ranges: shift = [-1:1], number_of_points = [1:10], curvature = [0:5]
Define wire shape with all 3 parameters (shift, number_of_points, curvature),
increase resolution with a subdivide node after. The number_of_points also affects shape!
*/

// Define initial variables
float shift = chf('shift');
int number_of_points = chi('number_of_points');
vector anchor_a = point(0, "P", 0);
vector anchor_b = point(0, "P", 1);
float array_center = (number_of_points-1)/2.0+2;  // Created points array center

// Build arc
for(int i=1; i<number_of_points+1; i++){

    vector segment_len = (anchor_b-anchor_a)/(number_of_points+1);
    vector position = anchor_a + i*segment_len; // Distribute points evenly between anchors
    float point_num = i+1;
    float curv_value = chf('curvature');
    float curvature;

    // Adjust point positions to shape parabola
    if(point_num < array_center) curvature = curv_value/point_num; // Left side
    if(point_num == array_center) curvature = curv_value*1.16/point_num; // Center point
    if(point_num > array_center) curvature = curv_value/(point_num-2*(point_num - array_center)); // Right side


    // Aplyy adjustments
    position.y += curvature + shift - chf('curvature');
    vector point_position = set(position.x, position.y, position.z);

    // Create point
    int point = addpoint(0, point_position);

    // Build polygons
    if(i==1) addprim(0, 'polyline', 0, 2);  // Add first segment
    if(i!=0 && i!=number_of_points) addprim(0, 'polyline', i+1, i+2);  // Add inner segments
    if(i==number_of_points) addprim(0, 'polyline', number_of_points+1, 1);  // Add last segment
}
```

### Flatten mesh by UVs
```vex
// Plave points as UVs in 3d
v@rest = @P;
@P = vertex(0, "uv", pointvertex(0, @ptnum));

// Return them back
@P = v@rest
```

### Remap random from 0:1 to -1:1
```vex
float random = rand(@ptnum)*2-1;
```

### Bend (curl) curves (hairs)
```vex
// Primitive wrangle
int points[] = primpoints(0, @primnum);

matrix3 matrx = ident();
float angle = radians( chf('angle') );
vector axis = {1, 0, 0};

vector init_pos = point(0, "P", points[0]);
vector prev_pos = init_pos;

for (int n=0; n<len(points); n++){
    vector curr_pos = point(0, "P", points[n]);
    rotate(matrx, angle, axis);

    // init_pos *= 0.01; // spiral
    vector new_pos = (curr_pos - init_pos)*matrx + prev_pos;
    init_pos = curr_pos;
    prev_pos = new_pos;

    setpointattrib(0, "P", points[n], new_pos);
    }

```


### Create UVs on curves (hairs) and paint with ramp and random color
```vex
// For input cluster of curves
// Set uv attribute from 0 at a root, to the 1 at a tip
f@uv = float(vertexprimindex(0, @ptnum))/(@numvtx-1);

// Paint curve and correct with ramp
@Cd = chramp('Value',@uv);

// Add random 10% of red curves
if(rand(@primnum) > 0.9){
    @Cd={1,0,0};
    }
```

### Stick points to animated geometry
Create TimeShift SOP after animated geo, Scatter SOP and Attribute Wrangler. Connect scatter, timeShift, animated geo to inputs 0, 1 and 2 of the wrangle.
```vex
int prim;
vector uv;

// What prim the scatterd point is close to, and position of this prim in uv space
xyzdist(1, @P, prim, uv);
// Set scattered point position
@P = primuv(2, "P", prim, uv);
```

#### Move an object to the origin and return back
Create wrangle to move object to the origin
```vex
// Get center of the oject bounding box (centroid)
vector min = {0, 0, 0};
vector max = {0, 0, 0};
getpointbbox(0, min, max);
vector centroid = (max + min)/2.0;

// Build and apply transformation matrix
vector translate = centroid;
vector rotate = {0,0,0};
vector scale = {1,1,1};
matrix xform = invert(maketransform(0, 0, translate, rotate, scale));
@P *= xform;

// Store transformation matrix in attribute
4@xform_matrix = xform;
```

Create the second wrangle to return it to the original position
```vex
@P *= invert(4@xform_matrix);
```

#### Use Noise function
```vex
// Visualise nose as Black and White values
// Delete black and white points separatly

// Default non zero values for 10X10 grid:
// Noise_size = 1
// Noise_threshold = 0.5

// Make geometry white
@Cd = {1, 1, 1};

// Setup noise
float noseValues = noise(@P*(1/chf('Noise_Size')) + chf('Noise_Offset'));

// Paint-delete points with noise
if(noseValues > chf('Noise_Threshold')){
    @Cd = 0;
    if(rand(@ptnum) < ch('delete_black')){
        if(chi('del') == 0){
            @Cd = {1,0,0};
            }
        else{
            removepoint(0,@ptnum);
            }
        }
    }

if(noseValues < chf('Noise_Threshold')){
    if ( rand(@ptnum) < ch('delete_white') ) {
        if(chi('del') == 0){
            @Cd = {1,0,0};
            }
        else{
            removepoint(0,@ptnum);
            }
        }
    }
```

#### Flatten surface bottom
```vex
float min = ch("flatten_disrtance") + getbbox_min(0).y;
float max = getbbox_max(0).y;
float Y = clamp(@P.y, min, max);

@P = set(@P.x, Y, @P.z);

```

#### Multiply distribution (make small smaller, big bigger)
```vex
value = pow(value, 8.0);
```

#### Noise the points
```vex
// Define UI controls
float noise = chf('Noise_Power');
float freq = chf('Noise_Frequency');
// Create noise
vector noiseXYZ = noise(@P*freq);
// Apply noise to a point position
v@ns = fit(noiseXYZ, 0,1, -1, 1)*noise;
@P.x  += @ns.x;
@P.z  += @ns.z;
```
#### Select mesh border points
```vex
// Get number of connectet points
int nbPts = neighbourcount(0,@ptnum);
// Create "border" group with border points
i@group_border = nbPts == 3 | nbPts == 2;
```
#### Shape Polywire with ramp for combined curves
```vex
// Create Primitive Wrangle before polywire, use @width as Wire Radius
// Get array of points in each curve (primitive)
i[]@primPts = primpoints(0, @primnum);

// For each point in current curve
foreach (int i; int currentPoint; @primPts){
    float ramp_index = fit(i, 0, len(@primPts)-1, 0,1);
    f@widthPrim = chramp("shape", ramp_index)/20;
    setpointattrib(0, "width", currentPoint, @widthPrim, "set");
    }
```

#### VEX strings
```vex
// Build fileName_##.abc with variable
int version = 1;
string fileName = sprintf('fileName_%02d.abc', version);
// result: fileName_01.abc
```

#### Find closest points
```vex
float maxdist = 0.8;
int maxpoints = 10;

int closept[] = pcfind(0, 'P', @P, maxdist, maxpoints);
```

#### Randomize file name
```vex
// Get random file from sim_A_01.abc, sim_B_01.abc, sim_C_01.abc
string variations[] = {'A','B','C'};
int variationIndex = rint(fit(rand(@ptnum), 0, 1, 0, 2));
string path = sprintf('D:/PROJECTS/VEX/geo/sim_%s_01.abc', variations[variationIndex])
```

#### Fade grid Y deformation closer to border
```vex
float objectSize = (getbbox_max(0).x + getbbox_max(0).z)/2;
float dist = distance(0,@P);
float offset = chf('offset');
float fade = chramp('fade', fit(dist, 0, objectSize + offset, 0, 1));
@P.y *= fade;
```

#### Fade noise on curves with ramp
```vex
// Requires uvtexture SOP in "Pts and Columns" mode before this wrangle

// Define UI controls
float remap_uv = chramp('remap_uv', @uv.x);
float power = chf('Noise_Power');
float freq = chf('Noise_Frequency');

// Create noise
vector noiseXYZ = noise(@P*freq);
// Modify noise values
vector displace = fit(noiseXYZ, 0,1, -1, 1)*power*remap_uv;
// Apply modified noise to a points position
@P += displace;
// Visualize fade ramp on curve
@Cd = remap_uv;
```

#### Rotate GEO with matrix along Y axis
```vex
// Create rotation matrix
matrix3 matrx = ident();
// Create angle control with UI
float angle = radians( chf('angle') );
// Define rotation axis
vector axis = {0, 1, 0};

//Rotate the matrix
rotate ( matrx, angle, axis);

// Apply rotation: multiply position by matrix
@P *= matrx;
```

#### Adjust pivot point of rotation matrix
```vex
matrix3 matrx = ident();
float angle = radians(36);
vector axis = {1, 0, 0};
vector pivot = {0, 2.56, 0};

rotate ( matrx, angle, axis);
@P = (@P - pivot) * matrx + pivot;
```

#### Rotate GEO with quaternion along XYZ axys
```vex
// Setup angle control with UI
float angle_X = radians(chf('angle_X'));
float angle_Y = radians(chf('angle_Y'));
float angle_Z = radians(chf('angle_Z'));

// Apply rotation
vector rotations = set(angle_X,angle_Y,angle_Z);
@P = qrotate(quaternion(rotations), @P);
```

#### Rotate Y COPIES with quaternion multiply
```vex
@N;
@up = {0,1,0};

@orient = quaternion(maketransform(@N,@up));
vector4 rotate_Y = quaternion(radians(ch('Rotate_Y')),{0,1,0});
@orient = qmultiply(@orient, rotate_Y);
```

#### Randomize copies
```vex
// Define orientation vectors
@N;
@up = {0,1,0};

// Define random position values
float randPos_X = fit01(rand(@ptnum), -ch('Translate_X'), ch('Translate_X'));
float randPos_Y = fit01(rand(@ptnum), -ch('Translate_Y'), ch('Translate_Y'));
float randPos_Z = fit01(rand(@ptnum), -ch('Translate_Z'), ch('Translate_Z'));
vector randPos = set(randPos_X, randPos_Y, randPos_Z);

// Define random rotation values
float randRot_X = fit01(rand(@ptnum), -ch('Rotate_X'), ch('Rotate_X'));
float randRot_Y = fit01(rand(@ptnum), -ch('Rotate_Y'), ch('Rotate_Y'));
float randRot_Z = fit01(rand(@ptnum), -ch('Rotate_Z'), ch('Rotate_Z'));

// Apply random positions
@P += randPos;

// Apply random rotations
@orient = quaternion(maketransform(@N,@up));
vector4 rotate_X = quaternion(radians(randRot_X),{1,0,0});
vector4 rotate_Y = quaternion(radians(randRot_Y),{0,1,0});
vector4 rotate_Z = quaternion(radians(randRot_Z),{0,0,1});
@orient = qmultiply(@orient, rotate_X);
@orient = qmultiply(@orient, rotate_Y);
@orient = qmultiply(@orient, rotate_Z);

// Apply random scale
@scale = fit01(rand(@ptnum), chf('Scale_MIN'), chf('Scale_MAX'));
```

#### Spiral
```vex
float angle;
vector pos = {0,0,0};
int npoints = chi('number_of_points');
float step = radians(ch('sweep'))/npoints;

for (int n=0; n<npoints; n++) {
    angle = step * n; // Or: angle += step;

    pos.x = cos(angle);
    pos.y = angle/10 ;
    pos.z = sin(angle);

    addpoint(0, pos);
}
```

#### Spiral grow
```vex
float angle;
vector pos = {0,0,0};
int npoints = chi('number_of_points');
float step = radians(ch('sweep'))/npoints;

for (int n=0; n<npoints; n++) {
    angle = step * n;

    pos.x = sin(angle) * angle;
    pos.y = angle;
    pos.z = cos(angle) * angle;

    addpoint(0, pos);
}
```
#### Phylotaxis
```vex
int count = 400;
float bound = 10.0;
float tau = 6.28318530; // 2*$PI
float phi = (1+ sqrt(5))/2; // Golden ratio = 1.618
float golden_angle = (2 - phi)*tau; // In radians(*tau)
vector pos = {0,0,0};
float radius = 1.0;
float theta = 0;
int pt;


vector polar_to_cartesian(float theta; float radius){
    return set(cos(theta)*radius, 0, sin(theta)*radius);
}

for (int n=0; n<count; n++){
    radius = bound * pow(float(n)/float(count), ch('power'));
    theta += golden_angle;

    pos = polar_to_cartesian(theta, radius);

    // Create UP, pscale and N attr
    pt = addpoint(0, pos);
    setpointattrib(0, "pscale", pt, pow(radius,0.5));
    setpointattrib(0, "N", pt, normalize(-pos));
    setpointattrib(0, "up", pt, set(0,1,0));
}
```

#### Create geometry from points array
```vex
float searchRadius = ch('searchRadius');
int nearpnts[] = nearpoints(0, @P, searchRadius);
foreach (int pnt;  nearpnts){
    if(pnt != @ptnum){
        int line = addprim(0, 'polyline');
        addvertex(0, line, @ptnum);
        addvertex(0, line, pnt );
        }
    }
```

### Algorithms

#### Swap variables
```vex
int varable_a = 256;
int varable_b = 512;

int swap = variable_a;
variable_a = variable_b;
variable_b = swap;

printf('variable_a = %s, variable_b = %s', variable_a, variable_b);
// Result: variable_a = 512, variable_b = 256
```

#### Reverse array
```vex
int int_numbers[] = {1,2,3,4,5,6};
int rversed[];

for(int i=0; i<len(int_numbers)/2; i++){

    int number_from_start = int_numbers[i];
    int index_from_end = len(int_numbers)-i-1;

    rversed[i] = int_numbers[index_from_end];
    rversed[index_from_end] = number_from_start;
    }

printf('%s', rversed);
// Result: {6, 5, 4, 3, 2, 1}
```

#### Choise sort
```vex
int numbers[] = array(0,4,3,2,1);

for(int i=0; i<len(numbers)-1; i++){
    for(int n=i+1; n<len(numbers); n++){
        if(numbers[i]>numbers[n]){

            int swap = numbers[i];
            numbers[i] = numbers[n];
            numbers[n] = swap;
        }
    }
}

printf('Array = %s\n', numbers);
// Result: Array  = {0, 1, 2, 3, 4}
```

#### Bubble sort
```vex
int numbers[] = array(0,4,3,2,1);

for(int i=1; i<len(numbers); i++){
    for(int n=0; n<len(numbers)-i; n++){
        if(numbers[n]>numbers[n+1]){

            int swap = numbers[n];
            numbers[n] = numbers[n+1];
            numbers[n+1] = swap;
        }
    }
}

printf('Array = %s\n', numbers);
// Result: Array  = {0, 1, 2, 3, 4}
```

#### Longest common prefix
```vex
// Leetcode #14:  Longest Common Prefix

string names[] = array('floor', 'flower', 'flight');
string prefix;

for(int i=1; i<len(names); i++){
    for(int n=0; n<len(names[i]) ;n++){

        if(names[i][n] != names[0][n]){
            break;
        }

        prefix = names[i][0:n+1];

    }
}

printf('The common prefix is: %s\n', prefix);
```
