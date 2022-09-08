//import axios from "axios";
import { React, useRef } from "react";
import "../styles/App.css";
import { useCreateCityMutation } from "../features/citiesAPI";

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

    console.log(newCity);

    addNewCity(newCity)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });

    let inputForm = document.querySelector("#form-new-cities");
    inputForm.reset();
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
          className="input-text"
          type={e.type}
          name={e.name}
          ref={e.value}
        />
      </label>
    );
  };

  return (
    <form id="form-new-cities" onSubmit={handleSubmit}>
      <fieldset>
        <h2>You can enter a new city!</h2>
        <p>
          Simply fill in the blanks and let us know about where you'd like to
          travel!
        </p>

        {arrayForm.map(formView)}

        <input className="input-submit" type="submit" value="Submit" />
      </fieldset>
    </form>
  );
}
export default NewCityForm;
