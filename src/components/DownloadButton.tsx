
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DownloadButtonProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

const DownloadButton = ({ previewRef }: DownloadButtonProps) => {
  const downloadPreview = async () => {
    if (!previewRef.current) {
      toast({
        title: "Error",
        description: "Preview not found",
        variant: "destructive"
      });
      return;
    }

    try {
      // For demo purposes, we'll create a simple text export
      // In a real app, you might use html2canvas or similar library
      const previewData = {
        timestamp: new Date().toISOString(),
        preview: "SERP Preview Export",
        note: "This is a demo export. In production, this would be an image."
      };

      const dataStr = JSON.stringify(previewData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `serp-preview-${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast({
        title: "Success",
        description: "Preview exported successfully!"
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to export preview",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      onClick={downloadPreview}
      variant="outline"
      className="bg-white/80 backdrop-blur border-white/50 hover:bg-white/90 text-gray-700"
    >
      <Download className="w-4 h-4 mr-2" />
      Download Preview
    </Button>
  );
};

export default DownloadButton;
