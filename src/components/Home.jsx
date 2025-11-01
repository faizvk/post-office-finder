import React, { useState } from "react";
import Search from "./Search";

const Home = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [fetchedPincode, setFetchedPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleLookup = async (e) => {
    e.preventDefault();
    setError("");
    setPostOffices([]);

    const p = pincodeInput.trim();

    if (!/^\d{6}$/.test(p)) {
      setError("Pincode must be exactly 6 digits.");
      return;
    }

    setShowForm(false);
    setLoading(true);
    setFetchedPincode(p);

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${p}`);
      if (!res.ok) throw new Error(`Network error (${res.status})`);

      const json = await res.json();
      const apiResp = json[0];

      if (apiResp.Status === "Success" && Array.isArray(apiResp.PostOffice)) {
        setPostOffices(apiResp.PostOffice);
      } else {
        setError(apiResp.Message || "No data found for this pincode.");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPincodeInput("");
    setPostOffices([]);
    setFetchedPincode("");
    setError("");
    setShowForm(true);
  };

  return (
    <div className="home-wrapper">
      {showForm && (
        <form className="lookup-form" onSubmit={handleLookup}>
          <label htmlFor="pincode">Enter Pincode</label>
          <input
            id="pincode"
            type="text"
            placeholder="Pincode"
            value={pincodeInput}
            onChange={(e) => setPincodeInput(e.target.value)}
            maxLength={6}
            inputMode="numeric"
          />
          {/* 👇 Lookup button below input */}
          <button type="submit" className="lookup-btn">
            Lookup
          </button>

          {error && <div className="error-box">{error}</div>}
        </form>
      )}

      {/* Loader */}
      {!showForm && loading && (
        <div className="loader-wrap">
          <div className="spinner"></div>
          <div className="loader-text">Fetching postal data…</div>
        </div>
      )}

      {/* Show search results */}
      {!showForm && !loading && (
        <>
          <Search
            pincode={fetchedPincode}
            postOffices={postOffices}
            initialError={error}
          />
          <div style={{ marginTop: "20px" }}>
            <button className="lookup-btn" onClick={handleReset}>
              ← Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
