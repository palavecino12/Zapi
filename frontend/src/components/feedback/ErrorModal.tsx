import { useState } from "react"
import { InfoModal } from "./InfoModal"

type Props = {
    error: string | null
}

export const ErrorModal = ({ error }: Props) => {
    const [open, setOpen] = useState(false)
    const [prevError, setPrevError] = useState(error)

    if (error !== prevError) {
        setPrevError(error)
        if (error) setOpen(true)
    }

    return (
        <InfoModal open={open} onAccept={() => setOpen(false)}>
            <h1>{error}</h1>
        </InfoModal>
    )
}