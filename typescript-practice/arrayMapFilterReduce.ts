
function demoNumber():void
{
         const numbers: number[] =[1,2,3,4,5,6];

         const newArr = numbers.map(numbers=> numbers * 2);
         console.log(newArr);

         const newArr1 = newArr.map(newArr=> newArr -1);
         console.log(newArr1);

         const largest = numbers.filter(numbers=> numbers > 3);
         console.log(largest);

         const sum = numbers.reduce((sum,numbers)=> sum + numbers , 0);

         console.log(sum);

}

demoNumber(); 

function demoString(): void
{
         const names: string[] = ["Punit", "Ramit", "Lalit", "Puja"];

         const upperName = names.map((names)=> names.toUpperCase());
         console.log(upperName);

}

//demoString();
