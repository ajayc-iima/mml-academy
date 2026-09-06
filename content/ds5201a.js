/* DS5201 (Plaksha) course pack — part A: Quiz 1, Linear Algebra, Decompositions, Vector Calculus.
   FULL-FIDELITY transcription: every source step, check, and note preserved (only re-typeset).
   Two deliberate corrections vs the source are flagged inline in ds-sli. */
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
        q: String.raw`\(A\) is \(4\times4\) with \(A = -A^\top\). Which hold? (i) all diagonal entries are 0; (ii) \(\boldsymbol{x}^\top A\boldsymbol{x} = 0\) for every \(\boldsymbol{x} \in \mathbb{R}^4\).`,
        s: [
          String.raw`**(i) All diagonal elements of \(A\) are zero.** Let \(a_{ii}\) be any diagonal entry. Since \(A = -A^\top\), we have \(a_{ii} = -a_{ii}\). Hence \(2a_{ii} = 0\), which implies \(a_{ii} = 0\). Therefore statement (i) is true.`,
          String.raw`**(ii) \(\boldsymbol{x}^\top A\boldsymbol{x} = 0\) for every \(\boldsymbol{x}\).** Let \(c = \boldsymbol{x}^\top A\boldsymbol{x}\). Since \(c\) is a scalar, \(c = c^\top\). Now: $$c = (\boldsymbol{x}^\top A\boldsymbol{x})^\top = \boldsymbol{x}^\top A^\top\boldsymbol{x}$$ Using \(A^\top = -A\): $$c = \boldsymbol{x}^\top(-A)\boldsymbol{x} = -\boldsymbol{x}^\top A\boldsymbol{x} = -c$$ Thus \(2c = 0\), and therefore \(c = 0\). Hence \(\boldsymbol{x}^\top A\boldsymbol{x} = 0\) for every \(\boldsymbol{x}\): statement (ii) is true.`
        ],
        fin: String.raw`B — both (i) and (ii) are true.`
      },
      {
        n: 'A2', pts: 2, topic: 'Subspaces & bases', chapter: 'ch2', diff: 'med',
        q: String.raw`\(W = \{(a, b, c)^\top \in \mathbb{R}^3 : a + b = c\}\). Which are true? (i) \(W\) is a subspace, \(\dim W = 2\); (ii) subspace, \(\dim W = 3\); (iii) \(\{(1,0,1)^\top, (0,1,1)^\top\}\) is a basis; (iv) \(\{(1,0,1)^\top, (0,1,1)^\top, (1,1,2)^\top\}\) is a basis.`,
        s: [
          String.raw`Since \(c = a + b\), every vector in \(W\) can be written as $$\begin{pmatrix}a\\b\\a+b\end{pmatrix} = a\begin{pmatrix}1\\0\\1\end{pmatrix} + b\begin{pmatrix}0\\1\\1\end{pmatrix}$$ Hence \(W = \mathrm{span}\{(1,0,1)^\top, (0,1,1)^\top\}\), so \(W\) is a subspace of \(\mathbb{R}^3\).`,
          String.raw`**(i)** The two spanning vectors are linearly independent: \(\alpha(1,0,1)^\top + \beta(0,1,1)^\top = \boldsymbol{0}\) forces \(\alpha = 0, \beta = 0\). Hence \(\dim W = 2\): (i) true, (ii) false.`,
          String.raw`**(iii)** These vectors span \(W\) and are independent — a basis: (iii) true.`,
          String.raw`**(iv)** Observe \((1,1,2)^\top = (1,0,1)^\top + (0,1,1)^\top\): the set is linearly dependent, so it cannot be a basis: (iv) false.`
        ],
        fin: String.raw`A — (i) and (iii) only.`
      },
      {
        n: 'A3', pts: 2, topic: 'Consistent systems', chapter: 'ch2', diff: 'hard',
        q: String.raw`System: \(x_1 + 2x_2 - x_3 + 3x_4 = 4\); \(2x_1 + 4x_2 + x_3 + x_4 = 9\); \(-x_1 - 2x_2 + 2x_3 - 4x_4 = -7\). Describe the solution set.`,
        s: [
          String.raw`The combination \(x_1 + 2x_2\) appears repeatedly. Let \(s = x_1 + 2x_2\). The system becomes: $$s - x_3 + 3x_4 = 4, \qquad 2s + x_3 + x_4 = 9, \qquad -s + 2x_3 - 4x_4 = -7$$`,
          String.raw`**Eliminate \(s\).** From the first equation, \(s = 4 + x_3 - 3x_4\). Substituting into the second: \(2(4 + x_3 - 3x_4) + x_3 + x_4 = 9\), which simplifies to \(3x_3 - 5x_4 = 1\). Substituting into the third: \(-(4 + x_3 - 3x_4) + 2x_3 - 4x_4 = -7\), which simplifies to \(x_3 - x_4 = -3\).`,
          String.raw`Hence \(x_3 = x_4 - 3\). Substituting into \(3x_3 - 5x_4 = 1\): \(3(x_4 - 3) - 5x_4 = 1\), giving \(-2x_4 = 10\). Therefore \(x_4 = -5\), \(x_3 = -8\).`,
          String.raw`**Find \(x_1, x_2\).** From \(s = 4 + x_3 - 3x_4\): \(s = 11\). Let \(x_2 = t\): \(x_1 = 11 - 2t\). $$\boldsymbol{x} = \begin{pmatrix}11\\0\\-8\\-5\end{pmatrix} + t\begin{pmatrix}-2\\1\\0\\0\end{pmatrix}, \quad t \in \mathbb{R}$$`
        ],
        fin: String.raw`D — the general solution above (consistent, one free parameter).`
      },
      {
        n: 'A4', pts: 2, topic: 'Matrix identities', chapter: 'ch2', diff: 'med',
        q: String.raw`\(A, B\) invertible, \(A\) symmetric. Which always hold? (i) \((AB)^{-1} = B^{-1}A^{-1}\); (ii) \((A^{-1})^\top = A^{-1}\); (iii) \((A+B)^{-1} = A^{-1} + B^{-1}\); (iv) \(AB\) symmetric; (v) \((AB)^\top = B^\top A^\top\).`,
        s: [
          String.raw`**(i)** For any two invertible matrices, \((AB)^{-1} = B^{-1}A^{-1}\): true.`,
          String.raw`**(ii)** Since \(A^\top = A\), taking inverses: \((A^\top)^{-1} = A^{-1}\). Using the identity \((A^\top)^{-1} = (A^{-1})^\top\): \((A^{-1})^\top = A^{-1}\) — the inverse of a symmetric matrix is symmetric: true.`,
          String.raw`**(iii)** False in general. Counterexample: \(A = B = I\) gives \((A + B)^{-1} = (2I)^{-1} = \tfrac12 I\), whereas \(A^{-1} + B^{-1} = 2I\), and \(\tfrac12 I \ne 2I\).`,
          String.raw`**(iv)** \((AB)^\top = B^\top A^\top = BA\). This equals \(AB\) only if \(A\) and \(B\) commute — not true in general: false.`,
          String.raw`**(v)** For any matrices, \((AB)^\top = B^\top A^\top\): true.`
        ],
        fin: String.raw`D — only (i), (ii) and (v).`
      },
      {
        n: 'A5', pts: 2, topic: 'Rank & column space', chapter: 'ch2', diff: 'med',
        q: String.raw`\(A = \begin{pmatrix}1&2&0&1\\2&4&1&3\\-1&-2&1&1\\3&6&1&4\end{pmatrix}\) with columns \(\boldsymbol{a}_1..\boldsymbol{a}_4\). Using Gaussian elimination, determine \(\operatorname{rank}(A)\) and a basis for \(\operatorname{col}(A)\).`,
        s: [
          String.raw`Apply \(R_2 \leftarrow R_2 - 2R_1\), \(R_3 \leftarrow R_3 + R_1\), \(R_4 \leftarrow R_4 - 3R_1\): $$\begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&1&2\\0&0&1&1\end{pmatrix}$$`,
          String.raw`Then \(R_3 \leftarrow R_3 - R_2\), \(R_4 \leftarrow R_4 - R_2\): $$\begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&0&1\\0&0&0&0\end{pmatrix}$$ Finally \(R_2 \leftarrow R_2 - R_3\), \(R_1 \leftarrow R_1 - R_3\) gives RREF \(\begin{pmatrix}1&2&0&0\\0&0&1&0\\0&0&0&1\\0&0&0&0\end{pmatrix}\).`,
          String.raw`Three pivot columns (1, 3, 4): \(\operatorname{rank}(A) = 3\), and the pivot columns of the original matrix give the basis \(\{\boldsymbol{a}_1, \boldsymbol{a}_3, \boldsymbol{a}_4\}\) — i.e. \((1,2,-1,3)^\top, (0,1,1,1)^\top, (1,3,1,4)^\top\).`
        ],
        fin: String.raw`A — rank 3, basis \(\{\boldsymbol{a}_1, \boldsymbol{a}_3, \boldsymbol{a}_4\}\).`
      },
      {
        n: 'B1', pts: 15, topic: 'Traffic flow (long)', chapter: 'ch2', diff: 'hard', long: true,
        q: String.raw`One-way loop A→B→C→D→A with flows \(x_1..x_4\); externals: 300 into A, 200 into B, 400 out of C, 100 out of D. (a) Conservation equations as \(A\boldsymbol{x} = \boldsymbol{b}\). (b) Row-echelon form; \(\operatorname{rank}(A)\), \(\operatorname{rank}[A|\boldsymbol{b}]\), existence. (c) General solution. (d) Is \(U = \{\boldsymbol{x} : A\boldsymbol{x} = \boldsymbol{0}\}\) a subspace? \(\dim U\)? Why isn't the solution set of \(A\boldsymbol{x} = \boldsymbol{b}\) a subspace?`,
        s: [
          String.raw`**(a)** At each intersection, total inflow = total outflow: At A: \(300 + x_4 = x_1 \Rightarrow x_1 - x_4 = 300\). At B: \(x_1 + 200 = x_2 \Rightarrow -x_1 + x_2 = 200\). At C: \(x_2 = x_3 + 400 \Rightarrow x_2 - x_3 = 400\). At D: \(x_3 = x_4 + 100 \Rightarrow x_3 - x_4 = 100\).`,
          String.raw`**(b)** The augmented matrix: $$\left(\begin{array}{cccc|c}1&0&0&-1&300\\-1&1&0&0&200\\0&1&-1&0&400\\0&0&1&-1&100\end{array}\right)$$ Apply \(R_2 \leftarrow R_2 + R_1\): row 2 becomes \((0, 1, 0, -1 \,|\, 500)\). Then \(R_3 \leftarrow R_3 - R_2\): \((0, 0, -1, 1 \,|\, -100)\). Finally \(R_4 \leftarrow R_4 + R_3\): \((0, 0, 0, 0 \,|\, 0)\): $$\left(\begin{array}{cccc|c}1&0&0&-1&300\\0&1&0&-1&500\\0&0&-1&1&-100\\0&0&0&0&0\end{array}\right)$$ Hence \(\operatorname{rank}(A) = \operatorname{rank}[A|\boldsymbol{b}] = 3\). Since the ranks are equal but \(\lt 4\), the system is consistent with infinitely many solutions.`,
          String.raw`**(c)** From the echelon form: \(x_1 - x_4 = 300\), \(x_2 - x_4 = 500\), \(x_3 - x_4 = 100\). Let \(x_4 = t\): $$\boldsymbol{x} = \begin{pmatrix}300\\500\\100\\0\end{pmatrix} + t\begin{pmatrix}1\\1\\1\\1\end{pmatrix}$$ The homogeneous part is the loop's free circulation.`,
          String.raw`**(d)** \(U = \ker(A)\) is the null space of \(A\) — always a subspace (contains 0, closed under + and scaling). Moreover \(U = \mathrm{span}\{(1,1,1,1)^\top\}\), so \(\dim U = 1\). The solution set \(S = \{\boldsymbol{x} : A\boldsymbol{x} = \boldsymbol{b}\}\) is <b>not</b> a subspace because it does not contain the zero vector (\(A\boldsymbol{0} = \boldsymbol{0} \ne \boldsymbol{b}\)). Instead \(S = \boldsymbol{x}_p + U\): an affine subset of \(\mathbb{R}^4\).`
        ],
        fin: String.raw`\(\boldsymbol{x} = (300, 500, 100, 0)^\top + t(1,1,1,1)^\top\); \(U\) a 1-D subspace; \(S\) affine, not a subspace.`
      },
      {
        n: 'B2', pts: 12, topic: 'Subspace criteria (long)', chapter: 'ch2', diff: 'med', long: true,
        q: String.raw`(a) Show \(H = \mathrm{span}\{\boldsymbol{v}_1, \boldsymbol{v}_2\}\) is a subspace of \(V\). (b) For \(H = \{(a - 3b,\; b - a,\; a,\; b) : a, b \in \mathbb{R}\}\): show it is a subspace of \(\mathbb{R}^4\) and find a basis. (c) Is \(W = \{\boldsymbol{v}_1 + a\boldsymbol{v}_2 : a \in \mathbb{R}\}\) (\(\boldsymbol{v}_1 \ne \boldsymbol{0}\)) a subspace?`,
        s: [
          String.raw`**(a)** Verify the subspace properties. <em>Non-empty:</em> \(0\boldsymbol{v}_1 + 0\boldsymbol{v}_2 = \boldsymbol{0}\), so \(\boldsymbol{0} \in H\), \(H \ne \emptyset\). <em>Closed under addition:</em> for \(\boldsymbol{u} = a\boldsymbol{v}_1 + b\boldsymbol{v}_2\) and \(\boldsymbol{v} = c\boldsymbol{v}_1 + d\boldsymbol{v}_2\): $$\boldsymbol{u} + \boldsymbol{v} = (a{+}c)\boldsymbol{v}_1 + (b{+}d)\boldsymbol{v}_2 \in H$$ <em>Closed under scaling:</em> \(\lambda\boldsymbol{u} = (\lambda a)\boldsymbol{v}_1 + (\lambda b)\boldsymbol{v}_2 \in H\). Therefore \(H\) is a subspace. ∎`,
          String.raw`**(b)(i)** Factor: \((a - 3b,\; b - a,\; a,\; b) = a(1, -1, 1, 0) + b(-3, 1, 0, 1)\). Hence \(H = \mathrm{span}\{(1,-1,1,0)^\top, (-3,1,0,1)^\top\}\), and the span of vectors is always a subspace ✓.`,
          String.raw`**(b)(ii)** Suppose \(\alpha\boldsymbol{v}_1 + \beta\boldsymbol{v}_2 = \boldsymbol{0}\). Comparing the third and fourth coordinates: \(\alpha = 0\) and \(\beta = 0\) — independent. Therefore \(\{(1,-1,1,0)^\top, (-3,1,0,1)^\top\}\) is a basis for \(H\).`,
          String.raw`**(c)** \(W = \boldsymbol{v}_1 + \mathrm{span}\{\boldsymbol{v}_2\}\). For \(W\) to be a subspace it must contain \(\boldsymbol{0}\): suppose \(\boldsymbol{v}_1 + a\boldsymbol{v}_2 = \boldsymbol{0}\), i.e. \(\boldsymbol{v}_1 = -a\boldsymbol{v}_2\). That holds only when \(\boldsymbol{v}_1\) is a scalar multiple of \(\boldsymbol{v}_2\) — not true in general. Hence \(W\) does not necessarily contain the zero vector and is <b>not a subspace</b> of \(V\) in general (it is an affine line).`
        ],
        fin: String.raw`Spans are subspaces; \(H\) has the two-vector basis; \(W\) is affine (missing \(\boldsymbol{0}\)) — not a subspace in general.`
      }
    ]
  });

  /* ==================== 2.11 LINEAR ALGEBRA PRACTICE ==================== */
  MML.exam.sets.push({
    id: 'ds-la', icon: '🧮', tag: tag,
    title: 'Practice: Linear Algebra & Transformations',
    sub: 'Section 2.11 · 12 problems · systems, inner products, inverses, subspaces, independence, basis, rank',
    problems: [
      {
        n: 1, pts: 2, topic: '3×3 system', chapter: 'ch2', diff: 'easy',
        q: String.raw`Meal from foods A, B, C hitting targets 7 g X, 10 g Y, 1 g Z, one serving providing \(\begin{pmatrix}2&1&-1\\1&3&1\\-1&1&2\end{pmatrix}\) over (X, Y, Z). Write and solve the system for servings \((x_1, x_2, x_3)\).`,
        s: [
          String.raw`System: \(2x_1 + x_2 - x_3 = 7\), \(x_1 + 3x_2 + x_3 = 10\), \(-x_1 + x_2 + 2x_3 = 1\). Swap rows 1↔2 (leading 1), then \(R_2 \to R_2 - 2R_1\), \(R_3 \to R_3 + R_1\): $$\begin{pmatrix}1&3&1&10\\0&-5&-3&-13\\0&4&3&11\end{pmatrix}$$ then \(R_3 \to R_3 + \tfrac45 R_2\): $$\begin{pmatrix}1&3&1&10\\0&-5&-3&-13\\0&0&\tfrac35&\tfrac35\end{pmatrix}$$`,
          String.raw`Row 3: \(x_3 = 1\). Row 2: \(-5x_2 - 3 = -13 \Rightarrow x_2 = 2\). Row 1: \(x_1 + 6 + 1 = 10 \Rightarrow x_1 = 3\).`,
          String.raw`Check: \(2(3) + 2 - 1 = 7\) ✓, \(3 + 3(2) + 1 = 10\) ✓, \(-3 + 2 + 2 = 1\) ✓ — all three satisfied.`
        ],
        fin: String.raw`\((x_1, x_2, x_3) = (3, 2, 1)\) — unique solution.`
      },
      {
        n: 2, pts: 2, topic: 'Underdetermined system', chapter: 'ch2', diff: 'med',
        q: String.raw`Classify without full solving: \(x_1 + 2x_2 - x_3 = 3\); \(2x_1 + 4x_2 - 2x_3 = 6\); \(x_1 + x_2 + x_3 = 4\). Then find the complete general solution.`,
        s: [
          String.raw`Equation (2) is exactly \(2 \times\) equation (1): \(2(x_1 + 2x_2 - x_3) = 2 \cdot 3\) matches (2) exactly. So (2) carries no new information — only two independent equations in three unknowns: <b>infinitely many solutions</b> (consistent, since (2) doesn't contradict (1)).`,
          String.raw`Use (1) and (3): subtracting gives \(x_2 - 2x_3 = -1 \Rightarrow x_2 = 2x_3 - 1\). Substituting into (3): \(x_1 + (2x_3 - 1) + x_3 = 4 \Rightarrow x_1 = 5 - 3x_3\). Let \(x_3 = t\): $$\boldsymbol{x} = (5 - 3t,\; 2t - 1,\; t), \quad t \in \mathbb{R}$$`
        ],
        fin: String.raw`Infinitely many: \((5 - 3t, 2t - 1, t)\).`
      },
      {
        n: 3, pts: 2, topic: 'Associativity, non-commutativity', chapter: 'ch2', diff: 'easy',
        q: String.raw`\(A = \begin{pmatrix}1&2\\0&1\end{pmatrix}\), \(B = \begin{pmatrix}2&0\\1&3\end{pmatrix}\), \(C = \begin{pmatrix}1&1\\1&0\end{pmatrix}\). (a) Compute \(AB\), \(BA\), confirm different. (b) Compute \((AB)C\) and \(A(BC)\) separately; confirm associativity.`,
        s: [
          String.raw`**(a)** $$AB = \begin{pmatrix}1&2\\0&1\end{pmatrix}\begin{pmatrix}2&0\\1&3\end{pmatrix} = \begin{pmatrix}4&6\\1&3\end{pmatrix}, \qquad BA = \begin{pmatrix}2&0\\1&3\end{pmatrix}\begin{pmatrix}1&2\\0&1\end{pmatrix} = \begin{pmatrix}2&4\\1&5\end{pmatrix}$$ Indeed \(AB \ne BA\).`,
          String.raw`**(b)** First \(BC = \begin{pmatrix}2&0\\1&3\end{pmatrix}\begin{pmatrix}1&1\\1&0\end{pmatrix} = \begin{pmatrix}2&2\\4&1\end{pmatrix}\), so $$A(BC) = \begin{pmatrix}1&2\\0&1\end{pmatrix}\begin{pmatrix}2&2\\4&1\end{pmatrix} = \begin{pmatrix}10&4\\4&1\end{pmatrix}$$ Separately, using \(AB = \begin{pmatrix}4&6\\1&3\end{pmatrix}\): $$(AB)C = \begin{pmatrix}4&6\\1&3\end{pmatrix}\begin{pmatrix}1&1\\1&0\end{pmatrix} = \begin{pmatrix}10&4\\4&1\end{pmatrix}$$ Both equal \(\begin{pmatrix}10&4\\4&1\end{pmatrix}\): \((AB)C = A(BC)\) — associativity holds even though \(AB \ne BA\).`
        ],
        fin: String.raw`\(AB \ne BA\), but \((AB)C = A(BC) = \begin{pmatrix}10&4\\4&1\end{pmatrix}\).`
      },
      {
        n: 4, pts: 2, topic: '3×3 inverse', chapter: 'ch2', diff: 'med',
        q: String.raw`\(M = \begin{pmatrix}2&0&1\\1&1&0\\0&1&1\end{pmatrix}\). (a) \(\det M\) to confirm invertibility. (b) \(M^{-1}\) by augmented-matrix Gauss–Jordan; verify \(MM^{-1} = I_3\).`,
        s: [
          String.raw`**(a)** Expanding along the first row: $$\det M = 2(1\cdot1 - 0\cdot1) - 0 + 1(1\cdot1 - 1\cdot0) = 2(1) + 1(1) = 3 \ne 0$$ so \(M\) is invertible.`,
          String.raw`**(b)** Form \([M | I_3]\) and row-reduce to RREF (same systematic process as any Gauss–Jordan run) — the right-hand block becomes $$M^{-1} = \frac13\begin{pmatrix}1&1&-1\\-1&2&1\\1&-2&2\end{pmatrix}$$ Check (row 1): \((2, 0, 1)\cdot\tfrac13(1, -1, 1) = \tfrac13(2 + 0 + 1) = 1\) ✓; \((2,0,1)\cdot\tfrac13(1,2,-2) = \tfrac13(2 + 0 - 2) = 0\) ✓ — multiplying \(M \cdot M^{-1}\) directly confirms \(I_3\).`
        ],
        fin: String.raw`\(\det M = 3\); \(M^{-1} = \frac13\begin{pmatrix}1&1&-1\\-1&2&1\\1&-2&2\end{pmatrix}\).`
      },
      {
        n: 5, pts: 2, topic: 'Gaussian elimination', chapter: 'ch2', diff: 'easy',
        q: String.raw`Solve \(x_1 + x_2 + x_3 = 6\); \(2x_1 - x_2 + x_3 = 3\); \(x_1 + 2x_2 - x_3 = 2\), showing the row-echelon form along the way.`,
        s: [
          String.raw`\(R_2 - 2R_1\), \(R_3 - R_1\): $$\begin{pmatrix}1&1&1&6\\0&-3&-1&-9\\0&1&-2&-4\end{pmatrix}$$ then \(R_3 \to R_3 + \tfrac13 R_2\): $$\begin{pmatrix}1&1&1&6\\0&-3&-1&-9\\0&0&-\tfrac73&-7\end{pmatrix}$$ — row-echelon form.`,
          String.raw`Row 3: \(-\tfrac73 x_3 = -7 \Rightarrow x_3 = 3\). Row 2: \(-3x_2 - 3 = -9 \Rightarrow x_2 = 2\). Row 1: \(x_1 + 2 + 3 = 6 \Rightarrow x_1 = 1\).`
        ],
        fin: String.raw`\((x_1, x_2, x_3) = (1, 2, 3)\).`
      },
      {
        n: 6, pts: 2, topic: '2×2 inverse two ways', chapter: 'ch2', diff: 'easy',
        q: String.raw`\(N = \begin{pmatrix}1&2\\3&4\end{pmatrix}\): (a) closed-form formula; (b) augmented-matrix method \([N|I_2] \rightsquigarrow [I_2|N^{-1}]\); confirm agreement.`,
        s: [
          String.raw`**(a)** \(\det N = (1)(4) - (2)(3) = -2\): $$N^{-1} = \frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix} = \begin{pmatrix}-2&1\\1.5&-0.5\end{pmatrix}$$`,
          String.raw`**(b)** \([N|I] \xrightarrow{R_2 - 3R_1} \begin{pmatrix}1&2&1&0\\0&-2&-3&1\end{pmatrix} \xrightarrow{-\tfrac12 R_2} \begin{pmatrix}1&2&1&0\\0&1&1.5&-0.5\end{pmatrix} \xrightarrow{R_1 - 2R_2} \begin{pmatrix}1&0&-2&1\\0&1&1.5&-0.5\end{pmatrix}\) — exactly matching (a).`
        ],
        fin: String.raw`\(N^{-1} = \begin{pmatrix}-2&1\\3/2&-1/2\end{pmatrix}\) both ways.`
      },
      {
        n: 7, pts: 2, topic: 'Subspace or not?', chapter: 'ch2', diff: 'easy',
        q: String.raw`Subspace of \(\mathbb{R}^3\)? (a) \(U_1 = \{\boldsymbol{x} : x_1 + 2x_2 - x_3 = 0\}\); (b) \(U_2 = \{\boldsymbol{x} : x_1 + 2x_2 - x_3 = 5\}\).`,
        s: [
          String.raw`**(a)** \(U_1\) is the solution set of the homogeneous equation — the kernel of the linear map \((x_1, x_2, x_3) \mapsto x_1 + 2x_2 - x_3\). Directly: \(0 \in U_1\); if \(\boldsymbol{x}, \boldsymbol{y} \in U_1\) then \((x_1{+}y_1) + 2(x_2{+}y_2) - (x_3{+}y_3) = 0 + 0 = 0\) ✓; \(\lambda x_1 + 2\lambda x_2 - \lambda x_3 = \lambda \cdot 0 = 0\) ✓. All conditions hold: <b>subspace</b>.`,
          String.raw`**(b)** Inhomogeneous: \(0 + 2(0) - 0 = 0 \ne 5\), so \(\boldsymbol{0} \notin U_2\) — condition 1 already fails: <b>not a subspace</b> (it is an affine subspace — a plane not through the origin).`
        ],
        fin: String.raw`(a) yes (a kernel); (b) no (affine plane, missing \(\boldsymbol{0}\)).`
      },
      {
        n: 8, pts: 2, topic: 'Closure counterexample', chapter: 'ch2', diff: 'med',
        q: String.raw`\(U = \{(x_1, x_2) : x_1 x_2 \ge 0\}\) (same-sign coordinates, or a zero). Show \(U\) is not a subspace with a specific counterexample.`,
        s: [
          String.raw`Take \(\boldsymbol{x} = (1, 0) \in U\) (since \(1 \cdot 0 = 0 \ge 0\)) and \(\boldsymbol{y} = (0, -1) \in U\) (since \(0 \cdot (-1) = 0 \ge 0\)). Then \(\boldsymbol{x} + \boldsymbol{y} = (1, -1)\), and \(1 \cdot (-1) = -1 \lt 0\): \(\boldsymbol{x} + \boldsymbol{y} \notin U\).`,
          String.raw`This single counterexample to closure under addition shows \(U\) is not a subspace — even though it contains \(\boldsymbol{0}\) and is closed under nonnegative scalar multiples. Geometrically, \(U\) is the union of the first and third quadrants: not even convex, let alone a subspace.`
        ],
        fin: String.raw`Not closed under addition → not a subspace.`
      },
      {
        n: 9, pts: 2, topic: 'Three vectors: independence', chapter: 'ch2', diff: 'med',
        q: String.raw`\(\boldsymbol{v}_1 = (1,0,2)\), \(\boldsymbol{v}_2 = (2,1,0)\), \(\boldsymbol{v}_3 = (0,1,-4)\): independent? If not, find an explicit nontrivial combination equal to \(\boldsymbol{0}\).`,
        s: [
          String.raw`Row-reduce the column matrix: \(R_3 - 2R_1\) then \(R_3 + 4R_2\): $$\begin{pmatrix}1&2&0\\0&1&1\\0&0&0\end{pmatrix}$$ Column 3 is not a pivot column: <b>linearly dependent</b>.`,
          String.raw`Reading the relation: \(\boldsymbol{v}_3 = -2\boldsymbol{v}_1 + \boldsymbol{v}_2\) — check: \(-2(1,0,2) + (2,1,0) = (0,1,-4) = \boldsymbol{v}_3\) ✓. So \(2\boldsymbol{v}_1 - \boldsymbol{v}_2 + \boldsymbol{v}_3 = \boldsymbol{0}\).`
        ],
        fin: String.raw`Dependent: \(2\boldsymbol{v}_1 - \boldsymbol{v}_2 + \boldsymbol{v}_3 = \boldsymbol{0}\).`
      },
      {
        n: 10, pts: 2, topic: 'Four vectors in ℝ⁴', chapter: 'ch2', diff: 'med',
        q: String.raw`Are \((1,1,1,1)\), \((1,2,3,4)\), \((1,0,-1,-2)\), \((2,3,4,5)\) linearly independent?`,
        s: [
          String.raw`As columns and row-reduce: $$\begin{pmatrix}1&1&1&2\\1&2&0&3\\1&3&-1&4\\1&4&-2&5\end{pmatrix} \rightsquigarrow \begin{pmatrix}1&0&2&1\\0&1&-1&1\\0&0&0&0\\0&0&0&0\end{pmatrix}$$ Only 2 pivot columns (1 and 2): rank 2 < 4 — <b>linearly dependent</b>.`,
          String.raw`Relations: \(\boldsymbol{v}_3 = 2\boldsymbol{v}_1 - \boldsymbol{v}_2\) and \(\boldsymbol{v}_4 = \boldsymbol{v}_1 + \boldsymbol{v}_2\) — both directly checkable by substitution ✓.`
        ],
        fin: String.raw`Dependent (rank 2); \(\boldsymbol{v}_3 = 2\boldsymbol{v}_1 - \boldsymbol{v}_2\), \(\boldsymbol{v}_4 = \boldsymbol{v}_1 + \boldsymbol{v}_2\).`
      },
      {
        n: 11, pts: 2, topic: 'Basis of a span', chapter: 'ch2', diff: 'med',
        q: String.raw`\(U = \mathrm{span}[\boldsymbol{x}_1, \boldsymbol{x}_2, \boldsymbol{x}_3, \boldsymbol{x}_4]\) with \(\boldsymbol{x}_1 = (1,2,1)\), \(\boldsymbol{x}_2 = (0,1,1)\), \(\boldsymbol{x}_3 = (1,1,0)\), \(\boldsymbol{x}_4 = (2,5,3)\). Find a basis from the set itself; express the remaining vectors.`,
        s: [
          String.raw`Row-reduce: $$\begin{pmatrix}1&0&1&2\\2&1&1&5\\1&1&0&3\end{pmatrix} \rightsquigarrow \begin{pmatrix}1&0&1&2\\0&1&-1&1\\0&0&0&0\end{pmatrix}$$ Pivot columns 1 and 2: \(\{\boldsymbol{x}_1, \boldsymbol{x}_2\}\) is a basis of \(U\) (\(\dim U = 2\): a plane through the origin in \(\mathbb{R}^3\)).`,
          String.raw`Non-pivot columns: column 3 gives \(\boldsymbol{x}_3 = \boldsymbol{x}_1 - \boldsymbol{x}_2\) (check: \((1,2,1) - (0,1,1) = (1,1,0)\) ✓); column 4 gives \(\boldsymbol{x}_4 = 2\boldsymbol{x}_1 + \boldsymbol{x}_2\) (check: \((2,4,2) + (0,1,1) = (2,5,3)\) ✓).`
        ],
        fin: String.raw`Basis \(\{\boldsymbol{x}_1, \boldsymbol{x}_2\}\); \(\boldsymbol{x}_3 = \boldsymbol{x}_1 - \boldsymbol{x}_2\), \(\boldsymbol{x}_4 = 2\boldsymbol{x}_1 + \boldsymbol{x}_2\).`
      },
      {
        n: 12, pts: 2, topic: 'Rank computation', chapter: 'ch2', diff: 'easy',
        q: String.raw`Rank of \(A = \begin{pmatrix}2&1&3\\4&2&6\\1&1&2\end{pmatrix}\); is \(A\) regular (invertible)?`,
        s: [
          String.raw`\(R_2 - 2R_1\) → zero row; \(R_3 - \tfrac12 R_1\) → \((0, \tfrac12, \tfrac12)\); swap → $$\begin{pmatrix}2&1&3\\0&\tfrac12&\tfrac12\\0&0&0\end{pmatrix}$$ Two nonzero rows: \(\operatorname{rank}(A) = 2\).`,
          String.raw`\(3 \times 3\) with rank \(2 \ne 3\): <b>not regular</b> — consistent with row 2 of the original being exactly \(2 \times\) row 1, a clear linear dependency among the rows.`
        ],
        fin: String.raw`\(\operatorname{rank}(A) = 2\); not invertible.`
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
        q: String.raw`\(\det A\) for \(A = \begin{pmatrix}2&1&3\\0&4&-1\\1&2&2\end{pmatrix}\) by Laplace expansion along column 1; verify \(\det A = \det A^\top\).`,
        s: [
          String.raw`Expand along column 1 (cofactor signs \((-1)^{i+1}\)): $$\det A = 2\det\begin{pmatrix}4&-1\\2&2\end{pmatrix} - 0 + 1\cdot\det\begin{pmatrix}1&3\\4&-1\end{pmatrix} = 2(8 + 2) + (-1 - 12) = 20 - 13 = 7$$`,
          String.raw`Verify via the property: \(A^\top = \begin{pmatrix}2&0&1\\1&4&2\\3&-1&2\end{pmatrix}\); expanding gives the same value — \(\det A^\top = \det A = 7\) ✓.`
        ],
        fin: String.raw`\(\det A = \det A^\top = 7\).`
      },
      {
        n: 2, pts: 1, topic: 'Positive definiteness', chapter: 'ch4', diff: 'easy',
        q: String.raw`Positive definite? (a) \(A = \begin{pmatrix}4&2\\2&3\end{pmatrix}\); (b) \(B = \begin{pmatrix}1&2\\2&1\end{pmatrix}\).`,
        s: [
          String.raw`**(a)** Leading minors: \(4 \gt 0\); \(\det A = 12 - 4 = 8 \gt 0\). By Sylvester's criterion: <b>PD</b>. Eigenvalues \(\lambda = \tfrac{7 \pm \sqrt{17}}{2} \approx 5.56, 1.44\), both \(\gt 0\) ✓.`,
          String.raw`**(b)** \(\det B = 1 - 4 = -3 \lt 0\): a negative determinant means \(B\) has a negative eigenvalue (\(\lambda = 3, -1\)): <b>not PD</b> (indefinite).`
        ],
        fin: String.raw`(a) PD ✓; (b) not PD (indefinite).`
      },
      {
        n: 3, pts: 1, topic: 'Eigenvalues/vectors', chapter: 'ch4', diff: 'easy',
        q: String.raw`All eigenvalues/vectors of \(A = \begin{pmatrix}3&1\\1&3\end{pmatrix}\); verify \(\det = \prod\lambda\), \(\operatorname{tr} = \sum\lambda\).`,
        s: [
          String.raw`\(p_A(\lambda) = (3-\lambda)^2 - 1 = (\lambda - 4)(\lambda - 2)\): \(\lambda_1 = 4, \lambda_2 = 2\). For \(\lambda_1 = 4\): \((A - 4I)\boldsymbol{x} = \begin{pmatrix}-1&1\\1&-1\end{pmatrix}\boldsymbol{x} = 0 \Rightarrow x_1 = x_2\), \(E_4 = \mathrm{span}\{(1,1)^\top\}\). For \(\lambda_2 = 2\): \(\begin{pmatrix}1&1\\1&1\end{pmatrix}\boldsymbol{x} = 0 \Rightarrow x_1 = -x_2\), \(E_2 = \mathrm{span}\{(1,-1)^\top\}\).`,
          String.raw`Checks: \(\det A = 9 - 1 = 8 = 4 \cdot 2\) ✓; \(\operatorname{tr} A = 6 = 4 + 2\) ✓.`
        ],
        fin: String.raw`\(\lambda = 4, 2\); eigendirections \((1,1)\) and \((1,-1)\).`
      },
      {
        n: 4, pts: 1, topic: 'Eigenspaces & ONB', chapter: 'ch4', diff: 'med',
        q: String.raw`\(A = \begin{pmatrix}5&-2\\-2&2\end{pmatrix}\): characteristic polynomial, eigenvalues, eigenspaces; do the eigenvectors form an ONB?`,
        s: [
          String.raw`\(p_A(\lambda) = (5 - \lambda)(2 - \lambda) - 4 = \lambda^2 - 7\lambda + 6 = (\lambda - 6)(\lambda - 1)\): \(\lambda_1 = 6\), \(\lambda_2 = 1\).`,
          String.raw`For \(\lambda_1 = 6\): \(-x_1 - 2x_2 = 0 \Rightarrow x_1 = -2x_2\): \(\boldsymbol{p}_1 = \tfrac{1}{\sqrt5}\begin{pmatrix}2\\-1\end{pmatrix}\). For \(\lambda_2 = 1\): \(2x_1 = x_2\): \(\boldsymbol{p}_2 = \tfrac{1}{\sqrt5}\begin{pmatrix}1\\2\end{pmatrix}\).`,
          String.raw`\(\boldsymbol{p}_1^\top\boldsymbol{p}_2 = \tfrac15(2 - 2) = 0\) orthogonal ✓, \(\|\boldsymbol{p}_1\| = \|\boldsymbol{p}_2\| = 1\) ✓. Since \(A\) is symmetric, eigenvectors from different eigenspaces are automatically orthogonal (spectral theorem) — they form an <b>ONB</b>.`
        ],
        fin: String.raw`\(\lambda = 6, 1\); orthonormal eigenbasis by the spectral theorem.`
      },
      {
        n: 5, pts: 2, topic: 'Cholesky 3×3', chapter: 'ch4', diff: 'med',
        q: String.raw`Cholesky factorization \(A = LL^\top\) for \(A = \begin{pmatrix}9&3&0\\3&5&2\\0&2&6\end{pmatrix}\); bonus \(\det A\).`,
        s: [
          String.raw`Systematically: \(l_{11} = \sqrt9 = 3\), \(l_{21} = 3/3 = 1\), \(l_{31} = 0/3 = 0\). Then \(l_{22} = \sqrt{5 - 1} = 2\), \(l_{32} = (2 - 0\cdot1)/2 = 1\). Then \(l_{33} = \sqrt{6 - (0 + 1)} = \sqrt5 \approx 2.236\): $$L = \begin{pmatrix}3&0&0\\1&2&0\\0&1&\sqrt5\end{pmatrix}$$`,
          String.raw`Verify: \(LL^\top = \begin{pmatrix}9&3&0\\3&5&2\\0&2&6\end{pmatrix} = A\) ✓. Bonus: \(\det A = (l_{11}l_{22}l_{33})^2 = (3 \cdot 2 \cdot \sqrt5)^2 = 180\).`
        ],
        fin: String.raw`\(L = \begin{pmatrix}3&0&0\\1&2&0\\0&1&\sqrt5\end{pmatrix}\); \(\det A = 180\).`
      },
      {
        n: 6, pts: 1, topic: 'Eigendecomposition', chapter: 'ch4', diff: 'med',
        q: String.raw`Diagonalize \(A = \begin{pmatrix}4&-2\\-2&4\end{pmatrix}\) as \(PDP^{-1}\); verify by computing \(PDP^{-1}\).`,
        s: [
          String.raw`\(p_A(\lambda) = (4-\lambda)^2 - 4 = (\lambda - 6)(\lambda - 2)\): \(\lambda_1 = 6\), \(\lambda_2 = 2\). Eigenvectors \(\boldsymbol{p}_1 = \tfrac{1}{\sqrt2}(1, -1)^\top\), \(\boldsymbol{p}_2 = \tfrac{1}{\sqrt2}(1, 1)^\top\).`,
          String.raw`\(A\) symmetric with orthogonal eigenvectors ⟹ \(P^{-1} = P^\top\): \(P = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}\), \(D = \operatorname{diag}(6, 2)\). Verify: $$PDP^\top = \tfrac12\begin{pmatrix}1&1\\-1&1\end{pmatrix}\begin{pmatrix}6&0\\0&2\end{pmatrix}\begin{pmatrix}1&-1\\1&1\end{pmatrix} = \begin{pmatrix}4&-2\\-2&4\end{pmatrix} = A ✓$$`
        ],
        fin: String.raw`\(A = PDP^\top\), \(\Lambda = \operatorname{diag}(6, 2)\).`
      },
      {
        n: 7, pts: 1, topic: 'Matrix powers', chapter: 'ch4', diff: 'med',
        q: String.raw`Using \(A = PDP^{-1}\) from Problem 6, compute \(A^3\) efficiently.`,
        s: [
          String.raw`\(A^3 = PD^3P^{-1}\) with \(D^3 = \operatorname{diag}(6^3, 2^3) = \operatorname{diag}(216, 8)\): $$A^3 = \tfrac12\begin{pmatrix}1&1\\-1&1\end{pmatrix}\begin{pmatrix}216&0\\0&8\end{pmatrix}\begin{pmatrix}1&-1\\1&1\end{pmatrix} = \tfrac12\begin{pmatrix}224&-208\\-208&224\end{pmatrix} = \begin{pmatrix}112&-104\\-104&112\end{pmatrix}$$`,
          String.raw`Check: \(\operatorname{tr}(A^3) = 224 = \lambda_1^3 + \lambda_2^3 = 216 + 8\) ✓.`
        ],
        fin: String.raw`\(A^3 = \begin{pmatrix}112&-104\\-104&112\end{pmatrix}\) — eigenvalues cubed, no matrix slog.`
      },
      {
        n: 8, pts: 1, topic: 'SVD 2×2', chapter: 'ch4', diff: 'med',
        q: String.raw`Full SVD of \(A = \begin{pmatrix}1&1\\1&-1\end{pmatrix}\).`,
        s: [
          String.raw`\(A^\top A = \begin{pmatrix}2&0\\0&2\end{pmatrix} = 2I\): eigenvalues \(\lambda_1 = \lambda_2 = 2\), singular values \(\sigma_1 = \sigma_2 = \sqrt2\).`,
          String.raw`\(A^\top A = 2I\) ⟹ any orthonormal basis serves as right-singular vectors; choose \(V = I\) (\(\boldsymbol{v}_1 = (1,0)^\top\), \(\boldsymbol{v}_2 = (0,1)^\top\)). Left: \(\boldsymbol{u}_1 = \tfrac{1}{\sqrt2}A\boldsymbol{v}_1 = \tfrac{1}{\sqrt2}(1,1)^\top\), \(\boldsymbol{u}_2 = \tfrac{1}{\sqrt2}(1,-1)^\top\): $$U = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}, \quad \Sigma = \begin{pmatrix}\sqrt2&0\\0&\sqrt2\end{pmatrix}, \quad V = I$$ Verify: \(U\Sigma V^\top = A\) ✓.`
        ],
        fin: String.raw`\(A = U\Sigma V^\top\) with \(V = I\), \(\Sigma = \sqrt2 I\), \(U = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\).`
      },
      {
        n: 9, pts: 2, topic: 'SVD + pseudo-inverse', chapter: 'ch4', diff: 'med',
        q: String.raw`For \(A = \begin{pmatrix}4&0\\3&0\\0&2\\0&1\end{pmatrix}\): singular values and the rank-1 error \(\|A - \hat A^{(1)}_2\|\).`,
        s: [
          String.raw`\(A^\top A = \begin{pmatrix}25&0\\0&5\end{pmatrix}\): eigenvalues 25 and 5 ⟹ \(\sigma_1 = 5\), \(\sigma_2 = \sqrt5 \approx 2.236\).`,
          String.raw`By Eckart–Young, the best rank-1 approximation removes the second singular triplet \((\boldsymbol{u}_2, \sigma_2, \boldsymbol{v}_2)\) and the error is exactly \(\sigma_2 = \sqrt5\).`
        ],
        fin: String.raw`\(\sigma = (5, \sqrt5)\); \(\|A - \hat A^{(1)}\| = \sqrt5 \approx 2.236\).`
      },
      {
        n: 10, pts: 3, topic: 'Eckart–Young & compression', chapter: 'ch4', diff: 'hard',
        q: String.raw`Singular values \(\sigma_1 = 7.50\), \(\sigma_2 = 3.14\), \(\sigma_3 = 1.36\) for a \(3\times3\) matrix. (a) Spectral-norm error \(\|A - \hat A^{(2)}_3\|\)? (b) Energy \(\sum\sigma_i^2\) — what % does rank 2 retain? (c) For \(A \in \mathbb{R}^{100\times100}\): storage of the full matrix vs rank-2 SVD; compression ratio.`,
        s: [
          String.raw`**(a)** Eckart–Young: the best rank-\(k\) approximation satisfies \(\|A - \hat A^{(k)}\|_2 = \sigma_{k+1}\). For \(k = 2\): \(\|A - \hat A^{(2)}\|_2 = \sigma_3 = 1.36\) — no other rank-2 matrix does better.`,
          String.raw`**(b)** Total energy: \(7.50^2 + 3.14^2 + 1.36^2 = 56.25 + 9.86 + 1.85 = 67.96\). Kept by rank 2: \(56.25 + 9.86 = 66.11\): $$\frac{66.11}{67.96} \times 100 \approx 97.3\%$$ — discarding only ~2.7% of the energy.`,
          String.raw`**(c)** Full \(100 \times 100\): 10,000 numbers. Rank-2 SVD \(A \approx \sigma_1\boldsymbol{u}_1\boldsymbol{v}_1^\top + \sigma_2\boldsymbol{u}_2\boldsymbol{v}_2^\top\): 2 singular values + \(2 \times 100\) left vector entries + \(2 \times 100\) right = <b>402 numbers</b>. Compression ratio \(= 10{,}000/402 \approx 24.9\): ~25× more storage-efficient while retaining &gt; 97% of the energy.`
        ],
        fin: String.raw`(a) 1.36; (b) ≈ 97.3%; (c) 402 vs 10,000 — ≈ 25× compression.`
      }
    ]
  });

  /* ==================== 5.4 VECTOR CALCULUS ==================== */
  MML.exam.sets.push({
    id: 'ds-calc', icon: '⛰️', tag: tag,
    title: 'Practice: Vector Calculus & Gradients',
    sub: 'Section 5.4 · 20 problems · Taylor, Jacobians, softmax gradients, AD, Hessians, Newton',
    problems: [
      {
        n: 1, pts: 1, topic: 'First principles', chapter: 'ch5', diff: 'easy',
        q: String.raw`From \(f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h}\) compute \(f'(x)\) for \(f(x) = x^3\); evaluate at \(x = 2\); verify with the power rule.`,
        s: [
          String.raw`$$f'(x) = \lim_{h\to0}\frac{(x+h)^3 - x^3}{h} = \lim_{h\to0}\frac{3x^2h + 3xh^2 + h^3}{h} = \lim_{h\to0}(3x^2 + 3xh + h^2) = 3x^2$$ At \(x = 2\): \(f'(2) = 12\). Power rule agrees: \(\frac{d}{dx}x^3 = 3x^2\) ✓.`,
          String.raw`Numerical check: \(\frac{(2 + 10^{-4})^3 - 8}{10^{-4}} \approx 12.0001\) ✓.`
        ],
        fin: String.raw`\(f'(x) = 3x^2\); \(f'(2) = 12\).`
      },
      {
        n: 2, pts: 1, topic: 'Taylor polynomial', chapter: 'ch5', diff: 'easy',
        q: String.raw`Taylor polynomial \(T_4\) of \(e^x\) at \(x_0 = 0\); evaluate \(T_4(1)\) vs \(e \approx 2.71828\); error and its bound.`,
        s: [
          String.raw`All derivatives at 0 equal 1: \(T_4(x) = 1 + x + \tfrac{x^2}{2!} + \tfrac{x^3}{3!} + \tfrac{x^4}{4!} = 1 + x + \tfrac{x^2}{2} + \tfrac{x^3}{6} + \tfrac{x^4}{24}\).`,
          String.raw`\(T_4(1) = 1 + 1 + 0.5 + 0.16 + 0.0416 = \tfrac{65}{24} \approx 2.7083\). Error: \(|e - T_4(1)| \approx 0.00998\), bounded by the 5th-order remainder \(e^\xi/5! \approx \tfrac{2.72}{120} \approx 0.0227\) for some \(\xi \in (0,1)\) — actual error is smaller ✓.`
        ],
        fin: String.raw`\(T_4(1) \approx 2.7083\); error ≈ 0.01 (bound ≈ 0.023).`
      },
      {
        n: 3, pts: 1, topic: 'Partials & gradient', chapter: 'ch5', diff: 'easy',
        q: String.raw`\(f(x_1, x_2) = \sin(x_1x_2) + x_1^2\): compute both partials; evaluate the gradient at \((1, \pi/2)\).`,
        s: [
          String.raw`\(\frac{\partial f}{\partial x_1} = \cos(x_1x_2)\cdot x_2 + 2x_1\), \(\frac{\partial f}{\partial x_2} = \cos(x_1x_2)\cdot x_1\).`,
          String.raw`At \((1, \pi/2)\): \(\cos(1\cdot\pi/2) = 0\), so \(\partial f/\partial x_1 = 0\cdot\pi/2 + 2 = 2\) and \(\partial f/\partial x_2 = 0\): \(\nabla f(1, \pi/2) = (2, 0)^\top\).`
        ],
        fin: String.raw`\(\nabla f(1, \pi/2) = (2, 0)^\top\).`
      },
      {
        n: 4, pts: 1, topic: 'Multivariate chain rule', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f = x_1^2x_2\) with \(x_1(t) = t^2\), \(x_2(t) = \sin t\): compute \(df/dt\) at \(t = 1\).`,
        s: [
          String.raw`$$\frac{df}{dt} = \frac{\partial f}{\partial x_1}\frac{dx_1}{dt} + \frac{\partial f}{\partial x_2}\frac{dx_2}{dt} = 2x_1x_2\cdot 2t + x_1^2\cos t$$ At \(t = 1\): \(x_1 = 1\), \(x_2 = \sin 1 \approx 0.841\): \(df/dt = 2(1)(0.841)(2) + (1)^2\cos 1 = 3.365 + 0.540 \approx 3.906\).`
        ],
        fin: String.raw`\(df/dt(1) \approx 3.91\).`
      },
      {
        n: 5, pts: 1, topic: 'Jacobian & determinant', chapter: 'ch5', diff: 'med',
        q: String.raw`Jacobian of \(\boldsymbol{f}(x_1, x_2) = \begin{pmatrix}x_1^2 + x_2\\ x_1x_2^2\end{pmatrix}\); evaluate at \((2,3)\), compute \(\det J\); interpret.`,
        s: [
          String.raw`$$J = \begin{pmatrix}\partial f_1/\partial x_1 & \partial f_1/\partial x_2\\ \partial f_2/\partial x_1 & \partial f_2/\partial x_2\end{pmatrix} = \begin{pmatrix}2x_1&1\\x_2^2&2x_1x_2\end{pmatrix}$$ At \((2,3)\): \(J = \begin{pmatrix}4&1\\9&12\end{pmatrix}\).`,
          String.raw`\(\det J = 4\cdot12 - 1\cdot9 = 48 - 9 = 39\): near \((2,3)\) the transformation locally magnifies areas by a factor of 39.`
        ],
        fin: String.raw`\(J = \begin{pmatrix}4&1\\9&12\end{pmatrix}\), \(\det J = 39\) (local area magnification).`
      },
      {
        n: 6, pts: 2, topic: 'Softmax cross-entropy gradient', chapter: 'ch5', diff: 'hard',
        q: String.raw`Softmax cross-entropy \(L = -\sum_c y_c\log\sigma_c(\boldsymbol{z})\), \(\sigma_c = e^{z_c}/\sum_j e^{z_j}\). Show \(\partial L/\partial\boldsymbol{z} = (\boldsymbol{\sigma} - \boldsymbol{y})^\top\) (row vector).`,
        s: [
          String.raw`Step 1: \(\partial L/\partial\sigma_c = -y_c/\sigma_c\), so \(\partial L/\partial\boldsymbol{\sigma} = (-\boldsymbol{y}/\boldsymbol{\sigma})^\top \in \mathbb{R}^{1\times n}\).`,
          String.raw`Step 2: the softmax Jacobian \(\partial\boldsymbol{\sigma}/\partial\boldsymbol{z} \in \mathbb{R}^{n\times n}\) has entries \(J_{ij} = \sigma_i(\delta_{ij} - \sigma_j)\).`,
          String.raw`Step 3 — chain rule: $$\frac{\partial L}{\partial z_j} = \sum_i \frac{-y_i}{\sigma_i}\,\sigma_i(\delta_{ij} - \sigma_j) = \sum_i(-y_i)(\delta_{ij} - \sigma_j) = -y_j + \sigma_j\sum_i y_i$$ Since \(\sum_i y_i = 1\) (one-hot): \(\partial L/\partial z_j = \sigma_j - y_j\), i.e. \(\partial L/\partial\boldsymbol{z} = (\boldsymbol{\sigma} - \boldsymbol{y})^\top\) ✓.`,
          String.raw`Numerical example: \(\boldsymbol{z} = (3,1,0)\), \(\boldsymbol{y} = (1,0,0)\): \(\boldsymbol{\sigma} \approx (0.844, 0.114, 0.042)\), gradient \(\approx (-0.156, 0.114, 0.042)\). The gradient is small for correct predictions, large for wrong ones.`
        ],
        fin: String.raw`\(\nabla_{\boldsymbol{z}}L = \boldsymbol{\sigma} - \boldsymbol{y}\).`
      },
      {
        n: 7, pts: 1, topic: 'Quadratic-form gradient', chapter: 'ch5', diff: 'easy',
        q: String.raw`\(f(\boldsymbol{x}) = \boldsymbol{x}^\top B\boldsymbol{x}\), \(B = \begin{pmatrix}2&1\\1&3\end{pmatrix}\): compute \(\nabla_{\boldsymbol{x}}f\); evaluate at \((1,2)^\top\); verify with a finite difference.`,
        s: [
          String.raw`\(\nabla_{\boldsymbol{x}}(\boldsymbol{x}^\top B\boldsymbol{x}) = \boldsymbol{x}^\top(B + B^\top)\); \(B\) symmetric ⟹ \(\nabla f = 2\boldsymbol{x}^\top B\).`,
          String.raw`At \((1,2)\): \(2(1,2)\begin{pmatrix}2&1\\1&3\end{pmatrix} = 2(2 + 2,\; 1 + 6) = (8, 14)\).`,
          String.raw`Verify: \(f(1,2) = (4, 7)\binom{1}{2} = 18\); finite difference \(\partial f/\partial x_1 \approx [f(1{+}h, 2) - f(1,2)]/h \approx 8\) ✓.`
        ],
        fin: String.raw`\(\nabla f(1,2) = (8, 14)^\top\).`
      },
      {
        n: 8, pts: 1, topic: 'Trace gradient', chapter: 'ch5', diff: 'med',
        q: String.raw`Show \(\partial\operatorname{tr}(AX)/\partial X = A^\top\) for square \(A, X\); special case \(A = I\); ML application to \(\|X\|_F^2\).`,
        s: [
          String.raw`\(\operatorname{tr}(AX) = \sum_{i,j} A_{ij}X_{ji}\). Differentiating: $$\frac{\partial\operatorname{tr}(AX)}{\partial X_{kl}} = \frac{\partial}{\partial X_{kl}}\sum_{i,j}A_{ij}X_{ji} = A_{lk} \;\Rightarrow\; \frac{\partial\operatorname{tr}(AX)}{\partial X} = A^\top$$ Special case \(A = I\): \(\partial\operatorname{tr}(X)/\partial X = I\).`,
          String.raw`ML application: \(\|X\|_F^2 = \operatorname{tr}(X^\top X)\) has gradient \((X^\top + X) = 2X\) — exactly the gradient used in weight-decay regularisation.`
        ],
        fin: String.raw`\(\partial\operatorname{tr}(AX)/\partial X = A^\top\); \(\partial\|X\|_F^2/\partial X = 2X\).`
      },
      {
        n: 9, pts: 2, topic: 'Ridge normal equations', chapter: 'ch9', diff: 'med',
        q: String.raw`Minimise \(L(\boldsymbol{\theta}) = \|\boldsymbol{y} - X\boldsymbol{\theta}\|_2^2 + \lambda\|\boldsymbol{\theta}\|_2^2\), \(\lambda \gt 0\): find \(\hat{\boldsymbol{\theta}}\); why always solvable?`,
        s: [
          String.raw`Using \(\partial(\boldsymbol{\theta}^\top\boldsymbol{\theta})/\partial\boldsymbol{\theta} = 2\boldsymbol{\theta}^\top\): $$\frac{\partial L}{\partial\boldsymbol{\theta}} = -2(\boldsymbol{y} - X\boldsymbol{\theta})^\top X + 2\lambda\boldsymbol{\theta}^\top$$ Setting to zero (row vector = 0): \(-2(\boldsymbol{y} - X\boldsymbol{\theta})^\top X + 2\lambda\boldsymbol{\theta}^\top = 0 \iff X^\top(\boldsymbol{y} - X\boldsymbol{\theta}) = \lambda\boldsymbol{\theta} \iff (X^\top X + \lambda I)\hat{\boldsymbol{\theta}} = X^\top\boldsymbol{y}\).`,
          String.raw`Ridge solution: \(\hat{\boldsymbol{\theta}} = (X^\top X + \lambda I)^{-1}X^\top\boldsymbol{y}\). The matrix \(X^\top X + \lambda I\) is <b>always invertible</b> (even when \(X^\top X\) is singular): adding \(\lambda I\) shifts all eigenvalues by \(+\lambda\). This is why ridge is numerically stable even with multicollinear features.`
        ],
        fin: String.raw`\(\hat{\boldsymbol{\theta}} = (X^\top X + \lambda I)^{-1}X^\top\boldsymbol{y}\), always well-defined.`
      },
      {
        n: 10, pts: 2, topic: 'Softmax layer weight gradient', chapter: 'ch5', diff: 'hard',
        q: String.raw`\(p = \mathrm{softmax}(W\boldsymbol{x})\), \(W \in \mathbb{R}^{k\times d}\), \(L = -\boldsymbol{y}^\top\log\boldsymbol{p}\). (a) Dimension of \(\partial L/\partial W\)? (b) Show \(\partial L/\partial W = (\boldsymbol{p} - \boldsymbol{y})\boldsymbol{x}^\top\).`,
        s: [
          String.raw`(a) \(L \in \mathbb{R}\), \(W \in \mathbb{R}^{k\times d}\), so \(\partial L/\partial W \in \mathbb{R}^{k\times d}\).`,
          String.raw`(b) Let \(\boldsymbol{z} = W\boldsymbol{x}\). By Problem 6: \(\partial L/\partial\boldsymbol{z} = (\boldsymbol{p} - \boldsymbol{y})^\top \in \mathbb{R}^{1\times k}\). And \(\partial z_i/\partial W_{ij} = x_j\) (with \(\partial z_i/\partial W_{lj} = 0\) for \(l \ne i\)): $$\frac{\partial L}{\partial W_{ij}} = \frac{\partial L}{\partial z_i}\frac{\partial z_i}{\partial W_{ij}} = (p_i - y_i)x_j \;\Rightarrow\; \frac{\partial L}{\partial W} = (\boldsymbol{p} - \boldsymbol{y})\boldsymbol{x}^\top \in \mathbb{R}^{k\times d}$$`,
          String.raw`Numerical: \(k = 3\), \(d = 2\), \(\boldsymbol{p} = (0.7, 0.2, 0.1)^\top\), \(\boldsymbol{y} = (1,0,0)^\top\), \(\boldsymbol{x} = (1,2)^\top\): $$\partial L/\partial W = (-0.3, 0.2, 0.1)^\top(1, 2) = \begin{pmatrix}-0.3&-0.6\\0.2&0.1\\0.1&0.2\end{pmatrix}$$ — implemented directly in every deep learning framework's softmax + cross-entropy layer.`
        ],
        fin: String.raw`\(\partial L/\partial W = (\boldsymbol{p} - \boldsymbol{y})\boldsymbol{x}^\top\).`
      },
      {
        n: 11, pts: 1, topic: 'Reverse-mode AD', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x) = e^{x^2}\): computation graph \(a = x^2\), \(b = e^a\), \(f = b\). Reverse-mode \(df/dx\) at \(x = 2\); verify numerically.`,
        s: [
          String.raw`Local derivatives: \(\partial a/\partial x = 2x\), \(\partial b/\partial a = e^a = e^{x^2}\), \(\partial f/\partial b = 1\).`,
          String.raw`Backward pass: \(\bar f = 1\), \(\bar a = 1\cdot e^a\), \(\bar x = e^a\cdot2x = 2xe^{x^2}\). At \(x = 2\): \(a = 4\), \(f = e^4 \approx 54.598\), \(df/dx = 4e^4 \approx 218.39\).`,
          String.raw`Numerical check: \(\frac{e^{(2+10^{-6})^2} - e^4}{10^{-6}} \approx 218.39\) ✓.`
        ],
        fin: String.raw`\(df/dx(2) = 4e^4 \approx 218.39\).`
      },
      {
        n: 12, pts: 2, topic: 'Reverse-mode AD, two inputs', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x_1, x_2) = \ln(x_1^2\cdot e^{x_2})\): intermediates \(a = x_1^2\), \(b = e^{x_2}\), \(c = ab\), \(f = \ln c\). Reverse-mode at \((2, 1)\).`,
        s: [
          String.raw`Forward pass at \((2,1)\): \(a = 4\), \(b = e \approx 2.718\), \(c = 4e \approx 10.873\), \(f = \ln(4e) = \ln 4 + 1 \approx 2.386\).`,
          String.raw`Local derivatives: \(\partial a/\partial x_1 = 2x_1 = 4\), \(\partial b/\partial x_2 = e\), \(\partial c/\partial a = b = e\), \(\partial c/\partial b = a = 4\), \(\partial f/\partial c = 1/c = 1/(4e)\).`,
          String.raw`Backward: \(\bar c = 1/(4e)\); \(\bar a = \bar c\cdot b = e/(4e) = 1/4\); \(\bar b = \bar c\cdot a = 4/(4e) = 1/e\); $$\partial f/\partial x_1 = \bar a\cdot4 = 1 \;\text{(exact: } 2/x_1 = 1\text{)} ✓ \qquad \partial f/\partial x_2 = \bar b\cdot e = 1 \;\text{(exact: } 1\text{)} ✓$$`
        ],
        fin: String.raw`Both partials = 1 at \((2,1)\) — AD exact to machine precision.`
      },
      {
        n: 13, pts: 1, topic: 'Forward-mode AD', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x_1, x_2) = x_1^2 + x_1x_2\) at \((1,2)\): forward-mode AD with seed \((\dot x_1, \dot x_2) = (1, 0)\) for \(\partial f/\partial x_1\); how many sweeps for the full gradient?`,
        s: [
          String.raw`Every variable is a (value | tangent) pair; seed \((1, 0)\) means \(x_1 = (1|1)\), \(x_2 = (2|0)\). Propagate: \(a = x_1^2 = (1\,|\,2x_1\dot x_1 = 2)\); \(b = x_1x_2 = (2\,|\,x_2\dot x_1 + x_1\dot x_2 = 2)\); \(f = a + b = (3\,|\,\dot a + \dot b = 4)\).`,
          String.raw`The seed makes the output tangent \(\dot f = \partial f/\partial x_1 = 4\); analytic check: \(2x_1 + x_2 = 4\) ✓. For \(\partial f/\partial x_2\): repeat with seed \((0,1)\), giving \(\dot f = x_1 = 1\).`,
          String.raw`For two inputs, forward-mode needs one sweep per variable (two total); reverse-mode gets the complete gradient in one backward pass — the efficiency argument for training many-parameter models.`
        ],
        fin: String.raw`\(\partial f/\partial x_1(1,2) = 4\) in one forward sweep; one sweep per input.`
      },
      {
        n: 14, pts: 2, topic: 'Backprop: sigmoid + BCE', chapter: 'ch5', diff: 'med',
        q: String.raw`Neuron \(\hat y = \sigma(wx + b)\), \(L = -[y\log\hat y + (1-y)\log(1-\hat y)]\): computation graph, reverse-mode \(\partial L/\partial w\) and \(\partial L/\partial b\).`,
        s: [
          String.raw`Graph: \(z = wx + b \to \hat y = \sigma(z) \to L\). Local derivatives: \(\partial z/\partial w = x\), \(\partial z/\partial b = 1\), \(\partial\hat y/\partial z = \hat y(1 - \hat y)\), and $$\frac{\partial L}{\partial\hat y} = -\frac{y}{\hat y} + \frac{1-y}{1-\hat y} = \frac{\hat y - y}{\hat y(1-\hat y)}$$`,
          String.raw`Backward pass: $$\frac{\partial L}{\partial z} = \frac{\hat y - y}{\hat y(1-\hat y)}\cdot\hat y(1-\hat y) = \hat y - y$$ $$\frac{\partial L}{\partial w} = (\hat y - y)\,x, \qquad \frac{\partial L}{\partial b} = \hat y - y$$ The gradient is simply the prediction error \((\hat y - y)\) times the input \(x\) (for \(w\)) — a classic result.`
        ],
        fin: String.raw`\(\partial L/\partial w = (\hat y - y)x\), \(\partial L/\partial b = \hat y - y\).`
      },
      {
        n: 15, pts: 1, topic: 'Schwarz / Hessian symmetry', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x, y) = x^3y + \sin(xy)\): all second-order partials; verify Schwarz's theorem.`,
        s: [
          String.raw`First order: \(\partial f/\partial x = 3x^2y + y\cos(xy)\), \(\partial f/\partial y = x^3 + x\cos(xy)\).`,
          String.raw`Second order: \(\partial^2f/\partial x^2 = 6xy - y^2\sin(xy)\); \(\partial^2f/\partial y^2 = -x^2\sin(xy)\); $$\frac{\partial^2f}{\partial y\partial x} = 3x^2 + \cos(xy) - xy\sin(xy) = \frac{\partial^2f}{\partial x\partial y} \;\checkmark \text{ (Schwarz)}$$`,
          String.raw`Hessian \(H_f = \begin{pmatrix}6xy - y^2\sin(xy) & 3x^2 + \cos(xy) - xy\sin(xy)\\ 3x^2 + \cos(xy) - xy\sin(xy) & -x^2\sin(xy)\end{pmatrix}\) — symmetric ✓.`
        ],
        fin: String.raw`Mixed partials agree; Hessian symmetric.`
      },
      {
        n: 16, pts: 1, topic: 'Critical-point classification', chapter: 'ch5', diff: 'med',
        q: String.raw`\(f(x, y) = x^3 - 3x + y^2\): find all critical points, compute the Hessian at each, classify.`,
        s: [
          String.raw`Critical points: \(\partial f/\partial x = 3x^2 - 3 = 0 \Rightarrow x = \pm1\); \(\partial f/\partial y = 2y = 0 \Rightarrow y = 0\): points \((1, 0)\) and \((-1, 0)\).`,
          String.raw`Hessian: \(H_f = \begin{pmatrix}6x&0\\0&2\end{pmatrix}\). At \((1,0)\): \(H = \begin{pmatrix}6&0\\0&2\end{pmatrix}\), eigenvalues \(6, 2 \gt 0\) ⟹ <b>local minimum</b>, \(f(1,0) = -2\). At \((-1,0)\): \(H = \begin{pmatrix}-6&0\\0&2\end{pmatrix}\), eigenvalues \(-6, 2\) (indefinite) ⟹ <b>saddle point</b>, \(f(-1,0) = 2\).`
        ],
        fin: String.raw`Local min at \((1,0)\); saddle at \((-1,0)\).`
      },
      {
        n: 17, pts: 1, topic: 'Convexity via Hessian', chapter: 'ch5', diff: 'easy',
        q: String.raw`Is \(f(x, y) = 2x^2 + 3y^2 - xy\) strictly convex? Find the minimum via the Hessian; Newton step from \((1,1)\).`,
        s: [
          String.raw`Hessian: \(\partial^2f/\partial x^2 = 4\), \(\partial^2f/\partial y^2 = 6\), \(\partial^2f/\partial x\partial y = -1\): \(H = \begin{pmatrix}4&-1\\-1&6\end{pmatrix}\). Eigenvalues \(= 5 \pm \sqrt2 \approx 3.586, 6.414\), both positive ⟹ \(H \succ 0\) ⟹ <b>strictly convex</b>.`,
          String.raw`Critical point: \(\nabla f = (4x - y,\; -x + 6y) = 0\) ⟹ \(y = 4x\) and \(-x + 24x = 0 \Rightarrow x = 0, y = 0\): unique global minimum at \((0,0)\), \(f = 0\).`,
          String.raw`Newton from \((1,1)\): \(\nabla f(1,1) = (3,5)^\top\), \(H^{-1} = \tfrac1{23}\begin{pmatrix}6&1\\1&4\end{pmatrix}\), \(H^{-1}(3,5)^\top = (1,1)^\top\). New point \((1,1) - (1,1) = (0,0)\): reaches the minimum in one step ✓.`
        ],
        fin: String.raw`Strictly convex; unique min at origin; Newton nails it in one step.`
      },
      {
        n: 18, pts: 1, topic: 'Second-order Taylor', chapter: 'ch5', diff: 'med',
        q: String.raw`\(T_2(x, y)\) of \(f(x, y) = \cos x + \sin y\) at \((0,0)\); evaluate \(T_2(0.1, 0.1)\) vs \(f(0.1, 0.1)\).`,
        s: [
          String.raw`\(f(0,0) = 1\). Gradient: \(\nabla f = (-\sin x, \cos y)\), at origin \((0, 1)\) — no linear term in \(x\) (slope of \(\cos\) at 0 is zero), linear term \(= y\).`,
          String.raw`Second derivatives: \(\partial^2f/\partial x^2 = -\cos x \to -1\); \(\partial^2f/\partial y^2 = -\sin y \to 0\); mixed \(= 0\) (independent terms). Hessian \(\begin{pmatrix}-1&0\\0&0\end{pmatrix}\): quadratic term \(= \tfrac12(-x^2) = -\tfrac12x^2\). $$T_2(x, y) = 1 + y - \tfrac12x^2$$`,
          String.raw`\(T_2(0.1, 0.1) = 1 + 0.1 - 0.005 = 1.095\). Exact: \(f(0.1,0.1) = \cos 0.1 + \sin 0.1 \approx 0.99500 + 0.09983 = 1.09483\). Error \(\approx 0.00017\) — tiny because neglected terms are third order and higher, negligible near the expansion point.`
        ],
        fin: String.raw`\(T_2 = 1 + y - \tfrac12x^2\); error \(\approx 1.7\times10^{-4}\).`
      },
      {
        n: 19, pts: 1, topic: 'Taylor of a quadratic = exact', chapter: 'ch5', diff: 'easy',
        q: String.raw`Complete Taylor expansion of \(f(x, y) = x^2 + xy + y^2\) at \((1,1)\); verify it equals \(f\).`,
        s: [
          String.raw`\(f(1,1) = 3\). Gradient \((2x + y, x + 2y)|_{(1,1)} = (3, 3)\). Hessian constant: \(\begin{pmatrix}2&1\\1&2\end{pmatrix}\). Since \(f\) is degree 2, \(T_2 = f\) exactly — all higher-order terms vanish.`,
          String.raw`$$T_2 = 3 + 3(x-1) + 3(y-1) + (x-1)^2 + (x-1)(y-1) + (y-1)^2$$ Expanding: \(3 + 3x - 3 + 3y - 3 + x^2 - 2x + 1 + xy - x - y + 1 + y^2 - 2y + 1 = x^2 + xy + y^2 = f\) ✓.`
        ],
        fin: String.raw`\(T_2 \equiv f\): quadratics are their own second-order Taylor expansion.`
      },
      {
        n: 20, pts: 2, topic: 'Newton step', chapter: 'ch5', diff: 'med',
        q: String.raw`One Newton step to minimise \(L = (\theta_1 - 2)^2 + (\theta_2 - 3)^2 + \theta_1\theta_2\) from \(\boldsymbol{\theta}_0 = (0,0)^\top\); verify it is the minimum.`,
        s: [
          String.raw`Gradient: \(\partial L/\partial\theta_1 = 2\theta_1 + \theta_2 - 4\), \(\partial L/\partial\theta_2 = \theta_1 + 2\theta_2 - 6\). At \((0,0)\): \(\nabla L = (-4, -6)^\top\). Hessian constant: \(H = \begin{pmatrix}2&1\\1&2\end{pmatrix}\).`,
          String.raw`Newton step \(\delta^\star = -H^{-1}\nabla L\) with \(H^{-1} = \tfrac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\). First \(H^{-1}\nabla L = \tfrac13\begin{pmatrix}2(-4) + (-1)(-6)\\(-1)(-4) + 2(-6)\end{pmatrix} = \tfrac13\begin{pmatrix}-2\\-8\end{pmatrix}\), so $$\delta^\star = -H^{-1}\nabla L = \begin{pmatrix}\tfrac23\\[2pt]\tfrac83\end{pmatrix} \qquad\Rightarrow\qquad \boldsymbol{\theta}_1 = (0,0)^\top + \begin{pmatrix}\tfrac23\\[2pt]\tfrac83\end{pmatrix} = \begin{pmatrix}\tfrac23\\[2pt]\tfrac83\end{pmatrix}$$`,
          String.raw`Verification: \(\nabla L(\tfrac23, \tfrac83) = (\tfrac43 + \tfrac83 - 4, \tfrac23 + \tfrac{16}{3} - 6) = (0, 0)^\top\) ✓. Since \(H \succ 0\) (eigenvalues 1, 3), this is the global minimum — Newton finds it exactly in one step for a quadratic.`
        ],
        fin: String.raw`\(\boldsymbol{\theta}_1 = (\tfrac23, \tfrac83)^\top\), the global minimum, in one step.`
      }
    ]
  });
})();
