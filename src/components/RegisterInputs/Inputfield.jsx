import React from "react";

import { Input } from "antd";

const Inputfield = ({prefix,type,placeholder,label,value,onChange, className, classNameInput, name}) => {
    return (
        <>
            <div className={`font-medium text-lg leading-[1.5rem] capitalize mt-[2.4rem] mb-[4px] ${className}`}>{label}</div>

            <Input type={type || 'text'} 
            value={value} 
            placeholder={placeholder} 
            onChange={onChange}
            name={name}
            prefix={<div className='text-base mr-[0.75rem]'>{prefix}</div>} 
            size="large" 
            className={`bg-[#f8f8f8] ${classNameInput}`} 
            />
            
        </>
    )
}

export default Inputfield
