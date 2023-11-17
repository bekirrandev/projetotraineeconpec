import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../config/firebase';
import '../css/general_information.css';
import Self from '../assets/self4.jpg';
import VerifyAction from '../components/VerifyAction';


function GeneralInfo({ location: { state: { doc, numDoc, idDoc } } }:any):JSX.Element{

    const history = useHistory();
    const [dateEnd, setDateBeg] = useState(doc.expirationDate);
    const [popup, setPopup] = useState(false);
    const [statusSheet, setStatusSheet] = useState(doc.status);
    const [nameClient, setNameClient] = useState(doc.clientName);
    const [stage, setStage] = useState(doc.type);
    const [totalValue, setTotalValue] = useState(doc.information.totalPrice);

    async function saveInfo():Promise<void> {

        const upOne = await firestore.collection('sheets').doc(idDoc).update({expirationDate: dateEnd, status: statusSheet, clientName: nameClient, type: stage});

        setPopup(false);
    }


    function goSheet():void {
        history.push({
            pathname: '/sheets',
            state: { doc, numDoc} 
        });
    }

    return(
        <div className='general_info'>
            <div className='div_title'>
                <h1>{doc.nameSheet}</h1>
            </div>
            
            <div className='div_button'>
                <button type='button' onClick={goSheet}>Voltar</button>
            </div>
            
            <div className='div_sub_title'>
                <h3>Info. Gerais da Precificação</h3>
            </div>

            <div className='div_information_block'>
                <div className='div_informations'>
                    <div className='div_nome'>Nome do Cliente: <input type="text" value={nameClient} onChange={(event):void => setNameClient(event.target.value)} /></div>
                    <div className='div_inicio'>Prazo: <input type="text" value={dateEnd} onChange={(event):void => setDateBeg(event.target.value)}/></div>
                    <div className='div_status'>Status: <input type="text" value={statusSheet} onChange={(event):void => setStatusSheet(event.target.value)} /></div>
                    <div className='div_fase'>Fase: <input type="text" value={stage} onChange={(event):void => setStage(event.target.value)} /></div>
                    <div className='div_valor'>Valor: <input type="text" value={totalValue}/></div>
                    <button className="btn-update-information" type="button" onClick={():void => setPopup(true)}>Salvar alterações</button>
                </div>
                <VerifyAction trigger={popup}>
                    <div className="div-confirmed-action">
                    <div className="div-text-confirmed-action">
                        <h1>Salvar Dados?</h1>
                        <p>Deseja salvar todos os dados alterados?</p>
                    </div>
                    <div className="div-btns-confirmed-action">
                        <button type="button" className="btn-cancel" onClick={():void => setPopup(false)}>Cancelar</button>
                        <button type="button" className="btn-confirm" onClick={saveInfo}>Confirmar</button>
                    </div>
                    </div>
                </VerifyAction>
                <div className='div_team'>
                    <div className='div_title_team'>
                        <h2>Equipe de Precificação</h2>
                    </div>

                    <div className='div_image'>

                        <div className='div_selfs'>
                            <img src={Self} alt='imagem de um funcionario' className='div_photo' />
                            <div className='div_employee1'>
                                <p>Funcionário 1</p>
                            </div> 
                        </div>
                        <div className='div_selfs'>
                            <img src={Self} alt='imagem de um funcionario' className='div_photo' />
                            <div className='div_employee2'>
                                <p>Funcionário 2</p>
                            </div> 
                        </div>
                        <div className='div_selfs'>
                            <img src={Self} alt='imagem de um funcionario' className='div_photo' />
                            <div className='div_employee3'>
                                <p>Funcionário 3</p>
                            </div> 
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

};



export default GeneralInfo;