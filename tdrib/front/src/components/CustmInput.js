import React from 'react'

const CustmInput = (props) => {
    const {type, name,placeholder, classname, value,onChange, onBlur}=props
  return (
    <div>
        <div>
                  <input type={type}
                   name={name}
                    placeholder={placeholder} 
                    className={`form-control ${classname}`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} />
                </div>
    </div>
  )
}

export default CustmInput