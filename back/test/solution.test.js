const { getSolution: baseSolution } = require('../service');

const getSolution = (bucketX, bucketY, expectedResult) => baseSolution({ bucketX, bucketY, expectedResult });

describe('Testing solutions, buckets of 3 & 5 lts', () => {
  const { solutionA, solutionB } = getSolution(3, 5, 4);
  const getValues = (solution) => solution.map(({ values }) => values);

  test('Solution with the bucketA', async () => {
    const expectedA = [[3, 0], [0, 3], [3, 3], [1, 5], [1, 0], [0, 1], [3, 1], [0, 4]];
    expect(expectedA).toMatchObject(getValues(solutionA));
  });

  test('Solution with the bucketB', async () => {
    const expectedB = [[0, 5], [3, 2], [0, 2], [2, 0], [2, 5], [3, 4]];
    expect(expectedB).toMatchObject(getValues(solutionB));
  });
});

describe('Testing solutions, buckets of 2 & 10 lts', () => {
  const { solutionA, solutionB } = getSolution(2, 10, 4);
  const getValues = (solution) => solution.map(({ values }) => values); 

  test('Solution with the bucketA', () => {
    const expectedA = [[2, 0], [0, 2], [2, 2], [0, 4]];
    expect(expectedA).toMatchObject(getValues(solutionA));
  });

  test('Solution with the bucketB', () => {
    const expectedB = [[0, 10], [2, 8], [0, 8], [2, 6], [0, 6], [2, 4]];
    expect(expectedB).toMatchObject(getValues(solutionB));
  });
});

describe('There is no solution', () => {
  const expectedResult = { message: 'No solution found' };
  test('With bucket size, 10 & 15 lts, expecting 12 lts', () => {
    const { solutionA, solutionB } = getSolution(10, 15, 12);
    expect(expectedResult).toMatchObject(solutionA);
    expect(expectedResult).toMatchObject(solutionB);
  });

  test('With bucket size, 10 & 20 lts, expecting 11 lts', () => {
    const { solutionA, solutionB } = getSolution(10, 20, 11);
    expect(expectedResult).toMatchObject(solutionA);
    expect(expectedResult).toMatchObject(solutionB);
  });
});

describe('Error with provided data', () => {
  const expectedResult = { message: 'Invalid values' };
  
  test('String values in the payload', () => {
    const solution = getSolution('a', 1, 2);
    expect(expectedResult).toMatchObject(solution);    
  });

  test('Missing input values', () => {
    const solution = getSolution(3, 2);
    expect(expectedResult).toMatchObject(solution);    
  });
});