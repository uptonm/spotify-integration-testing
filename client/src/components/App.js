import React, { Component } from "react";
import { fetchCurrentUser } from "../controllers/index";
import ProfileCard from "./ProfileCard";
import RecentlyPlayed from "./RecentlyPlayed";
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
    switch (this.state.user.recentlyPlayed) {
      case null:
        return <div />;
      case undefined:
        return (
          <div className="container text-center">
            <a href="/auth/spotify" className="btn btn-success btn-lg">
              <i className="fab fa-spotify" style={{ marginRight: "0.5em" }} />
              Login With Spotify
            </a>
          </div>
        );
      case {}:
        return (
          <div className="container">
            <button className="btn btn-success btn-lg">
              <i className="fab fa-spotify" style={{ marginRight: "0.5em" }} />
              Login With Spotify
            </button>
          </div>
        );
      default:
        return (
          <div className="row" style={{ height: "45vh" }}>
            <div className="col-3" style={{ marginRight: "0.5rem" }}>
              <ProfileCard user={this.state.user} />
            </div>
            <div className="col-8">
              <RecentlyPlayed recentlyPlayed={this.state.user.recentlyPlayed} />
            </div>
          </div>
        );
    }
  };
  render() {
    return (
      <div className="container" style={{ paddingTop: "10rem" }}>
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
