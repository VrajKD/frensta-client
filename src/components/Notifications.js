import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions'

//?Material UI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge'
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const styles = {
    uIcon: {
        color: "#25D366",
        marginRight: 10
    },
    rIcon: {
        color: "#C0DEED",
        marginRight: 10
    },
    icons: {
        color: "white",
        fontSize: 30
    }
}

class Notifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    menuOpened = () => {
        const notifIds = this.props.notifications
            .filter(notif => !notif.read)
            .map(notif => notif.notificationId)
        this.props.markNotificationsRead(notifIds)
    }

    render() {
        dayjs.extend(relativeTime)
        const { classes, notifications } = this.props
        const { anchorEl } = this.state
        let notificationIcon;
        if (notifications && notifications.length > 0) {
            const unread = notifications.filter(notif => !notif.read).length
            if (unread > 0) {
                notificationIcon = (
                    <Badge badgeContent={unread} overlap="circle" variant="standard" color="secondary">
                        <NotificationImportantIcon className={classes.icons} />
                    </Badge>
                )
            }
            else {
                notificationIcon = <NotificationsNoneIcon className={classes.icons} />
            }
        }
        else {
            notificationIcon = <NotificationsNoneIcon className={classes.icons} />
        }
        console.log(notifications, notifications.length)
        let notificationMarkup = notifications && notifications.length > 0 ? (
            notifications.map(notif => {
                const verb = notif.type === 'like' ? "liked" : "commented on";
                const time = dayjs(notif.createdAt).fromNow();
                const iconStyle = notif.read ? classes.rIcon : classes.uIcon;
                // const divStyle = notif.read ? classes.rNotif : classes.uNotif;
                const icon = notif.type === 'like' ? (
                    <ThumbUpIcon className={iconStyle} />
                ) : (
                        <ChatIcon className={iconStyle} />
                    );

                return (
                    <MenuItem key={notif.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography variant="body2" component={Link} to={`/users/${notif.recipient}/scream/${notif.screamId}`}>
                            {notif.sender} {verb} your post - <Typography variant="caption">{time}</Typography>
                        </Typography>
                    </MenuItem>
                )

            })
        ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet.
                </MenuItem>
            );
        console.log(notificationMarkup)



        return (
            <Fragment>
                <Tooltip title="Check your notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>
                </Tooltip>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.menuOpened}>
                    {notificationMarkup}
                </Menu>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(withStyles(styles)(Notifications))
