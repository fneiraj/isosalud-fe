import defaultTheme from '../theme'

const drawerWidth = 256

const styles = (theme) => ({
  container: {
    margin: '80px 20px 20px 15px',
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down('sm')]: {
      paddingLeft: 0
    },
    position: 'absolute'
    //      width: `calc(100% - ${defaultTheme.drawer.width})`//px
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(2, 2),
    background: '#eaeff1'
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1'
  }
})

export default styles
