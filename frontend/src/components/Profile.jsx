import React from 'react'

const Profile = ({user}) => {
    return (
        <>
            <h2>Profile</h2>
            {Object.entries(user).map(([key, value]) => {
                return (key != "user_id" && key != "user_is_admin") && <p key={key}><strong>{key.replace("user_", "").replace('_', ' ')}</strong> : {value}</p>
            })}
        </>
    )
}

export default Profile