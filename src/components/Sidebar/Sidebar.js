import React, {useEffect, useState} from "react";
import api from "../../api";




function Sidebar(){

    const [topStreams, setTopStreams] = useState([]);

    useEffect(() =>{

        const fetchData = async () => {

            const result = await api.get("https://api.twitch.tv/helix/streams");

            let dataArray = result.data.data;
            // console.log(dataArray);

            let gameIDs = dataArray.map(stream => {
                return stream.game_id;
            })

            let UserIDs = dataArray.map(stream => {
                return stream.user_id;
            })
            // console.log(gameIDs, UserIDs);

            //création des URLS personnalisés

            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            //le ? permet de ne pas passé à la suite du code à droite tant que la valeur est null 

            let queryParamsGame = "";
            let queryParamsUsers = "";

            gameIDs.map(id => {
                return queryParamsGame = queryParamsGame + `id=${id}&`
            })
            UserIDs.map(id => {
                return queryParamsUsers = queryParamsUsers + `id=${id}&`
            })
            
            //url final

            let urlFinalGames = baseUrlGames + queryParamsGame;
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;

            // console.log(urlFinalGames, urlFinalUsers);

            ///appel
            let gamesNames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);
            
            let gamesNameArray = gamesNames.data.data;
            let arrayUsers = getUsers.data.data;
            // console.log(gamesNameArray, arrayUsers);

            //création du tableau final
            //Pr chaque topstream ajoute  element en fonction du nom du stream
            //Dans function map on doit retourner un tableau
            let finalArray = dataArray.map(stream => { 

                stream.gameName = "";
                stream.truePic = "";
                stream.login = "";

                gamesNameArray.forEach(name => {
                    arrayUsers.forEach(user => {
                        if (stream.user_id === user.id && stream.game_id === name.id) {
                            
                            stream.truePic = user.profile_image_url;
                            stream.gameName = name.name;
                            stream.login = user.login;
                
                        }
                    })
                })
                
                return stream;
            })

           setTopStreams(finalArray.slice(0,6)); 
        }
        
        fetchData();

    },[])
    
    console.log(topStreams);

    return(

        <div className="div sidebar">
            <h2 className="titreSidebar">Chaînes recommandées</h2>
            <ul className="listeStream">

            </ul>
        </div>


    )
}

export default Sidebar;