const LOAD = 'channel/getChannel'
const UPDATE = 'channel/updateChannel'
const CREATE = 'channel/createChannel'
const DELETE = 'channel/deleteChannel'

const load = (channel) => {
  return {
    type: LOAD,
    channel
  }
}

const update = (channel) => {
  return {
    type: UPDATE,
    channel
  }
}

const create = (channel) => {
  return {
    type : CREATE,
    channel
  }
}

const destroy = (channel) => {
  return {
    type: DELETE,
    channel
  }
}

export const getChannel = (id) => async dispatch => {
  const response = await fetch(`/api/channel/${id}`)
  if (response.ok) {
    const channel = await response.json()
    dispatch(load(channel))
  }
}

export const createChannel = (data) => async dispatch => {
  const response = await fetch (`/api/channel/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newChannel = await response.json()
  dispatch(createChannel(newChannel))
  return newChannel
}

export const updateChannel = (data, id) => async dispatch => {
  const response = await fetch(`/api/channel/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedChannel = await response.json()
  dispatch(update(updatedChannel))
  return updatedChannel
}

export const deleteChannel = (id) => async dispatch => {
  const response = await fetch(`api/channel/${id}`, {
    method: 'delete'
  })
  if (response.ok) {
    dispatch(destroy(id))
  }
}

let initialState = {}

const channel = (state = initialState, action) => {
  switch (action.type){
    case LOAD: {
      const newState = [action.channel]
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.channel.id] = action.channel
      return newState
    }
    case UPDATE: {
      const newState = {...state}
      newState[action.channel.id] = action.channel
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.channel.id]
      return newState
    }
    default: return state
  }
}

export default channel
