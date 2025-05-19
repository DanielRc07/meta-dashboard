let chartInstance;

async function fetchData() {
  const res = await fetch('data.json');
  return await res.json();
}

function createChart(labels, values) {
  const ctx = document.getElementById('metricsChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Métricas',
        data: values,
        backgroundColor: ['#4285F4', '#0F9D58', '#F4B400', '#DB4437']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function updateChart() {
  const data = await fetchData();
  const selected = document.getElementById('campaign').value;
  const campaign = data.find(c => c.campaign === selected);
  const labels = Object.keys(campaign.metrics);
  const values = Object.values(campaign.metrics);
  createChart(labels, values);
}

async function init() {
  const data = await fetchData();
  const select = document.getElementById('campaign');
  data.forEach(c => {
    const option = document.createElement('option');
    option.value = c.campaign;
    option.textContent = c.campaign;
    select.appendChild(option);
  });
  updateChart();
}

init();
