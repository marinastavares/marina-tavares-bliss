import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { navigate } from '@reach/router'

import styles from './styles.scss'

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
    </div>
  )
}

export default QuestionList
