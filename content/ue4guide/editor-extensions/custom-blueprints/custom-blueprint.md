---
sortIndex: 1
sidebar: ue4guide
---

# Class Diagram Overview

There's on overabundance of class/OOP and hard to track what is supposed to do what. Here's a great diagram from <http://www.ms.mff.cuni.cz/~polakma1/adventure-plugin/programming.html> that crystalizes the relationships.

From a UI/MVC viewpoint:
![Graph Editor Class UI Relationship](../../assets/Graph-Editor-Class-Relationship.png)

From a functionality/responsibility viewpoint:
![Graph Editor Class Feature Relationship](../../assets/Graph-Editor-Class-Relationship2.png)

# How to use templates
**IMPORTANT!** This is just a literal translation from the excellent github repo <https://github.com/Eragon-Brisingr/XD_GraphEditor_Template>

## use

### Create chart

![Create chart](../../assets/custom-bp-create.png)

### use

![Node effect](../../assets/custom-bp-nodeffect.png)

### Use the template

Rename all types with _Template to the required type name.

# Make Unreal Chart Editor

## Inheritance Type

### UEdGraphSchema

1. EdGraphSchema defines most of the global behavior of chart operations
2. Map UEdGraph and EdGraphSchema in FBlueprintEditorUtils :: CreateNewGraph

### UEdGraph

EdGraph is a type of chart instance that defines the behavior of the chart (such as saving a chart

### UEdGraphNode

1. EdGraphNode is the type of graph node instance, which defines the behavior of the node
2. AutowireNewNode defines the automatic connection behavior of the node

### FAssetEditorToolkit

1. You can call FAssetEditorToolkit :: InitAssetEditor during initialization to define the layout of the panel. (For complexity, refer to FApplicationMode)
2. Define basic editor operations by registering events (copy, paste, copy, delete, etc.) with variables in FUICommandList

### Node Behavior Type

1. FConnectionDrawingPolicy
2. FEdGraphSchemaAction

### Display Type

Inherit S type to achieve display behavior

#### SGraphNode

Node display definition

Map SNode and UNode types via UEdGraphNode :: CreateVisualWidget

#### SGraphPin

Pin display definition (the blueprint is where the parameters can be connected)

Map SPin to SNode via SGraphNode :: CreatePinWidgets

### Resource Behavior Type

#### FAssetTypeActions_Base

1. Define the categories when creating a resource GetCategories
2. Defines the operation when the resource is requested to be opened. OpenAssetEditor maps the FAssetEditorToolkit to the resource (UBP_Graph_Template) used at runtime.

#### UFactory

Factory class, editor for instantiating chart resources

## Add context menu

### Chart context menu

Overriding GetGraphContextActions in UEdGraphSchema

### Node context menu

Overriding GetContextMenuActions in UEdGraphNode

Overriding GetContextMenuActions in UEdGraphSchema to add actions to global Node or Pin

## Node Error Report

Set ErrorMsg, bHasCompilerMessage, ErrorType (EMessageSeverity :: Type) in UEdGraphNode

SGraphNode calls UpdateErrorInfo where the node needs to update error information

## Add editor panel

### FWorkflowAllowedTabSet

Collection of panels
2. Call FWorkflowAllowedTabSet :: RegisterFactory to register the definition of each panel instantiation
3. Call FWorkflowCentricApplication :: PushTabFactories (a base class of FBlueprintEditor) to register FWorkflowAllowedTabSet

### FWorkflowTabFactory

Base class of panel instantiation definition
2. Inherit and rewrite FWorkflowTabFactory :: CreateTabBody to instantiate a specific panel
3. Register the panel instantiation definition with the FWorkflowAllowedTabSet instance (FWorkflowAllowedTabSet :: RegisterFactory)

## Other tools

### FGraphEditor_ClassHelper_Template

GatherClasses collects UClass information

FGraphEditor_ClassHelper_Template (UClass * InRootClass); InRootClass in the constructor

### FGraphEditorToolkit_Template :: HandleTabManagerSpawnTabGraph

Created chart control

# Expand Blueprint Editor

## Effect

![Blueprint design chart](../../assets/custom-bp-designchart.png)

![Blueprint coding chart](../../assets/custom-bp-codingchart.png)

## Inheritance Type

### UBlueprint

Resource type of custom blueprint
2. Call FKismetEditorUtilities :: CreateBlueprint to create a blueprint resource
3. Override GetReparentingRules to define the parent classes that this blueprint type can use

### UBlueprintGeneratedClass

1. Runtime type of custom blueprint

### FApplicationMode

1. Define the mode of the App
2. Define the initial interface layout
3. ** FBlueprintEditor :: RegisterApplicationModes ** rewritten to map operations
4. Call FWorkflowCentricApplication :: PushTabFactories (a base class of FBlueprintEditor) to set FWorkflowAllowedTabSet (the definition of all panels)
5. FApplicationMode :: ToolbarExtender is the current toolbar. Add functions to the toolbar through FBlueprintEditor :: GetToolbarBuilder ()-> AddCompileToolbar (ToolbarExtender). You can also call FExtender :: AddToolBarExtension to add custom functions.

### FKismetCompilerContext

1. Blueprint compilation process definition
2. Register the compiler during module initialization, FKismetCompilerContext :: RegisterCompilerForBP
3. Rewrite FinishCompilingClass to copy charts and add binding events after blueprint compilation.
4. Override CreateClassVariablesFromBlueprint to expose variables used in designing diagrams. The advantage over FBlueprintEditorUtils :: AddMemberVariable is that variables cannot be edited in the blueprint.

## S type

### SGraphEditor

S type of chart editor

`SNew (SGraphEditor) .AdditionalCommands (Commands) .GraphToEdit (EdGraph);`

## Runtime binding events

### PropertyEditor Extension Type

1. IDetailPropertyExtensionHandler Extension of each property
2. IDetailCustomization expands the entire Detail panel

### Add binding event

1. FKismetEditorUtilities :: FindBoundEventForComponent
2. FKismetEditorUtilities :: CreateNewBoundEventForClass

### UDynamicBlueprintBinding

1. Blueprint binding event base class, subclass UComponentDelegateBinding is the object binding
2. Runtime binding events are stored in UBlueprintGeneratedClass :: DynamicBindingObjects
3. UDynamicBlueprintBinding :: BindDynamicDelegates performs runtime binding

### Custom function binding

1. Refer to FDelegateEditorBinding and FDelegateRuntimeBinding in UMG module
2. Define EditorBinding in your own blueprint class and RuntimeBinding in GeneratedClass
3. Write the binding operation at runtime by reflection
