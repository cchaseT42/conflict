import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getServer } from "../../store/server"

function ServerSingle({server_id}){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const server = useSelector(state => state.server)
  console.log(server, "server")

  useEffect(() => {
    dispatch(getServer(server_id))
  }, [dispatch])

  return (
    <div>
      <p></p>
    </div>
  )
}

export default ServerSingle
