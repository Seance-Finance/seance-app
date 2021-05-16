const styles = theme => ({
  details: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    padding: '20px 0',
  },
  section: {
    backgroundColor: theme.palette.background.section,
    border: '1px solid ' + theme.palette.background.border,
    padding: 16,
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  expandIcon: { margin: '12px 0 -12px 0' },
});

export default styles;
