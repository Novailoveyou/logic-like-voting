import type { Vote } from '../idea/model'
import { useUser } from './hooks'

export const MyVotes = ({ votes }: { votes: Vote[] }) => {
  const { user, userIsLoading, userError } = useUser()

  if (userIsLoading) return <span>Загрузка...</span>

  if (userError) return <span>Ошибка!</span>

  if (!user?.ip) return <span>Не определено</span>

  return votes.reduce(
    (total, vote) => (vote.userIp === user.ip ? total + vote.value : total),
    0,
  )
}

export const Votes = ({ votes }: { votes: Vote[] }) => {
  return votes.reduce((total, vote) => total + vote.value, 0)
}
