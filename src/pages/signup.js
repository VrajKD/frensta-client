import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';


import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions'

const styles = {
    form: {
        textAlign: "center",
        paddingTop: 20,
    },
    title: {
        marginBottom: 20
    },
    textField: {
        margin: "15px 0"
    },
    button: {
        marginTop: 20,
        padding: 10
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 15
    }
}

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        }
        this.props.signUpUser(userData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes, UI: { loading, errors } } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h3" className={classes.title}>Sign Up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField variant="outlined"
                            name="email"
                            className={classes.textField}
                            id="email"
                            value={this.state.email}
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            fullWidth
                            onChange={this.handleChange} />
                        <TextField variant="outlined" name="password" className={classes.textField} id="password" helperText={errors.password}
                            error={errors.password ? true : false} value={this.state.password} type="password" label="Password" fullWidth onChange={this.handleChange} />
                        <TextField variant="outlined"
                            name="confirmPassword"
                            className={classes.textField}
                            id="confirmPassword"
                            value={this.state.confirmPassword}
                            type="password"
                            label="Confirm Password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            fullWidth
                            onChange={this.handleChange} />
                        <TextField variant="outlined"
                            name="handle"
                            className={classes.textField}
                            id="handle"
                            value={this.state.handle}
                            type="text"
                            label="Handle"
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            fullWidth
                            onChange={this.handleChange} />
                        {errors.general && <p className={classes.error}>{errors.general}</p>}
                        <Button type="submit" variant="contained" className={classes.button} color="secondary" fullWidth
                            disabled={loading}>{loading ? (
                                <CircularProgress color="secondary" thickness={5.0} size={30} />
                            ) : "SIGN UP"}</Button>
                    </form>
                    <p>Already have an account? Log in <Link to="/login"> here</Link> </p>
                </Grid>
                <Grid item sm />
            </Grid >
        )
    }
}

const mapStateToProps = state => ({
    UI: state.UI,
})

const mapDispatchToProps = {
    signUpUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup))

