Checkout file from source control:

VerboseMessage(TEXT("Pre ForceGetStatus1"));

ISourceControlProvider& SourceControlProvider = ISourceControlModule::Get().GetProvider();

FSourceControlStatePtr SourceControlState = SourceControlProvider.GetState( Package, EStateCacheUsage::ForceUpdate );

if(SourceControlState.IsValid())

{

if( SourceControlState->IsCheckedOutOther() )

{

UE_LOG(LogContentCommandlet, Warning, TEXT("\[REPORT] Overwriting package %s (already checked out by someone else), will not submit"), \*Filename);

}

else if( !SourceControlState->IsCurrent() )

{

UE_LOG(LogContentCommandlet, Warning, TEXT("\[REPORT] Overwriting package %s (not at head), will not submit"), \*Filename);

}

else

{

VerboseMessage(TEXT("Pre CheckOut"));

SourceControlProvider.Execute(ISourceControlOperation::Create&lt;FCheckOut>(), Package);

VerboseMessage(TEXT("Post CheckOut"));

FilesToSubmit.AddUnique(\*Filename);

}

}

VerboseMessage(TEXT("Post ForceGetStatus2"));
