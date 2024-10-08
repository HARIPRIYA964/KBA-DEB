let movie = [];
let genre = [];



function addmovie(){
    const movieinput = document.getElementById("movie").value;
    const genreinput = document.getElementById("genre").value;
    let result ;
    if(movie !=='' && !isNaN(genre) && genre>=1 && genre<= 3){
        movie.push(movieinput);
        genre.push(genreinput);
        const li = document.createElement("li")
        
    
    switch(genre){
        case 1 : classList.genre("Action");
                    break;
        case 2 : classList.genre("Comedy");
                    break;
        case 3 : classList.genre("Drama");
                    break;
        default : document.getElementById("Ivalid Genre")

        }
        

    }
}

