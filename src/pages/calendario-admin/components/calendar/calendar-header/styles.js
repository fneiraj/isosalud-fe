const styles = (theme) => ({
  container: {
    marginBottom: 15,
    marginTop: 15,

    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      justify: 'center',
      flexDirection: 'row'
    }
  },
  floatRight: {
    float: 'right'
  },
  alignRight: {
    alignContent: 'right',
    maxWidth: '100%'
  },
  textCenter: {
    textAlign: 'center'
  },
  calendarType: {
    maxHeight: 36,
    minWidth: 106
  },
  fullWidthOnSmDown: {
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      minWidth: '100%'
    }
  },
  marginTopOnSmDown: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 15
    }
  }
})

export default styles
