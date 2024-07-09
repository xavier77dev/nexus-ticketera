import 'ldrs/ring2'

// Default values shown  
const Loading2 = () => {

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <l-ring-2
        className='flex justify-center items-center'
        size="60"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="white"
      ></l-ring-2>

    </div>
  )
}


export default Loading2;