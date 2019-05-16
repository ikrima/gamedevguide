### **TLDR:**

gafferongames \[10:59 PM\]

Update: Don't go above 1200

1500 is \*ethernet\* MTU

IPv6 minimum MTU is 1280.

If you want to be conservative, 1200.

This lines up with most games I've worked on. They don't go above this.

\*practically\* both windows and mac set MTU 1500...

but be conservative. 1200.

noob question

\[4:45\]

if our mtu is 512 bytes (minus headers) for sending packets over the internet (edited)

\[4:48\]

and I want to send a snapshot that's 1024 bytes

\[4:48\]

I presume I have to manually break that apart and re-assemble?

\[4:48\]

and then worry about dropped packets?

###### gafferongames \[5:02 PM\]

512 is too conservative

\[5:02\]

You can send up to 1400 byte packets.

\[5:02\]

I have code for fragmentation and reassemble you can use, and an article about it.

\[5:02\]

There is easy to use example source code that comes with it. I'll upload it here for you

###### ikrima \[5:02 PM\]

Yeah, I saw that but wanted to keep it super simple

###### gafferongames \[5:02 PM\]

Oh this is the super simple version :wink:

###### ikrima \[5:02 PM\]

really? I can use 1400 over IP4?

###### gafferongames \[5:02 PM\]

yes

\[5:02\]

well, 1k

\[5:03\]

1100

###### ikrima \[5:03 PM\]

haha, remember, I only play a network guy on tv

###### gafferongames \[5:03 PM\]

but for all practical purposes these guys

\[5:03\]

these days, MTU is 1500

###### ikrima \[5:03 PM\]

nice

###### gafferongames \[5:03 PM\]

subtract headers from that... be conservative. 1400

\[5:03\]

1500 is the IPv6 minimum fragmentation

\[5:03\]

so both windows an mac have that as a limit.

###### ikrima \[5:03 PM\]

awesome

###### gafferongames \[5:03 PM\]

from memory, ps4 and other platfroms may have smaller max

\[5:03\]

eg. more like 1k, because they are more conservative, and wrap the packets on PSN with their own headers and shit.

\[5:03\]

but thats' not relevant if you have dedicated servers.

###### ikrima \[5:03 PM\]

right

###### gafferongames \[5:03 PM\]

only if p2p.

###### ikrima \[5:04 PM\]

really?

###### gafferongames \[5:04 PM\]

yep.

###### ikrima \[5:04 PM\]

i thought MTU was on recieve as well?

###### gafferongames \[5:04 PM\]

nonono

\[5:04\]

i mean...

\[5:04\]

you only need to use np signalling layer (eg. special "PS4 packets") if you are p2p

###### ikrima \[5:04 PM\]

ah

###### gafferongames \[5:04 PM\]

otherwise you just open up a udp socket and do whatever you want.

\[5:04\]

ps. I'm working on a new project

\[5:04\]

it's called "netcode.io"

\[5:05\]

I'm aiming to make a minimal networking layer that does the security/auth of yojimbo

\[5:05\]

but minus all the hardcore c++-ism

\[5:05\]

my play is to standardize it

\[5:05\]

and get it \*in browsers\*

\[5:05\]

for games like agar.io

\[5:05\]

I think it can be really big. It's a replacement for WebRTC

###### ikrima \[5:05 PM\]

nice, i saw the thread on twitter/ the channel

###### gafferongames \[5:05 PM\]

with just the cool connect token stuff yojimbo does

\[5:05\]

but stripped out so it's pure C

\[5:05\]

and highly portable to other languages

\[5:05\]

it sends 1400 byte packets :slightly_smiling_face:

\[5:06\]

so there is your answer :wink:

###### ikrima \[5:06 PM\]

so, i feel like i'm missing something here

###### gafferongames \[5:06 PM\]

(it will not do MTU, MTU would need to be done on top of it...)

###### ikrima \[5:06 PM\]

b/c this networking protocol i'm landing on seems dead simple

###### gafferongames \[5:06 PM\]

you are probably missing something

###### ikrima \[5:06 PM\]

