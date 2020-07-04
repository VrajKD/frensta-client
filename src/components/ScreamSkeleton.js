import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Grid from '@material-ui/core/Grid'

const style = {
    skelText: {
        margin: "5px 0",
    },
    container: {
        margin: "30px 0"
    }
}

class ScreamSkeleton extends Component {
    render() {
        const { classes } = this.props;
        const a = [1, 2, 3]
        const skelMarkup = a.map((b, i) => (
            <Grid container className={classes.container}>
                <Grid item sm={2}>
                    <SkeletonTheme color="royalblue">
                        <Skeleton circle width={100} height={100} />
                    </SkeletonTheme>
                </Grid>
                <Grid item sm={9}>
                    <SkeletonTheme color="grey">
                        <p className={classes.skelText}>
                            <Skeleton width={100} height={20} />
                        </p>
                    </SkeletonTheme>
                    <p className={classes.skelText}>
                        <Skeleton width={150} height={10} />
                    </p>
                    <p className={classes.skelText}>
                        <Skeleton width={'80%'} height={18} />
                    </p>
                </Grid>
            </Grid>
        ))
        return skelMarkup
    }
}

export default withStyles(style)(ScreamSkeleton)
