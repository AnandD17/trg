import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import Select from '../../../components/Select/Select'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import { ROUTES } from '../../../routes/RouterConfig'
import { useNavigate } from 'react-router-dom'
import {getColumnSearchProps} from './../../../helpers/TableSearch'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, Switch } from 'antd'

const State = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [user, setUser] = useState({
    country: '',
    name: ''
  })

  const [countryData, setCountryData] = useState([])

  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setUser(data.find(item => item._id === key[1]))

    } else {  // delete
      handleDelete(key[1])
    }
  };

  const columns = [
    {
      title: "State",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      },
      ...getColumnSearchProps('name')
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, { country }) => (<> {countryData.find(item => item.value === country)?.label} </>)
    },
    {
      title: "Status",
      dataIndex: "_id",
      render: (id) => (<Switch className='bg-[gray]' defaultChecked onChange={() => console.log(id)} />)
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id) => (<Dropdown
        className='cursor-pointer'
        menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
        trigger={['click']}
      >
        <BsThreeDots />
      </Dropdown>)
    }
  ];

  const [data, setData] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handelChangeSelect = (e) => {
    const { name, value } = e;
    console.log(e)
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getData = () => {
    // enterLoading(2)
    apiProvider.getState()
      .then(res => {
        if (res.isSuccess) {
          const arr = res.data
          setData(arr)
        }
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)

      })
  }

  const getAllData = async () => {
    // enterLoading(2)
    await apiProvider.getCountry()
      .then(res => {
        const arr = res.data?.map(i => ({
          label: i?.name,
          value: i?._id
        }))
        setCountryData(arr)
      })
      .catch(err => {
        console.log(err)
      })
    // exitLoading(2)
  }

  const handleSubmit = () => {

    enterLoading(1)
    return apiProvider.createState(user)
      .then(res => {
        exitLoading(1)
        if (res.isSuccess) {
          clearData()
          getData()
          return notify('success', 'added success');
        } else {
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)
        exitLoading(1)
        return notify('error', err.message);
      })
  }

  const handleEdit = () => {

    // enterLoading(1)
    return apiProvider.editState(user?._id, user)
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'added success');
        } else {
          setEdit(false)
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)

        return notify('error', err.message);
      })
  }

  const handleDelete = (id) => {
    return apiProvider.editState(id, { status: "DELETED" })
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'added success');
        } else {
          setEdit(false)
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)

        return notify('error', err.message);
      })
  }

  const clearData = () => {
    setUser({
      country: '',
      name: ''
    })
  }


  useEffect(() => {
    getAllData();
    getData();
  }, [])


  useEffect(() => {
    getData();
  }, [])

  const navigate = useNavigate();

  const changeRoute = (id) => {
    switch (id?.value) {
      case 'country':
        navigate(ROUTES.Recruitment.Master.Country);
        break;
      case 'city':
        navigate(ROUTES.Recruitment.Master.City);
        break;

    }
  }

  const selectData = [
    {
      label: 'Country',
      value: 'country'
    },
    {
      label: 'State',
      value: 'state'
    },
    {
      label: 'City',
      value: 'city'
    }
  ]

  return (
    <div>

      <Card className={'mb-[20px]'}>
        <Select
          className="w-[30%]"
          label="Select"
          options={selectData}
          name="Select"
          value={"state"}
          onChange={(e) => changeRoute(e)}
        >
        </Select>

      </Card>

      <Card>
        <div className='font-bold'> Add State </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Select
              label="Country"
              options={countryData}
              name="country"
              value={user?.country}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Input
              label={'State'}
              placeHolder={'Enter State Name'}
              name="name"
              value={user?.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            loading={loadings[1]}
            title="Add Sate"
            className={'min-w-[100px]'}
            onClick={() => { edit ? handleEdit() : handleSubmit() }}
          />
        </div>
      </Card>

      <Card className={'mt-4'}>
        <div className="font-bold my-3">
          State
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default State