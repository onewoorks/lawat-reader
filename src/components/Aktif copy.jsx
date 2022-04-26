import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../animation/complete.json'
import moment from 'moment'
import QRCode from "react-qr-code";

const Aktif = (props) => {
    let codeverify = props.codeverify
    let code_verify = codeverify.code_verify
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }
    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={150}
                width={300}
                isStopped={false}
                isPaused={false}
            />

            <div className="mt-4 mb-4">
                <center>
                    <QRCode value={code_verify} level='L' />
                </center>
            </div>

            <div className="text-center mb-1" style={{ fontStyle: 'italic' }}>
                "Pendaftaran anda telah berjaya, Sila simpan QRCode ini untuk rujukan dan pengesahan kami"
            </div>
            <div className="text-center">
                <h3>Maklumat Direkod!</h3>
            </div>
            
            <div className="text-center">
                {moment().format('DD MMMM YYYY | hh:mm:ss A')}
            </div>
        </div>
    )
}

export default Aktif
