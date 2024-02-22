export function isJSON(str: string): boolean {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("error：" + str + "!!!" + e);
      return false;
    }
  }
  return false;
}

export const recordIsSong = (record: Song | Album | Artist): record is Song =>
  (record as Song).artists ? true : false;
export const recordIsAlbum = (record: Song | Album | Artist): record is Album =>
  (record as Album).artist ? true : false;

export const transBlob2JSON = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    let read = new FileReader();

    read.readAsText(blob, "utf-8");
    read.onload = (data) => {
      if (data && data.target) {
        resolve(JSON.parse(data.target.result as string));
      } else {
        reject("no data");
      }
    };
  });
};

export const transBlob2ArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
  return new Promise((resolve) => {
    blob.arrayBuffer().then((buffer) => {
      // ArrayBuffer
      resolve(buffer);
    });
  });
};
