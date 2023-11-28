const LOAD = 'message/loadMessage'
const CREATE = 'message/createMessage'
const DELETE = 'message/deleteMessage'
const UPDATE = 'message/updateMessage'

const load = (message) => {
  return {
    type: LOAD,
    message
  }
}

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

export const getMessages = (channel_id) => async dispatch => {
  const response = await fetch(`/api/messages/${channel_id}`)
  if (response.ok) {
    const messages = await response.json()
    dispatch(load(messages))
  }
}

export const createMessage = (data) => async dispatch => {
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

export const updateMessage = (data, id) => async dispatch => {
  const response = await fetch(`/api/messages/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedMessage = await response.json()
  dispatch(update(updatedMessage))
  return updatedMessage
}

export const deleteMessage = (id) => async dispatch => {
  const response = await fetch(`/api/messages/${id}`, {
    method: 'delete'
  })
  if (response.ok){
    dispatch(destroy(id))
  }
}

let initialState = {}

const messages = (state = initialState, action) => {
  switch(action.type){
  case LOAD: {
    const newState = {}
    let messagesArr = action.messages
    messagesArr.forEach(message => {
      newState[message.id] = message
    })
  }
  case CREATE: {

  }
  case UPDATE: {

  }
  case DELETE: {
    const newState = {...state}
    delete newState[action.message.id]
    return newState
  }
  default: return state
  }
}

export default messages
