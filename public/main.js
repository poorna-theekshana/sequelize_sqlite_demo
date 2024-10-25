document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userList');

  // Fetch users and display them
  async function fetchUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();

    // Clear the list and populate with updated users
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });
  }

  // Handle form submission
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Send data to the backend
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    // Clear form and fetch updated user list
    userForm.reset();
    fetchUsers();
  });

  // Initial fetch of users
  fetchUsers();
});
