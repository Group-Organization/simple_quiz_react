
// function to decode the text content, that handles also arrays
export function decodeHtml(input) {
    // if is an array, map content and recurse call same function for each element
    if(Array.isArray(input)){
        return input.map(elem => decodeHtml(elem))
    }else{
var txt = document.createElement('textarea');
        txt.innerHTML = input;
        return txt.value;
    }
  }


  
 export function shuffle(arr){
    return arr.sort(() => Math.random() - 0.5)
}