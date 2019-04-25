// General flow here is like so

> // - Actor sets up the basics.
>
> // - Actor gets PreInitializeComponents()
>
> // - Actor constructs itself, after which its components should be fully assembled
>
> // - PostActorCreated
>
> // - Actor components get OnComponentCreated
>
> // - Actor components get InitializeComponent
>
> // - Actor gets PostInitializeComponents() once everything is set up

