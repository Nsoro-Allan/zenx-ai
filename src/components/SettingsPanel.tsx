
import React, { useState, useEffect } from 'react';
import { X, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('zenxai_openrouter_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('zenxai_openrouter_key', apiKey.trim());
    toast({
      title: "Success",
      description: "API key saved successfully!"
    });
    onClose();
  };

  const handleClear = () => {
    localStorage.removeItem('zenxai_openrouter_key');
    setApiKey('');
    toast({
      title: "Cleared",
      description: "API key removed from storage"
    });
  };

  return (
    <div style={{ backgroundColor: '#161618', borderBottom: '1px solid #333' }}>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white">Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-3">
              <Label htmlFor="apikey" className="text-gray-300 text-base">OpenRouter API Key</Label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    id="apikey"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenRouter API key"
                    className="text-white placeholder-gray-400 pr-12 py-3 text-base rounded-xl border"
                    style={{ 
                      backgroundColor: '#161618',
                      borderColor: '#333'
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleSave} 
                className="text-gray-900 flex items-center gap-2 px-6 rounded-xl"
                style={{ backgroundColor: 'white' }}
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClear} 
                className="text-gray-300 px-6 rounded-xl border"
                style={{ 
                  backgroundColor: '#161618',
                  borderColor: '#333'
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="border-t pt-6" style={{ borderColor: '#333' }}>
            <h3 className="font-medium text-white mb-3">About ZenxAI</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              ZenxAI is powered by OpenRouter, providing access to various AI models. 
              Get your API key from{' '}
              <a 
                href="https://openrouter.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                openrouter.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
