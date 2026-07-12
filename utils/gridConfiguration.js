export function getGridConfigurationByLength(length) {
    let baseGridCols = 'grid-cols-1';
    let minHeightClass = 'min-h-[200px]';

    switch (length) {
        case 1:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2';
            minHeightClass = 'min-h-[250px] sm:min-h-[400px]';
            break;

        case 2:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2';
            minHeightClass = 'min-h-[220px] sm:min-h-[300px]';
            break;

        case 3:
        case 4:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2';
            minHeightClass = 'min-h-[300px] sm:min-h-[450px]';
            break;

        case 5:
        case 7:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
            minHeightClass = 'min-h-[350px] sm:min-h-[500px] lg:min-h-[700px]';
            break;

        case 6:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
            minHeightClass = 'min-h-[350px] sm:min-h-[450px]';
            break;

        case 8:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
            minHeightClass = 'min-h-[350px] sm:min-h-[450px]';
            break;

        default:
            baseGridCols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
            minHeightClass = 'min-h-[400px] sm:min-h-[600px] lg:min-h-[800px]';
    }

    return { baseGridCols, minHeightClass };
}
