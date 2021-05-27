import { container } from 'assets/jss/material-kit-pro-react.js';

const appStyle = theme => ({
  container: {
    ...container,
    zIndex: 1,
  },
  children: {
    minHeight: '77vh',
  },
});

export default appStyle;
