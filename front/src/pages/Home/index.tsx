import React, { useState } from 'react';
import {
  Grid, Typography, Tabs, Tab,
} from '@mui/material';
import { Form, Steps } from './components';
import { FormImputs } from '../../interfaces/bucket';
import { getSolution } from '../../api';

const getSolutionKey = ({ solutionA, solutionB }, best = true) => {
  const bestSolution = solutionA.length > solutionB.length ? 'solutionB' : 'solutionA';
  const worstSolution = solutionA.length > solutionB.length ? 'solutionA' : 'solutionB';

  return best ? bestSolution : worstSolution;
};

const HomePage = () => {
  const [activeSolution, setActiveSolution] = useState<string>();
  const [steps, setSteps] = useState({ solutionA: [], solutionB: [] });
  const [buckets, setBuckets] = useState<FormImputs>({});

  const computeValues = async (values: FormImputs) => {
    const { status, data } = await getSolution(values);

    if (status === 200) {
      setSteps(data);
      setActiveSolution(getSolutionKey(data));
      setBuckets(values);
    }
  };

  return (
    <Grid container direction="column" spacing={4} alignItems="center">
      <Grid item>
        <Typography variant="h6">Please choose values</Typography>
      </Grid>
      <Grid item>
        <Form computeValues={computeValues} />
      </Grid>

      <Grid item alignSelf="stretch">
        {(steps.solutionA.length > 0 || steps.solutionB.length > 0) && activeSolution && (
          <Tabs centered variant="fullWidth" value={activeSolution} onChange={(_, s) => setActiveSolution(s)}>
            <Tab value={getSolutionKey(steps)} label="Better Solution" />
            <Tab value={getSolutionKey(steps, false)} label="Worst Solution" />
          </Tabs>
        )}
      </Grid>

      <Grid item>
        {activeSolution && (
          steps[activeSolution].message
            ? <Typography>{steps[activeSolution].message}</Typography>
            : <Steps steps={steps[activeSolution]} buckets={buckets} />
        )}
      </Grid>

    </Grid>
  );
};

export default HomePage;
