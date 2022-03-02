import React from 'react';
import { Grid, Button } from '@mui/material';
import {
  Formik, Field, Form, FormikHelpers,
} from 'formik';
import { TextField } from 'formik-mui';
import { FormImputs, FieldTypes } from '../../../../interfaces/bucket';
import { ERROR } from '../../../../utils';

const fields: FieldTypes[] = [
  { name: 'bucketX', label: 'Bucket One' },
  { name: 'bucketY', label: 'Bucket Two' },
  { name: 'expectedResult', label: 'Expected Result' },
];

type FormProps = {
  computeValues: (values: FormImputs) => void;
};

const LittersForm: React.FC<FormProps> = ({ computeValues }) => {
  const initValues: FormImputs = {};
  const errorHandler = ({ bucketX, bucketY, expectedResult }: FormImputs) => {
    const errors: FormImputs = {};

    if (!bucketX) errors.bucketX = ERROR.EMPTY_FIELD;
    if (!bucketY) errors.bucketY = ERROR.EMPTY_FIELD;
    if (!expectedResult) errors.expectedResult = ERROR.EMPTY_FIELD;
    else if (bucketX && bucketY) {
      if (bucketX === bucketY) {
        errors.bucketX = ERROR.FIELD_DIFFERENT_THAN('bucketY');
        errors.bucketY = ERROR.FIELD_DIFFERENT_THAN('bucketX');
      }
      if (expectedResult >= bucketX && expectedResult >= bucketY) {
        errors.expectedResult = ERROR.FIELD_LESSER_THAN(bucketX >= bucketY ? bucketX : bucketY);
      }
    }

    return errors;
  };

  const onSubmit = (values: FormImputs, { setSubmitting }: FormikHelpers<FormImputs>) => {
    computeValues(values);
    setSubmitting(false);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validate={errorHandler}
      initialValues={initValues}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Grid container alignItems="flex-start" spacing={2}>
            {fields.map(({ name, label }: FieldTypes) => (
              <Grid item key={name}>
                <Field
                  required
                  label={label}
                  name={name}
                  value={values[name] || ''}
                  type="number"
                  component={TextField}
                />
              </Grid>
            ))}

            <Grid item>
              <Button disabled={isSubmitting} type="submit" size="large" variant="contained">Compute</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LittersForm;
