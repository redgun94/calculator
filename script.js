'use strict'

const button = document.getElementsByTagName("button");
const lastResult = document.getElementById("last-result");
const currentResult = document.getElementById("current-result");

window.addEventListener("DOMContentLoaded",(event)=>{
    clc();

});

function calculator(e) {
    let operation = e;
    try{
        if(operation.trim() == "") throw "Please enter a valid operation";
        if(isNaN(operation)) throw "Please enter a valid operation"
        let result = eval(operation);
        return result;
    }
    catch(err){
        alert(err)
    }
}


function clean(){
    return operations.symbol1 = [],operations.symbol2 = []; 
};
function clc(element){
    console.log(element);
    currentResult.innerHTML = " Empty";
    lastResult.innerHTML = " ";
    operations.operation = "";
    operations.lastResult = [];
    operations.num1 = undefined;
    operations.num2 = undefined;
    operations.symbol1 = [];
    operations.symbol2 = [];
    return lastResult,currentResult
};

function  getButtonNum(element){
    if( operations.operation == ""){
        operations.symbol1.push(element.target.value);
        operations.num1 = parseFloat(operations.symbol1.join(""));
        operations.lastResult[0] = (operations.num1);
        console.log(operations.num1, operations.lastResult,operations.symbol1)
    }
    else{
        operations.symbol2.push(element.target.value);
        operations.num2 = parseFloat(operations.symbol2.join(""));
        operations.lastResult[2] = (operations.num2);
    }
   return lastResult.innerHTML= "<h3>" + operations.lastResult.join(" ") + "</h3>" 

};
function getButton(element){
    if(operations.num1 && operations.num2){
        calculator();
        operations.operation = element.target.value;

    }
    else if (operations.clc){
        operations.operation = element.target.value;
        operations.lastResult.push(operations.operation);
        lastResult.innerHTML = operations.lastResult.join(" ");
    }
    else{
        operations.operation = element.target.value;
        operations.lastResult.push(operations.operation);
        lastResult.innerHTML= "<h3>" + operations.lastResult.join(" ") + "</h3>" 
    }

}
function getSymbol(element){
    let symbol = element.target.value;;
    operations.lastResult.push(symbol);
    return lastResult.innerHTML= "<h3>" + operations.lastResult.join(" ") + "</h3>" 
}
const operations = {
    symbol1 : [],
    symbol2 : [],
    operation : "",
    num1 : undefined,
    num2 : undefined,
    result: undefined,
    lastResult: [],
    clc : false,
    sum : function(arg1= 0,arg2 = arg1){
        this.result = arg1 + arg2;
        this.num1 = this.result;
        this.num2 = undefined;
        return this.result
    },
    less : function(arg1 = 0,arg2 = arg1){
        this.result = arg1 - arg2;
        this.num1 = this.result;
        this.num2 = undefined;
        return this.result 
    },
    multi : function(arg1 = 0,arg2 = arg1){
        this.result = arg1 * arg2;
        this.num1 = this.result;
        this.num2 = undefined;
        return this.result 
    },
    div : function(arg1 = 0,arg2 = arg1){
        this.result = arg1 / arg2;
        this.num1 = this.result;
        this.num2 = undefined;
        return this.result 
    }    
}
