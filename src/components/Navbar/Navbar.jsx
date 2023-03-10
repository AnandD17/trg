import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import logo from './../../assets/images/logo/logo.png'
import { ROUTES } from '../../routes/RouterConfig';
import { Link, useNavigate } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import { FiChevronDown } from 'react-icons/fi'
import { navbarData } from './nav.js'
import Stat from './Stat';
import Drop from './Drop';
import { useEffect } from 'react';

export default function Navbar({ navbarData }) {

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
    window.location.reload(false)
  }


  const stat = 's'
  const drop = 'd'

  return (
    <div className='h-16 bg-[#0E223D] py-2 w-full'>
      <div className='flex justify-between items-center container px-6'>
        <div>
          <img src={logo} className="w-[50px]" alt="" />
        </div>

        {/* <div className='flex items-center w-[100%] justify-center'> */}
        {/* 
          {
            navbarData?.map((i, key) => {
              if (i?.type == stat) {
                return <Menu mode="horizontal" className='bg-transparent border-0'>
                  <Stat data={i} />
                </Menu>

              }
              if (i?.type == drop) {
                return <Menu mode="vertical" className='bg-transparent border-0'>
                  <Drop data={i} />
                </Menu>


              }
            })
          } */}
        <div className='flex w-[100%] items-center justify-center'>
          <Menu className='w-[100%] bg-transparent text-white' mode="horizontal" items={navbarData} />
        </div>

        {/* </div> */}

        <div>

          <div
            onClick={() => logout()}
            className={'cursor-pointer'}  >
            <SlLogout color='white' />
          </div>

        </div>
      </div>
    </div >
  )
}
