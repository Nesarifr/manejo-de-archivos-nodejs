const fs = require("fs")

async function crearArchivoyEscribir(ruta, contenido){
    try{
        await fs.promises.writeFile(ruta, contenido)
        console.log(`Se creo archivo ${ruta} con exito!! `)
    }
    catch(err){
        console.log(`error al crear el archivo  ${ruta}`)
    }
}

async function agregarContenido(ruta, contenido){
    try{
        await fs.promises.appendFile(ruta, contenido)
        console.log(`Se agrego el contenido al archivo ${ruta}!!`)
    }
    catch(err){
        console.log(err)
    }
}

async function leerContenido(ruta){
    try{
        const contenido = await fs.promises.readFile(ruta,'utf-8');
        return contenido
    }
    catch(err){
        console.log(err)
    }
}

async function leeryDevolverArrays(ruta){
    try{
        const contenido = await fs.promises.readFile(ruta,'utf-8');
        contenidoArray = contenido.split('\n')
        return contenidoArray
    }
    catch(err){
        console.log("No existe el archivo solicitado")
    }
}

async function existeArchivo(ruta){
    try{
        await fs.promises.access(ruta)        
        return true
    }
    catch(err) {
        console.log("No existe el archivo todavia...")
    }

}

async function borrarArchivo(ruta){
    try{
        await fs.promises.unlink(ruta)
        console.log("El archivo fue removido")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {borrarArchivo, crearArchivoyEscribir, agregarContenido,leerContenido,leeryDevolverArrays, existeArchivo, fs}