import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getServers } from "../../store/server"
import { getServer } from "../../store/server"

function Server(){

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.server)
  const serversArr = Object.values(servers)
  const [server, setServer] = useState("")
  console.log(serversArr)

  useEffect(() => {
    dispatch(getServers(user.id))
  }, [dispatch])


  return (
    <div className='container'>
      <div className='vertical_display'>
        <div className='servers'>
          {serversArr.map((server) => {
            return (
              <li key={server.id}>
                <Link to={`/servers/${server.id}`}>
                <p>{server.servers.img_url}</p>
                </Link>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Server
