import context from "../lib/context";
import { TagResponseDto, CreateTagDto, DeleteTagDto, QueryTagsDto, UpdateTagDto } from "../dto/tag.dto";

export async function createTag(createTagDto: CreateTagDto) {
  try {
    const tag = await context.db.tagRepository.save({
      ...createTagDto
    });
    return <TagResponseDto>{
      ...tag
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("tag could not be created!");
  }
}

export async function updateTag(updateTagDto: UpdateTagDto) {
  try {
    const { id, ...updateObj } = updateTagDto;
    const tag = await context.db.tagRepository.findOne(id);
    if (!tag) {
      throw new Error("tag not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (tag as any)[k] = (updateObj as any)[k];
    });
    const updatedTag = await context.db.tagRepository.save(tag);
    return <TagResponseDto>{
      ...updatedTag
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("tag could not be updated!");
  }
}

export async function deleteTag(deleteTagDto: DeleteTagDto) {
  try {
    const deleteResult = await context.db.tagRepository.delete(deleteTagDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("tag not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("tag could not be deleted!");
  }
}

export async function queryTags(queryTagsDto: QueryTagsDto) {
  try {
    const tags = await context.db.tagRepository.find();
    return tags.map(u => {
      return <TagResponseDto>{
        ...u
      };
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query tags!");
  }
}

export async function getTagById(tagId: number) {
  try {
    const tag = await context.db.tagRepository.findOne(tagId);
    if (!tag) {
      throw new Error("tag not found!");
    }
    return <TagResponseDto>{
      ...tag
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("tag not found!");
  }
}