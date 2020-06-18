import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'

const LinkOfComma = function({ data, prefixRoute }) {
  return (
    <>
      { data.map( (item, index) => (
          <Fragment key={item.id}>
              {index > 0 && ', '}
              <Link to={`${prefixRoute}${item.id}`}>{item.name}</Link>
          </Fragment>
        )
      )}
    </>
  )
}

LinkOfComma.propTypes = {
  data: PropsTypes.arrayOf(PropsTypes.shape({
    id: PropsTypes.number.isRequired,
    name: PropsTypes.string.isRequired
  })).isRequired,
  prefixRoute: PropsTypes.string.isRequired
}


export default LinkOfComma