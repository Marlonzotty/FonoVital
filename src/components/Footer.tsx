export default function Footer() {
  return (
    <footer className="w-full bg-[#213547] text-white py-4">
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Zotty Software
        </p>
      </div>
    </footer>
  );
}
