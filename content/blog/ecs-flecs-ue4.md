---
title: 'Bringing ECS to UE4: Thoughts on flecs'
date: '2021-01-14'
parents: ['blog']
root: '/blog'
---

# Bringing ECS to UE4: My experience with flecs

Over the last couple of years, I've been using [flecs](https://github.com/SanderMertens/flecs) to bring ECS to UE4.

## TLDR on why flecs sparks joy

- *It Just Works™*
- Well designed minimalist API => easy to integrate + easy to extend
- C99 so easy to integrate with UE4's complex build system
- Amazing community + active development => fast turnaround


## It Just Works

- Initially using it for ECS for gameplay to simplify netcode
  - [Overwatch GDC talk](https://www.youtube.com/watch?v=W3aieHjyNvw) flipped my opinion of ECS a couple years back
  - rolled my own "quick & dirty" but quickly became a support issue/time sink
- Since I'm slowly transitioning into *GrumpyOldProgrammer™* stage that complains about how broken everything is, I was reluctant to use a 3rd party lib
  - Don't want to subsume tech debt of the lib
  - Always thinking about the "debugging release stopping bug at 4 am, hours before go-live" scenario. Horrible position to be in but order of magnitude worse when it's in some third party lib
- Pleasantly surprised at flecs on this ie code quality,robustness and ofc, perf

## Minimal api/C99

- imho, sign of a well designed lib is linear cost of using lib features vs. api cost. Most of time it's either
  - logarithmic: super complicated to do basic things but once you summit the cliff, complexity plateus
  - exponential: super easy to get going but a cliff once you start wanting to do meaningful stuff
- I've found flecs to be pretty close to linear
  - Turn off all the things!: Usually I start with a lib and try to use the minimal feature set to satisfy why I wanted the lib in the first place. Was pleasantly surprised with flecs that it was relatively easy to do this. I didn't have to pay the (dev) cost of figuring out any of it's feature set to get some simple systems running
  - The other green flag was how easy it was to default to "manual" mode for most things e.g. manual timestep, manual staging, manual triggering of systems.
    - Very important when integrating with very complicated codebases with lots of legacy code like UE4 like dealing with UE4's UObjects
    - Seems obvious but subtle to get right while balancing api complexity & being bug free bc complexity grows combinatorially with every new flag/option.
  - Over time, started to incorporate more and more features, often replacing simpler ones I'd already sketched out
- Minimal API => easy to integrate
  - UE4's very complicated and often times forced to wrestle with how to get UE4 "out of the way"
  - Other libs I perused where either of suspect code quality or relied on too much C++ bullshittery.
  - Even with solid lib, am very cautious with complex "*mandatory batteries included*" libs after years of being burned by UE4 integration gremlins. For ex, here's some OTOH things I ask
    - How will I get it to deal with UObjects/AActors/UComponents and all their wonderful peculuraties wrt allocation, ticking, execution
    - How will I deal with integrating it with Slate for editor UI?
    - Will it play nicely with UE4's builtin dev/debug utilities like perf counters, etc?
    - Will it play well with other plugins that extend those things (ex VTune or custom memory trackers)?
    - Will it compile? 🤣 Playing nicely with UHT/UBT is non-trivial.
    - How likely will it play nicely with future UE4 engine updates?
    - If I run into a weird nightmare edgecase, most likely imposed by UE4, how easy will I be able to contort the library to workaround it? Can't count number of times I ran into a problem that could be fixed with a couple line change in UE4 but at a deep base layer and then forced into a herculean effort to get a tp lib working
  - For those with a physics bg, another complexity piece is that programming is "hamiltonian, not euclidian". You have to consider the whole path, not just the distance from where you started and where you wanted to end up. Ex: [Entt](https://github.com/skypjack/entt) is pretty solid but was immediately no-go given it's liberal use of C++ ~~bullshittery~~ advanced features 😜
    - I remember one of the VS2019 updates fixed a compiler bug that was crashing a plugin while introducing a new one that broke the latest UE4 version that an artist needed bc of some new feature. That is programmer hell 🤦‍♀️
    - Even though, I've replicated a lot of Entt's feature sets over time, sometimes even braving C++ bullshit (inevitably always ending in regret and questioning one's life choices), I wouldn't want to be forced into paying an upfront cost to all that complexity. Especially because at the start, I don't know what features I'll end up needing or not

## Community

- Libraries are much more than the code; they're more akin to micro-platforms/ecosystems. More active =>
  - more likely other people have run into bug, question, workaround
  - faster turnaround for bug fixes/workarounds

Flecs has been *stellar* on this front. Also, the discord is full of great people. Since I'm turning into a *GrumpyOldDev™*, I usually try to avoid online communities but that discord is refreshing in that it's full of decent people who also know what they're talking about + know what they don't and humble enough to admit.

I doubt flecs will escape Eternal September forever but right now it's pretty great


## Conclusion

For me personally, flecs is in a small handful of libs that *SparkJoy™* like imgui or sokol.

This is getting long so I'll save it for another post on how I've (ab)used flecs:
- Ability system
- Network debugger
- Deterministic GGPO netcode
- abusing it to hack in language features like open polymorphic types or expression algebras
