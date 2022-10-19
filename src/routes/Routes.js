import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import NavBar from '../components/layout/NavBar/NavBar';
import Footer from '../components/layout/Footer/Footer';

import Home from '../pages/Home/Home';
import Company from '../pages/Company/Company';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import NewProject from '../pages/NewProject/NewProject';
import Container from '../components/layout/Container/Container';
import Project from '../pages/Project/Project';

export function AppRoutes () {
  return (
    <Router>
        <NavBar/>
        <Container customClass="min_height">
            <Routes>
              <Route path='/' element={ <Home/> }/>
              <Route path='/projects' element={ <Projects/> }/>
              <Route path='/project/:id' element={ <Project/> }/>
              <Route path='/company' element={ <Company/> }/>
              <Route path='/contact' element={ <Contact/> }/>
              <Route path='/newproject' element={ <NewProject/> }/>
            </Routes>
        </Container>
        <Footer/>
    </Router>
  )
}