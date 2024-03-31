import React from 'react'

const TryFeature = () => {
  return (
    <div className='w-full flex flex-col gap-2 rounded-3xl justify-start text-accent bg-primary-2 p-4 drop-shadow-md'>
        <div>
            <p className='text-base'>Try our new feature</p>
            <h2 className='text-xl font-bold'>AI Detecting Ingredients!</h2>
        </div>
        <button className="btn bg-primary btn-sm w-fit text-base-100">Try now</button>
    </div>
  )
}

export default TryFeature