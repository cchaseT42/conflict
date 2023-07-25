const LOAD = 'server/getServer'
const LOAD_JOINED = 'server/getServers'
const CREATE = 'server/createServer'
const DELETE = 'server/deleteServer'
const UPDATE = 'server/updateServer'

const load = (server) => {
  return {
    type: LOAD,
    server
  }
}

const load_joined = (servers) => {
  return {
    type: LOAD_JOINED,
    servers
  }
}

const create = (server) => {
  return {
    type: CREATE,
    server
  }
}

const destroy = (server) => {
  return{
    type: DELETE,
    server
  }
}

const update = (server) => {
  return{
    type: UPDATE,
    server
  }
}

export const getServer = (id) => async dispatch => {
  const response = await fetch(`/api/servers/${id}`)
  if (response.ok) {
    const server = await response.json()
    dispatch(load(server))
  }
}

export const getServers = (user_id) => async dispatch => {
  const response = await fetch(`/api/members/${user_id}`)
  if (response.ok) {
    const servers = await response.json()
    dispatch(load_joined(servers))
  }
}

export const createServer = (data) => async dispatch => {
  const response = await fetch(`/api/server/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newServer = await response.json()
  dispatch(create(newServer))
  return newServer
}

export const updateServer = (id, data) => async dispatch => {
  const response = await fetch(`/api/server/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedServer = await response.json()
  dispatch(update(updatedServer))
  return updatedServer
}

export const deleteServer = (id) => async dispatch => {
  const response = await fetch(`api/server/${id}`, {
    method: 'delete'
  })
    if (response.ok){
      dispatch(destroy(id))
    }
}

let initialState = {}

const servers = (state = initialState, action) => {
  switch (action.type){
    case LOAD: {

    }
    case LOAD_JOINED: {
      const newState = {}
      let joinedArr = action.servers.servers
      joinedArr.forEach(server => {
        newState[server.id] = server
      })
      return newState
    }
    case CREATE: {

    }
    case UPDATE: {

    }
    case DELETE: {

    }
    default: return state
  }
}

export default servers
