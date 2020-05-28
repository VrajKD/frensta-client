import React, { Component, Fragment } from 'react'
import { editUserDetails } from '../redux/actions/userActions'
import { connect } from 'react-redux'

//Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Tooltip } from '@material-ui/core'


const styles = {
    input: {
        marginTop: 20
    },
    logButton: {
        backgroundColor: "#6495ed",
        color: "white",
        '&:hover': {
            backgroundColor: "#0f52ba",
            boxShadow: '0 0 0 0.2rem rgba(100,149,237,0.3)',
        },
        marginTop: 20,
        verticalAlign: "middle",
    }
}

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapValuesToState(credentials)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userData = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        }
        this.props.editUserDetails(userData);
        this.handleClose();
    }

    handleOpen = () => {
        this.setState({ open: true })
        const { credentials } = this.props;
        this.mapValuesToState(credentials);
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    mapValuesToState = (cred) => {
        this.setState({
            bio: cred.bio ? cred.bio : '',
            website: cred.website ? cred.website : '',
            location: cred.location ? cred.location : '',
        })
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.logButton}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit profile details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="bio"
                                label="Bio"
                                type="text"
                                multiline
                                className={classes.input}
                                rows={3}
                                variant="outlined"
                                placeholder="Something about yourself"
                                fullWidth
                                value={this.state.bio}
                                onChange={this.handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="A link to your portfolio or another social media account"
                                variant="outlined"
                                fullWidth
                                className={classes.input}
                                value={this.state.website}
                                onChange={this.handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="location"
                                type="text"
                                className={classes.input}
                                placeholder="Your location"
                                label="Location"
                                variant="outlined"
                                fullWidth
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>CANCEL</Button>
                        <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

const mapDispatchToProps = { editUserDetails }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDetails))
