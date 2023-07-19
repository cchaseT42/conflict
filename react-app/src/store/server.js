const LOAD = 'server/getServer'
const CREATE = 'server/createServer'
const DELETE = 'server/deleteServer'
const UPDATE = 'server/updateServer'

const load = (server) => {
  return {
    type: LOAD,
    server
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
  const response = await fetch(`/api/server/${id}`)
  if (response.ok) {
    const server = await response.json()
    dispatch(load(server))
  }
}
