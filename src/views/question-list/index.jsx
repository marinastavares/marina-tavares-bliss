import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { navigate } from '@reach/router'

import QuestionCard from './card'
import styles from './styles.scss'

const response = [
  {
    id: 1,
    question: 'Favourite programming language?',
    imageUrl: 'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
    thumbUrl: 'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
    publishedAt: '2015-08-05T08:40:51.620Z',
    choices: [
      {
        choice: 'Swift',
        votes: 2048,
      },
      {
        choice: 'Python',
        votes: 1024,
      },
      {
        choice: 'Objective-C',
        votes: 512,
      },
      {
        choice: 'Ruby',
        votes: 256,
      },
    ],
  },
  {
    id: 2,
    question: 'Favourite programming language?',
    imageUrl: 'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
    thumbUrl: 'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
    publishedAt: '2015-08-05T08:40:51.620Z',
    choices: [
      {
        choice: 'Swift',
        votes: 2048,
      },
      {
        choice: 'Python',
        votes: 1024,
      },
      {
        choice: 'Objective-C',
        votes: 512,
      },
      {
        choice: 'Ruby',
        votes: 256,
      },
    ],
  },
  {
    id: 3,
    question: 'Favourite programming language?',
    imageUrl: 'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
    thumbUrl: 'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
    publishedAt: '2015-08-05T08:40:51.620Z',
    choices: [
      {
        choice: 'Swift',
        votes: 2048,
      },
      {
        choice: 'Python',
        votes: 1024,
      },
      {
        choice: 'Objective-C',
        votes: 512,
      },
      {
        choice: 'Ruby',
        votes: 256,
      },
    ],
  },
]

const DEBOUNCED_TIME = 1000
const QuestionList = () => {
  const [search, setSearch] = useState('')
  const [filter] = useDebounce(search, DEBOUNCED_TIME)

  const handleChange = useCallback((event) => {
    const { value } = event.target
    setSearch(value)
  }, [])

  useEffect(() => {
    if (filter) {
      navigate(`questions?filter=${filter}`)
    }
  }, [filter])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Access different questions from our platform!</h1>
      <input
        placeholder="Search questions"
        className={styles.input}
        type="text"
        onChange={handleChange}
        value={search}
      />
      <div className={styles.cards}>
        {response.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </div>
    </div>
  )
}

export default QuestionList
