import React from 'react'
import { Route, Routes } from 'react-router-dom'


//Components
import Navbar from './../components/Navbar/Navbar'


//Other Data
import { ROUTES } from './RouterConfig';


//Pages
import About from '../pages/About/About';
import Home from '../pages/Home/Home';

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <Navbar/>
            <Element/>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>
        </Routes>
    </div>
  )
}

export default Router