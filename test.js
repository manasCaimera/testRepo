console.log("new script loaded")

setTimeout(() => {
  console.log("UTM script loaded from external source");

  // Get ALL query parameters from current URL
  const params = new URLSearchParams(window.location.search);
  
  // Check if UTM parameters exist
  const utmParams = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
    if (params.get(key)) {
      utmParams[key] = params.get(key);
    }
  });
  
  // If UTM parameters are found
  if (Object.keys(utmParams).length > 0) {
    console.log("✅ UTM params found:", utmParams);
  
    // Send UTM parameters to PostHog as person properties
    if (typeof posthog !== 'undefined') {
      posthog.identify(posthog.get_distinct_id(), utmParams);
  
      // Get the distinct id
      const distinctId = posthog.get_distinct_id();
  
      // Build new query string: UTM params + distinct id
      const newParams = new URLSearchParams({...Object.fromEntries(params.entries()), ph_distinct_id: distinctId}).toString();
  
      // Update all links pointing to app.caimera.ai
      document.querySelectorAll('a[href*="app.caimera.ai"]').forEach(link => {
        const baseUrl = link.href.split('?')[0];
        link.href = `${baseUrl}?${newParams}`;
      });
  
      // Attach click handlers to buttons with data-url containing app.caimera.ai
      document.querySelectorAll('button[data-url*="app.caimera.ai"]').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const baseUrl = button.getAttribute('data-url').split('?')[0];
          window.open(`${baseUrl}?${newParams}`, '_blank');
        });
      });
  
      console.log("✅ All query params + distinct_id attached to app.caimera.ai links & buttons:", newParams);
    } else {
      console.warn("⚠️ PostHog not initialized.");
    }
  } else {
    console.log("⚠️ No UTM params found in URL.");
  }
  
},2000)


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


// console.log("UTM script loaded from external source");

// // Get ALL query parameters from current URL
// const params = new URLSearchParams(window.location.search);

// if (params.toString()) {
//   const queryString = params.toString();

//   // Update all links pointing to app.caimera.ai
//   document.querySelectorAll('a[href*="app.caimera.ai"]').forEach(link => {
//     const baseUrl = link.href.split('?')[0];
//     link.href = `${baseUrl}?${queryString}`;
//   });

//   // Attach click handlers to buttons with data-url containing app.caimera.ai
//   document.querySelectorAll('button[data-url*="app.caimera.ai"]').forEach(button => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       const baseUrl = button.getAttribute('data-url').split('?')[0];
//       window.open(`${baseUrl}?${queryString}`, '_blank');
//     });
//   });

//   console.log("✅ All query params attached to app.caimera.ai links & buttons:", queryString);
// } else {
//   console.log("⚠️ No query params found in URL.");
// }
