import axios from 'axios';

let api = axios.create({
    headers: {
        'Client-ID': 'yzeq8352akywac6ijs2um4zvokjrof',
        'Authorization': 'Bearer ygruvhrszm2fxhn0u40ffomtkd363t'

    }
})

/*

    CLIENT-ID = yzeq8352akywac6ijs2um4zvokjrof
    REDIRECT = 'http://127.0.0.1/'

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token
    
    LIEN REMPLI =     LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id=yzeq8352akywac6ijs2um4zvokjrof&redirect_uri=http://localhost/3000/&response_type=token
*/
export default api;

// a passer en parametre pour obtenir un jeton fry5zngaq25caiyod99ahfb8c3hxfh