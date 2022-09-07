# Cliff Notes

Condensed cheat sheet/mnemonics of stuff I forget

## Differential Geometry

- **Inner Product**: Angle
- **Norm**:          Length
- **Metric**:        Distance
- **Measure**:       Size
- **$L_{p}$ norm**:  Max() component
- **$L_{0}$ norm**:  Counting norm
- **Gradient**:      derivative
- **Jacobian**:      how a differential patch area is skewed under a (linear only?) transformation
- **Divergence**:    sink vs source aka volume density of outward flux
- **Laplacian**:     average of neighborhood
- **Manifold**:      fancy name of a curved space
  - **Reimannian manifold**: manifold with geodesic metric (Reimannian metric)
- **Group**:         closed under multiplication, commutative, identity function, inverse
  - **Lie Group**:   curved space with a group structure i.e. a group that is a manifold where multiplication is smooth/infinitely differentiable
  - **Lie Algebra**: tangent space of Lie group
  - **Tangent        space**: linear approximation of a curved space
  - **Non-abelian    group**: non-commutative group i.e. $a*b \neq b*a$ (e.g. SO(3) rotation group)
  - **Dual number**: convenient for computation of Lie algebra
- **Banach Space** (*norm+completeness*) ⊇ **Hilbert Space** (*inner-product norm*) ⊇ **Sobolev Space** (*"nice" derivatives up to order S*)
- **Functionals**: functions that take functions as inputs (derivative/integral operators)
- **Laplacian**: Avg of neighbors at a point - point value
  - Maximal smoothness/mean curvature is zero
  - *Poisson equation*: $\Delta u$ = 0
    - Think of boundary condition being a wire and a soap film covering the wire
    - That's a $\Delta u(x,y) = 0$
  - Another interpretation is equilibrium state. Think of temperature
  - Another interpretation is that there are no bumps or local minimas in that surface
  
## Spectral Theory

### Legendre polynomial

The nth Legendre polynomial, $\boldsymbol{L}_{n}$, is orthogonal to every polynomial with degrees less than n i.e.

- $\boldsymbol{L}_{n} \perp \boldsymbol{P}_{i}, \ \forall i\in [0..n-1]$
- ex: $\boldsymbol{L}_{n} \perp x^{3}$

$\boldsymbol{L}_{n}$ has n real roots and they are all $\in [-1,1]$

Harmonic functions => $\Delta u(x) = 0$

Homogenous function => $f : \mathbb{R}^{n} \rightarrow \mathbb{R}^{n}, \ f(\lambda \mathbf{v})=\lambda^{k} f(\mathbf{v})$ where $k,\lambda \in \mathbb{R}$

General form of Newton's divided-difference polynomial interpolation:

$$
\begin{aligned} f_{n}(x)=& f\left(x_{0}\right)+\left(x-x_{0}\right) f\left[x_{1}, x_{0}\right]+\left(x-x_{0}\right)\left(x-x_{1}\right) f\left[x_{2}, x_{1}, x_{0}\right] \\ &+\cdots+\left(x-x_{0}\right)\left(x-x_{1}\right) \cdots\left(x-x_{n-1}\right) f\left[x_{n}, x_{n-1}, \ldots, x_{0}\right] \end{aligned}
$$

![](_assets/newton-interp-visualization.png)

Lagrange interpolating polynomial scheme is just a reformulation of Newton scheme that avoids computation of divided differences

$$
f_{n}(x)=\sum_{i=0}^{n} L_{i}(x) f\left(x_{i}\right)\newline
L_{i}(x)=\prod_{j=0 \atop j \neq i}^{n} \frac{x-x_{j}}{x_{i}-x_{j}}
$$

### Gaussian quadrature

- allows for accurately approximating functions where $f(x) \in P_{2n-1}$ with only n coefficients

### Approximation Schemes

- **Regression Schemes:** (Linear or nonlinear)
  - Curves do not necessarily go through sample points so error at said points might be large
  - Round-off error becomes pronounced for higher order versions and ill-conditioned matrices are a problem
  - Orthogonal polynomials do not necessarily suffer from this
- **Interpolation Schemes:** (splines, lagrangian/newtonian, etc)
  - Curves must go through sample points so error at said points is small
  - Not ill conditioned

#### Thin plate splines

- construction is based on choosing a function that minimizes an integral that represents the bending energy of a surface
- the idea of thin-plate splines is to choose a function f(x) that exactly interpolates the datapoints (xi,yi), say,yi=f(xi), and that minimizes the bending energy
  $E[f]=\int_{\mathbf{R}^{n}}\left|D^{2} f\right|^{2} d X$
- Can also choose function that doesn't exactly interpolate all control points by using smoothing parameter for regularization
  $E[f]=\sum_{i=1}^{m}\left|f\left(\mathbf{x}_{i}\right)-y_{i}\right|^{2}+\lambda \int_{\mathbb{R}^{n}}\left|D^{2} f\right|^{2} d X$

#### Spherical Basis Splines

- Gross reduction summary: b-splines with slerp instead of lerp between control points

#### RBF

- [Integration By RBF Over The Sphere](https://www.math.unipd.it/~marcov/pdf/AMR05_17.pdf)
- [RBF for Scientific computing](https://math.boisestate.edu/~wright/montestigliano/RBFsForScientificComputingPartOne.pdf)
- [Interpolation and Best Approximation for Spherical Radial Basis Function Networks](https://www.hindawi.com/journals/aaa/2013/206265)
- Spherical Radial Basis Functions, Theory and Applications (Springer Briefs in Mathematics)
- [Transport schemes on a sphere using radial basis functions](https://www.math.utah.edu/~wright/misc/msFinal_Grady.pdf)
- [On choosing a radial basis function and a shape parameter when solving a convective PDE on a sphere](https://amath.colorado.edu/faculty/fornberg/Docs/Fornberg_Piret_2.pdf)
- [A Fast Algorithm For Spherical Basis approximation](https://www.math.uni-luebeck.de/mitarbeiter/prestin/ps/sharma.pdf)

#### Spherical Splines

- [Spline Representations of Functions on a Sphere for Geopotential Modeling](https://kb.osu.edu/bitstream/handle/1811/78653/1/SES_GeodeticScience_Report_475.pdf)
- [Fitting scattered data on sphere-like surfaces using spherical splines](https://math.vanderbilt.edu/schumake/ans4.pdf)
- [Bernstein-Bézier polynomials on spheres and sphere-like surfaces](https://math.vanderbilt.edu/neamtum/papers/ans2.pdf)
- [Survey on Spherical Spline Approximation](https://pdfs.semanticscholar.org/63eb/efb9cbdc248371e2fe4f09fa7e70b89c5008.pdf)
- scattered data fitting on the sphere: scattered data fitting on the sphere
