
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Update document title for 404 pages
    document.title = "404 - Page Not Found | Share Calculator Nepal";
    
    // Add meta description for 404 pages
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The requested page could not be found. Return to Share Calculator Nepal homepage.');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <img 
            src="/sharecalculator.png" 
            alt="Share Calculator Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-nepse-blue">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <a 
            href="/" 
            className="inline-block bg-nepse-blue text-white px-6 py-3 rounded-lg hover:bg-nepse-blue/90 transition-colors font-medium"
          >
            Return to Calculator
          </a>
          
          <div className="text-sm text-gray-500">
            <p>Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <a href="/about" className="text-nepse-blue hover:underline">About</a>
              <span>•</span>
              <a href="/contact" className="text-nepse-blue hover:underline">Contact</a>
              <span>•</span>
              <a href="/privacy" className="text-nepse-blue hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
