var pseudoku={};

pseudoku.make_vector=(array)=>{
    var puzzle=[]
      puzzle[0]=array[0]
      puzzle[1]=array[1]
      puzzle[2]=array[2]
      puzzle[3]=array[3]
   var result=[]
     for(var i=0;i<4;i++){
       result[i]=puzzle
     }
  return result
}

pseudoku.permutate=(array,p)=>{
  if(p==0){
    return array
  }
  var q=[]
  for(var i=0;i<4;i++){
    q.unshift(array[3-i])
  }
  for(var k=0;k<p;k++){
    var x=q[3]
    q.pop()
    q.unshift(x)
  }
  return q;
}

pseudoku.permutate_row=(array,x,y,z)=>{
  array[0]=pseudoku.permutate(array[0],0)
  array[1]=pseudoku.permutate(array[1],x)
  array[2]=pseudoku.permutate(array[2],y)
  array[3]=pseudoku.permutate(array[0],z)
  return array
}

pseudoku.linear_search=(array,item)=>{
  for(var i=0;i<array.length;i++){
    if(array[i]==item){
      return true;
    }
  }
  return false;
}

pseudoku.array_linearSearch=(array)=>{
  var x1= pseudoku.linear_search(array,1)
  var x2= pseudoku.linear_search(array,2)
  var x3= pseudoku.linear_search(array,3)
  var x4= pseudoku.linear_search(array,4)
  if(x1 && x2 && x3 && x4){
    return true
  }
  return false;
}


pseudoku.make_column=(array,k)=>{
  var t=[]
  for (var i=0;i<array.length;i++){
    t[i]=array[i][k]
  }
  //return pseudoku.array_linearSearch(t)
  return t
}


pseudoku.check_column=(array)=>{
  var y1=pseudoku.make_column(array,0)
  var y2=pseudoku.make_column(array,1)
  var y3=pseudoku.make_column(array,2)
  var y4=pseudoku.make_column(array,3)
  if(y1 && y2 && y3 && y4){
    return true
  }else {
    return false
  }
}



pseudoku.makegrid=(array)=>{
  var grid=[[],[],[],[]]
  for (var i=0;i<2;i++){
      grid[3*i-i][0]=array[3*i-i][0]
      grid[3*i-i][1]=array[3*i-i][1]
      grid[3*i-i][2]=array[2*i+1][0]
      grid[3*i-i][3]=array[2*i+1][1]

      grid[2*i+1][0]=array[3*i-i][2]
      grid[2*i+1][1]=array[3*i-i][3]
      grid[2*i+1][2]=array[2*i+1][2]
      grid[2*i+1][3]=array[2*i+1][3]
  }

 x1=pseudoku.array_linearSearch(grid[0])
 x2=pseudoku.array_linearSearch(grid[1])
 x3=pseudoku.array_linearSearch(grid[2])
 x4=pseudoku.array_linearSearch(grid[3])

 if(x1 && x2 && x3 && x4){
   return true
 }
 return false;
}



pseudoku.make_blanks=(array,n)=>{
  var temp=[]
  var check=[]
  var num
  temp=array[0].concat(array[1],array[2],array[3])
  for(var i=0;i<n;i++){
      num=Math.ceil(Math.random()*i)
      temp[num+2*i+2]="x"//put extra n+i for better randomness
  }

for (var k = 0; k < temp.length; k +=4){
     check.push(temp.slice(k, k +4));
 }
 return check
}

pseudoku.make_solution=(array)=>{
  var vector=pseudoku.make_vector(array)
  var permutate =pseudoku.permutate_row(vector,1,2,3)
  var check_subgrid=pseudoku.makegrid(permutate)
  if(check_subgrid==false){
    var x=permutate[1]
    var y=permutate[2]
    permutate[2]=x
    permutate[1]=y
  }
  var check_column=pseudoku.check_column(permutate)
  if(check_column){
    return pseudoku.make_blanks(permutate,6);
  }
}


module.exports=pseudoku;
