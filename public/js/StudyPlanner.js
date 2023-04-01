

let courseList = [{
    'Name': 'Software Project Management',
    'Code': 'SWE387',
    'Credit': 3
    },
    {
      'Name': 'Software Testing',
      'Code': 'SWE326',
      'Credit': 3
    },
    {
      'Name': 'Information Security',
      'Code': 'ICS344',
      'Credit': 3
    },
    {
      'Name': 'Psychology',
      'Code': 'GS321',
      'Credit': 3
    },
    {
      'Name': 'Web Development ❤️',
      'Code': 'SWE363',
      'Credit': 3
    },
    {
      'Name': 'Career Essentials',
      'Code': 'CGS392',
      'Credit': 1
    }
  ]
  
  let colors = ['#3498db','#9b59b6','#34495e','#2ecc71','#e74c3c','#f39c12']
  
  let colorMap = {}
  for (let i = 0; i < courseList.length; i++) {
    colorMap[courseList[i].Code] = colors[i]
  }
  
  
  // Draw the pie chart
  function drawChart() {
    let chartData = [['Course', 'Hours per Week']]
  
    courseList.forEach(course => {
      chartData.push([course.Code, course.Credit])
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
  
  registerCourses()
  
  function registerCourses() {
  
    let rows = table.children[0].children
    for (let i = 1; i < rows.length; i++) {
      for (let j = 1; j < rows[i].children.length; j++) {
  
        let course = courseList[Math.floor(Math.random() * courseList.length)]
        // For now the function is random, until a better replacement
        if (Math.random() > 0.75) {
          let cell = rows[i].children[j]
          cell.style.backgroundColor = colorMap[course.Code]
          cell.classList.add('studyTime')
          cell.innerHTML = course.Code
          cell.setAttribute('data-tooltip', course.Name)
        }
      }
    }
  }
  
  
  
  
  // Chart Init
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);