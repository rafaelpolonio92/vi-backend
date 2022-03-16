const _ = require('lodash');

const actorsWithMultipleCharsParser = (list) => {
  const charFilter = list.filter(
    (v, i, a) =>
      a.findIndex((t) =>
        ['actor', 'character'].every((k) =>
          t[k]
            .toLowerCase()
            .split(' ')
            .some((val) => v[k].toLowerCase().split(' ').includes(val))
        )
      ) === i
  );
  const actorsWithMultipleChars = _.groupBy(
    Object.values(
      charFilter.reduce((c, v) => {
        let k = v.actor;
        c[k] = c[k] || [];
        c[k].push(v);
        return c;
      }, {})
    ).reduce((c, v) => (v.length > 1 ? c.concat(v) : c), []),
    (val) => val.actor
  );

  const parsedActorsWithMultipleChars = _.mapValues(
    actorsWithMultipleChars,
    (actorsList) => actorsList.map((list) => _.omit(list, 'actor'))
  );

  const result = Object.fromEntries(
    Object.entries(parsedActorsWithMultipleChars).filter(
      ([, data]) =>
        new Set(
          data.filter(
            ({ character }) => !character.toLowerCase().includes('self')
          )
        ).size > 1
    )
  );
  return result;
};

const actorsParser = (list) => {
  const actors = _.mapValues(
    _.groupBy(list, (val) => val.actor),
    (actorsList) => actorsList.map((value) => _.omit(value, 'actor'))
  );
  return actors;
};

module.exports = {
  actorsWithMultipleCharsParser,
  actorsParser,
};
