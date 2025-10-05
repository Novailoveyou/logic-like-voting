import { useUser } from './hooks'
import type { Vote } from '../vote/model'

export const MyVotes = ({ votes }: { votes: Vote[] }) => {
  const { user, userIsLoading, userError } = useUser()

  if (userIsLoading) return <span>Загрузка...</span>

  if (userError) return <span>Ошибка!</span>

  if (!user?.ip) return <span>Не определено</span>

  return votes.filter(vote => vote.userIp === user.ip).length
}

export const Votes = ({ votes }: { votes: Vote[] }) => {
  return votes.length
}
