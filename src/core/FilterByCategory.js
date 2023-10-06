import React, { useState } from 'react'

const FilterByCategory = ({ categories, handleFilters }) => {

    const [checked] = useState(new Set())

    const handleCategory = (category) => {
        if(checked.has(category._id)) checked.delete(category._id)
        else checked.add(category._id)

        handleFilters(Array.from(checked))
    }
  return (
    <div>
        <ul>
            {categories && categories.map((category, i) => (
                <li key={i} className='list-unstyled my-3'>
                    <input onClick={() => handleCategory(category)} value={category._id} type='checkbox' id={i} className='form-check-input' />
                    <label htmlFor={i} className='form-check-label'> {category.name} </label>
                </li>
            ))}
            
        </ul>
      
    </div>
  )
}

export default FilterByCategory
