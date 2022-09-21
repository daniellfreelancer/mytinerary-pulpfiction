import React, { useRef, useState } from "react";
import { useGetAllCitiesQuery } from "../features/citiesAPI";
import {
  useCreateItineraryMutation,
  useGetTinerariesQuery,
} from "../features/itineraryAPI";
import ActivityItinerary from "./ActivityItinerary";
import { useSelector, useDispatch } from "react-redux";
import { setStateLogin } from "../features/stateLocalStorage";
import swal from "sweetalert2";
import { useSignUpUserMutation } from "../features/userAPI";

function Profile() {
  const loginStateRedux = useSelector((state) => state.statesLocalStorage);
  const dispatch = useDispatch();

  let userLoggin;

  if (JSON.parse(localStorage.getItem("testUser"))) {
    userLoggin = JSON.parse(localStorage.getItem("testUser"));
    dispatch(setStateLogin(true));
  } else {
    dispatch(setStateLogin(false));
  }

  const { data: myOwnItineraries, isError } = useGetTinerariesQuery(
    userLoggin.id
  );
  let myOwnItinerariesDetail = myOwnItineraries?.response;

  const [cityId, setCityId] = useState({
    id: "",
    value: "",
  });

  const { data: cities } = useGetAllCitiesQuery("");

  let allMyCities = cities?.response;

  const handleSelectCity = (e) => {
    e.preventDefault();
    setCityId({
      value: e.target.value,
      id: e.target[e.target.selectedIndex].id,
    });
  };
  // Create New Itinerary
  const [createNewItinerary] = useCreateItineraryMutation();

  const nameItineraryRef = useRef();
  const priceItineraryRef = useRef();
  const durationItineraryRef = useRef();
  const photoItineraryRef = useRef();
  const likesItineraryRef = useRef();
  const tagsItineraryRef = useRef();

  const arrayLikes = [];
  const arrayTags = [];

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
    },
  ];

  const formView = (e) => {
    return (
      <label key={e.id}>
        Enter {e.name}: <br />
        <input className="btn-form" type={e.type} name={e.name} ref={e.value} />
      </label>
    );
  };

  const [addNewUserFromAdmin] = useSignUpUserMutation();
  const nameUserRef = useRef();
  const photoUserRef = useRef();
  const passwordUserRef = useRef();
  const emailUserRef = useRef();
  const countryUserRef = useRef();
  const lastNameUserRef = useRef();
  const arrayFormNewUser = [
    {
      id: "_name",
      name: "Name",
      type: "text",
      value: nameUserRef,
    },
    {
      id: "_lastName",
      name: "LastName",
      type: "text",
      value: lastNameUserRef,
    },
    {
      id: "_country",
      name: "Country",
      type: "text",
      value: countryUserRef,
    },
    {
      id: "_photo",
      name: "Photo",
      type: "text",
      value: photoUserRef,
    },

    {
      id: "_email",
      name: "Email",
      type: "email",
      value: emailUserRef,
    },
    {
      id: "_password",
      name: "Password",
      type: "password",
      value: passwordUserRef,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    arrayLikes.push(likesItineraryRef.current.value);
    arrayTags.push(tagsItineraryRef.current.value);

    let newitinerary = {
      name: nameItineraryRef.current.value,
      user: userLoggin.id,
      city: cityId.id,
      price: priceItineraryRef.current.value,
      duration: durationItineraryRef.current.value,
      likes: arrayLikes,
      tags: arrayTags,
      photo: photoItineraryRef.current.value,
    };

    createNewItinerary(newitinerary)
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

          let signupForm = document.querySelector("#form-new-users");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [newAdminUser, setNewAdminUser] = useState([
    {
      id: "_admin",
      value: "admin",
      name: "Admin",
    },
    {
      id: "_user",
      value: "user",
      name: "User",
    },
  ]);

  const [selectedRole, setSelectedRole] = useState({
    id: "",
    value: "",
  });

  const handleSelectRole = (e) => {
    e.preventDefault();
    setSelectedRole({
      value: e.target.value,
      id: e.target[e.target.selectedIndex].id,
    });
  };

  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    let newUserFromAdmin = {
      name: nameUserRef.current.value,
      lastName: lastNameUserRef.current.value,
      country: countryUserRef.current.value,
      photo: photoUserRef.current.value,
      pass: passwordUserRef.current.value,
      role: selectedRole.value,
      email: emailUserRef.current.value,
      from: "form",
    };
    addNewUserFromAdmin(newUserFromAdmin)
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "warning",
          });
        } else {
          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          swal.fire({
            title: "Welcome! ",
            text: dataSuccess,
            icon: "success",
          });

          //Account has been create with success!!
          let signupForm = document.querySelector("#form-new-users");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let firstLetterUserName = userLoggin.name.charAt(0).toUpperCase();
  let afterfirstLetterUserName = userLoggin.name.substring(
    1,
    userLoggin.name.length
  );
  let userNameWithUpperCase = firstLetterUserName.concat(
    afterfirstLetterUserName
  );

  const [showItineraryForm, setItineraryForm] = useState(false);
  const [showUserForm, setUserForm] = useState(false);
  const [showActivityForm, setshowActivityForm] = useState(false);

  function showNewItinerarry() {
    if (showItineraryForm) {
      setItineraryForm(false);
    } else {
      setItineraryForm(true);
    }
  }

  function showNewUser() {
    if (showUserForm) {
      setUserForm(false);
    } else {
      setUserForm(true);
    }
  }
  function showNewActivity() {
    if (showActivityForm) {
      setshowActivityForm(false);
    } else {
      setshowActivityForm(true);
    }
  }

  return (
    <>
      <div className="profile-card">
        <div className="prof-img">
          <img className='img-prof' src={userLoggin.photo} alt="profile-img" />
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
          {loginStateRedux ? <p>True</p> : <p>False</p>}
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
      </div>

      <div className="profile-card profile-creation">
        <button className="Comment-button" onClick={showNewItinerarry}>
          <p>Add New Itinerary</p>
        </button>
        {showItineraryForm ? (
          <form id="form-new-users" onSubmit={handleSubmit}>
            <div className="container-form new-user">
              <div className="form-new">
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
        ) : null}
      </div>

      {userLoggin.role === "admin" ? (
        <div className="profile-card profile-creation">
          <button className="Comment-button" onClick={showNewUser}>
            <p>Add New User / Admin</p>
          </button>

          {showUserForm ? (
            <form id="form-new-users" onSubmit={handleSubmitNewUser}>
              <div className="container-form new-user">
                <div className="form-new">
                  <select onChange={handleSelectRole} className="btn-form">
                    <option>Select a Role</option>

                    {newAdminUser.map((role) => {
                      return (
                        <option key={role.id} id={role.id} value={role.value}>
                          {role.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="new-user-input">
                    {arrayFormNewUser.map(formView)}
                  </div>
                  <input className="btn-form" type="submit" value="Submit" />
                </div>
              </div>
            </form>
          ) : null}
        </div>
      ) : null}

      <div className="profile-card profile-creation">
        <button className="Comment-button" onClick={showNewActivity}>
          <p>Add New Activity</p>
        </button>
      </div>
    </>
  );
}

export default Profile;
