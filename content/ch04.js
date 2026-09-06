/* Chapter 4 — Matrix Decompositions */
(function () {
  MML.chapters.push({
    id: 'ch4', num: 4, icon: '💎',
    title: 'Matrix Decompositions',
    tagline: 'Breaking matrices into their natural ingredients — eigenvalues, Cholesky, and the SVD, the three tools ML cannot live without.',
    why: String.raw`Raw matrices hide their meaning. <b>Decompositions</b> rewrite \(\boldsymbol{A}\) as a product of simpler matrices that expose it: eigen-decomposition reveals the directions a map merely stretches; Cholesky reveals "this is a well-behaved covariance"; the SVD reveals the true rank and best low-dimensional summary. PCA (Ch 10) <em>is</em> an eigendecomposition; sampling from Gaussians (Ch 6) uses Cholesky; recommender systems and whitening use the SVD. This chapter is the toolbox the rest of ML reaches into.`,
    goals: [
      String.raw`Compute determinants and trace; know what they mean geometrically.`,
      String.raw`Find eigenvalues/eigenvectors of 2×2 (and 3×3) matrices by hand.`,
      String.raw`Diagonalize matrices and use \(\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1}\) to compute powers.`,
      String.raw`Cholesky-factor a positive-definite matrix.`,
      String.raw`Compute the SVD of a small matrix and the Moore–Penrose pseudoinverse.`
    ],
    widget: null,
    concepts: [
      {
        id: 'c1',
        title: 'Determinant and trace',
        subtitle: 'volume, orientation, and a free invariant',
        intuition: String.raw`The <b>determinant</b> of a square matrix answers: "when this map acts on a shape, how does its volume change?" \(\det = 2\) doubles volumes; \(\det = 0\) flattens the space into a lower dimension (the map destroys information — no inverse!); \(\det \lt 0\) also flips orientation (a mirror). The <b>trace</b> (sum of diagonal entries) looks boring but is secretly deep: it is invariant under change of basis, and equals the sum of the eigenvalues — a fingerprint of the map itself.`,
        math: [
          { h: 'Determinant', t: String.raw`$$2 \times 2:\; \det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc \qquad \det(\boldsymbol{A}\boldsymbol{B}) = \det(\boldsymbol{A})\det(\boldsymbol{B}), \quad \det(\boldsymbol{A}^\top) = \det(\boldsymbol{A})$$ \(\boldsymbol{A}\) invertible \(\iff \det \boldsymbol{A} \ne 0\). Laplace (cofactor) expansion along row \(i\): $$\det \boldsymbol{A} = \sum_j (-1)^{i+j} a_{ij} \det \boldsymbol{A}_{ij}$$ where \(\boldsymbol{A}_{ij}\) is \(A\) with row \(i\) and column \(j\) deleted.` },
          { h: 'Trace', t: String.raw`$$\operatorname{tr}(\boldsymbol{A}) = \sum_i a_{ii}, \qquad \operatorname{tr}(\boldsymbol{A}\boldsymbol{B}) = \operatorname{tr}(\boldsymbol{B}\boldsymbol{A}) \;\text{(cyclic property)}, \qquad \operatorname{tr}(\boldsymbol{A}) = \sum_i \lambda_i$$ The trace trick \(\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} = \operatorname{tr}(\boldsymbol{A}\boldsymbol{x}\boldsymbol{x}^\top)\) is used constantly in matrix calculus (Ch 5).` }
        ],
        ml: String.raw`Determinants appear wherever probability densities are transformed: normalizing flows (invertible networks) compute \(\log|\det \boldsymbol{J}|\) at every layer; the multivariate Gaussian density contains \((\det\boldsymbol{\Sigma})^{-1/2}\); the entropy of a Gaussian has a \(\log\det\) term. Traces appear in the KL divergence between Gaussians and in \(\ell_2\) regularization (\(\|\boldsymbol{\theta}\|^2 = \operatorname{tr}(\boldsymbol{\theta}^\top\boldsymbol{\theta})\)).`,
        byhand: {
          problem: String.raw`Compute \(\det \boldsymbol{A}\) and \(\operatorname{tr}\boldsymbol{A}\) for $$\boldsymbol{A} = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{pmatrix}$$ by cofactor expansion along the first row (the middle zero helps twice).`,
          steps: [
            { t: 'Expand along row 1', d: String.raw`$$\det \boldsymbol{A} = 1\cdot\det\begin{pmatrix} 1 & 4 \\ 6 & 0\end{pmatrix} - 2\cdot\det\begin{pmatrix} 0 & 4 \\ 5 & 0 \end{pmatrix} + 3\cdot\det\begin{pmatrix} 0 & 1 \\ 5 & 6 \end{pmatrix}$$ Signs: \(+,-,+\) (checkerboard).` },
            { t: 'The three 2×2 determinants', d: String.raw`$$1\cdot(0 - 24) = -24, \qquad -2\cdot(0 - 20) = +40, \qquad 3\cdot(0 - 5) = -15$$` },
            { t: 'Sum', d: String.raw`$$\det \boldsymbol{A} = -24 + 40 - 15 = 1$$ Interesting: \(\det = 1\), so this map preserves volume exactly (and is invertible).` },
            { t: 'Trace', d: String.raw`$$\operatorname{tr}(\boldsymbol{A}) = 1 + 1 + 0 = 2$$ — and this must equal the sum of the eigenvalues (a check you can use in c2's practice).` }
          ],
          answer: String.raw`\(\det \boldsymbol{A} = 1\), \(\operatorname{tr}\boldsymbol{A} = 2\).`
        }
      },
      {
        id: 'c2',
        title: 'Eigenvalues and eigenvectors',
        subtitle: 'the directions a matrix cannot turn',
        intuition: String.raw`Most vectors, when multiplied by \(\boldsymbol{A}\), get both stretched <em>and</em> rotated. But a few special directions — the <b>eigenvectors</b> — come out pointing the same way as they went in: \(\boldsymbol{A}\boldsymbol{v} = \lambda \boldsymbol{v}\). They are only scaled, by their <b>eigenvalue</b>. Eigenvectors are the hidden skeleton of the map: along each of them, the complicated matrix product is just "multiply by a number". If you understand what a matrix does on its eigenvectors, you understand everything it does.`,
        math: [
          { h: 'Definition and characteristic polynomial', t: String.raw`$$\boldsymbol{A}\boldsymbol{v} = \lambda\boldsymbol{v}, \;\; \boldsymbol{v} \ne \boldsymbol{0} \quad\Longleftrightarrow\quad (\boldsymbol{A} - \lambda \boldsymbol{I})\boldsymbol{v} = \boldsymbol{0} \quad\Longleftrightarrow\quad \det(\boldsymbol{A} - \lambda\boldsymbol{I}) = 0$$ The last equation is a polynomial in \(\lambda\) of degree \(n\): its roots are the eigenvalues. Eigenvectors for a given \(\lambda\) = nonzero solutions of \((\boldsymbol{A} - \lambda\boldsymbol{I})\boldsymbol{v} = \boldsymbol{0}\) (the eigenspace).` },
          { h: 'Quick facts', t: String.raw`$$\sum_i \lambda_i = \operatorname{tr}(\boldsymbol{A}), \qquad \prod_i \lambda_i = \det(\boldsymbol{A})$$ Eigenvalues may be complex; for <b>symmetric</b> matrices they are always real, and eigenvectors for different eigenvalues are orthogonal (<b>spectral theorem</b>): $$\boldsymbol{A} = \boldsymbol{A}^\top \;\Rightarrow\; \boldsymbol{A} = \boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^\top, \quad \boldsymbol{Q} \text{ orthogonal}$$ This is why covariance matrices are so pleasant to work with.` }
        ],
        ml: String.raw`PCA = eigenvectors of the covariance matrix (Ch 10). The eigenvalues of the Hessian describe the loss landscape's curvature (Ch 7). Spectral clustering uses eigenvectors of graph Laplacians. Google's original PageRank is the dominant eigenvector of the web-link matrix. In deep learning, "the spectrum of the Hessian/NTK" is a staple of research papers.`,
        byhand: {
          problem: String.raw`Find all eigenvalues and eigenvectors of $$\boldsymbol{A} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$$ and verify the trace/determinant checks.`,
          steps: [
            { t: 'Characteristic polynomial', d: String.raw`$$\det\begin{pmatrix} 4-\lambda & 1 \\ 2 & 3-\lambda \end{pmatrix} = (4-\lambda)(3-\lambda) - 2 = \lambda^2 - 7\lambda + 10$$ Factor: \((\lambda - 5)(\lambda - 2)\) ⟹ \(\lambda_1 = 5, \lambda_2 = 2\).` },
            { t: 'Sanity checks', d: String.raw`Sum: \(5 + 2 = 7 = 4 + 3 = \operatorname{tr}\) ✓. Product: \(5\cdot 2 = 10 = 4\cdot 3 - 1\cdot 2 = \det\) ✓.` },
            { t: 'Eigenvector for λ = 5', d: String.raw`Solve \((\boldsymbol{A} - 5\boldsymbol{I})\boldsymbol{v} = \boldsymbol{0}\): $$\begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2\end{pmatrix} = 0 \;\Rightarrow\; v_1 = v_2 \;\Rightarrow\; \boldsymbol{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$$ Check: \(\boldsymbol{A}(1,1)^\top = (5,5)^\top = 5(1,1)^\top\) ✓.` },
            { t: 'Eigenvector for λ = 2', d: String.raw`$$\begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix}\boldsymbol{v} = 0 \;\Rightarrow\; 2v_1 + v_2 = 0 \;\Rightarrow\; \boldsymbol{v}_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$$ Check: \(\boldsymbol{A}(1,-2)^\top = (2, -4)^\top = 2(1,-2)^\top\) ✓.` }
          ],
          answer: String.raw`\(\lambda = 5\) with \((1,1)^\top\); \(\lambda = 2\) with \((1,-2)^\top\). Geometrically: \(\boldsymbol{A}\) stretches the diagonal direction by 5 and the \((1,-2)\) direction by 2 — the whole map, understood.`
        }
      },
      {
        id: 'c3',
        title: 'Diagonalization: A = PΛP⁻¹',
        subtitle: 'the right coordinates make everything easy',
        intuition: String.raw`Collect the eigenvectors as columns of \(\boldsymbol{P}\). In those coordinates, the map \(\boldsymbol{A}\) becomes diagonal — pure axis-by-axis stretching. That is all "diagonalization" means: <b>find the coordinates in which the map is simple</b>. Payoff: computing \(\boldsymbol{A}^{100}\) (needed for Markov chains, population dynamics, repeated network layers) becomes multiplying two eigenvalues instead of 100 matrix products.`,
        math: [
          { h: 'The decomposition', t: String.raw`$$\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1}, \qquad \boldsymbol{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$$ possible iff \(\boldsymbol{A}\) has \(n\) independent eigenvectors. Symmetric matrices always qualify (with \(\boldsymbol{P} = \boldsymbol{Q}\) orthogonal).` },
          { h: 'Powers made trivial', t: String.raw`$$\boldsymbol{A}^k = \boldsymbol{P}\boldsymbol{\Lambda}^k\boldsymbol{P}^{-1}, \qquad \boldsymbol{\Lambda}^k = \operatorname{diag}(\lambda_1^k, \dots, \lambda_n^k)$$ Long-run behavior of any linear dynamical system is governed by the largest \(|\lambda|\) (the spectral radius).` },
          { h: 'Not everything diagonalizes', t: String.raw`$$\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}: \;\lambda = 1 \text{ (algebraic multiplicity 2)}, \text{ but only a 1-D eigenspace} \;\Rightarrow\; \text{no full eigenbasis, not diagonalizable}$$ Shear-like maps lack enough pure-stretch directions.` }
        ],
        ml: String.raw`Analyzing linear recurrent dynamics, convergence of optimization methods (Ch 7: error decays like \(|1 - \eta\lambda|^k\)), and Markov chains all use this. In deep learning theory, linear networks are studied through exactly \(\boldsymbol{W}_2\boldsymbol{W}_1\)-style products and their spectra.`,
        byhand: {
          problem: String.raw`Diagonalize \(\boldsymbol{A} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}\) (eigendata from the previous card), and use it to compute \(\boldsymbol{A}^3\) without multiplying matrices three times.`,
          steps: [
            { t: 'Assemble P and Λ', d: String.raw`$$\boldsymbol{P} = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}, \qquad \boldsymbol{\Lambda} = \begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix}$$ \(\det \boldsymbol{P} = -3 \ne 0\) — eigenvectors are independent ✓.` },
            { t: 'Compute P⁻¹', d: String.raw`$$\boldsymbol{P}^{-1} = \frac{1}{-3}\begin{pmatrix} -2 & -1 \\ -1 & 1 \end{pmatrix} = \frac{1}{3}\begin{pmatrix} 2 & 1 \\ 1 & -1 \end{pmatrix}$$` },
            { t: 'Cube the eigenvalues, not the matrix', d: String.raw`$$\boldsymbol{A}^3 = \boldsymbol{P}\boldsymbol{\Lambda}^3\boldsymbol{P}^{-1} = \begin{pmatrix} 1 & 1 \\ 1 & -2\end{pmatrix}\begin{pmatrix} 125 & 0 \\ 0 & 8 \end{pmatrix}\cdot\frac{1}{3}\begin{pmatrix} 2 & 1 \\ 1 & -1 \end{pmatrix}$$` },
            { t: 'Multiply out', d: String.raw`$$\boldsymbol{P}\boldsymbol{\Lambda}^3 = \begin{pmatrix} 125 & 8 \\ 125 & -16 \end{pmatrix}; \qquad \boldsymbol{A}^3 = \frac{1}{3}\begin{pmatrix} 250+8 & 125-8 \\ 250-16 & 125+16 \end{pmatrix} = \begin{pmatrix} 86 & 39 \\ 78 & 47 \end{pmatrix}$$` },
            { t: 'Spot-check against brute force', d: String.raw`\(\boldsymbol{A}^2 = \begin{pmatrix} 18 & 7 \\ 14 & 11\end{pmatrix}\), \(\boldsymbol{A}^3 = \boldsymbol{A}^2\boldsymbol{A} = \begin{pmatrix} 18\cdot4 + 7\cdot2 & 18 + 21 \\ 56+22 & 14 + 33 \end{pmatrix} = \begin{pmatrix} 86 & 39 \\ 78 & 47 \end{pmatrix}\) ✓.` }
          ],
          answer: String.raw`\(\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1}\) with \(\boldsymbol{P} = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}\), \(\boldsymbol{\Lambda} = \operatorname{diag}(5, 2)\), and \(\boldsymbol{A}^3 = \begin{pmatrix} 86 & 39 \\ 78 & 47 \end{pmatrix}\).`
        }
      },
      {
        id: 'c4',
        title: 'Positive-definite matrices and Cholesky',
        subtitle: 'the anatomy of a covariance',
        intuition: String.raw`A symmetric matrix \(\boldsymbol{A}\) is <b>positive definite</b> (PD) if \(\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} \gt 0\) for every \(\boldsymbol{x} \ne \boldsymbol{0}\) — geometrically, the map \(\boldsymbol{x} \mapsto \boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}\) is a bowl opening upward, with no flat directions. Covariance matrices are (almost) always PD, and quadratic losses are built from PD matrices. The <b>Cholesky decomposition</b> factors a PD matrix as \(\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top\) with \(\boldsymbol{L}\) lower-triangular — like a "square root of a matrix", and it is the standard numerical route to: solving systems with PD matrices, and <b>sampling from Gaussians</b>.`,
        math: [
          { h: 'Positive definite', t: String.raw`$$\boldsymbol{A} = \boldsymbol{A}^\top, \qquad \boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} \gt 0 \;\; \forall \boldsymbol{x} \ne \boldsymbol{0}$$ Equivalent: all eigenvalues \(\gt 0\); all leading pivots \(\gt 0\) (Sylvester's criterion); all Cholesky diagonals \(\gt 0\). Positive <em>semi</em>-definite (PSD, \(\ge 0\)) allows zero directions — every covariance matrix is PSD.` },
          { h: 'Cholesky decomposition', t: String.raw`$$\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top, \qquad \boldsymbol{L} \text{ lower-triangular, positive diagonal}$$ For \(2\times2\), \(\boldsymbol{A} = \begin{pmatrix} a & b \\ b & c \end{pmatrix}\): $$l_{11} = \sqrt{a}, \quad l_{21} = \frac{b}{l_{11}}, \quad l_{22} = \sqrt{c - l_{21}^2}$$ Compare to eigen-decomposition \(\boldsymbol{A} = \boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^\top\): also a "square root", but Cholesky is cheaper (\(\tfrac13 n^3\) vs full eigensolve) and fails loudly if \(\boldsymbol{A}\) is not PD — a built-in sanity check.` }
        ],
        ml: String.raw`Sampling \(\boldsymbol{x} \sim \mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})\): draw \(\boldsymbol{z} \sim \mathcal{N}(\boldsymbol{0}, \boldsymbol{I})\) and set \(\boldsymbol{x} = \boldsymbol{\mu} + \boldsymbol{L}\boldsymbol{z}\) with \(\boldsymbol{L} = \operatorname{chol}(\boldsymbol{\Sigma})\) — this one line powers variational autoencoders, Gaussian processes, and diffusion models. Cholesky also solves \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}\) stably for PD \(\boldsymbol{A}\) (as in the normal equations, Ch 9) and defines the Mahalanobis distance via \(\boldsymbol{L}^{-1}\).`,
        byhand: {
          problem: String.raw`Cholesky-factor $$\boldsymbol{A} = \begin{pmatrix} 4 & 2 \\ 2 & 3 \end{pmatrix}$$ and verify \(\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top\). Then use \(\boldsymbol{L}\) to describe how to sample from \(\mathcal{N}(\boldsymbol{0}, \boldsymbol{A})\).`,
          steps: [
            { t: 'First diagonal entry', d: String.raw`$$l_{11} = \sqrt{a} = \sqrt{4} = 2$$` },
            { t: 'Below-diagonal entry', d: String.raw`$$l_{21} = \frac{b}{l_{11}} = \frac{2}{2} = 1$$` },
            { t: 'Second diagonal entry', d: String.raw`$$l_{22} = \sqrt{c - l_{21}^2} = \sqrt{3 - 1} = \sqrt{2}$$ All diagonal entries came out real and positive — \(\boldsymbol{A}\) is genuinely PD ✓ (its eigenvalues are \(5\) and \(1\), both \(\gt 0\)).` },
            { t: 'Verify', d: String.raw`$$\boldsymbol{L}\boldsymbol{L}^\top = \begin{pmatrix} 2 & 0 \\ 1 & \sqrt{2}\end{pmatrix}\begin{pmatrix} 2 & 1 \\ 0 & \sqrt{2} \end{pmatrix} = \begin{pmatrix} 4 & 2 \\ 2 & 1 + 2 \end{pmatrix} = \begin{pmatrix} 4 & 2 \\ 2 & 3 \end{pmatrix} \;\checkmark$$` },
            { t: 'Sampling recipe', d: String.raw`Draw \(\boldsymbol{z} = (z_1, z_2)^\top\) with independent standard normals, output \(\boldsymbol{x} = \boldsymbol{L}\boldsymbol{z}\). Why it works: \(\operatorname{Cov}(\boldsymbol{L}\boldsymbol{z}) = \boldsymbol{L}\operatorname{Cov}(\boldsymbol{z})\boldsymbol{L}^\top = \boldsymbol{L}\boldsymbol{I}\boldsymbol{L}^\top = \boldsymbol{A}\) ✓ (the covariance algebra is Chapter 6 material).` }
          ],
          answer: String.raw`\(\boldsymbol{L} = \begin{pmatrix} 2 & 0 \\ 1 & \sqrt{2} \end{pmatrix}\), and \(\boldsymbol{x} = \boldsymbol{L}\boldsymbol{z}\) turns white noise into \(\mathcal{N}(\boldsymbol{0}, \boldsymbol{A})\)-distributed samples.`
        }
      },
      {
        id: 'c5',
        title: 'Singular Value Decomposition: the master factorization',
        subtitle: 'A = UΣVᵀ — rotation, stretch, rotation',
        intuition: String.raw`Eigen-decomposition needs a square matrix and (for clean theory) symmetry. The <b>SVD</b> needs nothing: <em>every</em> matrix factors as \(\boldsymbol{A} = \boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top\) — a rotation, then a diagonal stretch (by the <b>singular values</b> \(\sigma_1 \ge \sigma_2 \ge \dots \ge 0\)), then another rotation. Geometrically: any linear map takes the unit sphere to an ellipsoid, and the SVD names the ellipsoid's axes. The number of nonzero singular values is the rank; the biggest singular value is exactly how much the map can stretch anything; and truncating small singular values gives the <b>best possible low-rank approximation</b> — the mathematics of compression.`,
        math: [
          { h: 'The theorem', t: String.raw`$$\boldsymbol{A} = \boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top, \qquad \boldsymbol{U}, \boldsymbol{V} \text{ orthogonal}, \;\; \boldsymbol{\Sigma} \text{ diagonal},\; \sigma_i \ge 0$$ Computed via eigendecompositions of \(\boldsymbol{A}^\top\boldsymbol{A}\) (right singular vectors \(\boldsymbol{v}_i\)) and \(\boldsymbol{A}\boldsymbol{A}^\top\) (left singular vectors \(\boldsymbol{u}_i = \boldsymbol{A}\boldsymbol{v}_i/\sigma_i\)). \( \sigma_i^2 = \) eigenvalues of \(\boldsymbol{A}^\top\boldsymbol{A}\).` },
          { h: 'Four fundamental subspaces', t: String.raw`$$\operatorname{col}(\boldsymbol{A}) = \operatorname{span}\{\boldsymbol{u}_1, \dots, \boldsymbol{u}_r\}, \quad \ker(\boldsymbol{A}) = \operatorname{span}\{\boldsymbol{v}_{r+1}, \dots, \boldsymbol{v}_n\}$$ $$\operatorname{col}(\boldsymbol{A}^\top) = \operatorname{span}\{\boldsymbol{v}_1, \dots, \boldsymbol{v}_r\}, \quad \ker(\boldsymbol{A}^\top) = \operatorname{span}\{\boldsymbol{u}_{r+1}, \dots, \boldsymbol{u}_m\}$$ The SVD hands you orthonormal bases of all four at once; the two kernels are the orthogonal complements of the two images.` },
          { h: 'Eckart–Young: truncation is optimal', t: String.raw`$$\boldsymbol{A}_k = \sum_{i=1}^{k} \sigma_i \boldsymbol{u}_i\boldsymbol{v}_i^\top \quad\text{is the best rank-}k\text{ approximation:} \quad \|\boldsymbol{A} - \boldsymbol{A}_k\| = \sigma_{k+1}$$ No other rank-\(k\) matrix gets closer (in \(\ell_2\) or Frobenius norm). Compression quality is literally readable off the singular value list.` }
        ],
        ml: String.raw`PCA (Ch 10) is the SVD of the centered data matrix — no covariance needed. Latent semantic analysis and matrix completion (Netflix-style recommenders) are low-rank SVD approximations. Whitening and initialization schemes use \(\boldsymbol{U}, \boldsymbol{\Sigma}, \boldsymbol{V}\). The spectral norm \(\sigma_{\max}\) controls stability of training (Lipschitz constants). LoRA fine-tunes LLMs by learning low-rank updates \(\Delta\boldsymbol{W} \approx \boldsymbol{A}\boldsymbol{B}\) — Eckart–Young is why that works.`,
        byhand: {
          problem: String.raw`Compute the full SVD of $$\boldsymbol{A} = \begin{pmatrix} 2 & 2 \\ -1 & 1 \end{pmatrix}$$`,
          steps: [
            { t: 'Form AᵀA and find its eigenvalues', d: String.raw`$$\boldsymbol{A}^\top\boldsymbol{A} = \begin{pmatrix} 5 & 3 \\ 3 & 5 \end{pmatrix}, \qquad \lambda^2 - 10\lambda + 16 = (\lambda - 8)(\lambda - 2)$$ \(\lambda_1 = 8, \lambda_2 = 2 \Rightarrow \sigma_1 = \sqrt{8} = 2\sqrt2, \;\sigma_2 = \sqrt{2}\).` },
            { t: 'Right singular vectors (unit eigenvectors of AᵀA)', d: String.raw`For \(\lambda = 8\): \(-3x + 3y = 0 \Rightarrow \boldsymbol{v}_1 = \frac{1}{\sqrt2}(1, 1)^\top\). For \(\lambda = 2\): \(3x + 3y = 0 \Rightarrow \boldsymbol{v}_2 = \frac{1}{\sqrt2}(1, -1)^\top\). They are orthogonal ✓.` },
            { t: 'Left singular vectors via u = Av/σ', d: String.raw`$$\boldsymbol{u}_1 = \frac{\boldsymbol{A}\boldsymbol{v}_1}{\sigma_1} = \frac{(4/\sqrt2,\, 0)}{2\sqrt2} = (1, 0)^\top, \qquad \boldsymbol{u}_2 = \frac{\boldsymbol{A}\boldsymbol{v}_2}{\sigma_2} = \frac{(0,\, -2/\sqrt2)}{\sqrt2} = (0, -1)^\top$$` },
            { t: 'Assemble and verify', d: String.raw`$$\boldsymbol{A} = \underbrace{\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}}_{\boldsymbol{U}}\underbrace{\begin{pmatrix} 2\sqrt2 & 0 \\ 0 & \sqrt2 \end{pmatrix}}_{\boldsymbol{\Sigma}}\underbrace{\tfrac{1}{\sqrt2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}}_{\boldsymbol{V}^\top}$$ Multiply out: row 1 gives \(2\sqrt2 \cdot \tfrac{1}{\sqrt2}(1,1) = (2,2)\) ✓; row 2 gives \(-\sqrt2\cdot\tfrac{1}{\sqrt2}(1,-1) = (-1, 1)\) ✓.` }
          ],
          answer: String.raw`\(\boldsymbol{A} = \boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top\) with \(\sigma = (2\sqrt2, \sqrt2)\), \(\boldsymbol{V} = \tfrac{1}{\sqrt2}\begin{pmatrix} 1 & 1 \\ 1 & -1\end{pmatrix}\), \(\boldsymbol{U} = \begin{pmatrix} 1 & 0 \\ 0 & -1\end{pmatrix}\). Geometric story: rotate by 45°, stretch by \(2\sqrt2\) and \(\sqrt2\), flip, done.`
        }
      },
      {
        id: 'c6',
        title: 'The pseudoinverse: inverting the un-invertible',
        subtitle: 'solving every Ax = b, even the impossible ones',
        intuition: String.raw`Some matrices have no inverse: too few independent columns (underdetermined — many solutions) or too few independent rows (overdetermined constraints — maybe no solution). The <b>Moore–Penrose pseudoinverse</b> \(\boldsymbol{A}^{+}\) is the universal fix: it always exists and always returns <b>the best answer available</b> — the shortest solution when many exist, and the least-squares-fit solution when none do. Via the SVD it is one line: flip every nonzero singular value, zero the rest.`,
        math: [
          { h: 'Definition via SVD', t: String.raw`$$\boldsymbol{A} = \boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top \;\Rightarrow\; \boldsymbol{A}^{+} = \boldsymbol{V}\boldsymbol{\Sigma}^{+}\boldsymbol{U}^\top, \qquad \boldsymbol{\Sigma}^{+} = \operatorname{diag}\!\left(\tfrac{1}{\sigma_1}, \dots, \tfrac{1}{\sigma_r}, 0, \dots\right)$$ For invertible square \(\boldsymbol{A}\): \(\boldsymbol{A}^{+} = \boldsymbol{A}^{-1}\) — the pseudoinverse generalizes the inverse.` },
          { h: 'What it solves', t: String.raw`$$\hat{\boldsymbol{x}} = \boldsymbol{A}^{+}\boldsymbol{b}$$ If solutions exist: \(\hat{\boldsymbol{x}}\) is the <b>minimum-norm</b> one (it has zero component in \(\ker\boldsymbol{A}\)). If none exist: \(\hat{\boldsymbol{x}}\) minimizes \(\|\boldsymbol{A}\boldsymbol{x} - \boldsymbol{b}\|\) (least squares!) and among those has minimal norm. One formula, both regimes — the reason Ch 9's normal equations work even for singular \(\boldsymbol{X}^\top\boldsymbol{X}\).` }
        ],
        ml: String.raw`Ridge regression is \((\boldsymbol{X}^\top\boldsymbol{X} + \lambda\boldsymbol{I})^{-1}\) — a <em>regularized</em> stand-in for the pseudoinverse that avoids singular directions entirely. Linear models with collinear features, ill-posed inverse problems (deblurring, tomography), and the theory of over-parameterized networks all live on pseudoinverse reasoning.`,
        byhand: {
          problem: String.raw`Using the SVD, compute the pseudoinverse of the rank-1 matrix $$\boldsymbol{A} = \begin{pmatrix} 0 & 2 \\ 0 & 0 \\ 0 & 0 \end{pmatrix}$$ and verify that \(\hat{\boldsymbol{x}} = \boldsymbol{A}^{+}\boldsymbol{b}\) with \(\boldsymbol{b} = (2, 0, 0)^\top\) is the minimum-norm solution of \(\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}\).`,
          steps: [
            { t: 'SVD of A', d: String.raw`\(\boldsymbol{A}^\top\boldsymbol{A} = \begin{pmatrix} 0 & 0 \\ 0 & 4 \end{pmatrix}\): eigenvalues \(4, 0\) ⟹ \(\sigma_1 = 2\), \(\boldsymbol{v}_1 = (0,1)^\top\), \(\boldsymbol{u}_1 = \boldsymbol{A}\boldsymbol{v}_1/2 = (1, 0, 0)^\top\). So \(\boldsymbol{A} = 2\,\boldsymbol{u}_1\boldsymbol{v}_1^\top = \boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top\) with rank \(r = 1\).` },
            { t: 'Flip the nonzero singular value', d: String.raw`$$\boldsymbol{A}^{+} = \boldsymbol{V}\boldsymbol{\Sigma}^{+}\boldsymbol{U}^\top = \frac{1}{2}\,\boldsymbol{v}_1\boldsymbol{u}_1^\top = \frac{1}{2}\begin{pmatrix} 0 \\ 1 \end{pmatrix}\begin{pmatrix} 1 & 0 & 0 \end{pmatrix} = \begin{pmatrix} 0 & 0 & 0 \\ \tfrac12 & 0 & 0 \end{pmatrix}$$` },
            { t: 'Apply to b', d: String.raw`$$\hat{\boldsymbol{x}} = \boldsymbol{A}^{+}\boldsymbol{b} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} \quad\text{(since only the } \tfrac12 \cdot 2 = 1 \text{ entry survives)}$$` },
            { t: 'Verify: solves Ax = b and has minimal norm', d: String.raw`\(\boldsymbol{A}(0,1)^\top = (2, 0, 0)^\top = \boldsymbol{b}\) ✓. All solutions look like \((t, 1)^\top\) (\(t\) is free — \(\ker\boldsymbol{A} = \operatorname{span}\{(1,0)\}\)), norm \(\sqrt{t^2 + 1}\) minimized at \(t = 0\) ✓. The pseudoinverse automatically killed the kernel direction.` }
          ],
          answer: String.raw`\(\boldsymbol{A}^{+} = \begin{pmatrix} 0 & 0 & 0 \\ \tfrac12 & 0 & 0 \end{pmatrix}\), \(\hat{\boldsymbol{x}} = (0, 1)^\top\): exact, and the shortest possible, solution.`
        }
      }
    ],
    cheatsheet: [
      { n: 'Determinant facts', t: String.raw`$$\det(\boldsymbol{A}\boldsymbol{B}) = \det\boldsymbol{A}\det\boldsymbol{B},\quad \det\boldsymbol{A} = \textstyle\prod\lambda_i,\quad \operatorname{tr}\boldsymbol{A} = \textstyle\sum\lambda_i$$` },
      { n: 'Characteristic polynomial', t: String.raw`$$p(\lambda) = \det(\boldsymbol{A} - \lambda\boldsymbol{I}) = 0$$` },
      { n: 'Spectral theorem (symmetric)', t: String.raw`$$\boldsymbol{A} = \boldsymbol{A}^\top \Rightarrow \boldsymbol{A} = \boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^\top, \quad \boldsymbol{Q}^\top\boldsymbol{Q} = \boldsymbol{I},\; \lambda_i \in \mathbb{R}$$` },
      { n: 'Diagonalization', t: String.raw`$$\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1} \;\Rightarrow\; \boldsymbol{A}^k = \boldsymbol{P}\boldsymbol{\Lambda}^k\boldsymbol{P}^{-1}$$` },
      { n: 'Cholesky (A ⪰ 0)', t: String.raw`$$\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top, \quad \boldsymbol{L}\text{ lower-triangular}; \quad \text{sample } \mathcal{N}(\boldsymbol{\mu},\boldsymbol{\Sigma}): \boldsymbol{x} = \boldsymbol{\mu} + \boldsymbol{L}\boldsymbol{z}$$` },
      { n: 'SVD', t: String.raw`$$\boldsymbol{A} = \boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top,\; \sigma_i^2 = \lambda_i(\boldsymbol{A}^\top\boldsymbol{A}); \quad \boldsymbol{A}_k = \textstyle\sum_{i \le k}\sigma_i\boldsymbol{u}_i\boldsymbol{v}_i^\top \text{ is the best rank-}k$$` },
      { n: 'Pseudoinverse', t: String.raw`$$\boldsymbol{A}^{+} = \boldsymbol{V}\boldsymbol{\Sigma}^{+}\boldsymbol{U}^\top, \qquad \hat{\boldsymbol{x}} = \boldsymbol{A}^{+}\boldsymbol{b}: \text{ min-norm / least-squares solution}$$` }
    ],
    practice: [
      {
        q: String.raw`Find the eigenvalues and eigenvectors of the symmetric matrix $$\boldsymbol{A} = \begin{pmatrix} 5 & -2 \\ -2 & 2 \end{pmatrix}$$ and verify that the eigenvectors are orthogonal.`,
        diff: 'easy',
        s: [
          String.raw`\(\det(\boldsymbol{A} - \lambda\boldsymbol{I}) = (5-\lambda)(2-\lambda) - 4 = \lambda^2 - 7\lambda + 6 = (\lambda - 1)(\lambda - 6)\): \(\lambda = 6, 1\). Checks: sum \(7 = \operatorname{tr}\) ✓, product \(6 = 10 - 4 = \det\) ✓.`,
          String.raw`\(\lambda = 6\): \((\boldsymbol{A} - 6\boldsymbol{I})\boldsymbol{v} = \boldsymbol{0} \Rightarrow -v_1 - 2v_2 = 0 \Rightarrow \boldsymbol{v}_1 = (-2, 1)^\top\). Check: \(\boldsymbol{A}(-2,1)^\top = (-12, 6)^\top = 6(-2,1)^\top\) ✓.`,
          String.raw`\(\lambda = 1\): \(4v_1 - 2v_2 = 0 \Rightarrow \boldsymbol{v}_2 = (1, 2)^\top\). Check: \(\boldsymbol{A}(1,2)^\top = (1,2)^\top\) ✓.`,
          String.raw`Orthogonality: \((-2)(1) + (1)(2) = 0\) ✓ — guaranteed by the spectral theorem for symmetric matrices.`
        ],
        fin: String.raw`\(\lambda = 6\) with \((-2,1)^\top\); \(\lambda = 1\) with \((1,2)^\top\); orthogonal, as the spectral theorem promises.`
      },
      {
        q: String.raw`Show that \(\boldsymbol{B} = \begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}\) is <b>not</b> diagonalizable, and explain in words what its action on the plane looks like.`,
        diff: 'med',
        s: [
          String.raw`Characteristic polynomial: \((2-\lambda)^2 = 0\): single eigenvalue \(\lambda = 2\) with algebraic multiplicity 2.`,
          String.raw`Eigenspace: \(\boldsymbol{B} - 2\boldsymbol{I} = \begin{pmatrix} 0 & 1 \\ 0 & 0\end{pmatrix}\) forces \(v_2 = 0\): eigenspace \(= \operatorname{span}\{(1,0)\}\), dimension 1 \(\lt 2\). Geometric multiplicity \(\lt\) algebraic multiplicity ⟹ not diagonalizable.`,
          String.raw`\(\boldsymbol{B} = 2\boldsymbol{I} + \boldsymbol{N}\) with nilpotent \(\boldsymbol{N} = \begin{pmatrix} 0 & 1 \\ 0 & 0\end{pmatrix}\), \(\boldsymbol{N}^2 = \boldsymbol{0}\). The map: stretch everything by 2 <em>and</em> shear.`
        ],
        fin: String.raw`Not diagonalizable: it has a stretch plus an unavoidable shear component (\(\boldsymbol{N}\)), which no change of basis can remove.`
      },
      {
        q: String.raw`Cholesky-factor \(\boldsymbol{A} = \begin{pmatrix} 9 & 3 \\ 3 & 5 \end{pmatrix}\) and state what it means that both diagonal entries of \(\boldsymbol{L}\) came out positive.`,
        diff: 'easy',
        s: [
          String.raw`\(l_{11} = \sqrt{9} = 3\); \(l_{21} = 3/3 = 1\); \(l_{22} = \sqrt{5 - 1} = 2\).`,
          String.raw`\(\boldsymbol{L} = \begin{pmatrix} 3 & 0 \\ 1 & 2 \end{pmatrix}\). Verify: \(\boldsymbol{L}\boldsymbol{L}^\top = \begin{pmatrix} 9 & 3 \\ 3 & 1 + 4 \end{pmatrix}\) ✓.`,
          String.raw`All pivots positive ⟹ \(\boldsymbol{A}\) is positive definite (eigenvalues \(10\) and \(4\), indeed both \(\gt 0\)). Had \(c - l_{21}^2 \lt 0\), Cholesky would have failed — the certificate of non-PD-ness.`
        ],
        fin: String.raw`\(\boldsymbol{L} = \begin{pmatrix} 3 & 0 \\ 1 & 2 \end{pmatrix}\); positive diagonals ⟺ positive definite ⟺ safe to use as a covariance.`
      },
      {
        q: String.raw`Compute the SVD of \(\boldsymbol{A} = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}\) two ways: by inspection, and via \(\boldsymbol{A}^\top\boldsymbol{A}\). What is \(\boldsymbol{A}_1\) (the best rank-1 approximation) and \(\|\boldsymbol{A} - \boldsymbol{A}_1\|_2\)?`,
        diff: 'med',
        s: [
          String.raw`By inspection: already diagonal with nonnegative entries, so \(\boldsymbol{U} = \boldsymbol{V} = \boldsymbol{I}\), \(\boldsymbol{\Sigma} = \operatorname{diag}(3, 2)\) — singular values \(3, 2\). (Singular values are sorted: \(3 \ge 2\) ✓.)`,
          String.raw`Via \(\boldsymbol{A}^\top\boldsymbol{A} = \operatorname{diag}(9, 4)\): eigenvalues \(9, 4\), so \(\sigma = \sqrt{9}, \sqrt{4} = 3, 2\) ✓ consistent.`,
          String.raw`\(\boldsymbol{A}_1 = 3\,\boldsymbol{u}_1\boldsymbol{v}_1^\top = \begin{pmatrix} 3 & 0 \\ 0 & 0 \end{pmatrix}\); \(\|\boldsymbol{A} - \boldsymbol{A}_1\|_2 = \sigma_2 = 2\).`
        ],
        fin: String.raw`\(\boldsymbol{A}_1 = \operatorname{diag}(3, 0)\), error \(= \sigma_2 = 2\) (Eckart–Young). Dropping a singular value of size \(\sigma\) costs you exactly \(\sigma\) in error.`
      },
      {
        q: String.raw`(Proof) Show that for a symmetric matrix, eigenvectors belonging to <em>distinct</em> eigenvalues are orthogonal. (This is the engine inside the spectral theorem.)`,
        diff: 'hard',
        s: [
          String.raw`Let \(\boldsymbol{A}\boldsymbol{v} = \lambda\boldsymbol{v}\), \(\boldsymbol{A}\boldsymbol{w} = \mu\boldsymbol{w}\), \(\lambda \ne \mu\), \(\boldsymbol{A} = \boldsymbol{A}^\top\).`,
          String.raw`Two ways to compute \(\boldsymbol{v}^\top\boldsymbol{A}\boldsymbol{w}\): using symmetry first, \(\boldsymbol{v}^\top\boldsymbol{A}\boldsymbol{w} = (\boldsymbol{A}\boldsymbol{v})^\top\boldsymbol{w} = \lambda\,\boldsymbol{v}^\top\boldsymbol{w}\); using the second eigen-equation, \(= \mu\,\boldsymbol{v}^\top\boldsymbol{w}\).`,
          String.raw`So \((\lambda - \mu)\,\boldsymbol{v}^\top\boldsymbol{w} = 0\), and since \(\lambda \ne \mu\): \(\boldsymbol{v}^\top\boldsymbol{w} = 0\). ∎`
        ],
        fin: String.raw`One symmetric swap of \(\boldsymbol{A}\) between the two equations forces orthogonality. This three-line argument appears in dozens of research proofs — own it.`
      }
    ]
  });
})();
