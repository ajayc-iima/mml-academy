/* Chapter 3 — Analytic Geometry */
(function () {
  MML.chapters.push({
    id: 'ch3', num: 3, icon: '📐',
    title: 'Analytic Geometry',
    tagline: 'Lengths, angles, and projections — the mathematics of "how similar are these two vectors?"',
    why: String.raw`Chapter 2 gave you vectors and maps. This chapter gives them a <b>geometry</b>: how long is a vector (norms), how aligned are two vectors (inner products), and what is the best flat approximation of a vector inside a subspace (projection). These three questions are secretly the questions ML asks a thousand times a second: <em>how different are these images, how similar are these word embeddings, what is the best low-dimensional summary of this dataset?</em> Projections alone power least squares (Ch 9) and PCA (Ch 10).`,
    goals: [
      String.raw`Compute norms, distances, angles, and cosine similarities fluently.`,
      String.raw`Project vectors onto lines and subspaces — by hand.`,
      String.raw`Orthonormalize a basis with Gram–Schmidt; use orthogonal matrices and rotations.`,
      String.raw`Connect geometry to ML: kernels, cosine similarity, attention, PCA.`
    ],
    widget: null,
    concepts: [
      {
        id: 'c1',
        title: 'Norms: how long is a vector?',
        subtitle: 'and why ML regularizes with them',
        intuition: String.raw`A norm is a notion of <b>length</b>. The everyday one is the straight-line (Euclidean) length: walk 3 km east and 4 km north, you are 5 km from home — the Pythagorean theorem. But other notions of length are useful: "total path traveled" (sum of coordinate sizes, \(\ell_1\)) or "largest single step" (\(\ell_\infty\)). Different norms answer different questions, and the choice of norm in an ML objective is a <b>modeling decision</b> about what "error" means.`,
        math: [
          { h: 'Norms on ℝⁿ', t: String.raw`$$\|\boldsymbol{x}\|_2 = \sqrt{\textstyle\sum_i x_i^2}, \qquad \|\boldsymbol{x}\|_1 = \sum_i |x_i|, \qquad \|\boldsymbol{x}\|_\infty = \max_i |x_i|$$ All satisfy: \(\|\boldsymbol{x}\| \ge 0\) (zero only at \(\boldsymbol{0}\)), \(\|\lambda \boldsymbol{x}\| = |\lambda| \|\boldsymbol{x}\|\), triangle inequality \(\|\boldsymbol{x}+\boldsymbol{y}\| \le \|\boldsymbol{x}\| + \|\boldsymbol{y}\|\).` },
          { h: 'Distance', t: String.raw`$$d(\boldsymbol{x}, \boldsymbol{y}) = \|\boldsymbol{x} - \boldsymbol{y}\|$$ "How different are two data points" = length of the arrow between them, under whichever norm you chose.` }
        ],
        ml: String.raw`The \(\ell_2\) norm is behind ridge regression and weight decay (\(\|\boldsymbol{\theta}\|_2^2\) added to the loss — prefer many small weights). The \(\ell_1\) norm powers LASSO (\(\|\boldsymbol{\theta}\|_1\) — prefer <em>few</em> nonzero weights, i.e. feature selection, because the \(\ell_1\) ball has corners that make solutions land exactly on axes). Norm choices also define distances for \(k\)-means, \(k\)-NN, and embedding retrieval.`,
        byhand: {
          problem: String.raw`For \(\boldsymbol{x} = (3, 4)^\top\): compute \(\|\boldsymbol{x}\|_2\), \(\|\boldsymbol{x}\|_1\), \(\|\boldsymbol{x}\|_\infty\). Then for \(\boldsymbol{y} = (1, -2)^\top\), compute \(d_2(\boldsymbol{x}, \boldsymbol{y})\) and \(d_1(\boldsymbol{x}, \boldsymbol{y})\).`,
          steps: [
            { t: 'The three norms of x', d: String.raw`$$\|\boldsymbol{x}\|_2 = \sqrt{3^2 + 4^2} = 5, \qquad \|\boldsymbol{x}\|_1 = 3 + 4 = 7, \qquad \|\boldsymbol{x}\|_\infty = \max(3,4) = 4$$ All agree on <em>orderings</em> here but disagree on magnitude: \(\|\cdot\|_1 \ge \|\cdot\|_2 \ge \|\cdot\|_\infty\) always.` },
            { t: 'Difference vector', d: String.raw`$$\boldsymbol{x} - \boldsymbol{y} = (3-1,\; 4-(-2))^\top = (2, 6)^\top$$` },
            { t: 'Distances', d: String.raw`$$d_2 = \sqrt{4 + 36} = \sqrt{40} = 2\sqrt{10} \approx 6.32, \qquad d_1 = 2 + 6 = 8$$` },
            { t: 'Why the gap matters', d: String.raw`\(\ell_2\) punishes large coordinates quadratically (one big error hurts a lot); \(\ell_1\) punishes linearly (a big error and several small ones cost similarly). Choosing a norm = choosing your notion of "bad".` }
          ],
          answer: String.raw`\(\|\boldsymbol{x}\|_2 = 5\), \(\|\boldsymbol{x}\|_1 = 7\), \(\|\boldsymbol{x}\|_\infty = 4\); \(d_2(\boldsymbol{x},\boldsymbol{y}) = 2\sqrt{10} \approx 6.32\), \(d_1 = 8\).`
        }
      },
      {
        id: 'c2',
        title: 'Inner products: similarity and angles',
        subtitle: 'the dot product as an alignment meter',
        intuition: String.raw`The dot product answers one question: <b>how much do these two arrows agree?</b> Big positive: same direction. Zero: perpendicular — completely independent "opinions". Negative: opposed. Its magic is that it simultaneously encodes both <em>lengths</em> and the <em>angle</em> between the vectors. In ML, "similarity" between two embeddings almost always <em>is</em> an inner product — this one operation is the beating heart of search, recommendations, and attention.`,
        math: [
          { h: 'Inner product and angle', t: String.raw`$$\langle \boldsymbol{x}, \boldsymbol{y}\rangle = \boldsymbol{x}^\top\boldsymbol{y} = \sum_i x_i y_i, \qquad \cos\angle(\boldsymbol{x},\boldsymbol{y}) = \frac{\boldsymbol{x}^\top\boldsymbol{y}}{\|\boldsymbol{x}\|\,\|\boldsymbol{y}\|}$$ Orthogonal (written \(\boldsymbol{x} \perp \boldsymbol{y}\)) means \(\boldsymbol{x}^\top \boldsymbol{y} = 0\).` },
          { h: 'Cauchy–Schwarz (the workhorse inequality)', t: String.raw`$$|\boldsymbol{x}^\top \boldsymbol{y}| \le \|\boldsymbol{x}\|\,\|\boldsymbol{y}\| \qquad \text{(equality iff } \boldsymbol{x}, \boldsymbol{y} \text{ parallel)}$$ It says cosine similarity is always in \([-1, 1]\) — no pair of vectors can be "more than perfectly aligned".` },
          { h: 'Norm from inner product', t: String.raw`$$\|\boldsymbol{x}\| = \sqrt{\langle \boldsymbol{x}, \boldsymbol{x}\rangle}$$ Length is a special case of similarity: <em>how similar is a vector to itself</em>.` }
        ],
        ml: String.raw`Cosine similarity ranks documents and embeddings ("find me the nearest vector in the database"). Attention in transformers is \(\text{softmax}(\boldsymbol{Q}\boldsymbol{K}^\top/\sqrt{d})\boldsymbol{V}\): literally an inner product between every query and every key, turned into "how much should this token look at that one". Kernels (Ch 12) generalize the inner product so classifiers can measure similarity in huge feature spaces. And PCA (Ch 10) is built from projections, which are inner products with unit vectors.`,
        byhand: {
          problem: String.raw`Compute the angle between \(\boldsymbol{x} = (2, 1)^\top\) and \(\boldsymbol{y} = (1, 1)^\top\). Then determine \(c\) so that \(\boldsymbol{z} = (1, c)^\top\) is orthogonal to \(\boldsymbol{x}\).`,
          steps: [
            { t: 'Dot product, norms, cosine', d: String.raw`$$\boldsymbol{x}^\top\boldsymbol{y} = 2 + 1 = 3, \qquad \|\boldsymbol{x}\| = \sqrt{5}, \quad \|\boldsymbol{y}\| = \sqrt{2} \;\Rightarrow\; \cos\theta = \frac{3}{\sqrt{10}} \approx 0.949$$` },
            { t: 'Angle', d: String.raw`\(\theta = \arccos(0.949) \approx 18.4^\circ\) — quite aligned, as the picture suggests.` },
            { t: 'Orthogonality condition', d: String.raw`\(\boldsymbol{z} \perp \boldsymbol{x} \iff \boldsymbol{z}^\top\boldsymbol{x} = 1\cdot 2 + c \cdot 1 = 0 \iff c = -2\). So \((1, -2)^\top \perp (2,1)^\top\).` },
            { t: 'Geometric reading', d: String.raw`The orthogonal complement of one direction in \(\mathbb{R}^2\) is a line — "everything with zero alignment". In \(\mathbb{R}^{768}\) (an embedding layer), the orthogonal complement of a single direction is a 767-dimensional space: there is <em>lots</em> of room to be unrelated.` }
          ],
          answer: String.raw`\(\theta \approx 18.4^\circ\); \(c = -2\).`
        }
      },
      {
        id: 'c3',
        title: 'Projections: the best flat approximation',
        subtitle: 'onto lines and subspaces — least squares in disguise',
        intuition: String.raw`You are standing in the sun; your shadow on the ground is your <b>projection</b> onto the ground plane — the closest you can get to the ground without leaving your line to the sun. Mathematically: to project \(\boldsymbol{x}\) onto a subspace \(U\), find the point \(\pi_U(\boldsymbol{x}) \in U\) <b>closest</b> to \(\boldsymbol{x}\), which is exactly the point where the connecting segment is perpendicular to \(U\). This "closest point" idea is the entire secret of least-squares regression (Ch 9) and of PCA (Ch 10): fitting a line to data = projecting data onto the line.`,
        math: [
          { h: 'Projection onto a line', t: String.raw`Onto the line spanned by \(\boldsymbol{b} \ne \boldsymbol{0}\): $$\pi_{\boldsymbol{b}}(\boldsymbol{x}) = \frac{\boldsymbol{b}^\top \boldsymbol{x}}{\boldsymbol{b}^\top\boldsymbol{b}}\,\boldsymbol{b}$$ The scalar \(\frac{\boldsymbol{b}^\top\boldsymbol{x}}{\boldsymbol{b}^\top\boldsymbol{b}}\) is the <em>coordinate</em> of \(\boldsymbol{x}\) along \(\boldsymbol{b}\).` },
          { h: 'Projection onto a subspace', t: String.raw`With an <b>orthonormal</b> basis \(\boldsymbol{q}_1, \dots, \boldsymbol{q}_m\) of \(U\): $$\pi_U(\boldsymbol{x}) = \sum_{j} (\boldsymbol{q}_j^\top \boldsymbol{x})\, \boldsymbol{q}_j$$ With a general basis matrix \(\boldsymbol{B}\): $$\pi_U(\boldsymbol{x}) = \boldsymbol{B}(\boldsymbol{B}^\top\boldsymbol{B})^{-1}\boldsymbol{B}^\top \boldsymbol{x} \qquad \text{(the matrix is a projection matrix: } \boldsymbol{P}^2 = \boldsymbol{P})$$` },
          { h: 'The optimality certificate', t: String.raw`$$\boldsymbol{x} - \pi_U(\boldsymbol{x}) \;\perp\; U$$ The residual is orthogonal to the whole subspace — <em>that</em> is what "closest" means, and in Ch 9 it becomes "the best line is the one whose errors are uncorrelated with the features".` }
        ],
        ml: String.raw`Least squares = projecting \(\boldsymbol{y}\) onto \(\operatorname{col}(\boldsymbol{X})\). PCA = projecting data onto the top eigenvector directions of the covariance (Ch 10). Recommender systems project users and items into a shared low-dimensional space. Even transformer layer-norm and whitening steps are projections/scalings in disguise.`,
        byhand: {
          problem: String.raw`Project \(\boldsymbol{x} = (2, 3, 1)^\top\) onto the line through \(\boldsymbol{b} = (1, 1, 1)^\top\). Compute the projection \(\pi\), the residual \(\boldsymbol{x} - \pi\), and the distance from \(\boldsymbol{x}\) to the line.`,
          steps: [
            { t: 'Coordinate along b', d: String.raw`$$\frac{\boldsymbol{b}^\top\boldsymbol{x}}{\boldsymbol{b}^\top\boldsymbol{b}} = \frac{1\cdot 2 + 1 \cdot 3 + 1 \cdot 1}{1 + 1 + 1} = \frac{6}{3} = 2$$` },
            { t: 'Scale b', d: String.raw`$$\pi = 2\,\boldsymbol{b} = (2, 2, 2)^\top$$` },
            { t: 'Residual and orthogonality check', d: String.raw`$$\boldsymbol{x} - \pi = (0, 1, -1)^\top, \qquad \boldsymbol{b}^\top(\boldsymbol{x}-\pi) = 0 + 1 - 1 = 0 \;\checkmark$$` },
            { t: 'Distance = length of residual', d: String.raw`$$d = \|\boldsymbol{x}-\pi\| = \sqrt{0 + 1 + 1} = \sqrt{2} \approx 1.414$$ No other point of the line is closer — that is the projection guarantee.` }
          ],
          answer: String.raw`\(\pi = (2,2,2)^\top\), residual \((0,1,-1)^\top\), distance \(\sqrt{2}\).`
        }
      },
      {
        id: 'c4',
        title: 'Gram–Schmidt and orthogonal matrices',
        subtitle: 'building perfect coordinate systems',
        intuition: String.raw`Projections are easy <b>if</b> your basis vectors are perpendicular unit vectors (orthonormal): the coordinate of \(\boldsymbol{x}\) along \(\boldsymbol{q}\) is just \(\boldsymbol{q}^\top\boldsymbol{x}\), no matrix inversion needed. Gram–Schmidt is the cleaning process that <b>turns any basis into an orthonormal one</b>: keep the first vector (normalized), then repeatedly project the junk out of each new vector. Orthogonal matrices (\(\boldsymbol{Q}^\top\boldsymbol{Q} = \boldsymbol{I}\)) are the "rigid motions" — rotations and reflections — that preserve all lengths and angles: change the view, never distort the geometry.`,
        math: [
          { h: 'Gram–Schmidt recurrence', t: String.raw`$$\boldsymbol{u}_j = \boldsymbol{b}_j - \sum_{k \lt j} (\boldsymbol{q}_k^\top \boldsymbol{b}_j)\, \boldsymbol{q}_k, \qquad \boldsymbol{q}_j = \frac{\boldsymbol{u}_j}{\|\boldsymbol{u}_j\|}$$ Subtract the components already captured; normalize what remains.` },
          { h: 'Orthogonal matrices', t: String.raw`$$\boldsymbol{Q}^\top\boldsymbol{Q} = \boldsymbol{I} \iff \text{columns orthonormal} \;\Rightarrow\; \|\boldsymbol{Q}\boldsymbol{x}\| = \|\boldsymbol{x}\|, \; \langle \boldsymbol{Q}\boldsymbol{x}, \boldsymbol{Q}\boldsymbol{y}\rangle = \langle \boldsymbol{x}, \boldsymbol{y}\rangle, \; \det\boldsymbol{Q} = \pm 1$$` },
          { h: 'Rotation matrix (2-D)', t: String.raw`$$\boldsymbol{R}(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$ Check: \(\boldsymbol{R}(\theta)^\top\boldsymbol{R}(\theta) = \boldsymbol{I}\) — a rotation is an orthogonal matrix with \(\det = +1\).` }
        ],
        ml: String.raw`QR decomposition and orthonormal bases make regression numerically stable. Rotations are core to geometric deep learning (a good model should be equivariant to rotating the input). Whitening data = rotating to the eigenbasis of the covariance + rescaling (Ch 10). Modern architectures even parametrize weights as products of orthogonal matrices to keep activations well-conditioned.`,
        byhand: {
          problem: String.raw`Orthonormalize \(\boldsymbol{b}_1 = (1, 1, 0)^\top\), \(\boldsymbol{b}_2 = (0, 1, 1)^\top\) with Gram–Schmidt.`,
          steps: [
            { t: 'First vector: normalize', d: String.raw`$$\boldsymbol{q}_1 = \frac{(1,1,0)^\top}{\sqrt{2}}$$` },
            { t: 'Second: subtract its component along q₁', d: String.raw`$$\boldsymbol{q}_1^\top \boldsymbol{b}_2 = \frac{0 + 1 + 0}{\sqrt{2}} = \frac{1}{\sqrt{2}} \quad\Rightarrow\quad \boldsymbol{u}_2 = \boldsymbol{b}_2 - \frac{1}{\sqrt{2}}\boldsymbol{q}_1 = (0,1,1)^\top - \frac{1}{2}(1,1,0)^\top = \left(-\tfrac12, \tfrac12, 1\right)^\top$$` },
            { t: 'Normalize u₂ (factor out ½ first)', d: String.raw`\(\boldsymbol{u}_2 = \tfrac12(-1, 1, 2)^\top\), \(\|\boldsymbol{u}_2\| = \tfrac12\sqrt{1+1+4} = \tfrac12\sqrt{6}\): $$\boldsymbol{q}_2 = \frac{(-1, 1, 2)^\top}{\sqrt{6}}$$` },
            { t: 'Verify orthogonality and unit length', d: String.raw`\(\boldsymbol{q}_1^\top\boldsymbol{q}_2 = \frac{1}{\sqrt{12}}(-1 + 1 + 0) = 0\) ✓; \(\|\boldsymbol{q}_2\| = \frac{\sqrt{6}}{\sqrt{6}} = 1\) ✓.` }
          ],
          answer: String.raw`Orthonormal basis: \(\boldsymbol{q}_1 = \frac{1}{\sqrt{2}}(1,1,0)^\top\), \(\boldsymbol{q}_2 = \frac{1}{\sqrt{6}}(-1,1,2)^\top\). In this basis, coordinates of any vector are mere dot products.`
        }
      },
      {
        id: 'c5',
        title: 'Inner products beyond vectors: functions and kernels (a first taste)',
        subtitle: 'the bridge to RKHS and kernel methods',
        intuition: String.raw`Nothing stops us from measuring "alignment" of things that are not lists of numbers. Two functions on an interval agree to the extent that they overlap <em>everywhere</em> — captured by integrating their product. Two infinite sequences align if their terms agree position by position. The pattern is always the same recipe: <b>multiply pointwise, add up</b>. This generalization, formalized as Hilbert spaces, is the launchpad of kernel methods: ML algorithms that only ever need inner products can run in infinite-dimensional spaces for free.`,
        math: [
          { h: 'Inner product of functions', t: String.raw`$$\langle f, g\rangle = \int_a^b f(x)\, g(x)\, dx \quad\Rightarrow\quad \|f\| = \sqrt{\langle f, f \rangle}, \qquad f \perp g \iff \langle f, g\rangle = 0$$ Same axioms as the dot product — a different world, same geometry.` },
          { h: 'Sequences', t: String.raw`$$\langle \boldsymbol{a}, \boldsymbol{b}\rangle = \sum_{i=1}^{\infty} a_i b_i \quad (\text{convergent})$$ \( \ell_2 \) — the space of square-summable sequences — is the infinite-dimensional cousin of \(\mathbb{R}^n\).` }
        ],
        ml: String.raw`A kernel \(k(\boldsymbol{x}, \boldsymbol{z}) = \langle \phi(\boldsymbol{x}), \phi(\boldsymbol{z})\rangle\) measures similarity in a feature space \(\phi\) you never compute explicitly (Ch 12). Gaussian-process regression literally treats functions as vectors with an inner product; RKHS theory explains why "the kernel trick" works. This is the doorway to functional analysis — a main stop on the research roadmap.`,
        byhand: {
          problem: String.raw`On \([-1, 1]\), show \(f(x) = x\) and \(g(x) = x^2\) are orthogonal, and compute \(\|f\|\) and \(\|g\|\).`,
          steps: [
            { t: 'Inner product', d: String.raw`$$\langle f, g\rangle = \int_{-1}^{1} x \cdot x^2\, dx = \int_{-1}^{1} x^3 dx = \left[\frac{x^4}{4}\right]_{-1}^{1} = \frac{1}{4} - \frac{1}{4} = 0 \;\checkmark$$ \(f\) is odd, \(g\) is even: their product integrates to zero. Orthogonality often follows from symmetry.` },
            { t: 'Norm of f', d: String.raw`$$\|f\| = \sqrt{\int_{-1}^{1} x^2 dx} = \sqrt{\tfrac{2}{3}} \approx 0.816$$` },
            { t: 'Norm of g', d: String.raw`$$\|g\| = \sqrt{\int_{-1}^{1} x^4 dx} = \sqrt{\tfrac{2}{5}} \approx 0.632$$` }
          ],
          answer: String.raw`\(\langle f, g\rangle = 0\) (orthogonal), \(\|f\| = \sqrt{2/3}\), \(\|g\| = \sqrt{2/5}\). Geometry — lengths, angles, projections — survives intact in function spaces.`
        }
      }
    ],
    cheatsheet: [
      { n: 'Norms', t: String.raw`$$\|\boldsymbol{x}\|_2 = \sqrt{\textstyle\sum x_i^2},\quad \|\boldsymbol{x}\|_1 = \textstyle\sum |x_i|,\quad \|\boldsymbol{x}\|_\infty = \max|x_i|$$` },
      { n: 'Angle', t: String.raw`$$\cos\theta = \frac{\boldsymbol{x}^\top\boldsymbol{y}}{\|\boldsymbol{x}\|\|\boldsymbol{y}\|}, \qquad |\boldsymbol{x}^\top\boldsymbol{y}| \le \|\boldsymbol{x}\|\|\boldsymbol{y}\| \;\text{(Cauchy–Schwarz)}$$` },
      { n: 'Projection onto line', t: String.raw`$$\pi_{\boldsymbol{b}}(\boldsymbol{x}) = \frac{\boldsymbol{b}^\top\boldsymbol{x}}{\boldsymbol{b}^\top\boldsymbol{b}}\,\boldsymbol{b}$$` },
      { n: 'Projection onto subspace', t: String.raw`$$\pi_U(\boldsymbol{x}) = \boldsymbol{B}(\boldsymbol{B}^\top\boldsymbol{B})^{-1}\boldsymbol{B}^\top\boldsymbol{x}, \qquad \boldsymbol{P}^2 = \boldsymbol{P}$$` },
      { n: 'Gram–Schmidt', t: String.raw`$$\boldsymbol{u}_j = \boldsymbol{b}_j - \textstyle\sum_{k\lt j} (\boldsymbol{q}_k^\top\boldsymbol{b}_j)\boldsymbol{q}_k, \quad \boldsymbol{q}_j = \boldsymbol{u}_j / \|\boldsymbol{u}_j\|$$` },
      { n: 'Orthogonal matrix', t: String.raw`$$\boldsymbol{Q}^\top\boldsymbol{Q} = \boldsymbol{I}:\; \text{preserves norms \& angles;} \quad \boldsymbol{R}(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}$$` }
    ],
    practice: [
      {
        q: String.raw`Two (tiny) document vectors \(\boldsymbol{d}_1 = (2, 0, 1)^\top\), \(\boldsymbol{d}_2 = (1, 1, 0)^\top\) (term counts). Compute their cosine similarity and the angle. Then compute the Euclidean distance and rank the two notions of "similar" for a third vector \(\boldsymbol{d}_3 = (4, 0, 2)^\top\).`,
        diff: 'easy',
        s: [
          String.raw`\(\cos(\boldsymbol{d}_1, \boldsymbol{d}_2) = \frac{2\cdot 1 + 0 + 0}{\sqrt{5}\sqrt{2}} = \frac{2}{\sqrt{10}} \approx 0.632\), angle \(\approx 50.8^\circ\).`,
          String.raw`\(\boldsymbol{d}_3 = 2\boldsymbol{d}_1\): cosine similarity with \(\boldsymbol{d}_1\) is \(1\) (parallel!), while \(d_2(\boldsymbol{d}_1, \boldsymbol{d}_3) = \|(-2, 0, -1)\| = \sqrt{5} \approx 2.24 \gt 0\).`
        ],
        fin: String.raw`Cosine ignores length (pure direction) — it rates \(\boldsymbol{d}_3\) identical to \(\boldsymbol{d}_1\); Euclidean distance does not. For count data, cosine is usually the right "about the same topic" measure.`
      },
      {
        q: String.raw`Project \(\boldsymbol{x} = (1, 2, 2)^\top\) onto the plane \(U = \operatorname{span}\{(1,1,0)^\top, (0,1,1)^\top\}\) using \(\pi_U(\boldsymbol{x}) = \boldsymbol{B}(\boldsymbol{B}^\top\boldsymbol{B})^{-1}\boldsymbol{B}^\top\boldsymbol{x}\). (Careful: the basis is <b>not</b> orthonormal, so you cannot just take dot products!)`,
        diff: 'hard',
        s: [
          String.raw`\(\boldsymbol{B} = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 0 & 1 \end{pmatrix}\), \(\boldsymbol{B}^\top\boldsymbol{B} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}\), inverse \(= \tfrac13\begin{pmatrix} 2 & -1 \\ -1 & 2\end{pmatrix}\).`,
          String.raw`\(\boldsymbol{B}^\top\boldsymbol{x} = (3, 4)^\top\). Solve \((\boldsymbol{B}^\top\boldsymbol{B})\boldsymbol{\lambda} = \boldsymbol{B}^\top\boldsymbol{x}\): \(\lambda_1 = \tfrac13(6 - 4) = \tfrac23\), \(\lambda_2 = \tfrac13(-3 + 8) = \tfrac53\).`,
          String.raw`\(\pi_U(\boldsymbol{x}) = \tfrac23(1,1,0)^\top + \tfrac53(0,1,1)^\top = (\tfrac23, \tfrac73, \tfrac53)^\top\).`,
          String.raw`Residual: \(\boldsymbol{x} - \pi = (\tfrac13, -\tfrac13, \tfrac13)^\top\); check orthogonality to both basis vectors: \(\tfrac13 - \tfrac13 = 0\) ✓, \(-\tfrac13 + \tfrac13 = 0\) ✓.`
        ],
        fin: String.raw`\(\pi_U(\boldsymbol{x}) = (\tfrac23, \tfrac73, \tfrac53)^\top\). Note: naively taking \(\boldsymbol{b}_i^\top\boldsymbol{x}\) as coefficients would <em>not</em> project correctly when the basis is tilted — the \((\boldsymbol{B}^\top\boldsymbol{B})^{-1}\) corrects for the overlap between basis vectors.`
      },
      {
        q: String.raw`Orthonormalize \(\boldsymbol{b}_1 = (1, 0, 1)^\top\), \(\boldsymbol{b}_2 = (1, 1, 0)^\top\), \(\boldsymbol{b}_3 = (0, 1, 1)^\top\) and write \(\boldsymbol{x} = (1, 1, 1)^\top\) in the new orthonormal basis.`,
        diff: 'hard',
        s: [
          String.raw`\(\boldsymbol{q}_1 = \tfrac{1}{\sqrt2}(1, 0, 1)^\top\).`,
          String.raw`\(\boldsymbol{b}_2^\top \boldsymbol{q}_1 = \tfrac{1}{\sqrt2}\); \(\boldsymbol{u}_2 = (1,1,0)^\top - \tfrac12(1,0,1)^\top = (\tfrac12, 1, -\tfrac12)^\top = \tfrac12(1,2,-1)^\top\); \(\boldsymbol{q}_2 = \tfrac{1}{\sqrt6}(1,2,-1)^\top\).`,
          String.raw`\(\boldsymbol{b}_3^\top\boldsymbol{q}_1 = \tfrac{1}{\sqrt2}\), \(\boldsymbol{b}_3^\top\boldsymbol{q}_2 = \tfrac{1}{\sqrt6}\); subtract: \((0,1,1) - \tfrac12(1,0,1) - \tfrac16(1,2,-1) = (-\tfrac23, \tfrac23, \tfrac23)^\top\); \(\boldsymbol{q}_3 = \tfrac{1}{\sqrt3}(-1,1,1)^\top\).`,
          String.raw`Coordinates of \(\boldsymbol{x}\): \(\boldsymbol{q}_1^\top\boldsymbol{x} = \tfrac{2}{\sqrt2} = \sqrt2\), \(\boldsymbol{q}_2^\top\boldsymbol{x} = \tfrac{2}{\sqrt6}\), \(\boldsymbol{q}_3^\top\boldsymbol{x} = \tfrac{1}{\sqrt3}\). Check Parseval: \(2 + \tfrac46 + \tfrac13 = 3 = \|\boldsymbol{x}\|^2\) ✓.`
        ],
        fin: String.raw`\(\boldsymbol{x} = \sqrt2\,\boldsymbol{q}_1 + \tfrac{2}{\sqrt6}\boldsymbol{q}_2 + \tfrac{1}{\sqrt3}\boldsymbol{q}_3\). In an orthonormal basis, "finding coordinates" is just taking dot products — that convenience is why we orthogonalize.`
      },
      {
        q: String.raw`Verify that \(\boldsymbol{R}(\theta) = \begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}\) is orthogonal, and compute \(\boldsymbol{R}(30^\circ)(1, 0)^\top\). What does the answer mean geometrically?`,
        diff: 'easy',
        s: [
          String.raw`\(\boldsymbol{R}^\top\boldsymbol{R} = \begin{pmatrix}\cos^2\theta + \sin^2\theta & 0 \\ 0 & \sin^2\theta + \cos^2\theta\end{pmatrix} = \boldsymbol{I}\) ✓ (using \(\cos^2 + \sin^2 = 1\)).`,
          String.raw`\(\boldsymbol{R}(30^\circ)(1,0)^\top = (\cos 30^\circ, \sin 30^\circ)^\top = (\tfrac{\sqrt3}{2}, \tfrac12)^\top\) — the unit vector at \(30^\circ\) above the \(x\)-axis.`
        ],
        fin: String.raw`Rotations preserve lengths and angles (orthogonal, \(\det = +1\)); the first column of \(\boldsymbol{R}\) is where \(\boldsymbol{e}_1\) lands. Columns of any matrix = images of the basis vectors.`
      },
      {
        q: String.raw`Prove the projection formula for a line: the closest point of \(\operatorname{span}\{\boldsymbol{b}\}\) to \(\boldsymbol{x}\) is \(\pi = \frac{\boldsymbol{b}^\top\boldsymbol{x}}{\boldsymbol{b}^\top\boldsymbol{b}}\boldsymbol{b}\). (Hint: minimize \(\|\boldsymbol{x} - \lambda\boldsymbol{b}\|^2\) over \(\lambda\).)`,
        diff: 'med',
        s: [
          String.raw`Expand: \(g(\lambda) = \|\boldsymbol{x}\|^2 - 2\lambda\, \boldsymbol{b}^\top\boldsymbol{x} + \lambda^2 \|\boldsymbol{b}\|^2\) — a parabola in \(\lambda\).`,
          String.raw`\(g'(\lambda) = -2\boldsymbol{b}^\top\boldsymbol{x} + 2\lambda\|\boldsymbol{b}\|^2 = 0 \Rightarrow \lambda^\star = \frac{\boldsymbol{b}^\top\boldsymbol{x}}{\boldsymbol{b}^\top\boldsymbol{b}}\).`,
          String.raw`The residual \(\boldsymbol{x} - \lambda^\star\boldsymbol{b}\) satisfies \(\boldsymbol{b}^\top(\boldsymbol{x} - \lambda^\star \boldsymbol{b}) = 0\): orthogonal, as promised. ∎`
        ],
        fin: String.raw`Calculus + orthogonality give the same answer — a preview of how least squares (Ch 9) will be derived two different ways.`
      }
    ]
  });
})();
