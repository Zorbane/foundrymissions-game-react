import React, { Component } from 'react'

class GameBoard extends Component {
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
            <div className="gameboard">

            </div>
        );
    }
}


export default GameBoard;
