import { axios } from "@bundled-es-modules/axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState([]);

  const getWeather = async () => {
    if (!city) return; 
    try {
      const res = await axios(`http://api.weatherapi.com/v1/current.json?key=76ceec641f824a5fade51534241406&q=${city}&aqi=yes`);
      setWeatherData((prevData) => [...prevData, res.data]);
      setCity("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Search</h1>


      {/* INPUT SECTION */}
      <div className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded-l w-full"
        />
        <button onClick={getWeather} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Search
        </button>
      </div>


      {/*  Card section  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.map((data, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold">{data.location.name}</h2>
            <p>Temp: {data.current.temp_c}°C</p>
            <p>{data.current.condition.text}</p>
            <img
              src={data.current.condition.icon}
              alt="weather icon"
              className="mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
