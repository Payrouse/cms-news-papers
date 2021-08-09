import { useEffect, useState } from 'react';

import AddPhoto from './AddPhoto';

const GalleryPhotos = ({
  defaultImg,
  imgBaseRef,
  container,
  maxFiles,
  name,
  error,
  register,
  required,
  setValue,
}:any) => {
  const [imgSelected, setImgSelected] = useState('');
  const [visibleUploader, setVisibleUploader] = useState(false);
  // data
  const [listImages, setListImages] = useState([]);
  const [stateRequest, setStateRequest] = useState({
    loading: true,
    error: false,
  });

  const handleSelect = (url:string) => {
    setImgSelected(url);
    setValue(name, url);
  };

  const showUploader = () => {
    setVisibleUploader(true);
  };

  const hideUploader = () => {
    setVisibleUploader(false);
  };

  useEffect(() => {
    if (defaultImg) {
      handleSelect(defaultImg);
    }
    getImages();
  }, []);

  const getImages = () => {
    /* storage
      .ref()
      .child(imgBaseRef)
      .listAll()
      .then((res) => {
        let items = [];
        res.items.forEach((itemRef) => {
          // console.log("name: ", itemRef.name);
          // console.log("fullpath: ", itemRef.fullPath);
          // console.log("to string: ", itemRef.toString());
          // items.push({ getUrl: itemRef.getDownloadURL, name: itemRef.name })
          items.push(itemRef);
        });
        setListImages(items);
        setStateRequest({ loading: false, error: false });
      })
      .catch((error) => {
        setStateRequest({ loading: false, error: true });
        console.log('Error', error);
      }); */
    // console.log("stateRequest: ", stateRequest);
    // console.log("ITEMS", listImages);
  };

  return (
    <div className={container || 'pt-3 px-3 mb-6 md:mb-0'}>
      <label className="uppercase tracking-wide text-xs font-bold mb-2 ml-2">
        Galería
      </label>
      <div className="border-2 border-gray-300 rounded-md max-h-60 overflow-y-auto py-1">
        <div className="w-full flex flex-wrap">
          {stateRequest.loading ? (
            <div className="h-24 w-full flex justify-center items-center">
              loading...
            </div>
          ) : stateRequest.error ? (
            <div className="h-24 w-full flex flex-col justify-center items-center">
              <p className="font-bold text-lg text-red-600">Error</p>
              <button
                type="button"
                className="mt-1 px-2 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  getImages();
                }}
              >
                Volver a cargar
              </button>
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
          ) : null}
          {!visibleUploader && !stateRequest.loading && !stateRequest.error ? (
            <AddPhoto showUploader={showUploader} />
          ) : null}
        </div>
      </div>
      {/* {visibleUploader ? (
        <div>
          <UploaderToGalery
            hideUploader={hideUploader}
            label="Arrastre la imagen a subir"
            stgRef={imgBaseRef}
            maxFiles={maxFiles}
            refetch={getImages}
          />
        </div>
      ) : null} */}
      <input className="hidden" type="url" {...register(name, required)} />
      {error && (
        <small className="ml-2 block tracking-wide text-grey-darker text-red-500 text-xs font-semibold mb-1">
          {error.message}
        </small>
      )}
    </div>
  );
};

const Photo = ({ photo, index, selected, handleSelect }:any) => {
  // console.log("SELECTED", index + " " + selected);

  const [url, setUrl] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (photo.name !== name) {
      setUrl(null);
      setName(photo.name);
      /* photo.getDownloadURL().then((url) => {
        setUrl(url);
      }); */
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
