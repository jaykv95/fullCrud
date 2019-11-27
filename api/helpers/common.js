var isValidRequest=(reqModel,model)=>{
    // if(JSON.stringify(reqModel) === '{}'){
    //     //throw new Error("Request model should not be empty");
    // }
    //console.log(reqModel)
    //console.log(model)
    
    var aKeys = Object.keys(reqModel).sort();
    var bKeys = Object.keys(model).sort();
    let reqKeys = JSON.stringify(aKeys);      
    let modelKeys = JSON.stringify(bKeys);
    debugger
    if( reqKeys === modelKeys){
        return true;
    }else{
        return false;
    }
}

module.exports={
    isValidRequest
}