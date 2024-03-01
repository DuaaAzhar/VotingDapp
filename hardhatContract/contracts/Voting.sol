// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    struct Candidate{
        string name;
        uint votes;
    }
    Candidate[] public candidates;
    mapping (address => bool) public voters;
    address owner;
    uint public votingStart;
    uint public  votingEnd;

    constructor(string[] memory _candidateNames, uint _durationInMinutes) {
        for( uint i=0; i < _candidateNames.length; i++){
            candidates.push(
                Candidate({
                    name: _candidateNames[i],
                    votes: 0
                })
            );
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    function addCandidate(string memory _name) public onlyOwner{
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
        return (block.timestamp >= votingStart && block.timestamp <= votingEnd);
    }
    function getRemainingTime() public view returns(uint){
        require(getVotingStatus(), "Voting is disabled");
        return votingEnd - block.timestamp;
    }

}