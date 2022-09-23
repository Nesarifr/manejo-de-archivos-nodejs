
const { get } = require("http");
const {borrarArchivo, crearArchivoyEscribir, agregarContenido, leerContenido, existeArchivo, leeryDevolverArrays} = require("./accionesFs")

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.url=`./${this.nombreArchivo}` 
    }
        
    async #crearID(){ //creao un metodo privado para la creacion de IDS
        let ultimoElemento=await leeryDevolverArrays(this.url) //busco del archivo existente el array para buscar luego el ID
        let ultimoID = JSON.parse(ultimoElemento[ultimoElemento.length -1 ])
        return ultimoID.id //devuelvo el ultimo ID
    }

    async save(elemento){ 
        const respuesta = await existeArchivo(this.url)
        if(respuesta){ //si es que existe el archivo ====>>>
            if(elemento.length>1){ //si el array a agregar/save tiene mas de un elemento sera un String leido anteriormente
                await agregarContenido(this.url, elemento[0] )
                for (let index = 1; index < elemento.length; index++) {
                    await agregarContenido(this.url, `\n${elemento[index]}` )
                }

            } else{ //si es un elemento solo, sera un elemento nuevo desde un array[objeto]
                elemento.id=await this.#crearID() +1//crea un ID
                const elementoString = `\n${JSON.stringify(elemento)}`//lo tranformo en string para guardarlo
                await agregarContenido(this.url, elementoString )
            }

        } else { //si no existe el archivo
            if(elemento.length>1){ //si el array tiene mas de un elemento
                await agregarContenido(this.url, elemento[0] )
                for (let index = 1; index < elemento.length; index++) {
                    await agregarContenido(this.url, `\n${elemento[index]}` )
                }
            } else{ // si el array es de un solo elemento es nuevo el primero en ingresar
                elemento.id=1 //el primer id del archivo
                const elementoString = `${JSON.stringify(elemento)}`//lo tranformo en string para guardarlo
                await crearArchivoyEscribir(this.url, elementoString)
            }
        }
        return elemento.id  //retorno el ID solicitado
    }

    async getById(numeroID){
        try{
            let array=await this.getAll(); //obtengo todos los elementos del array del archivo
            let index= 0;
            for (index ; index < array.length; index++) {
                let element = array[index];
                let objetoProducto=JSON.parse(element)
                if(objetoProducto.id==numeroID){ //si el ID es igual al solicitado devuelvo el elemento del array
                    console.log(`El elemento con ID: ${numeroID} es:`)
                    return objetoProducto
                } 
            }
            return `No existe el ID solicitado: ${numeroID} o ya fue borrado`
        }
        catch(err){
            return `No existe el ID solicitado: ${numeroID} o ya fue borrado`
        }
        
    }

    async getAll(){
        let array=await leeryDevolverArrays(this.url);
        return array
    }

    async deletedById(ID){
        let existeId = await this.getById(ID)
        if(typeof(existeId)== "string"){
            console.log(`No existe el ID solicitado: ${ID} o ya fue borrado`)
        } else{
            let arrays = await this.getAll()
            console.log(arrays[ID-1])
            console.log(`El producto sera removido...`)
            let arrayFiltrado = arrays.filter(item=>!item.endsWith(`"id":${ID}}`))
            await this.deleteAll() //elimino el archivo
            await this.save(arrayFiltrado) // hago uno nuevo y lo guardo filtrado
            this.getAll() //devuelve la lista sin ese elemento en el array
        }
        
    }

    async deleteAll(){
        await borrarArchivo(this.url)
    }
}

module.exports={Contenedor}