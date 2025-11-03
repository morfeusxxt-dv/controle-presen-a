# AI Rules for `controle-presenca` Application

This document outlines the core technologies and libraries used in this application, along with guidelines for their usage. Adhering to these rules ensures consistency, maintainability, and leverages the strengths of the chosen stack.

## Tech Stack Overview

*   **Frontend Framework**: Next.js 14 (React) for building server-rendered and client-side applications.
*   **Language**: TypeScript for type safety and improved developer experience.
*   **Styling**: Tailwind CSS for utility-first styling, including `@tailwindcss/forms`, `@tailwindcss/typography`, and `@tailwindcss/aspect-ratio` plugins.
*   **Database**: Prisma ORM for database access, currently configured with SQLite for development.
*   **Authentication**: NextAuth.js for robust and flexible authentication, using Credentials Provider.
*   **Icons**: `lucide-react` for a consistent and lightweight icon set.
*   **QR Code Generation**: `qrcode.react` for generating QR codes within the frontend.
*   **Package Manager**: npm for managing project dependencies.
*   **Deployment**: Vercel for hosting and continuous deployment.
*   **Process Management**: PM2 for managing Node.js processes in production environments.

## Library Usage Rules

To maintain consistency and efficiency, please follow these guidelines when developing:

*   **Styling**: Always use Tailwind CSS classes for all styling. Avoid writing custom CSS unless absolutely necessary and only within `app/globals.css`. Do not use other CSS-in-JS libraries or traditional CSS modules.
*   **Database Interactions**: All database operations (CRUD) must be performed using Prisma Client. Do not use raw SQL queries or other database access libraries.
*   **Authentication**: Utilize NextAuth.js for all user authentication, session management, and authorization checks. Do not implement custom authentication flows.
*   **Icons**: For any icon needs, use components from the `lucide-react` library.
*   **QR Codes**: When generating QR codes, use the `qrcode.react` library.
*   **State Management**: For component-local state, use React's `useState` and `useEffect` hooks. For global state, if required, prefer React Context API or a lightweight solution. Avoid introducing heavy state management libraries (e.g., Redux, Zustand) unless there's a clear and significant need.
*   **Routing**: Leverage Next.js's built-in file-system routing and navigation hooks (`useRouter`, `usePathname`) for all application navigation.
*   **API Endpoints**: Create API endpoints using Next.js API Routes (`app/api/.../route.ts`) for any backend logic or data fetching.