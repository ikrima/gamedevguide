---
sortIndex: 5
---
```cpp
**FStatsUtils::DebugPrint(FStatMessage const& Item)**

**Compute Stat Scope Cycle duration**

**static FStatMessage ComputeCall(FStatMessage const& ScopeStart, FStatMessage const& ScopeEnd)**

{

checkStats(ScopeStart.NameAndInfo.GetField<EStatOperation>() == EStatOperation::CycleScopeStart);

checkStats(ScopeEnd.NameAndInfo.GetField<EStatOperation>() == EStatOperation::CycleScopeEnd);

FStatMessage Result(ScopeStart);

Result.NameAndInfo.SetField&lt;EStatOperation>(EStatOperation::Set);

Result.NameAndInfo.SetFlag(EStatMetaFlags::IsPackedCCAndDuration, true);

checkStats(ScopeEnd.NameAndInfo.GetFlag(EStatMetaFlags::IsCycle));

// cycles can wrap and are actually uint32's so we do something special here

int64 Delta = int32(uint32(ScopeEnd.GetValue_int64()) - uint32(ScopeStart.GetValue_int64()));

checkStats(Delta >= 0);

Result.GetValue_int64() = ToPackedCallCountDuration(1, uint32(Delta));

return Result;

}
```

### Examples of parsing stats:
```cpp
**FStatsThreadState::GetRawStackStats(int64 TargetFrame, FRawStatStackNode& Root, TArray<FStatMessage>* OutNonStackStats)**

**FRawProfilerSession::ProcessStatPacketArray**( const FStatPacketArray& StatPacketArray, FProfilerFrame& out_ProfilerFrame, int32 FrameIndex )

**static void DumpCPU(int64 Frame)**

{

 FStatsThreadState& Stats = FStatsThreadState::GetLocalState();

 int64 Latest = Stats.GetLatestValidFrame();

 check(Latest > 0);

 DumpCPUSummary(Stats, Latest);

 Stats.NewFrameDelegate.Remove(DumpCPUDelegateHandle);

 StatsMasterEnableSubtract();

}
```

