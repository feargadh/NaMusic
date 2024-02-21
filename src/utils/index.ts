export function isJSON(str: string): boolean {
  if (typeof str == 'string') {
      try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
              return true;
          }else{
              return false;
          }

      } catch(e) {
          console.log('error：'+str+'!!!'+e);
          return false;
      }
  }
  return false
}


export const recordIsSong = (record: Song | Album | Artist): record is Song =>
(record as Song).artists ? true : false;
export const recordIsAlbum = (record: Song | Album | Artist): record is Album =>
(record as Album).artist ? true : false;