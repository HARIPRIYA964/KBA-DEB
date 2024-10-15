const { parse } = require('path');
const readline = require('readline')
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
const inventory = new Map();
function askCommand(){
    console.log("Welcome to inventory management system!");
    console.log ("Avaliable commands : add, remove, search, update, summary, exit");
    rl.question("\Enter a command:", function(command){
        switch(command.trim(). toLowerCase()){
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break;
            case 'search' :
                searchItemPrompt();
                break;
            case 'update' :
                updateItemPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();
                break;
            case 'exit' :
                rl.close();
                break;
            default :
                console.log('Invalid command: Enter a valid choice!');
                askCommand();
                break;
        }
    });
}
//function to add an item
function addItemPrompt(){
    rl.question("Enter an item id:", function(id){
        rl.question("Enter an item name:", function(name){
            rl.question("Enter an item Category:", function(Category){
                rl.question("Enter an item quantity:", function(quantity){
                    addItem(id,name,Category,parse(quantity));
                    askCommand();

                });
            });
        });
    });
}
function addItem(id,name,Category,quantity){
    if(inventory.has(id)){
        console.log(`Error item with id ${id} already exists`)
    }
    else{
        inventory.set(id,{name,Category,quantity});
        console.log(`Item with ID ${id} added to inventory!`)
    }
}


function removeItemPrompt(){
    rl.question("Enter an id to remove:", function(id){
        removeItem(id);
        askCommand();
    });
}
function removeItem(id){
    if (inventory.has(id)){
        inventory.delete(id);
        console.log(`Item with ID ${id} removed!`);
    }
    else{
        console.log(`Error: No item with ID ${id} found!`);
    }
}



function searchItemPrompt(){
    rl.question("Enter search term: ", function(searchTerm){
        searchItem(searchTerm);
        askCommand();
    });
}
function searchItem(searchTerm){
    const result =[];
    for(const [id, item] of inventory){
        if(id.includes(searchTerm)|| item.name.includes(searchTerm) || item.Category.includes(searchTerm) || item.quantity.includes(searchTerm)){
            result.push({id,...item});
        }
           
        }
        
        if (result.length>0){
            console.log('Search Results:', result);
        }
        else{
            console.log('No items found!')
        }
    }
    function updateItemPrompt(){
        rl.question("Enter an item id:", function(id){
            rl.question("Enter an item name:", function(newName){
                rl.question("Enter an item Category:", function(newCategory){
                    rl.question("Enter an item quantity:", function(newQuantity){
                        updateItem(id,newName,newCategory, newQuantit ? parseInt(newQuantity) : undefined);
                        askCommand();
    
                    });
                });
            });
        });
    }

    function updateItem(id,newName,newCategory,newQuantity){
        if(inventory.has(id)){
            const item = inventory.get(id);
            item.name = newName || item.name;
            item.Category = newCategory || item.Category;
            item.quantity = newQuantity !== undefined ? newQuantity : item.quantity;
            inventory.set(id,item);
            console.log(`Item with ID ${id} updated!`)
        }
        else{
            console.log(`Item with ID ${id} not found!`);
        }
    }

    function printSummary(){
        if (inventory.size>0){
            console.log('Inventory Summary: ');
            for(const[id,item] of inventory){
                console.log(`ID: ${id}, Name: ${item.name}, category: ${item.Category}, quantity: ${item.quantity} `);            }
        }
        else{
            console.log('No Items found');
        }
    
    }
    
    
askCommand();
