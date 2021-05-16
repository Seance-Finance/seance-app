const styles = theme => ({
  appBar: {
    boxShadow: '0px 0px',
    padding: '1rem',
    backgroundColor: 'unset',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    position: 'relative',
  },
  title: {
    '&,& a': {
      '&:hover,&:focus': {
        color: 'inherit',
        background: 'transparent',
      },
    },
  },
});

export default styles;
