import React from 'react'
import * as animationData from '../animation/complete.json'
import QRCode from "react-qr-code";
import axios from 'axios'
var Barcode = require('react-barcode');

const Aktif = (props) => {
    let raw_path = window.location.pathname.replace('/', '')
    let path = raw_path.split('/')
    let code_verify = path['1']
    const [kupon, setKupon] = React.useState({})
    const [customer, setCustomer ] = React.useState({})
    React.useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_MIRTH_API}/verify/${code_verify}`)
            .then((response) => {
                setKupon(response.data)
            })
    }, [code_verify])

    React.useEffect(() => {
        if(Object.keys(kupon).length > 0){
            let customer_data = kupon.customer_data
            setCustomer(JSON.parse(customer_data))
        }
    },[kupon])

    return (
        <div>

            <div className="mt-4 mb-4">
                <center>
                    <QRCode value={code_verify} level='L' />
                </center>
            </div>

            { (Object.keys(kupon).length > 0) ? (
                <div>
                    <h3 className="text-center">{ kupon.coupon_alias }</h3>
                    <Barcode value={ kupon.coupon_alias } displayValue={false} width={4} />
                    </div>
            ) : ('')}

            

            <div className="text-center mb-4 mt-2" style={{ fontStyle: 'italic' }}>
            "Sila papar QRCode / Barcode ini untuk rujukan dan pengesahan kami"
            </div>

            <div className="mb-4">
            <div className="text-center">
                <h3 className="text-uppercase">Maklumat Pendaftaran!</h3>
                {kupon.customer_data ? (
                <div>
                    <h4 className="text-uppercase">{ customer.nama_penuh }</h4>
                    <div>{ customer.no_telefon }</div>
                </div>
                
                ) : ('')}
            </div>
            
            </div>
            
        </div>
    )
}

export default Aktif
