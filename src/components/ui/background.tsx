export const Background = () => {
  return (
    <div className="absolute inset-0 bg-slate-50">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(#e2e8f0 1px, transparent 1px),
            linear-gradient(90deg, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* Floating Elements - Subtle on light background */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-200 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-100 rounded-full animate-ping" />
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-slate-200 rounded-full animate-pulse" />

      {/* Solid Overlay */}
      <div className="absolute inset-0 bg-white/40" />
    </div>
  );
};
