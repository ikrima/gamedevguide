# Math Research Notes
Machine Learning Cheatsheet from [Scikit](https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html):
![](_assets/scikit-ml-cheatsheet.png)

## Geometry Processing

- [Discrete Differential Geometry Course](https://www.cs.cmu.edu/~kmcrane/Projects/DDG): An Applied Introduction
  - [Course Videos](https://www.youtube.com/playlist?list=PL9_jI1bdZmz0hIrNCMQW1YmZysAiIYSSS)
  - [Course Slides](https://brickisland.net/DDGSpring2022/category/slides/?order=asc)
  - [Course Notes](http://www.cs.cmu.edu/~kmcrane/Projects/DDG/paper.pdf)
  - [Supplemental Material](https://brickisland.net/DDGSpring2022)

### Techniques  
- [SGP 2018 Course: Conformal Geometry Processing](https://www.youtube.com/watch?v=4YHmaoQoT9s)
  - [Course Notes](https://www.cs.cmu.edu/~kmcrane/Projects/Other/OverviewConformalGeometryProcessing.pdf)
- [Heat Flow Method](http://www.cs.cmu.edu/~kmcrane/Projects/HeatMethod): Geodesic Distance
- [Vector Heat Method](http://www.cs.cmu.edu/~kmcrane/Projects/VectorHeatMethod/index.html): Parallel transport across surface
  - [Siggraph 2019 Talk](https://www.youtube.com/watch?v=MNbM78xIriM)
  - Can be used for extrapolating level set velocities
  - LogMap/Exponential map
  - Geometric Medians & Karcher/Frechet means
  - Centroidal Voronoi diagrams
  - Consistently ordered landmarks (for shape correspondence across near isometric surfaces)
- [Variational Surface Cutting](http://www.cs.cmu.edu/~kmcrane/Projects/VariationalCuts): Auto seam mesh
  - [Siggraph 2018 Talk](https://www.youtube.com/watch?v=C_qEYfguDTA)
  - [Paper](http://www.cs.cmu.edu/~kmcrane/Projects/VariationalCuts/paper.pdf)
  - [Code](https://github.com/nmwsharp/variational-surface-cutting)
- [Navigating Intrinsic Triangulations](http://www.cs.cmu.edu/~kmcrane/Projects/NavigatingIntrinsicTriangulations/index.html)
  - [Siggraph 2021 Course: Geometry Processing with Intrinsic Triangulations](https://nmwsharp.com/media/papers/int-tri-course/int_tri_course.pdf)
    - [Course Video](https://www.youtube.com/watch?v=gcRDdYrgOhg)
    - [Course Notes](https://nmwsharp.com/media/papers/int-tri-course/int_tri_course.pdf)
    - [Implementation](https://github.com/nmwsharp/intrinsic-triangulations-tutorial)
- [A Laplacian for Nonmanifold Triangle Meshes](http://www.cs.cmu.edu/~kmcrane/Projects/NonmanifoldLaplace/index.html)
  - [Presentation](https://www.youtube.com/watch?v=JY0kozIdIQo)
  - [Code](https://github.com/nmwsharp/nonmanifold-laplacian)
- Mobius Registration: Find correspondence between two meshes
- Mesh Unwrapping Techniques
  - [Boundary First Flattening](https://geometrycollective.github.io/boundary-first-flattening): minimizes conformal mapping energy but insight is that doesn't matter; where you place the cuts is more important
    - [Code](https://github.com/GeometryCollective/boundary-first-flattening)
  - Arap/Arap++: minimizes a different energy than LSCM

## Optimal Transport

Optimal Transport is a mathematical theory that studies how to transform a shape into another one while minimizing a certain cost.
- [SGP2018 Course: Computational Optimal Transport](http://school.geometryprocessing.org/summerschool-2018/index.html#course7)
  - [Presentation](https://www.youtube.com/watch?v=pKQJujt7Kbs)
- [Optimal Transport Tutorial in Graphite](https://github.com/BrunoLevy/GraphiteThree/wiki/Transport)
- [Optimal Transport for Computer Graphics and Temporal Coherence of Image Processing Algorithms Thesis](https://perso.liris.cnrs.fr/nicolas.bonneel/hdr_nbonneel_compressed.pdf)

## Dictionary Learning

- [Siggraph 2010 Course: Spectral Mesh Processing](http://alice.loria.fr/WIKI/index.php/Graphite/SpectralMeshProcessing)
  - [Course Notes](http://alice.loria.fr/publications/papers/2010/spectral_course/spectral_course.pdf)
- [Spectral Geometry Processing with Manifold Harmonics](https://hal.inria.fr/inria-00331894/document)
  - [Geogram implementation](https://github.com/BrunoLevy/geogram/wiki/ManifoldHarmonics)
- [Siggraph Asia 2011 Course: Elements of Geometry Processing](http://alice.loria.fr/WIKI/index.php/Graphite/TheElements)
- Gentle Course Slides on Laplacian:
  - [Overview](https://perso.liris.cnrs.fr/julie.digne/cours/slides-weeks7-8.pdf)
  - [Mesh Laplacian & Manifold Harmonics](https://perso.liris.cnrs.fr/julie.digne/cours/slides_lecture1.pdf)
  - [Sparse Coding & Dictionary Learning](https://perso.liris.cnrs.fr/julie.digne/cours/slides_lecture3.pdf)
  - [Dictionary Learning](https://perso.liris.cnrs.fr/julie.digne/cours/slides_lecture4.pdf)

- Dictionary Learning Using Optimal Transport
  - [Wasserstein Dictionary Learning: Optimal Transport-Based Unsupervised Nonlinear Dictionary Learning](https://arxiv.org/pdf/1708.01955.pdf)
    - [Slides](http://dlm.cosmostat.org/wp-content/uploads/2017/09/heitz.pdf)
    - Alternative approach: Wasserstein principal geodesics
  - [Fast Dictionary Learning with a Smoothed Wasserstein Loss](http://marcocuturi.net/Papers/rolet16fast.pdf)
    - [Supplemental Web Material](http://arolet.github.io/wasserstein-dictionary-learning/)
    - [Matlab Implementation](https://github.com/arolet/wasserstein-dictionary-learning) to perform Wasserstein Dictionary Learning and Non-negative Matrix Factorization
  - Convolutional Wasserstein Distances: Efficient Optimal Transportation on Geometric Domains
    - [Implementation](https://github.com/gpeyre/2015-SIGGRAPH-convolutional-ot)
    - [Presentaiton](https://www.youtube.com/watch?v=UXOFgE7LCKQ)

## Resources

### Learning Resources
- [Symposium on Geometry Processing Courses](http://school.geometryprocessing.org)
- [GeoGram Wiki](https://github.com/BrunoLevy/geogram/wiki)
- [Graphite Wiki](https://github.com/BrunoLevy/GraphiteThree/wiki)
- [Graphite Wiki](https://github.com/BrunoLevy/geogram/wiki/Publications)
- [Polygon Mesh Processing Book](http://www.pmp-book.org)

### Software
- [Geometry Central](http://geometry-central.net): c++ library for geometry processing with a focus on surface meshes
- [Geogram](https://github.com/BrunoLevy/geogram)
- [Graphite](https://github.com/BrunoLevy/GraphiteThree): an experimental 3D modeler built around geogram
  - [Graphite video](https://www.youtube.com/watch?v=X7m7iSWuVK4)
- [AliceVision](https://github.com/alicevision/AliceVision)
- [LibIGL](https://libigl.github.io): simple c++ geometry processing library
- [CGAL](https://www.cgal.org/)
- [Mean Curvature Skeleton](https://github.com/ataiya/starlab-mcfskel)
- [L1 Medial Skeleton](https://github.com/HongqiangWei/L1-Skeleton)
- [Geom Loss Library](https://www.kernel-operations.io/geomloss): geometric loss functions between sampled measures, images and volumes
  - [Code](https://github.com/jeanfeydy/geomloss)
  - [Gradient flows between sampled measures](https://www.math.ens.fr/~feydy/Teaching/DataScience/gradient_flows.html)
- [WrapX](https://www.russian3dscanner.com/wrapx-tutorials/)

### People
- [Bruno Levy](https://members.loria.fr/BLevy)
  - [Github](https://github.com/BrunoLevy)
- [Keenan Crane](https://www.cs.cmu.edu/~kmcrane)
  - [Youtube](https://www.youtube.com/user/keenancrane)
