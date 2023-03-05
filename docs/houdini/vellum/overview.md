# Vellum Overview

- Position Based Dynamics solver
- 3 Nodes: Vellum Constraint + Solver + PostProcess
- Different built-in constraints: length, distance, volume preserve, cloth (stretch, twist, length)
- Can combine different constraints for different effects
  - Softbody: Cloth + Struts
  - Balloon: Cloth + Pressure

## Nodes

- Vellum Weld Points: Stitches vertices together and allows you to specify tensile stress
- Vellum PostProcess: Allows to blur the sim, detangle, remesh, etc
- Vellum Cloth:
