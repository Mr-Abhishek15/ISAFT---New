//    menu-btn

var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("active");
})
   
   
   // JavaScript logic
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const monthYearElement = document.getElementById('month-year');
    const calendarBody = document.getElementById('calendar-body');

    function renderCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

      let html = '';
      let dayCount = 1;

      for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth) {
            html += '<td></td>';
          } else if (dayCount > lastDayOfMonth) {
            break;
          } else {
            html += `<td data-date="${currentYear}-${currentMonth + 1}-${dayCount}">${dayCount}</td>`;
            dayCount++;
          }
        }
        html += '</tr>';
      }

      calendarBody.innerHTML = html;

      // Add event listener to each date cell
      document.querySelectorAll('#calendar-body td').forEach((cell) => {
        cell.addEventListener('click', () => {
          cell.classList.toggle('selected');
        });
      });
    }

    renderCalendar();

    document.getElementById('prev').addEventListener('click', () => {
      currentMonth -= 1;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
      }
      renderCalendar();
    });

    document.getElementById('next').addEventListener('click', () => {
      currentMonth += 1;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
      }
      renderCalendar();
    });


