/* DS5201 (Plaksha) course pack — part A: Quiz 1, Linear Algebra, Decompositions, Vector Calculus.
   Problems and solutions from the course's practice-problem sections, re-typeset.
   Two transcription fixes vs the source: 7.7-style normal-equations typos corrected in ds-sli. */
(function () {
  var tag = 'DS5201 · Mathematics & Statistics (Plaksha)';

  /* ==================== QUIZ 1 ==================== */
  MML.exam.sets.push({
    id: 'ds-quiz1', icon: '🏛️', mins: 60, tag: tag,
    title: 'DS5201 Quiz 1 (July 2026)',
    sub: '25 marks · 60 min · open book · linear algebra: skew-symmetry, subspaces, consistent systems, matrix identities, rank',
    problems: [
      {
        n: 'A1', pts: 2, topic: 'Skew-symmetric matrices', chapter: 'ch4', diff: 'med',
        q: String.raw`\(A\) is \(4\times4\) with \(A = -A^\top\). Which hold? (i) all diagonal entries are 0; (ii) \(\boldsymbol{x}^\top A\boldsymbol{x} = 0\) for every \(\boldsymbol{x}\).`,
        s: [
          String.raw`(i) \(a_{ii} = -a_{ii} \Rightarrow 2a_{ii} = 0 \Rightarrow a_{ii} = 0\) ✓.`,
          String.raw`(ii) \(c = \boldsymbol{x}^\top A\boldsymbol{x}\) is a scalar, so \(c = c^\top = \boldsymbol{x}^\top A^\top\boldsymbol{x} = -\boldsymbol{x}^\top A\boldsymbol{x} = -c \Rightarrow 2c = 0 \Rightarrow c = 0\) ✓.`
        ],
        fin: String.raw`B — both are true. (Skew-symmetric ⟺ \(\boldsymbol{x}^\top A\boldsymbol{x} = 0\) for all \(\boldsymbol{x}\).)`
      },
      {
        n: 'A2', pts: 2, topic: 'Subspaces & bases', chapter: 'ch2', diff: 'med',
        q: String.raw`\(W = \{(a, b, c)^\top \in \mathbb{R}^3 : a + b = c\}\). Which are true? (i) \(W\) is a subspace, \(\dim W = 2\); (ii) subspace, \(\dim W = 3\); (iii) \(\{(1,0,1)^\top, (0,1,1)^\top\}\) is a basis; (iv) \(\{(1,0,1)^\top, (0,1,1)^\top, (1,1,2)^\top\}\) is a basis.`,
        s: [
          String.raw`\(c = a + b\), so every element is \(a(1,0,1)^\top + b(0,1,1)^\top\): \(W = \mathrm{span}\{(1,0,1)^\top, (0,1,1)^\top\}\) — a subspace.`,
          String.raw`The two spanning vectors are independent (\(\alpha = \beta = 0\) from the first two coordinates), so \(\dim W = 2\): (i) ✓, (ii) ✗, (iii) ✓.`,
          String.raw`(iv): \((1,1,2)^\top = (1,0,1)^\top + (0,1,1)^\top\) — dependent, not a basis ✗.`
        ],
        fin: String.raw`A — (i) and (iii) only.`
      },
      {
        n: 'A3', pts: 2, topic: 'Consistent systems', chapter: 'ch2', diff: 'hard',
        q: String.raw`System: \(x_1 + 2x_2 - x_3 + 3x_4 = 4\); \(2x_1 + 4x_2 + x_3 + x_4 = 9\); \(-x_1 - 2x_2 + 2x_3 - 4x_4 = -7\). Describe the solution set.`,
        s: [
          String.raw`Substitute \(s = x_1 + 2x_2\): the system becomes \(s - x_3 + 3x_4 = 4\), \(2s + x_3 + x_4 = 9\), \(-s + 2x_3 - 4x_4 = -7\) — 3 equations in \((s, x_3, x_4)\).`,
          String.raw`Eliminating \(s\): \(3x_3 - 5x_4 = 1\) and \(x_3 - x_4 = -3\) ⟹ \(x_4 = -5\), \(x_3 = -8\), then \(s = 11\).`,
          String.raw`Free variable: \(x_2 = t\), \(x_1 = 11 - 2t\): $$\boldsymbol{x} = \begin{pmatrix}11\\0\\-8\\-5\end{pmatrix} + t\begin{pmatrix}-2\\1\\0\\0\end{pmatrix}$$`
        ],
        fin: String.raw`D — one-parameter family (consistent, rank 3 < 4 unknowns).`
      },
      {
        n: 'A4', pts: 2, topic: 'Matrix identities', chapter: 'ch2', diff: 'med',
        q: String.raw`\(A, B\) invertible, \(A\) symmetric. Which always hold? (i) \((AB)^{-1} = B^{-1}A^{-1}\); (ii) \((A^{-1})^\top = A^{-1}\); (iii) \((A+B)^{-1} = A^{-1} + B^{-1}\); (iv) \(AB\) symmetric; (v) \((AB)^\top = B^\top A^\top\).`,
        s: [
          String.raw`(i) ✓ always. (ii) ✓: inverse of a symmetric matrix is symmetric — \((A^{-1})^\top = (A^\top)^{-1} = A^{-1}\).`,
          String.raw`(iii) ✗ — counterexample \(A = B = I\): \((2I)^{-1} = \tfrac12 I \ne 2I\). (iv) ✗ — \((AB)^\top = B^\top A = BA\), which equals \(AB\) only if \(A, B\) commute.`,
          String.raw`(v) ✓ — the scarf rule, always.`
        ],
        fin: String.raw`D — only (i), (ii) and (v).`
      },
      {
        n: 'A5', pts: 2, topic: 'Rank & column space', chapter: 'ch2', diff: 'med',
        q: String.raw`\(A = \begin{pmatrix}1&2&0&1\\2&4&1&3\\-1&-2&1&1\\3&6&1&4\end{pmatrix}\). Using elimination, find \(\operatorname{rank}(A)\) and a basis of \(\operatorname{col}(A)\).`,
        s: [
          String.raw`Eliminate: \(R_2 - 2R_1\), \(R_3 + R_1\), \(R_4 - 3R_1\) → \(\begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&1&2\\0&0&1&1\end{pmatrix}\); then \(R_3 - R_2\), \(R_4 - R_2\) → pivots in columns 1, 3, 4.`,
          String.raw`\(\operatorname{rank}(A) = 3\), and the pivot columns of the <em>original</em> matrix give the basis: \(\{\boldsymbol{a}_1, \boldsymbol{a}_3, \boldsymbol{a}_4\}\).`
        ],
        fin: String.raw`A — rank 3, basis \(\{\boldsymbol{a}_1, \boldsymbol{a}_3, \boldsymbol{a}_4\}\).`
      },
      {
        n: 'B1', pts: 15, topic: 'Traffic flow (long)', chapter: 'ch2', diff: 'hard', long: true,
        q: String.raw`One-way loop A→B→C→D→A with flows \(x_1..x_4\); externals: 300 into A, 200 into B, 400 out of C, 100 out of D. (a) Set up conservation equations as \(A\boldsymbol{x} = \boldsymbol{b}\). (b) Row-echelon form; ranks; existence. (c) General solution. (d) Is \(U = \{\boldsymbol{x} : A\boldsymbol{x} = \boldsymbol{0}\}\) a subspace? \(\dim U\)? Why isn't the solution set of \(A\boldsymbol{x} = \boldsymbol{b}\) one?`,
        s: [
          String.raw`**(a)** In = out at each node: \(x_1 - x_4 = 300\); \(-x_1 + x_2 = 200\); \(x_2 - x_3 = 400\); \(x_3 - x_4 = 100\).`,
          String.raw`**(b)** Augmented matrix reduces (add \(R_1\) to \(R_2\), subtract, etc.) to $$\begin{pmatrix}1&0&0&-1&300\\0&1&0&-1&500\\0&0&-1&1&-100\\0&0&0&0&0\end{pmatrix}$$ \(\operatorname{rank}(A) = \operatorname{rank}[A|\boldsymbol{b}] = 3 \lt 4\): consistent, infinitely many solutions.`,
          String.raw`**(c)** \(x_4 = t\): $$\boldsymbol{x} = \begin{pmatrix}300\\500\\100\\0\end{pmatrix} + t\begin{pmatrix}1\\1\\1\\1\end{pmatrix}$$ (the loop can carry any common circulation \(t\) — classic traffic-flow structure).`,
          String.raw`**(d)** \(U = \ker(A)\) is always a subspace; here \(U = \mathrm{span}\{(1,1,1,1)^\top\}\), \(\dim U = 1\). The solution set of \(A\boldsymbol{x} = \boldsymbol{b}\) contains no zero vector (\(A\boldsymbol{0} = \boldsymbol{0} \ne \boldsymbol{b}\)), so it is not a subspace — it is the affine coset \(\boldsymbol{x}_p + U\).`
        ],
        fin: String.raw`\(\boldsymbol{x} = (300, 500, 100, 0)^\top + t(1,1,1,1)^\top\); null space 1-D subspace; inhomogeneous solution set is affine, not a subspace.`
      },
      {
        n: 'B2', pts: 12, topic: 'Subspace criteria (long)', chapter: 'ch2', diff: 'med', long: true,
        q: String.raw`(a) Show \(H = \mathrm{span}\{\boldsymbol{v}_1, \boldsymbol{v}_2\}\) is a subspace of \(V\). (b) For \(H = \{(a - 3b,\; b - a,\; a,\; b) : a, b \in \mathbb{R}\}\): show it is a subspace of \(\mathbb{R}^4\) and find a basis. (c) Is \(W = \{\boldsymbol{v}_1 + a\boldsymbol{v}_2 : a \in \mathbb{R}\}\) (\(\boldsymbol{v}_1 \ne \boldsymbol{0}\)) a subspace?`,
        s: [
          String.raw`**(a)** \(\boldsymbol{0} = 0\boldsymbol{v}_1 + 0\boldsymbol{v}_2 \in H\); sums and scalings of combinations are combinations: \((a{+}c)\boldsymbol{v}_1 + (b{+}d)\boldsymbol{v}_2\), \((\lambda a)\boldsymbol{v}_1 + (\lambda b)\boldsymbol{v}_2\) ✓. Spans are always subspaces.`,
          String.raw`**(b)** Factor: \((a - 3b, b - a, a, b) = a(1, -1, 1, 0) + b(-3, 1, 0, 1)\) — a span, hence a subspace. Independence: \(\alpha\boldsymbol{v}_1 + \beta\boldsymbol{v}_2 = \boldsymbol{0}\) forces \(\alpha = 0\) (3rd coord) and \(\beta = 0\) (4th coord). Basis: \(\{(1,-1,1,0)^\top, (-3,1,0,1)^\top\}\), \(\dim H = 2\).`,
          String.raw`**(c)** Generally <b>no</b>: \(W = \boldsymbol{v}_1 + \mathrm{span}\{\boldsymbol{v}_2\}\) contains \(\boldsymbol{0}\) only if \(\boldsymbol{v}_1 = -a\boldsymbol{v}_2\) for some \(a\) — i.e. only when \(\boldsymbol{v}_1\) is a multiple of \(\boldsymbol{v}_2\). It is an affine line, not a subspace.`
        ],
        fin: String.raw`Spans are subspaces; \(H\) has the two-vector basis above; \(W\) is affine (missing \(\boldsymbol{0}\)) — not a subspace in general.`
      }
    ]
  });

  /* ==================== 2.11 LINEAR ALGEBRA PRACTICE ==================== */
  MML.exam.sets.push({
    id: 'ds-la', icon: '🧮', tag: tag,
    title: 'Practice: Linear Algebra & Transformations',
    sub: 'Section 2.11 · 12 problems · systems, inverses, subspaces, independence, basis, rank',
    problems: [
      {
        n: 1, pts: 2, topic: '3×3 system', chapter: 'ch2', diff: 'easy',
        q: String.raw`Meal from foods A, B, C hitting targets 7 g X, 10 g Y, 1 g Z, with nutrition matrix \(\begin{pmatrix}2&1&-1\\1&3&1\\-1&1&2\end{pmatrix}\). Solve \(2x_1 + x_2 - x_3 = 7\), \(x_1 + 3x_2 + x_3 = 10\), \(-x_1 + x_2 + 2x_3 = 1\).`,
        s: [
          String.raw`Swap rows for a leading 1, then \(R_2 - 2R_1\), \(R_3 + R_1\), \(R_3 + \tfrac45 R_2\) → row 3: \(\tfrac{3}{5}x_3 = \tfrac35\).`,
          String.raw`Back-substitute: \(x_3 = 1\), \(x_2 = 2\), \(x_1 = 3\). Check: \(6 + 2 - 1 = 7\) ✓, \(3 + 6 + 1 = 10\) ✓, \(-3 + 2 + 2 = 1\) ✓.`
        ],
        fin: String.raw`\((x_1, x_2, x_3) = (3, 2, 1)\).`
      },
      {
        n: 2, pts: 2, topic: 'Underdetermined system', chapter: 'ch2', diff: 'med',
        q: String.raw`Without full elimination, classify: \(x_1 + 2x_2 - x_3 = 3\); \(2x_1 + 4x_2 - 2x_3 = 6\); \(x_1 + x_2 + x_3 = 4\). Then give the general solution.`,
        s: [
          String.raw`Equation 2 is exactly \(2 \times\) equation 1 — no new information: 2 independent equations, 3 unknowns ⟹ infinitely many solutions (consistent).`,
          String.raw`From eqs (1), (3): subtract → \(x_2 - 2x_3 = -1\), so \(x_2 = 2t - 1\), \(x_1 = 5 - 3t\) with \(x_3 = t\): $$\boldsymbol{x} = (5 - 3t,\; 2t - 1,\; t), \quad t \in \mathbb{R}$$`
        ],
        fin: String.raw`Infinitely many: \((5 - 3t, 2t - 1, t)\).`
      },
      {
        n: 3, pts: 2, topic: 'Associativity, non-commutativity', chapter: 'ch2', diff: 'easy',
        q: String.raw`\(A = \begin{pmatrix}1&2\\0&1\end{pmatrix}\), \(B = \begin{pmatrix}2&0\\1&3\end{pmatrix}\), \(C = \begin{pmatrix}1&1\\1&0\end{pmatrix}\). (a) Show \(AB \ne BA\). (b) Verify \((AB)C = A(BC)\).`,
        s: [
          String.raw`\(AB = \begin{pmatrix}4&6\\1&3\end{pmatrix}\) but \(BA = \begin{pmatrix}2&4\\1&5\end{pmatrix}\) — different ✓.`,
          String.raw`\(BC = \begin{pmatrix}2&2\\4&1\end{pmatrix}\) ⟹ \(A(BC) = \begin{pmatrix}10&4\\4&1\end{pmatrix}\); and \((AB)C = \begin{pmatrix}4&6\\1&3\end{pmatrix}\begin{pmatrix}1&1\\1&0\end{pmatrix} = \begin{pmatrix}10&4\\4&1\end{pmatrix}\) ✓.`
        ],
        fin: String.raw`\(AB \ne BA\), yet \((AB)C = A(BC) = \begin{pmatrix}10&4\\4&1\end{pmatrix}\): associativity without commutativity.`
      },
      {
        n: 4, pts: 2, topic: '3×3 inverse', chapter: 'ch2', diff: 'med',
        q: String.raw`\(M = \begin{pmatrix}2&0&1\\1&1&0\\0&1&1\end{pmatrix}\). (a) \(\det M\)? (b) Find \(M^{-1}\) by Gauss–Jordan and verify.`,
        s: [
          String.raw`Cofactor expansion: \(\det M = 2(1) - 0 + 1(1) = 3 \ne 0\) — invertible.`,
          String.raw`Row-reduce \([M | I]\): result \(M^{-1} = \frac13\begin{pmatrix}1&1&-1\\-1&2&1\\1&-2&2\end{pmatrix}\). Check \(MM^{-1} = I_3\) ✓.`
        ],
        fin: String.raw`\(\det M = 3\), \(M^{-1} = \frac13\begin{pmatrix}1&1&-1\\-1&2&1\\1&-2&2\end{pmatrix}\).`
      },
      {
        n: 5, pts: 2, topic: 'Gaussian elimination', chapter: 'ch2', diff: 'easy',
        q: String.raw`Solve \(x_1 + x_2 + x_3 = 6\); \(2x_1 - x_2 + x_3 = 3\); \(x_1 + 2x_2 - x_3 = 2\) by Gaussian elimination, showing echelon form.`,
        s: [
          String.raw`\(R_2 - 2R_1\), \(R_3 - R_1\) → \(\begin{pmatrix}1&1&1&6\\0&-3&-1&-9\\0&1&-2&-4\end{pmatrix}\); then \(R_3 + \tfrac13 R_2\) → \(\begin{pmatrix}1&1&1&6\\0&-3&-1&-9\\0&0&-\tfrac73&-7\end{pmatrix}\).`,
          String.raw`Back-substitute: \(x_3 = 3\), \(x_2 = 2\), \(x_1 = 1\). Check all three equations ✓.`
        ],
        fin: String.raw`\((x_1, x_2, x_3) = (1, 2, 3)\).`
      },
      {
        n: 6, pts: 2, topic: '2×2 inverse two ways', chapter: 'ch2', diff: 'easy',
        q: String.raw`\(N = \begin{pmatrix}1&2\\3&4\end{pmatrix}\): (a) closed-form inverse; (b) via \([N|I] \rightsquigarrow [I|N^{-1}]\); confirm both agree.`,
        s: [
          String.raw`\(\det N = -2\): \(N^{-1} = \frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix} = \begin{pmatrix}-2&1\\1.5&-0.5\end{pmatrix}\).`,
          String.raw`Gauss–Jordan: \(R_2 - 3R_1\), \(R_2 \div (-2)\), \(R_1 - 2R_2\) → the same \(\begin{pmatrix}-2&1\\3/2&-1/2\end{pmatrix}\) ✓.`
        ],
        fin: String.raw`\(N^{-1} = \begin{pmatrix}-2&1\\3/2&-1/2\end{pmatrix}\) both ways.`
      },
      {
        n: 7, pts: 2, topic: 'Subspace or not?', chapter: 'ch2', diff: 'easy',
        q: String.raw`Subspace of \(\mathbb{R}^3\)? (a) \(U_1 = \{\boldsymbol{x} : x_1 + 2x_2 - x_3 = 0\}\); (b) \(U_2 = \{\boldsymbol{x} : x_1 + 2x_2 - x_3 = 5\}\).`,
        s: [
          String.raw`(a) Homogeneous solution set = kernel of a linear map: contains \(\boldsymbol{0}\), closed under + and scaling — <b>subspace</b> ✓.`,
          String.raw`(b) \(\boldsymbol{0} \notin U_2\) (\(0 \ne 5\)) — fails the first test already: <b>not a subspace</b>; it is an affine plane (a shifted subspace).`
        ],
        fin: String.raw`(a) yes (a kernel); (b) no (affine plane, missing \(\boldsymbol{0}\)).`
      },
      {
        n: 8, pts: 2, topic: 'Closure counterexample', chapter: 'ch2', diff: 'med',
        q: String.raw`\(U = \{(x_1, x_2) : x_1 x_2 \ge 0\}\) (first + third quadrants incl. axes). Show \(U\) is not a subspace.`,
        s: [
          String.raw`\(\boldsymbol{x} = (1, 0) \in U\), \(\boldsymbol{y} = (0, -1) \in U\), but \(\boldsymbol{x} + \boldsymbol{y} = (1, -1)\) with \(1 \cdot (-1) = -1 \lt 0\): \(\boldsymbol{x} + \boldsymbol{y} \notin U\).`,
          String.raw`One counterexample to closure under addition suffices. (Geometrically \(U\) is a union of quadrants — not even convex.)`
        ],
        fin: String.raw`Not closed under addition → not a subspace (despite containing 0 and being closed under nonnegative scaling).`
      },
      {
        n: 9, pts: 2, topic: 'Three vectors: independence', chapter: 'ch2', diff: 'med',
        q: String.raw`Are \(\boldsymbol{v}_1 = (1,0,2)\), \(\boldsymbol{v}_2 = (2,1,0)\), \(\boldsymbol{v}_3 = (0,1,-4)\) independent? If not, find the relation.`,
        s: [
          String.raw`Row-reduce the column matrix: \(R_3 - 2R_1\), then \(R_3 + 4R_2\) → a zero row: column 3 is not a pivot ⟹ dependent.`,
          String.raw`Relation: \(\boldsymbol{v}_3 = -2\boldsymbol{v}_1 + \boldsymbol{v}_2\) — check: \(-2(1,0,2) + (2,1,0) = (0,1,-4)\) ✓. So \(2\boldsymbol{v}_1 - \boldsymbol{v}_2 + \boldsymbol{v}_3 = \boldsymbol{0}\).`
        ],
        fin: String.raw`Dependent: \(2\boldsymbol{v}_1 - \boldsymbol{v}_2 + \boldsymbol{v}_3 = \boldsymbol{0}\).`
      },
      {
        n: 10, pts: 2, topic: 'Four vectors in ℝ⁴', chapter: 'ch2', diff: 'med',
        q: String.raw`Are \((1,1,1,1)\), \((1,2,3,4)\), \((1,0,-1,-2)\), \((2,3,4,5)\) linearly independent?`,
        s: [
          String.raw`Row-reduce the \(4 \times 4\) column matrix → only 2 pivots: rank 2 < 4 ⟹ dependent.`,
          String.raw`Relations: \(\boldsymbol{v}_3 = 2\boldsymbol{v}_1 - \boldsymbol{v}_2\) and \(\boldsymbol{v}_4 = \boldsymbol{v}_1 + \boldsymbol{v}_2\) (both check by substitution ✓).`
        ],
        fin: String.raw`Dependent (rank 2); \(\boldsymbol{v}_3 = 2\boldsymbol{v}_1 - \boldsymbol{v}_2\), \(\boldsymbol{v}_4 = \boldsymbol{v}_1 + \boldsymbol{v}_2\).`
      },
      {
        n: 11, pts: 2, topic: 'Basis of a span', chapter: 'ch2', diff: 'med',
        q: String.raw`\(U = \mathrm{span}[\boldsymbol{x}_1, \boldsymbol{x}_2, \boldsymbol{x}_3, \boldsymbol{x}_4]\) with \(\boldsymbol{x}_1 = (1,2,1)\), \(\boldsymbol{x}_2 = (0,1,1)\), \(\boldsymbol{x}_3 = (1,1,0)\), \(\boldsymbol{x}_4 = (2,5,3)\). Find a basis from the set itself and express the rest.`,
        s: [
          String.raw`Row-reduce → pivot columns 1 and 2: \(\{\boldsymbol{x}_1, \boldsymbol{x}_2\}\) is a basis, \(\dim U = 2\) (a plane through the origin).`,
          String.raw`Non-pivot columns read off: \(\boldsymbol{x}_3 = \boldsymbol{x}_1 - \boldsymbol{x}_2\) ✓, \(\boldsymbol{x}_4 = 2\boldsymbol{x}_1 + \boldsymbol{x}_2\) ✓.`
        ],
        fin: String.raw`Basis \(\{\boldsymbol{x}_1, \boldsymbol{x}_2\}\); \(\boldsymbol{x}_3 = \boldsymbol{x}_1 - \boldsymbol{x}_2\), \(\boldsymbol{x}_4 = 2\boldsymbol{x}_1 + \boldsymbol{x}_2\).`
      },
      {
        n: 12, pts: 2, topic: 'Rank computation', chapter: 'ch2', diff: 'easy',
        q: String.raw`Find \(\operatorname{rank}(A)\) for \(A = \begin{pmatrix}2&1&3\\4&2&6\\1&1&2\end{pmatrix}\); is \(A\) invertible?`,
        s: [
          String.raw`\(R_2 - 2R_1\) kills row 2 (it is \(2 \times\) row 1); continue → 2 nonzero rows: \(\operatorname{rank}(A) = 2\).`,
          String.raw`Rank 2 < 3 ⟹ <b>not invertible</b> — consistent with the visible row dependency.`
        ],
        fin: String.raw`\(\operatorname{rank}(A) = 2\); not regular/invertible.`
      }
    ]
  });

  /* ==================== 3.6 MATRIX DECOMPOSITIONS ==================== */
  MML.exam.sets.push({
    id: 'ds-decomp', icon: '💎', tag: tag,
    title: 'Practice: Decompositions & Spectral Methods',
    sub: 'Section 3.6 · 10 problems · determinants, SPD, eigen, Cholesky, SVD, Eckart–Young',
    problems: [
      {
        n: 1, pts: 1, topic: 'Determinant', chapter: 'ch4', diff: 'easy',
        q: String.raw`\(\det A\) for \(A = \begin{pmatrix}2&1&3\\0&4&-1\\1&2&2\end{pmatrix}\) by expanding along column 1; confirm \(\det A^\top = \det A\).`,
        s: [
          String.raw`$$2\det\begin{pmatrix}4&-1\\2&2\end{pmatrix} + 1\cdot\det\begin{pmatrix}1&3\\4&-1\end{pmatrix} = 2(10) + (-13) = 7$$`,
          String.raw`Transposing cannot change the determinant (cofactor expansion property): \(\det A^\top = 7\) ✓.`
        ],
        fin: String.raw`\(\det A = \det A^\top = 7\).`
      },
      {
        n: 2, pts: 1, topic: 'Positive definiteness', chapter: 'ch4', diff: 'easy',
        q: String.raw`Positive definite? (a) \(A = \begin{pmatrix}4&2\\2&3\end{pmatrix}\); (b) \(B = \begin{pmatrix}1&2\\2&1\end{pmatrix}\).`,
        s: [
          String.raw`(a) Leading minors: \(4 \gt 0\), \(\det = 8 \gt 0\) ⟹ PD (Sylvester). Eigenvalues \(\tfrac{7 \pm \sqrt{17}}{2} \approx 5.56, 1.44 \gt 0\) ✓.`,
          String.raw`(b) \(\det B = -3 \lt 0\): eigenvalues \(3, -1\) — indefinite, <b>not</b> PD.`
        ],
        fin: String.raw`(a) PD ✓; (b) not PD (indefinite).`
      },
      {
        n: 3, pts: 1, topic: 'Eigenvalues/vectors', chapter: 'ch4', diff: 'easy',
        q: String.raw`All eigenvalues/vectors of \(A = \begin{pmatrix}3&1\\1&3\end{pmatrix}\); verify \(\det = \prod\lambda\), \(\operatorname{tr} = \sum\lambda\).`,
        s: [
          String.raw`\(p(\lambda) = (3-\lambda)^2 - 1 = (\lambda - 4)(\lambda - 2)\): \(\lambda = 4, 2\); eigenvectors \(\mathrm{span}\{(1,1)^\top\}\), \(\mathrm{span}\{(1,-1)^\top\}\).`,
          String.raw`\(\det = 8 = 4 \cdot 2\) ✓; \(\operatorname{tr} = 6 = 4 + 2\) ✓.`
        ],
        fin: String.raw`\(\lambda = 4, 2\) with the diagonal and anti-diagonal directions.`
      },
      {
        n: 4, pts: 1, topic: 'Eigenspaces & ONB', chapter: 'ch4', diff: 'med',
        q: String.raw`\(A = \begin{pmatrix}5&-2\\-2&2\end{pmatrix}\): characteristic polynomial, eigenvalues, eigenspaces; do the eigenvectors form an ONB?`,
        s: [
          String.raw`\(\lambda^2 - 7\lambda + 6 = (\lambda - 6)(\lambda - 1)\): \(\lambda = 6, 1\). Eigenvectors: \((-2, 1)^\top\), \((1, 2)^\top\) — normalized \(\tfrac{1}{\sqrt5}(\pm 2, \mp 1)^\top\) and \(\tfrac{1}{\sqrt5}(1, 2)^\top\).`,
          String.raw`Dot product \(= \tfrac15(-2 + -2) = 0\) ✓ and unit norms: an <b>orthonormal basis</b> — guaranteed by the spectral theorem (\(A\) symmetric).`
        ],
        fin: String.raw`\(\lambda = 6, 1\); orthonormal eigenbasis (spectral theorem).`
      },
      {
        n: 5, pts: 2, topic: 'Cholesky 3×3', chapter: 'ch4', diff: 'med',
        q: String.raw`Cholesky factorization of \(A = \begin{pmatrix}9&3&0\\3&5&2\\0&2&6\end{pmatrix}\); bonus: \(\det A\).`,
        s: [
          String.raw`Column by column: \(l_{11} = 3\), \(l_{21} = 1\), \(l_{31} = 0\); \(l_{22} = \sqrt{5 - 1} = 2\), \(l_{32} = 1\); \(l_{33} = \sqrt{6 - 1} = \sqrt5\). $$L = \begin{pmatrix}3&0&0\\1&2&0\\0&1&\sqrt5\end{pmatrix}$$`,
          String.raw`Verify \(LL^\top = A\) ✓. Bonus: \(\det A = (l_{11}l_{22}l_{33})^2 = (6\sqrt5)^2 = 180\).`
        ],
        fin: String.raw`\(L = \begin{pmatrix}3&0&0\\1&2&0\\0&1&\sqrt5\end{pmatrix}\); \(\det A = 180\).`
      },
      {
        n: 6, pts: 1, topic: 'Eigendecomposition', chapter: 'ch4', diff: 'med',
        q: String.raw`Diagonalize \(A = \begin{pmatrix}4&-2\\-2&4\end{pmatrix}\) as \(PDP^{-1}\) and verify.`,
        s: [
          String.raw`\((4-\lambda)^2 - 4 = (\lambda - 6)(\lambda - 2)\): \(\lambda = 6, 2\); orthonormal eigenvectors \(\tfrac{1}{\sqrt2}(1, -1)^\top\), \(\tfrac{1}{\sqrt2}(1, 1)^\top\); symmetric ⟹ \(P^{-1} = P^\top\).`,
          String.raw`$$PDP^\top = \tfrac12\begin{pmatrix}1&1\\-1&1\end{pmatrix}\begin{pmatrix}6&0\\0&2\end{pmatrix}\begin{pmatrix}1&-1\\1&1\end{pmatrix} = \begin{pmatrix}4&-2\\-2&4\end{pmatrix} ✓$$`
        ],
        fin: String.raw`\(A = PDP^\top\) with \(\Lambda = \operatorname{diag}(6, 2)\).`
      },
      {
        n: 7, pts: 1, topic: 'Matrix powers', chapter: 'ch4', diff: 'med',
        q: String.raw`Using that decomposition, compute \(A^3\) efficiently.`,
        s: [
          String.raw`\(A^3 = PD^3P^\top\) with \(D^3 = \operatorname{diag}(216, 8)\): $$A^3 = \tfrac12\begin{pmatrix}224&-208\\-208&224\end{pmatrix} = \begin{pmatrix}112&-104\\-104&112\end{pmatrix}$$`,
          String.raw`Check: \(\operatorname{tr}(A^3) = 224 = 6^3 + 2^3\) ✓.`
        ],
        fin: String.raw`\(A^3 = \begin{pmatrix}112&-104\\-104&112\end{pmatrix}\) — eigenvalues cubed, no matrix slog.`
      },
      {
        n: 8, pts: 1, topic: 'SVD 2×2', chapter: 'ch4', diff: 'med',
        q: String.raw`Full SVD of \(A = \begin{pmatrix}1&1\\1&-1\end{pmatrix}\).`,
        s: [
          String.raw`\(A^\top A = 2I\): \(\sigma_1 = \sigma_2 = \sqrt2\), and <em>any</em> orthonormal basis works for \(V\) — take \(V = I\).`,
          String.raw`\(u_i = A v_i/\sigma_i\): \(U = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\), \(\Sigma = \sqrt2\,I\); check \(U\Sigma V^\top = A\) ✓.`
        ],
        fin: String.raw`\(A = U\Sigma V^\top\) with \(V = I\), \(U = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\), \(\Sigma = \sqrt2 I\).`
      },
      {
        n: 9, pts: 2, topic: 'SVD + pseudo-inverse', chapter: 'ch4', diff: 'med',
        q: String.raw`For \(A = \begin{pmatrix}4&0\\3&0\\0&2\\0&1\end{pmatrix}\): singular values, and the rank-1 approximation error \(\|A - \hat A^{(1)}\|\).`,
        s: [
          String.raw`\(A^\top A = \begin{pmatrix}25&0\\0&5\end{pmatrix}\): \(\sigma_1 = 5\), \(\sigma_2 = \sqrt5 \approx 2.236\).`,
          String.raw`Eckart–Young: the best rank-1 approximation leaves error exactly \(\sigma_2 = \sqrt5\).`
        ],
        fin: String.raw`\(\sigma = (5, \sqrt5)\); \(\|A - \hat A^{(1)}\| = \sqrt5 \approx 2.236\).`
      },
      {
        n: 10, pts: 3, topic: 'Eckart–Young & compression', chapter: 'ch4', diff: 'hard',
        q: String.raw`\(\sigma = (7.50, 3.14, 1.36)\) for a \(3 \times 3\) matrix. (a) Spectral-norm error of the rank-2 approximation? (b) % of Frobenius energy retained by rank 2? (c) Storage for a \(100 \times 100\) matrix vs its rank-2 SVD, and the compression ratio.`,
        s: [
          String.raw`(a) \(\|A - \hat A^{(2)}\|_2 = \sigma_3 = 1.36\).`,
          String.raw`(b) Energy: \(\sum\sigma_i^2 = 56.25 + 9.86 + 1.85 = 67.96\); kept: \(66.11\) ⟹ \(66.11/67.96 \approx 97.3\%\).`,
          String.raw`(c) Full: \(100^2 = 10{,}000\) numbers. Rank-2: \(2 + 2 \cdot 100 + 2 \cdot 100 = 402\) ⟹ ratio \(\approx 24.9\times\) smaller while keeping 97.3% of the energy.`
        ],
        fin: String.raw`(a) 1.36; (b) ≈ 97.3%; (c) 402 vs 10,000 numbers — ≈ 25× compression.`
      }
    ]
  });

  /* ==================== 5.4 VECTOR CALCULUS ==================== */
  MML.exam.sets.push({
    id: 'ds-calc', icon: '⛰️', tag: tag,
    title: 'Practice: Vector Calculus & Gradients',
    sub: 'Section 5.4 · 20 problems · Taylor, Jacobians, softmax gradients, AD, Newton',
    problems: [
      {
        n: 1, pts: 1, topic: 'First principles', chapter: 'ch5', diff: 'easy',
        q: String.raw`Derive \(f'(x)\) for \(f(x) = x^3\) from the limit definition; evaluate at \(x = 2\).`,
        s: [
          String.raw`$$f'(x) = \lim_{h\to0}\frac{(x+h)^3 - x^3}{h} = \lim_{h\to0}(3x^2 + 3xh + h^2) = 3x^2 \;\Rightarrow\; f'(2) = 12$$`
        ],
        fin: String.raw`\(f'(x) = 3x^2\); \(f'(2) = 12\).`
      },
      {
        n: 2, pts: 1, topic: 'Taylor polynomial', chapter: 'ch5', diff: 'easy',
        q: String.raw`Taylor polynomial \(T_4\) of \(e^x\) at 0; evaluate at 1 and compare with \(e \approx 2.71828\).`,
        s: [
          String.raw`All derivatives at 0 equal 1: \(T_4(x) = 1 + x + \tfrac{x^2}{2} + \tfrac{x^3}{6} + \tfrac{x^4}{24}\).`,
          String.raw`\(T_4(1) = \tfrac{65}{24} \approx 2.7083\); error \(\approx 0.00998\) (bounded by the remainder \(\approx e^{\xi}/120 \le 0.023\)).`
        ],
        fin: String.raw`\(T_4(1) \approx 2.7083\), error \(\approx 0.01\).`
      },
      {
        n: 3, pts: 1, topic: 'Partials & gradient', chapter: 'ch5', diff: 'easy',
        q: String.raw`\(f(x_1, x_2) = \sin(x_1x_2) + x_1^2\): compute \(\nabla f\) at \((1, \pi/2)\).`,
        s: [
          String.raw`\(\partial_1 f = x_2\cos(x_1x_2) + 2x_1\), \(\partial_2 f = x_1\cos(x_1x_2)\).`,
          String.raw`At \((1, \pi/2)\): \(\cos(\pi/2) = 0\) kills the cross terms: \(\nabla f = (2, 0)^\top\).`
        ],
        fin: String.raw`\(\nabla f(1, \pi/2) = (2, 0)^\top\).`
      },
      {
        n: 4, pts: 1, topic: 'Multivariate chain rule', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f = x_1^2x_2\), \(x_1(t) = t^2\), \(x_2(t) = \sin t\). Compute \(df/dt\) at \(t = 1\).`,
        s: [
          String.raw`$$\frac{df}{dt} = 2x_1x_2\cdot 2t + x_1^2\cos t$$ At \(t = 1\): \(x_1 = 1\), \(x_2 \approx 0.841\): \(df/dt \approx 3.365 + 0.540 = 3.905\).`
        ],
        fin: String.raw`\(df/dt(1) \approx 3.91\).`
      },
      {
        n: 5, pts: 1, topic: 'Jacobian & determinant', chapter: 'ch5', diff: 'med',
        q: String.raw`Jacobian of \(\boldsymbol{f}(x_1, x_2) = (x_1^2 + x_2,\; x_1x_2^2)\); evaluate at \((2, 3)\) and compute \(\det J\).`,
        s: [
          String.raw`$$J = \begin{pmatrix}2x_1 & 1\\ x_2^2 & 2x_1x_2\end{pmatrix}\Bigg|_{(2,3)} = \begin{pmatrix}4&1\\9&12\end{pmatrix}, \qquad \det J = 48 - 9 = 39$$ (\(\det J\) = local area magnification of the map.)`
        ],
        fin: String.raw`\(J = \begin{pmatrix}4&1\\9&12\end{pmatrix}\), \(\det J = 39\).`
      },
      {
        n: 6, pts: 2, topic: 'Softmax cross-entropy gradient', chapter: 'ch5', diff: 'hard',
        q: String.raw`Show that for \(L = -\sum_c y_c \log\sigma_c(\boldsymbol{z})\) with softmax \(\sigma\), \(\nabla_{\boldsymbol{z}} L = \boldsymbol{\sigma} - \boldsymbol{y}\).`,
        s: [
          String.raw`Softmax Jacobian: \(J_{ij} = \sigma_i(\delta_{ij} - \sigma_j)\). Chain rule: $$\frac{\partial L}{\partial z_j} = \sum_i \frac{-y_i}{\sigma_i}\,\sigma_i(\delta_{ij} - \sigma_j) = -y_j + \sigma_j\textstyle\sum_i y_i = \sigma_j - y_j$$ using \(\sum_i y_i = 1\) (one-hot).`,
          String.raw`Numeric check: \(\boldsymbol{z} = (3,1,0)\), \(\boldsymbol{y} = (1,0,0)\): \(\boldsymbol{\sigma} \approx (0.844, 0.114, 0.042)\), gradient \(\approx (-0.156, 0.114, 0.042)\) — small when right, large when wrong. The cleanest gradient in all of deep learning.`
        ],
        fin: String.raw`\(\nabla_{\boldsymbol{z}}L = \boldsymbol{\sigma} - \boldsymbol{y}\).`
      },
      {
        n: 7, pts: 1, topic: 'Quadratic-form gradient', chapter: 'ch5', diff: 'easy',
        q: String.raw`\(f(\boldsymbol{x}) = \boldsymbol{x}^\top B\boldsymbol{x}\), \(B = \begin{pmatrix}2&1\\1&3\end{pmatrix}\). Compute \(\nabla f\) at \((1, 2)^\top\).`,
        s: [
          String.raw`\(\nabla f = (\boldsymbol{x}^\top(B + B^\top)) = 2\boldsymbol{x}^\top B\) (B symmetric). At \((1,2)\): \(2(1,2)\begin{pmatrix}2&1\\1&3\end{pmatrix} = 2(4, 7) = (8, 14)\). Finite-difference check ✓.`
        ],
        fin: String.raw`\(\nabla f(1,2) = (8, 14)^\top\).`
      },
      {
        n: 8, pts: 1, topic: 'Trace gradient', chapter: 'ch5', diff: 'med',
        q: String.raw`Show \(\partial\operatorname{tr}(AX)/\partial X = A^\top\); hence \(\partial\|X\|_F^2/\partial X = 2X\).`,
        s: [
          String.raw`\(\operatorname{tr}(AX) = \sum_{i,j}A_{ij}X_{ji}\), so \(\partial/\partial X_{kl} = A_{lk}\): the gradient matrix is \(A^\top\).`,
          String.raw`Special case \(A = X^\top\): \(\|X\|_F^2 = \operatorname{tr}(X^\top X)\) has gradient \((X^\top)^\top + \dots = 2X\) — the weight-decay gradient.`
        ],
        fin: String.raw`\(\partial\operatorname{tr}(AX)/\partial X = A^\top\); \(\partial\|X\|_F^2/\partial X = 2X\).`
      },
      {
        n: 9, pts: 2, topic: 'Ridge normal equations', chapter: 'ch9', diff: 'med',
        q: String.raw`Minimize \(L = \|\boldsymbol{y} - X\boldsymbol{\theta}\|^2 + \lambda\|\boldsymbol{\theta}\|^2\) via gradients; why is the system always solvable?`,
        s: [
          String.raw`\(\nabla_\theta L = -2X^\top(\boldsymbol{y} - X\boldsymbol{\theta}) + 2\lambda\boldsymbol{\theta} = 0 \Rightarrow (X^\top X + \lambda I)\hat{\boldsymbol{\theta}} = X^\top\boldsymbol{y}\).`,
          String.raw`\(X^\top X + \lambda I\) has every eigenvalue shifted by \(+\lambda \gt 0\) ⟹ always invertible — ridge tames multicollinearity by construction.`
        ],
        fin: String.raw`\(\hat{\boldsymbol{\theta}} = (X^\top X + \lambda I)^{-1}X^\top\boldsymbol{y}\), always well-defined.`
      },
      {
        n: 10, pts: 2, topic: 'Softmax layer weight gradient', chapter: 'ch5', diff: 'hard',
        q: String.raw`Output layer \(p = \mathrm{softmax}(W\boldsymbol{x})\), loss \(L = -\boldsymbol{y}^\top\log\boldsymbol{p}\). Show \(\partial L/\partial W = (\boldsymbol{p} - \boldsymbol{y})\boldsymbol{x}^\top\).`,
        s: [
          String.raw`Dimensions: \(L\) scalar, \(W \in \mathbb{R}^{k \times d}\) ⟹ gradient \(k \times d\). With \(\boldsymbol{z} = W\boldsymbol{x}\): \(\partial z_i/\partial W_{ij} = x_j\), so $$\frac{\partial L}{\partial W_{ij}} = (p_i - y_i)\,x_j \;\Rightarrow\; \frac{\partial L}{\partial W} = (\boldsymbol{p} - \boldsymbol{y})\boldsymbol{x}^\top$$`,
          String.raw`Numeric: \(\boldsymbol{p} = (0.7, 0.2, 0.1)\), \(\boldsymbol{y} = (1,0,0)\), \(\boldsymbol{x} = (1,2)\): gradient \(= (-0.3, 0.2, 0.1)^\top(1, 2)\). This exact expression ships in every framework's softmax layer.`
        ],
        fin: String.raw`\(\partial L/\partial W = (\boldsymbol{p} - \boldsymbol{y})\boldsymbol{x}^\top\).`
      },
      {
        n: 11, pts: 1, topic: 'Reverse-mode AD', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x) = e^{x^2}\): forward values then reverse-mode \(df/dx\) at \(x = 2\).`,
        s: [
          String.raw`Graph: \(a = x^2\), \(b = e^a\). Local derivatives: \(\partial a/\partial x = 2x\), \(\partial b/\partial a = e^a\).`,
          String.raw`Backward: \(df/dx = e^{x^2}\cdot 2x = 2xe^{x^2}\); at \(x = 2\): \(4e^4 \approx 218.4\) (numerical check ✓).`
        ],
        fin: String.raw`\(df/dx(2) = 4e^4 \approx 218.4\).`
      },
      {
        n: 12, pts: 2, topic: 'Reverse-mode AD, two inputs', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f = \ln(x_1^2 e^{x_2})\): reverse-mode AD for \(\partial f/\partial x_1, \partial f/\partial x_2\) at \((2, 1)\).`,
        s: [
          String.raw`Intermediates: \(a = x_1^2 = 4\), \(b = e^{x_2} = e\), \(c = ab = 4e\), \(f = \ln c = \ln 4 + 1 \approx 2.386\).`,
          String.raw`Backward: \(\bar c = 1/(4e)\); \(\bar a = \bar c\, b = 1/4\); \(\bar b = \bar c\, a = 1/e\); $$\partial f/\partial x_1 = \bar a \cdot 2x_1 = 1 \;\checkmark\;(= 2/x_1), \qquad \partial f/\partial x_2 = \bar b \cdot e^{x_2} = 1 \;\checkmark\;(= 1)$$`
        ],
        fin: String.raw`Both partials = 1 at \((2,1)\).`
      },
      {
        n: 13, pts: 1, topic: 'Forward-mode AD', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f = x_1^2 + x_1x_2\) at \((1,2)\): forward-mode with seed \((\dot x_1, \dot x_2) = (1, 0)\) gives \(\partial f/\partial x_1\)?`,
        s: [
          String.raw`Carry (value | tangent) pairs: \(a = x_1^2 = (1 | 2x_1\dot x_1 = 2)\); \(b = x_1x_2 = (2 | x_2\dot x_1 + x_1\dot x_2 = 2)\); \(f = (3 | 4)\).`,
          String.raw`The tangent is \(\partial f/\partial x_1 = 4\) (analytic: \(2x_1 + x_2 = 4\) ✓). Each input needs its own sweep — reverse-mode gets the whole gradient in one backward pass.`
        ],
        fin: String.raw`\(\partial f/\partial x_1(1,2) = 4\) in one forward sweep.`
      },
      {
        n: 14, pts: 2, topic: 'Backprop: sigmoid + BCE', chapter: 'ch5', diff: 'med',
        q: String.raw`Neuron \(\hat y = \sigma(wx + b)\), loss \(L = -[y\log\hat y + (1-y)\log(1-\hat y)]\). Show \(\partial L/\partial w = (\hat y - y)x\) and \(\partial L/\partial b = \hat y - y\).`,
        s: [
          String.raw`\(\partial L/\partial\hat y = \frac{\hat y - y}{\hat y(1-\hat y)}\); sigmoid derivative \(\hat y(1 - \hat y)\) cancels it: $$\frac{\partial L}{\partial z} = \hat y - y$$`,
          String.raw`Then \(\partial L/\partial w = (\hat y - y)x\), \(\partial L/\partial b = \hat y - y\) — the gradient <em>is</em> the prediction error.`
        ],
        fin: String.raw`\(\partial L/\partial w = (\hat y - y)x\), \(\partial L/\partial b = \hat y - y\).`
      },
      {
        n: 15, pts: 1, topic: 'Schwarz / Hessian symmetry', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x, y) = x^3y + \sin(xy)\): verify \(\partial^2 f/\partial x\partial y = \partial^2 f/\partial y\partial x\).`,
        s: [
          String.raw`\(\partial^2/(\partial y \partial x) = 3x^2 + \cos(xy) - xy\sin(xy)\) and \(\partial^2/(\partial x \partial y)\) gives the same — Hessian symmetric (Schwarz/Clairaut).`
        ],
        fin: String.raw`Mixed partials agree; Hessian symmetric ✓.`
      },
      {
        n: 16, pts: 1, topic: 'Critical-point classification', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x, y) = x^3 - 3x + y^2\): find and classify the critical points.`,
        s: [
          String.raw`\(\nabla f = (3x^2 - 3, 2y) = 0\): critical points \((\pm1, 0)\). Hessian \(\begin{pmatrix}6x&0\\0&2\end{pmatrix}\).`,
          String.raw`At \((1,0)\): eigenvalues \(6, 2 \gt 0\) → local min (\(f = -2\)). At \((-1, 0)\): \(-6, 2\) indefinite → <b>saddle</b> (\(f = 2\)).`
        ],
        fin: String.raw`Local min at \((1,0)\), saddle at \((-1,0)\).`
      },
      {
        n: 17, pts: 1, topic: 'Convexity via Hessian', chapter: 'ch5', diff: 'easy',
        q: String.raw`Is \(f(x, y) = 2x^2 + 3y^2 - xy\) strictly convex? Find its minimum; also the Newton step from \((1,1)\).`,
        s: [
          String.raw`Hessian \(\begin{pmatrix}4&-1\\-1&6\end{pmatrix}\): eigenvalues \(5 \pm \sqrt2 \gt 0\) ⟹ strictly convex.`,
          String.raw`\(\nabla f = (4x - y, 6y - x) = 0 \Rightarrow (0,0)\), \(f = 0\). At \((1,1)\): \(\nabla f = (3, 5)^\top\), \(H^{-1} = \tfrac1{23}\begin{pmatrix}6&1\\1&4\end{pmatrix}\), Newton step \(= H^{-1}(3,5)^\top = (1,1)^\top\) → lands exactly at \((0,0)\) in one step.`
        ],
        fin: String.raw`Strictly convex; unique min at origin; Newton nails it in one step.`
      },
      {
        n: 18, pts: 1, topic: 'Second-order Taylor', chapter: 'ch5', diff: 'med',
        q: String.raw`\(T_2\) of \(f(x, y) = \cos x + \sin y\) at \((0,0)\); evaluate at \((0.1, 0.1)\).`,
        s: [
          String.raw`\(f(0,0) = 1\); \(\nabla f(0,0) = (0, 1)\); Hessian \(\operatorname{diag}(-1, 0)\): $$T_2 = 1 + y - \tfrac12 x^2$$`,
          String.raw`\(T_2(0.1, 0.1) = 1.095\) vs \(f \approx 1.09483\): error \(\approx 0.00017\) (neglected terms are third order).`
        ],
        fin: String.raw`\(T_2 = 1 + y - \tfrac12 x^2\); error \(\approx 1.7\times10^{-4}\).`
      },
      {
        n: 19, pts: 1, topic: 'Taylor of a quadratic = exact', chapter: 'ch5', diff: 'easy',
        q: String.raw`Expand \(f(x, y) = x^2 + xy + y^2\) at \((1,1)\) — show \(T_2\) reproduces \(f\) exactly.`,
        s: [
          String.raw`\(f(1,1) = 3\); \(\nabla f(1,1) = (3,3)\); \(H = \begin{pmatrix}2&1\\1&2\end{pmatrix}\) constant. $$T_2 = 3 + 3(x{-}1) + 3(y{-}1) + (x{-}1)^2 + (x{-}1)(y{-}1) + (y{-}1)^2$$ Expanding returns \(x^2 + xy + y^2\) exactly — quadratics have no third-order terms to lose.`
        ],
        fin: String.raw`\(T_2 \equiv f\): quadratics are their own second-order Taylor expansion.`
      },
      {
        n: 20, pts: 2, topic: 'Newton step', chapter: 'ch5', diff: 'med',
        q: String.raw`One Newton step for \(L = (\theta_1 - 2)^2 + (\theta_2 - 3)^2 + \theta_1\theta_2\) from \(\boldsymbol{\theta}_0 = (0,0)^\top\).`,
        s: [
          String.raw`\(\nabla L = (2\theta_1 + \theta_2 - 4,\; \theta_1 + 2\theta_2 - 6)\): at origin \((-4, -6)^\top\); \(H = \begin{pmatrix}2&1\\1&2\end{pmatrix}\) (constant, SPD).`,
          String.raw`$$\delta = -H^{-1}\nabla L = -\tfrac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}-4\\-6\end{pmatrix} = \begin{pmatrix}2/3\\8/3\end{pmatrix} \Rightarrow \boldsymbol{\theta}_1 = \begin{pmatrix}2/3\\8/3\end{pmatrix}$$ \(\nabla L(\boldsymbol{\theta}_1) = 0\) ✓ — exact minimum in one step (quadratic).`
        ],
        fin: String.raw`\(\boldsymbol{\theta}_1 = (2/3, 8/3)^\top\), the global minimum.`
      }
    ]
  });
})();
