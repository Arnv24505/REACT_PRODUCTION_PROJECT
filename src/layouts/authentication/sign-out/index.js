import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../store/user/slice/userSlice'
import { logoutUser } from '../../../store/user/saga/userSaga'

function Basic () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(userSelector)
  useEffect(() => {
    if(user) {
      dispatch(logoutUser({ navigate }))
    } else {
      navigate('/login')
    }
  }, [user])
  return (
    <></>
  )
}

export default Basic
