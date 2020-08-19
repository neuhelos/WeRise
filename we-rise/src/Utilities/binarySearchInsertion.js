export const binarySearchInsert = (state, searchElement) => {

    if(!state.length) return 0
    let minIndex = 0;
    let maxIndex = state.length - 1;
    let currentIndex
    let currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = Math.floor((minIndex + maxIndex) / 2) 
        currentElement = new Date(state[currentIndex]['start_time']);
        if (currentElement < searchElement) {
        minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
        maxIndex = currentIndex - 1;
        }
        else {
        return currentIndex
        }
    }      
    return currentElement < searchElement ? currentIndex + 1 : currentIndex
}