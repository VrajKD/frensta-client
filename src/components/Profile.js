import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import EditDetails from '../components/EditDetails'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import PinDropIcon from '@material-ui/icons/PinDrop';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs'
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip'
import ProfileSkeleton from './ProfileSkeleton'

import { uploadImage, logOutUser } from '../redux/actions/userActions'


const EditButton = withStyles({
    root: {
        backgroundColor: "white",
        boxShadow: '4px 5px 9px -0px rgba(0,0,0,0.27)',
        padding: 6,
        '&:hover': {
            backgroundColor: "white",
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        }
    }
})(IconButton)
const styles = {
    paper: {
        padding: 20
    },
    imageWrapper: {
        textAlign: "center",
        position: "relative",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        maxWidth: "100%",
        objectFit: "cover",
        boxShadow: "0px 0px 18px -0px rgba(0,0,0,0.31)"
    },
    textWrapper: {
        textAlign: "center",
        marginTop: 20,

    },
    text: {
        marginTop: 20,
        verticalAlign: "middle",
    },
    icon: {
        verticalAlign: "middle",
        marginRight: 10,
        paddingBottom: 2
    },
    editButton: {
        position: "absolute",
        top: "75%",
        left: "60%",
    },
    logButton: {
        backgroundColor: "#BF0A30",
        color: "white",
        '&:hover': {
            backgroundColor: "#ED2939",
            boxShadow: '0 0 0 0.2rem rgba(255,36,0,0.3)',
        }
    },
    btnWrapper: {
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: 15
    },
    hr: {
        border: 0,
        height: "0.5px",
        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0))",
        margin: "20px 80px"
    }
}

class Profile extends Component {

    onImageChange = (event) => {
        const img = event.target.files[0]
        const formData = new FormData();
        formData.append('image', img, img.name)
        this.props.uploadImage(formData)
    }

    onButtonClick = () => {
        const fileInput = document.getElementById("imageInput")
        fileInput.click();
    }

    logOut = () => {
        this.props.logOutUser();
    }

    render() {
        const { classes, user: { credentials: { createdAt, imageURL, bio, website, location, handle }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.imageWrapper}>
                    <img src={imageURL} className={classes.image} alt="Profile" />
                    <input type="file" hidden accept="image/png, image/jpeg" id="imageInput" onChange={this.onImageChange} />
                    <EditButton className={classes.editButton} color="primary" variant="contained" onClick={this.onButtonClick} ><EditIcon /></EditButton>
                </div>
                <div className={classes.textWrapper}>
                    <Typography variant="h5" color="inherit"><Link to={`/users/${handle}`}>{handle}</Link></Typography>
                    <hr className={classes.hr} />
                    {bio && <div className={classes.text}>{bio}</div>}
                    {website && <div className={classes.text}><LinkOutlinedIcon color="primary" className={classes.icon} /><a href={website} rel=" noreferrer noopener " >{website}</a></div>}
                    {location && <div className={classes.text}><PinDropIcon color="secondary" className={classes.icon} />{location}</div>}
                    <div className={classes.text}><CalendarTodayIcon color="primary" className={classes.icon} />Joined {dayjs(createdAt).format("MMM YYYY")}</div>
                    <div className={classes.btnWrapper}>
                        <Tooltip title="Log out!" placement="bottom">
                            <IconButton className={[classes.logButton, classes.text]} onClick={this.logOut}><ExitToAppIcon /></IconButton>
                        </Tooltip>
                        <EditDetails />
                    </div>
                </div>
            </Paper >
        ) : (
                <Paper className={classes.paper}>
                    <div className={classes.textWrapper}>
                        <Typography variant="h5" className={classes.text} >Welcome to Frensta</Typography>
                        <div className={classes.btnWrapper}>
                            <Button variant="contained" size="large" color="primary"><Link style={{ color: "white" }} to='/login'>Login</Link></Button>
                            <Button variant="contained" size="large" color="secondary"><Link style={{ color: "white" }} to='/signup'>Sign Up</Link></Button>
                        </div>
                    </div>
                </Paper >
            )) : (<ProfileSkeleton />
            )
        return profileMarkup
    }
}

const mapStateToProps = state => ({
    user: state.user
})
const mapDispatchToProps = ({ uploadImage, logOutUser })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))
