import React from 'react';



function Prompt(props) {

    return (
        <div className="prompt">
            {props.title && <h2>{props.title}</h2>}
            {props.image && <img src={props.image}/>}
            {props.text && <div className="prompt-text">{props.text}</div>}
            <button onClick={props.handleClick}>Continue</button>
        </div>
    );
}

export default Prompt;
