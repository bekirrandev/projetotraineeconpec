import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import firebase from 'firebase';
import {FaPlus, FaBell} from 'react-icons/fa';
import { GiExitDoor } from "react-icons/gi";
import { useHistory } from 'react-router-dom';
import TableRow from '../components/TableRow';
import { firestore, auth } from '../config/firebase';
import Loading from '../components/Loading';
import VerifyAction from '../components/VerifyAction';

function Home():JSX.Element{

    const [popup, setPopup] = useState(false);
    const [nameCli, setNameCli] = useState('');
    const [nameShe, setNameShe] = useState('');
    const [timeShe, setTimeShe] = useState('');
    const [statusShe, setStatusShe] = useState('');
    const [stageShe, setStageShe] = useState('');
    const [vetDoc, setVetDoc] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchSheet():Promise<any> { 
            const listEmpty:any[] = [];
            await firestore.collection('sheets').get().then((querySnapshot: { docs: any[]; }) => {
                querySnapshot.docs.forEach((doc: { data: () => any; }) => {
                    listEmpty.push(doc.data());
                })
                setVetDoc(listEmpty);
            })
        }
        fetchSheet();
    }, []);

    function logOut():void {
        history.push('/');
        firebase.auth().signOut();
    }

    async function createSheet():Promise<any> {
        const res = await firestore.collection('sheets').add({
            clientName: nameCli,
            nameSheet: nameShe,
            expirationDate: timeShe,
            status: statusShe,
            type: stageShe,
            information: { rendDiary: '0', timeEachSp: '1', timeWorkWeek: '7', totalHours: '0', totalPrice: '0', totalSp: '0', totalWeek: '0', valueSp: '150' },
            storyPoints: [{for: '', how: '', iwant: '', sp: ''}]
        });
        setPopup(false);
        document.location.reload(true);
    }

    if (vetDoc) {
        return(
            <body>
            <header>
                <h1 className="title">Cone <span>PC</span></h1>                
        
                <nav className="filter_nav">
                    <button type="button" className="header-btn" onClick={():void => setPopup(true)}><FaPlus className = "fas"/><span>Nova Precificação</span></button>
                    <button type="button" className="header-btn" onClick={logOut}><GiExitDoor className = "fas"/><span>Sair</span></button>
                </nav>

            </header>

            <main>
            <VerifyAction trigger={popup}>
                <div className="div-confirmed-action">
                <div className="div-text-confirmed-action-home">
                    <div className='div_input2'>Projeto: <input type="text" onChange={(event):void => setNameShe(event.target.value)}/></div>
                    <div className='div_input4'>Cliente: <input type="text" onChange={(event):void => setNameCli(event.target.value)} /></div>
                    <div className='div_input2'>Prazo: <input type="text" onChange={(event):void => setTimeShe(event.target.value)} /></div>
                    <div className='div_input3'>Status: <input type="text" onChange={(event):void => setStatusShe(event.target.value)} /></div>
                    <div className='div_input5'>Fase: <input type="text" onChange={(event):void => setStageShe(event.target.value)} /></div>
                </div>
                <div className="div-btns-confirmed-action">
                        <button type="button" className="btn-cancel" onClick={():void => setPopup(false)}>Cancelar</button>
                        <button type="button" className="btn-confirm" onClick={createSheet} >Confirmar</button>
                    </div>
                </div>
            </VerifyAction>
            <section className="main-container">
                <div className="table_container">
                    <table>
                        <tr className="table_header">
                            <th>Projeto</th>
                            <th>Status</th>
                            <th>Tipo</th>
                            <th>Prazo</th>
                        </tr>
                        { vetDoc.map((sheet, index) => <TableRow projName={sheet.nameSheet} status={sheet.status} type={sheet.type} time={sheet.expirationDate} doc={sheet} numDoc={index} />,) }
                    </table>
                </div>
            </section>
            </main>
        </body>
    )}

    return (<Loading />);
};

export default Home;