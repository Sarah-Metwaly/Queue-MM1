
// Traffic function to calculate the traffic intensity (rho)
function trafficFun(lambda, mew) {
    let ans = lambda / mew;
    return ans;
}

// p0 function to calculate the probability of no customers in the system
function p0Fun(traffic) {
    return (1-traffic);
}

// pn function to calculate the probability for n customers
function pn(traffic, n, p0) {
    return(Math.pow(traffic,n)*p0);
}

// Calculate P(N > 6)
function pN6(p0, p1, p2, p3, p4, p5, p6) {
    let ans = 1 - (p0 + p1 + p2 + p3 + p4 + p5 + p6);
    return ans;
}



// Function to calculate E(Lq)
function calculate_E_Lq(traffic) {
    return (Math.pow(traffic,2)/(1 - traffic));
}

// Function to calculate E(L)
function calculateEL(traffic) {
    return ((traffic)/(1-traffic));
}

// Function to calculate E(S) 
function calculateES(mew,lambda) {
    return (1/(mew-lambda));
}

// Function to calculate E(Wq)
function calculateEWq(E_Lq, lambda) {
    let EWq = E_Lq / lambda;
    return EWq;
}

// Function to calculate E(W)
function calculateEW(E_S, mew) {
    let EW = E_S - (1 / mew);
    return EW;
}
 
// Function to calculate W(N > 0)
function W_greater_than_0(traffic) {
    return traffic;
}
// Function to calculate P(W > t) with a dynamic t value
    function calculatePW(traffic,mew, E_W, t) {
        const PW_greater_than_t = traffic * Math.exp(-mew * (1 - traffic) * (t * E_W));
        return PW_greater_than_t;
    }

document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the inputs
    const lambda = parseFloat(document.getElementById('lambda').value); // Parse decimal numbers for λ
    const mew = parseFloat(document.getElementById('Mew').value);       // Parse decimal numbers for μ

    // Validate inputs
    if (isNaN(lambda) || isNaN(mew)) {
        alert("Please enter valid numbers. Lambda and Mew can be decimal numbers.");
        return;
    }

    // Ensure lambda and mew are positive numbers
    if (lambda <= 0 || mew <= 0) {
        alert("Lambda and Mew must be greater than 0.");
        return;
    }
    /////////////////////////calculate///////////////////////////////

    // Calculate the Traffic Intensity (rho)
    const traffic = trafficFun(lambda, mew);
    console.log("Traffic intensity (rho):", traffic);

    // Calculate p0
    const p0 = p0Fun(traffic);
    console.log("p0 (probability of no customers):", p0);


    // Calculate Pn for n = 1 to 6
    const p1 = pn(traffic, 1, p0);
    const p2 = pn(traffic, 2, p0);
    const p3 = pn(traffic, 3, p0);
    const p4 = pn(traffic, 4, p0);
    const p5 = pn(traffic, 5, p0);
    const p6 = pn(traffic, 6, p0);

    // Calculate P(N > 6)
    const pGreater6 = pN6(p0, p1, p2, p3, p4, p5, p6);
    console.log("P(N > 6):", pGreater6);

    // Calculate E(Lq) and E(L)
    const E_Lq = calculate_E_Lq(traffic);
    console.log("E(Lq):", E_Lq);

    const E_L = calculateEL(traffic);
    console.log("E(L):", E_L);

    // Calculate E(S)
    const E_S = calculateES(mew , lambda);
    console.log("E(S) (Expected service time):", E_S);

    // Calculate E(Wq) and E(W)
    const E_Wq = calculateEWq(E_Lq, lambda);
    console.log("E(Wq):", E_Wq);

    const E_W = calculateEW(E_S, mew);
    console.log("E(W) (Expected wait time):", E_W);  

    // Calculate W(N > 0)
    const W = W_greater_than_0(traffic);
    console.log("W(N > 0):", W);

     // Call the new PW function with different t values (0.5 and 1.5)
    const PW_05 = calculatePW(traffic,mew, E_W, 0.5); // t = 0.5
    console.log("P(W > 0.5):", PW_05);

    const PW_15 = calculatePW(traffic,mew, E_W, 1.5); // t = 1.5
    console.log("P(W > 1.5):", PW_15);

    // Calculate formulas for E(W > t)
    const ans = -mew * (1 - traffic);
    const formulaEWt = `${traffic} * e^(${ans} * t)`;
    const formulaEWt_0 = `e^(${ans} * t)`;
    const formulaEWt_mean = `e^(${ans} * t - ${1 / mew})`;


    // Update the table with results
    const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = ''; // Clear the table before adding new results

    const rows = [
        ['interarrival (1 / λ)' ,1/lambda],
        ['Service time (1 / μ)',1/mew],
        ['ρ (Traffic Intensity)', traffic.toFixed(5)],  
        ['p0 (Probability of no customers)', p0.toFixed(5)],   
        ['p1 (Probability of 1 customer)', p1.toFixed(5)],
        ['p2 (Probability of 2 customers)', p2.toFixed(5)],
        ['p3 (Probability of 3 customers)', p3.toFixed(5)],
        ['p4 (Probability of 4 customers)', p4.toFixed(5)],
        ['p5 (Probability of 5 customers)', p5.toFixed(5)],
        ['p6 (Probability of 6 customers)', p6.toFixed(5)],
        ['P(N > 6)', pGreater6.toFixed(5)],
        ['E(L)', E_L.toFixed(5)],
        ['E(S)', E_S.toFixed(5)],
        ['E(Lq)', E_Lq.toFixed(5)],
        ['E(W)', E_W.toFixed(5)],
        ['W(W > 0)', W.toFixed(5)],
        ['P(W > 0.5)', PW_05.toFixed(5)],
        ['P(W > 1.5)', PW_15.toFixed(5)],
        ['E(W > t)', formulaEWt],  // No rounding for formulas
        ['E(W > t | W > 0)', formulaEWt_0],  // No rounding for formulas
        ['E(W > t | W > mean time)', formulaEWt_mean]  // No rounding for formulas
    ];
    rows.forEach(row => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = row[0];  // Parameter name
        const td2 = document.createElement('td');
        td2.textContent = row[1];  // Formula or numeric value
        tr.appendChild(td1);
        tr.appendChild(td2);
        resultTable.appendChild(tr);
    });
});


