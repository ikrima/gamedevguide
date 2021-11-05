# Dops

- Simulation runs in 2 passes
- The First Pass creates all the data needed for the simulation
- The Second Pass passes the data to the DOP parser which then has the various solvers perform the simulation
- The two passes are run for each time step
  - The First Pass always starts at the node where the display flag is active
  - It then goes up each node and determines all the dependencies between different object and solvers
  - It then goes back down the network and fills in all the data for the simulation
- The Details View will show a snapshot of the AutoDOPNetwork just prior to the simulation being run for the specific time step


## Volume Dynamics

- Source attributes like density, color, temp using points. (Lagrangian approach vs eularian)
- Pyrosource node imports that to create a volume
- Attribute Noise to add noise
- Volume rasterize to rasterize the points into volume
- DOP network to simulate
- DOP IO node to import the dop fields and visualize

![](../assets/pyro_nodes.svg)


## Nodes

- Volume Visualize
- Volume Trails: For visualizing streamers
