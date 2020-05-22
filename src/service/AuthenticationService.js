class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('jwtToken', token);
    }

    createJWTToken(token) {
        return 'Bearer ' +  token
    }

    getHeaders() {
        const token = sessionStorage.getItem('jwtToken');
        return this.createJWTToken(token);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('jwtToken');
    }
}

export default new AuthenticationService();