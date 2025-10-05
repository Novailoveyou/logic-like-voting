import { useIdeas, useVote } from './hooks'
import type { Idea } from './model'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { P } from '@/shared/components/typography'
import { LoaderIcon } from 'lucide-react'
import { MyVotes, Votes } from '@/entities/user/ui'
import { Button } from '@/shared/components/ui/button'
import { useStore } from '@/app/store'

export const Ideas = () => {
  const { ideasAreLoading, ideasError } = useIdeas()
  const ideas = useStore(state => state.ideaSlice.ideas)

  if (ideasAreLoading)
    return <LoaderIcon className='m-auto' aria-label='Загрузка...' />

  if (ideasError)
    return <P>Ошибка загрузки идей. Попробуйте обновить страницу</P>

  if (ideas.length === 0)
    return <P>Идеи отсутствуют. Добавьте их с помощью seed скрипта</P>

  return (
    <ul className='flex flex-col flex-wrap gap-4'>
      {ideas.map(idea => (
        <IdeaItem key={idea.id} {...idea} />
      ))}
    </ul>
  )
}

function IdeaItem({ id, title, description, votes }: Idea) {
  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Голосов: всего - <Votes votes={votes} />, моих -{' '}
            <MyVotes votes={votes} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <P>{description}</P>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <CastVote ideaId={id} />
        </CardFooter>
      </Card>
    </li>
  )
}

function CastVote({ ideaId }: { ideaId: Idea['id'] }) {
  const { voteIsMutating, voteError, triggerCastVote } = useVote(ideaId)
  const handleVote = () => triggerCastVote()

  const isLimit =
    voteError &&
    typeof voteError === 'object' &&
    'status' in voteError &&
    typeof voteError.status === 'number' &&
    voteError.status === 409

  return (
    <Button
      type='submit'
      className='w-full'
      onClick={handleVote}
      disabled={voteIsMutating || isLimit}
      title={
        voteIsMutating
          ? 'Загрузка...'
          : isLimit
          ? 'Достигнут лимит голосов'
          : ''
      }>
      {isLimit ? 'Достигнут лимит голосов' : 'Голосовать'}{' '}
      {voteIsMutating && <LoaderIcon aria-label='Загрузка...' />}
    </Button>
  )
}
