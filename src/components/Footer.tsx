import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">About Us</h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              Discover the beauty of Edmonton on two wheels. We are a proud, authentically local tour company, owned and operated right here in Edmonton.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              {siteConfig.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
              <li><a href="/book" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Book a Tour</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a 
                  href="https://forms.gle/cB3kpdbVWUZfvQgM6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Liability Waiver
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="text-base text-gray-500 dark:text-gray-400">{siteConfig.email}</li>
              <li className="text-base text-gray-500 dark:text-gray-400">{siteConfig.phone}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-center">
          <p className="text-base text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}