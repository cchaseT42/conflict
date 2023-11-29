import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createChannel } from "../../store/channel"

function CreateChannel(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const server_id = 1
    const [validationErrors, setValidationErrors] = useState([])
    const errors = []

    const [channelName, setChannelName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!channelName) errors.push("Name field is required")
        if (channelName.length > 30) errors.push("Name must be less than 30 characters in length")
        
        if(errors.length) return setValidationErrors(errors)

        const payload = {
            name: channelName,
            server_id: server_id
        }

        let newChannel = await dispatch(createChannel(payload))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                 {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                 <li key={idx}>{error}</li>
                 ))}
                </ul>   
                <label htmlFor="name">Name</label>
                <input
                  className='inputArea'
                  name='name'
                  type='text'
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}              
                />
            </form>
        </div>
    )
}

export default CreateChannel