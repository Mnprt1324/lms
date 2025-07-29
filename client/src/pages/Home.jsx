import React from 'react'
import { HeroSection } from './student/HeroSection'
import { Courses } from './student/Courses'
import { Feedback } from './home/Feedback'

export const Home = () => {
  
  return (
    <div>
     <HeroSection/>
     <Courses/>
     <Feedback/>
    </div>
  )
}
