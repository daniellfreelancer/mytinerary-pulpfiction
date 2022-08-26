import { React, useState } from "react";
import "../styles/App.css";

function NewCityForm() {

    let arrayCities = []

    const [inputs, setInputs] = useState({});

    const handleChange = (newcity) => {
        const name = newcity.target.name;
        const value = newcity.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        arrayCities.push(inputs)
        console.log(arrayCities)
        let inputForm = document.querySelector("#form-new-cities")
        inputForm.reset()
    };

    const arrayForm = [
        {
            id:"_country",
            name: "Country",
            type: "text",
            value:""

        },
        {
            id:"_city",
            name: "City",
            type: "text",
            value:""

        },
        {
            id:"_fundation",
            name: "Fundation",
            type: "date",
            value:""

        },
        {
            id:"_photo",
            name: "Photo",
            type: "url",
            value:""

        },
        {
            id:"_population",
            name: "Population",
            type: "number",
            value:""

        }


    ]

    const formView = (e) => {
        return (
            <label key={e.id}>
            Enter the {e.name}: <br />
                <input
                    className="input-text"
                    type={e.type}
                    name={e.name}
                    value={inputs.value}
                    onChange={handleChange}
                />
            </label>
        )
    }

    return (
        <form id="form-new-cities" onSubmit={handleSubmit}>
            <fieldset>
                <h2>You can enter a new city!</h2>
                <p>Simply fill in the blanks and let us know about where you´d like to travel!</p>

                {
                    arrayForm.map(formView)
                }

                <input className="input-submit" type="submit" />
            </fieldset>
        </form>
    );
}
export default NewCityForm;