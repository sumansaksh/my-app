async function getData(url){

    let res = await fetch(url)
    let data = await res.json()

    return data

}

function append (data,container) {


   
    data.meals.forEach(({strMealThumb,strMeal,strInstructions}) => {

        console.log(strInstructions)
        let div = document.createElement("div")
        let div2 = document.createElement("div")
        let p = document.createElement("p")

        p.innerText = strMeal

        let img = document.createElement("img")

       img.src = strMealThumb


       div.append(p,img)

div2.append(strInstructions)
    container.append(div,div2)

    })

  
}


export{getData, append}