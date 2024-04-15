import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./Constants/constants.js";
import "./App.css";
import Login from "./Components/Login.jsx";
import Connected from "./Components/Connected.jsx";
import Finished from "./Components/Finished.jsx";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState("");
  const [canVote, setCanVote] = useState(true);

  async function getSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
  }
  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const signer = await getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected: " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Metamask not detected");
    }
  }

  async function getCurrentStatus() {
    const signer = await getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }
  async function getRemainingTime() {
    const signer = await getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const remainingTime = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(remainingTime, 16));
  }
  async function getCandidates() {
    const signer = await getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const candidtesList = await contractInstance.results();
    const formattedCandidates = candidtesList.map((candidates, index) => {
      return {
        index: index,
        name: candidates.name,
        voteCount: candidates.votes.toNumber(),
      };
    });
    setCandidates(formattedCandidates);
  }
  async function voteStatus() {
    const signer = await getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setCanVote(await contractInstance.voters(await signer.getAddress()));
    console.log("can vote= ", canVote);
  }
  async function vote() {
    const signer = await getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const tx = await contractInstance.vote(number);
    await tx.wait();
    voteStatus();
  }
  async function initVoting(candidateNames, votingTime) {
    if(voteStatus==false){
      const signer = await getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contractInstance.initVoting(candidateNames, votingTime);
      await tx.wait();
    }
    else{
      alert("Voting already initiated")
    }
   
  }
  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      await getCandidates();
      await getCurrentStatus();

      if (votingStatus) {
        await getRemainingTime();
      }
    }

    fetchData();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);
  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account != accounts[0]) {
      setAccount(accounts[0]);
      voteStatus();
    } else {
      setAccount(null);
      setIsConnected(false);
    }
  }

  return (
    <>
      {votingStatus ? (
        isConnected ? (
          <Connected
            address={account}
            candidates={candidates}
            remainingTime={remainingTime}
            number={number}
            handleNumberChange={handleNumberChange}
            showButton={canVote}
            voteFunction={vote}
          />
        ) : (
          <Login connectWallet={connectToMetamask} />
        )
      ) : (
        <Finished init={initVoting} />
      )}
    </>
  );
}

export default App;
