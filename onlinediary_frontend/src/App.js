import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Home from './views/home';
import Profile from './views/profile';
import Books from './views/books';
import Addbook from './views/addbook';
import AddEntry from './views/addentry';
import Splash from './views/splash';
import Loading from './components/loading';
import Bookentries from './views/bookentries';
import Navbar from './components/navbar';
import Footer from './components/footer';

import './App.css';

function App() {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id='app'>
      <Navbar />
      <div id='content-wrap'>
        <Routes className='content'>
          <Route path='/' exact element={<Splash />} /> {/* PUBLIC ROUTE */}

          <Route path='/home' element={<Home />} /> {/* PROTECTED ROUTE */}

          <Route path='/profile' element={<Profile />} /> {/* PROTECTED ROUTE */}

          <Route path='/books' element={<Books />} /> {/* PROTECTED ROUTE */}

          <Route path='/addBook' element={<Addbook />} /> {/* PROTECTED ROUTE */}

          <Route path='/bookEntries' element={<Bookentries />} /> {/* PROTECTED ROUTE */}

          <Route path='/addEntries' element={<AddEntry />} /> {/* PROTECTED ROUTE */}
        </Routes>
        <Footer className='footer' />
      </div>
    </div>
  );

}

export default App;
