import React, { useRef, useState } from "react";
import { useCreateCommentsMutation } from "../features/commentAPI";
import swal from 'sweetalert2'

function EnterComment(props) {
  const commentField = useRef();

  let userID = props.userID;
  let photoID = props.userPhoto;
  let itineraryID = props.itineraryID;
  let userRole = props.userRole;
  let userName = props.userName;
  const [show, setShow] = useState(false);
  const [createNewComment] = useCreateCommentsMutation()

  function handleNewComment(e) {
    e.preventDefault()
    let newComment = {
      user: userID,
      itinerary: itineraryID,
      comment: commentField.current.value
    }

    createNewComment(newComment)
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

          let signupForm = document.querySelector("#formNewComment");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function showComment() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <>
      <div className="comment-box">
        <div className="Comment-div">
          <button className="Comment-button" onClick={showComment}>
            Write Comments{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
          <div>
            {show ? (
              <>
                <div className="commentform-container">
                  <div className="entercomment">
                    <div className="comment-avatar">
                      <img src={photoID} alt={userName} />
                      <h5>{userName}</h5>
                      <p>{userRole}</p>
                    </div>
                    <form id="formNewComment" className="comment-form">
                      <label htmlFor="comment-message">
                        <input
                          id="comment-message"
                          type="text"
                          placeholder="Enter your comment..."
                          ref={commentField}
                        />
                      </label>
                      <input onClick={handleNewComment} className="submit-comment" type="submit" value="Submit" />
                    </form>
                  </div>
                </div>

              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterComment;
