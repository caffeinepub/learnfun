import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Undo, Trash2, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import type { ColoringTemplateWithData } from '../../backend';
import type { FallbackTemplate } from '../../lib/coloringFallbackTemplates';
import { toast } from 'sonner';

interface ColoringCanvasProps {
  template: ColoringTemplateWithData | FallbackTemplate;
  onBack: () => void;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#E63946', '#F77F00', '#06FFA5', '#118AB2', '#073B4C',
  '#FFD60A', '#FF006E', '#8338EC', '#3A86FF', '#FB5607',
];

function isFallbackTemplate(template: ColoringTemplateWithData | FallbackTemplate): template is FallbackTemplate {
  return 'imageUrl' in template;
}

export default function ColoringCanvas({ template, onBack }: ColoringCanvasProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [templateImage, setTemplateImage] = useState<HTMLImageElement | null>(null);
  
  // Double-tap detection state
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  // Pinch gesture state
  const pinchStateRef = useRef<{
    initialDistance: number;
    initialZoom: number;
    midpoint: { x: number; y: number };
    isPinching: boolean;
  } | null>(null);

  // Two-finger pan state
  const panStateRef = useRef<{
    initialScrollLeft: number;
    initialScrollTop: number;
    initialMidpoint: { x: number; y: number };
    isPanning: boolean;
  } | null>(null);

  // Load template image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setTemplateImage(img);
      initializeCanvas(img);
    };
    
    // Get the image URL based on template type
    const imageUrl = isFallbackTemplate(template) 
      ? template.imageUrl 
      : template.template.getDirectURL();
    
    img.src = imageUrl;
  }, [template]);

  const initializeCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw template
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Save initial state
    saveToHistory();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-19), imageData]); // Keep last 20 states
  };

  const handleUndo = () => {
    if (history.length <= 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      setHistory(newHistory);
    }
  };

  const handleClear = () => {
    if (!templateImage) return;
    initializeCanvas(templateImage);
    toast.success(t.canvasCleared || 'Canvas cleared!');
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `coloring-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast.success(t.downloadSuccess || 'Downloaded successfully!');
    });
  };

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
      clientX,
      clientY,
    };
  };

  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchMidpoint = (touch1: React.Touch, touch2: React.Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  const handleDoubleTap = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const now = Date.now();
    const coords = getCanvasCoordinates(e);
    
    if (!coords || !containerRef.current) return;

    const lastTap = lastTapRef.current;
    
    // Check if this is a double-tap (within 300ms and close proximity)
    if (lastTap && now - lastTap.time < 300) {
      const distance = Math.sqrt(
        Math.pow(coords.clientX - lastTap.x, 2) + 
        Math.pow(coords.clientY - lastTap.y, 2)
      );
      
      // If taps are close together (within 50px), it's a double-tap
      if (distance < 50) {
        e.preventDefault();
        
        // Toggle zoom
        if (isZoomedIn) {
          // Zoom out
          setZoom(1);
          setIsZoomedIn(false);
          containerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          // Zoom in to 1.8x
          const newZoom = 1.8;
          setZoom(newZoom);
          setIsZoomedIn(true);
          
          // Calculate scroll position to center the tapped area
          setTimeout(() => {
            if (!containerRef.current || !canvasRef.current) return;
            
            const canvas = canvasRef.current;
            const container = containerRef.current;
            const rect = canvas.getBoundingClientRect();
            
            // Calculate the position relative to the canvas
            const relativeX = coords.clientX - rect.left;
            const relativeY = coords.clientY - rect.top;
            
            // Calculate scroll position to center the tapped point
            const scrollX = (relativeX * newZoom) - (container.clientWidth / 2);
            const scrollY = (relativeY * newZoom) - (container.clientHeight / 2);
            
            container.scrollTo({
              left: Math.max(0, scrollX),
              top: Math.max(0, scrollY),
              behavior: 'smooth'
            });
          }, 50);
        }
        
        // Reset last tap to prevent triple-tap issues
        lastTapRef.current = null;
        return;
      }
    }
    
    // Store this tap for double-tap detection
    lastTapRef.current = {
      time: now,
      x: coords.clientX,
      y: coords.clientY,
    };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      // Two-finger gesture - prevent default and handle pinch/pan
      e.preventDefault();
      
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = getTouchDistance(touch1, touch2);
      const midpoint = getTouchMidpoint(touch1, touch2);
      
      // Initialize pinch state
      pinchStateRef.current = {
        initialDistance: distance,
        initialZoom: zoom,
        midpoint,
        isPinching: true,
      };

      // Initialize pan state
      if (containerRef.current) {
        panStateRef.current = {
          initialScrollLeft: containerRef.current.scrollLeft,
          initialScrollTop: containerRef.current.scrollTop,
          initialMidpoint: midpoint,
          isPanning: true,
        };
      }
    } else if (e.touches.length === 1) {
      // Single finger - check for double-tap, then handle drawing
      handleDoubleTap(e);
      if (!e.defaultPrevented) {
        startDrawing(e);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      // Two-finger gesture - handle pinch and pan
      e.preventDefault();
      
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = getTouchDistance(touch1, touch2);
      const currentMidpoint = getTouchMidpoint(touch1, touch2);
      
      const pinchState = pinchStateRef.current;
      const panState = panStateRef.current;
      
      if (pinchState && containerRef.current && canvasWrapperRef.current) {
        // Calculate new zoom based on pinch distance change
        const scale = currentDistance / pinchState.initialDistance;
        let newZoom = pinchState.initialZoom * scale;
        
        // Clamp zoom between 0.5 and 3
        newZoom = Math.max(0.5, Math.min(3, newZoom));
        
        // Get container and canvas wrapper dimensions
        const container = containerRef.current;
        const wrapper = canvasWrapperRef.current;
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Calculate the position of the pinch midpoint relative to the container
        const containerRect = container.getBoundingClientRect();
        const midpointRelativeToContainer = {
          x: pinchState.midpoint.x - containerRect.left,
          y: pinchState.midpoint.y - containerRect.top,
        };
        
        // Calculate the content position under the midpoint before zoom
        const contentX = (container.scrollLeft + midpointRelativeToContainer.x) / zoom;
        const contentY = (container.scrollTop + midpointRelativeToContainer.y) / zoom;
        
        // Apply new zoom
        setZoom(newZoom);
        setIsZoomedIn(newZoom > 1);
        
        // Calculate new scroll position to keep the content under the midpoint
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const newScrollLeft = (contentX * newZoom) - midpointRelativeToContainer.x;
          const newScrollTop = (contentY * newZoom) - midpointRelativeToContainer.y;
          
          containerRef.current.scrollLeft = Math.max(0, newScrollLeft);
          containerRef.current.scrollTop = Math.max(0, newScrollTop);
        });
      }
      
      // Handle two-finger pan
      if (panState && containerRef.current) {
        const deltaX = panState.initialMidpoint.x - currentMidpoint.x;
        const deltaY = panState.initialMidpoint.y - currentMidpoint.y;
        
        containerRef.current.scrollLeft = panState.initialScrollLeft + deltaX;
        containerRef.current.scrollTop = panState.initialScrollTop + deltaY;
      }
    } else if (e.touches.length === 1 && isDrawing) {
      // Single finger drawing
      draw(e);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length < 2) {
      // Reset pinch and pan state when fingers are lifted
      pinchStateRef.current = null;
      panStateRef.current = null;
    }
    
    if (e.touches.length === 0) {
      // All fingers lifted
      stopDrawing();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // For touch events, check if it might be a double-tap
    if ('touches' in e && e.touches.length === 1) {
      const now = Date.now();
      const lastTap = lastTapRef.current;
      
      // If this might be a double-tap, delay drawing slightly
      if (lastTap && now - lastTap.time < 300) {
        // Wait a bit to see if it's a double-tap
        setTimeout(() => {
          const currentLastTap = lastTapRef.current;
          // If lastTapRef was cleared, it was a double-tap, so don't draw
          if (currentLastTap && currentLastTap.time === lastTap.time) {
            setIsDrawing(true);
            draw(e);
          }
        }, 50);
        return;
      }
    }
    
    if (!('touches' in e) || e.touches.length === 1) {
      e.preventDefault();
      setIsDrawing(true);
      draw(e);
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 0.2, 3);
    setZoom(newZoom);
    setIsZoomedIn(newZoom > 1);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.2, 0.5);
    setZoom(newZoom);
    setIsZoomedIn(newZoom > 1);
    
    // Reset scroll when zooming out to 1x or less
    if (newZoom <= 1 && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="bg-white/90 hover:bg-white border-4 border-fun-purple text-fun-purple font-bold text-lg shadow-lg"
        >
          <ArrowLeft className="mr-2 h-6 w-6" />
          {t.back}
        </Button>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleUndo}
            disabled={history.length <= 1}
            variant="outline"
            size="lg"
            className="bg-white/90 hover:bg-white border-4 border-fun-blue text-fun-blue font-bold shadow-lg"
          >
            <Undo className="mr-2 h-5 w-5" />
            {t.undo}
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            size="lg"
            className="bg-white/90 hover:bg-white border-4 border-fun-orange text-fun-orange font-bold shadow-lg"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            {t.clear}
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            size="lg"
            className="bg-white/90 hover:bg-white border-4 border-fun-green text-fun-green font-bold shadow-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            {t.download}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas - Now positioned first (above tools on mobile) */}
        <Card className="lg:col-span-3 bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl order-1 lg:order-2">
          <CardContent className="p-6">
            <div 
              ref={containerRef}
              className="overflow-auto max-h-[70vh] bg-gray-100 rounded-lg border-4 border-gray-200"
              style={{ touchAction: 'none' }}
            >
              <div 
                ref={canvasWrapperRef}
                style={{ 
                  width: `${zoom * 100}%`,
                  height: `${zoom * 100}%`,
                  minWidth: '100%',
                  minHeight: '100%',
                }}
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="cursor-crosshair"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    touchAction: 'none',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools Panel - Now positioned second (below canvas on mobile) */}
        <Card className="lg:col-span-1 bg-white/95 backdrop-blur-sm border-4 border-fun-pink shadow-2xl order-2 lg:order-1">
          <CardContent className="p-6 space-y-6">
            {/* Color Palette */}
            <div>
              <h3 className="text-xl font-bold text-fun-purple mb-4">{t.colors}</h3>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full aspect-square rounded-lg transition-all ${
                      selectedColor === color
                        ? 'ring-4 ring-fun-purple scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div>
              <h3 className="text-xl font-bold text-fun-purple mb-4">{t.brushSize}</h3>
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2 text-lg font-semibold text-gray-700">
                {brushSize}px
              </div>
            </div>

            {/* Zoom Controls */}
            <div>
              <h3 className="text-xl font-bold text-fun-purple mb-4">{t.zoom}</h3>
              <div className="flex gap-2">
                <Button
                  onClick={handleZoomOut}
                  variant="outline"
                  className="flex-1 border-2 border-fun-blue"
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleZoomIn}
                  variant="outline"
                  className="flex-1 border-2 border-fun-blue"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </div>
              <div className="text-center mt-2 text-lg font-semibold text-gray-700">
                {Math.round(zoom * 100)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
