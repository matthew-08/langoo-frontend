import React, { useEffect } from 'react'

function useOnHoverOutside(
    ref: React.MutableRefObject<null | HTMLElement>,
    handler: () => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return
            }
            handler()
        }
        document.addEventListener('mouseover', listener)
        return () => {
            document.removeEventListener('mouseout', listener)
        }
    }, [ref, handler])
}

export default useOnHoverOutside
