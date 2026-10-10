export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} receipt-splitter · Your data never leaves your browser</p>
    </footer>
  );
}
