import { Ideas } from '@/entities/idea/ui'
import { Container } from '@/shared/components/container'
import { H1 } from '@/shared/components/typography'
import { View } from '@/shared/components/view'

export function HomeView() {
  return (
    <View>
      <section>
        <H1>Идеи</H1>
        <Container>
          <Ideas />
        </Container>
      </section>
    </View>
  )
}
