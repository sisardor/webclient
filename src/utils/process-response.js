export default function processResponse (response) {
  let isOk = response.ok

  return response.text()
  .then(body => {
    try {
      if (response.status === 204) {
        body = ''
      } else {
        body = JSON.parse(body)
      }
     }
    catch (error) { if (isOk) isOk = false }

    if (isOk) return body

    throw { ...body, statusCode: response.status }
  })
}
