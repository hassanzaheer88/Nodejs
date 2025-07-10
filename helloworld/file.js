const { log } = require('./math')
const fs = require('fs') //use the files module which is pre-built in node.
// create a new file
//Sync.. means synchronous call

// ./ is used for current directtory.

//-------- Sync , blocking......... ------------
//fs.writeFileSync('./test.txt',"Heythere")

//or we can write this. const result = fs.writeFileSync('./test.txt',"Heythere")

//---------- ASynch... non-Blocking .. --------
//fs.writeFile('./test.txt',"Heythere Async", (err)=>{} )


// difference bt Synch And Asynch = blocking request and non-blocking requests will be
//  learn in next video.

//  ------------ to read a files -------------

//const result = fs.readFile("./contact.txt","utf-8")  //output is error
// const result = fs.readFileSync("./contact.txt","utf-8")  // only sync has return type. Async cannot return anything.
// console.log(result);


// Async does not have return . we cannot write cons result = fs.readfile(). and it always expect a call back.
// fs.readFile("./contact.txt","utf-8", (err, result) => {
//     if(err){
//         console.log("Error:",err);
//     }else{
//         console.log(result);
//     }
// })


//------------ Append -----------
//it does not override over text . but it writes next to the previous text.

//fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
//fs.appendFileSync("./test.txt",`${Date.now()}Hey there\n`)

//  to copy a file we will use cpSync
//fs.cpSync("./test.txt","./copy.txt")

//  to delete a file we will use unlinkSync
//fs.unlinkSync("./copy.txt") //it will delete the file copy.txt

//  to check the statistics of  file.
// console.log(fs.statSync("./test.txt"));
// console.log(fs.statSync("./test.txt").isFile());

// ------- to create a new folder --------
//fs.mkdirSync("my-doc")
//fs.mkdirSync("my-doc/a/b",{recursive:true});


// -------- Architecture of Nodejs --------------


// --------- Blocking ----------
// console.log("1");

// const result = fs.readFileSync("contact.txt","utf-8");
// console.log(result);

// console.log("2");


// ----------- Non-Blocking --------------

// console.log("1");

// fs.readFile("contact.txt","utf-8",(err,result)=>{
// console.log(result);
// });
// console.log("2");
// console.log("3");
// console.log("4");

// Default Thread Pool Size = 4
// Max ? = it depends upon CPU cores. 8core cpu - 8 threads


const os = require("os");
console.log(os.cpus.length);


