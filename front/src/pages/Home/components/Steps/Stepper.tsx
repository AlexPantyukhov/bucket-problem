import React, { memo } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from '@mui/material';

type StepsProps = {
  steps: Array<any>;
  activeStep: number;
  setActiveStep: (step: number) => void;
};

const CustomStepper: React.FC<StepsProps> = ({ steps, activeStep, setActiveStep }) => {
  const isTheLastStep = (index: number): boolean => index === steps.length - 1;

  return (
    <Box sx={{ maxWidth: 400 }} style={{ maxHeight: 500, overflowY: 'auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(({ description, caption }, i) => (
          <Step key={i}>
            <StepLabel
              optional={
                isTheLastStep(i) ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {caption}
            </StepLabel>
            <StepContent>
              <Typography>{description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {!isTheLastStep(i) && (
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(1)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  )}
                  {i !== 0 && !isTheLastStep(i) && (
                    <Button
                      onClick={() => setActiveStep(-1)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {isTheLastStep(activeStep) && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed, wanna review them again?</Typography>
          <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default memo(CustomStepper);
