//import axios from "axios";
import { React, useRef, useState } from "react";
import "../styles/App.css";
import { useCreateCityMutation } from "../features/citiesAPI";
import AlertComponent from "./AlertComponent";
import swal from 'sweetalert2'

function NewCityForm() {
  const cityPhotoRef = useRef();
  const cityNameRef = useRef();
  const countryNameRef = useRef();
  const detailsRef = useRef();
  const populationRef = useRef();
  const fundationRef = useRef();
  const featuredLocationRef = useRef();
  const smallDetailsRef = useRef();

  const [addNewCity, isError, isSuccess, error] = useCreateCityMutation();

  // states
  const [modalOpen, setModalOpen] = useState(false);
  const [messageError, setMessageError] = useState("")
  const [messageTittle, setMessageTittle] = useState("")
  const [iconSVG, setIconSVG] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();

    let newCity = {
      city: cityNameRef.current.value,
      country: countryNameRef.current.value,
      photo: cityPhotoRef.current.value,
      population: populationRef.current.value,
      fundation: fundationRef.current.value,
      featuredLocation: featuredLocationRef.current.value,
      description: detailsRef.current.value,
      smalldescription: smallDetailsRef.current.value,
    };

    addNewCity(newCity)
      .then((res) =>{
        
        if (res.error){

        let dataError = res.error
        let dataMessage = dataError.data
        //alert(dataMessage.message)
        swal.fire({
          title: "Error!",
          text: dataMessage.message,
          icon: "error",
        });
      //   setModalOpen(true)
      //   setMessageError(dataMessage.message)
      //   setMessageTittle("Error")
      //   setIconSVG(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
      //   <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      // </svg>)

        } else {

          let dataResponse = res.data
          let dataSuccess = dataResponse.message
          swal.fire({
            title: "Success! ",
            text: dataSuccess,
            icon: "success",
          });
      //    setModalOpen(true)
      //    setMessageError(dataSuccess)
      //    setMessageTittle("Success")
      //    setIconSVG(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
      //    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
      //  </svg>)
          //alert(dataSuccess)
          let inputForm = document.querySelector("#form-new-cities");
          inputForm.reset();

        }
        
      } )
      .catch((error) => {
        console.log(error);
      });


  };




  const arrayForm = [
    {
      id: "_country",
      name: "Country",
      type: "text",
      value: countryNameRef,
    },
    {
      id: "_city",
      name: "City",
      type: "text",
      value: cityNameRef,
    },
    {
      id: "_fundation",
      name: "Fundation",
      type: "date",
      value: fundationRef,
    },
    {
      id: "_photo",
      name: "Photo",
      type: "text",
      value: cityPhotoRef,
    },
    {
      id: "_population",
      name: "Population",
      type: "number",
      value: populationRef,
    },
    {
      id: "_description",
      name: "Description",
      type: "text",
      value: detailsRef,
    },
    {
      id: "_smallDescription",
      name: "Small Description",
      type: "text",
      value: smallDetailsRef,
    },
    {
      id: "_feature",
      name: "Featured Location",
      type: "text",
      value: featuredLocationRef,
    },
  ];

  const formView = (e) => {
    return (
      <label key={e.id}>
        Enter the {e.name}: <br />
        <input
          className="btn-form"
          type={e.type}
          name={e.name}
          ref={e.value}
        />
      </label>
    );
  };

  

  return (
    <>
    <form id="form-new-users" onSubmit={handleSubmit}>

      <div className="container-form">
        <div className="form-new new-city" >
        <h2>You can enter a new city!</h2>
        <p>
          Simply fill in the blanks and let us know about where you'd like to
          travel!
        </p>
        <div className='div-form-new-city'>
        {arrayForm.map(formView)}
        </div>
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
    </>
  );
}
export default NewCityForm;
