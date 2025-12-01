
export default function Die(props) {
    return(
        <button onClick={props.onClick} style={props.style}>{props.value}</button>
    );
};