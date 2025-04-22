function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  let source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');
  const term = params.get('utm_term');
  const content = params.get('utm_content');

  if (!source && document.referrer) {
    source = document.referrer
  }

  return {
    utm_source: source || 'direct',
    utm_medium: medium || null,
    utm_campaign: campaign || null,
    utm_term: term || null,
    utm_content: content || null
  };
}

function attachLinks(distinctId) {
  document.querySelectorAll('a[href*="app.caimera.ai"]').forEach(link => {
    const baseUrl = link.href.split('?')[0];
    link.href = `${baseUrl}?ph_distinct_id=${distinctId}`;
  });
  console.log("✅ ph_distinct_id attached to app.caimera.ai links & buttons.");
}

function manageTrackingSession(params) {
  setTimeout(() => {
    if (params.utm_source && params.utm_source !== 'direct') {
      const distinctId = posthog.get_distinct_id();
  
      posthog.identify(distinctId, {
        utm_source: params.utm_source,
        utm_medium: params.utm_medium,
        utm_campaign: params.utm_campaign,
        utm_term: params.utm_term,
        utm_content: params.utm_content
      });
  
      attachLinks(distinctId);
      posthog.reset();
      posthog.opt_out_capturing();
      console.log("🚫 PostHog session reset.");
    }
  }, 2000)
}


  // Initialize PostHog with your project API key and api_host
  posthog.init('phc_MDq2diuYFU92FIc3VdtiXaZNQjSma7yBahcGQPBEgW5', {api_host: 'https://us.i.posthog.com'});
  const params = getTrackingParams();
  manageTrackingSession(params);

