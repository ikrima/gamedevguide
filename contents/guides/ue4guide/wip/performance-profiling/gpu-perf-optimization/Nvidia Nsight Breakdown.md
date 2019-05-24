---
sortIndex: 2
---

gr\_\_busy_pct signal on the graph. High percentage => GPU bound

![](...\..\..\..\assets\nvidia_breakdown_speedoflight.png)

![](...\..\..\..\assets\nvidia_breakdown_computemetrics.png)

![](...\..\..\..\assets\nvidia_breakdown_graphicsmetrics.png)



Range Profiler

- **Finding most expensive drawcall:** Capture frame and click action details in range info section. Sort table by draw call times

- **Optimize range of draw calls:** Pipeline section in Range details shows virtual GPU pipeline. Red bars indicate unused GPU units

- **Draw calls common state:** Range profiler's grouping capability to make new ranges based on common state

| IA Bottleneck & SOL     | IA is the unit that handles vertex attribute assembly        |
| ----------------------- | ------------------------------------------------------------ |
| **FB Bottleneck & SOL** | **The FB or frame buffer unit handles all requests for reading memory that missed any possible L1/L2 caches.** |



| Primitive Setup Bottleneck & SOL   | Primitive setup happens right before rasterization and handles jobs like edge equation calculations |
| ---------------------------------- | ------------------------------------------------------------ |
| **Rasterization Bottleneck & SOL** | **Rasterization is when the primitives are split up into individual fragments to be shaded.** |
| **ROP Bottleneck & SOL**           | **ROP is the blending unit and handles both color blending and Z/stencil buffer handling.** |
| **SHD Bottleneck & SOL**           | **SHD (or SM) is the unified shader unit and handles processing of all shader types on various inputs.** |
| **Stream Out Bottleneck & SOL**    | **Stream out is the unit responsible for optionally writing data output from the geometry shader to memory** |
| **Tessellator SOL**                | **Tessellator is the unit between the hull and domain shaders. This SOL does not include the shader.** |
| **TEX Bottleneck & SOL**           | **The TEX unit is responsible for reading samples from the L2 and frame buffer and calculating the texel value based on the current filtering mode.**** |
| **ZCull Bottleneck & SOL**         | **ZCull happens before the fragment shader is run and is able to discard fragments because they won’t pass the z-test.** |

