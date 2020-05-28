import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PinDropIcon from '@material-ui/icons/PinDrop';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs'

const styles = {
    paper: {
        padding: 20
    },
    imageWrapper: {
        textAlign: "center",
        position: "relative",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        maxWidth: "100%",
        objectFit: "cover",
        boxShadow: "0px 0px 18px -0px rgba(0,0,0,0.31)"
    },
    textWrapper: {
        textAlign: "center",
        marginTop: 20,

    },
    text: {
        marginTop: 20,
        verticalAlign: "middle",
    },
    icon: {
        verticalAlign: "middle",
        marginRight: 10,
        paddingBottom: 2
    },
}

class StaticProfile extends Component {

    render() {
        const { classes, profile: { createdAt, imageURL, bio, website, location, handle } } = this.props;

        let profileMarkup = (
            <Paper className={classes.paper}>
                <div className={classes.imageWrapper}>
                    <img src={imageURL} className={classes.image} alt="Profile" />
                </div>
                <div className={classes.textWrapper}>
                    <Typography variant="h5" ><Link to={`/users/${handle}`}>{handle}</Link></Typography>
                    {bio && <div className={classes.text}>{bio}</div>}
                    {website && <div className={classes.text}><LinkOutlinedIcon color="primary" className={classes.icon} /><a href={website} rel=" noreferrer noopener " >{website}</a></div>}
                    {location && <div className={classes.text}><PinDropIcon color="secondary" className={classes.icon} />{location}</div>}
                    <div className={classes.text}><CalendarTodayIcon color="primary" className={classes.icon} />Joined {dayjs(createdAt).format("MMM YYYY")}</div>
                </div>
            </Paper>)
        return profileMarkup
    }
}

export default withStyles(styles)(StaticProfile)
