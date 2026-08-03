import { useEffect, useId, useRef } from 'react';

const sealScript = 'https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js';

export default function RaVerifiedSeal() {
  const reactId = useId();
  const targetId = `ra-verified-seal-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const targetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    target.replaceChildren();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = `ra-embed-verified-seal-${targetId}`;
    script.src = sealScript;
    script.dataset.id = 'UEhEaDkzUU1wU1Z2WU9xeDpmb25vdml0YWwtbHRkYQ==';
    script.dataset.target = targetId;
    script.dataset.model = 'horizontal_2';
    target.appendChild(script);

    return () => target.replaceChildren();
  }, [targetId]);

  return (
    <span
      id={targetId}
      ref={targetRef}
      className="inline-flex max-w-full items-center overflow-hidden align-middle"
      aria-label="Selo RA Verificado"
    />
  );
}
