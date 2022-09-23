import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllItineraryQuery,
  useDeleteTinerariesMutation,
  useLikeTinerariesMutation,
  useGetItineraryLIKEMutation,
} from "../features/itineraryAPI";
import itineraryAPI from "../features/itineraryAPI";
import ActivityItinerary from "./ActivityItinerary";
import Comments from "./Comments";
import swal from "sweetalert2";
import EnterComment from "./EnterComment";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

function Itineraries() {
  const userLoggin = useSelector((state) => state.auth);

  const { id } = useParams();

  const [getMyTineraries] = useGetItineraryLIKEMutation();

  const [change, setChange] = useState(false);

  const [showAllTineraries, setShowAllTineraries] = useState(false);

  const [itineraryDetail, setItineraryDetail] = useState(null);

  const [heartLike, setHeartLike] = useState("Click to Like/Dislike")

  const [settingHeart, setSettingHeart] = useState(null)

  useEffect(() => {
    getAllTineraries();
  }, [change]);


  async function getAllTineraries() {
    try {
      let res = await getMyTineraries(id);
      setItineraryDetail(res.data.response);

      if (res.data?.success) {

        if (res.data.response.likes.includes(userLoggin.id)) {

          setSettingHeart('no Megusta')
        } else {

          setSettingHeart('Me gusta')
        }
        
    } 
    } catch (error) {
      console.log(error);
    }
  }

  const [deleteItinerary] = useDeleteTinerariesMutation();
  const [likeDisLike] = useLikeTinerariesMutation();

  async function clickToLike(e) {
    let idTinerary = e.target.id;

    likeDisLike(idTinerary)
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          swal.fire({
            title: "Cant Like this Tinerary!",
            text: dataMessage.message,
            icon: "error",
          });
        } else {
          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          setChange(!change);

          if (dataResponse.message === "Itinerary liked") {
            swal.fire({
              imageUrl:
                "https://media0.giphy.com/media/cdpsxf8WjmNMOBXaCd/200w.gif?cid=82a1493b0henbi6ia1a1x24o5t9s7za75n7629cdcy0ucqrt&rid=200w.gif&ct=g",
            });

          } else {
            swal.fire({
              imageUrl:
                "https://c.tenor.com/odF9PnzMX8cAAAAd/oh-no-jim-carrey.gif",
            });

          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
  }

  const handDeleteTinerary = (e) => {
    e.preventDefault();
    deleteItinerary(e.target.id)
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
  };

  function handleChange() {
    setChange(!change);
  }


  return (
    <>
      <h2>💙 Itineraries 💙</h2>
      <div className="Itinerary-div">
        {true ? (
          itineraryDetail?.map((e) => {
            let totalLikes = e.likes;
            let myTags = e.tags;
            let hourDuration = Math.round(e.duration / 60);
            let heart = totalLikes?.includes(userLoggin.id)
    
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

                      <span className="Itinerary-p">
                        {
                          JSON.parse(localStorage.getItem("token")) ? (<button
                            id={e._id}
                            onClick={clickToLike}
                            className="btn-read"
                          >
                            
                            {heartLike}
                            
  
                          </button>) : <p>💖 </p>
                        }
                        {" "}
                        {totalLikes.length}{" "}

                        {
                          JSON.parse(localStorage.getItem("token")) ?
                          (<p>
                            {
                              heart === true ? (<p> I Like it 💖  </p>) : (<p> Dont Like any more 🖤</p>)
                            }
                          </p>) : null
                        }
                      </span>
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
                      {userLoggin.role === "admin" &&
                      JSON.parse(localStorage.getItem("token")) ? (
                        <>
                          <LinkRouter
                            to={`/editTinerary/${e._id}`}
                            className="btn-read"
                          >
                            Edit Tinerary!
                          </LinkRouter>
                          <button
                            id={e._id}
                            className="btn-read btn-read-red"
                            onClick={handDeleteTinerary}
                            
                          >
                            Delete Tinerary!
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="itinerary-div-activities">
                    <ActivityItinerary id={e._id} />
                  </div>
                </div>
                <div className="toggle-comments">
                  {userLoggin.logged === true &&
                  JSON.parse(localStorage.getItem("token")) ? (
                    <EnterComment
                      userID={userLoggin.id}
                      userName={userLoggin.user}
                      userPhoto={userLoggin.photo}
                      userRole={userLoggin.role}
                      itineraryID={e._id}
                      reload={handleChange}
                    />
                  ) : null}

                  <Comments id={e._id} reload={handleChange} />
                </div>
              </div>
            );
          })
        ) : (
          <p> This City has no Itineraries yet</p>
        )}
        {userLoggin.logged === true &&
        JSON.parse(localStorage.getItem("token")) ? (
          <LinkRouter className="Comment-button" to="/myAccount">
            Go to your account and create one Itinerary or Activity
          </LinkRouter>
        ) : null}
      </div>
    </>
  );
}

export default Itineraries;
