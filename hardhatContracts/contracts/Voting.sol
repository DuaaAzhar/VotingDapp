// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable{
    struct Candidate{
        string name;
        uint votes;
    }
    Candidate[] public candidates;
    mapping (address => bool) public voters;
    uint public votingStart;
    uint public  votingEnd;

    constructor(string[] memory _candidateNames, uint _durationInMinutes) Ownable(msg.sender){
      for( uint i=0; i < _candidateNames.length; i++){
             candidates.push(
                Candidate({
                    name: _candidateNames[i],
                    votes: 0
                })
            );
        }
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }
    

    function initVoting(string[] memory _candidateNames, uint _durationInMinutes)public onlyOwner{
      require(getVotingStatus()== false, "Previous voting has not yet ended");
      if(candidates.length > 0){
        delete candidates;
      }
      for( uint i=0; i < _candidateNames.length; i++){
             candidates.push(
                Candidate({
                    name: _candidateNames[i],
                    votes: 0
                })
            );
        }
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }
    function addCandidate(string memory _name) public onlyOwner{
        require(getVotingStatus(), "voting not intialized");
        candidates.push(Candidate({
            name: _name,
            votes: 0
        }));
    }
    function vote(uint _id) public {
        require(!voters[msg.sender], "You have already casted vote");
        require(_id < candidates.length, "Invalid candidate id");
        
        candidates[_id].votes ++;
        voters[msg.sender] = true;
    }
    function results() public  view returns (Candidate[] memory) {
        return candidates;
    }
    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }
    function getRemainingTime() public view returns(uint){
        require(getVotingStatus(), "Voting not active");
         if (block.timestamp >= votingEnd) {
            return 0;
            }
        return votingEnd - block.timestamp;
    }

}