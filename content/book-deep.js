/* Book-deep: enrichment cards transcribed from the MML book's worked examples and
   sections that the base chapters compressed. Injected into existing chapters at load. */
(function () {
  function add(chId, card) {
    var ch = null;
    MML.chapters.forEach(function (c) { if (c.id === chId) ch = c; });
    if (ch) ch.concepts.push(card);
  }
  function src(s) { return { h: '📖 Book reference', t: s }; }

  /* ---------- Ch 2: groups + minus-1 trick ---------- */
  add('ch2', {
    id: 'b1',
    title: 'Groups, GL(n), and the minus-1 trick',
    subtitle: 'Book §2.4–2.5 · Examples 2.8 & 2.10 — the algebraic backbone the chapter assumed',
    intuition: String.raw`The book is stricter than most courses: before doing linear algebra it defines the setting precisely. A <b>group</b> is a set with an operation that is closed, associative, has a neutral element, and every element has an inverse. Why care? Because "vectors live in a vector space" and "invertible matrices form a group" are the licenses for everything we do — inverting matrices, rotating objects, changing bases. The <b>minus-1 trick</b> is a bookkeeping device: extend an echelon matrix with −1 entries on the missing pivots, and the kernel basis can be read off its columns directly.`,
    math: [
      { h: 'Group axioms', t: String.raw`\(G\) with operation \(\otimes\): <b>closure</b> (\(x \otimes y \in G\)), <b>associativity</b>, <b>neutral element</b> \(e\) (\(e \otimes x = x\)), <b>inverse</b> (\(x^{-1}\!\otimes x = e\)). Abelian = also commutative. A vector space adds scale-and-add structure on top of an Abelian group.` },
      { h: 'Book Example 2.10 — classify', t: String.raw`\((\mathbb{Z}, +)\) Abelian ✓; \((\mathbb{N}_0, +)\) ✗ (no inverses); \((\mathbb{Z}, \cdot)\) ✗ (no inverses beyond ±1); \((\mathbb{R}, \cdot)\) ✗ (0 has no inverse); \((\mathbb{R}\setminus\{0\}, \cdot)\) Abelian ✓; \((\mathbb{R}^{m\times n}, +)\) Abelian ✓; \((\mathbb{R}^{n\times n}, \cdot)\): a group <b>exactly on the regular matrices</b> — this is the <b>general linear group</b> \(\mathrm{GL}(n, \mathbb{R})\).` },
      { h: 'Book Example 2.8 — minus-1 trick', t: String.raw`Put an RREF matrix into a square form by inserting rows \((\boldsymbol{0}, \dots, -1, \dots, \boldsymbol{0})\) wherever pivots are missing. The columns containing the \(-1\) entries <b>are</b> a basis of the solution space of \(A\boldsymbol{x} = \boldsymbol{0}\) — read off, no solving. Inverse by \([A \mid I_n] \rightsquigarrow [I_n \mid A^{-1}]\) is the same machinery.` },
      src(String.raw`§2.4 (groups, \(\mathrm{GL}\)), §2.5 Example 2.8 (minus-1 trick), §2.5 (inverse via augmented matrix).`)
    ],
    ml: String.raw`\(\mathrm{GL}(n)\) is where every invertible layer of a normalizing flow lives; rotations form its subgroup \(\mathrm{SO}(n)\). The minus-1 trick is the paper-and-pencil version of what null-space computations in libraries return.`,
    byhand: {
      problem: String.raw`Classify as groups: (a) \((\mathbb{Z}, +)\); (b) \((\mathbb{N}_0, +)\); (c) \((\mathbb{R}, \cdot)\); (d) \((\mathbb{R}\setminus\{0\}, \cdot)\); then (e) use the minus-1 trick: for RREF \(\begin{pmatrix}1&3&0&3\\0&0&1&9\\0&0&0&0\end{pmatrix}\) (pivots in cols 1, 3), read off a basis of the solution space of \(A\boldsymbol{x} = \boldsymbol{0}\) in \(\mathbb{R}^4\).`,
      steps: [
        { t: '(a)–(d)', d: String.raw`(a) Abelian group ✓ (inverse \(= -z\), neutral 0). (b) ✗ — no inverses (can't negate). (c) ✗ — 0 has no inverse. (d) Abelian group ✓ (0 removed, inverse \(= 1/x\)).` },
        { t: '(e) Augment', d: String.raw`Missing pivots are columns 2 and 4; insert rows with \(-1\) there: $$\tilde{A} = \begin{pmatrix}1&3&0&3\\0&-1&0&0\\0&0&1&9\\0&0&0&-1\end{pmatrix}$$ (with the zero row dropped).` },
        { t: '(e) Read off the −1 columns', d: String.raw`Columns 2 and 4 of \(\tilde{A}\): \((3, -1, 0, 0)^\top\) and \((3, 0, 9, -1)^\top\) — a basis of \(\ker A\). Verify the first: \(A(3,-1,0,0)^\top = (3 - 3, 0, 0)^\top = \boldsymbol{0}\) ✓.` }
      ],
      answer: String.raw`Groups: (a) ✓, (b) ✗, (c) ✗, (d) ✓; kernel basis \(\{(3,-1,0,0)^\top, (3,0,9,-1)^\top\}\).`
    }
  });

  /* ---------- Ch 3: rotations in 3-D ---------- */
  add('ch3', {
    id: 'b1',
    title: 'Rotations in three dimensions',
    subtitle: 'Book §3.9 — rotations about coordinate axes, and why they refuse to commute',
    intuition: String.raw`In 2-D there is one rotation (about the invisible \(z\)-axis). In 3-D you must also say <b>which axis</b> you rotate around. Each coordinate axis has its own rotation matrix — a \(2\times2\) rotation embedded in the plane perpendicular to that axis, with a 1 left on the axis itself. The shock: unlike 2-D, applying rotations in different orders gives different results. Grab a book, rotate it 90° about the vertical then 90° about the horizontal, and compare with the reversed order — the final orientation differs. 3-D rotations form the group \(\mathrm{SO}(3)\), which is <b>non-Abelian</b>.`,
    math: [
      { h: 'The three axis rotations', t: String.raw`$$R_1(\theta) = \begin{pmatrix}1&0&0\\0&\cos\theta&-\sin\theta\\0&\sin\theta&\cos\theta\end{pmatrix}, \quad R_2(\theta) = \begin{pmatrix}\cos\theta&0&\sin\theta\\0&1&0\\-\sin\theta&0&\cos\theta\end{pmatrix}, \quad R_3(\theta) = \begin{pmatrix}\cos\theta&-\sin\theta&0\\\sin\theta&\cos\theta&0\\0&0&1\end{pmatrix}$$` },
      { h: 'Properties', t: String.raw`Each \(R_i(\theta)\) is orthogonal (\(R_i^\top R_i = I\), \(\det = +1\)) — rotations preserve lengths, angles, and orientation. But generally \(R_i(\alpha)R_j(\beta) \ne R_j(\beta)R_i(\alpha)\) for \(i \ne j\): the group \(\mathrm{SO}(3)\) is <b>non-Abelian</b>.` }
    ],
    ml: String.raw`3-D rotations are the atoms of attitude control (spacecraft, drones), of pose estimation in computer vision, and of any equivariant 3-D network. Non-commutativity is why orientation representations move to quaternions or rotation matrices rather than "three angles added up".`,
    byhand: {
      problem: String.raw`Apply \(R_3(90^\circ)\) to \(\boldsymbol{v} = (2, 1, 3)^\top\). (a) Result? (b) Verify \(\|R\boldsymbol{v}\| = \|\boldsymbol{v}\|\). (c) Why don't \(R_1(90^\circ)\) and \(R_3(90^\circ)\) commute?`,
      steps: [
        { t: '(a)', d: String.raw`\(R_3(90^\circ) = \begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}\): \(R\boldsymbol{v} = (-1, 2, 3)^\top\) — the \((2, 1)\) point of the \(xy\)-plane rotates counterclockwise 90° to \((-1, 2)\); \(z\) untouched.` },
        { t: '(b)', d: String.raw`\(\|\boldsymbol{v}\| = \sqrt{4+1+9} = \sqrt{14}\); \(\|R\boldsymbol{v}\| = \sqrt{1+4+9} = \sqrt{14}\) ✓ — algebraically because \(R^\top R = I\).` },
        { t: '(c)', d: String.raw`The first rotation reorients the axes the second one acts through: order changes which plane each rotation's 2-D action lands in. Try it on a real object — \(\mathrm{SO}(3)\) is non-Abelian.` }
      ],
      answer: String.raw`\(R_3(90^\circ)\boldsymbol{v} = (-1, 2, 3)^\top\); norm preserved; axis rotations do not commute.`
    }
  });

  /* ---------- Ch 4: movie-ratings SVD ---------- */
  add('ch4', {
    id: 'b1',
    title: 'SVD in the wild: movie ratings',
    subtitle: 'Book §4.7 · Examples 4.12–4.14 — singular triplets as stereotypical movies and viewers',
    intuition: String.raw`The book's most memorable SVD example: three viewers (Ali, Beatrix, Chandra) rate four movies (Star Wars, Blade Runner, Amelie, Delicatessen) in a data matrix \(A \in \mathbb{R}^{4\times3}\) (rows = movies, columns = viewers). Factorizing with the SVD and <b>interpreting the pieces</b>: left-singular vectors \(\boldsymbol{u}_i\) are <b>stereotypical movies</b>, right-singular vectors \(\boldsymbol{v}_j\) are <b>stereotypical viewers</b>, and each singular value is how much that stereotype matters. Any viewer's taste can be expressed as a combination of stereotypical viewers; any movie's likeability as a combination of stereotypical movies.`,
    math: [
      { h: 'What the book reads off', t: String.raw`The first left-singular vector \(\boldsymbol{u}_1\) has large absolute entries on the two <b>science-fiction</b> movies (Star Wars, Blade Runner) with a large \(\sigma_1\): the dominant "genre" direction. The matching \(\boldsymbol{v}_1\) has large entries for Ali and Beatrix — the sci-fi-loving viewers. So \(A \approx \sigma_1\boldsymbol{u}_1\boldsymbol{v}_1^\top\) already captures "the sci-fi lovers rate the sci-fi films highly" in a single rank-1 piece.` },
      { h: 'The three modeling assumptions (book’s)', t: String.raw`1. viewers rate consistently via the same linear map; 2. ratings are noise-free; 3. tastes decompose linearly over stereotype viewers (and movies over stereotype films).` },
      src(String.raw`§4.7, Examples 4.12–4.14 (vectors and the SVD; computing the SVD; movie ratings).`)
    ],
    ml: String.raw`This interpretation is exactly the machinery behind recommender systems (matrix factorization with latent "taste" dimensions), latent semantic analysis, and the low-rank prior in LoRA-style compression: the data is secretly governed by a few strong directions, and the SVD names them.`,
    byhand: {
      problem: String.raw`Mini version (2 movies × 2 viewers): \(A = \begin{pmatrix}5&1\\1&5\end{pmatrix}\) — rows: (Sci-fi, Romance); columns: (Ali, Beatrix). Compute the SVD ingredients and interpret \(\boldsymbol{u}_1, \boldsymbol{v}_1\).`,
      steps: [
        { t: 'Gram matrix', d: String.raw`\(A^\top A = \begin{pmatrix}26&10\\10&26\end{pmatrix}\): eigenvalues \(36\) and \(16\), so \(\sigma_1 = 6\), \(\sigma_2 = 4\).` },
        { t: 'Singular vectors', d: String.raw`\(\lambda = 36\): \(\boldsymbol{v}_1 = \tfrac{1}{\sqrt2}(1, 1)^\top\); \(\lambda = 16\): \(\boldsymbol{v}_2 = \tfrac{1}{\sqrt2}(1, -1)^\top\). Then \(\boldsymbol{u}_1 = A\boldsymbol{v}_1/\sigma_1 = \tfrac{1}{\sqrt2}(1, 1)^\top\), \(\boldsymbol{u}_2 = \tfrac{1}{\sqrt2}(1, -1)^\top\) (here \(A\) is symmetric, so \(U = V\)).` },
        { t: 'Interpret', d: String.raw`Top triplet \(\sigma_1\boldsymbol{u}_1\boldsymbol{v}_1^\top = 3\begin{pmatrix}1&1\\1&1\end{pmatrix}\): the "everything is liked" direction — Ali and Beatrix agree (both viewers load positively, both movies load positively). The second triplet \(2\boldsymbol{u}_2\boldsymbol{v}_2^\top = \begin{pmatrix}1&-1\\-1&1\end{pmatrix}\): the "disagreement" direction — Ali likes sci-fi over romance, Beatrix the reverse. The SVD has separated consensus from taste conflict.` }
      ],
      answer: String.raw`\(\sigma = (6, 4)\); rank-1 captures shared enthusiasm, the second triplet captures the personality split — stereotypical viewers, exactly as the book reads it.`
    }
  });

  /* ---------- Ch 6: exponential family ---------- */
  add('ch6', {
    id: 'b1',
    title: 'The exponential family',
    subtitle: 'Book §6.6 · Examples 6.13–6.14 — one form to rule Gaussian, Bernoulli, Beta, …',
    intuition: String.raw`Gaussians, Bernoullis, Betas, Poissons, Exponentials look unrelated, but the book shows they are all the <b>same shape</b> wearing different hats: the exponential family. Writing a distribution in this form reveals its <b>sufficient statistics</b> (what part of the data you actually need), its <b>natural parameters</b>, and — remarkably — <b>guarantees a conjugate prior exists</b> with a known form. This is the machinery behind why the Beta–Binomial update was "add counts".`,
    math: [
      { h: 'The form (book 6.107/6.119)', t: String.raw`$$p(\boldsymbol{x} \mid \boldsymbol{\theta}) = h(\boldsymbol{x})\,\exp\big(\langle\boldsymbol{\theta}, \boldsymbol{\phi}(\boldsymbol{x})\rangle - A(\boldsymbol{\theta})\big)$$ \(\boldsymbol{\phi}(\boldsymbol{x})\): <b>sufficient statistic</b>; \(\boldsymbol{\theta}\): <b>natural parameters</b>; \(A(\boldsymbol{\theta})\): log-partition (normalizer).` },
      { h: 'Book Example 6.13 — Gaussian', t: String.raw`With \(\boldsymbol{\phi}(x) = \binom{x}{x^2}\) and natural parameters \(\boldsymbol{\theta} = \begin{pmatrix}\mu/\sigma^2\\-\tfrac{1}{2\sigma^2}\end{pmatrix}\): $$p(x \mid \boldsymbol{\theta}) \propto \exp\!\left(\frac{\mu x}{\sigma^2} - \frac{x^2}{2\sigma^2}\right) \propto \exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$ — the Gaussian is in the family, with sufficient statistics \((x, x^2)\): mean and variance are all you need to know about Gaussian samples.` },
      { h: 'Book Example 6.14 — Bernoulli (and the sigmoid)', t: String.raw`$$p(x \mid \mu) = \exp\!\left[x\log\frac{\mu}{1 - \mu} + \log(1 - \mu)\right]$$ so \(\phi(x) = x\), natural parameter \(\theta = \log\frac{\mu}{1-\mu}\) (the <b>log-odds</b>), \(A(\theta) = \log(1 + e^{\theta})\). Inverting: \(\mu = \frac{1}{1 + e^{-\theta}}\) — <b>the sigmoid function appears</b>: it is the map from natural parameters to probabilities. That is why logistic regression outputs sigmoids of linear functions.` },
      { h: 'Book 6.120 — conjugate prior for free', t: String.raw`Every exponential-family member has a conjugate prior $$p(\boldsymbol{\theta} \mid \boldsymbol{\gamma}) = h_c(\boldsymbol{\theta})\exp\!\left(\left\langle\begin{pmatrix}\gamma_1\\\gamma_2\end{pmatrix}, \begin{pmatrix}\boldsymbol{\theta}\\-A(\boldsymbol{\theta})\end{pmatrix}\right\rangle - A_c(\boldsymbol{\gamma})\right)$$ with sufficient statistics \((\boldsymbol{\theta}, -A(\boldsymbol{\theta}))\) — which is how Table 6.2's conjugate pairs are derived, not memorized.` },
      src(String.raw`§6.6, Examples 6.13–6.14 and equations 6.107–6.120.`)
    ],
    ml: String.raw`Natural parameters are what generalized linear models and natural-gradient methods operate in; sufficient statistics are why minibatch training only needs running sums; and the sigmoid = "natural parameter → probability" map explains the shape of logistic regression.`,
    byhand: {
      problem: String.raw`Put the Bernoulli in exponential-family form and identify \(h, \phi, \theta, A\). Then state the conjugate prior of the Bernoulli via the family form.`,
      steps: [
        { t: 'Rewrite through exp-log', d: String.raw`\(p(x \mid \mu) = \mu^x(1 - \mu)^{1-x} = \exp\big[x\log\mu + (1 - x)\log(1 - \mu)\big]\).` },
        { t: 'Split into natural form', d: String.raw`$$= \exp\!\left[x\log\frac{\mu}{1 - \mu} + \log(1 - \mu)\right]$$ Identify: \(h(x) = 1\), \(\phi(x) = x\), \(\theta = \log\frac{\mu}{1-\mu}\), \(A(\theta) = -\log(1 - \mu) = \log(1 + e^{\theta})\).` },
        { t: 'Conjugate prior', d: String.raw`By (6.120), the conjugate prior lives on \((\theta, -A(\theta))\) — which in \(\mu\)-coordinates is exactly the Beta family. So the "add counts" rule of Chapter 6 is a theorem, not luck.` }
      ],
      answer: String.raw`\(h(x) = 1\), \(\phi(x) = x\), \(\theta = \log\frac{\mu}{1-\mu}\), \(A(\theta) = \log(1 + e^{\theta})\); inverting gives \(\mu = \sigma(\theta)\) — sigmoid reappears.`
    }
  });

  /* ---------- Ch 7: LP and QP ---------- */
  add('ch7', {
    id: 'b1',
    title: 'Convex optimization: linear and quadratic programs',
    subtitle: 'Book §7.3 · Examples 7.5–7.6 — the two problem classes with off-the-shelf solvers',
    intuition: String.raw`"Convex optimization" is not just a theory chapter — the book pins down the two workhorse <b>problem classes</b> that solvers eat for breakfast. In a <b>linear program (LP)</b> both objective and constraints are linear: contours are lines, and the optimum sits at a vertex of the feasible polytope. In a <b>quadratic program (QP)</b> the objective is a convex quadratic (elliptical contours) with linear constraints — this is precisely the SVM's native form (Chapter 12). For QPs with positive-definite \(Q\), the book derives the <b>analytic dual</b> — a formula, not an algorithm.`,
    math: [
      { h: 'LP (Example 7.5)', t: String.raw`$$\min_{\boldsymbol{x}} \boldsymbol{c}^\top\boldsymbol{x} \quad\text{s.t.}\quad A\boldsymbol{x} \le \boldsymbol{b}$$ e.g. \(\min -(5, 3)\boldsymbol{x}\) with five linear constraints — optimum at a vertex of the shaded polygon.` },
      { h: 'QP (Example 7.6)', t: String.raw`$$\min_{\boldsymbol{x}} \tfrac12\boldsymbol{x}^\top Q\boldsymbol{x} + \boldsymbol{c}^\top\boldsymbol{x} \quad\text{s.t.}\quad A\boldsymbol{x} \le \boldsymbol{b}, \qquad Q \succ 0$$ Book instance: \(Q = \begin{pmatrix}2&1\\1&4\end{pmatrix}\), \(\boldsymbol{c} = (5, 3)^\top\), box constraints \(|x_i| \le 1\). Elliptical contours; the star marks the constrained optimum inside the box.` },
      { h: 'The QP dual, analytically', t: String.raw`Lagrangian \(L = \tfrac12\boldsymbol{x}^\top Q\boldsymbol{x} + (\boldsymbol{c} + A^\top\boldsymbol{\lambda})^\top\boldsymbol{x} - \boldsymbol{\lambda}^\top\boldsymbol{b}\). Stationarity in \(\boldsymbol{x}\): \(Q\boldsymbol{x} + \boldsymbol{c} + A^\top\boldsymbol{\lambda} = 0 \Rightarrow \boldsymbol{x} = -Q^{-1}(\boldsymbol{c} + A^\top\boldsymbol{\lambda})\). Substitute: $$D(\boldsymbol{\lambda}) = -\tfrac12(\boldsymbol{c} + A^\top\boldsymbol{\lambda})^\top Q^{-1}(\boldsymbol{c} + A^\top\boldsymbol{\lambda}) - \boldsymbol{\lambda}^\top\boldsymbol{b}, \qquad \max_{\boldsymbol{\lambda} \ge 0} D(\boldsymbol{\lambda})$$ Strong duality holds by convexity — the SVM's dual (Ch 12) is this formula with \(Q\) built from kernels.`
      },
      src(String.raw`§7.3.1–7.3.2, Examples 7.5–7.6, equations 7.44–7.52.`)
    ],
    ml: String.raw`SVM = QP; LASSO = convex program with a nondifferentiable term; LPs schedule resources behind every large-scale system. "Just use a convex solver" is available precisely when your problem matches these shapes — a strong reason to prefer convex formulations when modeling.`,
    byhand: {
      problem: String.raw`Derive the dual of the book's QP: \(Q = \begin{pmatrix}2&1\\1&4\end{pmatrix}\), \(\boldsymbol{c} = (5,3)^\top\), \(A = I_2\), \(\boldsymbol{b} = (1,1)^\top\) (constraints \(x_i \le 1\)). Write \(D(\boldsymbol{\lambda})\).`,
      steps: [
        { t: 'Stationarity', d: String.raw`\(Q^{-1} = \tfrac13\begin{pmatrix}4&-1\\-1&2\end{pmatrix}\); \(\boldsymbol{x}^\star(\boldsymbol{\lambda}) = -Q^{-1}(\boldsymbol{c} + \boldsymbol{\lambda})\) since \(A^\top = I\).` },
        { t: 'Substitute', d: String.raw`$$D(\boldsymbol{\lambda}) = -\tfrac12(\boldsymbol{c} + \boldsymbol{\lambda})^\top Q^{-1}(\boldsymbol{\c + \lambda}) - \boldsymbol{\lambda}^\top\boldsymbol{b}, \qquad \boldsymbol{\lambda} \ge \boldsymbol{0}$$ With the numbers: \(D(\boldsymbol{\lambda}) = -\tfrac{1}{6}(\lambda_1 + 5, \lambda_2 + 3)\begin{pmatrix}4&-1\\-1&2\end{pmatrix}(\lambda_1 + 5, \lambda_2 + 3)^\top - \lambda_1 - \lambda_2\).` },
        { t: 'Read the structure', d: String.raw`\(D\) is concave in \(\boldsymbol{\lambda}\) (negative definite quadratic) — maximizing it is another nice convex problem. At the optimum, complementary slackness decides which box constraints stay active.` }
      ],
      answer: String.raw`\(D(\boldsymbol{\lambda}) = -\tfrac12(\boldsymbol{c} + \boldsymbol{\lambda})^\top Q^{-1}(\boldsymbol{c} + \boldsymbol{\lambda}) - \boldsymbol{\lambda}^\top\boldsymbol{b}\): the analytic QP dual, the SVM's skeleton.`
    }
  });

  /* ---------- Ch 8: cross-validation ---------- */
  add('ch8', {
    id: 'b1',
    title: 'Cross-validation and model selection',
    subtitle: 'Book §8.3–8.4 — the K-fold answer to "how good is my model, honestly?"',
    intuition: String.raw`The book frames the dilemma precisely: you want a <b>large training set</b> (good model) and a <b>large validation set</b> (trustworthy estimate), but both draw from the same limited data. A small validation set gives a noisy, high-variance estimate of performance. <b>K-fold cross-validation</b> is the compromise: partition into \(K\) chunks, train on \(K - 1\), validate on the held-out chunk, rotate \(K\) times, average. Every data point serves as training data \(K-1\) times and as validation data exactly once.`,
    math: [
      { h: 'The K-fold procedure (book §8.4)', t: String.raw`Partition \(\mathcal{D} = \mathcal{R} \cup \mathcal{V}\), \(\mathcal{R} \cap \mathcal{V} = \emptyset\). For \(k = 1, \dots, K\): train \(f^{(k)}\) on \(\mathcal{R}\) (all but chunk \(k\)), evaluate on \(\mathcal{V}\) (chunk \(k\)). Report $$R_{\text{CV}} = \frac1K\sum_{k=1}^K R(f^{(k)}, \mathcal{V}_k) \;\pm\; \text{SE across folds}$$` },
      { h: 'Model selection discipline', t: String.raw`Use CV error to <b>select</b> among candidate models/hyperparameters; if the candidates' confidence intervals overlap, prefer the simpler model (one-standard-error rule) — a noisier win is not a win. For unbiased final estimates, wrap hyperparameter tuning inside <b>nested CV</b> (inner loop tunes, outer loop evaluates).` },
      src(String.raw`§8.3–8.4, Figure 8.4; see also §8.5 (Maximum Likelihood / MAP) earlier in the chapter.`)
    ],
    ml: String.raw`Every leaderboard score, every "\(\pm\)" in a paper's table, every hyperparameter sweep runs on K-fold (or nested) CV. The one-SE rule and nested CV are the difference between tuning on the test set (fraud) and honest model selection.`,
    byhand: {
      problem: String.raw`4-fold CV MSEs for a model: \(\{0.2, 0.4, 0.3, 0.5\}\). Compute the CV estimate and its standard error; a rival model reports \(0.36 \pm 0.02\) — which do you pick?`,
      steps: [
        { t: 'Mean', d: String.raw`\(R_{\text{CV}} = (0.2 + 0.4 + 0.3 + 0.5)/4 = 0.35\).` },
        { t: 'Standard error', d: String.raw`Fold variance \(= \tfrac14[(0.2-0.35)^2 + (0.05)^2 + (0.05)^2 + (0.15)^2] = \tfrac14(0.0225 + 0.0025 + 0.0025 + 0.0225) = 0.0125\); SE \(= \sqrt{0.0125/4} \approx 0.056\).` },
        { t: 'Compare', d: String.raw`Ours: \(0.35 \pm 0.056\); rival: \(0.36 \pm 0.02\). Intervals overlap heavily — no statistical difference; by the one-SE rule prefer the simpler (or equally performing) model rather than declaring victory on 0.01.` }
      ],
      answer: String.raw`\(0.35 \pm 0.056\): statistically tied with the rival — parsimony decides.`
    }
  });

  /* ---------- Ch 9: polynomial regression ---------- */
  add('ch9', {
    id: 'b1',
    title: 'Polynomial regression: features end-to-end',
    subtitle: 'Book §9.2 · Examples 9.3–9.5 — lift x into monomials, then everything you know still applies',
    intuition: String.raw`"Linear regression" is linear in the <b>parameters</b>, not the inputs. The book's move: lift the scalar input into monomial features \(\boldsymbol{\phi}(x) = (1, x, x^2, \dots, x^{K-1})^\top\). A degree-\(K{-}1\) polynomial is then a <b>linear model in feature space</b>, and every result from this chapter — MLE, overfitting analysis, Bayesian version — transfers by replacing \(X\) with the <b>feature matrix</b> \(\Phi\). This one substitution is the bridge from "fitting lines" to "fitting curves" and, at scale, to kernels (Ch 12) and neural networks (learned \(\phi\)).`,
    math: [
      { h: 'The lift (book 9.14–9.15)', t: String.raw`$$\boldsymbol{\phi}(x) = \begin{pmatrix}1\\ x\\ \vdots\\ x^{K-1}\end{pmatrix}, \qquad f(x) = \sum_{k=0}^{K-1}\theta_k x^k = \boldsymbol{\phi}^\top(x)\,\boldsymbol{\theta}$$` },
      { h: 'Feature matrix & MLE (book 9.16, 9.19)', t: String.raw`$$\Phi = \begin{pmatrix}\boldsymbol{\phi}^\top(x_1)\\ \vdots\\ \boldsymbol{\phi}^\top(x_N)\end{pmatrix} \in \mathbb{R}^{N\times K} \qquad\Rightarrow\qquad \boldsymbol{\theta}_{\text{ML}} = (\Phi^\top\Phi)^{-1}\Phi^\top\boldsymbol{y}$$ Identical to the linear case with \(X \to \Phi\) (both are \(\theta\)-free, so the argmin is untouched).` },
      { h: 'The fine print (book remark)', t: String.raw`\((\Phi^\top\Phi)^{-1}\) exists iff \(\operatorname{rk}(\Phi) = K\) — features must be independent. And the noise-variance MLE (if \(\sigma^2\) unknown): \(\hat\sigma^2 = \tfrac{1}{N}\sum_n(y_n - \boldsymbol{\phi}^\top(x_n)\boldsymbol{\theta}_{\text{ML}})^2\). The overfitting behavior of large \(K\) is the Chapter 8 story in action.` },
      { h: 'Book Example 9.5 — the fit in practice', t: String.raw`\(N = 10\) points, \(x_n \sim U[-5, 5]\), \(y_n = -\sin(x_n/5) + \cos(x_n) + \epsilon\), \(\epsilon \sim \mathcal{N}(0, 0.2^2)\). Degree-4 MLE fit (\(K = 5\), \(\Phi \in \mathbb{R}^{10\times5}\)) tracks the true function well: enough features for the shape, not enough to chase the noise. Push \(K\) to 9 and the fit interpolates every point — Chapter 8's warning, demonstrated.` },
      src(String.raw`§9.2, Examples 9.3–9.5, equations 9.14–9.19.`)
    ],
    ml: String.raw`Feature maps \(\phi\) are the master idea of classical ML: polynomial features here, RBF features in kernel methods (Ch 12), learned features in deep nets. "\(\theta_{\text{ML}} = (\Phi^\top\Phi)^{-1}\Phi^\top y\)" is one line that survives every upgrade.`,
    byhand: {
      problem: String.raw`Degree-1 lift on two points \((0, 0)\) and \((2, 1)\): build \(\Phi\), compute \(\Phi^\top\Phi\), \(\Phi^\top\boldsymbol{y}\), and \(\hat{\boldsymbol{\theta}}_{\text{ML}}\) (add \(\lambda = 0\) if you like).`,
      steps: [
        { t: 'Feature matrix (K = 2)', d: String.raw`\(\Phi = \begin{pmatrix}1&0\\1&2\end{pmatrix}\), \(\boldsymbol{y} = (0, 1)^\top\): \(\Phi^\top\Phi = \begin{pmatrix}2&2\\2&4\end{pmatrix}\), \(\Phi^\top\boldsymbol{y} = (1, 2)^\top\).` },
        { t: 'Solve', d: String.raw`\(\det = 4\): \(\hat\theta = \tfrac14\begin{pmatrix}4&-2\\-2&2\end{pmatrix}(1, 2)^\top = \tfrac14(0, 2)^\top = (0, 0.5)^\top\).` },
        { t: 'Check', d: String.raw`\(\hat y = 0.5x\): residuals \(0\) and \(0\) — the two points are collinear on this line, so the MLE interpolates exactly.` }
      ],
      answer: String.raw`\(\hat y = 0.5x\) via the feature-matrix route — the polynomial pipeline in miniature.`
    }
  });

  /* ---------- Ch 10: MNIST PCA ---------- */
  add('ch10', {
    id: 'b1',
    title: 'PCA in the wild: MNIST “8”s and high-dimensional data',
    subtitle: 'Book §10.3 & 10.7–10.8 · Examples 10.2–10.5 — eigenvalue spectra, code vectors, generating data',
    intuition: String.raw`The book grounds PCA in a real dataset: take every digit "8" in the MNIST training set (\(28\times28 = 784\)-dimensional vectors) and compute the eigenvalues of the data covariance. The finding (Figure 10.5): only a <b>handful of the 784 eigenvalues differ meaningfully from zero</b> — the "8"s, for all their apparent variety, effectively live in a low-dimensional subspace. This is the empirical justification for everything in the chapter: compression, denoising, and the latent-variable view all ride on that decaying spectrum.`,
    math: [
      { h: 'What the book reports (Ex 10.2)', t: String.raw`Sorted eigenvalues plunge to near zero within the first few dozen components; the captured-variance curve (Figure 10.5b) saturates quickly — a few principal components retain most of the variance of all MNIST "8"s.` },
      { h: 'Code representation (Ex 10.1)', t: String.raw`A data point \(\boldsymbol{x}\) becomes its <b>code</b>: the \(M\) principal coordinates \(z = B^\top(\boldsymbol{x} - \boldsymbol{\mu})\) (with \(B\) = top eigenvectors). Reconstruction: \(\hat{\boldsymbol{x}} = \boldsymbol{\mu} + Bz\). The code is the compressed "address" of the point in the subspace.` },
      { h: 'PCA in high dimensions (§10.7)', t: String.raw`When \(D\) is huge (784, or 10⁶ pixels), never form \(X^\top X\) explicitly: compute the top eigenpairs via <b>power iteration / Lanczos</b> on \(S\boldsymbol{v}\) (matrix–vector products only), or take the SVD of the centered data matrix — cost scales with \(N M\), not \(D^2\).` },
      { h: 'Generating with latent variables (Ex 10.5)', t: String.raw`Pick \(z \sim\) inside the code distribution, decode \(\hat{\boldsymbol{x}} = \boldsymbol{\mu} + Bz\): the book shows generated "8"s that look plausible — a deterministic ancestor of the probabilistic version (PPCA, Ch 10's end; VAEs beyond).` },
      src(String.raw`§10.3 Examples 10.1–10.2; §10.7 (high-dimensional PCA); §10.8 Examples 10.3–10.5 (embedding, reconstruction, generation).`)
    ],
    ml: String.raw`The MNIST spectrum is the classical evidence for "real data is low-dimensional" — the claim every autoencoder, diffusion model, and manifold-learning method quietly relies on. Checking a dataset's eigenvalue decay is the first thing to do before believing a low-dimensional story.`,
    byhand: null
  });

  /* ---------- Ch 6 cheatsheet: exponential family entry ---------- */
  MML.chapters.forEach(function (ch) {
    if (ch.id === 'ch6' && ch.cheatsheet) {
      ch.cheatsheet.push({
        n: 'Exponential family',
        t: String.raw`$$p(x \mid \theta) = h(x)\,e^{\langle\theta, \phi(x)\rangle - A(\theta)} \;\Rightarrow\; \text{conjugate prior exists (6.120)}$$`
      });
    }
    if (ch.id === 'ch8' && ch.cheatsheet) {
      ch.cheatsheet.push({
        n: 'K-fold cross-validation',
        t: String.raw`$$R_{\text{CV}} = \frac1K\sum_{k=1}^K R(f^{(k)}, \mathcal{V}_k) \pm \text{SE}; \quad \text{overlapping SEs} \Rightarrow \text{simpler model}$$`
      });
    }
  });
})();
