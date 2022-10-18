import jsQR from 'jsqr';

export class ImageReader {
  private canvas = document.createElement('canvas');
  public readFile(file: File) {
    return new Promise<string | ArrayBuffer | null | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(e.target?.result);
      };
      reader.onerror = function(e) {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  }
  public readImage(src: string) {
    return new Promise<ImageData | undefined>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d', {
          willReadFrequently: true,
        });
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0, image.width, image.height);
        const imageData = ctx?.getImageData(0, 0, image.width, image.height);
        resolve(imageData);
      };
      image.onerror = function(e) {
        reject(e);
      };
    });
  };
  public async getQRResult(source: string | File) {
    let src: string | null = null;
    if (typeof source === 'string') {
      src = source;
    } else if (source instanceof File) {
      const res = await this.readFile(source);
      if (typeof res === 'string') {
        src = res;
      }
    }
    if (typeof src === 'string') {
      const imageData = await this.readImage(src);
      if (imageData) {
        return jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
      }
    }
    return null;
  };
}
