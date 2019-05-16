Great Overview Doc:  
The Slate UI Framework <https://de45xmedrsdbp.cloudfront.net/Resources/files/slateTutorials_westcoast-1963123470.pdf>

- Immediate mode with rare use of coarse-grained cache invalidation (e.g. Blueprint graph editor caches layout of all the nodes but as soon as there's a change, it rebuilds everything)

- 2 pass approach:

  - 1st Pass Bottom Up: Determine each widget's size using CacheDesiredSize & ComputeDesiredSize

  - 2nd Pass Top Down: Layout

- 3 widget types

  - Leaf: No children e.g. STextBox

  - Compound: Fixed number of children/slots e.g. Sbutton

  - Panel: Dynamic number of children e.g. SverticalPanel

- SWidget Components

  - ComputeDesiredSize()

  - ArrangeChildren()

  - OnPaint()

  - EventHandlers

* SLATE_ARGUMENT similar to SLATE_ATTRIBUTE, except it can only contain value
