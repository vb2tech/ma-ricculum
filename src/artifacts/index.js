import Unit6StudyGuide from './Unit6StudyGuide.jsx'
import FastMath from './FastMath.jsx'
import DivisionQuest from './DivisionQuest.jsx'
import TimesTableChallenge from './TimesTableChallenge.jsx'

// To add a new artifact:
// 1. Drop the file into public/artifacts/ (HTML) or src/artifacts/ (JSX)
// 2. Import it here (JSX) or create an iframe wrapper component
// 3. Add an entry to the array below

const artifacts = [
  {
    id: 'unit6-study-guide',
    type: 'lesson',
    name: 'Unit 6 Study Guide',
    description: 'Percentages · Proportional Relationships · Unit Rates',
    component: Unit6StudyGuide,
  },
  {
    id: 'fast-math',
    type: 'game',
    name: 'Fast Math',
    description: 'Quick arithmetic practice',
    component: FastMath,
  },
  {
    id: 'division-quest',
    type: 'game',
    name: 'Division Quest',
    description: 'Interactive division challenges',
    component: DivisionQuest,
  },
  {
    id: 'times-table-challenge',
    type: 'game',
    name: 'Times Table Challenge',
    description: 'Timed times tables challenge',
    component: TimesTableChallenge,
  },
]

export default artifacts
