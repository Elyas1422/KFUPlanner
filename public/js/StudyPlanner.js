let colors = ['#3498db','#9b59b6','#34495e','#2ecc71','#e74c3c','#f39c12']
let colorMap = {}

export function colorMapper(courseList) {
  
  for (let i = 0; i < courseList.length; i++) {
    colorMap[courseList[i].code] = colors[i % colors.length]
  }
}

export function addCourse(course) {
  if (course == null || course == []) {
    return
  }
  // Retrieve existing data from localStorage
  const coursesData = localStorage.getItem('courses');

  // Parse data from a string to an array
  const coursesArray = JSON.parse(coursesData) || [];

  if (coursesArray.some(c => c.code == course.code)) {
    return;
  }

  coursesArray.push(course);

  // Stringify the updated array
  const updatedCoursesData = JSON.stringify(coursesArray);

  // Store the updated data back in localStorage
  localStorage.setItem('courses', updatedCoursesData);
}

export function removeCourse(courseCode) {
  // Retrieve existing data from localStorage
  const coursesData = localStorage.getItem('courses');

  // Parse data from a string to an array
  const coursesArray = JSON.parse(coursesData) || [];

  // Find the index of the course with the given code
  const index = coursesArray.findIndex(course => course.code === courseCode);

  // If the course exists, remove it from the array
  if (index !== -1) {
    coursesArray.splice(index, 1);

    // Stringify the updated array
    const updatedCoursesData = JSON.stringify(coursesArray);

    // Store the updated data back in localStorage
    localStorage.setItem('courses', updatedCoursesData);
  }
}


// Draw the pie chart
export function drawChart(courses) {
  let chartData = [['Course', 'Hours per Week']]

  courses.forEach(course => {
    chartData.push([course.code, course.credit])
  });

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    title: 'Study Hours/Week Distribution',
    titleTextStyle: {color : 'white', bold: true},
    pieHole: 0.4,
    backgroundColor: { fill:'transparent' },
    fontName: 'Noto Sans',
    fontSize: 15,
    colors: colors,
    legend: 'none',
    pieSliceText: 'label',
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

let table = document.getElementsByTagName('table')[0]

export function clearTable() {
  let rows = table.children[0].children
  let cols = rows[0].children
  for (let j = 1; j < cols.length; j++) {
    for (let i = 1; i < rows.length; i++) {
      let cell = rows[i].children[j]
      cell.style = ""
      cell.innerHTML = ""
      cell.removeAttribute("data-tooltip")
    }
  }
}

export function registerCourses(courses) {
  let timetable = generateTimetable(courses)

  let rows = table.children[0].children
  let cols = rows[0].children
  for (let j = 1; j < cols.length; j++) {
    for (let i = 1; i < rows.length; i++) {
      let currentIndex = timetable[Object.keys(timetable)[j - 1]][i + "PM"]

      if (currentIndex != '') {
        let course = courses.find(course => course.code == currentIndex)
        let cell = rows[i].children[j]

        AssignCell(course, cell)
      }
    }
  }
  
}

function generateTimetable(courses) {
  // Returns an array of objects 
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = ['1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];
  const timetable = {};

  // Initialize the timetable with empty cells
  for (let day of days) {
    timetable[day] = {};
    for (let hour of hours) {
      timetable[day][hour] = '';
    }
  }

  // Sort the courses by credit hours in descending order
  courses.sort((a, b) => b.credit - a.credit);

  // Assign courses to the timetable
  for (let course of courses) {
    let assigned = false;
    let creditHours = course.credit;
    while (!assigned) {
      let dayIndex = Math.floor(Math.random() * days.length);
      let hourIndex = Math.floor(Math.random() * hours.length);
      let day = days[dayIndex];
      let hour = hours[hourIndex];
      let nextHour = hours[hourIndex + 1];
      let prevHour = hours[hourIndex - 1];
      let isFriday = day === 'Fri';
      let is7PM = hour === '7PM' || nextHour === '7PM' || prevHour === '7PM';

      // Check if the current and adjacent hours are available
      if (timetable[day][hour] === '' &&
          (creditHours === 1 || timetable[day][nextHour] === '') &&
          (creditHours === 1 || timetable[day][prevHour] === '') &&
          (!isFriday || creditHours === 1) &&
          (!is7PM || creditHours === 1)) {

        // Assign the course to the timetable
        timetable[day][hour] = course.code;
        creditHours--;

        // If the course has more than 1 credit hour, assign the next hours
        if (creditHours > 0) {
          let offset = creditHours > 1 ? 1 : 2;
          let nextIndex = hourIndex + offset;
          let prevIndex = hourIndex - offset;
          let nextHour = nextIndex < hours.length ? hours[nextIndex] : null;
          let prevHour = prevIndex >= 0 ? hours[prevIndex] : null;
          let freeHour;

          // Try to find a free cell to assign the next hour
          if (nextHour && timetable[day][nextHour] === '') {
            timetable[day][nextHour] = course.code;
            creditHours--;
            freeHour = prevHour;
          } else if (prevHour && timetable[day][prevHour] === '') {
            timetable[day][prevHour] = course.code;
            creditHours--;
            freeHour = nextHour;
          } else {
            break;
          }

          // Add free cells above and below the assigned cells
          if (timetable[day][freeHour] !== '') {
            timetable[day][offset === 1 ? hours[hourIndex - 1] : hours[hourIndex - 2]] = '';
          }
          if (timetable[day][hours[hourIndex + offset]] !== '') {
            timetable[day][hours[hourIndex + offset === hours.length ? hourIndex + 1 : hourIndex + offset + 1]] = '';
          }
        } else {
          assigned = true;
        }
      }
    }
  }

return timetable;
}

function AssignCell(course, cell) {
  cell.style.backgroundColor = colorMap[course.code]
  cell.classList.add('studyTime')
  cell.innerHTML = course.code
  cell.setAttribute('data-tooltip', course.name)
}
