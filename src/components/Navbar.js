import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

//?Material UI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Tooltip, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AddScream from './AddScream'
import Notifications from './Notifications'

const styles = {
    icons: {
        marginRight: 20,
        color: "white",
        fontSize: 30
    }
}

class Navbar extends Component {
    //AppBar bg color alternative : #128C7E
    render() {
        const { classes, authenticated } = this.props;
        let navMarkup = authenticated ? (
            <Fragment>
                <AddScream />
                <Tooltip title="Back home!" placement="bottom">
                    <IconButton component={Link} to='/'>
                        <HomeIcon className={classes.icons} />
                    </IconButton>
                </Tooltip>
                <Notifications />
            </Fragment>
        ) : (
                <Fragment>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Sign up</Button>
                </Fragment>
            );
        return (
            <AppBar style={{ backgroundColor: "#075E54" }}>
                <Toolbar className="nav-container">
                    {navMarkup}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar))
