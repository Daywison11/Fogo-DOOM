//array liner responsavel pela renderização linear do fogo
//cada elemento e equivalente a um pixel linear

const firePixelsArray = []

//variaveis responsvel pela autura e largura
const fireWidht = 45     
const fireHeght = 45

//paleta de cores
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


//função para inicializar 
function start(){
    //chamando as funçoes
    createFireDataStructure()
    createFireSource()
    

    setInterval(cauculateFirePropagation, 50 )
}
//função onde contem a strutura de dados do fogo
function createFireDataStructure(){
    const numberOfPixes = fireWidht * fireHeght
    for (let i = 0; i< numberOfPixes; i ++){
        firePixelsArray[i] = 0
    }
}
//funçãoconde caucula a animação do fogo
//esse script tem que estar em um loop infinito, ele que vai mapera pixel por pixel do indice do array
function cauculateFirePropagation(){
    for ( let column = 0; column < fireWidht; column++ ){
        for( let row = 0; row <fireHeght; row++ ){
            const pixelIndex = column + (fireWidht * row)

            updateFireItntencityPerPixel(pixelIndex )
        }
    }
    renderFire()
}



//basicamente ele vai ficar cauculando qual a intencidade do pixel de baixo, subritai um e aplice ele mesmo
//e assim sucesivamente
function updateFireItntencityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidht

    //caso o pixel de baixo for maior do que o valor do canvas
    //nao faça nada 
    if(belowPixelIndex >= fireWidht * fireHeght){
        return
    }

    //aqui vamo fazer a enfraquecimento da intencidade
    //com o valor random os pixels vao diminuir de forma aletatoria e nao linear 
    const decay = Math.floor(Math.random() *3) 
    
    
    //aqui e onde delimintamo o fogo, para que quando diminuir nao de valor negativo
    const belowPixelIndexFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity  = 
        belowPixelIndexFireIntensity - decay >=0 ? belowPixelIndexFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}




//função responsavel por renderizar o fogo
function renderFire(){
    
    //aqui vamos criar a variavel responsavel por renderizar o fogo la na div
    //em forma de tabela
    let html = '<table cellpadding=0 cellspacing=0>'

    //para cada pixel da altura do fogo
    //vamos criar uma teble row <tr>
    for (let row =0; row < fireHeght; row++){
        html += '<tr>'

        //para cada pixel da largura do fogo 
        //vamos criar uma table data (coluna) <td>
        for(let column = 0; column < fireWidht; column ++ ){

            //para visualizar
            //vamos começar injetando o indice do  array no meio dessa celular
            const pixelIndex = column + (fireWidht * row)


            //para saber onde esta o indice do array basicamente quando eu somar uma largura 
            //eu desço uma linha se somar duas vezes eu desço duas linhas 
            //o mesmo ocorre com a altura
            
            //aqui esta sendo printado dentro da celula o valor no meio da uma coluna, a cada vez que o for faz o loop

            //aqui pegamos cada valor individual do indice e armazenamos em uma var para controlarmos a intensidade do fogo 
            //e printamos em cada <td>
            const  fireIntensity = firePixelsArray[pixelIndex]

            const debug = truefalse()
            //quando debug estiver true vai mostrar a estrutura dos dados
            //quando estiver false vai mostrar celulas coloridas 
            if (debug ===true){
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r}, ${color.g}, ${color.b}`
                html += `<td class="pixel-td"style="background-color:rgb(${colorString});">`
                html += `<div class="pixel-index"> ${pixelIndex} </div>`
                html += fireIntensity
                html += '</td>'
            }
            else{
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r}, ${color.g}, ${color.b}`
                html += `<td class="pixel" style="background-color:rgb(${colorString})">`
                html += `</td>`
                
            }

            
        }

        html += '</tr>'
        
    }

    html+= '</table>'
    document.querySelector('#fireCanvas').innerHTML = html
}

//função que cria a fonte de fogo
//E tambem mapeia onde esta cada indice do array
function createFireSource(){
    for (let column = 0; column <= fireWidht; column++){
        const overflowPixelIndex = fireWidht * fireHeght
        const pixelIndex = (overflowPixelIndex - fireHeght) + column

        firePixelsArray[pixelIndex] = 36
    }
}


//funcao para validar se o debug vai estar verdadeiro ou falso
function truefalse(debug){
    let check = document.getElementById('estrutura')
    if (check.checked){
        debug = true
    }       
    else{
        debug = false
    } 
    return (debug)
}

start()


