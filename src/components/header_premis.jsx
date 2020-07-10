import React from 'react'

const HeaderPremis = (props) => {
    let premise = props.premise
    return (
        <div className="text-center" style={{paddingTop: 20}}>
            <img 
                src={premise.image}
                alt={premise.nama_cawangan} 
                className="img-fluid" 
                style={{ height:140}}
            />

            <div style={{marginTop:20}}>
                <div style={{fontSize: 20, fontWeight:'bold'}}>{premise.nama_cawangan} - { premise.cawangan_induk}</div>
                <div>{premise.alamat}</div>
                <div>{premise.no_telefon}</div>
                <div>{premise.maklumat_tambahan}</div>
            </div>
        </div>
    )
}

export default HeaderPremis