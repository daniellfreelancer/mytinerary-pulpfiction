import { React, useState } from "react";
import "../styles/App.css";

function NewCityForm() {
    const [inputs, setInputs] = useState({});

    const handleChange = (newcity) => {
        const name = newcity.target.name;
        const value = newcity.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <h2>You can enter a new city!</h2>
                <p>Simply fill in the blanks and let us know about where you´d like to travel!</p>
                <label>
                    Enter the Country: <br />
                    <input
                        className="input-text"
                        type="text"
                        name="country"
                        value={inputs.country || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Enter a New City: <br />
                    <input
                        className="input-text"
                        type="text"
                        name="cityname"
                        value={inputs.cityname || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Any special location in said city: <br />
                    <input
                        className="input-text"
                        type="text"
                        name="place"
                        value={inputs.place || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Add a Photo: <br />
                    <input
                        className="input-text"
                        type="text"
                        name="photo"
                        value={inputs.photo || ""}
                        onChange={handleChange}
                    />
                </label>
                <input className="input-submit" type="submit" />
            </fieldset>
        </form>
    );
}
export default NewCityForm;
