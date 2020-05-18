import React from 'react';

function GameComponent(props) {

    return (
        <div className="game-component">
            <button onClick={this.props.componentClicked}>{props.text}</button>
        </div>
    );
}

export default App;
