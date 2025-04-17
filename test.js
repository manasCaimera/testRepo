console.log("UTM script loaded from external source");

// Save UTM to localStorage
const params = new URLSearchParams(window.location.search);
const utm_source = params.get("utm_source");
const utm_campaign = params.get("utm_campaign");

console.log("UTM values:", utm_source, utm_campaign);

if (utm_source && utm_campaign) {
  localStorage.setItem("utm_source", utm_source);
  localStorage.setItem("utm_campaign", utm_campaign);
}

function getUTMParams() {
  const source = localStorage.getItem("utm_source");
  const campaign = localStorage.getItem("utm_campaign");
  if (source && campaign) {
    return `?utm_source=${source}&utm_campaign=${campaign}`;
  }
  return '';
}

window.addEventListener('load', function() {
  console.log("Attaching click listener");

  document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (target) {
      const href = target.getAttribute('href');
      if (href && href.startsWith('https://app.caimera.ai')) {
        const utmParams = getUTMParams();
        if (utmParams) {
          e.preventDefault();
          const newUrl = href.includes('?') ? href + '&' + utmParams.slice(1) : href + utmParams;
          if (target.getAttribute('target') === '_blank') {
            window.open(newUrl, '_blank');
          } else {
            window.location.href = newUrl;
          }
        }
      }
    }
  });
});

