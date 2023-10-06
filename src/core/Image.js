import React from 'react'
import { API_URL } from '../config'

const Image = ({item, url, className, imgZise}) => {
  return (
    <div>
      <img className={className} src={`${API_URL}${url}/${item._id}`} alt={`${item.name}`} width={imgZise} />
    </div>
  )
}

export default Image
