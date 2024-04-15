const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {
  const VotingContract = m.contract("Voting", [["Alie","Bob","Sebestian","Farry"], 1440]);

  return { VotingContract };
});
