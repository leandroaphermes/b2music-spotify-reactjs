import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../../services/Api'

import ComponentHeader from '../Header.jsx'
import ComponentUICardsUserImage from '../../../components/UI/Cards/UserImage/UserImage'

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const history = useHistory()

  useEffect(() => {
    
    api.get("/me/authors",{
      validateStatus: (status) => status === 200
    })
    .then( (response) => {

      setAuthors(response.data)

    })
    .catch( dataError => {
      console.log(dataError)
      history.push("/internal-error")
    })

    
  }, [history])

  return (
    <div>
      <section className="card card-auto-rows">
        <ComponentHeader />

        {authors.map( author => 
          <ComponentUICardsUserImage
            key={author.id}
            prefixRoute="/author/"
            data={{
              id: author.author.id,
              name: author.author.name,
              photo_url: author.author.photo_url,
              description: "Author"
            }}
          />
        )}

      </section>
    </div>
  )
}
