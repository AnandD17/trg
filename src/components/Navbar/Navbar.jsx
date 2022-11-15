import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import logo from './../../assets/images/logo/logo.png'
import { ROUTES } from '../../routes/RouterConfig';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {

  const navigate = useNavigate()

  return (
    <div className='h-16 bg-[#0E223D] py-2 w-full'>
      <div className='flex justify-between items-center container px-6'>
        <div>
          <img src={logo} className="w-[50px]" alt="" />
        </div>
        <Menu mode="horizontal" className='bg-transparent flex items-center w-[100%] justify-center border-0' defaultSelectedKeys={['mail']}>
          <Menu.Item key="mail" className='flex items-center border-0 text-[white]'>
            <div className='flex items-center gap-2' onClick={()=>{navigate(ROUTES.Home)}}>
              Home
            </div>
          </Menu.Item>
          <Menu.SubMenu key="SubMenu" className='flex items-center hover:text-[white] flex items-center text-[white]' title="Recruitment">
            <Menu.Item className='flex items-center'>
              Dashboard
            </Menu.Item>
            <Menu.Item>
              <Link to={ROUTES.Recruitment.CreateJob}>
                Create Job
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={ROUTES.Recruitment.ViewJobs}>
                View Job
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={ROUTES.Recruitment.Profile}>
                Profile
              </Link>
            </Menu.Item>
            
            <Menu.SubMenu title='Master' className=''>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.Bussiness}>
                  Bussiness
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.City}>
                  City
                </ Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.State}>

                  State
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.Country}>

                  Country
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.Rounds}>

                  Round
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.InterviewRounds}>

                  Interview Round
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTES.Recruitment.Master.Department}>

                  Department
                </Link>
              </Menu.Item>
            </Menu.SubMenu>

          </Menu.SubMenu>
        </Menu>
        <div>

        </div>
      </div>
    </div>
  )
}
