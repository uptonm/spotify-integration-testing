import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="card card-profile" style={{ height: "100%" }}>
      <div className="jumbotron text-center profile-banner">
        <img
          src={user.profileImage}
          alt={user.first}
          className="card-img-top rounded-circle align-middle profile-img"
        />
      </div>
      <div className="card-body text-center profile-body">
        <h5 className="card-title">{`${user.first} ${user.last}`}</h5>
        <p className="card-text">Hello frends!</p>
        <a href={user.profileLink} className="btn btn-primary">
          Check Out My Profile
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
