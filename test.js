console.log("UTM script loaded from external source");

// Get UTM params from URL
const params = new URLSearchParams(window.location.search);
const utm_source = params.get("utm_source");
const utm_campaign = params.get("utm_campaign");

console.log("UTM values:", utm_source, utm_campaign);

// Check if both UTM params exist
if (utm_source && utm_campaign) {
  // Rebuild the full UTM query string
  const utmParams = `utm_source=${encodeURIComponent(utm_source)}&utm_campaign=${encodeURIComponent(utm_campaign)}`;

  // Find all links pointing to app.caimera.ai
  document.querySelectorAll('a[href*="app.caimera.ai"]').forEach(link => {
    const baseUrl = link.href.split('?')[0];  // remove existing query params
    link.href = `${baseUrl}?${utmParams}`;    // attach UTM params
  });

  console.log("✅ UTM params attached to app.caimera.ai links:", utmParams);
}
