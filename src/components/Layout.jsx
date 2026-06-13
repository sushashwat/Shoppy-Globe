import React, {useState, useCallback} from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Toast from "./Toast";

/** Layout Component
 *
 * Main layout wrapping all pages with:
 * - Header (navigation)
 * - Toast notification system
 * - Outlet for page content
 *
 * Provides toast context via callback
 */

function Layout() {
    const [toastMessage, setToastMessage] = useState('')
    const [isToastVisible, setIsToastVisible] = useState(false)

    // Function to show toast (called from anywhere)
    const showToast = useCallback((message) => {
        setToastMessage(message)
        setIsToastVisible(true)
    }, [])

    // Function to close toast
    const closeToast = useCallback(() => {
        setIsToastVisible(false)
    }, [])

    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet context={{ showToast }} />
            </main>
            <Toast message={toastMessage} isVisible={isToastVisible} onClose={closeToast} />
        </>
    )
}

export default Layout;
