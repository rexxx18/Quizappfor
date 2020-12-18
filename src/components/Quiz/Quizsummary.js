

import React, { Component } from 'react'

export default class Quizsummary extends Component {
    constructor(props){
        super(props);
        this.state={
            score:0
        }
    }

    componentDidMount(){
        const {state}=this.props.location
        this.setState({
            score:state
        })
        console.log(this.props)
    }

    render() {
        return (
            <h1>
               The score is :{this.state.score} 
            </h1>
        )
    }
}
