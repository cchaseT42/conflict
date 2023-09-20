const LOAD = 'members/getMembers'

const load = (members) => {
  return {
    type: LOAD,
    members
  }
}

export const getMembers = (id) => async dispatch => {
  const response = await fetch(`/api/members/users/${id}`)
  if (response.ok) {
    const members = await response.json()
    dispatch(load(members))
  }
}

let initialState = {}

const members = (state = initialState, action) => {
  switch (action.type){
    case LOAD: {
      const newState = [action.members]
      return newState
    }
    default: return state
  }
}

export default members
