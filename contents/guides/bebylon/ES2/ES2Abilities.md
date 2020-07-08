<!-- markdownlint-disable -->


==============================================================================================================
# Javalin Blink

Old Code Flow:
- CompositeEntryCode
  - Apply Ego cost
  - If Move causes flight, setmovement mode//gravityscale/stopmovement immediatly
  - InitSeqForLegendAttack()
    - attkSeqPlayer->Reinitialize()
    - attkSeqPlayer->PlayFromStart()
  - CosNotifyAttackStarted
- CompositeTick
  - Store Buffered Input Move based on UBBLegendManager::Util_CompareAttackInputPrecedence
- CompositeExit
  - DoAttackPrepTearDown
    - Reset Hbox
    - Reset movement mode
    - Stop attack sequence
- SubNodes
  - Starting
    - Tick
      - Is Still Charging?
      - lmg.DoAttackTick
        - ProcessMovementDuringAttack(PID, relAttkSFN, InCombatPhase, MovementTS, InCombatMove, MoveFData);
        - UtilInt_ResetToIdleHBoxCfg
    - VTick
      - *UpdateLegendAttackSeq() - Noop but was suppposed t o move the sequence playhead
    - Transition
      - isStillCharging -> Charging
      - _               -> Active
      -

- SmashButton => Activate Ability
- Ability Sequence: Javalin Blink::Startup
  - Task: Branch_InputStillDown::Charging
    - Branch:
- Ability Sequence: Javalin Blink::Active
  - Task: Activate Collider
  - Task: Grant/Remove/Block Tags
    - ?Block Movement
    - ?Block Jumping
  - Task: Branch_OnInput
    - Branch: Play 2ndCombo_BlinkOut
  - Task:


# Control Logic
- On Hit
  - How to cancel existing ability?


==============================================================================================================

==============================================================================================================
# Grab

- Activate Grab Ability on Input
  - Grab Ability
    - ColliderUpdatePosition
      - Curve Asset
    - ColliderSweepTask
      - Condition:
        - And:
          - any(Owner.Colliders| HasOverlapEvent)
          - any(Owner.Colliders| OverlapTarget.Has(ItemComp))
      - True:
        - Break OnCollider.GrabEvent
          - Mark ItemEquipCmd
            - Grant Item Ability
            - OnCueEventNotify
            - Set collision
      - False: noop

- Bomb Ability
  - Override Primary   Input Action Slot
  - Override Secondary Input Action Slot
  - On Primary Action
    - TryActivate: Bomb Throw Ability
      - Can Execute
        - True:
          - Check Use Count
        - False:
          - Trigger UI?
      - a

#-------------------------------------------------------------------------------------------------------------#
- Bomb Ability Ambient
  - Bomb timer/lifetime going
  - On Lifetime expired:
    - Cancel Equip

==============================================================================================================