////////////////////////////////////////////////////////////////



// Function to calculate traffic intensity (ρ)
function calculateTraffic(lambda2, mew2) {
    return lambda2 / mew2;
}

// Function to calculate expected waiting time (E(W))
function calculateE_W(lambda2, mew2) {
    // First calculate E(S)
    const E_S = 1 / (mew2 - lambda2);
    const E_W = E_S - (1 / mew2);
    return E_W;
}

///////////////////////////////////////////

document.getElementById('calculatorForm2').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    const lambda2 = parseFloat(document.getElementById('lambda2').value);
    const mew2 = parseFloat(document.getElementById('mew2').value);

    // Validate inputs
    if (lambda2 <= 0 || mew2 <= 0 || lambda2 >= mew2) {
        alert('Please enter valid values: λ > 0, μ > 0, and λ < μ');
        return;
    }

    // Call the function to calculate traffic intensity (ρ)
    const trafficIntensity = calculateTraffic(lambda2, mew2);
    // Call the function to calculate expected waiting time (E(W))
    const expectedWaitTime = calculateE_W(lambda2, mew2);

    // Calculate p(W > t) for different values of t (1, 2, 5, 10, 15, 20)
    const tValues = [1, 2, 5, 10, 15, 20];
    const pwtValues = tValues.map(t =>trafficIntensity*Math.exp(-mew2 * (1 - trafficIntensity) * t));

    // Create a new row for the table
    const resultTable = document.getElementById('resultTable2').getElementsByTagName('tbody')[0];
    const newRow = document.createElement('tr');
    
    // Create the cells for the row
    const trafficCell = document.createElement('td');
    trafficCell.textContent = trafficIntensity.toFixed(3);
    const eWCell = document.createElement('td');
    eWCell.textContent = expectedWaitTime.toFixed(3);
    
    // Append the cells for p(W > t)
    newRow.appendChild(trafficCell);
    newRow.appendChild(eWCell);
    
    pwtValues.forEach(pwt => {
        const pwtCell = document.createElement('td');
        pwtCell.textContent = pwt.toFixed(3);
        newRow.appendChild(pwtCell);
    });

    // Append the new row to the table
    resultTable.appendChild(newRow);

    // Clear the input fields
    document.getElementById('lambda2').value = '';
    document.getElementById('mew2').value = '';
});