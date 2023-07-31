import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { createServer } from "../../store/server"
function CreateServer(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const [name, setName] = useState("")
  const [img, setImg] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const handleSubmit = async (e) => {
  }

  return (
    <div></div>
  )
}

export default CreateServer
