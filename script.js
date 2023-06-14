const loadAI = (dataLimit) =>
{
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => displayTools(data.data.tools,dataLimit));
}

const SortAI = () =>
{
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => sortTools(data.data.tools));
}

const sortTools= (tools) =>
{
    for(let sortedTools of tools) {
        let dateArr = sortedTools.published_in.split('/');
        let year = parseFloat(dateArr[2]);
        let month = parseFloat(dateArr[1]) - 1;
        let day = parseFloat(dateArr[0])
        let toolDate = new Date(year, month, day);
        sortedTools.date = toolDate;
    }   
    
    tools.sort((a, b) => a.date - b.date);
    displayTools(tools);
}

const displayTools = (tools,dataLimit) =>
{
    const getAPI = document.getElementById("api");
    getAPI.innerHTML = "";
    tools = tools.slice(0,dataLimit);
    tools.forEach(
        tool => 
        {
            const newDiv = document.createElement("div");
            newDiv.classList.add("col");
            newDiv.innerHTML =
            `
            <div class="card">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="styles.css">
            <img src="${tool.image}" class="card-img-top card_image" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              
              <ol class="card-text"><li>${tool.features.join('</br><li>')}</li></ol>
             <hr>
              
              <div style="display: grid;
              grid-template-columns: 1fr 1fr;">
              <div>
              <h5 class="card-title">${tool.name}</h5>
              <h6><i class="fa-regular fa-calendar-days"></i> &nbsp; ${tool.published_in}</h6>
              </div>
              <div style="text-align:right">
              <button style="border:0; border-radius: 50%; margin-top:15px; color: rgb(235, 87, 87); background-color:rgba(235, 87, 87,0.1);" onclick="btn_details(${tool.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="fa-solid fa-arrow-right-long"></i>
              </button>   
              </div>
              </div>
            </div>
            </div>
            ` 
            getAPI.appendChild(newDiv); 
            spinner(false);
        }  
    )
}

const btnSort = document.getElementById("btn_sort").addEventListener("click", function(){

    SortAI();
})

