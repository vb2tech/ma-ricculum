import Unit6StudyGuide from './Unit6StudyGuide.jsx'
import FastMath from './FastMath.jsx'

// To add a new artifact:
// 1. Drop the file into public/artifacts/ (HTML) or src/artifacts/ (JSX)
// 2. Import it here (JSX) or create an iframe wrapper component
// 3. Add an entry to the array below

const artifacts = [
  {
    id: 'unit6-study-guide',
    name: 'Unit 6 Study Guide',
    description: 'Percentages · Proportional Relationships · Unit Rates',
    component: Unit6StudyGuide,
  },
  {
    id: 'fast-math',
    name: 'Fast Math',
    description: 'Quick arithmetic practice',
    component: FastMath,
  },
]

export default artifacts
