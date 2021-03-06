import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 'calc(100vh - 225px)',
      '& .MuiTableCell-root': {
        padding: '8px',
      },
    },
  })
);
