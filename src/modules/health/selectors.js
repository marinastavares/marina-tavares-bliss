import { GET_HEALTH_CHECK } from './actions'

export const healthCheckSelector = (state) => state.healthCheck.status
export const getHealthCheckLoadingSelector = (state) => !!state.loading[GET_HEALTH_CHECK]
