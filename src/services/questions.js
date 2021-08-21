import { get } from './index'

export const getQuestions = (params) => get('questions', params)

export const getQuestion = (questionId, params) => get(`questions/${questionId}`, params)
