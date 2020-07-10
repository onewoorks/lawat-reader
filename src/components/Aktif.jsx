import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../animation/medical-frontliner.json'
import moment from 'moment'

const Aktif = () => {
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
                height={300}
                width={300}
                isStopped={false}
                isPaused={false}
            />

            <div className="text-center mb-1" style={{ fontStyle: 'italic' }}>
                "Terima kasih kerana menyertai usaha membendung wabak Covid-19"
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
