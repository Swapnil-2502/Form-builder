# 🧩 Form Builder Application

A dynamic, multi-step drag-and-drop Form Builder built using **React Remix**, **Redux Toolkit**, and **Tailwind CSS**. This application allows users to visually create, customize, and preview complex forms with features like step navigation, live preview, theming, and persistent storage.

---

## 🚀 Features

- ⚡ **Drag-and-Drop Interface** – Add and reorder fields easily  
- 🧱 **Supported Fields** – Text, Email, Number, etc.  
- ➕ **Field Settings Panel** – Edit label, placeholder, validation rules  
- 📦 **Multi-Step Form Support** – Navigate across steps with validation  
- 🌗 **Dark/Light Mode Toggle** – Seamless theming support  
- 💾 **Auto Save to localStorage** – Resume your form anytime  
- 📤 **Export/Import JSON** – Share or reuse form templates  
- 🧪 **Live Preview Mode** – Test your form instantly  
- 🧰 **Predefined Templates** – Quickly load common forms (e.g., Contact Us)

---

# Project Link
```bash
https://form-builder-ten-plum.vercel.app/builder
```

## 🛠️ Tech Stack

| Tech         | Description                      |
|--------------|----------------------------------|
| React Remix  | Full-stack React framework       |
| Redux Toolkit| State management                 |
| Tailwind CSS | Utility-first styling framework  |
| React DnD Kit| Drag and Drop support            |
| React Hot Toast | Toast Notifications           |

---

# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
