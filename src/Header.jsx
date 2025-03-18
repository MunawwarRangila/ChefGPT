import chef from './assets/Chef.png'
export default function Header(){
    return (
        <header className='header'>
            <img src={chef}/>
            <h1>ChefGPT</h1>
        </header>
    )
}