import React from 'react'

const ProductCard = () => {
  return (
    <div style={{ height: "100%", position:"relative",backgroundColor: "#fff", width: "240px",borderRadius:5,cursor:"pointer"}}>
    <DeleteIcon style={{position:"absolute",right:5,top:10,backgroundColor:"rgba(255, 0, 0, 0.479)",borderRadius:5,fill:"#fff"}}/>
     <img style={{borderRadius:5, height: "40vh", objectFit: 'cover', backgroundColor: "red",width:"100%" }} src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' />
     <div style={{flexDirection:'row',display:"flex",alignItems:"center"}}>    
       <Avatar src={defaultUserImg}/>    
       <div>
       <p style={{fontSize:12,marginLeft:5,marginBottom:2}}>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</p>
       <Chip style={{fontSize:9,marginLeft:2,marginBottom:2}} label="men"/>
       <Chip   style={{fontSize:9,marginLeft:2,marginBottom:2}} label="bags"/>
       <Chip   style={{fontSize:9,marginLeft:2,marginBottom:2}} label="accessories"/>
       
       </div>
      </div>
    
   </div>

  )
}

export default ProductCard