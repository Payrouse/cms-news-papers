import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import AddPhoto from './AddPhoto';

const API_KEY_PIXABAY = '17449699-11f01ceaece73a51d8b58564b';

interface GalleryPhotoProps {
  defaultImg: string;
  name: string;
  register: UseFormRegister<any>;
  validations?: any;
  setValue: any;
  error: any;
  container?: string; // optional
  required?: boolean; // optional
  disabled?: boolean; // optional
}

const GalleryPhotos = ({
  defaultImg,
  name,
  error,
  register,
  validations,
  container,
  required = false,
  setValue,
}: GalleryPhotoProps) => {
  const [imgSelected, setImgSelected] = useState('');
  // data
  const [listImages, setListImages] = useState<any[]>([]);
  const [stateRequest, setStateRequest] = useState({
    loading: true,
    error: false,
  });
  const [query, setQuery] = useState('');

  const handleSelect = (url: string) => {
    setImgSelected(url);
    setValue(name, url);
  };

  const onChange = (event: any) => {
    setQuery(event.target.value);
    getImages(event.target.value);
  };

  const getImages = async (query: string) => {
    let url = `https://pixabay.com/api/?key=${API_KEY_PIXABAY}&q=${query}&image_type=photo`;
    setStateRequest({ loading: true, error: false });
    setTimeout(async () => {
      let photos = await fetch(url).then((response) => response.json());
      console.log(photos);
      setListImages(photos.hits);
      setStateRequest({ loading: false, error: false });
    }, 500);
  };

  return (
    <div className={container || 'pt-3 px-3 mb-6 md:mb-0'}>
      <label className="uppercase tracking-wide text-xs font-bold mb-2 ml-2">
        Galería
      </label>
      <TextField
        id="query-input"
        placeholder="Buscar foto..."
        variant="outlined"
        value={query}
        onChange={onChange}
        size="small"
        fullWidth
      />
      <div className="border-2 border-gray-300 rounded-md max-h-60 overflow-y-auto py-1">
        <div className="w-full flex flex-wrap">
          {stateRequest.loading ? (
            <div className="h-60 w-full flex justify-center items-center">
              loading...
            </div>
          ) : listImages.length > 0 ? (
            listImages.map((photo, index) => {
              return (
                <Photo
                  key={index}
                  index={index}
                  photo={photo}
                  selected={imgSelected}
                  handleSelect={handleSelect}
                />
              );
            })
          ) : (
            <div className="h-60 w-full flex justify-center items-center">
              Lista vacía
            </div>
          )}
        </div>
      </div>
      <input className="hidden" type="url" {...register(name, validations)} />
      {error && (
        <small className="ml-2 block tracking-wide text-grey-darker text-red-500 text-xs font-semibold mb-1">
          {error.message}
        </small>
      )}
    </div>
  );
};

const Photo = ({ photo, index, selected, handleSelect }: any) => {
  // console.log("SELECTED", index + " " + selected);

  const [url, setUrl] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (photo.name !== name) {
      setUrl(null);
      setName(photo.tags);
      setUrl(photo.previewURL);
    }
  }, [photo]);

  return (
    <div
      className="relative mx-2 my-2 cursor-pointer"
      onClick={() => {
        handleSelect(url);
      }}
    >
      {selected === url ? (
        <div
          className="absolute text-green-600 bg-white rounded-full"
          style={{ top: -10, right: -5 }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            />
          </svg>
        </div>
      ) : null}
      <img
        className={`w-24 h-24 rounded-md 
                ${selected === url ? 'border-green-500 border-2' : 'border'}`}
        src={
          url || 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
        }
        alt={name || 'image'}
        title={name || 'loading...'}
      />
    </div>
  );
};

export default GalleryPhotos;
