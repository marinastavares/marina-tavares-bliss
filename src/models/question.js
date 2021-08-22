import { Record } from 'immutable'

const Question = new Record({
  id: '',
  question: '',
  publishedAt: '',
  thumbUrl: '',
  imageUrl: '',
  choices: [],
})

export default Question
