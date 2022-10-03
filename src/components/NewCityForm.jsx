import { React, useRef } from "react";
import "../styles/App.css";
import { useCreateCityMutation } from "../features/citiesAPI";
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

  const [addNewCity] = useCreateCityMutation();




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
        swal.fire({
          title: "Error!",
          text: dataMessage.message,
          icon: "error",
        });

        } else {

          let dataResponse = res.data
          let dataSuccess = dataResponse.message
          swal.fire({
            title: "Success! ",
            text: dataSuccess,
            icon: "success",
          });
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
    </>
  );
}
export default NewCityForm;
