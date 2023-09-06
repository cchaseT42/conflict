const CREATE = 'message/createMessage'
const DELETE = 'message/deleteMessage'
const UPDATE = 'message/updateMessage'

const create = (message) => {
  return {
    type: CREATE,
    message
  }
}

const destroy = (message) => {
  return {
    type: DELETE,
    message
  }
}

const update = (message) => {
  return {
    type: UPDATE,
    message
  }
}

export const createMessage = (payload) => async dispatch => {
  const response = await fetch(`/api/messages/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newMessage = await response.json()
  dispatch(create(newMessage))
  return newMessage
}
