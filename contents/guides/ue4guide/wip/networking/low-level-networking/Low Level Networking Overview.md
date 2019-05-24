---
sortIndex: 1
---

[UE4 Networking](https://www.slideshare.net/JoeGraf1/ue4-networking)

[![](http://img.slideshare.net/vi/ue4-networking/0.jpg)](https://www.slideshare.net/JoeGraf1/ue4-networking)

![Rich web content titled: UE4 Networking](file:///C:/Users/KITELI~1/AppData/Local/Temp/msohtmlclip1/02/clip_image001.png)



Actor Relevancy: Trade CPU for network bandwidth

Reliable function replication:

- Function is guaranteed to be called

- Resent when an error is present

- Delayed when bandwidth is saturated



Unreliable function replication:

- Gets skipped if bandwidth is saturated

- Does not re-attempt if error occurs



UNetDriver: contains list of connections to Tick

- Server: N connections

- Client: 1 connection


- UNetConnection: Contains list of channels to replicate

  - UChannel: Logical construct to route data to proper object

    - Accessed by ChannelID, some have predefined ChannelIDs

    - UControlChannel: For handshake exchange/non-gameplay/processing object loading requests

    - UVoiceChannel: For Voice

    - UActorChannel: For replicating actors.

      - Each replicated actor has a channel

      - Actors replicated by dynamically assigned channel ID

