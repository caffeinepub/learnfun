import { Sparkles, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t-4 border-white/20 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center gap-3 text-white/90">
          <Star className="w-5 h-5 text-fun-yellow fill-fun-yellow animate-pulse" />
          <Sparkles className="w-4 h-4 text-fun-pink fill-fun-pink" />
          <Star className="w-6 h-6 text-fun-orange fill-fun-orange animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="w-4 h-4 text-fun-purple fill-fun-purple" />
          <Star className="w-5 h-5 text-fun-blue fill-fun-blue animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </footer>
  );
}
