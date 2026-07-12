export function getGridClassesByIndex(index) {
    const isOdd = index & 1; 
    const isGroupStart = (index & 3) === 0; 
    
    if (isGroupStart) {
      // Large, featured item (2x2)
      return 'col-span-2 row-span-2 h-[40rem]'; // Approx 640px height
    } else if (isOdd) {
      // Normal item, tall height (1x2)
      return 'col-span-1 row-span-2 h-[40rem]'; // Approx 640px height
    } else {
      // Normal item, standard height (1x1)
      return 'col-span-1 row-span-1 h-[20rem]'; // Approx 320px height
    }
  }