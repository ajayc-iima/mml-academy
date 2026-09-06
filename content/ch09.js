/* Chapter 9 — Linear Regression */
(function () {
  MML.chapters.push({
    id: 'ch9', num: 9, icon: '📈',
    title: 'Linear Regression',
    tagline: 'The first real ML model, done three ways: least squares, maximum likelihood, and Bayesian — they are one story.',
    why: String.raw`Linear regression is where every strand of the course meets. The model is linear algebra (\(\boldsymbol{y} = \boldsymbol{X}\boldsymbol{\theta}\)); the noise assumption is probability (Gaussian); the fit is calculus (gradients); the solution is a linear system (Ch 2); and the geometry is a projection (Ch 3). Master it here and deep learning later becomes "the same story with more layers": loss from noise model, training by gradients, regularization from priors.`,
    goals: [
      String.raw`Derive and solve the normal equations \((\boldsymbol{X}^\top\boldsymbol{X})\boldsymbol{\theta} = \boldsymbol{X}^\top\boldsymbol{y}\) by hand.`,
      String.raw`Show that least squares = MLE under Gaussian noise.`,
      String.raw`Derive ridge regression as MAP with a Gaussian prior; see shrinkage numerically.`,
      String.raw`Understand the projection view: \(\hat{\boldsymbol{y}}\) is \(\boldsymbol{y}\)'s shadow on the column space.`
    ],
    widget: 'linreg',
    concepts: [
      {
        id: 'c1',
        title: 'The model and the least-squares problem',
        subtitle: 'y = Xθ + noise',
        intuition: String.raw`You believe each response is a linear function of the features, plus a small wobble: \(y_i = \boldsymbol{\theta}^\top\boldsymbol{x}_i + \varepsilon_i\). Stacking everything: \(\boldsymbol{y} = \boldsymbol{X}\boldsymbol{\theta} + \boldsymbol{\varepsilon}\). Unless the points happen to be perfectly collinear, no \(\boldsymbol{\theta}\) reproduces \(\boldsymbol{y}\) exactly — the system \(\boldsymbol{X}\boldsymbol{\theta} = \boldsymbol{y}\) is <b>overdetermined</b> (more equations than unknowns, Chapter 2's "no solution" case). Least squares is the graceful retreat: find the \(\boldsymbol{\theta}\) whose predictions come <b>closest overall</b>, measured by total squared error.`,
        math: [
          { h: 'Setup', t: String.raw`$$\boldsymbol{y} = \boldsymbol{X}\boldsymbol{\theta} + \boldsymbol{\varepsilon}, \qquad \boldsymbol{X} \in \mathbb{R}^{n\times(d+1)} \;\text{(with a column of ones for the intercept)}$$ Residuals: \(\boldsymbol{r} = \boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\). Objective: $$\min_{\boldsymbol{\theta}} \; L(\boldsymbol{\theta}) = \tfrac12\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2$$` },
          { h: 'Geometry: closest point in the column space', t: String.raw`As \(\boldsymbol{\theta}\) varies, \(\boldsymbol{X}\boldsymbol{\theta}\) sweeps the column space \(\operatorname{col}(\boldsymbol{X}) \subseteq \mathbb{R}^n\). Minimizing \(\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|\) = projecting \(\boldsymbol{y}\) onto \(\operatorname{col}(\boldsymbol{X})\) (Chapter 3!). Certificate: $$\boldsymbol{X}^\top(\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}^\star) = \boldsymbol{0} \qquad \text{residual } \perp \text{ every column}$$` }
        ],
        ml: String.raw`The template "parameters \(\boldsymbol{\theta}\), predictions \(\boldsymbol{X}\boldsymbol{\theta}\), loss, closed form or gradient" is universal. Logistic regression swaps the link; neural nets stack nonlinear versions; even attention's value-mixing is a (data-dependent) linear model. The projection insight also explains <em>why</em> deep nets can fit: their feature maps make \(\operatorname{col}(\boldsymbol{X})\) huge.`,
        byhand: {
          problem: String.raw`Data: \((0, 0), (1, 1), (2, 1)\). Model \(\hat{y} = \theta_0 + \theta_1 x\). Write the design matrix \(\boldsymbol{X}\), set up \(\min \tfrac12\|\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y}\|^2\), and find the projection-matrix form of the fitted values.`,
          steps: [
            { t: 'Design matrix and normal equations (setup)', d: String.raw`$$\boldsymbol{X} = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}, \qquad \boldsymbol{y} = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}$$ We will solve the system in the next card; here, compute the pieces: $$\boldsymbol{X}^\top\boldsymbol{X} = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}, \qquad \boldsymbol{X}^\top\boldsymbol{y} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$$` },
            { t: 'Projection matrix (using θ★ = (1/6, 1/2) from next card)', d: String.raw`$$\boldsymbol{P} = \boldsymbol{X}(\boldsymbol{X}^\top\boldsymbol{X})^{-1}\boldsymbol{X}^\top = \frac{1}{6}\begin{pmatrix} 5 & 2 & -1 \\ 2 & 2 & 2 \\ -1 & 2 & 5 \end{pmatrix}$$` },
            { t: 'Verify it is a projection: P² = P', d: String.raw`Row 1 · col 1 of \(\boldsymbol{P}^2\): \(\frac{1}{36}(25 + 4 + 1) = \frac{30}{36} = \frac{5}{6} = P_{11}\) ✓. Row 2 · col 2: \(\frac{1}{36}(4+4+4) = \frac{2}{6} = P_{22}\) ✓.` },
            { t: 'Fitted values = P y', d: String.raw`$$\hat{\boldsymbol{y}} = \boldsymbol{P}\boldsymbol{y} = \frac{1}{6}\begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix} = \begin{pmatrix} 1/6 \\ 2/3 \\ 7/6 \end{pmatrix}$$ — exactly the line's predictions at \(x = 0, 1, 2\). \(\boldsymbol{y}\)'s shadow on the plane \(\operatorname{col}(\boldsymbol{X})\) has coordinates \((\tfrac16, \tfrac23, \tfrac76)\).` }
          ],
          answer: String.raw`\(\boldsymbol{P} = \frac{1}{6}\begin{pmatrix} 5 & 2 & -1 \\ 2 & 2 & 2 \\ -1 & 2 & 5 \end{pmatrix}\), \(\boldsymbol{P}^2 = \boldsymbol{P}\), \(\hat{\boldsymbol{y}} = \boldsymbol{P}\boldsymbol{y}\). Least squares is literally a projection — Chapter 3's theorem, employed.`
        }
      },
      {
        id: 'c2',
        title: 'Solving it twice: calculus and likelihood',
        subtitle: 'normal equations ⇔ Gaussian noise MLE',
        intuition: String.raw`Two roads to the same answer. Road 1 (calculus): the loss \(\tfrac12\|\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y}\|^2\) is a convex paraboloid; set its gradient to zero and solve — the <b>normal equations</b>. Road 2 (probability): assume the noise is Gaussian, write the likelihood, maximize it — and watch the log-likelihood turn into exactly the same least-squares problem. The equivalence is profound: <b>when you choose a squared loss, you have implicitly declared your errors Gaussian.</b> Loss functions are noise models in disguise.`,
        math: [
          { h: 'Road 1: gradient → normal equations', t: String.raw`$$\nabla_{\boldsymbol{\theta}} L = \boldsymbol{X}^\top(\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y}) = \boldsymbol{0} \quad\Longrightarrow\quad \boxed{\;(\boldsymbol{X}^\top\boldsymbol{X})\boldsymbol{\theta} = \boldsymbol{X}^\top\boldsymbol{y}\;}$$ Convexity (Ch 7 practice): \(\nabla^2 L = \boldsymbol{X}^\top\boldsymbol{X} \succeq 0\), so any solution is global. Unique iff \(\boldsymbol{X}\) has independent columns; otherwise use \((\boldsymbol{X}^\top\boldsymbol{X})^{+}\) (Ch 4) or ridge (next card).` },
          { h: 'Road 2: Gaussian noise → same equations', t: String.raw`$$\varepsilon_i \sim \mathcal{N}(0, \sigma^2) \;\Rightarrow\; \log p(\boldsymbol{y} \mid \boldsymbol{X}, \boldsymbol{\theta}) = -\frac{1}{2\sigma^2}\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2 + \text{const}(\boldsymbol{\theta}\text{-free})$$ Maximizing the log-likelihood \(\equiv\) minimizing the sum of squares: $$\boldsymbol{\theta}^{\text{MLE}} = \boldsymbol{\theta}^{\text{LS}}$$ The \(1/\sigma^2\) is a positive scale — it does not move the argmin.` }
        ],
        ml: String.raw`Every regression tutorial's "closed-form solution" is this card. The equivalence generalizes: cross-entropy loss ⇔ Bernoulli/categorical likelihood (classification), Huber loss ⇔ heavier-tailed noise. Choosing a likelihood is choosing a loss — the "probabilistic lens" that organizes all of supervised learning.`,
        byhand: {
          problem: String.raw`For the data of the previous card, solve the normal equations and verify optimality by checking the residuals are orthogonal to both columns of \(\boldsymbol{X}\).`,
          steps: [
            { t: 'The 2×2 system', d: String.raw`$$\begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}\begin{pmatrix} \theta_0 \\ \theta_1 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$$` },
            { t: 'Eliminate', d: String.raw`Subtract row 1 from row 2: \(2\theta_1 = 1 \Rightarrow \theta_1 = \tfrac12\). Back-substitute: \(3\theta_0 = 2 - \tfrac32 = \tfrac12 \Rightarrow \theta_0 = \tfrac16\).` },
            { t: 'Fitted line and residuals', d: String.raw`$$\hat{y} = \tfrac16 + \tfrac12 x, \qquad \boldsymbol{r} = \boldsymbol{y} - \hat{\boldsymbol{y}} = \begin{pmatrix} -1/6 \\ 1/3 \\ -1/6 \end{pmatrix}$$` },
            { t: 'Optimality certificate', d: String.raw`Orthogonality to column 1 (ones): \(-\tfrac16 + \tfrac13 - \tfrac16 = 0\) ✓. To column 2 \((0,1,2)\): \(0\cdot(-\tfrac16) + \tfrac13 + 2(-\tfrac16) = 0\) ✓. The residuals are perpendicular to the data columns — no linear direction can improve the fit.` },
            { t: 'Minimal loss', d: String.raw`$$L(\boldsymbol{\theta}^\star) = \tfrac12\big[\tfrac1{36} + \tfrac49 + \tfrac1{36}\big] = \tfrac12\cdot\frac{1 + 16 + 1}{36} = \frac{1}{6} \approx 0.167$$ (half the SSE, per our \(\tfrac12\) convention; SSE \(= \tfrac13\).)` }
          ],
          answer: String.raw`\(\boldsymbol{\theta}^\star = (\tfrac16, \tfrac12)^\top\): \(\hat{y} = \tfrac16 + \tfrac12 x\), certified by orthogonal residuals, \(L_{\min} = \tfrac16\).`
        }
      },
      {
        id: 'c3',
        title: 'Overfitting and ridge: the prior strikes back',
        subtitle: 'MAP with Gaussian prior = L2 regularization',
        intuition: String.raw`With few points and many features, least squares can swing wildly — perfect collinearity even makes \(\boldsymbol{X}^\top\boldsymbol{X}\) singular (Chapter 2's no-unique-solution case). The fix that actually works: <b>prefer small parameters</b>. In probability language: put a Gaussian prior on \(\boldsymbol{\theta}\) (centered at zero) and take the MAP. In calculus language: add \(\lambda\|\boldsymbol{\theta}\|^2\) to the loss. Same thing, two languages — <b>ridge regression</b>. The new matrix \(\boldsymbol{X}^\top\boldsymbol{X} + \lambda\boldsymbol{I}\) is always invertible: the prior stabilizes the mathematics itself.`,
        math: [
          { h: 'Ridge from a prior', t: String.raw`Prior: \(\boldsymbol{\theta} \sim \mathcal{N}(\boldsymbol{0}, \tau^2\boldsymbol{I})\). MAP: $$\arg\max_{\boldsymbol{\theta}} \;\log p(\boldsymbol{y} \mid \boldsymbol{\theta}) + \log p(\boldsymbol{\theta}) = \arg\min_{\boldsymbol{\theta}}\; \tfrac{1}{2\sigma^2}\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2 + \frac{1}{2\tau^2}\|\boldsymbol{\theta}\|^2$$ Multiplying by \(\sigma^2\) and naming \(\lambda = \sigma^2/\tau^2\): $$\boxed{\;\boldsymbol{\theta}^{\text{ridge}} = (\boldsymbol{X}^\top\boldsymbol{X} + \lambda\boldsymbol{I})^{-1}\boldsymbol{X}^\top\boldsymbol{y}\;}$$ \(\lambda\) big: prior wins (heavy shrinkage); \(\lambda = 0\): pure MLE. Regularization strength = prior strength.` },
          { h: 'Why it always works numerically', t: String.raw`Eigenvalues of \(\boldsymbol{X}^\top\boldsymbol{X}\) become \(\lambda_i + \lambda \ge \lambda \gt 0\): invertible even if the data is collinear (Ch 4). Shrinkage: each eigendirection of the solution is scaled by \(\frac{\lambda_i}{\lambda_i + \lambda} \lt 1\).` }
        ],
        ml: String.raw`Weight decay in every deep-learning framework is ridge on network weights (\(\lambda\|\boldsymbol{\theta}\|^2\) added to the loss). LASSO replaces the prior with a Laplace one (\(\ell_1\)) and gains sparsity. The \(\lambda\) you cross-validate is a prior-width knob — modern "Bayesian deep learning" is this idea taken seriously.`,
        byhand: {
          problem: String.raw`Same data \(\{(0,0), (1,1), (2,1)\}\), now with ridge \(\lambda = 1\). Compute \(\boldsymbol{\theta}^{\text{ridge}}\), compare with the MLE \((\tfrac16, \tfrac12)^\top\), and verify the fitted values moved closer to the prior's preference.`,
          steps: [
            { t: 'Ridge system', d: String.raw`$$(\boldsymbol{X}^\top\boldsymbol{X} + \boldsymbol{I})\boldsymbol{\theta} = \boldsymbol{X}^\top\boldsymbol{y}: \qquad \begin{pmatrix} 4 & 3 \\ 3 & 6 \end{pmatrix}\begin{pmatrix} \theta_0 \\ \theta_1 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$$ (\(\boldsymbol{X}^\top\boldsymbol{X} + \boldsymbol{I}\) is guaranteed invertible: eigenvalues \(1\pm\sqrt{2}/\sqrt{2}\)… concretely \(\det = 24 - 9 = 15 \ne 0\).)` },
            { t: 'Solve via the 2×2 inverse', d: String.raw`$$\boldsymbol{\theta}^{\text{ridge}} = \frac{1}{15}\begin{pmatrix} 6 & -3 \\ -3 & 4 \end{pmatrix}\begin{pmatrix} 2 \\ 3 \end{pmatrix} = \frac{1}{15}\begin{pmatrix} 3 \\ 6 \end{pmatrix} = \begin{pmatrix} \tfrac15 \\ \tfrac25 \end{pmatrix}$$` },
            { t: 'Compare: shrinkage', d: String.raw`Slope: \(\tfrac12 \to \tfrac25\) (pulled 20% toward 0). The whole coefficient vector's norm: \(\|(\tfrac16, \tfrac12)\| \approx 0.53 \to \|(\tfrac15, \tfrac25)\| \approx 0.45\). The prior's gravity is visible.` },
            { t: 'The price and the prize', d: String.raw`Fitted values: \(\hat{\boldsymbol{y}} = (\tfrac15, \tfrac35, 1)^\top\), residuals \(\boldsymbol{r} = (-\tfrac15, \tfrac25, 0)^\top\), loss \(L = \tfrac12(\tfrac1{25} + \tfrac4{25}) = \tfrac1{10}\) — slightly above the MLE's \(\tfrac16\), but the solution is stabilized and (on new data) typically better: the bias–variance trade of Chapter 8, in numbers. (In practice one leaves the intercept unpenalized by centering the data first.)` }
          ],
          answer: String.raw`\(\boldsymbol{\theta}^{\text{ridge}} = (\tfrac15, \tfrac25)^\top\) vs MLE \((\tfrac16, \tfrac12)^\top\): slope shrunk toward zero, fitting error up, stability up. \(\lambda\) = prior strength = the bias–variance dial.`
        }
      },
      {
        id: 'c4',
        title: 'The Bayesian view: posterior and predictive uncertainty',
        subtitle: 'from point estimates to error bars',
        intuition: String.raw`Instead of picking one \(\boldsymbol{\theta}\), keep the whole <b>posterior distribution</b> over \(\boldsymbol{\theta}\) — with Gaussian noise and a Gaussian prior it stays Gaussian in closed form. Then a new input \(\boldsymbol{x}_\star\) gets not just a prediction but a <b>predictive distribution</b>: an average of the model's predictions over every plausible \(\boldsymbol{\theta}\). Where data is dense, the predictive is tight; where data is sparse (extrapolation!), it opens up. This honest "I don't know" is what separates regression from a curve with false confidence.`,
        math: [
          { h: 'Posterior (conjugacy)', t: String.raw`With prior \(\mathcal{N}(\boldsymbol{0}, \tau^2\boldsymbol{I})\) and noise \(\sigma^2\): $$p(\boldsymbol{\theta} \mid \mathcal{D}) = \mathcal{N}(\boldsymbol{\theta} \mid \boldsymbol{\mu}_n, \boldsymbol{\Sigma}_n), \quad \boldsymbol{\Sigma}_n = \left(\tfrac{1}{\tau^2}\boldsymbol{I} + \tfrac{1}{\sigma^2}\boldsymbol{X}^\top\boldsymbol{X}\right)^{-1}, \quad \boldsymbol{\mu}_n = \boldsymbol{\Sigma}_n\,\tfrac{1}{\sigma^2}\boldsymbol{X}^\top\boldsymbol{y}$$ The posterior mean is the ridge solution (scaled) — MAP is the posterior's peak, the full posterior is richer.` },
          { h: 'Posterior predictive', t: String.raw`$$p(y_\star \mid \boldsymbol{x}_\star, \mathcal{D}) = \mathcal{N}\big(\boldsymbol{x}_\star^\top\boldsymbol{\mu}_n,\;\; \boldsymbol{x}_\star^\top\boldsymbol{\Sigma}_n\,\boldsymbol{x}_\star + \sigma^2\big)$$ Two variance sources: parameter uncertainty (\(\boldsymbol{x}_\star^\top\boldsymbol{\Sigma}_n\boldsymbol{x}_\star\), grows away from data) and irreducible noise (\(\sigma^2\)).` }
        ],
        ml: String.raw`This is the exact template of <b>Gaussian process regression</b> (a GP is Bayesian linear regression in an infinite feature space — the kernel trick of Ch 12 applied to Bayes). Uncertainty estimates from this machinery power active learning, safe control, and calibrated ML. Conformal prediction is a distribution-free cousin.`,
        byhand: {
          problem: String.raw`Using the ridge solution as posterior mean (approximation), reason through: for the data \(\{(0,0),(1,1),(2,1)\}\), what should the predictive distribution look like at \(x_\star = 1\) (data-dense region) vs \(x_\star = 5\) (extrapolation)?`,
          steps: [
            { t: 'At x★ = 1 (inside the data)', d: String.raw`Three observations pin the line down near \(x = 1\): parameter uncertainty is small, so \(\boldsymbol{x}_\star^\top\boldsymbol{\Sigma}_n\boldsymbol{x}_\star\) is small; predictive \(\approx \mathcal{N}(\tfrac23,\; \text{small} + \sigma^2)\) — dominated by the noise floor.` },
            { t: 'At x★ = 5 (extrapolation)', d: String.raw`No data out there: many slopes/intercepts fit the seen points nearly equally well. The posterior over \(\boldsymbol{\theta}\) is wide <em>in the directions that matter at \(x = 5\)</em>, so \(\boldsymbol{x}_\star^\top\boldsymbol{\Sigma}_n\boldsymbol{x}_\star\) is large: predictive opens up — wide error bars, honest doubt.` },
            { t: 'The qualitative law', d: String.raw`Predictive variance grows like \(\boldsymbol{x}_\star^\top(\tfrac{1}{\tau^2}\boldsymbol{I} + \tfrac{1}{\sigma^2}\boldsymbol{X}^\top\boldsymbol{X})^{-1}\boldsymbol{x}_\star\): quadratic in distance from the data's center — an error bar shaped like a trumpet opening away from the data.` }
          ],
          answer: String.raw`Tight at \(x = 1\) (noise-dominated), wide at \(x = 5\) (parameter-uncertainty-dominated). Bayesian regression quantifies <em>where</em> the model is ignorant — the feature point estimates cannot give.`
        }
      }
    ],
    cheatsheet: [
      { n: 'Normal equations', t: String.raw`$$(\boldsymbol{X}^\top\boldsymbol{X})\boldsymbol{\theta} = \boldsymbol{X}^\top\boldsymbol{y}, \qquad \nabla_{\boldsymbol{\theta}} \tfrac12\|\boldsymbol{X}\boldsymbol{\theta}-\boldsymbol{y}\|^2 = \boldsymbol{X}^\top(\boldsymbol{X}\boldsymbol{\theta}-\boldsymbol{y})$$` },
      { n: 'LS = MLE', t: String.raw`$$\varepsilon \sim \mathcal{N}(0, \sigma^2) \;\Longleftrightarrow\; \text{squared loss}; \qquad \boldsymbol{\theta}^{\text{MLE}} = \boldsymbol{\theta}^{\text{LS}}$$` },
      { n: 'Ridge = MAP', t: String.raw`$$\boldsymbol{\theta}^{\text{ridge}} = (\boldsymbol{X}^\top\boldsymbol{X} + \lambda\boldsymbol{I})^{-1}\boldsymbol{X}^\top\boldsymbol{y}, \qquad \lambda = \sigma^2/\tau^2$$` },
      { n: 'Projection', t: String.raw`$$\hat{\boldsymbol{y}} = \boldsymbol{P}\boldsymbol{y}, \quad \boldsymbol{P} = \boldsymbol{X}(\boldsymbol{X}^\top\boldsymbol{X})^{-1}\boldsymbol{X}^\top, \quad \boldsymbol{P}^2 = \boldsymbol{P}, \quad \boldsymbol{X}^\top\boldsymbol{r} = \boldsymbol{0}$$` },
      { n: 'Posterior predictive', t: String.raw`$$p(y_\star) = \mathcal{N}(\boldsymbol{x}_\star^\top\boldsymbol{\mu}_n,\; \boldsymbol{x}_\star^\top\boldsymbol{\Sigma}_n\boldsymbol{x}_\star + \sigma^2)$$` }
    ],
    practice: [
      {
        q: String.raw`Fit \(\hat{y} = \theta_0 + \theta_1 x\) to \(\{(0,1), (1,2), (2,4)\}\) via the normal equations.`,
        diff: 'easy',
        s: [
          String.raw`\(\boldsymbol{X}^\top\boldsymbol{X} = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}\), \(\boldsymbol{X}^\top\boldsymbol{y} = \begin{pmatrix} 7 \\ 12 \end{pmatrix}\).`,
          String.raw`Subtract: \(2\theta_1 = 5 \Rightarrow \theta_1 = 2.5\); \(3\theta_0 = 7 - 7.5 = -0.5 \Rightarrow \theta_0 = -\tfrac16\).`,
          String.raw`Residuals: \(1 + \tfrac16 = \tfrac76\); \(2 - \tfrac{7}{3} = -\tfrac13\); \(4 - \tfrac{29}{6} = -\tfrac56\); orthogonality: \(\tfrac76 - \tfrac13 - \tfrac56 = 0\) ✓.`
        ],
        fin: String.raw`\(\hat{y} = -\tfrac16 + 2.5x\), SSE \(= \tfrac{49/36 + 4/9 + 25/36}{} = \tfrac{13}{6}\). (Data is far from collinear — see it fit live in the widget above.)`
      },
      {
        q: String.raw`Add ridge \(\lambda = 2\) to the previous problem. Solve, and state which coefficient shrank most.`,
        diff: 'med',
        s: [
          String.raw`$$(\boldsymbol{X}^\top\boldsymbol{X} + 2\boldsymbol{I}) = \begin{pmatrix} 5 & 3 \\ 3 & 7 \end{pmatrix}$$`,
          String.raw`Determinant \(= 35 - 9 = 26\); inverse \(\tfrac{1}{26}\begin{pmatrix} 7 & -3 \\ -3 & 5 \end{pmatrix}\).`,
          String.raw`\(\boldsymbol{\theta} = \tfrac{1}{26}\begin{pmatrix} 7 & -3 \\ -3 & 5\end{pmatrix}\begin{pmatrix} 7 \\ 12 \end{pmatrix} = \tfrac{1}{26}\begin{pmatrix} 13 \\ 39 \end{pmatrix} = \begin{pmatrix} \tfrac12 \\ \tfrac32 \end{pmatrix}\).`,
          String.raw`Slope: \(2.5 \to 1.5\) (−40%); intercept: \(-\tfrac16 \to \tfrac12\). The steep slope is where the prior bites hardest — high-variance directions shrink first.`
        ],
        fin: String.raw`\(\boldsymbol{\theta}^{\text{ridge}} = (\tfrac12, \tfrac32)^\top\); slope shrank \(2.5 \to 1.5\).`
      },
      {
        q: String.raw`Show that maximizing the Gaussian log-likelihood \(\log p(\boldsymbol{y} \mid \boldsymbol{\theta}) = -\frac{n}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2\) yields the least-squares solution, regardless of \(\sigma^2\).`,
        diff: 'easy',
        s: [
          String.raw`Only the second term depends on \(\boldsymbol{\theta}\); the rest is constant.`,
          String.raw`Maximizing \(-\frac{1}{2\sigma^2}\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2\) = minimizing \(\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2\) (the negative constant \(1/2\sigma^2\) does not change the argmax).`,
          String.raw`Therefore \(\boldsymbol{\theta}^{\text{MLE}} = (\boldsymbol{X}^\top\boldsymbol{X})^{-1}\boldsymbol{X}^\top\boldsymbol{y}\) — identical to least squares. ∎`
        ],
        fin: String.raw`The noise variance \(\sigma^2\) scales the loss but never moves its minimum. Squared loss = Gaussian noise, by identity.`
      },
      {
        q: String.raw`(Proof, projection route) Using only "residual ⊥ columns of X" and the definition of projection, prove that no other \(\boldsymbol{\theta}\) gives a smaller \(\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2\).`,
        diff: 'hard',
        s: [
          String.raw`Let \(\boldsymbol{\theta}^\star\) satisfy \(\boldsymbol{X}^\top(\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}^\star) = \boldsymbol{0}\) and take any other \(\boldsymbol{\theta} = \boldsymbol{\theta}^\star + \boldsymbol{\delta}\).`,
          String.raw`Decompose: \(\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta} = \underbrace{(\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}^\star)}_{\boldsymbol{r}} - \boldsymbol{X}\boldsymbol{\delta}\), and \(\boldsymbol{r}^\top\boldsymbol{X}\boldsymbol{\delta} = 0\) by orthogonality.`,
          String.raw`Pythagoras: \(\|\boldsymbol{y} - \boldsymbol{X}\boldsymbol{\theta}\|^2 = \|\boldsymbol{r}\|^2 + \|\boldsymbol{X}\boldsymbol{\delta}\|^2 \ge \|\boldsymbol{r}\|^2\), with equality iff \(\boldsymbol{X}\boldsymbol{\delta} = \boldsymbol{0}\). ∎`
        ],
        fin: String.raw`The orthogonal residual is the shortest possible: any perturbation adds a fresh \(\|\boldsymbol{X}\boldsymbol{\delta}\|^2\) term. Uniqueness up to the kernel of \(\boldsymbol{X}\).`
      }
    ]
  });
})();
