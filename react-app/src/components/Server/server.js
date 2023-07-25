import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getServers } from "../../store/server"

function Server(){

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.servers)

  useEffect(() => {
    dispatch(getServers(user.id))
  }, [dispatch])


  return (
    <div>
      <p>hi</p>
    </div>
  )
}

export default Server
