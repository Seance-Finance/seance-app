const styles = theme => ({
  container: {
    paddingTop: '4px',
  },
  tvl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  title: {
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  titleLoader: {
    marginLeft: '12px',
  },
  text: {
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
});

export default styles;
