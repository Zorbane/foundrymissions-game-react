import React, { Component } from 'react';
import Popup from 'reactjs-popup'


class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            currentPrompt: -1,
        }
        this.closeModal = this.closeModal.bind(this);
        this.handleDialogButtonClick = this.handleDialogButtonClick.bind(this);
    }

    closeModal() {

        this.setState({ open: false });
    }

    handleDialogButtonClick(action) {
        if (action.NextPromptID) {
            this.setState({ currentPrompt: action.NextPromptID });
        }
        else {
            this.closeModal();
        }
    }

    render() {

        let renderOutput;

        //type is single or dialogprompt
        if (this.props.type === "single") {
            renderOutput =
                <div>
                    {this.props.title && <h2>{this.props.title}</h2>}
                    {this.props.text && <div className="prompt-text">{this.props.text}</div>}
                    <button onClick={this.closeModal}>{this.props.buttontext}</button>
                </div>
        }
        else if (this.props.type === "dialogprompt") {
            if (this.state.currentPrompt === -1) {//this is the first one
                renderOutput =

                    <div>
                        <h2>{this.props.dialogComponent.PromptTitle}</h2>
                        <div className="prompt-text">{this.props.dialogComponent.PromptBody}</div>
                        <ul>
                    {
                            this.props.dialogComponent.Action.map((action) => {
                                return (<li key={action.ActionName}><button onClick={() => this.handleDialogButtonClick(action)}>{action.ActionName}</button></li>)
                        })
                    }
                        </ul>
                    
                    </div>
            }
            else {
                //find the prompt
                const prompt = this.props.dialogComponent.DialogPrompts.find(d => d.Number == this.state.currentPrompt);
                if (prompt) {

                    renderOutput = 
                        <div>
                        <h2>{prompt.PromptTitle}</h2>
                        <div className="prompt-text">{prompt.PromptBody}</div>
                            <ul>
                                {
                                prompt.Action.map((action) => {
                                    return (<li key={action.ActionName}><button onClick={() => this.handleDialogButtonClick(action)}>{action.ActionName}</button></li>)
                                    })
                                }
                            </ul>

                        </div>
                }
                else {
                    renderOutput = <div>Error prompt {this.state.currentPrompt} not found</div>
                }
            }
        }
        else {
            renderOutput = <div>Unhandled prompt type {this.props.type}</div>
        }
        

        return (
            <Popup
                open={this.state.open}
                closeOnDocumentClick={false}
                onClose={this.props.promptComplete}
            >
                {renderOutput}
            </Popup>
        );
    }
}

Prompt.defaultProps = {
    type: "dialogprompt",
    buttontext : "Continue"
}

export default Prompt;
