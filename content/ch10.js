/* Chapter 10 — Dimensionality Reduction with PCA */
(function () {
  MML.chapters.push({
    id: 'ch10', num: 10, icon: '🗜️',
    title: 'Dimensionality Reduction with PCA',
    tagline: 'Principal Component Analysis: finding the data\u2019s true axes. Eigendecomposition of a covariance — the course\u2019s threads tied in one bow.',
    why: String.raw`Real data has thousands of dimensions but lives near a much smaller one: 28×28 pixels move on a low-dimensional manifold of "handwritten strokes". <b>PCA</b> finds the best linear summary: the directions along which the data varies most. It is simultaneously a compression algorithm, a decorrelator, a visualizer, and a preprocessing step — and mathematically it is nothing but the eigen-decomposition of a covariance matrix (Ch 4) computed from data (Ch 6), justified by projections (Ch 3) and a Lagrange multiplier (Ch 7). If you want one proof that the whole course is one machine, it is this chapter.`,
    goals: [
      String.raw`Run the full PCA pipeline by hand on a small dataset: center → covariance → eigenvectors → project.`,
      String.raw`State the two equivalent objectives (max variance / min reconstruction error).`,
      String.raw`Choose the number of components via explained variance.`,
      String.raw`Connect PCA to the SVD and to probabilistic latent-variable models.`
    ],
    widget: 'pca',
    concepts: [
      {
        id: 'c1',
        title: 'Two objectives, one answer',
        subtitle: 'maximum variance ⇔ minimum reconstruction error',
        intuition: String.raw`Stand in a room full of balloons stretched along some diagonal plane. Asked to describe each balloon's position with a single number, which axis do you choose? The one <b>along which the balloons spread out most</b> — otherwise all your numbers would be nearly identical and useless. That is the maximum-variance view. The reconstruction view says the same thing backwards: choose the line that, after squashing points onto it, leaves the <b>least total leftover distance</b>. Amazingly these two selfish criteria pick the identical direction — and, recursively, the whole nested sequence of principal components.`,
        math: [
          { h: 'Setup', t: String.raw`Data \(\boldsymbol{x}_1, \dots, \boldsymbol{x}_n \in \mathbb{R}^d\), centered (\(\sum_i \boldsymbol{x}_i = \boldsymbol{0}\)). Find unit direction \(\boldsymbol{u}\) maximizing $$\frac{1}{n}\sum_i (\boldsymbol{u}^\top\boldsymbol{x}_i)^2 = \boldsymbol{u}^\top \underbrace{\Big(\tfrac1n\textstyle\sum_i \boldsymbol{x}_i\boldsymbol{x}_i^\top\Big)}_{\boldsymbol{\Sigma}} \boldsymbol{u} \quad \text{s.t.} \quad \|\boldsymbol{u}\| = 1$$` },
          { h: 'Lagrange multiplier solves it (Ch 7!)', t: String.raw`$$\mathcal{L}(\boldsymbol{u}, \lambda) = \boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u} - \lambda(\boldsymbol{u}^\top\boldsymbol{u} - 1) \;\Rightarrow\; \nabla_u: \; 2\boldsymbol{\Sigma}\boldsymbol{u} - 2\lambda\boldsymbol{u} = 0 \;\Rightarrow\; \boldsymbol{\Sigma}\boldsymbol{u} = \lambda\boldsymbol{u}$$ The optimal direction is an <b>eigenvector</b> of the covariance; plugging back, the variance achieved is exactly the eigenvalue: $$\boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u} = \lambda$$ So: best direction = top eigenvector; best achievable variance = top eigenvalue.` },
          { h: 'Equivalence of the two views', t: String.raw`Reconstruction error with projection onto span\(\{\boldsymbol{u}\}\): $$\frac1n\sum_i \|\boldsymbol{x}_i - (\boldsymbol{u}^\top\boldsymbol{x}_i)\boldsymbol{u}\|^2 = \operatorname{tr}(\boldsymbol{\Sigma}) - \boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u}$$ (Pythagoras). Minimizing the error ⇔ maximizing the variance: same eigenvector. For a \(k\)-dim subspace: best error \(= \sum_{j > k} \lambda_j\) — the dropped eigenvalues, exactly.` }
        ],
        ml: String.raw`PCA is the classical preprocessing of computer vision and genomics (top PCs remove batch effects), the standard 2-D visualization of embeddings, the initialization for factor models, and the "classical machine learning" half of every ML course. Its Lagrange derivation is also the template for spectral clustering and CCA.`,
        byhand: {
          problem: String.raw`Derive (no numbers) why the sum of the reconstruction errors equals \(\operatorname{tr}(\boldsymbol{\Sigma}) - \boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u}\), using Pythagoras and orthonormality.`,
          steps: [
            { t: 'Decompose each point', d: String.raw`\(\boldsymbol{x}_i = \underbrace{(\boldsymbol{u}^\top\boldsymbol{x}_i)\boldsymbol{u}}_{\text{projection}} + \underbrace{\boldsymbol{x}_i - (\boldsymbol{u}^\top\boldsymbol{x}_i)\boldsymbol{u}}_{\text{residual}}\), and the two parts are orthogonal (\(\boldsymbol{u}^\top(\boldsymbol{x}_i - (\boldsymbol{u}^\top\boldsymbol{x}_i)\boldsymbol{u}) = \boldsymbol{u}^\top\boldsymbol{x}_i - \boldsymbol{u}^\top\boldsymbol{x}_i = 0\)).` },
            { t: 'Pythagoras per point', d: String.raw`$$\|\boldsymbol{x}_i\|^2 = (\boldsymbol{u}^\top\boldsymbol{x}_i)^2 + \|\boldsymbol{x}_i - (\boldsymbol{u}^\top\boldsymbol{x}_i)\boldsymbol{u}\|^2$$` },
            { t: 'Average over the dataset', d: String.raw`$$\underbrace{\tfrac1n\textstyle\sum_i \|\boldsymbol{x}_i\|^2}_{\operatorname{tr}\boldsymbol{\Sigma}} = \underbrace{\tfrac1n\sum_i (\boldsymbol{u}^\top\boldsymbol{x}_i)^2}_{\boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u},\; \text{kept variance}} + \underbrace{\tfrac1n\sum_i \|\text{residual}_i\|^2}_{\text{reconstruction error}}$$` },
            { t: 'Read off the trade', d: String.raw`Total variance is fixed (\(\operatorname{tr}\boldsymbol{\Sigma}\)); every unit of variance you keep is a unit of error you delete. Maximizing kept variance and minimizing error are literally the same equation rearranged. ∎` }
          ],
          answer: String.raw`Error \(= \operatorname{tr}\boldsymbol{\Sigma} - \boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u}\): the two PCA objectives are the same statement. Orthogonality (Ch 3) is the entire proof.`
        }
      },
      {
        id: 'c2',
        title: 'The algorithm, executed by hand',
        subtitle: 'center → covariance → eigendecompose → project',
        intuition: String.raw`Four steps, no black boxes. (1) <b>Center</b>: subtract the mean — PCA measures spread around the center. (2) <b>Covariance</b>: summarize how the features co-vary. (3) <b>Eigendecompose</b>: the eigenvectors of \(\boldsymbol{\Sigma}\) are the principal directions; eigenvalues are the variances along them. (4) <b>Project</b>: coordinates along the top eigenvectors are your new, smaller representation. You can do all four on paper for a small dataset — and below, we will, end to end.`,
        math: [
          { h: 'The pipeline', t: String.raw`$$\boldsymbol{x}_i \;\xrightarrow{\text{center}}\; \tilde{\boldsymbol{x}}_i = \boldsymbol{x}_i - \boldsymbol{\mu} \;\xrightarrow{\text{covariance}}\; \boldsymbol{\Sigma} = \tfrac1n\textstyle\sum_i \tilde{\boldsymbol{x}}_i\tilde{\boldsymbol{x}}_i^\top \;\xrightarrow{\text{eigen}}\; \boldsymbol{\Sigma} = \boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^\top \;\xrightarrow{\text{project}}\; z_i = \boldsymbol{q}_1^\top\tilde{\boldsymbol{x}}_i$$ Reconstruction: \(\hat{\boldsymbol{x}}_i = \boldsymbol{\mu} + z_i\,\boldsymbol{q}_1\) (one component) or \(\boldsymbol{\mu} + \boldsymbol{Q}_k\boldsymbol{z}_i\) (\(k\) components).` }
        ],
        ml: String.raw`In code this is 4 lines with a linear-algebra library; in scikit-learn it is one call. But doing it by hand once makes the "components are eigenvectors" statement physical rather than incantation. Note the practical details professionals care about: centering is mandatory; scale features first if units differ (PCA is not scale-invariant); divide by \(n\) or \(n-1\) — eigen-directions don't care, explained-variance ratios don't either.`,
        byhand: {
          problem: String.raw`Full PCA on \(\mathcal{D} = \{(1,1), (2,3), (3,2)\}\) (the dataset from Chapter 6). Find the principal component, the projected (1-D) coordinates, the reconstructions, and verify the total reconstruction error equals \(n\lambda_2\).`,
          steps: [
            { t: 'Step 1 — center', d: String.raw`\(\boldsymbol{\mu} = (2, 2)^\top\). Deviations: \(\tilde{\boldsymbol{x}}_1 = (-1,-1)^\top\), \(\tilde{\boldsymbol{x}}_2 = (0,1)^\top\), \(\tilde{\boldsymbol{x}}_3 = (1,0)^\top\).` },
            { t: 'Step 2 — covariance (from Chapter 6)', d: String.raw`$$\boldsymbol{\Sigma} = \frac{1}{3}\sum_i \tilde{\boldsymbol{x}}_i\tilde{\boldsymbol{x}}_i^\top = \begin{pmatrix} 2/3 & 1/3 \\ 1/3 & 2/3 \end{pmatrix}$$` },
            { t: 'Step 3 — eigendecompose', d: String.raw`Characteristic polynomial: \(\lambda^2 - \tfrac43\lambda + \tfrac13 = 0 \Rightarrow \lambda_1 = 1,\; \lambda_2 = \tfrac13\). Eigenvectors: \(\boldsymbol{q}_1 = \tfrac{1}{\sqrt2}(1,1)^\top\), \(\boldsymbol{q}_2 = \tfrac{1}{\sqrt2}(1,-1)^\top\) (orthogonal ✓). ` },
            { t: 'Step 4 — project (coordinates along q₁)', d: String.raw`$$z_1 = \boldsymbol{q}_1^\top\tilde{\boldsymbol{x}}_1 = \tfrac{1}{\sqrt2}(-2) = -\sqrt2, \qquad z_2 = \tfrac{1}{\sqrt2}, \qquad z_3 = \tfrac{1}{\sqrt2}$$ The three 2-D points are now three scalars — compressed 2×1.` },
            { t: 'Check: variance of the z\u2019s = λ₁', d: String.raw`Mean of \(z\): \((-\sqrt2 + \tfrac1{\sqrt2} + \tfrac1{\sqrt2})/3 = 0\) ✓ (centered data ⟹ centered coordinates). Variance: \(\frac{1}{3}\big[2 + \tfrac12 + \tfrac12\big] = 1 = \lambda_1\) ✓. Projected variance always equals the eigenvalue.` },
            { t: 'Reconstruct and measure the error', d: String.raw`\(\hat{\boldsymbol{x}}_i = \boldsymbol{\mu} + z_i\boldsymbol{q}_1\): \(\hat{\boldsymbol{x}}_1 = (2,2) - (1,1) = (1,1)\) (error 0 — that point lies on the line \(y = x\)!); \(\hat{\boldsymbol{x}}_2 = (2.5, 2.5)\) (error \(\|\,(0.5, -0.5)\,\|^2 = 0.5\)); \(\hat{\boldsymbol{x}}_3 = (2.5, 2.5)\) (error \(0.5\)). $$\text{total error} = 0 + 0.5 + 0.5 = 1 = n\,\lambda_2 = 3 \times \tfrac13 \;\checkmark$$ The Eckart–Young promise (Ch 4), verified by hand: the error of dropping a component is exactly its eigenvalue, times \(n\).` }
          ],
          answer: String.raw`PC1 \(= (1,1)/\sqrt2\) with \(\lambda_1 = 1\) (75% of variance); 1-D coordinates \((-\sqrt2, \tfrac1{\sqrt2}, \tfrac1{\sqrt2})\); reconstruction error \(1 = n\lambda_2\). You have now executed PCA with nothing but a pen.`
        }
      },
      {
        id: 'c3',
        title: 'How many components? The SVD view and explained variance',
        subtitle: 'data compression with a receipts',
        intuition: String.raw`PCA must decide where to stop: keep 5 components? 50? The honest answer is a <b>budget report</b>: each eigenvalue is a receipt stating how much variance that component holds. Sum the top \(k\) eigenvalues, divide by the total, and you have "the fraction of the data's variation your \(k\)-D summary preserves". Plot this number against \(k\) (a <b>scree plot</b>) and look for the elbow. Equally practical: PCA is just the <b>SVD of the centered data matrix</b> — the singular values squared (over \(n\)) are the eigenvalues, so the same rank-truncation theory from Chapter 4 applies verbatim.`,
        math: [
          { h: 'PCA = SVD of the centered data matrix', t: String.raw`Stack centered data as rows: \(\tilde{\boldsymbol{X}} \in \mathbb{R}^{n \times d}\). Then \(\boldsymbol{\Sigma} = \tfrac1n\tilde{\boldsymbol{X}}^\top\tilde{\boldsymbol{X}}\), and if \(\tilde{\boldsymbol{X}} = \boldsymbol{U}\boldsymbol{\Sigma}_{s}\boldsymbol{V}^\top\) (SVD): $$\boldsymbol{\Sigma} = \tfrac1n\boldsymbol{V}\boldsymbol{\Sigma}_s^2\boldsymbol{V}^\top \;\Rightarrow\; \boldsymbol{q}_j = \boldsymbol{v}_j, \quad \lambda_j = \tfrac{\sigma_j^2}{n}$$ Right singular vectors = principal directions. Computing the SVD directly is numerically the best route (avoids forming \(\boldsymbol{X}^\top\boldsymbol{X}\)).` },
          { h: 'Explained variance ratio', t: String.raw`$$\text{EVR}(k) = \frac{\sum_{j \le k} \lambda_j}{\sum_j \lambda_j} = \frac{\text{variance kept}}{\text{total variance}}, \qquad \text{reconstruction error} = \sum_{j > k}\lambda_j \;(\times n)$$ Rules of thumb: keep 90–99% of variance; or stop where the scree plot elbows; or cross-validate the downstream task.` }
        ],
        ml: String.raw`"PCA to 50 dims then train the classifier" is a classical pipeline (and a defense against the curse of dimensionality). Eigenvalue spectra of data matrices guide everything from recommenders (how many latent factors?) to neural network compression. Whitening = PCA + rescaling by \(1/\sqrt{\lambda}\): coordinates become unit-variance and uncorrelated — the standard preprocessing before ICA and in GAN/flow training.`,
        byhand: {
          problem: String.raw`A dataset's covariance has eigenvalues \(\lambda = (4, 2, 1)\). (a) What fraction of variance do the top 2 components keep? (b) What is the (per-point) reconstruction error of the 2-D PCA? (c) What would perfect whitening transform the covariance into?`,
          steps: [
            { t: '(a) Explained variance', d: String.raw`$$\text{EVR}(2) = \frac{4 + 2}{4 + 2 + 1} = \frac67 \approx 85.7\%$$` },
            { t: '(b) Error of the 2-D summary', d: String.raw`$$\sum_{j > 2}\lambda_j = \lambda_3 = 1 \quad \text{(per point, since } \tfrac1n\sum_i\|\tilde{\boldsymbol{x}}_i - \hat{\boldsymbol{x}}_i\|^2 = \sum_{j>k}\lambda_j\text{)}$$` },
            { t: '(c) Whitening', d: String.raw`Whiten: \(\boldsymbol{z} = \boldsymbol{\Lambda}^{-1/2}\boldsymbol{Q}^\top(\boldsymbol{x} - \boldsymbol{\mu})\). Covariance becomes $$\operatorname{Cov}(\boldsymbol{z}) = \boldsymbol{\Lambda}^{-1/2}\boldsymbol{Q}^\top\boldsymbol{\Sigma}\boldsymbol{Q}\boldsymbol{\Lambda}^{-1/2} = \boldsymbol{\Lambda}^{-1/2}\boldsymbol{\Lambda}\boldsymbol{\Lambda}^{-1/2} = \boldsymbol{I}$$ Uncorrelated coordinates, each with variance 1.` }
          ],
          answer: String.raw`(a) \(6/7 \approx 85.7\%\); (b) \(1\) per point; (c) \(\operatorname{Cov} = \boldsymbol{I}\). PCA compresses; whitening also standardizes — two dials on the same eigendecomposition.`
        }
      },
      {
        id: 'c4',
        title: 'Probabilistic PCA: a latent-variable story',
        subtitle: 'the bridge to EM and latent models',
        intuition: String.raw`PCA can be retold as a <b>generative story</b>: nature picks a hidden coordinate \(z\) (low-dimensional), maps it through a matrix \(\boldsymbol{W}\) to high-dimensional space, and adds small Gaussian noise. The observed high-dimensional data is thus a noisy shadow of a low-dimensional cause. Fitting this model by maximum likelihood recovers PCA (with \(\boldsymbol{W}\) spanning the principal subspace) — but the probabilistic frame buys more: missing-data handling, mixtures of PCAs, and the EM algorithm (Chapter 11) as the fitting engine. Same geometry, new superpowers.`,
        math: [
          { h: 'The generative model', t: String.raw`$$\boldsymbol{z} \sim \mathcal{N}(\boldsymbol{0}, \boldsymbol{I}_k), \qquad \boldsymbol{x} = \boldsymbol{W}\boldsymbol{z} + \boldsymbol{\mu} + \boldsymbol{\varepsilon}, \qquad \boldsymbol{\varepsilon} \sim \mathcal{N}(\boldsymbol{0}, \sigma^2\boldsymbol{I})$$ Marginal: \(p(\boldsymbol{x}) = \mathcal{N}(\boldsymbol{\mu}, \boldsymbol{W}\boldsymbol{W}^\top + \sigma^2\boldsymbol{I})\) — a Gaussian whose covariance has rank \(k\) plus isotropic noise.` },
          { h: 'Posterior over the latent code', t: String.raw`$$p(\boldsymbol{z} \mid \boldsymbol{x}) = \mathcal{N}(\boldsymbol{M}^{-1}\boldsymbol{W}^\top(\boldsymbol{x} - \boldsymbol{\mu}),\; \sigma^2\boldsymbol{M}^{-1}), \qquad \boldsymbol{M} = \boldsymbol{W}^\top\boldsymbol{W} + \sigma^2\boldsymbol{I}$$ The MAP latent code is (as \(\sigma^2 \to 0\)) exactly the PCA projection — inference in the model degenerates gracefully into the algorithm you already know.` }
        ],
        ml: String.raw`This is the conceptual ancestor of the <b>variational autoencoder</b>: encoder ≈ approximate posterior over \(z\), decoder ≈ \(\boldsymbol{W}\), reconstruction + KL ≈ the ELBO. Probabilistic PCA handles missing entries naturally (EM over the missing coordinates), extends to mixtures (clusters with their own subspaces) and to factor analysis (non-isotropic noise). When research papers discuss identifiability of latent spaces, this is the clean base case.`,
        byhand: {
          problem: String.raw`In the noiseless limit \(\sigma^2 \to 0\), show that the latent code maximizing \(p(\boldsymbol{z} \mid \boldsymbol{x})\) for \(\boldsymbol{x} = \boldsymbol{W}\boldsymbol{z} + \boldsymbol{\mu}\) (with \(\boldsymbol{W}\) orthonormal, \(k = 1\), \(\boldsymbol{W} = \boldsymbol{u}\)) is the PCA projection \(z^\star = \boldsymbol{u}^\top(\boldsymbol{x} - \boldsymbol{\mu})\).`,
          steps: [
            { t: 'Set up the least-squares reading', d: String.raw`With \(\sigma^2 \to 0\), the posterior concentrates on codes that reproduce \(\boldsymbol{x}\) exactly: minimize \(\|(\boldsymbol{x} - \boldsymbol{\mu}) - \boldsymbol{u}z\|^2\) over \(z\) — the projection problem of Chapter 3.` },
            { t: 'Solve the 1-D least squares', d: String.raw`$$\frac{d}{dz}\big[\|\tilde{\boldsymbol{x}}\|^2 - 2z\,\boldsymbol{u}^\top\tilde{\boldsymbol{x}} + z^2\big] = -2\boldsymbol{u}^\top\tilde{\boldsymbol{x}} + 2z = 0 \;\Rightarrow\; z^\star = \boldsymbol{u}^\top\tilde{\boldsymbol{x}}$$` },
            { t: 'Recognize it', d: String.raw`\(\boldsymbol{u}^\top(\boldsymbol{x} - \boldsymbol{\mu})\) is exactly the PCA coordinate from c2. The probabilistic model's best explanation of the data <em>is</em> the projection. (With \(\sigma^2 \gt 0\), the optimum shrinks slightly: \(\frac{\boldsymbol{u}^\top\tilde{\boldsymbol{x}}}{1 + \sigma^2}\) for orthonormal single-\(\boldsymbol{u}\) — regularization from noise.)` }
          ],
          answer: String.raw`\(z^\star = \boldsymbol{u}^\top(\boldsymbol{x}-\boldsymbol{\mu})\): probabilistic PCA's posterior mode = the PCA projection. Latent-variable models and geometric PCA are one continuum.`
        }
      }
    ],
    cheatsheet: [
      { n: 'PCA pipeline', t: String.raw`$$\tilde{\boldsymbol{x}}_i = \boldsymbol{x}_i - \boldsymbol{\mu}; \quad \boldsymbol{\Sigma} = \tfrac1n\textstyle\sum\tilde{\boldsymbol{x}}_i\tilde{\boldsymbol{x}}_i^\top; \quad \boldsymbol{\Sigma}\boldsymbol{q}_j = \lambda_j\boldsymbol{q}_j; \quad z_{ij} = \boldsymbol{q}_j^\top\tilde{\boldsymbol{x}}_i$$` },
      { n: 'Variance = eigenvalue', t: String.raw`$$\operatorname{Var}(z_{\cdot j}) = \lambda_j; \qquad \text{EVR}(k) = \frac{\sum_{j\le k}\lambda_j}{\sum_j \lambda_j}$$` },
      { n: 'Reconstruction error', t: String.raw`$$\tfrac1n\textstyle\sum_i\|\tilde{\boldsymbol{x}}_i - \hat{\boldsymbol{x}}_i\|^2 = \sum_{j > k}\lambda_j$$` },
      { n: 'SVD route', t: String.raw`$$\tilde{\boldsymbol{X}} = \boldsymbol{U}\boldsymbol{\Sigma}_s\boldsymbol{V}^\top \Rightarrow \lambda_j = \sigma_j^2/n,\; \boldsymbol{q}_j = \boldsymbol{v}_j$$` },
      { n: 'Whitening', t: String.raw`$$\boldsymbol{z} = \boldsymbol{\Lambda}^{-1/2}\boldsymbol{Q}^\top(\boldsymbol{x} - \boldsymbol{\mu}) \Rightarrow \operatorname{Cov}(\boldsymbol{z}) = \boldsymbol{I}$$` }
    ],
    practice: [
      {
        q: String.raw`Compute PCA for the perfectly collinear dataset \(\{(0,0), (1,1), (2,2), (3,3)\}\): covariance, eigenvalues, PC1, and the reconstruction error of the 1-D projection.`,
        diff: 'easy',
        s: [
          String.raw`\(\boldsymbol{\mu} = (1.5, 1.5)^\top\); deviations \((-1.5,-1.5), (-0.5,-0.5), (0.5,0.5), (1.5,1.5)\).`,
          String.raw`\(\boldsymbol{\Sigma} = \begin{pmatrix} 1.25 & 1.25 \\ 1.25 & 1.25 \end{pmatrix}\): eigenvalues \(\lambda_1 = 2.5\), \(\lambda_2 = 0\), PC1 \(= \tfrac{1}{\sqrt2}(1,1)^\top\).`,
          String.raw`All points lie exactly on the line \(y = x\): 1-D projection reconstructs them perfectly, error \(= 0 = n\lambda_2\).`
        ],
        fin: String.raw`\(\lambda_2 = 0\): the data never needed two dimensions. PCA discovers exact linear structure — a zero eigenvalue is a detected redundancy.`
      },
      {
        q: String.raw`A 100-dim dataset has covariance eigenvalues \(\lambda_1 \ge \dots \ge \lambda_{100}\) with \(\sum_j \lambda_j = 500\) and top five \(= (200, 100, 50, 25, 12.5)\). How many components keep at least 75% of the variance, and what is the per-point reconstruction error then?`,
        diff: 'easy',
        s: [
          String.raw`Cumulative: \(200/500 = 40\%\); \(+100 = 60\%\); \(+50 = 70\%\); \(+25 = 75\%\) — 4 components reach exactly 75%.`,
          String.raw`Error \(= \sum_{j > 4}\lambda_j = 500 - 375 = 125\) per point.`
        ],
        fin: String.raw`4 components (75% variance, error 125). Diminishing returns per component are visible in the eigenvalue list itself.`
      },
      {
        q: String.raw`For the Chapter's dataset \(\{(1,1),(2,3),(3,2)\}\), compute the whitened coordinates of the point \((2,3)\) using \(\boldsymbol{q}_1 = \tfrac{1}{\sqrt2}(1,1)^\top, \boldsymbol{q}_2 = \tfrac{1}{\sqrt2}(1,-1)^\top, \boldsymbol{\Lambda} = \operatorname{diag}(1, \tfrac13)\).`,
        diff: 'med',
        s: [
          String.raw`Centered: \(\tilde{\boldsymbol{x}} = (0, 1)^\top\). Rotate: \(\boldsymbol{Q}^\top\tilde{\boldsymbol{x}} = (\tfrac{1}{\sqrt2}, -\tfrac{1}{\sqrt2})^\top\).`,
          String.raw`Scale: \(\boldsymbol{\Lambda}^{-1/2} = \operatorname{diag}(1, \sqrt3)\): \(\boldsymbol{z} = (\tfrac{1}{\sqrt2}, -\sqrt{\tfrac32})^\top \approx (0.707, -1.225)^\top\).`,
          String.raw`Check: \(z_1^2 + z_2^2 = \tfrac12 + \tfrac32 = 2 = \|\tilde{\boldsymbol{x}}\|^2\) ✓ (whitening rotates+scales, and this rotation is orthogonal so lengths here are preserved per-rotation; the sum of squares in the eigenbasis equals the norm²).`
        ],
        fin: String.raw`\(\boldsymbol{z} \approx (0.707, -1.225)^\top\): decorrelated, unit-variance coordinates. Whitened data is the input ICA and many generative models expect.`
      },
      {
        q: String.raw`(Proof) Using Lagrange multipliers, prove that the unit vector maximizing \(\boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u}\) is an eigenvector of \(\boldsymbol{\Sigma}\) for its largest eigenvalue, and that the maximum value is \(\lambda_{\max}\).`,
        diff: 'hard',
        s: [
          String.raw`Lagrangian: \(\mathcal{L}(\boldsymbol{u}, \lambda) = \boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u} - \lambda(\boldsymbol{u}^\top\boldsymbol{u} - 1)\).`,
          String.raw`Stationarity: \(2\boldsymbol{\Sigma}\boldsymbol{u} - 2\lambda\boldsymbol{u} = 0 \Rightarrow \boldsymbol{\Sigma}\boldsymbol{u} = \lambda\boldsymbol{u}\): candidates are exactly the unit eigenvectors.`,
          String.raw`At any candidate: \(\boldsymbol{u}^\top\boldsymbol{\Sigma}\boldsymbol{u} = \lambda\boldsymbol{u}^\top\boldsymbol{u} = \lambda\) — the objective <em>equals</em> the eigenvalue, so the maximizer is the top eigenvector with value \(\lambda_{\max}\). ∎`,
          String.raw`(Since \(\boldsymbol{\Sigma}\) is symmetric PSD, the feasible set is compact and \(\mathcal{L}\)'s stationary points exhaust the candidates — the argument is complete.)`
        ],
        fin: String.raw`The constraint's multiplier <em>is</em> the eigenvalue, and the eigenvalue <em>is</em> the variance. Three facts fused by one derivation — the style of the entire field.`
      }
    ]
  });
})();
