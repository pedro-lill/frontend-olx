import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://192.168.129.122:5000';

//192.168.129.122:5000';
//alunos.b7web.com.br';

const apiFetchFile = async (endpoint, body) => {
    if (!body.token) {                            // if there is no token in the body
        const token = Cookies.get('token');       // if there is no token in the body, get the token from the cookies
        if (token) {
            body.append('token', token);        // append the token to the body            
        }
    }
    try {

        const res = await fetch(
            BASEAPI + endpoint, 
            {
            method: 'POST',
            body
        });
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/signin';       // if the user is not allowed, redirect to the signin page 
            return;
        }

        return json;

    } catch (e) {
        console.log(e);
    }
}


const apiFetchPost = async (endpoint, body) => {
    if (!body.token) {                            // if there is no token in the body
        let token = Cookies.get('token');       // if there is no token in the body, get the token from the cookies
        if (token) {
            body.token = token;
        }
    }

    try {

        const res = await fetch(BASEAPI + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)      // convert the body to a JSON string
        });
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/signin';       // if the user is not allowed, redirect to the signin page 
            return;
        }

        return json;
    }
    catch (e) {
        console.log(e);
    }

}

const apiFetchPut = async (endpoint, body) => {
    if (!body.token) {                            // if there is no token in the body
        let token = Cookies.get('token');       // if there is no token in the body, get the token from the cookies
        if (token) {
            body.token = token;
        }
    }

    try {

        const res = await fetch(BASEAPI + endpoint, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)      // convert the body to a JSON string
        });
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/signin';       // if the user is not allowed, redirect to the signin page 
            return;
        }
        return json;
    }
    catch (e) {
        console.log(e);
    }
}

const apiFetchGet = async (endpoint, body = []) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    try {
        const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);// qs.stringify converts the body to a query string
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/signin';
            return;
        }
        return json;
    }
    catch (e) {
        console.log(e);
        return null
    }
}

const OlxAPI = {

    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            { email, password }
        );
        return json;
    },

    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            { name, email, password, state: stateLoc }
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            { id, other }
        );
        return json;
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        )
        return json;
    },
    
    getUserInfo: async () => {
        const json = await apiFetchGet("/user/me");
        return json;
    },

    newAd: async (fData) => {
        const json = await apiFetchFile("/ad/add", fData);
        return json;
    },

    updateUser: async (body) => {
        const json = await apiFetchPut("/user/me", body);
        return json;
    },

    updateAd: async (body, id) => {
        const json = await apiFetchFile("/ad/" + id, body);
        return json;
    },
};

export default () => OlxAPI;  