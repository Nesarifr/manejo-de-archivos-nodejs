const {Contenedor} = require("./contenedor.js")


const productos = new Contenedor("producto.txt")
let productoPrueba={
    title: "escuadra",
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}
let productoPrueba2={
    title: "calculadora",
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}
let productoPrueba3={
    title: "Globo Terráqueo",                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}

async function main(){
    console.log(await productos.save(productoPrueba))
    console.log(await productos.save(productoPrueba2))
    console.log(await productos.save(productoPrueba3))
    console.log(await productos.getById(12))
    console.log(await productos.getAll())
    await productos.deletedById(10)
    console.log(await productos.getAll())
    // await productos.deleteAll()
    console.log(await productos.getAll())
}


main()