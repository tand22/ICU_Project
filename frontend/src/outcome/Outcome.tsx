import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';



function Outcome() {
    const location = useLocation();
    const data = location.state;
    console.log("this is the new page please work")  
    
    
    return (
        <>
        {/* <div>{data.id}</div> */}
           
        {/* <div>{data.interpretation.descriptors}</div>
        <div>{data.interpretation.desriptorValues}</div> */}
        {/* <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div> */}

        </>
    )
}

export default Outcome;
