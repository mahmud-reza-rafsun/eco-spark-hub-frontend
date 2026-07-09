/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const consent = document.cookie
            .split('; ')
            .find((row) => row.startsWith('simple-consent='));

        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = (): void => {
        const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
        document.cookie = `simple-consent=accepted; expires=${expires}; path=/; SameSite=Lax`;

        setShowBanner(false);
        window.location.reload();
    };

    const handleReject = (): void => {
        const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
        document.cookie = `simple-consent=rejected; expires=${expires}; path=/; SameSite=Lax`;

        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div style={styles.bannerWrapper}>
            <div style={styles.contentContainer}>
                <div style={styles.infoSection}>
                    <div style={styles.iconContainer}>
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={styles.cookieIcon}
                        >
                            <path
                                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                                fill="#D9A06F"
                                stroke="#A77852"
                                strokeWidth="2"
                            />
                            <circle cx="16" cy="18" r="3" fill="#6A4D34" />
                            <circle cx="28" cy="14" r="3" fill="#6A4D34" />
                            <circle cx="32" cy="26" r="3" fill="#6A4D34" />
                            <circle cx="20" cy="30" r="3" fill="#6A4D34" />
                        </svg>
                    </div>
                    <div style={styles.textContainer}>
                        <h4 style={styles.title}>Cookie Settings</h4>
                        <p style={styles.text}>
                            We use a small preference cookie to remember your selected theme.
                            We do not use analytics or marketing cookies.
                        </p>
                    </div>
                </div>

                <div style={styles.actionSection}>
                    <button
                        onClick={handleAccept}
                        style={styles.acceptBtn}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#10B981';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#10B981CC';
                        }}
                    >
                        Accept All
                    </button>
                    <button
                        onClick={handleReject}
                        style={styles.rejectBtn}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Decline & Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// **প্রফেশনাল ও আধুনিক CSS স্টাইল**
// এখানে ডার্ক/লাইট মোড কালার ভেরিয়েবল ব্যবহার করা হয়েছে
const styles: { [key: string]: React.CSSProperties } = {
    bannerWrapper: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%', // 2 side full width
        backgroundColor: '#1E293B', // ডার্ক মোড কালার, লাইট মোডে #FFFFFF দিতে পারেন
        borderTop: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
        color: '#FFFFFF', // ডার্ক মোডে টেক্সট কালার, লাইট মোডে #1F2937 দিতে পারেন
        padding: '24px',
        zIndex: 99999, // Ensure it's on top
        boxShadow: '0 -10px 25px rgba(0,0,0,0.15)', // Shadow from top
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1200px', // Center content on wide screens
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', // Responsive wrapping
        gap: '24px',
    },
    infoSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flex: 1, // Take available space
        minWidth: '300px',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    cookieIcon: {
        // Optional: Add hover animation
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#FFFFFF', // ডার্ক মোডে Title কালার
    },
    text: {
        margin: 0,
        fontSize: '14px',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.8)', // Subtle text
    },
    actionSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
    },
    acceptBtn: {
        backgroundColor: '#10B981CC', // Semi-transparent Green
        color: '#FFFFFF',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px', // Modern border radius
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'semibold',
        transition: 'background-color 0.3s ease', // Smooth hover
    },
    rejectBtn: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.6)', // Subtler color
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px', // Modern border radius
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'medium',
        transition: 'background-color 0.3s ease', // Smooth hover
    },
};

export default CookieBanner;
