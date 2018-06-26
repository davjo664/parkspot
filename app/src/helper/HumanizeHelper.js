// @flow

export class HumanizeHelper {
  static humanizeDistance = (distanceInKm : Number) => {
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

  static humanizeDuration = (durationInSeconds : Number, options : ?Object = {}) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds - (hours * 3600)) / 60);
    const seconds = Math.ceil(durationInSeconds - (hours * 3600) - (minutes * 60));

    const showHours = options['showHours'] || hours > 0;
    const showMinutes = options['showMinutes'] || showHours || minutes > 0;
    const showSeconds = options['showSeconds'] || !showHours;


    let result = (showHours ? hours.pad(1) + " h" : "") + (showMinutes ? minutes.pad(1) + " min " : "") + (showSeconds ? seconds.pad(1) + " s " : "");
    result = result.trim().replace("  ", " ");

    return result;
  };
}


Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}
