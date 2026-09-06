/* Exam drills, part 1: chapters 2–6. One multi-part exam question per concept,
   phrased the way CIS 5200 / DS5201 assessments phrase them, with marking schemes. */
(function () {
  var D = {};

  /* ==================== CHAPTER 2 ==================== */
  D['ch2/c1'] = [{
    pts: 6,
    q: String.raw`A mini-batch of three feature vectors is stacked as \(X = \begin{pmatrix}1 & 0 & 2\\ 2 & 1 & 0\end{pmatrix}\) (rows = examples, columns = features) with weight vector \(\boldsymbol{\theta} = (1, -1, 1)^\top\). (a) Compute the predictions \(\hat{\boldsymbol{y}} = X\boldsymbol{\theta}\). (b) A colleague claims \((X\boldsymbol{\theta})^\top = \boldsymbol{\theta}^\top X^\top\); verify and state the shape of each side. (c) TRUE or FALSE, with one-line justification: for conforming matrices, \((AB)^\top = A^\top B^\top\).`,
    s: [
      String.raw`**(a)** Row-by-row: \(1 - 0 + 2 = 3\); \(2 - 1 + 0 = 1\). So \(\hat{\boldsymbol{y}} = (3, 1)^\top\) — one prediction per example, exactly the batching idea of every ML forward pass.`,
      String.raw`**(b)** \((X\boldsymbol{\theta})^\top = (3, 1)\) — shape \(1 \times 2\). \(\boldsymbol{\theta}^\top X^\top = (1, -1, 1)\begin{pmatrix}1&2\\0&1\\2&0\end{pmatrix} = (1 + 0 + 2,\; 2 - 1 + 0) = (3, 1)\) — shape \(1 \times 2\) ✓. Same value, same shape: identity confirmed.`,
      String.raw`**(c) FALSE** as written: the scarf rule is \((AB)^\top = B^\top A^\top\) — the order reverses. (\(A^\top B^\top\) is not even conforming in general.)`
    ],
    fin: String.raw`\(\hat{\boldsymbol{y}} = (3, 1)^\top\); (b) ✓ both \((1\times2)\); (c) FALSE — it is \((AB)^\top = B^\top A^\top\).`
  }];

  D['ch2/c2'] = [{
    pts: 8,
    q: String.raw`Solve by Gaussian elimination, stating the echelon form: $$x + 2y + z = 2, \qquad 2x + 5y + 3z = 7, \qquad x + 3y + 2z = 4$$ Then (b) state the rank of the coefficient matrix and of the augmented matrix; (c) classify the solution set.`,
    s: [
      String.raw`**(a)** \(R_2 - 2R_1\): \((0, 1, 1 \,|\, 3)\); \(R_3 - R_1\): \((0, 1, 1 \,|\, 2)\). Then \(R_3 - R_2\): \((0, 0, 0 \,|\, -1)\). Echelon form: $$\begin{pmatrix}1&2&1&2\\0&1&1&3\\0&0&0&-1\end{pmatrix}$$`,
      String.raw`**(b)** \(\operatorname{rk}(A) = 2\) (two nonzero rows in the coefficient part), \(\operatorname{rk}[A|\boldsymbol{b}] = 3\).`,
      String.raw`**(c)** \(\operatorname{rk}(A) \ne \operatorname{rk}[A|\boldsymbol{b}]\) ⟹ the system is <b>inconsistent</b>: the last row reads \(0 = -1\), no solution exists.`
    ],
    fin: String.raw`Echelon form as above; ranks 2 vs 3 ⟹ no solution (inconsistent).`
  }];

  D['ch2/c3'] = [{
    pts: 6,
    q: String.raw`\(\boldsymbol{u} = (1, 2, 1)^\top\), \(\boldsymbol{v} = (0, 1, 1)^\top\), \(\boldsymbol{w} = (2, 3, 1)^\top\) in \(\mathbb{R}^3\). (a) Determine whether they are independent. (b) Find \(\dim\,\mathrm{span}\{\boldsymbol{u}, \boldsymbol{v}, \boldsymbol{w}\}\) and describe the span geometrically. (c) If a fourth vector were added to make a basis of \(\mathbb{R}^3\), what property must it have relative to the span?`,
    s: [
      String.raw`**(a)** Row-reduce the column matrix: \(\boldsymbol{w} = 2\boldsymbol{u} - \boldsymbol{v}\) (check: \((2,4,2) - (0,1,1) = (2,3,1)\) ✓). Dependent — only 2 pivots.`,
      String.raw`**(b)** \(\dim = 2\): the span is the <b>plane</b> through the origin containing \(\boldsymbol{u}\) and \(\boldsymbol{v}\) (which are independent, neither a multiple of the other).`,
      String.raw`**(c)** The new vector must lie <b>outside that plane</b> — i.e. not be a linear combination of \(\boldsymbol{u}\) and \(\boldsymbol{v}\) — so the three vectors become independent and span all of \(\mathbb{R}^3\).`
    ],
    fin: String.raw`Dependent (\(\boldsymbol{w} = 2\boldsymbol{u} - \boldsymbol{v}\)); span is a 2-D plane; a new basis vector must escape the plane.`
  }];

  D['ch2/c4'] = [{
    pts: 7,
    q: String.raw`\(A = \begin{pmatrix}1 & 2\\ 1 & 2\\ 0 & 1\end{pmatrix}\). (a) Find \(\ker(A)\) and \(\operatorname{Im}(A)\). (b) Verify rank–nullity. (c) Is \(A\boldsymbol{x} = (3, 3, 1)^\top\) solvable? Justify without fully solving.`,
    s: [
      String.raw`**(a)** Columns \((1,1,0)^\top, (2,2,1)^\top\) are independent ⟹ rank 2, \(\operatorname{Im}(A) = \mathrm{span}\{(1,1,0)^\top, (2,2,1)^\top\}\) (a plane in \(\mathbb{R}^3\)). Kernel: \(x_1 + 2x_2 = 0\) and \(x_2 = 0\) ⟹ \(x_2 = 0, x_1 = 0\): \(\ker(A) = \{\boldsymbol{0}\}\).`,
      String.raw`**(b)** \(2 + 0 = 2 = n\) ✓.`,
      String.raw`**(c)** Solve \(x_1 + 2x_2 = 3\), \(x_1 + 2x_2 = 3\), \(x_2 = 1\): gives \(x_2 = 1, x_1 = 1\) — consistent ✓ solvable (and uniquely, since the kernel is trivial).`
    ],
    fin: String.raw`\(\ker = \{\boldsymbol{0}\}\), image = the plane of the columns; \(2 + 0 = 2\); solvable, uniquely.`
  }];

  D['ch2/c5'] = [{
    pts: 6,
    q: String.raw`Basis \(\mathcal{B} = \{(1, 1)^\top, (1, -1)^\top\}\). (a) Find the coordinates of \(\boldsymbol{x} = (2, 4)^\top\) in \(\mathcal{B}\). (b) A linear map has \(\tilde{A} = \begin{pmatrix}3&0\\0&-1\end{pmatrix}\) in \(\mathcal{B}\)-coordinates. Compute \(A\) in standard coordinates and state what the map does geometrically.`,
    s: [
      String.raw`**(a)** Solve \(x = \psi_1(1,1) + \psi_2(1,-1)\): \(2 = \psi_1 + \psi_2\), \(4 = \psi_1 - \psi_2\) ⟹ \(\psi_1 = 3\), \(\psi_2 = -1\).`,
      String.raw`**(b)** \(B = \begin{pmatrix}1&1\\1&-1\end{pmatrix}\), \(A = B\tilde{A}B^{-1}\) with \(B^{-1} = \tfrac12\begin{pmatrix}1&1\\1&-1\end{pmatrix} = \tfrac12 B\) (here \(B\) is its own inverse up to scale). \(B\tilde{A} = \begin{pmatrix}3&1\\3&1\end{pmatrix}\)… compute directly: \(B\tilde{A} = \begin{pmatrix}3&-1\\3&1\end{pmatrix}\), then \(A = B\tilde{A}B^{-1} = \tfrac12\begin{pmatrix}3&-1\\3&1\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix} = \tfrac12\begin{pmatrix}2&4\\4&2\end{pmatrix} = \begin{pmatrix}1&2\\2&1\end{pmatrix}\).`,
      String.raw`Geometrically: stretch by 3 along the \((1,1)\) direction and flip (scale \(-1\)) along \((1,-1)\) — a reflection-scaling, invisible in the standard coordinates until diagonalized.`
    ],
    fin: String.raw`\(\boldsymbol{\psi} = (3, -1)^\top\); \(A = \begin{pmatrix}1&2\\2&1\end{pmatrix}\): stretch +3 along \((1,1)\), −1 along \((1,-1)\).`
  }];

  D['ch2/c6'] = [{
    pts: 5,
    q: String.raw`The line \(H = \{\boldsymbol{x} : 3x_1 - 4x_2 + 1 = 0\}\). (a) Compute the distance of \(\boldsymbol{p} = (3, 1)^\top\) to \(H\). (b) On which side is \(\boldsymbol{p}\)? (c) A classifier assigns \(\mathrm{sign}(3x_1 - 4x_2 + 1)\): predict \(\boldsymbol{p}\) and the origin.`,
    s: [
      String.raw`**(a)** \(3(3) - 4(1) + 1 = 6\); \(\|\boldsymbol{w}\| = 5\): \(d = 6/5 = 1.2\).`,
      String.raw`**(b)** Positive side (\(6 \gt 0\)).`,
      String.raw`**(c)** \(\boldsymbol{p} \mapsto +1\); origin: \(1 \gt 0 \Rightarrow +1\) — both on the same side, though the origin sits only \(1/5\) from the boundary.`
    ],
    fin: String.raw`\(d = 1.2\); positive side; both predicted \(+1\).`
  }];

  D['ch2/b1'] = [{
    pts: 5,
    q: String.raw`(a) Prove that the set of \(n \times n\) regular matrices with matrix multiplication forms a group. (b) Use the minus-1 trick: for RREF \(\begin{pmatrix}1 & 2 & 0 & 3\\ 0 & 0 & 1 & 4\end{pmatrix}\) (in \(\mathbb{R}^4\)), read off a basis of the solution space of \(A\boldsymbol{x} = \boldsymbol{0}\).`,
    s: [
      String.raw`**(a)** Closure and associativity from matrix multiplication; neutral element \(I_n\); inverse element \(A^{-1}\) exists exactly for regular \(A\) — hence the set of regular matrices with \(\cdot\) is a group: the general linear group \(\mathrm{GL}(n, \mathbb{R})\) (non-Abelian for \(n \ge 2\)).`,
      String.raw`**(b)** Pivots in columns 1, 3; free columns 2, 4. Insert \(-1\) rows at those positions: the −1 columns are \((2, -1, 0, 0)^\top\) and \((3, 0, 4, -1)^\top\). Check: \(A(2,-1,0,0)^\top = (2-2, 0)^\top = \boldsymbol{0}\) ✓ and \(A(3,0,4,-1)^\top = (3+12-15, 12-12) = (0,0)\) ✓.`
    ],
    fin: String.raw`\(\mathrm{GL}(n)\) is a group (non-Abelian); kernel basis \(\{(2,-1,0,0)^\top, (3,0,4,-1)^\top\}\).`
  }];

  /* ==================== CHAPTER 3 ==================== */
  D['ch3/c1'] = [{
    pts: 5,
    q: String.raw`For \(\boldsymbol{x} = (2, -3, 1)^\top\): (a) compute \(\|\boldsymbol{x}\|_1, \|\boldsymbol{x}\|_2, \|\boldsymbol{x}\|_\infty\); (b) verify the general ordering \(\|\boldsymbol{x}\|_\infty \le \|\boldsymbol{x}\|_2 \le \|\boldsymbol{x}\|_1\); (c) which norm would you use for robust regression residuals and why?`,
    s: [
      String.raw`**(a)** \(\|\boldsymbol{x}\|_1 = 2 + 3 + 1 = 6\); \(\|\boldsymbol{x}\|_2 = \sqrt{4 + 9 + 1} = \sqrt{14} \approx 3.74\); \(\|\boldsymbol{x}\|_\infty = 3\).`,
      String.raw`**(b)** \(3 \le 3.74 \le 6\) ✓ (each coordinate's absolute value ≤ the 2-norm, and the 2-norm squares-and-roots so it never exceeds the sum).`,
      String.raw`**(c)** \(\ell_1\): linear (not quadratic) penalty on large residuals — robust to outliers; \(\ell_2\) lets a single big error dominate.`
    ],
    fin: String.raw`6; \(\sqrt{14} \approx 3.74\); 3; ordering ✓; \(\ell_1\) for robustness.`
  }];

  D['ch3/c2'] = [{
    pts: 6,
    q: String.raw`\(\boldsymbol{a} = (1, 2, 2)^\top\), \(\boldsymbol{b} = (3, 0, 4)^\top\). (a) Compute the angle between them. (b) Find a unit vector orthogonal to both. (c) State Cauchy–Schwarz and verify for this pair.`,
    s: [
      String.raw`**(a)** \(\boldsymbol{a}^\top\boldsymbol{b} = 3 + 0 + 8 = 11\); \(\|\boldsymbol{a}\| = 3\), \(\|\boldsymbol{b}\| = 5\): \(\cos\omega = 11/15\), \(\omega \approx 42.8^\circ\).`,
      String.raw`**(b)** Cross product: \(\boldsymbol{a} \times \boldsymbol{b} = (2\cdot4 - 2\cdot0,\; 2\cdot3 - 1\cdot4,\; 0 - 6) = (8, 2, -6)^\top\), norm \(\sqrt{104} = 2\sqrt{26}\): unit vector \(\tfrac{1}{\sqrt{26}}(4, 1, -3)^\top\) (check: \(4 + 8 - 6 = 6 \cdot \ldots\) — dot with \(\boldsymbol{a}\): \(4 + 2 - 6 = 0\) ✓, with \(\boldsymbol{b}\): \(12 + 0 - 12 = 0\) ✓).`,
      String.raw`**(c)** \(|\boldsymbol{a}^\top\boldsymbol{b}| = 11 \le 3 \times 5 = 15\) ✓ — equality iff parallel.`
    ],
    fin: String.raw`\(\omega \approx 42.8^\circ\); e.g. \(\tfrac{1}{\sqrt{26}}(4, 1, -3)^\top\); C–S holds (\(11 \le 15\)).`
  }];

  D['ch3/c3'] = [{
    pts: 6,
    q: String.raw`Project \(\boldsymbol{x} = (2, 6, 4)^\top\) onto the line spanned by \(\boldsymbol{b} = (1, 2, 1)^\top\). (a) Compute \(\pi\). (b) Compute the residual and verify orthogonality. (c) What is the distance from \(\boldsymbol{x}\) to the line?`,
    s: [
      String.raw`**(a)** \(\boldsymbol{b}^\top\boldsymbol{x} = 2 + 12 + 4 = 18\), \(\boldsymbol{b}^\top\boldsymbol{b} = 6\): \(\lambda = 3\), \(\pi = 3(1, 2, 1)^\top = (3, 6, 3)^\top\).`,
      String.raw`**(b)** \(\boldsymbol{x} - \pi = (-1, 0, 1)^\top\); \(\boldsymbol{b}^\top(\boldsymbol{x} - \pi) = -1 + 0 + 1 = 0\) ✓.`,
      String.raw`**(c)** \(d = \|(-1, 0, 1)\| = \sqrt{2}\) — the shortest possible distance to any point of the line.`
    ],
    fin: String.raw`\(\pi = (3, 6, 3)^\top\); residual \((-1, 0, 1)^\top\) ⊥ line; distance \(\sqrt{2}\).`
  }];

  D['ch3/c4'] = [{
    pts: 6,
    q: String.raw`Orthonormalize \(\boldsymbol{b}_1 = (3, 0, 4)^\top\), \(\boldsymbol{b}_2 = (1, 2, 0)^\top\) via Gram–Schmidt, and (b) explain why coordinates in the resulting basis are trivial to compute.`,
    s: [
      String.raw`**(a)** \(\boldsymbol{q}_1 = \tfrac15(3, 0, 4)^\top\) (norm 5). Projection of \(\boldsymbol{b}_2\) onto \(\boldsymbol{q}_1\): \((\boldsymbol{q}_1^\top\boldsymbol{b}_2)\boldsymbol{q}_1 = \tfrac35 \cdot \tfrac15(3, 0, 4)^\top = \tfrac{3}{25}(3, 0, 4)^\top = (9/25, 0, 12/25)^\top\). Residual: \((1 - 9/25,\; 2,\; -12/25) = \tfrac1{25}(16, 50, -12)^\top\), orthogonal to \(\boldsymbol{b}_1\) (check: \(48 - 48 = 0\) ✓); norm \(= \tfrac1{25}\sqrt{256 + 2500 + 144} = \tfrac{\sqrt{2900}}{25} = \tfrac{10\sqrt{29}}{25} = \tfrac{2\sqrt{29}}{5}\): $$\boldsymbol{q}_2 = \tfrac{1}{\sqrt{725}}(8, 25, -6)^\top$$ (orthogonality: \((3,0,4)\cdot(8,25,-6) = 24 - 24 = 0\) ✓).`,
      String.raw`**(b)** In an orthonormal basis, coordinates are <b>single dot products</b> (\(z_j = \boldsymbol{q}_j^\top\boldsymbol{x}\)) — no matrix inversion, no cross-talk between basis vectors (each \(\boldsymbol{q}_j^\top\boldsymbol{q}_k = \delta_{jk}\)).`
    ],
    fin: String.raw`\(\boldsymbol{q}_1 = \tfrac15(3,0,4)^\top\), \(\boldsymbol{q}_2 = \tfrac{1}{\sqrt{833}}(8, 25, -12)^\top\); ONB makes coordinates dot products.`
  }];

  D['ch3/c5'] = [{
    pts: 5,
    q: String.raw`On \([0, \pi]\) with the \(L^2\) inner product \(\langle f, g\rangle = \int_0^\pi fg\,dx\): (a) show \(\sin x\) and \(\cos x\) are orthogonal; (b) compute \(\|\sin\|\). (c) Name the ML setting where function inner products matter.`,
    s: [
      String.raw`**(a)** \(\int_0^\pi \sin x\cos x\,dx = \tfrac12\int_0^\pi \sin 2x\,dx = \tfrac12\left[-\tfrac{\cos 2x}{2}\right]_0^\pi = 0\) ✓.`,
      String.raw`**(b)** \(\int_0^\pi \sin^2 x\,dx = \tfrac12\int_0^\pi(1 - \cos 2x)dx = \tfrac{\pi}{2}\): \(\|\sin\| = \sqrt{\pi/2}\).`,
      String.raw`**(c)** Kernel methods / Gaussian processes: kernels are inner products in feature or function spaces; RKHS theory.`
    ],
    fin: String.raw`Orthogonal on \([0, \pi]\); \(\|\sin\| = \sqrt{\pi/2}\); kernel methods/GPs.`
  }];

  /* ==================== CHAPTER 4 ==================== */
  D['ch4/c1'] = [{
    pts: 5,
    q: String.raw`\(A = \begin{pmatrix}2 & 1 & 0\\ 4 & 2 & 1\\ 0 & 1 & 3\end{pmatrix}\). (a) Compute \(\det A\) by cofactor expansion. (b) Without computing eigenvalues, can \(A\) be invertible? (c) What does \(\det A\) tell you about the volume of the image of the unit cube?`,
    s: [
      String.raw`**(a)** Expand row 1: \(2\begin{vmatrix}2&1\\1&3\end{vmatrix} - 1\begin{vmatrix}4&1\\0&3\end{vmatrix} + 0 = 2(6 - 1) - 1(12) = 10 - 12 = -2\).`,
      String.raw`**(b)** \(\det = -2 \ne 0\) ⟹ invertible (also: \(\det = \prod\lambda_i \ne 0\) means no zero eigenvalue).`,
      String.raw`**(c)** Volumes scale by \(|\det A| = 2\); the negative sign adds a reflection (orientation flip).`
    ],
    fin: String.raw`\(\det A = -2\); invertible; volumes ×2 with a reflection.`
  }];

  D['ch4/c2'] = [{
    pts: 7,
    q: String.raw`\(A = \begin{pmatrix}1 & -2\\ -2 & 4\end{pmatrix}\). (a) Characteristic polynomial, eigenvalues. (b) Eigenspaces. (c) Verify \(\sum\lambda = \operatorname{tr}\), \(\prod\lambda = \det\) here. (d) What is special about the eigenvalues of a symmetric matrix?`,
    s: [
      String.raw`**(a)** \((1 - \lambda)(4 - \lambda) - 4 = \lambda^2 - 5\lambda\): \(\lambda(\lambda - 5) = 0\) ⟹ \(\lambda = 5, 0\) (singular!).`,
      String.raw`**(b)** \(\lambda = 5\): \(-4x_1 - 2x_2 = 0 \Rightarrow \boldsymbol{v}_1 = (1, -2)^\top\) direction. \(\lambda = 0\): \(\ker A\): \(x_1 = 2x_2\): \(\boldsymbol{v}_2 = (2, 1)^\top\).`,
      String.raw`**(c)** \(\operatorname{tr} = 5 = 5 + 0\) ✓; \(\det = 0 = 5 \times 0\) ✓ (zero eigenvalue ⟺ singular).`,
      String.raw`**(d)** Symmetric ⟹ all eigenvalues real and eigenvectors for distinct eigenvalues orthogonal (spectral theorem) — here \((1, -2)^\top \perp (2, 1)^\top\) ✓.`
    ],
    fin: String.raw`\(\lambda = 5, 0\); \(\boldsymbol{v}_1 = (1,-2)^\top\), \(\boldsymbol{v}_2 = (2,1)^\top\); checks ✓; symmetric ⇒ real + orthogonal.`
  }];

  D['ch4/c3'] = [{
    pts: 6,
    q: String.raw`\(A = \begin{pmatrix}6 & 2\\ 2 & 3\end{pmatrix}\). (a) Diagonalize \(A = P\Lambda P^{-1}\). (b) Compute \(A^4\) via the decomposition (leave powers explicit if large). (c) Why does \(A^{10}\) take one line with eigenvalues?`,
    s: [
      String.raw`**(a)** \(\lambda^2 - 9\lambda + 14 = (\lambda - 7)(\lambda - 2)\): \(\lambda = 7, 2\); eigenvectors \((2, 1)^\top\), \((-1, 2)^\top\) (orthogonal ✓, symmetric). \(P = \begin{pmatrix}2&-1\\1&2\end{pmatrix}\), \(\Lambda = \operatorname{diag}(7, 2)\), \(P^{-1} = \tfrac15\begin{pmatrix}2&1\\-1&2\end{pmatrix}\).`,
      String.raw`**(b)** \(A^4 = P\Lambda^4P^{-1} = \tfrac15\begin{pmatrix}2&-1\\1&2\end{pmatrix}\begin{pmatrix}2401&0\\0&16\end{pmatrix}\begin{pmatrix}2&1\\-1&2\end{pmatrix} = \tfrac15\begin{pmatrix}2(4802) + (-16) & 2(2401) + (-32)\\ 4802 - 32 & 2401 + 16\cdot2\end{pmatrix}\)… computing: \(= \tfrac15\begin{pmatrix}9604 - 16 & 4802 - 32\\4802 - 32 & 2401 + 32\end{pmatrix} = \begin{pmatrix}1917.6 & 954\\954 & 486.6\end{pmatrix}\).`,
      String.raw`**(c)** \(A^{10} = P\Lambda^{10}P^{-1}\): only \(7^{10}\) and \(2^{10}\) need computing — the eigenvectors never change.`
    ],
    fin: String.raw`\(P = \begin{pmatrix}2&-1\\1&2\end{pmatrix}\), \(\Lambda = \operatorname{diag}(7,2)\); \(A^4\) via \(\operatorname{diag}(7^4, 2^4)\); powers = eigenvalue powers.`
  }];

  D['ch4/c4'] = [{
    pts: 6,
    q: String.raw`\(A = \begin{pmatrix}16 & 4\\ 4 & 2\end{pmatrix}\)? Take \(A = \begin{pmatrix}9 & 6\\ 6 & 5\end{pmatrix}\). (a) Cholesky-factor. (b) What failure mode would indicate non-PD? (c) Use \(L\) to write the sampling recipe for \(\mathcal{N}(0, A)\).`,
    s: [
      String.raw`**(a)** \(l_{11} = 3\); \(l_{21} = 6/3 = 2\); \(l_{22} = \sqrt{5 - 4} = 1\): \(L = \begin{pmatrix}3&0\\2&1\end{pmatrix}\). Verify: \(LL^\top = \begin{pmatrix}9&6\\6&5\end{pmatrix}\) ✓.`,
      String.raw`**(b)** A negative value under a square root (\(c - l_{21}^2 \lt 0\)) or a nonpositive diagonal — Cholesky fails loudly exactly when the matrix is not PD (Sylvester).`,
      String.raw`**(c)** Draw \(\boldsymbol{z} \sim \mathcal{N}(\boldsymbol{0}, I)\), set \(\boldsymbol{x} = L\boldsymbol{z}\): \(\mathrm{Cov}(\boldsymbol{x}) = LL^\top = A\) ✓.`
    ],
    fin: String.raw`\(L = \begin{pmatrix}3&0\\2&1\end{pmatrix}\); failure = non-PD; sample via \(\boldsymbol{x} = L\boldsymbol{z}\).`
  }];

  D['ch4/c5'] = [{
    pts: 7,
    q: String.raw`\(A = \begin{pmatrix}2 & 2\\ -1 & 1\end{pmatrix}\)? Use \(A = \begin{pmatrix}0 & 2\\ 2 & 0\end{pmatrix}\). (a) Compute \(A^\top A\) and the singular values. (b) Give the full SVD. (c) Verify \(U\Sigma V^\top = A\).`,
    s: [
      String.raw`**(a)** \(A^\top A = \begin{pmatrix}4&0\\0&4\end{pmatrix} = 4I\): \(\sigma_1 = \sigma_2 = 2\), and any orthonormal pair works for \(V\) — take \(V = I\).`,
      String.raw`**(b)** \(\boldsymbol{u}_i = A\boldsymbol{v}_i/\sigma_i\): \(\boldsymbol{u}_1 = (0, 1)^\top\), \(\boldsymbol{u}_2 = (1, 0)^\top\): \(U = \begin{pmatrix}0&1\\1&0\end{pmatrix}\), \(\Sigma = 2I\).`,
      String.raw`**(c)** \(U\Sigma V^\top = \begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}2&0\\0&2\end{pmatrix} = \begin{pmatrix}0&2\\2&0\end{pmatrix} = A\) ✓.`
    ],
    fin: String.raw`\(\sigma = (2, 2)\); \(U\) a permutation, \(V = I\); verified.`
  }];

  D['ch4/c6'] = [{
    pts: 6,
    q: String.raw`\(A = \begin{pmatrix}1 & 3\\ 2 & 6\end{pmatrix}\). (a) Compute \(A^{+}\) via its SVD. (b) Give \(\hat{\boldsymbol{x}} = A^{+}\boldsymbol{b}\) for \(\boldsymbol{b} = (4, 8)^\top\) and interpret what kind of solution it is. (c) For \(\boldsymbol{b} = (1, 0)^\top\) (not in the image), what does \(\hat{\boldsymbol{x}}\) return?`,
    s: [
      String.raw`**(a)** Rank 1: \(A^\top A = \begin{pmatrix}5&15\\15&45\end{pmatrix} = 5\begin{pmatrix}1&3\\3&9\end{pmatrix}\): eigenvalues \(50, 0\) ⟹ \(\sigma = \sqrt{50} = 5\sqrt2\), with \(\boldsymbol{v} = \tfrac{1}{\sqrt{10}}(1, 3)^\top\) and \(\boldsymbol{u} = A\boldsymbol{v}/\sigma = \tfrac{1}{\sqrt5}(1, 2)^\top\). $$A^{+} = \frac{1}{\sigma}\boldsymbol{v}\boldsymbol{u}^\top = \frac{1}{5\sqrt2\cdot\sqrt5\cdot\sqrt2}\begin{pmatrix}1\\3\end{pmatrix}(1, 2) = \frac{1}{50}\begin{pmatrix}1&2\\3&6\end{pmatrix}$$`,
      String.raw`**(b)** \(\hat{\boldsymbol{x}} = \tfrac1{50}(4 + 16, 12 + 48)^\top = \tfrac1{50}(20, 60)^\top = (0.4, 1.2)^\top\). Check \(A\hat{x} = (0.4 + 3.6, 0.8 + 7.2) = (4, 8)\) ✓ — exact, minimum-norm solution.`,
      String.raw`**(c)** \(\boldsymbol{b} \notin \operatorname{Im}(A)\) (image is the line \(t(1, 2)\)): \(\hat{\boldsymbol{x}} = \tfrac1{50}(1, 3)^\top\) and \(A\hat{\boldsymbol{x}} = \tfrac1{50}(1+6, 2+18) = (0.14, 0.4)^\top\) — the <b>least-squares</b> fit, i.e. the projection of \(\boldsymbol{b}\) onto the image.`
    ],
    fin: String.raw`\(A^{+} = \tfrac1{50}\begin{pmatrix}1&2\\3&6\end{pmatrix}\); exact min-norm solve; least-squares fallback off-image.`
  }];

  /* ==================== CHAPTER 5 ==================== */
  D['ch5/c1'] = [{
    pts: 5,
    q: String.raw`(a) State the second-order Taylor expansion of \(f\) at \(x_0\). (b) For \(f(x) = \sqrt{x}\) at \(x_0 = 4\), approximate \(f(4.1)\) with two terms and bound the direction of the error using \(f''\).`,
    s: [
      String.raw`**(a)** \(f(x) \approx f(x_0) + f'(x_0)(x - x_0) + \tfrac12 f''(x_0)(x - x_0)^2\).`,
      String.raw`**(b)** \(f'(x) = \tfrac{1}{2\sqrt{x}}\), \(f''(x) = -\tfrac{1}{4}x^{-3/2}\): \(f(4) = 2\), \(f'(4) = 0.25\), \(f''(4) = -\tfrac{1}{32}\). $$f(4.1) \approx 2 + 0.25(0.1) - \tfrac{1}{64}(0.01) = 2.025 - 0.000156 \approx 2.0248$$ True \(\sqrt{4.1} \approx 2.02485\) — nearly exact; since \(f'' \lt 0\) the linear estimate overestimates (function is concave).`
    ],
    fin: String.raw`≈ 2.0248 vs true 2.02485; concavity ⇒ linearization overestimates.`
  }];

  D['ch5/c2'] = [{
    pts: 6,
    q: String.raw`\(f(\boldsymbol{x}) = \tfrac12\|\boldsymbol{x}\|^2 - 3x_1\). (a) Compute \(\nabla f\) and the minimizer. (b) State the direction of steepest descent at \(\boldsymbol{x}_0 = (2, 2)^\top\) and the rate of decrease per unit step in that direction. (c) Which identity gives \(\nabla f\) in one line?`,
    s: [
      String.raw`**(a)** \(\nabla f = \boldsymbol{x} - (3, 0)^\top = 0\) ⟹ \(\boldsymbol{x}^\star = (3, 0)^\top\).`,
      String.raw`**(b)** \(\nabla f(2, 2) = (-1, 2)^\top\); steepest descent direction \(= -\nabla f/\|\nabla f\| = \tfrac{1}{\sqrt5}(1, -2)^\top\), with decrease rate \(\|\nabla f\| = \sqrt5\) per unit length.`,
      String.raw`**(c)** \(\nabla_{\boldsymbol{x}}\tfrac12\|\boldsymbol{x}\|^2 = \boldsymbol{x}\) plus the linear rule \(\nabla(\boldsymbol{a}^\top\boldsymbol{x}) = \boldsymbol{a}\).`
    ],
    fin: String.raw`\(\boldsymbol{x}^\star = (3, 0)^\top\); descent direction \(\tfrac{1}{\sqrt5}(1, -2)^\top\); rate \(\sqrt5\).`
  }];

  D['ch5/c3'] = [{
    pts: 6,
    q: String.raw`\(\boldsymbol{f}(\boldsymbol{x}) = A\boldsymbol{x}\) with \(A \in \mathbb{R}^{m\times n}\). (a) What is \(J\) and its shape? (b) Why is the Jacobian of every linear map the map itself? (c) For \(\boldsymbol{f}(\boldsymbol{x}) = (x_1^2, x_1x_2, x_2^2)\), compute \(J\) at \((2, 3)\) and predict \(\boldsymbol{f}(2.01, 2.99)\) by linearization.`,
    s: [
      String.raw`**(a)** \(J \in \mathbb{R}^{m\times n}\), \(J_{ij} = \partial f_i/\partial x_j\); for \(\boldsymbol{f} = A\boldsymbol{x}\): \(J = A\) exactly.`,
      String.raw`**(b)** Linear maps are their own local linearization: \(\boldsymbol{f}(\boldsymbol{x} + \boldsymbol{\delta}) = \boldsymbol{f}(\boldsymbol{x}) + A\boldsymbol{\delta}\) with no approximation error.`,
      String.raw`**(c)** \(J = \begin{pmatrix}2x_1&0\\x_2&x_1\\0&2x_2\end{pmatrix}\bigg|_{(2,3)} = \begin{pmatrix}4&0\\3&2\\0&6\end{pmatrix}\). \(\boldsymbol{f}(2,3) = (4, 6, 9)^\top\); \(\boldsymbol{\delta} = (0.01, -0.01)^\top\): \(J\boldsymbol{\delta} = (0.04, 0.03 - 0.02, -0.06)^\top = (0.04, 0.01, -0.06)^\top\): prediction \((4.04, 6.01, 8.94)^\top\).`
    ],
    fin: String.raw`\(J = A\) for linear maps; \(J(2,3) = \begin{pmatrix}4&0\\3&2\\0&6\end{pmatrix}\); linear prediction \((4.04, 6.01, 8.94)^\top\).`
  }];

  D['ch5/c4'] = [{
    pts: 8,
    q: String.raw`Network: \(\boldsymbol{h} = \mathrm{ReLU}(W\boldsymbol{x})\), \(y = \boldsymbol{v}^\top\boldsymbol{h}\), \(L = \tfrac12(y - t)^2\), with \(W = I_2\), \(\boldsymbol{x} = (1, -2)^\top\), \(\boldsymbol{v} = (1, 1)^\top\), \(t = 3\). (a) Forward pass. (b) Compute \(\partial L/\partial W\) (both coordinates) via backprop. (c) State which ReLU coordinate is "dead" for this input and what that means for its gradient.`,
    s: [
      String.raw`**(a)** \(\boldsymbol{z} = (1, -2)^\top\); \(\boldsymbol{h} = (1, 0)^\top\); \(y = 1\); \(L = \tfrac12(1 - 3)^2 = 2\).`,
      String.raw`**(b)** \(\bar y = y - t = -2\); \(\bar{\boldsymbol{h}} = \boldsymbol{v}\bar y = (-2, -2)^\top\); gate \(\mathbb{1}\{\boldsymbol{z} \gt 0\} = (1, 0)\): \(\bar{\boldsymbol{z}} = (-2, 0)^\top\); $$\frac{\partial L}{\partial W} = \bar{\boldsymbol{z}}\boldsymbol{x}^\top = \begin{pmatrix}-2\\0\end{pmatrix}(1, -2) = \begin{pmatrix}-2&4\\0&0\end{pmatrix}$$`,
      String.raw`**(c)** The second coordinate: \(z_2 = -2 \lt 0\) → ReLU outputs 0 and passes zero gradient — the corresponding row of \(\partial L/\partial W\) is identically 0 (dead unit for this input; it only learns if the pre-activation turns positive).`
    ],
    fin: String.raw`\(L = 2\); \(\partial L/\partial W = \begin{pmatrix}-2&4\\0&0\end{pmatrix}\); second unit dead (zero gradient row).`
  }];

  D['ch5/c5'] = [{
    pts: 6,
    q: String.raw`\(f(\boldsymbol{x}) = \tfrac12\boldsymbol{x}^\top H\boldsymbol{x} - \boldsymbol{b}^\top\boldsymbol{x}\) with \(H = \begin{pmatrix}8&0\\0&2\end{pmatrix}\), \(\boldsymbol{b} = (4, 2)^\top\), from \(\boldsymbol{x}_0 = \boldsymbol{0}\). (a) One Newton step. (b) Is it the minimizer? (c) Compare with 1 GD step at \(\eta = 0.1\) and state the condition-number story.`,
    s: [
      String.raw`**(a)** \(\nabla f = H\boldsymbol{x} - \boldsymbol{b} = (-4, -2)^\top\); \(\delta = -H^{-1}\nabla f = -(\tfrac{-4}{8}, \tfrac{-2}{2})^\top = (0.5, 1)^\top\): \(\boldsymbol{x}_1 = (0.5, 1)^\top\).`,
      String.raw`**(b)** \(H\boldsymbol{x}_1 = (4, 2)^\top = \boldsymbol{b}\) ✓ — exact minimizer in one step (Newton is exact on quadratics).`,
      String.raw`**(c)** GD: \(\boldsymbol{x}_1 = 0.1(4, 2)^\top = (0.4, 0.2)^\top\) — far away; \(\kappa = \lambda_{\max}/\lambda_{\min} = 8/2 = 4\) forces GD's single \(\eta\) to balance a steep and a flat direction, while Newton rescales each direction by its own curvature.`
    ],
    fin: String.raw`Newton: \((0.5, 1)^\top\) = exact minimum; GD \((0.4, 0.2)^\top\); \(\kappa = 4\) is the friction.`
  }];

  /* ==================== CHAPTER 6 ==================== */
  D['ch6/c1'] = [{
    pts: 5,
    q: String.raw`Three events with \(P(A) = 0.5\), \(P(B) = 0.4\), \(P(A \cap B) = 0.2\). (a) Are \(A, B\) independent? (b) Compute \(P(A \cup B)\). (c) Compute \(P(A \mid B)\) and \(P(B \mid A)\).`,
    s: [
      String.raw`**(a)** Independence needs \(P(A)P(B) = 0.20\) vs actual 0.20 — <b>independent</b> ✓ (borderline: exactly equal).`,
      String.raw`**(b)** \(P(A \cup B) = 0.5 + 0.4 - 0.2 = 0.7\) (sum rule).`,
      String.raw`**(c)** \(P(A \mid B) = 0.2/0.4 = 0.5 = P(A)\) and \(P(B \mid A) = 0.4\) — conditioning changes nothing, the signature of independence.`
    ],
    fin: String.raw`Independent; \(P(A \cup B) = 0.7\); both conditionals = 0.5 and 0.4.`
  }];

  D['ch6/c2'] = [{
    pts: 6,
    q: String.raw`A screening test: prevalence 5%, sensitivity 98%, specificity 95%. (a) Compute \(P(+)\). (b) Compute \(P(D \mid +)\). (c) The prior halves (prevalence 2.5%): recompute \(P(D \mid +)\) and state the base-rate lesson.`,
    s: [
      String.raw`**(a)** \(P(+) = 0.98(0.05) + 0.05(0.95) = 0.049 + 0.0475 = 0.0965\).`,
      String.raw`**(b)** \(P(D \mid +) = 0.049/0.0965 \approx 0.508\).`,
      String.raw`**(c)** \(P(+) = 0.0245 + 0.04875 = 0.07325\): \(P(D \mid +) = 0.0245/0.07325 \approx 0.335\). Halving the prevalence cuts the posterior from ~51% to ~33%: posteriors are prior-sensitive for rare events.`
    ],
    fin: String.raw`0.0965; ≈ 0.508; ≈ 0.335 — base rates rule.`
  }];

  D['ch6/c3'] = [{
    pts: 6,
    q: String.raw`\(X, Y\) with \(\mathbb{E}[X] = 2\), \(\mathbb{E}[Y] = 3\), \(\mathbb{V}[X] = 4\), \(\mathbb{V}[Y] = 9\), \(\mathrm{Cov}(X, Y) = 2\). (a) \(\mathbb{E}[3X - 2Y]\)? (b) \(\mathbb{V}[3X - 2Y]\)? (c) \(\rho_{XY}\) and its reading?`,
    s: [
      String.raw`**(a)** Linearity (no independence needed): \(3(2) - 2(3) = 0\).`,
      String.raw`**(b)** \(\mathbb{V} = 9(4) + 4(9) - 2\cdot3\cdot2\cdot2 = 36 + 36 - 24 = 48\).`,
      String.raw`**(c)** \(\rho = 2/\sqrt{36} = 1/3\): moderate positive <em>linear</em> dependence (says nothing about nonlinear dependence).`
    ],
    fin: String.raw`0; 48; \(\rho = 1/3\).`
  }];

  D['ch6/c4'] = [{
    pts: 6,
    q: String.raw`\(\boldsymbol{x} \sim \mathcal{N}(\boldsymbol{\mu}, \Sigma)\), \(\boldsymbol{y} = A\boldsymbol{x} + \boldsymbol{c}\). (a) Distribution of \(\boldsymbol{y}\)? (b) For \(\Sigma\) diagonal with entries \((4, 1)\) and \(A\) mapping to a scalar \(y = x_1 + x_2\): \(\mathbb{V}[y]\)? (c) Why do ML practitioners love Gaussian marginals/conditionals?`,
    s: [
      String.raw`**(a)** \(\boldsymbol{y} \sim \mathcal{N}(A\boldsymbol{\mu} + \boldsymbol{c},\; A\Sigma A^\top)\) — closed under affine maps.`,
      String.raw`**(b)** \(\mathbb{V}[y] = \Sigma_{11} + \Sigma_{22} = 5\) (uncorrelated diagonals add).`,
      String.raw`**(c)** Marginals and conditionals of joint Gaussians are Gaussian in closed form; conditioning = linear mean correction + variance shrinkage — everything stays computable.`
    ],
    fin: String.raw`\(\mathcal{N}(A\mu + c, A\Sigma A^\top)\); \(\mathbb{V}[y] = 5\); closed-form family.`
  }];

  D['ch6/c5'] = [{
    pts: 6,
    q: String.raw`(a) Derive the MLE of \(\lambda\) for \(n\) i.i.d. Poisson(\(\lambda\)) draws. (b) State the conjugate prior of the Poisson likelihood. (c) Why does the exponential family guarantee conjugacy?`,
    s: [
      String.raw`**(a)** \(\ell(\lambda) = \sum_i (x_i\log\lambda - \lambda - \log x_i!) = N\log\lambda - N\lambda + \text{const}\): \(\hat\lambda = \bar{x}\) (check \(\ell'' = -N/\lambda^2 \lt 0\) ✓).`,
      String.raw`**(b)** The Gamma family: \(\mathrm{Gamma}(\alpha, \beta)\) prior + Poisson data → \(\mathrm{Gamma}(\alpha + \sum x_i, \beta + n)\).`,
      String.raw`**(c)** Every exponential-family likelihood admits a conjugate prior of the form \(p(\theta \mid \gamma) \propto h_c(\theta)e^{\gamma_1\theta - \gamma_2 A(\theta)}\) (book eq. 6.120) — the posterior just updates the \(\gamma\) pseudo-statistics.`
    ],
    fin: String.raw`\(\hat\lambda = \bar x\); Gamma conjugate prior; exponential family ⇒ conjugacy by construction.`
  }];

  D['ch6/c6'] = [{
    pts: 5,
    q: String.raw`(a) Compute the KL divergence \(\mathrm{KL}(P \| Q)\) for \(P = \mathrm{Bernoulli}(0.5)\), \(Q = \mathrm{Bernoulli}(0.9)\). (b) Which term dominates? (c) How does cross-entropy training use this identity?`,
    s: [
      String.raw`**(a)** $$\mathrm{KL} = 0.5\log\frac{0.5}{0.9} + 0.5\log\frac{0.5}{0.1} = 0.5(-0.5878) + 0.5(1.6094) \approx 0.511 \text{ nats}$$`,
      String.raw`**(b)** The \(P(X{=}1)\) term dominates: \(Q\) assigns tiny mass where \(P\) puts half — surprise \( \log(0.5/0.9)\)'s counterpart \(\log(0.5/0.1) = 1.61\) is the pain.`,
      String.raw`**(c)** Minimizing cross-entropy \(H(P, Q) = H(P) + \mathrm{KL}(P\|Q)\) over the model's parameters minimizes the KL (since \(H(P)\) is fixed) — fitting = distribution matching.`
    ],
    fin: String.raw`≈ 0.51 nats; the \(x = 1\) term dominates; CE training = KL minimization up to a constant.`
  }];

  D['ch6/b1'] = [{
    pts: 6,
    q: String.raw`(a) Write the exponential-family form of the Poisson distribution \(p(x \mid \lambda) = \lambda^x e^{-\lambda}/x!\). (b) Identify \(h, \phi, \theta, A\). (c) What does \(\phi(x) = x\) imply about the sufficient statistic for \(n\) samples?`,
    s: [
      String.raw`**(a)** \(p(x \mid \lambda) = \exp(x\log\lambda - \lambda - \log x!)\).`,
      String.raw`**(b)** \(h(x) = 1/x!\); \(\phi(x) = x\); \(\theta = \log\lambda\); \(A(\theta) = e^{\theta}\) (= \(\lambda\)).`,
      String.raw`**(c)** \(\sum_i x_i\) is sufficient: the sample mean contains all the information the data carries about \(\lambda\) — which is why the Gamma–Poisson posterior update only tracks \(\sum x_i\) and \(n\).`
    ],
    fin: String.raw`\(h = 1/x!\), \(\phi = x\), \(\theta = \log\lambda\), \(A = e^\theta\); \(\sum_i x_i\) sufficient.`
  }];

  MML.chapters.forEach(function (ch) {
    (ch.concepts || []).forEach(function (c) {
      var k = ch.id + '/' + c.id;
      if (D[k]) c.drills = D[k];
    });
  });
})();
