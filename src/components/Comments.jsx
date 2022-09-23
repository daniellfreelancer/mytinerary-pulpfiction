import React, { useEffect, useState } from "react";
import { useGetCommentByUserQuery, useGetCommentsItineraryMutation, useUpdateCommentsMutation } from "../features/commentAPI";
import { useDispatch, useSelector } from "react-redux";
import { setStateLogin } from "../features/stateLocalStorage";
import { useDeleteCommentsMutation } from "../features/commentAPI";
import swal from 'sweetalert2'
import { useRef } from "react";

function Comments(props) {
  let idItinerary = props.id;
  let reload = props.reload
  

  //const { data: comments, isSuccess } = useGetCommentsQuery(idItinerary);

  //let commentsItinerary = comments?.response;


  const [show, setShow] = useState(false);

  const userLoggin = useSelector((state) => state.auth)
  
  const {data: commentsByUser, isError} = useGetCommentByUserQuery(userLoggin.id)
  const myComments = commentsByUser?.response

  const [deleteComment] = useDeleteCommentsMutation()

  // const dispatch = useDispatch();
  // if (JSON.parse(localStorage.getItem("token"))) {
  //   dispatch(setStateLogin(true));
  // } else {
  //   dispatch(setStateLogin(false));
  // }
const [ getCommentsByTinerary] = useGetCommentsItineraryMutation()
  
  const [commentsItinerary, setMyCommentsItinerary] = useState(null)

 
  useEffect(() => {
    getAllCommentsBYTineraries()
  }, [reload])



  async function getAllCommentsBYTineraries(){
  

      let res = await getCommentsByTinerary(idItinerary)

      if(res.data?.response) {
        setMyCommentsItinerary(res.data?.response)
      } else {
        setMyCommentsItinerary(null)
      }
      


  }

  function showComment() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  function handleDeleteComment(e) {
    deleteComment(e.target.id)
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "error",
          })
        } else {
          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          swal.fire({
            title: "Success! ",
            text: dataSuccess,
            icon: "success",
          });
          reload()
        }
      })
      .catch((error)=> console.log(error))
  }

  let commentField = useRef()
  const [editMyComment] = useUpdateCommentsMutation()

const [edit, setEdit] = useState(false)

const handleUpdateComment = (e) => {
  e.preventDefault();
  let idComment = e.target.id;

  let commmentUpdate = {
    id: idComment,
    comment: commentField.current.value,
  }

  editMyComment(commmentUpdate)
  .then((res) => {
      if (res.error) {
        let dataError = res.error;
        let dataMessage = dataError.data;
        swal.fire({
          title: "Error!",
          text: dataMessage.message,
          icon: "error",
        });
      } else {
        let dataResponse = res.data;
        let dataSuccess = dataResponse.message;
        swal.fire({
          title: "Success! ",
          text: dataSuccess,
          icon: "success",
        });
      }
    })
    .catch((error) => console.log(error));

  setEdit(false);
  reload();
};



function handleUpdateEditButton(){
  setEdit(true)
}



  return (
    <div className="comment-box">
      <div className="Comment-div">
        <button className="Comment-button" onClick={showComment}>
          Display Comments{" "}
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
              {commentsItinerary ? (
                commentsItinerary.map((c) => {
                  return (
                    <div className="comment-container" key={c._id}>
                      <div className="entercomment">
                        <div className="comment-avatar">
                          <img src={c.user.photo} alt={c.user.name} />
                          <h5>{c.user.name}</h5>
                          {
                            userLoggin.role === "admin" ? (
                                <p>{c.user.role}</p>
                            ) : <p>✈️</p>
                          }
                          
                        </div>
                        <div className="comment-form">
                          {
                            !edit ? <p>{c.comment}</p> : (
                              <form id={c._id} className="comment-form"  onSubmit={handleUpdateComment}>
                              <label htmlFor="comment-message">
                                <input
                                  id="comment-message"
                                  type="text"
                                  placeholder="edit your comment..."
                                  ref={commentField}
                                  defaultValue={c.comment}
                                />
                              </label>
                              <input  className="submit-comment" type="submit" value="Submit" />
                            </form>
                            )
                          }
                          

                          {userLoggin.id.toString() === c.user._id.toString() ? (
                            <div className="button-box-c">
                              {
                                !edit ? (
                                  <button onClick={handleUpdateEditButton} className="button-comment-bottom">
                                  Edit
                                </button>
                                ) : null
                              }

                              <button
                                onClick={handleDeleteComment}
                                id={c._id}
                                className="button-comment-bottom"
                              >
                                Delete
                              </button>
                            </div>
                          ) : null}
                          {userLoggin.role === "admin" &&
                          JSON.parse(localStorage.getItem("token")) && (userLoggin.id.toString() !== c.user._id.toString()) ? (
                            <button
                              onClick={handleDeleteComment}
                              id={c._id}
                              className="button-comment-bottom"
                            >
                              Delete
                            </button>
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
