import {useRef} from 'react';
export default function (props) {
    let inputRef = useRef();
    if(!props.deductedAmt) {
        return (
            <form className="amount-form">
            <input style={{"background":"white", "color":"black"}} ref={inputRef} type="number" required placeholder="Set amount of fare"/>
            <button onClick={e => {
                e.preventDefault();
                let amt = inputRef.current.value;
                props.setDeductedAmt(amt)
                }} className="btn" type="submit">Set</button>
            </form>
        );
    } else {
        return (
            <form className="amount-form">
            <input style={{"background":"#4BB543", "color":"white"}} ref={inputRef} type="number" required placeholder="Set amount of fare"/>
            <button onClick={e => {
                e.preventDefault();
                let amt = inputRef.current.value;
                props.setDeductedAmt(amt)
                }} className="btn" type="submit">Set</button>
        </form>
        );
    }
}