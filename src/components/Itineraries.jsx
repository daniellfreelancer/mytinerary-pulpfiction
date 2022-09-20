import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllItineraryQuery,
  useDeleteTinerariesMutation,
  useLikeTinerariesMutation,
} from "../features/itineraryAPI";
import ActivityItinerary from "./ActivityItinerary";
import Comments from "./Comments";

function Itineraries() {
  const { id } = useParams();

  const { data: itineraries } = useGetAllItineraryQuery(id);

  let itineraryDetail = itineraries?.response;

  const [deleteItinerary] = useDeleteTinerariesMutation();

  const [likeDisLike] = useLikeTinerariesMutation()
  

  
  async function clickToLike(event){

    console.log(event.target.id)

    let idTinerary = event.target.id
    


    likeDisLike(idTinerary)
     .then((res) => console.log(res))
     .catch((error)=>console.log(error))
  

  }

  return (
    <>
      <h2>💙 Itineraries 💙</h2>
      <div className="Itinerary-div">
        {itineraryDetail ? (
          itineraryDetail?.map((e) => {
            let totalLikes = e.likes;
            let myTags = e.tags;
            let hourDuration = Math.round(e.duration / 60);
            let idTinerary = e._id;

            return (
              <div className="Itinerary-detail" key={e._id}>
                <div className="itinerary-div-img">
                  <img src={e.photo} className="Itinerary-img" alt={e.city} />
                </div>

                <div className="itinerary-div-text-activities">
                  <div className="itinerary-div-p">
                    <h3 className="Itinerary-p"> {e.name} </h3>
                    <div className="text-itinerary">
                      <p>{e._id}</p>
                      <p className="Itinerary-p">
                        {" "}
                        Duration:{" "}
                        {hourDuration > 1
                          ? hourDuration + ` hours`
                          : hourDuration + ` hour`}{" "}
                      </p>
                      <p className="Itinerary-p"> Price: $ {e.price} </p>

                      <p className="Itinerary-p">
                        <button id={e._id} onClick={clickToLike} className="button-like">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            className="bi bi-balloon-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"
                            />
                          </svg> */} 💙
                        </button>
                        {" "}{totalLikes.length}{" "}
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
                  </div>

                  <div className="itinerary-div-activities">
                    <ActivityItinerary id={e._id} />
                  </div>
                </div>
                <div className="toggle-comments">
                  <Comments />
                </div>
              </div>
            );
          })
        ) : (
          <p> This City has no Itineraries yet</p>
        )}
      </div>
    </>
  );
}

export default Itineraries;
