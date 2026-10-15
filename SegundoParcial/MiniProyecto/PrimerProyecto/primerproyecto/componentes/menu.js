import link from 'next/link'
export default function Menu(){
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/">MiPrimerProyecto</Link>
            <Link to="/">Pagina2</Link>
        </nav>
    );
}