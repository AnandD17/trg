import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import TextArea from './../../../components/Input/TextArea'
import * as apiProvider from '../../../services/api/recruitment'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Highlighter from 'react-highlight-words';

import { Switch, Dropdown, Space } from 'antd';

import { BsThreeDots } from "react-icons/bs"
import { fallBackImage, onImageError } from '../../../services/common'
import { SearchOutlined } from '@ant-design/icons'

const Bussiness = ({ notify, enterLoading, exitLoading, loadings }) => {
  const [business, setBusiness] = useState({
    name: "",
    address: "",
    url: "",
    code: "",
    logo: "",
    summary: "",
    description: ""
  })




  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeHolder={`Search ${dataIndex}`}
          label={'Type to Search'}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          onBlur={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setBusiness(data.find(item => item._id === key[1]))

    } else if (key[0] === "delete") {  // delete
      handleDelete(key[1], "DELETED")
    }
  };



  const items = [{
    label: 'Edit',
    key: "edit"
  }, {
    label: 'Delete',
    key: "delete"
  }
  ]



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
      title: "Business Logo",
      dataIndex: "logo",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      render: (logo) => <img src={logo ?? fallBackImage} alt="logo" width={100} />
    },
    {
      title: 'Bussiness Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },

    {
      title: "Business URL",
      dataIndex: "url",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      render: (url) => <a href={url} target="_blank" rel="noreferrer">{url}</a>
    },
    {
      title: 'Bussiness Code',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title: "Summary",
      dataIndex: "summary",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      render: (summary) => <div className="content max-h-[100px] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: summary }}></div>
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      render: (description) => <div className="content max-h-[100px] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: description }}></div>
    },
    {
      title: "Status",
      dataIndex: "_id",
      render: (id, d, d1, d2) => (
        <>
        {
          // console.log(d)
        }
      <Switch 
      className='bg-[gray]' 
      checked={d.status=='ACTIVE'?true:false}
      onChange={(e) => {
        if(e) handleDelete(id, 'ACTIVE');
        else handleDelete(id, 'INACTIVE');
        console.log(d,d1,d2);
      }} />
      </>)
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id) => (<Dropdown
        menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
        trigger={['click']}
        className="cursor-pointer"
      >
        <BsThreeDots />
      </Dropdown>)
    }


  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState([])


  const getData = () => {
    // enterLoading(2)
    apiProvider.getBusiness()
      .then(res => {

        if (res.isSuccess) {
          console.log(res.data);
          setData(res.data)
          const arr = res.data.map(data => ({
            value: data._id,
            label: data.name
          }))
          setProfileData(arr)
        }
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)

      })
  }

  const handleSubmit = () => {

    enterLoading(1)
    return apiProvider.createBusiness(business)
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
    return apiProvider.editBusiness(business?._id, business)
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

  const handleDelete = (id,  status) => {
    return apiProvider.editBusiness(id, { status: status })
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
    setBusiness({
      name: "",
      address: "",
      url: "",
      code: "",
      logo: "",
      summary: "",
      description: ""
    })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <Card>
        <div className='font-bold'>Add Business </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Name'}
              placeHolder={'Enter Business Name'}
              value={business?.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Address'}
              placeHolder={'Enter Address'}
              value={business?.address}
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Bussiness Logo'}
              placeHolder={'Bussiness Logo'}
              type="file"
              value={business?.logo}
              name="logo"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Bussiness URL'}
              placeHolder={'Bussiness URL'}
              value={business?.url}
              name="url"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Bussiness Code'}
              placeHolder={'Bussiness Code'}
              value={business?.code}
              name="code"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Summary</label>

            <ReactQuill className='px-2 min-h-[100px]' label={"summary"} theme="snow" value={business?.summary} onChange={(e) => setBusiness((prev) => ({ ...prev, "summary": e }))} />
          </div>
          <div className="col-span-3">
            <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Description</label>

            <ReactQuill

              className='px-2 min-h-[100px]' label={"description"} theme="snow" value={business?.description} onChange={(e) => setBusiness((prev) => ({ ...prev, "description": e }))} />

          </div>
        </div>
        <div className="flex justify-end mt-3">
          {
            edit ?
              <Button
                loading={loadings[1]}
                title="Update Business"
                className={'min-w-[100px]'}
                onClick={handleEdit}
              /> : <Button
                loading={loadings[1]}
                title="Add Business"
                className={'min-w-[100px]'}
                onClick={handleSubmit}
              />
          }

        </div>
      </Card>
      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Bussiness
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} pagination={false} />
      </Card>
    </div>
  )
}

export default Bussiness