const express= require('express');
const pseudoku=require('./pseudoku')

const app = express();

app.listen('3000',()=>{
  console.log("server is running on port 3000");
});


var result=pseudoku.make_solution([1,2,3,4])

console.log(result);
