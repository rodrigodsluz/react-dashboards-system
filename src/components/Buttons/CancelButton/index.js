import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const CancelButton = withStyles((theme) => ({
  root: {
    fontWeight: 600,
    marginLeft: 10,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.buttons.cancel.light,
    '&:hover': {
      backgroundColor: theme.palette.buttons.cancel.hover,
    },
  },
}))(Button);

export default CancelButton;
