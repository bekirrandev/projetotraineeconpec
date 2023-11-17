import React from 'react';
import { useHistory } from 'react-router-dom';

function TableRow({projName, status, type, time, doc, numDoc}:{ projName: string, status: string, type: string, time: string, doc: any, numDoc: number}):JSX.Element {

    const history = useHistory();

    function chooseSheet():void {
        history.push({
            pathname: '/sheets',
            state: { doc, numDoc} 
        });
    }

    return (
        <tr>
            <td className="project_name"><button type="button" onClick={chooseSheet} >{projName}</button></td>
            <td className="project_status">{status}</td> 
            <td>{type}</td>
            <td>{time}</td>
        </tr>
    )
}

export default TableRow;

