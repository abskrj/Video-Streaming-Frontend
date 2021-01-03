import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default function Profile() {
    const history = useHistory();

    useEffect(() => {
        const lastLogin = parseInt(localStorage.getItem('lastLogin')) || null;

        if (!lastLogin) {
            history.push('/login');
        }

        const validLoginTime = lastLogin + 604800000;

        if (validLoginTime < Date.now()) {
            history.push('/login');
        }

    }, [])

    return (
        <div>
            <h2>Profile [UNDER DEV]</h2>
        </div>
    )
}
