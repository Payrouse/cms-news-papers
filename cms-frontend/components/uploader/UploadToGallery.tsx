import React, { useEffect, useState } from 'react';
import Dropzone, {
  IDropzoneProps,
  ILayoutProps,
} from 'react-dropzone-uploader';
import ProgressBarWithState from './ProgressBar';
// import { Toast } from '../../lib/toast'

//styles
import 'react-dropzone-uploader/dist/styles.css';
import { storage } from '../../library/Firebase';

const CustomPreview = (props: any) => {
  // console.log("PREVIEW PROPS", props);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  // default styles
  const { className, imageClassName } = props;
  // meta
  const { previewUrl, name, status, callbackUrl, stgRef } = props.meta;
  // methods and file
  const { remove, restart, file } = props.fileWithMeta;
  // console.log("FILE PREVIEW", file);
  // console.log("STATUS", status);

  useEffect(() => {
    if (status === 'done') {
      uploadFile();
    }
  }, [status]);

  const uploadFile = () => {
    console.log('props meta', props.meta);
    let metadata = {
      contentType: file.type,
    };
    //   new Date().getTime()
    let uploadTask = storage
      .ref()
      .child(`${stgRef}/${name}`)
      .put(file, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        p = p < 25 ? 25 : p;
        setProgress(p);
        console.log('Upload is ' + p + ' % done');
      },
      (error) => {
        setError(true);
        console.log('ERROR UPLOAD: ', error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          callbackUrl('avatar', downloadURL);
        });
      },
    );
  };

  return (
    <div className={className}>
      <img
        className={imageClassName}
        src={
          previewUrl !== undefined
            ? previewUrl
            : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
        }
        alt={name}
        title={name}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProgressBarWithState progress={progress} error={error} />
        <span className="cursor-pointer ml-2 font-bold" onClick={remove}>
          X
        </span>
      </div>
    </div>
  );
};

const UploaderToGallery = ({
  container,
  stgRef,
  label,
  name,
  register,
  required,
  callbackUrl,
  error,
  minHeight,
  maxHeight,
  maxWidth,
}: any) => {
  const [customLabel, setCustomLabel] = useState(label);

  const getUploadParams: IDropzoneProps['getUploadParams'] = ({
    file,
    meta,
  }) => {
    const url = 'https://httpbin.org/post';

    return { url, file, meta: { stgRef, callbackUrl } };
  };

  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    switch (status) {
      case 'removed':
        break;
      case 'done':
        setCustomLabel(label);
        console.log('done', file, meta);
        break;
      case 'aborted':
        console.log('aborted');
        break;
      case 'error_upload':
        console.log('error_upload');
        break;
      case 'rejected_file_type':
        console.log('rejected_file_type');
        setCustomLabel('Solo se permiten imagenes en formato .png y .jpg');
        break;
      case 'error_file_size':
        console.log('error_file_size');
        setCustomLabel('El tamaño máximo de la imagen puede ser 3MB');
        break;
      default:
        break;
    }
  };

  return (
    <div className={container || 'mt-2'}>
      <div className="flex justify-between">
        <label className="ml-2 block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          {'Imagen'}
        </label>
      </div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        PreviewComponent={CustomPreview}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        accept=".jpg, .png, .gif"
        maxSizeBytes={3145728}
        inputContent={customLabel}
        styles={{
          dropzone: {
            minHeight: minHeight || 120,
            maxHeight: maxHeight || 125,
            maxWidth: maxWidth || '100%',
            overflow: 'auto',
          },
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          dropzoneActive: { borderColor: 'green' },
          inputLabel: (files, extra) =>
            customLabel !== label
              ? { color: 'red', borderColor: 'red', backgroundColor: '#DAA' }
              : {},
        }}
      />
      <input className="hidden" {...register(name, required)} />
    </div>
  );
};

export default UploaderToGallery;
