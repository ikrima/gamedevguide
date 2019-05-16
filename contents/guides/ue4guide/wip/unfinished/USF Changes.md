## USF Changes

If you are just making usf changes to your VF and not C++ changes, you can setup a simple test level, run it in the editor, then recompile just a single material applied to a single mesh (or whatever your vertex factory is). When you recompile a material in the material editor, it re-reads all the usf files from disk so you can quickly iterate that way.

When you are making a new vertex factory be sure not to just return true from the ShouldCache. That will make it compile the shaders everywhere on every material. Add a usage flag to the material, then artists have to opt-in to using it. Actually the editor will automatically set the flag when possible. Then only those flagged materials will compile your VF, which can cut down the shader combinations needed massively. Have a look at any other vertex factory for a working example (except local VF).

*From &lt;<https://forums.unrealengine.com/showthread.php?6719-Debugging-USF-(Unreal-Shader-Files)>>*

<https://github.com/appleseedhq/appleseed/blob/master/src/appleseed/foundation/mesh/alembicmeshfilereader.cpp#L141>

<http://docs.alembic.io/python/examples.html>

In this example, given a node in an Alembic Archive, we’ll figure out what the final xform is. We proceed from the leaf to the root. We’re going to change **visitObject()** slightly. Instead of checking the object’s name, we’re going to call a new function, **getBounds()**. This example is adapted from

<http://code.google.com/p/alembic/wiki/CookingWithAlembic#Accumulating_a_Transform>

gBounds = imath.Box3d()  
gBounds.makeEmpty()  
kWrapExisting = alembic.Abc.WrapExistingFlag.kWrapExisting

**def** accumXform(xf, obj):  
**if** IXform.matches(obj.getHeader()):  
x = IXform(obj, kWrapExisting)  
xs = x.getSchema().getValue()  
xf \*= xs.getMatrix()

**def** getFinalMatrix(obj):  
xf = imath.M44d()  
xf.makeIdentity()  
parent = obj.getParent()  
**while** parent:  
accumXform(xf, parent)  
parent = parent.getParent()  
**return** xf

**def** getBounds(obj):  
bnds = imath.Box3d()  
bnds.makeEmpty()  
md = obj.getMetaData()  
**if** IPolyMesh.matches(md) **or** ISubD.matches(md):  
mesh = IPolyMesh(obj, kWrapExisting)  
ms = mesh.getSchema()  
positions = ms.getValue().getPositions()  
numPoints = len(positions)  
**for** i **in** range(numPoints):  
bnds.extendBy(imath.V3d(positions\[i]))  
bnds.extendBy(transform(bnds, xf))  
gBounds.extendBy(bnds)

**def** visitObject(obj):  
md = obj.getMetaData()  
**if** IPolyMesh.matches(md) **or** ISubD.matches(md):  
getBounds(obj)  
**for** childObject **in** obj.children:  
visitObject(childObject)

*From &lt;<http://docs.alembic.io/python/examples.html#accumulating-a-transform>>*
