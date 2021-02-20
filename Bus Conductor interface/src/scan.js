import QrReader from 'react-qr-scanner';
import React from 'react';
import SetDeductedAmt from './setDeductedAmt.js';
import ScanResult from './scanresult.js';
import axios from 'axios';

export default class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deductedAmt : 0,
            scanResult : undefined,
            previousScannedId : null,
        }
        this.setDeductedAmt = this.setDeductedAmt.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

    setDeductedAmt (amt) {
        this.setState({
            deductedAmt : amt,
        });
    }

    checkBalance(balance) {
        let deductedAmt = this.state.deductedAmt;
        return balance >= deductedAmt;
    }

    handleScan(result) {
        if(result) {
            let {username, balance, id} = JSON.parse(result.text);
            if(!this.state.deductedAmt) return this.setState({
                deductedAmt : 0,
                scanResult : {
                    error : 'Enter a fare amount to deduct.'
                }
            });
            if(id === this.state.previousScannedId) return; //preventing multiple scans of the same code
            this.setState({previousScannedId : id});
            if(!this.checkBalance(balance)) return this.setState({  //check if the balance is sufficient
                deductedAmt : 0,
                scanResult : {
                    error : 'Not enough Balance',
                    username,
                }
            });
            document.body.style.background = '#823f82';
            axios.post('https://buspay.herokuapp.com/conductor/deduct', {
                id,
                deductedAmt : this.state.deductedAmt,
            }).then(res => {
                document.body.style.background = "";
                this.setState({
                    deductedAmt : 0,
                    scanResult : {
                        username,
                        error : '',
                    }
                });
            });
        }
    }

    handleError(err) {
        //handle error
    }

    render() {
        let constraints = {
            video : {
                facingMode : 'environment',
            },
            audio : false,
        }

        return (
            <>
            <div className="scan-container">
            <div className="scan-target">
            <svg width="77" height="259" viewBox="0 0 77 259" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path ref={this.scanTargetRef1} d="M76.5 4H40C20.1178 4 4 20.1178 4 40V76.5M4.00001 182L4 218.5C4 238.382 20.1178 254.5 40 254.5L76.5 254.5" stroke="orange" strokeWidth="6"/>
            </svg>
            <svg width="77" height="259" viewBox="0 0 77 259" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path ref={this.scanTargetRef2} d="M0 254.5H36.5C56.3822 254.5 72.5 238.382 72.5 218.5L72.5 182M72.5 76.5V40C72.5 20.1178 56.3822 4 36.5 4L0 4" stroke="orange" strokeWidth="6"/>
            </svg>
            </div>
          <QrReader
          delay={1000}
          style={{ width:'100%', height:'100%', 'objectFit':'cover', 'borderRadius':'5px'}}
          constraints={constraints}
          onError={this.handleError}
          onScan={this.handleScan}
          />
          </div>
          <ScanResult scanResult={this.state.scanResult} />
          <SetDeductedAmt deductedAmt={this.state.deductedAmt} setDeductedAmt={this.setDeductedAmt}/>
          </>
        );
    }
}