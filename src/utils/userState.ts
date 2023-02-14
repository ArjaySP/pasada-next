import authState from './authState'

const userState = ref<Record<string, string | number> | undefined>()

const getUser = async () => {
  const user = await axios.get(`/userManagement/${authState.value!.id}`)
  userState.value = user.data.results[0]
  return userState.value
}
const isAdmin = () => {
  return authState.value!.access_level <= 2
}
export default userState
export { getUser, isAdmin }
