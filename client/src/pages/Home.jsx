import React from 'react'
import { HeroSection } from './student/HeroSection'
import { Courses } from './student/Courses'
import { Feedback } from './home/Feedback'
import { TopTeachers } from './home/TopTeachers'
import { Accodian } from './home/Accodian'
<<<<<<< HEAD
import { FeedbackSend } from './Home/FeedbackSend'

=======
import { FeedbackSend } from './home/FeedbackSend'
>>>>>>> 401e8fdd7818c7d25e1fd9b69b57718161c235fc

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
