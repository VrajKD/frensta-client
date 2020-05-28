import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions'

import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip'

const styles = {
    delbtn: {
        position: "absolute",
        left: '80%',
        top: '2.5%'
    }
}

class DeleteButton extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Delete Post">
                    <IconButton onClick={this.handleOpen} className={classes.delbtn}>
                        <DeleteForeverOutlinedIcon color="secondary" />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle >{"Are you sure you want to delete this post ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            This action is irreversible.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            CANCEL
          </Button>
                        <Button onClick={this.deleteScream} color="secondary" autoFocus>
                            DELETE
          </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteButton))
