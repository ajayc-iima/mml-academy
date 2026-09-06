/* Chapter 1 — Introduction: the map of machine learning */
(function () {
  MML.chapters.push({
    id: 'ch1', num: 1, icon: '🗺️',
    title: 'Introduction: the map of machine learning',
    tagline: 'Before any formula: what problem is ML solving, and why do three branches of mathematics hold the entire field together?',
    why: String.raw`Machine learning is a very specific enterprise: we write down a <b>family of functions</b> (a model), we decide what "fitting the data well" <b>means</b> (a loss), and then we let mathematics <b>find the best function</b> in the family. Every ML system you have ever heard of — linear regression, transformers, diffusion models — is that same three-step story. The three mathematical languages that carry the story are <b>linear algebra</b> (the data and the models), <b>calculus</b> (how to improve a model), and <b>probability</b> (how to talk about uncertainty in data). This course builds all three, brick by brick, always with the ML application in sight.`,
    goals: [
      String.raw`State the ML pipeline in one sentence: data \(\to\) model \(\to\) loss \(\to\) optimization \(\to\) evaluation.`,
      String.raw`See a complete (tiny) learning problem solved end-to-end by hand.`,
      String.raw`Know the map: which chapters build which part of the pipeline.`
    ],
    concepts: [
      {
        id: 'c1',
        title: 'What “learning” actually means',
        subtitle: 'data → model → loss → optimization → evaluation',
        intuition: String.raw`Think of teaching a friend to price apartments. You show them a table of past sales (size, location, price). They don't memorize the table — they extract a <b>rule</b> like "price ≈ $3000 per m², minus a bit for distance from the center". That is exactly what ML does: instead of hand-writing the rule, we choose a <b>flexible family of rules</b> (a model with knobs), and use the data to automatically pick the knob settings that reproduce the table best. "Learning" = "tuning knobs until the model's answers match reality". Nothing mystical.`,
        math: [
          { h: 'The pipeline, formally', t: String.raw`$$\underbrace{\mathcal{D} = \{(\boldsymbol{x}_1, y_1), \dots, (\boldsymbol{x}_n, y_n)\}}_{\text{data: inputs } \boldsymbol{x}, \text{ targets } y} \quad \underbrace{f_{\boldsymbol{\theta}} : \boldsymbol{x} \mapsto \hat{y}}_{\text{model with parameters } \boldsymbol{\theta}} \quad \underbrace{L\big(y, f_{\boldsymbol{\theta}}(\boldsymbol{x})\big)}_{\text{loss: penalty for being wrong}}$$` },
          { h: 'Learning = minimizing average loss', t: String.raw`$$\boldsymbol{\theta}^{\star} = \arg\min_{\boldsymbol{\theta}} \; \frac{1}{n}\sum_{i=1}^{n} L\big(y_i, f_{\boldsymbol{\theta}}(\boldsymbol{x}_i)\big)$$ The symbol \(\arg\min\) reads: "the value of \(\boldsymbol{\theta}\) that makes this quantity smallest". Chapters 5 and 7 are entirely about how to actually compute such a \(\boldsymbol{\theta}^\star\).` }
        ],
        ml: String.raw`This is the skeleton of everything. Linear regression: \(f_{\boldsymbol{\theta}}(\boldsymbol{x}) = \boldsymbol{\theta}^\top \boldsymbol{x}\), squared loss. Neural networks: \(f_{\boldsymbol{\theta}}\) = many matrix multiplications and nonlinearities, still squared or cross-entropy loss, still \(\arg\min\). Diffusion models: same, with a cleverer loss on noisy data. When a paper says "we train model \(X\)", it means precisely "we solved (approximately) the \(\arg\min\) above on dataset \(\mathcal{D}\)".`,
        byhand: {
          problem: String.raw`You have two data points: \((x_1, y_1) = (1, 2)\) and \((x_2, y_2) = (2, 3)\). Model: \(\hat{y} = \theta x\) (a line through the origin, one knob \(\theta\)). Loss: squared error \(\frac{1}{2}\sum_i (\theta x_i - y_i)^2\). Find the best \(\theta\).`,
          steps: [
            { t: 'Write the loss as a function of θ only', d: String.raw`Plug the data in: $$R(\theta) = \tfrac{1}{2}\big[(\theta \cdot 1 - 2)^2 + (\theta \cdot 2 - 3)^2\big]$$ This is the "training error" — a number for every knob setting.` },
            { t: 'Expand it', d: String.raw`$$R(\theta) = \tfrac{1}{2}\big[(\theta-2)^2 + (2\theta-3)^2\big] = \tfrac{1}{2}\big[\theta^2 - 4\theta + 4 + 4\theta^2 - 12\theta + 9\big] = \tfrac{5}{2}\theta^2 - 8\theta + \tfrac{13}{2}$$ A parabola — of course: a sum of squares of linear terms is quadratic.` },
            { t: 'Minimize the parabola with calculus', d: String.raw`A parabola \(a\theta^2 + b\theta + c\) with \(a \gt 0\) is minimized where its derivative is zero: $$\frac{dR}{d\theta} = 5\theta - 8 = 0 \;\Rightarrow\; \theta = \frac{8}{5} = 1.6$$ (Chapter 5 builds the full derivative toolkit; Chapter 7 turns "derivative = 0" into an algorithm.)` },
            { t: 'Check it makes sense', d: String.raw`\(R(1.6) = \tfrac{5}{2}(2.56) - 12.8 + 6.5 = 6.4 - 12.8 + 6.5 = 0.1\). Compare \(\theta = 2\): \(R = 10 - 16 + 6.5 = 0.5\). And \(\theta = 1.5\): \(R = 5.625 - 12 + 6.5 = 0.125\). Indeed 1.6 beats both neighbors — the parabola's bottom.` }
          ],
          answer: String.raw`\(\boldsymbol{\theta}^{\star} = 1.6\), i.e. the fitted rule is \(\hat{y} = 1.6\,x\), with training loss \(0.1\).`
        },
        links: ['ch5:c1', 'ch7:c1']
      },
      {
        id: 'c2',
        title: 'Data is a matrix, models are matrices',
        subtitle: 'why linear algebra is the substrate',
        intuition: String.raw`Whatever your data is — an image, a sentence, a patient record — a computer stores it as a <b>list of numbers</b>: a vector. Stack \(n\) data points side by side and you get a <b>matrix</b>. And the models themselves? A linear layer in a neural network is literally "multiply the input vector by a matrix, add a vector". So both the <b>thing being learned from</b> and <b>the learner's basic move</b> are linear-algebra objects. This is why Chapter 2 comes first: learn to move matrices fluently and every model becomes transparent.`,
        math: [
          { h: 'The data (design) matrix', t: String.raw`$$\boldsymbol{X} = \begin{pmatrix} x_{11} & x_{12} & \cdots & x_{1d} \\ \vdots & & & \vdots \\ x_{n1} & x_{n2} & \cdots & x_{nd} \end{pmatrix} \in \mathbb{R}^{n \times d}, \qquad \boldsymbol{y} = \begin{pmatrix} y_1 \\ \vdots \\ y_n \end{pmatrix} \in \mathbb{R}^n$$ Convention: <b>rows = examples, columns = features</b>. "Tabular data" in any ML library is exactly this object.` },
          { h: 'A linear model is a matrix–vector product', t: String.raw`$$\hat{y}_i = \boldsymbol{\theta}^{\top} \boldsymbol{x}_i = \theta_1 x_{i1} + \cdots + \theta_d x_{id}$$ and for all \(n\) examples at once: \(\hat{\boldsymbol{y}} = \boldsymbol{X}\boldsymbol{\theta}\). One line of linear algebra replaces a double loop over examples and features.` },
          { h: 'Matrix multiplication = many dot products', t: String.raw`For \(\boldsymbol{A} \in \mathbb{R}^{m\times k}\), \(\boldsymbol{B} \in \mathbb{R}^{k \times n}\): $$(\boldsymbol{A}\boldsymbol{B})_{ij} = \sum_{\ell=1}^{k} A_{i\ell} B_{\ell j} \qquad \Rightarrow \qquad (\text{row } i \text{ of } \boldsymbol{A}) \cdot (\text{column } j \text{ of } \boldsymbol{B})$$ The inner dimensions must match: \((m \times \color{red}{k})(\color{red}{k} \times n) \to m \times n\).` }
        ],
        ml: String.raw`A GPT-style transformer spends almost all of its compute doing exactly \(\boldsymbol{X}\boldsymbol{W}\) products: the \(Q, K, V\) projections, the output projection, the MLP layers. Training an LLM = billions of matrix multiplications + calculus to adjust the matrices. Even "attention" itself is a matrix product \(\text{softmax}(\boldsymbol{Q}\boldsymbol{K}^\top/\sqrt{d})\boldsymbol{V}\). Linear algebra is not a prerequisite for ML — it <em>is</em> the computational substance of ML.`,
        byhand: {
          problem: String.raw`Compute \(\boldsymbol{W}\boldsymbol{x}\) and \(\boldsymbol{W}^\top\) for $$\boldsymbol{W} = \begin{pmatrix} 1 & 0 & 2 \\ 0 & 1 & 1 \end{pmatrix}, \qquad \boldsymbol{x} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$$ Then add a bias \(\boldsymbol{b} = (1, -1)^\top\) to form the full linear layer \(\boldsymbol{W}\boldsymbol{x} + \boldsymbol{b}\).`,
          steps: [
            { t: 'Dimensions first (always!)', d: String.raw`\(\boldsymbol{W}\) is \(2 \times 3\), \(\boldsymbol{x}\) is \(3 \times 1\): \((2 \times \color{red}{3})(\color{red}{3} \times 1) \to 2 \times 1\). The answer will be a 2-vector.` },
            { t: 'Each output = dot product of a row with x', d: String.raw`$$\boldsymbol{W}\boldsymbol{x} = \begin{pmatrix} 1\cdot 1 + 0 \cdot 2 + 2 \cdot 3 \\ 0 \cdot 1 + 1 \cdot 2 + 1 \cdot 3 \end{pmatrix} = \begin{pmatrix} 1 + 0 + 6 \\ 0 + 2 + 3 \end{pmatrix} = \begin{pmatrix} 7 \\ 5 \end{pmatrix}$$` },
            { t: 'Add the bias', d: String.raw`$$\boldsymbol{W}\boldsymbol{x} + \boldsymbol{b} = \begin{pmatrix} 7 \\ 5 \end{pmatrix} + \begin{pmatrix} 1 \\ -1 \end{pmatrix} = \begin{pmatrix} 8 \\ 4 \end{pmatrix}$$ Congratulations: you just computed one forward pass of a neural-network layer by hand.` },
            { t: 'Transpose W', d: String.raw`Flip rows ↔ columns: $$\boldsymbol{W}^{\top} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 2 & 1 \end{pmatrix} \in \mathbb{R}^{3 \times 2}$$ Note \((\boldsymbol{W}\boldsymbol{x})^\top = \boldsymbol{x}^\top \boldsymbol{W}^\top\) — a shape-checking trick you will use constantly: \( (1{\times}2)(2{\times}3)(3{\times}1) \to 1{\times}1\).` }
          ],
          answer: String.raw`\(\boldsymbol{W}\boldsymbol{x} + \boldsymbol{b} = (8, 4)^\top\) and \(\boldsymbol{W}^\top = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 2 & 1 \end{pmatrix}\).`
        }
      },
      {
        id: 'c3',
        title: 'The three languages and the map of this course',
        subtitle: 'linear algebra · calculus · probability',
        intuition: String.raw`Here is the whole course as one sentence: <b>linear algebra describes the model, probability describes the data, and calculus improves the model.</b> A dataset is a matrix. A model class is a family of functions. A loss says how wrong the model is. The derivative of the loss says which way to turn the knobs. Probability wraps everything in a language for uncertainty — "the data is noisy, the model's belief is a distribution". Every chapter below is one room in this one house.`,
        math: [
          { h: 'The map', t: String.raw`$$\begin{array}{lll} \textbf{Linear algebra (Ch 2–4)} & \textbf{Calculus (Ch 5)} & \textbf{Probability (Ch 6)} \\[2pt] \text{data \& linear models} & \text{slopes \& change} & \text{uncertainty \& noise} \\[2pt] \text{geometry (Ch 3): lengths, angles} & \text{gradients} = \text{steepest ascent} & \text{Bayes: belief + evidence} \\[2pt] \text{decompositions (Ch 4): } \boldsymbol{A}=\boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1} & \text{chain rule} = \text{backprop} & \text{Gaussians: the workhorse} \\[6pt] \multicolumn{3}{c}{\textbf{Optimization (Ch 7)} — how to actually find the best knobs} \\[2pt] \multicolumn{3}{c}{\textbf{Ch 8–12}: the pipeline assembled — regression, PCA, mixtures, SVMs} \end{array}$$` }
        ],
        ml: String.raw`Researchers literally think in these three languages. "The loss landscape is ill-conditioned" — linear algebra (Ch 4, 7). "We optimize the ELBO with the reparameterization trick" — calculus + probability (Ch 5, 6). "The kernel maps into a Hilbert space" — geometry (Ch 3). When you finish this course, papers stop being word salad and become sentences in these languages.`,
        byhand: {
          problem: String.raw`Classify each research phrase by its underlying mathematics: (a) "the Hessian is ill-conditioned", (b) "we maximize the marginal likelihood", (c) "the data lies close to a low-dimensional subspace", (d) "backpropagate the gradient", (e) "the posterior is conjugate".`,
          steps: [
            { t: '(a) Hessian — second derivatives of the loss', d: String.raw`Pure calculus + its linear-algebra twin (eigenvalues of the Hessian describe the shape of the loss valley). Chapters 4, 5, 7.` },
            { t: '(b) Marginal likelihood — probability', d: String.raw`An integral over parameters weighted by belief: Chapter 6 (and 9 for the regression case).` },
            { t: '(c) Low-dimensional subspace — linear algebra', d: String.raw`This is exactly PCA (Chapter 10), which is the eigendecomposition of a covariance matrix (Chapter 4) of data stored as a matrix (Chapter 2).` },
            { t: '(d) Backpropagation — calculus', d: String.raw`The multivariate chain rule applied systematically (Chapter 5). Every deep-learning framework is a chain-rule engine.` },
            { t: '(e) Conjugate posterior — probability', d: String.raw`Bayes' rule with a prior chosen so the posterior stays in the same family (Chapter 6, Beta–Bernoulli and Gaussian cases).` }
          ],
          answer: String.raw`You can already route any ML phrase to its math home: (a) calculus/linear algebra, (b) probability, (c) linear algebra, (d) calculus, (e) probability. Keeping this reflex is the point of the whole course.`
        }
      }
    ],
    cheatsheet: [
      { n: 'The pipeline', t: String.raw`$$\mathcal{D} \to f_{\boldsymbol{\theta}} \to L \to \arg\min_{\boldsymbol{\theta}} \tfrac{1}{n}\textstyle\sum_i L(y_i, f_{\boldsymbol{\theta}}(\boldsymbol{x}_i))$$` },
      { n: 'Data matrix', t: String.raw`$$\boldsymbol{X} \in \mathbb{R}^{n\times d}:\; \text{rows} = \text{examples},\; \text{cols} = \text{features}$$` },
      { n: 'Linear model', t: String.raw`$$\hat{\boldsymbol{y}} = \boldsymbol{X}\boldsymbol{\theta} + \boldsymbol{b}$$` },
      { n: 'Division of labor', t: String.raw`$$\text{linear algebra: model}\quad \text{probability: data}\quad \text{calculus: improvement}$$` }
    ],
    practice: [
      {
        q: String.raw`A tiny dataset: \((x, y) = (0, 1), (1, 3), (2, 3)\). Model \(\hat{y} = \theta x\), squared loss \(\frac{1}{2}\sum_i(\theta x_i - y_i)^2\). By hand, find the \(\theta\) minimizing the loss.`,
        diff: 'easy',
        s: [
          String.raw`Write \(R(\theta) = \tfrac{1}{2}\big[(0\theta - 1)^2 + (\theta - 3)^2 + (2\theta - 3)^2\big] = \tfrac{1}{2}\big[1 + \theta^2 - 6\theta + 9 + 4\theta^2 - 12\theta + 9\big] = \tfrac{5}{2}\theta^2 - 9\theta + \tfrac{19}{2}\).`,
          String.raw`Set the derivative to zero: \(5\theta - 9 = 0 \Rightarrow \theta = \tfrac{9}{5} = 1.8\).`,
          String.raw`Sanity check: the best slope should sit "between" the per-point ideal slopes (\(\infty\) for the first point, \(3\), \(1.5\)) — 1.8 is plausible.`
        ],
        fin: String.raw`\(\theta^{\star} = 1.8\), with \(R(1.8) = \tfrac{5}{2}(3.24) - 16.2 + 9.5 = 0.4\).`
      },
      {
        q: String.raw`Compute, by hand, \(\boldsymbol{A}\boldsymbol{B}\) and \(\boldsymbol{B}\boldsymbol{A}\) for $$\boldsymbol{A} = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}, \quad \boldsymbol{B} = \begin{pmatrix} 1 & 0 \\ 3 & 1 \end{pmatrix}$$ What do you conclude about matrix multiplication?`,
        diff: 'easy',
        s: [
          String.raw`\(\boldsymbol{A}\boldsymbol{B}\): row 1 of \(A\) · col 1 of \(B\) = \(1\cdot 1 + 2\cdot 3 = 7\); row 1 · col 2 = \(1\cdot 0 + 2 \cdot 1 = 2\); row 2 · col 1 = \(0 \cdot 1 + 1 \cdot 3 = 3\); row 2 · col 2 = \(1\). So \(\boldsymbol{A}\boldsymbol{B} = \begin{pmatrix} 7 & 2 \\ 3 & 1\end{pmatrix}\).`,
          String.raw`\(\boldsymbol{B}\boldsymbol{A}\): \(=\begin{pmatrix} 1 & 2 \\ 6 & 7 \end{pmatrix}\). Different!`
        ],
        fin: String.raw`\(\boldsymbol{A}\boldsymbol{B} \ne \boldsymbol{B}\boldsymbol{A}\): matrix multiplication is <b>not commutative</b> (order matters — as it does for "rotate then flip" vs "flip then rotate").`
      },
      {
        q: String.raw`Your dataset has \(n = 500\) examples and \(d = 20\) features. State the shapes of \(\boldsymbol{X}\), \(\boldsymbol{\theta}\), \(\hat{\boldsymbol{y}} = \boldsymbol{X}\boldsymbol{\theta}\), and of the "design matrix with bias" \(\boldsymbol{X}' = [\boldsymbol{1}, \boldsymbol{X}]\) together with the new \(\boldsymbol{\theta}'\).`,
        diff: 'easy',
        s: [
          String.raw`\(\boldsymbol{X} \in \mathbb{R}^{500 \times 20}\), \(\boldsymbol{\theta} \in \mathbb{R}^{20}\), \(\hat{\boldsymbol{y}} \in \mathbb{R}^{500}\).`,
          String.raw`Appending a column of ones gives \(\boldsymbol{X}' \in \mathbb{R}^{500 \times 21}\) and \(\boldsymbol{\theta}' \in \mathbb{R}^{21}\) — the extra parameter plays the role of the bias/intercept, so \(\hat{\boldsymbol{y}} = \boldsymbol{X}\boldsymbol{\theta} + b\mathbf{1} = \boldsymbol{X}'\boldsymbol{\theta}'\).`
        ],
        fin: String.raw`Shapes: \(500{\times}20\), \(20\), \(500\); with bias: \(500{\times}21\), \(21\). The "ones trick" turns an affine model into a purely linear one.`
      },
      {
        q: String.raw`A one-knob model \(\hat{y} = \theta x\) with squared loss on data \((1,1), (2,1)\): show that \(R(\theta) = \tfrac{1}{2}\big[(\theta-1)^2 + (2\theta-1)^2\big]\) has minimum at \(\theta = 3/5\), and compute the minimum loss.`,
        diff: 'med',
        s: [
          String.raw`Expand: \(R(\theta) = \tfrac12\big[\theta^2 - 2\theta + 1 + 4\theta^2 - 4\theta + 1\big] = \tfrac52\theta^2 - 3\theta + 1\).`,
          String.raw`\(\frac{dR}{d\theta} = 5\theta - 3 = 0 \Rightarrow \theta = \tfrac35\).`,
          String.raw`\(R(\tfrac35) = \tfrac52 \cdot \tfrac{9}{25} - \tfrac95 + 1 = \tfrac{9}{10} - \tfrac{9}{5} + 1 = \tfrac{1}{10}\).`
        ],
        fin: String.raw`\(\theta^\star = 0.6\), minimum loss \(\tfrac{1}{10}\). (You will re-derive this in Chapter 9 with normal equations and get the same answer by a more systematic route.)`
      },
      {
        q: String.raw`Consider the two models (i) \(\hat{y} = \theta_0 + \theta_1 x\) and (ii) a neural network with 1 hidden layer of width \(H\) and weights \(\boldsymbol{W}_1 \in \mathbb{R}^{H\times d}, \boldsymbol{W}_2 \in \mathbb{R}^{1 \times H}\). For \(d=3\), state how many knobs (\(\boldsymbol{\theta}\)-entries) each model has, and which chapters' mathematics describes: (a) the forward pass of (ii), (b) improving the knobs.`,
        diff: 'med',
        s: [
          String.raw`(i) has 2 knobs. (ii) has \(H \cdot 3 + H\) (hidden layer + biases) \(+ 1 \cdot H + 1\) (output layer + bias) \(= 4H + 1\) knobs (ignoring the input bias terms for simplicity, or \(5H+1\) if you count hidden biases separately).`,
          String.raw`(a) the forward pass is matrix products + a nonlinearity: Chapter 2 (products), Chapter 3 (inner products/norms appear in why it works), Chapter 5 (derivatives).`,
          String.raw`(b) improving knobs = gradient-based optimization: Chapters 5 and 7.`
        ],
        fin: String.raw`Model size = parameter count; forward pass = linear algebra; training = calculus. The whole course in one exercise.`
      }
    ],
    widget: null
  });
})();
