import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';

const AvatarChanger = () => {
  const [image, setImage] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const [borderRaius, setBorderRadius] = React.useState(1);
  const editorRef = React.useRef(null);

  const [updateDoctorPhoto] = doctorApi.useUpdateDoctorPhotoMutation();
  const { data: doctorData } = authApi.useGetMeQuery({});
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };
  return (
    <div>
      <AvatarEditor
        ref={editorRef}
        image={image}
        height={250}
        border={100}
        borderRadius={200}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        rotate={0}
      />
      <input type="file" onChange={handleImageUpload}></input>
      <input
        type="range"
        min="1"
        max="2"
        step="0.01"
        value={scale}
        onChange={handleScaleChange}
      />

      <button
        onClick={() => {
          const canvas = editorRef.current.getImageScaledToCanvas();

          canvas.toBlob((blob) => {
            console.log(blob);
            updateDoctorPhoto({ id: doctorData.id, blob });
          });
        }}
      >
        Export
      </button>
    </div>
  );
};

export default AvatarChanger;
