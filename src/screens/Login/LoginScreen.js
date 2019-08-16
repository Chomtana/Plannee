import React from "react"

class LoginFirebaseUI extends React.Component {
  componentDidMount() {
    window.startauthui("#authui")
  }
  
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    return <div id="authui"></div>
  }
}

export default function LoginScreen(props) {
  return <div>
    <LoginFirebaseUI></LoginFirebaseUI>
  </div>
}