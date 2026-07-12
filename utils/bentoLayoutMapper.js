const BENTO_LAYOUTS = {
    1:['col-span-1 md:col-span-2 row-span-2 h-[16rem] md:h-[31rem]'],
    2:[
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
    ],
    3: [
        'col-span-1 md:col-span-1 row-span-2 h-[16rem] md:h-[31rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
    ],

    4: [
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
    ],

    5: [
        'col-span-1 md:col-span-2 row-span-1 md:row-span-2 h-[18rem] md:h-[31rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]',
    ],

    6: Array(6).fill(
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]'
    ),

    8: Array(8).fill(
        'col-span-1 row-span-1 h-[16rem] md:h-[15rem]'
    ),
};


export function getBentoGridClassesByIndex(index, length) {
    const layout = BENTO_LAYOUTS[length];
    if (layout && index < layout.length) {
        return layout[index];
    }

    const isOdd = index & 1;
    const isGroupStart = (index & 3) === 0;

    return 'col-span-1 row-span-1 h-[16rem] md:h-[15rem]';
}
