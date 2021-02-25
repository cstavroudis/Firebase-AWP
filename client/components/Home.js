import React from "react";
import ReactDOM from "react-dom";

class Home extends React.Component {
  constructor() {
    this.state = {
      isLoggedIn: false,
      user: null,
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await firebase.auth().signInWithPopup(provider);
      this.setState({ isLoggedIn: true, user: user });
      document.write(`Hello ${user.displayName}`);
      console.log("user", user);
    } catch (error) {
      console.log("error has occurred in googleLogin func:", error);
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div>
            <h1>Welcome to the Firebase AWP, {this.state.user.displayName}!</h1>
          </div>
        ) : (
          <div>
            <h1>Welcome to the Firebase AWP</h1>
            <button onclick={this.googleLogin()}>Login with Google</button>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("app"));

export default Home;
