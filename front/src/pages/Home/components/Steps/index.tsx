import React, { memo, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stepper from './Stepper';
import Bucket from './Bucket';
import { FormImputs } from '../../../../interfaces/bucket';

type StepsProps = {
  steps: Array<any>;
  buckets: FormImputs;
};

const Steps: React.FC<StepsProps> = ({ steps, buckets }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [bucketX, bucketY] = steps[activeStep]?.values ?? [];

  useEffect(() => {
    if (steps) setActiveStep(0);
  }, [steps]);

  return (
    <Grid container alignItems="start" justifyContent="space-evenly" spacing={5}>
      <Grid item>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item>
            <Bucket
              large={(buckets?.bucketX ?? 0) > (buckets?.bucketY ?? 0)}
              filled={bucketX}
              size={buckets?.bucketX ?? 0}
            />
          </Grid>

          <Grid item>
            <Bucket
              large={(buckets?.bucketX ?? 0) < (buckets?.bucketY ?? 0)}
              filled={bucketY}
              size={buckets?.bucketY ?? 0}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={(step) => setActiveStep((prev) => (step ? prev + step : 0))}
        />
      </Grid>
    </Grid>
  );
};

export default memo(Steps);
