import React, { useState } from "react";
import { useGetCommentsQuery } from "../features/commentAPI";
import { useDispatch, useSelector } from "react-redux";
import { setStateLogin } from "../features/stateLocalStorage";

function Comments(props) {
  let idItinerary = props.id;
  const { data: comments, isSuccess } = useGetCommentsQuery(idItinerary);
  let commentsItinerary = comments?.response;
  const [show, setShow] = useState(false);

  const loginStateRedux = useSelector((state) => state.statesLocalStorage);
  const dispatch = useDispatch();
  if (JSON.parse(localStorage.getItem("testUser"))) {
    dispatch(setStateLogin(true));
  } else {
    dispatch(setStateLogin(false));
  }

  function showComment() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <div className="comment-box">
      <div className="Comment-div">
        <button className="Comment-button" onClick={showComment}>
          Comments{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            className="bi bi-chat-heart"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
            />
          </svg>{" "}
        </button>
        <div>
          {show ? (
            <>
              {isSuccess ? (
                commentsItinerary?.map((c) => {
                  return (
                    <div className="comment-container" key={c._id}>
                      <div className="side-comment"></div>
                      <div className="entercomment">
                        <div className="comment-avatar">
                          <img src={c.user.photo} alt={c.user.name} />
                          <h5>{c.user.name}</h5>
                          <p>{c.user.role}</p>
                        </div>
                        <div className="comment-form">
                          <p>{c.comment}</p>

                          <p>{c.itinerary}</p>

                          {loginStateRedux ? (
                            <div className="button-box-c">
                              <button className="button-comment-bottom">
                                Edit
                              </button>
                              <button
                                id={c._id}
                                className="button-comment-bottom"
                              >
                                Detele
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No Comments Yet</p>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Comments;
