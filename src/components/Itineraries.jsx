import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllItineraryQuery,
  useDeleteTinerariesMutation,
  useLikeTinerariesMutation,
} from "../features/itineraryAPI";
import ActivityItinerary from "./ActivityItinerary";
import Comments from "./Comments";
import swal from 'sweetalert2'
import EnterComment from "./EnterComment";
import { useDispatch, useSelector } from "react-redux";
import { setStateLogin } from "../features/stateLocalStorage";

function Itineraries() {
  const { id } = useParams();

  const { data: itineraries } = useGetAllItineraryQuery(id);

  let itineraryDetail = itineraries?.response;

  const [deleteItinerary] = useDeleteTinerariesMutation();

  const [likeDisLike] = useLikeTinerariesMutation()


  async function clickToLike(event) {

    let idTinerary = event.target.id

    likeDisLike(idTinerary)
      .then((res) => {
        console.log(res)
        if (res.error) {
          let dataError = res.error
          let dataMessage = dataError.data
          swal.fire({
            title: "Cant Like this Tinerary!",
            text: dataMessage.message,
            icon: "error",
          });
        } else {

          let dataResponse = res.data
          let dataSuccess = dataResponse.message
          if (dataResponse.message == "Itinerary liked") {
            swal.fire({
              imageUrl: "https://media0.giphy.com/media/cdpsxf8WjmNMOBXaCd/200w.gif?cid=82a1493b0henbi6ia1a1x24o5t9s7za75n7629cdcy0ucqrt&rid=200w.gif&ct=g",

            });
          } else {
            swal.fire({
              imageUrl: "https://c.tenor.com/odF9PnzMX8cAAAAd/oh-no-jim-carrey.gif",

            });
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loginStateRedux = useSelector(state => state.statesLocalStorage)
  const dispatch = useDispatch()
  if (JSON.parse(localStorage.getItem('testUser'))) {
    dispatch(setStateLogin(true))
  } else {
    dispatch(setStateLogin(false))
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
                      <p className="Itinerary-p">
                        {" "}
                        Duration:{" "}
                        {hourDuration > 1
                          ? hourDuration + ` hours`
                          : hourDuration + ` hour`}{" "}
                      </p>
                      <p className="Itinerary-p"> Price: $ {e.price} </p>

                      <p className="Itinerary-p">
                        <button id={e._id} onClick={clickToLike} className="button-like">💙
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
                      <p>{e._id}</p>
                    </div>
                  </div>

                  <div className="itinerary-div-activities">
                    <ActivityItinerary id={e._id} />
                  </div>
                </div>
                <div className="toggle-comments">

                  {loginStateRedux ? (
                    <EnterComment
                      userID={
                        JSON.parse(localStorage.getItem("testUser"))
                          .id
                      }
                      userName={
                        JSON.parse(localStorage.getItem("testUser"))
                          .name
                      }
                      userPhoto={
                        JSON.parse(localStorage.getItem("testUser"))
                          .photo
                      }
                      userRole={
                        JSON.parse(localStorage.getItem("testUser"))
                          .role
                      }
                      itineraryID={e._id}
                    />
                  ) : null}
                  <Comments id={e._id} />
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
