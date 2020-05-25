import React from 'react'

import ComponentHeader from '../Header.jsx'
import ComponentUICardsUserImage from '../../../components/UI/Cards/UserImage/UserImage'

export default function Authors() {
  return (
    <div>
      <section className="card card-auto-rows">
        <ComponentHeader />

        <ComponentUICardsUserImage
          prefixRoute="/users/"
          data={{
            id: 1,
            name: "Vai te fude",
            photo_url: "https://i.picsum.photos/id/237/320/320.jpg",
            description: ""
          }}
        />


      </section>
    </div>
  )
}
