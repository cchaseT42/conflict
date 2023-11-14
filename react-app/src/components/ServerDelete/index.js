import { useDispatch, useSelector } from "react-redux";
import { useHistory, useEffect } from 'react'
import { deleteServer, getServers } from "../../store/server";

function deleteOwnedServer(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);


  const serverDelete = async (serverId) => {
    let deletedServer = await dispatch(deleteServer(serverId))
    await dispatch(getServers)
  }

  //Want this to show up as a modal asking the user if they are sure they want to delete
  return (
    <div><button id="yes" onClick={e => serverDelete(serverId)}>Yes</button></div>
  )
}

export default deleteOwnedServer
