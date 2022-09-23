import React, { useRef, useState } from "react";
import { useGetAllCitiesQuery } from "../features/citiesAPI";
import {
  useAllTinerariesAdminQuery,
  useCreateItineraryMutation,
  useGetTinerariesQuery,
} from "../features/itineraryAPI";
import ActivityItinerary from "./ActivityItinerary";
import { useSelector, useDispatch } from "react-redux";
import { setStateLogin } from "../features/stateLocalStorage";
import swal from "sweetalert2";
import { useEditMyProfileMutation, useSignUpUserMutation } from "../features/userAPI";
import { useCreateActivityMutation } from "../features/activityAPI";

function Profile() {
  const userLoggin = useSelector((state) => state.auth);

  const { data: myOwnItineraries } = useGetTinerariesQuery(userLoggin.id);
  const { data: tinerariesForAdmin } = useAllTinerariesAdminQuery();
  const [addNewActivity] = useCreateActivityMutation();
  const [updateMyProfile] = useEditMyProfileMutation()

  let getTinerariesByAdmin = tinerariesForAdmin?.response;
  let ownTineraries = myOwnItineraries?.response;

  const [cityId, setCityId] = useState({
    id: "",
    value: "",
  });

  const [ownTineraryID, setOwnTineraryID] = useState({
    id: "",
    value: "",
  });

  const [tinerariesAdmin, setTinerariesAdmin] = useState({
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
  const formUpdate = (e) => {
    return (
      <label key={e.id}>
        Enter {e.name}: <br />
        <input className="btn-form" type={e.type} name={e.name} ref={e.value} defaultValue={e.value} />
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

  const arrayRole = [
    {
      id: "admin",
      value: "admin",
    },
    {
      id: "user",
      value: "user",
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

          //Account has been created with success!!
          let signupForm = document.querySelector("#form-new-users");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showItineraryForm, setItineraryForm] = useState(false);
  const [showUserForm, setUserForm] = useState(false);
  const [showActivityForm, setshowActivityForm] = useState(false);
  const [showEditProf, setShowEditProf] = useState(false)

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

  function showEditProfClick() {

    if (showEditProf) {
      setShowEditProf(false);
    } else {
      setShowEditProf(true);
    }
    
  }

  const nameActivityRef = useRef();
  const photoActivityRef = useRef();

  const arrayActivity = [
    {
      id: "_name",
      name: "Name",
      type: "text",
      value: nameActivityRef,
    },
    {
      id: "_photo",
      name: "Photo",
      type: "url",
      value: photoActivityRef,
    },
  ];

  const handleSelectTinerary = (e) => {
    e.preventDefault();
    setOwnTineraryID({
      value: e.target.value,
      id: e.target[e.target.selectedIndex].id,
    });
  };
  const handleSelectTinerarybyAdmin = (e) => {
    e.preventDefault();
    setTinerariesAdmin({
      value: e.target.value,
      id: e.target[e.target.selectedIndex].id,
    });
  };

  const handleSubmitNewActivity = (e) => {
    e.preventDefault();
    let newActivity = {
      name: nameActivityRef.current.value,
      photo: photoActivityRef.current.value,
      itinerary: ownTineraryID.id,
    };
    addNewActivity(newActivity)
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
            title: "Great! ",
            text: dataSuccess,
            icon: "success",
          });

          let signupForm = document.querySelector("#form-new-activity");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitNewActivityAdmin = (e) => {
    e.preventDefault();
    let newActivity = {
      name: nameActivityRef.current.value,
      photo: photoActivityRef.current.value,
      itinerary: tinerariesAdmin.id,
    };
    addNewActivity(newActivity)
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
            title: "Great! ",
            text: dataSuccess,
            icon: "success",
          });

          let signupForm = document.querySelector("#form-new-activity");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nameProfRef = useRef()
  const lastNameProfRef = useRef()
  const countryProfRef = useRef()
  const photoProfRef = useRef()

  const arrayEditProf = [
    {
      id: "_name",
      name: "Name",
      type: "text",
      value: nameProfRef,
      defaultValue: userLoggin.user
    },
    {
      id: "_lastName",
      name: "LastName",
      type: "text",
      value: lastNameProfRef,
      defaultValue: userLoggin.lastName
    },
    {
      id: "_country",
      name: "Country",
      type: "text",
      value: countryProfRef,
      defaultValue: userLoggin.country      
    },
    {
      id: "_photo",
      name: "Photo",
      type: "text",
      value: photoProfRef,
      defaultValue: userLoggin.photo
    },
  ];

  const handleSubmitUpdateProfile = (e) => {
    e.preventDefault()

    let profileUpdated = {
      name: nameProfRef.current.value,
      lastName: lastNameProfRef.current.value,
      country: countryProfRef.current.value,
      photo: photoProfRef.current.value,
      id: userLoggin.id
    }

    updateMyProfile(profileUpdated).then((res) =>{
      console.log(res)
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
          title: "Success! ",
          text: dataSuccess,
          icon: "success",
        });

        let signupForm = document.querySelector("#form-edit-prof");
        signupForm.reset();
      }
    } ).catch((error) =>{
      console.log(error)
    })
  }

  return (
    <>
      <div className="profile-card">
        <div className="prof-img">
          <img className="img-prof" src={userLoggin.photo} alt="profile-img" />
        </div>
        <div className="profile-data">
          <h2>
            {userLoggin.user} {userLoggin.lastName}{" "}
          </h2>
          <p>
            <strong>Account Email: </strong> {userLoggin.email}
          </p>
          <p>
            <strong>Account ID: </strong>
            {userLoggin.id}
          </p>
          <p>
            <strong>Account Type: </strong>
            {userLoggin.role}
          </p>
          <p>
            <strong>Account Country: </strong>
            {userLoggin.country}
          </p>
        </div>
        <div className="div-EditProf">
          <button onClick={showEditProfClick} className="Comment-button">Edit Profile</button>
          {showEditProf ? (
          <div>
            <form id="form-edit-prof" onSubmit={handleSubmitUpdateProfile}>
              <div className="container-form new-user">
                <div className="form-new">
                  <p>Edit your Info</p>
                  <div className="new-user-input">
                    {arrayEditProf.map((e)=>{
                      return (
                        <label key={e.id}>
                        Enter {e.name}: <br />
                        <input className="btn-form" type={e.type} name={e.name} ref={e.value} defaultValue={e.defaultValue} />
                      </label>
                      )
                    })}
                  </div>
                  <input className="btn-form" type="submit" value="Submit" />
                </div>
              </div>
            </form>
          </div>
          ) : null}
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

                    {arrayRole?.map((e) => {
                      return (
                        <option key={e.id} id={e.id} value={e.value}>
                          {e.value}
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
      {showActivityForm && userLoggin.role === "user" ? (
        <form id="form-new-activity" onSubmit={handleSubmitNewActivity}>
          <div className="container-form new-user">
            <div className="form-new">
              <select onChange={handleSelectTinerary} className="btn-form">
                <option>Select a Tinerary</option>

                {ownTineraries?.map((e) => {
                  return (
                    <option key={e._id} id={e._id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <div className="new-user-input">
                {arrayActivity?.map(formView)}
              </div>
              <input className="btn-form" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      ) : null}
      {showActivityForm && userLoggin.role === "admin" ? (
        <form id="form-new-activity" onSubmit={handleSubmitNewActivityAdmin}>
          <div className="container-form new-user">
            <div className="form-new">
              <select
                onChange={handleSelectTinerarybyAdmin}
                className="btn-form"
              >
                <option>Select a Tinerary</option>

                {getTinerariesByAdmin?.map((e) => {
                  return (
                    <option key={e._id} id={e._id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <div className="new-user-input">
                {arrayActivity?.map(formView)}
              </div>
              <input className="btn-form" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
}

export default Profile;
