"use strict";

const form = document.getElementById("fillForm");
const reset = document.getElementById("resetBtn");

const bill = document.getElementById("bill");
const people = document.getElementById("numberPeople");

const tipTotal = document.getElementById("card__tip");
const eachTotal = document.getElementById("card__each");

const custom = document.getElementById("custom");

const tip__values = document.getElementsByClassName("tip__value");

const tip__Names = document.getElementsByName("tipPercent");
const alert = document.getElementsByClassName("alert");


var percent = 0;

var eventSetter = ()=>{
    for(var i = 0; i < tip__values.length; i++) {
       let curr__percent= tip__values[i].innerHTML;
                tip__values[i].addEventListener('click', ()=>{
                    selectedTip(curr__percent);
                    Update();
                });
    
    }
   
}



tip__values[5].addEventListener('change', ()=>{
    percent = parseInt(tip__values[5].value)/100;
    console.log(typeof percent);
    Update();
});

eventSetter();

let selectedTip =(value)=>{
    switch(value){
        case "5%":
            percent=.05;
            break;
        case "10%":
            percent= .1
            break;
        case "15%":
            percent=.15;
            break;
        case "25%":
            percent=.25;
            break;
        case "50%":
            percent =.5;
            break;
        default:
            for(var i=0;i<tip__Names.length;i++){
                tip__values[i].checked = false;
            }
            custom.checked = true;
          

            break;

    }


}


let Update = ()=>{
    let totalEach = 0;
    let tipAmount = 0;
    let price = parseFloat(bill.value);
    let persons = parseInt(people.value);


    if(!persons  || persons == 0 ){
            alert[1].style.visibility = "visible";
    }else if (!price || price < 0){
            alert[0].style.visibility = "visible";

 
    }
    else{
        alert[1].style.visibility = "hidden";
        alert[0].style.visibility = "hidden";


        tipAmount = (price*percent)/persons;
        console.log("this is price" +  price);
        console.log("this is percent" +  percent);
        console.log("this is tip not rounded" +  tipAmount);


        totalEach = ((price*percent)+price)/persons;
        tipTotal.textContent = currencyRound(tipAmount)
        eachTotal.textContent = currencyRound(totalEach);
        document. getElementById("resetBtn"). disabled = false;

    }
    

}



reset.addEventListener('click', ()=>{
    tipTotal.textContent =  "$0.00";
    eachTotal.textContent =  "$0.00";
    alert[1].style.visibility = "hidden";
    alert[0].style.visibility = "hidden";
    document. getElementById("reset"). disabled = true;
   
});




let currencyRound = (num)=>{
    return '$' + num.toFixed(2);
}


bill.addEventListener("change", ()=>{
    Update();
});
people.addEventListener("change", ()=>{
    Update();
});