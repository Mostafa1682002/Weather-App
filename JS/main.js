let inputCity=document.getElementById("inputcity");
let form=document.getElementById("form");
let city='london';



let cit;
form.onsubmit=function(e){
    if(inputCity.value!=''){
        cit=inputCity.value;
        city=cit;
        weather(city);
        inputCity.value='';
        console.log();
        }else{
        alert('Please Enter City')
    }
    e.preventDefault();
}


let currentDate=new Date();
let days=["Sunday","Monday","tuesday","Wednesday","Thursday","Friday","Saturday"];
let  months = ["January","February","March","April","May","June","July","August","September","October","November","December"];



//function Check Day
function checkDay(day){
    if(day+currentDate.getDay()>6){
        return day+currentDate.getDay()-7;
    }else{
        return day+currentDate.getDay();
    }
}


//Weather By City Name
let apiKey='49b4fce7cf2e384057af5278ee52769a';
function weather(city){
    let api=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    fetchData(api);
}
weather(city);



//Fetch Api
function fetchData(api){
    fetch(api).then((response)=>{
        return response.json();
    }).then((result)=>{
        // console.log(result);
        wetherDetails(result);
    })
    .catch((error)=>{
        console.log(error);
    })
}



function wetherDetails(info){

    if(info.cod=="200"){
        //Days
        let allDays=document.querySelectorAll(".data .day")
        for(let x=0;x<allDays.length;x++){
            allDays[x].innerHTML=days[checkDay(x)];
        }


        //Days
        let allMonths=document.querySelectorAll(".data .month .number");
        let allMonthsText=document.querySelectorAll(".data .month .te");
        for(let x=0;x<allMonths.length;x++){
            allMonths[x].innerHTML=currentDate.getDate()+x;
            allMonthsText[x].innerHTML=months[currentDate.getMonth()];
        }


        
        //main
        let status=[];
        for(let x=0;x<3;x++){
            status.push(info.list[x].weather[0].main);
        }

        //Temp min
        let temps_min=[];
        for(let x=0;x<3;x++){
            temps_min.push(info.list[x].main.temp_min);
        }
        
        //Temp min
        let temps_max=[];
        for(let x=0;x<3;x++){
            temps_max.push(info.list[x].main.temp_max);
        }
        
        //city
        let cityy=info.city.name;
        //Show City in All Box
        let cites=document.querySelectorAll(".city");
        cites.forEach((e)=>{
            e.innerHTML=cityy;
        });
        
        //Show All Sataus and icons;
        let allStatus=document.querySelectorAll(".status");
        let icons=document.querySelectorAll(".icon img");
        for(let x=0;x<allStatus.length;x++){
            allStatus[x].innerHTML=status[x];
            if(status[x]=="Clouds"){
                icons[x].src='Icons/cloud.svg'
            }else if(status[x]=="Rain"){
                icons[x].src='Icons/rain.svg'
            }else if(status[x]=="Clear"){
                icons[x].src='Icons/clear.svg'
            }else if(status[x]=="Haze"){
                icons[x].src='Icons/haze.svg'
            }else if(status[x]=="Snow"){
                icons[x].src='Icons/snow.svg'
            }else if(status[x]=="Storm"){
                icons[x].src='Icons/storm.svg'
            }
        }

        //Show All Temp Min
        let allTempMin=document.querySelectorAll(".temp .min span");
        for(let x=0;x<allTempMin.length;x++){
            allTempMin[x].innerHTML=Number(temps_min[x]).toFixed(1);
        }

        //Show All Temp Min
        let allTempMax=document.querySelectorAll(".temp .max span");
        for(let x=0;x<allTempMax.length;x++){
            allTempMax[x].innerHTML=Number(temps_max[x]).toFixed(1);
        }

    }else{
        alert('Please Enter valid City')
    }
    
}