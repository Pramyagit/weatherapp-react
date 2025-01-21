import "./App.css";
import searchIcon from "./asset/search.png";
import cloud from "./asset/cloud-tunder.png";
import snow from "./asset/snow.png";
import wind from "./asset/wind.png";
import rain from "./asset/rain.png";
import clear from "./asset/clear.jpg";
import humdity from "./asset/humidity.png";
import weather from "./asset/weather-157114_1280.png";
import sun from "./asset/sun.png";
import { useEffect, useState } from "react";

const weatherIconMap = {
  "01d": clear,
  "01n": clear,
  "02d": cloud,
  "02n": cloud,
  "03d": weather,
  "03n": weather,
  "04d": weather,
  "04n": weather,
  "05d": sun,
  "05n": weather,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "13d": snow,
  "13n": snow,
};

function App() {
  const [icon, setIcon] = useState(sun);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [humidit, setHumidit] = useState(0);
  const [winds, setWinds] = useState(0);
  const [temp, setTemp] = useState(0);
  const [text, setText] = useState("chennai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityNotFound, setCityNotFound] = useState(false);
  const api_key = "571200e0601dbc467d1561d74dba8181";

  function handleChange(e) {
    setText(e.target.value);
  }

  const search = async function handleClick() {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      const data = await fetch(url);
      const res = await data.json();
      // console.log(res)
      if (res.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        setError({ error });
        return;
      }
      setHumidit(res.main.humidity);
      setWinds(res.wind.speed);
      setTemp(Math.floor(Math.floor(res.main.temp)));
      setCity(res.name);
      setCountry(res.sys.country);
      setLat(res.coord.lat);
      setLong(res.coord.lon);
      const weathersIcon = res.weather[0].icon;
      setIcon(weatherIconMap[weathersIcon] || clear);
      setCityNotFound(false);
      // setLoading(true);
    } catch (error) {
      console.error(error.message);
      setError("An error occured while fetching weather data");
    } finally {
      setLoading(false);
    }
  };
  const handlePress = (e) => {
    if (e.key == "enter") {
      search();
    }
  };
  useEffect(() => {
    search();
  }, []);
  return (
    <div className="App">
      <div>
        <h2>Weather App</h2>
      </div>
      <div className="search">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="city name"
          onKeyDown={handlePress}
        ></input>
        <button
          onClick={() => {
            search();
          }}
        >
          <img className="searchIcon" alt="alterImage" src={searchIcon}></img>
        </button>
      </div>
      <div>
        {loading && <div className="loading-message">loading...</div>}
        {/* {error && <div className="error-message">{error}</div>} */}
        {cityNotFound && <div className="city-not-found">city Not Found</div>}
      </div>
      {!loading && !cityNotFound && (
        <div className="container">
          <div className="weather">
            <img className="weather-image" src={icon} alt="weatherimage"></img>
            <div className="detail">
              <p>{temp}°C</p>
              <p>{city}</p>
              <p>{country}</p>
            </div>
          </div>
          <div className="long-lat">
            <p>
              langtiude<span>{long}</span>
            </p>
            <p>
              latitude<span>{lat}</span>
            </p>
          </div>
          <div className="element">
            <div className="level">
              <img src={humdity} alt="icon"></img>
              <p>{humidit}%</p>
              <span>humidity</span>
            </div>
            <div className="level">
              <img src={wind} alt="icon"></img>
              <p>{winds}km/hr</p>
              <span>wind-speed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
