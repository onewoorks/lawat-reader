import React from 'react';
import './App.css';
import axios from 'axios';
import HeaderPremise from './components/header_premis.jsx'
import Borang from './components/borang.jsx'
import { 
  BrowserRouter as Router
} from 'react-router-dom';

const App = (props) => {
  console.log(window.location.pathname)
  let uuid = window.location.pathname.replace('/','')
  const [premise, setPremise] = React.useState({})

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/premise/${uuid}`)
    .then(response => {
      setPremise(response.data)
    })
  },[uuid])

  return (
    <div className="container">
    <Router>
     <HeaderPremise premise={premise} />
      <hr />
      <Borang premise={premise} />
    </Router>
     
    </div>
  );
}

export default App;
