import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage({}) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/home")
  }, [])

  return <></>
}
