import { useState } from "react"

export const useModal = () => {
    const [isOpenModal, setOpenModal] = useState(false)
    return {isOpenModal, setOpenModal}
}