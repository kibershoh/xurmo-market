import React, { useRef, useState } from 'react';

function FileUploader() {
  const [fileUrls, setFileUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileUrls = [];

    // Fayllar bilan biriktirish
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileUrl = URL.createObjectURL(file);
      fileUrls.push(fileUrl);
    }

    // Fayllar uchun state ni yangilash
    setFileUrls(fileUrls);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        type='file'
        required
      />
      <div>
        {/* Fayllarni ko'rsatish */}
        {fileUrls.map((url, index) => (
          <img key={index} src={url} alt={`file-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default FileUploader;
