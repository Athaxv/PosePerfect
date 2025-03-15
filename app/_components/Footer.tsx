import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/60 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg  flex items-center justify-center">
                <Image src={'newlogo.svg'} alt='logo' height={30} width={30}/>
              </div>
              <h1 className="text-xl  font-medium">PosePerfect</h1>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Our mission is to help you achieve perfect posture during workouts, prevent injuries,
              and maximize effectiveness of each exercise with real-time AI feedback.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  Posture Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  Exercise Library
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  AI Feedback
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/60 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} PosePerfect. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-blue-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-blue-600 transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-blue-600 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
