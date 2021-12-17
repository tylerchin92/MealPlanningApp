import React from 'react';
import User from './User';

function UsersTable({users, onEdit, deleteUser}) {
    return (
        <div>
            <h2>Users Table</h2>
        <table>
            <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Edit User</th>
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => <User
                        user={user}
                        onEdit={onEdit}
                        deleteUser={deleteUser}
                        key={i} />)}
                </tbody>
        </table>
        </div>
    );
};

export default UsersTable