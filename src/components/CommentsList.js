import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
const styles = {
    image: {
        minWidth: 40,
        maxWidth: 40,
        height: 40,
        objectFit: "cover",
        margin: "auto",
        // backgroundSize: "contain",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"
    },
    grid: {
        display: "flex",
        margin: 10,
        borderBottom: "0.5px solid #a6a6a6"
    },
    container: {
        marginTop: 20,
        paddingTop: 15,
        borderRadius: 20,
        backgroundColor: "#e0f6ff"
    },
    imageWrapper: {
        textAlign: "center"
    },
    textWrapper: {
        paddingBottom: 10
    }
}
class CommentsList extends Component {
    render() {
        const { classes, comments } = this.props;
        const list = comments.map(comment => (
            <Fragment key={comment.createdAt}>
                <Grid item sm={12} className={classes.grid}>
                    <Grid item sm={2} className={classes.imageWrapper}>
                        <img src={comment.imageURL} className={classes.image} alt="Profile" />
                    </Grid>
                    <Grid item sm={10} className={classes.textWrapper}>
                        <Typography variant="body2">
                            {comment.body} - <Typography component={Link} to={`/users/${comment.userHandle}`} variant="body2">
                                {comment.userHandle}
                            </Typography>
                        </Typography>
                        <Typography variant="caption">
                            {dayjs(comment.createdAt).fromNow()}
                        </Typography>
                    </Grid>
                </Grid>
            </Fragment>
        ))
        return (
            <Grid container sm={12} className={classes.container}>
                {list}
            </Grid>
        )
    }
}

export default withStyles(styles)(CommentsList)
