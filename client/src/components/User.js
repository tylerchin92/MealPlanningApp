import React from 'react';


function User ({user, onEdit, deleteUser}) {
    return (
        <tr>
            <td>{user.userName}</td>
            <td><button class='btn btn-outline-dark' onClick={() => onEdit(user)}>Edit</button></td>
            <td><button class='btn btn-outline-dark' onClick={() => deleteUser(user.userID)}>Delete</button></td>
        </tr>
    );
};

export default User