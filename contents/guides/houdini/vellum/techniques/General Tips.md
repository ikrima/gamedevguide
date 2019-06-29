---
sortIndex: 2
---

# General

- Add remesher or triangluate into your cloth mesh
- **Edge Fracture**: to add random pattern of tears
- **Unwanted bounciness**: Reduce Max Acceleration
- **Attach To Geo**: Use Rest Length Scale to 0.1 to snap things really close to the geo
- **Compression Stiffness:** If you set Thickness to 0.001, then increase Compression Stiffness to 100,000 to accommodate and to avoid folds smoothing out
- **Constraint Iterations:** Higher resolution cloth means you need higher constraint iterations
- **Bend Plasticity:** allows cloth to update rest length on its bend constraints as it deforms. Useful for denim or heavy fabrics

# Settings

- Chiffon/Silk
  - Cloth mesh edge length: 0.01 (remesh to this)
  - Bend Stiffness: .0001
  - Thickness: 0.001
  - Rest Length: 0.94
  - Compression Stiffness: 100,000
- Denim:
  - Cloth mesh edge length: 0.01 (remesh to this)
  - Bend Stiffness: 1
  - Thickness: 0.001
  - Rest Length: 0.94
  - Compression Stiffness: 100,000
  - Bend Plasticity 
    - Low: 0.005
    - High: 100
    - Hardening: 10
- Leather
  - Cloth mesh edge length: 0.01 (remesh to this)
  - Bend Stiffness: 1
  - Thickness: 0.001
  - Rest Length: 0.94
  - Compression Stiffness: 10,000
