document.addEventListener('DOMContentLoaded', () => {
    const chartTab = document.querySelector('#chart-tab');
    const monthlyDataContainer = document.getElementById('monthly-data-container');
    const ctx = document.getElementById('myBarChart').getContext('2d');
    let myBarChart;

    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const generateMonthlyInputs = () => {
        const allMonthsHTML = months.map(month => {
            const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
            return `
                <div class="col-12 col-md-6 mb-3">
                    <div class="p-3 border bg-light">
                        <strong>${capitalizedMonth}</strong>
                        
                        <div class="row mt-2">
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="income-${month}-label">Income:</span>
                                    <input type="number" class="form-control" id="income-${month}" placeholder="Enter income" aria-label="Income" aria-describedby="income-${month}-label">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="expenses-${month}-label">Expenses:</span>
                                    <input type="number" class="form-control" id="expenses-${month}" placeholder="Enter expenses" aria-label="Expenses" aria-describedby="expenses-${month}-label">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        monthlyDataContainer.innerHTML = allMonthsHTML;
    };

    // Generar los campos de entrada para los meses al cargar la página
    generateMonthlyInputs();

    const getFinancialData = () => {
        const incomes = months.map(month => {
            const income = parseFloat(document.getElementById(`income-${month}`).value) || 0;
            return income;
        });
        const expenses = months.map(month => parseFloat(document.getElementById(`expenses-${month}`).value) || 0);
        return { incomes, expenses };
    };

    const createOrUpdateChart = () => {
        const { incomes, expenses } = getFinancialData();
        const data = {
            labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
            datasets: [
                {
                    label: 'Income',
                    data: incomes,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: expenses,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };

        if (myBarChart) {
            myBarChart.data = data;
            myBarChart.update();
        } else {
            myBarChart = new Chart(ctx, {
                type: 'bar',
                data: data,
            });
        }
    };

    chartTab.addEventListener('shown.bs.tab', () => createOrUpdateChart());

    // Lógica para descargar el gráfico
    const downloadBtn = document.getElementById('download-chart-btn');
    downloadBtn.addEventListener('click', () => {
        if (!myBarChart) return;
        const imageLink = myBarChart.toBase64Image();

        // Crea un elemento de enlace temporal
        const link = document.createElement('a');
        link.href = imageLink;
        link.download = 'my-financial-chart.png'; // Nombre del archivo a descargar

        // Simula un clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // input with id "username"
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value;

        // Validar que el valor ingresado contenga como mínimo 8 y máximo 15 caracteres,
        // al menos una mayúscula, un número y un carácter especial.
        const usernamePattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*\u00C0-\u017F]{8,15}$/;
        const isValid = usernamePattern.test(username);

        if (!isValid) {
            usernameInput.style.borderColor = 'red';
            usernameInput.setCustomValidity('El nombre de usuario debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un carácter especial.');
        } else {
            usernameInput.style.borderColor = 'green';
            usernameInput.setCustomValidity('');
        }
        usernameInput.reportValidity();
    });
});