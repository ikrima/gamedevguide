I think you should be able to produce this sort of effect similar to the Get Data Table Row node, which casts the values in a data table to the correct output pin type based on a **UScriptStruct** which is derived from the inputs.

It may help to visualize by dropping one of these nodes into a blueprint editor (also have a data table to actually hook it up to). You'll see the output type changes according to the type in the data table row.

In C++, reference **UK2Node_GetDataTableRow**. I think of particular interest for the purpose of controlling the output pin type will be the **SetReturnTypeForStruct** method .

Depending on how you do it, it may also be useful to use a UK2Node_CallFunction, which you can see an example of in **ExpandNode** where we use **GetDataTableRowFromName** . Here it's used to transform the row name, but you may find a similar use for this elsewhere.

*From &lt;<https://udn.unrealengine.com/questions/458599/view.html>>*
