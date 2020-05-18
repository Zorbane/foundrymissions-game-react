import React, { Component } from 'react'

class ObjectiveList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {
        return (
            <div className="objectives-list">
                <h2>Objectives:</h2>
                <ul>
                    {
                        this.props.objectives.map((objective) => {
                            return (
                                <li key={objective.Number}>{objective.UIString}</li>
                            );
                        })
                    }
                        
                </ul>
            </div>
        );
    }
}


export default ObjectiveList;
