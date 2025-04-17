import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">About Utility Hub</h2>
          <p className="text-sm text-gray-400">
            Utility Hub offers powerful calculators and tools for finance, health, education, and more — all in one place. Our mission is to help users make smart decisions with accurate data.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            {/* <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li> */}
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@utilityhub.com" className="hover:text-white">support@utilityhub.com</a></li>
            <li>Follow us:
              <div className="flex space-x-4 mt-2">
                <a href="#" aria-label="Facebook" className="hover:text-white"><i className="fab fa-facebook"></i></a>
                <a href="#" aria-label="Twitter" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white"><i className="fab fa-linkedin"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Utility Hub. All rights reserved.
      </div>
    </footer>
  );
}
