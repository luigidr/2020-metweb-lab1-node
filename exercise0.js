'use strict';

const words = ["primavera", "estate", "autunno", "inverno"];

for(const [i, w] of words.entries()) {
    if(w.length < 2)
        words[i] = "";
    else 
        words[i] =  w.substring(0,2) +  w.substring(w.length -2,  w.length);
}

// ALTERNATIVE
/*
for(let i=0; i< words.length; i ++) {
    if(words[i].length < 2)
        words[i] = "";
    else 
        words[i] =  words[i].substring(0,2) +  words[i].substring(words[i].length -2,  words[i].length);
}
*/

console.log(words);
