import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteTinerariesMutation, useGetTinerariesQuery } from "../features/itineraryAPI";
import ActivityItinerary from "./ActivityItinerary";
import {Link as LinkRouter} from 'react-router-dom'
import Swal from "sweetalert2";

function MyItineraries() {
  const userLoggin = useSelector((state) => state.auth)
  const [deleteItinerary] = useDeleteTinerariesMutation();


  const { data: myOwnItineraries, isError } = useGetTinerariesQuery(
    userLoggin.id
  );
  let myOwnItinerariesDetail = myOwnItineraries?.response;

  const handDeleteTinerary = (e) =>{
    e.preventDefault()
    deleteItinerary(e.target.id).then((res)=>{
      let dataResponse = res.data;
      let dataSuccess = dataResponse.message;
      Swal.fire({
        title: "Success! ",
        text: dataSuccess,
        icon: "success",
      });
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
          <div className="profile-card profile-creation">
        <h2>My Tineraries</h2>
        <div className="MyTineraries-div">
          {!isError ? (
            myOwnItinerariesDetail?.map((e) => {
              let totalLikes = e.likes;
              let myTags = e.tags;
              let hourDuration = Math.round(e.duration / 60);

              return (
                <div className="Itinerary-detail" key={e._id}>
                  <div className="itinerary-div-img">
                    <img src={e.photo} className="Itinerary-img" alt={e.city} />
                  </div>

                  <div className="itinerary-div-text-activities">
                    <div className="itinerary-div-p myItineraries-text">
                      <h3 className="Itinerary-p"> {e.name} </h3>
                      <div className="text-itinerary">
                        <p className="Itinerary-p">
                          {" "}
                          Duration:{" "}
                          {hourDuration > 1
                            ? hourDuration + ` hours`
                            : hourDuration + ` hour`}{" "}
                        </p>
                        <p className="Itinerary-p"> Price: $ {e.price} </p>

                        <p className="Itinerary-p">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="bi bi-bookmark-heart"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
                            />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                          </svg>
                          {totalLikes.length}{" "}
                        </p>
                        <p className="Itinerary-p">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="bi bi-tags"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                          </svg>{" "}
                          Tags: {myTags.join(" - ")}{" "}
                        </p>
                      </div>
                       
                        <div>
                          <LinkRouter
                            to={`/editTinerary/${e._id}`}
                            className="btn-read"
                          >
                            Edit Tinerary!
                          </LinkRouter>
                          <button id={e._id} className="btn-read btn-read-red" onClick={handDeleteTinerary}>
                            Delete Tinerary!
                          </button>
                        </div>
                      
                    </div>

                    <div className="itinerary-div-activities">
                      <ActivityItinerary id={e._id} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-mytin">You dont have itineraries yet</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyItineraries;
