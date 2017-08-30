import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './App';
import registerServiceWorker from './registerServiceWorker';

// var taskList = ["Task 1","Task 2"]
var taskList
var task = localStorage.getItem('todoTask')
if(task){
    taskList = JSON.parse(task)
}else{
    taskList = localStorage.setItem('todoTask',JSON.stringify([]))
}


ReactDOM.render(
    <ToDoApp tasks = {taskList}/>, 
    document.getElementById('root')
);
registerServiceWorker();
