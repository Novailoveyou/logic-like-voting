import { initPrisma } from './plugins/prisma.js'

const prisma = initPrisma()

type SeedData<
  Entity extends Extract<keyof typeof prisma, 'user' | 'idea' | 'vote'>,
> = Parameters<(typeof prisma)[Entity]['upsert']>['0']['create'][]

const USERS = [
  {
    id: 'b553daa7-c8cd-4879-ad75-7bff1644041b',
    ip: '0.0.0.0',
  },
  {
    id: '48741cef-b084-4563-b8aa-e2892bb9315c',
    ip: '0.0.0.1',
  },
] as const satisfies SeedData<'user'>

const IDEAS = [
  {
    id: '6aa8871d-6665-4e13-98db-efcecf78d28e',
    title: 'Алфавитное Сафари',
    description:
      'Весёлое обучающее приложение, где дети исследуют красочные миры, сопоставляя буквы с животными. Каждая буква открывает нового друга-животного с забавными анимациями и звуками.',
  },
  {
    id: 'a6797f99-c952-403a-9fe3-27344fc38909',
    title: 'Фабрика Счётных Конфет',
    description:
      'Дети помогают управлять волшебной конфетной фабрикой, считая, сортируя и упаковывая разноцветные сладости. Они осваивают базовые математические навыки, создавая вкусные виртуальные угощения.',
  },
  {
    id: '8f5079d5-ef59-4bf5-81ab-ee1564dde2ad',
    title: 'В Поисках Фигур',
    description:
      'Дети отправляются в сафари-приключение, чтобы найти спрятанные фигуры в дикой природе. Они узнают круги, квадраты и треугольники в животных, растениях и пейзажах, изучая основы геометрии.',
  },
] as const satisfies SeedData<'idea'>

const VOTES = [
  {
    id: 'a117aba9-64e4-47f4-992f-9bcc2e124ff8',
    value: 2,
    ideaId: IDEAS[0].id,
    userIp: USERS[0].ip,
  },
  {
    id: 'abd15a78-ec2e-4382-a7e7-8f9e1a94f2af',
    value: 1,
    ideaId: IDEAS[0].id,
    userIp: USERS[1].ip,
  },
] as const satisfies SeedData<'vote'>

async function main() {
  await Promise.all(
    USERS.map(({ id, ip }) =>
      prisma.user.upsert({
        where: {
          id,
        },
        update: {},
        create: {
          id,
          ip,
        },
      }),
    ),
  )

  await Promise.all(
    IDEAS.map(({ id, title, description }) =>
      prisma.idea.upsert({
        where: { id },
        update: {
          title,
          description,
        },
        create: {
          id,
          title,
          description,
        },
      }),
    ),
  )

  await Promise.all(
    VOTES.map(({ id, ideaId, userIp, value }) =>
      prisma.vote.upsert({
        where: {
          id,
        },
        update: {},
        create: {
          id,
          userIp,
          ideaId,
          value,
        },
      }),
    ),
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
