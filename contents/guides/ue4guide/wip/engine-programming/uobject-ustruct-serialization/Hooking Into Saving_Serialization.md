/\*\*

\* Called from within SavePackage on the passed in base/ root. The return value of this function will be passed to

\* PostSaveRoot. This is used to allow objects used as base to perform required actions before saving and cleanup

\* afterwards.

\* @param Filename: Name of the file being saved to (includes path)

\* @param AdditionalPackagesToCook [out] Array of other packages the Root wants to make sure are cooked when this is cooked

\*

\* @return Whether PostSaveRoot needs to perform internal cleanup

\*/

virtual bool PreSaveRoot(const TCHAR\* Filename, TArray<FString>& AdditionalPackagesToCook)

{

return false;

}

/\*\*

\* Presave function. Gets called once before an object gets serialized for saving. This function is necessary

\* for save time computation as Serialize gets called three times per object from within SavePackage.

\*

\* @warning: Objects created from within PreSave will NOT have PreSave called on them!!!

\*/

virtual void PreSave(const class ITargetPlatform\* TargetPlatform);

Make sure to override cooking process somehow so that any lazily referenced objects in your new asset are added to the cook & inclusion process

Look at UDataTable::Serialize() & UWorld::AddReferencedObjects &

UWorld::PreSaveRoot(const TCHAR\* **Filename**, TArray<FString>& **AdditionalPackagesToCook**)

virtual void CookAdditionalFiles( const TCHAR* PackageFilename, const ITargetPlatform* TargetPlatform ) { }
