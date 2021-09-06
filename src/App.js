import './App.css';
import axios from 'axios'
import md5 from 'md5'
import { useEffect, useState } from 'react';

function App() {
  const [marvel, setMarvel] = useState([])

  const baseURL= 'http://gateway.marvel.com/v1/public/characters?'
  
  const publicKey ='cd6f735e64cb3d6f709d69cb1170653d'
  const privateKey ='377215d3ad30a3838862bcdd13cdc40db41e98da'
  
  const time = Number(new Date())
  const hash = md5(time + privateKey + publicKey)

  const marvelApi = async () => {
    const result = await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`)
    setMarvel(result.data.data.results)
    console.log(result.data.data.results)
  }
  
  useEffect(() => {
    marvelApi()
  }, [])

  return (
    <div className="container">
      <div className="marvelLogo">
          <h1>Marvel API</h1>
      </div>
    <div className="marvelCharacters" >
      {marvel.map((details) => {
        return (
          <div key={details.id} className="charactersDetails">
            <img src={`${details.thumbnail.path}.${details.thumbnail.extension}`} alt="Marvel Image Character" />
            <h3>{details.name}</h3>
          </div>
        )
      })}
    </div>
    </div>
  );
}

export default App;
