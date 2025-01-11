import { BrowserContext, Page } from '@playwright/test';

declare global {
  // Extend the Cucumber step `this` context
  namespace Cucumber {
    interface World {
      Page?: Page;
      context?: BrowserContext;
    }
  }
}