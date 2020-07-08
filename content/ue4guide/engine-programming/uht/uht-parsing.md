---
sortIndex: 1
sidebar: ue4guide
---

Adding a new property specifier is non trivial. :-) And it cannot be done from within a plugin.

First, it'll depend on what you want your specifier to do. If it's to add new metadata to the property, then you probably enough to take a look at GetMetadataKeyword() in BaseParser.cpp. It defines which metadata actions will occur when a specifier is seen. Bear in mind that metadata specifiers can be applied to everything: functions, classes, structs etc., and that metadata is only available in editor builds.

If you want to affect reflected code generation, you will need to start your search in UnrealHeaderTool. Look at VariableSpecifiers.def - these define all of the specifiers that are currently recognised by UPROPERTYs. Then look at the large EVariableSpecifier switch statement inside FHeaderParser::GetVarType() which defines how to handle the specifiers. This usually involves doing some error checking or setting up the object's property flags.

I would recommend you don't actually add a new entry to EPropertyFlags, because it will likely be overwritten by future changes to the engine. You should store your required information in a new field in FPropertyBase.

After your flag has been parsed and stored in FPropertyBase, it will need to be processed by CreateVariableProperty(). This is also a giant switch statement which takes a FPropertyBase and creates an actual UProperty-derived object from it, so you can affect how the property is initialised here. If it's a container, be aware that containers are treated specially, inside the FHeaderParser::GetVarNameAndDim() function where it effectively 'wraps up' an instance of the property right type - see where CreateVariableProperty() is called in this function. If you need to add brand new state to your type, it's probably better to create a map (see ClassMaps.cpp) which associates your property type with the state you want to add. These property objects only exist in UnrealHeaderTool as in intermediate format - they effectively exist to be interpreted into actual C++ (the .gen.cpp files) - so this brings us to...

Code generation. As you're on 4.18.1, the code you'll be looking for is PropertyNew(), in CodeGenerator.cpp. This emits an appropriate UE4CodeGen_Private::F\*PropertyParams struct for each type of property you have. If you want to add your data here, you will need to modify the appropriate struct in the UE4CodeGen_Private namespace in UObjectGlobals.h and then emit your property data there. If you want to affect all property types, you will need to add it to FPropertyParamsBase and all of the individual property type structs, because these structs share a common initial sequence.

This will result in the right code being generated, but now it needs to be taken and used to populate the runtime property. Look in UE4CodeGen_Private::ConstructUProperty(), which takes an array of these structs, switches on the type and then creates a property for use by the engine. Here you will need to take the info which you wrote into the F\*PropertyParams struct(s) and apply it to the new runtime property.

I think that's all there is to it. ;-) As I say, it's not a trivial process, and you'll end up having to port your changes across to newer engine versions.

*Reference From <https://udn.unrealengine.com/questions/401535/add-custom-property-flag.html>*
