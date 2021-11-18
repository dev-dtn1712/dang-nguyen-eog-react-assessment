import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  whiteBackground: {
    backgroundColor: '#FFF',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 500,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    backgroundColor: '#FFF',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
