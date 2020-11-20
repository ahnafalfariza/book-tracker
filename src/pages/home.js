import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Read. Track. In the Sky.</h1>
        <h4 className="text-xl font-semibold opacity-75">Skybook helps you keep track of your reading.</h4>
      </div>
      <div className="mt-8">
        <img
          className="shadow-inner border-2 border-dark-primary-400 rounded-md w-full"
          src="/hero.png"
          alt="Skybook hero"
        />
      </div>
      <div className="mt-8 flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 p-4">
          <h4 className="text-lg font-semibold">So simple, yet so beautiful</h4>
          <p className="opacity-75 mt-2">
            Well designed and responsive. We build you a book tracker that you can access everywhere on every device.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h4 className="text-lg font-semibold">Track it. Share it.</h4>
          <p className="opacity-75 mt-2">
            Easily share your reading profile with the world, embed your Skybook profile to your website or social media
            to let others know what you've been reading.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
