import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "InterviewPrep.ai - Your AI Interview Coach",
  description: "Practice and improve your interview skills with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script id="intersection-observer">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
              };
              
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                  }
                });
              }, observerOptions);
              
              const animatedElements = document.querySelectorAll('.fade-in, .from-bottom, .from-left, .from-right');
              animatedElements.forEach(el => observer.observe(el));
              
              // Parallax effect
              const parallaxElements = document.querySelectorAll('.parallax');
              window.addEventListener('scroll', () => {
                parallaxElements.forEach(element => {
                  const bg = element.querySelector('.parallax-bg');
                  if (bg) {
                    const scrollPosition = window.pageYOffset;
                    const speed = 0.5;
                    bg.style.transform = 'translateY(' + scrollPosition * speed + 'px)';
                  }
                });
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}