> create a new package for the new asset:

1.  UPackage\* NewPackage = CreatePackage(nullptr, NewPackageName);

2.

> Than duplicate the existing asset so that its Outer is the NewPackage:

1.  UObject\* NewObject = StaticDuplicateObject(OldObject, NewPackage);

2.

> Than make any changes you want to NewObject and save the new package with:

1.  SavePackageHelper(NewPackage, NewPackageName);

> _From &lt;<https://udn.unrealengine.com/questions/366402/how-can-i-write-fassetdata-to-the-hard-disk.html>&gt;_

[The Cook, The Resave, His Garbage And Her Optimization – Unreal ...]

_From &lt;<https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=8&ved=0ahUKEwjtx5j3pO3YAhVN8GMKHbeEAoMQFghVMAc&url=https%3A%2F%2Fcoconutlizard.co.uk%2Fnew%2Fprogramming%2Fthe-cook-the-resave-his-garbage-and-her-optimization%2F&usg=AOvVaw2DkrYGi8a6hcQIued0ssJ5>&gt;_

[the cook, the resave, his garbage and her optimization – unreal ...]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=8&ved=0ahUKEwjtx5j3pO3YAhVN8GMKHbeEAoMQFghVMAc&url=https%3A%2F%2Fcoconutlizard.co.uk%2Fnew%2Fprogramming%2Fthe-cook-the-resave-his-garbage-and-her-optimization%2F&usg=AOvVaw2DkrYGi8a6hcQIued0ssJ5
