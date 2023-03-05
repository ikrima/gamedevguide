# OpenCL

## Tips

- Pyro & Grains can make use of OpenCL
- OpenCL fallsback to CPU OpenCL when GPU runs out of memory
- Do LookDev with OpenCL bc solvers are slightly different than CPU ones
- Flip doesn't utilize OpenCL as much
- Grains - Increase number of iterations to 200 as a starter
- Pyro - have to be careful with sourcing as that triggers GPU-CPU xfers which might dwarf benefits of OpenCL

## Minimize GPU-CPU transfers

- Make sure to turn off DOP Caching in the dopnet node bc caching copies all the fields every frame
- Only import minimal fields (eg density) to SOPs so you only have one field

## Gas Upres

- Does not have built-in OpenCL toggle
- Dive into the node network and toggle Use OpenCL for all the advection nodes
- Dissipate doesn't have a built-in OpenCL node so use $HPSITE/ocl/sim/dissipate_upres.cl
