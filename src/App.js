import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import store from './redux/store'
import { logOutUser, getUserData } from './redux/actions/userActions'
import axios from 'axios'

//COMPONENTS
import Navbar from './components/Navbar'
import AuthRoute from './components/AuthRoute'

//PAGES
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import User from './pages/user'
import { SET_AUTHENTICATED } from './redux/types'

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    store.dispatch(logOutUser())
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })

    axios.defaults.headers.common["Authorization"] = token
    store.dispatch(getUserData())

  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" >
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/users/:handle" component={User} />
                <Route exact path="/users/:handle/scream/:screamId" component={User} />
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />

              </Switch>
            </div>
          </Router>
        </div >
      </Provider>
    )
  }
}

export default App
