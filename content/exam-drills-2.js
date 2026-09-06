/* Exam drills, part 2: chapters 7–12. */
(function () {
  var D = {};

  /* ==================== CHAPTER 7 ==================== */
  D['ch7/c1'] = [{
    pts: 6,
    q: String.raw`\(f(x) = x^4 - 2x^2\). (a) Find all stationary points and classify each via the second derivative. (b) Is \(f\) convex? (c) State which stationary point is the global minimum and why convexity would have made that automatic.`,
    s: [
      String.raw`**(a)** \(f'(x) = 4x^3 - 4x = 4x(x - 1)(x + 1) = 0\): \(x \in \{-1, 0, 1\}\). \(f''(x) = 12x^2 - 4\): at \(x = \pm1\): \(8 \gt 0\) (two local minima, \(f = -1\)); at \(x = 0\): \(-4 \lt 0\) (local max).`,
      String.raw`**(b)** Not convex: \(f''(0) \lt 0\) (and the function has a local max — convex functions can't).`,
      String.raw`**(c)** Both \(x = \pm1\) achieve the same global minimum value \(-1\). Had \(f\) been convex, every local minimum would automatically be the global one — the whole classification step would collapse to "find where \(f' = 0\)".`
    ],
    fin: String.raw`Minima at \(\pm1\) (\(f = -1\)), local max at 0; non-convex; convexity ⟹ local = global.`
  }];

  D['ch7/c2'] = [{
    pts: 6,
    q: String.raw`GD with \(\eta = 0.3\) on \(f = \tfrac12(2x^2 + 8y^2)\) from \((2, 1)\). (a) Two iterations. (b) Per-direction shrink factors. (c) Largest stable \(\eta\), and the optimal \(\eta^\star\) with its worst-case factor.`,
    s: [
      String.raw`**(a)** \(\nabla f = (2x, 8y)^\top\): step 1: \((2,1) - 0.3(4, 8) = (0.8, -1.4)\); step 2: \((0.8, -1.4) - 0.3(1.6, -11.2) = (0.32, 1.96)\) — the \(x\)-coordinate decays (factor \(|1 - 0.3\cdot2| = 0.4\)), the \(y\)-coordinate flips sign and grows (factor \(|1 - 0.3\cdot8| = 1.4\)).`,
      String.raw`**(b)** Eigenvalues 2 and 8: per-direction factors \(|1 - 0.6| = 0.4\) (decay) and \(|1 - 2.4| = 1.4\) (growth) — the flat direction converges, the steep one <b>diverges</b>: \(\eta = 0.3\) exceeds the stability bound \(2/\lambda_{\max} = 0.25\).`,
      String.raw`**(c)** Stable iff \(\eta \lt 2/\lambda_{\max} = 0.25\); optimal \(\eta^\star = \frac{2}{\lambda_{\min} + \lambda_{\max}} = \frac{2}{10} = 0.2\) with worst-case factor \(\frac{\kappa - 1}{\kappa + 1} = \frac{3}{5}\) (\(\kappa = 4\)).`
    ],
    fin: String.raw`x decays, y diverges at \(\eta = 0.3\) (unstable!); stable: \(\eta \lt 0.25\); \(\eta^\star = 0.2\), factor \(3/5\).`
  }];

  D['ch7/c3'] = [{
    pts: 5,
    q: String.raw`(a) Show that the SGD update with learning rate \(\eta_t\) has expectation equal to full-batch GD. (b) State the two classical conditions on \(\eta_t\) for convergence. (c) One practical reason the noise is considered a feature.`,
    s: [
      String.raw`**(a)** \(\mathbb{E}_B[\theta - \eta\nabla L_B] = \theta - \eta\,\mathbb{E}[\nabla L_B] = \theta - \eta\nabla L\): the expected update <b>is</b> the GD update (unbiased gradient estimates).`,
      String.raw`**(b)** \(\sum_t \eta_t = \infty\) (large enough total movement) and \(\sum_t \eta_t^2 \lt \infty\) (noise shrinks fast enough) — the Robbins–Monro conditions.`,
      String.raw`**(c)** The noise helps escape saddle points and sharp minima, and acts as implicit regularization (often improving test error).`
    ],
    fin: String.raw`Unbiased ⟹ expected path = GD; \(\sum\eta = \infty\), \(\sum\eta^2 \lt \infty\); noise = feature.`
  }];

  D['ch7/c4'] = [{
    pts: 6,
    q: String.raw`Minimize \(f(x, y) = xy\) subject to \(x + 2y = 8\)? Minimize \(f(x, y) = x^2 + xy + y^2\) subject to \(x + y = 6\) instead: (a) Lagrange conditions; (b) solution; (c) shadow price.`,
    s: [
      String.raw`**(a)** \(\mathcal{L} = x^2 + xy + y^2 + \lambda(6 - x - y)\): \(\partial_x = 2x + y - \lambda = 0\), \(\partial_y = x + 2y - \lambda = 0\), constraint \(x + y = 6\).`,
      String.raw`**(b)** Subtract: \(x - y = 0 \Rightarrow x = y = 3\), \(\lambda = 9\). Check: \(f = 9 + 9 + 9 = 27\).`,
      String.raw`**(c)** \(\lambda = 9\): relaxing the budget to \(x + y = 6 + \varepsilon\) lowers the optimum by \(\approx 9\varepsilon\) per unit (verify: at level \(c\), optimum \(= c^2 \cdot \tfrac{3}{4}\cdot\ldots\) — numerically \(f^\star(c) = \tfrac34 c^2\), so \(df^\star/dc = \tfrac32 c = 9\) at \(c = 6\) ✓).`
    ],
    fin: String.raw`\(x = y = 3\), \(\lambda = 9\), \(f^\star = 27\); shadow price \(= 9\).`
  }];

  D['ch7/c5'] = [{
    pts: 6,
    q: String.raw`Minimize \(f(x) = (x - 3)^2\) subject to \(g(x) = x - 5 \le 0\)? Take \(x \le 1\): (a) KKT conditions with sign convention; (b) solve; (c) which condition identifies the active constraint, and what is the shadow price?`,
    s: [
      String.raw`**(a)** \(g(x) = x - 1 \le 0\); \(L = (x-3)^2 + \lambda(x - 1)\), \(\lambda \ge 0\): stationarity \(2(x - 3) + \lambda = 0\); primal feasibility \(x \le 1\); dual feasibility \(\lambda \ge 0\); slackness \(\lambda(x - 1) = 0\).`,
      String.raw`**(b)** \(\lambda = 0\) would force \(x = 3\) — infeasible. So \(x = 1\): \(\lambda = 2(3 - 1) = 4 \ge 0\) ✓. Solution \(x^\star = 1, \lambda^\star = 4\).`,
      String.raw`**(c)** Complementary slackness: either the constraint is active (touching) or its multiplier is zero. Here it is active with \(\lambda = 4\): relaxing to \(x \le 1 + \varepsilon\) lowers the optimum by \(\approx 4\varepsilon\).`
    ],
    fin: String.raw`\(x^\star = 1\), \(\lambda^\star = 4\), constraint active; shadow price 4.`
  }];

  /* ==================== CHAPTER 8 ==================== */
  D['ch8/c1'] = [{
    pts: 5,
    q: String.raw`For sentiment classification: (a) write the generative modeling route to \(p(y \mid x)\) via Bayes; (b) the discriminative route; (c) which route can generate new documents, and which typically achieves higher accuracy per unit of data?`,
    s: [
      String.raw`**(a)** Model \(p(\boldsymbol{x} \mid y)p(y)\) and invert: \(p(y \mid \boldsymbol{x}) = \frac{p(\boldsymbol{x} \mid y)p(y)}{p(\boldsymbol{x})}\) (naive Bayes style: word likelihoods per class).`,
      String.raw`**(b)** Directly parameterize \(p_\theta(y \mid \boldsymbol{x})\) (logistic regression, CNN classifier) and maximize conditional likelihood.`,
      String.raw`**(c)** Generative models can sample new documents (they model the joint); discriminative models usually win on classification accuracy per data unit because they spend capacity on the boundary, not on modeling \(p(\boldsymbol{x})\).`
    ],
    fin: String.raw`(a) Bayes on \(p(x|y)p(y)\); (b) direct conditional model; (c) generative = can sample, discriminative = more accurate typically.`
  }];

  D['ch8/c2'] = [{
    pts: 6,
    q: String.raw`Model \(\hat y = \theta_1 x + \theta_2 x^2\), data \(\{(1, 2), (-1, 0), (2, 5)\}\). (a) Write the empirical risk with squared loss as a function of \((\theta_1, \theta_2)\). (b) Set up the least-squares system without expanding every term. (c) State which loss you'd switch to for outlier robustness and its noise model.`,
    s: [
      String.raw`**(a)** \(R(\boldsymbol{\theta}) = \tfrac13\sum_i (\theta_1 x_i + \theta_2 x_i^2 - y_i)^2\) with design matrix \(\Phi = \begin{pmatrix}1&1\\-1&1\\2&4\end{pmatrix}\): \(R = \tfrac13\|\Phi\boldsymbol{\theta} - \boldsymbol{y}\|^2\), \(\boldsymbol{y} = (2, 0, 5)^\top\).`,
      String.raw`**(b)** Normal equations: \((\Phi^\top\Phi)\boldsymbol{\theta} = \Phi^\top\boldsymbol{y}\): \(\Phi^\top\Phi = \begin{pmatrix}6&8\\8&18\end{pmatrix}\), \(\Phi^\top\boldsymbol{y} = (12, 22)^\top\) (from \(2 - 0 + 10\) and \(2 + 0 + 20\)). Solve \(6\theta_1 + 8\theta_2 = 12\), \(8\theta_1 + 18\theta_2 = 22\): from the first, \(\theta_1 = 2 - \tfrac43\theta_2\); substitute: \(16 - \tfrac{32}{3}\theta_2 + 18\theta_2 = 22 \Rightarrow \tfrac{22}{3}\theta_2 = 6 \Rightarrow \theta_2 = \tfrac9{11}\), \(\theta_1 = \tfrac{10}{11}\).`,
      String.raw`**(c)** Absolute loss (⇔ Laplace noise) or Huber — sublinear/linear penalty on large errors.`
    ],
    fin: String.raw`\(R = \tfrac13\|\Phi\boldsymbol{\theta} - \boldsymbol{y}\|^2\); \(\boldsymbol{\theta} = (\tfrac{10}{11}, \tfrac9{11})\); L1/Huber for outliers.`
  }];

  D['ch8/c3'] = [{
    pts: 6,
    q: String.raw`A model family's validation curve has its minimum at capacity 5, and capacities 5–7 are within one standard error. (a) Which capacity do you deploy and under which rule? (b) State the bias-variance decomposition precisely. (c) Give one reason deep networks complicate this classical picture.`,
    s: [
      String.raw`**(a)** Capacity 5 (minimum), or 5–7 under the <b>one-standard-error rule</b> — prefer the simpler model within 1 SE of the best.`,
      String.raw`**(b)** \(\mathbb{E}[(y - \hat f(x))^2] = \underbrace{(\mathbb{E}[\hat f(x)] - f(x))^2}_{\text{Bias}^2} + \underbrace{\mathbb{E}[(\hat f(x) - \mathbb{E}[\hat f(x)])^2]}_{\text{Variance}} + \underbrace{\sigma^2}_{\text{noise}}\).`,
      String.raw`**(c)** Double descent: beyond the interpolation threshold, test error decreases again — the classical U-shape (and BIC-style capacity penalties) breaks down for over-parameterized networks.`
    ],
    fin: String.raw`Capacity 5 (or up to 7, one-SE rule); full Bias² + Var + σ² decomposition; double descent caveat.`
  }];

  D['ch8/c4'] = [{
    pts: 5,
    q: String.raw`(a) Write the MAP objective and show in one line how it generalizes MLE. (b) A Beta(3, 3) prior on a click rate with 10 successes in 20 trials: posterior, mean, MAP. (c) What happens to all three as trials \(\to \infty\)?`,
    s: [
      String.raw`**(a)** \(\hat\theta_{\text{MAP}} = \arg\max_\theta [\log p(D \mid \theta) + \log p(\theta)]\); with \(\log p(\theta) = 0\) (flat) it reduces to MLE — the prior is the only difference.`,
      String.raw`**(b)** Posterior \(\mathrm{Beta}(13, 13)\); mean \(\tfrac{13}{26} = 0.5\); MAP \(= \tfrac{12}{24} = 0.5\) (symmetric posterior).`,
      String.raw`**(c)** All converge to the MLE \(= 0.5\) (here coincident anyway) — generally: mean, mode, and MLE merge as data swamps the prior.`
    ],
    fin: String.raw`MAP = MLE + log-prior; Beta(13,13), mean = MAP = 0.5; prior vanishes as \(N \to \infty\).`
  }];

  /* ==================== CHAPTER 9 ==================== */
  D['ch9/c1'] = [{
    pts: 6,
    q: String.raw`Data \((0, 1), (2, 3), (4, 1)\)? Take \((0, 2), (2, 0), (4, 2)\). (a) Set up \(\Phi\) with intercept and slope; (b) solve the normal equations; (c) compute \(R_{\text{emp}}\).`,
    s: [
      String.raw`**(a)** \(\Phi = \begin{pmatrix}1&0\\1&2\\1&4\end{pmatrix}\), \(\boldsymbol{y} = (2, 0, 2)^\top\).`,
      String.raw`**(b)** \(\Phi^\top\Phi = \begin{pmatrix}3&6\\6&20\end{pmatrix}\), \(\Phi^\top\boldsymbol{y} = (4, 8)^\top\). \(\det = 60 - 36 = 24\): $$\hat\theta = \tfrac1{24}\begin{pmatrix}20&-6\\-6&3\end{pmatrix}\begin{pmatrix}4\\8\end{pmatrix} = \tfrac1{24}(80 - 48, -24 + 24) = \begin{pmatrix}\tfrac43\\0\end{pmatrix}$$ Fit: \(\hat y = \tfrac43\) — a constant! (The data is symmetric around 2 with zero correlation.)`,
      String.raw`**(c)** Residuals: \(2 - \tfrac43 = \tfrac23\) (twice), \(0 - \tfrac43 = -\tfrac43\): \(R_{\text{emp}} = \tfrac13(\tfrac49 + \tfrac49 + \tfrac{16}{9}) = \tfrac{24}{27} = \tfrac89\).`
    ],
    fin: String.raw`\(\hat y = 4/3\) (slope 0!); \(R_{\text{emp}} = 8/9\).`
  }];

  D['ch9/c2'] = [{
    pts: 6,
    q: String.raw`(a) Derive \(\nabla_\theta L\) for \(L = \tfrac12\|X\theta - y\|^2\) in two lines via the chain rule. (b) State the two conditions for a unique solution and what happens without them. (c) Show the residuals at the optimum are orthogonal to every feature column — and what regression fact that encodes.`,
    s: [
      String.raw`**(a)** \(r = X\theta - y\); \(\partial r/\partial\theta = X\); \(\partial(\tfrac12\|r\|^2)/\partial r = r^\top\): \(\nabla_\theta L = X^\top(X\theta - y)\).`,
      String.raw`**(b)** Unique solution iff \(\operatorname{rk}(X) = d\) (independent columns); otherwise \(X^\top X\) is singular — infinitely many minimizers (use pseudoinverse or ridge).`,
      String.raw`**(c)** \(X^\top r = 0\) at the optimum: predictions are the <b>orthogonal projection</b> of \(y\) onto \(\mathrm{col}(X)\); statistically, residuals are uncorrelated with each feature (no signal left in them).`
    ],
    fin: String.raw`\(\nabla L = X^\top(X\theta - y)\); uniqueness ⟺ full column rank; \(X^\top r = 0\) = projection certificate.`
  }];

  D['ch9/c3'] = [{
    pts: 6,
    q: String.raw`OLS gives \(\hat\theta = (4, -3)^\top\) with \(\|X^\top y\| = 10\), smallest eigenvalue of \(X^\top X\) equal to 1. (a) Write the ridge solution in terms of \(X^\top X\)'s eigen-decomposition. (b) Show each eigendirection is scaled by \(\lambda_i/(\lambda_i + \lambda)\). (c) Which directions shrink most, and how does this connect to collinearity?`,
    s: [
      String.raw`**(a)** With \(X^\top X = Q\Lambda Q^\top\): \(\hat\theta_{\text{ridge}} = Q\,\mathrm{diag}\!\left(\frac{\lambda_i}{\lambda_i + \lambda}\right)Q^\top\hat\theta_{\text{OLS}}\).`,
      String.raw`**(b)** \( (X^\top X + \lambda I)^{-1}X^\top y = Q\,\mathrm{diag}(\tfrac{\lambda_i}{\lambda_i + \lambda})Q^\top Q\Lambda^{-1}Q^\top X^\top y\): each eigendirection of the OLS solution is shrunk by exactly \(\frac{\lambda_i}{\lambda_i + \lambda}\) ✓.`,
      String.raw`**(c)** Small \(\lambda_i\) directions (weakly supported by data — often collinear features) shrink hardest: \(\frac{\lambda_i}{\lambda_i + \lambda} \approx 0\). Ridge kills exactly the unstable directions that blow up OLS.`
    ],
    fin: String.raw`Eigen-shrinkage \(\lambda_i/(\lambda_i + \lambda)\); weakest directions die first — the collinearity cure.`
  }];

  D['ch9/c4'] = [{
    pts: 6,
    q: String.raw`Posterior \(\theta \mid D \sim \mathcal{N}(\mu_n, \Sigma_n)\) for the slope-intercept of a line, noise variance \(\sigma^2\). (a) Write \(p(y^\star \mid x^\star, D)\). (b) Which term grows for extrapolation? (c) MAP vs full-Bayes predictive — which is wider and why?`,
    s: [
      String.raw`**(a)** \(y^\star \mid x^\star, D \sim \mathcal{N}(\boldsymbol{x}_\star^\top\mu_n,\; \boldsymbol{x}_\star^\top\Sigma_n\boldsymbol{x}_\star + \sigma^2)\).`,
      String.raw`**(b)** The parameter-uncertainty term \(\boldsymbol{x}_\star^\top\Sigma_n\boldsymbol{x}_\star\) — quadratic in the distance from the data cloud (the "trumpet" opening).`,
      String.raw`**(c)** The full-Bayes predictive: it adds \(\boldsymbol{x}_\star^\top\Sigma_n\boldsymbol{x}_\star\); the MAP predictive uses only \(\sigma^2\) and is overconfident away from data.`
    ],
    fin: String.raw`\(\mathcal{N}(x_\star^\top\mu_n, x_\star^\top\Sigma_n x_\star + \sigma^2)\); parameter term drives extrapolation width; Bayes > MAP width.`
  }];

  /* ==================== CHAPTER 10 ==================== */
  D['ch10/c1'] = [{
    pts: 6,
    q: String.raw`Covariance eigenvalues \(\lambda = (6, 2, 2)\). (a) Is the second principal component unique? (b) FVE of a 2-D projection? (c) Per-point reconstruction error of that projection, and the total over \(n = 100\) points.`,
    s: [
      String.raw`**(a)** \(\lambda_2 = \lambda_3 = 2\): degenerate — the second PC is <b>any</b> unit vector in the 2-D eigenspace orthogonal to PC1; only the subspace is determined.`,
      String.raw`**(b)** \(\frac{6 + 2}{10} = 80\%\).`,
      String.raw`**(c)** Average error \(= \lambda_3 = 2\) per point; total \(= n\lambda_3 = 200\).`
    ],
    fin: String.raw`Not unique (degenerate eigenspace); 80%; error 2/point, 200 total.`
  }];

  D['ch10/c2'] = [{
    pts: 7,
    q: String.raw`Centered points: \((-2, -1), (0, 0), (2, 1)\). (a) Covariance matrix. (b) Eigen-decomposition. (c) Project all points onto PC1 and report the coordinates and the captured variance. (d) Verify the reconstruction error equals \(n\lambda_2\).`,
    s: [
      String.raw`**(a)** Deviations \((-2,-1), (0,0), (2,1)\): \(S = \frac13\begin{pmatrix}8&4\\4&2\end{pmatrix} = \begin{pmatrix}8/3&4/3\\4/3&2/3\end{pmatrix}\).`,
      String.raw`**(b)** \(\det S = 0\) ⟹ \(\lambda = (\operatorname{tr}, 0) = (\tfrac{10}{3}, 0)\); PC1 \(= \tfrac{1}{\sqrt5}(2, 1)^\top\) (all points lie on the line \(x_2 = x_1/2\)).`,
      String.raw`**(c)** Coordinates: \((-2,-1)\cdot\tfrac{1}{\sqrt5}(2,1) = -\sqrt5\); \(0\); \(+\sqrt5\). Captured variance \(= \tfrac13(5 + 0 + 5) = \tfrac{10}{3} = \lambda_1\) ✓ — and it is <b>100%</b>: \(\lambda_2 = 0\).`,
      String.raw`**(d)** Reconstructions are exact (error 0 \(= n\lambda_2 = 0\) ✓) — perfect collinear data needs one dimension.`
    ],
    fin: String.raw`\(S = \begin{pmatrix}8/3&4/3\\4/3&2/3\end{pmatrix}\); \(\lambda = (10/3, 0)\); coordinates \((-\sqrt5, 0, \sqrt5)\); error 0.`
  }];

  D['ch10/c3'] = [{
    pts: 6,
    q: String.raw`A \(1000\)-dimensional dataset with \(N = 500\) samples. (a) Why is forming the \(1000\times1000\) covariance undesirable, and what is the standard alternative? (b) What does the SVD of the centered data matrix give directly? (c) State the Eckart–Young bound on the rank-10 reconstruction error.`,
    s: [
      String.raw`**(a)** \(X^\top X\) costs \(O(D^2)\) memory (10⁶ entries) and is computed at \(O(ND^2)\); the alternative: work with the SVD of \(\tilde X \in \mathbb{R}^{500\times1000}\) or use iterative top-\(k\) eigensolvers (power/Lanczos) needing only matrix–vector products.`,
      String.raw`**(b)** \(\tilde X = U\Sigma_s V^\top\) hands over principal directions (\(\boldsymbol{q}_j = \boldsymbol{v}_j\)) and variances (\(\lambda_j = \sigma_j^2/N\)) in one factorization.`,
      String.raw`**(c)** \(\tfrac1N\sum_i\|\tilde{\boldsymbol{x}}_i - \hat{\boldsymbol{x}}_i\|^2 = \sum_{j \gt 10}\lambda_j\) — the dropped eigenvalues, per point.`
    ],
    fin: String.raw`Avoid \(D^2\) objects: SVD/iterative eigensolvers; \(\boldsymbol{v}_j\), \(\sigma_j^2/N\); error = dropped eigenvalues.`
  }];

  D['ch10/c4'] = [{
    pts: 6,
    q: String.raw`Probabilistic PCA: \(x = Wz + \mu + \epsilon\), \(z \sim \mathcal{N}(0, I_k)\), \(\epsilon \sim \mathcal{N}(0, \sigma^2 I)\). (a) Marginal \(p(x)\)? (b) What does EM fitting recover as \(\sigma^2 \to 0\)? (c) Name the descendant model that replaces the linear \(W\) with a neural decoder.`,
    s: [
      String.raw`**(a)** \(p(x) = \mathcal{N}(\mu,\; WW^\top + \sigma^2 I)\) — rank-\(k\) covariance plus isotropic noise.`,
      String.raw`**(b)** ML estimation recovers \(W\) spanning the principal subspace and the latent posterior mode \(z^\star = (W^\top W)^{-1}W^\top(x - \mu)\) — exactly the PCA projection.`,
      String.raw`**(c)** The variational autoencoder (encoder ≈ approximate posterior over \(z\), decoder ≈ \(W\), ELBO = reconstruction + KL).`
    ],
    fin: String.raw`\(\mathcal{N}(\mu, WW^\top + \sigma^2 I)\); σ→0 ⇒ PCA; VAE is the nonlinear descendant.`
  }];

  /* ==================== CHAPTER 11 ==================== */
  D['ch11/c1'] = [{
    pts: 6,
    q: String.raw`A 2-component GMM in 1-D has \(\pi_1 = 0.3, \mu_1 = -2, \sigma_1 = 1\) and \(\pi_2 = 0.7, \mu_2 = 3, \sigma_2 = 2\). (a) Write the density. (b) How many free parameters in \(d\) dimensions with full covariances? (c) Why can't you fit this with linear regression?`,
    s: [
      String.raw`**(a)** $$p(x) = 0.3\,\mathcal{N}(x \mid -2, 1) + 0.7\,\mathcal{N}(x \mid 3, 4)$$`,
      String.raw`**(b)** \((K - 1) + Kd + K\frac{d(d+1)}{2}\) — weights, means, symmetric covariances.`,
      String.raw`**(c)** Linear regression models a <em>conditional mean</em> \(y \approx f(x)\); a GMM models the <b>distribution of \(x\)</b> itself (density estimation) with a latent cluster variable — different target, different machinery (EM, not least squares).`
    ],
    fin: String.raw`Density as written; \((K-1) + Kd + K\binom{d+1}{2}\) parameters; density estimation ≠ regression.`
  }];

  D['ch11/c2'] = [{
    pts: 6,
    q: String.raw`Scores for one point: \((s_1, s_2) = (0.36, 0.48)\). (a) Responsibilities. (b) The log-likelihood contribution \(\log p(x_i)\) up to constants? (c) Why does the log of a <b>sum</b> (not a sum of logs) make GMM fitting hard?`,
    s: [
      String.raw`**(a)** Sum \(= 0.84\): \(r = (\tfrac{0.36}{0.84}, \tfrac{0.48}{0.84}) \approx (0.429, 0.571)\).`,
      String.raw`**(b)** \(\log p(x_i) = \log 0.84 \approx -0.174\).`,
      String.raw`**(c)** \(\log(\sum_k \cdot)\) mixes all components in every derivative: no closed-form MLE (unlike a single Gaussian), motivating EM's iterative bounding.`
    ],
    fin: String.raw`\((0.429, 0.571)\); \(\log 0.84\); log-of-sum blocks closed-form maximization.`
  }];

  D['ch11/c3'] = [{
    pts: 6,
    q: String.raw`After an E-step, cluster \(j\) has soft mass \(N_j = 12.4\) over \(n = 40\) points with \(\sum_i r_{ij}x_i = 6.2\boldsymbol{c}\) (vector). (a) M-step updates for \(\mu_j\) and \(\pi_j\). (b) The variance update in 1-D. (c) What constraint keeps \(\sum_k \pi_k = 1\) during the M-step, and how is it enforced?`,
    s: [
      String.raw`**(a)** \(\mu_j = \frac{\sum_i r_{ij}x_i}{N_j} = \frac{6.2\boldsymbol{c}}{12.4} = 0.5\boldsymbol{c}\); \(\pi_j = \frac{N_j}{n} = 0.31\).`,
      String.raw`**(b)** \(\sigma_j^2 = \frac{1}{N_j}\sum_i r_{ij}(x_i - \mu_j)^2\) — the responsibility-weighted average squared deviation.`,
      String.raw`**(c)** The weights must form a distribution; the Lagrangian for maximizing the expected complete log-likelihood subject to \(\sum\pi_k = 1\) yields exactly \(\pi_k = N_k/n\) (and Lagrange multipliers generally).`
    ],
    fin: String.raw`\(\mu_j = 0.5c\), \(\pi_j = 0.31\), weighted variance; constraint enforced via Lagrange multiplier.`
  }];

  D['ch11/c4'] = [{
    pts: 6,
    q: String.raw`(a) State the ELBO decomposition of the log-likelihood. (b) Explain in three sentences why EM never decreases the likelihood. (c) Give the two classical failure modes and the standard remedies.`,
    s: [
      String.raw`**(a)** $$\log p(D \mid \theta) = \underbrace{\mathbb{E}_q[\log p(D, z \mid \theta)] - \mathbb{E}_q[\log q(z)]}_{\text{ELBO}(q, \theta)} + \underbrace{\mathrm{KL}(q(z) \,\|\, p(z \mid D, \theta))}_{\ge 0}$$`,
      String.raw`**(b)** E-step: set \(q = p(z \mid D, \theta^{\text{old}})\) ⟹ KL = 0 ⟹ the ELBO equals the current likelihood. M-step: maximize the ELBO over \(\theta\) with \(q\) fixed. Chained: new likelihood ≥ new ELBO ≥ old ELBO = old likelihood — monotone ✓.`,
      String.raw`**(c)** Local optima (multiple restarts / k-means init) and singularities — a component collapsing onto one point with \(\sigma^2 \to 0\) (variance floors, MAP-EM priors).`
    ],
    fin: String.raw`Likelihood = ELBO + KL; E tightens, M raises ⟹ monotone; restarts + variance floors.`
  }];

  /* ==================== CHAPTER 12 ==================== */
  D['ch12/c1'] = [{
    pts: 6,
    q: String.raw`Points: class −1 at \((0,0)\) and \((2,0)\); class +1 at \((4, 2)\). (a) Using symmetry, show the maximal-margin boundary is the horizontal line \(x_2 = 1\) (i.e. \(\boldsymbol{w} = (0, 1)^\top\), \(b = -1\)), and identify the support vectors. (b) Compute the margin. (c) Which primal constraints are active?`,
    s: [
      String.raw`**(a)** The two class-−1 points both satisfy \(y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) = 1\) only if their \(f\)-values are equal, forcing \(w_1 = 0\) (a horizontal boundary): \(b = -1\) from the origin, and \(2w_1 + b = -1\) ✓. The +1 constraint then reads \(2w_2 - 1 \ge 1\), i.e. \(w_2 \ge 1\); minimizing \(\tfrac12\|w\|^2\) picks \(w_2 = 1\). Boundary: \(x_2 = 1\); support vectors: <b>all three points</b> (each at distance 1 from the boundary).`,
      String.raw`**(b)** Margin \(= \dfrac{2}{\|\boldsymbol{w}\|} = \dfrac{2}{1} = 2\) — the street spans \(y \in (0, 2)\).`,
      String.raw`**(c)** All three constraints are active: \(y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) = 1\) for \((0,0)\), \((2,0)\), and \((4,2)\) alike.`
    ],
    fin: String.raw`Boundary \(x_2 = 1\) (\(\boldsymbol{w} = (0,1)^\top, b = -1\)); margin 2; three support vectors.`
  }];

  D['ch12/c2'] = [{
    pts: 7,
    q: String.raw`(a) Derive the stationarity conditions of the hard-margin dual from its Lagrangian. (b) State complementary slackness and its support-vector reading. (c) The decision function uses how many data points, and which?`,
    s: [
      String.raw`**(a)** \(\mathcal{L} = \tfrac12\|w\|^2 - \sum_i\alpha_i[y_i(w^\top x_i + b) - 1]\): \(\nabla_w = w - \sum_i\alpha_iy_ix_i = 0 \Rightarrow w = \sum_i\alpha_iy_ix_i\); \(\partial_b = -\sum_i\alpha_iy_i = 0\).`,
      String.raw`**(b)** \(\alpha_i[y_i(w^\top x_i + b) - 1] = 0\): each point either has \(\alpha_i = 0\) (irrelevant) or lies exactly on its margin (\(y_i f(x_i) = 1\)) — those are the <b>support vectors</b>.`,
      String.raw`**(c)** Only the support vectors: \(f(x) = \sum_{i \in SV}\alpha_iy_i k(x_i, x) + b\) — typically few, and prediction costs one kernel evaluation each.`
    ],
    fin: String.raw`\(w = \sum\alpha_iy_ix_i\), \(\sum\alpha_iy_i = 0\); slackness ⇒ support vectors; sparse decision function.`
  }];

  D['ch12/c3'] = [{
    pts: 6,
    q: String.raw`(a) Verify the degree-3 polynomial kernel identity direction: does \(k(x, z) = (x^\top z)^3\) correspond to a valid feature map? (b) Compute \(k((1, 1), (2, 0))\). (c) The RBF kernel with \(\sigma \to 0\): what happens to the classifier's behavior?`,
    s: [
      String.raw`**(a)** Valid: features \(\phi(x) =\) all monomials of degree ≤ 3 — \((x_1^3, \sqrt3x_1^2x_2, \sqrt3x_1x_2^2, x_2^3)\) (with \(\sqrt{\binom{3}{2}}\)-type coefficients) — inner product sums to \((x^\top z)^3\) (multinomial expansion).`,
      String.raw`**(b)** \(x^\top z = 2\): \(k = 2^3 = 8\) — one line instead of enumerating 10 monomial features.`,
      String.raw`**(c)** \(k(x, z) \to \mathbb{1}[x = z]\): each point only resembles itself ⟹ the classifier memorizes (delta-kernel behavior, cf. HW2) — training error 0, no generalization.`
    ],
    fin: String.raw`Valid (monomial features); \(k = 8\); \(\sigma \to 0\) ⇒ memorization.`
  }];

  D['ch12/c4'] = [{
    pts: 6,
    q: String.raw`With \(C = 2\): (a) write the soft-margin primal; (b) a point with \(yf(x) = -0.5\): compute its hinge loss and its slack \(\xi\); (c) describe the solution changes as \(C \to \infty\) and \(C \to 0\).`,
    s: [
      String.raw`**(a)** $$\min_{w, b, \xi}\; \tfrac12\|w\|^2 + C\sum_i\xi_i \quad\text{s.t.}\quad y_i(w^\top x_i + b) \ge 1 - \xi_i,\;\; \xi_i \ge 0$$`,
      String.raw`**(b)** Hinge \(= \max(0, 1 - (-0.5)) = 1.5 = \xi\): the point is not only inside the street but on the wrong side (crossed the boundary by 0.5, beyond-margin violation by 1.5).`,
      String.raw`**(c)** \(C \to \infty\): violations priced infinitely — recovers the hard margin (narrow street, low train error, high variance). \(C \to 0\): margin width dominates — very wide street, many slack points (high bias). \(C\) is the bias–variance dial.`
    ],
    fin: String.raw`Primal as written; hinge \(= \xi = 1.5\); \(C \to \infty\) hard margin, \(C \to 0\) wide street.`
  }];

  MML.chapters.forEach(function (ch) {
    (ch.concepts || []).forEach(function (c) {
      var k = ch.id + '/' + c.id;
      if (D[k]) c.drills = (c.drills || []).concat(D[k]);
    });
  });
})();
