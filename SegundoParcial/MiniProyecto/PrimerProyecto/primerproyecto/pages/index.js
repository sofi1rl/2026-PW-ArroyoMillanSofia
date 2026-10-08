import { Main } from "next/document";
import Link from "next/link";
export default function Home(){
    return(
        <main>
            <h1>
                Esto es un ejemplo de agina principal con Next
            </h1>
            <p>
                <Link to="/practica/1">Ir a pagina 1</Link>
            </p>
        </main>
    );
}