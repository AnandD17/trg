import React from 'react'
import Sel from 'react-select';
import { Option } from 'antd/lib/mentions';
import './Select.scss'

const Select = (props) => {
    const {
        className,
        options,
        labelClassName,
        selectClassName,
        label,
        onChange,
        name,
        value
    } = props;  

    const customStyles = {
        input:()=>({
            // padding:'1px'
        })
    }
  return (
    <div className={`custom-select w-full flex flex-col gap-2.5 ${className}`}>
        <label className={`text-base ${labelClassName}`} htmlFor="">{label}</label>
        <Sel
            className={`text-sm p-2 outline-0 ${selectClassName}`}
            options={options}
            onChange={(p,e)=>{
                onChange({...p,name:e.name})
            }}
            name={name}
        />
    </div>
  )
}

export default Select