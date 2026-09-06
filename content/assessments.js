/* Course pack — additional CIS 5200 assessments, fully worked.
   Registers MML.exam.sets: mini exam practice, mini exam, HW1, HW2, HW3. */
(function () {
  var ex = MML.exam;

  /* ---- migrate the practice-final page into the multi-set structure ---- */
  ex.sets = [{
    id: 'final', icon: '🏆', mins: 150,
    title: 'Practice Final (Spring 2026)',
    sub: '70 pts · 150 min · emphasis on the latter third: autodiff, GMMs, PCA, sampling, generative models',
    problems: ex.problems
  }];
  delete ex.problems; delete ex.meta; delete ex.focus; delete ex.pdf;
  ex.intro = String.raw`Every released assessment of the course — homeworks, mini exams, and the practice final — fully solved, step by step, at the level the grading expects (proofs written out, not sketched). Each problem links back to the chapter with the underlying theory.`;
  ex.homeworks = [
    ['HW 1 (this pack)', '—', 'margin perceptron, k-NN stability, smoothness'],
    ['HW 2 (this pack)', '—', 'kernels, SVM, decision trees'],
    ['HW 3 (this pack)', '—', 'AdaBoost, PCA, k-means'],
    ['Mini exam 1 (this pack)', '—', 'k-NN, perceptron, GD, regularization'],
    ['Practice final (this pack)', '—', 'autodiff, GMM, PCA, sampling, generative']
  ];

  /* ==================== MINI EXAM 1 — PRACTICE ==================== */
  ex.sets.push({
    id: 'mini1p', icon: '📘', mins: 15,
    title: 'Mini Exam 1 — Practice',
    sub: '7 pts · covers supervised learning through logistic regression · format twin of the real mini exam',
    problems: [
      {
        n: 'a', pts: 2, topic: 'k-NN', chapter: 'ch8', diff: 'easy',
        q: String.raw`Given the 2-D dataset shown, you want to run k-NN to predict the label of the marked point \(\times\). Would \(k = 1\) be a good choice? Why or why not?`,
        s: [
          String.raw`Almost certainly <b>not</b>. \(k=1\) copies the label of the single nearest training point, so the prediction is exactly as noisy as the data: if the point \(\times\) sits near the class boundary — or near even one mislabeled outlier — its own nearest neighbor may be that noisy point, and the vote cannot outvote it.`,
          String.raw`A larger \(k\) takes a <b>majority vote</b> over a neighborhood, which averages away label noise and produces a smoother decision boundary. The cost: too-large \(k\) oversmooths (bias up). The right \(k\) is chosen by validation — this is the k-NN bias–variance dial.`
        ],
        fin: String.raw`No — \(k=1\) is maximally sensitive to noise and boundary points; a validated larger \(k\) is safer.`
      },
      {
        n: 'b', pts: 3, topic: 'Convexity', chapter: 'ch7', diff: 'med',
        q: String.raw`\(F(w) = \max(0, |w| - 2)\) for scalar \(w\) (flat at 0 for \(|w| \le 2\), then two linear ramps). Is \(F\) convex? Is it strongly convex? Justify.`,
        s: [
          String.raw`<b>Convex: yes.</b> \(|w|\) is convex, so \(|w| - 2\) is convex, and the pointwise maximum of convex functions is convex: \(F(\lambda u + (1-\lambda)v) \le \max(\lambda F(u) + (1-\lambda)F(v),\; 0) \le \lambda F(u) + (1-\lambda)F(v)\). Equivalently, the graph is two upward ramps joined by a flat floor — chords never dip below it.`,
          String.raw`<b>Strongly convex: no.</b> Strong convexity requires a quadratic gap \(F(\lambda u + (1-\lambda)v) \le \lambda F(u) + (1-\lambda)F(v) - \tfrac{\mu}{2}\lambda(1-\lambda)\|u-v\|^2\) — geometrically, curvature everywhere. \(F\) has a <em>flat segment</em> (\(F = 0\) on \([-2,2]\), where convexity gap is 0) and linear ramps (second derivative 0, gap 0), so no \(\mu \gt 0\) can work. Gradient descent also cannot be attracted through the flat region: the gradient is exactly 0 on \([-2,2]\).`
        ],
        fin: String.raw`Convex ✓ (pointwise max of convex functions); not strongly convex ✗ (flat floor + linear ramps ⇒ zero curvature).`
      },
      {
        n: 'c', pts: 2, topic: 'ℓ1 regularization', chapter: 'ch9', diff: 'easy',
        q: String.raw`\(\ell_1\)-regularized linear regression: \(\min_{\boldsymbol{w}} \|\boldsymbol{X}\boldsymbol{w} - \boldsymbol{y}\|_2^2 + \lambda\|\boldsymbol{w}\|_1\). Trained with \(\lambda_1 = 10\) and \(\lambda_2 = 0.5\): which model likely has smaller <b>training error</b>? Which is more likely <b>sparse</b>? Justify.`,
        s: [
          String.raw`<b>Smaller training error: \(\lambda_2 = 0.5\).</b> The objective is data-fit + penalty. A weaker penalty (\(\lambda = 0.5\)) lets \(\boldsymbol{w}\) roam closer to the least-squares minimizer, so the empirical error on the training set is at least as small — regularization trades training fit for stability.`,
          String.raw`<b>Sparser: \(\lambda_1 = 10\).</b> The \(\ell_1\) term shrinks coordinates all the way to <em>exact zeros</em> (its diamond-shaped constraint ball has corners on the axes). A larger \(\lambda\) shrinks harder and zero-s out more coordinates — LASSO's feature selection.`
        ],
        fin: String.raw`Smaller training error: \(\lambda_2 = 0.5\); sparser solution: \(\lambda_1 = 10\).`
      }
    ]
  });

  /* ==================== MINI EXAM 1 (REAL) ==================== */
  ex.sets.push({
    id: 'mini1', icon: '⏱️', mins: 15,
    title: 'Mini Exam 1 (actual)',
    sub: '16 pts · 15 min · answer only ~4 of 7 questions · supervised learning through logistic regression',
    problems: [
      {
        n: 'a', pts: 2, topic: 'k-NN', chapter: 'ch8', diff: 'easy',
        q: String.raw`As you increase \(k\) in a k-NN classifier from 1 to \(n\), how do you expect (1) training error and (2) test error to change?`,
        s: [
          String.raw`**(1) Training error: monotonically non-decreasing.** At \(k = 1\) every training point is its own nearest neighbor → training error 0. As \(k\) grows, points are outvoted by their neighbors and training error rises, reaching the majority-class rate at \(k = n\).`,
          String.raw`**(2) Test error: typically U-shaped.** Small \(k\) overfits noise (high variance); growing \(k\) averages it out and test error drops; but past the sweet spot the model underfits (high bias — at \(k = n\) it predicts the global majority everywhere) and test error climbs again. Validate to find the bottom of the U.`
        ],
        fin: String.raw`Training error: increases (from 0). Test error: decreases, then increases (bias–variance U).`
      },
      {
        n: 'b', pts: 2, topic: 'Perceptron', chapter: 'ch12', diff: 'easy',
        q: String.raw`You run the Perceptron algorithm on labeled data and observe that it does not terminate. What assumption is not satisfied by the data?`,
        s: [
          String.raw`**Linear separability.** The Perceptron convergence theorem guarantees termination in at most \(1/\gamma^2\) updates <em>only if</em> some \(\boldsymbol{w}^*\) with \(\|\boldsymbol{w}^*\| = 1\) separates the data with margin \(\gamma \gt 0\). Non-termination means no such separator exists — the classes overlap. (There is still a bound in terms of the distance to the best separator, but no exact fit.)`
        ],
        fin: String.raw`The data is not linearly separable (no separator with margin \(\gamma \gt 0\)).`
      },
      {
        n: 'c', pts: 3, topic: 'MLE', chapter: 'ch6', diff: 'med',
        q: String.raw`Exponential distribution: \(p(x;\lambda) = \lambda e^{-\lambda x}\) for \(x \gt 0\). Observations \(\{x_1, x_2, x_3\} = \{2, 4, 6\}\). Find the MLE of \(\lambda\).`,
        s: [
          String.raw`Log-likelihood: $$\ell(\lambda) = \sum_{i=1}^{3}\big[\log \lambda - \lambda x_i\big] = 3\log\lambda - \lambda \underbrace{(2 + 4 + 6)}_{12}$$`,
          String.raw`Set the derivative to zero: $$\frac{d\ell}{d\lambda} = \frac{3}{\lambda} - 12 = 0 \;\Rightarrow\; \hat{\lambda} = \frac{3}{12} = \frac14$$ Second derivative \(-3/\lambda^2 \lt 0\): a genuine maximum ✓.`,
          String.raw`Pattern to remember: for the exponential family the MLE is the reciprocal of the sample mean, \(\hat\lambda = n / \sum_i x_i = 1/\bar{x} = 0.25\).`
        ],
        fin: String.raw`\(\hat{\lambda}_{\text{MLE}} = 1/4 = 0.25\).`
      },
      {
        n: 'd', pts: 3, topic: 'Convexity & smoothness', chapter: 'ch7', diff: 'hard',
        q: String.raw`\(F(w) = 2w^2 + w^4\). (i) Is \(F\) convex? (ii) Is it \(L\)-smooth for some finite \(L \gt 0\)? (iii) Justify.`,
        s: [
          String.raw`**(i) Convex — in fact strongly convex.** \(F''(w) = 4 + 12w^2 \ge 4 \gt 0\) for all \(w\): the Hessian (here a positive scalar) is bounded <em>below</em> by \(\mu = 4\), so \(F\) is 4-strongly convex (one unique minimum at \(w = 0\)).`,
          String.raw`**(ii) Not \(L\)-smooth for any finite \(L\).** \(L\)-smoothness means \(F'\) is \(L\)-Lipschitz, equivalently \(F''(w) \le L\) everywhere. But \(F''(w) = 4 + 12w^2 \to \infty\) as \(|w| \to \infty\): curvature is unbounded, so no finite \(L\) exists.`,
          String.raw`**(iii) Consequence.** Curvature bounded below ⇒ descent is guaranteed; curvature unbounded above ⇒ a fixed step size that is safe at \(w = 0\) overshoots for large \(|w|\) — gradient descent on \(F\) can diverge from bad initializations (this function is the textbook counterexample to "strongly convex ⇒ any fixed \(\eta\) converges from anywhere").`
        ],
        fin: String.raw`Convex (even 4-strongly convex, since \(F'' \ge 4\)); NOT \(L\)-smooth for any finite \(L\) (since \(F'' = 4 + 12w^2\) is unbounded).`
      },
      {
        n: 'e', pts: 2, topic: 'Gradient descent', chapter: 'ch7', diff: 'med',
        q: String.raw`\(F(w) = \tfrac12 w^2\), start \(w_1 = 1\), fixed step size \(\eta\). Classify the iterate behavior for \(\eta \in \{0.1,\ 0.5,\ 2,\ 2.1\}\): (i) converges to 0, (ii) oscillates with constant magnitude, (iii) diverges in magnitude.`,
        s: [
          String.raw`Update: \(w_{t+1} = w_t - \eta w_t = (1 - \eta) w_t\), so \(|w_t| = |1 - \eta|^{t-1}\).`,
          String.raw`$$\eta = 0.1:\; |1-\eta| = 0.9 \lt 1 \Rightarrow \text{(i) monotone convergence}$$ $$\eta = 0.5:\; 0.5 \lt 1 \Rightarrow \text{(i) convergence, factor } \tfrac12 \text{ per step}$$ $$\eta = 2:\; |1-\eta| = 1 \Rightarrow \text{(ii) } w_t = (-1)^{t-1}: \text{oscillates forever with constant magnitude}$$ $$\eta = 2.1:\; |1-\eta| = 1.1 \gt 1 \Rightarrow \text{(iii) magnitude grows } 10\% \text{ per step: divergence}$$`,
          String.raw`Matches the theory card: stability boundary is \(\eta \lt 2/\lambda\) with \(\lambda = 1\) here — exactly the interval \(0 \lt \eta \lt 2\).`
        ],
        fin: String.raw`0.1, 0.5 → (i); 2 → (ii); 2.1 → (iii).`
      },
      {
        n: 'f', pts: 2, topic: 'Ridge regularization', chapter: 'ch9', diff: 'easy',
        q: String.raw`Ridge regression with three settings: <b>A</b>: near-zero training error, very large \(\|\boldsymbol{w}\|_2\). <b>B</b>: high training error, very small \(\|\boldsymbol{w}\|_2\). <b>C</b>: moderate training error, moderate \(\|\boldsymbol{w}\|_2\). Order by regularization strength \(\lambda\), weakest to strongest.`,
        s: [
          String.raw`Larger \(\lambda\) penalizes \(\|\boldsymbol{w}\|^2\) harder: coefficients shrink toward 0 and the fit on training data worsens — a monotone trade. So: A (fit great, norm huge) = weakest; C = middle; B (fit poor, norm tiny) = strongest.`,
          String.raw`$$\lambda_A \;\lt\; \lambda_C \;\lt\; \lambda_B$$ C sits on the bias–variance sweet spot that validation usually selects.`
        ],
        fin: String.raw`Weakest → strongest: A, C, B.`
      },
      {
        n: 'g', pts: 2, topic: 'Logistic loss scaling', chapter: 'ch9', diff: 'hard',
        q: String.raw`Scaled logistic loss \(\ell_\beta(\boldsymbol{x}, y) = \log\big(1 + \exp(-\beta\, y\, \boldsymbol{w}^\top\boldsymbol{x})\big)\), \(\beta \gt 0\). As \(\beta\) increases, what happens to the loss on (i) correctly classified points far from the boundary (\(y\,\boldsymbol{w}^\top\boldsymbol{x} \gg 0\)) and (ii) confidently misclassified points (\(y\,\boldsymbol{w}^\top\boldsymbol{x} \ll 0\))?`,
        s: [
          String.raw`Let \(m = y\,\boldsymbol{w}^\top\boldsymbol{x}\) (the margin). \(\ell_\beta = \log(1 + e^{-\beta m})\).`,
          String.raw`**(i) \(m \gg 0\):** \(\beta m\) is large positive, so \(e^{-\beta m} \approx 0\) and \(\ell_\beta \approx e^{-\beta m} \to 0\) <b>even faster than before</b> — confidently correct points become nearly irrelevant to the objective (and to the gradient).`,
          String.raw`**(ii) \(m \ll 0\):** \(-\beta m\) is large positive, so \(\ell_\beta \approx \log(e^{-\beta m}) = -\beta m\): the penalty grows <b>linearly with slope \(\beta\)</b> — much steeper. Net effect: increasing \(\beta\) sharpens the loss toward a hard-margin, SVM-like objective — nearly free correct points, brutally expensive wrong ones.`
        ],
        fin: String.raw`(i) → ~0 (faster decay); (ii) → grows linearly at slope \(\beta\) — a harder, margin-sharper loss.`
      }
    ]
  });

  /* ==================== HOMEWORK 1 ==================== */
  ex.sets.push({
    id: 'hw1', icon: '📐',
    title: 'Homework 1 — Margin Perceptron, k-NN, GD',
    sub: '30 pts written + programming · proofs: perceptron bound, neighbor stability, strong convexity',
    problems: [
      {
        n: 'P1', pts: 10, topic: 'Margin Perceptron (proof)', chapter: 'ch12', diff: 'hard',
        q: String.raw`The Margin Perceptron updates \( \boldsymbol{w}_{t+1} = \boldsymbol{w}_t + y_i\boldsymbol{x}_i \) whenever some point violates \(y_i = \mathrm{sign}(\boldsymbol{w}_t^\top\boldsymbol{x}_i)\) <b>or</b> \(|\boldsymbol{w}_t^\top\boldsymbol{x}_i| \le 1\); it stops when no point does. Assume \(\|\boldsymbol{x}_i\| \le 1\) and a separator \(\boldsymbol{w}^*\), \(\|\boldsymbol{w}^*\| = 1\), margin \(\gamma = \min_i |{\boldsymbol{w}^*}^\top\boldsymbol{x}_i|\). Prove: <b>(1.1)</b> growth lemma \({\boldsymbol{w}^*}^\top\boldsymbol{w}_{t+1} \ge {\boldsymbol{w}^*}^\top\boldsymbol{w}_t + \gamma\); <b>(1.2)</b> control lemma \(\|\boldsymbol{w}_{t+1}\|^2 \le \|\boldsymbol{w}_t\|^2 + 3\), hence \(T \le 3/\gamma^2\); <b>(1.3)</b> the output has margin \(\ge \gamma/3\); <b>(1.4)</b> why large margin is desirable.`,
        s: [
          String.raw`**(1.1) Growth lemma.** Say the update uses point \((\boldsymbol{x}_i, y_i)\). By direct algebra: $$ {\boldsymbol{w}^*}^\top\boldsymbol{w}_{t+1} = {\boldsymbol{w}^*}^\top\boldsymbol{w}_t + y_i\,{\boldsymbol{w}^*}^\top\boldsymbol{x}_i$$ Since \(\boldsymbol{w}^*\) separates correctly, \(y_i\,{\boldsymbol{w}^*}^\top\boldsymbol{x}_i = |{\boldsymbol{w}^*}^\top\boldsymbol{x}_i| \ge \gamma\) by the definition of margin. Hence $$ {\boldsymbol{w}^*}^\top\boldsymbol{w}_{t+1} \ge {\boldsymbol{w}^*}^\top\boldsymbol{w}_t + \gamma \quad\Rightarrow\quad {\boldsymbol{w}^*}^\top\boldsymbol{w}_{T+1} \ge \gamma T. \;\blacksquare$$`,
          String.raw`**(1.2) Control lemma.** $$\|\boldsymbol{w}_{t+1}\|^2 = \|\boldsymbol{w}_t\|^2 + 2y_i\,\boldsymbol{w}_t^\top\boldsymbol{x}_i + \|\boldsymbol{x}_i\|^2$$ Bound the cross term by the violation type: a <em>mistake</em> gives \(y_i\boldsymbol{w}_t^\top\boldsymbol{x}_i \le 0\); a <em>margin violation</em> (correct but too close) gives \(y_i\boldsymbol{w}_t^\top\boldsymbol{x}_i = |\boldsymbol{w}_t^\top\boldsymbol{x}_i| \le 1\). Either way \(y_i\boldsymbol{w}_t^\top\boldsymbol{x}_i \le 1\), and \(\|\boldsymbol{x}_i\|^2 \le 1\): $$\|\boldsymbol{w}_{t+1}\|^2 \le \|\boldsymbol{w}_t\|^2 + 2 + 1 = \|\boldsymbol{w}_t\|^2 + 3 \;\Rightarrow\; \|\boldsymbol{w}_{T+1}\|^2 \le 3T. \;\blacksquare$$ Combine with Cauchy–Schwarz: $$\gamma T \le {\boldsymbol{w}^*}^\top\boldsymbol{w}_{T+1} \le \|\boldsymbol{w}^*\|\,\|\boldsymbol{w}_{T+1}\| = \|\boldsymbol{w}_{T+1}\| \le \sqrt{3T} \;\Rightarrow\; T \le \frac{3}{\gamma^2}$$`,
          String.raw`**(1.3) Output margin ≥ γ/3.** The stopping condition says every point satisfies \(|\boldsymbol{w}^\top\boldsymbol{x}_i| \ge 1\) (it stopped only when all exceed 1). Using the norm bound with \(T \le 3/\gamma^2\): $$\|\boldsymbol{w}\| \le \sqrt{3T} \le \sqrt{3 \cdot \tfrac{3}{\gamma^2}} = \frac{3}{\gamma}$$ Therefore $$\min_i \frac{|\boldsymbol{w}^\top\boldsymbol{x}_i|}{\|\boldsymbol{w}\|} \;\ge\; \frac{1}{\;3/\gamma\;} = \frac{\gamma}{3}. \;\blacksquare$$ (The factor 3 is the price of demanding margin from a perceptron-style update.)`,
          String.raw`**(1.4) Why margin matters.** Margin = robustness: a hyperplane that separates with room to spare keeps classifying correctly under small perturbations of the inputs (noise, measurement error), and statistical learning theory converts margin into <b>generalization bounds</b> — low test error with high probability. This is exactly the principle the hard-margin SVM maximizes.`
        ],
        fin: String.raw`Growth: \(\gamma T \le \boldsymbol{w}^{*\top}\boldsymbol{w}_{T+1}\); control: \(\|\boldsymbol{w}_{T+1}\|^2 \le 3T\); Cauchy–Schwarz ⇒ \(T \le 3/\gamma^2\); stopping ⇒ margin \(\ge \gamma/3\).`
      },
      {
        n: 'P2', pts: 10, topic: 'k-NN stability (proof)', chapter: 'ch8', diff: 'hard',
        q: String.raw`Let \(N_{\boldsymbol{x}}\) be the \(k\) nearest neighbors of \(\boldsymbol{x}\), no ties at the boundary. <b>(2.1)</b> Show \( \big|\|\boldsymbol{x} - \boldsymbol{z}\| - \|\boldsymbol{x}' - \boldsymbol{z}\|\big| \le \epsilon\) whenever \(\|\boldsymbol{x} - \boldsymbol{x}'\| \le \epsilon\). <b>(2.2)</b> For 1-NN with neighbor-distance gap \(\Delta\), show that if each coordinate of \(\boldsymbol{x}\) changes by at most \(\epsilon\) and \(\epsilon \lt \Delta/(2\sqrt{d})\), the nearest neighbor (hence the prediction) is unchanged. <b>(2.3)</b> \(\Delta = O(1)\) does not grow with \(d\) — what does this say about 1-NN stability in high dimensions?`,
        s: [
          String.raw`**(2.1)** Reverse triangle inequality: $$\|\boldsymbol{x} - \boldsymbol{z}\| \le \|\boldsymbol{x} - \boldsymbol{x}'\| + \|\boldsymbol{x}' - \boldsymbol{z}\| \le \epsilon + \|\boldsymbol{x}' - \boldsymbol{z}\|$$ and symmetrically with \(\boldsymbol{x} \leftrightarrow \boldsymbol{x}'\). Take the two inequalities together: $$\big|\;\|\boldsymbol{x}-\boldsymbol{z}\| - \|\boldsymbol{x}'-\boldsymbol{z}\|\;\big| \;\le\; \epsilon. \;\blacksquare$$`,
          String.raw`**(2.2)** Coordinate-wise changes \(|\boldsymbol{x}_j - \boldsymbol{x}'_j| \le \epsilon\) give (Cauchy–Schwarz / Euclidean norm of the change vector): $$\|\boldsymbol{x} - \boldsymbol{x}'\| \le \sqrt{d}\,\epsilon \lt \frac{\Delta}{2}$$ So for <em>every</em> training point \(\boldsymbol{z}\): \(\big|\,\mathrm{dist}(\boldsymbol{x},\boldsymbol{z}) - \mathrm{dist}(\boldsymbol{x}',\boldsymbol{z})\,\big| \lt \Delta/2\). Let \(\boldsymbol{z}_1\) be nearest to \(\boldsymbol{x}\) at distance \(d_1\) and \(\boldsymbol{z}_2\) second nearest at \(d_2 = d_1 + \Delta\). Then $$\mathrm{dist}(\boldsymbol{x}', \boldsymbol{z}_1) \le d_1 + \tfrac{\Delta}{2}, \qquad \mathrm{dist}(\boldsymbol{x}', \boldsymbol{z}_2) \ge d_2 - \tfrac{\Delta}{2} = d_1 + \tfrac{\Delta}{2}$$ and every other point is at distance \(\ge d_2 - \Delta/2 = d_1 + \Delta/2\) from \(\boldsymbol{x}'\). Since the inequalities are <em>strict</em>, \(\boldsymbol{z}_1\) remains the unique nearest neighbor of \(\boldsymbol{x}'\): \(N_{\boldsymbol{x}'} = N_{\boldsymbol{x}}\) and the prediction is unchanged. \(\blacksquare\)`,
          String.raw`**(2.3)** The stability budget is \(\epsilon \lt \Delta/(2\sqrt{d}) = O(1/\sqrt{d})\): it <b>shrinks</b> with dimension. With \(\Delta\) staying \(O(1)\), in high-\(d\) ever smaller perturbations suffice to flip the 1-NN prediction — 1-NN becomes progressively less stable (the high-dimensional cousin of distance concentration).`
        ],
        fin: String.raw`Reverse triangle inequality gives the \(\epsilon\)-ball of distance changes; the gap argument needs \(\sqrt d\,\epsilon \lt \Delta/2\); so the stability budget decays like \(1/\sqrt d\).`
      },
      {
        n: 'P3', pts: 10, topic: 'Strong convexity of regularized logistic regression', chapter: 'ch7', diff: 'hard',
        q: String.raw`\(F_\lambda(\boldsymbol{w}) = \frac1n\sum_{i=1}^n \log\big(1 + e^{-y_i\boldsymbol{w}^\top\boldsymbol{x}_i}\big) + \lambda\|\boldsymbol{w}\|^2\), with \(\|\boldsymbol{x}_i\| \le 1\). <b>(3.1)</b> Show \(F_\lambda\) is \(\mu\)-strongly convex and \(L\)-smooth; give \(\mu, L\) in terms of \(\lambda\). <b>(3.2)</b> Largest \(\eta\) guaranteeing non-increasing objective values. <b>(3.3)</b> Using the strongly-convex GD rate, show convergence speeds up as \(\lambda\) grows — and why bigger \(\lambda\) is not automatically better.`,
        s: [
          String.raw`**(3.1) Hessian bounds.** With \(s_i = \sigma(-y_i\boldsymbol{w}^\top\boldsymbol{x}_i)\) and \(\sigma'(t) = \sigma(t)(1-\sigma(t)) \in (0, \tfrac14]\): $$\nabla^2 \hat R(\boldsymbol{w}) = \frac1n\sum_i \sigma_i(1-\sigma_i)\,\boldsymbol{x}_i\boldsymbol{x}_i^\top$$ For any \(\boldsymbol{v}\): $$\boldsymbol{v}^\top \nabla^2\hat R\, \boldsymbol{v} = \frac1n\sum_i \sigma_i(1-\sigma_i)(\boldsymbol{v}^\top\boldsymbol{x}_i)^2 \;\begin{cases} \ge 0 \\ \le \tfrac14 \|\boldsymbol{x}_i\|^2 \|\boldsymbol{v}\|^2 \le \tfrac14\|\boldsymbol{v}\|^2 \end{cases}$$ (upper bound uses \(\sigma_i(1-\sigma_i) \le \tfrac14\) and \(\|\boldsymbol{x}_i\| \le 1\); lower bound uses \(\sigma_i(1-\sigma_i) \ge 0\)). Since \(\nabla^2(\lambda\|\boldsymbol{w}\|^2) = 2\lambda I\): $$2\lambda I \;\preceq\; \nabla^2 F_\lambda \;\preceq\; \left(2\lambda + \tfrac14\right) I \quad\Rightarrow\quad \mu = 2\lambda,\;\; L = 2\lambda + \tfrac14$$ Logistic loss alone is convex but <em>not</em> strongly convex (its Hessian flattens for confidently-correct points) — the \(\ell_2\) term supplies exactly the missing strong convexity.`,
          String.raw`**(3.2)** The descent lemma for \(L\)-smooth \(F\): $$F(\boldsymbol{w} - \eta\nabla F) \le F(\boldsymbol{w}) - \eta\left(1 - \tfrac{L\eta}{2}\right)\|\nabla F\|^2$$ The bracket is non-negative iff \(0 \lt \eta \le \tfrac{2}{L}\); requiring decrease for <em>every</em> gradient (including the limit of tiny gradients) tightens this to $$\boxed{\;\eta^\star = \frac{1}{L} = \frac{1}{2\lambda + 1/4}\;}$$`,
          String.raw`**(3.3)** Strongly convex + smooth GD contracts the error by \(\rho = \frac{\kappa - 1}{\kappa + 1}\) per step with \(\kappa = L/\mu\). Here $$\kappa(\lambda) = \frac{2\lambda + 1/4}{2\lambda} = 1 + \frac{1}{8\lambda}$$ decreases as \(\lambda\) grows ⇒ \(\rho\) shrinks ⇒ <b>faster convergence</b>. But no — larger \(\lambda\) also shrinks the model toward zero: more bias, potentially worse test error. Optimization speed and statistical quality are different currencies; pick \(\lambda\) by validation, and take the speedup as a side benefit (e.g. of weight decay).`
        ],
        fin: String.raw`\(\mu = 2\lambda\) (from the regularizer), \(L = 2\lambda + 1/4\) (from \(\sigma' \le 1/4\), \(\|x_i\| \le 1\)); largest monotone step \(\eta = 1/L\); \(\kappa = 1 + 1/(8\lambda)\) shrinks with \(\lambda\) — faster but more biased.`
      },
      {
        n: 'PA', pts: 0, topic: 'Practice: Bayes optimal classifier under squared loss', chapter: 'ch6', diff: 'hard',
        q: String.raw`With \(\eta(\boldsymbol{x}) = \Pr[y = 1 \mid \boldsymbol{x}]\) and squared loss on real-valued \(h(\boldsymbol{x})\): <b>(A.1)</b> show the minimizer is \(h^*(\boldsymbol{x}) = \mathbb{E}[y \mid \boldsymbol{x}] = 2\eta(\boldsymbol{x}) - 1\). <b>(A.2)</b> For classes \(\mathcal{N}(\boldsymbol{\mu}, I)\) and \(\mathcal{N}(-\boldsymbol{\mu}, I)\) with equal priors, show \(\eta(\boldsymbol{x}) = \frac{1}{1 + \exp(-2\boldsymbol{\mu}^\top\boldsymbol{x})}\). <b>(A.3)</b> Show thresholding \(h^*\) at 0 gives the linear boundary \(\boldsymbol{w}^\top\boldsymbol{x} + b = 0\); find \(\boldsymbol{w}, b\).`,
        s: [
          String.raw`**(A.1)** Expand the pointwise risk: $$\mathbb{E}_{y \mid \boldsymbol{x}}\big[(h - y)^2\big] = h^2 - 2h\,\mathbb{E}[y \mid \boldsymbol{x}] + \mathbb{E}[y^2 \mid \boldsymbol{x}]$$ a parabola in \(h\) with second derivative \(2 \gt 0\); setting the derivative to zero: $$2h - 2\,\mathbb{E}[y \mid \boldsymbol{x}] = 0 \;\Rightarrow\; h^*(\boldsymbol{x}) = \mathbb{E}[y \mid \boldsymbol{x}]$$ For \(y \in \{-1, 1\}\): \(\mathbb{E}[y \mid \boldsymbol{x}] = \eta(\boldsymbol{x}) - (1 - \eta(\boldsymbol{x})) = 2\eta(\boldsymbol{x}) - 1\). \(\blacksquare\)`,
          String.raw`**(A.2)** Bayes with equal priors — the \(\tfrac12\)'s cancel: $$\eta(\boldsymbol{x}) = \frac{\mathcal{N}(\boldsymbol{x} \mid \boldsymbol{\mu}, I)}{\mathcal{N}(\boldsymbol{x} \mid \boldsymbol{\mu}, I) + \mathcal{N}(\boldsymbol{x} \mid -\boldsymbol{\mu}, I)} = \frac{1}{1 + \dfrac{\mathcal{N}(\boldsymbol{x} \mid -\boldsymbol{\mu}, I)}{\mathcal{N}(\boldsymbol{x} \mid \boldsymbol{\mu}, I)}}$$ The likelihood ratio: $$\frac{\mathcal{N}(\boldsymbol{x} \mid -\boldsymbol{\mu}, I)}{\mathcal{N}(\boldsymbol{x} \mid \boldsymbol{\mu}, I)} = \exp\!\left(-\tfrac{\|\boldsymbol{x} + \boldsymbol{\mu}\|^2 - \|\boldsymbol{x} - \boldsymbol{\mu}\|^2}{2}\right) = \exp\!\left(-\tfrac{4\boldsymbol{\mu}^\top\boldsymbol{x}}{2}\right) = e^{-2\boldsymbol{\mu}^\top\boldsymbol{x}}$$ (the \(\|\boldsymbol{x}\|^2\) and \(\|\boldsymbol{\mu}\|^2\) terms cancel). Hence \(\eta(\boldsymbol{x}) = \frac{1}{1 + e^{-2\boldsymbol{\mu}^\top\boldsymbol{x}}}\). \(\blacksquare\)`,
          String.raw`**(A.3)** \(h^*(\boldsymbol{x}) = 2\eta(\boldsymbol{x}) - 1 \ge 0 \iff \eta(\boldsymbol{x}) \ge \tfrac12 \iff e^{-2\boldsymbol{\mu}^\top\boldsymbol{x}} \le 1 \iff \boldsymbol{\mu}^\top\boldsymbol{x} \ge 0\). The decision boundary is $$\boldsymbol{\mu}^\top\boldsymbol{x} = 0 \quad\Rightarrow\quad \boldsymbol{w} = \boldsymbol{\mu}, \;\; b = 0$$ — the hyperplane orthogonal to the class means, bisecting them; identical to the Bayes-optimal 0/1 classifier, as promised. \(\blacksquare\) (Note the shape: \(\sigma(2\boldsymbol{\mu}^\top\boldsymbol{x})\) — logistic regression is the correctly specified model for this problem.)`
        ],
        fin: String.raw`\(h^* = \mathbb{E}[y \mid x] = 2\eta - 1\); logistic form \(\eta = \sigma(2\boldsymbol{\mu}^\top\boldsymbol{x})\); boundary \(\boldsymbol{w} = \boldsymbol{\mu}, b = 0\).`
      }
    ]
  });

  /* ==================== HOMEWORK 2 ==================== */
  ex.sets.push({
    id: 'hw2', icon: '⚙️',
    title: 'Homework 2 — Kernels, SVM, Decision Trees',
    sub: '40 pts written + programming · kernel closure algebra, a degenerate-kernel SVM, entropy vs error',
    problems: [
      {
        n: 'P1', pts: 10, topic: 'Kernel closure operations (proof)', chapter: 'ch12', diff: 'med',
        q: String.raw`Given valid kernels \(k_1 = \phi_1^\top\phi_1\), \(k_2 = \phi_2^\top\phi_2\), construct feature maps proving validity of: <b>(1.1)</b> \(\alpha k_1\) for \(\alpha \ge 0\); <b>(1.2)</b> \(k_1 + k_2\); <b>(1.3)</b> \(k_1 k_2\); <b>(1.4)</b> \(\sum_{r=1}^{d} \alpha_r (k_1)^r\) for \(\alpha_r \ge 0\).`,
        s: [
          String.raw`**(1.1) Scaling.** Define \(\phi(\boldsymbol{x}) = \sqrt{\alpha}\,\phi_1(\boldsymbol{x})\). Then $$\phi(\boldsymbol{x})^\top\phi(\boldsymbol{z}) = \alpha\, \phi_1(\boldsymbol{x})^\top\phi_1(\boldsymbol{z}) = \alpha k_1(\boldsymbol{x}, \boldsymbol{z}). \;\blacksquare$$`,
          String.raw`**(1.2) Sum.** Concatenate: \(\phi(\boldsymbol{x}) = \begin{pmatrix}\phi_1(\boldsymbol{x})\\ \phi_2(\boldsymbol{x})\end{pmatrix}\). Inner products split blockwise: $$\phi(\boldsymbol{x})^\top\phi(\boldsymbol{z}) = \phi_1(\boldsymbol{x})^\top\phi_1(\boldsymbol{z}) + \phi_2(\boldsymbol{x})^\top\phi_2(\boldsymbol{z}) = k_1 + k_2. \;\blacksquare$$`,
          String.raw`**(1.3) Product.** Use the tensor (Kronecker) product \(\phi(\boldsymbol{x}) = \phi_1(\boldsymbol{x}) \otimes \phi_2(\boldsymbol{x})\) — coordinates indexed by pairs \((a, b)\) with value \(\phi_1(\boldsymbol{x})_a\, \phi_2(\boldsymbol{x})_b\). Then $$\phi(\boldsymbol{x})^\top\phi(\boldsymbol{z}) = \sum_{a,b} \phi_1(\boldsymbol{x})_a\phi_2(\boldsymbol{x})_b\;\phi_1(\boldsymbol{z})_a\phi_2(\boldsymbol{z})_b = \Big(\sum_a \phi_1(\boldsymbol{x})_a\phi_1(\boldsymbol{z})_a\Big)\Big(\sum_b \phi_2(\boldsymbol{x})_b\phi_2(\boldsymbol{z})_b\Big) = k_1 k_2. \;\blacksquare$$`,
          String.raw`**(1.4) Polynomial combination.** By induction: \((k_1)^0 = 1\) is a kernel (\(\phi \equiv\) constant 1); \((k_1)^r\) is a kernel for all \(r\) by repeatedly applying (1.3) to \(k_1 \cdot k_1\); scaling by \(\alpha_r \ge 0\) uses (1.1), and summing uses (1.2). $$\sum_{r=1}^d \alpha_r (k_1)^r = \text{valid} \;\blacksquare$$ (With \(k_1(\boldsymbol{x},\boldsymbol{z}) = \boldsymbol{x}^\top\boldsymbol{z}\) this <em>is</em> the polynomial kernel; the RBF kernel is the limit of this game with infinitely many terms.)`
        ],
        fin: String.raw`Scale by \(\sqrt\alpha\); sum by concatenation; product by tensor product; polynomials by induction over 1.1–1.3.`
      },
      {
        n: 'P2', pts: 10, topic: 'SVM with the delta kernel', chapter: 'ch12', diff: 'hard',
        q: String.raw`Hard-margin kernel-SVM with \(k(\boldsymbol{x}, \boldsymbol{z}) = \mathbb{1}[\boldsymbol{x} = \boldsymbol{z}]\), all \(\boldsymbol{x}_i\) distinct. <b>(2.1)</b> Write the kernelized objective using \(\boldsymbol{w} = \sum_i \alpha_i y_i \boldsymbol{x}_i\) and simplify. <b>(2.2)</b> Find \(\boldsymbol{\alpha}^*\). <b>(2.3)</b> Show the classifier is \(f(\boldsymbol{x}) = \mathrm{sign}\big(\sum_i y_i \mathbb{1}[\boldsymbol{x} = \boldsymbol{x}_i]\big)\). <b>(2.4)</b> Training error? <b>(2.5)</b> Prediction on unseen \(\boldsymbol{x}\), and what this says about generalization?`,
        s: [
          String.raw`**(2.1)** Representer theorem: \(\boldsymbol{w} = \sum_j \alpha_j y_j \boldsymbol{x}_j\). Objective: $$\boldsymbol{w}^\top\boldsymbol{w} = \sum_{i,j} \alpha_i\alpha_j y_i y_j\, k(\boldsymbol{x}_i, \boldsymbol{x}_j) \overset{k}{=} \sum_i \alpha_i^2 y_i^2 = \sum_i \alpha_i^2$$ Constraints: \(y_i\boldsymbol{w}^\top\boldsymbol{x}_i = \sum_j \alpha_j y_i y_j k(\boldsymbol{x}_j, \boldsymbol{x}_i) = \alpha_i y_i^2 = \alpha_i \ge 1\). So: $$\min_{\boldsymbol{\alpha}} \sum_i \alpha_i^2 \quad\text{s.t.}\quad \alpha_i \ge 1 \;\;\forall i$$`,
          String.raw`**(2.2)** The objective is strictly increasing in each \(\alpha_i^2\) with decoupled constraints \(\alpha_i \ge 1\): the minimum is at the boundary, $$\alpha_i^* = 1 \;\; \forall i$$`,
          String.raw`**(2.3)** $$f(\boldsymbol{x}) = \mathrm{sign}\Big(\sum_i \alpha_i^* y_i\, k(\boldsymbol{x}_i, \boldsymbol{x})\Big) = \mathrm{sign}\Big(\sum_i y_i\, \mathbb{1}[\boldsymbol{x}_i = \boldsymbol{x}]\Big)$$ Since the \(\boldsymbol{x}_i\) are distinct, at most one indicator fires: the sum is \(y_i\) if \(\boldsymbol{x} = \boldsymbol{x}_i\), else \(0\).`,
          String.raw`**(2.4)** On any training point \(\boldsymbol{x}_i\): \(f(\boldsymbol{x}_i) = \mathrm{sign}(y_i) = y_i\). <b>Training error 0.</b>`,
          String.raw`**(2.5)** For unseen \(\boldsymbol{x}\) the sum is \(0\) and, by the given convention, \(\mathrm{sign}(0) = +1\): the classifier <b>always predicts \(+1\)</b>. It has memorized the lookup table and learned nothing transferable — test error will be whatever the base rate of class \(-1\) is (e.g. ~50% on balanced data). Moral: a kernel that only rewards exact identity has a feature map of pure delta functions; there is no notion of similarity to generalize through. Kernel choice <em>is</em> the inductive bias.`
        ],
        fin: String.raw`Objective \(\sum\alpha_i^2\) s.t. \(\alpha_i \ge 1\); \(\boldsymbol{\alpha}^* = \boldsymbol{1}\); \(f\) = memorized label (else \(+1\)); train error 0; no generalization.`
      },
      {
        n: 'P3', pts: 10, topic: 'Decision trees: error vs entropy', chapter: 'ch8', diff: 'med',
        q: String.raw`Labels generated by \(f(\boldsymbol{x}) = x_1 \wedge \neg x_2\) over \(\{0,1\}^3\) (2 of 8 points positive). <b>(3.1)</b> Best error of a 1-leaf tree? <b>(3.2)</b> Does any single split beat it (classification error)? <b>(3.3)</b> Entropy of the 1-leaf tree? <b>(3.4)</b> Best split by weighted entropy, and its entropy? <b>(3.5)</b> Why is entropy more informative than error here? (Given: \(H(\tfrac14) \approx 0.811\), \(H(\tfrac12) = 1\).)`,
        s: [
          String.raw`**(3.1)** Best constant prediction is \(-1\) (6 of 8 labels): error \(= \tfrac28 = \tfrac14\).`,
          String.raw`**(3.2)** Enumerate all three splits (child errors at the better constant): <b>\(x_1\)</b>: left all \(-1\) (0 errors of 4), right \(2/4\) mixed (2 errors) → total \(\tfrac{2}{8} = \tfrac14\). <b>\(x_2\)</b>: mirror image → \(\tfrac14\). <b>\(x_3\)</b>: each child is \(1/4\) positive → 1 error per child of 4 → \(\tfrac14\). <b>No split improves on \(\tfrac14\)</b> — the target is a conjunction, and no single feature separates any positive mass. (A second level of splitting does: \(x_1\) then \(x_2\) — trees need depth for conjunctions.)`,
          String.raw`**(3.3)** Root distribution \((\tfrac14, \tfrac34)\): $$H = H(\tfrac14) = -\tfrac14\log_2\tfrac14 - \tfrac34\log_2\tfrac34 \approx 0.811 \text{ bits}$$`,
          String.raw`**(3.4)** Weighted child entropies: <b>\(x_1\)</b>: left child holds 4 points (pure, \(H(0) = 0\)), right child 4 points (\(2/4\), \(H = 1\)): $$\tfrac48 \cdot 0 + \tfrac48 \cdot 1 = 0.5 \text{ bits}$$ <b>\(x_2\)</b>: symmetric, also \(0.5\). <b>\(x_3\)</b>: both children \(1/4\) positive: \(\tfrac48 H(\tfrac14) + \tfrac48 H(\tfrac34) = 0.811\). Lowest entropy: <b>split on \(x_1\) or \(x_2\), entropy \(0.5\) bits</b> (gain \(0.311\)).`,
          String.raw`**(3.5)** Classification error is <em>flat</em> across all three splits (\(\tfrac14\) each) — it cannot distinguish a split that creates a perfectly pure node from one that changes nothing. Entropy is <b>strictly concave</b> in the child purity \(p\), so it strictly rewards purity gains: it detects that the \(x_1\)/\(x_2\) splits create a pure node (\(H = 0\)) while the \(x_3\) split leaves both children as impure as the parent. That sensitivity is why trees split on entropy (or Gini) rather than raw error.`
        ],
        fin: String.raw`1-leaf: error \(\tfrac14\), \(H \approx 0.811\); no split beats \(\tfrac14\) error; best entropy split \(x_1\) or \(x_2\) at \(0.5\) bits; entropy's strict concavity sees progress error cannot.`
      },
      {
        n: 'PA', pts: 10, topic: 'Practice: MLE derivation of squared loss', chapter: 'ch9', diff: 'med',
        q: String.raw`\(y = \boldsymbol{w}^\top\boldsymbol{x} + \epsilon\), \(\epsilon \sim \mathcal{N}(0, \sigma^2)\). <b>(A.1)</b> Derive \(p(y \mid \boldsymbol{x})\). <b>(A.2)</b> Show the risk of \(f(\boldsymbol{x}) = \mathbb{E}[y \mid \boldsymbol{x}]\) equals \(\sigma^2\). <b>(A.3)</b> Write \(\log \hat{\mathcal{L}}(\boldsymbol{w}, \sigma)\). <b>(A.4)</b> Show its maximizer over \(\boldsymbol{w}\) is the least-squares minimizer.`,
        s: [
          String.raw`**(A.1)** Adding independent noise shifts a Gaussian's mean: \(y \mid \boldsymbol{x} \sim \mathcal{N}(\boldsymbol{w}^\top\boldsymbol{x}, \sigma^2)\), i.e. $$p(y \mid \boldsymbol{x}) = \frac{1}{\sqrt{2\pi}\,\sigma} \exp\!\left(-\frac{(y - \boldsymbol{w}^\top\boldsymbol{x})^2}{2\sigma^2}\right). \;\blacksquare$$`,
          String.raw`**(A.2)** \(\mathbb{E}[y \mid \boldsymbol{x}] = \boldsymbol{w}^\top\boldsymbol{x}\), so \(y - f(\boldsymbol{x}) = \epsilon\) exactly: $$R(f) = \mathbb{E}\big[(y - f(\boldsymbol{x}))^2\big] = \mathbb{E}[\epsilon^2] = \sigma^2$$ — the irreducible noise floor: no predictor beats it. \(\blacksquare\)`,
          String.raw`**(A.3)** Independence across examples makes the likelihood a product; the log: $$\log \hat{\mathcal{L}} = \sum_{i=1}^m \left[-\tfrac12\log(2\pi\sigma^2) - \frac{(y_i - \boldsymbol{w}^\top\boldsymbol{x}_i)^2}{2\sigma^2}\right] = -\frac{m}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^m \big(y_i - \boldsymbol{w}^\top\boldsymbol{x}_i\big)^2$$`,
          String.raw`**(A.4)** Only the second term involves \(\boldsymbol{w}\), and it enters as \(-\frac{1}{2\sigma^2}\sum(\cdot)^2\) with \(\sigma^2 \gt 0\): maximizing the log-likelihood over \(\boldsymbol{w}\) ⟺ minimizing \(\sum_i (y_i - \boldsymbol{w}^\top\boldsymbol{x}_i)^2\) ⟺ minimizing \(\hat R(\boldsymbol{w}) = \frac1m\sum_i(\cdot)^2\) (the factor \(1/m\) doesn't move the argmin). \(\blacksquare\) — Gaussian noise <em>is</em> squared loss (and maximizing over \(\sigma\) additionally gives \(\hat\sigma^2 = \frac1m\sum_i(\text{residual})^2\)).`
        ],
        fin: String.raw`\(y \mid x \sim \mathcal{N}(\boldsymbol{w}^\top x, \sigma^2)\); best risk \(= \sigma^2\); \(\log\hat{\mathcal{L}} = -\frac{m}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\text{SSE}\); argmax = least squares.`
      }
    ]
  });

  /* ==================== HOMEWORK 3 ==================== */
  ex.sets.push({
    id: 'hw3', icon: '🚀',
    title: 'Homework 3 — AdaBoost, PCA, k-means',
    sub: '44 pts written + programming · the theory-heavy one: full derivations expected',
    problems: [
      {
        n: 'P1', pts: 15, topic: 'AdaBoost error bound (full derivation)', chapter: 'ch8', diff: 'hard',
        q: String.raw`AdaBoost: weights \(w_{t+1,i} = \frac{w_{t,i}}{Z_t}\exp(-\alpha_t y_i h_t(\boldsymbol{x}_i))\), \(Z_t = \sum_j w_{t,j} e^{-\alpha_t y_j h_t(\boldsymbol{x}_j)}\), returned model \(H_T = \sum_t \alpha_t h_t\), weak-learner guarantee \(\epsilon_t \le \tfrac12 - \gamma\). Prove: <b>(1.1)</b> \(\mathrm{error}(H_T) \le \frac1n\sum_i e^{-y_iH_T(\boldsymbol{x}_i)}\); <b>(1.2)</b> by induction \(w_{T+1,i} = \frac{e^{-y_iH_T(\boldsymbol{x}_i)}}{\prod_{t=1}^T Z_t}\), hence \(\frac1n\sum_i e^{-y_iH_T} = \prod_t Z_t\); <b>(1.3)</b> \(Z_t = (1-\epsilon_t)e^{-\alpha_t} + \epsilon_t e^{\alpha_t}\); <b>(1.4)</b> \(Z_t\) is minimized at \(\alpha_t = \frac12\log\frac{1-\epsilon_t}{\epsilon_t}\).`,
        s: [
          String.raw`**(1.1) Exponential loss dominates 0/1.** If \(H_T\) classifies \(\boldsymbol{x}_i\) correctly, \(y_iH_T(\boldsymbol{x}_i) \ge 0\), so \(-y_iH_T \le 0\) and \(e^{-y_iH_T(\boldsymbol{x}_i)} \ge 1\); if it errs, the indicator is \(1 \le e^{-y_iH_T}\) (exponential is \(\ge 1\) whenever its exponent \(\le 0\), and strictly greater here). Pointwise domination: $$\mathbb{1}[\mathrm{sgn}(H_T(\boldsymbol{x}_i)) \ne y_i] \le e^{-y_iH_T(\boldsymbol{x}_i)} \;\Rightarrow\; \mathrm{error}(H_T) \le \frac1n\sum_i e^{-y_iH_T(\boldsymbol{x}_i)}. \;\blacksquare$$`,
          String.raw`**(1.2) Weights in closed form (induction).** Base \(T = 0\): \(H_0 = 0\), \(\prod_\emptyset Z_t = 1\), so the claim reads \(w_{1,i} = e^{0}/1 = \tfrac1n\) ✓. Step: $$w_{T+1,i} = \frac{w_{T,i}\, e^{-\alpha_T y_i h_T(\boldsymbol{x}_i)}}{Z_T} = \frac{e^{-y_iH_{T-1}(\boldsymbol{x}_i)}\, e^{-\alpha_T y_i h_T(\boldsymbol{x}_i)}}{\big(\prod_{t=1}^{T-1} Z_t\big) Z_T} = \frac{e^{-y_iH_T(\boldsymbol{x}_i)}}{\prod_{t=1}^{T} Z_t}. \;\blacksquare$$ Since the weights form a distribution, \(\sum_i w_{T+1,i} = 1\): $$\frac1n\sum_i e^{-y_iH_T(\boldsymbol{x}_i)} = \prod_{t=1}^T Z_t. \;\blacksquare$$`,
          String.raw`**(1.3) Split \(Z_t\) by correct/incorrect.** On correct points \(y_jh_t(\boldsymbol{x}_j) = +1\), on mistakes \(= -1\): $$Z_t = \sum_{\text{correct}} w_{t,j} e^{-\alpha_t} + \sum_{\text{wrong}} w_{t,j} e^{\alpha_t} = (1 - \epsilon_t)\,e^{-\alpha_t} + \epsilon_t\, e^{\alpha_t}. \;\blacksquare$$`,
          String.raw`**(1.4) Optimal \(\alpha_t\).** $$\frac{\partial Z_t}{\partial \alpha_t} = -(1 - \epsilon_t)e^{-\alpha_t} + \epsilon_t e^{\alpha_t} = 0 \;\Rightarrow\; e^{2\alpha_t} = \frac{1 - \epsilon_t}{\epsilon_t} \;\Rightarrow\; \alpha_t = \frac12 \log\frac{1 - \epsilon_t}{\epsilon_t}$$ (Second derivative \((1-\epsilon)e^{-\alpha} + \epsilon e^{\alpha} \gt 0\): a minimum ✓.) Interpreting: \(\alpha_t\) is half the log-odds of the learner's accuracy — a more accurate \(h_t\) gets a louder vote, and \(\epsilon_t = \tfrac12\) (coin-flip learner) gets \(\alpha_t = 0\): ignored.`,
          String.raw`**Completing the bound (as given).** Substituting: \(Z_t = 2\sqrt{\epsilon_t(1-\epsilon_t)} \le \sqrt{1 - 4\gamma^2} \le e^{-2\gamma^2}\), so $$\mathrm{error}(H_T) \le \prod_{t=1}^T e^{-2\gamma^2} = e^{-2\gamma^2 T}$$ — exponential in the number of rounds.`,
          String.raw`**Optional (error of \(h_t\) under the new weights).** $$\sum_i w_{t+1,i}\,\mathbb{1}[\text{mistake}] = \frac{\epsilon_t\, e^{\alpha_t}}{(1-\epsilon_t)e^{-\alpha_t} + \epsilon_t e^{\alpha_t}} = \frac{\sqrt{\epsilon_t(1-\epsilon_t)}}{2\sqrt{\epsilon_t(1-\epsilon_t)}} = \frac12$$ — the re-weighting forces the next learner to face exactly a coin-flip on its own mistakes: no weak learner gets reused as-is.`
        ],
        fin: String.raw`0/1 ≤ exponential loss; \(w_{T+1,i} = e^{-y_iH_T}/\prod Z_t\); \(Z_t = (1-\epsilon_t)e^{-\alpha_t} + \epsilon_te^{\alpha_t}\); optimal \(\alpha_t = \tfrac12\log\frac{1-\epsilon_t}{\epsilon_t}\) ⇒ \(\mathrm{error}(H_T) \le e^{-2\gamma^2T}\).`
      },
      {
        n: 'P2', pts: 15, topic: 'PCA: equivalence, second component, FVE', chapter: 'ch10', diff: 'hard',
        q: String.raw`Centered data, \(S = \frac{1}{n-1}\sum_i \boldsymbol{x}_i\boldsymbol{x}_i^\top = V\Lambda V^\top\), \(\lambda_1 \ge \dots \ge \lambda_D\). <b>(2.1)</b> Show \(\|\boldsymbol{x}_i - (\boldsymbol{q}^\top\boldsymbol{x}_i)\boldsymbol{q}\|^2 = \|\boldsymbol{x}_i\|^2 - (\boldsymbol{q}^\top\boldsymbol{x}_i)^2\) and conclude min-reconstruction ⟺ max-variance. <b>(2.2)</b> Generalize to \(U\) with \(UU^\top = I_d\). <b>(2.3)</b> Show the second PC \(u_2 = v_2\) with variance \(\lambda_2\). <b>(2.4)</b> Show total reconstruction error \(= (n-1)\sum_{j \gt d}\lambda_j\) and how FVE chooses \(d\).`,
        s: [
          String.raw`**(2.1)** Expand, using \(\|\boldsymbol{q}\| = 1\): $$\|\boldsymbol{x}_i - (\boldsymbol{q}^\top\boldsymbol{x}_i)\boldsymbol{q}\|^2 = \|\boldsymbol{x}_i\|^2 - 2(\boldsymbol{q}^\top\boldsymbol{x}_i)^2 + (\boldsymbol{q}^\top\boldsymbol{x}_i)^2\|\boldsymbol{q}\|^2 = \|\boldsymbol{x}_i\|^2 - (\boldsymbol{q}^\top\boldsymbol{x}_i)^2$$ Average over \(i\) and compare with the sample variance \(\frac{1}{n-1}\sum_i (\boldsymbol{q}^\top\boldsymbol{x}_i)^2\): the two objectives differ by the constant \(\|\boldsymbol{x}_i\|^2\) sum — minimizing error and maximizing variance are the same argmax. \(\blacksquare\)`,
          String.raw`**(2.2)** Let \(\boldsymbol{r} = \boldsymbol{x}_i - U^\top U\boldsymbol{x}_i\). Then \(U\boldsymbol{r} = U\boldsymbol{x}_i - (UU^\top)U\boldsymbol{x}_i = U\boldsymbol{x}_i - U\boldsymbol{x}_i = \boldsymbol{0}\): the residual is orthogonal to every row of \(U\), hence to \(U^\top U\boldsymbol{x}_i\). Pythagoras, plus \(\|U^\top U\boldsymbol{x}_i\|^2 = \boldsymbol{x}_i^\top U^\top (UU^\top) U\boldsymbol{x}_i = \|U\boldsymbol{x}_i\|^2\): $$\|\boldsymbol{x}_i - U^\top U\boldsymbol{x}_i\|^2 = \|\boldsymbol{x}_i\|^2 - \|U\boldsymbol{x}_i\|^2. \;\blacksquare$$ Same conclusion: minimizing reconstruction ⟺ maximizing captured variance \(\sum_i \|U\boldsymbol{x}_i\|^2\).`,
          String.raw`**(2.3)** Lagrangian with two constraints: $$\mathcal{L} = \boldsymbol{q}^\top S\boldsymbol{q} - \lambda(\boldsymbol{q}^\top\boldsymbol{q} - 1) - \nu\, \boldsymbol{q}^\top u_1$$ Stationarity: \(2S\boldsymbol{q} - 2\lambda\boldsymbol{q} - \nu u_1 = 0\). Left-multiply by \(u_1^\top\) (note \(u_1^\top\boldsymbol{q} = 0\), \(u_1^\top u_1 = 1\)): \(\nu = 2u_1^\top S\boldsymbol{q} = 2\lambda_1\, u_1^\top\boldsymbol{q} = 0\). So \(S\boldsymbol{q} = \lambda\boldsymbol{q}\): the optimum is a unit eigenvector <em>orthogonal to \(v_1\)</em>, i.e. in \(\mathrm{span}\{v_2, \dots, v_D\}\), and on that space the largest achievable eigenvalue is \(\lambda_2\), attained at \(\boldsymbol{q} = \pm v_2\): $$u_2 = v_2, \qquad u_2^\top S u_2 = \lambda_2. \;\blacksquare$$ (Iterating gives all principal components — proof by induction.)`,
          String.raw`**(2.4)** With \(U\) = top \(d\) eigenvectors as rows, the residual of \(\boldsymbol{x}_i\) is its component along \(v_{d+1}, \dots, v_D\): $$\sum_{i=1}^n \|\boldsymbol{x}_i - U^\top U\boldsymbol{x}_i\|^2 = \sum_{j \gt d} \sum_{i=1}^n (\boldsymbol{v}_j^\top\boldsymbol{x}_i)^2 = \sum_{j \gt d} (n-1)\,\boldsymbol{v}_j^\top S \boldsymbol{v}_j = (n-1)\sum_{j \gt d} \lambda_j$$ using \((n-1)\lambda_j = \sum_i (\boldsymbol{v}_j^\top\boldsymbol{x}_i)^2\) and \(\sum_i \|\boldsymbol{x}_i\|^2 = (n-1)\operatorname{tr}(S) = (n-1)\sum_j \lambda_j\). \(\blacksquare\) So the <b>fraction of variance explained</b> \(\frac{\sum_{j\le d}\lambda_j}{\sum_j \lambda_j} = 1 - \frac{\text{error}}{(n-1)\operatorname{tr}S}\): in practice pick the smallest \(d\) reaching a threshold (90–99%) or the elbow of the scree plot.`
        ],
        fin: String.raw`Pythagoras ⟹ min-error ⟺ max-variance (1-D and \(d\)-D); second PC = \(v_2\) by Lagrange with orthogonality; total error \((n-1)\sum_{j>d}\lambda_j\); FVE = kept-variance fraction.`
      },
      {
        n: 'P3', pts: 14, topic: 'k-means: objective, optimal center, random centering, EM limit', chapter: 'ch11', diff: 'hard',
        q: String.raw`\(Z(C_1, \dots, C_k) = \sum_l \frac{1}{2|C_l|}\sum_{i,j \in C_l}\|\boldsymbol{x}_i - \boldsymbol{x}_j\|^2\). <b>(3.1)</b> Show \(Z = \sum_l \sum_{i \in C_l}\|\boldsymbol{x}_i - \boldsymbol{\mu}_l\|^2\). <b>(3.2)</b> Show \(Z(C, \boldsymbol{\mu}) = \min_{\boldsymbol{z}} Z(C, \boldsymbol{z})\). <b>(3.3)</b> For \(\boldsymbol{z}\) drawn uniformly from \(C\), show \(\mathbb{E}[Z(C, \boldsymbol{z})] = 2Z(C, \boldsymbol{\mu})\). <b>(3.4)</b> Show EM for GMMs reduces to k-means as \(\Sigma_l = \sigma^2 I \to 0\).`,
        s: [
          String.raw`**(3.1)** For one cluster, write \(\boldsymbol{x}_i = \boldsymbol{\mu} + \tilde{\boldsymbol{x}}_i\) with \(\sum_{i \in C}\tilde{\boldsymbol{x}}_i = 0\). Then $$\sum_{i,j \in C}\|\boldsymbol{x}_i - \boldsymbol{x}_j\|^2 = \sum_{i,j}\|\tilde{\boldsymbol{x}}_i - \tilde{\boldsymbol{x}}_j\|^2 = \sum_{i,j}\big(\|\tilde{\boldsymbol{x}}_i\|^2 + \|\tilde{\boldsymbol{x}}_j\|^2 - 2\tilde{\boldsymbol{x}}_i^\top\tilde{\boldsymbol{x}}_j\big)$$ $$= 2|C|\sum_i \|\tilde{\boldsymbol{x}}_i\|^2 - 2\Big\|\sum_i \tilde{\boldsymbol{x}}_i\Big\|^2 = 2|C|\sum_{i \in C}\|\boldsymbol{x}_i - \boldsymbol{\mu}\|^2$$ Divide by \(2|C|\) and sum over clusters: $$Z = \sum_l \sum_{i \in C_l}\|\boldsymbol{x}_i - \boldsymbol{\mu}_l\|^2. \;\blacksquare$$`,
          String.raw`**(3.2)** Decompose around the centroid: $$Z(C, \boldsymbol{z}) = \sum_i \|\boldsymbol{x}_i - \boldsymbol{\mu} + \boldsymbol{\mu} - \boldsymbol{z}\|^2 = Z(C, \boldsymbol{\mu}) + |C|\,\|\boldsymbol{\mu} - \boldsymbol{z}\|^2 + 2(\boldsymbol{\mu} - \boldsymbol{z})^\top\underbrace{\textstyle\sum_i(\boldsymbol{x}_i - \boldsymbol{\mu})}_{=0}$$ $$= Z(C, \boldsymbol{\mu}) + |C|\,\|\boldsymbol{\mu} - \boldsymbol{z}\|^2 \;\ge\; Z(C, \boldsymbol{\mu})$$ with equality iff \(\boldsymbol{z} = \boldsymbol{\mu}\). \(\blacksquare\)`,
          String.raw`**(3.3)** With \(\boldsymbol{z} = \boldsymbol{x}_j\) w.p. \(1/|C|\): $$\mathbb{E}_{\boldsymbol{z} \sim \rho}[Z(C, \boldsymbol{z})] = \frac{1}{|C|}\sum_j \sum_{i \in C}\|\boldsymbol{x}_i - \boldsymbol{x}_j\|^2 = \frac{1}{|C|}\sum_{i,j \in C}\|\boldsymbol{x}_i - \boldsymbol{x}_j\|^2 = 2\,Z(C, \boldsymbol{\mu})$$ by (3.1) read backwards. \(\blacksquare\) Random centering costs only a factor 2 — the idea k-means++ exploits by seeding at random <em>but far</em>.`,
          String.raw`**(3.4) EM → k-means.** With shared spherical covariances, the E-step responsibility is $$p_{ij} = \frac{\pi_j \exp\!\big(-\|\boldsymbol{x}_i - \boldsymbol{\mu}_j\|^2 / 2\sigma^2\big)}{\sum_l \pi_l \exp\!\big(-\|\boldsymbol{x}_i - \boldsymbol{\mu}_l\|^2 / 2\sigma^2\big)}$$ As \(\sigma \to 0\), let \(j^\star = \arg\min_j \|\boldsymbol{x}_i - \boldsymbol{\mu}_j\|\): its exponent dominates every other by \(e^{-c/\sigma^2}\) with \(c \gt 0\), so \(p_{ij} \to 1\) for \(j^\star\) and \(0\) otherwise — <b>hard nearest-centroid assignment</b>. The M-step then gives \(\boldsymbol{\mu}_{j^\star} =\) mean of the assigned points and \(\pi_{j^\star} =\) fraction assigned: exactly Lloyd's assignment + update. Objective view: the log-likelihood $$\sum_i \log\sum_j \pi_j \mathcal{N}(\boldsymbol{x}_i \mid \boldsymbol{\mu}_j, \sigma^2 I) \;\sim\; -\frac{1}{2\sigma^2}\sum_i \min_j \|\boldsymbol{x}_i - \boldsymbol{\mu}_j\|^2 + O(\log\sigma^2)$$ so maximizing likelihood ⟺ minimizing the k-means SSE as \(\sigma \to 0\). \(\blacksquare\)`,
          String.raw`**Optional (optimal 1-D k-means, sketch).** Sort the points; optimal clusters are contiguous intervals. DP over split positions: \(D[m, k] = \min_{j \lt m} D[j, k-1] + \mathrm{cost}(j{+}1..m)\) with interval cost from prefix sums in \(O(1)\): \(O(kn^2)\) total.`
        ],
        fin: String.raw`\(\sum_{i,j}\|\boldsymbol{x}_i - \boldsymbol{x}_j\|^2 = 2|C|\sum_i\|\boldsymbol{x}_i - \mu\|^2\); centroid is optimal (\(+|C|\|\mu - z\|^2\) excess); random center costs ×2; \(\sigma \to 0\) turns soft responsibilities into hard assignments = Lloyd's.`
      }
    ]
  });
})();
