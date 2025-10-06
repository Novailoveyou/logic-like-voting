import { useCastVote, useIdeas } from './hooks'
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
import { useStore } from '@/app/store'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { LOADING_IDEA_SKELETONS } from './constants'
import { cn } from '@/shared/lib/utils'

export const Ideas = () => {
  const { areIdeasAreLoading, areIdeasValidating, ideasError } = useIdeas()
  const ideas = useStore(state => state.ideaSlice.ideas)

  if (ideasError)
    return <P>Ошибка загрузки идей. Попробуйте обновить страницу</P>

  if (ideas.length === 0 && !areIdeasAreLoading)
    return <P>Идеи отсутствуют. Добавьте их с помощью seed скрипта</P>

  return (
    <ul className='flex flex-col flex-wrap gap-4'>
      {(areIdeasAreLoading ? LOADING_IDEA_SKELETONS : ideas).map(idea => (
        <IdeaItem
          key={idea.id}
          {...idea}
          isLoading={areIdeasAreLoading}
          isValidating={areIdeasValidating}
        />
      ))}
    </ul>
  )
}

function IdeaItem({
  id,
  title,
  description,
  totalVotes,
  myVotes,
  isLimit,
  isLoading,
  isValidating,
}: Idea & { isLoading?: boolean; isValidating?: boolean }) {
  return (
    <li
      aria-label={isLoading ? 'Загрузка...' : ''}
      title={isLoading ? 'Загрузка...' : ''}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isLoading ? <Skeleton className='w-full h-4' /> : title}
          </CardTitle>
          <CardDescription>
            Голосов: всего -{' '}
            {isLoading ? (
              <Skeleton className='w-4 h-3.5' />
            ) : (
              <span className={cn(isValidating && 'text-muted')}>
                {totalVotes}
              </span>
            )}
            , моих -{' '}
            {isLoading ? (
              <Skeleton className='w-4 h-3.5' />
            ) : (
              <span className={cn(isValidating && 'text-muted')}>
                {myVotes}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <P>
            {isLoading ? (
              <>
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-full h-4' />
              </>
            ) : (
              description
            )}
          </P>
        </CardContent>
        <CardFooter className={'flex-col gap-2'}>
          {isLoading ? (
            <Skeleton className='w-full h-6' />
          ) : isLimit ? (
            <P>Вы уже достигли лимита голосов за эту идею</P>
          ) : (
            <VoteButton ideaId={id} isValidating={isValidating} />
          )}
        </CardFooter>
      </Card>
    </li>
  )
}

function VoteButton({
  ideaId,
  isValidating,
}: {
  ideaId: Idea['id']
  isValidating?: boolean
}) {
  const { isCastVoteMutating, triggerCastVote } = useCastVote(ideaId)

  const handleVote = () =>
    triggerCastVote(null, {
      optimisticData: vote => ({
        value: (vote?.value || 0) + 1,
        isLimit: vote?.isLimit || false,
      }),
    })

  return (
    <Button
      type='submit'
      className={cn('w-full', isValidating && 'text-muted bg-muted-foreground')}
      onClick={handleVote}
      disabled={isValidating || isCastVoteMutating}
      title={isValidating || isCastVoteMutating ? 'Загрузка...' : ''}>
      {isValidating ? 'Обновление данных...' : 'Голосовать'}
      {isCastVoteMutating && <LoaderIcon aria-label='Загрузка...' />}
    </Button>
  )
}
