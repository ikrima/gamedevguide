UE does support optional network encryption now (as of 4.18), but unfortunately we don't have much documentation on how to use it yet. There's some info on it in this thread: <https://udn.unrealengine.com/questions/382538/udp-encryption-on-xbox-one.html>

Basically, you need to:

1.  Configure the EncryptionComponent of the PacketHandler system to be the AESHandlerComponent.

2.  Add an "?EncryptionToken=" option to the URL clients use to connect to the game server.

3.  Override ReceivedNetworkEncryptionToken and ReceivedNetworkEncryptionAck in a UGameInstance subclass.

4.  Once this negotiation completes, all future traffic will be encrypted.

The token that's passed as the URL option should not be the actual encryption key, since this string will not be encrypted. What you can do is use the token to look up the actual key, possibly from your own web service, and use this key in the parameters to the delegates for ReceivedNetworkEncryptionToken and ReceivedNetworkEncryptionAck.

_From &lt;<https://udn.unrealengine.com/questions/443027/visibility-of-the-data-during-multiplayer-networki.html>&gt;_