and now I'm like ok, why is everyone not doing this

\[5:06\]

if I can send 1k every frame, I can snapshot the entire gamestate

###### gafferongames \[5:06 PM\]

sure

###### ikrima \[5:07 PM\]

and send up to 1/3 of a second back of frame data

\[5:07\]

and really not care about floating point determinism

\[5:07\]

b/c I can send quantized quaternions & position

###### gafferongames \[5:07 PM\]

I don't really understand what you mean by this:

\[5:07\]

"and send up to 1/3 of a second back of frame data"

###### ikrima \[5:07 PM\]

....

###### gafferongames \[5:07 PM\]

do you mean, combat packet loss with redundancy?

###### ikrima \[5:07 PM\]

and then profit

\[5:07\]

ah, sorry, i mean game frame data

\[5:07\]

like 10 frames of game state at 30 fps

###### gafferongames \[5:08 PM\]

what you are missing

\[5:08\]

is that most connections can't reliably receive much more than 256kbit/sec

\[5:08\]

and maybe 512kbit/sec at most.

\[5:08\]

because it's not just you on that line.

###### ikrima \[5:08 PM\]

wait wtf

###### gafferongames \[5:08 PM\]

also, if you are hosting dedicated servers

\[5:08\]

you are forgetting that you pay for bandwidth in and out of data center.

###### ikrima \[5:09 PM\]

right, cost definitely

###### gafferongames \[5:09 PM\]

this is what you are missing.

\[5:09\]

secondly, you haven't addressed how latency hiding will be implemented.

###### ikrima \[5:09 PM\]

but people can't recieve more than 256k still???

###### gafferongames \[5:09 PM\]

and security concerns.

\[5:09\]

yes, i'll give you some ballparks...

\[5:09\]

titanfall 2 worked very hard to send 256kbit/sec or less.

\[5:09\]

in fact in common case I send just 100kbit/sec.

\[5:09\]

this is large snapshots, but those snapshots are at 20HZ

\[5:09\]

titanfall 1 was less optimized.

###### ikrima \[5:09 PM\]

god dammit

###### gafferongames \[5:09 PM\]

it sent up to 256kbit/sec and sometimes spiked to 512

\[5:10\]

i optimized all this, and its send rate was 10HZ

\[5:10\]

this is the work that I did at titanfall that took me 2 years

\[5:10\]

that's all i did for 2 years.

\[5:10\]

more recent games, large ones...

\[5:10\]

i think has started pushing the boundary at 512kbit

\[5:10\]

like battlefront 4

\[5:10\]

i would not go above that, or a sizable % will have a bad experience.

\[5:10\]

as a rule, don't ever take more than 50% of available bandwidth.

\[5:10\]

and since peoples till have 1mbit...

\[5:10\]

ideally, don't take more than 25% :slightly_smiling_face:

###### ikrima \[5:11 PM\]

gotcha

###### gafferongames \[5:11 PM\]

you need SAFETY

\[5:11\]

less bandwidth you use, more likely packets will be delivered timely.

\[5:11\]

timely is what you want.

\[5:11\]

not throughput.

\[5:11\]

ps. titanfall 2 plays a lot better than tf1 for this reason, and with 20HZ send rate.

\[5:11\]

so this is why netowrking is hard.

\[5:11\]

bandwidth is still limited.

\[5:11\]

latency still exists.

\[5:11\]

security still a problem.

\[5:11\]

give it 2 years, i think games will start sending 1mbit down.

\[5:12\]

ps. its even more dire for upload bandwidth

###### ikrima \[5:12 PM\]

right

###### gafferongames \[5:12 PM\]

would not go over 64kbit for that.

\[5:12\]

128 at most.

###### ikrima \[5:12 PM\]

so if i do 1k/s at 30hz

###### gafferongames \[5:12 PM\]

yeahh... do the math

\[5:12\]

also

###### ikrima \[5:12 PM\]

that's still under 256kbits

###### gafferongames \[5:12 PM\]

consider packet headers are there

###### ikrima \[5:12 PM\]

but now I have to force everything else in there

###### gafferongames \[5:12 PM\]

