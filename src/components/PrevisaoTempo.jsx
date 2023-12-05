import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import ClimaIcon from './Icon';

const PrevisaoTempo = () => {
  const [cidade, setCidade] = useState('');
  const [temperatura, setTemperatura] = useState(null);
  const [erro, setErro] = useState('');


  const buscarPrevisaoTempo = async () => {
    const APIKey = import.meta.env.VITE_OPENWEATHER_APIKEY;
    try {
      const resposta = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}&lang=pt` //Tenta fazer uma requisição a API.
      );
      setTemperatura(resposta.data);
      setErro('');
    } catch (erro) { //Se ocorrer algum erro na requisição, o catch é executado.
      setErro('Cidade não encontrada!');
      setTemperatura(null); //Define como nulo pra evitar informação errada.
    }
  };

  return (

    <div className="container">
      <h1>Previsão do Tempo</h1>
      <label>Lugar: </label>
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)} //Entrada de texto que sempre atualiza o estado quando o valor muda.
        placeholder="Digite o nome da cidade"
      />
      <button onClick={buscarPrevisaoTempo}>Buscar</button>

      {erro && <p className="error">{erro}</p>}

      {temperatura && ( //Verifica se "temperatura" não é nula.
        <div>
          <h2>{temperatura.name}</h2>
          <div className='container-icon'>
            <p className='container-distancia'>Temperatura: {Math.round(temperatura.main.temp)}°C</p>
            <ClimaIcon icon={temperatura.weather[0].icon} /> 
          </div>
          <p>Condição: {temperatura.weather[0].description}</p>

        </div>
      )}
    </div>

  );
};

export default PrevisaoTempo;
