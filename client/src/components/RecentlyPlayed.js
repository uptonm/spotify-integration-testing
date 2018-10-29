import React from "react";

const RecentlyPlayed = ({ recentlyPlayed }) => {
  return (
    <div className="card container" style={{ height: "100%" }}>
      <h1 className="display-4">Recently Played:</h1>
      <div className="row" style={{ padding: "1.5em" }}>
        <div className="col-6">
          <a href={recentlyPlayed.albumLink}>
            <img
              className="reflect"
              src={recentlyPlayed.albumArt}
              alt={recentlyPlayed.title}
              height="280"
            />
          </a>
        </div>
        <div className="col-6" style={{ paddingTop: "2em" }}>
          <p>
            <strong>
              Track: <br />
            </strong>
            {recentlyPlayed.title}
          </p>
          <p>
            <strong>
              Artist: <br />
            </strong>
            {recentlyPlayed.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentlyPlayed;
