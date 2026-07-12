import Image from "next/image"
function InfinityLoader({className=""}) {
  return (
    <div className={`${className} w-full flex items-center justify-center`}>
        <Image src="/Infinity@1x-1.0s-200px-200px.svg" width={50} height={50} alt='Loading...'/>
    </div>
  )
}

export default InfinityLoader
