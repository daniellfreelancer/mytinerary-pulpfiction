import React, { useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert2';
import { useTinerariesByIdQuery, usePatchItineraryMutation } from '../features/itineraryAPI';

function PatchMyTinerary() {
    const tineraryPhotoRef = useRef();
    const tineraryNameRef = useRef();
    const tineraryPriceRef = useRef();
    const tineraryDurationRef = useRef();
    const tineraryTagsRef = useRef();

    const { id } = useParams()

    const { data: myTinerary } = useTinerariesByIdQuery(id)

    let itineraryDetail = myTinerary?.response;


    const [editItinerary] = usePatchItineraryMutation()
    const goToCities = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        let editedTinerary = {
            name: tineraryNameRef.current.value,
            price: tineraryPriceRef.current.value,
            duration: tineraryDurationRef.current.value,
            tags: tineraryTagsRef.current.value,
            photo: tineraryPhotoRef.current.value,
            id: id,
        }

        await editItinerary(editedTinerary).then((res) => {
            console.log(res)
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
                let inputForm = document.querySelector("#form-patch-tinerary");
                inputForm.reset();
                setTimeout(()=>{
                    goToCities('/cities')
                },2500)
            }
        }).catch((error) => console.log(error))

    }
    const arrayFormItinerary = [
        {
            id: "_name",
            name: "Name",
            type: "text",
            value: tineraryNameRef,
            placeholder: itineraryDetail?.name,
        },
        {
            id: "_price",
            name: "Price",
            type: "number",
            value: tineraryPriceRef,
            placeholder: itineraryDetail?.price,
        },
        {
            id: "_duration",
            name: "Duration",
            type: "number",
            value: tineraryDurationRef,
            placeholder: itineraryDetail?.duration,
        },
        {
            id: "_tags",
            name: "Tags",
            type: "array",
            value: tineraryTagsRef,
            placeholder: itineraryDetail?.tags,
        },
        {
            id: "_photo",
            name: "Photo",
            type: "url",
            value: tineraryPhotoRef,
            placeholder: itineraryDetail?.photo,
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
                    defaultValue={e.placeholder}
                />
            </label>
        );
    };

    return (
        <form id="form-patch-tinerary" onSubmit={handleSubmit}>
            <div className="container-form" >

                <div className="form-new new-city" >
                    <h2>
                        You can now edit <strong>{itineraryDetail?.name}</strong> Tinerary!
                    </h2>
                    <p>Simply write down the information to update the tinerary!</p>
                    <div className='div-form-new-city'>
                        {arrayFormItinerary.map(formView)}
                    </div>
                    <input className="btn-form" type="submit" value="Submit" />
                </div>
            </div>
        </form>
    )
}

export default PatchMyTinerary