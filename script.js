function getPrimesInRange(start, end) {
    start = Math.max(2, Math.floor(start));
    end = Math.floor(end);
    if (start > end || isNaN(start) || isNaN(end)) {
        return { primes: [], isPrimeTimings: [], primeTimings: [] };
    }

    const primes = [];
    const isPrimeTimings = [];
    const primeTimings = [];

    for (let num = start; num <= end; num++) {
        const startTime = performance.now();
        const isPrime = checkPrime(num);
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        isPrimeTimings.push({ number: num, result: isPrime ? 'Prime' : 'Normal', time: timeTaken.toFixed(3) });
        if (isPrime) {
            primes.push(num);
            primeTimings.push({ number: num, time: timeTaken.toFixed(3) });
        }
    }

    return { primes, isPrimeTimings, primeTimings };
}

function checkPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function calculatePrimes() {
    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);

    if (isNaN(start) || isNaN(end) || start > end) {
        alert('Please enter a valid range (start ≤ end).');
        return;
    }

    const startTime = performance.now();
    const { primes, isPrimeTimings, primeTimings } = getPrimesInRange(start, end);
    const endTime = performance.now();

    const totalTime = (endTime - startTime).toFixed(3);
    const avgAll = (isPrimeTimings.reduce((sum, item) => sum + parseFloat(item.time), 0) / isPrimeTimings.length).toFixed(3);
    const avgPrimes = (primeTimings.length > 0 ? primeTimings.reduce((sum, item) => sum + parseFloat(item.time), 0) / primeTimings.length : 0).toFixed(3);

    document.getElementById('totalTime').textContent = totalTime;
    document.getElementById('avgAll').textContent = avgAll;
    document.getElementById('avgPrimes').textContent = avgPrimes;
    document.getElementById('primesList').textContent = primes.length > 0 ? primes.join(', ') : 'None';
    document.getElementById('detailsBtn').disabled = isPrimeTimings.length === 0;

    window.isPrimeTimings = isPrimeTimings;
    window.primeTimings = primeTimings;
}

function showDetails() {
    document.getElementById('popup').style.display = 'block';
    populateTable('allTable', window.isPrimeTimings, ['number', 'result', 'time']);
    populateTable('primesTable', window.primeTimings, ['number', 'time']);
    openTab('all');
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function populateTable(tableId, data, keys) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        keys.forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

function openTab(tabName) {
    document.querySelectorAll('.tabcontent').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tablink').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add('active');
}
