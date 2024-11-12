import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopCoureses from './components/TopCoureses'
import courseData from './data/courses.json'
import CourseGrid from './components/CourseGrid'
import ViewAllCoursesButton from './components/ViewAllCoursesButton'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TopCoureses />
      <courseCard />
      <CourseGrid courses={courseData} />
      <ViewAllCoursesButton />


    </div>
  )
}

export default App