so 32 byte \* 30 HZ

\[5:12\]

conservative.

\[5:12\]

higher for ipv6.

\[5:13\]

hey, i got god of war ascension under 64kbit/sec common case, made it play better. :slightly_smiling_face:

\[5:13\]

at 60HZ packet send rate.

\[5:13\]

those packets were tiny. nothing.

\[5:13\]

these days, you guys have it easy :wink:

###### ikrima \[5:13 PM\]

haha

###### gafferongames \[5:13 PM\]

ps. the trick for reducing bandwidth is delta compression

\[5:14\]

I can teach you that when I get back into LA

\[5:14\]

give me half a day on a whiteboar with you, i can show you exactly how its done

###### ikrima \[5:14 PM\]

Yeah, I saw the delta encoder stuff; looks very interesting and good for V2

\[5:14\]

:P

###### gafferongames \[5:14 PM\]

bottom line: snapshot stuff @ 30HZ

\[5:14\]

don't worry about size.

\[5:14\]

MTU split those guys as per-my article

\[5:14\]

delta encode later.

yup

\[5:14\]

ok, great

\[5:14\]

this really helps wrangle the floating point determinism with GGPO

###### gafferongames \[5:15 PM\]

well, you don't need determinism

\[5:15\]

if you are sending the whole state.

###### ikrima \[5:15 PM\]

exactly

###### gafferongames \[5:15 PM\]

ps. you are just reinventing fps network model here

\[5:15\]

except you are doing it, valve/quake style with snapshots

###### ikrima \[5:15 PM\]

yup

###### gafferongames \[5:15 PM\]

instead of the unreal way, where they don't delta encode, and they send partial world updates per-packet

###### ikrima \[5:16 PM\]

which GGPO is pretty much a derivative of

###### gafferongames \[5:16 PM\]

mmmm kindof.

###### ikrima \[5:16 PM\]

except with some interesting insights for how it applies to fighting games

###### gafferongames \[5:16 PM\]

there is definitely similarities in the rollback for GGPO and the fps rewind and replay.

\[5:16\]

but everything else is different.

###### ikrima \[5:16 PM\]

oh, must be missing something then

###### gafferongames \[5:16 PM\]

probably.

###### ikrima \[5:16 PM\]

I thought that was the key quake model. I haven't gone back over that in a while

###### gafferongames \[5:16 PM\]

nope.

\[5:17\]

GGPO rollback is a different style to fps.

\[5:17\]

same concept...

###### ikrima \[5:17 PM\]

but the key for me for GGPO was rewind+replay+snapshot

###### gafferongames \[5:17 PM\]

different implementation, since no state ever sent.

\[5:17\]

no.

\[5:17\]

GGPO doesn't ever send snapshots.

\[5:17\]

that's where you are confusing it.

###### ikrima \[5:17 PM\]

except GGPO uses floating point determinism to imply state snapshots

###### gafferongames \[5:17 PM\]

GGPO = perfect determinism, no snapshots.

###### ikrima \[5:17 PM\]

b/c it sends controller snapshot state

###### gafferongames \[5:17 PM\]

kindof.

\[5:17\]

remember when I told you about two sims?

\[5:17\]

GGPO copies world state, (fork)

\[5:17\]

and sims that with local inputs up to present time

\[5:18\]

throws it away next time inputs come in from server,

\[5:18\]

forks again, resims to present time with local inputs.

\[5:18\]

FPS games don't do the forking step.

\[5:18\]

you have to fork with GGPO because you have no concept of state coming from server.

\[5:18\]

all you have is inputs coming from server, so otherwise you can't "snap back" to the old server state.

\[5:18\]

it's a subtle point, but the two are very different in implentation.

\[5:19\]

for example, FPS games don't have a concept of, OK now take the whole game state and copy it from A-&gt;B, now similate copy B forward.

###### ikrima \[5:19 PM\]

right right, the prediction correction is different

###### gafferongames \[5:19 PM\]

it's a crazy per-object thing, since only the client controlled objects are rolled back and resimulated.

\[5:19\]

same concept, different impl.

