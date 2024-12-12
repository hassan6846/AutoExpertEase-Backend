import React from 'react'

const Header = (props) => {
    return (
        <div style={{ backgroundColor: '#e5e5e5', height: "10vh", borderRadius: 10,display:'flex',alignItems:"center"}}>
            <p style={{fontSize:40,marginLeft:10}}>{props.title}</p>
        </div>
    )
}

export default Header