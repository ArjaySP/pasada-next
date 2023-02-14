interface Auth {
  id: number
  token: string
  access_level: number
}

const authState = useLocalStorage<Auth | undefined>(
  'user',
  { id: 0, token: '', access_level: 0 },
)

export default authState
