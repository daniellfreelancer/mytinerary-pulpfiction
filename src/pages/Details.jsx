import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../components/GoBack";
import Layout from "../layouts/Layout";
import { useDeleteCityMutation, useGetCityByIdQuery } from "../features/citiesAPI";
import "../styles/App.css";
import Itineraries from "../components/Itineraries";
import NotAvailable from "../components/NotAvailable";
import { Link as LinkRouter } from "react-router-dom";
import WeatherCity from "../components/WeatherCity";
import axios from "axios";
import swal from 'sweetalert2'
import { useSelector } from "react-redux";

function Details() {
  const { id } = useParams();
  const { data: cities } = useGetCityByIdQuery(id);
  let cityDetail = cities?.response;
  let cityFundation = new Date(cityDetail?.fundation);
  let yearFundation = cityFundation.getFullYear();
  const userLoggin = useSelector((state) => state.auth)



  const [statusLoggedNav, setStatusLoggedNav] = useState(false);
  const [myWeather, setMyWeather] = useState([{}])
  const notWeather = "Weather Resources are being Loaded"

  const [showWeather, setShowWeather] = useState(false)



  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setStatusLoggedNav(true);
    }
  }, [statusLoggedNav]);

  let goToIndex = useNavigate();
  function scrolled() {
    // window.scrollTo(0,0)
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const [deleteCity] = useDeleteCityMutation(cityDetail?._id);

  const handleDelete = () => {
    deleteCity(cityDetail?._id)
      .then((res) => {
        let dataResponse = res.data;
        let dataSuccess = dataResponse.message;
        swal.fire({
          title: "Success! ",
          text: dataSuccess,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(function () {
      goToIndex("/cities");
    }, 3000);
  };

  scrolled();

  const apiWeatherOne = "8abe30bd4af97573ecc7efa5759d8b1e"
  const apiWeatherTwo = "d53d314b6143eef1b72756fe9c919449"
  const apiWeatherTree = "b1522eea19887f1c379e84719dc3527b"
  const apiWeatherFour = "5c9f1745d177347fd80455f78a1b490e"

  //axios for Weather City

  useEffect(() => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityDetail?.city}&appid=8abe30bd4af97573ecc7efa5759d8b1e`)
      .then((res) => {
        if (res) {
          let celcius = 273.15
          let feelLike = (res.data.main.feels_like - celcius).toFixed(2)
          let temp = (res.data.main.temp - celcius).toFixed(2)
          let humidity = res.data.main.humidity
          let icon = res.data.weather[0].icon
          let description = res.data.weather[0].description
          let wind = res.data.wind.speed
          let imgIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`

          setMyWeather({
            temp: temp,
            feelLike: feelLike,
            humidity: humidity,
            wind: wind,
            icon: imgIcon,
            description: description
          })
          setShowWeather(true)
        }


      })
      .catch((error) => {


      })
  }, [])




  return (
    <Layout>

      {cityDetail ? (
        <div className="bigcard">
          <h2 className="detailtitle">{cityDetail?.city}</h2>
          <div className="bigcard-photo">
            <img src={cityDetail?.photo} alt={cityDetail?.featuredLocation} />
          </div>
          <div className="details">
            <div className="info1">
              <p>Country: {cityDetail?.country}</p>
              <p>Population: {cityDetail?.population} habitants</p>
              <p>Fundation: {yearFundation}</p>
            </div>
          </div>
          {showWeather === true ?
            <WeatherCity
              temp={myWeather.temp}
              feelLike={myWeather.feelLike}
              humidity={myWeather.humidity}
              wind={myWeather.wind}
              weatherContiditon={myWeather.icon}
              weatherDescription={myWeather.description}
            /> :
            <marquee className='marquee-weather'>
              <p>{notWeather}</p>
            </marquee>
          }

          <div className="description-detail">
            <h2>Information</h2>
            <p>{cityDetail?.description}</p>
          </div>

          {userLoggin.role === "admin" ? (
            <>
              <LinkRouter
                to={`/editCity/${cityDetail?._id}`}
                className="btn-read"
              >
                Edit City!
              </LinkRouter>
              <button onClick={handleDelete} className="btn-read btn-read-red">
                Delete city!
              </button>
            </>
          ) : null}

          <div className="itineraries-div">
            <Itineraries />
          </div>
        </div>
      ) : (
        <NotAvailable />
      )}

      <GoBack />
    </Layout>
  );
}

export default Details;
