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
            mapComponents: [],
            mapObjectives: [],
            nextMap: null,
            nextMapComponent: null,
        };

        this.changeMap = this.changeMap.bind(this);
    }


    changeMap(nextMapId) {

        
        const nextMap = this.props.missionData.Maps.find(map => map.MapId === nextMapId);
        
        const nextMapComponents = this.props.missionData.Components.filter(component => component.Placement.MapName === nextMap.MapId)

        const nextMapObjectives = this.props.missionData.Mission.Objectives.filter(objective => objective.ComponentMapName === nextMap.MapId);
        console.log(nextMapObjectives);


        let nextMapComponent;
        let nextNextMapId;
        //finding the nextNextMapId is a bit more complicated. Go through all the maplinks and see if the door component for that map link exists in the map components.  If it does we've found the next map.
        for (let mapLink of this.props.missionData.Mission.MapLinks) {
            let componentLink = nextMapComponents.find(component => component.Number == mapLink.DoorComponent);
            if (componentLink) {
                nextMapComponent = mapLink.DoorComponent;
                nextNextMapId = mapLink.SpawnInternalMapName;
                break;
            }
        }

        console.log("nextMapComponent", nextMapComponent);
        console.log("nextNextMapId", nextNextMapId);

        this.setState({ currentMap: nextMap, mapComponents: nextMapComponents, mapObjectives : nextMapObjectives, nextMap: nextNextMapId, nextMapComponent: nextMapComponent})        
    }

    componentDidMount() {

    }

    render() {
        let renderOutput;

        if (!this.state.currentMap) {
            let firstMapLink = this.props.missionData.Mission.MapLinks[0];
            renderOutput = <Prompt type="single" buttontext="Begin Mission" title={firstMapLink.DialogBlock.promptTitle} text={firstMapLink.DialogBlock.PromptBody} promptComplete={() => this.changeMap(firstMapLink.SpawnInternalMapName)} />
        }
        else {
            renderOutput = <Map key={this.state.currentMap.MapId} map={this.state.currentMap} components={this.state.mapComponents} objectives={this.state.mapObjectives} />
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
