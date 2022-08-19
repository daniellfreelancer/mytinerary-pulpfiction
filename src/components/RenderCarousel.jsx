import React from 'react'
import Carousel from './Carousel'

const RenderCarousel = () => {
    const itineraries = [
        {id: 1,
            img: "https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffea8ca4f41207f3605182/previews/62ffea8da4f41207f3605194/download/cambodia.png",
        city: 'Cambodia'},
        {id: 2,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed3ec4e5b96b2a7331ce/previews/62ffed40c4e5b96b2a733213/download/baliTemple.png',
        city: 'Bali'},
        {id: 3,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed41e6fefd1ea94c21ac/previews/62ffed42e6fefd1ea94c21c6/download/boraBora.png',
        city: 'Bora Bora Island'},
        {id: 4,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed4347a9264ea7483974/previews/62ffed4447a9264ea74839a1/download/canaimaBolivar.png',
        city: 'Bolívar'},
        {id: 5,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed458c3d97622e640659/previews/62ffed468c3d97622e6406e2/download/japanHonshuIsland.png',
        city: 'Honshu Island'},
        {id: 6,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed4735587376e250a3b7/previews/62ffed4935587376e250a3cb/download/maldives.png',
        city: 'Maldives Islands'},
        {id: 7,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed4abffbfe02664a5a59/previews/62ffed4bbffbfe02664a5a86/download/peritoMorenoCalafate.png',
        city: 'Calafate'},
        {id: 8,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed4e78032388ee20719e/previews/62ffed4f78032388ee2071ad/download/sidney.png',
        city: 'Sydney'},
        {id: 9,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed5064d1975fad1be865/previews/62ffed5164d1975fad1be91b/download/tenochtitlan.png',
        city: 'Tenochtitlan'},
        {id: 10,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed5211b8c5538948fdb2/previews/62ffed5311b8c5538948fe5b/download/torresDelPaineMagallanesRegion.png',
        city: 'Magallanes Region'},
        {id: 11,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed554beeaa7785038b1c/previews/62ffed564beeaa7785038b5b/download/victoriaFallsZambia.png',
        city: 'Zambia'},
        {id: 12,
            img: 'https://trello.com/1/cards/62ffea84561ffc644b73fc40/attachments/62ffed4cacbfee5eaf8f0e01/previews/62ffed4dacbfee5eaf8f0eaa/download/salahCitadelCairoCity.png',
        city: 'Cairo City'},
    ]

  return (
    <>
        <h2>Popular MYtineraries</h2>
        <Carousel cities={itineraries} />
    </>
  )
}

export default RenderCarousel