export default function (props) {
    if(props.error) {
        return (
            <div className="scan-error">
                {props.error}
            </div>
        );
    }
}