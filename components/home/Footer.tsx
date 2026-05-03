export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 mt-12 transition-colors">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold tracking-tighter mb-4 text-slate-900 dark:text-white">
            ComponentHub
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Empowering automation engineers with high-grade components, transparent specifications, and rapid fulfillment.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Products</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PLCs & Controllers</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Vision Systems AI</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sensors & Telemetry</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Support</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Datasheet Library</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Request B2B Quote</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">BOM Upload Tool</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Contact</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">sales@componenthub.local</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Secure VAPT Audited Platform</p>
        </div>
      </div>
    </footer>
  );
}