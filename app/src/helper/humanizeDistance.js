module.exports = function humanizeDistance(distanceInKm) {
  const result = {distance: distanceInKm, unit: 'km', smallUnit: 'm', factor: 1000, smallBorder: 0.9};

  if (result.distance < result.smallBorder) {
    let distance = result.distance * result.factor;
    if (distance < 40) {
      return `< 50 ${result.smallUnit}`;
    }

    distance = Math.round(distance / 50) * 50;
    return `${distance} ${result.smallUnit}`;
  }

  return `${Math.round(result.distance * 100) / 100} ${result.unit}`;
};
