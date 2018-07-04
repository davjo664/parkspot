
export function toggleFilter(filterId) {
  return {
    type: 'TOGGLE_FILTER',
    filter: filterId,
  };
}

export function updateDistanceFilter(value) {
  return {
    type: 'UPDATE_DISTANCE_FILTER',
    value: value,
  };
}
