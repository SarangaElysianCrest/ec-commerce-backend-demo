export interface CreateTagDto {
  name: string;
}

export interface UpdateTagDto {
  id: number;
  name: string;
}

export interface DeleteTagDto {
  id: number;
}

export interface QueryTagsDto {
  id: number;
}

export interface TagResponseDto {
  id: number;
  name: string;
}
