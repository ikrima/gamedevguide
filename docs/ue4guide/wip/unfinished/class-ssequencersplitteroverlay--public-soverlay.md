---
sidebar: ue4guide
---
class SSequencerSplitterOverlay : public SOverlay

{

public:

​ typedef SSplitter::FArguments FArguments;

void Construct( const FArguments& InArgs )

{

SetVisibility(EVisibility::SelfHitTestInvisible);

Splitter = SNew(SSplitter) = InArgs;
