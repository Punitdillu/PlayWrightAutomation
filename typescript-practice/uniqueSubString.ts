
function uniqueSubString(str: string): string {

         const newstr: string[] = str.split('');

         const finalstr: string[] = [];

         for (let i = 0; i < newstr.length; i++) {

                  if(finalstr.includes(newstr[i])) {
                           continue;
                  }

                  for (let j = i + 1; j < newstr.length; j++) {

                  }

                  finalstr.push(newstr[i]);



         }

         let str2 : string = "";

         for (let i = 0; i < finalstr.length; i++) {

                  str2 += finalstr[i];
         }

         return str2;


}


console.log(uniqueSubString("abcabcbb")); // Output: "abc"