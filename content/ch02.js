/* Chapter 2 — Linear Algebra */
(function () {
  MML.chapters.push({
    id: 'ch2', num: 2, icon: '🧱',
    title: 'Linear Algebra',
    tagline: 'Vectors, matrices, and the spaces they live in — the grammar in which every ML model is written.',
    why: String.raw`Every dataset is a matrix and every neural network layer is a matrix product, so fluency here pays off on literally every page of ML. This chapter builds the objects (\(\mathbb{R}^n\), matrices), the operations (products, elimination), and the deep ideas (span, independence, basis, rank, linear maps, change of basis). The crown jewel is a duality: <b>a matrix is not a table of numbers — it is a function</b>, and all of ML is choosing, composing, and inverting these functions.`,
    goals: [
      String.raw`Solve linear systems by Gaussian elimination, mechanically and without errors.`,
      String.raw`Master the vocabulary: span, linear independence, basis, dimension, rank.`,
      String.raw`See matrices as linear maps, and compute image and kernel.`,
      String.raw`Change coordinates between bases — the mathematics behind "representations" and "embeddings".`
    ],
    widget: 'eigen',
    concepts: [
      {
        id: 'c1',
        title: 'Vectors and matrices: the cast of characters',
        intuition: String.raw`A <b>vector</b> is a list of numbers with two superpowers: you can add two of them, and you can scale one. Geometrically, an \(n\)-vector is an arrow from the origin to a point in \(n\)-dimensional space — \(\mathbb{R}^2\) is a sheet of paper, \(\mathbb{R}^3\) is your room, and \(\mathbb{R}^{4096}\) is the space an LLM thinks in. A <b>matrix</b> is a rectangular grid of numbers; think of it three ways, all useful: (1) a table (data), (2) a stack of row vectors or column vectors, (3) a machine that eats a vector and outputs another vector.`, 
        math: [
          { h: 'Vectors in ℝⁿ', t: String.raw`$$\boldsymbol{x} = \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix} \in \mathbb{R}^n, \qquad \boldsymbol{x} + \boldsymbol{y} = \begin{pmatrix} x_1 + y_1 \\ \vdots \\ x_n + y_n \end{pmatrix}, \qquad \lambda \boldsymbol{x} = \begin{pmatrix} \lambda x_1 \\ \vdots \\ \lambda x_n \end{pmatrix}$$ By convention in this course vectors are <b>column</b> vectors; \(\boldsymbol{x}^\top\) is the row version.` },
          { h: 'Matrices and their products', t: String.raw`$$\boldsymbol{A} \in \mathbb{R}^{m \times n}, \quad (\boldsymbol{A}\boldsymbol{B})_{ij} = \sum_{k} A_{ik}B_{kj}, \quad \boldsymbol{A}(\boldsymbol{B}\boldsymbol{C}) = (\boldsymbol{A}\boldsymbol{B})\boldsymbol{C} \;\text{(associative)}, \quad \boldsymbol{A}\boldsymbol{B} \ne \boldsymbol{B}\boldsymbol{A} \;\text{in general}$$ Key identity used everywhere: $$(\boldsymbol{A}\boldsymbol{B})^\top = \boldsymbol{B}^\top\boldsymbol{A}^\top \qquad \text{("the scarf rule": reverse the order, flip each)}$$` },
          { h: 'Special matrices', t: String.raw`Identity \(\boldsymbol{I}_n\): \(\boldsymbol{I}\boldsymbol{x} = \boldsymbol{x}\). Diagonal \(\operatorname{diag}(\lambda_1,\dots,\lambda_n)\): scales each coordinate. Symmetric: \(\boldsymbol{A}^\top = \boldsymbol{A}\) — these will turn out to be the "nice" matrices (Ch 4). Inverse: \(\boldsymbol{A}\boldsymbol{A}^{-1} = \boldsymbol{I}\), exists only for square, full-rank \(\boldsymbol{A}\).` }
        ],
        ml: String.raw`An embedding of a word, an image patch, or a user is a vector in some \(\mathbb{R}^d\) — the "hidden dimension". A batch of embeddings is a matrix. Every linear layer is \(\boldsymbol{W}\boldsymbol{x} + \boldsymbol{b}\); every attention head is built from such products. Even the loss of a linear model can be written in pure matrix form: \(\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2\), which you will minimize in Ch 9.`,
        byhand: {
          problem: String.raw`Let \(\boldsymbol{A} = \begin{pmatrix} 1 & 2 \\ 3 & 4\end{pmatrix}\), \(\boldsymbol{B} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\), \(\boldsymbol{x} = (1, -1)^\top\). Compute \(\boldsymbol{A}\boldsymbol{x}\), \(\boldsymbol{B}\boldsymbol{x}\), \(\boldsymbol{A}\boldsymbol{B}\), and \((\boldsymbol{A}\boldsymbol{B})^\top\) two ways: directly, and via the scarf rule.`,
          steps: [
            { t: 'Matrix–vector products', d: String.raw`$$\boldsymbol{A}\boldsymbol{x} = \begin{pmatrix} 1\cdot 1 + 2 \cdot (-1) \\ 3 \cdot 1 + 4 \cdot (-1)\end{pmatrix} = \begin{pmatrix} -1 \\ -1 \end{pmatrix}, \qquad \boldsymbol{B}\boldsymbol{x} = \begin{pmatrix} 0 \cdot 1 + 1 \cdot(-1) \\ 1 \cdot 1 + 0 \cdot (-1) \end{pmatrix} = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$$ Notice \(\boldsymbol{B}\) is a <b>swap</b> machine: it swapped the two coordinates of \(\boldsymbol{x}\).` },
            { t: 'Matrix–matrix product', d: String.raw`$$\boldsymbol{A}\boldsymbol{B} = \begin{pmatrix} 1\cdot 0 + 2 \cdot 1 & 1 \cdot 1 + 2 \cdot 0 \\ 3 \cdot 0 + 4 \cdot 1 & 3 \cdot 1 + 4 \cdot 0 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix}$$ Interpretation: \((\boldsymbol{A}\boldsymbol{B})\boldsymbol{x} = \boldsymbol{A}(\boldsymbol{B}\boldsymbol{x})\) — first swap the coordinates, then apply \(\boldsymbol{A}\).` },
            { t: 'Transpose directly', d: String.raw`$$\boldsymbol{A}\boldsymbol{B} = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix} \;\Rightarrow\; (\boldsymbol{A}\boldsymbol{B})^\top = \begin{pmatrix} 2 & 4 \\ 1 & 3 \end{pmatrix}$$` },
            { t: 'Transpose via the scarf rule', d: String.raw`$$\boldsymbol{B}^\top\boldsymbol{A}^\top = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix} = \begin{pmatrix} 2 & 4 \\ 1 & 3 \end{pmatrix} \;\checkmark$$ Same result — this identity is the workhorse of matrix calculus in Chapter 5.` }
          ],
          answer: String.raw`\(\boldsymbol{A}\boldsymbol{x} = (-1,-1)^\top\), \(\boldsymbol{B}\boldsymbol{x} = (-1,1)^\top\), \(\boldsymbol{A}\boldsymbol{B} = \begin{pmatrix} 2 & 1 \\ 4 & 3\end{pmatrix}\), \((\boldsymbol{A}\boldsymbol{B})^\top = \boldsymbol{B}^\top \boldsymbol{A}^\top = \begin{pmatrix} 2 & 4 \\ 1 & 3\end{pmatrix}\).`
        }
      },
      {
        id: 'c2',
        title: 'Gaussian elimination: the master solver',
        subtitle: 'systematic solving of linear systems',
        intuition: String.raw`Solving a linear system is the algebraic version of a "where do these constraints intersect?" puzzle. Gaussian elimination is the algorithm your inner mathematician already knows from middle school — <b>add/subtract multiples of one equation from another until the system becomes trivially solvable</b> — but done in a disciplined, bookkeeping-friendly order. It is the workhorse behind every "solve \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}\)" in this course, including the normal equations of linear regression.`,
        math: [
          { h: 'The problem', t: String.raw`$$\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}, \qquad \boldsymbol{A} \in \mathbb{R}^{n\times n}, \quad \boldsymbol{b}, \boldsymbol{x} \in \mathbb{R}^n$$ Elementary row operations (any of these preserves the solution set): ① swap two rows ② multiply a row by \(\lambda \ne 0\) ③ add a multiple of one row to another.` },
          { h: 'The algorithm', t: String.raw`Augment \([\boldsymbol{A} \mid \boldsymbol{b}]\). Sweep left to right over pivot columns; below each pivot, eliminate entries by \(R_j \leftarrow R_j - \frac{a_{j,\text{pivot}}}{a_{\text{pivot},\text{pivot}}} R_{\text{pivot}}\). The result is a triangular system; solve it <b>bottom-up</b> by back-substitution. If you reach a row \(0 = 1\): no solution; a free variable appears: infinitely many solutions.` },
          { h: 'Row-echelon form and rank', t: String.raw`The number of <b>nonzero rows</b> after elimination is the <b>rank</b> \(\operatorname{rk}(\boldsymbol{A})\) — it does not depend on which route you took. The system is solvable iff \(\operatorname{rk}([\boldsymbol{A}|\boldsymbol{b}]) = \operatorname{rk}(\boldsymbol{A})\); the solution is unique iff additionally \(\operatorname{rk}(\boldsymbol{A}) = n\).` }
        ],
        ml: String.raw`Least-squares regression reduces to the <b>normal equations</b> \((\boldsymbol{X}^\top \boldsymbol{X})\boldsymbol{\theta} = \boldsymbol{X}^\top\boldsymbol{y}\) — a linear system you solve with exactly this machinery (Chapter 9). Gaussian elimination also explains <em>when</em> a system has no unique answer: duplicated or redundant features make \(\boldsymbol{X}^\top\boldsymbol{X}\) rank-deficient, which is the collinearity problem statisticians warn about. (In practice, numerically robust solvers use LU/QR decompositions — Chapter 4 — but the conceptual content is elimination.)`,
        byhand: {
          problem: String.raw`Fit a quadratic \(p(t) = x + yt + zt^2\) through the three points \((1, 6), (2, 12), (3, 20)\). This gives the system: $$\begin{aligned} x + y + z &= 6 \\ x + 2y + 4z &= 12 \\ x + 3y + 9z &= 20 \end{aligned}$$ Solve by Gaussian elimination.`,
          steps: [
            { t: 'Augment and eliminate x from rows 2, 3', d: String.raw`$$\left(\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 1 & 2 & 4 & 12 \\ 1 & 3 & 9 & 20 \end{array}\right) \xrightarrow[R_3 - R_1]{R_2 - R_1} \left(\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & 1 & 3 & 6 \\ 0 & 2 & 8 & 14 \end{array}\right)$$` },
            { t: 'Eliminate y from row 3', d: String.raw`$$\xrightarrow{\,R_3 - 2R_2\,} \left(\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & 1 & 3 & 6 \\ 0 & 0 & 2 & 2 \end{array}\right)$$ Upper-triangular: three pivots, so the solution exists and is unique (rank 3).` },
            { t: 'Back-substitute: z', d: String.raw`Row 3: \(2z = 2 \Rightarrow z = 1\).` },
            { t: 'Back-substitute: y, then x', d: String.raw`Row 2: \(y + 3z = 6 \Rightarrow y = 6 - 3 = 3\). Row 1: \(x + y + z = 6 \Rightarrow x = 6 - 3 - 1 = 2\).` },
            { t: 'Verify against all three data points', d: String.raw`\(p(t) = 2 + 3t + t^2\): \(p(1) = 6\) ✓, \(p(2) = 2 + 6 + 4 = 12\) ✓, \(p(3) = 2 + 9 + 9 = 20\) ✓. The quadratic interpolates all three points exactly.` }
          ],
          answer: String.raw`\(x = 2,\; y = 3,\; z = 1\), i.e. \(p(t) = 2 + 3t + t^2\). (You have just solved a regression problem exactly — interpolation is least squares with zero error.)`
        }
      },
      {
        id: 'c3',
        title: 'Vector spaces: span, independence, basis, rank',
        subtitle: 'the geometry of "how big is your information"',
        intuition: String.raw`Take a few vectors and ask: what is the set of <b>everything reachable</b> by scaling and adding them? That set is the <b>span</b> — usually a line, a plane, or all of space. If one of your vectors is already reachable from the others (say \((2,4)\) is just \(2\times(1,2)\)), it adds <b>nothing new</b>: the set is <b>linearly dependent</b>. A <b>basis</b> is a minimal toolkit: vectors that are independent (nothing redundant) and whose span is everything (nothing missing). <b>Rank</b> is the size of that toolkit — the true number of independent directions in your data. Rank is the precise answer to "how much information is really in this table?"`,
        math: [
          { h: 'Definitions', t: String.raw`<b>Linear combination:</b> \(\sum_i \lambda_i \boldsymbol{b}_i\). <b>Span:</b> \(\operatorname{span}[\boldsymbol{b}_1, \dots, \boldsymbol{b}_k] = \{\sum_i \lambda_i \boldsymbol{b}_i : \lambda_i \in \mathbb{R}\}\). <b>Independence:</b> \(\sum_i \lambda_i \boldsymbol{b}_i = \boldsymbol{0} \Rightarrow\) all \(\lambda_i = 0\) (no vector is a combination of the others). <b>Basis:</b> independent + spanning. <b>Dimension:</b> number of basis vectors (same for every basis!).` },
          { h: 'Rank', t: String.raw`$$\operatorname{rk}(\boldsymbol{A}) = \#\text{pivots after elimination} = \#\text{independent columns} = \#\text{independent rows}$$ Always \(\operatorname{rk}(\boldsymbol{A}) \le \min(m, n)\). Full rank = the matrix wastes no dimension.` },
          { h: 'How to test independence', t: String.raw`Put the vectors as <b>columns</b> of a matrix and eliminate. A zero row (non-pivot column) ⟺ dependence. Equivalently: \(\det \boldsymbol{A} \ne 0\) for a square matrix ⟺ columns independent ⟺ invertible ⟺ full rank. All four say the same thing.` }
        ],
        ml: String.raw`High-dimensional data is usually <b>not</b> full rank: 1000 gene measurements might have effective rank 20. That redundancy is both a problem (unstable regression — Ch 9) and an opportunity (compression — PCA, Ch 10, keeps only the top directions). Rank also governs neural networks: the "effective rank" of a layer's weight matrix is a live research topic in understanding generalization.`,
        byhand: {
          problem: String.raw`Determine the rank of $$\boldsymbol{A} = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 1 \end{pmatrix}$$ and find a basis of the column space.`,
          steps: [
            { t: 'Eliminate below the first pivot', d: String.raw`$$\xrightarrow[R_3 - R_1]{R_2 - 2R_1} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -1 & -2 \end{pmatrix}$$ Row 2 became zero — column 2 is \(\tfrac{1}{2}\)× nothing new: \((2,4,2) = 2(1,2,1)\).` },
            { t: 'Swap to expose pivots and finish', d: String.raw`Swap \(R_2 \leftrightarrow R_3\), then \(R_3 - (-1)R_2 \cdot\): actually with pivot \(-1\) in row 2, eliminate row 3's \(-1\): $$\begin{pmatrix} 1 & 2 & 3 \\ 0 & -1 & -2 \\ 0 & 0 & 0 \end{pmatrix}$$ Two pivots ⟹ \(\operatorname{rk}(\boldsymbol{A}) = 2\).` },
            { t: 'Name the basis', d: String.raw`The pivot columns of the <b>original</b> matrix are a basis of the column space: \(\{(1,2,1)^\top, (3,6,1)^\top\}\) (columns 1 and 3). Everything else is reachable from them — e.g. column 2 \(= 2 \times\) column 1.` },
            { t: 'Sanity check via the third row', d: String.raw`Row 3 \((1,1,1)\) is not a multiple of row 1 or row 2, and rows 1,2 are proportional — so row rank is also 2 ✓ (row rank always equals column rank).` }
          ],
          answer: String.raw`\(\operatorname{rk}(\boldsymbol{A}) = 2\); column space basis \(\{(1,2,1)^\top, (3,6,1)^\top\}\); one dependency: \(\text{col}_2 = 2\cdot\text{col}_1\).`
        }
      },
      {
        id: 'c4',
        title: 'Linear maps: a matrix is a function',
        subtitle: 'image, kernel, rank–nullity',
        intuition: String.raw`The perspective shift that unlocks everything: a matrix \(\boldsymbol{A} \in \mathbb{R}^{m\times n}\) is a <b>function</b> \(f: \mathbb{R}^n \to \mathbb{R}^m\), \(f(\boldsymbol{x}) = \boldsymbol{A}\boldsymbol{x}\). "Linear" means it respects the vector operations: \(f(\boldsymbol{x} + \boldsymbol{y}) = f(\boldsymbol{x}) + f(\boldsymbol{y})\) and \(f(\lambda\boldsymbol{x}) = \lambda f(\boldsymbol{x})\) — it maps parallelograms to parallelograms, grids to grids, the origin to the origin. Two subspaces describe any such map completely: the <b>image</b> (everything it can reach: "what comes out") and the <b>kernel</b> (everything it flattens to zero: "what gets lost").`,
        math: [
          { h: 'Image and kernel', t: String.raw`$$\operatorname{Im}(\boldsymbol{A}) = \{\boldsymbol{A}\boldsymbol{x} : \boldsymbol{x} \in \mathbb{R}^n\} \subseteq \mathbb{R}^m \qquad \ker(\boldsymbol{A}) = \{\boldsymbol{x} : \boldsymbol{A}\boldsymbol{x} = \boldsymbol{0}\} \subseteq \mathbb{R}^n$$ \(\operatorname{Im}\) is the column space; \(\ker\) is the set of solutions of \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{0}\) (a subspace!).` },
          { h: 'Rank–nullity theorem', t: String.raw`$$\dim\operatorname{Im}(\boldsymbol{A}) + \dim\ker(\boldsymbol{A}) = \operatorname{rk}(\boldsymbol{A}) + \operatorname{null}(\boldsymbol{A}) = n$$ Information conservation: every input dimension either shows up in the output (rank) or is destroyed (nullity). Nothing else can happen.` },
          { h: 'Injective ⟺ trivial kernel', t: String.raw`\(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{A}\boldsymbol{z} \iff \boldsymbol{A}(\boldsymbol{x}-\boldsymbol{z}) = \boldsymbol{0}\): two inputs collide iff their difference is in the kernel. So the map is 1-to-1 <b>exactly when</b> \(\ker = \{\boldsymbol{0}\}\). Square + trivial kernel ⟺ invertible.` }
        ],
        ml: String.raw`Every layer of a neural network is a linear map (plus a shift and a squashing nonlinearity). "Information flows through the network" literally means passing through compositions of these maps; "bottleneck layers" deliberately shrink the image (compression), while redundant weights create a nontrivial kernel (wasted parameters). In autoencoders, the encoder \(\boldsymbol{E}\) compresses and decoder \(\boldsymbol{D}\) reconstructs; the composition \(\boldsymbol{D}\boldsymbol{E}\) approximates the identity on the data manifold — a purely linear-algebraic aspiration.`,
        byhand: {
          problem: String.raw`For $$\boldsymbol{A} = \begin{pmatrix} 1 & 2 \\ 2 & 4 \\ 3 & 6 \end{pmatrix} \in \mathbb{R}^{3\times 2}$$ find \(\operatorname{Im}(\boldsymbol{A})\), \(\ker(\boldsymbol{A})\), and check rank–nullity. Is \(\boldsymbol{A}\) injective?`,
          steps: [
            { t: 'Image = span of the columns', d: String.raw`Columns: \((1,2,3)^\top\) and \((2,4,6)^\top = 2(1,2,3)^\top\). So \(\operatorname{Im}(\boldsymbol{A}) = \operatorname{span}\{(1,2,3)^\top\}\) — a <b>line</b> in \(\mathbb{R}^3\). The map squashes the plane \(\mathbb{R}^2\) onto that line.` },
            { t: 'Kernel: solve Ax = 0', d: String.raw`$$x_1 + 2x_2 = 0 \;\Rightarrow\; x_1 = -2x_2 \;\Rightarrow\; \ker(\boldsymbol{A}) = \operatorname{span}\{(-2, 1)^\top\}$$ Every vector on the line through \((-2,1)\) is invisible to \(\boldsymbol{A}\). Check: \(\boldsymbol{A}(-2,1)^\top = (-2+2, -4+4, -6+6)^\top = \boldsymbol{0}\) ✓.` },
            { t: 'Rank–nullity check', d: String.raw`\(\operatorname{rk} = 1\), nullity \(= 1\), \(1 + 1 = 2 = n\) ✓. The 2 input dimensions: one survives (rank), one is destroyed (nullity).` },
            { t: 'Injective?', d: String.raw`No — the kernel is nontrivial, so \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{A}\boldsymbol{z}\) for \(\boldsymbol{x} \ne \boldsymbol{z}\) differing by a kernel vector. Two different inputs produce the same output: information is genuinely lost.` }
          ],
          answer: String.raw`\(\operatorname{Im}(\boldsymbol{A}) = \operatorname{span}\{(1,2,3)^\top\}\), \(\ker(\boldsymbol{A}) = \operatorname{span}\{(-2,1)^\top\}\), rank–nullity: \(1 + 1 = 2\) ✓, not injective.`
        }
      },
      {
        id: 'c5',
        title: 'Change of basis: same vector, different coordinates',
        subtitle: 'representations are not unique',
        intuition: String.raw`A vector is a geometric arrow; its <b>coordinates</b> depend on which "measuring sticks" (basis) you hold up. \((3,1)\) in the standard grid is the same arrow as \((2,-1)\) if you measure along the tilted sticks \((1,1)\) and \((-1,1)\). <b>Nothing about the arrow changed — only the description.</b> This is the mathematical heart of "representation learning": choosing smarter coordinates in which the problem becomes easy (principal axes in PCA, latent codes in VAEs, Fourier/attention bases). Changing basis does not change the underlying reality; it changes what you see.`,
        math: [
          { h: 'Coordinates in a basis', t: String.raw`Given basis \(\boldsymbol{B} = (\boldsymbol{b}_1, \dots, \boldsymbol{b}_n)\) (columns), every vector has unique coordinates: $$\boldsymbol{x} = \sum_i \psi_i \boldsymbol{b}_i \quad\Longleftrightarrow\quad \boldsymbol{x} = \boldsymbol{B}\,\boldsymbol{\psi}, \qquad \boldsymbol{\psi} = \boldsymbol{B}^{-1}\boldsymbol{x}$$ \(\boldsymbol{\psi}\) are the coordinates of the <em>same</em> arrow in the \(B\)-world.` },
          { h: 'Change-of-basis for matrices', t: String.raw`If \(\tilde{\boldsymbol{A}}\) is the map in basis \(\boldsymbol{B}\) and \(\boldsymbol{A}\) in the standard basis: $$\tilde{\boldsymbol{A}} = \boldsymbol{B}^{-1}\boldsymbol{A}\,\boldsymbol{B}$$ (go back to standard, apply \(\boldsymbol{A}\), return to \(B\)). Matrices related this way are <b>similar</b> — they are the <em>same</em> map wearing different coordinates. Similar matrices share trace, determinant, and eigenvalues: those are intrinsic properties of the map, not the coordinates.` }
        ],
        ml: String.raw`"Embeddings" and "latent spaces" are choices of basis in which data becomes simple. PCA (Ch 10) rotates to the eigenbasis of the covariance where coordinates are uncorrelated — decorrelation is a change of basis. Diagonalization in Ch 4 \((\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1})\) is a change of basis that makes a linear map look like simple axis-scaling. Kernel methods (Ch 12) can be read as choosing a (possibly infinite-dimensional) basis where data becomes linearly separable.`,
        byhand: {
          problem: String.raw`The arrow \(\boldsymbol{x} = (3, 1)^\top\) (standard coordinates). New basis: \(\boldsymbol{b}_1 = (1,1)^\top\), \(\boldsymbol{b}_2 = (-1,1)^\top\). Find the coordinates \(\boldsymbol{\psi}\) of \(\boldsymbol{x}\) in this basis, and verify by reconstructing.`,
          steps: [
            { t: 'Set up the basis matrix and its inverse', d: String.raw`$$\boldsymbol{B} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}, \qquad \det \boldsymbol{B} = 1 \cdot 1 - (-1) \cdot 1 = 2, \qquad \boldsymbol{B}^{-1} = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix}$$` },
            { t: 'Solve Bψ = x (i.e. ψ = B⁻¹x)', d: String.raw`Equivalently solve \(x = \psi_1 \boldsymbol{b}_1 + \psi_2 \boldsymbol{b}_2\) componentwise: $$3 = \psi_1 - \psi_2, \qquad 1 = \psi_1 + \psi_2$$ Adding: \(2\psi_1 = 4 \Rightarrow \psi_1 = 2\); then \(\psi_2 = 1 - 2 = -1\).` },
            { t: 'Verify by reconstruction', d: String.raw`$$2\begin{pmatrix}1\\1\end{pmatrix} + (-1)\begin{pmatrix}-1\\1\end{pmatrix} = \begin{pmatrix}2+1\\2-1\end{pmatrix} = \begin{pmatrix}3\\1\end{pmatrix} \;\checkmark$$` },
            { t: 'Read the geometric meaning', d: String.raw`\(\boldsymbol{x}\) is "2 steps along \((1,1)\) and 1 step backwards along \((-1,1)\)". In a <b>rotated</b> basis, coordinates are (essentially) dot products with the sticks — the link to Chapter 3's inner products.` }
          ],
          answer: String.raw`\(\boldsymbol{\psi} = (2, -1)^\top\): same arrow, new coordinates. Formula: \(\boldsymbol{\psi} = \boldsymbol{B}^{-1}\boldsymbol{x}\).`
        }
      },
      {
        id: 'c6',
        title: 'Affine spaces: lines and hyperplanes that miss the origin',
        subtitle: 'the bias term, done properly',
        intuition: String.raw`Pure linear maps always nail the origin to the origin. But a decision boundary in the plane does not have to pass through \((0,0)\), and a fitted line does not have to pass through the origin — that is what the intercept/bias is for. The fix is small and elegant: a <b>linear map + a translation</b>. The resulting object \( \boldsymbol{x}_0 + U \) (a shifted subspace) is called an <b>affine</b> subspace. Almost every geometric object in ML — decision boundaries, hyperplanes, regression fits — is affine, not purely linear.`,
        math: [
          { h: 'Affine subspaces and maps', t: String.raw`$$\boldsymbol{y} = \boldsymbol{A}\boldsymbol{x} + \boldsymbol{b} \qquad \text{affine subspace: } \boldsymbol{x}_0 + U = \{\boldsymbol{x}_0 + \boldsymbol{u} : \boldsymbol{u} \in U\}$$ A hyperplane in \(\mathbb{R}^n\): $$H = \{\boldsymbol{x} : \boldsymbol{w}^\top\boldsymbol{x} + b = 0\}, \qquad \boldsymbol{w} \ne \boldsymbol{0}$$ direction \(= \ker(\boldsymbol{w}^\top)\), and \(\boldsymbol{w}\) is <b>normal</b> (perpendicular) to \(H\).` },
          { h: 'Distance to a hyperplane (needed in Ch 12!)', t: String.raw`$$d(\boldsymbol{x}, H) = \frac{|\boldsymbol{w}^\top \boldsymbol{x} + b|}{\|\boldsymbol{w}\|}$$ The sign of \(\boldsymbol{w}^\top\boldsymbol{x} + b\) tells you which side of the hyperplane you are on — the basis of binary classifiers.` }
        ],
        ml: String.raw`The \(+ \boldsymbol{b}\) in every neural-network layer is the affine shift. A linear classifier is exactly a hyperplane \(\boldsymbol{w}^\top \boldsymbol{x} + b = 0\) with class decided by the sign — and the SVM (Ch 12) chooses the hyperplane that maximizes the distance above to the nearest data points. Bias-free models are forced through the origin — usually the wrong prior on real data.`,
        byhand: {
          problem: String.raw`Let \(H = \{\boldsymbol{x} : \boldsymbol{w}^\top\boldsymbol{x} + b = 0\}\) with \(\boldsymbol{w} = (1, 2)^\top\), \(b = -2\). (a) Does \(\boldsymbol{p} = (4, -1)^\top\) lie on \(H\)? (b) Compute the distance of \(\boldsymbol{q} = (0, 0)^\top\) to \(H\). (c) Which side is \(\boldsymbol{q}\) on?`,
          steps: [
            { t: '(a) Test membership', d: String.raw`\(\boldsymbol{w}^\top\boldsymbol{p} + b = 1\cdot 4 + 2 \cdot (-1) - 2 = 4 - 2 - 2 = 0\) ✓ — \(\boldsymbol{p}\) is on the hyperplane. So \(H\) is the line \(x + 2y = 2\).` },
            { t: '(b) Distance formula', d: String.raw`$$d(\boldsymbol{q}, H) = \frac{|\boldsymbol{w}^\top\boldsymbol{q} + b|}{\|\boldsymbol{w}\|} = \frac{|1\cdot 0 + 2\cdot 0 - 2|}{\sqrt{1^2 + 2^2}} = \frac{2}{\sqrt{5}} \approx 0.894$$` },
            { t: '(c) Side of the hyperplane', d: String.raw`\(\boldsymbol{w}^\top \boldsymbol{q} + b = -2 \lt 0\): the origin is on the <b>negative</b> side. If we declared "positive side = class +1", the origin would get label \(-1\). This sign convention <em>is</em> linear classification.` }
          ],
          answer: String.raw`(a) yes, on \(H\); (b) \(d = 2/\sqrt{5} \approx 0.894\); (c) negative side. Memorize the distance formula — it is the geometric engine of the SVM in Chapter 12.`
        }
      }
    ],
    cheatsheet: [
      { n: 'Product rules', t: String.raw`$$(\boldsymbol{A}\boldsymbol{B})^\top = \boldsymbol{B}^\top\boldsymbol{A}^\top,\qquad \boldsymbol{A}(\boldsymbol{B}\boldsymbol{C}) = (\boldsymbol{A}\boldsymbol{B})\boldsymbol{C}$$` },
      { n: 'Rank', t: String.raw`$$\operatorname{rk}(\boldsymbol{A}) = \#\text{pivots} = \dim\operatorname{Im}(\boldsymbol{A})$$` },
      { n: 'Rank–nullity', t: String.raw`$$\operatorname{rk}(\boldsymbol{A}) + \dim\ker(\boldsymbol{A}) = n \quad (\boldsymbol{A} \in \mathbb{R}^{m \times n})$$` },
      { n: 'Solvability of Ax = b', t: String.raw`$$\text{solution exists} \iff \operatorname{rk}(\boldsymbol{A}) = \operatorname{rk}[\boldsymbol{A}|\boldsymbol{b}], \quad \text{unique} \iff \operatorname{rk}(\boldsymbol{A}) = n$$` },
      { n: 'Change of basis', t: String.raw`$$\boldsymbol{\psi} = \boldsymbol{B}^{-1}\boldsymbol{x}, \qquad \tilde{\boldsymbol{A}} = \boldsymbol{B}^{-1}\boldsymbol{A}\boldsymbol{B}$$` },
      { n: 'Hyperplane & distance', t: String.raw`$$H = \{\boldsymbol{x}: \boldsymbol{w}^\top\boldsymbol{x} + b = 0\}, \qquad d(\boldsymbol{x}, H) = \frac{|\boldsymbol{w}^\top\boldsymbol{x} + b|}{\|\boldsymbol{w}\|}$$` }
    ],
    practice: [
      {
        q: String.raw`Solve by Gaussian elimination: $$\begin{aligned} x + 2y - z &= 3 \\ 2x + 5y + z &= -4 \\ 3x - 2y - z &= 11 \end{aligned}$$`,
        diff: 'easy',
        s: [
          String.raw`Eliminate \(x\): \(R_2 - 2R_1:\; y + 3z = -10\); \(R_3 - 3R_1:\; -8y + 2z = 2\).`,
          String.raw`Eliminate \(y\) from \(R_3\): \(R_3\) is now \((0, -8, 2 \,|\, 2)\); add \(8R_2 = (0, 8, 24 \,|\, -80)\) to get \((0, 0, 26 \,|\, -78)\), so \(26z = -78\) and \(z = -3\).`,
          String.raw`Back-substitute: \(y = -10 - 3z = -10 + 9 = -1\); \(x = 3 - 2y + z = 3 + 2 - 3 = 2\).`,
          String.raw`Check in the original equations: \((2, -1, -3)\): eq1: \(2 - 2 + 3 = 3\) ✓; eq2: \(4 - 5 - 3 = -4\) ✓; eq3: \(6 + 2 + 3 = 11\) ✓.`
        ],
        fin: String.raw`\((x, y, z) = (2, -1, -3)\).`
      },
      {
        q: String.raw`Are \(\boldsymbol{v}_1 = (1, 1, 0)^\top\), \(\boldsymbol{v}_2 = (0, 1, 1)^\top\), \(\boldsymbol{v}_3 = (1, 2, 1)^\top\) linearly independent? If not, write one as a combination of the others and give the rank.`,
        diff: 'med',
        s: [
          String.raw`Eliminate on the matrix with these as columns: \(R_2 - R_1:\; (0, 0, 1)\) rows → matrix \(\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0\end{pmatrix}\) after also using \(R_3 - R_1 - R_2\).`,
          String.raw`Two pivots ⟹ dependent, rank 2. The dependency from the elimination: \(\boldsymbol{v}_3 = \boldsymbol{v}_1 + \boldsymbol{v}_2\) (check: \((1,1,0) + (0,1,1) = (1,2,1)\) ✓).`
        ],
        fin: String.raw`Dependent; \(\boldsymbol{v}_3 = \boldsymbol{v}_1 + \boldsymbol{v}_2\); \(\operatorname{span}\{\boldsymbol{v}_1, \boldsymbol{v}_2, \boldsymbol{v}_3\}\) is a plane, rank \(= 2\).`
      },
      {
        q: String.raw`For \(\boldsymbol{A} = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}\): find a basis of \(\operatorname{Im}(\boldsymbol{A})\) and of \(\ker(\boldsymbol{A})\), and verify the rank–nullity theorem. Is \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}\) solvable for every \(\boldsymbol{b} \in \mathbb{R}^3\)?`,
        diff: 'med',
        s: [
          String.raw`Columns \((1,0,1)^\top, (1,1,0)^\top\) are not proportional ⟹ rank 2, \(\operatorname{Im}(\boldsymbol{A}) = \operatorname{span}\{(1,0,1)^\top, (1,1,0)^\top\}\) — a plane in \(\mathbb{R}^3\).`,
          String.raw`\(\boldsymbol{A}\) has full column rank (2 columns, both independent) ⟹ \(\ker(\boldsymbol{A}) = \{\boldsymbol{0}\}\).`,
          String.raw`Rank–nullity: \(2 + 0 = 2 = n\) ✓. Injective: yes. But <b>not surjective</b>: the image is only a plane, so e.g. \(\boldsymbol{b} = (1,1,1)^\top\) is off it (check: solving \(x_1 + x_2 = 1, x_2 = 1, x_1 = 1\) forces \(x_1 = 1, x_2 = 0\) — contradiction).`
        ],
        fin: String.raw`\(\operatorname{Im}\): 2-D plane spanned by the columns; \(\ker = \{\boldsymbol{0}\}\); solvable only for \(\boldsymbol{b}\) in that plane — a fact that motivates least squares in Chapter 9!`
      },
      {
        q: String.raw`(Change of basis) The map "swap the two coordinates" has matrix \(\boldsymbol{S} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\) in the standard basis. Compute its matrix in the basis \(\boldsymbol{b}_1 = (1, 0)^\top, \boldsymbol{b}_2 = (1, 1)^\top\) via \(\tilde{\boldsymbol{S}} = \boldsymbol{B}^{-1}\boldsymbol{S}\boldsymbol{B}\), and confirm the trace is preserved.`,
        diff: 'hard',
        s: [
          String.raw`\(\boldsymbol{B} = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}\), \(\det = 1\), \(\boldsymbol{B}^{-1} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}\).`,
          String.raw`\(\boldsymbol{S}\boldsymbol{B} = \begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix}\).`,
          String.raw`\(\tilde{\boldsymbol{S}} = \boldsymbol{B}^{-1}(\boldsymbol{S}\boldsymbol{B}) = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 1 & 1 \end{pmatrix}\).`,
          String.raw`Trace: \(\operatorname{tr}\tilde{\boldsymbol{S}} = -1 + 1 = 0 = \operatorname{tr}\boldsymbol{S}\) ✓; \(\det \tilde{\boldsymbol{S}} = -1 = \det \boldsymbol{S}\) ✓. Similar matrices share trace and determinant — coordinate-independent fingerprints of the map.`
        ],
        fin: String.raw`\(\tilde{\boldsymbol{S}} = \begin{pmatrix} -1 & 0 \\ 1 & 1 \end{pmatrix}\). Same map, new coordinates; trace and determinant unchanged.`
      },
      {
        q: String.raw`Prove: if the columns of \(\boldsymbol{A} \in \mathbb{R}^{n \times n}\) are linearly independent, then \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}\) has <em>at most one</em> solution. (Write a clean short proof — this is the kind of argument research papers assume.)`,
        diff: 'hard',
        s: [
          String.raw`Suppose \(\boldsymbol{x}\) and \(\boldsymbol{z}\) both solve \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}\). Subtract: \(\boldsymbol{A}(\boldsymbol{x} - \boldsymbol{z}) = \boldsymbol{b} - \boldsymbol{b} = \boldsymbol{0}\).`,
          String.raw`Write \(\boldsymbol{d} = \boldsymbol{x} - \boldsymbol{z} = \sum_i d_i \boldsymbol{a}_i\) (columns \(\boldsymbol{a}_i\)). Then \(\boldsymbol{A}\boldsymbol{d} = \sum_i d_i \boldsymbol{a}_i = \boldsymbol{0}\).`,
          String.raw`Independence of the columns means the only combination giving \(\boldsymbol{0}\) is the trivial one, so \(d_i = 0\) for all \(i\), i.e. \(\boldsymbol{d} = \boldsymbol{0}\), i.e. \(\boldsymbol{x} = \boldsymbol{z}\). ∎`
        ],
        fin: String.raw`Injectivity of \(\boldsymbol{A}\) ⟺ trivial kernel ⟺ independent columns. (Uniqueness "at most one" holds; existence needs full row rank too — together they give invertibility.)`
      }
    ]
  });
})();
