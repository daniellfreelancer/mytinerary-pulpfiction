import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../components/GoBack";
import Layout from "../layouts/Layout";
import {
  useDeleteCityMutation,
  useGetCityByIdQuery,
} from "../features/citiesAPI";
import "../styles/App.css";
import api_url from "../api";
import Itineraries from "../components/Itineraries";
import NotAvailable from "../components/NotAvailable";
import { Link as LinkRouter } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";

function Details() {
  const { id } = useParams();
  const { data: cities } = useGetCityByIdQuery(id);
  let cityDetail = cities?.response;
  let cityFundation = new Date(cityDetail?.fundation);
  let yearFundation = cityFundation.getFullYear();
  const [statusLoggedNav, setStatusLoggedNav] = useState(false);

  useEffect(() => {
    if (localStorage.length > 0) {
      setStatusLoggedNav(true);
    }
  }, [statusLoggedNav]);

  const [cityHasBeenDeleted, setCityHasBeenDeleted] = useState(false);
  const [messageDeleted, setMessageDelete] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageTittle, setMessageTittle] = useState("");
  const [iconSVG, setIconSVG] = useState("");

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
        setModalOpen(true);
        setMessageError(dataSuccess);
        setMessageTittle("Success");
        setIconSVG(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fillRule="currentColor"
            className="bi bi-check-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
          </svg>
        );
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(function () {
      goToIndex("/cities");
    }, 3000);
  };

  scrolled();

  return (
    <Layout>
      {modalOpen == true ? (
        <AlertComponent
          setOpenModal={setModalOpen}
          setMessageError={messageError}
          setMessageTittle={messageTittle}
          setIconSVG={iconSVG}
        />
      ) : null}
      {cityHasBeenDeleted == false ? <p></p> : <p>{messageDeleted}...</p>}
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
          <div className="description-detail">
            <h2>Information</h2>
            <p>{cityDetail?.description}</p>
          </div>

          {statusLoggedNav === true ? (
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
