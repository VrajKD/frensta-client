import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getViewUserData } from '../redux/actions/dataActions'
import Scream from '../components/Scream'
import StaticProfile from '../components/StaticProfile'

import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import ProfileSkeleton from '../components/ProfileSkeleton'
import ScreamSkeleton from '../components/ScreamSkeleton'

class User extends Component {
    state = {
        profile: null,
        screamIdParam: ''
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamIdParam = this.props.match.params.screamId;
        if (screamIdParam) this.setState({ screamIdParam: screamIdParam })
        this.props.getViewUserData(handle);


        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({ profile: res.data.user })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { screams, loading } = this.props.data
        const { screamIdParam } = this.state
        let recentScreams = loading ? (<ScreamSkeleton />) :
            screams === null ? ("No screams to show!") :
                !screamIdParam ?
                    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />) : (
                        screams.map(scream => {
                            if (scream.screamId !== screamIdParam) return <Scream key={scream.screamId} scream={scream} />
                            else return <Scream key={scream.screamId} scream={scream} openDialog />
                        })
                    );
        let profMarkup = this.state.profile === null ? (<ProfileSkeleton />) : (<StaticProfile profile={this.state.profile} />)
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12} >
                    {recentScreams}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profMarkup}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getViewUserData })(User)
