const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function toggleFilter(filterName) {
    console.log("ACTION: " + filterName)
    return {
        type: TOGGLE_FILTER,
        filter: filterName
    }
}