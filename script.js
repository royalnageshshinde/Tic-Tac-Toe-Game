 // Selecting all the boxes in the grid
 let boxes = document.querySelectorAll(".box");
 let turn = "X"; // Initial turn set to 'X'
 let isGameOver = false; // Game status flag

 // Function to check for a winning combination
 function checkWin() {
     // Array containing the possible winning conditions (index combinations)
     let winConditions = [
         [0, 1, 2], [3, 4, 5], [6, 7, 8], 
         [0, 3, 6], [1, 4, 7], [2, 5, 8], 
         [0, 4, 8], [2, 4, 6]
     ];
     
     // Loop through each win condition
     winConditions.forEach(condition => {
         let v0 = boxes[condition[0]].innerHTML; // Value at index 0 of the win condition
         let v1 = boxes[condition[1]].innerHTML; // Value at index 1 of the win condition
         let v2 = boxes[condition[2]].innerHTML; // Value at index 2 of the win condition
         
         // If all three values match and are not empty, a player has won
         if (v0 !== "" && v0 === v1 && v1 === v2) {
             isGameOver = true; // Set game over flag
             document.querySelector("#results").innerHTML = turn + " wins!"; // Display the winner
             document.querySelector("#play-again").style.display = "inline"; // Show the play again button
             
             // Highlight the winning combination
             condition.forEach(index => {
                 boxes[index].style.backgroundColor = "#08D9D6"; // Set background color to highlight
                 boxes[index].style.color = "#000"; // Change text color for visibility
             });
         }
     });
 }

 // Function to check if the game is a draw
 function checkDraw() {
     if (!isGameOver) { // Only check if the game isn't over
         let isDraw = true; // Assume it's a draw initially
         boxes.forEach(box => {
             if (box.innerHTML === "") { // If any box is empty, it's not a draw
                 isDraw = false;
             }
         });
         if (isDraw) { // If no empty boxes and no winner, it's a draw
             isGameOver = true;
             document.querySelector("#results").innerHTML = "It's a draw!";
             document.querySelector("#play-again").style.display = "inline"; // Show play again button
         }
     }
 }

 // Reset the game when "Play Again" is clicked
 document.querySelector("#play-again").addEventListener("click", () => {
     isGameOver = false; // Reset game status
     turn = "X"; // Set turn back to 'X'
     document.querySelector(".bg").style.left = "0"; // Move the turn indicator background to 'X'
     document.querySelector("#results").innerHTML = ""; // Clear the results text
     document.querySelector("#play-again").style.display = "none"; // Hide the play again button

     // Clear all the boxes and reset their styles
     boxes.forEach(box => {
         box.innerHTML = ""; // Empty the box
         box.style.backgroundColor = "#252A34"; // Reset background color
         box.style.color = "#fff"; // Reset text color
     });
 });

 // Function to change the turn after each move
 function changeTurn() {
     if (turn === "X") {
         turn = "O"; // If it's X's turn, switch to O
         document.querySelector(".bg").style.left = "85px"; // Move the turn indicator background to 'O'
     } else {
         turn = "X"; // If it's O's turn, switch to X
         document.querySelector(".bg").style.left = "0"; // Move the turn indicator background to 'X'
     }
 }

 // Attach click event to each box in the grid
 boxes.forEach(box => {
     box.innerHTML = ""; // Start with all boxes empty
     box.addEventListener("click", () => {
         if (!isGameOver && box.innerHTML === "") { // Only allow moves if the game isn't over and the box is empty
             box.innerHTML = turn; // Set the box to the current player's symbol
             checkWin(); // Check for a win after each move
             checkDraw(); // Check for a draw after each move
             if (!isGameOver) { // If the game isn't over, change the turn
                 changeTurn();
             }
         }
     });
 });