import React from 'react'
import Row from '../Row'
import axios from 'axios'
import './style.css'

class Table extends React.Component{
    state = {
        employees:[],
        sticky: false,
        nameSort: "arrow down",
        search:"",
        filterEmployees:[],
    }
    componentDidMount= () =>{
        axios.get("https://randomuser.me/api/?results=200&nat=us")
        .then(res => {
            this.setState({employees:res.data.results})
        })
    }

    buildRow =() =>{
        let sortedArray
        if(this.state.filterEmployees.length > 0){
            if(this.state.nameSort === "arrow down"){
                sortedArray = this.state.filterEmployees.sort((a, b) => (a.name.last >= b.name.last) ? 1 : -1)
            }else if(this.state.nameSort === "arrow up"){
                sortedArray = this.state.filterEmployees.sort((a, b) => (a.name.last <= b.name.last) ? 1 : -1)
            }
        }else{
            if(this.state.nameSort === "arrow down"){
                sortedArray = this.state.employees.sort((a, b) => (a.name.last >= b.name.last) ? 1 : -1)
            }else if(this.state.nameSort === "arrow up"){
                sortedArray = this.state.employees.sort((a, b) => (a.name.last <= b.name.last) ? 1 : -1)
            }
        }
        
        console.log(sortedArray)
        return sortedArray.map(e => <Row key={e.id.value} employee={e} />)
    }
    handleNameSort =() =>{
        this.state.nameSort ==="arrow down"? this.setState({nameSort:"arrow up"}) : this.setState({nameSort:"arrow down"})
    }
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };
    
    handleInputSubmit = (event) =>{
        event.preventDefault()
        const type = event.target.id
        if(type==="search"){
            const result = this.state.employees.filter(e=> e.name.first===this.state.search || e.name.last===this.state.search)
            this.setState({filterEmployees:result})
            this.setState({search:""})
        }else{
            this.setState({filterEmployees:[]})
            this.setState({search:""})
        }
        
        
    }
    render(){
        return (
        <div className="table pure">
            <div className="pure-g head">
                <div className="pure-u-1">
                    <h1 id='title'>Employee Directory</h1>
                    <form className="pure-form">
                        <fieldset>
                            <input name="search" className="pure-input-1-4" type="text" value={this.state.search} onChange={this.handleInputChange} onSubmit={this.handleInputSubmit}/>
                            <button id="search"onClick={this.handleInputSubmit} className="pure-button">Search</button>
                            <button id="all" onClick={this.handleInputSubmit} className="pure-button">All Employees</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div className="pure-g">
                <div className="pure-u-1">
                    <table id='employees'>
                        <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>name<span><i className={this.state.nameSort} onClick={this.handleNameSort}/></span></th>
                            <th>age</th>
                            <th>cell</th>
                            <th>email</th>
                        </tr>
                        {this.buildRow()}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
        )
    }
}

export default Table