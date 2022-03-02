const getFilledDifference = (bucketA, bucketB, size) => {
  const res = bucketB.filled + bucketA.filled - size;
  const filledX = res > 0 ? size: bucketA.filled + bucketB.filled;
  const filledY = res > 0 ? res : 0;

  return [filledX, filledY];
};

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
      const [filledA, filledB] = getFilledDifference(bucketA, bucketB, bucketB.size);
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
      const [filledA, filledB] = getFilledDifference(bucketA, bucketB, bucketB.size);
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

const getSolution = ({ bucketX, bucketY, expectedResult }) => {
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