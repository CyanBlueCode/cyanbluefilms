# TypeScript Conversion Plan

## Flow-Based Conversion

### Reasoning FOR Flow-Based Approach:

1. **Immediate Value**: You get type safety where it matters most - the data flowing through your complex pages. Typing a Google Sheets response that you don't control provides minimal benefit.

2. **Incremental Type Building**: As you work through the landing page flow, you'll naturally discover which types are actually needed. You won't waste time typing things that never cause bugs.

3. **Testable Units**: Each flow is a complete feature you can test end-to-end. Converting "all utils" doesn't give you a working typed feature.

4. **Production Safety**: If the landing page flow breaks, you only roll back that flow. With the original plan, a broken util could affect multiple pages.

5. **Motivation**: Seeing a fully-typed landing page working is more satisfying than having 20 half-typed utils.

6. **Real-World Patterns**: You'll discover actual prop shapes by tracing data through components, not guessing at comprehensive interfaces upfront.

### Reasoning AGAINST Comprehensive Approach:

1. **Over-Engineering**: Typing `shuffleImages.js` or `clarityAnalytics.js` provides near-zero value - they're simple, stable, and rarely touched.

2. **External Data**: Google Sheets API returns `any` - you'd spend time typing transformations of data you don't control. Better to type at the boundary where it enters your components.

3. **Diminishing Returns**: The last 20% of coverage takes 80% of the effort. Simple utils work fine without types.

---

## Phase 0: Minimal Setup (30 min)

```bash
npm install --save-dev typescript @types/react @types/react-dom @types/node
```

**tsconfig.json** (minimal):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Create `src/types/index.ts` - we'll add to this incrementally.

---

## Flow 1: Landing Pages (Week 1-3)

**Goal**: Type the entire landing page data flow from CMS → transform → component rendering.

### Step 1: Type the component props (work backwards from UI)
**File: `src/types/index.ts`**
```typescript
import { ReactElement, ReactNode } from 'react';

// Start minimal, add fields as you encounter them
export interface LandingPageProps {
  heroSection?: {
    title: string | ReactElement;
    subtitle?: (string | ReactElement)[];
    callButtonText?: string | ReactElement;
    backgroundVideo?: any; // Keep as 'any' initially, refine if needed
    imageUrl?: string;
  };
  benefitsSection?: {
    title: string | ReactElement;
    subtitle?: string | ReactElement;
    cards: Array<{
      title: string | ReactElement;
      description: string | ReactElement;
      icon?: any;
    }>;
  };
  mainVideoSection?: VideoSectionData;
  secondaryVideoSection?: VideoSectionData;
  packageHighlightsSection?: any; // Type later if needed
  processSection?: any;
  clientBrandsSection?: any;
  faqSection?: {
    title: string | ReactElement;
    subtitle?: string | ReactElement;
    items: Array<{
      question: string | ReactElement;
      answer: string | ReactElement;
    }>;
  };
  contactSection?: any;
  isDarkBackground?: boolean;
  isLightText?: boolean;
}

export interface VideoSectionData {
  title?: string | ReactElement;
  subtitle?: string | ReactElement;
  videoUrl?: string;
  imageUrl?: string;
}

export interface ColorTheme {
  primaryBg: string;
  secondaryBg: string;
  tertiaryBg: string;
  titleText: string;
  subtitleText: string;
  bodyText: string;
}
```

### Step 2: Convert the landing page component
**`src/components/landing/LandingPage.jsx` → `LandingPage.tsx`**

```typescript
import { FC } from 'react';
import { LandingPageProps, ColorTheme } from '@/types';

const getColors = (isDarkBackground: boolean, isLightText: boolean): ColorTheme => ({
  // ... existing implementation
});

const LandingPage: FC<LandingPageProps> = ({
  heroSection,
  benefitsSection,
  // ... rest of props
  isDarkBackground = false,
  isLightText = false,
}) => {
  // ... existing implementation
};

export default LandingPage;
```

### Step 3: Convert the page that uses it
**`src/pages/for/combat-sports.jsx` → `combat-sports.tsx`**

```typescript
import { GetStaticProps } from 'next';
import LandingPage from '@/components/landing/LandingPage';
// Keep other imports as .js for now

const CombatSports = () => {
  // ... existing implementation
};

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    hideConstructionBanner: true,
  },
});

export default CombatSports;
```

### Step 4: Type the transform function (only what's needed)
**`src/utils/cmsTransformAndManualConfigs.js` → Keep as `.js`**

But add JSDoc types for the main export:
```javascript
/**
 * @param {any} cmsData - Raw CMS data (leave as any, we don't control it)
 * @param {string} pageName
 * @returns {import('@/types').LandingPageProps}
 */
export const transformCMSData = (cmsData, pageName) => {
  // ... existing implementation
};
```

