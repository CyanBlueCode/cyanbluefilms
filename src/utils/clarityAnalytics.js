// ============================================
// NOTE MS Clarity - Remove when PostHog is implemented
// ============================================
import Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = 'vcuiqrpbpd';

export const initClarity = () => {
  if (process.env.NODE_ENV !== 'production') return;
  
  const params = new URLSearchParams(window.location.search);
  if (params.get('anal') === 'false') return;
  
  Clarity.init(CLARITY_PROJECT_ID);
};
