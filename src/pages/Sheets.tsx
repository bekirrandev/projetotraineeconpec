import React, { useState, useEffect, useRef } from 'react';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import '../css/Sheets.css';
import { useHistory } from 'react-router-dom';
import { firestore } from '../config/firebase';
import NewTd from '../components/NewTd';
import NewTdTableSP from '../components/NewTdTableSP';
import Back from "../assets/back.svg";
import Add from "../assets/add.svg";
import Remove from "../assets/remove.svg";
import Save from "../assets/save.svg";
import Backup from "../assets/backup.svg";
import Fibonacci from "../assets/fibonacci.svg";
import Info from "../assets/info.svg";
import Home from "../assets/home.svg";
import fibo from '../assets/fibo.png';
import fibo1 from '../assets/seq.png';
import VerifyAction from '../components/VerifyAction';

function Sheets({ location: { state: { doc, numDoc } } }:any):JSX.Element{

    const contentArea = useRef(null);
    const [contTd, setContTd] = useState(doc.storyPoints);
    const [popup, setPopup] = useState(false);
    const [valueSp, setValueSp] = useState(doc.information.totalSp);
    const [priceSp, setPriceSp] = useState(doc.information.valueSp);
    const [timeSp, setTimeSp] = useState(doc.information.timeEachSp);
    const [timeWeek, setTimeWeek] = useState(doc.information.timeWorkWeek);
    const [idDoc, setIdDoc] = useState<string>();
    const [totalTimeHour, setTotalTimeHour] = useState(doc.information.totalHours);
    const [totalTimeWeek, setTotalTimeWeek] = useState(doc.information.totalWeek);
    const [valueDay, setValueDay] = useState(doc.information.rendDiary);
    const [totalValue, setTotalValue] = useState(doc.information.totalPrice);
    const [stories, setStories] = useState<any[][]>([]);
    const [isModalVisible , setIsModalVisible] = useState(false);
    const history = useHistory();
    const pdfExportComponent = useRef<any>();
    const handleExportWithComponent = (event:any):any => {
        if (pdfExportComponent.current){
            pdfExportComponent.current.save();} 
    };


    function setFields():void {
        for (let valor = 0; valor < doc.storyPoints.length; valor += 1) {
            (document.getElementById((-3*valor - 1).toString()) as HTMLInputElement).value = doc.storyPoints[valor].how;
            (document.getElementById((-3*valor - 2).toString()) as HTMLInputElement).value = doc.storyPoints[valor].iwant;
            (document.getElementById((-3*valor - 3).toString()) as HTMLInputElement).value  = doc.storyPoints[valor].for;
            (document.getElementById(valor.toString()) as HTMLInputElement).value = doc.storyPoints[valor].sp;
        }
    }

    async function saveSheet():Promise<void> {
        let linha = [];
        for (let storyPoint = 0; storyPoint < contTd.length; storyPoint += 1) {
            linha.push((document.getElementById((-3*storyPoint - 1).toString()) as HTMLInputElement).value);
            linha.push((document.getElementById((-3*storyPoint - 2).toString()) as HTMLInputElement).value);
            linha.push((document.getElementById((-3*storyPoint - 3).toString()) as HTMLInputElement).value);
            linha.push((document.getElementById(storyPoint.toString()) as HTMLInputElement).value);
            stories.push(linha);
            linha = []
        }
        setStories(stories);

        let newStories = [];
        for (let item = 0; item < stories.length; item += 1){

            newStories.push({how: stories[item][0], iwant: stories[item][1], for: stories[item][2], sp: stories[item][3], });

        }

        const newInformation = { rendDiary: valueDay, timeEachSp: timeSp, timeWorkWeek: timeWeek, totalHours: totalTimeHour, totalSp: valueSp, totalPrice: totalValue, totalWeek: totalTimeWeek, valueSp: priceSp};

        const res = await firestore.collection('sheets').doc(idDoc).update({storyPoints: newStories});
        const up = await firestore.collection('sheets').doc(idDoc).update({information: newInformation});
        setStories([]);
        newStories = [];
        setPopup(false);
    }

    const setValues = (totalsp:number):number => {
        const preco = Number((document.getElementById("preco_sp") as HTMLInputElement).value);
        setTotalValue(preco*totalsp);
        return preco*totalsp;
    }

    function setRendDay(soma:number, total:number):void {
        const timeHour = Number((document.getElementById("time-hour") as HTMLInputElement).value);
        const workWeek = Number((document.getElementById("work-week") as HTMLInputElement).value);
        const rendDay = total/((soma*timeHour)/(workWeek/7));
        setValueDay(rendDay);
    }

    function setHours(soma:number):void {
        const timeHour = Number((document.getElementById("time-hour") as HTMLInputElement).value);
        setTotalTimeHour(timeHour*soma);
        let horas:number = ((timeHour*soma)/7);
        horas = Number(Math.ceil(horas));
        setTotalTimeWeek(horas);
    }


    function setSPValue():void {
        let soma = 0;
        for (let valor = 0; valor < contTd.length; valor += 1){
            soma += Number((document.getElementById(valor.toString()) as HTMLInputElement).value);
        }
        setValueSp(soma);
        const total = setValues(soma);
        setHours(soma);
        setRendDay(soma, total);
    }

    function addTd():void {
        setContTd([...contTd, contTd.length]);        
    }

    function removeTd():void {
        if (contTd.length > 1){
            contTd.pop();
            setContTd([...contTd]);
            setSPValue();
        }
    }

    function goHome():void {
        history.push('/home');
    }

    function goInformation():void {
        history.push({
            pathname: '/generalInfo',
            state: {doc, numDoc, idDoc}
        });
    }

    useEffect(() => {
        async function fetchSheet():Promise<any> { 
            await firestore.collection('sheets').get().then((querySnapshot) => {
                setIdDoc(querySnapshot.docs[numDoc].id);
            });
        }
        fetchSheet();
    }, []);

    return(
        <div className="sheets">
            <div className="div-menu">
                <div className="div-side-bar">
                    <div className="div-icons-sheet">
                        <button type="button" className="button-icon-navbar" onClick={goHome}><img src={Back} alt="Um icone para voltar para a pagina anterior" /></button>
                        <button type="button" className="button-icon-navbar" onClick={goInformation}><img src={Info} alt="Um icone para ir para as informações" /></button>
                        <button type="button" className="button-icon-navbar" onClick={addTd}><img src={Add} alt="Um icone para adicionar SP" /></button>
                        <button type="button" className="button-icon-navbar" onClick={removeTd}><img src={Remove} alt="Um icone para remover SP" /></button>
                        <button type="button" className="button-icon-navbar" onClick={():void => setPopup(true)}><img src={Save} alt="Um icone para salvar as alterações da planilha" /></button>
                        <button type="button" className="button-icon-navbar" onClick={handleExportWithComponent} ><img src={Backup} alt="Um icone para exportar a planilha para PDF" /></button>
                        <button type="button" className="button-icon-navbar" onClick = {():void => setIsModalVisible(true)}><img src={Fibonacci} alt="Um icone para abrir o modal do fibonacci" /></button>
                    </div>
                </div>
            </div>
            <div className="div-page">
                <div className="div-title">
                    <h1>{doc.nameSheet}</h1>
                </div>
                <div className="App">
                    <VerifyAction trigger={isModalVisible}>
                        <div className="div-button-close-modal">
                            <button type="button" onClick={():void => setIsModalVisible(false)} id="btn-close-modal" >X</button>
                        </div>
                        <img src={fibo} id = 'imagemFibo' alt = 'Imagem de Fibonacci'/>
                        <p className='elemento1'>Na matemática, a sucessão de Fibonacci (ou sequência de Fibonacci), é uma sequência de números inteiros, começando normalmente por 0 e 1, na qual cada termo subsequente corresponde à soma dos dois anteriores. A sequência recebeu o nome do matemático italiano Leonardo de Pisa, mais conhecido por Fibonacci, que descreveu, no ano de 1202, o crescimento de uma população de coelhos, a partir desta. Esta sequência já era, no entanto, conhecida na antiguidade.</p><br />
                        <img src={fibo1} alt= 'Sequência de Fibonacci' id="fibo1"/>
                        <p className='elemento2'>Fonte:Wikipédia</p>
                    </VerifyAction>
                </div>
                <div className="div-table">
                    <PDFExport ref={pdfExportComponent} paperSize='A2'>
                        <div className='PDFcontainer'>
                            <table className="table">
                                <th className="table-th">Como um...</th>
                                <th className="table-th">Eu quero...</th>
                                <th className="table-th">Para...</th>
                                <tr />
                                { contTd.map((sheet:any, index:number) => <NewTd index={index} how={sheet.how} iwant={sheet.iwant} forI={sheet.for} />)}
                            </table>  
                            <table className="table-sp" onChange={setSPValue}>
                                <th className="table-sp-th">SP</th><tr />
                                {contTd.map((sheet:any, index:number) => <NewTdTableSP num={index} sp={sheet.sp} />)}
                            </table>
                        </div>
                    </PDFExport> 
                </div>
                <VerifyAction trigger={popup}>
                    <div className="div-confirmed-action">
                    <div className="div-text-confirmed-action">
                        <h1>Salvar planilha?</h1>
                        <p>Deseja salvar todos os dados da planilha?</p>
                    </div>
                    <div className="div-btns-confirmed-action">
                        <button type="button" className="btn-cancel" onClick={():void => setPopup(false)}>Cancelar</button>
                        <button type="button" className="btn-confirm" onClick={saveSheet}>Confirmar</button>
                    </div>
                    </div>
                </VerifyAction>
                <div className="div-table-information">
                    <table className="table-general-information" onChange={setSPValue}>
                        <th className="table-info-th">Total de SP</th>
                        <th className="table-info-th">Preço/Story point</th>
                        <th className="table-info-th">Preço Total</th>
                        <th className="table-info-th">Horas p/ cada story point</th>
                        <th className="table-info-th">Horas de trabalho semanais</th>
                        <th className="table-info-th">Rentabilidade diária</th>
                        <th className="table-info-th">Tempo de execução (Horas)</th>
                        <th className="table-info-th">Tempo de execução (Semanas)</th>
                        <tr />
                        <td className="table-info-td">{valueSp}</td>
                        <td className="table-info-td"><input type="number" id="preco_sp" value={priceSp} onChange={(event):void => setPriceSp(event.target.value)}/></td>
                        <td className="table-info-td">R${totalValue}</td>
                        <td className="table-info-td"><input type="number" id="time-hour" value={timeSp} onChange={(event):void => setTimeSp(event.target.value)} /></td>
                        <td className="table-info-td"><input type="number" id="work-week" value={timeWeek} onChange={(event):void => setTimeWeek(event.target.value)} /></td>
                        <td className="table-info-td">R${valueDay}</td>
                        <td className="table-info-td">{totalTimeHour}</td>
                        <td className="table-info-td">{totalTimeWeek}</td>
                    </table>  
                </div>
            </div>
        </div>
    )
};

export default Sheets;