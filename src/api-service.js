const TOKEN = 'c0b0b6b206e6978566cacde8a845eae33416548a'

export class API {

    static loginUser(body) {
        const AUTH_URL = `http://127.0.0.1:8000/auth/`
        const FETCH_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
        return fetch(AUTH_URL, FETCH_OPTIONS)
            .then(res => res.json())

    }
    static updateMovie(mov_id, body) {
        const RATE_URL = `http://127.0.0.1:8000/api/movies/${mov_id}/`
        const FETCH_OPTIONS = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        }
        return fetch(RATE_URL, FETCH_OPTIONS)
            .then(res => res.json())

    }

    static createMovie(body) {
        const CREATE_NEW_MOVIE_URL = `http://127.0.0.1:8000/api/movies/`
        const FETCH_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        }
        return fetch(CREATE_NEW_MOVIE_URL, FETCH_OPTIONS)
            .then(res => res.json())
    }

    static deleteMovie(mov_id) {
        const DELETE_MOVIE_URL = `http://127.0.0.1:8000/api/movies/${mov_id}/`
        const FETCH_OPTIONS = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
        }
        return fetch(DELETE_MOVIE_URL, FETCH_OPTIONS)
    }
}