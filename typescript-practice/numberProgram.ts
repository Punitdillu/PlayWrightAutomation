
function revNumber(num: number): number {


         let revNum: number = 0;
         let temp: number = num;

         while (temp > 0) {

                  const r = temp % 10;
                  revNum = revNum * 10 + r;
                  temp = Math.floor(temp/10);

         }

         if(revNum===num)
         {
                  console.log("Number Is pelindarome")
         }

         else
         {
                  console.log("Number Is not pelindarome")
         }

         return revNum;
}

console.log(revNumber(5775));



function factorialOfNumber(numb : number): number
{
         
         let temp = numb ;
         let sum : number= 0
         while(temp > 0)
         {
                  const r = temp % 10;
                  let fact : number = 1;
                  
                  for(let i=1 ;i<=r; i++)
                  {
                           fact = fact * i;
                  }
                  sum = sum+fact;
                  temp= Math.floor(temp/10);
         }


         return sum;

}

console.log(factorialOfNumber(123));