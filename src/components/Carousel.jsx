import React, { useEffect, useState } from "react";
import "../styles/App.css";
import ButtonCarousel from "./ButtonCarousel";
import { Link as LinkTo } from 'react-router-dom'
import { useGetCarouselQuery } from '../features/citiesAPI'

function Carousel(props) {
  const range = props.range;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(start + range);
  const maxSlider = props.slides * range;
  const timeSlider = 5000;

  // Slider auto

  const [intervalID, setIntervalID] = useState();

  useEffect(() => {
    let id = setInterval(() => {
      previous();
    }, timeSlider);

    setIntervalID(id);

    return () => {
      clearInterval(intervalID);
    };
  }, [start]);

  //variables end y start

  function next() {
    if (start < maxSlider - range) {
      setStart(start + range);
      setEnd(end + range);
    } else {
      setStart(0);
      setEnd(range);
    }
    clearInterval(intervalID)
  }

  function previous() {
    if (start >= range) {
      setStart(start - range);
      setEnd(end - range);
    } else {
      setStart(maxSlider - range);
      setEnd(maxSlider);
    }
    clearInterval(intervalID)
  }

  const { data: cities } = useGetCarouselQuery()

  let carouselCities = cities?.response


  return (
    <div className="Slider-box">
      <ButtonCarousel icon={"<"} onClick={previous} />

      <div className="Slider-container">
        {carouselCities?.slice(start, end).map((e) => {
          return (
            <div className="Slider-div" key={e._id}>
              <LinkTo to={`/details/${e._id}`}><img src={e.photo} className="Slider-img" alt={e.city} /></LinkTo>
              <p className="Slider-p"> {e.city} </p>
            </div>
          );
        })}
      </div>
      <ButtonCarousel icon={">"} onClick={next} />
    </div>
  );
}

export default Carousel;
