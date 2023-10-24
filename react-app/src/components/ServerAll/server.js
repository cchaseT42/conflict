import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getServers } from "../../store/servers"
import { getServer } from "../../store/server"
import { getChannel, updateChannel, createChannel, deleteChannel } from "../../store/channel"
import { getMessages, deleteMessage, createMessage } from "../../store/message"
import { getMembers } from "../../store/members"

function Server(){

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.servers)
  let server = useSelector(state => state.server[0] || null)
  let channel = useSelector(state => state.channel[0] || null)
  let members = useSelector(state => state.members[0] || null)
  const membersArr = Object.values(members)
  console.log(membersArr)
  const serversArr = Object.values(servers)
  const [currServer, setCurrServer] = useState(null)
  const [currChannel, setCurrChannel] = useState(null)
  const [message, setMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []
  let server_selected = false

  if (server) server_selected = true

  useEffect(() => {
    dispatch(getServers(user.id))
  }, [dispatch])

  useEffect(() => {
    dispatch(getServer(currServer))
    setCurrChannel(null)
    dispatch(getChannel(currChannel))
    dispatch(getMembers(currServer))
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
    await dispatch(getChannel(currChannel))
  }

  const messageDelete = async (id) => {
    let deletedMessage = await dispatch(deleteMessage(id))
    await dispatch(getChannel(currChannel))
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
                {user.id == message.owner_id ? <button id="delete_msg_button"onClick={e => messageDelete(message.id)}>Delete</button>: null}
                <p>{message.user.username}: {message.message}</p>
              </li>
            )
          })}
        </div>
        <div className ="message_input">
          {currChannel && <form onSubmit={messageSubmit}>
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
          </form>}
        </div>
        </div>
        <p></p>
      </div>
      <div className='user_list'>
        <p>Members-{membersArr[0].length}</p>
        {membersArr[0].map((members) => {
          return (
            <li key={members.members.id}>
              <p>{members.members.username}</p>
            </li>
          )
        })}
        <div>
        </div>
      </div>
    </div>
  )
}

export default Server
