import React, { Component } from 'react';
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData() 
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    //console.log(accounts[0])
    this.setState( { account: accounts[0] })
    
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })
    //console.log(this.state.ethBalance)

    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      console.log ("tokenBalance", tokenBalance )
      this.setState({tokenBalance: tokenBalance})
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
      
    } else {
    window.alert('EthSwap contract not deployed to detected network')  
    }

    this.setState({ loading: false })

    //console.log(this.state.ethSwap)
    
    // abi - how the smart contract works, address, where it is on the block
  }

async loadWeb3() {

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  await window.ethereum.enable()
  }
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
  }
else {
  window.alert('Non-Ethereum browser detected. You should consider trying Metamask')
  }
}



// Metamask no longer supports window.web3


  //if (window.ethereum) {
  //window.web3 = new Web3(window.ethereum)
  //await window.ethereum.enable()
  //}
//else if (window.web3) {
  //window.web3 = new Web3(window.web3.currentProvider)
  //}
//else {
  //window.alert('Non-Ethereum browser detected. You should consider trying Metamask')
  //}




constructor(props) {
    super(props)
    this.state = {
      token: {},
      ethSwap: {},
      account: '',
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }


  render() {
    let content
    if(this.state.loading) {
      content = <p id = "loader" className="text-center"> Loading....</p>

    } else {
      content = <Main/>

    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
