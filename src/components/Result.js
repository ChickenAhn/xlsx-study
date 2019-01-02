import React from 'react'
// import PropTypes from 'prop-types'

function Result(props) {
  const { data } = props
  return <div>{data && JSON.stringify(data)}</div>
}

// Result.propTypes = {}

export default Result
