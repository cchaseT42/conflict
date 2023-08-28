import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getServers } from "../../store/server"
import { getServer } from "../../store/server"

function Server(){

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.server)
  const serversArr = Object.values(servers)
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
                <p>{server.servers.img_url}</p>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Server
