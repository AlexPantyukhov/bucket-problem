/**
 * Combines buckets content, from bucketA to bucketB, and retuns their content based on their capacity 
 * 
 * @param {object} bucketA - filled value 
 * @param {object} - filled & size values
 * @returns {number[]} - The filled result for both buckets
 */
const getFilledDifference = (bucketA, { filled, size }) => {
  const res = filled + bucketA.filled - size;
  const filledX = res > 0 ? size : bucketA.filled + filled;
  const filledY = res > 0 ? res : 0;

  return [filledX, filledY];
};

/**
 * Builds and returns the step data
 * 
 * @param {object} bucketA - size & filled values 
 * @param {object} bucketB - size & filled values 
 * @param {number} invertValueKeys - if true, will invert solution step values, to match X & Y, default false
 * @returns {object} - caption, description and the values of bucket X & Y
 */
const getStep = (bucketA, bucketB, invertValueKeys = false) => {
  let caption = '';
  let description = '';
  const bucketASize = bucketA.size > bucketB.size ? 'large' : 'small';
  const bucketBSize = bucketA.size < bucketB.size ? 'large' : 'small';

  switch (true) {
    case !bucketA.filled:
      bucketA.filled = bucketA.size;
      caption = `Filling the ${bucketASize} bucket`;
      description = `Fill the ${bucketASize} bucket completly, to get the total of ${bucketA.size}lts`;
      break;
    case bucketA.filled === bucketA.size: {
      const [filledA, filledB] = getFilledDifference(bucketA, bucketB);
      bucketA.filled = filledB;
      bucketB.filled = filledA;
      caption = `Using the ${bucketASize} bucket to fill the ${bucketBSize} one`;
      description = `Fill the ${bucketASize} bucket using the ${bucketBSize} bucket, to get ${filledB}lts in the ${bucketASize} bucket and ${filledA}lts in the ${bucketBSize} one`;
      break;
    }
    case bucketB.filled === bucketB.size:
      bucketB.filled = 0;
      caption = `Emptying the ${bucketBSize} bucket`;
      description = `Removing all the water from the ${bucketBSize} bucket, to make free space`;
      break;
    case bucketA.filled > 0 && bucketA.filled < bucketA.size:
      const [filledA, filledB] = getFilledDifference(bucketA, bucketB);
      bucketA.filled = filledB;
      bucketB.filled = filledA;
      caption = `Remaining of the ${bucketASize} bucket`;
      description = `Empty the remaining ${filledA}lts of the ${bucketASize} bucket into the ${bucketBSize} bucket`;
      break;
  }

  return {
    caption,
    description,
    values: invertValueKeys ? [bucketB.filled, bucketA.filled] : [bucketA.filled, bucketB.filled],
  }
};

/**
 * Builds and returns the steps to solution if there is one
 * 
 * @param {object[]} buckets - Both of the buckets values, size & filled
 * @param {number} expectedResult - The result to acomplish
 * @param {boolean} invertValueKeys - if true, will invert solution step values, to match X & Y
 * @returns {object[]} - if there is a result, returns a list of steps with its values, caption & description of the solution
 * or a message if there is no solution
 */
const getSteps = (buckets, expectedResult, invertValueKeys) => {
  const steps = [];  
  let isMatch = false;
  let numberOfOperations = 0;
  do {
    numberOfOperations += 1;
    const step = getStep(...buckets, invertValueKeys)
    const { values: [filledA, filledB] } = step;    
    steps.push(step);
    isMatch = expectedResult === filledA || expectedResult === filledB;
  } while (numberOfOperations <= 100 && isMatch === false);
    
  return !steps.length || steps.length >= 100
    ? { message: 'No solution found' }
    : steps;
};

/**
 * Checks if all values are provided and numberic
 * 
 * @param {object} payload
 * @returns {boolean} - in case of sicrepancy returns true
 */
const isInvalid = (payload) => {
  return Object.values(payload).some((value) => !value || !parseInt(value));
};

/**
 * Recieves data values to compute the two possible solutions
 * 
 * @param {object} payload - Buckets size & expected result
 * @returns {object} - solutions or error message in case of wrong values or not possible solution
 */
const getSolution = (payload) => {
  if (isInvalid(payload)) return { message: 'Invalid values' };
  const { bucketX, bucketY, expectedResult } = payload
  const buckets = {
    bucketX: { size: +bucketX, filled: 0 },
    bucketY: { size: +bucketY, filled: 0 },
  };

  const res = {
    solutionA: getSteps([{ ...buckets.bucketX }, { ...buckets.bucketY }], +expectedResult),
    solutionB: getSteps([{ ...buckets.bucketY }, { ...buckets.bucketX }], +expectedResult, true),
  };
  
  return res;
};

module.exports = {
  getSolution,
};