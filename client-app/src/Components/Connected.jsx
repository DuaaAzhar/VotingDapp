import React from "react";

const Connected = (props) => {
  return (
    <div className="connected-container">
      <h1 className="welcome-message">You are Connected to Metamask</h1>
      <p className="connected-account"> Account: {props.address}</p>
      <p className="connected-account">
        {" "}
        Remaining Time: {props.remainingTime}
      </p>

      {props.showButton ? (
        <div className="connected-account">
        <input
          type="number"
          placeholder="Enter Candidate Index"
          value={props.number}
          onChange={props.handleNumberChange}
        ></input>
        <br />
        <button className="login-button" onClick={props.voteFunction}>
          Vote
        </button>
      </div>
        
      ) : (
        <p className="connected-account">You have already voted</p>
        )}

      

      <table id="myTable" className="candidates-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate Name</th>
            <th>Candidate Votes</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Connected;
