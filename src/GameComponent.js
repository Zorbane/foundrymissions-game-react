import React from 'react';

function GameComponent(props) {

    return (
        <div className="game-component">
            <button>{props.text}</button>
        </div>
    );
}

export default App;
