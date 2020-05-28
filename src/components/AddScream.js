import React, { Component, Fragment } from 'react'
import { addScream } from '../redux/actions/dataActions'
import { connect } from 'react-redux'

//Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress'
import { IconButton, Tooltip } from '@material-ui/core'

const styles = {
    icons: {
        marginRight: 20,
        color: "white",
        fontSize: 30
    },
    input: {
        marginTop: 30,
        marginBottom: 30
    },
    closeBtn: {
        position: 'absolute',
        left: "90%"
    },
    button: {
        marginBottom: 15
    }
}

class AddScream extends Component {
    state = {
        body: '',
        open: false,
        errors: {}
    }

    componentDidUpdate(prevProps) {
        if (!this.props.UI.loading && prevProps.UI.loading && !Object.keys(this.props.UI.errors).length) {
            this.setState({
                body: '',
                errors: {},
                open: false
            })
        }
        if (Object.keys(this.props.UI.errors).length === 1 && !Object.keys(prevProps.UI.errors).length) {
            this.setState({ errors: this.props.UI.errors })
        }

    }

    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addScream(this.state.body)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes, UI: { loading, errors } } = this.props
        return (
            <Fragment>
                <Tooltip title="New post!" placement="bottom">
                    <IconButton onClick={this.handleOpen}>
                        <AddIcon className={classes.icons} />
                    </IconButton>
                </Tooltip>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <Tooltip title="Close" placement="top">
                        <IconButton onClick={this.handleClose} className={classes.closeBtn}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <DialogTitle>Add new post!</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                autoFocus
                                name="body"
                                label="Body"
                                type="text"
                                multiline
                                className={classes.input}
                                rows={3}
                                variant="outlined"
                                placeholder="Type it out!"
                                helperText={errors.body}
                                error={errors.body ? true : false}
                                fullWidth
                                value={this.state.body}
                                onChange={this.handleChange}
                            />
                            <Tooltip title="Add post!">
                                <Button type="submit" variant="contained" className={classes.button} color="primary" fullWidth
                                    disabled={loading}>{loading ? (
                                        <CircularProgress color="secondary" thickness={5.0} size={30} />
                                    ) : "POST!"}</Button>
                            </Tooltip>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(mapStateToProps, { addScream })(withStyles(styles)(AddScream))
