import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import GameZone from './pages/GameZone';
import QuizZone from './pages/QuizZone';
import ColoringZone from './pages/ColoringZone';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

type Page = 'home' | 'games' | 'quiz' | 'coloring';
export type AgeGroup = '3-5' | '6-8' | '9-12' | '13-15' | null;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(null);

  const handleAgeSelect = (age: AgeGroup) => {
    setSelectedAge(age);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedAge(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-fun-sky via-fun-purple to-fun-pink">
            <Header onBackToHome={handleBackToHome} showBackButton={currentPage !== 'home'} />
            
            <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
              {currentPage === 'home' && (
                <HomePage 
                  selectedAge={selectedAge} 
                  onAgeSelect={handleAgeSelect}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'games' && selectedAge && (
                <GameZone ageGroup={selectedAge} onBack={() => setCurrentPage('home')} />
              )}
              {currentPage === 'quiz' && selectedAge && (
                <QuizZone ageGroup={selectedAge} onBack={() => setCurrentPage('home')} />
              )}
              {currentPage === 'coloring' && selectedAge && (
                <ColoringZone ageGroup={selectedAge} onBack={() => setCurrentPage('home')} />
              )}
            </main>

            <Footer />
            <Toaster />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
