function add(a: number, b: number): number {
         return a + b;
}

console.log(add(22, 32));


function reverseAString(str: string): string {
         const str1 = str.toLowerCase();
         let finalstr: string = '';

         for (let i = str1.length - 1; i >= 0; i--) {
                  finalstr = finalstr + str1[i];
         }

         if (str1 === finalstr) {
                  console.log('string is palindrome');
         }
         else {
                  console.log('string is not palindrome');
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