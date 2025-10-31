"use client";

export const Background = () => {
  return (
    <div className="absolute inset-0 bg-gray-900">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* Floating Cyber Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-green-500 rounded-full animate-bounce opacity-80" />
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-40" />
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-50" />

      {/* Animated Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-green-900/5 animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse" />
    </div>
  );
};
