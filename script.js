// Find the container where links will go
const container = document.getElementById('link-container');

// Function to load and display links
async function loadLinks() {
  try {
    // 1. Fetch the JSON file
    const response = await fetch('links.json');
    
    // Check if the file was found
    if (!response.ok) throw new Error('Failed to load JSON');
    
    // 2. Convert response to JSON data
    const links = await response.json();
    
    // 3. Clear the 'Loading...' text
    container.innerHTML = '';

    // 4. Reverse the array so the latest added item is at the top
    const reversedLinks = [...links].reverse();

    // 5. Loop through each link and create the HTML
    reversedLinks.forEach((item, index) => {
      const a = document.createElement('a');
      a.href = item.url;
      a.className = 'link-btn';
      a.target = '_blank'; // Open in new tab
      
      // Add a slight delay to each animation for a cascading effect
      a.style.animationDelay = `${index * 0.1	s`;

      // Add the Lucide icon and title inside the button
      a.innerHTML = `<i data-lucide="${item.icon || 'link'}"></i> <span>${item.title}</span>`;
      
      // Add it to the page
      container.appendChild(a);
    });

    // 6. Tell Lucide to render the icons
    lucide.createIcons();

  } catch (error) {
    console.error('Error loading links:', error);
    container.innerHTML = '<div class="loading">Could not load links. Please try again.</div>';
  }
}

// Run the function when the page loads
loadLinks();
