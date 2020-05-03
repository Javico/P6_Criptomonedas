import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Button = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size:20px;
    padding:10px;
    background-color: #66A2FE;
    border:none;
    width:100%;
    border-radius:10px;
    color: #FFF;
    transition:background-color .3s ease;

    &::hover{
        background-color: #326AC0;
        cursor:pointer;
    }
`;


const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    // State del listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);

    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar EU'},
        {codigo:'MXN', nombre:'Peso Mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra'},
    ];

    // Error state
    const [error, guardarError] = useState(false);

    // Utilizar usMoneda
    const [moneda, SelecMonedas] = useMoneda('Elige tu moneda','', MONEDAS);

    // uso de criptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    // ejecutar llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            //console.log(resultado.data.Data);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // cuando el usuaro hace subnmit
    const cotizaMoneda = e =>{
        e.preventDefault();

        // validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda == ''){
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form onSubmit={cotizaMoneda}>
            {error ? <Error mensaje="Todos los campos son obligatorios"></Error> : null}
            <SelecMonedas />
            <SelectCripto />
            <Button type="submit" value="Calcular" >Calcular</Button>
        </form>
    );
}

export default Formulario;