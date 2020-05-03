import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top:80px;

  &::after{
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;



function App() {

  const [moneda,guardarMoneda] = useState('');
  const [criptomoneda,guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizar = async () => {
      // evitamos la primer ejecucion
      if(moneda === '') return;

      // consultar la api para obtener la cotizacion
      //const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${moneda}&fsyms=${criptomoneda}`;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
      guardarCargando(true);

      setTimeout(() => {
        //cargando
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000);
    }
    cotizar();
  }, [moneda, criptomoneda])

  // mostrar spinne o resultado

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza cripto monedas al instante</Heading>
        <Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda} />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
