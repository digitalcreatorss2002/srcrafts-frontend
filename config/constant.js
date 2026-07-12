/**
 * Square-Based Bento Grid Configurations
 * Logic: All items maintain aspect-square or proportional multiples.
 */
export const GRID_CONFIGS = {
    1: {
        // Added 'grid' and 'place-items-center' to ensure the child is centered
        container: "grid grid-cols-1 place-items-center  w-full",
        items: ["aspect-square md:aspect-video max-h-[600px] w-full max-w-(--breakpoint-xl)"]
      },
    2: {
      container: "grid-cols-2",
      items: ["aspect-square", "aspect-square"]
    },
    3: {
      // Large square on left, two smaller squares on right
      container: "grid-cols-2 md:grid-cols-3",
      items: [
        "col-span-2 row-span-2 aspect-square", 
        "aspect-square", 
        "aspect-square"
      ]
    },
    4: {
      // Four perfect squares
      container: "grid-cols-2",
      items: Array(4).fill("aspect-square")
    },
    5: {
      // 1 Massive Square, 4 Small Squares
      container: "grid-cols-2 md:grid-cols-4",
      items: [
        "col-span-2 row-span-2 aspect-square", 
        "aspect-square", 
        "aspect-square",
        "aspect-square",
        "aspect-square"
      ]
    },
    6: {
      // Balanced 3x2 Grid
      container: "grid-cols-2 md:grid-cols-3",
      items: Array(6).fill("aspect-square")
    },
    7: {
        // Layout: 1 Large Feature (Left) + 6 Smaller Squares (Right/Bottom)
        container: "grid-cols-2 md:grid-cols-4",
        items: [
          "col-span-2 row-span-2 aspect-square", // The "Anchor" Square
          "aspect-square",
          "aspect-square",
          "aspect-square",
          "aspect-square",
          "col-span-2 row-span-2 aspect-square",
          "col-span-2 row-span-2 aspect-square",
        ]
      },
      8: {
        // Layout: 2 Medium-Large Squares + 6 Accent Squares
        // This creates a symmetrical "Editorial" look
        container: "grid-cols-2 md:grid-cols-4",
        items: [
          "col-span-2 aspect-[2/1] md:aspect-square", // Feature 1
          "aspect-square",
          "aspect-square",
          "col-span-1 aspect-square",
          "col-span-1 aspect-square",
          "col-span-2 aspect-[2/1] md:aspect-square", // Feature 2 (Anchor the bottom)
          "aspect-square",
          "aspect-square",
        ]
      }
  };