import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { updateServer } from "../../store/server"

function UpdateServer(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  let placeholderId = 1
  const history = useHistory

  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [validationErrors, setValidationErrors] = useState([])

  const error = []

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) error.push("Name field is required")
    if (name.length > 40) error.push("Name must be less than 40 characters long.")

    if(error.length) return setValidationErrors(error)


    const payload = {
      owner_id: user.id,
      name: name,
      img_url: img
    }

    let updatedServer = await dispatch(updateServer(placeholderId, payload))
  }

  return (
    <div className="ServerForm">
    <form onSubmit={handleSubmit}>
    <ul className="errorsServer">
      {validationErrors.length > 0 && validationErrors.map((error, idx) => (
          <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
        ))}
      </ul>
      <div className="nameInputDiv">
        <label htmlFor="Name" className="nameInput">Server Name</label>
        <input
          className='inputArea'
          name="name"
          type='textarea'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="imageInputDiv">
        <label htmlFor="Img" className="imageInput">Image Link</label>
        <input
          className='inputArea'
          name="img"
          type='textarea'
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>
      <div className="btnSubmit">
        <button id="submitBtn">Create</button>
      </div>
    </form>
  </div>
  )
}

export default UpdateServer
