// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "1",
  authDomain: "emr-analyst-website.firebaseapp.com",
  databaseURL: "https://emr-analyst-website-default-rtdb.firebaseio.com", // Ensure correct URL
  projectId: "emr-analyst-website",
  storageBucket: "emr-analyst-website.appspot.com",
  messagingSenderId: "1",
  appId: "1",
  measurementId: "G-JWBGMV44XZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference to the database service
var database = firebase.database();

// Wait until the DOM is fully loaded
window.onload = function() {
  // Form submission handling
  document.getElementById('dataForm').addEventListener('submit', submitForm);

  // Call readDataAndPopulateDropdown to populate the dropdown menu on page load
  readDataAndPopulateDropdown();

  // Call displayAllDomainDetails to display all domain details on page load
  displayAllDomainDetails();

  // Add event listener for domain selection change
  document.getElementById('domainSelect').addEventListener('change', populateFieldsFromDropdown);
};

function submitForm(e) {
  e.preventDefault();
  var domainKey = document.getElementById('domainSelect').value;
  var statusInput = document.getElementById('statusSelect').value;
  var commentInput = document.getElementById('commentInput').value;
  var purposeInput = document.getElementById('purposeInput').value;
  var iPMconnectionInput = document.getElementById('iPMconnectionInput').value;

  // Debugging: Log the captured values
  console.log("Domain Key: ", domainKey);
  console.log("Status Input: ", statusInput);
  console.log("Comment Input: ", commentInput);
  console.log("Purpose Input: ", purposeInput);
  console.log("iPMconnection Input: ", iPMconnectionInput);

  saveData(domainKey, statusInput, commentInput, purposeInput, iPMconnectionInput);
}

// Function to save data to Firebase
function saveData(domainKey, status, comment, purpose, iPMconnection) {
  var domainRef = database.ref('domainStatus').child(domainKey);

  // Debugging: Log the data to be saved
  console.log("Saving Data: ", { status: status, comment: comment, purpose: purpose, iPMconnection: iPMconnection });

  domainRef.update({
    status: status,
    comment: comment,
    purpose: purpose,
    iPMconnection: iPMconnection
  }).then(() => {
    alert("Data saved successfully!");
    displayAllDomainDetails(); // Refresh the displayed data after saving
  }).catch((error) => {
    console.error("Error saving data: ", error);
  });
}

// Function to read data from Firebase and populate dropdown menu
function readDataAndPopulateDropdown() {
  var domainSelect = document.getElementById('domainSelect');

  var domainStatusRef = database.ref('domainStatus');
  domainStatusRef.once('value', (snapshot) => {
    var data = snapshot.val();

    // Add placeholder option
    var placeholderOption = document.createElement('option');
    placeholderOption.value = "";
    placeholderOption.textContent = "Select a domain";
    domainSelect.appendChild(placeholderOption);

    // Populate dropdown with domain options
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        option.setAttribute('data-comment', data[key].comment || ''); // Store comment as data attribute
        option.setAttribute('data-purpose', data[key].purpose || ''); // Store purpose as data attribute
        option.setAttribute('data-iPMconnection', data[key].iPMconnection || ''); // Store iPMconnection as data attribute
        domainSelect.appendChild(option);
      }
    }
  });
}

// Function to display all domain details
function displayAllDomainDetails() {
  var domainDetails = document.getElementById('domainDetails');
  domainDetails.innerHTML = ''; // Clear previous content

  var domainStatusRef = database.ref('domainStatus');
  domainStatusRef.once('value', (snapshot) => {
    var data = snapshot.val();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var domainInfo = data[key];
        var tr = document.createElement('tr');

        // Create status circle based on status value
        var statusClass = 'status-' + domainInfo.status;
        var statusCircle = `<span class="status-circle ${statusClass}"></span>`;

        tr.innerHTML = `<td>${key}</td>
                        <td>${statusCircle}</td>
                        <td>${domainInfo.comment}</td>
                        <td>${domainInfo.purpose}</td>
                        <td>${domainInfo.iPMconnection}</td>`;
        domainDetails.appendChild(tr);
      }
    }
  });
}

// Function to populate input fields from dropdown
function populateFieldsFromDropdown() {
  var selectedOption = this.options[this.selectedIndex];
  var comment = selectedOption.getAttribute('data-comment') || '';
  var purpose = selectedOption.getAttribute('data-purpose') || '';
  var iPMconnection = selectedOption.getAttribute('data-iPMconnection') || '';

  document.getElementById('commentInput').value = comment;
  document.getElementById('purposeInput').value = purpose;
  document.getElementById('iPMconnectionInput').value = iPMconnection;
}

// Prompt for admin access
function promptAdmin() {
  const adminPassword = "admin123";
  const userPassword = prompt("Enter admin password to access admin panel:");
  if (userPassword === adminPassword) {
    showAdminPanel();
  } else {
    alert("Access Denied: You are not an admin.");
  }
}

// Function to toggle admin panel visibility
function showAdminPanel() {
  const adminPanel = document.getElementById('admin-panel');
  adminPanel.style.display = 'block';
}
