import React, { Component } from 'react'

class ObjectiveList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            objectives: [],
        };
    }

    componentDidMount() {
        console.log(this.props.objectives);
        this.setState({ objectives: this.props.objectives })
    }

    render() {
        
        return (
            <div className="objectives-list">
                <h2>Objectives:</h2>
                <ul>
                    {
                        this.state.objectives.map((objective) => {
                            return (
                                <li>{objective.UIString}</li>
                            );
                        })
                    }
                        
                </ul>
            </div>
        );
    }
}


export default ObjectiveList;
