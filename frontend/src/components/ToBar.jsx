import React from 'react';
// import GoogleFontLoader from 'react-google-font-loader';

export default function TopBar(props) {
    return (
        <>
        {/* <GoogleFontLoader
        fonts = {[
            font: ''
        ]}
        /> */}
            <div className='col-1' >
                
                <img 
                    className='d-block mx-auto m-2'
                    src={require('../assets/FFlogo.png')} 
                    alt='App logo' 
                    style={{height: '200px', 
                    objectFit: 'scale-down',
                    marginLeft: '0'
                    }}/>
            </div>

            <div className='col-9 mt-3 h3 text-center'>
                <h1>Fashion Footprint</h1>
            </div>
        </>
    )
}