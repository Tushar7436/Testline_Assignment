import { useEffect, useRef } from "react"

function MovingBackground(theme ) {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const updateViewBox = () => {
      svg.setAttribute("viewBox", `0 0 100 100`)
    }

    updateViewBox()
    window.addEventListener("resize", updateViewBox)

    return () => {
      window.removeEventListener("resize", updateViewBox)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full z-[-1]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: `var(--color-${theme.primary}-200)` }}>
            <animate
              attributeName="stop-color"
              values={`var(--color-${theme.primary}-200); var(--color-${theme.secondary}-200); var(--color-${theme.primary}-300); var(--color-${theme.primary}-200)`}
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" style={{ stopColor: `var(--color-${theme.secondary}-200)` }}>
            <animate
              attributeName="stop-color"
              values={`var(--color-${theme.secondary}-200); var(--color-${theme.primary}-300); var(--color-${theme.primary}-200); var(--color-${theme.secondary}-200)`}
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />

      {/* Swamp shape 1 */}
      <path fill={`var(--color-${theme.primary}-800)40`}>
        <animate
          attributeName="d"
          dur="20s"
          repeatCount="indefinite"
          values="M0,30 C30,60 70,60 100,30 L100,100 L0,100 Z;
                  M0,40 C30,10 70,10 100,40 L100,100 L0,100 Z;
                  M0,20 C30,50 70,50 100,20 L100,100 L0,100 Z;
                  M0,30 C30,60 70,60 100,30 L100,100 L0,100 Z"
        />
        <animate
          attributeName="fill"
          values={`var(--color-${theme.primary}-800)40; var(--color-${theme.secondary}-800)40; var(--color-${theme.primary}-700)40; var(--color-${theme.primary}-800)40`}
          dur="10s"
          repeatCount="indefinite"
        />
      </path>

      {/* Swamp shape 2 */}
      <path fill={`var(--color-${theme.secondary}-800)40`}>
        <animate
          attributeName="d"
          dur="25s"
          repeatCount="indefinite"
          values="M0,60 C20,40 50,40 80,60 L80,100 L0,100 Z;
                  M0,40 C20,60 50,60 80,40 L80,100 L0,100 Z;
                  M0,50 C20,30 50,30 80,50 L80,100 L0,100 Z;
                  M0,60 C20,40 50,40 80,60 L80,100 L0,100 Z"
        />
        <animate
          attributeName="fill"
          values={`var(--color-${theme.secondary}-800)40; var(--color-${theme.primary}-700)40; var(--color-${theme.secondary}-700)40; var(--color-${theme.secondary}-800)40`}
          dur="15s"
          repeatCount="indefinite"
        />
      </path>

      {/* Swamp shape 3 */}
      <path fill={`var(--color-${theme.primary}-700)40`}>
        <animate
          attributeName="d"
          dur="30s"
          repeatCount="indefinite"
          values="M0,70 C10,50 30,50 50,70 L50,100 L0,100 Z;
                  M0,50 C10,70 30,70 50,50 L50,100 L0,100 Z;
                  M0,60 C10,40 30,40 50,60 L50,100 L0,100 Z;
                  M0,70 C10,50 30,50 50,70 L50,100 L0,100 Z"
        />
        <animate
          attributeName="fill"
          values={`var(--color-${theme.primary}-700)40; var(--color-${theme.secondary}-700)40; var(--color-${theme.primary}-600)40; var(--color-${theme.primary}-700)40`}
          dur="20s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

export default MovingBackground

