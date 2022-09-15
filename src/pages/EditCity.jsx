import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllCitiesQuery,
  useGetCityByIdQuery,
  useUpdateCityMutation,
} from "../features/citiesAPI";
import Layout from "../layouts/Layout";

function EditCity() {
  const cityPhotoRef = useRef();
  const cityNameRef = useRef();
  const countryNameRef = useRef();
  const detailsRef = useRef();
  const populationRef = useRef();
  const fundationRef = useRef();
  const featuredLocationRef = useRef();
  const smallDetailsRef = useRef();

  const { id } = useParams();
  const { data: cities } = useGetCityByIdQuery(id);
  let cityDetail = cities?.response;
  let idCity = id;
  const [editCity] = useUpdateCityMutation();

  const handleSubmit = async (e) => {
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
      id: idCity,
    };


    await editCity(newCity);
    let inputForm = document.querySelector("#form-new-cities");
    inputForm.reset();
  };

  const arrayForm = [
    {
      id: "_country",
      name: "Country",
      type: "text",
      value: countryNameRef,
      placeholder: cityDetail?.country,
    },
    {
      id: "_city",
      name: "City",
      type: "text",
      value: cityNameRef,
      placeholder: cityDetail?.city,
    },
    {
      id: "_fundation",
      name: "Fundation",
      type: "date",
      value: fundationRef,
      placeholder: cityDetail?.fundation,
    },
    {
      id: "_photo",
      name: "Photo",
      type: "text",
      value: cityPhotoRef,
      placeholder: cityDetail?.photo,
    },
    {
      id: "_population",
      name: "Population",
      type: "number",
      value: populationRef,
      placeholder: cityDetail?.population,
    },
    {
      id: "_description",
      name: "Description",
      type: "text",
      value: detailsRef,
      placeholder: cityDetail?.description,
    },
    {
      id: "_smallDescription",
      name: "Small Description",
      type: "text",
      value: smallDetailsRef,
      placeholder: cityDetail?.smalldescription,
    },
    {
      id: "_feature",
      name: "Featured Location",
      type: "text",
      value: featuredLocationRef,
      placeholder: cityDetail?.featuredLocation,
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
          placeholder={e.placeholder}
        />
      </label>
    );
  };

  return (
    <Layout>
      <form id="form-new-cities" onSubmit={handleSubmit}>
        <fieldset>
          <p>
            You can now edit <strong>{cityDetail?.city}</strong> city!
          </p>
          <p>Simply write down the information to update the city!</p>

          {arrayForm.map(formView)}

          <input className="input-submit" type="submit" value="Submit" />
        </fieldset>
      </form>

      <div>{}</div>
    </Layout>
  );
}

export default EditCity;
