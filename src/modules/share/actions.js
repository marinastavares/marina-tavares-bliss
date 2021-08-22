import { defineAction } from 'redux-define'
import * as shareService from 'services/share'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const SHARE_CONTENT = defineAction('SHARE_CONTENT', REQUEST)

export const shareContent = (params) => (dispatch) => {
  dispatch({
    type: SHARE_CONTENT.ACTION,
    payload: shareService.shareContent(params),
  })
}