const btn_details = (id) =>
{
    if(id < 10)
    {
        const url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
        console.log(url)
        fetch(url)
        .then(resp => resp.json())
        .then(datas => detailsModal(datas.data))
    }
    else{
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        console.log(url)
        fetch(url)
        .then(resp => resp.json())
        .then(datas => detailsModal(datas.data))
    }
    
}
const detailsModal = (data) =>
{
    document.getElementById('modal_details').innerHTML = data.description;
    
    if(data.pricing === null)
    {
        let freeCost = "Cost not given (null)";
        let freePlan = "Plan not given (null)";
        document.getElementById('modal_price').innerHTML = freeCost+" /"+freePlan; 
    }
    else if(data.pricing[0].price === "No cost" || data.pricing[0].price === "0")
    {
        let freeCost = "Free of Cost";
        if(data.pricing[0].plan === "Free" || data.pricing[0].plan === "0")
        {
            let freePlan = "Free Plan"
            document.getElementById('modal_price').innerHTML = freeCost+" /"+freePlan;
        }
        else
        {
            document.getElementById('modal_price').innerHTML = freeCost+" /"+data.pricing[0].plan;;
        }
    }
    else if(data.pricing[0].plan === "Free" || data.pricing[0].plan === "0")
    {
        let freePlan = "Free Plan"
        
        if(data.pricing[0].price === "No cost" || data.pricing[0].price === "0")
        {
            let freeCost = "Free of Cost";
            document.getElementById('modal_price').innerHTML = freeCost+" /"+freePlan;
        }
        else
        {
            document.getElementById('modal_price').innerHTML = data.pricing[0].price+" /"+freePlan;
        }
    }
    else{
        document.getElementById('modal_price').innerHTML = data.pricing[0].price+" "+data.pricing[0].plan;
    }
    


    if(data.pricing === null)
    {
        let freeCost = "Cost not given (null)";
        let freePlan = "Plan not given (null)";
        document.getElementById('modal_price2').innerHTML = freeCost+" /"+freePlan; 
    }

    else if(data.pricing[1].price === "No cost" || data.pricing[1].price === "0")
    {
        let freeCost = "Free of Cost";
        if(data.pricing[1].plan === "Free" || data.pricing[1].plan === "0")
        {
            let freePlan = "Free Plan"
            document.getElementById('modal_price2').innerHTML = freeCost+" /"+freePlan;
        }
        else
        {
            document.getElementById('modal_price2').innerHTML = freeCost+" /"+data.pricing[1].plan;;
        }
    }
    else if(data.pricing[1].plan === "Free" || data.pricing[1].plan === "0")
    {
        let freePlan = "Free Plan"
        
        if(data.pricing[1].price === "No cost" || data.pricing[1].price === "0")
        {
            let freeCost = "Free of Cost";
            document.getElementById('modal_price2').innerHTML = freeCost+" /"+freePlan;
        }
        else
        {
            document.getElementById('modal_price2').innerHTML = data.pricing[1].price+" /"+freePlan;
        }
    }
    else{
        document.getElementById('modal_price2').innerHTML = data.pricing[1].price+" "+data.pricing[1].plan;
    }

    if(data.pricing === null)
    {
        let freeCost = "Cost not given (null)";
        let freePlan = "Plan not given (null)";
        document.getElementById('modal_price3').innerHTML = freeCost+" /"+freePlan; 
    }

    else if(data.pricing[2].price === "No cost" || data.pricing[2].price === "0")
    {
        let freeCost = "Free of Cost";
        if(data.pricing[2].plan === "Free" || data.pricing[2].plan === "0")
        {
            let freePlan = "Free Plan"
            document.getElementById('modal_price3').innerHTML = freeCost+" /"+freePlan;
        }
        else
        {
            document.getElementById('modal_price3').innerHTML = freeCost+" /"+data.pricing[2].plan;;
        }
    }
    else if(data.pricing[2].plan === "Free" || data.pricing[2].plan === "0")
    {
        let freePlan = "Free Plan"
        
        if(data.pricing[2].price === "No cost" || data.pricing[2].price === "0")
        {
            let freeCost = "Free of Cost";
            document.getElementById('modal_price3').innerHTML = freeCost+" /"+freePlan;
        }
        else
        {
            document.getElementById('modal_price3').innerHTML = data.pricing[2].price+" /"+freePlan;
        }
    }
    else{
        document.getElementById('modal_price3').innerHTML = data.pricing[2].price+" "+data.pricing[2].plan;
    }

    document.getElementById('modal_features').innerHTML = data.features["1"]["feature_name"];
    document.getElementById('modal_features2').innerHTML = data.features["2"]["feature_name"];
    document.getElementById('modal_features3').innerHTML = data.features["3"]["feature_name"];
    if(data.features["4"] !== undefined)
    {
        document.getElementById('modal_features4').style.visibility="visible";
        document.getElementById('modal_features4').innerHTML = data.features["4"]["feature_name"];
    }
    else{
        document.getElementById('modal_features4').style.visibility="hidden";
    }
    

    if(data.integrations !== null)
    {
        document.getElementById('modal_integration').innerHTML = data.integrations[0];
        if(data.integrations[1] !== undefined)
        {
            document.getElementById('modal_integration2').style.visibility="visible";
            document.getElementById('modal_integration2').innerHTML = data.integrations[1];
        }
        else{
            document.getElementById('modal_integration2').style.visibility="hidden";
        }
        
        if(data.integrations[2] !== undefined)
        {
            document.getElementById('modal_integration3').style.visibility="visible";
            document.getElementById('modal_integration3').innerHTML = data.integrations[2];
        }
        else{
            document.getElementById('modal_integration3').style.visibility="hidden";
        }
    }
    
    else{
        document.getElementById('modal_integration').innerHTML = "No Data Found";
     }
    
        document.getElementById('modal-img').src = data.image_link[0];
     

        
    

    if(data.input_output_examples == null)
    {
        document.getElementById('inputExamples').innerText = "";
        document.getElementById('outputExamples').innerText = "No! Not yet! Take a break!";
    }
    else{
        document.getElementById('inputExamples').innerHTML = data.input_output_examples[0]["input"];

        document.getElementById('outputExamples').innerHTML = data.input_output_examples[0]["output"];
    }
   

    if(data.accuracy.score != null)
    {
        document.getElementById('accuracy').style.visibility = "visible";
        document.getElementById('accuracy').innerHTML = data.accuracy.score*100+"% Accuracy";
        
    }
    else{
        document.getElementById('accuracy').style.visibility = "hidden";
    }
    
}


const showMore = document.getElementById("show-more").addEventListener("click",function(){
    spinner(true);
    loadAI();
    
    document.getElementById("show-more").style.display = "none";
    document.getElementById("show-less").style.display = "block";
})

const showLess = document.getElementById("show-less").addEventListener("click",function(){
    spinner(true);
    loadAI(6);
    document.getElementById("show-less").style.display = "none";
    document.getElementById("show-more").style.display = "block";
})


const spinner = isLoading => 
{
    if(isLoading)
    {
        document.getElementById("spinner").style.display = "block";
    }
    else if(!isLoading)
    {
        document.getElementById("spinner").style.display = "none";
    }
} 


loadAI(6);