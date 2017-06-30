import distance from '@turf/distance';

export default function(fromCords, toCords) {
  const _format = 'miles';
  const from = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Point',
      'coordinates': fromCords
    }
  };
  const to = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Point',
      'coordinates': toCords
    }
  };

  return distance(from, to, _format);
}
