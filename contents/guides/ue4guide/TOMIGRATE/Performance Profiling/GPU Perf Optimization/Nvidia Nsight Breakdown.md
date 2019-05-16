Nvidia Nsight Breakdown

Monday, June 19, 2017

4:22 PM

 

gr\_\_busy\_pct signal on the graph. High percentage =&gt; GPU bound

 

<img src="process_markdown/assets/media/image1.png" alt="Machine generated alternative text: &quot;Speed of Light&quot; Metrics SOL - &quot;Speed of Light&quot; - peak throughput of a given piece of hardware max instructions per cycle, max bytes per cycle, etc. SOL% = achieved throughput, as % of the peak; &quot;how close are you to perfection?&quot; Unit SOL% takes the max across sub-unit SOL%s. SM, partition, sub-partition, ALU Example: the SM SOL% is the max of Instruction Issue utilization ALU utilization Shared memory utilization Texture/L1 utilization Image of Maxwell SM sub-partition from NVIDIA GeForce GTX 750 Ti Whitepaper 4 nVIDIA " style="width:7.78125in;height:4.54167in" />

 

<img src="process_markdown/assets/media/image2.png" alt="Machine generated alternative text: TECHNOLO SM Compute Metrics Tex Shared utilization Device System utilization utilization Instruction Issue-Efficiency Instruction Pipeline Statistics Stall Reasons Cache Hit/ Miss Utilization Efficiency Cache Hit/Miss Utilization Utilization by Op Type Utilization by Client nVIDIA. " style="width:7.13542in;height:4.63542in" />

 

<img src="process_markdown/assets/media/image3.png" alt="Machine generated alternative text: Graphics Metrics Vertex Shader (Vertex Fetch) Front End (decoder) CPU Hull Shader Tess Domain Shader SM (unified shaders) Geom Shader XFB System Tex Device Raster Pixel Shader CROP ZROP Image " style="width:7.08333in;height:4.0625in" />

Range Profiler

-   **Finding most expensive drawcall:** Capture frame and click action details in range info section. Sort table by draw call times

-   **Optimize range of draw calls:** Pipeline section in Range details shows virtual GPU pipeline. Red bars indicate unused GPU units

-   **Draw calls common state:** Range profiler's grouping capability to make new ranges based on common state

 

 

 

<table><thead><tr class="header"><th>IA Bottleneck &amp; SOL</th><th>IA is the unit that handles vertex attribute assembly</th></tr></thead><tbody><tr class="odd"><td>FB Bottleneck &amp; SOL</td><td>The FB or frame buffer unit handles all requests for reading memory that missed any possible L1/L2 caches.</td></tr></tbody></table>

 

 

 

<table><thead><tr class="header"><th>Primitive Setup Bottleneck &amp; SOL</th><th>Primitive setup happens right before rasterization and handles jobs like edge equation calculations</th></tr></thead><tbody><tr class="odd"><td>Rasterization Bottleneck &amp; SOL</td><td>Rasterization is when the primitives are split up into individual fragments to be shaded.</td></tr><tr class="even"><td>ROP Bottleneck &amp; SOL</td><td>ROP is the blending unit and handles both color blending and Z/stencil buffer handling.</td></tr><tr class="odd"><td>SHD Bottleneck &amp; SOL</td><td>SHD (or SM) is the unified shader unit and handles processing of all shader types on various inputs.</td></tr><tr class="even"><td>Stream Out Bottleneck &amp; SOL</td><td>Stream out is the unit responsible for optionally writing data output from the geometry shader to memory</td></tr><tr class="odd"><td>Tessellator SOL</td><td>Tessellator is the unit between the hull and domain shaders. This SOL does not include the shader.</td></tr><tr class="even"><td>TEX Bottleneck &amp; SOL</td><td>The TEX unit is responsible for reading samples from the L2 and frame buffer and calculating the texel value based on the current filtering mode.</td></tr><tr class="odd"><td>ZCull Bottleneck &amp; SOL</td><td>ZCull happens before the fragment shader is run and is able to discard fragments because they won’t pass the z-test.</td></tr></tbody></table>
