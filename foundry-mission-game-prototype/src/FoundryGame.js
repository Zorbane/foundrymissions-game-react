import React, { Component } from 'react'

import GameBoard from './GameBoard';
import Prompt from './Prompt';

import Loading from './Loading';


class FoundryGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            missionState: "preview", //state are preview/intro/playing
            currentMap : null,
        };


        this.finishPreview = this.finishPreview.bind(this)
        this.finishIntro = this.finishIntro.bind(this)
    }

    finishPreview() {
        this.setState({ missionState: "intro" });
    }

    finishIntro() {
        this.setState({ missionState: "playing" });
    }

    componentDidMount() {
        document.title = this.props.missionData.Project.PublicName
    }

    render() {
        let renderOutput;

        if (this.state.missionState === "preview") {
            renderOutput = <Prompt title={this.props.missionData.Project.PublicName} text={this.props.missionData.Project.Description} handleClick={this.finishPreview}/>
        }
        else if (this.state.missionState === "intro") {
            renderOutput = <Prompt title={this.props.missionData.Mission.GrantBlock.PromptTitle} text={this.props.missionData.Mission.GrantBlock.PromptBody} handleClick={this.finishIntro} />
        }
        else if (this.state.missionState === "playing") {
            renderOutput = <GameBoard missionData={this.props.missionData}/>
        }
        else {
            renderOutput = <div>Error, unhandled state {this.state.missionState}.</div>
        }
        

        return (
            <div>
                {renderOutput}
            </div>
        );
    }
}                            


export default FoundryGame;
