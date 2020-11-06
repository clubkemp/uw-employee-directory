import './style.css'

// row takes in props from Table
function Row(props) {
    const e = props.employee
    return (
    // go through and set each item you want out of the props
    <tr>
        {<td><img src={e.picture.thumbnail} /></td>}
        <td>{`${e.name.first}  ${e.name.last}`}</td>
        <td>{e.dob.age}</td>
        <td>{e.cell}</td>
        <td>{e.email}</td>
    </tr>
    )
}

export default Row;
