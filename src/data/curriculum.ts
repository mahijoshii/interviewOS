import type { CurriculumDay, Difficulty } from "../types";

type Seed = {
  topic: string;
  subtopic: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  pattern: string;
  minutes: number;
};

type PhaseSeed = {
  phase: number;
  topic: string;
  conceptTitle: string;
  summary: string;
  signals: string[];
  problems: Seed[];
};

const phases: PhaseSeed[] = [
  {
    phase: 1,
    topic: "Arrays & Hashing",
    conceptTitle: "Array Scans and Hash Lookups",
    summary:
      "Start by learning how arrays expose order and how hash maps add fast memory. Use counts, complements, and seen sets when brute force repeats the same search.",
    signals: ["Have I seen this value before?", "Need counts or frequencies", "Need O(1) lookup", "Compare two collections"],
    problems: [
      ["Array scan", "Contains Duplicate", "contains-duplicate", "Easy", "Seen set", 15],
      ["Complements", "Two Sum", "two-sum", "Easy", "Hash map complement", 20],
      ["Frequencies", "Valid Anagram", "valid-anagram", "Easy", "Frequency map", 20],
      ["String grouping", "Group Anagrams", "group-anagrams", "Medium", "Canonical key", 30],
      ["Top k counts", "Top K Frequent Elements", "top-k-frequent-elements", "Medium", "Bucket counting", 35],
      ["Product reasoning", "Product of Array Except Self", "product-of-array-except-self", "Medium", "Prefix/suffix products", 35],
      ["Matrix validation", "Valid Sudoku", "valid-sudoku", "Medium", "Set membership by region", 35],
      ["Review", "Longest Consecutive Sequence", "longest-consecutive-sequence", "Medium", "Hash set sequence start", 40]
    ].map(toSeed)
  },
  {
    phase: 2,
    topic: "Two Pointers",
    conceptTitle: "Converging and Paired Pointers",
    summary:
      "Two pointers reduce nested scans when order gives useful structure. Move the pointer that can still improve the answer.",
    signals: ["Sorted input", "Pair or palindrome check", "In-place compaction", "Need avoid O(n^2) pairs"],
    problems: [
      ["Palindrome", "Valid Palindrome", "valid-palindrome", "Easy", "Converging pointers", 15],
      ["Sorted pair", "Two Sum II - Input Array Is Sorted", "two-sum-ii-input-array-is-sorted", "Medium", "Left/right sum", 25],
      ["In-place array", "Remove Duplicates from Sorted Array", "remove-duplicates-from-sorted-array", "Easy", "Slow/fast write pointer", 20],
      ["Container", "Container With Most Water", "container-with-most-water", "Medium", "Move limiting wall", 35],
      ["Triplets", "3Sum", "3sum", "Medium", "Sort plus two-sum sweep", 45]
    ].map(toSeed)
  },
  {
    phase: 3,
    topic: "Sliding Window",
    conceptTitle: "Maintaining a Moving Window",
    summary:
      "A sliding window tracks a contiguous range while adjusting boundaries. Use it when a substring or subarray constraint changes incrementally.",
    signals: ["Contiguous subarray or substring", "Longest or shortest range", "At most or at least constraint", "Can update counts incrementally"],
    problems: [
      ["Fixed window", "Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "Easy", "Track best prior value", 20],
      ["Set window", "Longest Substring Without Repeating Characters", "longest-substring-without-repeating-characters", "Medium", "Shrink on duplicate", 30],
      ["Replacement", "Longest Repeating Character Replacement", "longest-repeating-character-replacement", "Medium", "Window with max frequency", 35],
      ["Permutation", "Permutation in String", "permutation-in-string", "Medium", "Fixed-size frequency window", 35],
      ["Minimum cover", "Minimum Window Substring", "minimum-window-substring", "Hard", "Contract valid window", 50]
    ].map(toSeed)
  },
  {
    phase: 4,
    topic: "Stack & Queue",
    conceptTitle: "Last-In-First-Out State",
    summary:
      "Stacks preserve unresolved work. Use them when later items answer earlier questions, or when nested structure must be validated.",
    signals: ["Nested brackets", "Undo or recent state", "Next greater/smaller", "Monotonic trend"],
    problems: [
      ["Syntax", "Valid Parentheses", "valid-parentheses", "Easy", "Matching stack", 15],
      ["Min tracking", "Min Stack", "min-stack", "Medium", "Auxiliary minimum stack", 25],
      ["Reverse polish", "Evaluate Reverse Polish Notation", "evaluate-reverse-polish-notation", "Medium", "Operand stack", 30],
      ["Temperatures", "Daily Temperatures", "daily-temperatures", "Medium", "Monotonic decreasing stack", 35],
      ["Histogram", "Largest Rectangle in Histogram", "largest-rectangle-in-histogram", "Hard", "Monotonic boundary stack", 50]
    ].map(toSeed)
  },
  {
    phase: 5,
    topic: "Linked Lists",
    conceptTitle: "Pointer Rewiring",
    summary:
      "Linked list interviews test careful pointer updates. Draw the nodes, preserve next pointers before overwriting them, and handle head changes with sentinels.",
    signals: ["Node references", "Need O(1) insertion/removal", "Cycle detection", "Reverse or merge links"],
    problems: [
      ["Reverse", "Reverse Linked List", "reverse-linked-list", "Easy", "Three-pointer reversal", 20],
      ["Merge", "Merge Two Sorted Lists", "merge-two-sorted-lists", "Easy", "Sentinel merge", 25],
      ["Cycle", "Linked List Cycle", "linked-list-cycle", "Easy", "Fast/slow pointers", 20],
      ["Remove nth", "Remove Nth Node From End of List", "remove-nth-node-from-end-of-list", "Medium", "Gap pointer", 30],
      ["Reorder", "Reorder List", "reorder-list", "Medium", "Middle, reverse, merge", 40]
    ].map(toSeed)
  },
  {
    phase: 6,
    topic: "Binary Search",
    conceptTitle: "Search on Ordered Decisions",
    summary:
      "Binary search works when a decision splits the space into impossible and possible sides. Define the invariant before writing boundaries.",
    signals: ["Sorted input", "Find first/last valid", "Rotated sorted array", "Minimize maximum or capacity"],
    problems: [
      ["Classic", "Binary Search", "binary-search", "Easy", "Index search", 15],
      ["Matrix", "Search a 2D Matrix", "search-a-2d-matrix", "Medium", "Flattened binary search", 25],
      ["Rotated min", "Find Minimum in Rotated Sorted Array", "find-minimum-in-rotated-sorted-array", "Medium", "Sorted half detection", 30],
      ["Rotated search", "Search in Rotated Sorted Array", "search-in-rotated-sorted-array", "Medium", "Target in sorted half", 35],
      ["Answer space", "Koko Eating Bananas", "koko-eating-bananas", "Medium", "Binary search feasible speed", 40]
    ].map(toSeed)
  },
  {
    phase: 7,
    topic: "Trees & BSTs",
    conceptTitle: "Recursive Tree Structure",
    summary:
      "Trees are naturally recursive. Decide what each call returns, what information flows down, and how null nodes contribute.",
    signals: ["Hierarchical nodes", "Subtree answer composition", "BST ordering", "Path or level traversal"],
    problems: [
      ["Depth", "Maximum Depth of Binary Tree", "maximum-depth-of-binary-tree", "Easy", "Recursive height", 15],
      ["Same tree", "Same Tree", "same-tree", "Easy", "Parallel recursion", 15],
      ["Invert", "Invert Binary Tree", "invert-binary-tree", "Easy", "Swap children recursively", 20],
      ["Diameter", "Diameter of Binary Tree", "diameter-of-binary-tree", "Easy", "Height plus global best", 25],
      ["Balanced", "Balanced Binary Tree", "balanced-binary-tree", "Easy", "Height with failure signal", 25],
      ["BST validate", "Validate Binary Search Tree", "validate-binary-search-tree", "Medium", "Bounds recursion", 30],
      ["Kth BST", "Kth Smallest Element in a BST", "kth-smallest-element-in-a-bst", "Medium", "Inorder traversal", 30],
      ["Level order", "Binary Tree Level Order Traversal", "binary-tree-level-order-traversal", "Medium", "BFS queue", 30],
      ["Build tree", "Construct Binary Tree from Preorder and Inorder Traversal", "construct-binary-tree-from-preorder-and-inorder-traversal", "Medium", "Index map recursion", 40],
      ["LCA", "Lowest Common Ancestor of a Binary Search Tree", "lowest-common-ancestor-of-a-binary-search-tree", "Medium", "BST split point", 30]
    ].map(toSeed)
  },
  {
    phase: 8,
    topic: "Heaps / Priority Queues",
    conceptTitle: "Always Access the Next Best Item",
    summary:
      "Heaps are for repeatedly taking the smallest or largest active item without sorting everything each time.",
    signals: ["Top k", "Streaming median", "Merge sorted sources", "Repeated min or max"],
    problems: [
      ["Kth", "Kth Largest Element in an Array", "kth-largest-element-in-an-array", "Medium", "Size-k min heap", 30],
      ["Stones", "Last Stone Weight", "last-stone-weight", "Easy", "Max heap simulation", 20],
      ["Points", "K Closest Points to Origin", "k-closest-points-to-origin", "Medium", "Heap or quickselect", 35],
      ["Median", "Find Median from Data Stream", "find-median-from-data-stream", "Hard", "Two heaps", 50]
    ].map(toSeed)
  },
  {
    phase: 9,
    topic: "Intervals",
    conceptTitle: "Sorting Ranges by Boundaries",
    summary:
      "Interval problems become manageable after sorting. Compare the current start with the previous end to merge, insert, or count overlaps.",
    signals: ["Ranges", "Overlaps", "Meeting rooms", "Merge or insert"],
    problems: [
      ["Merge", "Merge Intervals", "merge-intervals", "Medium", "Sort and merge", 30],
      ["Insert", "Insert Interval", "insert-interval", "Medium", "Three phases", 35],
      ["Erase", "Non-overlapping Intervals", "non-overlapping-intervals", "Medium", "Greedy earliest end", 35],
      ["Rooms", "Meeting Rooms II", "meeting-rooms-ii", "Medium", "Min heap of end times", 40]
    ].map(toSeed)
  },
  {
    phase: 10,
    topic: "Graphs / BFS / DFS",
    conceptTitle: "Traversal and State",
    summary:
      "Graph problems are about representing neighbors, choosing BFS or DFS, and marking visited state at the right time.",
    signals: ["Connected components", "Grid neighbors", "Shortest unweighted path", "Prerequisites or dependencies"],
    problems: [
      ["Flood fill", "Flood Fill", "flood-fill", "Easy", "Grid DFS/BFS", 20],
      ["Islands", "Number of Islands", "number-of-islands", "Medium", "Component counting", 30],
      ["Clone", "Clone Graph", "clone-graph", "Medium", "DFS with map", 35],
      ["Pacific Atlantic", "Pacific Atlantic Water Flow", "pacific-atlantic-water-flow", "Medium", "Reverse multi-source search", 40],
      ["Rotting", "Rotting Oranges", "rotting-oranges", "Medium", "Multi-source BFS", 35],
      ["Courses", "Course Schedule", "course-schedule", "Medium", "Cycle detection", 40],
      ["Order", "Course Schedule II", "course-schedule-ii", "Medium", "Topological ordering", 45],
      ["Components", "Number of Connected Components in an Undirected Graph", "number-of-connected-components-in-an-undirected-graph", "Medium", "Union-find or DFS", 35],
      ["Network", "Network Delay Time", "network-delay-time", "Medium", "Dijkstra shortest paths", 45],
      ["Word ladder", "Word Ladder", "word-ladder", "Hard", "BFS over transformed words", 55]
    ].map(toSeed)
  },
  {
    phase: 11,
    topic: "Backtracking",
    conceptTitle: "Explore Choices, Then Undo",
    summary:
      "Backtracking searches a decision tree. Keep the partial answer valid, recurse, then undo exactly what changed.",
    signals: ["Generate all combinations", "Permutations", "Subsets", "Constraint satisfaction"],
    problems: [
      ["Subsets", "Subsets", "subsets", "Medium", "Include/exclude", 30],
      ["Combinations", "Combination Sum", "combination-sum", "Medium", "Choice with reuse", 40],
      ["Permutations", "Permutations", "permutations", "Medium", "Used set", 35],
      ["Parentheses", "Generate Parentheses", "generate-parentheses", "Medium", "Validity pruning", 35],
      ["Word search", "Word Search", "word-search", "Medium", "Grid DFS with restore", 40]
    ].map(toSeed)
  },
  {
    phase: 12,
    topic: "Greedy",
    conceptTitle: "Local Choices with a Proof",
    summary:
      "Greedy works when a local choice can be justified as never hurting the global optimum. Be ready to explain the exchange argument.",
    signals: ["Choose earliest/latest", "Can maintain best reach", "Minimize operations", "Intervals or jumps"],
    problems: [
      ["Profit", "Best Time to Buy and Sell Stock II", "best-time-to-buy-and-sell-stock-ii", "Medium", "Take every gain", 25],
      ["Jump", "Jump Game", "jump-game", "Medium", "Farthest reachable", 30],
      ["Jumps", "Jump Game II", "jump-game-ii", "Medium", "Layered greedy reach", 35],
      ["Gas", "Gas Station", "gas-station", "Medium", "Reset failing start", 35]
    ].map(toSeed)
  },
  {
    phase: 13,
    topic: "1D Dynamic Programming",
    conceptTitle: "Optimal Substructure on a Line",
    summary:
      "1D DP stores answers to smaller prefixes or states. Define the state in one sentence before coding the recurrence.",
    signals: ["Ways to reach", "Best up to index", "Take or skip", "Overlapping subproblems"],
    problems: [
      ["Climb", "Climbing Stairs", "climbing-stairs", "Easy", "Fibonacci recurrence", 15],
      ["Rob", "House Robber", "house-robber", "Medium", "Take or skip", 30],
      ["Rob circle", "House Robber II", "house-robber-ii", "Medium", "Split circular dependency", 35],
      ["Decode", "Decode Ways", "decode-ways", "Medium", "Count valid prefixes", 35],
      ["Coin", "Coin Change", "coin-change", "Medium", "Minimum coins DP", 40],
      ["LIS", "Longest Increasing Subsequence", "longest-increasing-subsequence", "Medium", "Best subsequence ending", 40],
      ["Break", "Word Break", "word-break", "Medium", "Reachable prefix", 40]
    ].map(toSeed)
  },
  {
    phase: 14,
    topic: "2D Dynamic Programming",
    conceptTitle: "State with Two Dimensions",
    summary:
      "2D DP appears when two indices or capacities define the state. Fill base cases carefully and make each transition local.",
    signals: ["Two strings", "Grid paths", "Capacity plus item", "Subsequence comparison"],
    problems: [
      ["Grid", "Unique Paths", "unique-paths", "Medium", "Grid path count", 25],
      ["LCS", "Longest Common Subsequence", "longest-common-subsequence", "Medium", "Two-string DP", 40],
      ["Interleave", "Interleaving String", "interleaving-string", "Medium", "Two prefixes", 45],
      ["Edit", "Edit Distance", "edit-distance", "Medium", "Edit operations DP", 50],
      ["Burst", "Burst Balloons", "burst-balloons", "Hard", "Interval DP", 60]
    ].map(toSeed)
  },
  {
    phase: 15,
    topic: "Mixed / Timed Interview Practice",
    conceptTitle: "Pattern Identification Under Time",
    summary:
      "In mixed practice, pause before coding and identify the pattern yourself. The app hides the pattern until you choose to reveal it.",
    signals: ["Ambiguous prompt", "Need choose data structure", "Explain tradeoffs aloud", "Timebox the attempt"],
    problems: [
      ["Warmup", "Valid Palindrome II", "valid-palindrome-ii", "Easy", "Two pointers with one skip", 20],
      ["Array", "Subarray Sum Equals K", "subarray-sum-equals-k", "Medium", "Prefix sum counts", 35],
      ["Stack", "Car Fleet", "car-fleet", "Medium", "Monotonic arrival times", 35],
      ["Tree", "Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", "Hard", "Postorder gain", 55],
      ["Graph", "Accounts Merge", "accounts-merge", "Medium", "Union-find components", 45],
      ["Heap", "Task Scheduler", "task-scheduler", "Medium", "Greedy counts", 45],
      ["DP", "Partition Equal Subset Sum", "partition-equal-subset-sum", "Medium", "Subset-sum DP", 45],
      ["Final mock", "LRU Cache", "lru-cache", "Medium", "Hash map plus linked list", 50]
    ].map(toSeed)
  }
];

function isDifficulty(value: unknown): value is Difficulty {
  return value === "Easy" || value === "Medium" || value === "Hard";
}

function toSeed(value: (string | number)[]): Seed {
  const [subtopic, title, slug, difficulty, pattern, minutes] = value;
  if (
    typeof subtopic !== "string" ||
    typeof title !== "string" ||
    typeof slug !== "string" ||
    !isDifficulty(difficulty) ||
    typeof pattern !== "string" ||
    typeof minutes !== "number"
  ) {
    throw new Error(`Invalid curriculum seed for ${String(title)}`);
  }
  return { topic: "", subtopic, title, slug, difficulty, pattern, minutes };
}

function hintsFor(seed: Seed): string[] {
  return [
    `Start by naming the invariant for ${seed.pattern}.`,
    "Write the brute force idea first, then identify the repeated work.",
    "Track only the state that changes when you move one step.",
    "Before coding, state what each variable means after every loop iteration."
  ];
}

export const curriculum: CurriculumDay[] = phases.flatMap((phase) =>
  phase.problems.map((problem, index) => {
    const previousCount = phases.filter((p) => p.phase < phase.phase).reduce((sum, p) => sum + p.problems.length, 0);
    const day = previousCount + index + 1;
    return {
      day,
      phase: phase.phase,
      topic: phase.topic,
      subtopic: problem.subtopic,
      conceptTitle: phase.conceptTitle,
      conceptSummary: phase.summary,
      recognitionSignals: phase.signals,
      problemTitle: problem.title,
      difficulty: problem.difficulty,
      leetcodeUrl: `https://leetcode.com/problems/${problem.slug}/`,
      pattern: problem.pattern,
      targetMinutes: problem.minutes,
      hints: hintsFor(problem),
      expectedTimeComplexity: "Aim for the standard optimal complexity for this pattern.",
      expectedSpaceComplexity: "Explain auxiliary space separately from input/output storage.",
      isReviewDay: problem.subtopic.toLowerCase().includes("review") || day % 15 === 0,
      reviewOfDay: day % 15 === 0 ? Math.max(1, day - 10) : undefined,
      hidePatternUntilReveal: phase.phase === 15
    };
  })
);

export const phaseSummaries = phases.map((phase) => ({
  phase: phase.phase,
  topic: phase.topic,
  days: phase.problems.length
}));
