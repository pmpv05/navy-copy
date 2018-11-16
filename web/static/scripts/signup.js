import { post } from './api.js';

document.getElementById('formSignup').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    const role = "user";
    const response = await post('/users', {
        email,
        name,
        password,
        role,
    });

    if (response.status === 201) {

        await post('/sessions', {
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
    } else {
        alert('Imposible crear usuario');
    }

}