import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

import api from '../../services/api';

import './filme-info.css'

function Filme() {  
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                }).
                catch(() => {
                    console.log("FILME NAO ENCONTRADO")
                    navigate('/', {replace: true})
                    return
                })
        }

        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [id, navigate])

    const salvarFilme = () => {
        const minhaLista = localStorage.getItem("@primeflix") //quero o retorno dessa variável se existir

        let filmesSalvos = JSON.parse(minhaLista) || [] //se tiver alguma coisa ele converte o objeto em json com o parse e armazena na variável se não cria uma lista vazia

        //verifica se o filme já está salvo
        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Este filme já está na lista!")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))//já que nao se pode salvar um array
        toast.success("Filme salvo com sucesso!")
    } 



    if (loading) {
        return (
            <div className="filme-info">
                <h1>carregando detalhes</h1>

            </div>
        )
    }
    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avalição: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a rel="external" target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer 
                    </a>
                </button>
            </div>
        </div>
    )


}

export default Filme;