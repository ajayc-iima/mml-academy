/* Exam Gym — CIS 5200 (UPenn) Spring 2026 Practice Final, fully worked */
(function () {
  MML.exam = {
    course: 'CIS 5200 · Machine Learning (University of Pennsylvania)',
    title: 'Exam Gym: Spring 2026 Practice Final, fully worked',
    intro: String.raw`All 15 questions of the official practice final — 13 short (4 pts each) and 2 long (9 pts each) — solved step by step in the same attempt-then-reveal style as the rest of this app. Every problem is tagged with the chapter of this course that contains the underlying theory, so a miss tells you exactly what to restudy.`,
    meta: String.raw`<b>150 minutes · 70 points</b> — 13 short questions (4 pts) + 2 long questions (9 pts).`,
    focus: [
      String.raw`Emphasis is on the <b>latter third</b> of the course: neural networks, automatic differentiation, clustering &amp; GMMs, PCA, sampling, and generative models.`,
      String.raw`Rule of thumb: short questions want 2–4 lines; long questions want reasoning written out. Attempt on paper <em>before</em> revealing.`
    ],
    source: 'https://machine-learning-upenn.github.io/calendar/',
    pdf: 'cis5200-practice-final.pdf',
    homeworks: [
      ['HW 0', 'Jan 12', 'Jan 20'],
      ['HW 1', 'Jan 23', 'Feb 3'],
      ['HW 2', 'Feb 6', 'Feb 17'],
      ['Midterm', '—', 'Feb 23'],
      ['HW 3', 'Mar 19', 'Apr 1'],
      ['HW 4 (written)', 'Apr 4', 'Apr 14'],
      ['HW 4 (programming)', 'Apr 9', 'Apr 19'],
      ['HW 5', 'Apr 17', 'Apr 26'],
      ['Practice final', '—', 'this page']
    ],
    problems: [
      {
        n: 1, pts: 4, topic: 'Automatic differentiation', chapter: 'ch5', diff: 'med',
        q: String.raw`A feed-forward net has scalar loss \(L(\boldsymbol{\theta})\) with \(10^8\) parameters. A minibatch \(B\) is sampled uniformly from \(m\) examples. (a) T/F: one <b>forward-mode</b> AD pass computes \(\nabla_{\boldsymbol{\theta}}L\) for all parameters at the cost of one forward evaluation. (b) T/F: one <b>reverse-mode</b> pass from the scalar loss computes all parameter gradients. (c) Is the minibatch gradient \(\frac{1}{|B|}\sum_{i \in B}\nabla_{\boldsymbol{\theta}}\ell(f_{\boldsymbol{\theta}}(\boldsymbol{x}_i), y_i)\) an unbiased estimator of the full gradient? (d) For a residual block \(h(\boldsymbol{x}) = \boldsymbol{x} + g(\boldsymbol{x})\), why do gradients still flow to \(\boldsymbol{x}\) even if \(g\)'s Jacobian is tiny?`,
        s: [
          String.raw`**(a) False.** One forward-mode pass computes a directional derivative \(\nabla L \cdot \boldsymbol{v}\) for one direction \(\boldsymbol{v}\). To assemble the full gradient of \(10^8\) parameters you would need one pass <em>per parameter</em> — \(10^8\) passes. Forward-mode is for few inputs, many outputs.`,
          String.raw`**(b) True.** Reverse-mode propagates one adjoint (from the scalar loss) backward through the graph, obtaining every \(\partial L/\partial\theta_i\) in a single pass at a small constant factor (~2–3×) of forward cost. This is backpropagation.`,
          String.raw`**(c) Yes — unbiased.** Uniform minibatch sampling gives \(\mathbb{E}_{B}\big[\tfrac{1}{|B|}\sum_{i \in B}\nabla\ell_i\big] = \tfrac{1}{m}\sum_{i=1}^m \nabla\ell_i\): each example appears with equal probability, so the expectation of the average is exactly the full-data average. (Its <em>variance</em> is nonzero — that is the SGD noise.)`,
          String.raw`**(d)** \(\frac{\partial h}{\partial \boldsymbol{x}} = I + \frac{\partial g}{\partial \boldsymbol{x}}\): the skip adds the <b>identity</b> to the Jacobian. Even when \(\partial g/\partial\boldsymbol{x} \approx 0\), gradients pass through the \(I\) term — the mathematical reason residual connections cure vanishing gradients.`
        ],
        fin: String.raw`(a) False · (b) True · (c) Yes, unbiased · (d) \(\bar{\boldsymbol{x}}\) path includes \(+I\): \(I + \partial g/\partial\boldsymbol{x}\).`
      },
      {
        n: 2, pts: 4, topic: 'Backprop through a residual block', chapter: 'ch5', diff: 'med',
        q: String.raw`Block: \(\boldsymbol{z} = \boldsymbol{W}\boldsymbol{x}+\boldsymbol{b}\), ReLU, output \(\boldsymbol{u}\); skip connection adds \(\boldsymbol{x}\): \(\boldsymbol{h} = \boldsymbol{u} + \boldsymbol{x}\); then scalar loss \(L\). Given upstream \(\bar{\boldsymbol{h}} = \partial L/\partial\boldsymbol{h} = \begin{pmatrix}2\\-1\end{pmatrix}\) and pre-activation \(\boldsymbol{z} = \begin{pmatrix}3\\-2\end{pmatrix}\): (a) find \(\bar{\boldsymbol{u}}\); (b) find \(\bar{\boldsymbol{z}}\); (c) what does the skip contribute directly to \(\bar{\boldsymbol{x}}\)? (d) Which AD mode is preferred for training a \(10^6\)-parameter net with scalar loss, and what phenomenon shows test error need not immediately worsen past the interpolation threshold?`,
        s: [
          String.raw`**(a)** Addition routes the gradient through unchanged: \(\bar{\boldsymbol{u}} = \bar{\boldsymbol{h}} = \begin{pmatrix}2\\-1\end{pmatrix}\).`,
          String.raw`**(b)** ReLU gate: \(\bar{\boldsymbol{z}} = \bar{\boldsymbol{u}} \odot \mathbb{1}\{\boldsymbol{z} \gt 0\} = \begin{pmatrix}2\\-1\end{pmatrix} \odot \begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}2\\0\end{pmatrix}\) (the negative coordinate is gated off).`,
          String.raw`**(c)** The skip \(\boldsymbol{h} = \boldsymbol{u} + \boldsymbol{x}\) contributes exactly \(+\bar{\boldsymbol{h}} = \begin{pmatrix}2\\-1\end{pmatrix}\) to \(\bar{\boldsymbol{x}}\) (further terms arrive through \(\boldsymbol{W}\)).`,
          String.raw`**(d)** Reverse-mode AD (one pass = all gradients). The phenomenon is <b>double descent</b>: past the interpolation threshold test error can dip again instead of monotonically growing.`
        ],
        fin: String.raw`\(\bar{\boldsymbol{u}} = (2,-1)^\top\), \(\bar{\boldsymbol{z}} = (2, 0)^\top\), skip gives \(+\bar{\boldsymbol{h}}\); reverse-mode, double descent.`
      },
      {
        n: 3, pts: 4, topic: 'k-means / Lloyd\u2019s algorithm', chapter: 'ch11', diff: 'med',
        q: String.raw`Lloyd's algorithm with \(k = 2\) on the 1-D data \(\{-4, -3, -2, 2, 3, 4\}\), initial centroids \(\mu_1 = -4\), \(\mu_2 = -3\). (a) First assignment step? (b) First centroid update? (c) Why is this initialization poor, and what idea does \(k\)-means++ use to fix it? (d) Why would choosing \(k\) by minimizing the \(k\)-means objective always pick \(k = n\)?`,
        s: [
          String.raw`**(a)** Nearest-centroid assignment: \(-4 \to \mu_1\) (distance 0 vs 1); every other point is closer to \(-3\): cluster 2 \(= \{-3, -2, 2, 3, 4\}\), cluster 1 \(= \{-4\}\).`,
          String.raw`**(b)** Means of the clusters: \(\mu_1 = -4\) (unchanged), \(\mu_2 = \frac{-3 - 2 + 2 + 3 + 4}{5} = \frac{4}{5} = 0.8\).`,
          String.raw`**(c)** Both seeds landed inside the <b>left</b> blob, so the algorithm's local optimum splits the left cluster and swallows the right one — a bad stationary point it can never escape (Lloyd only descends). \(k\)-means++ seeds each new center with probability \(\propto D(\boldsymbol{x})^2\) (squared distance to the nearest chosen center), deliberately flinging seeds into distant, uncovered regions.`,
          String.raw`**(d)** The within-cluster SSE is non-increasing in \(k\) — you can always keep old centers and add one — and at \(k = n\) every point is its own cluster: SSE \(= 0\). Hence the raw objective is minimized at \(k = n\); in practice one uses the elbow method, silhouette, or downstream validation instead.`
        ],
        fin: String.raw`(a) \(\{{-4}\}\) vs \(\{-3,-2,2,3,4\}\); (b) \(\mu = (-4,\, 0.8)\); (c) seeds stuck in one blob — \(k\)-means++ seeds \(\propto D^2\); (d) SSE \(\searrow\) to 0 as \(k \to n\).`
      },
      {
        n: 4, pts: 4, topic: 'k-means initialization sensitivity', chapter: 'ch11', diff: 'med',
        q: String.raw`\(k\)-means with \(k=2\) on a 2-D blob dataset with four candidate seeds \(A, B, C, D\) marked (in the printed figure, \(A, B\) are the horizontally separated pair and \(C, D\) the vertically separated pair). (a) Which pair most likely ends in a <b>left/right</b> split? (b) Which pair most likely ends in a <b>top/bottom</b> split? (c) Why can both clusterings arise from the same data? (d) How does \(k\)-means++ reduce this sensitivity?`,
        s: [
          String.raw`**(a)** The pair with one seed inside each left/right half — in the figure, \(\{A, B\}\): each half already owns a centroid, and Lloyd's assignment sharpens exactly that split.`,
          String.raw`**(b)** The vertically separated pair — \(\{C, D\}\): both seeds sit in the same horizontal band but in different vertical halves, so assignment/update iterations lock into the top/bottom partition.`,
          String.raw`**(c)** Lloyd's algorithm is a <b>local</b> optimizer: it only decreases the k-means objective, and the objective has many local minima. Two different seeds are two different starting basins; each converges to a different stationary clustering (both "locally optimal", one may be globally better).`,
          String.raw`**(d)** \(k\)-means++ chooses seeds one by one with probability proportional to the <em>squared distance</em> from the already-chosen centers. The second seed is therefore pushed away from the first — into a genuinely different region — which makes the "both seeds in one blob" failure mode exponentially unlikely. (Multiple random restarts are the complementary fix.)`
        ],
        fin: String.raw`(a) \(\{A,B\}\) → left/right; (b) \(\{C,D\}\) → top/bottom; (c) local optima of a non-convex objective; (d) \(D^2\)-weighted seeding pushes seeds apart.`
      },
      {
        n: 5, pts: 4, topic: 'GMM E- and M-steps', chapter: 'ch11', diff: 'easy',
        q: String.raw`\(K = 3\) GMM; for one point, unnormalized E-step scores \((s_1, s_2, s_3) = (0.12,\, 0.03,\, 0.15)\) with \(s_j = \pi_j \mathcal{N}(\boldsymbol{x}_i \mid \boldsymbol{\mu}_j, \boldsymbol{\Sigma}_j)\), \(p_{ij} = s_j / (s_1 + s_2 + s_3)\). (a) Compute \((p_{i1}, p_{i2}, p_{i3})\). (b) Write the M-step update for \(\boldsymbol{\mu}_j\). (c) If \(p_{ij} \approx 0\) for every \(i\), what happens to \(\pi_j\)? (d) As \(\boldsymbol{\Sigma}_j = \sigma^2 I\) with \(\sigma \to 0\), what familiar algorithm does the GMM become?`,
        s: [
          String.raw`**(a)** Sum \(= 0.12 + 0.03 + 0.15 = 0.30\). $$\boldsymbol{p}_i = \left(\tfrac{0.12}{0.30},\; \tfrac{0.03}{0.30},\; \tfrac{0.15}{0.30}\right) = (0.4,\; 0.1,\; 0.5)$$`,
          String.raw`**(b)** Responsibility-weighted mean: $$\boldsymbol{\mu}_j = \frac{\sum_{i=1}^n p_{ij}\, \boldsymbol{x}_i}{\sum_{i=1}^n p_{ij}}$$`,
          String.raw`**(c)** The mixing weight is the total soft mass: \(\pi_j = \frac{1}{n}\sum_i p_{ij} \to 0\): the component <b>dies</b> (owning no data, it is re-initialized or removed in practice).`,
          String.raw`**(d)** With tiny shared spherical covariances the responsibilities concentrate on the single nearest center — soft assignment collapses to hard assignment: <b>k-means</b>.`
        ],
        fin: String.raw`(a) \((0.4, 0.1, 0.5)\); (b) \(\boldsymbol{\mu}_j = \sum_i p_{ij}\boldsymbol{x}_i / \sum_i p_{ij}\); (c) \(\pi_j \to 0\); (d) k-means.`
      },
      {
        n: 6, pts: 4, topic: 'GMM responsibilities (with figure)', chapter: 'ch11', diff: 'easy',
        q: String.raw`Two-component 1-D GMM with densities \(\pi_1\mathcal{N}(x \mid \mu_1, \sigma^2)\), \(\pi_2\mathcal{N}(x \mid \mu_2, \sigma^2)\); for the marked point \(x^\star\), the scores are \(\pi_1\mathcal{N}(x^\star \mid \mu_1, \sigma^2) = 0.18\) and \(\pi_2\mathcal{N}(x^\star \mid \mu_2, \sigma^2) = 0.06\). (a) Posterior probabilities for each component? (b) M-step update for \(\mu_j\) on a dataset? (c) If \(p_{ij} \approx 0\) for all \(i\) for some \(j\), what happens to \(\pi_j\)? (d) What does EM for GMMs resemble in the small-variance limit?`,
        s: [
          String.raw`**(a)** Evidence \(= 0.18 + 0.06 = 0.24\). $$p(z^\star = 1 \mid x^\star) = \tfrac{0.18}{0.24} = 0.75, \qquad p(z^\star = 2 \mid x^\star) = 0.25$$ (Bayes: likelihoods × priors, normalized.)`,
          String.raw`**(b)** Same as any GMM: \(\mu_j = \sum_i p_{ij}\, x_i \,\big/\, \sum_i p_{ij}\) — the responsibility-weighted sample mean.`,
          String.raw`**(c)** \(\pi_j = \tfrac1n \sum_i p_{ij} \approx 0\): the component's mixing weight vanishes.`,
          String.raw`**(d)** As \(\sigma^2 \to 0\) (shared spherical), responsibilities become 0/1 indicators of the nearest mean: hard assignment — <b>k-means</b> (Lloyd's algorithm).`
        ],
        fin: String.raw`(a) \(0.75\) / \(0.25\); (b) weighted mean; (c) \(\pi_j \to 0\); (d) k-means.`
      },
      {
        n: 7, pts: 4, topic: 'PCA: variance and reconstruction', chapter: 'ch10', diff: 'med',
        q: String.raw`Centered data with \(S = \tfrac1n X^\top X\) having eigenvalues \(\lambda_1 = 12, \lambda_2 = 3, \lambda_3 = 3, \lambda_4 = 2\); PCA to \(d = 2\). (a) Which directions are kept — and is the answer unique? (b) Fraction of variance explained? (c) Average squared reconstruction error of the best 2-D reconstruction? (d) Why standardize when one feature is in dollars and another is a binary indicator?`,
        s: [
          String.raw`**(a)** Keep the eigenvector for \(\lambda_1 = 12\) plus a unit eigenvector for \(\lambda = 3\). <b>Not unique:</b> \(\lambda_2 = \lambda_3 = 3\) is a repeated eigenvalue, so its eigenspace is 2-dimensional — <em>any</em> orthonormal vector in that plane is an equally good second PC (only the plane is determined, not the axis).`,
          String.raw`**(b)** $$\frac{\lambda_1 + \lambda_2}{\sum_j \lambda_j} = \frac{12 + 3}{12 + 3 + 3 + 2} = \frac{15}{20} = 75\%$$`,
          String.raw`**(c)** The dropped eigenvalues are exactly the per-point error: $$\tfrac1n\sum_i \|\tilde{\boldsymbol{x}}_i - \hat{\boldsymbol{x}}_i\|^2 = \lambda_3 + \lambda_4 = 3 + 2 = 5$$`,
          String.raw`**(d)** PCA maximizes <em>variance</em>, which has units. A dollar-denominated feature can have variance in the millions while the indicator's variance is \(\le 0.25\) — PC1 would just track the dollar feature regardless of correlation structure. Standardizing (zero mean, unit variance) makes the principal components reflect <em>relationships</em>, not measurement units.`
        ],
        fin: String.raw`(a) \(\lambda{=}12\) axis + any axis of the \(\lambda{=}3\) plane — not unique; (b) 75%; (c) 5; (d) PCA is scale-sensitive — unit-variance features make it unit-fair.`
      },
      {
        n: 8, pts: 4, topic: 'PCA on 2-D data (with figure)', chapter: 'ch10', diff: 'easy',
        q: String.raw`A centered 2-D cloud with two candidate directions \(\boldsymbol{u}, \boldsymbol{v}\) (in the printed figure \(\boldsymbol{u}\) lies along the cloud's long axis, \(\boldsymbol{v}\) across it). Covariance eigenvalues: \(\lambda_1 = 9\), \(\lambda_2 = 1\). (a) Which is the first PC and why? (b) Variance fraction kept by the best 1-D representation? (c) Average squared reconstruction error of that representation? (d) Why standardize features first?`,
        s: [
          String.raw`**(a)** The first PC is the eigenvector with the <b>largest</b> eigenvalue, here \(\lambda = 9\) — the cloud's long axis, i.e. \(\boldsymbol{u}\). Projected variance equals the eigenvalue: \(\boldsymbol{u}^\top S \boldsymbol{u} = 9 \gt 1 = \boldsymbol{v}^\top S \boldsymbol{v}\).`,
          String.raw`**(b)** $$\frac{9}{9 + 1} = 90\%$$`,
          String.raw`**(c)** The dropped direction's eigenvalue: average squared error \(= \lambda_2 = 1\).`,
          String.raw`**(d)** Same scale-sensitivity as before: if one feature has huge units, the "long axis" may just be that unit, not real correlation. Standardization makes both features vote equally.`
        ],
        fin: String.raw`(a) \(\boldsymbol{u}\) (eigenvalue 9); (b) 90%; (c) 1; (d) unit-variance scaling removes unit bias.`
      },
      {
        n: 9, pts: 4, topic: 'Rejection sampling in high dimension', chapter: 'ch6', diff: 'hard',
        q: String.raw`Target \(p = \mathcal{N}(\boldsymbol{0}, I_D)\), proposal \(q = \mathcal{N}(\boldsymbol{0}, 4 I_D)\), rejection constant \(c = \max_{\boldsymbol{x}} p(\boldsymbol{x})/q(\boldsymbol{x})\). (a) Compute \(c\) as a function of \(D\). (b) For \(D = 5\), the acceptance probability? (c) What does this illustrate about rejection sampling in high dimensions? (d) For importance sampling with proposal \(q\): what support condition is needed, and what goes wrong if \(q(\boldsymbol{x})\) is tiny where \(f(\boldsymbol{x})p(\boldsymbol{x})\) matters?`,
        s: [
          String.raw`**(a)** The ratio is constant × exponential: $$\frac{p(\boldsymbol{x})}{q(\boldsymbol{x})} = \frac{(2\pi)^{-D/2} e^{-\|\boldsymbol{x}\|^2/2}}{(2\pi \cdot 4)^{-D/2} e^{-\|\boldsymbol{x}\|^2/8}} = 2^{D}\, e^{-\frac{3}{8}\|\boldsymbol{x}\|^2}$$ maximized at \(\boldsymbol{x} = \boldsymbol{0}\): \(c = 2^D\).`,
          String.raw`**(b)** Acceptance probability \(= \frac{1}{c} = 2^{-5} = \tfrac{1}{32} \approx 3.1\%\) — about 32 proposals per accepted sample.`,
          String.raw`**(c)** The <b>curse of dimensionality</b>: acceptance decays exponentially (\(2^{-D}\)). In high dimension the wider proposal wastes almost all its mass in the thin shell where \(p\) is essentially zero — rejection sampling dies exponentially fast.`,
          String.raw`**(d)** Importance sampling needs \(q \gt 0\) wherever \(\big|f(\boldsymbol{x})\big| p(\boldsymbol{x}) \gt 0\) (support condition). If \(q\) is tiny where the integrand is large, weights \(f p / q\) are enormous and rare — the estimator stays unbiased but its <b>variance explodes</b>: estimates are dominated by a handful of lucky draws.`
        ],
        fin: String.raw`(a) \(c = 2^D\); (b) \(1/32 \approx 3.1\%\); (c) acceptance \(= 2^{-D}\): exponential death; (d) \(q\) must dominate the integrand's support — else weight variance explodes.`
      },
      {
        n: 10, pts: 4, topic: 'Rejection sampling: tight envelope', chapter: 'ch6', diff: 'med',
        q: String.raw`Target \(p(x) = 1 - |x|\) for \(|x| \le 1\) (normalized tent), zero otherwise. Proposal: \(q = \mathrm{Uniform}(a, b)\). (a) Which \(a, b\) maximize acceptance? (b) Smallest valid \(c\)? (c) Resulting acceptance probability? (d) What general issue does this preview as dimension grows?`,
        s: [
          String.raw`**(a)** Match the support exactly: \(a = -1\), \(b = 1\). Any wider interval adds proposal mass only where \(p = 0\) (guaranteed rejections) and thins the density where it matters.`,
          String.raw`**(b)** \(q(x) = \tfrac{1}{2}\) on \([-1,1]\), so \(p/q = 2(1 - |x|)\), maximized at \(x = 0\): $$c = 2 \cdot (1 - 0) = 2$$ (envelope \(c\,q(x) = 1 \ge p(x)\) touches the tent's peak ✓).`,
          String.raw`**(c)** $$P(\text{accept}) = \int q(x)\, \frac{p(x)}{c\, q(x)} dx = \frac{1}{c}\int_{-1}^{1} p(x)\,dx = \frac{1}{2 \cdot 1} = 50\%$$ (since \(p\) is normalized).`,
          String.raw`**(d)** In \(D\) dimensions, matching a support with a simple proposal gets geometrically harder and the acceptance probability shrinks like the volume ratio — the same exponential curse as Q9: rejection sampling is a low-dimensional tool.`
        ],
        fin: String.raw`(a) \(a = -1, b = 1\); (b) \(c = 2\); (c) \(1/2\); (d) acceptance collapses with dimension.`
      },
      {
        n: 11, pts: 4, topic: 'Autoencoders → VAEs', chapter: 'ch11', diff: 'hard',
        q: String.raw`A deterministic autoencoder \(D(E(\boldsymbol{x}))\) is trained to tiny reconstruction error. A student generates by sampling \(\boldsymbol{z} \sim \mathcal{N}(\boldsymbol{0}, I)\) and outputting \(D(\boldsymbol{z})\). (a) Why is that not automatically a generative model? (b) Write the VAE ELBO for one data point. (c) State the reparameterization trick for \(q_\phi(\boldsymbol{z}|\boldsymbol{x}) = \mathcal{N}(\boldsymbol{\mu}_\phi(\boldsymbol{x}), \sigma^2_\phi(\boldsymbol{x}) I)\). (d) Why does the KL term make prior sampling + decoding meaningful after training?`,
        s: [
          String.raw`**(a)** The decoder was only ever evaluated on the codes \(E(\boldsymbol{x})\) of training data — an unknown, probably tiny manifold of the code space. A Gaussian draw \(\boldsymbol{z}\) lands almost surely <em>off</em> that manifold, where \(D\)'s behavior was never trained and can be arbitrary garbage. Nothing defines a density over \(\boldsymbol{x}\) either — so it is neither a sampler nor a model of \(p(\boldsymbol{x})\).`,
          String.raw`**(b)** $$\log p_\theta(\boldsymbol{x}) \;\ge\; \underbrace{\mathbb{E}_{q_\phi(\boldsymbol{z}|\boldsymbol{x})}\big[\log p_\theta(\boldsymbol{x} \mid \boldsymbol{z})\big]}_{\text{reconstruction}} \;-\; \underbrace{\mathrm{KL}\big(q_\phi(\boldsymbol{z} \mid \boldsymbol{x}) \,\|\, p(\boldsymbol{z})\big)}_{\text{regularizer to prior}}$$`,
          String.raw`**(c)** Draw \(\boldsymbol{\varepsilon} \sim \mathcal{N}(\boldsymbol{0}, I)\) externally and set $$\boldsymbol{z} = \boldsymbol{\mu}_\phi(\boldsymbol{x}) + \sigma_\phi(\boldsymbol{x}) \odot \boldsymbol{\varepsilon}$$ The randomness leaves the computation graph, so \(\boldsymbol{z}\) is a deterministic, differentiable function of \((\phi, \boldsymbol{\varepsilon})\) — gradients flow into the encoder.`,
          String.raw`**(d)** The KL pulls every \(q_\phi(\boldsymbol{z}|\boldsymbol{x})\) toward \(\mathcal{N}(\boldsymbol{0}, I)\); collectively the aggregate posterior fills the prior's support in a smooth, "code-like" arrangement. So after training, a prior sample \(\boldsymbol{z} \sim \mathcal{N}(\boldsymbol{0}, I)\) lies in a region the decoder has actually seen — decoding it produces plausible, diverse samples instead of off-manifold noise.`
        ],
        fin: String.raw`(a) off-manifold codes + no density; (b) ELBO = reconstruction − KL; (c) \(\boldsymbol{z} = \boldsymbol{\mu}_\phi + \sigma_\phi \odot \boldsymbol{\varepsilon}\); (d) KL matches codes to the prior so prior samples decode meaningfully.`
      },
      {
        n: 12, pts: 4, topic: 'Autoregressive models vs GANs', chapter: 'ch8', diff: 'med',
        q: String.raw`An autoregressive model gives \(p(x_1) = 0.2\), \(p(x_2 \mid x_1) = 0.5\), \(p(x_3 \mid x_1, x_2) = 0.1\). (a) Compute the sequence probability and its natural-log NLL. (b) Write the general factorization of \(p(x_1, \dots, x_T)\). (c) Why does maximum-likelihood training decompose into next-token prediction? (d) Does a basic GAN provide a normalized likelihood \(p_\theta(\boldsymbol{x})\) for a test point? Name one failure mode.`,
        s: [
          String.raw`**(a)** $$p = 0.2 \times 0.5 \times 0.1 = 0.01, \qquad \mathrm{NLL} = -\ln 0.01 = \ln 100 \approx 4.605 \text{ nats}$$`,
          String.raw`**(b)** Chain rule of probability: $$p(x_1, \dots, x_T) = \prod_{t=1}^{T} p(x_t \mid x_{\lt t})$$`,
          String.raw`**(c)** Take \(-\log\) of the factorization: $$\mathrm{NLL} = -\sum_{t=1}^{T} \log p(x_t \mid x_{\lt t})$$ — a <b>sum</b> of per-position cross-entropies. Maximizing likelihood therefore splits into independent next-token prediction problems, each supervised by the actual next token: exactly how LLMs train.`,
          String.raw`**(d)** No. A GAN is an <em>implicit</em> model: you can sample, but there is no tractable normalized \(p_\theta(\boldsymbol{x})\) to evaluate — only the discriminator's uncalibrated realness score. Classic failure modes: <b>mode collapse</b> (generator covers few modes), training instability of the minimax game, vanishing gradients.`
        ],
        fin: String.raw`(a) \(0.01\), NLL \(= \ln 100 \approx 4.605\); (b) \(\prod_t p(x_t \mid x_{\lt t})\); (c) log turns products into per-token sums; (d) no normalized likelihood — mode collapse.`
      },
      {
        n: 13, pts: 4, topic: 'Diffusion models', chapter: 'ch6', diff: 'hard',
        q: String.raw`Forward process: \(x_t = \sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1 - \bar{\alpha}_t}\, \boldsymbol{\epsilon}\), \(\boldsymbol{\epsilon} \sim \mathcal{N}(\boldsymbol{0}, I)\); a network learns \(\boldsymbol{\epsilon}_\theta(x_t, t)\). (a) Solve for the true noise \(\boldsymbol{\epsilon}\) in terms of \(x_t, x_0, \bar{\alpha}_t\). (b) Given \(\boldsymbol{\epsilon}_\theta\), write the estimate \(\hat{x}_0\). (c) Why must the network take \(t\) as input? (d) Why generate via many small denoising steps rather than one learned map from pure noise to a clean sample?`,
        s: [
          String.raw`**(a)** Rearrange: $$\boldsymbol{\epsilon} = \frac{x_t - \sqrt{\bar{\alpha}_t}\, x_0}{\sqrt{1 - \bar{\alpha}_t}}$$`,
          String.raw`**(b)** Substitute the network's noise guess and solve for \(x_0\): $$\hat{x}_0 = \frac{x_t - \sqrt{1 - \bar{\alpha}_t}\; \boldsymbol{\epsilon}_\theta(x_t, t)}{\sqrt{\bar{\alpha}_t}}$$`,
          String.raw`**(c)** The noise level is different at every \(t\): the same pixel statistics \(x_t\) could come from different \(t\) with completely different implied \(\boldsymbol{\epsilon}\). Without \(t\) (or an equivalent signal), the map \(x_t \mapsto \boldsymbol{\epsilon}\) is ambiguous — \(t\) tells the network which correction scale (\(\sqrt{1-\bar\alpha_t}\)) applies.`,
          String.raw`**(d)** Mapping pure noise \(\to\) a clean, highly multimodal data distribution in one step is an extremely hard global function to learn. Iterative small steps make each sub-problem nearly local (slightly denoise, re-estimate \(\hat{x}_0\), correct course), the training objective exactly mirrors the known forward process, and errors can be repaired at the next step — the composition of many easy steps gives the fidelity that one giant leap cannot.`
        ],
        fin: String.raw`(a) \(\boldsymbol{\epsilon} = (x_t - \sqrt{\bar\alpha_t}x_0)/\sqrt{1-\bar\alpha_t}\); (b) \(\hat{x}_0 = (x_t - \sqrt{1-\bar\alpha_t}\,\boldsymbol{\epsilon}_\theta)/\sqrt{\bar\alpha_t}\); (c) \(t\) disambiguates the noise level; (d) many easy local steps beat one impossible global map.`
      },
      {
        n: '2.1', pts: 9, topic: 'Long: reverse-mode autodiff through a residual block', chapter: 'ch5', diff: 'hard', long: true,
        q: String.raw`Block: \(\boldsymbol{z} = W\boldsymbol{x}\), \(\boldsymbol{u} = \mathrm{ReLU}(\boldsymbol{z})\), \(\boldsymbol{h} = \boldsymbol{x} + a\,\boldsymbol{u}\), \(L = \tfrac12\|\boldsymbol{h} - \boldsymbol{y}\|^2\), with \(W = \begin{pmatrix}2 & 0\\ 0 & 1\end{pmatrix}\), \(\boldsymbol{x} = \begin{pmatrix}1\\-2\end{pmatrix}\), \(\boldsymbol{y} = \begin{pmatrix}3\\-1\end{pmatrix}\), \(a = \tfrac12\). (a) Compute \(\boldsymbol{z}, \boldsymbol{u}, \boldsymbol{h}, L\). (b) Compute adjoints \(\bar{\boldsymbol{u}}, \bar{\boldsymbol{z}}, \bar{a}, \bar{W}, \bar{\boldsymbol{x}}\) (remember \(\boldsymbol{x}\) affects \(L\) via <b>both</b> the residual path and \(W\boldsymbol{x}\)). (c) General formulas using the mask \(\boldsymbol{m} = \mathbb{1}\{\boldsymbol{z} \gt 0\}\). (d) Why reverse-mode over forward-mode, and why minibatch SGD over full-batch?`,
        s: [
          String.raw`**(a) Forward pass.** $$\boldsymbol{z} = W\boldsymbol{x} = \begin{pmatrix} 2\cdot 1 + 0 \\ 0 + 1\cdot(-2) \end{pmatrix} = \begin{pmatrix}2\\-2\end{pmatrix}, \qquad \boldsymbol{u} = \mathrm{ReLU}(\boldsymbol{z}) = \begin{pmatrix}2\\0\end{pmatrix}$$ $$\boldsymbol{h} = \boldsymbol{x} + a\,\boldsymbol{u} = \begin{pmatrix}1\\-2\end{pmatrix} + \tfrac12\begin{pmatrix}2\\0\end{pmatrix} = \begin{pmatrix}2\\-2\end{pmatrix}, \qquad L = \tfrac12\left\|\begin{pmatrix}-1\\-1\end{pmatrix}\right\|^2 = 1$$`,
          String.raw`**(b) Backward pass.** Start from the loss: \(\bar{\boldsymbol{h}} = \boldsymbol{h} - \boldsymbol{y} = \begin{pmatrix}-1\\-1\end{pmatrix}\). $$\bar{\boldsymbol{u}} = a\,\bar{\boldsymbol{h}} = \begin{pmatrix}-0.5\\-0.5\end{pmatrix}, \qquad \bar{\boldsymbol{z}} = \bar{\boldsymbol{u}} \odot \mathbb{1}\{\boldsymbol{z} \gt 0\} = \begin{pmatrix}-0.5\\0\end{pmatrix}$$ $$\bar{a} = \bar{\boldsymbol{h}}^\top \boldsymbol{u} = (-1)(2) + (-1)(0) = -2$$ $$\bar{W} = \bar{\boldsymbol{z}}\, \boldsymbol{x}^\top = \begin{pmatrix}-0.5\\0\end{pmatrix}\begin{pmatrix}1 & -2\end{pmatrix} = \begin{pmatrix}-0.5 & 1\\ 0 & 0\end{pmatrix}$$ Both paths into \(\boldsymbol{x}\): $$\bar{\boldsymbol{x}} = \underbrace{\bar{\boldsymbol{h}}}_{\text{residual}} + \underbrace{W^\top \bar{\boldsymbol{z}}}_{\text{through } W} = \begin{pmatrix}-1\\-1\end{pmatrix} + \begin{pmatrix}-1\\0\end{pmatrix} = \begin{pmatrix}-2\\-1\end{pmatrix}$$`,
          String.raw`**(c) General formulas.** With \(\bar{\boldsymbol{u}} = a\,\bar{\boldsymbol{h}}\) and mask \(\boldsymbol{m}\): $$\bar{a} = \bar{\boldsymbol{h}}^\top \boldsymbol{u}, \qquad \bar{W} = \big(\boldsymbol{m} \odot \bar{\boldsymbol{u}}\big)\, \boldsymbol{x}^\top, \qquad \bar{\boldsymbol{x}} = \bar{\boldsymbol{h}} + W^\top\big(\boldsymbol{m} \odot \bar{\boldsymbol{u}}\big)$$ (If \(b\) existed in \(\boldsymbol{z} = W\boldsymbol{x} + \boldsymbol{b}\): \(\bar{\boldsymbol{b}} = \boldsymbol{m} \odot \bar{\boldsymbol{u}}\).)`,
          String.raw`**(d)** Reverse-mode gives <em>all</em> \(10^6+\) parameter gradients in one backward pass at ~2–3× forward cost; forward-mode would need one pass <em>per parameter</em> to fill the gradient vector — hopeless for training (it shines for few inputs, e.g. sensitivities w.r.t. one \(\boldsymbol{x}\)). Minibatch SGD: the full gradient costs \(O(n)\) every step, while a batch of size \(B\) gives an <b>unbiased</b> estimate at \(O(B)\) cost — far more parameter progress per unit compute, with the gradient noise as a bonus (helps escape saddles, mild regularization).`
        ],
        fin: String.raw`(a) \(\boldsymbol{z} = (2,-2)^\top\), \(\boldsymbol{u} = (2,0)^\top\), \(\boldsymbol{h} = (2,-2)^\top\), \(L = 1\); (b) \(\bar{\boldsymbol{u}} = (-\tfrac12, -\tfrac12)^\top\), \(\bar{\boldsymbol{z}} = (-\tfrac12, 0)^\top\), \(\bar{a} = -2\), \(\bar{W} = \begin{pmatrix}-0.5 & 1\\ 0 & 0\end{pmatrix}\), \(\bar{\boldsymbol{x}} = (-2, -1)^\top\); (c) \(\bar{W} = (\boldsymbol{m} \odot \bar{\boldsymbol{u}})\boldsymbol{x}^\top\) etc.; (d) one backward pass for all params; unbiased cheap gradient estimates.`
      },
      {
        n: '2.2', pts: 9, topic: 'Long: VAE, Monte Carlo ELBO', chapter: 'ch11', diff: 'hard', long: true,
        q: String.raw`1-D VAE: prior \(p(z) = \mathcal{N}(0,1)\), encoder \(q_\phi(z \mid x) = \mathcal{N}(\mu_\phi(x), \sigma^2_\phi(x))\), decoder \(p_\theta(x \mid z) = \mathcal{N}(d_\theta(z), 1)\). Data point \(x = 2\), encoder outputs \(\mu_\phi = 1\), \(\sigma_\phi = \tfrac12\); MC noise samples \(\varepsilon_1 = 0\), \(\varepsilon_2 = 2\) with decoder means \(d_\theta(z_1) = 1.5\), \(d_\theta(z_2) = 2.5\). Ignore constants independent of \(\theta, \phi\). (a) Reparameterized \(z_1, z_2\)? (b) MC estimate of the reconstruction term? (c) \(\mathrm{KL}(q_\phi(z|x) \,\|\, p(z))\) using \(\tfrac12(\mu^2 + \sigma^2 - 1 - \log\sigma^2)\)? (d) The MC ELBO estimate? (e) Why is \(\log p_\theta(x)\) hard to estimate by prior sampling, and how do the encoder + KL help?`,
        s: [
          String.raw`**(a)** \(z = \mu_\phi + \sigma_\phi \varepsilon\): $$z_1 = 1 + \tfrac12 \cdot 0 = 1, \qquad z_2 = 1 + \tfrac12 \cdot 2 = 2$$`,
          String.raw`**(b)** \(\log p_\theta(x \mid z) = -\tfrac12 (x - d_\theta(z))^2 + \text{const}\). Per sample: \(-\tfrac12(2 - 1.5)^2 = -0.125\) and \(-\tfrac12(2 - 2.5)^2 = -0.125\). Average: $$\widehat{\mathbb{E}}_q[\log p_\theta(x \mid z)] = -0.125$$`,
          String.raw`**(c)** $$\mathrm{KL} = \tfrac12\left(\mu^2 + \sigma^2 - 1 - \log \sigma^2\right) = \tfrac12\left(1 + 0.25 - 1 - \log\tfrac14\right) = \tfrac12\left(0.25 + 1.3863\right) \approx 0.818$$`,
          String.raw`**(d)** ELBO \(\approx\) reconstruction − KL (constants dropped): $$\widehat{\mathrm{ELBO}} = -0.125 - 0.818 \approx -0.94$$`,
          String.raw`**(e)** \(\log p_\theta(x) = \log\int p_\theta(x \mid z) p(z) dz\) estimated with \(z \sim p(z)\) relies on the prior <em>by chance</em> drawing codes that decode near \(x\). In even moderate dimensions those codes have vanishing probability mass, so almost every draw returns \(p_\theta(x \mid z) \approx 0\) and the rare hit returns a huge value: unbiased but gigantic variance. The encoder \(q_\phi(z \mid x)\) concentrates samples exactly in the region that explains \(x\) (low-variance reconstruction estimate), and the KL keeps \(q_\phi\) close to the prior so that (i) the ELBO remains a valid bound and (ii) after training, prior samples \(z \sim p(z)\) fall where the decoder produces realistic data — making both training and generation practical.`
        ],
        fin: String.raw`(a) \(z = (1, 2)\); (b) \(-0.125\); (c) \(\approx 0.818\); (d) \(\widehat{\mathrm{ELBO}} \approx -0.94\); (e) prior sampling misses explaining codes — the encoder focuses samples, the KL anchors them to the prior.`
      }
    ]
  };
})();
