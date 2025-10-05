import { useIdeas } from './hooks'
import type { Idea } from './model'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { P } from '@/shared/components/typography'
import { LoaderIcon } from 'lucide-react'
import { MyVotes, Votes } from '@/entities/user/ui'

export const Ideas = () => {
  const { ideas, ideasAreLoading, ideasError } = useIdeas()

  if (ideasAreLoading)
    return <LoaderIcon className='m-auto' aria-label='Загрузка...' />

  if (ideasError)
    return <P>Ошибка загрузки идей. Попробуйте обновить страницу</P>

  if (!ideas || ideas.length === 0)
    return <P>Идеи отсутствуют. Добавьте их с помощью seed скрипта</P>

  return (
    <ul className='flex flex-col flex-wrap gap-4'>
      {ideas.map(idea => (
        <IdeaItem key={idea.id} {...idea} />
      ))}
    </ul>
  )
}

function IdeaItem({ title, description, votes }: Idea) {
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
          <Button type='submit' className='w-full'>
            Голосовать
          </Button>
        </CardFooter>
      </Card>
    </li>
  )
}
