import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Animated particles that respond strongly to mouse and scroll
const AnimatedParticles = () => {
    const ref = useRef();
    const { mouse, viewport } = useThree();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Generate particle positions
    const { positions, originalPositions } = useMemo(() => {
        const temp = [];
        const count = 4000;

        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;
            const p = Math.random() * Math.PI * 2;
            const r = 1.5 + Math.random() * 2.5;

            const x = r * Math.sin(t) * Math.cos(p);
            const y = r * Math.sin(t) * Math.sin(p);
            const z = r * Math.cos(t);

            temp.push(x, y, z);
        }

        return {
            positions: new Float32Array(temp),
            originalPositions: new Float32Array(temp)
        };
    }, []);

    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime();
            const positions = ref.current.geometry.attributes.position.array;

            // Strong mouse interaction
            const mouseX = mouse.x * viewport.width / 2;
            const mouseY = mouse.y * viewport.height / 2;

            for (let i = 0; i < positions.length; i += 3) {
                const x = originalPositions[i];
                const y = originalPositions[i + 1];
                const z = originalPositions[i + 2];

                // Distance from mouse
                const dx = x - mouseX;
                const dy = y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Scatter particles away from mouse
                const force = Math.max(0, 1 - dist / 2);
                const scatter = force * 0.8;

                // Wave motion based on scroll
                const scrollEffect = Math.sin(scrollY * 0.001 + i * 0.01) * 0.3;

                // Apply transformations
                positions[i] = x + dx * scatter + Math.sin(time + i) * 0.05;
                positions[i + 1] = y + dy * scatter + Math.cos(time + i) * 0.05 + scrollEffect;
                positions[i + 2] = z + Math.sin(time * 0.5 + i) * 0.1;
            }

            ref.current.geometry.attributes.position.needsUpdate = true;

            // Rotate the entire system
            ref.current.rotation.x = time * 0.03 + mouse.y * 0.3;
            ref.current.rotation.y = time * 0.05 + mouse.x * 0.3;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#a855f7"
                size={0.004}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

// Interactive floating shapes that react to mouse
const FloatingShapes = () => {
    const groupRef = useRef();
    const { mouse, viewport } = useThree();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const shapes = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: 0.15 + Math.random() * 0.25,
            type: i % 3,
            speed: 0.5 + Math.random() * 1,
            orbitRadius: 0.5 + Math.random() * 0.5,
        }));
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();
            const mouseX = mouse.x * viewport.width / 2;
            const mouseY = mouse.y * viewport.height / 2;

            groupRef.current.children.forEach((child, i) => {
                const shape = shapes[i];

                // Distance from mouse
                const dx = child.position.x - mouseX;
                const dy = child.position.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // React to mouse proximity
                const attraction = Math.max(0, 1 - dist / 3);
                child.position.x += dx * attraction * 0.01;
                child.position.y += dy * attraction * 0.01;

                // Orbital motion
                child.position.x += Math.cos(time * shape.speed + i) * 0.002;
                child.position.y += Math.sin(time * shape.speed + i) * 0.002;

                // Scroll effect
                child.position.y += Math.sin(scrollY * 0.002 + i) * 0.01;

                // Rotation
                child.rotation.x += 0.015 * shape.speed;
                child.rotation.y += 0.02 * shape.speed;
                child.rotation.z += 0.01 * shape.speed;

                // Scale pulsing
                const pulse = 1 + Math.sin(time * 2 + i) * 0.1;
                child.scale.setScalar(shape.scale * pulse);
            });

            // Rotate entire group based on mouse
            groupRef.current.rotation.y = time * 0.05 + mouse.x * 0.5;
            groupRef.current.rotation.x = mouse.y * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {shapes.map((shape, i) => {
                const ShapeComponent =
                    shape.type === 0 ? (
                        <boxGeometry args={[1, 1, 1]} />
                    ) : shape.type === 1 ? (
                        <sphereGeometry args={[1, 16, 16]} />
                    ) : (
                        <torusGeometry args={[1, 0.4, 8, 16]} />
                    );

                return (
                    <mesh
                        key={i}
                        position={shape.position}
                        rotation={shape.rotation}
                    >
                        {ShapeComponent}
                        <meshStandardMaterial
                            color="#ec4899"
                            transparent
                            opacity={0.2}
                            wireframe
                            emissive="#a855f7"
                            emissiveIntensity={0.4}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};

// Spiral galaxy with scroll interaction
const SpiralGalaxy = () => {
    const ref = useRef();
    const { mouse } = useThree();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const particles = useMemo(() => {
        const temp = [];
        const count = 3000;
        const branches = 5;
        const spin = 1.5;
        const randomness = 0.5;

        for (let i = 0; i < count; i++) {
            const radius = Math.random() * 3.5;
            const branchAngle = ((i % branches) / branches) * Math.PI * 2;
            const spinAngle = radius * spin;

            const randomX = (Math.random() - 0.5) * randomness * radius;
            const randomY = (Math.random() - 0.5) * randomness * radius;
            const randomZ = (Math.random() - 0.5) * randomness * radius;

            temp.push(
                Math.cos(branchAngle + spinAngle) * radius + randomX,
                randomY * 0.3,
                Math.sin(branchAngle + spinAngle) * radius + randomZ
            );
        }

        return new Float32Array(temp);
    }, []);

    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime();

            // Rotate based on time and mouse
            ref.current.rotation.y = time * 0.04 + mouse.x * 0.4;
            ref.current.rotation.x = mouse.y * 0.2;

            // Scroll-based movement
            ref.current.position.y = Math.sin(scrollY * 0.001) * 0.5;
            ref.current.position.z = scrollY * 0.0005;
        }
    });

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#8b5cf6"
                size={0.005}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.7}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

// Dynamic camera that follows mouse
const CameraController = () => {
    const { camera, mouse } = useThree();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        // Smooth camera movement based on mouse
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;

        // Scroll-based zoom
        camera.position.z = 3 + Math.sin(scrollY * 0.001) * 0.5;

        camera.lookAt(0, 0, 0);
    });

    return null;
};

// Main 3D Scene
const Scene3D = () => {
    return (
        <>
            <CameraController />

            {/* Enhanced lighting */}
            <ambientLight intensity={0.4} />

            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ec4899" />

            <pointLight position={[0, 0, 0]} intensity={1.5} color="#8b5cf6" distance={8} />
            <pointLight position={[3, 3, 3]} intensity={1} color="#ec4899" distance={6} />
            <pointLight position={[-3, -3, -3]} intensity={1} color="#a855f7" distance={6} />

            {/* 3D Elements */}
            <AnimatedParticles />
            <SpiralGalaxy />
            <FloatingShapes />
        </>
    );
};

// Main Canvas Component - Full screen from About to Contact only
const Interactive3DBackground = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show background only after scrolling past Hero section (approximately 100vh)
            const heroHeight = window.innerHeight;
            setIsVisible(window.scrollY > heroHeight * 0.8);
        };

        handleScroll(); // Check initial position
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[-1] overflow-hidden transition-opacity duration-500"
            style={{ opacity: isVisible ? 1 : 0, pointerEvents: 'none' }}
        >
            <Canvas
                camera={{ position: [0, 0, 3], fov: 75 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <Scene3D />
            </Canvas>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
        </div>
    );
};

export default Interactive3DBackground;
