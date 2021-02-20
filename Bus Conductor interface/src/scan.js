import QrReader from 'react-qr-scanner';
import React from 'react';

export default class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deductedAmt : 0,
            scanResult : undefined,
            previousScannedId : null,
        }
        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

    checkBalance(balance) {
        let deductedAmt = this.state.deductedAmt;
        return balance >= deductedAmt;
    }

    handleScan(result) {
        //handle scan
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
                 <path d="M76.5 4H40C20.1178 4 4 20.1178 4 40V76.5M4.00001 182L4 218.5C4 238.382 20.1178 254.5 40 254.5L76.5 254.5" stroke="orange" strokeWidth="6"/>
            </svg>
            <svg width="77" height="259" viewBox="0 0 77 259" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 254.5H36.5C56.3822 254.5 72.5 238.382 72.5 218.5L72.5 182M72.5 76.5V40C72.5 20.1178 56.3822 4 36.5 4L0 4" stroke="orange" strokeWidth="6"/>
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
          </>
        );
    }
}