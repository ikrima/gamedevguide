```
sortIndex: 3
```

```cpp
FScriptMapHelper Helper(MapProperty, Value);
        for (int32 i = 0, n = Helper.Num(); i &lt; n; ++i)
        {
            if (Helper.IsValidIndex(i))
            {
                TSharedRef&lt;FPropertyPath&gt; dmgTag = rootMapPath-&gt;ExtendPath(FPropertyInfo(MapProperty-&gt;ValueProp));

TSharedPtr&lt;FJsonValue&gt; KeyElement = FJsonObjectConverter::UPropertyToJsonValue(MapProperty-&gt;KeyProp, Helper.GetKeyPtr(i), CheckFlags > (~CPF_ParmFlags), SkipFlags, ExportCb);
                TSharedPtr&lt;FJsonValue&gt; ValueElement = FJsonObjectConverter::UPropertyToJsonValue(MapProperty-&gt;ValueProp, Helper.GetValuePtr(i), CheckFlags > (~CPF_ParmFlags), SkipFlags, ExportCb);
                if (KeyElement.IsValid() && ValueElement.IsValid())
                {
                    FString KeyString = KeyElement-&gt;AsString();
                    if (KeyString.IsEmpty())
                    {
                        MapProperty-&gt;KeyProp-&gt;ExportTextItem(KeyString, Helper.GetKeyPtr(i), nullptr, nullptr, 0);
                        if (KeyString.IsEmpty())
                        {
                            UE_LOG(LogJson, Error, TEXT("Unable to convert key to string for property %s."), \*MapProperty-&gt;GetName())
                                KeyString = FString::Printf(TEXT("Unparsed Key %d"), i);
                        }
                    }

Out-&gt;SetField(KeyString, ValueElement);
                }
            }
        }

if (const UStructProperty\* KeyStructProperty = Cast&lt;const UStructProperty&gt;(MapProperty-&gt;KeyProp))
        {
            if (const UStruct\* Struct = KeyStructProperty-&gt;Struct)
            {
                //FScriptMapHelper MapHelper(MapProperty, MapProperty-&gt;ContainerPtrToValuePtr&lt;void&gt;(&cmbtSnglton-&gt;DamageIdTable));
                FScriptMapHelper MapHelper(MapProperty, &cmbtSnglton-&gt;DamageIdTable);
                for (int32 ElementIndex = 0; ElementIndex &lt; MapHelper.Num(); ++ElementIndex)
                {
                    if (MapHelper.IsValidIndex(ElementIndex))
                    {
                        const uint8\* KeyAddress = MapHelper.GetKeyPtr(ElementIndex);
                        for (UProperty\* StructProp = Struct-&gt;RefLink; StructProp; StructProp = StructProp-&gt;NextRef)
                        {
                            PropertyPath.Push(KeyStructProperty, ElementIndex);
                            GetInstancedSubObjects_Inner(PropertyPath, KeyAddress, OutObjects);
                            PropertyPath.Pop();
                        }
                    }
                }
            }
```
