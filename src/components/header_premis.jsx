import React from 'react'

const HeaderPremis = (props) => {
    let premise = props.premise
    return (
        <div className="text-center" style={{padding: 20}}>
            <img 
                src="/kaharojewels.jpg"
                alt={premise.nama_cawangan} 
                className="img-fluid" 
                style={{ maxHeight:140}}
            />
            <div className='mt-3'>
                <h3>{ premise.name }</h3>
                <div>{ premise.tarikh }</div>
            </div>
        </div>
    )
}

export default HeaderPremis