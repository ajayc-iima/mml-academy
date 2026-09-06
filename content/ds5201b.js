/* DS5201 course pack — part B: Optimization, Probability, Statistical Learning practice. */
(function () {
  var tag = 'DS5201 · Mathematics & Statistics (Plaksha)';

  /* ==================== OPTIMIZATION PRACTICE ==================== */
  MML.exam.sets.push({
    id: 'ds-opt', icon: '📉', tag: tag,
    title: 'Practice: Continuous Optimization',
    sub: 'Section 5.4-style · 8 problems · GD, momentum, Lagrange, duality, convexity, LP',
    problems: [
      {
        n: 1, pts: 2, topic: '1-D gradient descent', chapter: 'ch7', diff: 'easy',
        q: String.raw`GD on \(f(x) = (x-2)^2\) from \(x_0 = 0\), \(\gamma = 0.4\): show 5 iterations; max step size for convergence?`,
        s: [
          String.raw`Update \(x_{i+1} = 0.2x_i + 1.6\): \(1.6, 1.92, 1.984, 1.997, 1.999\) — converging to \(x^\star = 2\) (factor \(|1 - 2\gamma| = 0.2\)).`,
          String.raw`\(f'' = 2 = L\): guaranteed <b>monotone descent</b> for \(\gamma \lt 1/L = 0.5\); convergence (oscillation allowed) up to \(\gamma \lt 2/L = 1\) — at \(\gamma = 1\) it ping-pongs \(0 \leftrightarrow 4\) forever.`
        ],
        fin: String.raw`Converges (factor 0.2/step); monotone guarantee: \(\gamma \lt 0.5\), stability: \(\gamma \lt 1\).`
      },
      {
        n: 2, pts: 3, topic: 'Momentum vs plain GD', chapter: 'ch7', diff: 'hard',
        q: String.raw`Quadratic with \(H = \begin{pmatrix}2&1\\1&20\end{pmatrix}\) (ill-conditioned): from \((-3,-1)^\top\), 20 steps of plain GD (\(\gamma = 0.085\)) vs momentum (\(\gamma = 0.085, \alpha = 0.9\)). Compare errors to \(\boldsymbol{x}^\star \approx (2.487, 0.026)^\top\).`,
        s: [
          String.raw`Plain GD after 20 steps: \(\approx (2.35, 0.19)^\top\), error \(\approx 0.146\). Naively-tuned momentum (\(\alpha = 0.9\)): \(\approx (3.53, 0.60)^\top\), error \(\approx 1.04\) — <b>worse</b>: with this \(\gamma\), the accumulated velocity overshoots.`,
          String.raw`Takeaway: momentum dampens zig-zag and accelerates <em>when tuned</em> (typically smaller \(\gamma\), \(\alpha \approx 0.9\)); mistuned, its inertia hurts. Hyperparameter sensitivity is momentum's price.`
        ],
        fin: String.raw`Plain ≈ 0.146 vs momentum ≈ 1.04 at these settings — momentum only wins when tuned.`
      },
      {
        n: 3, pts: 2, topic: 'SGD gradient verification', chapter: 'ch7', diff: 'med',
        q: String.raw`\(L = \|A\boldsymbol{\theta} - \boldsymbol{b}\|^2\), \(A = \begin{pmatrix}1&2\\3&4\\5&6\end{pmatrix}\), \(\boldsymbol{b} = (1,2,3)^\top\): full-batch gradient at \(\boldsymbol{0}\) = sum of per-sample gradients?`,
        s: [
          String.raw`Full: \(\nabla L = 2A^\top(A\boldsymbol{\theta} - \boldsymbol{b}) = -2A^\top\boldsymbol{b} = -2(22, 28)^\top = (-44, -56)^\top\).`,
          String.raw`Per sample \(n\): \(\nabla L_n = 2(\boldsymbol{\theta}^\top\boldsymbol{a}_n - b_n)\boldsymbol{a}_n\): \((-2,-4)\), \((-12,-16)\), \((-30,-36)\). Sum: \((-44, -56)^\top\) ✓ — mini-batch gradients are literally partial sums of the full gradient.`
        ],
        fin: String.raw`Both give \((-44, -56)^\top\) — SGD's noise is an average of per-example directions.`
      },
      {
        n: 4, pts: 2, topic: 'Lagrange multiplier', chapter: 'ch7', diff: 'easy',
        q: String.raw`Minimize \(x_1^2 + x_2^2\) subject to \(x_1 + 2x_2 = 5\). Find \((x_1^\star, x_2^\star)\) and \(\nu^\star\).`,
        s: [
          String.raw`Stationarity: \(2x_1 + \nu = 0\), \(2x_2 + 2\nu = 0\) ⟹ \(x_1 = -\nu/2\), \(x_2 = -\nu\). Constraint: \(-\tfrac{\nu}{2} - 2\nu = 5 \Rightarrow \nu = -2\).`,
          String.raw`\((x_1^\star, x_2^\star) = (1, 2)\), \(f^\star = 5\); \(\nu = -2 \lt 0\) says the constraint pushes the objective up from its unconstrained min 0.`
        ],
        fin: String.raw`\((1, 2)\), \(\nu^\star = -2\), \(f^\star = 5\).`
      },
      {
        n: 5, pts: 3, topic: 'Lagrangian dual', chapter: 'ch7', diff: 'med',
        q: String.raw`Minimize \(x^2\) s.t. \(1 - x \le 0\): (a) Lagrangian; (b) \(D(\lambda) = \min_x L(x, \lambda)\); (c) dual optimum and strong duality.`,
        s: [
          String.raw`(a) \(L(x, \lambda) = x^2 + \lambda(1 - x)\), \(\lambda \ge 0\).`,
          String.raw`(b) \(\partial_x L = 2x - \lambda = 0 \Rightarrow x = \lambda/2\): \(D(\lambda) = \lambda - \lambda^2/4\).`,
          String.raw`(c) \(D'(\lambda) = 1 - \lambda/2 = 0 \Rightarrow \lambda^\star = 2\), \(D(2) = 1\) = primal optimum \(x^\star = 1\): <b>strong duality</b> ✓; slackness \(\lambda^\star(1 - x^\star) = 0\) ✓.`
        ],
        fin: String.raw`\(D(\lambda) = \lambda - \lambda^2/4\); \(\lambda^\star = 2\); primal = dual = 1.`
      },
      {
        n: 6, pts: 2, topic: 'Convexity check', chapter: 'ch7', diff: 'med',
        q: String.raw`Is \(f(x) = xe^x\) convex on all of \(\mathbb{R}\)? Check by definition at \((0, 1)\), \(\theta = 0.5\), and by second derivative.`,
        s: [
          String.raw`Definition: \(f(0.5) \approx 0.824 \le \tfrac12 f(0) + \tfrac12 f(1) \approx 1.359\) ✓ (holds here, but a single check never proves convexity).`,
          String.raw`\(f''(x) = (2 + x)e^x \ge 0 \iff x \ge -2\): <b>not convex on \(\mathbb{R}\)</b> — convex only on \([-2, \infty)\).`
        ],
        fin: String.raw`No — concave for \(x \lt -2\); convex only on \([-2, \infty)\).`
      },
      {
        n: 7, pts: 2, topic: 'Convex vs non-convex in ML', chapter: 'ch7', diff: 'med',
        q: String.raw`Convex? (a) \(\|\boldsymbol{y} - X\boldsymbol{\theta}\|^2\); (b) \(-\log\sigma(\theta)\); (c) \(\|\boldsymbol{w}\|_1\); (d) \(\|\boldsymbol{y} - \sigma(W\boldsymbol{x})\|^2\) with ReLU/\(\sigma\) networks.`,
        s: [
          String.raw`(a) Convex: Hessian \(2X^\top X \succeq 0\). (b) Convex: \(\frac{d^2}{d\theta^2}[-\log\sigma] = \sigma(1-\sigma) \gt 0\).`,
          String.raw`(c) Convex: every norm satisfies the triangle inequality. (d) <b>Non-convex</b>: composing nonlinearities with matrix products creates flat regions and kinks in \(W\).`
        ],
        fin: String.raw`(a), (b), (c) convex; (d) non-convex — the price of expressiveness.`
      },
      {
        n: 8, pts: 2, topic: 'LP by hand', chapter: 'ch7', diff: 'med',
        q: String.raw`Maximize \(x_1 + x_2\) s.t. \(x_1 + x_2 \le 4\), \(x_1, x_2 \ge 0\): vertices, optimum, and why it is not unique.`,
        s: [
          String.raw`Feasible triangle with vertices \((0,0), (4,0), (0,4)\); objective values \(0, 4, 4\) — optimum 4 attained on the whole segment \((t, 4-t)\), \(0 \le t \le 4\).`,
          String.raw`Non-uniqueness: the objective's gradient \((1,1)^\top\) is exactly the active constraint's normal — level sets parallel to a face of the polytope ("alternative optima"). Linear programs always attain optima at vertices unless such degeneracy occurs.`
        ],
        fin: String.raw`Optimal value 4 on the entire edge — objective parallel to the binding constraint.`
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
        n: 'a', pts: 1, topic: 'Joint / conditional', chapter: 'ch6', diff: 'easy',
        q: String.raw`Two dice, \(X\) = sum, \(Y\) = die 1. \(P(X = 7)\)? \(P(X = 7 \mid Y = 3)\)? Independent?`,
        s: [
          String.raw`\(P(X = 7) = \tfrac16\); given \(Y = 3\), need die 2 = 4: \(P = \tfrac16\). Equal <em>for this value</em> — but check \(X = 2\): \(P = \tfrac1{36}\) vs \(P(X = 2 \mid Y = 3) = 0\) ⟹ <b>not independent</b>. One agreeing case proves nothing; independence must hold for all.`
        ],
        fin: String.raw`\(\tfrac16\), \(\tfrac16\), not independent.`
      },
      {
        n: 'b', pts: 1, topic: 'Sum & product rule', chapter: 'ch6', diff: 'easy',
        q: String.raw`Bag: 3 red, 2 blue, draw twice <em>with replacement</em>. \(P(2\text{nd red})\) by marginalization; \(P(2\text{nd red} \mid 1\text{st red})\)?`,
        s: [
          String.raw`\(P(R_2) = \tfrac35\cdot\tfrac35 + \tfrac35\cdot\tfrac25 = \tfrac35\) ✓; with replacement the draws are independent: \(P(R_2 \mid R_1) = \tfrac35\).`
        ],
        fin: String.raw`Both \(\tfrac35\) — replacement restores independence.`
      },
      {
        n: 'c', pts: 2, topic: "Bayes' theorem", chapter: 'ch6', diff: 'easy',
        q: String.raw`Sensitivity 0.95, specificity 0.90, prevalence 0.02. Find the positive predictive value \(P(D \mid +)\).`,
        s: [
          String.raw`\(P(+) = 0.95(0.02) + 0.10(0.98) = 0.117\); $$P(D \mid +) = \frac{0.019}{0.117} \approx 0.162$$ — only 16%: the base-rate effect again.`
        ],
        fin: String.raw`PPV ≈ 16.2%.`
      },
      {
        n: 'd', pts: 2, topic: 'Beta–Binomial update', chapter: 'ch6', diff: 'med',
        q: String.raw`8 heads in 10 flips, prior \(\mathrm{Beta}(1,1)\). Posterior, posterior mean, MAP?`,
        s: [
          String.raw`Posterior \(\mathrm{Beta}(1 + 8, 1 + 2) = \mathrm{Beta}(9, 3)\).`,
          String.raw`Mean \(= \tfrac9{12} = 0.75\); mode (MAP) \(= \tfrac{8}{10} = 0.8\) (= MLE here, since the uniform prior adds no pseudo-counts).`
        ],
        fin: String.raw`\(\mathrm{Beta}(9,3)\), mean 0.75, MAP 0.8.`
      },
      {
        n: 'e', pts: 1, topic: 'Poisson moments', chapter: 'ch6', diff: 'med',
        q: String.raw`\(X \sim \mathrm{Poisson}(4)\): \(\mathbb{E}[X]\), \(\mathbb{V}[X]\), \(\mathbb{E}[X(X-1)]\)?`,
        s: [
          String.raw`\(\mathbb{E} = \mathbb{V} = \lambda = 4\). \(\mathbb{E}[X^2] = 4 + 16 = 20\), so \(\mathbb{E}[X(X-1)] = 20 - 4 = 16 = \lambda^2\) — the factorial moment.`
        ],
        fin: String.raw`4, 4, 16.`
      },
      {
        n: 'f', pts: 2, topic: 'Covariance ≠ independence', chapter: 'ch6', diff: 'med',
        q: String.raw`\(X \sim U[-1,1]\), \(Y = X^2\): \(\mathrm{Cov}[X, Y]\)? Independent?`,
        s: [
          String.raw`\(\mathbb{E}[X] = 0\), \(\mathbb{E}[XY] = \mathbb{E}[X^3] = 0\) (odd) ⟹ \(\mathrm{Cov} = 0\). Yet \(Y\) is a deterministic function of \(X\) — obviously dependent.`,
          String.raw`Moral: zero covariance only kills <em>linear</em> dependence.`
        ],
        fin: String.raw`\(\mathrm{Cov} = 0\) but not independent.`
      },
      {
        n: 'g', pts: 2, topic: 'Conditional Gaussian', chapter: 'ch6', diff: 'med',
        q: String.raw`Joint \(\mathcal{N}\!\left(\begin{pmatrix}2\\5\end{pmatrix}, \begin{pmatrix}4&2\\2&9\end{pmatrix}\right)\). Find \(p(x_1 \mid x_2 = 3)\).`,
        s: [
          String.raw`$$\mu_{1|2} = 2 + 2\cdot\tfrac19(3 - 5) = \tfrac{14}{9} \approx 1.56, \qquad \sigma^2_{1|2} = 4 - \tfrac{2\cdot2}{9} = \tfrac{32}{9} \approx 3.56$$`
        ],
        fin: String.raw`\(p(x_1 \mid x_2 = 3) = \mathcal{N}\!\left(\tfrac{14}{9}, \tfrac{32}{9}\right)\).`
      },
      {
        n: 'h', pts: 2, topic: 'Gaussian conjugate prior', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(X \sim \mathcal{N}(\theta, 1)\), prior \(\theta \sim \mathcal{N}(\mu_0, \sigma_0^2)\), \(n\) samples. Posterior? Its mean as \(n \to \infty\)?`,
        s: [
          String.raw`Conjugacy keeps it Gaussian: $$\sigma_n^2 = \frac{1}{1/\sigma_0^2 + n}, \qquad \mu_n = \sigma_n^2\left(\frac{\mu_0}{\sigma_0^2} + n\bar{x}\right)$$`,
          String.raw`As \(n \to \infty\): \(\sigma_n^2 \to 0\) and \(\mu_n \to \bar{x}\) — data swamps the prior. Example (\(n = 5\), \(\bar x = 3\), \(\mu_0 = 0\), \(\sigma_0^2 = 1\)): posterior \(\mathcal{N}(2.5, 1/6)\) — a precision-weighted average of prior and data.`
        ],
        fin: String.raw`Gaussian posterior, precision \(= 1/\sigma_0^2 + n\); \(\mu_n \to \bar x\).`
      },
      {
        n: 'i', pts: 2, topic: 'Change of variables', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(X \sim \mathrm{Exp}(\lambda)\). Distribution of \(Y = -\log(1 - F_X(X))\)?`,
        s: [
          String.raw`Probability integral transform: \(F_X(X) \sim U[0,1]\); then \(Y = -\log(1 - U)\) has CDF \(P(Y \le y) = 1 - e^{-y}\): $$Y \sim \mathrm{Exp}(1)$$ — the inverse-transform sampler: uniform noise in, any distribution out.`
        ],
        fin: String.raw`\(Y \sim \mathrm{Exp}(1)\), independent of \(\lambda\).`
      },
      {
        n: 'j', pts: 2, topic: 'Spam filter Bayes', chapter: 'ch6', diff: 'med',
        q: String.raw`\(P(\text{spam}) = 0.40\), \(P(\text{offer} \mid \text{spam}) = 0.70\), \(P(\text{offer} \mid \text{ham}) = 0.10\). (a) \(P(\text{offer})\)? (b) \(P(\text{spam} \mid \text{offer})\)? (c) Two independent emails both contain "offer" — probability both are spam?`,
        s: [
          String.raw`\(P(\text{offer}) = 0.28 + 0.06 = 0.34\); \(P(\text{spam} \mid \text{offer}) = \tfrac{0.28}{0.34} \approx 0.824\) (prior 40% → posterior 82%: evidence sharpens belief).`,
          String.raw`Independence across emails: \((0.824)^2 \approx 0.678\).`
        ],
        fin: String.raw`0.34; ≈ 0.824; ≈ 0.678.`
      },
      {
        n: 'k', pts: 2, topic: 'Joint table & independence', chapter: 'ch6', diff: 'med',
        q: String.raw`Joint PMF of \(X\) (topic) and \(Y\) (sentiment): \(p(0,0) = 0.10, p(0,1) = 0.40, p(1,0) = 0.20, p(1,1) = 0.30\). Marginals? \(p(Y \mid X = 0)\)? Independent? \(\mathbb{E}[X + 2Y]\)?`,
        s: [
          String.raw`Marginals: \(p(X) = (0.5, 0.5)\), \(p(Y) = (0.3, 0.7)\). Conditional: \((0.2, 0.8)\).`,
          String.raw`\(p(0,1) = 0.40 \ne 0.5 \times 0.7 = 0.35\) ⟹ dependent. Linearity: \(\mathbb{E}[X + 2Y] = 0.5 + 1.4 = 1.9\).`
        ],
        fin: String.raw`Not independent (\(0.40 \ne 0.35\)); \(\mathbb{E}[X + 2Y] = 1.9\).`
      },
      {
        n: 'l', pts: 2, topic: 'PDF / CDF', chapter: 'ch6', diff: 'med',
        q: String.raw`\(f(z) = 3z^2\) on \([0,1]\): verify PDF; CDF; \(P(0.5 \le Z \le 0.9)\); \(\mathbb{E}[Z]\), \(\mathbb{V}[Z]\).`,
        s: [
          String.raw`\(\int_0^1 3z^2 = 1\) ✓; \(F(z) = z^3\); \(P = 0.9^3 - 0.5^3 = 0.604\).`,
          String.raw`\(\mathbb{E}[Z] = \int 3z^3 = 0.75\), \(\mathbb{E}[Z^2] = 0.6\), \(\mathbb{V} = 0.6 - 0.5625 = 0.0375\).`
        ],
        fin: String.raw`0.604; \(\mathbb{E} = 0.75\), \(\mathbb{V} = 0.0375\).`
      },
      {
        n: 'm', pts: 2, topic: 'Binomial — dropout', chapter: 'ch6', diff: 'med',
        q: String.raw`Dropout: 20 neurons, each kept with \(p = 0.7\). Distribution of active count \(K\)? \(\mathbb{E}\), \(\mathbb{V}\)? \(P(K \ge 18)\)? Why scale at test time?`,
        s: [
          String.raw`\(K \sim \mathrm{Bin}(20, 0.7)\): \(\mathbb{E} = 14\), \(\mathbb{V} = 4.2\); \(P(K \ge 18) \approx 0.0355\).`,
          String.raw`At test time all 20 are active; scaling outputs by \(p = 0.7\) (inverted dropout) matches training-time expected magnitudes.`
        ],
        fin: String.raw`\(\mathrm{Bin}(20, 0.7)\); 14; 4.2; ≈ 3.6%; test-time scaling matches expectations.`
      },
      {
        n: 'n', pts: 2, topic: 'Latent-variable marginalization', chapter: 'ch11', diff: 'med',
        q: String.raw`Topics \(Z \in \{0, 1\}\), \(P(Z=0) = 0.6\); word likelihoods: tech: data 0.5 / goal 0.3 / play 0.2; sport: 0.1 / 0.1 / 0.8. \(P(\text{play})\)? Full \(P(W)\)? \(P(Z = 1 \mid \text{play})\)?`,
        s: [
          String.raw`Sum rule: \(P(\text{play}) = 0.2(0.6) + 0.8(0.4) = 0.44\); \(P(\text{data}) = 0.34\), \(P(\text{goal}) = 0.22\) (sums to 1 ✓).`,
          String.raw`Bayes: \(P(Z = 1 \mid \text{play}) = \tfrac{0.8 \times 0.4}{0.44} \approx 0.727\) — the word "play" flips belief toward the sports topic.`
        ],
        fin: String.raw`0.44; (0.34, 0.22, 0.44); ≈ 0.73.`
      },
      {
        n: 'o', pts: 2, topic: 'Chain rule of probability', chapter: 'ch6', diff: 'med',
        q: String.raw`\(P(S) = 0.5\), \(P(V \mid S) = 0.6\), \(P(O \mid S, V) = 0.3\): joint? General chain rule? Parameter count for \(n\) binary variables?`,
        s: [
          String.raw`\(P(S, V, O) = 0.3 \times 0.6 \times 0.5 = 0.09\); general: \(p(x_1..x_n) = \prod_t p(x_t \mid x_{\lt t})\).`,
          String.raw`A full joint table needs \(2^n - 1\) parameters; the chain rule factorization needs the same in general — but with conditional-independence assumptions (naive Bayes: \(n + 1\)) the savings are exponential.`
        ],
        fin: String.raw`0.09; chain rule; \(2^n - 1\) either way — independence assumptions are what compress.`
      },
      {
        n: 'p', pts: 3, topic: 'Medical screening / base rates', chapter: 'ch6', diff: 'hard',
        q: String.raw`Prevalence 0.01, sensitivity 0.90, specificity 0.92. (a) PPV? (b) NPV? (c) What sensitivity gives PPV ≥ 0.5? (d) Why is accuracy misleading for rare diseases?`,
        s: [
          String.raw`\(P(+) = 0.009 + 0.0792 = 0.0882\): PPV \(= 0.009/0.0882 \approx 10.2\%\); NPV \(= 0.9108/0.9118 \approx 99.9\%\).`,
          String.raw`(c) Solve \(\frac{0.01\,\text{sens}}{0.01\,\text{sens} + 0.0792} = 0.5\) ⟹ sens \(= 7.92\) — <b>impossible</b>: specificity must improve too.`,
          String.raw`(d) The 99% healthy class dominates accuracy (a "always healthy" classifier scores 99%); rare-event evaluation needs PPV/NPV/F1, not accuracy.`
        ],
        fin: String.raw`PPV ≈ 10.2%, NPV ≈ 99.9%, required sensitivity impossible (7.92).`
      },
      {
        n: 'q', pts: 2, topic: 'Sequential Bayesian update', chapter: 'ch6', diff: 'med',
        q: String.raw`Prior \(P(H{=}1) = 0.3\); sensor: \(P(+ \mid 1) = 0.8\), \(P(+ \mid 0) = 0.2\). Observe \(+\) then \(-\): posterior after each; verify against the joint update.`,
        s: [
          String.raw`After +: \(P(+) = 0.38\), posterior \(= \tfrac{0.24}{0.38} \approx 0.632\).`,
          String.raw`After − (new prior 0.632, \(P(- \mid 1) = 0.2\)): \(P(-) = 0.421\), posterior \(= \tfrac{0.1263}{0.4211} = 0.300\) — <b>back to the prior</b>: a + and a − with symmetric likelihood ratios exactly cancel. Sequential updates compose (each posterior is the next prior).`
        ],
        fin: String.raw`0 → 0.632 → 0.300: the two observations cancel.`
      },
      {
        n: 'r', pts: 2, topic: 'Minibatch gradient noise', chapter: 'ch6', diff: 'med',
        q: String.raw`Minibatch gradient \(\hat g = \frac1n\sum_i g_i\), \(g_i\) i.i.d. with \(\mathbb{V} = \sigma^2\). Unbiased? \(\mathbb{V}[\hat g]\)? For \(\sigma^2 = 4, n = 16\)? With correlated pairs (\(\rho = 0.5\))?`,
        s: [
          String.raw`Unbiased ✓ (\(\mathbb{E}[\hat g] = g\)); \(\mathbb{V}[\hat g] = \sigma^2/n\): \(4/16 = 0.25\), sd \(= 0.5\).`,
          String.raw`Correlated pair: \(\mathbb{V}\!\left[\tfrac{g_1 + g_2}{2}\right] = \frac{\sigma^2(1 + \rho)}{2} = 3\) vs \(2\) if independent — correlation eats the averaging benefit (why shuffling data matters).`
        ],
        fin: String.raw`Unbiased; variance \(\sigma^2/n = 0.25\); correlation inflates to 3.`
      },
      {
        n: 's', pts: 2, topic: 'Covariance & correlation', chapter: 'ch6', diff: 'med',
        q: String.raw`Data \((1,2), (2,4), (3,5), (4,4), (5,5)\): means, variances, \(\mathrm{Cov}[X,Y]\), correlation \(\rho\), and \(\mathrm{Cov}[X, X^2]\).`,
        s: [
          String.raw`\(\mathbb{E}X = 3\), \(\mathbb{E}Y = 4\); \(\mathbb{V}X = 11 - 9 = 2\), \(\mathbb{V}Y = 17.2 - 16 = 1.2\); \(\mathrm{Cov} = 13.2 - 12 = 1.2\); \(\rho = 1.2/\sqrt{2.4} \approx 0.775\).`,
          String.raw`\(\mathrm{Cov}[X, X^2] = \mathbb{E}[X^3] - \mathbb{E}X\,\mathbb{E}X^2 = 45 - 33 = 12 \ne 0\): \(X\) and \(X^2\) are heavily correlated features — center/decorrelate (PCA!) before training.`
        ],
        fin: String.raw`\(\rho \approx 0.775\); \(\mathrm{Cov}[X, X^2] = 12\) — redundant features.`
      },
      {
        n: 't', pts: 2, topic: 'Deterministic dependence', chapter: 'ch6', diff: 'med',
        q: String.raw`\(X\) uniform on \(\{-2..2\}\), \(Y = |X|\): \(\mathrm{Cov}\)? Independent? Is "zero covariance = no redundancy" correct?`,
        s: [
          String.raw`\(\mathbb{E}[XY] = \mathbb{E}[X|X|] = 0\) (odd sum) ⟹ \(\mathrm{Cov} = 0\); but \(P(Y = 1 \mid X = 2) = 0 \ne P(Y = 1) = \tfrac25\) ⟹ dependent.`,
          String.raw`The student's claim is wrong: zero covariance misses nonlinear dependence (use mutual information).`
        ],
        fin: String.raw`\(\mathrm{Cov} = 0\), clearly dependent — covariance only measures linear dependence.`
      },
      {
        n: 'u', pts: 2, topic: 'Naive Bayes & conditional independence', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(P(\text{spam}) = 0.3\); \(P(W_1|{\text{spam}}) = 0.6\), \(P(W_2|{\text{spam}}) = 0.4\); \(P(W_1|{\text{ham}}) = 0.1\), \(P(W_2|{\text{ham}}) = 0.05\), conditionally independent given class. \(P(\text{spam} \mid W_1, W_2)\)? Marginally independent?`,
        s: [
          String.raw`Naive Bayes: \(0.6 \times 0.4 = 0.24\) vs \(0.1 \times 0.05 = 0.005\); posterior \(= \tfrac{0.24 \times 0.3}{0.24 \times 0.3 + 0.005 \times 0.7} \approx 0.954\).`,
          String.raw`Marginally: \(P(W_1, W_2) = 0.0755\) vs \(P(W_1)P(W_2) = 0.25 \times 0.155 = 0.0388\): <b>not</b> marginally independent — the class label confounds them (explaining away).`
        ],
        fin: String.raw`≈ 0.954 spam; conditionally independent but marginally dependent.`
      },
      {
        n: 'v', pts: 2, topic: 'GP conditional', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(\begin{pmatrix}f_1\\f_2\end{pmatrix} \sim \mathcal{N}\!\left(\boldsymbol{0}, \begin{pmatrix}4&2\\2&9\end{pmatrix}\right)\), observe \(f_2 = 3\). Marginal of \(f_1\)? Conditional? \(P(f_1 \gt 1 \mid f_2 = 3)\)?`,
        s: [
          String.raw`Marginal: \(\mathcal{N}(0, 4)\) (just read the block). Conditional: \(\mu = 2\cdot\tfrac19(3) = \tfrac23\), \(\sigma^2 = 4 - \tfrac49 = \tfrac{32}{9}\): \(\mathcal{N}(\tfrac23, \tfrac{32}{9})\).`,
          String.raw`\(P(f_1 \gt 1) = 1 - \Phi\!\left(\tfrac{1 - 2/3}{\sqrt{32}/3}\right) = 1 - \Phi(0.177) \approx 0.43\). Conditional variance \(3.56 \lt 4\): observing \(f_2\) shrinks uncertainty — the engine of Gaussian-process regression.`
        ],
        fin: String.raw`\(\mathcal{N}(0,4)\) → \(\mathcal{N}(2/3, 32/9)\); \(P \approx 0.43\).`
      },
      {
        n: 'w', pts: 2, topic: 'Linear transformations of Gaussians', chapter: 'ch6', diff: 'med',
        q: String.raw`\(\boldsymbol{x} \sim \mathcal{N}(\boldsymbol{\mu}, \Sigma)\), \(\boldsymbol{y} = A\boldsymbol{x}\) with \(A = \begin{pmatrix}1&-1\\2&1\end{pmatrix}\), \(\boldsymbol{\mu} = (1,2)^\top\), \(\Sigma = \begin{pmatrix}3&1\\1&2\end{pmatrix}\). Distribution of \(\boldsymbol{y}\)? \(\mathrm{Cov}[\boldsymbol{x}, \boldsymbol{y}]\)? Add noise \(\epsilon \sim \mathcal{N}(0, 0.1I)\)?`,
        s: [
          String.raw`\(A\boldsymbol{\mu} = (-1, 4)^\top\); \(A\Sigma A^\top = \begin{pmatrix}3&3\\3&18\end{pmatrix}\): \(\boldsymbol{y} \sim \mathcal{N}\!\left(\begin{pmatrix}-1\\4\end{pmatrix}, \begin{pmatrix}3&3\\3&18\end{pmatrix}\right)\).`,
          String.raw`\(\mathrm{Cov}[\boldsymbol{x}, \boldsymbol{y}] = \Sigma A^\top = \begin{pmatrix}2&7\\-1&4\end{pmatrix}\); adding independent Gaussian noise just adds to the covariance diagonal: \(+0.1I\). (Gaussians are closed under affine maps + convolution — the whole trick.)`
        ],
        fin: String.raw`\(\mathcal{N}\big(A\mu, A\Sigma A^\top\big)\); \(\Sigma A^\top\); noise adds \(0.1I\).`
      },
      {
        n: 'x', pts: 2, topic: 'GMM moments', chapter: 'ch11', diff: 'hard',
        q: String.raw`\(p(x) = 0.4\mathcal{N}(-2, 1) + 0.6\mathcal{N}(3, 4)\): \(\mathbb{E}[X]\), \(\mathbb{E}[X^2]\), \(\mathbb{V}[X]\)? Parameter count for \(K\) components in \(d\) dims?`,
        s: [
          String.raw`\(\mathbb{E}[X] = 0.4(-2) + 0.6(3) = 1\). \(\mathbb{E}[X^2 \mid k] = \sigma_k^2 + \mu_k^2\): \(5\) and \(13\) ⟹ \(\mathbb{E}[X^2] = 9.8\).`,
          String.raw`Total variance: \(\mathbb{V} = \mathbb{E}[X^2] - 1^2 = 8.8\) (or law of total variance: within \(2.8\) + between \(6.0\)). Parameters: \((K - 1) + Kd + K\tfrac{d(d+1)}{2}\); \(K = 2, d = 2\): 11.`
        ],
        fin: String.raw`Mean 1; \(\mathbb{V} = 8.8\) (mixture spreads beyond component variances); 11 parameters.`
      },
      {
        n: 'y', pts: 2, topic: 'Bayesian A/B testing', chapter: 'ch6', diff: 'med',
        q: String.raw`Button A: 15 clicks / 50 visits, prior \(\mathrm{Beta}(1,1)\). Posterior? Mean, MAP, variance? Button B: 10/30 — higher posterior mean?`,
        s: [
          String.raw`Posterior \(\mathrm{Beta}(16, 36)\): mean \(\tfrac{16}{52} \approx 0.308\), MAP \(= \tfrac{15}{50} = 0.30\), \(\mathbb{V} = \tfrac{16 \cdot 36}{52^2 \cdot 53} \approx 0.004\) (sd ≈ 0.063, 95% CI ≈ (0.18, 0.43)).`,
          String.raw`B: posterior mean \(\tfrac{11}{32} \approx 0.344 \gt 0.308\) — higher rate (33% vs 30%) and more shrinkage toward 0.5 with fewer observations under the flat prior.`
        ],
        fin: String.raw`\(\mathrm{Beta}(16,36)\), mean ≈ 0.308; B wins (≈ 0.344).`
      },
      {
        n: 'z', pts: 2, topic: 'Lognormal change of variables', chapter: 'ch6', diff: 'hard',
        q: String.raw`\(X \sim \mathcal{N}(0.05, 0.04)\), \(Y = e^X\): PDF of \(Y\)? \(\mathbb{E}[Y]\), \(\mathbb{V}[Y]\)? \(P(Y \gt 1.1)\)?`,
        s: [
          String.raw`Change of variables (\(x = \ln y\), \(dx/dy = 1/y\)): $$f_Y(y) = \frac{1}{y\,\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln y - \mu)^2}{2\sigma^2}\right),\; y \gt 0 \text{ (lognormal)}$$`,
          String.raw`MGF of the normal: \(\mathbb{E}[e^{tX}] = e^{\mu t + \sigma^2t^2/2}\) ⟹ \(\mathbb{E}[Y] = e^{0.07} \approx 1.0725\), \(\mathbb{V}[Y] = (e^{0.04} - 1)e^{0.14} \approx 0.046\); \(P(Y \gt 1.1) = 1 - \Phi(0.226) \approx 0.41\). Log-transforms turn multiplication into addition — why finance and NLP work in logs.`
        ],
        fin: String.raw`Lognormal PDF; \(\mathbb{E}[Y] \approx 1.072\), \(\mathbb{V} \approx 0.046\), \(P \approx 0.41\).`
      },
      {
        n: 'aa', pts: 3, topic: 'Inverse transform & flows', chapter: 'ch6', diff: 'hard',
        q: String.raw`(a) Prove the probability integral transform. (b) Inverse-CDF sampler for \(\mathrm{Exp}(\lambda = 2)\); sample for \(U = 0.70\). (c) Density induced by a normalizing flow \(x = f_\theta(z)\)?`,
        s: [
          String.raw`(a) \(P(U \le u) = P(F_X(X) \le u) = P(X \le F_X^{-1}(u)) = F_X(F_X^{-1}(u)) = u\): \(U \sim U[0,1]\). ∎`,
          String.raw`(b) \(F(x) = 1 - e^{-2x}\) ⟹ \(F^{-1}(u) = -\tfrac12\ln(1 - u)\); \(U = 0.70\): \(X = -\tfrac12\ln 0.3 \approx 0.602\).`,
          String.raw`(c) Change of variables: $$p_x(x) = p_z(f_\theta^{-1}(x))\left|\det\frac{\partial f_\theta^{-1}}{\partial x}\right|$$ The Jacobian determinant prices the local volume change — it is what keeps the flow a valid density (and what flows must backprop through).`
        ],
        fin: String.raw`\(U \sim U[0,1]\); \(X = -\tfrac12\ln(1-u) \approx 0.602\); flows = base density × Jacobian.`
      }
    ]
  });

  /* ==================== 7.7 STATISTICAL LEARNING ==================== */
  MML.exam.sets.push({
    id: 'ds-sli', icon: '📚', tag: tag,
    title: 'Practice: Statistical Learning & Inference',
    sub: 'Section 7.7 · 20 problems · ERM, OLS, ridge/LASSO, MAP, Bayes factors, model selection',
    problems: [
      {
        n: 1, pts: 1, topic: 'Empirical risk', chapter: 'ch8', diff: 'easy',
        q: String.raw`\(y = (3, 5, 2, 8)\), \(\hat y = (2.5, 5.5, 3.0, 7.0)\): per-example squared losses and \(R_{\text{emp}}\); add a perfect fifth example?`,
        s: [
          String.raw`Losses: \(0.25, 0.25, 1, 1\) ⟹ \(R_{\text{emp}} = 2.5/4 = 0.625\).`,
          String.raw`Perfect prediction (\(\ell_5 = 0\)): \(R = 2.5/5 = 0.5\) — averaging over more (good) data lowers empirical risk.`
        ],
        fin: String.raw`0.625 → 0.5.`
      },
      {
        n: 2, pts: 1, topic: 'Feature normalization', chapter: 'ch8', diff: 'easy',
        q: String.raw`Age 36 (mean 42, sd 14.66), salary 89.5K (mean 97.9, sd 46.3): normalize; why do unscaled features hurt GD?`,
        s: [
          String.raw`\(\tilde x_{\text{age}} \approx -0.409\), \(\tilde x_{\text{salary}} \approx -0.181\) (subtract mean, divide sd).`,
          String.raw`Wildly different scales make the loss surface an elongated valley (huge curvature mismatch): one \(\gamma\) must be tiny for the salary axis, crawling along the rest. Normalizing ≈ spherifying the landscape.`
        ],
        fin: String.raw`Anisotropic loss surface → slow, zig-zagging GD; standardize first.`
      },
      {
        n: 3, pts: 2, topic: 'Hypothesis classes', chapter: 'ch8', diff: 'med',
        q: String.raw`Alice: linear (500 features). Bob: 2-layer net, hidden 128. Carol: \(\mathrm{sign}(x)\), no parameters. Parameter counts? Overfitting risk on 100 emails? Who can't overfit?`,
        s: [
          String.raw`Alice: 500. Bob: \(128 \times 500 + 128 + 2 \times 128 + 2 = 64{,}386\). Carol: 0.`,
          String.raw`Bob overfits most (64k params vs 100 examples — memorization capacity). Carol can't overfit but will underfit badly. Regularizers for Bob: weight decay, dropout, early stopping.`
        ],
        fin: String.raw`500 / 64,386 / 0; capacity must match data.`
      },
      {
        n: 4, pts: 3, topic: 'OLS normal equations', chapter: 'ch9', diff: 'med',
        q: String.raw`Data \((1,2), (2,4.5), (3,3.5), (4,5), (5,6.5)\): design matrix, normal equations, \(\hat{\boldsymbol{\theta}}_{\text{OLS}}\), \(R_{\text{emp}}\).`,
        s: [
          String.raw`\(X^\top X = \begin{pmatrix}5&15\\15&55\end{pmatrix}\), \(X^\top\boldsymbol{y} = \begin{pmatrix}21.5\\74\end{pmatrix}\) (note: \(\sum x_iy_i = 74\), not 73 — a common transcription slip).`,
          String.raw`$$\hat{\boldsymbol{\theta}} = \frac{1}{50}\begin{pmatrix}55&-15\\-15&5\end{pmatrix}\begin{pmatrix}21.5\\74\end{pmatrix} = \begin{pmatrix}1.45\\0.95\end{pmatrix}: \quad \hat y = 1.45 + 0.95x$$`,
          String.raw`Residuals: \(-0.4, 1.15, -0.8, -0.25, 0.3\) ⟹ \(R_{\text{emp}} = 2.275/5 = 0.455\).`
        ],
        fin: String.raw`\(\hat{\boldsymbol{\theta}} = (1.45, 0.95)^\top\), \(R_{\text{emp}} = 0.455\).`
      },
      {
        n: 5, pts: 3, topic: 'Ridge vs OLS', chapter: 'ch9', diff: 'med',
        q: String.raw`Same data, ridge \(\lambda = 2\): solve, compare with OLS (norms!), and the \(\lambda \to \infty\) limit.`,
        s: [
          String.raw`$(X^\top X + 2I)\hat\theta = \begin{pmatrix}7&15\\15&57\end{pmatrix}\hat\theta = \begin{pmatrix}21.5\\74\end{pmatrix}$: $\det = 174$, $$\hat\theta_{\text{ridge}} = \frac{1}{174}\begin{pmatrix}57&-15\\-15&7\end{pmatrix}\begin{pmatrix}21.5\\74\end{pmatrix} \approx \begin{pmatrix}0.664\\1.124\end{pmatrix}$$`,
          String.raw`Norm comparison: \(\|\hat\theta_{\text{OLS}}\| = 1.733\) vs \(\|\hat\theta_{\text{ridge}}\| = 1.305\) — shrinkage in norm. (The ridge <em>slope</em> can grow: the penalized intercept moves too, since we didn't center.)`,
          String.raw`\(\lambda \to \infty\): \(\hat\theta \to \boldsymbol{0}\) — the prior "all parameters are 0" dominates entirely.`
        ],
        fin: String.raw`\(\hat\theta_{\text{ridge}} \approx (0.664, 1.124)\); norms 1.305 vs 1.733; \(\lambda \to \infty \Rightarrow \theta \to 0\).`
      },
      {
        n: 6, pts: 2, topic: 'Cross-validation', chapter: 'ch8', diff: 'med',
        q: String.raw`5-fold CV MSEs: linear \(\{0.18, 0.22, 0.15, 0.31, 0.19\}\); cubic \(\{0.12, 0.28, 0.11, 0.45, 0.14\}\). Which model? Why isn't it obvious?`,
        s: [
          String.raw`Linear: \(0.210\); cubic: \(0.220\) — means nearly tied, but cubic's spread is larger (SE ≈ 0.053 vs 0.024): overlapping uncertainty.`,
          String.raw`With 10 points the estimates are noisy: the one-standard-error rule prefers the simpler linear model. CV beats one split by averaging over all data in both roles.`
        ],
        fin: String.raw`Statistical tie → prefer linear (parsimony + one-SE rule).`
      },
      {
        n: 7, pts: 2, topic: 'Loss design & outliers', chapter: 'ch8', diff: 'med',
        q: String.raw`Outlier with error 50 vs typical errors 5: squared vs absolute loss influence; losses and gradients for error 2; the noise models behind each.`,
        s: [
          String.raw`Squared: \(2500\) vs \(25\) — 100× influence; absolute: \(50\) vs \(5\) — 10× (linear, robust).`,
          String.raw`Error 2: \(L_2 = 4\), gradient \(-4\); \(L_1 = 2\), gradient \(-1\) (constant pull). Noise models: squared ⇔ Gaussian, absolute ⇔ Laplace (heavier tails).`
        ],
        fin: String.raw`Quadratic amplifies outliers 100×; Laplace noise ⇒ L1.`
      },
      {
        n: 8, pts: 2, topic: 'Gaussian MLE', chapter: 'ch6', diff: 'med',
        q: String.raw`8 readings: \(\{2.1, 3.4, 2.8, 1.9, 3.2, 2.5, 3.1, 2.7\}\): log-likelihood, \(\hat\mu_{\text{ML}}\), \(\hat\sigma^2_{\text{ML}}\); biased?`,
        s: [
          String.raw`\(\log p = -\tfrac{N}{2}\log(2\pi\sigma^2) - \tfrac{1}{2\sigma^2}\sum_n(x_n - \mu)^2\).`,
          String.raw`\(\hat\mu = 21.7/8 = 2.7125\); \(\hat\sigma^2_{\text{ML}} = 0.2436\) — <b>biased</b> (\(\mathbb{E} = \tfrac{N-1}{N}\sigma^2\)); unbiased: \(s^2 = \tfrac87 \times 0.2436 \approx 0.278\).`
        ],
        fin: String.raw`\(\hat\mu = 2.7125\); MLE variance biased; divide by \(N - 1\) to fix.`
      },
      {
        n: 9, pts: 2, topic: 'MLE = ERM (Gaussian noise)', chapter: 'ch9', diff: 'med',
        q: String.raw`\(y_n = \boldsymbol{\theta}^\top\boldsymbol{x}_n + \epsilon_n\), \(\epsilon_n \sim \mathcal{N}(0, \sigma^2)\): show NLL minimization = squared-loss ERM; role of \(\sigma^2\)?`,
        s: [
          String.raw`\(p(y_n \mid \boldsymbol{x}_n) = \mathcal{N}(\boldsymbol{\theta}^\top\boldsymbol{x}_n, \sigma^2)\); NLL \(= \tfrac{N}{2}\log(2\pi\sigma^2) + \tfrac{1}{2\sigma^2}\sum_n (y_n - \boldsymbol{\theta}^\top\boldsymbol{x}_n)^2\).`,
          String.raw`The \(\theta\)-dependent part is exactly \(\tfrac{1}{2\sigma^2}\times\)SSE: same argmin as \(\tfrac1N\|\boldsymbol{y} - X\boldsymbol{\theta}\|^2\). \(\sigma^2\) scales the loss but never moves its minimizer — it only matters for uncertainty/interval estimates.`
        ],
        fin: String.raw`Gaussian noise ⇒ squared loss; \(\sigma^2\) is an irrelevant scale for the fit.`
      },
      {
        n: 10, pts: 2, topic: 'Logistic regression step', chapter: 'ch9', diff: 'med',
        q: String.raw`\(\boldsymbol{x} = (1, 2)^\top\), \(\boldsymbol{\theta} = (0.5, -0.3)^\top\), label \(y = 1\): predict, NLL, gradient, one GD step (\(\gamma = 0.1\)).`,
        s: [
          String.raw`\(z = -0.1\), \(\hat y = \sigma(-0.1) \approx 0.475\); NLL \(= -\log 0.475 \approx 0.744\).`,
          String.raw`Gradient \(= (\hat y - y)\boldsymbol{x} = (-0.525)\,(1, 2) = (-0.525, -1.05)\); update: \(\boldsymbol{\theta} \leftarrow (0.553, -0.195)\) — new \(\hat y \approx 0.541\): moved toward the label ✓.`
        ],
        fin: String.raw`\(\boldsymbol{\theta}_{\text{new}} \approx (0.553, -0.195)\); the update rule \(\theta \leftarrow \theta - \gamma(\hat y - y)x\) <em>is</em> logistic regression training.`
      },
      {
        n: 11, pts: 3, topic: 'MAP = ridge (proof)', chapter: 'ch9', diff: 'hard',
        q: String.raw`Gaussian likelihood + zero-mean Gaussian prior \(N(0, \tau^2 I)\): show MAP = ridge; identify \(\lambda\); effect of smaller \(\tau^2\)?`,
        s: [
          String.raw`\(-\log p(\boldsymbol{\theta} \mid \mathcal{D}) \propto \tfrac{1}{2\sigma^2}\|\boldsymbol{y} - X\boldsymbol{\theta}\|^2 + \tfrac{1}{2\tau^2}\|\boldsymbol{\theta}\|^2\); multiply by \(2\sigma^2\): $$\hat\theta_{\text{MAP}} = \arg\min\;\|\boldsymbol{y} - X\boldsymbol{\theta}\|^2 + \underbrace{\tfrac{\sigma^2}{\tau^2}}_{\lambda}\|\boldsymbol{\theta}\|^2$$`,
          String.raw`Smaller \(\tau^2\) = more confident prior = larger \(\lambda\) = stronger shrinkage toward zero (weight decay). The prior width literally <em>is</em> the regularization strength.`
        ],
        fin: String.raw`MAP ⇒ ridge with \(\lambda = \sigma^2/\tau^2\).`
      },
      {
        n: 12, pts: 3, topic: 'Laplace prior = LASSO', chapter: 'ch9', diff: 'hard',
        q: String.raw`Laplace prior \(p(\theta_j) \propto e^{-|\theta_j|/b}\): negative log-prior; MAP ⇒ LASSO with \(\lambda = 2\sigma^2/(Nb)\); why sparsity?`,
        s: [
          String.raw`\(-\log p(\boldsymbol{\theta}) = \tfrac{1}{b}\|\boldsymbol{\theta}\|_1 + \text{const}\); MAP objective becomes \(\tfrac1N\|\boldsymbol{y} - X\boldsymbol{\theta}\|^2 + \tfrac{2\sigma^2}{Nb}\|\boldsymbol{\theta}\|_1\).`,
          String.raw`Sparsity: the \(\ell_1\) ball has <b>corners on the axes</b> — the loss ellipsoid typically first touches it exactly at a corner where some \(\theta_j = 0\) (subgradient of \(|\theta_j|\) at 0 allows exact zeros); the smooth \(\ell_2\) ball can't do that.`
        ],
        fin: String.raw`Laplace ⇒ LASSO ⇒ exact zeros (corners of the \(\ell_1\) ball).`
      },
      {
        n: 13, pts: 2, topic: 'Beta–Binomial CTR', chapter: 'ch6', diff: 'med',
        q: String.raw`\(\mathrm{Beta}(2,2)\) prior, \(h = 14\) of \(N = 20\): posterior; mean and MAP; behavior as \(N \to \infty\)?`,
        s: [
          String.raw`Posterior \(\mathrm{Beta}(16, 8)\): mean \(\tfrac{16}{24} = 0.66\overline{6}\), MAP \(= \tfrac{15}{22} \approx 0.682\).`,
          String.raw`As \(N \to \infty\): posterior mean \(\to h/N = 0.7\) — data swamps the prior (prior pseudo-counts \(2, 2\) become negligible).`
        ],
        fin: String.raw`\(\mathrm{Beta}(16,8)\); mean 0.667, MAP 0.682; → MLE 0.7 as data grows.`
      },
      {
        n: 14, pts: 3, topic: 'Posterior predictive', chapter: 'ch9', diff: 'hard',
        q: String.raw`\(N = 5\), \(\bar y = 3\), \(\sigma^2 = 1\) known, prior \(\theta \sim \mathcal{N}(0, 4)\): posterior; predictive \(p(y^\star \mid \mathcal{D})\); vs MAP predictive?`,
        s: [
          String.raw`Posterior precision \(= 5 + \tfrac14 = 5.25\): \(\theta \mid \mathcal{D} \sim \mathcal{N}(2.857, 0.190)\) (posterior mean = the ridge/MAP value).`,
          String.raw`Predictive: Gaussian convolution adds variances: \(\mathcal{N}(2.857,\; 1 + 0.190)\) — the extra \(0.19\) is <b>parameter uncertainty</b> on top of noise. MAP predictive \(\mathcal{N}(2.857, 1)\) is overconfident; the Bayesian predictive is honest (crucial in risk-sensitive applications).`
        ],
        fin: String.raw`\(\theta \sim \mathcal{N}(2.857, 0.19)\); predictive \(\mathcal{N}(2.857, 1.19)\) — wider, honestly.`
      },
      {
        n: 15, pts: 2, topic: 'GMM E-step', chapter: 'ch11', diff: 'easy',
        q: String.raw`\(K = 2\), \(\pi = (0.4, 0.6)\), \(\mu = (-1, 2)\), \(\sigma = 1\), point \(x^\star = 0.5\): responsibilities?`,
        s: [
          String.raw`Both components are 1.5 away: densities equal (\(\approx 0.1295\)) — the likelihood ratio is 1, so responsibilities = the mixing weights: \(r = (0.4, 0.6)\).`,
          String.raw`Equidistant point ⟹ priors decide. Soft assignment to both clusters is exactly the flexibility \(k\)-means lacks.`
        ],
        fin: String.raw`\(r = (0.4, 0.6)\) — pure prior at the midpoint.`
      },
      {
        n: 16, pts: 2, topic: 'Graphical models', chapter: 'ch6', diff: 'med',
        q: String.raw`\(p(x_1, x_2, x_3, x_4) = p(x_1)p(x_2 \mid x_1)p(x_3 \mid x_2)p(x_4 \mid x_2, x_3)\): parent sets; factorization if edge \(x_1 \to x_4\) is added; ML reading?`,
        s: [
          String.raw`Parents: \(\mathrm{Pa}(x_1) = \emptyset\), \(\mathrm{Pa}(x_2) = \{x_1\}\), \(\mathrm{Pa}(x_3) = \{x_2\}\), \(\mathrm{Pa}(x_4) = \{x_2, x_3\}\) (chain + extra edge into the loss).`,
          String.raw`With \(x_1 \to x_4\): \(p(x_4 \mid x_1, x_2, x_3)\). ML reading: data → hidden layer → output → loss — a forward pass written as a factorization.`
        ],
        fin: String.raw`Chains of conditionals = directed graphs = computation DAGs.`
      },
      {
        n: 17, pts: 3, topic: 'd-separation & colliders', chapter: 'ch6', diff: 'hard',
        q: String.raw`Graph \(A \to C \leftarrow B\), \(C \to D \to E\): (a) \(A \perp B\)? (b) \(A \perp B \mid C\)? (c) \(A \perp E \mid C\)? (d) The "explaining away" story?`,
        s: [
          String.raw`(a) \(C\) is a collider, not conditioned ⟹ path blocked: \(A \perp B\) ✓. (b) Conditioning on \(C\) <b>unblocks</b> the collider: \(A \not\perp B \mid C\).`,
          String.raw`(c) On the path \(A \to C \to D \to E\), \(C\) is a head-to-tail node in the conditioning set ⟹ blocked: \(A \perp E \mid C\) ✓.`,
          String.raw`(d) Explaining away: knowing a smoker has cancer makes the genetic explanation less likely — observing a common effect correlates its independent causes (in VAEs: the posterior over independent latents becomes coupled once the image is observed).`
        ],
        fin: String.raw`Colliders: blocked unless conditioned — the one d-separation rule to remember.`
      },
      {
        n: 18, pts: 3, topic: 'Nested cross-validation', chapter: 'ch8', diff: 'hard',
        q: String.raw`Tune \(\lambda \in \{0.01, 1, 10\}\) with outer 3-fold, inner 5-fold on \(N = 30\): procedure, training count, chosen \(\lambda\) (inner: 0.41/0.38/0.45), final estimate (outer: 0.39, 0.43, 0.36)?`,
        s: [
          String.raw`Per outer fold: \(3\lambda \times 5\) inner folds + 1 final training = 16; total \(3 \times 16 = 48\) trainings. Inner pick: \(\lambda^\star = 1.0\) (0.38 lowest).`,
          String.raw`Final estimate: mean of outer test risks \(= 0.393\), SE \(\approx 0.021\) ⟹ \(0.393 \pm 0.021\) — the unbiased way to both tune AND evaluate.`
        ],
        fin: String.raw`48 trainings; \(\lambda^\star = 1\); \(0.393 \pm 0.021\).`
      },
      {
        n: 19, pts: 3, topic: 'Bayes factor & Occam', chapter: 'ch8', diff: 'hard',
        q: String.raw`\(M_1\) (10 params): \(\log p(D|M_1) = -45.2\); \(M_2\) (500 params): \(-43.8\); uniform prior. Bayes factor? Posteriors? Which model? Why can the bigger model still win?`,
        s: [
          String.raw`\(\log \mathrm{BF}_{12} = -1.4\): \(\mathrm{BF}_{12} = e^{-1.4} \approx 0.247\); posterior odds = BF (uniform prior): \(P(M_2 \mid D) \approx 0.802\).`,
          String.raw`Choose \(M_2\). The evidence <em>marginalizes</em> parameters: the 500-dim prior spreads mass over mostly bad configurations, diluting good fits — <b>Occam's razor</b> is automatic in marginal likelihood, where raw likelihood always favors complexity.`
        ],
        fin: String.raw`BF ≈ 0.247, \(P(M_2 \mid D) \approx 0.80\): marginal likelihood penalizes complexity for free.`
      },
      {
        n: 20, pts: 3, topic: 'AIC / BIC', chapter: 'ch8', diff: 'hard',
        q: String.raw`\(N = 50\); \(M_1\) (2 params, loglik −30), \(M_2\) (5 params, −25). AIC and BIC winners? Why they disagree; a 10,000-param net with loglik −21 — BIC verdict?`,
        s: [
          String.raw`AIC \(= \log L - M\): \(-32\) vs \(-30\) → AIC picks \(M_2\). BIC \(= \log L - \tfrac{M}{2}\log N\): \(-33.91\) vs \(-34.78\) → BIC picks \(M_1\).`,
          String.raw`Disagreement: BIC's per-parameter penalty \(\tfrac12\log 50 \approx 1.96\) exceeds AIC's 1 — BIC favors simpler models more strongly at large \(N\) (prediction vs structure identification).`,
          String.raw`Net: BIC \(= -21 - \tfrac{10000}{2}(3.912) \approx -19{,}581\) — catastrophically worse. But BIC assumes fixed parametric models; over-parameterized nets live in the double-descent regime where classical criteria don't apply — use validation loss instead.`
        ],
        fin: String.raw`AIC → cubic; BIC → linear; net's BIC astronomically bad — classical criteria don't survive the modern regime.`
      }
    ]
  });
})();
