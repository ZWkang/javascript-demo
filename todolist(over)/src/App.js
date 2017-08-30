import React, { Component } from 'react';
import './App.css';
import ToDoAppList from './todoapplist.js'
import ToDoAppAddTask from './todoappaddtask.js'

class ToDoApp extends Component {
  constructor (props){
    super()
    this.state = {tasks:props.tasks}
    this.updateList = this.updateList.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.updateLocalStorage = this.updateLocalStorage.bind(this)
  }
  componentWillMount(){
    console.log(this.props)
  }
  updateList(text){
    var updateTasks = this.state.tasks;
    updateTasks.push(text);
    this.setState({
      tasks:updateTasks
    })
    this.updateLocalStorage(updateTasks)
  }
  removeTask(index){
    var updateTasks = this.state.tasks;
    updateTasks.splice(index,1);
    this.setState({
      tasks:updateTasks
    })
    this.updateLocalStorage(updateTasks)
  }
  updateLocalStorage(updateTasks){
    localStorage.setItem('todoTask',JSON.stringify(updateTasks))
  }


  render() {
    return (
      <div>
        <h1>ToDo App</h1>
        <ToDoAppAddTask updateList = {this.updateList} />
        <ToDoAppList tasks = {this.state.tasks} remove={this.removeTask}/>
      </div>
    );
  }
}

export default ToDoApp;
