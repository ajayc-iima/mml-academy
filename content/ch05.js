/* Chapter 5 — Vector Calculus */
(function () {
  MML.chapters.push({
    id: 'ch5', num: 5, icon: '⛰️',
    title: 'Vector Calculus',
    tagline: 'Gradients, Jacobians, and the chain rule — the mathematics that lets a machine improve itself. Backpropagation is this chapter.',
    why: String.raw`Training a model means <b>descending the loss landscape</b>, and the gradient is the compass: it tells you, at your current parameters, which direction is downhill and how steep. Deep learning trains billion-parameter models with one core idea from this chapter: <b>the multivariate chain rule, applied systematically</b> — that is literally what backpropagation is. This chapter builds derivatives for functions of many variables: gradients (for scalar losses), Jacobians (for vector functions), Hessians (for curvature), and the linearization mindset ("locally, everything is affine") that underlies optimization.`,
    goals: [
      String.raw`Compute gradients of scalar functions fluently, including matrix forms \(\nabla_{\boldsymbol{\theta}} \|\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y}\|^2\).`,
      String.raw`Compute Jacobians of vector-valued maps.`,
      String.raw`Apply the multivariate chain rule by hand to a small neural network (i.e., do backprop on paper).`,
      String.raw`Use Hessians and second-order Taylor expansions; run one Newton step.`
    ],
    widget: null,
    concepts: [
      {
        id: 'c1',
        title: 'Derivative = local linearization; Taylor series',
        subtitle: 'the "locally everything is a line" worldview',
        intuition: String.raw`Zoom into any smooth curve until it looks like a straight line — the slope of that line is the derivative. This "zoom" reading is what makes derivatives so useful in ML: if you know your loss and its slope where you stand, you can <b>predict</b> the loss a tiny step away without computing it. Taylor's theorem is that prediction, written down, with correction terms for the curvature you ignored.`,
        math: [
          { h: 'Definition and differential', t: String.raw`$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \qquad \Longleftrightarrow \qquad f(x+h) = f(x) + f'(x)\, h + \mathcal{O}(h^2)$$ The second form — "value = current value + slope × step + higher-order junk" — is the one to internalize.` },
          { h: 'Taylor series', t: String.raw`$$f(x) = \sum_{k=0}^{\infty} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k$$ Example: \(f(x) = \log(1+x)\) at \(x_0 = 0\): \(f' = \tfrac{1}{1+x}, f'' = -\tfrac{1}{(1+x)^2}, f''' = \tfrac{2}{(1+x)^3}\) ⟹ $$\log(1+x) \approx x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$$` },
          { h: 'Chain rule (1-D), the seed of backprop', t: String.raw`$$(f \circ g)'(x) = f'(g(x))\, g'(x)$$ Nested functions: multiply the local slopes along the way.` }
        ],
        ml: String.raw`Gradient descent is exactly "current value + slope × (minus) step". Learning-rate blowups are the \(\mathcal{O}(h^2)\) term misbehaving. Taylor expansion of the loss around the current parameters is how every optimization method (Ch 7) is derived, and second-order methods use two Taylor terms.`,
        byhand: {
          problem: String.raw`Using the Taylor series of \(\log(1+x)\), estimate \(\log(1.1)\) with (a) one term, (b) two terms, (c) three terms; compare with the true value \(0.09531\).`,
          steps: [
            { t: '(a) First order: f ≈ x', d: String.raw`\(\log(1.1) \approx 0.1\) — overestimates (the function is concave, every tangent lies above it).` },
            { t: '(b) Second order: f ≈ x − x²/2', d: String.raw`\(\log(1.1) \approx 0.1 - 0.005 = 0.0950\) — much closer.` },
            { t: '(c) Third order: f ≈ x − x²/2 + x³/3', d: String.raw`\(\log(1.1) \approx 0.1 - 0.005 + 0.000333 = 0.095333\) vs truth \(0.095310\): error \(\approx 2 \times 10^{-5}\).` },
            { t: 'The lesson', d: String.raw`Each extra Taylor term multiplies accuracy roughly by the step size (here \(x = 0.1\)). Optimization methods choose steps small enough that the first-order picture is trustworthy — that is why learning rates exist.` }
          ],
          answer: String.raw`0.1 → 0.0950 → 0.09533 (truth: 0.09531). Linearization + corrections: the structure of all of optimization.`
        }
      },
      {
        id: 'c2',
        title: 'Partial derivatives and the gradient',
        subtitle: 'the compass in n dimensions',
        intuition: String.raw`For a function of many variables, hold all but one fixed and differentiate: that is a <b>partial derivative</b>. Stack all \(n\) partials into a vector and you get the <b>gradient</b> \(\nabla f\) — an arrow that points in the direction of <b>steepest increase</b>, with length equal to that steepest slope. Standing on a foggy hillside (the loss), the gradient is exactly "feel the slope under your feet, walk against it". Crucially, the gradient is a <b>vector field</b>: at every point of parameter space there lives one arrow.`,
        math: [
          { h: 'Definitions', t: String.raw`$$\frac{\partial f}{\partial x_i} = \text{derivative w.r.t. } x_i \text{, others fixed}; \qquad \nabla_{\boldsymbol{x}} f = \begin{pmatrix} \partial f/\partial x_1 \\ \vdots \\ \partial f/\partial x_n \end{pmatrix} \in \mathbb{R}^n$$` },
          { h: 'Key properties', t: String.raw`$$\nabla(\alpha f + \beta g) = \alpha \nabla f + \beta \nabla g, \qquad \nabla_{\boldsymbol{x}}\, \boldsymbol{a}^\top\boldsymbol{x} = \boldsymbol{a}, \qquad \nabla_{\boldsymbol{x}}\, \boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} = (\boldsymbol{A} + \boldsymbol{A}^\top)\boldsymbol{x} \;\overset{\boldsymbol{A} \text{ sym}}{=}\; 2\boldsymbol{A}\boldsymbol{x}$$` },
          { h: 'Steepest ascent/descent', t: String.raw`$$\max_{\|\boldsymbol{d}\| = 1} \; \boldsymbol{d}^\top \nabla f = \|\nabla f\| \quad \text{attained at } \boldsymbol{d} = \frac{\nabla f}{\|\nabla f\|}$$ Among all unit directions, moving along \(+\nabla f\) increases \(f\) fastest; \(-\nabla f\) is the downhill direction used by gradient descent.` }
        ],
        ml: String.raw`The loss \(L(\boldsymbol{\theta})\) is a scalar function of millions of parameters; \(\nabla_{\boldsymbol{\theta}} L\) is the training signal. "Gradient norm near zero" is the standard convergence criterion; "gradient norm exploding" is the training instability people clip gradients to avoid. In physics-informed and interpretable-ML work, gradients w.r.t. <em>inputs</em> (saliency maps) reuse the same machinery.`,
        byhand: {
          problem: String.raw`Let \(f(\boldsymbol{x}) = \boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}\) with \(\boldsymbol{A} = \begin{pmatrix} 1 & 2 \\ 2 & 3 \end{pmatrix}\) (symmetric). (a) Expand \(f\) in coordinates. (b) Compute \(\nabla f\) by partials. (c) Check \(\nabla f = 2\boldsymbol{A}\boldsymbol{x}\) at \(\boldsymbol{x} = (1,1)^\top\).`,
          steps: [
            { t: '(a) Expand', d: String.raw`$$f = x_1^2 + 2x_1x_2 + 2x_2x_1 + 3x_2^2 = x_1^2 + 4x_1x_2 + 3x_2^2$$ (the cross term absorbs both off-diagonal entries).` },
            { t: '(b) Partials', d: String.raw`$$\frac{\partial f}{\partial x_1} = 2x_1 + 4x_2, \qquad \frac{\partial f}{\partial x_2} = 4x_1 + 6x_2 \quad\Rightarrow\quad \nabla f = \begin{pmatrix} 2x_1 + 4x_2 \\ 4x_1 + 6x_2 \end{pmatrix}$$` },
            { t: '(c) Compare with 2Ax', d: String.raw`$$2\boldsymbol{A}\boldsymbol{x} = \begin{pmatrix} 2x_1 + 4x_2 \\ 4x_1 + 6x_2 \end{pmatrix} \;\checkmark\; \text{(works because } \boldsymbol{A} \text{ is symmetric)}$$ At \(\boldsymbol{x} = (1,1)^\top\): \(\nabla f = (6, 10)^\top\) — uphill points up-right; downhill (what descent follows) is \((-6,-10)^\top\).` }
          ],
          answer: String.raw`\(\nabla f = 2\boldsymbol{A}\boldsymbol{x}\) for symmetric \(\boldsymbol{A}\); at \((1,1)^\top\) it is \((6,10)^\top\). This formula is the ancestor of every gradient you will ever compute in ML.`
        }
      },
      {
        id: 'c3',
        title: 'Jacobians: derivatives of vector-valued maps',
        subtitle: 'a whole matrix of partials',
        intuition: String.raw`When a function outputs a <b>vector</b> (like a neural layer: \(\boldsymbol{f}: \mathbb{R}^n \to \mathbb{R}^m\)), one slope is not enough. You need the slope of every output w.r.t. every input — arranged into an \(m \times n\) matrix called the <b>Jacobian</b>. The Jacobian is the multivariable version of \(f'(x)\): locally, \(\boldsymbol{f}(\boldsymbol{x} + \boldsymbol{\delta}) \approx \boldsymbol{f}(\boldsymbol{x}) + \boldsymbol{J}\boldsymbol{\delta}\). Layer after layer, the network's sensitivity to its inputs is one big product of Jacobians.`,
        math: [
          { h: 'Definition', t: String.raw`$$\boldsymbol{J} = \frac{\partial \boldsymbol{f}}{\partial \boldsymbol{x}} \in \mathbb{R}^{m \times n}, \qquad J_{ij} = \frac{\partial f_i}{\partial x_j} \quad \text{(row } i = \text{output } i\text{, column } j = \text{input } j\text{)}$$ For scalar \(f\): \(\nabla f = \boldsymbol{J}^\top\) (gradient as a column).` },
          { h: 'The greatest hits (memorize these)', t: String.raw`$$\boldsymbol{f}(\boldsymbol{x}) = \boldsymbol{A}\boldsymbol{x} \;\Rightarrow\; \boldsymbol{J} = \boldsymbol{A} \qquad \boldsymbol{f}(\boldsymbol{x}) = \boldsymbol{x}^\top\boldsymbol{x} \;\Rightarrow\; \nabla = 2\boldsymbol{x}^\top$$ $$f(\boldsymbol{x}) = \boldsymbol{a}^\top\boldsymbol{x} \Rightarrow \nabla = \boldsymbol{a}; \qquad \boldsymbol{f}(\boldsymbol{x}) = \boldsymbol{x} \odot \boldsymbol{x} \Rightarrow \boldsymbol{J} = 2\operatorname{diag}(\boldsymbol{x})$$ (Elementwise functions like \(\tanh\), \(\sigma\) have <b>diagonal</b> Jacobians: each output depends only on its own input.)` },
          { h: 'Linearization', t: String.raw`$$\boldsymbol{f}(\boldsymbol{x} + \boldsymbol{\delta}) \approx \boldsymbol{f}(\boldsymbol{x}) + \boldsymbol{J}(\boldsymbol{x})\, \boldsymbol{\delta}$$ The Jacobian <em>is</em> the local linear approximation — Newton's method and sensitivity analysis run on this line.` }
        ],
        ml: String.raw`Backprop computes vector–Jacobian products layer by layer. "Gradient wrt inputs" for interpretability = a Jacobian column. Jacobian regularization (penalizing \(\|\boldsymbol{J}\|\)) encourages robustness. Normalizing flows must track \(\det \boldsymbol{J}\) through every layer, which is why they use Jacobians with cheap structure (triangular, diagonal).`,
        byhand: {
          problem: String.raw`Compute the Jacobian of $$\boldsymbol{f}(x_1, x_2) = \begin{pmatrix} x_1 x_2 \\ x_1 + x_2 \end{pmatrix}$$ evaluate it at \(\boldsymbol{x} = (2, 3)^\top\), and use it to predict \(\boldsymbol{f}(2.1, 3.1)\) by linearization (true value: \((6.51, 5.2)\)).`,
          steps: [
            { t: 'Fill the 2×2 grid of partials', d: String.raw`$$\boldsymbol{J} = \begin{pmatrix} \partial(x_1x_2)/\partial x_1 & \partial(x_1x_2)/\partial x_2 \\ \partial(x_1{+}x_2)/\partial x_1 & \partial(x_1{+}x_2)/\partial x_2 \end{pmatrix} = \begin{pmatrix} x_2 & x_1 \\ 1 & 1 \end{pmatrix}$$` },
            { t: 'Evaluate at (2, 3)', d: String.raw`$$\boldsymbol{J}(2,3) = \begin{pmatrix} 3 & 2 \\ 1 & 1 \end{pmatrix}$$` },
            { t: 'Linearize the step δ = (0.1, 0.1)', d: String.raw`$$\boldsymbol{f}(2,3) = (6, 5)^\top, \qquad \boldsymbol{J}\boldsymbol{\delta} = \begin{pmatrix} 0.5 \\ 0.2 \end{pmatrix} \;\Rightarrow\; \boldsymbol{f} \approx (6.5,\; 5.2)$$` },
            { t: 'Compare with truth', d: String.raw`True: \(\boldsymbol{f}(2.1, 3.1) = (6.51, 5.2)^\top\). Prediction error only \(0.01\) — the quadratic part \(x_1x_2\) is the neglected \(\mathcal{O}(\delta^2)\) term: \(0.1 \times 0.1 = 0.01\), exactly.` }
          ],
          answer: String.raw`\(\boldsymbol{J} = \begin{pmatrix} x_2 & x_1 \\ 1 & 1\end{pmatrix}\); linearization predicts \((6.5, 5.2)\) vs true \((6.51, 5.2)\) — the miss is precisely the ignored \(\delta_1\delta_2\) term.`
        }
      },
      {
        id: 'c4',
        title: 'The chain rule and backpropagation',
        subtitle: 'how networks learn: one rule, applied recursively',
        intuition: String.raw`A neural network is a pipeline: input \(\to\) linear map \(\to\) nonlinearity \(\to\) linear map \(\to\) … \(\to\) loss. To ask "how does the loss change if I nudge this early weight?", the nudge must travel <b>through every stage</b>, being multiplied by each stage's local sensitivity. The chain rule says: multiply the local slopes. Backpropagation is just the chain rule run <b>backwards</b> through the pipeline, reusing intermediate results — which is why it costs barely more than a forward pass. You can do it on paper for small networks, and you should: it demystifies everything.`,
        math: [
          { h: 'Multivariate chain rule', t: String.raw`If \(\boldsymbol{z} = \boldsymbol{g}(\boldsymbol{x})\) and \(\boldsymbol{f} = \boldsymbol{h}(\boldsymbol{z})\): $$\frac{\partial \boldsymbol{f}}{\partial \boldsymbol{x}} = \frac{\partial \boldsymbol{f}}{\partial \boldsymbol{z}} \cdot \frac{\partial \boldsymbol{z}}{\partial \boldsymbol{x}} \qquad \text{(Jacobian chain: matrices multiply)}$$ For scalar loss \(L\): \(\nabla_{\boldsymbol{x}} L = \boldsymbol{J}_{\boldsymbol{g}}^\top \nabla_{\boldsymbol{z}} L\) — the "vector–Jacobian product" that backprop chains together.` },
          { h: 'The two layer-types you need', t: String.raw`$$\text{affine layer } \boldsymbol{z} = \boldsymbol{W}\boldsymbol{a} + \boldsymbol{b}: \quad \nabla_{\boldsymbol{W}} L = (\nabla_{\boldsymbol{z}} L)\, \boldsymbol{a}^\top, \quad \nabla_{\boldsymbol{b}} L = \nabla_{\boldsymbol{z}} L, \quad \nabla_{\boldsymbol{a}} L = \boldsymbol{W}^\top \nabla_{\boldsymbol{z}} L$$ $$\text{elementwise } \boldsymbol{a} = \phi(\boldsymbol{z}): \quad \nabla_{\boldsymbol{z}} L = \phi'(\boldsymbol{z}) \odot \nabla_{\boldsymbol{a}} L$$ e.g. \(\sigma'(z) = \sigma(z)(1 - \sigma(z))\), \(\tanh'(z) = 1 - \tanh^2(z)\).` }
        ],
        ml: String.raw`This <em>is</em> deep learning training. Every framework (PyTorch, JAX) is an automatic chain-rule bookkeeper over a computation graph. Vanishing/exploding gradients = chain-rule products shrinking/exploding through many layers; residual connections and normalization exist to keep those products healthy. Understanding this card = understanding what "optimizer.step()" actually does.`,
        byhand: {
          problem: String.raw`Backprop by hand through the tiny network $$a = w_1 x, \qquad h = \sigma(a), \qquad y = w_2 h, \qquad L = \tfrac12 (y - t)^2$$ with \(x = 2\), \(w_1 = 1\), \(w_2 = 0.5\), target \(t = 1\). Compute \(\partial L/\partial w_2\) and \(\partial L/\partial w_1\).`,
          steps: [
            { t: 'Forward pass (numbers first)', d: String.raw`\(a = 1 \cdot 2 = 2\); \(h = \sigma(2) = \tfrac{1}{1 + e^{-2}} \approx 0.8808\); \(y = 0.5 \times 0.8808 = 0.4404\); \(L = \tfrac12(0.4404 - 1)^2 = \tfrac12(0.5596)^2 \approx 0.1566\).` },
            { t: 'Start at the loss: ∂L/∂y', d: String.raw`$$\frac{\partial L}{\partial y} = y - t = 0.4404 - 1 = -0.5596$$ (negative: \(y\) is too small; increasing \(y\) decreases \(L\).)` },
            { t: 'Through the last layer: ∂L/∂w₂ and ∂L/∂h', d: String.raw`Since \(y = w_2 h\): $$\frac{\partial L}{\partial w_2} = \frac{\partial L}{\partial y}\, h = -0.5596 \times 0.8808 \approx -0.493, \qquad \frac{\partial L}{\partial h} = \frac{\partial L}{\partial y}\, w_2 = -0.2798$$` },
            { t: 'Through the sigmoid: ∂L/∂a', d: String.raw`$$\frac{dh}{da} = h(1-h) = 0.8808 \times 0.1192 \approx 0.1050 \;\Rightarrow\; \frac{\partial L}{\partial a} = -0.2798 \times 0.1050 \approx -0.0294$$` },
            { t: 'Through the first layer: ∂L/∂w₁', d: String.raw`Since \(a = w_1 x\): $$\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial a}\, x = -0.0294 \times 2 \approx -0.0587$$ Both gradients are negative ⟹ gradient <em>descent</em> (\(w \leftarrow w - \eta\, \partial L/\partial w\)) will <b>increase</b> both weights, pushing \(y\) up toward \(t = 1\). Exactly right.` }
          ],
          answer: String.raw`\(\partial L/\partial w_2 \approx -0.493\), \(\partial L/\partial w_1 \approx -0.0587\). You have just performed backpropagation by hand — the \(\$\)-billion algorithm is this, scaled up.`
        }
      },
      {
        id: 'c5',
        title: 'Hessians, curvature, and Newton\u2019s method',
        subtitle: 'second derivatives: the shape of the valley',
        intuition: String.raw`The gradient tells you the slope; the <b>Hessian</b> (the matrix of all second derivatives) tells you how the slope itself changes — the <b>curvature</b>. Geometrically it describes the shape of the loss valley: a round bowl (all curvatures similar) is easy to descend; a long narrow canyon (one huge curvature, one tiny) is miserable for gradient descent but trivial for Newton's method, which uses curvature to jump straight toward the bottom.`,
        math: [
          { h: 'Definition', t: String.raw`$$\boldsymbol{H} = \nabla^2 f \in \mathbb{R}^{n\times n}, \qquad H_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$$ For smooth \(f\), \(\boldsymbol{H}\) is symmetric (Schwarz/Clairaut). For \(f = \tfrac12\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} - \boldsymbol{b}^\top\boldsymbol{x}\): \(\nabla f = \boldsymbol{A}\boldsymbol{x} - \boldsymbol{b}\), \(\boldsymbol{H} = \boldsymbol{A}\).` },
          { h: 'Second-order Taylor', t: String.raw`$$f(\boldsymbol{x} + \boldsymbol{\delta}) \approx f(\boldsymbol{x}) + \nabla f^\top \boldsymbol{\delta} + \tfrac12 \boldsymbol{\delta}^\top\boldsymbol{H}\boldsymbol{\delta}$$ Positive definite \(\boldsymbol{H}\): bowl (local minimum); negative definite: peak; indefinite: saddle. Convexity of the whole function ⟺ \(\boldsymbol{H} \succeq 0\) everywhere.` },
          { h: 'Newton step', t: String.raw`Minimize the quadratic model: set its gradient to zero, $$\nabla f + \boldsymbol{H}\boldsymbol{\delta} = \boldsymbol{0} \;\Rightarrow\; \boldsymbol{\delta} = -\boldsymbol{H}^{-1}\nabla f$$ For a quadratic loss this lands on the exact minimum in <b>one</b> step. (Cost: solving an \(n \times n\) system — fine for \(n\) in the hundreds, impossible for a billion-parameter model without approximations.)` }
        ],
        ml: String.raw`Ill-conditioned Hessians (eigenvalue spread) are <em>the</em> optimization pain of deep learning — the condition number explains why training curves flatline. Quasi-Newton methods (L-BFGS) and Adam's second-moment estimates are cheap curvature surrogates. Gauss–Newton / natural gradient / K-FAC are research-grade second-order methods. In Ch 7 the Hessian's eigenvalues set the maximum stable learning rate: \(\eta \lt 2/\lambda_{\max}\).`,
        byhand: {
          problem: String.raw`Minimize \(f(\boldsymbol{w}) = \tfrac12\boldsymbol{w}^\top\boldsymbol{A}\boldsymbol{w} - \boldsymbol{b}^\top\boldsymbol{w}\) with \(\boldsymbol{A} = \begin{pmatrix} 4 & 0 \\ 0 & 1 \end{pmatrix}\), \(\boldsymbol{b} = (1, 1)^\top\), starting from \(\boldsymbol{w}_0 = (0,0)^\top\). (a) Take one gradient-descent step with \(\eta = 0.1\). (b) Take one Newton step. (c) Explain the difference.`,
          steps: [
            { t: 'Gradient and Hessian', d: String.raw`$$\nabla f = \boldsymbol{A}\boldsymbol{w} - \boldsymbol{b}, \qquad \boldsymbol{H} = \boldsymbol{A} \quad (\text{constant curvature — a quadratic bowl})$$ At \(\boldsymbol{w}_0\): \(\nabla f = (-1, -1)^\top\).` },
            { t: '(a) Gradient step, η = 0.1', d: String.raw`$$\boldsymbol{w}_1 = \boldsymbol{w}_0 - \eta\nabla f = (0.1, 0.1)^\top$$ But the true minimizer solves \(\boldsymbol{A}\boldsymbol{w} = \boldsymbol{b}\): \(\boldsymbol{w}^\star = (\tfrac14, 1)^\top\). GD moved only a tenth of the way in the flat (\(y\)) direction.` },
            { t: '(b) Newton step', d: String.raw`$$\boldsymbol{w}_1 = \boldsymbol{w}_0 - \boldsymbol{H}^{-1}\nabla f = -\begin{pmatrix} \tfrac14 & 0 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} -1 \\ -1 \end{pmatrix} = \begin{pmatrix} \tfrac14 \\ 1 \end{pmatrix} = \boldsymbol{w}^\star$$ Exact minimum in one step — the quadratic model <em>is</em> the function here.` },
            { t: '(c) Why the difference', d: String.raw`The bowl has curvatures \(4\) and \(1\) (condition number 4; imagine 10⁴ for real networks). GD must use one \(\eta\) for all directions, so the flat direction crawls: error shrinks by \(|1 - \eta\lambda|\) per step (\(0.9\) here — tens of steps needed). Newton rescales each direction by its own curvature: no crawling. That is the entire value and cost of second-order information.` }
          ],
          answer: String.raw`GD after 1 step: \((0.1, 0.1)^\top\) (far away). Newton: \((\tfrac14, 1)^\top = \boldsymbol{w}^\star\) exactly. Curvature-aware steps dominate when you can afford them.`
        }
      }
    ],
    cheatsheet: [
      { n: 'Gradient rules', t: String.raw`$$\nabla_{\boldsymbol{x}}\,\boldsymbol{a}^\top\boldsymbol{x} = \boldsymbol{a}, \quad \nabla_{\boldsymbol{x}}\,\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} = 2\boldsymbol{A}\boldsymbol{x} \;(\boldsymbol{A} \text{ sym}), \quad \nabla_{\boldsymbol{\theta}}\tfrac12\|\boldsymbol{X}\boldsymbol{\theta}-\boldsymbol{y}\|^2 = \boldsymbol{X}^\top(\boldsymbol{X}\boldsymbol{\theta}-\boldsymbol{y})$$` },
      { n: 'Jacobian', t: String.raw`$$J_{ij} = \frac{\partial f_i}{\partial x_j}, \qquad \boldsymbol{f} = \boldsymbol{A}\boldsymbol{x} \Rightarrow \boldsymbol{J} = \boldsymbol{A}$$` },
      { n: 'Chain rule / backprop', t: String.raw`$$\nabla_{\boldsymbol{x}} L = \boldsymbol{J}_{\boldsymbol{g}}^\top \nabla_{\boldsymbol{z}} L; \quad \nabla_{\boldsymbol{W}} L = (\nabla_{\boldsymbol{z}} L)\,\boldsymbol{a}^\top; \quad \sigma'(z) = \sigma(z)(1-\sigma(z))$$` },
      { n: 'Hessian & Taylor', t: String.raw`$$f(\boldsymbol{x}+\boldsymbol{\delta}) \approx f + \nabla f^\top\boldsymbol{\delta} + \tfrac12\boldsymbol{\delta}^\top\boldsymbol{H}\boldsymbol{\delta}; \qquad \text{Newton: } \boldsymbol{\delta} = -\boldsymbol{H}^{-1}\nabla f$$` },
      { n: 'Steepest descent', t: String.raw`$$\boldsymbol{w} \leftarrow \boldsymbol{w} - \eta\, \nabla f(\boldsymbol{w})$$` }
    ],
    practice: [
      {
        q: String.raw`Compute the gradient of \(f(x, y) = x^2 y^3 + e^x\) and evaluate it at \((1, 1)\).`,
        diff: 'easy',
        s: [
          String.raw`\(\partial f/\partial x = 2xy^3 + e^x\); \(\partial f/\partial y = 3x^2y^2\).`,
          String.raw`At \((1,1)\): \(\nabla f = (2 + e, 3)^\top \approx (4.72, 3)^\top\).`
        ],
        fin: String.raw`\(\nabla f(1,1) = (2 + e,\, 3)^\top \approx (4.72, 3)^\top\).`
      },
      {
        q: String.raw`Compute the Jacobian of $$\boldsymbol{f}(x_1, x_2) = \begin{pmatrix} x_1 x_2 \\ x_2^2 \\ \sin x_1 \end{pmatrix}$$ and its value at \((\pi/2, 2)\).`,
        diff: 'easy',
        s: [
          String.raw`$$\boldsymbol{J} = \begin{pmatrix} x_2 & x_1 \\ 0 & 2x_2 \\ \cos x_1 & 0 \end{pmatrix}$$`,
          String.raw`At \((\pi/2, 2)\): \(\boldsymbol{J} = \begin{pmatrix} 2 & \pi/2 \\ 0 & 4 \\ 0 & 0\end{pmatrix}\) (since \(\cos(\pi/2) = 0\)).`
        ],
        fin: String.raw`\(\boldsymbol{J} = \begin{pmatrix} x_2 & x_1 \\ 0 & 2x_2 \\ \cos x_1 & 0\end{pmatrix}\); at the point: \(\begin{pmatrix} 2 & \pi/2 \\ 0 & 4 \\ 0 & 0\end{pmatrix}\).`
      },
      {
        q: String.raw`For the least-squares loss \(L(\boldsymbol{\theta}) = \tfrac12\|\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y}\|^2\) with $$\boldsymbol{X} = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}, \quad \boldsymbol{y} = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}$$ (a) show \(\nabla L = \boldsymbol{X}^\top(\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y})\); (b) compute \(\boldsymbol{X}^\top\boldsymbol{X}\) and \(\boldsymbol{X}^\top\boldsymbol{y}\); (c) verify that \(\boldsymbol{\theta}^\star = (\tfrac16, \tfrac12)^\top\) makes the gradient vanish.`,
        diff: 'med',
        s: [
          String.raw`(a) Chain rule through \(\boldsymbol{r} = \boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y}\): \(\partial \boldsymbol{r}/\partial\boldsymbol{\theta} = \boldsymbol{X}\), and \(\partial(\tfrac12\|\boldsymbol{r}\|^2)/\partial\boldsymbol{r} = \boldsymbol{r}^\top\), so \(\nabla L = \boldsymbol{X}^\top\boldsymbol{r}\).`,
          String.raw`(b) \(\boldsymbol{X}^\top\boldsymbol{X} = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}\), \(\boldsymbol{X}^\top\boldsymbol{y} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}\).`,
          String.raw`(c) \(\boldsymbol{X}^\top\boldsymbol{X}\,\boldsymbol{\theta}^\star = \begin{pmatrix} 3 & 3 \\ 3 & 5\end{pmatrix}\begin{pmatrix} 1/6 \\ 1/2 \end{pmatrix} = \begin{pmatrix} 1/2 + 3/2 \\ 1/2 + 5/2 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix} = \boldsymbol{X}^\top\boldsymbol{y}\) ⟹ \(\nabla L = \boldsymbol{0}\) ✓.`
        ],
        fin: String.raw`\(\nabla L = \boldsymbol{X}^\top(\boldsymbol{X}\boldsymbol{\theta} - \boldsymbol{y})\); setting it to zero gives the normal equations — Chapter 9 begins exactly here.`
      },
      {
        q: String.raw`Find the Hessian of \(f(x, y) = x^2 + xy + y^2\), its eigenvalues, and use them to argue \(f\) is convex with a unique global minimum; then find that minimum.`,
        diff: 'med',
        s: [
          String.raw`\(\boldsymbol{H} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}\): eigenvalues from \(\lambda^2 - 4\lambda + 3 = (\lambda - 3)(\lambda - 1)\): \(\lambda = 3, 1\).`,
          String.raw`Both positive ⟹ \(\boldsymbol{H}\) positive definite everywhere ⟹ \(f\) is strictly convex: one bowl, one bottom.`,
          String.raw`\(\nabla f = (2x + y,\; x + 2y)^\top = \boldsymbol{0} \Rightarrow x = y = 0\). Minimum value \(f(0,0) = 0\).`
        ],
        fin: String.raw`\(\boldsymbol{H} = \begin{pmatrix} 2 & 1 \\ 1 & 2\end{pmatrix}\), eigenvalues \(3, 1 \gt 0\): convex, unique minimum at \((0,0)\) with \(f = 0\).`
      },
      {
        q: String.raw`(Proof) Show componentwise that \(\nabla_{\boldsymbol{x}}\, \boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} = (\boldsymbol{A} + \boldsymbol{A}^\top)\boldsymbol{x}\), and explain where the factor 2 goes when \(\boldsymbol{A}\) is symmetric.`,
        diff: 'hard',
        s: [
          String.raw`Expand: \(\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} = \sum_{i,j} A_{ij} x_i x_j\). Differentiate w.r.t. \(x_k\): terms with \(i = k\) give \(\sum_j A_{kj}x_j\) (derivative of \(x_k x_j\) is \(x_j\) when \(i = k\)); terms with \(j = k\) give \(\sum_i A_{ik} x_i\).`,
          String.raw`So \(\partial/\partial x_k = \sum_j A_{kj} x_j + \sum_i A_{ik} x_i = \big[(\boldsymbol{A} + \boldsymbol{A}^\top)\boldsymbol{x}\big]_k\).`,
          String.raw`If \(\boldsymbol{A} = \boldsymbol{A}^\top\): \((\boldsymbol{A} + \boldsymbol{A}^\top) = 2\boldsymbol{A}\), giving the compact \(\nabla = 2\boldsymbol{A}\boldsymbol{x}\). The "2" was never magic — it is the two symmetric copies of the cross-term \(x_i x_j\).`
        ],
        fin: String.raw`\(\nabla\,\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x} = (\boldsymbol{A} + \boldsymbol{A}^\top)\boldsymbol{x} = 2\boldsymbol{A}\boldsymbol{x}\) for symmetric \(\boldsymbol{A}\). This is the single most-used matrix calculus identity in ML.`
      }
    ]
  });
})();
