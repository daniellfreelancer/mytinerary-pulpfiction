import React from 'react'

function WeatherCity(props) {

    let temperature = props.temp
    let feelLike = props.feelLike
    let humidity = props.humidity
    let wind = props.wind
    let weatherContiditon = props.weatherContiditon
    let weatherDescription = props.weatherDescription
    
  return (
  <>
    <marquee className='marquee-weather'>
        <span><strong>Temperature: </strong>{temperature} ° C {"    -    "}
        <strong>Feel Like: </strong>{feelLike} ° C {"    -    "}
        <strong>Humidity: </strong>{humidity} % {"    -    "}
        <strong>Wind: </strong>{wind} k/h {"    -    "}
        <strong>Weather: </strong>   {weatherDescription} {"    -    "}
        <img src={weatherContiditon} alt={weatherContiditon} className="img-weatherCondition" /></span>
    </marquee>
    </>
  )
}

export default WeatherCity