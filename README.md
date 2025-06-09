# cidrviz

A small React application that demonstrates how to work with CIDR (Classless Inter-Domain Routing) ranges. The project includes some basic IPv4 utilities and unit tests that teach how CIDR blocks can be calculated.

## Development

Install dependencies and run the usual CRA scripts:

```bash
npm install          # install dependencies
npm start            # run the dev server
npm test             # run unit tests with Jest
npm run build        # create a production build
```

## Repository layout

- **`src/`** - React application source
  - `App.js` – renders an introduction to CIDR and shows example calculations
  - `domain/` – JavaScript modules that compute CIDR information
    - `CIDR.js` – exposes `availableAddresses`, `firstUsableAddress` and `lastUsableAddress`
    - `Bitmask.js` – helper utilities for bit manipulation
  - `errors/OutOfBoundsError.js` – custom error used when ranges are invalid
  - tests (`*.test.js`) – verify the CIDR logic
- **`public/`** – static assets for Create React App
- **`.github/workflows/node.js.yml`** – GitHub Actions workflow that builds and tests the app on Node.js
- **`todo.md`** – notes for future improvements

## Learning more

The application currently focuses on IPv4. The TODO list mentions ideas such as adding Tailwind for styling and extending the CIDR utilities (for instance by adding IPv6 support or calculating IP ranges for a given address). Reading through the tests in `src/domain` is a good way to understand how the logic works and how the bitmask is constructed.

