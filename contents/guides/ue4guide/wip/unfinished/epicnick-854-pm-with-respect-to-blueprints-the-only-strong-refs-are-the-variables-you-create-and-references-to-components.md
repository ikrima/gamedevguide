###### [epicnick](https://ue4vr.slack.com/team/epicnick) \[*\[*8:54 PM*]*]

with respect to blueprints, the only strong refs
are the variables you create, and references to components

[*\[*8:54*\]*]

the intermediates in the event graph use weak object pointers, so an intermediate result won't necessarily keep an object alive

[*\[*8:54*\]*]

at a class level, classes can override AddReferencedObjects to hold on to references to things not reflected through the normal UProperty hierarchy

**2**

[*\[*8:55*\]*]

that's the biggest point of divergence for some of the native classes

###### [ikrima][*\[*8:59 pm*\]*]

[@epicnick][]: Gotcha; and to double check, all UPROPERTY markups turn naked pointer references to UObjects to strong references?

###### [epicnick][@epicnick] [*\[*8:59 PM*\]*][2]

All EXCEPT TWeakObjPtr UPROPERTIES

[*\[*8:59*\]*]

but yup, that is correct

*From <https://ue4vr.slack.com/messages/techtalk/search/garbage>*
