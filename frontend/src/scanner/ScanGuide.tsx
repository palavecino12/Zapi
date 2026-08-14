export const CameraGuide = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
                    {/* Superior izquierda */}
                    <div
                        className={`absolute top-10 left-15 h-10 w-10 border-t-[4px] border-l-[4px] 
                        rounded-tl-lg opacity-55`} />
                    {/* Superior derecha */}
                    <div
                        className={`absolute top-10 right-15 h-10 w-10 border-t-[4px] border-r-[4px]
                        rounded-tr-lg opacity-55`}
                    />
                    {/* Inferior izquierda */}
                    <div
                        className={`absolute bottom-10 left-15 h-10 w-10 border-b-[4px] border-l-[4px]
                        rounded-bl-lg opacity-55`}
                    />
                    {/* Inferior derecha */}
                    <div
                        className={`absolute bottom-10 right-15 h-10 w-10 border-b-[4px] border-r-[4px]
                        rounded-br-lg opacity-55`}
                    />
                </div>
    );
};