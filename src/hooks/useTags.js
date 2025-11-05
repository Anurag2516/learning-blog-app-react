import { useState } from "react";

export const useTags = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isTagVisible, setIsTagVisible] = useState();

  const isTagInputValid = () => {
    return tag.trim() !== "";
  };

  const createTags = () => {
    if (isTagInputValid()) {
      let newTag = {
        id: crypto.randomUUID(),
        tag: tag,
      };
      setTags((prev) => [...prev, newTag]);
      setTag("");
      setIsTagVisible(true);
      return;
    }
  };

  const tagVisible = (idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  return {
    tag,
    setTag,
    tags,
    setTags,
    isTagVisible,
    setIsTagVisible,
    isTagInputValid,
    createTags,
    tagVisible,
  };
};