###### ikrima \[5:19 PM\]

right

###### gafferongames \[5:19 PM\]

fps is, rollback local client controlled objects \*only\*

\[5:19\]

rest of world is in past

###### ikrima \[5:19 PM\]

for ggpo, we fork and blit the gamestate into backupbuffers

\[5:19\]

ah

###### gafferongames \[5:19 PM\]

ggpo is roll back whole world...

\[5:20\]

to a saved definitive state, representing most recent inputs from server.

\[5:20\]

predict that ahad with local inputs.

###### ikrima \[5:20 PM\]

right right, forgot about that with the FPS model

###### gafferongames \[5:20 PM\]

throw that away

\[5:20\]

resimulated next input comes in from server.

\[5:20\]

rinse repeat.

\[5:20\]

OK i think you have it.

###### ikrima \[5:20 PM\]

and for us, we're basically snapshotting the entire world over the network

###### gafferongames \[5:20 PM\]

yes.

###### ikrima \[5:20 PM\]

b/c we can

###### gafferongames \[5:20 PM\]

and this is excatly what FPS games do

\[5:20\]

as well...

\[5:20\]

the good ones.

\[5:20\]

(not unreal)

###### ikrima \[5:20 PM\]

haha

###### gafferongames \[5:21 PM\]

unreal is dumb. they think, sending partial state update is important

\[5:21\]

so subset of world only per-packet.

\[5:21\]

much smarter to include all world state in packet for all objects.

\[5:21\]

simpler.

###### ikrima \[5:21 PM\]

yeah it's horrible

###### gafferongames \[5:21 PM\]

unreal is utter garbage networking

\[5:21\]

i've told sweeney this himself but he doesn't understand.

\[5:21\]

thinks its not possible to do any other way. he's wrong.

\[5:21\]

the secret sauce is the delta compression

\[5:21\]

that's where unreal breaks down, and quake/unreal wins.

\[5:22\]

also, extrapolation bad

\[5:22\]

interpolation good.

###### ikrima \[5:22 PM\]

right

###### gafferongames \[5:22 PM\]

unreal extrapolates remote view of objects

\[5:22\]

cod/titanfall interpolates.

\[5:22\]

consider, you probably need to, because packets don't arrive nicely spaced out

\[5:22\]

buffer packets on client for 50-100ms before displaying.

\[5:22\]

just be aware of this. you may not be right now.

###### ikrima \[5:22 PM\]

?

###### gafferongames \[5:22 PM\]

this is another gotcha.

\[5:23\]

well, if i sent a packet 30HZ

\[5:23\]

do you think it is received 30HZ on the other side?

\[5:23\]

of course not.

###### ikrima \[5:23 PM\]

i thought GGPO extrapolated

###### gafferongames \[5:23 PM\]

1-2-0-1-1-2-0

\[5:23\]

GGPO is different.

###### ikrima \[5:23 PM\]

that was the whole insight

###### gafferongames \[5:23 PM\]

i'm talking FPS now.

###### ikrima \[5:23 PM\]

oh right

###### gafferongames \[5:23 PM\]

forget GGPO it's not for you.

###### ikrima \[5:23 PM\]

yeah, but for us we won't need to

###### gafferongames \[5:23 PM\]

it's a dead end.

###### ikrima \[5:23 PM\]

lol wut

\[5:24\]

That's the whole scheme I was describing?

###### gafferongames \[5:24 PM\]

nonon :wink:

\[5:24\]

GGPO is deterministic lockstep

###### ikrima \[5:24 PM\]

GGPO except sending whole world snapshots

###### gafferongames \[5:24 PM\]

you are not deterministic lockstep

\[5:24\]

you are not GGPo

\[5:24\]

you don't have the same characteristics.

###### ikrima \[5:24 PM\]

ok, GGPO prime then

###### gafferongames \[5:24 PM\]

what you are describing to me is more like fps network model.

\[5:24\]

here is the key benefit of GGPO

\[5:24\]

because it never sends state

\[5:25\]

it can be made secure even on PC sku, p2p with no server.

\[5:25\]

problem of it: low palyer counts, lag switches really effective.

