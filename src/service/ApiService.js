class ApiService {

    constructor(api) {
        this._api = api;
    }

    get api() {
        return this._api;
    }

    set api(value) {
        this._api = value;
    }
}

export default new ApiService(`http://localhost:8080`);