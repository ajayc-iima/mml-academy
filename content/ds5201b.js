/* DS5201 course pack — part B: Optimization, Probability, Statistical Learning. FULL-FIDELITY. */
(function () {
  var tag = 'DS5201 · Mathematics & Statistics (Plaksha)';

  /* ==================== OPTIMIZATION PRACTICE ==================== */
  MML.exam.sets.push({
    id: 'ds-opt', icon: '📉', tag: tag,
    title: 'Practice: Continuous Optimization',
    sub: '8 problems · GD, momentum vs plain, SGD verification, Lagrange, duality, convexity, LP',
    problems: [
      {
        n: 1, pts: 2, topic: '1-D gradient descent', chapter: 'ch7', diff: 'easy',
        q: String.raw`GD on \(f(x) = (x-2)^2\) from \(x_0 = 0\), step \(\gamma = 0.4\): show 5 iterations, confirm convergence. Maximum step-size guaranteeing convergence?`,
        s: [
          String.raw`Gradient \(f'(x) = 2(x-2)\). Iteration \(x_{i+1} = x_i - 0.4\cdot2(x_i - 2) = 0.2x_i + 1.6\): $$\begin{array}{c|c|c} i & x_i & f(x_i)\\\hline 0 & 0.000 & 4.000\\ 1 & 1.600 & 0.160\\ 2 & 1.920 & 0.006\\ 3 & 1.984 & 0.0003\\ 4 & 1.997 & \approx 0\\ 5 & 1.999 & \approx 0 \end{array}$$ Convergence to \(x^\star = 2\) ✓.`,
          String.raw`Maximum step: the Lipschitz constant of \(f'\) is \(L = 2\). Guaranteed monotone descent: \(\gamma \lt 1/L = 0.5\); convergence (oscillation allowed) up to \(\gamma \lt 2/L = 1\). At \(\gamma = 1\): \(x_1 = 4\), \(x_2 = 0\), … oscillates indefinitely.`
        ],
        fin: String.raw`Converges (factor 0.2/step); monotone guarantee \(\gamma \lt 0.5\), stability boundary \(\gamma = 1\).`
      },
      {
        n: 2, pts: 3, topic: 'Momentum vs plain GD', chapter: 'ch7', diff: 'hard',
        q: String.raw`\(f = \tfrac12\boldsymbol{x}^\top\begin{pmatrix}2&1\\1&20\end{pmatrix}\boldsymbol{x} - (5, 3)^\top\boldsymbol{x}\), minimiser \(\boldsymbol{x}^\star \approx (2.487, 0.026)^\top\); Hessian eigenvalues of very different magnitude (narrow valley). From \((-3,-1)^\top\): 20 iterations of (a) plain GD (\(\gamma = 0.085\)) and (b) momentum \(v_{k+1} = \alpha v_k - \gamma\nabla f\), \(x_{k+1} = x_k + v_{k+1}\) (\(\alpha = 0.9\), \(v_0 = 0\)). Compare errors; explain when momentum helps.`,
        s: [
          String.raw`The elongated elliptical level curves make plain GD zig-zag across the narrow valley while creeping along it. True min: \(\boldsymbol{x}^\star = A^{-1}\boldsymbol{c} \approx (2.487, 0.026)^\top\).`,
          String.raw`Plain GD after 20 iterations: \(x^{(20)} \approx (2.35, 0.19)^\top\), error \(\|x^{(20)} - x^\star\| \approx 0.146\). Momentum GD (\(\Delta x_i = 0.9\Delta x_{i-1} - 0.085\nabla f\)): \(x^{(20)} \approx (3.53, 0.60)^\top\), error \(\approx 1.04\) — with \(\alpha = 0.9\) and \(\gamma = 0.085\) the step is <b>too large</b> for this setting; better with smaller \(\gamma\) and tuned \(\alpha\).`,
          String.raw`**Important takeaway:** momentum helps in well-tuned settings (damped oscillations, accelerated valley progress), but can overshoot when hyperparameters are not carefully chosen.`
        ],
        fin: String.raw`Plain ≈ 0.146 vs mistuned momentum ≈ 1.04 — momentum wins only when tuned.`
      },
      {
        n: 3, pts: 2, topic: 'SGD gradient verification', chapter: 'ch7', diff: 'med',
        q: String.raw`\(L = \|A\theta - b\|^2\), \(A = \begin{pmatrix}1&2\\3&4\\5&6\end{pmatrix}\), \(b = (1,2,3)^\top\): full-batch gradient at \(\theta = (0,0)^\top\) equals the sum of per-sample gradients.`,
        s: [
          String.raw`Full batch: \(\nabla_\theta L = 2A^\top(A\theta - b) = -2A^\top b = -2\begin{pmatrix}1&3&5\\2&4&6\end{pmatrix}\begin{pmatrix}1\\2\\3\end{pmatrix} = -2\begin{pmatrix}22\\28\end{pmatrix} = \begin{pmatrix}-44\\-56\end{pmatrix}\).`,
          String.raw`Per-sample gradients (each \(L_n = (\theta^\top a_n - b_n)^2\), \(\nabla = 2(\theta^\top a_n - b_n)a_n\)): \(n{=}1\): \(-2(1)(1,2) = (-2,-4)\); \(n{=}2\): \(-2(2)(3,4) = (-12,-16)\); \(n{=}3\): \(-2(3)(5,6) = (-30,-36)\). Sum: \((-44, -56)^\top\) ✓.`
        ],
        fin: String.raw`Both \((-44, -56)^\top\) — a mini-batch gradient is a partial sum of the full gradient.`
      },
      {
        n: 4, pts: 2, topic: 'Lagrange multiplier', chapter: 'ch7', diff: 'easy',
        q: String.raw`Minimise \(f = x_1^2 + x_2^2\) subject to \(h = x_1 + 2x_2 - 5 = 0\). Find \((x_1^\star, x_2^\star)\) and \(\nu^\star\).`,
        s: [
          String.raw`Lagrangian \(L = x_1^2 + x_2^2 + \nu(x_1 + 2x_2 - 5)\). Stationarity: \(\partial L/\partial x_1 = 2x_1 + \nu = 0\), \(\partial L/\partial x_2 = 2x_2 + 2\nu = 0\) ⟹ \(x_1 = -\nu/2\), \(x_2 = -\nu\).`,
          String.raw`Constraint: \(-\nu/2 + 2(-\nu) = 5 \Rightarrow -5\nu/2 = 5 \Rightarrow \nu = -2\). Thus \(x_1^\star = 1\), \(x_2^\star = 2\), \(\nu^\star = -2\).`,
          String.raw`Check: \(h(1,2) = 1 + 4 - 5 = 0\) ✓, \(f(1,2) = 5\). The multiplier \(\nu = -2 \lt 0\) indicates the constraint forces the objective upward (unconstrained min is 0 at the origin).`
        ],
        fin: String.raw`\((1, 2)\), \(\nu^\star = -2\), \(f^\star = 5\).`
      },
      {
        n: 5, pts: 3, topic: 'Lagrangian dual', chapter: 'ch7', diff: 'med',
        q: String.raw`Minimise \(x^2\) subject to \(g(x) = 1 - x \le 0\): (a) Lagrangian; (b) \(D(\lambda) = \min_x L(x, \lambda)\); (c) dual maximum, strong duality, complementary slackness.`,
        s: [
          String.raw`(a) \(L(x, \lambda) = x^2 + \lambda(1 - x)\) for \(\lambda \ge 0\).`,
          String.raw`(b) \(\partial L/\partial x = 2x - \lambda = 0 \Rightarrow x^\star = \lambda/2\). $$D(\lambda) = (\lambda/2)^2 + \lambda(1 - \lambda/2) = \lambda^2/4 + \lambda - \lambda^2/2 = \lambda - \lambda^2/4$$`,
          String.raw`(c) Maximise \(D\): \(dD/d\lambda = 1 - \lambda/2 = 0 \Rightarrow \lambda^\star = 2\). \(D(2) = 2 - 1 = 1\). Primal: \(\min_{x \ge 1} x^2 = 1\) at \(x^\star = 1\) ✓. <b>Strong duality holds</b>: primal = dual = 1. Complementary slackness: \(\lambda^\star(1 - x^\star) = 2(1 - 1) = 0\) ✓ (constraint active).`
        ],
        fin: String.raw`\(D(\lambda) = \lambda - \lambda^2/4\); \(\lambda^\star = 2\); primal = dual = 1.`
      },
      {
        n: 6, pts: 2, topic: 'Convexity check', chapter: 'ch7', diff: 'med',
        q: String.raw`Is \(f(x) = xe^x\) convex for all \(x\)? (a) definition check at \(x = 0, y = 1, \theta = 0.5\); (b) second-derivative test.`,
        s: [
          String.raw`(a) Definition at \(\theta = 0.5\): LHS \(f(0.5) = 0.5e^{0.5} \approx 0.824\); RHS \(0.5f(0) + 0.5f(1) = 0 + 0.5e \approx 1.359\). \(0.824 \le 1.359\) ✓ (holds here — but a single check never establishes convexity).`,
          String.raw`(b) \(f'(x) = e^x + xe^x = (1+x)e^x\), \(f''(x) = (2+x)e^x\). \(f'' \ge 0 \iff x \ge -2\). For \(x \lt -2\) (e.g. \(f''(-3) = -e^{-3} \lt 0\)) it is concave.`,
          String.raw`Conclusion: \(f(x) = xe^x\) is <b>NOT convex on all of \(\mathbb{R}\)</b> — convex only for \(x \ge -2\).`
        ],
        fin: String.raw`No — convex only on \([-2, \infty)\).`
      },
      {
        n: 7, pts: 2, topic: 'Convex vs non-convex in ML', chapter: 'ch7', diff: 'med',
        q: String.raw`Convex? (a) \(f(\theta) = \|y - X\theta\|^2\); (b) \(f(\theta) = -\log\sigma(\theta)\); (c) \(f(w) = \|w\|_1\); (d) \(f(W) = \|y - \sigma(Wx)\|^2\) for a nonlinear layer.`,
        s: [
          String.raw`(a) Convex — Hessian \(2X^\top X \succeq 0\) (PSD); quadratic in \(\theta\).`,
          String.raw`(b) Convex — \(-\log\sigma(\theta) = \log(1 + e^{-\theta})\), second derivative \(= \sigma(\theta)(1 - \sigma(\theta)) \gt 0\).`,
          String.raw`(c) Convex — \(\|w\|_1\) is a norm and all norms are convex: \(\|\theta x + (1-\theta)y\|_1 \le \theta\|x\|_1 + (1-\theta)\|y\|_1\) (triangle inequality).`,
          String.raw`(d) Non-convex — the composition with a nonlinearity and the product \(Wx\) create flat regions and kinks in \(W\): moving weights from negative to positive regimes changes the function discontinuously in slope.`
        ],
        fin: String.raw`(a), (b), (c) convex; (d) non-convex.`
      },
      {
        n: 8, pts: 2, topic: 'LP by hand', chapter: 'ch7', diff: 'med',
        q: String.raw`Maximise \(x_1 + x_2\) s.t. \(x_1 + x_2 \le 4\), \(x_1 \ge 0\), \(x_2 \ge 0\): feasible region, vertices, objective at each vertex, optimal set and why non-unique.`,
        s: [
          String.raw`The constraints intersect in a triangular region with vertices \((0,0)\), \((4,0)\), \((0,4)\). By the Fundamental Theorem of LP, an optimum occurs at a vertex. Evaluating: \(f(0,0) = 0\), \(f(4,0) = 4\), \(f(0,4) = 4\).`,
          String.raw`The optimum is <b>not unique</b>: every point on the segment joining \((4,0)\) and \((0,4)\) satisfies \(x_1 + x_2 = 4\) with objective \(t + (4 - t) = 4\). Geometrically: the level sets of the objective are lines with normal \(\nabla f = (1,1)^\top\) — exactly the normal of the active constraint, so contours run parallel to the boundary edge.`,
          String.raw`Remark: multiple optima occur only when an objective contour is parallel to an edge/face of the feasible polyhedron — "alternative optima". Most LPs have a unique optimal vertex.`
        ],
        fin: String.raw`Optimal value 4 on the entire edge \(\{(t, 4-t) : 0 \le t \le 4\}\).`
      }
    ]
  });

  /* ==================== 6.8 PROBABILITY PRACTICE ==================== */
  MML.exam.sets.push({
    id: 'ds-prob', icon: '🎲', tag: tag,
    title: 'Practice: Probability & Distributions',
    sub: 'Section 6.8 · 27 problems · Bayes, conjugacy, Gaussians, sampling — every ML flavor',
    problems: [
      {
        n: 'a', pts: 1, topic: 'Joint / conditional / independence', chapter: 'ch6', diff: 'easy',
        q: String.raw`Two fair dice, \(X\) = sum, \(Y\) = value on die 1. (a) \(P(X = 7)\)? (b) \(P(X = 7 \mid Y = 3)\)? (c) Independent?`,
        s: [
          String.raw`(a) \(P(X = 7) = 6/36 = 1/6\) (ways: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)).`,
          String.raw`(b) Given \(Y = 3\), \(X = 7\) only if die 2 shows 4: \(P(X = 7 \mid Y = 3) = 1/6\).`,
          String.raw`(c) \(P(X = 7) = 1/6 = P(X = 7 \mid Y = 3)\) — but this holds only for \(X = 7\). Check \(X = 2\): \(P(X = 2) = 1/36\) but \(P(X = 2 \mid Y = 3) = 0\) (can't get sum 2 with die 1 showing 3). So \(P(X = 2) \ne P(X = 2 \mid Y = 3)\): <b>not independent</b>.`
        ],
        fin: String.raw`1/6; 1/6; not independent (one matching case proves nothing).`
      },
      {
        n: 'b', pts: 1, topic: 'Sum & product rule', chapter: 'ch6', diff: 'easy',
        q: String.raw`Bag: 3 red, 2 blue; draw 2 with replacement. (a) \(P(2\text{nd red})\) by marginalising over the 1st draw. (b) \(P(2\text{nd red} \mid 1\text{st red})\)?`,
        s: [
          String.raw`(a) \(P(R_2) = P(R_2|R_1)P(R_1) + P(R_2|B_1)P(B_1) = \tfrac35\cdot\tfrac35 + \tfrac35\cdot\tfrac25 = \tfrac9{25} + \tfrac6{25} = \tfrac35\).`,
          String.raw`(b) With replacement, draws are independent: \(P(R_2|R_1) = 3/5\). Sum rule confirms: \(P(R_2) = 3/5\) matches the marginal (consistency check ✓).`
        ],
        fin: String.raw`Both 3/5 — replacement restores independence.`
      },
      {
        n: 'c', pts: 2, topic: "Bayes' theorem", chapter: 'ch6', diff: 'easy',
        q: String.raw`Sensitivity \(P(+|D) = 0.95\), specificity \(P(-|\neg D) = 0.90\), prevalence \(P(D) = 0.02\). Positive predictive value \(P(D|+)\)?`,
        s: [
          String.raw`\(P(+|\neg D) = 1 - 0.90 = 0.10\). $$P(+) = P(+|D)P(D) + P(+|\neg D)P(\neg D) = 0.95\times0.02 + 0.10\times0.98 = 0.019 + 0.098 = 0.117$$`,
          String.raw`$$P(D|+) = \frac{0.95 \times 0.02}{0.117} = \frac{0.019}{0.117} \approx 0.162$$ Only 16.2% of positive tests indicate actual disease — the base-rate effect dominates.`
        ],
        fin: String.raw`PPV ≈ 16.2%.`
      },
      {
        n: 'd', pts: 2, topic: 'Beta–Binomial update', chapter: 'ch6', diff: 'med',
        q: String.raw`8 heads in 10 flips, prior \(\mathrm{Beta}(1,1)\) (uniform) on bias \(\mu\): (a) posterior; (b) posterior mean; (c) posterior mode.`,
        s: [
          String.raw`(a) Beta–Binomial conjugacy: posterior \(= \mathrm{Beta}(\alpha + h, \beta + N - h) = \mathrm{Beta}(1 + 8, 1 + 2) = \mathbf{Beta}(9, 3)\).`,
          String.raw`(b) Posterior mean: \(\hat\mu = 9/(9+3) = 0.75\). (c) Posterior mode (MAP): \((9-1)/(9+3-2) = 8/10 = 0.8\) (same as MLE here — the uniform prior adds no shrinkage). The posterior has shifted toward the data from the uniform prior.`
        ],
        fin: String.raw`Beta(9,3); mean 0.75; MAP 0.8.`
      },
      {
        n: 'e', pts: 1, topic: 'Poisson moments', chapter: 'ch6', diff: 'med',
        q: String.raw`\(X \sim \mathrm{Poisson}(\lambda = 4)\): \(\mathbb{E}[X]\), \(\mathbb{V}[X]\), \(\mathbb{E}[X(X-1)]\)?`,
        s: [
          String.raw`\(\mathbb{E}[X] = \lambda = 4\), \(\mathbb{V}[X] = \lambda = 4\) (Poisson mean = variance).`,
          String.raw`\(\mathbb{E}[X(X-1)] = \mathbb{E}[X^2] - \mathbb{E}[X]\). Using \(\mathbb{V}[X] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2\): \(\mathbb{E}[X^2] = 4 + 16 = 20\), so \(\mathbb{E}[X(X-1)] = 20 - 4 = 16 = \lambda^2\) — the factorial moment ✓.`
        ],
        fin: String.raw`4; 4; 16.`
      },
      {
        n: 'f', pts: 2, topic: 'Covariance ≠ independence', chapter: 'ch6', diff: 'med',
        q: String.raw`\(X \sim U[-1,1]\), \(Y = X^2\): (a) \(\mathrm{Cov}[X,Y]\)? (b) Independent?`,
        s: [
          String.raw`\(\mathbb{E}[X] = 0\) (symmetric); \(\mathbb{E}[Y] = \int_{-1}^1 x^2\cdot\tfrac12dx = \tfrac13\); \(\mathbb{E}[XY] = \mathbb{E}[X^3] = 0\) (odd function). $$\mathrm{Cov}[X,Y] = \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y] = 0$$`,
          String.raw`(b) Zero covariance, but \(Y = X^2\) is a deterministic function of \(X\) — clearly not independent. <b>Zero covariance does not imply independence.</b>`
        ],
        fin: String.raw`Cov = 0 but not independent.`
      },
      {
        n: 'g', pts: 2, topic: 'Conditional Gaussian', chapter: 'ch6', diff: 'med',
        q: String.raw`\(p(x_1, x_2) = \mathcal{N}\!\left(\begin{pmatrix}2\\5\end{pmatrix}, \begin{pmatrix}4&2\\2&9\end{pmatrix}\right)\). Find \(p(x_1 \mid x_2 = 3)\).`,
        s: [
          String.raw`Conditional Gaussian formula with \(\mu_x = 2\), \(\mu_y = 5\), \(\Sigma_{xx} = 4\), \(\Sigma_{yy} = 9\), \(\Sigma_{xy} = 2\): $$\mu_{1|2} = 2 + 2\cdot\tfrac19(3 - 5) = 2 - \tfrac49 = \tfrac{14}{9} \approx 1.556$$ $$\sigma^2_{1|2} = 4 - \tfrac{2\cdot2}{9} = 4 - \tfrac49 = \tfrac{32}{9} \approx 3.556$$`,
          String.raw`$$p(x_1 \mid x_2 = 3) = \mathcal{N}\!\left(\tfrac{14}{9}, \tfrac{32}{9}\right) \approx \mathcal{N}(1.56, 3.56)$$`
        ],
        fin: String.raw`\(\mathcal{N}(14/9, 32/9)\).`
      },
      {
        n: 'h', pts: 2, topic: 'Gaussian conjugate prior', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(X \sim \mathcal{N}(\theta, 1)\) (known variance), prior \(\theta \sim \mathcal{N}(\mu_0, \sigma_0^2)\), \(n\) i.i.d. samples: (a) posterior; (b) posterior mean as \(n \to \infty\)? Example: \(n = 5\), \(\bar x = 3\), \(\mu_0 = 0\), \(\sigma_0^2 = 1\).`,
        s: [
          String.raw`(a) The posterior is Gaussian (conjugacy) with: $$\sigma_n^2 = \frac{1}{1/\sigma_0^2 + n}, \qquad \mu_n = \sigma_n^2\left(\frac{\mu_0}{\sigma_0^2} + n\bar{x}\right)$$`,
          String.raw`(b) As \(n \to \infty\): \(\sigma_n^2 \to 0\) and \(\mu_n \to \bar{x}\) — <b>data overwhelm the prior</b>.`,
          String.raw`Example: \(\sigma_5^2 = 1/6 \approx 0.167\), \(\mu_5 = (1/6)(0 + 15) = 2.5\) — a precision-weighted average of prior mean and data mean.`
        ],
        fin: String.raw`Gaussian posterior; \(\mu_n \to \bar x\) as data grows; e.g. \(\mathcal{N}(2.5, 1/6)\).`
      },
      {
        n: 'i', pts: 2, topic: 'Change of variables', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(X \sim \mathrm{Exp}(\lambda)\), \(f_X(x) = \lambda e^{-\lambda x}\). Find the PDF of \(Y = -\log(1 - F_X(X))\) where \(F_X(x) = 1 - e^{-\lambda x}\).`,
        s: [
          String.raw`First: \(F_X(X) = 1 - e^{-\lambda X} \sim \mathrm{Uniform}[0,1]\) (probability integral transform). Let \(U = F_X(X)\); then \(Y = -\log(1 - U)\).`,
          String.raw`CDF of \(Y\): \(F_Y(y) = P(-\log(1 - U) \le y) = P(U \le 1 - e^{-y}) = 1 - e^{-y}\) for \(y \ge 0\). PDF: \(f_Y(y) = e^{-y}\): $$Y \sim \mathrm{Exp}(1)$$`,
          String.raw`General result: if \(X \sim \mathrm{Exp}(\lambda)\) then \(Y \sim \mathrm{Exp}(1)\), independent of \(\lambda\) — the basis of the <b>inverse-transform sampler</b> for exponential random variables.`
        ],
        fin: String.raw`\(Y \sim \mathrm{Exp}(1)\).`
      },
      {
        n: 'j', pts: 2, topic: 'Spam filter Bayes', chapter: 'ch6', diff: 'med',
        q: String.raw`\(P(\text{spam}) = 0.40\), \(P(\text{offer} \mid \text{spam}) = 0.70\), \(P(\text{offer} \mid \text{ham}) = 0.10\). (a) Sample space, target space, random variables? (b) \(P(\text{offer})\)? (c) \(P(\text{spam} \mid \text{offer})\)? (d) Two independent emails both contain "offer": probability both spam?`,
        s: [
          String.raw`(a) \(\Omega = \{\text{email}_1, \text{email}_2, \dots\}\); \(X: \Omega \to \{0,1\}\) (spam/ham), \(W: \Omega \to \{0,1\}\) (contains "offer").`,
          String.raw`(b) Sum rule: \(P(\text{offer}) = 0.70 \times 0.40 + 0.10 \times 0.60 = 0.28 + 0.06 = 0.34\).`,
          String.raw`(c) Bayes: \(P(\text{spam} \mid \text{offer}) = \tfrac{0.70 \times 0.40}{0.34} = \tfrac{0.28}{0.34} \approx 0.8235\).`,
          String.raw`(d) Independence: \((0.8235)^2 \approx 0.678\). Insight: Bayes transforms a 40% prior into an 82.4% posterior after evidence; naive Bayes spam filters extend this to \(P(\text{spam})\prod_i P(w_i \mid \text{spam})\) over all words.`
        ],
        fin: String.raw`0.34; ≈ 0.824; ≈ 0.678.`
      },
      {
        n: 'k', pts: 2, topic: 'Joint table & independence', chapter: 'ch6', diff: 'med',
        q: String.raw`Joint PMF: \(p(0,0) = 0.10\), \(p(0,1) = 0.40\), \(p(1,0) = 0.20\), \(p(1,1) = 0.30\) (\(X\) = topic, \(Y\) = sentiment). (a) Marginals; (b) \(p(Y \mid X = 0)\); (c) independent? (d) \(\mathbb{E}[X + 2Y]\)?`,
        s: [
          String.raw`(a) Row sums give \(p(x)\), column sums give \(p(y)\): \(p(X) = (0.50, 0.50)\), \(p(Y) = (0.30, 0.70)\).`,
          String.raw`(b) \(p(Y = 0 \mid X = 0) = 0.10/0.50 = 0.20\); \(p(Y = 1 \mid X = 0) = 0.40/0.50 = 0.80\).`,
          String.raw`(c) \(p(0,1) = 0.40\) but \(p(X{=}0)p(Y{=}1) = 0.50 \times 0.70 = 0.35 \ne 0.40\): <b>not independent</b> — positive sentiment is more likely in tech documents.`,
          String.raw`(d) Linearity: \(\mathbb{E}[X] = 0.5\), \(\mathbb{E}[Y] = 0.7\): \(\mathbb{E}[X + 2Y] = 0.5 + 1.4 = 1.9\).`
        ],
        fin: String.raw`Not independent (0.40 ≠ 0.35); \(\mathbb{E}[X + 2Y] = 1.9\).`
      },
      {
        n: 'l', pts: 2, topic: 'PDF / CDF', chapter: 'ch6', diff: 'med',
        q: String.raw`ReLU pre-activation modelled as \(f(z) = 3z^2\) on \([0,1]\), 0 otherwise: (a) valid PDF? (b) CDF? (c) \(P(0.5 \le Z \le 0.9)\)? (d) mean and variance?`,
        s: [
          String.raw`(a) \(f(z) \ge 0\) and \(\int_0^1 3z^2dz = [z^3]_0^1 = 1\) ✓.`,
          String.raw`(b) \(F(z) = z^3\) on \([0,1]\), 0 below, 1 above. (c) \(P(0.5 \le Z \le 0.9) = 0.9^3 - 0.5^3 = 0.729 - 0.125 = 0.604\).`,
          String.raw`(d) \(\mathbb{E}[Z] = \int_0^1 3z^3dz = 3/4 = 0.75\); \(\mathbb{E}[Z^2] = 3/5 = 0.6\); \(\mathbb{V}[Z] = 0.6 - 0.5625 = 0.0375\).`
        ],
        fin: String.raw`0.604; mean 0.75; variance 0.0375.`
      },
      {
        n: 'm', pts: 2, topic: 'Binomial — dropout', chapter: 'ch6', diff: 'med',
        q: String.raw`Dropout: each of \(n = 20\) neurons retained with \(p = 0.7\). (a) Distribution of active count \(K\)? (b) \(\mathbb{E}[K]\), \(\mathbb{V}[K]\)? (c) \(P(K \ge 18)\)? (d) Why the test-time scaling?`,
        s: [
          String.raw`(a) \(K \sim \mathrm{Bin}(20, 0.7)\). (b) \(\mathbb{E}[K] = np = 14\); \(\mathbb{V}[K] = np(1-p) = 4.2\).`,
          String.raw`(c) $$P(K \ge 18) = \binom{20}{18}(0.7)^{18}(0.3)^2 + \binom{20}{19}(0.7)^{19}(0.3) + (0.7)^{20} \approx 0.0278 + 0.0068 + 0.0008 = 0.0355$$`,
          String.raw`(d) At test time all 20 neurons are active; scaling outputs by \(p = 0.7\) (inverted dropout) matches the expected activation magnitude during training, keeping \(\mathbb{E}[\text{output}]\) consistent between train and test.`
        ],
        fin: String.raw`Bin(20, 0.7); 14; 4.2; ≈ 3.6%; test-time scaling preserves expected magnitudes.`
      },
      {
        n: 'n', pts: 2, topic: 'Latent-variable marginalization', chapter: 'ch11', diff: 'med',
        q: String.raw`Topics \(Z \in \{0, 1\}\), \(P(Z{=}0) = 0.6\); tech: data 0.5 / goal 0.3 / play 0.2; sport: 0.1 / 0.1 / 0.8. (a) \(P(W = \text{play})\)? (b) Full \(P(W)\)? (c) \(P(Z = 1 \mid W = \text{play})\)? (d) Verify conditionals sum to 1.`,
        s: [
          String.raw`(a) Sum rule: \(P(\text{play}) = 0.2 \times 0.6 + 0.8 \times 0.4 = 0.12 + 0.32 = 0.44\).`,
          String.raw`(b) \(P(\text{data}) = 0.30 + 0.04 = 0.34\); \(P(\text{goal}) = 0.18 + 0.04 = 0.22\); check \(0.34 + 0.22 + 0.44 = 1.00\) ✓.`,
          String.raw`(c) Bayes: \(P(Z = 1 \mid \text{play}) = \frac{0.8 \times 0.4}{0.44} = \frac{0.32}{0.44} \approx 0.727\).`,
          String.raw`(d) \(\sum_w P(w \mid Z = 0) = 0.5 + 0.3 + 0.2 = 1.0\) ✓; \(\sum_w P(w \mid Z = 1) = 0.1 + 0.1 + 0.8 = 1.0\) ✓ (conditionals are always valid PMFs).`
        ],
        fin: String.raw`0.44; (0.34, 0.22, 0.44); ≈ 0.727.`
      },
      {
        n: 'o', pts: 2, topic: 'Chain rule of probability', chapter: 'ch6', diff: 'med',
        q: String.raw`\(P(S{=}\text{robot}) = 0.5\), \(P(V{=}\text{learns} \mid S) = 0.6\), \(P(O{=}\text{quickly} \mid S, V) = 0.3\). (a) Joint? (b) General chain rule? (c) Parameter counts for \(n\) binary variables?`,
        s: [
          String.raw`(a) Product rule twice: \(P(S, V, O) = P(O \mid S, V)\,P(V \mid S)\,P(S) = 0.3 \times 0.6 \times 0.5 = 0.09\).`,
          String.raw`(b) \(P(X_1, \dots, X_n) = P(X_1)\prod_{i=2}^n P(X_i \mid X_1, \dots, X_{i-1})\).`,
          String.raw`(c) Full joint: \(2^n - 1\) parameters. Chain-rule factorization: \(1 + 2 + 4 + \dots + 2^{n-1} = 2^n - 1\) (same in general). Naive Bayes (independent given \(Y\)): only \(2n\) parameters — exponential savings when conditional independence approximately holds.`
        ],
        fin: String.raw`0.09; chain rule; \(2^n - 1\) — independence assumptions are what compress.`
      },
      {
        n: 'p', pts: 3, topic: 'Medical screening / base rates', chapter: 'ch6', diff: 'hard',
        q: String.raw`Prevalence 0.01, sensitivity 0.90, specificity 0.92. (a) PPV? (b) NPV? (c) Minimum sensitivity for PPV ≥ 0.50 (specificity 0.92)? (d) Why is accuracy misleading for rare diseases?`,
        s: [
          String.raw`False positive rate \(= 1 - 0.92 = 0.08\). (a) \(P(+) = 0.90 \times 0.01 + 0.08 \times 0.99 = 0.009 + 0.0792 = 0.0882\): $$\text{PPV} = \frac{0.009}{0.0882} \approx 0.102$$`,
          String.raw`(b) \(P(-) = 0.9118\), miss rate \(P(- \mid \text{cancer}) = 0.10\): NPV \(= \frac{0.92 \times 0.99}{0.9118} \approx 0.999\).`,
          String.raw`(c) Set PPV = 0.5: \(\frac{0.01\,\text{sens}}{0.01\,\text{sens} + 0.08 \times 0.99} = 0.5 \Rightarrow 0.005\,\text{sens} = 0.0396 \Rightarrow \text{sens} = 7.92\) — <b>impossible</b>! No sensitivity in [0,1] achieves PPV = 0.50 here; specificity must also improve.`,
          String.raw`(d) With 99% healthy, even a 92%-specific test produces ~8% false positives, overwhelming the 0.9% true positives. Accuracy is driven by the dominant class — use PPV/NPV/F1 for rare events (base-rate fallacy).`
        ],
        fin: String.raw`PPV ≈ 10.2%; NPV ≈ 99.9%; required sensitivity 7.92 — impossible.`
      },
      {
        n: 'q', pts: 2, topic: 'Sequential Bayesian update', chapter: 'ch6', diff: 'med',
        q: String.raw`\(P(H{=}1) = 0.3\); sensor \(P(+ \mid 1) = 0.8\), \(P(+ \mid 0) = 0.2\). Observe \(+\) then \(-\): update sequentially; verify against the joint.`,
        s: [
          String.raw`(a) First update: \(P(+) = 0.8 \times 0.3 + 0.2 \times 0.7 = 0.38\); \(P(H = 1 \mid +) = \tfrac{0.24}{0.38} \approx 0.6316\).`,
          String.raw`(b) New prior 0.6316; second observation \(-\): \(P(- \mid 1) = 0.2\), \(P(- \mid 0) = 0.8\): \(P(-) = 0.2 \times 0.6316 + 0.8 \times 0.3684 = 0.4211\); \(P(H = 1 \mid +,-) = \tfrac{0.1263}{0.4211} = 0.300\).`,
          String.raw`(c) Direct: \(P(+,- \mid 1) = 0.16\), \(P(+,- \mid 0) = 0.16\): \(P(H = 1 \mid +,-) = \tfrac{0.048}{0.16} = 0.3\) ✓. After one + and one −, the posterior returns to the prior (0.3) — the observations exactly cancel! The posterior after \(k\) observations is the prior for observation \(k+1\).`
        ],
        fin: String.raw`0 → 0.632 → 0.300: the two observations cancel.`
      },
      {
        n: 'r', pts: 2, topic: 'Minibatch gradient noise', chapter: 'ch6', diff: 'med',
        q: String.raw`Minibatch gradient \(\hat g = \frac1n\sum_i g_i\), \(g_i\) i.i.d., \(\mathbb{E}[g_i] = g\), \(\mathbb{V}[g_i] = \sigma^2\): (a) unbiased? (b) \(\mathbb{V}[\hat g]\)? (c) \(\sigma^2 = 4, n = 16\)? (d) correlated pair \(\rho = 0.5\)?`,
        s: [
          String.raw`(a) Linearity: \(\mathbb{E}[\hat g] = \frac1n\sum_i \mathbb{E}[g_i] = \frac1n \cdot ng = g\) ✓ unbiased.`,
          String.raw`(b) i.i.d.: \(\mathbb{V}[\hat g] = \frac{1}{n^2}\sum_i \mathbb{V}[g_i] = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}\).`,
          String.raw`(c) \(\mathbb{V}[\hat g] = 4/16 = 0.25\): standard deviation \(= 0.5\).`,
          String.raw`(d) \(\mathbb{V}[\tfrac12(g_1 + g_2)] = \tfrac14\sigma^2 + \tfrac14\sigma^2 + 2\cdot\tfrac12\cdot\tfrac12\,\rho\sigma^2 = \tfrac{\sigma^2}{2} + \tfrac{\rho\sigma^2}{2} = \tfrac{\sigma^2(1+\rho)}{2} = \tfrac{4 \times 1.5}{2} = 3\). vs \(\sigma^2/2 = 2\) if independent: correlation (\(\rho = 0.5\)) increases variance by 50%, reducing the benefit of averaging — why shuffling matters.`
        ],
        fin: String.raw`Unbiased; \(\sigma^2/n = 0.25\); correlated averaging gives 3 not 2.`
      },
      {
        n: 's', pts: 2, topic: 'Covariance & correlation', chapter: 'ch6', diff: 'med',
        q: String.raw`Points \((1,2), (2,4), (3,5), (4,4), (5,5)\): (a) moments; (b) variances and covariance; (c) \(\rho\); (d) \(\mathrm{Cov}[X, X^2]\) and redundancy?`,
        s: [
          String.raw`(a) Equal weights 1/5: \(\mathbb{E}X = 3\), \(\mathbb{E}Y = 4\), \(\mathbb{E}X^2 = 55/5 = 11\), \(\mathbb{E}Y^2 = 86/5 = 17.2\), \(\mathbb{E}XY = 66/5 = 13.2\).`,
          String.raw`(b) Raw-score formulae: \(\mathbb{V}X = 11 - 9 = 2\); \(\mathbb{V}Y = 17.2 - 16 = 1.2\); \(\mathrm{Cov} = 13.2 - 12 = 1.2\).`,
          String.raw`(c) \(\rho = \frac{1.2}{\sqrt{2 \times 1.2}} = \frac{1.2}{1.549} \approx 0.775\).`,
          String.raw`(d) \(\mathbb{E}[X^3] = 225/5 = 45\): \(\mathrm{Cov}[X, X^2] = 45 - 3 \times 11 = 12 \ne 0\): \(X\) and \(X^2\) are correlated — redundant information; motivates centering and PCA to decorrelate features before training.`
        ],
        fin: String.raw`\(\rho \approx 0.775\); \(\mathrm{Cov}[X, X^2] = 12\) — redundant features.`
      },
      {
        n: 't', pts: 2, topic: 'Deterministic dependence', chapter: 'ch6', diff: 'med',
        q: String.raw`\(X\) uniform on \(\{-2,-1,0,1,2\}\), \(Y = |X|\): (a) \(\mathrm{Cov}\)? (b) Independent — prove? (c) "Zero covariance = no redundancy" — correct?`,
        s: [
          String.raw`(a) \(\mathbb{E}X = 0\); \(\mathbb{E}Y = 6/5\); \(\mathbb{E}[XY] = \mathbb{E}[X|X|]\): \(x|x| \in \{-4, -1, 0, 1, 4\}\), sum 0 ⟹ \(\mathrm{Cov} = 0 - 0 = 0\).`,
          String.raw`(b) \(Y = |X|\) is a deterministic function of \(X\) — clearly not independent. Explicit check: \(P(Y = 1 \mid X = 2) = 0\) but \(P(Y = 1) = 2/5 \ne 0\); so \(P(X{=}2, Y{=}1) = 0 \ne \tfrac15\cdot\tfrac25\).`,
          String.raw`(c) Incorrect. Zero covariance only implies zero <em>linear</em> dependence; features can still be nonlinearly dependent (as here). Mutual information \(I(x_1; x_2)\) is the correct general dependence measure: independence ⇒ zero covariance, not conversely.`
        ],
        fin: String.raw`Cov = 0, dependent — covariance only captures linear dependence.`
      },
      {
        n: 'u', pts: 2, topic: 'Naive Bayes & conditional independence', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(P(\text{spam}) = 0.30\); \(P(W_1|S) = 0.60\), \(P(W_2|S) = 0.40\), \(P(W_1|H) = 0.10\), \(P(W_2|H) = 0.05\), \(W_1 \perp W_2 \mid C\). (a) \(P(\text{spam} \mid W_1, W_2)\)? (b) General NB rule? (c) Marginally independent?`,
        s: [
          String.raw`(a) \(P(W_1, W_2 \mid S) = 0.24\); \(P(W_1, W_2 \mid H) = 0.005\). Numerators: \(0.24 \times 0.30 = 0.072\) (spam); \(0.005 \times 0.70 = 0.0035\) (ham): $$P(S \mid W_1, W_2) = \frac{0.072}{0.0755} \approx 0.954$$`,
          String.raw`(b) \(\hat C = \arg\max_c P(C = c)\prod_{i=1}^n P(W_i \mid C = c)\) (log-sum in practice for numerical stability).`,
          String.raw`(c) \(P(W_1, W_2) = 0.24 \times 0.3 + 0.005 \times 0.7 = 0.0755\); \(P(W_1) = 0.25\), \(P(W_2) = 0.155\); product \(= 0.03875 \ne 0.0755\): <b>not marginally independent</b> — the class label \(C\) is a confounder that induces marginal correlation even under conditional independence.`
        ],
        fin: String.raw`≈ 0.954 spam; conditionally independent but marginally dependent.`
      },
      {
        n: 'v', pts: 2, topic: 'GP conditional', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(\binom{f_1}{f_2} \sim \mathcal{N}\!\left(\binom{0}{0}, \begin{pmatrix}4&2\\2&9\end{pmatrix}\right)\), observe \(f_2 = 3\): (a) marginal of \(f_1\)? (b) conditional? (c) \(P(f_1 > 1 \mid f_2 = 3)\) with \(\Phi\)? (d) conditional vs marginal variance?`,
        s: [
          String.raw`(a) Marginal of a joint Gaussian is Gaussian with the corresponding block: \(p(f_1) = \mathcal{N}(0, 4)\).`,
          String.raw`(b) \(\mu_{1|2} = 0 + \Sigma_{12}\Sigma_{22}^{-1}(3 - 0) = 2\cdot\tfrac19\cdot3 = \tfrac23\); \(\sigma^2_{1|2} = 4 - 2\cdot\tfrac19\cdot2 = \tfrac{32}{9} \approx 3.556\): \(p(f_1 \mid f_2 = 3) = \mathcal{N}(\tfrac23, \tfrac{32}{9})\).`,
          String.raw`(c) \(P(f_1 > 1 \mid f_2 = 3) = P\!\left(Z \gt \frac{1/3}{\sqrt{32}/3}\right) = 1 - \Phi(0.177) \approx 1 - 0.570 = 0.430\).`,
          String.raw`(d) \(\sigma^2_{1|2} \approx 3.56 \lt \sigma_1^2 = 4\): observing \(f_2\) reduces uncertainty about \(f_1\) (positive correlation \(\Sigma_{12} = 2\)) — the core of GP regression: conditioning narrows the predictive distribution.`
        ],
        fin: String.raw`\(\mathcal{N}(0,4)\) → \(\mathcal{N}(2/3, 32/9)\); \(P \approx 0.43\).`
      },
      {
        n: 'w', pts: 2, topic: 'Linear transformations of Gaussians', chapter: 'ch6', diff: 'med',
        q: String.raw`\(\boldsymbol{x} \sim \mathcal{N}(\boldsymbol{\mu}, \Sigma)\), \(\boldsymbol{\mu} = (1,2)^\top\), \(\Sigma = \begin{pmatrix}3&1\\1&2\end{pmatrix}\), \(\boldsymbol{y} = A\boldsymbol{x}\), \(A = \begin{pmatrix}1&-1\\2&1\end{pmatrix}\): (a) distribution of \(y\); (b) \(\mathrm{Cov}[x, y]\); (c) add \(\epsilon \sim \mathcal{N}(0, 0.1I)\): distribution of \(z = Ax + \epsilon\)?`,
        s: [
          String.raw`(a) \(A\mu = \begin{pmatrix}-1\\4\end{pmatrix}\). $$A\Sigma A^\top = \begin{pmatrix}1&-1\\2&1\end{pmatrix}\begin{pmatrix}3&1\\1&2\end{pmatrix}\begin{pmatrix}1&2\\-1&1\end{pmatrix} = \begin{pmatrix}2&-1\\7&4\end{pmatrix}\begin{pmatrix}1&2\\-1&1\end{pmatrix} = \begin{pmatrix}3&3\\3&18\end{pmatrix}$$ $$\boldsymbol{y} \sim \mathcal{N}\!\left(\begin{pmatrix}-1\\4\end{pmatrix}, \begin{pmatrix}3&3\\3&18\end{pmatrix}\right)$$`,
          String.raw`(b) \(\mathrm{Cov}[x, y] = \mathrm{Cov}[x, Ax] = \mathbb{V}[x]A^\top = \Sigma A^\top = \begin{pmatrix}3&1\\1&2\end{pmatrix}\begin{pmatrix}1&2\\-1&1\end{pmatrix} = \begin{pmatrix}2&7\\-1&4\end{pmatrix}\).`,
          String.raw`(c) \(Ax\) and \(\epsilon\) are independent Gaussians: \(z = Ax + \epsilon \sim \mathcal{N}(A\mu,\; A\Sigma A^\top + 0.1I_2) = \mathcal{N}\big((-1,4)^\top,\; \begin{pmatrix}3.1&3\\3&18.1\end{pmatrix}\big)\) — Gaussian noise simply adds to the covariance diagonal.`
        ],
        fin: String.raw`\(\mathcal{N}(A\mu, A\Sigma A^\top)\); \(\Sigma A^\top\); noise adds \(0.1I\).`
      },
      {
        n: 'x', pts: 2, topic: 'GMM moments', chapter: 'ch11', diff: 'hard',
        q: String.raw`\(p(x) = 0.4\,\mathcal{N}(x \mid -2, 1) + 0.6\,\mathcal{N}(x \mid 3, 4)\): (a) mean; (b) \(\mathbb{E}[X^2]\); (c) \(\mathbb{V}[X]\) via total variance; (d) parameter count for \(K\) components in \(d\) dims.`,
        s: [
          String.raw`(a) \(\mathbb{E}[X] = 0.4(-2) + 0.6(3) = 1.0\).`,
          String.raw`(b) Per component \(\mathbb{E}[X^2 \mid Z{=}k] = V_k + \mu_k^2\): \(1 + 4 = 5\) and \(4 + 9 = 13\). \(\mathbb{E}[X^2] = 0.4(5) + 0.6(13) = 2 + 7.8 = 9.8\).`,
          String.raw`(c) Law of total variance: \(\mathbb{V}[X] = \mathbb{E}[\mathbb{V}(X|Z)] + \mathbb{V}(\mathbb{E}[X|Z])\): within \(= 0.4(1) + 0.6(4) = 2.8\); between \(= 0.4(4) + 0.6(9) - 1^2 = 6\). Total \(= 8.8\). Cross-check: \(9.8 - 1 = 8.8\) ✓.`,
          String.raw`(d) \((K-1)\) mixing weights + \(Kd\) means + \(K\frac{d(d+1)}{2}\) symmetric PD covariances \(= 1 + 2d + \frac{d(d+1)}{2}\) for \(K = 2\); \(d = 2\): \(1 + 4 + 6 = 11\).`
        ],
        fin: String.raw`Mean 1; \(\mathbb{V} = 8.8\) (within 2.8 + between 6.0); 11 parameters.`
      },
      {
        n: 'y', pts: 2, topic: 'Bayesian A/B testing', chapter: 'ch6', diff: 'med',
        q: String.raw`A: 15 clicks / 50 visits, prior Beta(1,1): posterior; mean; MAP; variance? B: 10/30 same prior — higher posterior mean?`,
        s: [
          String.raw`(a) Beta–Binomial: posterior \(\mathrm{Beta}(1 + 15, 1 + 35) = \mathrm{Beta}(16, 36)\).`,
          String.raw`(b) Mean \(\hat\mu = \tfrac{16}{52} \approx 0.308\). Mode (MAP) \(= \tfrac{16 - 1}{52 - 2} = \tfrac{15}{50} = 0.30\) (same as MLE for large counts). Variance: \(\mathbb{V}[\mu] = \frac{16 \times 36}{52^2 \times 53} = \frac{576}{143{,}312} \approx 0.00402\), sd ≈ 0.063: 95% credible interval ≈ \(0.308 \pm 0.126 = (0.182, 0.434)\).`,
          String.raw`(d) B: \(\hat\mu_B = \tfrac{1 + 10}{1 + 10 + 1 + 20} = \tfrac{11}{32} \approx 0.344 \gt 0.308\): B wins — converted 33% vs 30%, and with fewer observations the flat prior pulls the mean slightly more toward the data fraction.`
        ],
        fin: String.raw`Beta(16,36), mean ≈ 0.308; B wins (≈ 0.344).`
      },
      {
        n: 'z', pts: 2, topic: 'Lognormal change of variables', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(X \sim \mathcal{N}(0.05, 0.04)\) (log-returns), \(Y = e^X\): (a) \(f_Y(y)\)? (b) \(\mathbb{E}[Y]\), \(\mathbb{V}[Y]\) via the normal MGF? (c) \(P(Y > 1.1)\)? (d) why log-transform?`,
        s: [
          String.raw`(a) Inverse \(x = \ln y\), \(dx/dy = 1/y\): $$f_Y(y) = \frac{1}{0.2\sqrt{2\pi}}\exp\!\left(-\frac{(\ln y - 0.05)^2}{2 \times 0.04}\right)\cdot\frac1y, \quad y \gt 0 \text{ (lognormal)}$$ e.g. \(f_Y(1.5) \approx \mathcal{N}(0.405; 0.05, 0.04)/1.5\).`,
          String.raw`(b) Normal MGF \(\mathbb{E}[e^{tX}] = e^{\mu t + \sigma^2t^2/2}\): \(\mathbb{E}[Y] = e^{0.05 + 0.02} = e^{0.07} \approx 1.0725\); \(\mathbb{E}[Y^2] = e^{0.10 + 0.08} = e^{0.18} \approx 1.1972\); \(\mathbb{V}[Y] = e^{0.18} - e^{0.14} = (e^{0.04} - 1)e^{0.14} \approx 0.046\).`,
          String.raw`(c) \(P(Y > 1.1) = P(X > \ln 1.1) = P(X > 0.0953)\): \(z = (0.0953 - 0.05)/0.2 = 0.226\): \(1 - \Phi(0.226) \approx 0.411\).`,
          String.raw`(d) Log-transforms: convert multiplicative noise to additive (CLT applies); stabilise variance for heavy tails; make optimisation landscapes more Gaussian-like. In NLP: log-probabilities prevent underflow when multiplying many small probabilities.`
        ],
        fin: String.raw`Lognormal PDF; mean ≈ 1.0725, variance ≈ 0.046; P ≈ 0.411.`
      },
      {
        n: 'aa', pts: 3, topic: 'Inverse transform & flows', chapter: 'ch6', diff: 'hard',
        q: String.raw`(a) Prove the probability integral transform. (b) Inverse-CDF sampler for \(\mathrm{Exp}(\lambda = 2)\), and a sample for \(U = 0.70\). (c) Normalizing flow \(x = f_\theta(z)\), \(z \sim \mathcal{N}(0, I)\): induced density and the role of \(\det J\)?`,
        s: [
          String.raw`**(a)** For continuous \(X\) with strictly increasing \(F_X\), define \(U = F_X(X)\). For \(u \in [0,1]\): \(F_X(X) \le u \iff X \le F_X^{-1}(u)\), so $$P(U \le u) = P(X \le F_X^{-1}(u)) = F_X(F_X^{-1}(u)) = u$$ which is exactly the \(\mathrm{Uniform}(0,1)\) CDF. ∎ (basis of inverse-transform sampling).`,
          String.raw`(b) \(f(x) = 2e^{-2x}\), \(F(x) = 1 - e^{-2x}\). Set \(u = 1 - e^{-2x}\): \(e^{-2x} = 1 - u\), \(-2x = \ln(1 - u)\): $$F^{-1}(u) = -\tfrac12\ln(1 - u), \quad 0 \lt u \lt 1$$ For \(U = 0.70\): \(X = -\tfrac12\ln(0.30) \approx 0.602\) (equivalently \(-\tfrac12\ln U\), since \(1 - U \sim U[0,1]\) too).`,
          String.raw`(c) Change of variables: $$p_x(x) = p_z(f_\theta^{-1}(x))\left|\det\frac{\partial f_\theta^{-1}}{\partial x}\right| \;=\; \frac{p_z(z)}{\left|\det \frac{\partial f_\theta}{\partial z}\right|}, \quad z = f_\theta^{-1}(x)$$ The Jacobian determinant measures local volume stretch: \(|\det J| \gt 1\) stretches space (density decreases), \(|\det J| \lt 1\) compresses (density increases). It guarantees total probability stays 1. Normalizing flows learn flexible distributions from a simple latent Gaussian while keeping an exact, tractable likelihood — valuable for density estimation, generation, and anomaly detection.`
        ],
        fin: String.raw`\(U \sim U[0,1]\) (proved); \(X = -\tfrac12\ln(1-u) \approx 0.602\); flows = base density × inverse Jacobian.`
      }
    ]
  });

  /* ==================== 7.7 STATISTICAL LEARNING ==================== */
  MML.exam.sets.push({
    id: 'ds-sli', icon: '📚', tag: tag,
    title: 'Practice: Statistical Learning & Inference',
    sub: 'Section 7.7 · 20 problems · ERM, OLS, ridge/LASSO, MAP, graphical models, model selection',
    problems: [
      {
        n: 1, pts: 1, topic: 'Empirical risk', chapter: 'ch8', diff: 'easy',
        q: String.raw`\(y = (3,5,2,8)\), \(\hat y = (2.5, 5.5, 3.0, 7.0)\): (a) per-example squared losses; (b) \(R_{\text{emp}}\); (c) add a perfect fifth example?`,
        s: [
          String.raw`(a) \(\ell_1 = 0.25\), \(\ell_2 = 0.25\), \(\ell_3 = 1.00\), \(\ell_4 = 1.00\). (b) \(R_{\text{emp}} = 2.50/4 = 0.625\).`,
          String.raw`(c) \(\ell_5 = 0\): new \(R_{\text{emp}} = 2.50/5 = 0.500\). 💡 ML insight: \(R_{\text{emp}}\) is exactly what training minimises (per mini-batch); the true risk \(R_{\text{true}} = \mathbb{E}[\ell]\) is what we care about but cannot compute — hence the held-out test set.`
        ],
        fin: String.raw`0.625 → 0.5.`
      },
      {
        n: 2, pts: 1, topic: 'Feature normalization', chapter: 'ch8', diff: 'easy',
        q: String.raw`Age 36 (mean 42, sd 14.66), salary 89.5K (mean 97.9K, sd 46.3K): (a) normalize; (b) why is GD with \(\gamma = 0.01\) on unscaled \([36, 2, 89.5]\) slow/unstable? (c) landscape effect?`,
        s: [
          String.raw`(a) \(\tilde x_{\text{age}} = (36 - 42)/14.66 \approx -0.409\); \(\tilde x_{\text{salary}} = (89.5 - 97.9)/46.3 \approx -0.181\).`,
          String.raw`(b) Salary varies over ~150K while degree varies over \{1,2,3\}: the same \(\gamma\) must be tiny to avoid overshooting the salary dimension, making convergence slow everywhere else.`,
          String.raw`(c) Different scales ⟹ highly <b>anisotropic</b> loss surface (elongated ellipses): GD oscillates across the narrow (high-curvature) axis while creeping along the wide one. Normalising makes contours spherical → larger steps, faster convergence.`
        ],
        fin: String.raw`\(-0.409\), \(-0.181\); anisotropic surface → standardize.`
      },
      {
        n: 3, pts: 2, topic: 'Hypothesis classes', chapter: 'ch8', diff: 'med',
        q: String.raw`Alice: \(\theta^\top x\) (500 features). Bob: \(\mathrm{ReLU}(W_2\mathrm{ReLU}(W_1x + b_1) + b_2)\), hidden 128, 2 output classes. Carol: \(\mathrm{sign}(x)\), no parameters. (a) parameter counts? (b) most overfit-prone on 100 emails? (c) who can't overfit — risk? (d) one regularizer for Bob?`,
        s: [
          String.raw`(a) Alice: 500. Bob: \(W_1 \in \mathbb{R}^{128\times500}\), \(b_1 \in \mathbb{R}^{128}\), \(W_2 \in \mathbb{R}^{2\times128}\), \(b_2 \in \mathbb{R}^2\): \(64{,}000 + 128 + 256 + 2 = 64{,}386\). Carol: 0.`,
          String.raw`(b) Bob — 64,386 parameters ≫ 100 emails: enough degrees of freedom to memorise the training set.`,
          String.raw`(c) Carol cannot overfit (no parameters) but will almost certainly <b>underfit</b> (high bias): \(\mathrm{sign}(x)\) is too rigid.`,
          String.raw`(d) Any of: (i) \(L_2\)/weight decay \(\lambda\|\theta\|^2\); (ii) dropout; (iii) early stopping on validation loss.`
        ],
        fin: String.raw`500 / 64,386 / 0; capacity must match data.`
      },
      {
        n: 4, pts: 3, topic: 'OLS normal equations', chapter: 'ch9', diff: 'med',
        q: String.raw`Data \((1,2), (2,4.5), (3,3.5), (4,5), (5,6.5)\): (a) augmented design matrix; (b) normal equations; (c) solve \(\hat\theta_{\text{OLS}}\); (d) \(R_{\text{emp}} = \tfrac15\|y - X\hat\theta\|^2\).`,
        s: [
          String.raw`(a) \(X = \begin{pmatrix}1&1\\1&2\\1&3\\1&4\\1&5\end{pmatrix}\), \(y = (2, 4.5, 3.5, 5, 6.5)^\top\).`,
          String.raw`(b) \(X^\top X = \begin{pmatrix}5&15\\15&55\end{pmatrix}\), \(X^\top y = \begin{pmatrix}21.5\\74\end{pmatrix}\) — note \(\sum x_iy_i = 2 + 9 + 10.5 + 20 + 32.5 = 74\) (the source's "73" is a transcription slip).`,
          String.raw`(c) \(\det = 275 - 225 = 50\): $$\hat\theta = \frac1{50}\begin{pmatrix}55&-15\\-15&5\end{pmatrix}\begin{pmatrix}21.5\\74\end{pmatrix} = \frac1{50}\begin{pmatrix}1182.5 - 1110\\-322.5 + 370\end{pmatrix} = \frac1{50}\begin{pmatrix}72.5\\47.5\end{pmatrix} = \begin{pmatrix}1.45\\0.95\end{pmatrix}$$`,
          String.raw`(d) Residuals for \(\hat y = 1.45 + 0.95x\): \(-0.4, 1.15, -0.8, -0.25, 0.3\) ⟹ \(R_{\text{emp}} = 2.275/5 = 0.455\).`
        ],
        fin: String.raw`\(\hat\theta = (1.45, 0.95)^\top\) (intercept, slope), \(\hat y = 1.45 + 0.95x\), \(R_{\text{emp}} = 0.455\).`
      },
      {
        n: 5, pts: 3, topic: 'Ridge vs OLS', chapter: 'ch9', diff: 'med',
        q: String.raw`Same data, ridge \(\lambda = 2\): (a) regularized normal equations; (b) \(\hat\theta_{\text{ridge}}\); (c) compare with OLS; (d) \(\lambda \to \infty\) limit.`,
        s: [
          String.raw`(a) \((X^\top X + \lambda I)\hat\theta = X^\top y\): \(\begin{pmatrix}7&15\\15&57\end{pmatrix}\hat\theta = \begin{pmatrix}21.5\\74\end{pmatrix}\).`,
          String.raw`(b) \(\det = 7 \times 57 - 225 = 174\): $$\hat\theta_{\text{ridge}} = \frac1{174}\begin{pmatrix}57&-15\\-15&7\end{pmatrix}\begin{pmatrix}21.5\\74\end{pmatrix} = \frac1{174}\begin{pmatrix}1225.5 - 1110\\-322.5 + 518\end{pmatrix} = \frac1{174}\begin{pmatrix}115.5\\195.5\end{pmatrix} \approx \begin{pmatrix}0.664\\1.124\end{pmatrix}$$`,
          String.raw`(c) Norms: \(\|\hat\theta_{\text{OLS}}\| = \sqrt{1.45^2 + 0.95^2} \approx 1.733\) vs \(\|\hat\theta_{\text{ridge}}\| \approx 1.305\) — ridge shrinks the parameters. (The slope can even grow: the intercept is penalized too, since the data wasn't centered.)`,
          String.raw`(d) As \(\lambda \to \infty\): \((X^\top X + \lambda I) \to \lambda I\), so \(\hat\theta_{\text{ridge}} \to \frac1\lambda X^\top y \to \boldsymbol{0}\): the regulariser dominates completely — equivalent to a Gaussian prior with variance \(\to 0\). 💡 In deep learning, weight decay (AdamW) implements ridge on all weight matrices with \(\lambda \in [10^{-4}, 10^{-2}]\): too much = underfitting, too little = overfitting.`
        ],
        fin: String.raw`\(\hat\theta_{\text{ridge}} \approx (0.664, 1.124)\); norms 1.305 vs 1.733; \(\lambda \to \infty \Rightarrow \theta \to 0\).`
      },
      {
        n: 6, pts: 2, topic: 'Cross-validation', chapter: 'ch8', diff: 'med',
        q: String.raw`5-fold CV MSEs: linear \(\{0.18, 0.22, 0.15, 0.31, 0.19\}\); cubic \(\{0.12, 0.28, 0.11, 0.45, 0.14\}\). (a) \(R_{\text{CV}}\) linear? (b) its standard error? (c) which model, and why not obvious? (d) CV vs single split?`,
        s: [
          String.raw`(a) \(R_{\text{CV}} = \tfrac15(0.18 + 0.22 + 0.15 + 0.31 + 0.19) = 0.210\).`,
          String.raw`(b) Fold variance \(\sigma^2 = \tfrac15\sum_k(R_k - \bar R)^2 \approx 0.0237\), giving \(\text{SE} \approx \sqrt{0.0237}/\sqrt5 \approx 0.069\) (or \(\approx 0.024\) by the source's convention — either way, compare against the cubic's spread).`,
          String.raw`(c) Cubic: \(\bar R = 0.220\), SE ≈ 0.053. Intervals overlap — the difference is not statistically clear; with only 10 points, apply the <b>one-standard-error rule</b> and prefer the simpler linear model.`,
          String.raw`(d) A single split gives a high-variance estimate (depends on the particular random split); CV uses every point in both roles across runs — lower-variance estimate, and checks generalisation across subsets.`
        ],
        fin: String.raw`0.210 vs 0.220 with overlapping SEs → prefer linear (one-SE rule).`
      },
      {
        n: 7, pts: 2, topic: 'Loss design & outliers', chapter: 'ch8', diff: 'med',
        q: String.raw`Outlier with error \(\epsilon = 50\), typical errors 5–10: (a) squared-loss influence; (b) L1 contrast; (c) error 2: losses and gradients; (d) noise models behind each.`,
        s: [
          String.raw`(a) Squared: \(50^2 = 2500\) overwhelms typical losses (25–100) — the optimizer spends most effort fitting outliers.`,
          String.raw`(b) L1: \(50\) vs \(5\): the outlier contributes 10× more (vs 100× under L2) — influence grows linearly, not quadratically: robust.`,
          String.raw`(c) Error 2: squared \(\ell = 4\), gradient \(-2(y - \hat y) = -4\); absolute \(\ell = 2\), gradient \(-\mathrm{sign}(y - \hat y) = -1\).`,
          String.raw`(d) MLE connection: \(L_2 \iff\) Gaussian noise \(\epsilon \sim \mathcal{N}(0, \sigma^2)\); \(L_1 \iff\) Laplace noise \(p(\epsilon) \propto e^{-|\epsilon|/b}\) (heavier tails).`
        ],
        fin: String.raw`Quadratic amplifies outliers 100×; Laplace noise ⇒ L1.`
      },
      {
        n: 8, pts: 2, topic: 'Gaussian MLE', chapter: 'ch6', diff: 'med',
        q: String.raw`Readings \(\{2.1, 3.4, 2.8, 1.9, 3.2, 2.5, 3.1, 2.7\}\): (a) log-likelihood; (b) \(\hat\mu_{\text{ML}}\), \(\hat\sigma^2_{\text{ML}}\); (c) bias of \(\hat\sigma^2_{\text{ML}}\) and the unbiased estimator.`,
        s: [
          String.raw`(a) $$\log p(D \mid \mu, \sigma^2) = -\frac{N}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{n=1}^N (x_n - \mu)^2$$`,
          String.raw`(b) \(\hat\mu_{\text{ML}} = \frac{21.7}{8} = 2.7125\); \(\hat\sigma^2_{\text{ML}} = \frac18\sum_n(x_n - \hat\mu)^2 = 0.2436\).`,
          String.raw`(c) \(\hat\sigma^2_{\text{ML}}\) is <b>biased</b>: \(\mathbb{E}[\hat\sigma^2_{\text{ML}}] = \frac{N-1}{N}\sigma^2 \lt \sigma^2\). Unbiased: \(s^2 = \frac{1}{N-1}\sum_n(x_n - \hat\mu)^2 = \frac87 \times 0.2436 \approx 0.2784\).`
        ],
        fin: String.raw`\(\hat\mu = 2.7125\); MLE variance biased; divide by \(N-1\) to fix.`
      },
      {
        n: 9, pts: 2, topic: 'MLE = ERM (Gaussian noise)', chapter: 'ch9', diff: 'med',
        q: String.raw`\(y_n = \theta^\top x_n + \epsilon_n\), \(\epsilon_n \sim \mathcal{N}(0, \sigma^2)\) i.i.d.: (a) \(p(y_n|x_n, \theta)\); (b) NLL over \(N\) observations; (c) show argmin NLL = argmin \(\frac1N\|y - X\theta\|^2\); (d) role of \(\sigma^2\)?`,
        s: [
          String.raw`(a) $$p(y_n \mid x_n, \theta) = \mathcal{N}(y_n; \theta^\top x_n, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(y_n - \theta^\top x_n)^2}{2\sigma^2}\right)$$`,
          String.raw`(b) Independence: $$-\log p(Y \mid X, \theta) = \frac{N}{2}\log(2\pi\sigma^2) + \frac{1}{2\sigma^2}\sum_{n=1}^N (y_n - \theta^\top x_n)^2$$`,
          String.raw`(c) The first term doesn't depend on \(\theta\); the positive constants \(\frac{1}{2\sigma^2}\) and \(\frac1N\) don't move the argmin: $$\arg\min_\theta[-\log p] = \arg\min_\theta \frac1N\|y - X\theta\|^2 ✓$$`,
          String.raw`(d) \(\sigma^2\) does not change which \(\theta\) minimises the NLL — only the minimum value; but it is needed for confidence intervals and predictive distributions.`
        ],
        fin: String.raw`Gaussian noise ⇒ squared loss; \(\sigma^2\) is an irrelevant scale for the fit.`
      },
      {
        n: 10, pts: 2, topic: 'Logistic regression step', chapter: 'ch9', diff: 'med',
        q: String.raw`\(x = (1, 2)^\top\), \(\theta = (0.5, -0.3)^\top\), \(y = 1\): (a) \(z\), \(\hat y\); (b) NLL; (c) gradient; (d) one GD step (\(\gamma = 0.1\)).`,
        s: [
          String.raw`(a) \(z = 0.5 - 0.6 = -0.1\); \(\hat y = \sigma(-0.1) = 1/(1 + e^{0.1}) \approx 0.475\) — the model currently thinks spam slightly unlikely.`,
          String.raw`(b) \(\ell = -\log(0.475) \approx 0.744\) (binary cross-entropy).`,
          String.raw`(c) Gradient for one example: \(\nabla_\theta\ell = (\hat y - y)x = (-0.525)(1, 2)^\top = (-0.525, -1.050)^\top\).`,
          String.raw`(d) \(\theta_{\text{new}} = (0.5, -0.3) - 0.1(-0.525, -1.050) = (0.553, -0.195)^\top\). New \(z = 0.553 - 0.39 = 0.163\), \(\hat y \approx 0.541\): probability moved toward the true label ✓. 💡 \(\theta \leftarrow \theta - \gamma(\hat y - y)x\) is the core of logistic-regression training — and the starting point of backprop through any softmax-ending network.`
        ],
        fin: String.raw`\(\hat y \approx 0.475\); NLL ≈ 0.744; \(\theta_{\text{new}} \approx (0.553, -0.195)\).`
      },
      {
        n: 11, pts: 3, topic: 'MAP = ridge (proof)', chapter: 'ch9', diff: 'hard',
        q: String.raw`Gaussian likelihood \(N(y; \theta^\top x, \sigma^2)\) + zero-mean Gaussian prior \(N(0, \tau^2 I)\): (a) log-posterior; (b) MAP = ridge; (c) \(\lambda\) in terms of \(\sigma^2, \tau^2\); (d) smaller \(\tau^2\)?`,
        s: [
          String.raw`(a) Bayes (dropping constants in \(\theta\)): $$\log p(\theta \mid Y, X) \propto \log p(Y \mid X, \theta) + \log p(\theta) = -\frac{1}{2\sigma^2}\|y - X\theta\|^2 - \frac{1}{2\tau^2}\|\theta\|^2 + \text{const}$$`,
          String.raw`(b) Minimising the negative log-posterior: $$\hat\theta_{\text{MAP}} = \arg\min_\theta \frac{1}{2\sigma^2}\|y - X\theta\|^2 + \frac{1}{2\tau^2}\|\theta\|^2$$ Multiplying by \(2\sigma^2\) (positive constant): $$\hat\theta_{\text{MAP}} = \arg\min_\theta \|y - X\theta\|^2 + \frac{\sigma^2}{\tau^2}\|\theta\|^2 \quad\text{— exactly ridge}$$`,
          String.raw`(c) \(\lambda = \sigma^2/\tau^2\); e.g. \(\sigma^2 = 1, \tau^2 = 4\): \(\lambda = 0.25\).`,
          String.raw`(d) Smaller \(\tau^2\) = a prior asserting "parameters near zero, with confidence" ⟹ larger \(\lambda\) ⟹ stronger shrinkage toward zero (weight decay). The prior width literally <em>is</em> the regularization strength.`
        ],
        fin: String.raw`MAP ⇒ ridge with \(\lambda = \sigma^2/\tau^2\); small prior variance = strong regularization.`
      },
      {
        n: 12, pts: 3, topic: 'Laplace prior = LASSO', chapter: 'ch9', diff: 'hard',
        q: String.raw`Laplace prior \(p(\theta_j) \propto e^{-|\theta_j|/b}\): (a) \(-\log p(\theta)\); (b) MAP ⇒ LASSO; (c) \(\lambda\)? (d) why sparsity?`,
        s: [
          String.raw`(a) \(D\) independent Laplace priors: \(-\log p(\theta) = \sum_j |θ_j|/b + D\log(2b) = \tfrac1b\|\theta\|_1 + \text{const}\).`,
          String.raw`(b) MAP objective: \(-\log p(\theta \mid Y, X) \propto \tfrac{1}{2\sigma^2}\|y - X\theta\|^2 + \tfrac1b\|\theta\|_1\); multiply by \(2\sigma^2/N\): $$\min_\theta \frac1N\|y - X\theta\|^2 + \underbrace{\frac{2\sigma^2}{Nb}}_{\lambda}\|\theta\|_1 \quad\text{— LASSO}$$`,
          String.raw`(c) \(\lambda = 2\sigma^2/(Nb)\).`,
          String.raw`(d) Geometrically: the \(\ell_1\) ball has <b>corners on the coordinate axes</b> — the loss ellipsoid first touches it at a corner (some \(\theta_j = 0\) exactly); the smooth \(\ell_2\) ball can't. Analytically: the subdifferential of \(|\theta_j|\) at 0 contains 0, permitting exact zeros; \(\theta_j^2\) has gradient 0 only at the origin. 💡 LASSO-style \(\ell_1\) penalties on activations are used in sparse autoencoders to identify interpretable features in LLMs (mechanistic interpretability).`
        ],
        fin: String.raw`Laplace ⇒ LASSO (\(\lambda = 2\sigma^2/Nb\)) ⇒ exact zeros via \(\ell_1\) corners.`
      },
      {
        n: 13, pts: 2, topic: 'Beta–Binomial CTR', chapter: 'ch6', diff: 'med',
        q: String.raw`CTR model, Beta(2,2) prior, \(N = 20\), \(h = 14\): (a) posterior; (b) mean and MAP; (c) \(P(\mu \gt 0.8 \mid \text{data})\)? (d) as \(N \to \infty\) (rate 0.7 fixed)?`,
        s: [
          String.raw`(a) Conjugacy: \(\mathrm{Beta}(2 + 14, 2 + 6) = \mathrm{Beta}(16, 8)\).`,
          String.raw`(b) Mean \(\tfrac{16}{24} = 0.66\overline{6}\), MAP \(= \tfrac{15}{22} \approx 0.682\).`,
          String.raw`(c) \(P(\mu \gt 0.8 \mid \text{data}) = 1 - F_{\mathrm{Beta}(16,8)}(0.8) \approx 0.071\): ~7.1% probability the true CTR exceeds 80%.`,
          String.raw`(d) As \(N \to \infty\), the prior is swamped: posterior mean \(\to h/N = 0.7 = \hat\mu_{\text{MLE}}\). 💡 Bayesian A/B tests can be monitored continuously and stopped when confident; posterior variance \(\mathrm{Var}(\mu) = \tfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)} \approx 0.009\) quantifies certainty.`
        ],
        fin: String.raw`Beta(16,8); mean 0.667, MAP 0.682; → 0.7 as data grows.`
      },
      {
        n: 14, pts: 3, topic: 'Posterior predictive', chapter: 'ch9', diff: 'hard',
        q: String.raw`\(N = 5\) i.i.d. from \(N(\theta, 1)\), \(\bar y = 3.0\), prior \(\theta \sim N(0, \tau^2 = 4)\): (a) posterior; (b) predictive \(p(y^\star \mid D)\); (c) predictive vs likelihood variance? (d) MAP predictive comparison?`,
        s: [
          String.raw`(a) Conjugate update: $$\sigma_N^2 = \left(\frac{N}{\sigma^2} + \frac{1}{\tau^2}\right)^{-1} = \left(5 + \tfrac14\right)^{-1} = \tfrac4{21} \approx 0.190; \qquad \mu_N = \sigma_N^2\left(\frac{N\bar y}{\sigma^2} + \frac{\mu_0}{\tau^2}\right) = \tfrac4{21}(15) \approx 2.857$$ Posterior: \(\theta \mid D \sim \mathcal{N}(2.857, 0.190)\).`,
          String.raw`(b) Both Gaussians ⟹ convolution Gaussian: $$p(y^\star \mid D) = \mathcal{N}(y^\star;\; \mu_N,\; \sigma^2 + \sigma_N^2) = \mathcal{N}(2.857,\; 1.190)$$`,
          String.raw`(c) Predictive variance \(1.190 \gt \sigma^2 = 1\): the extra 0.190 is uncertainty in \(\theta\) (epistemic). Perfect knowledge of \(\theta\) would still leave observation noise \(\sigma^2 = 1\).`,
          String.raw`(d) MAP predictive \(\mathcal{N}(2.857, 1)\) ignores parameter uncertainty; the Bayesian predictive is wider and better calibrated — the honest choice in risk-sensitive applications (medical, autonomous driving).`
        ],
        fin: String.raw`\(\theta \sim \mathcal{N}(2.857, 0.19)\); predictive \(\mathcal{N}(2.857, 1.19)\) — wider, honestly.`
      },
      {
        n: 15, pts: 2, topic: 'GMM E-step', chapter: 'ch11', diff: 'easy',
        q: String.raw`\(K = 2\): \(\pi_1 = 0.4, \mu_1 = -1\); \(\pi_2 = 0.6, \mu_2 = 2\); \(\sigma = 1\); point \(x^\star = 0.5\): (a) component densities; (b) marginal; (c) responsibilities; (d) interpretation.`,
        s: [
          String.raw`(a) \(p(x^\star \mid z{=}0) = \frac{e^{-1.125}}{\sqrt{2\pi}} \approx 0.1295\); \(p(x^\star \mid z{=}1) \approx 0.1295\) — both equal, since \(|0.5 - (-1)| = |0.5 - 2| = 1.5\).`,
          String.raw`(b) \(p(x^\star) = 0.4 \times 0.1295 + 0.6 \times 0.1295 = 0.1295\).`,
          String.raw`(c) \(r_0 = \tfrac{0.4 \times 0.1295}{0.1295} = 0.40\); \(r_1 = 0.60\) — the E-step responsibilities.`,
          String.raw`(d) 60% high-spender vs 40% low-spender: at an equidistant point the posterior is determined entirely by the mixing weights. The customer belongs "softly" to both clusters — the soft-clustering view EM exploits.`
        ],
        fin: String.raw`Equal densities; \(p(x^\star) = 0.1295\); \(r = (0.4, 0.6)\).`
      },
      {
        n: 16, pts: 2, topic: 'Graphical models', chapter: 'ch6', diff: 'med',
        q: String.raw`\(p(x_1, x_2, x_3, x_4) = p(x_1)p(x_2|x_1)p(x_3|x_2)p(x_4|x_2, x_3)\): (a) draw the DAG; (b) parent sets; (c) factorization with added edge \(x_1 \to x_4\); (d) ML reading with \(x_1\)=input, \(x_2\)=hidden, \(x_3\)=output, \(x_4\)=loss.`,
        s: [
          String.raw`(a) DAG: \(x_1 \to x_2 \to x_3\), with \(x_2 \to x_4\) and \(x_3 \to x_4\) (both hidden state and output feed the loss).`,
          String.raw`(b) \(\mathrm{Pa}(x_1) = \emptyset\); \(\mathrm{Pa}(x_2) = \{x_1\}\); \(\mathrm{Pa}(x_3) = \{x_2\}\); \(\mathrm{Pa}(x_4) = \{x_2, x_3\}\).`,
          String.raw`(c) \(\mathrm{Pa}(x_4) = \{x_1, x_2, x_3\}\): \(p(x_1,x_2,x_3,x_4) = p(x_1)p(x_2|x_1)p(x_3|x_2)p(x_4|x_1,x_2,x_3)\).`,
          String.raw`(d) \(p(x_1)\): data-generating process over inputs; \(p(x_2|x_1)\): forward pass to hidden activations; \(p(x_3|x_2)\): prediction from representation; \(p(x_4|x_2,x_3)\): loss given hidden state and prediction.`
        ],
        fin: String.raw`Chains of conditionals = directed graphs = computation DAGs.`
      },
      {
        n: 17, pts: 3, topic: 'd-separation & colliders', chapter: 'ch6', diff: 'hard',
        q: String.raw`Graph \(A \to C \leftarrow B\), \(C \to D \to E\) (collider at C): (a) \(A \perp B\)? (b) \(A \perp B \mid C\)? (c) \(A \perp E \mid C\)? (d) explaining-away in the medical story (A smoking, B genetics, C cancer, D marker, E test)?`,
        s: [
          String.raw`(a) Path A → C ← B is a collider (head-to-head at C); with \(C\) (and descendants) unconditioned the path is blocked: \(A \perp B\) ✓.`,
          String.raw`(b) Conditioning on \(C\) unblocks the collider: \(A \not\perp B \mid C\).`,
          String.raw`(c) Path A → C ← B unblocks (C conditioned), but on path A → C → D → E, C is head-to-tail and in the conditioning set ⟹ that path blocks: \(A \perp E \mid C\) ✓.`,
          String.raw`(d) Explaining away: smoking and genetics are independent causes of cancer; learning a patient has cancer makes heavy smoking reduce the probability of a genetic cause (smoking already partially explains it) — observing a common effect correlates its independent causes. 💡 In VAEs: conditioning on the observed image makes independent latent factors dependent in the posterior \(q(z|x)\) even when independent in the prior.`
        ],
        fin: String.raw`Colliders: blocked unless conditioned — the one d-separation rule to remember.`
      },
      {
        n: 18, pts: 3, topic: 'Nested cross-validation', chapter: 'ch8', diff: 'hard',
        q: String.raw`Tune \(\lambda \in \{0.01, 1.0, 10.0\}\) on \(N = 30\) with outer \(K_{\text{out}} = 3\), inner \(K_{\text{in}} = 5\): (a) procedure; (b) total trainings; (c) inner CV means \(0.41/0.38/0.45\) — which \(\lambda\)? (d) outer risks \(\{0.39, 0.43, 0.36\}\): final estimate?`,
        s: [
          String.raw`(a) Split into 3 outer folds of 10. For each outer fold: 20 outer-train / 10 outer-test; run 5-fold inner CV on the 20 for each \(\lambda\); select \(\lambda^\star\) minimising inner CV error; retrain on all 20; evaluate on the 10; average across outer folds.`,
          String.raw`(b) Per outer fold: \(5 \times 3 = 15\) inner trainings + 1 final = 16. Total \(3 \times 16 = 48\) trainings.`,
          String.raw`(c) \(\lambda^\star = 1.0\) (smallest inner CV error 0.38).`,
          String.raw`(d) \(\hat R = \tfrac13(0.39 + 0.43 + 0.36) \approx 0.393\); SE \(= \sqrt{[(0.39-0.393)^2 + (0.43-0.393)^2 + (0.36-0.393)^2]/9} \approx 0.021\). Report: \(0.393 \pm 0.021\) — the unbiased way to tune AND evaluate.`
        ],
        fin: String.raw`48 trainings; \(\lambda^\star = 1.0\); \(0.393 \pm 0.021\).`
      },
      {
        n: 19, pts: 3, topic: 'Bayes factor & Occam', chapter: 'ch8', diff: 'hard',
        q: String.raw`\(M_1\) logistic (10 params), \(\log p(D|M_1) = -45.2\); \(M_2\) net (500 params), \(-43.8\); uniform model prior: (a) \(\mathrm{BF}_{12}\)? (b) posterior model probabilities? (c) MAP selection? (d) why can \(M_2\) win despite complexity?`,
        s: [
          String.raw`(a) \(\log \mathrm{BF}_{12} = -45.2 - (-43.8) = -1.4\): \(\mathrm{BF}_{12} = e^{-1.4} \approx 0.247\) (data 0.247× as likely under \(M_1\)).`,
          String.raw`(b) Uniform prior ⟹ posterior odds = BF: \(\frac{P(M_1|D)}{P(M_2|D)} = 0.247\): \(P(M_2|D) = 0.802\), \(P(M_1|D) = 0.198\).`,
          String.raw`(c) MAP: choose \(M_2\) (80.2% > 50%).`,
          String.raw`(d) The evidence marginalises parameters: \(p(D|M_2) = \int p(D|\theta_2)p(\theta_2)d\theta_2\). The 500-dim prior spreads over a vast space where most settings predict poorly — the good fits are diluted by many bad ones. <b>Occam's razor</b>: complex models must spread predictive probability over more datasets. Marginal likelihood penalises complexity automatically, unlike the likelihood itself.`
        ],
        fin: String.raw`BF ≈ 0.247; \(P(M_2|D) \approx 0.802\) — marginal likelihood penalizes complexity for free.`
      },
      {
        n: 20, pts: 3, topic: 'AIC / BIC', chapter: 'ch8', diff: 'hard',
        q: String.raw`\(N = 50\); \(M_1\): 2 params, loglik \(-30\); \(M_2\): 5 params, \(-25\). (a) AIC winner? (b) BIC winner? (c) why disagree, which penalizes more? (d) net with 10,000 params, loglik −21: BIC verdict?`,
        s: [
          String.raw`(a) AIC \(= \log p(D|\hat\theta) - M\) (higher better): \(AIC_1 = -32\), \(AIC_2 = -30\): AIC prefers \(M_2\) (quartic).`,
          String.raw`(b) BIC \(= \log p(D|\hat\theta) - \tfrac{M}{2}\log N\), \(\log 50 \approx 3.912\): \(BIC_1 = -30 - 3.912 = -33.91\); \(BIC_2 = -25 - 9.78 = -34.78\): BIC prefers \(M_1\) (linear).`,
          String.raw`(c) BIC's per-parameter penalty \(\tfrac12\log 50 \approx 1.956\) exceeds AIC's 1. AIC targets predictive accuracy; BIC targets model identification (the true structure).`,
          String.raw`(d) \(BIC_{\text{NN}} = -21 - \tfrac{10{,}000}{2}(3.912) \approx -19{,}581\): catastrophically worse. But BIC assumes fixed-size parametric models and is not calibrated for over-parameterized networks — in the double-descent regime, classical bias–variance breaks down; use validation loss, Bayesian approaches, or PAC-Bayes bounds (frequentist guarantees for Bayesian-style learners that don't assume the prior is the true generating distribution).`
        ],
        fin: String.raw`AIC → quartic; BIC → linear; classical criteria don't survive the double-descent regime.`
      }
    ]
  });
})();
