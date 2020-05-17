import React, { Component } from 'react'

import ObjectiveList from './ObjectiveList'

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="gameboard">
                <ObjectiveList objectives={this.props.missionData.Mission.Objectives}/>
            </div>
        );
    }
}


export default GameBoard;
