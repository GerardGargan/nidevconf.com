import { existsSync } from "node:fs";

/* The 800px crop where the Sessionize export had one. A speaker added by hand
   (Joe McKevitt, 400px) falls back to the small file. Server only: it looks at disk. */
export function large(photo: string) {
  const lg = photo.replace(/\.[^.]+$/, "-lg.jpg");
  return existsSync(`${process.cwd()}/public/images/speakers/${lg}`) ? lg : photo;
}
