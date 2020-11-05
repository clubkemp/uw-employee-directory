import React from 'react'
import Row from '../Row'

class Table extends React.Component{
    state = {
        thing:"Testing"
    }

    render(){
        return (
        <div className="app">
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
                <tbody>
                    <Row />
                </tbody>
            </table>
        </div>
        )
    }
}

export default Table