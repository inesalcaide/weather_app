import React, { useState } from 'react';
import Weather from './components/Weather';
import DateBuilder from './components/DateTime';
import Error from './components/Error';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [showWeather, setShowWeather] = useState(false);
  const [showError, setShowError] = useState(false);
  const [response, setResponse] = useState('');

  var data = require("./cities.list.json");

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      onSearch(query)
    }
  }

  const onSearch = (searchTerm) => {
    setQuery(searchTerm);
    fetch(`/weather?city=${searchTerm}`)
      .then (res => res.json())
      .then (result => {
        if (result['error'] === "NO CITY PASSED" | result['error'] === "CITY NOT IN LIST") {
          setResponse(result['error']);
          setShowWeather(false);
          setShowError(true);
        }
        else {
          setShowError(false)
          setWeather(result.weather);
          setShowWeather(true);
        }
        setQuery('');
      })
      .catch(error => console.log('error'));
  };

  return (
  <div className={
    ((weather.main === 'Clouds') ? 'app cloud' : 
    ((weather.main === 'Rain') ? 'app rain' :
    ((weather.main === 'Drizzle') ? 'app rain' :
    ((weather.main === 'Snow') ? 'app snow' :
    ((weather.main === 'Thunderstorm') ? 'app thunderstorm' :
    ((weather.main === 'Clear') ? 'app clear' : 'app'))))))
  }>
    <main>
      <div className="search-box">
        <input
         type="text" 
         className="search-bar"
         placeholder="Search for city..."
         onChange={e => setQuery(e.target.value)}
         value={query}
         onKeyPress={handleKeyPress}
         />
         <div className="dropdown">
         {data
            .filter((item) => {
              const searchTerm = query.toLowerCase();
              const Name = item.name.toLowerCase();

              return (
                searchTerm &&
                Name.startsWith(searchTerm) &&
                Name !== searchTerm
              );
            })
            .slice(0, 5)
            .map((item) => (
              <div
                onClick={() => onSearch(item.name)}
                className="dropdown-row"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
      </div>
      </div>

      { showError ? <Error name={response} /> : null }

      <div className="date-box">
        <div className="date">{DateBuilder(new Date())}</div>
      </div>
      { showWeather ? <Weather name={weather} /> : null }

    </main>
  </div>
  );
}

export default App;
