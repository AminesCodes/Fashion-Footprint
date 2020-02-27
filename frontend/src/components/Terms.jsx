import React from 'react'

export default function Terms (props) {
    return (
        <div className='w-75 mx-auto mt-5 p-2 text-center termsContainer'>
            <div className='text-right m-2'>
                <button className='btn-sm btn-danger' onClick={e => props.setShowTerms(false)}>X</button>
            </div>
            <div>
                <p>terms here !!!</p>
            </div>
        </div>
    )
}