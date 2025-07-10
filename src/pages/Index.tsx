
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Star, Globe, Loader2, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchUrlMetadata } from '@/utils/urlFetcher';
import DownloadButton from '@/components/DownloadButton';

const Index = () => {
  const [url, setUrl] = useState('https://example.com');
  const [pageTitle, setPageTitle] = useState('Example Domain - Your Website Title Here');
  const [metaDescription, setMetaDescription] = useState('This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.');
  const [searchQuery, setSearchQuery] = useState('example domain website');
  const [showDate, setShowDate] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showFavicon, setShowFavicon] = useState(true);
  const [device, setDevice] = useState('desktop');
  const [descriptionMaxLength, setDescriptionMaxLength] = useState('160');
  const [isLoading, setIsLoading] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFetch = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const metadata = await fetchUrlMetadata(url);
      setPageTitle(metadata.title);
      setMetaDescription(metadata.description);
      
      toast({
        title: "Success",
        description: "URL metadata fetched successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch URL metadata. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const maxDescLength = parseInt(descriptionMaxLength) || 160;

  const SerpPreview = () => (
    <div 
      ref={previewRef}
      className={`bg-white rounded-lg p-4 shadow-sm border transition-all duration-300 hover:shadow-md ${device === 'mobile' ? 'max-w-sm' : 'max-w-2xl'}`}
    >
      <div className="flex items-start gap-3">
        {showFavicon && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
              <Globe className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-600 truncate">{url}</span>
          </div>
          <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-2 line-clamp-2 transition-colors duration-200">
            {pageTitle}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-3">
            {metaDescription}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {showRating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {renderStars(4)}
                </div>
                <span className="ml-1">4.2 (1,234)</span>
              </div>
            )}
            {showDate && (
              <span>Jan 15, 2025</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            SERP Preview Tool
          </h1>
          <p className="text-white/80 text-lg">
            See how your website appears in Google search results
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <Card className="backdrop-blur-lg bg-white/20 border-white/30 shadow-xl rounded-2xl p-6">
            <div className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <Label htmlFor="url" className="text-white font-medium">
                  URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your website URL"
                    className="flex-1 bg-white/80 backdrop-blur border-white/50 placeholder:text-gray-500 focus:bg-white/90 transition-all duration-200"
                  />
                  <Button 
                    onClick={handleFetch}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg disabled:opacity-50 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        FETCH
                      </>
                    ) : (
                      'FETCH'
                    )}
                  </Button>
                </div>
              </div>

              {/* Page Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white font-medium">
                  Page Title
                </Label>
                <Input
                  id="title"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Enter page title"
                  className="bg-white/80 backdrop-blur border-white/50 placeholder:text-gray-500 focus:bg-white/90 transition-all duration-200"
                />
                <p className={`text-xs ${pageTitle.length > 60 ? 'text-red-200' : 'text-white/70'}`}>
                  {pageTitle.length}/60 characters
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white font-medium">
                  Meta Description
                </Label>
                <Textarea
                  id="description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Enter meta description"
                  rows={3}
                  className="bg-white/80 backdrop-blur border-white/50 placeholder:text-gray-500 resize-none focus:bg-white/90 transition-all duration-200"
                />
                <p className={`text-xs ${metaDescription.length > maxDescLength ? 'text-red-200' : 'text-white/70'}`}>
                  {metaDescription.length}/{maxDescLength} characters
                </p>
              </div>

              {/* Device Selection */}
              <div className="space-y-2">
                <Label className="text-white font-medium">Device</Label>
                <Select value={device} onValueChange={setDevice}>
                  <SelectTrigger className="bg-white/80 backdrop-blur border-white/50 focus:bg-white/90 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description Max Length */}
              <div className="space-y-2">
                <Label htmlFor="maxLength" className="text-white font-medium">
                  Description Max. Length
                </Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={descriptionMaxLength}
                  onChange={(e) => setDescriptionMaxLength(e.target.value)}
                  placeholder="160"
                  className="bg-white/80 backdrop-blur border-white/50 placeholder:text-gray-500 focus:bg-white/90 transition-all duration-200"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <Label className="text-white font-medium">Display Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="date" 
                      checked={showDate}
                      onCheckedChange={(checked) => setShowDate(checked === true)}
                      className="border-white/50 data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="date" className="text-white/90 cursor-pointer">
                      Date
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rating" 
                      checked={showRating}
                      onCheckedChange={(checked) => setShowRating(checked === true)}
                      className="border-white/50 data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="rating" className="text-white/90 cursor-pointer">
                      Rating
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="favicon" 
                      checked={showFavicon}
                      onCheckedChange={(checked) => setShowFavicon(checked === true)}
                      className="border-white/50 data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="favicon" className="text-white/90 cursor-pointer">
                      Favicon
                    </Label>
                  </div>
                </div>
              </div>

              {/* Search Query */}
              <div className="space-y-2">
                <Label htmlFor="searchQuery" className="text-white font-medium">
                  Search Query
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter search query"
                    className="pl-10 bg-white/80 backdrop-blur border-white/50 placeholder:text-gray-500 focus:bg-white/90 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Right Panel - SERP Preview */}
          <Card className="backdrop-blur-lg bg-white/20 border-white/30 shadow-xl rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Search Preview
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-white/70 bg-white/20 px-3 py-1 rounded-full">
                    {device === 'mobile' ? '📱 Mobile' : '💻 Desktop'}
                  </div>
                  <DownloadButton previewRef={previewRef} />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-inner">
                <div className="mb-4 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Globe className="w-4 h-4" />
                    <span>About 1,230,000 results (0.45 seconds)</span>
                  </div>
                  {searchQuery && (
                    <div className="text-lg text-gray-700 mb-2">
                      Search results for: <span className="font-medium">"{searchQuery}"</span>
                    </div>
                  )}
                </div>
                
                <SerpPreview />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
