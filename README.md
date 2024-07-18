# VendingMachine

## Run it Locally

To run the project locally, follow these steps:

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run the server simulation:

   ```sh
   json-server --watch db.json
   ```

3. Start the development server:
   ```sh
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running Unit Tests

To execute the unit tests, run:

```sh
ng test
```

## Project Structure

```
src
├── app
│   ├── components
│   ├── modules
│   │   ├── admin
│   │   │   ├── components
│   │   │   ├── admin-routing.module.ts
│   │   │   ├── admin.module.ts
│   ├── models
│   ├── services
│   ├── validators
│   ├── constants
│   ├── shared
│   │   ├── shared.module.ts
│   ├── app-routing.module.ts
│   ├── app.module.ts
├── environments
├── styles
├── index.html
└── main.ts
```

## Coin Denominations

Accepted coin denominations are:

```
[0.1, 0.25, 0.5, 1, 5, 10]
```

---

### Additional Information

- Ensure you have `json-server` installed globally or locally in your project.
- The `db.json` file should be present at the root level for the server simulation to work.
