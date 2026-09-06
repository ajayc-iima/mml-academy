/* Chapter 7 — Continuous Optimization */
(function () {
  MML.chapters.push({
    id: 'ch7', num: 7, icon: '📉',
    title: 'Continuous Optimization',
    tagline: 'How machines actually learn: descend the loss surface. Gradient descent, learning rates, Lagrange multipliers, and duality.',
    why: String.raw`Chapter 5 gave you the gradient — the compass. This chapter turns it into an <b>algorithm</b> and studies when it works. Gradient descent (and its stochastic twin, SGD) trains essentially every model in existence, and its behavior — convergence, divergence, zig-zag — is completely predictable from the linear algebra of Chapters 2–4. The second half introduces <b>constrained optimization</b>: Lagrange multipliers and duality, the machinery behind support vector machines (Ch 12), regularization theory, and economics. Play with the sandbox below as you read.`,
    goals: [
      String.raw`Predict gradient descent's behavior on quadratics from the eigenvalues of the Hessian.`,
      String.raw`Choose learning rates safely: the \(\eta \lt 2/\lambda_{\max}\) rule.`,
      String.raw`Solve constrained problems with Lagrange multipliers, by hand.`,
      String.raw`Derive the dual of a small optimization problem and state the KKT conditions.`
    ],
    widget: 'gd',
    concepts: [
      {
        id: 'c1',
        title: 'Optimization problems and convexity',
        subtitle: 'the landscape taxonomy',
        intuition: String.raw`An optimization problem is: minimize a function \(f\) over an allowed region. The shape of the landscape decides everything. A <b>convex</b> problem (bowl-shaped objective, flat allowed region — no dents, no bumps) is the dream: any local minimum <em>is</em> the global one, so an algorithm that stops moving has solved the problem. Deep-learning landscapes are wildly non-convex, yet gradient methods still work remarkably well — the high-dimensional landscape is friendlier than a 2-D cartoon suggests. Knowing which regime you are in tells you how much to trust your solution.`,
        math: [
          { h: 'The problem', t: String.raw`$$\min_{\boldsymbol{x} \in \mathbb{R}^n} f(\boldsymbol{x}) \quad \text{s.t.} \quad g_i(\boldsymbol{x}) \le 0, \;\; h_j(\boldsymbol{x}) = 0$$ Feasible set = all points satisfying the constraints. \(\boldsymbol{x}^{\star}\) global min: \(f(\boldsymbol{x}^{\star}) \le f(\boldsymbol{x})\) for all feasible \(\boldsymbol{x}\).` },
          { h: 'Convexity', t: String.raw`A set is convex if the segment between any two of its points stays inside. \(f\) is convex if $$f(\lambda\boldsymbol{x} + (1-\lambda)\boldsymbol{y}) \le \lambda f(\boldsymbol{x}) + (1-\lambda) f(\boldsymbol{y}), \quad \lambda \in [0,1]$$ (chords lie above the graph). Twice differentiable test: \(\nabla^2 f \succeq 0\) everywhere.` },
          { h: 'Why convexity matters', t: String.raw`For convex \(f\): every stationary point is a global min, and \(\nabla f(\boldsymbol{x}) = 0\) is a <b>complete certificate of optimality</b>. For non-convex \(f\): stationary points may be saddles or poor local minima — optimization becomes heuristic in principle.` }
        ],
        ml: String.raw`Linear and logistic regression with convex losses: reliably solvable to global optimality. Deep networks: non-convex, yet SGD finds good solutions — an active research area (loss-landscape geometry, mode connectivity, saddle-point escape). Research directions like "why does SGD generalize?" all start from the definitions on this card.`,
        byhand: {
          problem: String.raw`Show that \(f(x, y) = x^2 + xy + y^2\) is convex, and find all its stationary points.`,
          steps: [
            { t: 'Hessian test', d: String.raw`$$\nabla^2 f = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}, \qquad \lambda = 3,\, 1 \;\gt\; 0 \;\Rightarrow\; \nabla^2 f \succ 0 \;\Rightarrow\; f \text{ strictly convex}$$` },
            { t: 'Stationary points', d: String.raw`$$\nabla f = (2x + y,\; x + 2y)^\top = \boldsymbol{0} \;\Rightarrow\; 2x + y = 0,\; x + 2y = 0$$ Subtract: \(x = y\); substitute: \(3x = 0\).` },
            { t: 'Conclusion', d: String.raw`Only stationary point: \((0,0)\). Strict convexity ⟹ it is the unique global minimum, \(f = 0\). Convexity turned "search" into "solve a linear system".` }
          ],
          answer: String.raw`Convex (Hessian SPD, eigenvalues 3 and 1); unique global minimum at the origin. For convex problems, calculus certifies global optimality.`
        }
      },
      {
        id: 'c2',
        title: 'Gradient descent: the update rule analyzed',
        subtitle: 'learning rates, zig-zag, and the condition number',
        intuition: String.raw`The algorithm is embarrassingly simple: <b>step against the gradient</b>, repeatedly. Its behavior on a quadratic bowl \(f = \tfrac12\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}\) — and every landscape looks quadratic near a minimum — is completely understood: along each eigendirection the error is multiplied by \(|1 - \eta\lambda|\) every step. Small curvature \(\lambda\): slow crawl. Too-large learning rate \(\eta\): overshoot and explode. And when curvatures are very unequal (ill-conditioning), you zig-zag across the valley while crawling along it. This one picture explains learning-rate tuning in deep learning.`,
        math: [
          { h: 'The update and its per-direction factor', t: String.raw`$$\boldsymbol{x}_{t+1} = \boldsymbol{x}_t - \eta\, \nabla f(\boldsymbol{x}_t) \quad\Rightarrow\quad \text{error along eigen-direction } \lambda_i \text{ multiplies by } (1 - \eta\lambda_i) \text{ each step}$$ Convergence iff all factors have \(|1 - \eta\lambda_i| \lt 1\), i.e. $$0 \lt \eta \lt \frac{2}{\lambda_{\max}}$$` },
          { h: 'Convergence rate', t: String.raw`Best uniform rate: \(\eta^\star = \frac{2}{\lambda_{\min} + \lambda_{\max}}\), giving geometric shrinkage with factor $$\rho = \frac{\kappa - 1}{\kappa + 1}, \qquad \kappa = \frac{\lambda_{\max}}{\lambda_{\min}} \;\; (\text{condition number})$$ \(\kappa = 1000\): factor \(\approx 0.998\) — thousands of steps for meaningful progress. That is why ill-conditioning hurts.` },
          { h: 'Where the trouble shows', t: String.raw`Steep direction: \(|1 - \eta\lambda_{\max}|\) near 1 means oscillation (zig-zag across the valley). Flat direction: \(|1 - \eta\lambda_{\min}|\) near 1 means slow crawl along the valley. One learning rate, two incompatible demands.` }
        ],
        ml: String.raw`Learning-rate schedules, warmup, Adam, and second-moment methods are all engineering responses to the analysis here. The \(\eta \lt 2/\lambda_{\max}\) rule is the sharp edge behind "loss diverged, lower the LR". Loss-landscapes papers measure the spectral density of Hessians to predict trainability.`,
        byhand: {
          problem: String.raw`\(f(w) = \tfrac12 (w - 3)^2\), start \(w_0 = 0\). (a) Take three gradient-descent steps with \(\eta = 0.4\). (b) What does the theory say the error factor per step is? (c) Show that \(\eta = 2.2\) diverges.`,
          steps: [
            { t: '(a) Three steps', d: String.raw`Gradient: \(f'(w) = w - 3\). $$w_1 = 0 - 0.4(0 - 3) = 1.2$$ $$w_2 = 1.2 - 0.4(1.2 - 3) = 1.2 + 0.72 = 1.92$$ $$w_3 = 1.92 - 0.4(1.92 - 3) = 1.92 + 0.432 = 2.352$$ Approaching \(3\) smoothly ✓.` },
            { t: '(b) Error factor', d: String.raw`Curvature \(= f'' = 1 = \lambda\): error \(e_t = w_t - 3\) obeys \(e_{t+1} = (1 - \eta) e_t = 0.6\, e_t\). Check: \(e_0 = -3, e_1 = -1.8, e_2 = -1.08, e_3 = -0.648\) — and indeed \(w_3 = 3 - 0.648 = 2.352\) ✓. Geometric convergence.` },
            { t: '(c) η = 2.2 overshoots', d: String.raw`Factor \(|1 - 2.2| = 1.2 \gt 1\): error grows 20% per step while flipping sign. $$w_1 = 6.6,\quad w_2 = 6.6 - 2.2(3.6) = -1.32,\quad w_3 = -1.32 - 2.2(-4.32) = 8.18,\;\dots$$ Oscillating with exploding amplitude: divergence. The stability boundary is \(\eta = 2/\lambda = 2\).` }
          ],
          answer: String.raw`(a) \(1.2, 1.92, 2.352\); (b) factor \(0.6\) per step; (c) \(\eta = 2.2 \gt 2/\lambda_{\max}\) ⟹ oscillating divergence. Learning-rate tuning is eigenvalue arithmetic.`
        }
      },
      {
        id: 'c3',
        title: 'SGD, momentum, and friends',
        subtitle: 'optimizing with noisy, partial information',
        intuition: String.raw`Real datasets are millions of points; computing the full gradient each step is wasteful. <b>Stochastic gradient descent</b> uses a random minibatch: a noisy but unbiased estimate of the true gradient. The noise turns out to be a feature, not a bug — it shakes the optimizer out of sharp, ungeneralizable minima. <b>Momentum</b> adds inertia: keep a running average of past gradients, so oscillating components cancel while consistent progress accumulates — like a heavy ball rolling through the narrow valley that gradient descent keeps bouncing across.`,
        math: [
          { h: 'SGD', t: String.raw`$$\boldsymbol{w}_{t+1} = \boldsymbol{w}_t - \eta_t\, \nabla L_{\mathcal{B}_t}(\boldsymbol{w}_t), \qquad \mathbb{E}_{\mathcal{B}}\big[\nabla L_{\mathcal{B}}\big] = \nabla L$$ Unbiased but noisy: near the minimum the iterate jitters around it with variance set by the minibatch gradient variance; decaying \(\eta_t\) tames it (\(\sum\eta_t = \infty, \sum\eta_t^2 \lt \infty\) for theory-grade convergence).` },
          { h: 'Momentum (heavy ball)', t: String.raw`$$\boldsymbol{v}_{t+1} = \beta\, \boldsymbol{v}_t + \nabla f(\boldsymbol{w}_t), \qquad \boldsymbol{w}_{t+1} = \boldsymbol{w}_t - \eta\, \boldsymbol{v}_{t+1}$$ With \(\beta \approx 0.9\), zig-zag components (alternating signs) average away; steady components add up — effective speedup \(\approx \frac{1}{1 - \beta}\) on consistent gradients.` },
          { h: 'Adam (momentum + adaptive scale)', t: String.raw`Keep running first and second moments of the gradient and divide: $$\boldsymbol{w}_{t+1} = \boldsymbol{w}_t - \eta\, \frac{\hat{\boldsymbol{m}}_t}{\sqrt{\hat{\boldsymbol{v}}_t} + \epsilon}$$ Roughly "momentum + per-coordinate learning rate". The default optimizer of deep learning.` }
        ],
        ml: String.raw`Everything trains with SGD variants. The noise scale — batch size × learning rate — is a tuning knob studied as the "edge of stability". Large-batch vs small-batch generalization debates, learning-rate warmup for transformers, and the linear-scaling rule all trace back to the noisy-quadratic analysis of this card.`,
        byhand: {
          problem: String.raw`In the canyon \(f = \tfrac12(10x^2 + y^2)\) from \((1, 1)\): (a) compute one GD step with \(\eta = 0.1\) and one with \(\eta = 0.19\); (b) explain what momentum (\(\beta = 0.9\)) changes qualitatively.`,
          steps: [
            { t: 'Gradient', d: String.raw`\(\nabla f = (10x, y)^\top\); at \((1,1)\): \((10, 1)^\top\).` },
            { t: '(a) η = 0.1', d: String.raw`\((x,y) \leftarrow (1,1) - 0.1(10,1) = (0, 0.9)\). The steep direction jumped exactly to zero (lucky \(\eta = 1/\lambda_{\max}\)); the flat direction barely moved (factor \(0.9\)).` },
            { t: '(a) η = 0.19', d: String.raw`\((x,y) \leftarrow (1 - 1.9,\; 1 - 0.19) = (-0.9, 0.81)\): the steep coordinate flipped sign — the start of the classic cross-valley zig-zag (stable until \(\eta \lt 0.2\), but wasteful).` },
            { t: '(b) Momentum\u2019s effect', d: String.raw`The zig-zag component alternates sign each step, so the running average \(\boldsymbol{v}\) nearly cancels it; the slow crawl along \(y\) has consistent sign, so it accumulates. Net: damped oscillation + accelerated drift — the ball rolls along the valley instead of bouncing across it.` }
          ],
          answer: String.raw`\(\eta = 0.1\): \((0, 0.9)\); \(\eta = 0.19\): \((-0.9, 0.81)\) — oscillation begins. Momentum averages away the zig-zag and amplifies the consistent progress.`
        }
      },
      {
        id: 'c4',
        title: 'Constrained optimization: Lagrange multipliers',
        subtitle: 'optimizing on a leash',
        intuition: String.raw`How do you minimize a function when you must stay on a surface (say, spend exactly $100)? The <b>Lagrange multiplier</b> trick: at the optimum on the constraint surface, the objective's gradient can have no component <em>along</em> the surface — otherwise you could slide further downhill while staying feasible. So \(\nabla f\) must be a pure multiple of the constraint's normal: \(\nabla f = \lambda \nabla g\). The multiplier \(\lambda\) is not bookkeeping — it is the <b>shadow price</b>: how much the optimum improves per unit of relaxed constraint (the marginal value of one more dollar).`,
        math: [
          { h: 'The Lagrangian and stationarity', t: String.raw`$$\mathcal{L}(\boldsymbol{x}, \lambda) = f(\boldsymbol{x}) + \lambda\, g(\boldsymbol{x}) \qquad \nabla_{\boldsymbol{x}}\mathcal{L} = \boldsymbol{0}, \quad g(\boldsymbol{x}) = 0$$ Solve these simultaneously; the \(\lambda\) solutions are the multipliers.` },
          { h: 'Reading λ', t: String.raw`At the optimum: \(\frac{df^\star}{d(\text{constraint level})} = -\lambda\) — sensitivity of the best value to the budget. \(\lambda = 0\): the constraint is not binding (inactive).` }
        ],
        ml: String.raw`Every regularized training objective "minimize loss subject to model complexity" has a Lagrangian dual form "minimize loss + λ × complexity" — the \(\lambda\) you tune in ridge/LASSO is literally a Lagrange multiplier (Ch 9). SVMs (Ch 12) are built on constrained optimization; constrained policy optimization in RL; constrained resource allocation in systems ML.`,
        byhand: {
          problem: String.raw`Minimize \(f(x, y) = x^2 + y^2\) subject to \(x + y = 4\). Solve with a Lagrange multiplier and interpret \(\lambda\).`,
          steps: [
            { t: 'Lagrangian and conditions', d: String.raw`$$\mathcal{L} = x^2 + y^2 + \lambda(x + y - 4)$$ $$\partial_x: 2x + \lambda = 0, \qquad \partial_y: 2y + \lambda = 0, \qquad x + y = 4$$` },
            { t: 'Solve', d: String.raw`From the first two: \(x = y = -\lambda/2\). Constraint: \(-\lambda = 4 \Rightarrow \lambda = -4\). Hence \(x = y = 2\).` },
            { t: 'Verify geometrically', d: String.raw`The feasible set is a line; \(f\) is distance-squared from the origin; the closest point of the line \(x + y = 4\) to the origin is its foot of perpendicular — \((2, 2)\), distance \(2\sqrt2\), \(f = 8\) ✓. Gradient check: \(\nabla f = (4,4)^\top = -\lambda(1,1)^\top\) with \(\lambda = -4\): objective's gradient is normal to the line ✓.` },
            { t: 'Interpret λ (shadow price)', d: String.raw`Relax to \(x + y = 4 + \varepsilon\): new optimum value \(f^\star = \tfrac{(4+\varepsilon)^2}{2} = 8 + 4\varepsilon + \mathcal{O}(\varepsilon^2)\). So \(\frac{df^\star}{d\varepsilon} = 4 = -\lambda\) — exactly the multiplier. \(\lambda\) prices the constraint.` }
          ],
          answer: String.raw`Minimum at \((2, 2)\) with \(f^\star = 8\), \(\lambda = -4\): relaxing the budget by 1 improves the objective by 4. The constraint surface is where \(\nabla f\) is purely normal.`
        }
      },
      {
        id: 'c5',
        title: 'Duality and the KKT conditions',
        subtitle: 'the view from the other side — and SVM\u2019s secret weapon',
        intuition: String.raw`Every constrained problem (the <b>primal</b>) casts a shadow: the <b>dual</b> problem, built from the Lagrangian, which looks at the same data through the multipliers. Two facts make duality powerful. (1) The dual optimum never beats the primal, and under mild conditions (convexity + Slater) they <b>meet</b> — strong duality: solving either solves both. (2) Sometimes the dual is far easier, or reveals structure the primal hides — in SVMs, the dual is written purely in <b>inner products</b> between data points, which is exactly what makes kernels possible (Ch 12). The KKT conditions are the fixed point that certifies optimality in both views.`,
        math: [
          { h: 'The dual problem', t: String.raw`$$\text{primal: } \min_{\boldsymbol{x}} f(\boldsymbol{x}) \text{ s.t. } g_i(\boldsymbol{x}) \le 0 \quad\Longrightarrow\quad \text{dual: } \max_{\boldsymbol{\lambda} \ge 0}\; \min_{\boldsymbol{x}} \mathcal{L}(\boldsymbol{x}, \boldsymbol{\lambda})$$ Weak duality: dual value \(\le\) primal value, always. Strong duality (convex + Slater): equality, with the same optimizer pair.` },
          { h: 'KKT conditions (necessary; sufficient under convexity)', t: String.raw`$$\text{stationarity: } \nabla_{\boldsymbol{x}}\mathcal{L} = \boldsymbol{0}; \quad \text{primal feas.: } g_i(\boldsymbol{x}) \le 0; \quad \text{dual feas.: } \lambda_i \ge 0; \quad \text{complementary slackness: } \lambda_i\, g_i(\boldsymbol{x}) = 0$$ Slackness says: either the constraint is <b>active</b> (touching, \(g_i = 0\)) or its multiplier is zero (inactive). In SVMs, "active constraints" = <b>support vectors</b> — the data points that matter.` }
        ],
        ml: String.raw`SVM training is dual optimization with KKT-driven support vectors (Ch 12). Regularization paths \(\lambda \mapsto \boldsymbol{w}^\star(\lambda)\) are multiplier readings. Dual methods (SVM, dual PCA interpretations, ADMM) exploit inner-product structure for kernels and distributed optimization. Linear programming duality powers efficient resource allocation in production ML systems.`,
        byhand: {
          problem: String.raw`Consider \(\min\; x^2\) subject to \(x \ge 1\). (a) Solve it by inspection. (b) Write the KKT conditions (careful with the sign convention) and verify the solution satisfies them.`,
          steps: [
            { t: '(a) By inspection', d: String.raw`\(x^2\) is minimized at \(x = 0\), but that is infeasible; the closest feasible point is \(x^\star = 1\), value \(1\). The constraint is <b>active</b>.` },
            { t: '(b) Set up in standard form', d: String.raw`Rewrite the constraint as \(g(x) = 1 - x \le 0\). Lagrangian: $$\mathcal{L}(x, \lambda) = x^2 + \lambda(1 - x), \qquad \lambda \ge 0$$` },
            { t: 'KKT system', d: String.raw`$$\text{stationarity: } 2x - \lambda = 0; \quad g \le 0: \; x \ge 1; \quad \lambda \ge 0; \quad \text{slackness: } \lambda(1 - x) = 0$$` },
            { t: 'Resolve the cases', d: String.raw`If \(\lambda = 0\): stationarity gives \(x = 0\) — infeasible. So \(\lambda \gt 0\) and slackness forces \(x = 1\); then \(2x - \lambda = 0 \Rightarrow \lambda = 2\). Check: \(x^\star = 1\), \(\lambda^\star = 2\) — all four KKT conditions hold, and (convex problem) this certifies the global optimum. Shadow price: relaxing the constraint to \(x \ge 1 - \varepsilon\) lowers the optimum by \(\approx 2\varepsilon\) ✓.` }
          ],
          answer: String.raw`\(x^\star = 1\), \(\lambda^\star = 2\), constraint active. Complementary slackness is the "either touching or unpriced" rule — in Chapter 12 it becomes "support vectors or irrelevant".`
        }
      }
    ],
    cheatsheet: [
      { n: 'GD & stability', t: String.raw`$$\boldsymbol{w} \leftarrow \boldsymbol{w} - \eta\nabla f; \qquad \text{converges iff } 0 \lt \eta \lt \frac{2}{\lambda_{\max}}$$` },
      { n: 'Condition number', t: String.raw`$$\kappa = \frac{\lambda_{\max}}{\lambda_{\min}}, \qquad \rho = \frac{\kappa - 1}{\kappa + 1} \text{ (best GD rate)}$$` },
      { n: 'Lagrange', t: String.raw`$$\mathcal{L}(\boldsymbol{x}, \lambda) = f + \lambda g, \qquad \nabla_{\boldsymbol{x}}\mathcal{L} = \boldsymbol{0}, \quad g = 0; \quad \lambda = \text{shadow price}$$` },
      { n: 'KKT', t: String.raw`$$\nabla_x\mathcal{L} = 0, \quad g \le 0, \quad \lambda \ge 0, \quad \lambda g = 0$$` },
      { n: 'Momentum / Adam', t: String.raw`$$\boldsymbol{v} \leftarrow \beta\boldsymbol{v} + \nabla f,\;\; \boldsymbol{w} \leftarrow \boldsymbol{w} - \eta\boldsymbol{v}; \qquad \text{Adam: } \boldsymbol{w} \leftarrow \boldsymbol{w} - \eta\,\hat{m}/\sqrt{\hat{v}}$$` }
    ],
    practice: [
      {
        q: String.raw`Gradient descent on \(f(x) = x^2\) from \(x_0 = 2\) with \(\eta = 0.25\): compute \(x_1, x_2, x_3\), state the per-step error factor, and how many steps until the error is below \(10^{-3}\).`,
        diff: 'easy',
        s: [
          String.raw`\(x_1 = 2 - 0.25\cdot 4 = 1\); \(x_2 = 1 - 0.25\cdot 2 = 0.5\); \(x_3 = 0.25\).`,
          String.raw`Error factor \(|1 - \eta\lambda| = 0.75\) (\(\lambda = 2\)). Error sequence: \(2 \cdot 0.75^t\).`,
          String.raw`\(2\cdot 0.75^t \lt 10^{-3} \iff 0.75^t \lt 5\times10^{-4} \iff t \gt \ln(2000)/\ln(4/3) \approx 24.6\): about 25 steps.`
        ],
        fin: String.raw`\(x_3 = 0.25\), factor \(0.75\), \(\approx 25\) steps to \(10^{-3}\).`
      },
      {
        q: String.raw`For \(f = \tfrac12(10x^2 + y^2)\): what is the largest learning rate guaranteeing convergence, and which \(\eta^\star\) minimizes the worst-case per-step factor? Compute that factor.`,
        diff: 'med',
        s: [
          String.raw`Hessian eigenvalues: \(10, 1\). Stability: \(\eta \lt 2/\lambda_{\max} = 0.2\).`,
          String.raw`\(\eta^\star = \frac{2}{\lambda_{\min} + \lambda_{\max}} = \frac{2}{11} \approx 0.1818\).`,
          String.raw`Worst-case factor: \(\rho = \frac{\kappa - 1}{\kappa + 1} = \frac{9}{11} \approx 0.818\) — slow, because \(\kappa = 10\).`
        ],
        fin: String.raw`\(\eta \lt 0.2\); optimal \(\eta^\star = 2/11\), worst-case factor \(9/11 \approx 0.82\) per step. Ill-conditioning taxes every step.`
      },
      {
        q: String.raw`Minimize \(f(x, y) = x^2 + 2y^2\) subject to \(x + y = 1\) using Lagrange multipliers. Give the solution, \(\lambda\), and the shadow price interpretation.`,
        diff: 'med',
        s: [
          String.raw`\(\mathcal{L} = x^2 + 2y^2 + \lambda(x + y - 1)\): \(2x + \lambda = 0\), \(4y + \lambda = 0\), \(x + y = 1\).`,
          String.raw`\(x = -\lambda/2\), \(y = -\lambda/4\); constraint: \(-\tfrac{3\lambda}{4} = 1 \Rightarrow \lambda = -\tfrac43\).`,
          String.raw`\(x = \tfrac23\), \(y = \tfrac13\), \(f^\star = \tfrac49 + \tfrac29 = \tfrac23\). (Equivalently: substitute \(y = 1 - x\) and minimize the parabola \(3x^2 - 4x + 2\).)`,
          String.raw`Shadow price: relaxing to \(x + y = 1 + \varepsilon\) changes \(f^\star\) by \(-\lambda\varepsilon = \tfrac43\varepsilon\).`
        ],
        fin: String.raw`\(x^\star = 2/3\), \(y^\star = 1/3\), \(f^\star = 2/3\), \(\lambda = -4/3\).`
      },
      {
        q: String.raw`Minimize \(f(x) = (x - 2)^2\) subject to \(x \le 1\). Write the KKT conditions with your sign convention, find \(x^\star, \lambda^\star\), and state which constraint is active.`,
        diff: 'med',
        s: [
          String.raw`Standard form: \(g(x) = x - 1 \le 0\); \(\mathcal{L} = (x-2)^2 + \lambda(x - 1)\), \(\lambda \ge 0\).`,
          String.raw`Stationarity: \(2(x - 2) + \lambda = 0\); slackness: \(\lambda(x-1) = 0\).`,
          String.raw`Case \(\lambda = 0 \Rightarrow x = 2\) infeasible. Case \(x = 1\): \(\lambda = 2(2 - 1) = 2 \ge 0\) ✓ feasible.`
        ],
        fin: String.raw`\(x^\star = 1\), \(\lambda^\star = 2\), constraint active. The unconstrained optimum was "priced out" of the feasible region.`
      },
      {
        q: String.raw`(Proof) Show that \(f(\boldsymbol{w}) = \tfrac12\|\boldsymbol{A}\boldsymbol{w} - \boldsymbol{b}\|^2\) is convex for any matrix \(\boldsymbol{A}\), and give the condition for strict convexity in terms of \(\boldsymbol{A}\).`,
        diff: 'hard',
        s: [
          String.raw`Expand: \(f = \tfrac12\|\boldsymbol{A}\boldsymbol{w}\|^2 - \boldsymbol{b}^\top\boldsymbol{A}\boldsymbol{w} + \tfrac12\|\boldsymbol{b}\|^2 = \tfrac12\boldsymbol{w}^\top\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{w} - (\boldsymbol{A}^\top\boldsymbol{b})^\top\boldsymbol{w} + \text{const}\).`,
          String.raw`\(\nabla f = \boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{w} - \boldsymbol{A}^\top\boldsymbol{b}\), \(\nabla^2 f = \boldsymbol{A}^\top\boldsymbol{A} \succeq 0\) since \(\boldsymbol{x}^\top\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{x} = \|\boldsymbol{A}\boldsymbol{x}\|^2 \ge 0\). Hessian PSD everywhere ⟹ convex. ∎`,
          String.raw`Strict convexity ⟺ \(\boldsymbol{A}^\top\boldsymbol{A} \succ 0\) ⟺ columns of \(\boldsymbol{A}\) linearly independent (no kernel: \(\|\boldsymbol{A}\boldsymbol{x}\| = 0 \Rightarrow \boldsymbol{x} = \boldsymbol{0}\)).`
        ],
        fin: String.raw`Least squares is always convex (a beautiful, load-bearing fact); it has a unique minimum iff the design matrix has independent columns — Chapter 9's collinearity story, pre-empted.`
      }
    ]
  });
})();
