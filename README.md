Next.js Kanban Board

A production-grade, drag-and-drop Kanban board component built with Next.js 16, React 19, and Tailwind CSS. Designed for performance, accessibility, and scalability.

Live Demo

https://kanban-psi-gules.vercel.app/

Tech Stack

Framework: Next.js 16 (App Router)

Core: React 19, TypeScript

Styling: Tailwind CSS v4

State Management: Jotai

Utilities: Lodash, UUID, Headless UI

Features

Drag & Drop interactions for tasks and columns

Create, edit, delete, and move tasks

State synchronization with local storage

Responsive design for Mobile, Tablet, and Desktop

Keyboard navigation support and ARIA standards

Installation

Clone the repository
git clone https://www.google.com/search?q=https://github.com/yourusername/next-kanban.git

Install dependencies
npm install

Start development server
npm run dev

Architecture

This project follows a component-based architecture using the Next.js App Router.

State: Global application state is managed via Jotai atoms for predictable updates.

Styling: Utility-first approach using Tailwind CSS.

Logic: Custom hooks encapsulate drag-and-drop logic and board operations.

Storybook

To view component states in isolation, run:

npm run storybook

Stories included:

Default Board

Empty State

Large Dataset (>50 tasks)

Mobile View

Contact

Name: [Your Name]
Email: [Your Email]
