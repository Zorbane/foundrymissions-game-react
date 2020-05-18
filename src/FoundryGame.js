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
        console.log("Preview Finshed");
        this.setState({ missionState: "intro" });
    }

    finishIntro() {
        console.log("Intro finished");
        this.setState({ missionState: "playing" });
    }

    componentDidMount() {
        document.title = this.props.missionData.Project.PublicName
    }

    render() {
        let renderOutput;

        if (this.state.missionState === "preview") {
            renderOutput = <Prompt key="preview" type="single" buttontext="Continue" title={this.props.missionData.Project.PublicName} text={this.props.missionData.Project.Description} promptComplete={this.finishPreview}/>
        }
        else if (this.state.missionState === "intro") {
            renderOutput = <Prompt key="intro" type="single" buttontext="Accept Mission" title={this.props.missionData.Mission.GrantBlock.PromptTitle} text={this.props.missionData.Mission.GrantBlock.PromptBody} promptComplete={this.finishIntro} />
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
