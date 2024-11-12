import { useState } from "react";

const Card =({customClasses})=>{
    const [likes,setLikes] = useState(0);
    const[titlecolor,seTitleColor] = useState('text-black');

    const toggleTitleColor = ()=>{
        seTitleColor((prevColor) =>
            prevColor === 'text-black'?'text-blue-500':'text-black'
    );
    };
    return(
        
        <div className={`max-w-sm rounded overflow-hidden show-lg p6 bg-white ${customClasses}`}>
            <h2 className={`font-bold text-xl mb2 ${titlecolor}`}>Card Title</h2>
            <p className="text-gary-700 text-base">This is some example text in the card</p>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-puple-700" onClick={()=>setLikes(likes+1)}>
                likes:{likes}
            </button>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={toggleTitleColor}>
                Toogle Title Color
            </button>
        </div>
    )
}
export default Card;