---
sortIndex: 3
sidebar: ue4guide
---

# TMap DetailsView Customizations

Accesing from `IPropertyHandle`:
  ```cpp
  TSharedPtr<IPropertyHandleMap> MapProperty = PerPlatformProperty->AsMap();
  ```

Accessing from `FScriptMapHelper`:

  ```cpp
  FScriptMapHelper Helper(MapProperty, Value);
  for (int32 i = 0, n = Helper.Num(); i < n; ++i)
  {
      if (Helper.IsValidIndex(i))
      {
          TSharedRef<FPropertyPath> dmgTag = rootMapPath->ExtendPath(FPropertyInfo(MapProperty->ValueProp));

          TSharedPtr<FJsonValue> KeyElement = FJsonObjectConverter::UPropertyToJsonValue(MapProperty->KeyProp, Helper.GetKeyPtr(i), CheckFlags > (~CPF_ParmFlags), SkipFlags, ExportCb);
          TSharedPtr<FJsonValue> ValueElement = FJsonObjectConverter::UPropertyToJsonValue(MapProperty->ValueProp, Helper.GetValuePtr(i), CheckFlags > (~CPF_ParmFlags), SkipFlags, ExportCb);
          if (KeyElement.IsValid() && ValueElement.IsValid())
          {
              FString KeyString = KeyElement->AsString();
              if (KeyString.IsEmpty())
              {
                  MapProperty->KeyProp->ExportTextItem(KeyString, Helper.GetKeyPtr(i), nullptr, nullptr, 0);
                  if (KeyString.IsEmpty())
                  {
                      UE_LOG(LogJson, Error, TEXT("Unable to convert key to string for property %s."), *MapProperty->GetName())
                          KeyString = FString::Printf(TEXT("Unparsed Key %d"), i);
                  }
              }

            Out->SetField(KeyString, ValueElement);
          }
      }
  }

  if (const UStructProperty* KeyStructProperty = Cast<const UStructProperty>(MapProperty->KeyProp))
  {
      if (const UStruct* Struct = KeyStructProperty->Struct)
      {
          //FScriptMapHelper MapHelper(MapProperty, MapProperty->ContainerPtrToValuePtr<void>(&cmbtSnglton->DamageIdTable));
          FScriptMapHelper MapHelper(MapProperty, &cmbtSnglton->DamageIdTable);
          for (int32 ElementIndex = 0; ElementIndex < MapHelper.Num(); ++ElementIndex)
          {
              if (MapHelper.IsValidIndex(ElementIndex))
              {
                  const uint8* KeyAddress = MapHelper.GetKeyPtr(ElementIndex);
                  for (UProperty* StructProp = Struct->RefLink; StructProp; StructProp = StructProp->NextRef)
                  {
                      PropertyPath.Push(KeyStructProperty, ElementIndex);
                      GetInstancedSubObjects_Inner(PropertyPath, KeyAddress, OutObjects);
                      PropertyPath.Pop();
                  }
              }
          }
      }
  }
  ```
