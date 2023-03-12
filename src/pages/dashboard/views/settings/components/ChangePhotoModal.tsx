/* eslint-disable jsx-a11y/anchor-is-valid */
import { AttachmentIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Input,
  Flex,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop } from 'react-image-crop';
import canvasPreview from './canvasPreview';

interface Props {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

function ChangePhotoModal({ isOpen, onOpen, onClose }:Props) {
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: 'px', // Can be 'px' or '%'
    x: 50,
    y: 50,
    width: 150,
    height: 150,
  });

  const [error, setError] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      /*  setCrop(undefined); */
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgSrc(reader.result?.toString() || '');
    });
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleUpload = async (file:File) => {
    if (!file) {
      return;
    }
    if (!validFileTypes.find((type) => file.type === type)) {
      setError('Invalid file type');
    } else {
      const formData = new FormData();
      formData.append('image', file);
      await fetch('http://localhost:3000/userInfo/uploadImage', {
        body: formData,
        method: 'POST',
        credentials: 'include',
      })
        .then(onClose());
    }
  };
  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }
      const file = new File([blob], 'name', { type: blob.type });
      handleUpload(file);
    });
  }
  useEffect(() => {
    if (
      completedCrop?.width
      && completedCrop?.height
      && imgRef.current
      && previewCanvasRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
      );
    }
  }, [completedCrop]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Picture</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as={Flex}
          flexDir="column"
        >
          <Text>{error && error}</Text>
          {imgSrc && (
          <ReactCrop
            circularCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <Flex
              maxW="400px"
            >
              <img
                src={imgSrc && imgSrc}
                ref={imgRef}
                width="100%"
                alt="crop"
              />
            </Flex>
          </ReactCrop>
          )}
          <Input type="file" hidden id="imageInput" onChange={onSelectFile} />
          <Button
            mt="2rem"
            as="label"
            htmlFor="imageInput"
            aria-label="upload image"
            leftIcon={<AttachmentIcon />}
          >
            Choose an image
          </Button>
          {completedCrop

          && (
          <div>
            <div>
              <canvas
                hidden
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
            <a
              href="#"
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={!completedCrop}
            onClick={() => onDownloadCropClick()}
            variant="ghost"
          >
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChangePhotoModal;
