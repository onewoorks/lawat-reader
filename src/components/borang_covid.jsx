import React from 'react'
import axios from 'axios'
import Aktif from './Aktif.jsx'

const Borang = (props) => {
    let premise = props.premise
    const [displayForm, setDisplayForm] = React.useState(true)
    const [formInput, setFormInput] = React.useState({
        nama_penuh: '',
        no_telefon: '',
        tarikh_lahir: '',
        email: '',
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
        button_message = "Daftar Masuk"
        button_style = 'btn-success'
        disableSubmit = false
    }

    if (typeof formInput.bacaan_suhu !== 'undefined') {
        
        if (formInput.bacaan_suhu.length > 3) {
            if (formInput.bacaan_suhu < 37.6) {
                button_message = 'Daftar Masuk'
                button_style = 'btn-success'
                disableSubmit = false
            }

            if (formInput.bacaan_suhu > 37.5) {
                button_message = 'Anda Berisiko'
                button_style = 'btn-danger'
                disableSubmit = true
            }
        }
    }

    const SubmitForm = (e) => {
        e.preventDefault()
        localStorage.removeItem('user_info')
        console.log(formInput)
        let submit_data = {
            attendance_info: formInput,
            cawangan: premise.uuid,
            kupon: 'new-customer'
        }
        localStorage.setItem('user_info', JSON.stringify(formInput))
        axios
            .post(`${process.env.REACT_APP_MIRTH_API}/attendance`, submit_data)
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
                            step="0.1"
                            className="form-control text-center"
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
                            onChange={(x) =>
                                setFormInput({
                                    ...formInput,
                                    email: x.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="form-group d-none">
                    <label htmlFor="Bacaan Suhu">Bacaan Suhu</label>
                    <div className="input-group">
                        <input
                            type="number"
                            step="0.1"
                            className="form-control text-center"
                            onChange={(x) =>
                                setFormInput({
                                    ...formInput,
                                    bacaan_suhu: x.target.value,
                                })
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">&deg; C</span>
                        </div>
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
            <div style={{display: (displayForm) ? 'block' : 'block'}}>
                <Aktif />
            </div>
        </div>
    )
}

export default Borang
