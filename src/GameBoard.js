import React, { Component } from 'react'

import ObjectiveList from './ObjectiveList'
import Prompt from './Prompt'
import Map from './Map'

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentObjective: 0,
            currentMap: null,
            mapComponents : []
        };

        this.changeMap = this.changeMap.bind(this);
    }


    changeMap(nextMap) {

    }

    componentDidMount() {

    }

    render() {
        let renderOutput;

        if (!this.state.currentMap) {
            let firstMapLink = this.props.missionData.Mission.MapLinks[0];
            renderOutput = <Prompt title={firstMapLink.DialogBlock.promptTitle} text={firstMapLink.DialogBlock.PromptBody} handleClick={() => this.changeMap("390913003")} />
        }
        else {
            renderOutput = <Map map={this.state.currentMap} components={this.state.mapComponents}/>
        }

        return (
            <div className="gameboard">
                <ObjectiveList objectives={this.props.missionData.Mission.Objectives} />
                {renderOutput}
            </div>
        );
    }
}


export default GameBoard;
