import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ScreamDialog from './ScreamDialog'


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

    render() {
        dayjs.extend(relativeTime)
        // const tp = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including v"
        const { classes, scream: { imageURL, userHandle, likeCount, commentCount, createdAt, body, screamId }, user: { authenticated, credentials: { handle } } } = this.props
        const delBtn = authenticated && userHandle === handle ? (
            <DeleteButton screamId={screamId} className={classes.delBtn} />
        ) : null;

        const expandBtn = authenticated ? (
            <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
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
                        <LikeButton screamId={screamId} likeCount={likeCount} />
                        {expandBtn}
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
