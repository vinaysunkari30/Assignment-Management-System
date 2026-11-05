const now = new Date();
const daysOffset = (days, hours = 23, minutes = 59) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

export const seededAssignments = [
  {
    id: "asg-101",
    creatorId: "admin-1",
    title: "Modern Design Systems & Figma Tokens",
    description: "Build an accessible design token architecture with color palettes, typography scale, and button component variants in Tailwind CSS.",
    dueDate: daysOffset(3), // Due in 3 days
    driveLink: "https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ012345",
    assignedTo: ["student-1", "student-2", "student-3", "student-4", "student-5"], // All students
    tags: ["UI/UX", "Tailwind", "Figma"],
    points: 100,
    createdAt: daysOffset(-5),
    submissions: {
      "student-1": {
        submitted: true,
        submittedAt: daysOffset(-1, 14, 30),
        note: "Implemented all design tokens with Tailwind theme extension and high-contrast accessible color scales.",
        driveLink: "https://drive.google.com/file/d/1alice_figma_tokens_submission/view",
      },
      "student-2": {
        submitted: true,
        submittedAt: daysOffset(-2, 18, 15),
        note: "Included full Figma component library with variants and auto-layout documentation.",
        driveLink: "https://drive.google.com/file/d/1diana_figma_submission/view",
      },
      "student-3": {
        submitted: true,
        submittedAt: daysOffset(-1, 14, 30),
        note: "Implemented all design tokens with Tailwind theme extension and high-contrast accessible color scales.",
        driveLink: "https://drive.google.com/file/d/1alice_figma_tokens_submission/view",
      },
      "student-4": {
        submitted: true,
        submittedAt: daysOffset(-2, 18, 15),
        note: "Included full Figma component library with variants and auto-layout documentation.",
        driveLink: "https://drive.google.com/file/d/1diana_figma_submission/view",
      },
      "student-5": {
        submitted: true,
        submittedAt: daysOffset(-1, 14, 30),
        note: "Implemented all design tokens with Tailwind theme extension and high-contrast accessible color scales.",
        driveLink: "https://drive.google.com/file/d/1alice_figma_tokens_submission/view",
      },
    },
  },
  {
    id: "asg-102",
    creatorId: "admin-1",
    title: "Interactive State Management with Context & Hooks",
    description: "Implement a persistent state store using React Context and useReducer. Include optimistic updates, undo/redo stacks, and localStorage cache sync.",
    dueDate: daysOffset(-2), // Overdue for students who didn't submit!
    driveLink: "https://drive.google.com/drive/folders/2bCdEfGhIjKlMnOpQrStUvWxYz123456",
    assignedTo: ["student-1", "student-2", "student-3", "student-5"],
    tags: ["React", "State Management", "Hooks"],
    points: 100,
    createdAt: daysOffset(-10),
    submissions: {
      "student-2": {
        submitted: true,
        submittedAt: daysOffset(-3, 11, 45),
        note: "All tests passing, integrated state persistence with version migration schema.",
        driveLink: "https://drive.google.com/file/d/2bob_state_mgmt/view",
      },
    },
  },
  {
    id: "asg-103",
    creatorId: "admin-1",
    title: "Framer Motion Micro-interactions & Spring Physics",
    description: "Craft delighting cartoon-style micro-interactions: bouncy buttons, modal scale springs, celebratory confetti animations, and gesture-driven card swipes.",
    dueDate: daysOffset(7), // Due next week
    driveLink: "https://drive.google.com/drive/folders/3cDeFgHiJkLmNoPqRsTuVwXyZa234567",
    assignedTo: ["student-1", "student-2", "student-3", "student-4", "student-5"],
    tags: ["Animation", "Framer Motion", "Delight"],
    points: 150,
    createdAt: daysOffset(-2),
    submissions: {
      "student-3": {
        submitted: true,
        submittedAt: daysOffset(-1, 9, 20),
        note: "Implemented spring physics with custom damping curves and haptic visual feedback.",
        driveLink: "https://drive.google.com/file/d/3charlie_animations/view",
      },
    },
  },
  {
    id: "asg-104",
    creatorId: "admin-1",
    title: "Responsive Dashboard Layout & Bento Grid Architecture",
    description: "Structure a modular dashboard that seamlessly adapts from 320px mobile screens to 4K ultrawide monitors using fluid CSS Grid and responsive flex layouts.",
    dueDate: daysOffset(10),
    driveLink: "https://drive.google.com/drive/folders/4dEfGhIjKlMnOpQrStUvWxYzb345678",
    assignedTo: ["student-1", "student-4"],
    tags: ["Responsive", "CSS Grid", "Bento"],
    points: 100,
    createdAt: daysOffset(-1),
    submissions: {},
  },

  {
    id: "asg-201",
    creatorId: "admin-2",
    title: "Distributed Cache & LRU Eviction Simulation",
    description: "Design and benchmark a distributed cache node cluster simulation with Least Recently Used (LRU) eviction policy and consistent hashing ring.",
    dueDate: daysOffset(5),
    driveLink: "https://drive.google.com/drive/folders/5eFgHiJkLmNoPqRsTuVwXyZc456789",
    assignedTo: ["student-1", "student-2", "student-5"],
    tags: ["Algorithms", "Distributed Systems", "Caching"],
    points: 200,
    createdAt: daysOffset(-4),
    submissions: {
      "student-1": {
        submitted: true,
        submittedAt: daysOffset(-1, 16, 0),
        note: "Completed LRU doubly linked list + hashmap with O(1) get/set and benchmark charts.",
        driveLink: "https://drive.google.com/file/d/5alice_cache_simulation/view",
      },
      "student-5": {
        submitted: true,
        submittedAt: daysOffset(-2, 22, 10),
        note: "Added consistent hashing visualization with virtual node distribution analysis.",
        driveLink: "https://drive.google.com/file/d/5evan_cache/view",
      },
    },
  },
  {
    id: "asg-202",
    creatorId: "admin-2",
    title: "B-Tree Indexing & Query Cost Analyzer",
    description: "Construct an in-memory B-Tree indexer and compare performance of point lookup vs range scan queries across 1,000,000 synthetic records.",
    dueDate: daysOffset(-4), // Overdue for students who didn't submit
    driveLink: "https://drive.google.com/drive/folders/6fGhIjKlMnOpQrStUvWxYzd567890",
    assignedTo: ["student-2", "student-3", "student-4", "student-5"],
    tags: ["Database", "B-Tree", "Performance"],
    points: 150,
    createdAt: daysOffset(-14),
    submissions: {
      "student-2": {
        submitted: true,
        submittedAt: daysOffset(-5, 17, 30),
        note: "Node splitting and rebalancing validated with automated stress tests.",
        driveLink: "https://drive.google.com/file/d/6bob_btree/view",
      },
    },
  },
];
