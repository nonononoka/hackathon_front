import { useState } from "react";

export const useSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    return {isSidebarOpen, setIsSidebarOpen}
}