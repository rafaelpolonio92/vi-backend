const {
  multipleRoles,
  emptyMultipleRoles,
  selfRole,
  listOfActors,
} = require('./actorListMock');
const {
  actorsWithMultipleCharsParser,
  actorsParser,
} = require('../../../src/utils/actorsParser');

describe('Testing actor with multiple roles parsers that are sent to API', () => {
  it('Should return only actors that played more than 1 char in different movies', () => {
    const response = actorsWithMultipleCharsParser(multipleRoles);
    expect(response).toEqual({
      'Paul Rudd': [
        {
          character: 'Scott Lang / Ant-Man',
          release_date: '2023-07-26',
          title: 'Ant-Man and the Wasp: Quantumania',
        },
        {
          character: 'Hope van Dyne',
          release_date: '2020-07-26',
          title: 'Test',
        },
      ],
    });
  });

  it('Should return empty object', () => {
    const response = actorsWithMultipleCharsParser(emptyMultipleRoles);
    expect(response).toEqual({});
  });

  it('Should eliminate actor that has two characters, but one of this chars is "Self"', () => {
    const response = actorsWithMultipleCharsParser(selfRole);
    expect(response).toEqual({});
  });
});

describe('Testing list of all actors', () => {
  it('Should return the list of actors', () => {
    const response = actorsParser(listOfActors);
    expect(response).toEqual({
      'Evangeline Lilly': [
        {
          character: 'Hope van Dyne / Wasp',
          release_date: '2023-07-26',
          title: 'Ant-Man and the Wasp: Quantumania',
        },
      ],
      'Kathryn Newton': [
        {
          character: 'Cassie Lang',
          release_date: '2023-07-26',
          title: 'Ant-Man and the Wasp: Quantumania',
        },
      ],
    });
  });
});
