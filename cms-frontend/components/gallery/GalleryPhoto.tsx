import { Dialog, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import UploaderAutoSubmit from '../uploader/UploadAutoSubmit';
import UploaderToGallery from '../uploader/UploadToGallery';

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
  defaultImg = '',
  name,
  error,
  register,
  validations,
  container,
  required = false,
  setValue,
}: GalleryPhotoProps) => {
  const [imgSelected, setImgSelected] = useState(defaultImg);
  // data
  const [listImages, setListImages] = useState<any[]>([]);
  const [stateRequest, setStateRequest] = useState({
    loading: false,
    error: false,
  });
  const [showGallery, setShowGallery] = useState(false);
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    // setValue('avatar', '');
    setOpenModal(false);
  };

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
    <>
      <div className={container || 'pt-3 px-4 mb-6 md:mb-0'}>
        <label className=" font-bold mb-2">Foto del articulo</label>
        <div className="w-full flex justify-center">
          <img
            className="h-60 w-auto rounded object-contain border cursor-pointer"
            src={imgSelected}
            alt="imagen de la noticia"
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className="flex justify-between mt-2">
          <label className="font-bold mb-2">Galería</label>
          <button
            type="button"
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => {
              setShowGallery(!showGallery);
            }}
          >
            {showGallery ? 'Ocultar galería' : 'Mostrar galería'}
          </button>
        </div>
        <div className={`${showGallery ? '' : 'hidden'}`}>
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
        </div>
        <input className="hidden" type="url" {...register(name, validations)} />
        {error && (
          <small className="ml-2 block tracking-wide text-grey-darker text-red-500 text-xs font-semibold mb-1">
            {error.message}
          </small>
        )}
      </div>
      <Dialog
        fullWidth
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="p-6">
          <div>
            <p id="alert-dialog-title" className="title text-lg font-semibold">
              Subir foto del articulo
            </p>
            <p
              id="alert-dialog-description"
              className="text-sm font-medium leading-5 text-gray-500 mt-2"
            >
              Recuerda que la foto del articulo debe ser de buena resolución
            </p>
          </div>
          <div className="mt-6">
            <div className="w-full">
              <UploaderAutoSubmit
                container="w-full"
                stgRef={`news/pictures`}
                label="Seleccione o arrastre una foto"
                callbackUrl={handleSelect}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex justify-center items-center px-2 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Dialog>
    </>
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
      setUrl(photo.largeImageURL);
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
