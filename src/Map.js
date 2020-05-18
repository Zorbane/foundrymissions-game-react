import React, { Component } from 'react'
import Prompt from './Prompt';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentObjective : 0,
            components : []
        };
    }

    componentDidMount() {
        const originalComponents = this.props.components;
        console.log(this.props);

        //lets go through all the components and set if its visible yet
        //also give it a "linkedComponentComplete" array which contains the components that interact with it
        for (let component of originalComponents) {
            //default visible to false, and then if there is a reason, make it visible
            component.visible = false;
            component.linkedComponentComplete = [];
            //a component is visible if it's WHEN trigger(s) are reached AND there is an interact reason (Component Complete or Objective)
            //types to show are CONTACT DIALOG_TREE OBJECT KILL
            //first check for visible dialogs at start (that's easy)
            if (component.Type === "DIALOG_TREE" && component.When.length === 1 && component.When[0].TriggerType === "MAP_START")
            {
                component.visible = true;
            }
            else if (component.Type === "CONTACT"  || component.Type === "OBJECT" || component.Type === "KILL") {
                component.visible = this.isComponentVisible(component, originalComponents, 0);
            }
            
        }

        this.setState({ components: originalComponents });
    }


    componentComplete(component) {
        const components = this.state.components;
        const currentComponent = components.find(c => c.Number === component.Number);

        //first step is to make it not visible
        currentComponent.visible = false;
        currentComponent.complete = true;

        //now check to see if completing this component satisfies the linked components
        for (let linkedComponent of components) {
            if (component.linkedComponentComplete.includes(linkedComponent.Number)) {
                //check this component and see if it is supposed to be visible now
                //default set to true and find reasons to make it not visible
                let visible = true;
                for (let when of linkedComponent.When) {
                    if (when.TriggerType === "COMPONENT_COMPLETE" || when.TriggerType === "COMPONENT_REACHED") {
                        if (when.ComponentId != component.Number) {
                            console.log(linkedComponent);
                            const otherLinkedComponent = components.find(c => c.Number === when.ComponentId)
                            if (!otherLinkedComponent.componentComplete) {
                                visible = false;
                            }
                        }
                    }

                }

                if (visible) {
                    console.log("Make " + linkedComponent.Number + " visible!");
                }

                linkedComponent.visible = visible;
            }
        }


        //also check the objectives to see if it completed any of the objectives


        this.setState({ components : components})
    }

    componentReached() {

    }

    isComponentVisible(component, components, currentObjectiveNumber) {

        //go through all the objectives. if it is needed in one of them then there is special handling.
        //1. if it is the current objective then great! make it visible
        //2. if it is not the current objective then make it not visible
        for (let objective of this.props.objectives) {
            if (objective.ComponentId == component.Number) {
                if (objective.Number === this.props.objectives[currentObjectiveNumber].Number) {
                    component.interactText = objective.UIString;
                    return true;
                }
                else {
                    return false;
                }
            }
        }


        //a

        let visible = false;


        //go through all the components see they require this component to be complete or not.  If not then it is not visible
        for (let componentToCheck of components) {
            //check all the whens
            for (let when of componentToCheck.When) {
                if (when.TriggerType === "COMPONENT_COMPLETE" && when.ComponentId === component.Number) {
                    let interactText = "Interact";
                    if (componentToCheck.InteractTriggerGroup) {
                        interactText = componentToCheck.InteractTriggerGroup.InteractText;
                    }
                    else if (component.InteractTriggerGroup.InteractText) {
                        interactText = component.InteractTriggerGroup.InteractText;
                    }
                    component.interactText = interactText;
                    
                    component.linkedComponentComplete.push(componentToCheck.Number);
                    visible =  true;
                }

            }
            //check all the hidewhens
            for (let hideWhen of componentToCheck.HideWhen) {
                if (hideWhen.TriggerType === "COMPONENT_COMPLETE" && hideWhen.ComponentId === component.Number) {
                    console.log("HIDEWHEN: " + componentToCheck.Number + " needs " + component.Number);
                    let interactText = "Interact";
                    if (componentToCheck.InteractTriggerGroup) {
                        interactText = componentToCheck.InteractTriggerGroup.InteractText;
                    }
                    else if (component.InteractTriggerGroup.InteractText) {
                        interactText = component.InteractTriggerGroup.InteractText;
                    }
                    component.interactText = interactText;
                    component.linkedComponentComplete.push(componentToCheck.Number);
                    visible = true;
                }
            }
        }

        return false;
    }

    getComponentInteractName(componentNumber) {
        return componentNumber;
    }

    render() {
        //if there is a visible dialog component we need to show it
        let renderDialog;
        let activeDialog = this.state.components.find((component) => component.Type === "DIALOG_TREE" && component.visible)
        if (activeDialog) {
            if (activeDialog.DialogPrompts.length === 0) { //if there is only one dialog we can show the basic prompt
                let buttonName = activeDialog.Action[0].ActionName;
                renderDialog = <Prompt type="single" buttontext={buttonName} title={activeDialog.PromptTitle} text={activeDialog.PromptBody} promptComplete={() => this.componentComplete(activeDialog)} />
            }
            else { //this is a complex prompt
                console.log("Complex Prompt");
                console.log(activeDialog);
                renderDialog = <Prompt type="dialogprompt" dialogComponent={activeDialog} promptComplete={() => this.componentComplete(activeDialog)} />
            }
        }


        return (
            <div className="map">                
                <ul className="component-list">
                    {this.state.components.map((component) => {
                        if (component.visible && component.Type != "DIALOG_TREE") {
                            return <li key={component.Number}><button onClick={() => this.componentComplete(component)}>{component.interactText}</button></li>
                        }
                    })}
                </ul>
                
                {renderDialog}
            </div>
        );
    }
}


export default Map;
