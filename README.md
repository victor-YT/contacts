# Contacts App

A responsive "Contacts" application for browsing contacts, built with React and Next.js.

## Features

- Fetches contacts from https://jsonplaceholder.typicode.com/users
- Responsive design:
    - Mobile: List view with navigation to detail page
    - Tablet / Desktop: Master-detail layout with sidebar and contact details side by side
- Visually clean and user-friendly UI

## Tech Stack

- React + Next.js
- Tailwind CSS
- Zustand for state management

## How to Run

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd contacts
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Notes

- This is a demo app as part of a technical assessment.
- Contacts data fetched from https://jsonplaceholder.typicode.com/users.
- No Create/Update/Delete operations implemented (per problem statement).
