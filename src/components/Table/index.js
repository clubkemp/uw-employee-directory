import React from 'react'
import Row from '../Row'
import axios from 'axios'

class Table extends React.Component{
    state = {
        employees:[]
    }
    componentDidMount= () =>{
        axios.get("https://randomuser.me/api/?results=200&nat=us")
        .then(res => {
            this.setState({employees:res.data.results})
        })
    }

    buildRow =() =>{
        return this.state.employees.map(e => <Row employee={e} />)
    }

    render(){
        return (
        <div className="app">
            
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
                <tbody>
                <tr>
                    <th>Picture</th>
                    <th>name</th>
                    <th>job</th>
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