\[5:25\]

what you are describing doesn't have these characteristic.

\[5:25\]

you send state, so no longer secure p2p.

\[5:25\]

you don't wait for inputs, so no longer lag switch problematic.

###### ikrima \[5:25 PM\]

oh, i was planning on waiting for inputs

###### gafferongames \[5:25 PM\]

oh. but why?

\[5:26\]

you don't need them :slightly_smiling_face:

\[5:26\]

you are sending state

\[5:26\]

ok so your main choice now is...

\[5:26\]

do you buffer and interpolate between snapshots, adding latency.

\[5:26\]

or do you snap state hard, and extrapolate with last input.

###### ikrima \[5:26 PM\]

snap hard with extrapolate last input

###### gafferongames \[5:26 PM\]

either way, you are going to need some buffering, because packets don't come in every frame

\[5:26\]

so you'll miss inputs that way.

\[5:26\]

inputs are at 90HZ

###### ikrima \[5:27 PM\]

we process input only at 30hz

###### gafferongames \[5:27 PM\]

(unless your game sims at 30 and renders 90HZ)

###### ikrima \[5:27 PM\]

sim at 30, render at 30, 60, 90, or 120

###### gafferongames \[5:27 PM\]

ok good. then you'll miss inputs on packet loss unless you send them redundant.

\[5:27\]

you'll need at least, a few frames of buffer safety for inputs, otherwise you'll miss

###### ikrima \[5:27 PM\]

gotcha

###### gafferongames \[5:27 PM\]

but yeah, if you block hard on inputs, you'll have GGPO like characteristics.

\[5:28\]

but without any security if p2p.

###### ikrima \[5:28 PM\]

dedis for that

###### gafferongames \[5:28 PM\]

ok, so now you are client side predicting.

###### ikrima \[5:28 PM\]

:money_with_wings::money_with_wings::money_with_wings::money_with_wings:

\[5:28\]

right

###### gafferongames \[5:28 PM\]

you better not be cpu bound.

\[5:28\]

because you will roll back whole world

###### ikrima \[5:28 PM\]

that's my only worry

\[5:28\]

which we're generally not b/c of VR

###### gafferongames \[5:28 PM\]

not just the local player, is that your plan?

###### ikrima \[5:28 PM\]

right

\[5:28\]

the whole world

###### gafferongames \[5:29 PM\]

ok give it a go

\[5:29\]

but consider this...

\[5:29\]

what the client sees

\[5:29\]

is a ghost

\[5:29\]

with dedis.

\[5:29\]

and with GGPO

\[5:29\]

so some input delay will be required, otherwise you'll get too much rubberbanding and rollback

###### ikrima \[5:29 PM\]

right

###### gafferongames \[5:29 PM\]

just like SF

\[5:29\]

sounds reasonable.

\[5:29\]

give it a go.

###### ikrima \[5:30 PM\]

sweet

###### gafferongames \[5:30 PM\]

my prediction: as player counts increase, you'll be waiting for most recent input for players more often

\[5:30\]

also, you are delayed as per-most lagged player

###### ikrima \[5:30 PM\]

right

###### gafferongames \[5:30 PM\]

so it does inherit the bad aspects of GGPO

###### ikrima \[5:30 PM\]

which i really hate

###### gafferongames \[5:30 PM\]

and potentially, the low player count restriction

###### ikrima \[5:30 PM\]

but it's a compromise i have to make

###### gafferongames \[5:30 PM\]

yes.

###### ikrima \[5:30 PM\]

and then player counts are just going to be 2

###### gafferongames \[5:30 PM\]

fallback: try this, if you don't like it

###### ikrima \[5:30 PM\]

well 3 if you count server

###### gafferongames \[5:30 PM\]

go fps model. with some input delay

\[5:31\]

rollback only the local player, but hold rest of the world some amount of time in the past

\[5:31\]

and show a kill replay that resolves how/why you died, from POV of attacker.

\[5:31\]

this is how COD does it.

###### ikrima \[5:31 PM\]

interesting

###### gafferongames \[5:31 PM\]

