import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData, generateId } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  ImageUpload,
  DynamicList,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, ExternalLink, Package } from "lucide-react";

type PopupItem = AdminData["popups"][0];

const PopupsAdmin = () => {
  const [data, setData] = useState<AdminData["popups"]>([]);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["popups"]>([]);
  const [products, setProducts] = useState<AdminData["products"]>([]);
  const [previewPopup, setPreviewPopup] = useState<PopupItem | null>(null);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.popups);
    setOriginalData(adminData.popups);
    setProducts(adminData.products);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ popups: data });
      setOriginalData(data);
      alert("Popups saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewPopup = (): PopupItem => ({
    id: generateId(),
    name: `Popup ${data.length + 1}`,
    trigger: "button-click",
    title: "",
    content: "",
    buttonText: "",
    buttonLink: "",
    image: "",
    enabled: false,
    productId: undefined,
  });

  const triggerOptions = [
    { value: "page-load", label: "Page Load" },
    { value: "button-click", label: "Button Click" },
    { value: "scroll", label: "Scroll (50%)" },
    { value: "exit-intent", label: "Exit Intent" },
    { value: "time-delay", label: "Time Delay (5s)" },
  ];

  const PopupPreviewModal = ({ popup, onClose }: { popup: PopupItem; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          {popup.image && (
            <div className="mb-4">
              <img
                src={popup.image}
                alt="Popup"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
          
          {popup.title && (
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {popup.title}
            </h3>
          )}
          
          {popup.content && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {popup.content}
            </p>
          )}
          
          {popup.buttonText && (
            <Button
              className="w-full bg-logo-green hover:bg-green-600"
              onClick={() => {
                if (popup.buttonLink) {
                  if (popup.buttonLink.startsWith('mailto:')) {
                    window.location.href = popup.buttonLink;
                  } else {
                    window.open(popup.buttonLink, '_blank');
                  }
                }
              }}
            >
              {popup.buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Popups Management</h1>
        <p className="text-gray-600 mt-2">
          Create and manage promotional popups and lead collection forms
        </p>
      </div>

      {/* Preview Modal */}
      {previewPopup && (
        <PopupPreviewModal
          popup={previewPopup}
          onClose={() => setPreviewPopup(null)}
        />
      )}

      <AdminSection
        title="Popups Configuration"
        description="Create engaging popups to capture leads and promote special offers"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-6">
          {/* Current Popups Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Active Popups Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {data.length}
                  </div>
                  <div className="text-sm text-blue-800">Total Popups</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {data.filter(p => p.enabled).length}
                  </div>
                  <div className="text-sm text-green-800">Active Popups</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {data.filter(p => !p.enabled).length}
                  </div>
                  <div className="text-sm text-yellow-800">Disabled Popups</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popups List */}
          <DynamicList
            title="Popups"
            items={data}
            onItemsChange={setData}
            createNewItem={createNewPopup}
            addButtonText="Add New Popup"
            renderItem={(popup, index, onChange) => (
              <div className="space-y-6">
                {/* Header with status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {popup.name || `Popup ${index + 1}`}
                    </h4>
                    <Badge variant={popup.enabled ? "default" : "secondary"}>
                      {popup.enabled ? "Active" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewPopup(popup)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Enabled</span>
                      <Switch
                        checked={popup.enabled}
                        onCheckedChange={(enabled) => onChange({ ...popup, enabled })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Settings */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Basic Settings</h5>
                    
                    <FormGroup label="Popup Name" description="Internal name for this popup">
                      <Input
                        value={popup.name}
                        onChange={(e) => onChange({ ...popup, name: e.target.value })}
                        placeholder="e.g., Welcome Offer"
                      />
                    </FormGroup>

                    <FormGroup label="Trigger" description="When should this popup appear?">
                      <select
                        value={popup.trigger}
                        onChange={(e) => onChange({ ...popup, trigger: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {triggerOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup label="Title" description="Main heading of the popup">
                      <Input
                        value={popup.title}
                        onChange={(e) => onChange({ ...popup, title: e.target.value })}
                        placeholder="e.g., Welcome to Gift A Snack!"
                      />
                    </FormGroup>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Content</h5>
                    
                    <FormGroup label="Content" description="Main message or offer description">
                      <Textarea
                        value={popup.content}
                        onChange={(e) => onChange({ ...popup, content: e.target.value })}
                        placeholder="Get 10% off your first order when you sign up for our newsletter."
                        rows={4}
                      />
                    </FormGroup>

                    <FormGroup label="Button Text" description="Call-to-action button text">
                      <Input
                        value={popup.buttonText}
                        onChange={(e) => onChange({ ...popup, buttonText: e.target.value })}
                        placeholder="e.g., Get Discount"
                      />
                    </FormGroup>

                    <FormGroup label="Button Link" description="Where should the button take users?">
                      <div className="space-y-2">
                        <Input
                          value={popup.buttonLink}
                          onChange={(e) => onChange({ ...popup, buttonLink: e.target.value })}
                          placeholder="https://example.com or mailto:info@giftasnack.com"
                        />
                        <div className="text-xs text-gray-500">
                          Use "mailto:" for email links or "https://" for external links
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                </div>

                {/* Image Upload */}
                <ImageUpload
                  label="Popup Image"
                  description="Optional image to display in the popup (recommended: 400x200px)"
                  value={popup.image}
                  onChange={(url) => onChange({ ...popup, image: url })}
                />

                {/* Test Link */}
                {popup.buttonLink && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Test Button Link:
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (popup.buttonLink.startsWith('mailto:')) {
                            window.location.href = popup.buttonLink;
                          } else {
                            window.open(popup.buttonLink, '_blank');
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Test Link
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          />

          {/* Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 text-lg">Popup Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Keep titles short and attention-grabbing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Clearly state the value proposition in the content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Use action words in button text like "Get", "Claim", "Download"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Test your popups with the preview feature before enabling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Only enable 1-2 popups at a time to avoid overwhelming users</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </AdminSection>
    </div>
  );
};

export default PopupsAdmin;
