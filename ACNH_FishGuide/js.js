let tabela = document.querySelector("#tabela");
let form = document.getElementById("myForm");

function drawLinhas(data, i){
        // LINHAS DA TABELA
        //criar container linha peixes
        let container= document.createElement("div");
        tabela.appendChild(container);
        container.className="linha_peixe";
        container.setAttribute("id","lp_" + i);
        let idContainer = document.querySelector("#lp_"+i);

        //criar imagem peixes
        let imgPeixe= document.createElement("img");
        idContainer.appendChild(imgPeixe);
        imgPeixe.className="peixe";
        imgPeixe.src= data[i].image_url;

        //criar nome peixes
        let nome= document.createElement("p");
        idContainer.appendChild(nome);
        nome.innerText = data[i].name;

        //criar mes peixes
        let mes= document.createElement("p");
        idContainer.appendChild(mes);
        mes.innerText = data[i].north.months;

        //criar horas peixes
        let horas= document.createElement("p");
        idContainer.appendChild(horas);
        horas.innerText = data[i].north.availability_array[0].time;

        //criar local peixes
        let local= document.createElement("p");
        idContainer.appendChild(local);
        local.innerText = data[i].location;
}

//DISPLAY DA INFORMACAO RECOLHIDA DO API
fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
        .then(function(response) {
        return response.json();
        })
        .then(data => {

        for(let i=0; i < data.length; i++){
                drawLinhas(data, i);
        }
});


//SEARCH POR FORM
form.addEventListener("submit", function(e){
        //reset da tabela
        tabela.innerHTML = "";
        e.preventDefault();
        let search = document.getElementById("pesquisar").value;
        //tirar o espaco e substituir por _
        search.split(' ').join('_');

        fetch("https://api.nookipedia.com/nh/fish/"+ search +"?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
            .then(function(result) {
                return result.json();
            })
            .then(data => {
                    //CRIAR LINHAS APENAS DOS RESULTADOS
                    //criar container linha peixes
                    let container= document.createElement("div");
                    tabela.appendChild(container);
                    container.setAttribute("id","result");
                    let resultado= document.getElementById("result");
                    resultado.className="linha_peixe";

                    //criar imagem peixes
                    let imgPeixe= document.createElement("img");
                    resultado.appendChild(imgPeixe);
                    imgPeixe.className="peixe";
                    imgPeixe.src= data.image_url;

                    //criar nome peixes
                    let nome= document.createElement("p");
                    resultado.appendChild(nome);
                    nome.innerText = data.name;

                    //criar mes peixes
                    let mes= document.createElement("p");
                    resultado.appendChild(mes);
                    mes.innerText = data.north.months;

                    //criar horas peixes
                    let horas= document.createElement("p");
                    resultado.appendChild(horas);
                    horas.innerText = data.north.availability_array[0].time;

                    //criar local peixes
                    let local= document.createElement("p");
                    resultado.appendChild(local);
                    local.innerText = data.location;
            });
});



//FILTRAR POR LOCALIZACAO
//filtro pier
document.getElementById("pier").addEventListener("click", function () {
        //reset da tabela
        tabela.innerHTML = "";

        fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
            .then(function(response) {
                    return response.json();
            })
            .then(data => {

        //DISPLAY DA INFORMACAO RECOLHIDA DO API
            for(let i=0; i < data.length; i++) {
                    if (data[i].location === "Pier") {
                            drawLinhas(data, i);
                    }
            }
        });
});

//filtro pond
document.getElementById("pond").addEventListener("click", function () {
        //reset da tabela
        tabela.innerHTML = "";

        fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
            .then(function(response) {
                    return response.json();
            })
            .then(data => {

            //DISPLAY DA INFORMACAO RECOLHIDA DO API
                    for(let i=0; i < data.length; i++) {
                            if (data[i].location === "Pond") {
                                 drawLinhas(data,i);
                            }
                    }
            });
});

//filtro rio
document.getElementById("river").addEventListener("click", function () {
        //reset da tabela
        tabela.innerHTML = "";

        fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
            .then(function(response) {
                    return response.json();
            })
            .then(data => {

            //DISPLAY DA INFORMACAO RECOLHIDA DO API
                    for(let i=0; i < data.length; i++) {
                            if (data[i].location === "River"||data[i].location ==="River (clifftop)"|| data[i].location ==="River (mouth)") {
                                    drawLinhas(data,i);
                            }
                    }
            });
});

//filtro mar
document.getElementById("sea").addEventListener("click", function () {
        //reset da tabela
        tabela.innerHTML = "";

        fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
            .then(function(response) {
                return response.json();
        }).then(data => {

        //DISPLAY DA INFORMACAO RECOLHIDA DO API
                for(let i=0; i < data.length; i++) {
                        if (data[i].location === "Sea"||data[i].location ==="Sea (raining)"){
                                drawLinhas(data,i);
                        }
                }
        });
});

//SORT ASCENDENTE
document.getElementById("asc").addEventListener("click", function () {
        //reset da tabela
      tabela.innerHTML = "";

      fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
          .then(function(response) {
                    return response.json();
          }).then(data => {

              data.sort(function (a, b) {
                      if (a.name < b.name) {
                              return -1;
                      }
                      if (a.name > b.name) {
                              return 1;
                      }
                      return 0;
              });

              console.log(data);

                for(let i=0; i < data.length; i++) {
                      drawLinhas(data,i);
                }
          });
});

//SORT DESCENDENTE
document.getElementById("desc").addEventListener("click", function () {
        //reset da tabela
        tabela.innerHTML = "";

        fetch("https://api.nookipedia.com/nh/fish?api_key=d38e950f-b52f-4469-bf5a-0356b6810aea")
            .then(function(response) {
                    return response.json();
            }).then(data => {

                data.sort(function (a, b) {
                        if (a.name < b.name) {
                                return 1;
                        }
                        if (a.name > b.name) {
                                return -1;
                        }
                        return 0;
                });

                for(let i=0; i < data.length; i++) {
                        drawLinhas(data,i);
                }
        });
});
