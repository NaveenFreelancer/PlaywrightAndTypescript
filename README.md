# Playwright tests for https://www.jdoodle.com/ website

# Quick Start

### Install Dependencies

`npm install`

### Install browsers

`npx playwright install`

# Run Tests


To Run with Chromium 

`npm run chromiumtest`


## To View Report

`npx playwright show-report`

## List all test titles

`npx playwright test --list`

---

## File Structure

    .
    ├── library                 # Fixtures and Base Classes
    |── pages                   # Page object classes of a demoq website
    ├── tests                   # test files
    ├── package.json            # Project metadata
    ├── playwright.config.ts    # Playwright test configuration
    └── README.md               # This file
