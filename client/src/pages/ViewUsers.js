import UsersTable from "../components/UsersTable";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MealPlannerNavbar from "../components/Navbar";


function ViewUsers({ setUserToEdit }) {


    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');

    const history = useHistory();

    const addUser = async () => {
        const newUser = { userName }
        const response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 201) {

        } else {
            alert(`Failed to add user, status code = ${response.status}. Make sure all required fields are filled out.`);
        };
        history.push('/ViewUsers');
    }


    const getUsers = async () => {
        const response = await fetch('/users');
        
        const data = await response.json();

        if (response.ok) {
            setUsers(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }
    };

    const deleteUser = async userID => {
        const response = await fetch(`/users/${userID}`, { method: 'DELETE' });
        if (response.status === 204) {
            window.location.reload(false);
        }
        else {
            console.error(`Failed to delete user with userID = ${userID}, status code = ${response.status}`)
        }
    };

    const onEdit = user => {
        setUserToEdit(user);
        history.push('/EditUser')
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <MealPlannerNavbar />
            <form>
                <h1>Create User</h1>
                <div>
                    <label for="userName">Username:</label>
                    <input type="text"
                        placeholder='Enter Your User Name'
                        onChange={e => setUserName(e.target.value)} />
                    <button class='btn btn-outline-dark' onClick={addUser}>Create User</button>
                </div>
            </form>
            <br />
            <UsersTable users={users} onEdit={onEdit} deleteUser={deleteUser} />
        </div>
    )
}

export default ViewUsers