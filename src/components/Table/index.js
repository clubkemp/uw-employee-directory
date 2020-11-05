import React from 'react'
import Row from '../Row'
import axios from 'axios'
import './style.css'

class Table extends React.Component{
    state = {
        employees:[],
        sticky: false
    }
    componentDidMount= () =>{
        axios.get("https://randomuser.me/api/?results=200&nat=us")
        .then(res => {
            this.setState({employees:res.data.results})
        })
        
        window.addEventListener('scroll', this.handleScroll);
    }

    buildRow =() =>{
        return this.state.employees.map(e => <Row key={e.id.value} employee={e} />)
    }
    handleScroll = () =>{
        // let headerPos = document.querySelector(".header").getBoundingClientRect()
        // if(headerPos.y <= 0){
        //     this.setState({sticky:true})
        // }else if(headerPos.y > 0){
        //     this.setState({sticky:false})
        // }
        // // if(headerPos){
        // //     if(headerPos <=0){
        // //         console.log(headerPos)
        // //     }
        // //     (headerPos <= 0) ? this.setState({sticky:true}) : this.setState({sticky:false}) 
        // // }
    }
    render(){
        return (
        <div className="app">
            <h1 id='title'>React Dynamic Table</h1>
            <table id='employees'>
                <tbody>
                <tr className={this.state.sticky ? "header sticky" : "header"}>
                    <th>Picture</th>
                    <th>name</th>
                    <th>age</th>
                    <th>cell</th>
                    <th>email</th>
                </tr>
                {this.buildRow()}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Table