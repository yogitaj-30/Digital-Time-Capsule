import React from 'react'
import MyCapsules from '../components/MyCapsules'

function Dashboard() {
    return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-6 font-kode'>Your Time Capsules</h1>
            <MyCapsules />
        </div>
    )
}

export default Dashboard