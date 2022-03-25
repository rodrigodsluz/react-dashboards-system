import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SaveButton = withStyles((theme) => ({
  root: {
    fontWeight: 600,
    marginLeft: 10,
    color: theme.palette.text.light,
    backgroundColor: theme.palette.buttons.save.lightGreen,
    '&:hover': {
      backgroundColor: theme.palette.buttons.save.hoverGreen,
    },
  },
}))(Button);

export default SaveButton;
