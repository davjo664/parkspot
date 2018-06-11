const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function toggleFilter(filterId) {
  return {
    type: TOGGLE_FILTER,
    filter: filterId,
  };
}
