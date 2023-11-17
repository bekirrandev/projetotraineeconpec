<<<<<<< HEAD
import React, { useState } from 'react';
import '../css/NewTdTableSp.css';

function NewTdTableSP({ num, sp }:{num: number, sp: string}):JSX.Element {

    const [spSheet, setSpSheet] = useState(sp);

    return (
        <tr>
            <td className="table-sp-td" id="sp-value"><input type="number" id={num.toString()} placeholder="Digite aqui..." value={spSheet} onChange={(event):void => setSpSheet(event?.target.value)} /></td>
=======
import React from 'react';
import '../css/NewTdTableSp.css';

function NewTdTableSP({ num }:{num: number}):JSX.Element {
    return (
        <tr>
            <td className="table-sp-td"><input type="number" id={num.toString()} placeholder="Digite aqui..." /></td>
>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2
        </tr>
    )
}

export default NewTdTableSP;

