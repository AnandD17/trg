import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from './../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from './../../../components/Card/Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as apiProvider from '../../../services/api/recruitment'
import { useEffect } from 'react'


const Create = () => {

  const navigate = useNavigate()

  const [profileOpt, setProfileOpt] = useState([])
  const [bussinessOpt, setBussinessOpt] = useState([])
  const [countryOpt, setCountryOpt] = useState([])
  const [stateOpt, setStateOpt] = useState([])
  const [cityOpt, setCityOpt] = useState([])
  
  const [user, setUser] = useState({
    profile:'',
    bussiness:'',
    openings:'',
    country:'',
    state:'',
    city:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handelChangeSelect = (e) => {
    const {name, value} = e;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit =()=>{
    apiProvider.createJob({user})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  

  const getBasicData = async() => {
    const [data1, data2, data3, data4, data5] = await Promise.all([
      apiProvider.getProfile()
      .then(res=>{
        const arr = res.data?.map(i=>({
          label:i?.name,
          value:i?._id
        }))
        return arr;
      })
      .catch(err=>(console.log(err)))
      ,
      apiProvider.getBusiness()
      .then(res=>{
        const arr = res.data?.map(i=>({
          label:i?.name,
          value:i?._id
        }))
        return arr;
      })
      .catch(err=>(console.log(err)))
      ,
      apiProvider.getCountry()
      .then(res=>{
        const arr = res.data?.map(i=>({
          label:i?.name,
          value:i?._id
        }))
        return arr;
      })
      .catch(err=>(console.log(err)))
      ,
      apiProvider.getState()
      .then(res=>{
        const arr = res.data?.map(i=>({
          label:i?.title,
          value:i?._id
        }))
        return arr;
      })
      .catch(err=>(console.log(err)))
      ,
      apiProvider.getCity()
      .then(res=>{
        const arr = res.data?.map(i=>({
          label:i?.name,
          value:i?._id
        }))
        return arr;
      })
      .catch(err=>(console.log(err)))
    ])

    setProfileOpt(data1);
    setBussinessOpt(data2)
    setCityOpt(data3)
    setStateOpt(data4)
    setCityOpt(data5)
  }

  useEffect(()=>{
    getBasicData()
  },[])
  

  
  return (
    <div className='flex w-full relative min-h-[80vh]'>
    <div className=' h-auto w-full flex'>
      <Card className='min-h-full h-full w-full relative px-6 flex flex-col'>
        <BackButton onClick={()=>navigate(-1)}/>
        <div className=''>
          <h3 className='text-Medium+/Title/Small mt-2'> Create New Job</h3>
          <hr className='my-3 h-3' />
          <div className='grid grid-cols-12 gap-4'>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="Profile"
                name='profile'
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="Bussiness"
                name="bussiness"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Input
                label="Number of Openings"
                name="openings"
                value={user?.openings}
                onChange={handleChange}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="Country"
                name="country"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="State"
                name="state"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="City"
                name="city"
                onChange={handelChangeSelect}
              />
            </div>
          </div>
        </div>
        <div className='mt-auto flex gap-3 py-3'>
          <Button title="Submit" onClick={()=>handleSubmit()} className=' ' />
          <Button type='2' title="Cancel" className='' />
        </div>
        
      </Card>

    </div>
    </div>
  )
}

export default Create