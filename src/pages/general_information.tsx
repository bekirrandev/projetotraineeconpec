import React from 'react';
import '../css/general_information.css';
import Self1 from '../assets/self1.jpg';
import Self2 from '../assets/self2.jpg';
import Self3 from '../assets/self3.jpg';


function GeneralInfo():JSX.Element{

    return(
        <div className='general_info'>
            <div className='div_title'>
                <h1>Projeto</h1>
            </div>
            
            <div className='div_button'>
                <button type='button'>Voltar</button>
            </div>
            
            <div className='div_sub_title'>
                <h3>Info. Gerais da Precificação</h3>
            </div>

            <div className='div_information_block'>
                <div className='div_informations'>
                    <div className='div_inicio'>Início: <input type="date" /></div>
                    <div className='div_fim'>Fim: <input type="date" /></div>
                    <div className='div_status'>Status da Precificação: <input type="text" /></div>
                    <div className='div_nome'>Nome do Cliente: <input type="text" /></div>
                    <div className='div_fase'>Fase: <input type="text" /></div>
                    <div className='div_valor'>Valor: <input type="text" /></div>
                </div>

                <div className='div_team'>
                    <div className='div_title_team'>
                        <h2>Equipe de Precificação</h2>
                    </div>

                    <div className='div_image'>

                        <div className='div_selfs'>
                            <img src={Self1} alt='imagem de um funcionario' className='div_photo' />
                            <p>Lorem</p>
                        </div>
                        <div className='div_selfs'>
                            <img src={Self2} alt='imagem de um funcionario' className='div_photo' />
                            <p>Lorem</p>
                        </div>
                        <div className='div_selfs'>
                            <img src={Self3} alt='imagem de um funcionario' className='div_photo' />
                            <p>Lorem</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

};



export default GeneralInfo;