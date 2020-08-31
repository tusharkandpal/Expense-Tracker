// Get the heading element
const headElement = document.querySelector( "#headTotal" );

// Get the reference to Desc element
const inputDescEl = document.querySelector( "#inputDesc" );

// Ref to input amount
const inputElement = document.querySelector( "#inputAmount" );

// Get the button element
const element = document.querySelector( "#buttonExpense" );

// Ref to table
const tblEl = document.querySelector( "#expenseTbl" );

// Let a variable which is initialized at 0
let totalExpense = 0;

// Set the heading element to totalExpense
headElement.textContent = totalExpense;

// AllExpense at one place i.e array
let allExpense = [];

// Listen to click event
element.addEventListener("click", addExpense, false);

// Listen to Enter/Return key
document.addEventListener("keypress", function (event) {
   if (event.keyCode === 13 || event.which === 13) {
     addExpense();
   }
});

// Add Expense Function
function addExpense() {

   // Create an Object
   let expenseItem = {};

   // Read value from input
   const textAmt = inputElement.value;
   // console.log({ element });

   // Convert it to number
   const expenseAmt = parseInt(textAmt, 10);

   // Read the desc from inputDesc
   const textDesc = inputDescEl.value;

   // Checking the Description, Expense fields
   if (textDesc !== "" && !isNaN(expenseAmt) && expenseAmt > 0) {

   // Put it in object
   expenseItem.desc = textDesc;
   expenseItem.amount = expenseAmt;
   expenseItem.moment = new Date();

   // Add that value to totalExpense
   totalExpense += expenseAmt;

   // Set the heading element to totalExpense
   updateTotal();
   
   // Push & print it in console
   allExpense.push(expenseItem);
   // console.clear();
   // console.table(allExpense);

   //  Show the table here
   //  const data1 = allExpense[0];
   //  const data2 = allExpense[1];

   //  const data1Text = `Desc: ${data1.desc} :: Expense: ${data1.amount}`;
   //  const data2Text = `Desc: ${data2.desc} :: Expense: ${data2.amount}`;

   //  const tableText = `
   //  <div>${data1Text}</div>
   //  <div>${data2Text}</div>
   // `
   // console.log(joinedAllExpenseHTML);

   renderList(allExpense);
   inputElement.value = "";
   inputDescEl.value = "";

 }
}

   // Controller Functions

      // View Layers
      function renderList(arrOfList) {
         const allExpenseHTML = arrOfList.map(expense => createList(expense) );
         const joinedAllExpenseHTML = allExpenseHTML.join("");
         tblEl.innerHTML = joinedAllExpenseHTML;
         allExpense = arrOfList;
      }

      function createList( {desc, amount, moment} ) {
         return `
            <li class="list-group-item d-flex justify-content-between">
               <div class="d-flex flex-column">
                  ${desc}
                  <small class="text-muted">${getDate(moment)}</small>
               </div>
               <div>
                  <span class="px-4">
                     ₹ ${amount}
                  </span>
                  <button 
                     type="button"
                     class="btn btn-outline-danger btn-sm"
                     onClick="deleteItem(${moment.valueOf()},${amount})"
                  >
                     <i class="fas fa-trash-alt"></i>
                  </button>
               </div>
            </li>
         `;
      }
      
      // Update Header Total

      function updateTotal() {
         let someText = `Total: ₹ ${totalExpense}`;
         headElement.textContent = someText;
      }


      // Get Date String

      function getDate( now ) {
         return now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      // Delete Items
      
      function deleteItem(dateValue, amount) {

         // Method 1
         // const newArr = [];
         // for (let i = 0; i < allExpense.length; i++) {
         //    if (allExpense[i].moment.valueOf() !== dateValue)
         //       {
         //          newArr.push(allExpense[i]);
         //       }
         //    }
            
         // Method 2
         // const newArr = allExpense.filter(expense => {
         //    if (expense.moment.valueOf() !== dateValue)
         //    return expense;
         // });

         // Method 3
         const newArr = allExpense.filter(expense => expense.moment.valueOf() !== dateValue);
         renderList(newArr);
         totalExpense -= amount;
         updateTotal();

      }
      