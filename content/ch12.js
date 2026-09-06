/* Chapter 12 — Classification with Support Vector Machines */
(function () {
  MML.chapters.push({
    id: 'ch12', num: 12, icon: '⚔️',
    title: 'Classification with Support Vector Machines',
    tagline: 'Margins, duality, and the kernel trick — the book\u2019s finale, where optimization theory becomes a classifier.',
    why: String.raw`The SVM is the course\u2019s graduation exam: it uses hyperplanes and distances (Ch 2–3), constrained optimization, duality and KKT (Ch 7), and inner products (Ch 3) — and it introduces the <b>kernel trick</b>, one of the most beautiful ideas in ML: run a linear algorithm in an infinite-dimensional feature space while only ever computing inner products between data points. SVMs also provide the cleanest bridge between "geometry" and "loss functions": their objective <em>is</em> regularized hinge loss. Every concept you have learned appears on this one stage.`,
    goals: [
      String.raw`Formulate the maximum-margin problem and solve tiny instances by hand.`,
      String.raw`Derive the dual, identify support vectors via complementary slackness.`,
      String.raw`Compute polynomial and RBF kernels; explain why the kernel trick works.`,
      String.raw`Connect soft-margin SVM to regularized hinge-loss ERM.`
    ],
    widget: null,
    concepts: [
      {
        id: 'c1',
        title: 'The maximum-margin classifier',
        subtitle: 'the best fence is the widest one',
        intuition: String.raw`Many hyperplanes separate two clusters of points perfectly. Which should a classifier prefer? The SVM\u2019s answer: the one whose <b>street is widest</b> — the separating hyperplane that maximizes the distance to the nearest data points on either side. Intuition: new data will resemble the training data, so a wide margin leaves the most room for the unseen to fall on the correct side. The nearest points — the ones "touching the curb" — are the <b>support vectors</b>: they alone determine the boundary; all other points could be deleted without moving it.`,
        math: [
          { h: 'Hyperplane and distance', t: String.raw`Decision surface: \(\boldsymbol{w}^\top\boldsymbol{x} + b = 0\); predict \(\operatorname{sign}(\boldsymbol{w}^\top\boldsymbol{x} + b)\). Distance of point \(\boldsymbol{x}\) to the hyperplane (Ch 2): $$\frac{|\boldsymbol{w}^\top\boldsymbol{x} + b|}{\|\boldsymbol{w}\|}$$ Margin \(= 2 \times\) distance to nearest point.` },
          { h: 'The primal problem (hard margin)', t: String.raw`Scale convention: for the support vectors, \(y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) = 1\). Then: $$\min_{\boldsymbol{w}, b}\; \tfrac12\|\boldsymbol{w}\|^2 \quad \text{s.t.} \quad y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) \ge 1 \quad \forall i$$ Maximizing the margin \(2/\|\boldsymbol{w}\|\) = minimizing \(\|\boldsymbol{w}\|^2\) — a convex QP with linear constraints (Ch 7 machinery applies).` }
        ],
        ml: String.raw`Margin maximization is the classical link between geometry and generalization: margin bounds (learning theory) show that large margins imply good test error. The same "maximize the distance to the nearest violation" philosophy returns in adversarial robustness (adversarial training maximizes robust margins).`,
        byhand: {
          problem: String.raw`1-D data: \(x = -1\) with label \(-1\), \(x = +1\) with label \(+1\). Find the maximum-margin classifier \(wx + b\) by solving the primal, and compute the margin.`,
          steps: [
            { t: 'Write the constraints', d: String.raw`Label \(-1\), point \(-1\): \(-1\cdot(w(-1) + b) \ge 1 \Rightarrow w - b \ge 1\). Label \(+1\), point \(+1\): \(w + b \ge 1\).` },
            { t: 'Minimize ‖w‖²/2', d: String.raw`Adding the constraints: \(2w \ge 2 \Rightarrow w \ge 1\). The objective \(w^2/2\) is increasing in \(w \gt 0\), so \(w^\star = 1\).` },
            { t: 'Find b from the active constraints', d: String.raw`At the optimum both constraints are tight (both points are support vectors): \(1 - b = 1\) and \(1 + b = 1\) ⟹ \(b = 0\).` },
            { t: 'Margin', d: String.raw`$$\text{margin} = \frac{2}{\|w\|} = \frac{2}{1} = 2$$ The street spans \(x \in (-1, 1)\); boundary at \(x = 0\). Symmetric data ⟹ symmetric fence — sanity confirmed.` }
          ],
          answer: String.raw`\(w^\star = 1\), \(b^\star = 0\), margin \(2\). Both points are support vectors (both constraints active).`
        }
      },
      {
        id: 'c2',
        title: 'The dual problem and support vectors',
        subtitle: 'where the data becomes inner products',
        intuition: String.raw`Apply Chapter 7\u2019s Lagrange duality to the margin problem and something remarkable happens: the dual depends on the data <b>only through inner products</b> \(\boldsymbol{x}_i^\top\boldsymbol{x}_j\). The optimal \(\boldsymbol{w}\) is a combination of data points, and complementary slackness (KKT) says which ones: only points with \(\alpha_i \gt 0\) — the support vectors — contribute. Everyone else gets \(\alpha_i = 0\) and is irrelevant. This "data only enters via dot products" structure looks like a technicality until the next card, where it becomes a superpower.`,
        math: [
          { h: 'From primal to dual', t: String.raw`$$\mathcal{L}(\boldsymbol{w}, b, \boldsymbol{\alpha}) = \tfrac12\|\boldsymbol{w}\|^2 - \sum_i \alpha_i\big[y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) - 1\big], \qquad \alpha_i \ge 0$$ Stationarity: \(\boldsymbol{w} = \sum_i \alpha_i y_i \boldsymbol{x}_i\) and \(\sum_i \alpha_i y_i = 0\). Substituting back: $$\max_{\boldsymbol{\alpha}}\; \sum_i \alpha_i - \tfrac12\sum_{i,j}\alpha_i\alpha_j y_i y_j\, \boldsymbol{x}_i^\top\boldsymbol{x}_j \quad \text{s.t.} \quad \sum_i \alpha_i y_i = 0, \; \alpha_i \ge 0$$` },
          { h: 'KKT ⇒ support vectors', t: String.raw`Complementary slackness: \(\alpha_i\big[y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) - 1\big] = 0\). Either \(\alpha_i = 0\) (point irrelevant) or the point sits exactly on the margin (\(y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) = 1\)). The solution is <b>sparse in the data</b>: typically few support vectors carry the whole decision function $$f(\boldsymbol{x}) = \sum_i \alpha_i y_i\, \boldsymbol{x}_i^\top\boldsymbol{x} + b$$` }
        ],
        ml: String.raw`Sparsity makes SVMs efficient at prediction (few terms) and interpretable (the "exemplars" are visible). The dual formulation is what makes kernels possible, what makes the problem solvable by SMO-style decomposition methods, and what connects SVMs to representer theorems in kernel theory. Modern attention networks share the flavor of "solutions as combinations of data points".`,
        byhand: {
          problem: String.raw`Solve the dual for the 2-point problem \(\boldsymbol{x}_1 = (0,0)^\top\) (label \(-1\)), \(\boldsymbol{x}_2 = (1,1)^\top\) (label \(+1\)), and recover the primal solution.`,
          steps: [
            { t: 'Dual objective for 2 points', d: String.raw`$$D(\alpha_1, \alpha_2) = \alpha_1 + \alpha_2 - \tfrac12\big[\alpha_1^2 \cdot 0 - 2\alpha_1\alpha_2 \cdot 0 + \alpha_2^2 \cdot \underbrace{(1{+}1)}_{\|\boldsymbol{x}_2\|^2 = 2}\big]$$ (inner products: \(\boldsymbol{x}_1^\top\boldsymbol{x}_1 = \boldsymbol{x}_1^\top\boldsymbol{x}_2 = 0\), \(\boldsymbol{x}_2^\top\boldsymbol{x}_2 = 2\).) Constraint: \(-\alpha_1 + \alpha_2 = 0 \Rightarrow \alpha_1 = \alpha_2 = \alpha\).` },
            { t: 'Reduce and maximize', d: String.raw`$$D = 2\alpha - \tfrac12 \cdot 2\alpha^2 = 2\alpha - \alpha^2$$ Unconstrained max: \(D\u0027 = 2 - 2\alpha = 0 \Rightarrow \alpha^\star = 1\), \(D = 1\). (Concave parabola ⟹ global max ✓.)` },
            { t: 'Recover w and b', d: String.raw`$$\boldsymbol{w} = \alpha_1 y_1\boldsymbol{x}_1 + \alpha_2 y_2\boldsymbol{x}_2 = 0 + 1\cdot(1,1)^\top = (1,1)^\top$$ \(b\) from an active support vector\u2019s equality: \(y_2(\boldsymbol{w}^\top\boldsymbol{x}_2 + b) = 1 \Rightarrow 2 + b = 1 \Rightarrow b = -1\).` },
            { t: 'Verify against the primal story', d: String.raw`Hyperplane \(x_1 + x_2 = 1\); both points at distance \(\frac{1}{\sqrt2}\) from it; margin \(= \frac{2}{\|\boldsymbol{w}\|} = \sqrt2\); both \(\alpha_i = 1 \gt 0\) ⟹ both are support vectors ✓. Matches Chapter 2\u2019s affine-distance card exactly.` }
          ],
          answer: String.raw`\(\boldsymbol{\alpha}^\star = (1, 1)\), \(\boldsymbol{w}^\star = (1,1)^\top\), \(b^\star = -1\): "street" \(x_1 + x_2 = 1\) with margin \(\sqrt2\). The dual solved it using only dot products — foreshadowing everything.`
        }
      },
      {
        id: 'c3',
        title: 'Kernels and the kernel trick',
        subtitle: 'linear methods in infinite-dimensional spaces',
        intuition: String.raw`Look again at the dual: data appears <b>only</b> as \(\boldsymbol{x}_i^\top\boldsymbol{x}_j\). Suppose we first map every point into a richer feature space \(\phi(\boldsymbol{x})\) (adding features like \(x_1^2, x_1x_2, \dots\)) and run SVM there — the dual would need \(\phi(\boldsymbol{x}_i)^\top\phi(\boldsymbol{x}_j)\). The trick: for many useful \(\phi\), that inner product equals a cheap function of the <b>original</b> points — a <b>kernel</b> \(k(\boldsymbol{x}_i, \boldsymbol{x}_j)\). So we get the power of a huge (even infinite-dimensional) feature space while paying only for pairwise similarities in the original space. Non-linear classification, no explicit features, no curse of dimensionality in the computation.`,
        math: [
          { h: 'Valid kernels', t: String.raw`$$k(\boldsymbol{x}, \boldsymbol{z}) = \langle \phi(\boldsymbol{x}), \phi(\boldsymbol{z})\rangle$$ Examples: polynomial \(k = (\boldsymbol{x}^\top\boldsymbol{z} + c)^p\); RBF/Gaussian \(k = \exp\big(-\|\boldsymbol{x} - \boldsymbol{z}\|^2 / (2\sigma^2)\big)\) — corresponds to an <b>infinite-dimensional</b> \(\phi\). Mercer\u2019s condition: \(k\) is a valid kernel iff the Gram matrix \([k(\boldsymbol{x}_i, \boldsymbol{x}_j)]_{ij}\) is positive semidefinite (Ch 4\u2019s PSD!).` },
          { h: 'Why the trick is legitimate', t: String.raw`Replace every \(\boldsymbol{x}_i^\top\boldsymbol{x}_j\) in the dual by \(k(\boldsymbol{x}_i, \boldsymbol{x}_j)\): since the dual never needs \(\phi\) itself — only inner products — the algorithm runs unchanged in feature space. The decision function becomes $$f(\boldsymbol{x}) = \sum_i \alpha_i y_i\, k(\boldsymbol{x}_i, \boldsymbol{x}) + b$$ evaluated via kernel evaluations against support vectors alone.` }
        ],
        ml: String.raw`Kernels linearize the nonlinear: RBF-SVMs, kernel PCA, kernel \(k\)-means, Gaussian processes (a kernel defines the prior covariance over functions), and SVMs\u2019 spiritual cousins in representer-theorem-based methods. Deep kernels (learned \(\phi\) + kernel head) are a modern research direction; and the attention mechanism is again a kernel-flavored similarity. Kernel choice = prior knowledge, made algebraic.`,
        byhand: {
          problem: String.raw`Verify the degree-2 polynomial kernel identity for \(\boldsymbol{x} = (1, 2)^\top\), \(\boldsymbol{z} = (3, 4)^\top\): show \(k(\boldsymbol{x}, \boldsymbol{z}) = (\boldsymbol{x}^\top\boldsymbol{z})^2 = \phi(\boldsymbol{x})^\top\phi(\boldsymbol{z})\) with \(\phi(\boldsymbol{x}) = (x_1^2, \sqrt2 x_1x_2, x_2^2)^\top\).`,
          steps: [
            { t: 'Cheap route (the kernel)', d: String.raw`$$\boldsymbol{x}^\top\boldsymbol{z} = 1\cdot 3 + 2 \cdot 4 = 11 \;\Rightarrow\; k = 11^2 = 121$$` },
            { t: 'Expensive route (explicit features)', d: String.raw`$$\phi(\boldsymbol{x}) = (1,\; 2\sqrt2,\; 4)^\top, \qquad \phi(\boldsymbol{z}) = (9,\; 12\sqrt2,\; 16)^\top$$ $$\phi(\boldsymbol{x})^\top\phi(\boldsymbol{z}) = 9 + (2\sqrt2)(12\sqrt2) + 64 = 9 + 48 + 64 = 121 \;\checkmark$$` },
            { t: 'What was bought', d: String.raw`The feature space has 3 dimensions here — but for \(d\)-dim inputs, degree-2 expansion has \(\binom{d+1}{2} + d\) features, and the RBF kernel has <em>infinitely</em> many. The kernel computes them all with one dot product and one square (or one exponential). This is why the dual (inner products only) and not the primal (explicit \(\boldsymbol{w}\)) is the SVM\u2019s native form.` }
          ],
          answer: String.raw`Both routes give \(121\). The kernel delivers the feature-space inner product for the price of a dot product and a square — and for RBF kernels, the feature space is infinite.`
        }
      },
      {
        id: 'c4',
        title: 'Soft margins: slack, hinge loss, and the modern view',
        subtitle: 'when data is not separable — and why SVM is just regularized ERM',
        intuition: String.raw`Real data overlaps; no hyperplane can separate it perfectly. The <b>soft-margin</b> SVM allows violations, but charges for each: point \(i\) may fall inside the street or even on the wrong side, paying a slack penalty \(\xi_i \ge 0\) in the objective. The result trades margin width against violations — a capacity control exactly like Chapter 8\u2019s bias–variance story, with \(C\) (or \(\lambda = 1/C\)) as the dial. And rewriting the whole thing reveals the punchline: SVM = <b>minimize hinge loss + \(\ell_2\) regularization</b> — structurally identical to ridge regression, logistic regression, and neural network training. One template: regularized empirical risk minimization.`,
        math: [
          { h: 'Soft-margin primal', t: String.raw`$$\min_{\boldsymbol{w}, b, \boldsymbol{\xi}}\; \tfrac12\|\boldsymbol{w}\|^2 + C\sum_i \xi_i \quad \text{s.t.} \quad y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0$$ \(\xi_i = 0\): outside the street; \(0 \lt \xi_i \le 1\): inside the street but correct side; \(\xi_i \gt 1\): misclassified. \(C\): cost of violations — large \(C\) = narrow street, low tolerance (high variance); small \(C\) = wide street (high bias).` },
          { h: 'The unconstrained rewrite', t: String.raw`For fixed \(\|\boldsymbol{w}\|\), the optimal slack is \(\xi_i = \max\big(0,\; 1 - y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b)\big)\) — the <b>hinge loss</b>. Substituting: $$\min_{\boldsymbol{w}, b}\; \underbrace{\tfrac12\|\boldsymbol{w}\|^2}_{\text{regularizer}} + \;C\sum_i \underbrace{\max\big(0, 1 - y_i f(\boldsymbol{x}_i)\big)}_{\text{hinge loss}}$$ Same skeleton as ridge (Ch 9: squared loss + \(\ell_2\)) and logistic regression (log-loss + \(\ell_2\)).` }
        ],
        ml: String.raw`This card is where "classical ML" and "deep learning" become one subject: every modern model is some loss + some regularizer, optimized by some Chapter-7 method. The hinge loss\u2019s flat region (zero gradient for confident correct points) is exactly what makes the SVM solution sparse in support vectors; logistic loss\u2019s smooth tail trades that sparsity for calibrated probabilities. Choosing a loss = choosing which mistakes to forgive.`,
        byhand: {
          problem: String.raw`With \(f(\boldsymbol{x}) = \boldsymbol{w}^\top\boldsymbol{x} + b\), \(\boldsymbol{w} = (1, 1)^\top\), \(b = -1\), evaluate the hinge loss \(\max(0, 1 - y f(\boldsymbol{x}))\) for: (a) \(\boldsymbol{x}_1 = (1, 1)^\top, y = +1\); (b) \(\boldsymbol{x}_2 = (0, 0)^\top, y = -1\); (c) \(\boldsymbol{x}_3 = (2, 2)^\top, y = +1\); (d) \(\boldsymbol{x}_4 = (0.5, 0)^\top, y = +1\).`,
          steps: [
            { t: '(a) A support vector', d: String.raw`\(f = 1 + 1 - 1 = 1\); hinge \(= \max(0, 1 - 1) = 0\): exactly on the margin — no penalty, no slack.` },
            { t: '(b) The other class\u2019s support vector', d: String.raw`\(f = -1\); hinge \(= \max(0, 1 - (-1)(-1)) = \max(0, 0) = 0\): also exactly on its margin ✓.` },
            { t: '(c) Deep inside the correct half', d: String.raw`\(f = 2 + 2 - 1 = 3\); hinge \(= \max(0, 1 - 3) = 0\). Confidently correct points contribute <b>nothing</b> — this flatness is why they are not support vectors.` },
            { t: '(d) A violator', d: String.raw`\(f = 0.5 - 1 = -0.5 \lt 0\): misclassified! Hinge \(= 1 - (-0.5) = 1.5\): pays \(1.5\), i.e. \(\xi = 0.5\) beyond the margin plus 1 for crossing the boundary. The hinge charges linearly for how "wrong side of the street" a point is.` }
          ],
          answer: String.raw`Hinges: \(0, 0, 0, 1.5\). Only margin-touching or violating points matter — the algebraic reason the SVM solution is supported by few points.`
        }
      }
    ],
    cheatsheet: [
      { n: 'Hard-margin primal', t: String.raw`$$\min \tfrac12\|\boldsymbol{w}\|^2 \;\; \text{s.t.} \;\; y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) \ge 1; \qquad \text{margin} = \frac{2}{\|\boldsymbol{w}\|}$$` },
      { n: 'Dual', t: String.raw`$$\max_{\boldsymbol{\alpha}} \sum_i \alpha_i - \tfrac12\sum_{ij}\alpha_i\alpha_j y_iy_j\, \boldsymbol{x}_i^\top\boldsymbol{x}_j, \quad \textstyle\sum_i\alpha_iy_i = 0, \; \alpha_i \ge 0$$` },
      { n: 'Decision function', t: String.raw`$$f(\boldsymbol{x}) = \sum_i \alpha_i y_i\, k(\boldsymbol{x}_i, \boldsymbol{x}) + b \quad (\alpha_i \ne 0 \Rightarrow \text{support vector})$$` },
      { n: 'Kernels', t: String.raw`$$k_{\text{poly}} = (\boldsymbol{x}^\top\boldsymbol{z} + c)^p, \qquad k_{\text{RBF}} = \exp(-\|\boldsymbol{x}-\boldsymbol{z}\|^2/2\sigma^2)$$` },
      { n: 'Soft margin = hinge + ℓ2', t: String.raw`$$\min_{\boldsymbol{w},b}\; \tfrac12\|\boldsymbol{w}\|^2 + C\sum_i \max(0,\, 1 - y_if(\boldsymbol{x}_i))$$` }
    ],
    practice: [
      {
        q: String.raw`For \(\boldsymbol{w} = (2, 2)^\top\), \(b = -2\): (a) what is the margin width? (b) is \(\boldsymbol{x} = (1, 0)^\top, y = +1\) a support vector, inside the street, or outside?`,
        diff: 'easy',
        s: [
          String.raw`Margin \(= 2/\|\boldsymbol{w}\| = 2/\sqrt8 = \tfrac{1}{\sqrt2} \approx 0.707\).`,
          String.raw`\(f(\boldsymbol{x}) = 2 - 2 = 0\): on the decision boundary itself, misclassified side-neutral. Hinge \(= \max(0, 1 - 0) = 1\): deep violator (\(\xi = 1\)).`
        ],
        fin: String.raw`Margin \(\approx 0.707\); the point sits on the hyperplane — a full-margin violator (hinge 1).`
      },
      {
        q: String.raw`Compute the RBF kernel \(k(\boldsymbol{x}, \boldsymbol{z}) = \exp(-\|\boldsymbol{x}-\boldsymbol{z}\|^2/2\sigma^2)\) for \(\boldsymbol{x} = (0,0)^\top\), \(\boldsymbol{z} = (1,1)^\top\) with (a) \(\sigma = 1\); (b) \(\sigma = 0.5\). Interpret the effect of shrinking \(\sigma\).`,
        diff: 'easy',
        s: [
          String.raw`\(\|\boldsymbol{x} - \boldsymbol{z}\|^2 = 2\). (a) \(k = e^{-1} \approx 0.368\).`,
          String.raw`(b) \(k = e^{-2/0.5} = e^{-4} \approx 0.018\).`,
          String.raw`Smaller \(\sigma\) ⟹ sharper similarity kernel ⟹ each point influences only its tight neighborhood ⟹ wigglier decision boundaries (and more support vectors).`
        ],
        fin: String.raw`\(e^{-1} \approx 0.368\) vs \(e^{-4} \approx 0.018\). \(\sigma\) is the RBF\u2019s "locality" dial — the kernel analogue of model capacity.`
      },
      {
        q: String.raw`Two classes on a line: negatives \(\{-2, -1\}\), positives \(\{1, 2\}\). Guess the support vectors, then solve for \(w, b\) and the margin.`,
        diff: 'med',
        s: [
          String.raw`The street must squeeze between \(-1\) and \(1\): \(\pm 1\) are the support vectors (the others are outside and, by slackness, get \(\alpha = 0\)).`,
          String.raw`Active constraints: label \(-1\) at \(x = -1\): \(y f = -(w(-1) + b) = w - b = 1\); label \(+1\) at \(x = 1\): \(w + b = 1\).`,
          String.raw`Adding: \(2w = 2 \Rightarrow w = 1\), \(b = 0\). Margin \(= 2/w = 2\): the street is exactly \((-1, 1)\). ✓`
        ],
        fin: String.raw`\(w = 1, b = 0\), margin \(2\), support vectors \(\{-1, +1\}\). Points farther out are geometrically irrelevant — slackness in action.`
      },
      {
        q: String.raw`(Full derivation) Starting from the hard-margin primal, derive the dual objective: (a) write the Lagrangian; (b) impose stationarity in \(\boldsymbol{w}\) and \(b\); (c) substitute back and simplify; (d) state why the resulting problem is nicer for kernels.`,
        diff: 'hard',
        s: [
          String.raw`(a) \(\mathcal{L}(\boldsymbol{w}, b, \boldsymbol{\alpha}) = \tfrac12\|\boldsymbol{w}\|^2 - \sum_i \alpha_i[y_i(\boldsymbol{w}^\top\boldsymbol{x}_i + b) - 1]\), \(\alpha_i \ge 0\).`,
          String.raw`(b) \(\nabla_{\boldsymbol{w}}\mathcal{L} = \boldsymbol{w} - \sum_i \alpha_i y_i \boldsymbol{x}_i = 0 \Rightarrow \boldsymbol{w} = \sum_i \alpha_i y_i \boldsymbol{x}_i\); \(\partial_b\mathcal{L} = -\sum_i \alpha_i y_i = 0\).`,
          String.raw`(c) Substitute: \(\tfrac12\|\boldsymbol{w}\|^2 = \tfrac12\sum_{ij}\alpha_i\alpha_j y_iy_j \boldsymbol{x}_i^\top\boldsymbol{x}_j\), and the constraint terms collapse to \(\sum_i \alpha_i\) (using \(\sum_i \alpha_i y_i = 0\) twice). Dual: $$\max_{\boldsymbol{\alpha} \ge 0,\; \boldsymbol{\alpha}^\top\boldsymbol{y} = 0}\; \sum_i \alpha_i - \tfrac12\sum_{ij}\alpha_i\alpha_jy_iy_j\,\boldsymbol{x}_i^\top\boldsymbol{x}_j$$`,
          String.raw`(d) The data enters <em>only</em> through \(\boldsymbol{x}_i^\top\boldsymbol{x}_j\) — replace with any kernel \(k(\boldsymbol{x}_i, \boldsymbol{x}_j)\) and the problem is a valid SVM in the kernel\u2019s feature space, by Mercer/PSD of the Gram matrix.`
        ],
        fin: String.raw`The dual is the SVM\u2019s native form: convex QP in \(\boldsymbol{\alpha}\), kernel-ready, sparse via KKT. Every research paper on kernel methods assumes you can do this derivation.`
      },
      {
        q: String.raw`Explain in 4–6 sentences why "SVM = regularized ERM" unifies the course: name the loss, the regularizer, the optimization algorithm family, and the probabilistic statement hiding in the construction.`,
        diff: 'med',
        s: [
          String.raw`Loss: hinge loss on the decision values — an empirical risk (Ch 8) that charges linearly for margin violations and not at all for confident correct points.`,
          String.raw`Regularizer: \(\tfrac12\|\boldsymbol{w}\|^2\) — the \(\ell_2\) prior of ridge (Ch 9), equivalent to MAP with a Gaussian prior; maximizing the margin = minimizing the norm.`,
          String.raw`Optimization: a convex QP solved in the dual by Chapter 7\u2019s Lagrange/KKT machinery, with kernels (Ch 3–4 inner products and PSD) supplying the feature space.`,
          String.raw`Probabilistic statement: the margin acts as a confidence; large-margin classifiers have tight generalization bounds, and the RBF-SVM can be read as a Gaussian-process-like model with the kernel as covariance. One classifier, every chapter on stage.`
        ],
        fin: String.raw`Hinge loss + \(\ell_2\) + duality + kernels: the SVM is the course in miniature — and the template (loss + regularizer, optimized) is exactly how deep learning is trained.`
      }
    ]
  });
})();
