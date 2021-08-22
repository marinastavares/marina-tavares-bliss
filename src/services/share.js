import { post } from './index'

export const shareContent = (payload) =>
  post(`share?destination_email=${payload.destinationEmail}&content_url=${payload.contentUrl}`, {})
