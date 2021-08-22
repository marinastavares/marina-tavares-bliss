import { get } from './index'

export const getHealthCheck = () => get(`health`, {})
