interface GTLogoGreen {
  className?: string;
}

const GTLogoGreen: React.FC<GTLogoGreen> = ({ className }) => {
  return (
    <svg 
      width="64" 
      height="68" 
      viewBox="0 0 64 68" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      >
      <path d="M64 31.9184C64 14.2903 49.6731 0 32 0V0C14.3269 0 -1.19209e-06 14.2903 -1.19209e-06 31.9184V68H29.913C48.7387 68 64 52.7777 64 34V31.9184Z" fill="#39E19E"/>
    </svg>
  );
};

export default GTLogoGreen;
