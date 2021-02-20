import okayWhite from './icons/okayWhite.svg';
import notOkayWhite from './icons/notOkayWhite.svg';
import search from './icons/search.svg';
import searchVector from './icons/searchVector.svg';
import ScanError from './scanerror.js';

export default function (props) {
    if(props.scanResult === undefined) {
        return (
            <div className="scan-instruction">
                <div className="search-icon">
                    <img src={searchVector} />
                    <img src={search} />
                </div>
                <p>Place the customer's QR code in front to scan.</p>
            </div>
        );
    }

    if(props.scanResult.error) {
        return (<>
            <ScanError error={props.scanResult.error}/>
            <div className="scan-result false-scan-result">
                <p>{props.scanResult.username}</p>
                <div className="okay-icon">
                    <img className="okay" src={notOkayWhite} />
                </div>            
            </div>
            </>
        );
    }

    return (
        <div className="scan-result success-scan-result">
            <p>{props.scanResult.username}</p>
            <div className="okay-icon">
                <img className="okay" src={okayWhite} />
            </div>
        </div>
    );
}