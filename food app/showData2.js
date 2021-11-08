<<<<<<< HEAD
async function getData(url){

    let res = await fetch(url)
    let data = await res.json()

    return data

}

function append (data,container,Vidcontainer) {


   
    data.categories.forEach(({strCategoryDescription,strCategory,strCategoryThumb}) => {
        
        let div = document.createElement("div")
        let p = document.createElement("p")
        let p2 = document.createElement("div")


        p.innerText = strCategory
        p2.innerText=strCategoryDescription

        let img = document.createElement("img")

       img.src = strCategoryThumb

       div.append(p,img,p2)

    container.append(div)
})

  
}


=======
async function getData(url){

    let res = await fetch(url)
    let data = await res.json()

    return data

}

function append (data,container,Vidcontainer) {


   
    data.categories.forEach(({strCategoryDescription,strCategory,strCategoryThumb}) => {
        
        let div = document.createElement("div")
        let p = document.createElement("p")
        let p2 = document.createElement("div")


        p.innerText = strCategory
        p2.innerText=strCategoryDescription

        let img = document.createElement("img")

       img.src = strCategoryThumb

       div.append(p,img,p2)

    container.append(div)
})

  
}


>>>>>>> 88c49ccd6ad850de3c31feef1c530e1e8efd0c45
export{getData, append}