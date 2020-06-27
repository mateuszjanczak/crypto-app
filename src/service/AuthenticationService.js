import ApiService from "./ApiService";

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return fetch(`${ApiService.api}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        });
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('jwtToken', token);
    }

    getHeaders() {
        return sessionStorage.getItem('jwtToken');
    }

    isLogged() {
        return sessionStorage.getItem('authenticatedUser') && sessionStorage.getItem('jwtToken');
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('jwtToken');
    }
}

export default new AuthenticationService();