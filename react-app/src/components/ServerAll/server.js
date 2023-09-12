import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getServers } from "../../store/servers"
import { getServer } from "../../store/server"
import { getChannel } from "../../store/channel"
import { createMessage } from "../../store/message"

function Server(){

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.servers)
  let server = useSelector(state => state.server[0] || null)
  let channel = useSelector(state => state.channel[0] || null)
  const serversArr = Object.values(servers)
  const [currServer, setCurrServer] = useState(null)
  const [currChannel, setCurrChannel] = useState(null)
  const [message, setMessage] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []
  let server_selected = false

  if (server) server_selected = true

  useEffect(() => {
    dispatch(getServers(user.id))
  }, [dispatch])

  useEffect(() => {
    dispatch(getServer(currServer))
  }, [currServer])

  useEffect(() => {
    dispatch(getChannel(currChannel))
  }, [currChannel])

  const messageSubmit = async (e) => {
    e.preventDefault()

    if (!message) return
    if (message.length > 2000) errors.push("Message must be less than 2000 characters!")

    const data = {
      channel_id: channel.id,
      owner_id: user.id,
      message: message
    }

    let newMessage = await dispatch(createMessage(data))
  }

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
          <p>{server_selected && <p>{server.name}</p>}</p>
          {server_selected && server.channels.map((channel) => {
            return (
              <li key={channel.id} onClick={(e) => setCurrChannel(channel.id)}>
                <p>{channel.name}, {channel.id}</p>
              </li>
            )
          })}
        </div>
        <div>
        <div className="channel_messages">
          {channel && channel.messages.map((message) => {
            return (
              <li key={message.id}>
                <p>{message.user.username}: {message.message}</p>
              </li>
            )
          })}
        </div>
        <div className ="message_input">
          <form onSubmit={messageSubmit}>
            <div className='message_box'>
              <label htmlFor="message" className='message'>Message</label>
              <input
              className='input_area'
              name="message"
              type='textarea'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </form>
        </div>
        </div>
        <p></p>
      </div>
    </div>
  )
}

export default Server
