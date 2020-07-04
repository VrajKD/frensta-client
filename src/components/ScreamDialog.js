import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LikeButton from './LikeButton'
import CommentInput from './CommentInput'
import CommentsList from './CommentsList'
import dayjs from 'dayjs'
import { getOneScream, clearErrors } from '../redux/actions/dataActions'

//Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core'

const styles = {
    closeBtn: {
        position: 'absolute',
        left: "90%"
    },
    dialog: {
        padding: 20
    },
    image: {
        minWidth: 100,
        maxWidth: 150,
        maxHeight: 150,
        objectFit: "cover",
        width: "150px",
        margin: "auto",
        // backgroundSize: "contain",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"
    },
    cardText: {
        display: "flex",
        paddingBottom: 6
    },
    screamBody: {
        marginTop: 5,
        lineHeight: 2
    },
    likeWrapper: {
        marginTop: 25,
    },
    expand: {
        position: "absolute",
        left: "80%",
        top: "75%"
    }
}

class ScreamDialog extends Component {
    state = {
        open: false
    }
    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen()
        }
    }
    handleOpen = () => {
        this.props.getOneScream(this.props.screamId)
        let oldPath = window.location.pathname;
        let newPath = `/users/${this.props.userHandle}/scream/${this.props.screamId}`
        if (oldPath === newPath) oldPath = `/users/${this.props.userHandle}`;
        window.history.pushState(null, null, newPath)
        this.setState({ open: true, oldPath, newPath })

    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false })
        this.props.clearErrors();
    }
    render() {
        const { classes, scream: { body, createdAt, userHandle, imageURL, likeCount, screamId, comments }, loading } = this.props;
        return (
            <Fragment>
                <Tooltip title="Expand post">
                    <IconButton onClick={this.handleOpen} className={classes.expand}>
                        <UnfoldMoreIcon />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    TransitionComponent={Zoom}
                >
                    <Tooltip title="Close" placement="top">
                        <IconButton onClick={this.handleClose} className={classes.closeBtn}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    {/* <DialogTitle >{"Are you sure you want to delete this post ?"}</DialogTitle> */}
                    <DialogContent className={classes.dialog}>
                        {!loading ? (
                            <Fragment>
                                <Grid container spacing={2}>
                                    <Grid item sm={4} className={classes.screamLeft}>
                                        <div className={classes.imgWrapper}>
                                            <img src={imageURL} className={classes.image} alt="Profile" />
                                        </div>
                                    </Grid>
                                    <Grid item sm={8}>
                                        <Typography variant="h6" className={classes.cardText} color="textPrimary" component={Link} to={`/users/${userHandle}`}>
                                            @{userHandle}
                                        </Typography>
                                        <Typography variant="caption" className={classes.cardText} color="textPrimary">
                                            {dayjs(createdAt).fromNow()}
                                        </Typography>
                                        <Typography variant="body2" className={classes.screamBody}>{body} </Typography>
                                        <div className={classes.likeWrapper}>
                                            <LikeButton screamId={screamId} likeCount={likeCount} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <CommentInput screamId={screamId} />
                                <CommentsList comments={comments} className={classes.commentsList} />
                            </Fragment>) : (
                                <div style={{ textAlign: "center" }}><CircularProgress /></div>)}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    loading: state.UI.loading
})

export default connect(mapStateToProps, { getOneScream, clearErrors })(withStyles(styles)(ScreamDialog))
