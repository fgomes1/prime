import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import './favoritos.css'
const Favoritos = () => {
    const [filmes, seteFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix")
        seteFilmes(JSON.parse(minhaLista) || [])
    }, [])

    const excluirFilme = (id) => {
        console.log(filmes)
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        seteFilmes(filtroFilmes)

        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))//converção ja que nao se pode passar um objeto
        toast.success("O filme foi removido com sucesso!")
    }

    return (
        <div className="meus-filmes">
            <h1>Meus filmes</h1>
            {filmes.length === 0 && <span>Você não possui filme salvo :( </span>}
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos