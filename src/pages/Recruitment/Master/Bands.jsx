import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import { BsThreeDots } from "react-icons/bs"
import { Switch, Dropdown } from 'antd';


const Bands = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [user, setUser] = useState({
    name: ""
  })


  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setUser(data.find(item => item._id === key[1]))

    } else {  // delete
      // setBusiness(data.find(item => item._id === key[1]))
      handleDelete(key[1], "DELETED")
    }
  };


  const columns = [
    {
      title: "Sl no.",
      dataIndex: "index",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      },
      render: (value, item, index) => index + 1
    },
    {
      title: "Band",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "Status",
      dataIndex: "_id",
      render: (id,d) => (
        <Switch 
        className='bg-[gray]' 
        checked={d?.status=="ACTIVE"?true:false}
        onChange={(e) => {
          if(e) handleDelete(id, "ACTIVE")
        else handleDelete(id, "INACTIVE")
        }} />
        )
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



  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = () => {
    // enterLoading(1)
    return apiProvider.editBand(user?._id, user)
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

  const handleDelete = (id, status) => {
    return apiProvider.editBand(id, { status: status })
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


  const getData = () => {
    // enterLoading(2)
    apiProvider.getBands()
      .then(res => {

        if (res.isSuccess) {
          const arr = res?.data?.map((i, key) => ({
            ...i,
          }))
          setData(arr)
        }
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)

      })
  }

  const handleSubmit = () => {

    // enterLoading(1)
    return apiProvider.createBand(user)
      .then(res => {
        // exitLoading(1)
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
        // exitLoading(1)
        return notify('error', err.message);
      })
  }

  const clearData = () => {
    setUser({
      name: '',
    })
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <Card>
        <div className='font-bold'> Add Band </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Band Name'}
              placeHolder={'Enter Band Name'}
              name="name"
              value={user?.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            title={edit ?"Update Band":'Add Band'}
            className={'min-w-[100px]'}
            onClick={() => { edit ? handleEdit() : handleSubmit() }}
            loading={loadings[1]}
          />
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          bands
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Bands