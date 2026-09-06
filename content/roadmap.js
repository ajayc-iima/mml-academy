/* Research Roadmap — pure mathematics for ML research */
(function () {
  MML.chapters.push({
    id: 'roadmap', num: '∞', icon: '🧭', special: 'roadmap',
    title: 'Research Roadmap: pure mathematics for ML',
    tagline: 'From this book to the research frontier — the mathematics to study, in what order, with the books to read and the ML questions each unlocks.',
    why: String.raw`The book you just finished gives the working mathematics of ML. <b>Research</b> demands more: proofs are expected, not optional; "converges" needs a theorem, not a training curve; probability needs measure theory; optimization needs rates. This roadmap sequences the pure-mathematics climb — roughly a PhD-student's first two years of coursework — and maps every subject to the ML research areas it unlocks. Work through the stages in order, but read them <em>alongside</em> papers so the abstractions stay attached to real questions.`,
    goals: [
      String.raw`Know the five mathematical subjects that carry modern ML theory, and the canonical book for each.`,
      String.raw`Build the proof-writing reflexes research assumes.`,
      String.raw`Map each subject to the open ML questions it currently powers.`
    ],
    concepts: [
      {
        id: 'stage0',
        title: 'Stage 0 — The proof toolkit: learning to think in theorems',
        intuition: String.raw`Pure mathematics is a different <em>activity</em>: not computing, but <b>proving</b>. Four habits carry you surprisingly far. (1) <b>Read definitions actively</b> — a definition is a contract; expand every symbol before using a theorem. (2) <b>Own the standard proof patterns</b>: direct, contrapositive, contradiction, induction, construction ("choose \(\varepsilon\), then find \(\delta\)"), and "prove it for simple cases first". (3) <b>Hunt for the extremal example</b>: after a theorem, ask what breaks without each hypothesis. (4) <b>Write full sentences</b> — a proof is prose with logic, and writing it clarifies it. Start every subject by proving its first three theorems yourself, book closed.`,
        math: [
          { h: 'The patterns, formally', t: String.raw`$$\text{direct: } P \Rightarrow Q \quad \text{contrapositive: } \lnot Q \Rightarrow \lnot P \quad \text{contradiction: } P \wedge \lnot Q \Rightarrow \bot$$ $$\text{induction: } P(1) \wedge \big(P(n) \Rightarrow P(n{+}1)\big) \Rightarrow \forall n\, P(n)$$ $$\varepsilon\text{-}\delta\text{ template: } \forall \varepsilon \gt 0\; \exists \delta \gt 0: |x - a| \lt \delta \Rightarrow |f(x) - f(a)| \lt \varepsilon$$ In ML-flavored math, the most common patterns are: reduce to the symmetric/eigen case (Ch 4), Cauchy–Schwarz + triangle inequality estimates (Ch 3), and convexity arguments (Ch 7).` }
        ],
        ml: String.raw`Reading papers: theorems = claims, proofs = the argument you must be able to re-derive; lemmas = the load-bearing bricks. Reproducing a paper's <em>theory</em> (re-derive its main theorem) is a recognized research skill — and a common interview exercise at research labs.`,
        byhand: {
          problem: String.raw`Prove: if \(f: \mathbb{R}^n \to \mathbb{R}\) is convex and \(\boldsymbol{x}^\star\) is a <em>local</em> minimum, then \(\boldsymbol{x}^\star\) is a <em>global</em> minimum. (A genuinely useful theorem — it certifies Chapter 7's claims.)`,
          steps: [
            { t: 'Set up by contradiction', d: String.raw`Suppose not: there is \(\boldsymbol{y}\) with \(f(\boldsymbol{y}) \lt f(\boldsymbol{x}^\star)\). We will build points arbitrarily close to \(\boldsymbol{x}^\star\) that are better — contradicting local minimality.` },
            { t: 'Convexify toward y', d: String.raw`For \(t \in (0, 1)\), convexity gives: $$f\big((1-t)\boldsymbol{x}^\star + t\boldsymbol{y}\big) \;\le\; (1-t)f(\boldsymbol{x}^\star) + t f(\boldsymbol{y})$$` },
            { t: 'Rearrange into a strict improvement', d: String.raw`$$= f(\boldsymbol{x}^\star) + t\big[f(\boldsymbol{y}) - f(\boldsymbol{x}^\star)\big] \;\lt\; f(\boldsymbol{x}^\star)$$ since the bracket is negative and \(t \gt 0\).` },
            { t: 'Close the contradiction', d: String.raw`As \(t \to 0\), the point \((1-t)\boldsymbol{x}^\star + t\boldsymbol{y} \to \boldsymbol{x}^\star\): we found strictly better points in every neighborhood of \(\boldsymbol{x}^\star\) — impossible for a local minimum. ∎` }
          ],
          answer: String.raw`A convex function cannot have a "fake" local minimum: any better point pulls the whole segment down toward \(\boldsymbol{x}^\star\). This pattern — contradict local optimality via convex combinations — reappears throughout optimization theory.`
        }
      },
      {
        id: 'stage1',
        title: 'Stage 1 — Real analysis: the language of limits',
        subtitle: 'Abbott, <em>Understanding Analysis</em> → Rudin, <em>Principles</em>',
        intuition: String.raw`Analysis rebuilds calculus on solid ground: what does "\(\varepsilon \to 0\)" really mean, when do sequences converge, what makes a set "compact", why do continuous functions on compact sets attain maxima? This is the bedrock under every convergence claim in ML — gradients vanishing, iterates converging, bounds holding uniformly. The pivotal concept is <b>compactness</b>: it converts "approximate" statements into "exact" ones (a continuous function on a compact set actually <em>attains</em> its minimum — the existence half of every optimization theorem).`,
        math: [
          { h: 'Core syllabus', t: String.raw`Sequences and limits; completeness (\(\mathbb{R}\) has no holes); open/closed/compact sets; continuity and uniform continuity; Bolzano–Weierstrass; Heine–Borel; series and uniform convergence; differentiation theorems (mean value); Riemann integration. $$\text{compact} \;\Rightarrow\; \text{every sequence has a convergent subsequence; continuous } f \text{ attains } \min, \max$$` },
          { h: 'The ML-critical theorems', t: String.raw`Extreme value theorem (loss minima exist on compact sets); Weierstrass approximation (polynomials/nets can approximate continuous functions — the theoretical root of universal approximation); dominated convergence (measure theory stage, but its proofs are analysis).` }
        ],
        ml: String.raw`Optimization convergence proofs (Ch 7's guarantees formalized), universal approximation theorems for neural networks, existence of optimal solutions/estimators, and all of the asymptotic statistics used for "as \(n \to \infty\)" claims.`,
        links: ['ch7:c1']
      },
      {
        id: 'stage2',
        title: 'Stage 2 — Advanced linear algebra & random matrix theory',
        subtitle: 'Axler, <em>Linear Algebra Done Right</em> → Horn & Johnson; Vershynin, <em>High-Dimensional Probability</em>',
        intuition: String.raw`Two escalations. First: linear algebra done <em>coordinate-free</em> — vector spaces, linear operators, spectral theory, singular values as an intrinsic quantity — the machinery behind every decomposition and the operator-norm viewpoint research uses. Second: when the matrices are <b>random</b> (as data matrices are), their spectra obey laws of their own: the largest singular value concentrates, bulk spectra converge to deterministic shapes (Marchenko–Pastur), and "blessing of dimensionality" phenomena appear. Random matrix theory is the microscope through which the field currently examines deep networks.`,
        math: [
          { h: 'Coordinate-free core', t: String.raw`Vector spaces and quotients; adjoints; spectral theorem for self-adjoint operators; singular values \(\sigma_1 \ge \dots\); operator norms \(\|\boldsymbol{A}\| = \sigma_1\); Schur/QR/SVD as canonical forms; Löwner order \(\boldsymbol{A} \succeq \boldsymbol{B}\) and matrix convexity.` },
          { h: 'High-dimensional tools', t: String.raw`Concentration of measure; sub-Gaussian/sub-exponential variables; \(\|\boldsymbol{A}\| \lesssim \sqrt{m} + \sqrt{n}\) for random Gaussian \(\boldsymbol{A} \in \mathbb{R}^{m\times n}\); Marchenko–Pastur law; covariance estimation \((n \gtrsim d \log d)\); Johnson–Lindenstrauss (random projections preserve geometry!).` }
        ],
        ml: String.raw`Neural tangent kernels and the spectra of empirical Hessians; why over-parameterized models generalize (implicit regularization as low-rank bias); sketching and randomized numerical linear algebra; compressed sensing; theory of initialization ("spectral initialization" in matrix completion). If a modern theory paper has matrices and randomness, this is its toolkit.`,
        links: ['ch4:c5', 'ch10:c3']
      },
      {
        id: 'stage3',
        title: 'Stage 3 — Measure-theoretic probability & statistics',
        subtitle: 'Williams, <em>Probability with Martingales</em> → Durrett; Casella–Berger → Van der Vaart',
        intuition: String.raw`Undergraduate probability computes; graduate probability <b>proves</b>. Measure theory gives probability its rigorous foundation: expectations are integrals, conditional expectation is a projection (a Hilbert-space object!), and the great convergence theorems — law of large numbers, central limit theorem, martingale convergence, uniform integrability — become precise. This stage converts "the loss converges" from an empirical observation into a theorem, and enables the modern theory of estimation (consistency, asymptotic normality, minimax rates).`,
        math: [
          { h: 'Core syllabus', t: String.raw`Probability spaces (\(\sigma\)-algebras — the formal answer to "what is an event"); expectation as Lebesgue integral; \(L^p\) spaces; independence and product measures; conditional expectation \(E[X \mid \mathcal{G}]\); modes of convergence (a.s., \(L^p\), in probability, in distribution) and their relations; LLN and CLT; martingales and optional stopping; uniform integrability.` },
          { h: 'Statistics layer', t: String.raw`Decision theory (risk, admissibility — formalizes Ch 8); exponential families and sufficiency; consistency, asymptotic normality (M-estimators); Cramér–Rao and minimax lower bounds; hypothesis testing; empirical processes (Glivenko–Cantelli, Donsker).` }
        ],
        ml: String.raw`Statistical learning theory (generalization bounds need uniform laws of large numbers); theory of SGD as a stochastic approximation / Markov chain; Bayesian nonparametrics; diffusion-model theory (score matching, denoising as statistical estimation); double descent and benign overfitting analyses are all measure-flavored.`,
        links: ['ch6:c1', 'ch8:c2']
      },
      {
        id: 'stage4',
        title: 'Stage 4 — Learning theory & convex optimization',
        subtitle: 'Shalev-Shwartz & Ben-David → Bartlett–Bousquet papers; Boyd–Vandenberghe → Nocedal–Wright → Bubeck',
        intuition: String.raw`Now aim the machinery squarely at learning. <b>Learning theory</b> asks: when does low training error imply low future error? Answers come as uniform-convergence arguments over model classes: VC dimension, Rademacher complexity, margins — quantifying "capacity" precisely (the bias–variance intuition of Chapter 8 made into theorems). <b>Optimization theory</b> asks: at what <em>rate</em> can we minimize? Gradient descent \(O(1/k)\), strongly convex \(O(\kappa^{-1}\log)\) — linear algebra (Ch 4) reappearing as convergence rates; plus the whole duality/subgradient toolkit for non-smooth objectives.`,
        math: [
          { h: 'Learning theory core', t: String.raw`PAC framework; empirical/process uniform convergence; VC dimension and Sauer's lemma; Rademacher complexity; margin bounds; regularization and stability; minimax theory. $$R(f) \;\le\; \hat{R}_n(f) + \mathcal{O}\!\left(\sqrt{\tfrac{\text{complexity}}{n}}\right)$$` },
          { h: 'Optimization core', t: String.raw`Convex analysis (subgradients, Fenchel duality — the general duality beyond Ch 7); first-order methods and rates; strong convexity and condition numbers; acceleration (Nesterov — momentum with a proof); non-convex landscape results (saddles, PL condition).` }
        ],
        ml: String.raw`This <em>is</em> ML theory: generalization of SVMs via margins; why over-parameterized deep nets generalize (a live puzzle this toolbox attacks); convergence rates of SGD/Adam variants; minimax-optimality of estimators; adversarial robustness certificates.`,
        links: ['ch7:c5', 'ch8:c3']
      },
      {
        id: 'stage5',
        title: 'Stage 5 — Functional analysis, kernels, and geometry',
        subtitle: 'Steinwart & Christmann, <em>SVM</em>; Berlinet & Audrart; Amari; Lee, <em>Smooth Manifolds</em>',
        intuition: String.raw`Three connected subjects. <b>Functional analysis</b>: infinite-dimensional vector spaces where "vectors" are functions — Hilbert spaces, orthonormal bases of functions, bounded operators. The punchline for ML is the <b>representer theorem</b>: many infinite-dimensional optimization problems have solutions expressible via finitely many kernel evaluations (Chapter 12's kernel trick, made into a theorem), and RKHS theory makes "a kernel is a similarity with a geometry" exact. <b>Information geometry</b>: distributions form a manifold with the Fisher metric; natural gradient descent follows it. <b>Differential geometry</b>: the language of modern geometric deep learning (equivariance, symmetries) and of optimization on manifolds.`,
        math: [
          { h: 'Hilbert spaces and RKHS', t: String.raw`Complete inner-product spaces; projections = conditional expectations (linking Stages 3 and 5!); orthonormal bases (\( \ell_2, L^2 \)); reproducing kernels: a positive-definite \(k\) defines a Hilbert space \(\mathcal{H}_k\) of functions with \(f(\boldsymbol{x}) = \langle f, k(\boldsymbol{x}, \cdot)\rangle\). Representer theorem: $$\min_{f \in \mathcal{H}_k} \sum_i L(y_i, f(\boldsymbol{x}_i)) + \Omega(\|f\|) \;\Rightarrow\; f^\star = \sum_i \alpha_i k(\boldsymbol{x}_i, \cdot)$$` },
          { h: 'Geometry layer', t: String.raw`Fisher information metric \(g_{ij} = E[\partial_i \log p \, \partial_j \log p]\); natural gradient \(\tilde{\nabla} = \boldsymbol{F}^{-1}\nabla\); manifolds of probability distributions; symmetry/group actions and equivariant networks.` }
        ],
        ml: String.raw`Kernel methods\u2019 complete theory; Gaussian processes as RKHS objects; natural gradient = K-FAC/Adam relatives in deep learning; geometric deep learning (graphs, gauge equivariance); information geometry of exponential families; mean-field analyses of wide networks use \(L^2\) function-space views.`,
        links: ['ch3:c5', 'ch12:c3']
      },
      {
        id: 'stage6',
        title: 'Stage 6 — The live research frontier (a map, not a syllabus)',
        subtitle: 'where the open problems are, as of the mid-2020s',
        intuition: String.raw`Research areas are conversations, not subjects. A sampling of what is <em>currently</em> being argued, each leaning on the stages above: <b>Why do deep networks generalize?</b> (double descent, benign overfitting, implicit bias of SGD — Stages 2–4). <b>Optimization dynamics</b>: NTK and mean-field limits, edge of stability (Stages 2, 4). <b>Generative model theory</b>: diffusion as score matching, flow matching, GANs as minimax games (Stages 3, 5). <b>Alignment and RLHF theory</b>: reward models, KL control, preference learning as statistical estimation (Stage 3). <b>Causality</b>: from correlation to intervention (Pearl's hierarchy). <b>Mechanistic interpretability</b>: reverse-engineering learned circuits — part math, part neuroscience. Pick a conversation, read its last two years of papers, and find the smallest open question you can actually settle.`,
        math: [
          { h: 'How to enter a conversation', t: String.raw`$$\text{survey/review} \;\to\; \text{3–5 landmark papers (prove their main theorems)} \;\to\; \text{arXiv listings} \;\to\; \text{one open question}$$ Verify a candidate question is (a) open, (b) decidable with your current tools, (c) interesting to someone else — then write the 2-page note.` }
        ],
        ml: String.raw`Canonical entry papers to hunt for: the NTK paper (Jacot et al.), double descent (Belkin et al.), benign overfitting (Bartlett et al.), diffusion/score matching (Ho, Song et al.), neural tangent kernel feature learning, grokking analyses. Each has a "math core" you can isolate and attack with the stages above.`,
        links: ['ch11:c4']
      }
    ],
    cheatsheet: [
      { n: 'The pipeline to research', t: String.raw`$$\text{this book} \to \text{analysis + probability} \to \text{learning theory + optimization} \to \text{specialize (kernels / geometry / RMT)} \to \text{a conversation, then a question}$$` },
      { n: 'Canonical books', t: String.raw`$$\text{Abbott} \to \text{Axler} \to \text{Williams/Durrett} \to \text{SSBD + Boyd} \to \text{Vershynin} \to \text{Steinwart–Christmann / Amari}$$` },
      { n: 'Proof habits', t: String.raw`$$\text{definitions first, patterns always, extremal examples, write it in prose}$$` }
    ],
    practice: [
      {
        q: String.raw`Prove the Cauchy–Schwarz inequality \(|\boldsymbol{x}^\top\boldsymbol{y}| \le \|\boldsymbol{x}\|\|\boldsymbol{y}\|\) from scratch (no peeking at Chapter 3), then name where it was load-bearing in this course.`,
        diff: 'hard',
        s: [
          String.raw`For \(\boldsymbol{y} = \boldsymbol{0}\) it is trivial; otherwise consider \(g(t) = \|\boldsymbol{x} - t\boldsymbol{y}\|^2 \ge 0\) for all real \(t\).`,
          String.raw`Expand: \(g(t) = \|\boldsymbol{x}\|^2 - 2t\,\boldsymbol{x}^\top\boldsymbol{y} + t^2\|\boldsymbol{y}\|^2\) — a parabola in \(t\) that is never negative, so its discriminant is \(\le 0\): \(4(\boldsymbol{x}^\top\boldsymbol{y})^2 - 4\|\boldsymbol{x}\|^2\|\boldsymbol{y}\|^2 \le 0\). ∎`,
          String.raw`Load-bearing appearances: the angle formula (Ch 3), the derivation of the optimal projection, convergence-rate estimates in Ch 7, and margin bounds in Ch 12.`
        ],
        fin: String.raw`Discriminant of a nonnegative quadratic — the two-line proof that quietly supports half of applied mathematics.`
      },
      {
        q: String.raw`State precisely, then prove: the composition of two linear maps is linear, and its matrix (w.r.t. fixed bases) is the product of the matrices. Where does this fail for <em>affine</em> maps, and what is the fix (homogeneous coordinates)?`,
        diff: 'med',
        s: [
          String.raw`Let \(S, T\) be linear. \((S\circ T)(\boldsymbol{x} + \boldsymbol{y}) = S(T\boldsymbol{x} + T\boldsymbol{y}) = S T\boldsymbol{x} + S T\boldsymbol{y}\) and similarly for scaling ⟹ linear; matrix form: \([S\circ T] = [S][T]\) by evaluating on basis vectors.`,
          String.raw`Affine maps \(A\boldsymbol{x} + \boldsymbol{b}\): compositions mix translations and lose the pure-multiplicative structure (\(A_2(A_1\boldsymbol{x} + b_1) + b_2\)).`,
          String.raw`Fix: embed in \(\mathbb{R}^{n+1}\) with a trailing 1: \(\begin{pmatrix} A & \boldsymbol{b} \\ \boldsymbol{0} & 1 \end{pmatrix}\) — affine maps become matrix products (this is how graphics engines and robot kinematics compose transforms).`
        ],
        fin: String.raw`Linear maps compose multiplicatively; affine maps do too — once you add one homogeneous coordinate. Structure-preserving encodings are a recurring research trick.`
      },
      {
        q: String.raw`Pick one stage above. Write, from memory, its five core definitions, then find the weakest one — the definition you "kind of" know. Re-read only that one, and prove one theorem using it. This drill, repeated weekly, is how researchers maintain foundations.`,
        diff: 'easy',
        s: [
          String.raw`Example (Stage 3): probability space; \(\sigma\)-algebra; expectation as integral; conditional expectation; independence.`,
          String.raw`Common weakest: conditional expectation — it is defined by two properties (measurability w.r.t. \(\mathcal{G}\), and matching integrals over \(\mathcal{G}\)-sets), not by a formula.`,
          String.raw`Theorem to prove with it: \(E[E[X \mid \mathcal{G}]] = E[X]\) (tower property) — two lines from the definition with \(\mathcal{G} = \{\emptyset, \Omega\}\)-style test sets.`
        ],
        fin: String.raw`Foundations are maintained by active retrieval + repair, not by re-reading. The app's "mastered" checkboxes are this drill, automated.`
      }
    ]
  });
})();
