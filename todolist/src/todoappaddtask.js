import React, { Component } from 'react'

class ToDoAppAddTask extends Component {
    constructor() {
        super()
        this.SubmitFun = this.SubmitFun.bind(this)
    }
    SubmitFun (event){
        event.preventDefault()
        var input = event.target.querySelector('input')
        var value = input.value;
        input.value = ''
        this.props.updateList(value)
    }

    render() {
        return (
            <form onSubmit = {this.SubmitFun}>
                <input type="text" />
            </form>
        )
    }
}
export default ToDoAppAddTask