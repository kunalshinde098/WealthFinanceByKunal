# WealthFinanceByKunal — Financial Calculators

Responsive static calculator portal for GitHub Pages.

- Desktop: persistent left navigation with a complete category tree.
- Mobile: slide-out navigation, backdrop dismissal and Escape-key support.
- Searchable calculator navigation.
- Consistent calculator input and results workspace.
- Responsive layouts for phone, tablet and desktop.
- Static HTML, CSS and JavaScript; no backend or build process.

Tools: SIP, Step Up SIP, Lumpsum, SWP, FD, Inflation, Financial Planning, Retirement, PPF, Home Loan EMI, Car Loan EMI, FD Tax, Car Loan vs FD + OD, Extra EMI vs RD.

Deploy by copying these files to the GitHub Pages publishing folder and pushing the commit. All paths are relative and support the repository subpath.

All calculations are illustrative estimates, not guaranteed returns or personal financial advice. Validate formulas, product rules and rates before publication.

See `CALCULATION_METHODOLOGY.md` for formulas, calculation conventions and limitations.

### Local persistence
The site offers opt-in local saving of calculator inputs with IndexedDB. A cookie stores the preference only. Visitors can manage or clear saved inputs on the page; no input data is uploaded.


## Local data persistence (updated)

- Calculator inputs are automatically saved in IndexedDB on the visitor's current browser/device; there is no permission popup.
- A small, non-blocking privacy note appears in the page flow. It explains that values remain local and are not sent to the website's servers.
- Each calculator page has its own saved record and restores it on later visits.
- Visitors can clear all saved calculator inputs using the inline control.
- Data does not sync across browsers or devices. Clearing browser site data or using private browsing may remove saved values.
