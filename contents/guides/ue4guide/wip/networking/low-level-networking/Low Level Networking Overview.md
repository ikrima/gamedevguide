[UE4 Networking]

![Rich web content titled: UE4 Networking](file:///C:/Users/KITELI~1/AppData/Local/Temp/msohtmlclip1/02/clip_image001.png)

<img src="process_markdown/assets/media/image1.png" alt="Rich web content titled: UE4 Networking" style="width:4.42708in;height:3.69792in" />

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

* UNetConnection: Contains list of channels to replicate

  - UChannel: Logical construct to route data to proper object

    - Accessed by ChannelID, some have predefined ChannelIDs

    - UControlChannel: For handshake exchange/non-gameplay/processing object loading requests

    - UVoiceChannel: For Voice

    - UActorChannel: For replicating actors.

      - Each replicated actor has a channel

      - Actors replicated by dynamically assigned channel ID

[ue4 networking]: http://www.slideshare.net/JoeGraf1/ue4-networking
