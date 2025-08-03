import React from 'react'
import { HeroSection } from './student/HeroSection'
import { Courses } from './student/Courses'
import { Feedback } from './home/Feedback'
import { TopTeachers } from './home/TopTeachers'
import { Accodian } from './home/Accodian'
import { FeedbackSend } from './Home/FeedbackSend'


export const Home = () => {
  
  return (
    <div>
     <HeroSection/>
     <Courses/>
     <TopTeachers/>
     <Feedback/>
     <Accodian/>
     <FeedbackSend/>
    </div>
  )
}
