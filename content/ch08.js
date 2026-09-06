/* Chapter 8 — When Models Meet Data */
(function () {
  MML.chapters.push({
    id: 'ch8', num: 8, icon: '🔗',
    title: 'When Models Meet Data',
    tagline: 'The bridge: empirical risk minimization, loss functions, overfitting — how all the mathematics becomes a learning system.',
    why: String.raw`You now own the whole toolbox: algebra for models, calculus for improvement, probability for uncertainty, optimization for search. This chapter assembles them into the <b>machine-learning workflow</b>: how data becomes risk, how risk becomes an objective, how objectives are regularized, and how we honestly measure whether a model <em>generalizes</em>. It is short on formulas and long on judgment — the judgment that separates people who run models from people who understand them.`,
    goals: [
      String.raw`State the ERM principle and compute empirical risk for a tiny dataset.`,
      String.raw`Know the standard losses and what each one optimizes for.`,
      String.raw`Diagnose overfitting/underfitting and apply the train/validation/test discipline.`,
      String.raw`See MLE and MAP as special cases of the ERM worldview.`
    ],
    widget: null,
    concepts: [
      {
        id: 'c1',
        title: 'Tasks, and three ways to build a model',
        subtitle: 'supervised · generative · discriminative',
        intuition: String.raw`Two families of tasks: <b>supervised</b> (each example comes with a label: predict the label) and <b>unsupervised</b> (no labels: find structure — clusters, low-dimensional summaries, densities). Within supervised learning, two traditions: <b>generative</b> modeling — learn how the data itself is produced, \(p(\boldsymbol{x}, y)\), then invert with Bayes; and <b>discriminative</b> modeling — skip the story and learn the decision boundary \(p(y \mid \boldsymbol{x})\) directly. Generative models can imagine new data but are harder; discriminative models are usually more accurate per unit of effort. Modern ML mostly discriminates — until diffusion models brought generation back.`,
        math: [
          { h: 'The three routes to a classifier', t: String.raw`$$\text{(a) feature-based: } \boldsymbol{x} \xrightarrow{\ \phi\ } \phi(\boldsymbol{x}) \xrightarrow{\ \text{simple model}\ } y \qquad \text{(b) generative: } p(\boldsymbol{x}, y) \xrightarrow{\ \text{Bayes}\ } p(y \mid \boldsymbol{x})$$ $$\text{(c) discriminative: } \boldsymbol{x} \xrightarrow{\ \boldsymbol{\theta}\ } p(y \mid \boldsymbol{x}, \boldsymbol{\theta})$$ Deep learning blurs (a) and (c): learned features \(\phi\) = early layers.` },
          { h: 'The union of both worlds', t: String.raw`$$p(y \mid \boldsymbol{x}) = \frac{p(\boldsymbol{x} \mid y)\, p(y)}{p(\boldsymbol{x})}$$ — Bayes connects the traditions; neither is "correct", they factor the same joint differently.` }
        ],
        ml: String.raw`GMM clustering (Ch 11) is generative; SVM (Ch 12) discriminative; linear regression (Ch 9) has both readings (conditional fit vs Gaussian-noise likelihood). Diffusion and LLMs are generative; every "head" attached to an encoder is discriminative.`,
        byhand: {
          problem: String.raw`Classify each system as (a) feature-engineered, (b) generative, or (c) discriminative: (i) GMM clustering of customers; (ii) logistic regression on raw pixels; (iii) a spam filter hand-built on word counts + naive Bayes; (iv) a CNN classifier; (v) a diffusion model generating images.`,
          steps: [
            { t: '(i)', d: String.raw`Generative: GMM models the joint density \(p(\boldsymbol{x}) = \sum_k \pi_k \mathcal{N}(\boldsymbol{x}; \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)\) and clusters by responsibilities (Ch 11).` },
            { t: '(ii)', d: String.raw`Discriminative: logistic regression models \(p(y \mid \boldsymbol{x})\) directly.` },
            { t: '(iii)', d: String.raw`Feature-engineered + generative: hand-crafted features (word counts) feeding a generative model \(p(y)\,p(\boldsymbol{x}\mid y)\).` },
            { t: '(iv)', d: String.raw`Discriminative with learned features: the conv layers are a learned \(\phi\).` },
            { t: '(v)', d: String.raw`Generative: it models \(p(\boldsymbol{x})\) and can sample from it.` }
          ],
          answer: String.raw`(i) b, (ii) c, (iii) a+b, (iv) c with learned \(\phi\), (v) b. Most modern systems are (c) with learned features; generation is having its renaissance.`
        }
      },
      {
        id: 'c2',
        title: 'Empirical risk minimization and loss functions',
        subtitle: '"learning" = minimizing average pain',
        intuition: String.raw`The <b>risk</b> of a model is its expected loss on the data distribution — unknowable in practice. The <b>empirical risk</b> is its measurable stand-in: the average loss on your training set. <b>Learning = ERM</b>: choose the parameters minimizing empirical risk. Everything hinges on the loss: squared loss punishes big errors hard and targets the conditional mean; absolute error is outlier-tolerant and targets the median; cross-entropy targets probabilities and is the natural loss when outputs are class memberships.`,
        math: [
          { h: 'Risk and empirical risk', t: String.raw`$$R(f) = \mathbb{E}_{(\boldsymbol{x}, y) \sim p}\big[L(y, f(\boldsymbol{x}))\big] \qquad R_{\text{emp}}(f) = \frac{1}{n}\sum_{i=1}^n L(y_i, f(\boldsymbol{x}_i))$$ ERM: \(\hat{f} = \arg\min_f R_{\text{emp}}(f)\). (Statistical learning theory studies when \(R_{\text{emp}} \approx R\) — see the roadmap.)` },
          { h: 'The standard losses', t: String.raw`$$\text{squared: } (y - \hat{y})^2 \qquad \text{absolute: } |y - \hat{y}| \qquad \text{cross-entropy: } -\textstyle\sum_k y_k \log \hat{p}_k$$ $$\text{hinge (Ch 12): } \max(0, 1 - y\, s) \qquad \text{0–1 (the true goal, but unoptimizable directly)}$$` },
          { h: 'What each loss is optimal for', t: String.raw`Minimizing squared loss over the conditional distribution of \(y\) gives \(\mathbb{E}[y \mid \boldsymbol{x}]\); absolute loss gives the conditional <b>median</b>; cross-entropy with softmax gives calibrated class probabilities. The loss is a <em>statistical contract</em>, not an arbitrary choice.` }
        ],
        ml: String.raw`Cross-entropy is the workhorse (classification, language modeling, RL policy distillation). Squared loss drives regression and diffusion denoising objectives. Robust losses (Huber = squared near 0, absolute in tails) fight outliers. When your model misbehaves, the first question is often: <em>which risk am I actually minimizing, and is that the risk I care about?</em>`,
        byhand: {
          problem: String.raw`Model \(\hat{y} = \theta x\), dataset \(\{(1,2), (2,0), (3,1)\}\). (a) Compute the empirical risk \(R(\theta) = \tfrac12\sum_i (\theta x_i - y_i)^2\) and the ERM solution. (b) Evaluate \(R\) at your optimum and at \(\theta = 0.5\).`,
          steps: [
            { t: '(a) Expand the risk', d: String.raw`$$R(\theta) = \tfrac12\big[(\theta - 2)^2 + (2\theta)^2 + (3\theta - 1)^2\big] = \tfrac12\big[14\theta^2 - 10\theta + 5\big]$$` },
            { t: '(a) Minimize the parabola', d: String.raw`$$R'(\theta) = 14\theta - 5 = 0 \;\Rightarrow\; \theta^\star = \frac{5}{14} \approx 0.357$$ (General rule you can now recognize: \(\theta^\star = \frac{\sum x_i y_i}{\sum x_i^2}\) — here \(\frac{2 + 0 + 3}{1 + 4 + 9}\).)` },
            { t: '(b) Compare risks', d: String.raw`$$R(\tfrac{5}{14}) = \tfrac12\big[14\cdot\tfrac{25}{196} - 10\cdot\tfrac{5}{14} + 5\big] = \tfrac12\big[1.786 - 3.571 + 5\big] = 1.607$$ $$R(0.5) = \tfrac12\big[14(0.25) - 5 + 5\big] = 1.75$$ The ERM solution is genuinely better — and you can quantify by how much.` }
          ],
          answer: String.raw`\(\theta^\star = 5/14 \approx 0.357\), \(R_{\min} = 45/28 \approx 1.607\) vs \(1.75\) at \(\theta = 0.5\). ERM in action: write the risk, differentiate, solve.`
        }
      },
      {
        id: 'c3',
        title: 'Overfitting, generalization, and honest evaluation',
        subtitle: 'the train/test discipline and the bias–variance instinct',
        intuition: String.raw`A model can ace its training data by <b>memorizing</b> rather than learning — a degree-9 polynomial through 10 points has zero training error and nonsense in between. <b>Overfitting</b> = fitting noise. <b>Underfitting</b> = model too weak to capture the signal. The only protection is honesty: hold out data the model never sees (<b>test set</b>), and tune your choices on a third slice (<b>validation</b>). Generalization gap = test error − train error; the entire craft of ML is choosing model capacity so this gap stays small.`,
        math: [
          { h: 'The decomposition to keep in mind', t: String.raw`At a fixed test point \(\boldsymbol{x}\), with true function \(f\) and noise \(y = f(\boldsymbol{x}) + \varepsilon\), \(\mathbb{E}[\varepsilon^2] = \sigma^2\): $$\mathbb{E}\big[(y - \hat{f}(\boldsymbol{x}))^2\big] = \underbrace{\big(\mathbb{E}[\hat{f}(\boldsymbol{x})] - f(\boldsymbol{x})\big)^2}_{\text{Bias}^2\;(\text{too simple})} \;+\; \underbrace{\mathbb{E}\big[(\hat{f}(\boldsymbol{x}) - \mathbb{E}[\hat{f}(\boldsymbol{x})])^2\big]}_{\text{Variance}\;(\text{too flexible})} \;+\; \underbrace{\sigma^2}_{\text{irreducible noise}}$$ Note it is \(\text{Bias}^{\mathbf{2}}\) — the squared deviation of the <em>average model</em> from the truth. Capacity ↑: bias ↓, variance ↑. The sweet spot is an empirical question — found via validation.` },
          { h: 'Polynomial degree as capacity knob', t: String.raw`$$p_m(x) = \sum_{k=0}^{m} \theta_k x^k$$ \(m = 1\): underfits curves. \(m = n - 1\) for \(n\) points: interpolates exactly (zero training error, wild between points). \(m\) is your capacity dial; ridge \(\lambda\) (Ch 9) is the continuous version.` }
        ],
        ml: String.raw`Train/val/test splits, \(k\)-fold cross-validation, early stopping, dropout, weight decay, data augmentation — the whole regularized-training toolkit exists to manage this trade-off. Over-parameterized deep networks famously <em>do</em> reach zero training error and still generalize ("benign overfitting", double descent) — one of the hottest topics in learning theory, on the research roadmap.`,
        byhand: {
          problem: String.raw`Data: \((0, 0), (1, 1), (2, 0)\). (a) Fit the quadratic \(y = \theta_0 + \theta_1 x + \theta_2 x^2\) exactly. (b) Evaluate it at \(x = 0.5\) and \(x = 3\). (c) Compare with the best straight line. What do you conclude?`,
          steps: [
            { t: '(a) Use the three data points', d: String.raw`\(x = 0\): \(\theta_0 = 0\). \(x = 1\): \(\theta_1 + \theta_2 = 1\). \(x = 2\): \(2\theta_1 + 4\theta_2 = 0\).` },
            { t: '(a) Solve', d: String.raw`From the last: \(\theta_1 = -2\theta_2\); substitute: \(\theta_2 = 1\), \(\theta_1 = -2\). $$p(x) = -x^2 + 2x$$ Training error: exactly 0 — perfect memorization.` },
            { t: '(b) Probe between and beyond points', d: String.raw`\(p(0.5) = -0.25 + 1 = 0.75\); \(p(3) = -9 + 6 = -3\). Between points the curve bulges oddly; beyond them it plummets to nonsense (negative "y" forever).` },
            { t: '(c) The humble line', d: String.raw`Best line through the 3 points: \(\bar{x} = 1, \bar{y} = \tfrac13\), \(\sum xy = 0 + 1 + 0 = 2\), \(\sum x^2 = 5\). Slope \(= \frac{\sum xy - n\bar{x}\bar{y}}{\sum x^2 - n\bar{x}^2} = \frac{2 - 3\cdot 1\cdot \tfrac13}{5 - 3\cdot 1} = \frac{1}{2}\). Intercept \(= \bar{y} - \tfrac12\bar{x} = \tfrac13 - \tfrac12 = -\tfrac16\). Line: \(y = \tfrac12 x - \tfrac16\): imperfect on training data (\(R \approx 0.167\)) but sane everywhere (predicts \(y(3) = 1.33\), not \(-3\)).` }
          ],
          answer: String.raw`The quadratic memorizes (train error 0) and extrapolates to nonsense (\(y(3) = -3\)); the line errs slightly on training data but generalizes sanely. Zero training error is a warning sign, not a triumph.`
        }
      },
      {
        id: 'c4',
        title: 'Probabilistic modeling: likelihood, MAP, and the posterior predictive',
        subtitle: 'ERM\u2019s principled cousin',
        intuition: String.raw`The probabilistic route to "choose the model": write down how you believe the data was <b>generated</b> (a distribution with parameters), then fit by maximizing the likelihood of what actually appeared (MLE), possibly sharpened by a prior (MAP), and finally — if you are fully Bayesian — keep the entire posterior and predict by <b>averaging over it</b>. This costs more computation but buys calibrated uncertainty: "72% sure it is a cat, and here is the spread of plausible slopes" instead of a single overconfident number.`,
        math: [
          { h: 'The generative story and MLE', t: String.raw`$$y_i = f_{\boldsymbol{\theta}}(\boldsymbol{x}_i) + \varepsilon_i, \qquad \varepsilon_i \sim \mathcal{N}(0, \sigma^2) \;\Rightarrow\; p(\mathcal{D} \mid \boldsymbol{\theta}) = \prod_i \mathcal{N}(y_i; f_{\boldsymbol{\theta}}(\boldsymbol{x}_i), \sigma^2)$$ Maximizing the log-likelihood here is <b>equivalent to least squares</b> — the squared loss is a Gaussian noise assumption (proven in Ch 9).` },
          { h: 'MAP and the posterior predictive', t: String.raw`$$p(\boldsymbol{\theta} \mid \mathcal{D}) \propto p(\mathcal{D} \mid \boldsymbol{\theta})\, p(\boldsymbol{\theta}) \qquad p(y_\star \mid \boldsymbol{x}_\star, \mathcal{D}) = \int p(y_\star \mid \boldsymbol{x}_\star, \boldsymbol{\theta})\, p(\boldsymbol{\theta} \mid \mathcal{D})\, d\boldsymbol{\theta}$$ MAP = posterior's peak (a penalized MLE); the predictive integrates over the whole posterior — uncertainty in \(\boldsymbol{\theta}\) becomes uncertainty in predictions.` }
        ],
        ml: String.raw`This framing generates entire fields: Bayesian linear regression (Ch 9), Gaussian processes, Bayesian neural networks, and the variational methods behind VAEs. "Softmax + cross-entropy" training = MLE for a categorical model. If you remember one thing: <b>the loss encodes the noise model; the prior encodes the regularization</b>.`,
        byhand: {
          problem: String.raw`Four measurements of a constant: \(\{0, 1, 2, 10\}\). (a) Which single number minimizes squared error \(\sum_i (c - x_i)^2\)? (b) Which minimizes absolute error \(\sum_i |c - x_i|\)? (c) Interpret for loss design.`,
          steps: [
            { t: '(a) Squared loss → mean', d: String.raw`\(\frac{d}{dc}\sum (c - x_i)^2 = 2\sum(c - x_i) = 0 \Rightarrow c = \bar{x} = \frac{0+1+2+10}{4} = 3.25\).` },
            { t: '(b) Absolute loss → median', d: String.raw`\(|c - x_i|\) is piecewise linear; its minimizer is a point where equal numbers of data lie above and below: the median \(= \frac{1+2}{2} = 1.5\). (Between 1 and 2 the loss is flat; 1.5 is the canonical choice.)` },
            { t: '(c) Feel the outlier\u2019s pull', d: String.raw`One outlier (\(10\)) drags the mean from \(1.5\) to \(3.25\) — squared loss amplifies rare big errors; absolute loss barely notices. Same data, different "optimal constant", purely because of the loss geometry.` }
          ],
          answer: String.raw`Mean \(3.25\) (squared loss) vs median \(1.5\) (absolute loss). Loss choice = statement about which errors you fear; robustness is a property of the loss, not the model.`
        }
      }
    ],
    cheatsheet: [
      { n: 'ERM', t: String.raw`$$\hat{f} = \arg\min_f \frac{1}{n}\sum_i L(y_i, f(\boldsymbol{x}_i))$$` },
      { n: 'Losses', t: String.raw`$$(y - \hat{y})^2,\quad |y - \hat{y}|,\quad -\textstyle\sum y_k \log \hat{p}_k,\quad \max(0, 1 - ys)$$` },
      { n: 'Error decomposition', t: String.raw`$$\text{Expected test error} = \text{Bias}^2 + \text{Variance} + \sigma^2_{\text{noise}}$$` },
      { n: 'Bayesian trio', t: String.raw`$$\text{MLE: } \max_\theta p(\mathcal{D}\mid\theta); \quad \text{MAP: } \max_\theta p(\mathcal{D}\mid\theta)p(\theta); \quad \text{predictive: } \int p(y_\star\mid\theta)\,p(\theta\mid\mathcal{D})d\theta$$` }
    ],
    practice: [
      {
        q: String.raw`For data \(\{(1,1), (2,2), (3,4)\}\) and model \(\hat{y} = \theta x\): compute the ERM solution and the minimal empirical risk.`,
        diff: 'easy',
        s: [
          String.raw`\(\theta^\star = \frac{\sum x_i y_i}{\sum x_i^2} = \frac{1 + 4 + 12}{1 + 4 + 9} = \frac{17}{14} \approx 1.214\).`,
          String.raw`\(R_{\min} = \tfrac12\sum (\theta^\star x_i - y_i)^2\): residuals: \(\tfrac{17}{14} - 1 = \tfrac{3}{14}\); \(\tfrac{34}{14} - 2 = \tfrac{6}{14}\); \(\tfrac{51}{14} - 4 = -\tfrac{5}{14}\).`,
          String.raw`\(R_{\min} = \tfrac12\cdot\frac{9 + 36 + 25}{196} = \frac{35}{196} = \frac{5}{28} \approx 0.179\).`
        ],
        fin: String.raw`\(\theta^\star = 17/14\), \(R_{\min} = 5/28 \approx 0.179\).`
      },
      {
        q: String.raw`A 3-class classifier outputs probabilities \((0.7, 0.2, 0.1)\) for a sample whose true class is 1. (a) Compute the cross-entropy loss (natural log). (b) Recompute for prediction \((0.34, 0.33, 0.33)\). Which model is punished harder, and by roughly how much?`,
        diff: 'easy',
        s: [
          String.raw`(a) \(L = -\log 0.7 = 0.357\).`,
          String.raw`(b) \(L = -\log 0.34 = 1.079\).`,
          String.raw`The confident-but-wrong-ish \((0.34)\) model is punished \(3\times\) harder: cross-entropy's log makes low probability on the true class exponentially expensive.`
        ],
        fin: String.raw`0.357 vs 1.079. Cross-entropy converts "small predicted probability on the truth" into a large, differentiable penalty.`
      },
      {
        q: String.raw`You fit \(\hat{y} = \theta_0 + \theta_1 x\) on \(\{(0,0), (1,1), (2,1)\}\) (answer: \(y = \tfrac16 + \tfrac12 x\), from Chapter 9's worked example — verify the fit yourself by plugging in). A fourth point \((3, 3)\) arrives. Compute the model's prediction and absolute test error at \(x = 3\), and the training error it would have if included (squared, average).`,
        diff: 'med',
        s: [
          String.raw`Prediction: \(\hat{y}(3) = \tfrac16 + \tfrac32 = \tfrac53 \approx 1.667\); test error \(|3 - 1.667| = \tfrac43 \approx 1.33\).`,
          String.raw`Verification of the fit: residuals on training data: \(0 - \tfrac16 = -\tfrac16\); \(1 - \tfrac23 = \tfrac13\); \(1 - \tfrac76 = -\tfrac16\) — small and centered ✓ (squared, mean: \(\tfrac13( \tfrac1{36} + \tfrac49 + \tfrac1{36}) = \tfrac16\)).`,
          String.raw`If \((3,3)\) joins training, least squares refits — the new line will tilt upward; with only 4 points, one influential point can rotate the fit a lot (small \(n\), high variance).`
        ],
        fin: String.raw`Test error \(4/3\) at \(x = 3\). Held-out points are the only honest measure — training residuals knew nothing about this one.`
      },
      {
        q: String.raw`(Proof) Show that the constant \(c\) minimizing \(\sum_{i=1}^n (c - x_i)^2\) is the sample mean, and that the minimizer of \(\sum_i |c - x_i|\) is a median.`,
        diff: 'hard',
        s: [
          String.raw`Squared: \(\frac{d}{dc}\sum(c - x_i)^2 = 2\sum(c - x_i) = 2(nc - \sum x_i) = 0 \Rightarrow c = \bar{x}\) (second derivative \(2n \gt 0\) ⟹ minimum).`,
          String.raw`Absolute: \(F(c) = \sum |c - x_i|\) has derivative \(\sum \operatorname{sign}(c - x_i)\) where defined: negative when \(c\) is below most points, positive above. \(F\) decreases until \(c\) crosses the middle of the data and increases after — minimum at a median (any point between the two middle order statistics for even \(n\)). ∎`
        ],
        fin: String.raw`Mean minimizes squared loss; median minimizes absolute loss. Every loss has a "best summary statistic" — a fact used from robust statistics to quantile regression.`
      }
    ]
  });
})();
