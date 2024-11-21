import React from 'react'
import Hero from '../components/Hero'
import TopCoureses from '../components/TopCoureses'
import CourseGrid from '../components/CourseGrid'
import ViewAllCoursesButton from '../components/ViewAllCoursesButton'

const Home = () => {
  
  return (
   <>
      <Hero />
      <TopCoureses />
      <CourseGrid isHome={true} />
      <ViewAllCoursesButton />
   </>
  )
}

export default Home