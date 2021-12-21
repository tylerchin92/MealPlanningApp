import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealPlannerNavbar from '../components/Navbar';



function EditUser({ userToEdit }) {

    const storedName = localStorage.getItem('savedName');
    const storedID = Number(localStorage.getItem('savedID'));
    const [userName, setUserName] = useState(userToEdit ? userToEdit.userName : storedName);
    const [userID] = useState(userToEdit ? userToEdit.userID : storedID);

    useEffect(() => {
        if (userToEdit !== undefined) {
            localStorage.setItem('savedID', userToEdit.userID);
            localStorage.setItem('savedName', userToEdit.userName);
        }
    }, [userToEdit]);

    const history = useHistory();

    const changeUser = async e => {
        e.preventDefault();
        const editedUser = { userName };
        const response = await fetch(`/users/${userID}`, {
            method: 'PUT',
            body: JSON.stringify(editedUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                history.push('/ViewUsers')
            })
            .catch(err => console.log(err))

    };


    return (
        <div>
            <MealPlannerNavbar />
            <form>
                <h1>Edit User</h1>
                <div>
                    <label>Username:</label>
                    <input type="text"
                        value={userName}
                        placeholder='Enter Your New User Name'
                        onChange={e => setUserName(e.target.value)} />
                </div>
                <button class='btn btn-outline-dark' onClick={e => changeUser(e)}>Edit User</button>
            </form>
        </div>
    )
};

export default EditUser