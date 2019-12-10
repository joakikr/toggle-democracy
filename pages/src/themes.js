import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import purple from '@material-ui/core/colors/purple';

export const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: purple,
    secondary: deepPurple,
  }
});