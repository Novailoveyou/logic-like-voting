import { useEffect, useState } from 'react'

type YearProps = {
  year: number
}

/**
 * @description A component to display the current year, updating automatically
 */
export function Year({ year: defaultYear }: YearProps) {
  const [year, setYear] = useState(defaultYear)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return <time dateTime={`${year}`}>{year}</time>
}