that's just fps network model, rebranded for your concept.

\[5:31\]

in this model, you wouldn't wait for inputs.

\[5:31\]

so could scale to higher player counts.

###### ikrima \[5:31 PM\]

but i can't imagine melee not sucking

###### gafferongames \[5:31 PM\]

but you'd have more delay viewing other player actions.

\[5:32\]

agreed, but it is what it is.

\[5:32\]

no need to tilt at windmills.

###### ikrima \[5:32 PM\]

heh, right

\[5:32\]

I'll attempt the GGPO-esque scheme

###### gafferongames \[5:32 PM\]

sure sounds good. give it a go.

\[5:32\]

you'll learn something, at minimum.

###### ikrima \[5:32 PM\]

if that starts sucking, i'll add massive knockback to each attack and go with FPS

###### gafferongames \[5:32 PM\]

yeah

###### ikrima \[5:32 PM\]

so that you can't melee combo easily

###### gafferongames \[5:32 PM\]

fps will only start to break down with parry/block/chains

\[5:32\]

its the combos that will break down.

\[5:33\]

you'll notice all fps melee is basically, melee = you dead.

\[5:33\]

this is why.

###### ikrima \[5:33 PM\]

right

###### gafferongames \[5:33 PM\]

of course, nobody would ever add input delay to fps to combat the rollback

\[5:33\]

so you have that up your sleeve.

\[5:33\]

ps. input delay must be on both movement and attacking, ... all actions.

###### ikrima \[5:33 PM\]

yeah definitely

###### gafferongames \[5:34 PM\]

and you should definitely consider,

\[5:34\]

limiting speed.

###### ikrima \[5:34 PM\]

our game is definitely slow

###### gafferongames \[5:34 PM\]

consider, in typical round trip, how far can player move?

\[5:34\]

this is why fps breaks down... fast movement

###### ikrima \[5:34 PM\]

on purpose

###### gafferongames \[5:34 PM\]

melee attack a fast moving guy...

###### ikrima \[5:34 PM\]

every attack has 100 ms windup

###### gafferongames \[5:34 PM\]

= no way is your attack hitting.

\[5:34\]

well, input delay doesn't mean windup

\[5:34\]

it means, actual delay on inputs.

\[5:34\]

before your sim sees them.

###### ikrima \[5:34 PM\]

no i know

\[5:34\]

but the windup reduces speed

###### gafferongames \[5:34 PM\]

but windup = good.

###### ikrima \[5:34 PM\]

and how fast you can move

###### gafferongames \[5:35 PM\]

anything that commits somebody on an attack = good.

\[5:35\]

ok. you have this in hand. go for it.

###### ikrima \[5:35 PM\]

awesome; thanks for this

###### gafferongames \[5:35 PM\]

:thumbsup:

\[5:35\]

no worries mate

###### ikrima \[5:35 PM\]

I now only feel slightly insane for attempting (edited)

###### gafferongames \[5:35 PM\]

nah you're doing the right approach

\[5:35\]

have a plan, have a backup.

\[5:35\]

i'm still worried about your dedi cost.

\[5:35\]

ps. the stuff i'm doing for netcode.io will help you run dedis.

\[5:35\]

securely.

###### ikrima \[5:35 PM\]

excellent

\[5:35\]

so am I

###### gafferongames \[5:36 PM\]

and it is policy free, so can be grabbed and integrated easily.

###### ikrima \[5:36 PM\]

but, it's only a problem if we have large player counts. THen we can throw engineering talent at the issue

###### gafferongames \[5:36 PM\]

sure.

\[5:36\]

ok have to run. you got this. go get em

###### ikrima \[5:36 PM\]

:+1:

###### gafferongames \[10:59 PM\]

Update: Don't go above 1200

\[10:59\]

1500 is \*ethernet\* MTU

\[10:59\]

IPv6 minimum MTU is 1280.

\[10:59\]

If you want to be conservative, 1200.

\[11:00\]

This lines up with most games I've worked on. They don't go above this.

\[11:00\]

\*practically\* both windows and mac set MTU 1500...

\[11:00\]

but be conservative. 1200.
