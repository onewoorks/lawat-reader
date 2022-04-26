import React from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Aktif from '../components/Aktif.jsx'

const Borang = (props) => {
    let raw_path = window.location.pathname.replace('/', '')
    let path = raw_path.split('/')
    let kupon_code = path[2]
    let cawangan = path[1]
    const [kupon, setKupon] = React.useState({})

    React.useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_MIRTH_API}/kupon/${kupon_code}`)
            .then((response) => {
                setKupon(response.data)
            })
    }, [kupon_code, cawangan])
    // let premise     = props.premise
    // let cawangan    = props.cawangan
    let code_verify = uuidv4()
    const [displayForm, setDisplayForm] = React.useState(true)
    const [formInput, setFormInput] = React.useState({
        nama_penuh: '',
        no_telefon: '',
        tarikh_lahir: '',
        email: ''
    })

    React.useEffect(() => {
        let user_info = localStorage.getItem('user_info')
        if (user_info !== null) {
            setFormInput({
                ...JSON.parse(user_info),
            })
        }
    }, [])

    let button_message = 'Lengkapkan Maklumat'
    let button_style = 'btn-outline-secondary'
    let disableSubmit = true

    if ( 
        formInput.nama_penuh.length > 4 && 
        formInput.no_telefon.length >= 10 && 
        formInput.email.length >= 3 && formInput.tarikh_lahir.length >= 6) {
        button_message = "Tuntut Boucer"
        button_style = 'btn-success'
        disableSubmit = false
    }

    const SubmitForm = (e) => {
        e.preventDefault()
        localStorage.removeItem('user_info')
        let submit_data = {
            attendance_info: formInput,
            cawangan: cawangan.cawangan,
            // kupon: premise.code,
            uuid: code_verify,
        }
        localStorage.setItem('user_info', JSON.stringify(formInput))
        axios
            .post(`${process.env.REACT_APP_MIRTH_API}/register`, submit_data)
            .then((response) => setDisplayForm(false))
    }

    return (
        <div>
            <form onSubmit={() => SubmitForm()} style={{display: (displayForm) ? 'block': 'none'}}>
                <div className="form-group">
                    <label htmlFor="">Nama Penuh</label>
                    <input
                        type="text"
                        className="form-control text-center text-uppercase"
                        value={formInput.nama_penuh}
                        onChange={(x) =>
                            setFormInput({
                                ...formInput,
                                nama_penuh: x.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">No Telefon</label>
                    <input
                        type="number"
                        className="form-control text-center"
                        value={formInput.no_telefon}
                        onChange={(x) =>
                            setFormInput({
                                ...formInput,
                                no_telefon: x.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Tarikh Lahir">Tarikh Lahir</label>
                    <div className="input-group">
                        <input
                            type="date"
                            className="form-control text-center"
                            value={formInput.tarikh_lahir}
                            onChange={(x) =>
                                setFormInput({
                                    ...formInput,
                                    tarikh_lahir: x.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control text-center"
                            value={formInput.email}
                            onChange={(x) =>
                                setFormInput({
                                    ...formInput,
                                    email: x.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`btn btn-block ${button_style}`}
                    onClick={(x) => SubmitForm(x)}
                    style={{ marginTop: 50 }}
                    disabled={disableSubmit}
                >
                    {button_message}
                </button>
            </form>
            <div style={{display: (displayForm) ? 'none' : 'block'}}>
                <Aktif codeverify={{ code_verify }}/>
            </div>
        </div>
    )
}

export default Borang
