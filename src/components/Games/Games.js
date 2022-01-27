import React, {useState, useEffect} from "react";
import api from "../../api";


function Games(){

    const [games, setGames] = useState([])  //création de tableau d'état tout les jeux que l'on veut afficher//

    useEffect(() => { //faire notre appel à l'API
        
        const fetchDATA = async () => {

            const result = await api.get('https://api.twitch.tv/helix/games/top') // attend le resultat de api.get grace à async
            // console.log(result);

            let dataArray = result.data.data;
            let finalArray = dataArray.map(game => {   // formate chaque elemt du tableau change la width et height
                let newUrl = game.box_art_url          //fait ref à l'img
                .replace("{width}", "250")
                .replace("{height}", "300");
            
            game.box_art_url = newUrl //on remplace l'url qui nous fourni par ntre nvelle url
            return game;
            });

            setGames(finalArray);     // rentre les nvelle url ds const games avec setGAmes

        }

        fetchDATA();

    }, []) // tableau vide évite la boucle infini, s'exécute 1 seule fois

    // console.log(games);

        return(

            <div>

            <h1 className="titreGames">Jeux les plus populaires</h1>

                <div className="flexAccueil">
                    {games.map((game,index) => (

                        <div className="carteGames">

                            <img src={game.box_art_url} alt="jeu profile pic" className="imgCarte" />  
                            
                            <div key={index} className="cardBodyGames"> 
                                                                                                        
                                <h5 className="titreCartesGammes">{game.name}</h5>
                                <div className="btnCarte">Regarder {game.name}</div>
                            </div>

                        </div>

                    ))}
    
                </div>

            </div>

        )
}
/*on map à travers le state qu'on rempli avec le finalArray et pour chaque elemt du tableau qui correspond à la valeur courante game(que l'on peut appeler comme on veut) */
//donne un index dif a chaque elemt du tableau ue l'on va maper
export default Games;