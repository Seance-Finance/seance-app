import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: { display: 'flex', alignItems: 'center' },
    button: {
      position: 'relative',
      height: 48,
      border: 'none',
      backgroundColor: theme.palette.background.paper,
      marginLeft: 8,
      borderRadius: '0.5rem',
    },
    avatar: {
      width: '24px',
      height: '24px',
      marginRight: '4px',
    },
    walletButton: {
      width: '100%',
      fontWeight: 'bold',
    },
    iconButton: {
      width: 48,
    },
    popover: {
      [theme.breakpoints.up('sm')]: {
        marginTop: 12,
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: -12,
      },
    },
    paper: { backgroundColor: theme.palette.background.paper, width: 130 },
    listItem: {
      '& :hover': {
        color: theme.palette.text.secondary,
      },
    },
    link: {
      color: theme.palette.text.primary,
      display: 'flex',
      flex: '1 1 0%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
    },
    icon: { marginRight: 8 },
  })
);
