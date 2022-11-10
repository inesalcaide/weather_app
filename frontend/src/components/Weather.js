import sunrise from '../photos/sunrise.png'
import sunset from '../photos/sunset.png'

function Weather (weather) {
    weather = weather.name

    return (
    
        <div className="weather-box">
            <div className="location">{weather.city}</div>

            <div className="temp">
            <div className="temperature">
                <div>{weather.temperature}º</div>
            </div>
            <div className="temp-max-min">
                <div>{weather.temp_max}º H</div>
                <div>{weather.temp_min}º L</div>
            </div>

            </div>
            <div className="weather">{weather.main}</div>
            <div className="info">
                <p>Wind</p>
                {weather.wind}km/h
            </div>
            <div className="info">
                <p>Visibility</p>
                {weather.visibility}
            </div>
            <div className="info">
            <img src={sunrise} alt='Sunrise'></img>
            <div>{weather.sunrise}</div>
            </div>
            <div className="info">
            <img src={sunset} alt='Sunset'></img>
            <div>{weather.sunset}</div>
            </div>
            <div className="info">
                <p>Pressure</p>
                {weather.pressure}hPa
            </div>
            <div className="info">
                <p>Humidity</p>
                {weather.humidity}%
            </div>
        </div>
    
    );

}


export default Weather;