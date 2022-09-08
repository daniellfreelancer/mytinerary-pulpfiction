import Carousel from './Carousel'


const RenderCarousel = () => {

  return (
    <div className='Render-div' >
      <div className='Render-div-title'>
        <h2 className='Carousel-title' >Popular Cities</h2>
      </div>
      <Carousel slides={3} range={4} />
    </div>
  )
}

export default RenderCarousel