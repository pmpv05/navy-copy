import { getToken } from './token.js';

let tokenEncoded = getToken();

if (tokenEncoded) {


    var splitToken = tokenEncoded.split(".");
    var token = JSON.parse(atob(splitToken[1]));

    if ('administrator' !== token.role) {
        document.getElementById('adminProfile').style.display = "none";
    } else {
        document.getElementById('adminProfile').style.display = "block";
    }

}