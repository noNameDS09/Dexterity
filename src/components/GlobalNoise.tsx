'use client';

import Noise from './Noise';

export default function GlobalNoise() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none opacity-60">
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
    </div>
  );
}
