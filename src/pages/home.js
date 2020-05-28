import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Scream from '../components/Scream'
import Profile from '../components/Profile'
import { getScreams } from '../redux/actions/dataActions'
import { connect } from 'react-redux'

export class Home extends Component {

    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data
        let recentScreams = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : "Loading..."
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12} >
                    {recentScreams}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = ({ getScreams })
export default connect(mapStateToProps, mapDispatchToProps)(Home)
