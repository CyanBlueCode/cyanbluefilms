// ============================================
// TEMPORARY: MS Clarity Analytics
// Remove when PostHog is implemented
// ============================================

const CLARITY_PROJECT_ID = 'vcuiqrpbpd';

export const initClarity = () => {
  if (process.env.NODE_ENV !== 'dev') return;
  
  const params = new URLSearchParams(window.location.search);
  if (params.get('anal') === 'false') return;
  
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
};
