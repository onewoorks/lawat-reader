import React from 'react'
import './App.css'
import axios from 'axios'
import HeaderPremise from './components/header_premis.jsx'
import Borang from './components/borang.jsx'
import Verify from './components/verify.jsx'
import { BrowserRouter as Router,
    Switch,
    Route } from 'react-router-dom'

const App = (props) => {
    let raw_path = window.location.pathname.replace('/', '')
    let path = raw_path.split('/')
    let kupon_code = path[2]
    let cawangan = path[1]
    const [premise, setPremise] = React.useState({})

    React.useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_MIRTH_API}/kupon/${kupon_code}`)
            .then((response) => {
                setPremise(response.data)
            })
    }, [kupon_code, cawangan])

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-lg-5 col-sm-12">
                    <Router>
                        <HeaderPremise premise={premise} />
                        <Switch>
                            <Route path='/verify'>
                                <Verify />
                            </Route>
                            <Route path='/register'>
                                <hr />
                                <Borang />
                            </Route>
                        </Switch>                        
                    </Router>
                </div>
            </div>
        </div>
    )
}

export default App
