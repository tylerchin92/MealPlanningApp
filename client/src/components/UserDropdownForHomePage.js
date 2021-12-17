import React from 'react';
import { useState, useEffect, useCallback } from 'react';



function UserDropdownForHomePage({ userID, onUserChange }) {

    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('All');

    const getUsers = async () => {
        await fetch('/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));

    };


    useEffect(() => {
        getUsers();
    }, []);

    const changeUser = (e, userName) => {
            onUserChange(e.target.value);
            setUserName(userName);
    };
  

    const mapping = () => {
        if (users !== null) {
            return users.map((user) => (
                <button class="dropdown-item" type="button" value={user.userID} onClick={e => changeUser(e, `${user.userName}'s`)}>{user.userName}</button>
            ));
        };
    };

    return (
        <div>
            <h1>Home: {userName} Meal Plans</h1>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter Meal Plans by User
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {mapping()}
                    <button class="dropdown-item" type="button" value='null' onClick={e => changeUser(e, 'All')}>All Meal Plans</button>
                </div>
            </div>

        </div>
    )
}

export default UserDropdownForHomePage