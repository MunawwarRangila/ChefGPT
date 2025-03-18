import ReactMarkDown from "react-markdown";

export default function Recipe(props){
    return(
        <>
            <ReactMarkDown>{props.recipeContent}</ReactMarkDown>
            
        </>
    )
}