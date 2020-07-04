import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import PinDropIcon from '@material-ui/icons/PinDrop';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const style = {
    paper: {
        padding: 20,
        textAlign: "center"
    },
    handle: {
        margin: "20px 0"
    },
    textWrapper: {
        marginTop: 20,
        verticalAlign: "middle",
    },
    text: {
        margin: "5px 0"
    },
    icon: {
        verticalAlign: "middle",
        marginRight: 10,
        paddingBottom: 2
    },
}

class ProfileSkeleton extends Component {
    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.paper}>
                <SkeletonTheme color="#D21F3C" >
                    <p>
                        <Skeleton circle={true} height={150} width={150} color="#202020" />
                    </p>
                </SkeletonTheme>
                <SkeletonTheme color="#73c2fb">
                    <p className={classes.handle} >
                        <Skeleton width={150} height={20} />
                    </p>
                </SkeletonTheme>
                <div className={classes.textWrapper}>
                    <p className={classes.text}>
                        <Skeleton width={300} height={20} />
                    </p>
                    <p className={classes.text}>
                        <Skeleton width={300} height={20} />
                    </p>
                    <p className={classes.text}>
                        <Skeleton width={300} height={20} />
                    </p>
                </div>
            </Paper>
        )
    }
}

export default withStyles(style)(ProfileSkeleton)
