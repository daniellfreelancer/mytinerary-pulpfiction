import React, { useRef } from "react";
import { useCreateCommentsMutation } from "../features/commentAPI";
import swal from 'sweetalert2'

function EnterComment(props) {
  const commentField = useRef();

  let userID = props.userID;
  let photoID = props.userPhoto;
  let itineraryID = props.itineraryID;
  let userRole = props.userRole;
  let userName = props.userName;

  const [createNewComment] = useCreateCommentsMutation()

  function handleNewComment(e){
    e.preventDefault()
    let newComment = {
        user:userID,
        itinerary:itineraryID,
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

  return (
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
  );
}

export default EnterComment;
