import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { createServer } from "../../store/server"
function CreateServer(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) errors.push("Name field is required")
    if (name.length > 40) errors.push("Name must be less than 40 characters long.")

    if(errors.length) return setValidationErrors(errors)

    const payload = {
      owner_id: user.id,
      name: name,
      img_url: img
    }

    let newServer = await dispatch(createServer(payload))

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

export default CreateServer
