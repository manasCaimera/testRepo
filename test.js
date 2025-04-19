// console.log("UTM script loaded from external source");

// // Get ALL query parameters from current URL
// const params = new URLSearchParams(window.location.search);

// // Only run if there’s at least one param
// if (params.toString()) {
//   const queryString = params.toString();

//   // Find all links pointing to app.caimera.ai
//   document.querySelectorAll('a[href*="app.caimera.ai"]').forEach(link => {
//     const baseUrl = link.href.split('?')[0];  // Remove existing query params
//     link.href = `${baseUrl}?${queryString}`;  // Attach full query string
//   });

//   console.log("✅ All query params attached to app.caimera.ai links:", queryString);
// } else {
//   console.log("⚠️ No query params found in URL.");
// }


console.log("UTM script loaded from external source");

// Get ALL query parameters from current URL
const params = new URLSearchParams(window.location.search);

if (params.toString()) {
  const queryString = params.toString();

  // Update all links pointing to app.caimera.ai
  document.querySelectorAll('a[href*="app.caimera.ai"]').forEach(link => {
    const baseUrl = link.href.split('?')[0];
    link.href = `${baseUrl}?${queryString}`;
  });

  // Attach click handlers to buttons with data-url containing app.caimera.ai
  document.querySelectorAll('button[data-url*="app.caimera.ai"]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const baseUrl = button.getAttribute('data-url').split('?')[0];
      window.open(`${baseUrl}?${queryString}`, '_blank');
    });
  });

  console.log("✅ All query params attached to app.caimera.ai links & buttons:", queryString);
} else {
  console.log("⚠️ No query params found in URL.");
}
