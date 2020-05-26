import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions'
import DeleteButton from './DeleteButton'

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Badge from '@material-ui/core/Badge';


const styles = {
    card: {
        position: "relative",
        display: 'flex',
        marginBottom: 20,
        padding: 10
    },
    image: {
        minWidth: 100,
        maxHeight: 100,
        objectFit: "cover",
        margin: "10px 10px",
        // backgroundSize: "contain",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"
    },
    content: {
        padding: "0px 15px",
        paddingTop: "5px"
    },
    cardText: {
        display: "flex",
        paddingBottom: 5
    },
    screamBody: {
        marginTop: 5,
        lineHeight: 2
    },
    likeWrapper: {
        marginTop: 25,
        padding: "-12px"
    },
    iconbtn: {
        padding: 0
    }
}

class Scream extends Component {

    isLiked = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
            return true;
        else
            return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }

    render() {
        dayjs.extend(relativeTime)
        // const tp = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including v"
        const { classes, scream: { imageURL, userHandle, likeCount, commentCount, createdAt, body, screamId }, user: { authenticated, credentials: { handle } } } = this.props
        const likeBtn = !authenticated ? (
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
        const delBtn = authenticated && userHandle === handle ? (
            <DeleteButton screamId={screamId} className={classes.delBtn} />
        ) : null;
        return (
            <Card className={classes.card}>

                <CardMedia image={imageURL} className={classes.image} title="Profile picture" />
                <CardContent className={classes.content}>
                    <Typography variant="h6" className={classes.cardText} component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {delBtn}
                    <Typography variant="caption" className={classes.cardText} color="textPrimary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body2" className={classes.screamBody}>{body} </Typography>
                    <div className={classes.likeWrapper}>
                        {likeBtn}
                    </div>
                </CardContent>
            </Card >
        )
    }
}

const mapDispatchToProps = ({ likeScream, unlikeScream })

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream))
