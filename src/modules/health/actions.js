import { defineAction } from 'redux-define'
import * as healthService from 'services/health-check'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_HEALTH_CHECK = defineAction('HEALTH_CHECK', REQUEST)

export const getHealthCheck = (dispatch) => {
  dispatch({
    type: GET_HEALTH_CHECK.ACTION,
    payload: healthService.getHealthCheck(),
  })
}
