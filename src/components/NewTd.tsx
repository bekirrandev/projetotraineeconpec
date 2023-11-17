<<<<<<< HEAD
import React, { useState } from 'react';
import '../css/NewTd.css';

function NewTd({ index, how, iwant, forI }:{index: number, how:string, iwant: string, forI: string}):JSX.Element {

    const [howSheet, setHowSheet] = useState(how);
    const [iwantSheet, setIWantSheet] = useState(iwant);
    const [forSheet, setForSheet] = useState(forI);

    return (
        <tr>
            <td className="table-td"><input type="text" id={(-3*index - 1).toString()} placeholder="Digite aqui..." value={howSheet} onChange={(event):void => setHowSheet(event?.target.value)} /></td>
            <td className="table-td"><input type="text"  id={(-3*index - 2).toString()} placeholder="Digite aqui..." value={iwantSheet} onChange={(event):void => setIWantSheet(event?.target.value)} /></td>
            <td className="table-td"><input type="text" id={(-3*index - 3).toString()} placeholder="Digite aqui..." value={forSheet} onChange={(event):void => setForSheet(event?.target.value)} /></td>
=======
import React from 'react';
import '../css/NewTd.css';

function NewTd():JSX.Element {
    return (
        <tr>
            <td className="table-td"><input type="text" placeholder="Digite aqui..." /></td>
            <td className="table-td"><input type="text" placeholder="Digite aqui..." /></td>
            <td className="table-td"><input type="text" placeholder="Digite aqui..." /></td>
>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2
        </tr>
    )
}

export default NewTd;

