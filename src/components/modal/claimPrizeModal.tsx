import iconClose from "../../assets/svg/icon_close.svg";
import { useState, useEffect } from "react";

interface ClaimPrizeModalProps {
  isOpen: boolean;
  onClaim?: (deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    postal_code?: string;
  }) => void;
  onClose: () => void;
}

// 常见国家列表
const commonCountries = [
  "United States",
  "Canada", 
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Korea",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Switzerland",
  "Singapore",
  "Other"
];

export default function ClaimPrizeModal({ isOpen, onClose, onClaim }: ClaimPrizeModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    country: "",
    address: "",
    city: "",
  });

  // 当弹窗关闭时重置状态
  const handleClose = () => {
    setIsLoading(false);
    setSelectedCountry("");
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
    });
    setErrors({
      name: "",
      phone: "",
      country: "",
      address: "",
      city: "",
    });
    onClose();
  };

  // 当弹窗打开时确保状态是干净的
  useEffect(() => {
    if (isOpen) {
      setIsLoading(false);
      setSelectedCountry("");
      setFormData({
        name: "",
        phone: "",
        address: "",
        city: "",
      });
      setErrors({
        name: "",
        phone: "",
        country: "",
        address: "",
        city: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isMobile = window.innerWidth < 768;

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    // 清除国家字段的错误
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: "" }));
    }
  };

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    // 重置所有错误
    const newErrors = {
      name: "",
      phone: "",
      country: "",
      address: "",
      city: "",
    };

    // 校验各个字段
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!selectedCountry) {
      newErrors.country = "Country is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Street address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);

    // 如果有错误，不提交
    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    setIsLoading(true);

    try {
      const deliveryAddress = {
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${selectedCountry}`,
      };

      await onClaim?.(deliveryAddress);
    } catch (error) {
      // 错误处理由父组件完成，这里只需要重置loading状态
      setIsLoading(false);
    }
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100 overflow-y-auto scroll-bar-hidden">
        <div className="bg-white p-[calc(24/375*100vw)] rounded-lg w-[calc(314/375*100vw)] h-[calc(595/375*100vw)] flex flex-col items-center justify-start gap-[calc(24/375*100vw)] relative">
          {/* close button */}
          <div className="absolute -top-[calc(24/375*100vw)] -right-[calc(24/375*100vw)]">
            <img
              src={iconClose}
              alt="close"
              className="w-[calc(24/375*100vw)] h-[calc(24/375*100vw)]"
              onClick={handleClose}
            />
          </div>
          {/* message title */}
          <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(48/375*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
              <div
                className={`h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                Claim Your Prize
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start gap-[calc(16/375*100vw)] w-[calc(266/375*100vw)] h-[calc(393/375*100vw)]">
            {/* full name */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                          <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
              Full Name
              {errors.name && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({errors.name})</span>}
            </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* phone number */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                          <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
              Phone Number
              {errors.phone && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({errors.phone})</span>}
            </div>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* country */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)] relative">
                          <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
              Country
              {errors.country && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({errors.country})</span>}
            </div>
              <div className="relative w-full">
                <div
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)] flex items-center justify-between cursor-pointer"
                  onClick={toggleCountryDropdown}
                >
                  <span className={`font-['Montserrat'] text-[calc(14/375*100vw)] ${selectedCountry ? 'text-black' : 'text-gray-400'}`}>
                    {selectedCountry || "Select Country"}
                  </span>
                  <svg 
                    className={`w-[calc(12/375*100vw)] h-[calc(12/375*100vw)] transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isCountryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#270B4F] rounded-[calc(12/375*100vw)] max-h-[calc(200/375*100vw)] overflow-y-auto z-10 shadow-lg scroll-bar-hidden">
                    {commonCountries.map((country, index) => (
                      <div
                        key={index}
                        className={`px-[calc(16/375*100vw)] py-[calc(12/375*100vw)] cursor-pointer hover:bg-[rgba(39,11,79,0.05)] font-['Montserrat'] text-[calc(14/375*100vw)] ${
                          selectedCountry === country ? 'bg-[rgba(39,11,79,0.1)]' : ''
                        } ${index === 0 ? 'rounded-t-[calc(12/375*100vw)]' : ''} ${index === commonCountries.length - 1 ? 'rounded-b-[calc(12/375*100vw)]' : ''}`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* street address */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                          <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
              Street Address
              {errors.address && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({errors.address})</span>}
            </div>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* city */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                          <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
              City
              {errors.city && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({errors.city})</span>}
            </div>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(58/375*100vw)]">
            <div
              className={`box-border flex flex-row justify-center items-center w-[calc(266/375*100vw)] h-[calc(58/375*100vw)] ${isLoading ? 'bg-gray-400' : 'bg-[#270B4F]'} [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(100/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={isLoading ? undefined : handleSubmit}>
              <div className="w-[calc(109/375*100vw)] h-[calc(20/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/375*100vw)] leading-[calc(20/375*100vw)] text-center tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0">
                {isLoading ? "Claiming..." : "Claim Prize"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100 overflow-y-auto scroll-bar-hidden">
      <div className="bg-white p-[calc(24/1920*100vw)] rounded-lg w-[calc(314/1920*100vw)] h-[calc(595/1920*100vw)] flex flex-col items-center justify-start gap-[calc(24/1920*100vw)] relative">
        {/* close button */}
        <div className="absolute -top-[calc(24/1920*100vw)] -right-[calc(24/1920*100vw)]">
          <img
            src={iconClose}
            alt="close"
            className="w-[calc(24/1920*100vw)] h-[calc(24/1920*100vw)]"
            onClick={handleClose}
          />
        </div>
        {/* message title */}
        <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(48/1920*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
          <div
            className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
            <div
              className={`h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
              Claim Your Prize
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start gap-[calc(16/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(393/1920*100vw)]">
          {/* full name */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Full Name
              {errors.name && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({errors.name})</span>}
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* phone number */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Phone Number
              {errors.phone && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({errors.phone})</span>}
            </div>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* country */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)] relative">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Country
              {errors.country && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({errors.country})</span>}
            </div>
            <div className="relative w-full">
              <div
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)] flex items-center justify-between cursor-pointer"
                onClick={toggleCountryDropdown}
              >
                <span className={`font-['Montserrat'] text-[calc(14/1920*100vw)] ${selectedCountry ? 'text-black' : 'text-gray-400'}`}>
                  {selectedCountry || "Select Country"}
                </span>
                <svg 
                  className={`w-[calc(12/1920*100vw)] h-[calc(12/1920*100vw)] transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#270B4F] rounded-[calc(12/1920*100vw)] max-h-[calc(200/1920*100vw)] overflow-y-auto z-10 shadow-lg scroll-bar-hidden">
                  {commonCountries.map((country, index) => (
                    <div
                      key={index}
                      className={`px-[calc(16/1920*100vw)] py-[calc(12/1920*100vw)] cursor-pointer hover:bg-[rgba(39,11,79,0.05)] font-['Montserrat'] text-[calc(14/1920*100vw)] ${
                        selectedCountry === country ? 'bg-[rgba(39,11,79,0.1)]' : ''
                      } ${index === 0 ? 'rounded-t-[calc(12/1920*100vw)]' : ''} ${index === commonCountries.length - 1 ? 'rounded-b-[calc(12/1920*100vw)]' : ''}`}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* street address */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Street Address
              {errors.address && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({errors.address})</span>}
            </div>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* city */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              City
              {errors.city && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({errors.city})</span>}
            </div>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(58/1920*100vw)]">
          <div
            className={`box-border flex flex-row justify-center items-center w-[calc(266/1920*100vw)] h-[calc(58/1920*100vw)] ${isLoading ? 'bg-gray-400' : 'bg-[#270B4F]'} [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(100/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={isLoading ? undefined : handleSubmit}>
            <div className="w-[calc(109/1920*100vw)] h-[calc(20/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/1920*100vw)] leading-[calc(20/1920*100vw)] text-center tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0">
              {isLoading ? "Claiming..." : "Claim Prize"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
