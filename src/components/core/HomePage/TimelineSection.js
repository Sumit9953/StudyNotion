import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage  from "../../../assets/Images/TimelineImage.png"


const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
      },
      {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
      },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 mb-20 items-center'>
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((element , index) => {
                        return (
                            <div className="flex mb-8 flex-col gap-3" key={index}>

                            <div className='flex gap-6' key={index}>
                                <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]"'>
                                    <img src={element.Logo} alt="" />
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
            
            <div className='relative shadow-blue-200 shadow-[0px_0px_30px_0px]' >
                <img className='shadow-white object-cover h-fit' src={timelineImage} alt="" />

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10
            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-14'>
                        <p className='text-3xl font-bold w-[75px]'>10</p>
                        <p className='text-caribbeangreen-300 text-sm w-[75px]'>Years of Experience</p>
                    </div>

                    <div className='flex flex-row gap-5 items-center px-14'>
                        <p className='text-3xl font-bold w-[75px]'>250</p>
                        <p className='text-caribbeangreen-300 text-sm w-[75px]'>Types of Course</p>
                    </div>
            </div>

            </div>


        </div>
    </div>
  )
}

export default TimelineSection