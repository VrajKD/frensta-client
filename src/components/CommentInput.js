import React, { Component } from 'react'
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { submitComment } from '../redux/actions/dataActions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const styles = {

    form: {
        display: "flex"
    },
    submitBtn: {
        padding: "8px",
        // marginTop: "5px",
        marginLeft: "10px"
    },
    grid: {
        marginTop: 25
    }
}

class CommentInput extends Component {
    state = {
        comment: '',
        errors: {}
    }

    componentDidUpdate(prevProps) {
        if (!this.props.UI.loading && prevProps.UI.loading && !Object.keys(this.props.UI.errors).length) {
            this.setState({
                comment: '',
                errors: {}
            })
        }
        if (Object.keys(this.props.UI.errors).length === 1 && !Object.keys(prevProps.UI.errors).length) {
            this.setState({ errors: this.props.UI.errors })
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.comment })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, authenticated } = this.props;
        const { errors } = this.state;

        const commentForm = authenticated ? (
            <Grid item sm={12} spacing={4} className={classes.grid}>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <Grid item sm={9}>
                        <TextField
                            fullWidth
                            helperText={errors.comment}
                            error={errors.email ? true : false}
                            name="comment"
                            label="comment"
                            placeholder="Add a comment"
                            variant="outlined"
                            type="text"
                            size="small"
                            className={classes.input}
                            value={this.state.comment}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <Button type="submit" variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submitBtn}
                        >Comment</Button>
                    </Grid>
                </form>
            </Grid>
        ) : null;
        return commentForm;
    }
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapDispatchToProps = { submitComment }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentInput))
