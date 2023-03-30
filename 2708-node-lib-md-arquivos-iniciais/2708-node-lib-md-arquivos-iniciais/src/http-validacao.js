
import chalk from "chalk";


// extraiLinks é responsavel por pegar o objeto de links e mapear ele (map), assim extraindo os links em um array e fazendo um join() que transforma em String

function extraiLinks(arrLinks){
   return arrLinks.map((objetoLink)=> Object.values(objetoLink).join())
}

async function checaStatus (listaURLs){
    const arrStatus =await Promise
    .all(
        listaURLs.map(async(url) =>{
            
            try{
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`;

            } catch (erro){
                return manejaErros(erro)

            }
       })

    )
    return arrStatus

    
}

function manejaErros (erro){
   if(erro.cause.code === 'ENOTFOUND'){
    return "LINK INVALIDO OU NAO EXISTE";
   } else{
    return 'ocorreu algum erro'
   }
}



export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links)

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))

}



// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }