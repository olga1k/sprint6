import { Link } from 'react-router-dom';
export default function Home() {

    return(
        <header>
        <h1>Benvinguts!</h1>

        <button><Link to="main" className="link">Calcular el pressupost</Link></button>


        </header>
    )

}