import { Record } from 'immutable'

const Question = new Record({
  id: undefined,
  question: undefined,
  publishedAt: undefined,
  thumbUrl: undefined,
  imageUrl: undefined,
  choices: undefined,
})

export default Question
