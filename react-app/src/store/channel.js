const LOAD = 'channel/getChannel'

const load = (channel) => {
  return {
    type: LOAD,
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

let initialState = {}

const channel = (state = initialState, action) => {
  switch (action.type){
    case LOAD: {
      const newState = [action.channel]
      return newState
    }
    default: return state
  }
}

export default channel
