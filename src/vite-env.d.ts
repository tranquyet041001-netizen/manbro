/// <reference types="vite/client" />

// Vite ?raw imports: any ?raw import returns a string
declare module "*?raw" {
  const content: string;
  export default content;
}
