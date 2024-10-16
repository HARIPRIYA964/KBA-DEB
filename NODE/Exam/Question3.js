
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const order = new Map;
function askcommand (){
    console.log("Welcome to  product ordering management system!")
    console.log("Avaliable commands: add, remove,search, update, summary,exit")
    rl.question('\Enter a Command:',function(commad){
        switch(commad){
            case 'add' :
                addItemprompt();
                break;
            case 'remove':
                removeItemprompt();
            case 'search':
                searchItemprompt();
                break;
            case 'update':
                updateItemprompt();
                break;
            case 'summary':
                printSummary();
                break;
            case 'exit' :
                rl.close();
                askcommand();
                break;
                
    
        }
        
    });
  
}

function addItemprompt(){
    rl.question("Enter a id:", function(id){
        rl.question("Enter a Customer Name:", function(customer){
            rl.question("Enter a  product Name: ",function(product){
                rl.question("Enter a Quantity:",function(Quantity){
                    addItem(id,customer,product,parseInt(Quantity))
                    askcommand();
                });
            });
        });

    });
}

function addItem(id,customer,product,Quantity){
   if(order.has(id,customer,product,Quantity)){
    console.log(`Error Item with ID: ${id} already exists!`)
   }
   else{
    order.set(id,{customer,product,Quantity})
    console.log(`Item with ID ${id} added the order! `)
   }
    
        
    }

function removeItemprompt(){
    rl.question("Enter a removing id:",function(id){
        removeItem(id);
        askcommand();

    });
}

function removeItem(id){
    if(order.has(id)){
        order.delete(id)
        console.log(`Item with ID ${id} removed!`)
    }
    else{
        console.log(`Error : Item with ID ${id} found!`)
    }

}

function searchItemprompt(){
    
    rl.question("Enter a Search item:",function(searchterm){
        searchItem(searchterm);
        askcommand();

    });
}

function searchItem(searchterm){
    const result =[];
        for([id,item] of order){
            order.has(id)
            item.customer = customer || item.customer
            item.product = product || item.product
            item.Quantity = Quantity || item.Quantity
            if(id.includes(searchterm)|| item.customer.includes(searchterm)|| item.product.includes(searchterm)|| item.Quantity.includes(searchterm)){
                    result.push({id,...item})
                    }
                }
                    if(result.length>0){
                        console.log("The Search item :",result)
                    }
                    else{
                        console.log("It is not found!")
                    }
                } 
            

function updateItemprompt(){
    rl.question("Enter a id:", function(id){
        rl.question("Enter a Customer Name:", function(newcustomer){
            rl.question("Enter a  product Name: ",function(newproduct){
                rl.question("Enter a Quantity:",function(newQuantity){
                    updateItem(id,newcustomer,newproduct,newQuantity ? parseInt(newQuantity): undefined)
                    askcommand();
                });
            });
        });

    });
}

function updateItem(id,newcustomer,newproduct,newQuantity){
    if(order.has(id)){
        const item = order.get(id);
        item.customer = newcustomer || item.customer;
        item.product = newproduct || item.product;
        item.Quantity = newQuantity !== undefined ? newQuantity : item.Quantity;
        order.set(id,item);
        console.log(`Item with ID ${id} updated!`); 
    } else{
        console.log(`Item with ID ${id} not found!`);
    }
}



function printSummary(){
    if(order.size>0){
        console.log('order Summary:');
        for(const [id,item] of order){
            console.log(`ID: ${id}, Product Name: ${item.customer}, Customer Name: ${item.product},
                Quantity: ${item.Quantity}`);
        }
    } else {
        console.log('No items found!');
    }
}
askcommand();