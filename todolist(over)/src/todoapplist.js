import React,{Component} from 'react'

class ToDoAppList extends Component{
    constructor() {
        super()
        this.remove = this.remove.bind(this)
    }
    remove (elem){
        var index = elem.target.getAttribute('data-key')
        this.props.remove(index);
    }
    render(){
        const items = this.props.tasks.map((v,index)=>{
            return <li key={index}><span>{v}</span><button onClick={this.remove} data-key = {index}>X</button></li>
        })
        
        return (
            <ul>
                {items}
            </ul>
        )
    }
}
export default ToDoAppList