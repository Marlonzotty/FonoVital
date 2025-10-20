import { memo } from 'react'

type ProductGalleryImage = {
  src: string
  alt: string
}

type ProductGalleryProps = {
  images: ProductGalleryImage[]
  selected: string
  onChange?: (src: string) => void
  className?: string
}

function ProductGalleryComponent({
  images,
  selected,
  onChange,
  className = ''
}: ProductGalleryProps) {
  if (!images.length) {
    return null
  }

  const activeImage = images.find(image => image.src === selected) ?? images[0]

  return (
    <div className={`flex w-full max-w-xl flex-col items-center gap-5 ${className}`}>
      <div className="relative w-full overflow-hidden rounded-3xl border border-[#4A90E2]/40 bg-white shadow-lg">
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="aspect-[4/3] w-full object-contain p-6 sm:aspect-square sm:p-8"
        />
      </div>

      <div className="flex w-full gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible md:grid-cols-6 lg:grid-cols-7">
        {images.map((image, index) => {
          const isSelected = image.src === activeImage.src

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={`group relative flex h-20 min-w-[4.5rem] items-center justify-center rounded-xl border bg-white transition duration-200 ease-out sm:h-24 sm:w-full ${
                isSelected
                  ? 'border-[#4A90E2] shadow-md ring-2 ring-[#4A90E2]/50'
                  : 'border-gray-200 hover:border-[#4A90E2]'
              }`}
              onClick={() => onChange?.(image.src)}
              aria-pressed={isSelected}
              aria-label={`Selecionar miniatura ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full rounded-lg object-contain p-2"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

const ProductGallery = memo(ProductGalleryComponent)
ProductGallery.displayName = 'ProductGallery'

export default ProductGallery
