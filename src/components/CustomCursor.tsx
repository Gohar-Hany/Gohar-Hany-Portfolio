import React, { useEffect } from 'react';

const CustomCursor = () => {
    useEffect(() => {
        const cursor = document.getElementById("cursor");
        const ring = document.getElementById("cursorRing");

        if (!cursor || !ring) return;

        let mx = 0, my = 0, rx = 0, ry = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + "px";
            cursor.style.top = my + "px";
        };

        document.addEventListener("mousemove", handleMouseMove);

        let animationFrameId: number;
        const loop = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + "px";
            ring.style.top = ry + "px";
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        const applyHover = () => {
            cursor.classList.add("hovered");
            ring.classList.add("hovered");
        };

        const removeHover = () => {
            cursor.classList.remove("hovered");
            ring.classList.remove("hovered");
        };

        // Use event delegation or attach to specific selectors
        const attachHoverEvents = () => {
            document.querySelectorAll("a, button, .cred-chip, .stat-card, .skill-card, .project-card, input, textarea").forEach(el => {
                el.addEventListener("mouseenter", applyHover);
                el.addEventListener("mouseleave", removeHover);
            });
        };

        // Attach initially and maybe on DOM mutation if dynamically adding links
        attachHoverEvents();

        // Observer for dynamically added elements (like projects/drawers)
        const observer = new MutationObserver(() => {
            attachHoverEvents();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            document.querySelectorAll("a, button, .cred-chip, .stat-card, .skill-card, .project-card, input, textarea").forEach(el => {
                el.removeEventListener("mouseenter", applyHover);
                el.removeEventListener("mouseleave", removeHover);
            });
        };
    }, []);

    return (
        <>
            <div id="cursor" className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out will-change-transform [&.hovered]:scale-0"></div>
            <div id="cursorRing" className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out will-change-transform [&.hovered]:scale-150 [&.hovered]:bg-primary/10"></div>
        </>
    );
};

export default CustomCursor;
