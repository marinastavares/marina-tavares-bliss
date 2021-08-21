import humps from 'humps'

import { get, put } from './index'

export const getQuestions = (params) => get('questions', { params })

export const getQuestion = (questionId, params) => get(`questions/${questionId}`, { params })

export const updateQuestion = (questionId) => (payload) =>
  put(`questions/${questionId}`, { ...humps.camelizeKeys(payload) })
