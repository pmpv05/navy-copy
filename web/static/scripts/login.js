import { post } from './api.js';
import { setToken } from './token.js';

document.getElementById('formLogin').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    let message;

    const response = await post('/sessions', {
        email,
        password,
    });

    if (response.status === 200) {
        response.json().then(
            data => {
                setToken(data.token);
                message = data.message;
            }
        );

        window.location.replace(`/home`);
    } else {
        alert('User and password incorrect');
        location.href = `/login`;

    }

}