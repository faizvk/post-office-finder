// src/components/PostOfficeCard.jsx
import React from "react";

const PostOfficeCard = ({ postOffice }) => {
  const { Name, Pincode, District, State } = postOffice || {};

  return (
    <div className="card">
      <h4 className="card-title">{Name || "—"}</h4>

      <div className="card-row">
        <span className="card-label">Pincode:</span>
        <span className="card-val">{Pincode || "—"}</span>
      </div>

      <div className="card-row">
        <span className="card-label">District:</span>
        <span className="card-val">{District || "—"}</span>
      </div>

      <div className="card-row">
        <span className="card-label">State:</span>
        <span className="card-val">{State || "—"}</span>
      </div>
    </div>
  );
};

export default PostOfficeCard;
