import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

type ProductRatingProps = {
  rating: number
  count: number
  size?: 'sm' | 'base'
  className?: string
}

const buildStarState = (rating: number) => {
  const states: Array<'full' | 'half' | 'empty'> = []

  for (let i = 1; i <= 5; i += 1) {
    if (rating >= i) {
      states.push('full')
    } else if (rating >= i - 0.5) {
      states.push('half')
    } else {
      states.push('empty')
    }
  }

  return states
}

export default function ProductRating({
  rating,
  count,
  size = 'base',
  className = ''
}: ProductRatingProps) {
  const normalizedRating = Math.max(0, Math.min(5, rating))
  const starStates = buildStarState(normalizedRating)
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]'

  return (
    <div
      className={`flex flex-wrap items-center gap-1 text-xs sm:text-sm text-[#213547] ${className}`}
      aria-label={`Avaliação média ${normalizedRating.toFixed(1)} de 5 com ${count} avaliações`}
    >
      {starStates.map((state, index) => {
        if (state === 'full') {
          return <FaStar key={`star-${index}`} className={`text-[#F5B50A] ${iconSize}`} />
        }
        if (state === 'half') {
          return <FaStarHalfAlt key={`star-${index}`} className={`text-[#F5B50A] ${iconSize}`} />
        }
        return <FaRegStar key={`star-${index}`} className={`text-[#F5B50A] ${iconSize}`} />
      })}

      <span className="ml-2 text-gray-500">
        {normalizedRating.toFixed(1)} · {count}
      </span>
    </div>
  )
}
