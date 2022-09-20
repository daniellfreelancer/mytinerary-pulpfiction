import React, { useRef, useState } from 'react'
import { useGetAllCitiesQuery } from '../features/citiesAPI';
import { useCreateItineraryMutation, useGetTinerariesQuery } from '../features/itineraryAPI';
import ActivityItinerary from './ActivityItinerary';
import AlertComponent from './AlertComponent';

function Profile() {


    let userLoggin

    if(localStorage.length > 0) {
        userLoggin =  JSON.parse(localStorage.getItem('testUser'))
    } 

    

    const { data: myOwnItineraries, isError } = useGetTinerariesQuery(userLoggin.id);
    let myOwnItinerariesDetail = myOwnItineraries?.response;
    
    const [cityId, setCityId] = useState({
        id: "",
        value: "",
      });



      const { data: cities } = useGetAllCitiesQuery("")

      let allMyCities = cities?.response
    
      const handleSelectCity = (e) => {
        e.preventDefault();
        setCityId({
          value: e.target.value,
          id: e.target[e.target.selectedIndex].id,
        });


      };

    //   Create itineraries
    const [modalOpen, setModalOpen] = useState(false);
    const [messageError, setMessageError] = useState("")
    const [messageTittle, setMessageTittle] = useState("")
    const [iconSVG, setIconSVG] = useState("")
    const [createNewItinerary] = useCreateItineraryMutation()

      const nameItineraryRef = useRef()
      const priceItineraryRef = useRef()
      const durationItineraryRef = useRef()
      const photoItineraryRef = useRef()
      const likesItineraryRef = useRef()
      const tagsItineraryRef = useRef()


      const arrayLikes = []
      const arrayTags = []

      const arrayForm = [
        {
            id: "_name",
            name: "Name",
            type: "text",
            value: nameItineraryRef,
        },
        {
            id: "_price",
            name: "Price",
            type: "number",
            value: priceItineraryRef,
        },
        {
            id: "_duration",
            name: "Duration",
            type: "number",
            value: durationItineraryRef,
        },
        {
            id: "_photo",
            name: "Photo",
            type: "text",
            value: photoItineraryRef,
        },
        {
            id: "_tags",
            name: "Tags",
            type: "text",
            value: tagsItineraryRef,
        },
        {
            id: "_Likes",
            name: "Likes",
            type: "number",
            value: likesItineraryRef,
        }

    ]

    const formView = (e) => {
        return (
            <label key={e.id}>
                Enter {e.name}: <br />
                <input
                    className="btn-form"
                    type={e.type}
                    name={e.name}
                    ref={e.value}
                />
            </label>
        );
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        arrayLikes.push(likesItineraryRef.current.value)
        arrayTags.push(tagsItineraryRef.current.value)

        let newitinerary = {
            name: nameItineraryRef.current.value,
            user: userLoggin.id,
            city: cityId.id,
            price: priceItineraryRef.current.value,
            duration: durationItineraryRef.current.value,
            likes: arrayLikes,
            tags: arrayTags,
            photo: photoItineraryRef.current.value
        };


        createNewItinerary(newitinerary)
            .then((res) => {
                if (res.error) {
                    let dataError = res.error
                    let dataMessage = dataError.data
                    setModalOpen(true)
                    setMessageError(dataMessage.message)
                    setMessageTittle("Error")
                    setIconSVG(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>)
                } else {
                    let dataResponse = res.data
                    let dataSuccess = dataResponse.message
                    setModalOpen(true)
                    setMessageError(dataSuccess)
                    setMessageTittle("Success")
                    setIconSVG(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                    </svg>)

                    let signupForm = document.querySelector("#form-new-users");
                    signupForm.reset();

                }

            })
            .catch((error) => {
                console.log(error)
            });

    };

    let firstLetterUserName = userLoggin.name.charAt(0).toUpperCase()

    let afterfirstLetterUserName = userLoggin.name.substring(1,userLoggin.name.length)
    let userNameWithUpperCase = firstLetterUserName.concat(afterfirstLetterUserName)


  return (
    <>
      <div className="profile-card">
        <div className="prof-img">
          <img src={userLoggin.photo} alt="profile-img" />
        </div>
        <div className="profile-data">
          <h2>{userNameWithUpperCase}</h2>
          <p>
            <strong>Email: </strong> {userLoggin.email}
          </p>
          <p>
            <strong>ID: </strong>
            {userLoggin.id}
          </p>
          <p>
            <strong>Role: </strong>
            {userLoggin.role}
          </p>
          <p>
            <strong>Country: </strong>
            {userLoggin.country}
          </p>
        </div>
      </div>
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

        {userLoggin.role == "admin" ? (
          <h2>You can add a new Itinerary</h2>
        ) : (
          <h2>You cant add new Itineraries</h2>
        )}


        {/*  */}
        <form id="form-new-users" onSubmit={handleSubmit} >
          <div className="container-form new-user">
            <div className="form-new">

              <p>Add New Itinerary</p>
              <select onChange={handleSelectCity} className="btn-form">
          <option>Select a city</option>

          {allMyCities?.map((city) => {
            return (
              <option key={city._id} id={city._id} value={city.city}>
                {city.city}
              </option>
            );
          })}
        </select>
              <div className="new-user-input">{arrayForm.map(formView)}</div>
              <input className="btn-form" type="submit" value="Submit" />
            </div>
          </div>
        </form>

        {modalOpen === true ? (
        <AlertComponent
          setOpenModal={setModalOpen}
          setMessageError={messageError}
          setMessageTittle={messageTittle}
          setIconSVG={iconSVG}
        />
      ) : null}


      </div>
    </>
  );
}

export default Profile