**Leave `googleSheets.js` and `useLandingPageCMSData.js` as JavaScript** - they work fine and typing external API responses is low value.

### Step 5: Convert child components only if they cause type errors
- `CircularInfographic.jsx` → `.tsx` (if needed)
- `CallBooking.jsx` → `.tsx` (if needed)
- Leave `AnimatedCardCarousel.jsx`, `VideoSection.jsx` as `.jsx` unless they break

**Test**: Deploy one landing page, verify it works, then convert the other 7 landing pages.

---

## Flow 2: Gallery/Work Pages (Week 4-5)

**Goal**: Type the gallery data flow.

### Step 1: Add gallery types to `src/types/index.ts`
```typescript
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  category?: string;
}
```

### Step 2: Convert gallery components
- `src/components/gallery/Gallery.jsx` → `Gallery.tsx`
- `src/components/gallery/WorkGallery.jsx` → `WorkGallery.tsx`
- `src/components/gallery/CategoryGallery.jsx` → `CategoryGallery.tsx`

### Step 3: Convert gallery pages
- `src/pages/work.jsx` → `work.tsx`
- `src/pages/photo/index.jsx` → `index.tsx`
- Other photo pages as needed

**Leave `imagekit.js` and `shuffleImages.js` as JavaScript** - they're simple utilities.

---

## Flow 3: Contact Flow (Week 6)

**Goal**: Type the contact form submission.

### Step 1: Add API types to `src/types/index.ts`
```typescript
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}
```

### Step 2: Convert API route
**`src/pages/api/contact.js` → `contact.ts`**

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormData } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, projectType, message } = req.body as ContactFormData;
  // ... rest of implementation
}
```

### Step 3: Convert contact components
- `src/components/ContactSection.jsx` → `ContactSection.tsx`
- `src/components/ContactCard.jsx` → `ContactCard.tsx`

### Step 4: Convert contact page
- `src/pages/contact.jsx` → `contact.tsx`

---

## Flow 4: Core Layout (Week 7)

**Goal**: Type the app shell.

### Step 1: Convert layout components
- `src/components/layout/Layout.jsx` → `Layout.tsx`
- `src/components/layout/AppBar.jsx` → `AppBar.tsx`
- `src/components/layout/Footer.jsx` → `Footer.tsx`

### Step 2: Convert app entry
- `src/pages/_app.jsx` → `_app.tsx`
- `src/pages/_document.jsx` → `_document.tsx`

### Step 3: Convert context
- `src/context/GlobalContext.jsx` → `GlobalContext.tsx`

---

## What NOT to Convert (Leave as .js):

1. ❌ `src/utils/googleSheets.js` - External API, returns `any`
2. ❌ `src/utils/clarityAnalytics.js` - Simple side effect, no return value
3. ❌ `src/utils/shuffleImages.js` - Simple array shuffle
4. ❌ `src/utils/imagekit.js` - Simple string builders
5. ❌ `src/utils/useIsMobile.js` - Returns boolean, self-documenting
6. ❌ `src/components/ui/pageTitles.js` - Simple object lookup
7. ❌ `src/styles/theme.js` - MUI theme, already typed by MUI

These provide minimal value when typed and work perfectly as JavaScript.

---

## Summary

**Flow-based is better because:**
- You get working, typed features incrementally
- You only type what provides value
- Each flow is independently deployable
- You discover real types, not theoretical ones
- 80/20 rule: 80% of bugs come from 20% of code (complex data flows)

**Start with Landing Pages** - they're your most complex flow and will teach you the most about what types you actually need.

---

## Key Patterns & Best Practices

### 1. Gradual Strictness
Start with `"strict": false` in tsconfig, then enable strict mode features one at a time:
```json
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true,  // Enable first
    "strictNullChecks": true,  // Enable second
    // ... enable others gradually
  }
}
```

### 2. Coexistence Strategy
- Keep `.jsx` and `.tsx` files side-by-side
- TypeScript can import JavaScript files
- Convert dependencies first, consumers second

### 3. Props Pattern
```typescript
// Always export prop interfaces
export interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
  children?: ReactNode;
}

const ComponentName: FC<ComponentNameProps> = ({ requiredProp, optionalProp = 10 }) => {
  // ...
};
```

### 4. Event Handlers
```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  // ...
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  // ...
};
```

### 5. MUI Component Typing
```typescript
import { SxProps, Theme } from '@mui/material';

interface Props {
  sx?: SxProps<Theme>;
}
```

---

## Testing Strategy
After each conversion:
1. Run `npm run dev` - ensure no build errors
2. Test the specific page/component in browser
3. Check console for runtime errors
4. Verify production build: `npm run build`

---

## Rollback Plan
If a conversion breaks production:
1. Rename `.tsx` back to `.jsx`
2. Revert type imports
3. Deploy immediately
4. Fix offline, redeploy when stable

---

© Cyan Blue Films LLC
