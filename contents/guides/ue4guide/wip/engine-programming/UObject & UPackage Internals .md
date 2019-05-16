<https://heapcleaner.wordpress.com/2016/06/11/uobject-constructor-postinitproperties-and-postload/>

All unreal objects have unique path in the form of string:

/Game/MyGame/MyAsset.Myasset.ASubObjectOfMyAsset.AnotherObject

If you split the path using dot as delimiter you will get:

1. /Game/MyGame/MyAsset

2. MyAsset

3. ASubObjectOfMyAsset

4. AnotherObject

Outer most object is awlays a UPackage

- In this example, it's /Game/MyGame/MyAsset

Object flags: Tell us the state of the object

- RF_Public =&gt; this object is visible outside of its package

  - Example of non-public object is a sub-object

  - Every object you can see in editor is Public

- RF_Standalone =&gt; Doesn’t need to be referenced to not be garbage collected

  - If containing package gets unloaded, then it gets GC'ed

- RF_Transactional =&gt; property changes are recorded and can be reverted

Class flags: tell about the object's UClass

- CLASS_Abstract =&gt; Class can't be instantiated

- CLASS_Native =&gt; Native class

- CLASS_Constructed

All native classes get populated in /Script/\[ModuleName\].

Native classes do not get a PostLoad

Constructor:

- Object is still abstract entity

PostInitProperties:

- Properties initialized, including any set from config inis

- Ready to interact with the world

Serialized Assets get PostLoad

- PostLoad is where default properties that are changed in the editor get loaded into the object

- The reset to default yellow arrow simply applies the property's value from the CDO back into the current objects' property
