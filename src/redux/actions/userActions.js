import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types'
import axios from 'axios'

export const logInUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', userData)
        .then((res) => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken)
            axios.defaults.headers.common["Authorization"] = FBIdToken
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS })
            history.push("/")
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const signUpUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    axios.post('/signup', userData)
        .then((res) => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken)
            axios.defaults.headers.common["Authorization"] = FBIdToken
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS })
            history.push("/")
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logOutUser = () => dispatch => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED })
}


export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err))

}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.post('/user/image', formData)
        .then(res => {
            dispatch(getUserData())
        })
        .catch(err => console.error(err))
}

export const editUserDetails = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.post('/user', formData)
        .then(res => {
            dispatch(getUserData())
        })
        .catch(err => console.error(err))
}