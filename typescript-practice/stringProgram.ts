function reverseAString(str: string): string {
         
         const str1 = str.toLocaleLowerCase();
         let finalstr: string = '';

         for (let i = str1.length - 1; i >= 0; i--) {
                  finalstr = finalstr + str1[i];
         }

         if (str1 === finalstr) {
                  console.log('string is pelindrome');
         }
         else {
                  console.log('string is not pelindrome');
         }

         return finalstr;
}

console.log(reverseAString("DoD"));





function findDuplicateCharacter(str: string) {

         let str1: string = str.toLowerCase();

         for (let i = 0; i < str1.length; i++) {

                  if (str1.indexOf(str1[i]) !== i) {
                           continue;
                  }
                  
                  let count = 0;
                  for (let j = 0; j < str1.length; j++) {

                           if (str1[i] === str1[j]) {
                                    count++;
                           }
                  }

                  if (count > 1) {
                           console.log(str1[i] + "  is duplicate because it is  " + count + " times");
                  }
         }

}

findDuplicateCharacter("asschsvasvxghsdcnsb");


function findFirstNonRepeatingChar(str: string) {

         let str1: string = str.toLowerCase();

         for (let i = 0; i < str1.length; i++) {

                  if (str1.indexOf(str1[i]) !== i) {
                           continue;
                  }
                  
                  let count = 0;
                  for (let j = 0; j < str1.length; j++) {

                           if (str1[i] === str1[j]) {
                                    count++;
                           }
                  }

                  if (count == 1) {
                           console.log(str1[i] + "  non repeating Character  " + count + " times");
                           break;
                  }
         }

}

findFirstNonRepeatingChar("ababzabccfgfgo");



// OP : "hell$h$$warey$$$u" 


function replaceVowelWith$()
{
      const str : string = 'hellohowareyou';
       let finalStr : string = '';
       let count: number = 0;

      for(let i=0; i< str.length;i++)
      {
              if(str[i] === 'o')
              {
                     
                     for(let j=0 ; j<= count; j++)
                     {
                     finalStr = finalStr + '$' ;
                     }
                     count++;
              }

              else
              {
                     finalStr = finalStr + str[i] ;
              }

      }

      console.log(finalStr);
}

replaceVowelWith$();


function segrigateZerosToLast()
{
      let arr : number[]= [2,0,5,7,0,9,0,56,8];
      let finalArr : number[]= [];

     

      for(let i=0; i< arr.length; i++)
      {
       if(arr[i] != 0)
       {
        finalArr.push(arr[i]);
       }

      }

       for(let i=0; i< arr.length; i++)
      {
       if(arr[i] === 0)
       {
        finalArr.push(arr[i]);
       }

      }

      console.log(finalArr);
}

segrigateZerosToLast();

