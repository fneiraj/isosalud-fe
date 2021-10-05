const styles = (theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(../assets/images/login_background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: '#1976D2'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorDiv: {
    width: '100%',
    marginTop: '2vh',
    marginBottom: '2vh'
  },
  formContainer: {
    backgroundColor: '#EDEDED'
  },
  noSelect: {
    '-webkit-touch-callout': 'none', /* iOS Safari */
    '-webkit-user-select': 'none', /* Safari */
    '-khtml-user-select': 'none', /* Konqueror HTML */
    '-moz-user-select': 'none', /* Old versions of Firefox */
    '-ms-user-select': 'none', /* Internet Explorer/Edge */
    'user-select': 'none' /* Non-prefixed version, currently
                                                supported by Chrome, Edge, Opera and Firefox */
  }
})

export default styles
