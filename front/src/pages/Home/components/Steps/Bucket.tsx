import React, { memo } from 'react';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type BucketProps = {
  size: number | string;
  filled: number | string;
  large?: boolean | false;
}

const useStyles = makeStyles(({ palette }: Theme) => createStyles({
  root: ({ large }: BucketProps) => ({
    position: 'relative',
    overflow: 'hidden',
    width: large ? 250 : 180,
    height: large ? 400 : 325,
    margin: '0 auto',
    borderRadius: 5,
    backgroundColor: palette.grey[300],
  }),
  progress: ({ size, filled }: BucketProps) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    transition: 'height 1s ease-in-out, background 1s ease-in-out',
    borderRadius: 5,
    backgroundColor: palette.primary.light,
    height: `${Math.ceil((+filled * 100) / +size)}%`,
  }),
  bucketIndicator: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    fontWeight: 'bold',
    zIndex: 3,
  },
}));

const Bucket: React.FC<BucketProps> = ({ size, filled, large }) => {
  const { root, progress, bucketIndicator } = useStyles({ size, filled, large });
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <div className={root}>
          <div className={progress} />
          <Typography className={bucketIndicator} align="center" variant="h3">{`${size} Lts`}</Typography>
        </div>
      </Grid>

      <Grid item>
        <Typography align="center" variant="h6">{filled ? `Filled with ${filled} Lts` : 'Empty'}</Typography>
      </Grid>
    </Grid>
  );
};

Bucket.defaultProps = {
  large: false,
};

export default memo(Bucket);
