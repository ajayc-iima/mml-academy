/* Exam patterns — the reusable solution templates behind most assessment problems. */
(function () {
  MML.patterns = [
    {
      id: 'mle', icon: '🎯', name: 'The MLE recipe',
      see: String.raw`Any question of the form "find the maximum likelihood estimate of \(\theta\) given data…" — exponential families, Gaussians, Bernoullis, regression noise models.`,
      math: [
        { h: 'The four steps', t: String.raw`$$\mathcal{L}(\theta) = \prod_i p(x_i \mid \theta) \;\xrightarrow{\;\log\;}\; \ell(\theta) = \textstyle\sum_i \log p(x_i \mid \theta) \;\xrightarrow{\;\frac{d}{d\theta} = 0\;}\; \hat\theta \;\xrightarrow{\;\text{check } \ell'' \lt 0\;}\; \text{maximum ✓}$$` }
      ],
      steps: [
        String.raw`Write the joint likelihood as a <b>product</b> (independence), then take \(\log\) — it turns products into sums and kills the exponentials' constants.`,
        String.raw`Differentiate, set to zero, solve. The answer almost always lands in terms of the data through a <b>sufficient statistic</b> (\(\sum x_i\), \(\bar{x}\), \(\sum x_i^2\)).`,
        String.raw`Verify concavity (\(\ell'' \lt 0\)) — one line, and graders look for it.`,
        String.raw`Memorize the classics: Exponential \(\hat\lambda = 1/\bar{x}\); Gaussian \(\hat\mu = \bar{x}\); Bernoulli \(\hat p =\) sample frequency; Gaussian noise ⇒ least squares.`
      ],
      refs: [{ set: 'mini1', n: 'c' }, { set: 'hw2', n: 'PA' }]
    },
    {
      id: 'convex', icon: '🥣', name: 'Convexity & smoothness: the Hessian sandwich',
      see: String.raw`"Is \(F\) convex? Strongly convex? \(L\)-smooth?" — always answered by bounding the second derivative above and below.`,
      math: [
        { h: 'The sandwich', t: String.raw`$$\mu I \;\preceq\; \nabla^2 F(\boldsymbol{w}) \;\preceq\; L\,I \quad\Longrightarrow\quad \mu\text{-strongly convex and } L\text{-smooth}$$` },
        { h: 'Scalar version', t: String.raw`$$\mu \;\le\; F''(w) \;\le\; L \quad \forall w$$ e.g. \(F = 2w^2 + w^4\): \(F'' = 4 + 12w^2 \ge 4\) (strongly convex ✓) but unbounded above (not \(L\)-smooth ✗).` }
      ],
      steps: [
        String.raw`Compute \(\nabla^2 F\) once. For logistic-type losses use \(\sigma'(t) = \sigma(t)(1-\sigma(t)) \in (0, \tfrac14]\) and \(\|\boldsymbol{x}_i\| \le 1\).`,
        String.raw`Lower bound: drop nonnegative terms (data terms are PSD: \(\sum_i c_i \boldsymbol{x}_i\boldsymbol{x}_i^\top \succeq 0\)); the \(\ell_2\) regularizer contributes \(2\lambda I\).`,
        String.raw`Upper bound: bound coefficients (\(c_i \le \tfrac14\)), then Cauchy–Schwarz the quadratic forms.`,
        String.raw`Flat segments or linear ramps ⇒ <b>not strongly convex</b>; curvature \(\to \infty\) (quartic growth) ⇒ <b>not \(L\)-smooth</b>.`
      ],
      refs: [{ set: 'mini1', n: 'd' }, { set: 'mini1p', n: 'b' }, { set: 'hw1', n: 'P3' }]
    },
    {
      id: 'gdstab', icon: '🎚️', name: 'Gradient-descent stability arithmetic',
      see: String.raw`"Classify the iterate behavior for step size \(\eta\)…" or "largest \(\eta\) that still decreases the objective."`,
      math: [
        { h: 'Per-direction contraction', t: String.raw`$$w_{t+1} = (1 - \eta\lambda)\,w_t \;\Rightarrow\; |w_t| = |1 - \eta\lambda|^t |w_0|$$ $$|1-\eta\lambda| \lt 1 \text{ converges}, \quad = 1 \text{ oscillates}, \quad \gt 1 \text{ diverges}$$` },
        { h: 'The two thresholds', t: String.raw`$$\text{stability: } \eta \lt \frac{2}{\lambda_{\max}} \qquad \text{guaranteed descent: } \eta \le \frac{1}{L}$$` }
      ],
      steps: [
        String.raw`For quadratics, diagonalize: each eigen-direction evolves independently with its own factor \(|1 - \eta\lambda_i|\).`,
        String.raw`Read off behavior from the factor: \(0.9\) → crawl, \(0.5\) → fast decay, \(-1\) → flip-flop, \(1.1\) → explosion.`,
        String.raw`For general \(L\)-smooth \(F\), the descent lemma gives monotone decrease iff \(\eta \le 1/L\) (strictly decreasing unless at a critical point).`
      ],
      refs: [{ set: 'mini1', n: 'e' }, { set: 'hw1', n: 'P3' }]
    },
    {
      id: 'margin', icon: '📏', name: 'Progress + control + Cauchy–Schwarz (margin proofs)',
      see: String.raw`Perceptron / margin-perceptron / boosting-style bounds: "show the algorithm terminates in \(O(\cdot)\) rounds."`,
      math: [
        { h: 'The three-beat proof', t: String.raw`$$\underbrace{{\boldsymbol{w}^*}^\top\boldsymbol{w}_{t+1} \ge {\boldsymbol{w}^*}^\top\boldsymbol{w}_t + \gamma}_{\text{growth: alignment grows}} \qquad \underbrace{\|\boldsymbol{w}_{t+1}\|^2 \le \|\boldsymbol{w}_t\|^2 + R^2}_{\text{control: norm grows slowly}}$$ $$\gamma T \le {\boldsymbol{w}^*}^\top\boldsymbol{w}_{T+1} \overset{\text{C-S}}{\le} \|\boldsymbol{w}_{T+1}\| \le \sqrt{R^2 T} \;\Rightarrow\; T \le \frac{R^2}{\gamma^2}$$` }
      ],
      steps: [
        String.raw`<b>Growth:</b> expand \({\boldsymbol{w}^*}^\top(\boldsymbol{w}_t + y_i\boldsymbol{x}_i)\); the update's violation condition makes the cross term \(\le 0\) or \(\le 1\).`,
        String.raw`<b>Control:</b> expand \(\|\boldsymbol{w}_t + y_i\boldsymbol{x}_i\|^2\); bound \(2y_i\boldsymbol{w}_t^\top\boldsymbol{x}_i\) by the violation type and \(\|\boldsymbol{x}_i\|^2 \le R^2\).`,
        String.raw`<b>Collide:</b> unroll both to time \(T\), squeeze between \(\gamma T\) and \(\sqrt{R^2T}\), solve the quadratic inequality in \(\sqrt{T}\).`
      ],
      refs: [{ set: 'hw1', n: 'P1' }]
    },
    {
      id: 'kernelclose', icon: '➗', name: 'Kernel closure algebra',
      see: String.raw`"Show that \(k\) built from valid kernels is a valid kernel" — the answer is always: <b>exhibit the feature map</b>.`,
      math: [
        { h: 'The four moves', t: String.raw`$$\alpha k_1:\; \phi = \sqrt{\alpha}\,\phi_1 \qquad k_1 + k_2:\; \phi = \begin{pmatrix}\phi_1 \\ \phi_2\end{pmatrix} \qquad k_1 k_2:\; \phi = \phi_1 \otimes \phi_2$$ $$\text{limits / sums: } \sum_r \alpha_r k^r \text{ valid by induction}$$` }
      ],
      steps: [
        String.raw`Scaling → multiply the map by \(\sqrt{\alpha}\). Sum → <b>concatenate</b> the maps (inner products split blockwise).`,
        String.raw`Product → <b>tensor product</b>: coordinates are pairwise products; the double sum factors into \(k_1 k_2\).`,
        String.raw`Anything built from \(+\), \(\times\), nonnegative scaling, and limits of valid kernels stays valid (this generates polynomial and RBF kernels).`
      ],
      refs: [{ set: 'hw2', n: 'P1' }]
    },
    {
      id: 'dualsvm', icon: '⚖️', name: 'Kernelize → substitute the Gram matrix',
      see: String.raw`SVM questions with an explicit kernel: write the dual, then <b>substitute the kernel's values</b> — the Gram matrix is everything.`,
      math: [
        { h: 'Dual with kernels', t: String.raw`$$\max_{\boldsymbol{\alpha} \ge 0} \sum_i \alpha_i - \tfrac12 \sum_{ij} \alpha_i\alpha_j y_iy_j\, k(\boldsymbol{x}_i, \boldsymbol{x}_j), \qquad f(\boldsymbol{x}) = \mathrm{sign}\Big(\sum_i \alpha_i y_i\, k(\boldsymbol{x}_i, \boldsymbol{x})\Big)$$` }
      ],
      steps: [
        String.raw`Write the representer form \(\boldsymbol{w} = \sum_i \alpha_i y_i \phi(\boldsymbol{x}_i)\); every \(\boldsymbol{w}^\top\boldsymbol{w}\) becomes a double sum over \(k(\boldsymbol{x}_i, \boldsymbol{x}_j)\).`,
        String.raw`Plug in the <b>concrete kernel values</b> (e.g. the delta kernel: \(k_{ii} = 1\), \(k_{ij} = 0\)) — the problem usually collapses to something trivially solvable.`,
        String.raw`Read the classifier off \(f(\boldsymbol{x})\); check training error (usually 0 for these) and unseen points (the punchline: memorization ≠ generalization).`
      ],
      refs: [{ set: 'hw2', n: 'P2' }]
    },
    {
      id: 'entropy', icon: '🌳', name: 'Split quality: entropy vs classification error',
      see: String.raw`Decision-tree questions: "which split is best?" — enumerate, compute <b>weighted child impurity</b>, compare.`,
      math: [
        { h: 'Weighted entropy', t: String.raw`$$H_{\text{split}} = \frac{|L|}{n}H(p_L) + \frac{|R|}{n}H(p_R), \qquad H(p) = -p\log_2 p - (1-p)\log_2(1-p)$$` }
      ],
      steps: [
        String.raw`For each candidate feature: partition, find child majorities (for error) and child positive rates (for entropy).`,
        String.raw`Classification error is <b>insensitive</b>: pure-node-creating splits can tie with useless ones. Entropy is strictly concave → strictly rewards purity.`,
        String.raw`Standard values to reuse: \(H(0) = H(1) = 0\), \(H(\tfrac12) = 1\), \(H(\tfrac14) = H(\tfrac34) \approx 0.811\).`
      ],
      refs: [{ set: 'hw2', n: 'P3' }]
    },
    {
      id: 'boost', icon: '🔁', name: 'Recursive reweighting bounds (AdaBoost)',
      see: String.raw`Boosting questions: bound the training error of a weighted-majority vote. The whole proof is bookkeeping with the weight recursion.`,
      math: [
        { h: 'The chain', t: String.raw`$$\mathbb{1}[\text{err}] \le e^{-yH(x)} \;\;\xrightarrow{\;\text{unroll weights}\;}\;\; \frac1n\sum_i e^{-y_iH_T(x_i)} = \prod_{t=1}^T Z_t \;\;\xrightarrow{\;\min_\alpha Z_t\;}\;\; Z_t = 2\sqrt{\epsilon_t(1-\epsilon_t)} \le e^{-2\gamma^2}$$` }
      ],
      steps: [
        String.raw`0/1 loss ≤ exponential loss pointwise (an exponential is \(\ge 1\) exactly when its exponent is \(\le 0\)).`,
        String.raw`Induct the closed form \(w_{T+1,i} = e^{-y_iH_T(x_i)}/\prod_t Z_t\); normalizing gives the identity with \(\prod Z_t\).`,
        String.raw`Split \(Z_t\) into correct/incorrect: \((1-\epsilon_t)e^{-\alpha_t} + \epsilon_t e^{\alpha_t}\); minimize over \(\alpha_t\) → \(\tfrac12\log\frac{1-\epsilon_t}{\epsilon_t}\).`,
        String.raw`Use the weak-learner promise \(\epsilon_t \le \tfrac12 - \gamma\) and \(1 - x \le e^{-x}\) to finish: error \(\le e^{-2\gamma^2T}\).`
      ],
      refs: [{ set: 'hw3', n: 'P1' }]
    },
    {
      id: 'pca', icon: '🧭', name: 'PCA: Pythagoras + Lagrange, variance = eigenvalue',
      see: String.raw`Anything about principal components, explained variance, or reconstruction error — all three identities interlock.`,
      math: [
        { h: 'The three identities', t: String.raw`$$\text{error} = \|\boldsymbol{x}\|^2 - (\boldsymbol{q}^\top\boldsymbol{x})^2 \;\Rightarrow\; \min\text{-error} \equiv \max\text{-variance}$$ $$\boldsymbol{q}^\top S\boldsymbol{q} \le \lambda_1 \text{ (unit } \boldsymbol{q}), \qquad \text{FVE}(d) = \frac{\textstyle\sum_{j \le d}\lambda_j}{\textstyle\sum_j \lambda_j}, \qquad \text{error}_d = \sum_{j \gt d} \lambda_j$$` }
      ],
      steps: [
        String.raw`Projection residuals are orthogonal to the projection (expand and use \(\|\boldsymbol{q}\| = 1\)) — that's the entire equivalence proof.`,
        String.raw`Constrained maxima: Lagrangian \(\boldsymbol{q}^\top S\boldsymbol{q} - \lambda(\boldsymbol{q}^\top\boldsymbol{q} - 1)\) → \(\boldsymbol{q}\) is an eigenvector and the value <b>is</b> the eigenvalue.`,
        String.raw`Repeated eigenvalues ⇒ the PC is <b>not unique</b> (any orthonormal basis of the eigenspace works) — a favorite trick question.`,
        String.raw`Dropped eigenvalues are the per-point squared reconstruction error; FVE is the budget report for choosing \(d\).`
      ],
      refs: [{ set: 'hw3', n: 'P2' }, { set: 'final', n: '7' }, { set: 'final', n: '8' }]
    },
    {
      id: 'softeps', icon: '🧊', name: 'Soft → hard limits (σ → 0, k → ∞)',
      see: String.raw`"What does GMM/EM resemble as \(\sigma \to 0\)?" — whenever a limit turns soft quantities into indicators.`,
      math: [
        { h: 'Responsibilities collapse', t: String.raw`$$p_{ij} = \frac{e^{-\|\boldsymbol{x}_i - \boldsymbol{\mu}_j\|^2/2\sigma^2}}{\sum_l e^{-\|\boldsymbol{x}_i - \boldsymbol{\mu}_l\|^2/2\sigma^2}} \;\xrightarrow{\;\sigma \to 0\;}\; \mathbb{1}\big[j = \arg\min_l \|\boldsymbol{x}_i - \boldsymbol{\mu}_l\|\big]$$` }
      ],
      steps: [
        String.raw`Exponentials with different negative rates: as \(\sigma \to 0\), the <b>smallest distance dominates</b> by a factor \(e^{c/\sigma^2}\), \(c \gt 0\).`,
        String.raw`Soft responsibilities → nearest-centroid indicators; weighted means → cluster means; EM → Lloyd's k-means.`,
        String.raw`Same move elsewhere: \(k \to \infty\) in k-NN → constant predictor; \(\beta \to \infty\) in scaled logistic loss → hard margin.`
      ],
      refs: [{ set: 'hw3', n: 'P3' }, { set: 'final', n: '5' }, { set: 'final', n: '6' }]
    },
    {
      id: 'elbo', icon: '🧩', name: 'Assemble the ELBO (VAE computations)',
      see: String.raw`Any VAE question with concrete numbers: reparameterize → MC reconstruction → closed-form Gaussian KL → combine.`,
      math: [
        { h: 'The three parts', t: String.raw`$$z = \mu_\phi + \sigma_\phi\,\varepsilon, \quad \varepsilon \sim \mathcal{N}(0,1) \qquad \log p_\theta(x \mid z) = -\tfrac12(x - d_\theta(z))^2 + \text{const}$$ $$\mathrm{KL}(\mathcal{N}(\mu, \sigma^2) \| \mathcal{N}(0,1)) = \tfrac12\big(\mu^2 + \sigma^2 - 1 - \log\sigma^2\big) \qquad \widehat{\mathrm{ELBO}} = \widehat{\mathbb{E}}[\log p_\theta] - \mathrm{KL}$$` }
      ],
      steps: [
        String.raw`Compute each \(z_i = \mu_\phi + \sigma_\phi\varepsilon_i\) explicitly; look up the given \(d_\theta(z_i)\).`,
        String.raw`Reconstruction: average the \(-\tfrac12(x - d_\theta(z_i))^2\) over samples (Gaussian decoder ⇒ squared errors).`,
        String.raw`KL: plug \((\mu_\phi, \sigma_\phi)\) into the memorized formula — no integration on exams.`,
        String.raw`ELBO = reconstruction − KL, constants dropped. Remember <em>why</em>: encoder focuses samples, KL anchors them to the prior.`
      ],
      refs: [{ set: 'final', n: '11' }, { set: 'final', n: '2.2' }]
    },
    {
      id: 'curse', icon: '📉', name: 'High-dimension acceptance arguments',
      see: String.raw`Rejection / importance sampling in dimension \(D\): compute the constant \(c\), then watch acceptance collapse.`,
      math: [
        { h: 'Acceptance = 1/c', t: String.raw`$$c = \max_x \frac{p(x)}{q(x)}, \qquad P(\text{accept}) = \frac{1}{c \cdot \text{(normalization)}} = \frac{1}{c} \text{ (both normalized)}$$ Gaussian pair example: \(c = \left(\frac{\sigma_q}{\sigma_p}\right)^{D} \to 2^D\), acceptance \(2^{-D}\).` }
      ],
      steps: [
        String.raw`Form the ratio \(p/q\); it's a constant times an exponential in \(\|\boldsymbol{x}\|^2\) — maximize at the origin or the tent's peak.`,
        String.raw`Tightest proposal: match the support exactly; \(c\) is the peak ratio of densities.`,
        String.raw`State the moral: acceptance decays <b>exponentially</b> in \(D\) (volume ratios); importance weights explode in variance when \(q\) misses where the integrand lives.`
      ],
      refs: [{ set: 'final', n: '9' }, { set: 'final', n: '10' }]
    },
    {
      id: 'adjoint', icon: '🔁', name: 'Reverse-mode adjoint rules (autodiff by hand)',
      see: String.raw`"Compute the backward pass / adjoints for this block" — apply the four layer rules; watch for residual paths.`,
      math: [
        { h: 'The layer rules', t: String.raw`$$\boldsymbol{z} = \boldsymbol{W}\boldsymbol{x}:\; \bar{\boldsymbol{W}} = \bar{\boldsymbol{z}}\,\boldsymbol{x}^\top,\;\; \bar{\boldsymbol{x}} = \boldsymbol{W}^\top\bar{\boldsymbol{z}} \qquad \boldsymbol{u} = \phi(\boldsymbol{z}) \text{ elementwise: } \bar{\boldsymbol{z}} = \phi'(\boldsymbol{z}) \odot \bar{\boldsymbol{u}}$$ $$\boldsymbol{h} = \boldsymbol{x} + a\,\boldsymbol{u}:\; \bar{\boldsymbol{x}} \mathrel{+}= \bar{\boldsymbol{h}},\;\; \bar{\boldsymbol{u}} = a\,\bar{\boldsymbol{h}},\;\; \bar{a} = \bar{\boldsymbol{h}}^\top\boldsymbol{u}$$` }
      ],
      steps: [
        String.raw`Forward pass numbers first — every backward quantity is a product of forward values and upstream adjoints.`,
        String.raw`Walk the graph in reverse, one local rule per edge; \(\odot\) the ReLU/sigmoid gates with their masks (\(\mathbb{1}\{z \gt 0\}\), \(\sigma(1-\sigma)\)).`,
        String.raw`Variables with multiple paths (residual \(\boldsymbol{x}\)) collect <b>sums</b> of contributions from each path — the #1 exam trap.`,
        String.raw`Residual Jacobian is \(I + \partial g\): the \(+I\) is why gradients never vanish in ResNets.`
      ],
      refs: [{ set: 'final', n: '1' }, { set: 'final', n: '2' }, { set: 'final', n: '2.1' }]
    }
  ];
})();
