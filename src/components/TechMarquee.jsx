import Marquee from "./Marquee";

export function TechMarquee() {
    const technologies = [
        "auth0",
        "azure",
        "blazor",
        "cplusplus",
        "csharp",
        "css3",
        "dotnet",
        "dotnetcore",
        "git",
        "github",
        "html5",
        "javascript",
        "microsoft",
        "microsoftsqlserver",
        "react",
        "sqlite",
        "stripe",
        "tailwindcss",
        "threejs",
        "visualstudiocode",
        "vitejs",
        "wordpress",
    ];

    return (
        <div className="relative flex items-center justify-center w-full overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s]">
                {technologies.map((tech, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center w-16 h-16 mx-4 transition-transform duration-200 hover:scale-110"
                    >
                        <img
                            src={`assets/logos/${tech}.svg`}
                            alt={tech}
                            className="object-contain w-12 h-12"
                        />
                    </div>
                ))}
            </Marquee>
            <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
            <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
        </div>
    );
}
