
export interface UrlMetadata {
  title: string;
  description: string;
  favicon?: string;
}

export const fetchUrlMetadata = async (url: string): Promise<UrlMetadata> => {
  try {
    // Ensure URL has protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    // In a real application, you would use a CORS proxy or backend service
    // For demo purposes, we'll simulate the API call
    console.log('Fetching metadata for:', formattedUrl);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extract domain for favicon
    const urlObj = new URL(formattedUrl);
    const faviconUrl = `${urlObj.protocol}//${urlObj.host}/favicon.ico`;
    
    // Mock response based on URL - in real app this would come from your backend
    const mockResponses: Record<string, UrlMetadata> = {
      'https://example.com': {
        title: 'Example Domain - Your Website Title Here',
        description: 'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.',
        favicon: faviconUrl
      },
      'https://www.200oksolutions.co.uk/': {
        title: '200 OK Solutions - Professional Web Development Services',
        description: 'Expert web development and digital solutions. We create modern, responsive websites and applications tailored to your business needs.',
        favicon: faviconUrl
      }
    };

    return mockResponses[formattedUrl] || {
      title: 'Website Title - Professional Services',
      description: 'This is a sample meta description that would be fetched from the actual website. It provides a brief overview of what the page contains.',
      favicon: faviconUrl
    };
  } catch (error) {
    console.error('Error fetching URL metadata:', error);
    throw new Error('Failed to fetch URL metadata');
  }
};
