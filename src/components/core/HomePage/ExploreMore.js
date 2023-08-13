import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free", 
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)


    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>

        <div className='text-4xl text-center mt-10 font-semibold'>
            Unlock the <HighlightText text={"Power of Code"} />
        </div>

        <p className='text-center text-richblack-300 mb-8 font-semibold text-lg mt-1'>
            Learn to build anything you can imagine
        </p>

        <div className='flex flex-row gap-5 rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1 '>
            {
                tabsName.map((element , index) => {
                    return (
                        <div className={`text-[16px] flex flex-row items-center gap-2
                        ${currentTab === element
                        ? "bg-richblue-900 font-medium text-richblue-5"
                        : "text-richblack-200"
                        } rounded-full cursor-pointer transition-all duration-200
                        hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
                        `}
                        key={index}
                        onClick={() => setMyCards(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[200px]'></div>

        {/* Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

    </div>
  )
}

export default ExploreMore