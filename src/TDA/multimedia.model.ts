// Enum para los tipos multimedia
export enum TipoMultimedia {
  Video = 'video',
  Imagen = 'imagen',
  Audio = 'audio',
}

// Clase base para representar multimedia
export class Multimedia {
  constructor(
    public id: string,
    public path: string,
    public type: TipoMultimedia,
  ) {}
}

// Clase para representar videos
export class Video extends Multimedia {
  constructor(
    id: string,
    path: string,
    public duration: number,
    public format: string,
  ) {
    super(id, path, TipoMultimedia.Video);
  }
}

// Clase para representar imágenes
export class Imagen extends Multimedia {
  constructor(
    id: string,
    path: string,
    public description: string,
  ) {
    super(id, path, TipoMultimedia.Imagen);
  }
}

// Clase para representar audio
export class Audio extends Multimedia {
  constructor(
    id: string,
    path: string,
    public format: string,
  ) {
    super(id, path, TipoMultimedia.Audio);
  }
}
