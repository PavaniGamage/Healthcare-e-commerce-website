// Handle role selection
let selectedRole = "";

// Event listener for Admin button
document.getElementById("admin-btn").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default anchor behavior
    selectedRole = "admin";  // Set the role to admin
    localStorage.setItem("role", "admin");  // Save selected role in localStorage
    updateForm();
});

// Event listener for Pharmacist button
document.getElementById("pharmacist-btn").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default anchor behavior
    selectedRole = "pharmacist";  // Set the role to pharmacist
    localStorage.setItem("role", "pharmacist");  // Save selected role in localStorage
    updateForm();
});

// Update form based on selected role
function updateForm() {
    // Set default values based on role
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let form = document.getElementById("login-form");

    if (selectedRole === "admin") {
        document.getElementById("admin-btn").style.backgroundColor = "black";
        document.getElementById("pharmacist-btn").style = "btn btn-primary";
    } else if (selectedRole === "pharmacist") {
        document.getElementById("pharmacist-btn").style.backgroundColor = "black";
        document.getElementById("admin-btn").style = "btn btn-primary";
    }
}

// Handle form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Check if a role is selected
    if (!selectedRole) {
        event.preventDefault();  // Prevent form submission
        alert("Please select a role (Admin or Pharmacist) before filling out the form.");
        return;
    }

    // Prepare data for the POST request
    let data = { username, password };

    // Send a POST request to the backend server over HTTPS
    fetch('http://localhost:5000/sign_in', { 
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Save the JWT token securely (e.g., in localStorage or cookies)
            localStorage.setItem('authToken', data.token);

            console.log( 'role returned:', data.role);

            // Redirect based on role
            if (selectedRole === data.role && selectedRole == 'admin') {
                window.location.href = "http://localhost:5000/";  // Go to admin dashboard
            } else if (selectedRole === data.role && selectedRole == 'pharmacist') {
                window.location.href = "http://localhost:5000/prescriptions";  // Go to prescription page
            } else {
                console.log('Oops! The role and credentials do not match. Please try again.');
                alert("Invalid credentials with role!");

                // Clear username and password fields
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
            }
        } else {
            alert("Invalid username or password.");

            // Clear username and password fields
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}); 

// Client-side JavaScript to handle logout
function logout() {
    // Clear the JWT token and role (if it's stored in localStorage or cookies)
    localStorage.removeItem('role');
    localStorage.removeItem('authToken');
    
    // Optionally, make a request to the server to destroy the session (if using sessions)
    fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'  // Ensure cookies (session) are sent if needed
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);  // Log server response 
        window.location.href = '/logout';  // Redirect to sign-in page
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}

// Attach the logout function to the button logout
document.getElementById("logout-button").addEventListener("click", logout);