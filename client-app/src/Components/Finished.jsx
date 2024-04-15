import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const Finished = (props) => {
  const [candidateNames, setCandidateNames] = useState(["", "", ""]);
  const [votingTime, setVotingTime] = useState("");

  const handleCandidateNameChange = (index, value) => {
    let updatedNames = [...candidateNames];
    updatedNames[index] = value;
    setCandidateNames(updatedNames);
  };
  const handleAddCandidate = () => {
    setCandidateNames([...candidateNames, ""]);
  };
  const handleRemoveCandidate = (index) => {
    const newArray = [...candidateNames];
    newArray.splice(index, 1);
    setCandidateNames(newArray);
  };
  return (
    <div className="login-container">
      <div className="welcome-message">Voting is Finished</div>
      <h2>Initialize Voting </h2>
      {candidateNames.map((name, index) => (
        <div>
          <input
            type="text"
            key={index}
            value={name}  
            placeholder="Candidate Name"
            className="candidate-name"
            onChange={(e) => handleCandidateNameChange(index, e.target.value)}
          />
          <button
            style={{ color: "red" }}
            onClick={() => handleRemoveCandidate(index)}
            className="del-button"
          >
            <DeleteIcon />
          </button>
        </div>
      ))}
      <br />

     
      <div className="finished-container">
        <input
          type="number"
          min={1}
          value={votingTime}
          placeholder="Voting Time in Minutes"
          onChange={(e) => setVotingTime(e.target.value)}
        />

      <button onClick={handleAddCandidate} 
      className="add-candidate-button">
        Add Candidate
        
      </button>

      <button
        onClick={() => props.init(candidateNames, votingTime)}
        className="start-button"
      >
        Start
      </button>
    </div>
    </div>
  );
};

export default Finished;
