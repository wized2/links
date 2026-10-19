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
      // Create the card container
      const card = document.createElement('div');
      card.className = 'project-card';
      card.style.animationDelay = `${index * 0.1}s`;

      // Card Header (icon + title)
      const header = document.createElement('div');
      header.className = 'card-header';
      header.innerHTML = `<i data-lucide="${item.icon || 'code'}"></i> <span>${item.title}</span>`;

      // Card Actions (Code + Preview buttons)
      const actions = document.createElement('div');
      actions.className = 'card-actions';
      actions.innerHTML = `
        <a href="${item.codeUrl}" target="_blank" class="btn btn-code">
          <i data-lucide="code"></i> Code
        </a>
        <a href="${item.previewUrl}" target="_blank" class="btn btn-preview">
          <i data-lucide="external-link"></i> Preview
        </a>
      `;

      // Assemble the card
      card.appendChild(header);
      card.appendChild(actions);
      
      // Add it to the page
      container.appendChild(card);
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
