/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "chat-background": "url('/chat-bg.png')",
      },
      colors: {
        secondary: "#8696a0",
        "teal-light": "#7ae3c3",
        "photopicker-overlay-background": "rgba(30,42,49,0.8)",
        "dropdown-background": "#233138",
        "dropdown-background-hover": "#182229",
        "input-background": " #2a3942",
        "primary-strong": "#e9edef",
        "panel-header-background": "#202c33",
        "panel-header-icon": "#aebac1",
        "icon-lighter": "#8696a0",
        "icon-green": "#00a884",
        "search-input-container-background": "#111b21",
        "conversation-border": "rgba(134,150,160,0.15)",
        "conversation-panel-background": "#0b141a",
        "background-default-hover": "#202c33",
        "incoming-background": "#202c33",
        "outgoing-background": "#005c4b",
        "bubble-meta": "hsla(0,0%,100%,0.6)",
        "icon-ack": "#53bdeb",
        "blueshade": "#5D12D2",
        "secondaryBlueShade":"#e0d2f7",
        "chatpurple": "#B931FC",
        "secondary-chat-purple": "#615e96",
        "pinkshade": "#FF6AC2",
        "secondaryPurple":"#eed8f9",
        "secondaryPink":"#ede2e9"
      },
      gridTemplateColumns: {
        main: "1fr 2.4fr",
      },
    },
  },
  plugins: [],
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
};
