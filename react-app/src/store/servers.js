const LOAD_JOINED = 'server/getServers'

const load_joined = (servers) => {
  return {
    type: LOAD_JOINED,
    servers
  }
}

export const getServers = (user_id) => async dispatch => {
  console.log(user_id)
  const response = await fetch(`/api/members/${user_id}`)
  if (response.ok) {
    const servers = await response.json()
    dispatch(load_joined(servers))
  }
}

let initialState = {}

const servers = (state = initialState, action) => {
  switch (action.type){
    case LOAD_JOINED: {
      const newState = {}
      let joinedArr = action.servers.joined_servers
      joinedArr.forEach(server => {
        newState[server.id] = server
      })
      return newState
    }
    default: return state
  }
}

export default servers
