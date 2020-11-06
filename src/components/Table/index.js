import React from 'react'
import Row from '../Row'
import axios from 'axios'
import './style.css'

// create the class of table, the main component of the App
class Table extends React.Component{
    // sets state
    state = {
        // used to store employee return from axios
        employees:[],
        // used to check name sorting
        nameSort: "arrow down",
        // used for the text input search
        search:"",
        // used for the results of a name search
        filterEmployees:[],
    }
    // Do some work on a successful mount of the component
    componentDidMount= () =>{
        // get our data from the employee api
        axios.get("https://randomuser.me/api/?results=200&nat=us")
        .then(res => {
            // set the state
            this.setState({employees:res.data.results})
        })
    }
    // used to return a row of data
    buildRow =() =>{
        // declare the sortedArray we will use to actually send to the page
        let sortedArray
        // if the filtered array state isn't empty, a search must be in play so use that filtered array
        if(this.state.filterEmployees.length > 0){
            // check to see if the state of the name sorter is up or down (asc or desc)
            if(this.state.nameSort === "arrow down"){
                // sort based on last name
                sortedArray = this.state.filterEmployees.sort((a, b) => (a.name.last >= b.name.last) ? 1 : -1)
            }else if(this.state.nameSort === "arrow up"){
                // sort based on last name
                sortedArray = this.state.filterEmployees.sort((a, b) => (a.name.last <= b.name.last) ? 1 : -1)
            }
        //if there wasn't a filterEmployee array, then we must be dealing with the full array, so do the sorting check for that 
        }else{
            if(this.state.nameSort === "arrow down"){
                sortedArray = this.state.employees.sort((a, b) => (a.name.last >= b.name.last) ? 1 : -1)
            }else if(this.state.nameSort === "arrow up"){
                sortedArray = this.state.employees.sort((a, b) => (a.name.last <= b.name.last) ? 1 : -1)
            }
        }
        
        // with all that conditional work out of the way, we can map over our sorted array(either filtered or not)
        // and render Row components for each
        // pass in the whole employee as a prop
        return sortedArray.map(e => <Row key={e.id.value} employee={e} />)
    }
    // Changes the state based on what it is when the user clicks the button
    handleNameSort =() =>{
        this.state.nameSort ==="arrow down"? this.setState({nameSort:"arrow up"}) : this.setState({nameSort:"arrow down"})
    }
    // handles the updating loop for the input changes
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };
    // handles the form submit
    handleInputSubmit = (event) =>{
        // prevent page refresh on form submission
        event.preventDefault()
        // grab the type coming in from the button
        const type = event.target.id
        // if the id was the search button
        if(type==="search"){
            // set the result equal to a filter based on the state of the input field
            const result = this.state.employees.filter(e=> e.name.first===this.state.search || e.name.last===this.state.search)
            // set it ot the filtered state
            this.setState({filterEmployees:result})
            // clear the search for a new cycle
            this.setState({search:""})
        }
        // else, the button must be the all employee button
        else{
            // so clear the filterEmployee state
            this.setState({filterEmployees:[]})
            // clear the search for a new cycle
            this.setState({search:""})
        }
        
        
    }
    // render the jsx
    render(){
        return (
        <div className="table pure">
            {/* top section */}
            <div className="pure-g head">
                <div className="pure-u-1">
                    <h1 id='title'>Employee Directory</h1>
                    {/* input and buttons */}
                    <form className="pure-form">
                        <fieldset>
                            <input name="search" className="pure-input-1-4" type="text" value={this.state.search} onChange={this.handleInputChange} onSubmit={this.handleInputSubmit}/>
                            <button id="search"onClick={this.handleInputSubmit} className="pure-button">Search</button>
                            <button id="all" onClick={this.handleInputSubmit} className="pure-button">All Employees</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            {/* table section */}
            <div className="pure-g">
                <div className="pure-u-1">
                    {/* table */}
                    <table id='employees'>
                        <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>name<span><i className={this.state.nameSort} onClick={this.handleNameSort}/></span></th>
                            <th>age</th>
                            <th>cell</th>
                            <th>email</th>
                        </tr>
                        {/* rows being built by buildRow() */}
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