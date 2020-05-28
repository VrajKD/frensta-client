import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import withStyles from '@material-ui/core//styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataActions'
const styles = {
    iconbtn: {
        padding: 0
    }
}
class LikeButton extends Component {

    isLiked = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId))
            return true;
        else
            return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }

    render() {
        const { authenticated } = this.props.user
        const { classes, likeCount } = this.props
        const likeButton = !authenticated ? (
            <Tooltip title="Login to like" placement="top">
                <Link to="/login">
                    <ThumbUpOutlinedIcon />
                </Link>
            </Tooltip>
        ) : (
                this.isLiked() ? (
                    <Tooltip title="Dislike" placement="top">
                        <IconButton className={classes.iconbtn} onClick={this.unlikeScream}>
                            <Badge badgeContent={likeCount}>
                                <ThumbUpIcon color="primary" />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Like" placement="top">
                            <IconButton className={classes.iconbtn} onClick={this.likeScream}>
                                <Badge badgeContent={likeCount}>
                                    <ThumbUpOutlinedIcon color="primary" />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    )
            )
        return likeButton;
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LikeButton))
