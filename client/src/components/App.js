import React, { Component } from "react";
import { fetchCurrentUser } from "../controllers/index";
import ProfileCard from "./ProfileCard";
import "../assets/app.css";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount = async () => {
    const res = await fetchCurrentUser();
    this.setState({ user: res.data });
  };

  renderContent = () => {
    let { user } = this.state;
    switch (user) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        return <ProfileCard user={user} />;
    }
  };
  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

export default App;
