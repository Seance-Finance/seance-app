const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    backgroundColor: theme.palette.background.section,
    flexDirection: 'column',
    border: '1px solid ' + theme.palette.background.border,
    padding: 16,
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  summary: { display: 'flex' },
  texts: {
    marginLeft: 12,
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    lineHeight: '18px',
    letterSpacing: 0,
    minWidth: '150px',
  },
  subtitle: {
    marginTop: 8,
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    lineHeight: '14px',
    letterSpacing: 0,
  },
  buyLinks: { marginTop: 12, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' },
  url: {
    padding: 8,
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.text.primary,
    lineHeight: '14px',
    letterSpacing: 0,
    '&:hover,&:focus': {
      color: theme.palette.text.secondary,
    },
  },
  icon: {
    color: theme.palette.text.primary,
    marginLeft: '4px',
  },
});

export default styles;
