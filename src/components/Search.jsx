import React, { useState } from "react";
import PostOfficeCard from "./PostOfficeCard";

const Search = ({ pincode, postOffices = [], initialError }) => {
  const [filterText, setFilterText] = useState("");

  const filtered = filterText
    ? postOffices.filter((po) =>
        (po.Name || "").toLowerCase().includes(filterText.toLowerCase())
      )
    : postOffices;

  const countMessage = postOffices.length
    ? `${postOffices.length} post office(s) found`
    : pincode
    ? "No results found for this pincode."
    : "";

  return (
    <div className="search-wrapper">
      <div className="search-header">
        <h3 className="pincode-heading">Pincode: {pincode || "—"}</h3>
        <p className="count-message">
          <b>Message:</b> {countMessage}
        </p>
      </div>

      <div className="filter-row">
        <input
          className="filter-input"
          placeholder="Filter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="cards-grid">
        {initialError && <div className="error-box">{initialError}</div>}

        {!postOffices.length && !initialError && (
          <div className="info-box">No postal data to display.</div>
        )}

        {postOffices.length > 0 && filtered.length === 0 && (
          <div className="not-found">
            Couldn’t find the postal data you’re looking for…
          </div>
        )}

        {filtered.map((po) => (
          <PostOfficeCard key={`${po.Name}-${po.BranchType}`} postOffice={po} />
        ))}
      </div>
    </div>
  );
};

export default Search;
