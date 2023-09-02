import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getServers } from "../../store/servers"
import { getServer } from "../../store/server"
// import ServerSingle from "../../components/Server"

function Server(){

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.servers)
  let server = useSelector(state => state.server[0])
  const serversArr = Object.values(servers)
  const [currServer, setCurrServer] = useState(null)
  console.log(currServer)
  console.log(server[0], "channels")
  console.log(serversArr, "arr")

  useEffect(() => {
    dispatch(getServers(user.id))
  }, [dispatch])

  useEffect(() => {
    dispatch(getServer(currServer))
  }, [currServer])

  return (
    <div className='container'>
      <div className='vertical_display'>
        <div className='servers'>
          {serversArr.map((server) => {
            return (
              <li key={servers.id} onClick={(e) => setCurrServer(server.server_id)}>
                <p>{server.servers.img_url}</p>
              </li>
            )
          })}
        </div>
        <div className="server_info">
          <p>{server.name}</p>
          {server.channels.map((channel) => {
            return (
              <li key={channel.id}>
                <p>{channel.name}</p>
              </li>
            )
          })}
        </div>
        <p></p>
      </div>
    </div>
  )
}

export default Server
