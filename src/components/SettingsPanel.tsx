
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
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="apikey" className="text-gray-300">OpenRouter API Key</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="apikey"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenRouter API key"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
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

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-white text-gray-900 hover:bg-gray-200 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button variant="outline" onClick={handleClear} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Clear
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="font-medium text-white mb-2">About ZenxAI</h3>
            <p className="text-sm text-gray-400">
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
