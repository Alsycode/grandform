"use client"

import * as React from "react"
import Image from "next/image"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
  autoplay?: boolean
  autoplayInterval?: number
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    {
      className,
      testimonials,
      showArrows = true,
      showDots = true,
      autoplay = true,
      autoplayInterval = 4000,
      ...props
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const goNext = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [testimonials.length])

    const goPrev = React.useCallback(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length,
      )
    }, [testimonials.length])

    const advance = React.useCallback(
      (direction: 1 | -1) => {
        setExitX(direction * -150)
        setTimeout(() => {
          if (direction === 1) {
            goNext()
          } else {
            goPrev()
          }
          setExitX(0)
        }, 200)
      },
      [goNext, goPrev],
    )

    React.useEffect(() => {
      if (!autoplay || testimonials.length <= 1) return

      const interval = setInterval(() => {
        advance(1)
      }, autoplayInterval)

      return () => clearInterval(interval)
    }, [advance, autoplay, autoplayInterval, testimonials.length])

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          if (info.offset.x < 0) {
            goNext()
          } else {
            goPrev()
          }
          setExitX(0)
        }, 200)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "h-72 w-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative w-80 h-64">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                  "bg-white shadow-xl",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4">
                    <button
                      type="button"
                      aria-label="Previous testimonial"
                      onClick={() => advance(-1)}
                      className="text-2xl select-none cursor-pointer text-ink/20 hover:text-maroon"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      aria-label="Next testimonial"
                      onClick={() => advance(1)}
                      className="text-2xl select-none cursor-pointer text-ink/20 hover:text-maroon"
                    >
                      &rarr;
                    </button>
                  </div>
                )}

                <div className="p-6 flex flex-col items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    sizes="64px"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {testimonial.name}
                  </h3>
                  <p className="text-center text-sm text-ink/60">
                    {testimonial.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-gold"
                      : "bg-ink/15",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial }
