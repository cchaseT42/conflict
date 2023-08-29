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
  let server = useSelector(state => state.server)
  const serversArr = Object.values(servers)
  const [currServer, setCurrServer] = useState(null)
  console.log(currServer)
  console.log(server)
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
        <div className="channels">
        </div>
      </div>
    </div>
  )
}

export default Server
