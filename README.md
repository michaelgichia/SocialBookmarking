  # Firebase-Authentication
  This is application is for demonstrating one way of protecting React Pages or Routes in this case unless the user signed in.
  
  ## The Challenge
  The challenging part was to use an `observer` as recommended by firebase [here](https://firebase.google.com/docs/auth/web/manage-users). The `Observer`, to me looks like an event listener. Passing an observer as a callback (keeping in mind the structure of an event listener) to the `onEnter` hook provided `react-router 3` possed the ultimate challenge. 

  ## How I solved it
  There several ways you could solve it but the cleanest way I found was using`Higher Order Component (HOC)`. HOC is an abstraction that allow us to define logic in one place and use it in any other component that is needed. In the simplest terms, is a function that accepts a component, and returns a new component that wraps the original.
  
  ## The Application Structure
  This is the `firebase-authentication/src` folder.
  
  ```sh
  ├── App.js
  ├── App.test.js
  ├── config
  │   └── firebaseConstants.js
  ├── containers
  │   ├── AuthRequired.js
  │   ├── Dashboard.js
  │   ├── LoginPage.js
  │   ├── PageNotFound.js
  │   ├── RegisterPage.js
  │   └── WelcomePage.js
  ├── index.css
  ├── index.js
  ├── registerServiceWorker.js
  ├── routes.js
  └── utils
      └── firebaseHelpers.js

  ```
  ## Index

  1. [Bootstrap our application](#bootstrap-our-application)
  1. [Get firebase credentials](#get-firebase-credentials)
  1. [Setting up firebase](#setting-up-firebase)
  1. [Adding react router](#adding-react-route)
  1. [Adding pages to our application](#adding-pages-to-our-application)
      1. [Welcome page](#welcome-page)
      1. Login page(#login-page)
      1. [Registration] page(#registration-page)
      1. [Dashboard](#dashboard)
      1. [Page not found page](#page-not-found-page)
  1. [Styling the application](#styling-the-application)
  1. [Authentication required](#authentication-required)

  ## Bootstrap our application
    
  We are going to use `create-react-app` to bootstrap our application.

  ```sh
  $ create-react-app firebase-authentication
  ```
  Lets make sure everything works at this point before we proceed.
  ```sh
  $ cd firebase-authentication && yarn start
  ```
  Now, let add the required packages.
  ```sh
  $ npm i -S firebase
  $ npm i -S react-router@3
  ```
  ## Get Firebase Credentials

  You need a Google account to log to firebase console. If you have a Google account the log in to firebase console via https://console.firebase.google.com/u/1/

  Add project, in our case the project name is firebase-authentication. On the side navbar, click `Authentication` and set up sign in method.

  Select sign up, choose one of the Auth services and `enable` it. There are several Auth services to choose from but we will use `EmailAuthProvider`.

  On the same page, on top right, click `WEB SETUP`. These are the Credentials that we will need for application.

  ## Setting up Firebase
  We will initialize firebase on this file. Create a `config` folder for the configurations(for sanity sakes).
  
  ```sh
  $ mkdir src/config
  ```
  Create a file called firebaseConstants.js. Place all the firebase credentials here.
  ```sh
  $ touch src/config/firebaseConstants.js
  ```
  Your file should look like this. Provide your firebase credintials and change the below values.

  `src/config/firebaseConstants.js`
  ```javascript
  import firebase from 'firebase'

  const config = {
    apiKey: "<Add your secret values>",
    authDomain: "<Add your secret values>",
    databaseURL: "<Add your secret values>",
    projectId: "<Add your secret values>",
    storageBucket: "<Add your secret values>",
    messagingSenderId: "<Add your secret values>"
  }

  firebase.initializeApp(config)
  export const ref = firebase.database().ref()
  export const firebaseAuth = firebase.auth
  ```
  Again, for sanity sake let create `utils folder` for firebase helper functions.
  ```sh
  $ mkdir src/utils
  ```
  What should we call the firebase helper file? You are right, firebaseHelpers.js. Put the file under `src/utils/`.
  #
  ```sh
  $ touch src/utils/firebaseHelpers.js
  ```
  Since we need these functions on several files, the best way is to abstract them on their own file and import them where they are needed.
  ####
  `src/utils/firebaseHelpers.js`
  ```javascript
  import { ref, firebaseAuth } from "../config/firebaseConstants";

  export function auth(email, password) {
    return firebaseAuth()
      .createUserWithEmailAndPassword(email, password)
      .then(saveUser);
  }

  export function logout() {
    return firebaseAuth().signOut();
  }

  export function login(email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw);
  }

  export function saveUser(user) {
    return ref
      .child(`users/${user.uid}/info`)
      .set({
        email: user.email,
        uid: user.uid
      })
      .then(() => user);
  }
  ```

  For more information, refer to firebase [docs](https://firebase.google.com/docs/auth/web/password-auth).

  ## Adding React-router

  Create a routes.js file where we will put all our routes. Since this is a demo application, we will have five routes or pages in this matter.
  ```sh
  $ touch src/routes.js
  ```

  The file should look like this.
  ```jsx
  import React from 'react';
  import { Router, Route, IndexRoute } from 'react-router';
  import App from './App';
  import LoginPage from './containers/LoginPage';
  import RegisterPage from './containers/RegisterPage';
  import WelcomePage from './containers/WelcomePage';
  import Dashboard from './containers/Dashboard';
  import PageNotFound from './containers/PageNotFound';

  const Routes = (props) => 
    <Router {...props}>
    <Route path="/" component={App}>
        <IndexRoute component={WelcomePage} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={PageNotFound} />
      </Route>
    </Router>

  export default Routes;
  ```
  The `src/routes.js` will be imported in `src/index.js`. Below is a snippet of `src/index.js` file.

  `src/index.js`
  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { browserHistory } from "react-router";
  import "./index.css";
  import Routes from "./routes";
  import registerServiceWorker from "./registerServiceWorker";

  ReactDOM.render(
    <Routes history={browserHistory} />,
    document.getElementById("root")
  );
  registerServiceWorker();
  ```
  ## Adding Pages to our application

  We will not go indepth on the content of these pages.

  ### Dashboard
  A user can only access this page after they are registered and signed in.

  <details>
  <summary>Dashboard Source Code</summary>

  ```jsx
  import React from 'react';
  import AuthRequired from './AuthRequired';

  class Dashboard extends React.Component {

    render() {
      return (
        <div className="page-wrapper">
          <h1>DASHBOARD</h1>
          <h4>This page is protect and only authorized users can view it.</h4>
        </div>
      );
    }
  }
  export default AuthRequired(Dashboard);
  ```
  </details>

### Login Page
User login.

  <details>
  <summary>LoginPage source code</summary>

  ```jsx
  import React from "react";
  import { browserHistory } from "react-router";
  import { login } from "../utils/firebaseHelpers";

  class LoginPage extends React.Component {
    state = {
      loginError: null,
      loginBtn: "Login"
    };

    handleLoginUser = () => {
      this.setState({ loginBtn: "Loading...." });
      login(this.email.value, this.password.value)
        .then(() => {
          browserHistory.replace("/dashboard");
        })
        .catch(error => {
          this.setState({
            loginBtn: "Login",
            loginError: "Invalid username/password."
          });
        });
    };

    render() {
      const { loginError, loginBtn } = this.state;
      return (
        <div className="login-page">
          <div className="page-wrapper">
            {loginError &&
              <h3 style={{ color: "red" }}>
                {loginError}
              </h3>}
          </div>
          <div className="form">
            <h1>Login</h1>
            <form className="login-form" onSubmit={e => e.preventDefault()}>
              <input
                ref={email => (this.email = email)}
                type="text"
                placeholder="username"
              />
              <input
                ref={password => (this.password = password)}
                type="password"
                placeholder="password"
              />
              <button onClick={this.handleLoginUser}>
                {loginBtn}
              </button>
            </form>
          </div>
        </div>
      );
    }
  }

  export default LoginPage;
  ```
  </details>

### Page not found page
This is displayed when no route is matched.

  <details>
  <summary>PageNotFound source code</summary>

  ```jsx
  import React from 'react';

  class PageNotFound extends React.Component {
    render() {
      return (
        <div className="page-not-found">
          <h1>404</h1>
          <h1>Page Not Found</h1>
        </div>
      );
    }
  }

  export default PageNotFound;
  ```
  </details>


### Registration page
User registration.

  <details>
  <summary>RegisterPage source code</summary>

  ```jsx
  import React from "react";
  import { browserHistory } from "react-router";
  import { auth } from "../utils/firebaseHelpers";

  class RegisterPage extends React.Component {
    state = {
      registrationError: null,
      registerBtn: "Register"
    };
    handleRegisterUser = () => {
      this.setState({ registerBtn: "Loading....." });
      auth(this.email.value, this.password.value)
        .then(() => {
          this.setState({ registerBtn: "Register" });
          browserHistory.push("/dashboard");
        })
        .catch(e =>
          this.setState({ registrationError: e.message, registerBtn: "Register" })
        );
    };

    render() {
      const { registrationError, registerBtn } = this.state;
      return (
        <div className="login-page">
          <div className="page-wrapper">
            {registrationError &&
              <h3 style={{ color: "red" }}>
                {registrationError}
              </h3>}
          </div>
          <div className="form">
            <h1>Sign Up</h1>
            <form className="login-form" onSubmit={e => e.preventDefault()}>
              <input
                ref={email => (this.email = email)}
                type="text"
                placeholder="email"
              />
              <input
                ref={password => (this.password = password)}
                type="password"
                placeholder="password"
              />
              <button onClick={this.handleRegisterUser}>
                {registerBtn}
              </button>
            </form>
          </div>
        </div>
      );
    }
  }

  export default RegisterPage;
  ```
  </details>

### Welcome page

  <details>
  <summary>WelcomePage source code</summary>

  ```jsx
  import React from "react";

  class WelcomePage extends React.Component {
    render() {
      return (
        <div className="page-wrapper">
          <h1>Welcome to firebase-authentication application</h1>
          <p>This is a demonstration of how to track if user is signed in.</p>
          <p>We take advantage of Higher Order Component to protect pages and keep the source code neat.</p>
        </div>
      );
    }
  }

  export default WelcomePage;
  ```
  </details>

  ## Styling the application
  Lets add a few css for styling our application.
  
  <details>
  <summary>index.css source code</summary>

  ```css
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);

  body {
    background: #e6ecf0;
    font-family: "Roboto", sans-serif;
    margin: 0;
    padding: 0;
  }

  .page-wrapper {
    margin: 16px;
    padding: 16px;
    text-align: center;
  }

  /* Start of login form styling */
  .login-page {
    width: 100%;
    padding: 8% 0 0;
    margin: auto;
  }
  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 60%;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4caf50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .form button:hover,
  .form button:active,
  .form button:focus {
    background: #43a047;
  }
  /* End of login form styling */

  /* Start navbar styling */
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li:first-of-type {
    float: left;
  }

  li {
    float: right;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  li a:hover {
    background-color: #111;
  }
  /* End of navbar styling */

  /* Start PageNotFound styling */
  .page-not-found {
    margin-top: 50px;
    text-align: center;
  }
  /* End of PageNotFound styling */

  ```
  </details>

  ## Authentication required
  As stated ealier, Higher Order Components(HOC) transforms a component to another component.

  HOC `AuthRequired` abstract the logic we use to check if user if signed in. Alternatively, we would have pass the logic on every `page` that is protected. This method goes againt the `DRY` principle.

  `Create-react-app` does not allow install `babel-plugin-transform-decorators-legacy` unless you eject. `babel-plugin-transform-decorators-legacy` allow us to use decorators instead of calling the `wrapper component` with the `HOC`.

  Incase you want to use `decorators`. This is how you use the HOC to protect the pages.

  `With decorators`
  ```jsx
  import React from "react";
  import AuthRequired from "somewhere/AuthRequired"

  @AuthRequired
  class App extends React.Component {
    // lot of stuffs
  };

  export default App;
  ```
  `Without decorators`
  ```jsx
  import React from "react";
  import AuthRequired from "somewhere/AuthRequired"

  class App extends React.Component {
    // lot of stuffs
  };

  export default AuthRequired(App);
  ```

  ##### What HOCs enables us to do:
  - Code reuse, logic and bootstrap abstraction
  - Render Highjacking
  - State abstraction and manipulation
  - Props manipulation

  Create a file under `src/containers` and name it `AuthRequired`.
  ```sh
  $ touch src/containers/AuthRequired.js
  ```
  Source code for AuthRequired HOC.
  ```jsx
  import React from "react";
  import { browserHistory } from "react-router";
  import { firebaseAuth } from "../config/firebaseConstants";

  const AuthRequired = WrappedComponent => {
    return class AuthKlass extends React.Component {
      componentDidMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged(user => {
          if (user === null) {
            browserHistory.push("/signin");
          }
        });
      }

    componentWillUnmount() {
      this.removeListener()
    }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };

  export default AuthRequired;
  ```
