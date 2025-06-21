import "../../@/styles/_keyframe-animations.scss";
import "../../@/styles/_variables.scss";
import React, { useEffect, useRef, useState } from "react";
import { CenteredLayout } from "./Skeleton.tsx";

interface Props {
  lazy?: boolean;
}

export function Editor({ lazy = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [Editor, setEditor] = useState<React.ComponentType | null>(null);

  const handleRoot = async () => {
    if (loading) return;
    setLoading(true);
    const { SimpleEditor } = await import(
      "../../@/components/tiptap-templates/simple/simple-editor.tsx"
    );
    setEditor(() => SimpleEditor);
    setLoading(false);
  };

  useEffect(() => {
    if (!lazy) {
      handleRoot();
    }
  }, [lazy]);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as HTMLElement;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && lazy) {
        observer.disconnect();
        handleRoot();
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [lazy]);

  return (
    <div ref={ref}>
      {loading && (
        <CenteredLayout loading={true}>Chargement en cours...</CenteredLayout>
      )}
      {!loading && Editor && <Editor />}
    </div>
  );
}
