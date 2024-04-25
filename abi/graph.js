 // JavaScript logic
 const loanAmount = 10000; // Initial loan amount
 const annualInterestRate = 0.05; // Annual interest rate (5%)
 const loanTerm = 5; // Loan term in years

 const canvas = document.getElementById('loanGraph');
 const ctx = canvas.getContext('2d');

 function drawGraph() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Draw axes
   ctx.beginPath();
   ctx.moveTo(50, 50);
   ctx.lineTo(50, canvas.height - 20);
   ctx.lineTo(canvas.width - 20, canvas.height - 20);
   ctx.strokeStyle = '#777';
   ctx.stroke();

   // Draw loan amount
   const numberOfMonths = loanTerm * 12;
   const monthlyInterestRate = annualInterestRate / 12;
   const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
   
   ctx.beginPath();
   ctx.moveTo(50, canvas.height - 20);
   let x = 50;
   let y = canvas.height - 20;
   for (let i = 0; i <= numberOfMonths; i++) {
     x += (canvas.width - 20) / numberOfMonths;
     const interestPayment = loanAmount * monthlyInterestRate;
     const principalPayment = monthlyPayment - interestPayment;
     const remainingBalance = loanAmount - principalPayment * i;
     y = canvas.height - 20 - (remainingBalance / loanAmount) * (canvas.height - 20);
     ctx.lineTo(x, y);

     // Draw vertical lines indicating payments
     ctx.moveTo(x, canvas.height - 50);
     ctx.lineTo(x, y);
   }
   ctx.strokeStyle = '#007bff';
   ctx.stroke();

   // Add hover effect to display payments due for each month
   canvas.addEventListener('mousemove', (event) => {
     const rect = canvas.getBoundingClientRect();
     const mouseX = event.clientX - rect.left;
     const mouseY = event.clientY - rect.top;

     const monthWidth = (canvas.width - 20) / numberOfMonths;
     const monthIndex = Math.floor((mouseX - 20) / monthWidth);
     const interestPayment = loanAmount * monthlyInterestRate;
     const principalPayment = monthlyPayment - interestPayment;
     const remainingBalance = loanAmount - principalPayment * monthIndex;
     const paymentDue = principalPayment + interestPayment;

     if (mouseX > 50 && mouseX < canvas.width - 50 && mouseY > 50 && mouseY < canvas.height - 50) {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       drawGraph();

       // Draw vertical line indicating hover position
       ctx.beginPath();
       ctx.moveTo(50 + (monthIndex + 1) * monthWidth, 50);
       ctx.lineTo(50 + (monthIndex + 1) * monthWidth, canvas.height - 50);
       ctx.strokeStyle = '#333';
       ctx.stroke();

       // Show payment due on hover
       ctx.font = '14px Arial';
       ctx.fillStyle = '#333';
       ctx.fillText(`Month ${monthIndex + 1}: Payment Due $${paymentDue.toFixed(2)}`, 20, 20);
     }
   });
 }

 drawGraph();