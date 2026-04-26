# Playwright SauceDemo Test Suite

End-to-end test suite for [SauceDemo](https://www.saucedemo.com) built with Playwright.

![Playwright Tests](https://github.com/hesamac/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)

## Stack
- Playwright
- TypeScript
- GitHub Actions CI

## Structure
- Page Object Model
- Custom fixtures
- Network interception
- Parallel execution

## Run locally
\```bash
npm ci
npx playwright install chromium
npx playwright test
\```