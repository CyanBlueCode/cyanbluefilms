# Google Sheets CMS Setup

## Quick Start

### 1. API Keys
Edit `.env.local` and `.env.production` and fill in Google Sheets API keys:

```env
GOOGLE_SHEETS_API_KEY_DEV="dev_key"
GOOGLE_SHEETS_API_KEY_PROD="prod_key"
GOOGLE_SHEETS_SPREADSHEET_ID="1TKcc7L949oCCrJtltraWoKLeAWmQZ-zWEFJmoHFq6A0"
```

### 2. Configure CMS Usage
Edit `/src/components/landing/landingPagesDefaultData.js` to enable/disable CMS per page:

```js
export const enableTestVersionsByPage = {
  combatSports: true,  // Uses Google Sheets
  // fitnessGyms: false,  // Uses static data only
};
```

### 3. Google Sheet Structure
- Each landing page gets its own tab/sheet
- Tab name must match the page filename (e.g., `combat-sports` for `combat-sports.jsx`)
- Use 2 columns: Column A = Key, Column B = Value
- First row is headers (will be skipped)

### 4. Key Notation
```
heroSection.title                          → Simple property
heroSection.subtitle[0]                    → Array item
backgroundVideo.filePath                   → Nested object
benefitsSection.cards[0].title            → Array of objects
```

## Usage Example

```jsx
import { enableTestVersionsByPage, combatSportsDefaultData } from '@/components/landing/landingPagesDefaultData';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransform';

const MyPage = () => {
  const shouldUseCMS = enableTestVersionsByPage.combatSports;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'combat-sports' : null);
  const data = cmsResult?.data ?? combatSportsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
    
  const pageData = transformCMSData(data);
  
  if (loading) return <div>Loading...</div>;
  
  return <LandingPage {...pageData} />;
};
```

## Default Data Management
- All static content lives in `/src/components/landing/landingPagesDefaultData.js`
- Each landing page has its own default data export (e.g., `combatSportsDefaultData`)
- Default data serves as fallback when CMS fails or is disabled
- Add new landing pages by creating new data exports and config entries

## Value Parsing
- `TRUE`/`FALSE` → boolean
- `1920` → number
- `&amp;` → `&`
- `&nbsp;` → non-breaking space
- `<strong>text</strong>` → HTML (in FAQ answers)

## Files
- `/src/components/landing/landingPagesDefaultData.js` - Default data and config
- `/src/utils/googleSheets.js` - Fetches and transforms sheet data
- `/src/utils/useLandingPageCMSData.js` - React hook for CMS data
- `/src/utils/cmsTransform.js` - Adds React elements (icons, JSX)
- `/src/pages/api/cms.js` - API endpoint

## Testing
- Set `enableTestVersionsByPage.combatSports: false` to use static data only
- Set `enableTestVersionsByPage.combatSports: true` to use Google Sheets
- Visit `/api/cms?page=combat-sports` to see fetched data
