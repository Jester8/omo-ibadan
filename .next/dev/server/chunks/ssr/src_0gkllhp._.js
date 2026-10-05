module.exports = [
"[project]/src/components/avatar/Avatar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVATAR_HEIGHT",
    ()=>AVATAR_HEIGHT,
    "default",
    ()=>Avatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-ssr] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/SkeletonUtils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/rig.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const SIT_THIGH = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]().setFromAxisAngle(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0), -1.45);
const SIT_KNEE = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]().setFromAxisAngle(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0), 1.5);
const AVATAR_HEIGHT = 1.81;
Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"]).forEach((u)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGLTF"].preload(u));
function Inner({ look: lookIn, motion, scale }) {
    const key = JSON.stringify(lookIn);
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseFor"])(lookIn);
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGLTF"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_URL"][base]);
    const anim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGLTF"])(lookIn.frame === "f" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIM_URL"].f : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIM_URL"].m);
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const look = JSON.parse(key);
        const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clone"])(gltf.scene);
        const dressed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$rig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dressAvatar"])(root, look, base);
        const mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationMixer"](root);
        const actions = {};
        for (const clip of anim.animations)actions[clip.name] = mixer.clipAction(clip);
        const bone = (n)=>root.getObjectByName(n) ?? null;
        const legs = {
            ul: bone("UpperLegL"),
            ur: bone("UpperLegR"),
            ll: bone("LowerLegL"),
            lr: bone("LowerLegR")
        };
        return {
            root,
            dressed,
            mixer,
            actions,
            legs
        };
    }, [
        gltf,
        anim,
        key,
        base
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            built.mixer.stopAllAction();
            built.dressed.dispose();
        }, [
        built
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((_, dt)=>{
        const speed = motion?.current.speed ?? 0;
        const ms = speed / scale; // speed in the model's own metres per second
        const pose = motion?.current.pose;
        let want = "Idle_Neutral";
        let timeScale = 1;
        if (ms > 0.15 && !pose) {
            if (ms < 3) {
                want = "Walk";
                timeScale = Math.max(0.6, ms / 1.4);
            } else {
                want = "Run";
                timeScale = Math.min(2.2, Math.max(0.8, ms / 4.2));
            }
        }
        const next = built.actions[want];
        if (next) {
            if (current.current !== want) {
                const prev = built.actions[current.current];
                next.reset().fadeIn(0.2).play();
                // stagger the very first pose so a crowd doesn't move in lockstep
                if (!prev) built.mixer.update(Math.random() * next.getClip().duration);
                prev?.fadeOut(0.2);
                current.current = want;
            }
            next.setEffectiveTimeScale(timeScale);
        }
        built.mixer.update(dt);
        if (pose === "sit") {
            built.legs.ul?.quaternion.multiply(SIT_THIGH);
            built.legs.ur?.quaternion.multiply(SIT_THIGH);
            built.legs.ll?.quaternion.multiply(SIT_KNEE);
            built.legs.lr?.quaternion.multiply(SIT_KNEE);
        }
    });
    const bw = lookIn.build === "slim" ? 0.94 : lookIn.build === "broad" ? 1.07 : 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        scale: [
            scale * bw,
            scale,
            scale * bw
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
            object: built.root
        }, void 0, false, {
            fileName: "[project]/src/components/avatar/Avatar.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/avatar/Avatar.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function Avatar({ look, motion, scale = 1 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                "rotation-x": -Math.PI / 2,
                "position-y": 0.012,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            0.34 * scale * 1.6,
                            28
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/avatar/Avatar.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#000",
                        transparent: true,
                        opacity: 0.16,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/avatar/Avatar.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/avatar/Avatar.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Inner, {
                    look: look,
                    motion: motion,
                    scale: scale
                }, void 0, false, {
                    fileName: "[project]/src/components/avatar/Avatar.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/avatar/Avatar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/avatar/Avatar.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/avatar/AvatarCreator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AvatarCreator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dices$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dices$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dices.mjs [app-ssr] (ecmascript) <export default as Dices>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/footprints.mjs [app-ssr] (ecmascript) <export default as Footprints>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$AvatarPreview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/AvatarPreview.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Swatches({ label, value, options, onPick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: options.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPick(c),
                        "aria-label": `${label} ${c}`,
                        className: `grid size-8 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-white transition active:scale-90 ${value === c ? "ring-stone-900" : "ring-transparent hover:ring-stone-300"}`,
                        style: {
                            background: c
                        },
                        children: value === c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            className: "size-3.5 text-white mix-blend-difference"
                        }, void 0, false, {
                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                            lineNumber: 36,
                            columnNumber: 29
                        }, this)
                    }, c, false, {
                        fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function Chips({ label, value, options, onPick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPick(o.id),
                        className: `rounded-full px-3.5 py-1.5 text-sm font-medium transition active:scale-95 ${value === o.id ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`,
                        children: o.label
                    }, o.id, false, {
                        fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
function AvatarCreator({ initialName = "", initialLook = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LOOK"], isEdit = false, onDone, onCancel }) {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialName);
    const [look, setLook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLook);
    const [walk, setWalk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const set = (k, v)=>setLook((l)=>({
                ...l,
                [k]: v
            }));
    const valid = name.trim().length >= 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0,
            scale: 1.03
        },
        transition: {
            duration: 0.35
        },
        className: "absolute inset-0 z-40 grid place-items-center bg-stone-900/30 p-3 backdrop-blur-md sm:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
            initial: {
                y: 30,
                opacity: 0,
                scale: 0.97
            },
            animate: {
                y: 0,
                opacity: 1,
                scale: 1
            },
            exit: {
                y: 20,
                opacity: 0
            },
            transition: {
                type: "spring",
                stiffness: 220,
                damping: 24
            },
            className: "grid max-h-full w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5 sm:grid-cols-[1fr_1.15fr]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-72 bg-gradient-to-b from-emerald-50 via-stone-50 to-amber-50 sm:h-auto sm:min-h-[34rem]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$AvatarPreview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            look: look,
                            walk: walk,
                            className: "absolute inset-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-black/5 backdrop-blur",
                            children: "Omo Ibadan"
                        }, void 0, false, {
                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-3 top-3 flex flex-col items-end gap-2 sm:bottom-4 sm:left-1/2 sm:right-auto sm:top-auto sm:-translate-x-1/2 sm:flex-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLook((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomLook"])()),
                                    className: "flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-sm font-medium text-stone-700 shadow ring-1 ring-black/5 transition hover:bg-white active:scale-95",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dices$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dices$3e$__["Dices"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        " Surprise me"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setWalk((w)=>!w),
                                    className: `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium shadow ring-1 ring-black/5 transition active:scale-95 ${walk ? "bg-emerald-600 text-white" : "bg-white/90 text-stone-700 hover:bg-white"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__["Footprints"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this),
                                        " Walk"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex max-h-[60dvh] flex-col sm:max-h-[40rem]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5 overflow-y-auto p-5 sm:p-7",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold tracking-tight text-stone-900",
                                            children: isEdit ? "Change your look" : "Make your Omo Ibadan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-stone-500",
                                            children: "This is how people will see you around the city."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-400",
                                            children: "Name"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: name,
                                            onChange: (e)=>setName(e.target.value.slice(0, 16)),
                                            placeholder: "e.g. Tunde",
                                            className: "w-full rounded-2xl border-0 bg-stone-100 px-4 py-3 text-base font-medium text-stone-900 outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Swatches, {
                                    label: "Skin",
                                    value: look.skin,
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SKIN_TONES"],
                                    onPick: (c)=>set("skin", c)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                                    label: "Body type",
                                    value: look.frame ?? "m",
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FRAMES"],
                                    onPick: (v)=>setLook((l)=>{
                                            const ok = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["topsFor"])(v).some((t)=>t.id === l.top);
                                            return {
                                                ...l,
                                                frame: v,
                                                top: ok ? l.top : "tee"
                                            };
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                                    label: "Build",
                                    value: look.build,
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUILDS"],
                                    onPick: (v)=>set("build", v)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                                    label: "Hair",
                                    value: look.hairStyle,
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HAIR_STYLES"],
                                    onPick: (v)=>set("hairStyle", v)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                look.hairStyle !== "bald" && look.hairStyle !== "gele" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Swatches, {
                                    label: "Hair colour",
                                    value: look.hairColor,
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HAIR_COLORS"],
                                    onPick: (c)=>set("hairColor", c)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                                    label: "Outfit · Everyday",
                                    value: look.top,
                                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["topsFor"])(look.frame).filter((t)=>t.group === "Everyday"),
                                    onPick: (v)=>set("top", v)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                                    label: "Outfit · Nigerian",
                                    value: look.top,
                                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["topsFor"])(look.frame).filter((t)=>t.group === "Nigerian"),
                                    onPick: (v)=>set("top", v)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Swatches, {
                                    label: "Outfit colour",
                                    value: look.topColor,
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CLOTH_COLORS"],
                                    onPick: (c)=>set("topColor", c)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Swatches, {
                                    label: look.top === "ankara" ? "Skirt colour" : "Trousers",
                                    value: look.bottomColor,
                                    options: [
                                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CLOTH_COLORS"].slice(0, 4),
                                        "#3a3f4b",
                                        "#7c5a3a"
                                    ],
                                    onPick: (c)=>set("bottomColor", c)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Swatches, {
                                    label: "Shoes",
                                    value: look.shoeColor,
                                    options: [
                                        "#f4f4f2",
                                        "#1d2433",
                                        "#dc2626",
                                        "#f59e0b",
                                        "#0ea5e9"
                                    ],
                                    onPick: (c)=>set("shoeColor", c)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                                    label: "Accessory",
                                    value: look.accessory,
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACCESSORIES"],
                                    onPick: (v)=>set("accessory", v)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-3 border-t border-stone-100 bg-white/80 p-4 sm:px-7",
                            children: [
                                onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onCancel,
                                    className: "rounded-full px-5 py-3 text-sm font-semibold text-stone-500 transition hover:bg-stone-100",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !valid,
                                    onClick: ()=>onDone(name.trim(), look),
                                    className: "rounded-full bg-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition hover:bg-emerald-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
                                    children: isEdit ? "Save look" : "Enter Ibadan"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/avatar/AvatarCreator.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/avatar/AvatarPreview.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AvatarPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-ssr] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/Avatar.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Turntable({ look, walk }) {
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        speed: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((_, dt)=>{
        if (g.current) g.current.rotation.y += dt * 0.6;
        motion.current.speed = walk ? 1.4 : 0;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: g,
        position: [
            0,
            -0.92,
            0
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            look: look,
            motion: motion
        }, void 0, false, {
            fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function AvatarPreview({ look, walk = false, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            dpr: [
                1,
                2
            ],
            camera: {
                position: [
                    0,
                    0.06,
                    4.7
                ],
                fov: 30
            },
            gl: {
                alpha: true
            },
            shadows: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                    intensity: 1.15
                }, void 0, false, {
                    fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: [
                        2.5,
                        4,
                        3
                    ],
                    intensity: 2.2,
                    castShadow: true
                }, void 0, false, {
                    fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: [
                        -3,
                        1.5,
                        -2
                    ],
                    intensity: 0.8,
                    color: "#bcd0ff"
                }, void 0, false, {
                    fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Turntable, {
                    look: look,
                    walk: walk
                }, void 0, false, {
                    fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    "rotation-x": -Math.PI / 2,
                    position: [
                        0,
                        -0.925,
                        0
                    ],
                    receiveShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                            args: [
                                0.8,
                                48
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: "#ffffff",
                            transparent: true,
                            opacity: 0.65,
                            roughness: 1
                        }, void 0, false, {
                            fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/avatar/AvatarPreview.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/avatar/rig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIM_URL",
    ()=>ANIM_URL,
    "BASE_URL",
    ()=>BASE_URL,
    "baseFor",
    ()=>baseFor,
    "dressAvatar",
    ()=>dressAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
const BASE_URL = {
    "m-casual": "/models/avatars/m-casual.glb",
    "m-hoodie": "/models/avatars/m-hoodie.glb",
    "m-business": "/models/avatars/m-business.glb",
    "m-worker": "/models/avatars/m-worker.glb",
    "m-farmer": "/models/avatars/m-farmer.glb",
    "m-beach": "/models/avatars/m-beach.glb",
    "f-casual-b": "/models/avatars/f-casual-b.glb",
    "f-casual-a": "/models/avatars/f-casual-a.glb",
    "f-suit": "/models/avatars/f-suit.glb",
    "f-worker": "/models/avatars/f-worker.glb"
};
const ANIM_URL = {
    m: BASE_URL["m-casual"],
    f: BASE_URL["f-casual-b"]
};
function baseFor(look) {
    const f = look.frame === "f";
    switch(look.top){
        case "hoodie":
            return f ? "f-casual-b" : "m-hoodie";
        case "suit":
            return f ? "f-suit" : "m-business";
        case "dress":
            return f ? "f-casual-a" : "m-casual";
        case "worker":
            return f ? "f-worker" : "m-worker";
        case "overalls":
            return f ? "f-casual-b" : "m-farmer";
        case "singlet":
            return f ? "f-casual-b" : "m-beach";
        default:
            return f ? "f-casual-b" : "m-casual";
    }
}
const ROLES = {
    "m-casual": {
        body: [
            "LightBrown"
        ],
        legs: [
            "LightBlue"
        ],
        feet: [
            "Red_Dark"
        ],
        hair: [
            "Hair"
        ],
        brows: [
            "Eyebrows"
        ],
        baked: true
    },
    "m-hoodie": {
        body: [
            "Purple"
        ],
        legs: [
            "LightBlue"
        ],
        feet: [
            "Purple"
        ],
        hair: [
            "Hair"
        ],
        brows: [
            "Eyebrows"
        ],
        baked: true
    },
    "m-business": {
        body: [
            "Suit"
        ],
        legs: [
            "Suit"
        ],
        feet: [],
        hair: [
            "Hair"
        ],
        brows: [
            "Eyebrows"
        ],
        baked: true
    },
    "m-worker": {
        body: [
            "Worker_Vest"
        ],
        legs: [
            "Brown",
            "Brown2"
        ],
        feet: [],
        hair: [],
        brows: [
            "Eyebrows",
            "Moustache"
        ],
        hide: [
            "Worker_Yellow"
        ],
        baked: false
    },
    "m-farmer": {
        body: [
            "Brown"
        ],
        bodyBottom: [
            "LightBlue"
        ],
        legs: [
            "LightBlue"
        ],
        feet: [
            "Brown",
            "Brown2"
        ],
        hair: [],
        brows: [
            "Eyebrows"
        ],
        hide: [
            "Beige"
        ],
        baked: false
    },
    "m-beach": {
        body: [
            "LightBrown"
        ],
        legs: [
            "Red_Dark"
        ],
        feet: [
            "Red_Dark"
        ],
        hair: [
            "Hair"
        ],
        brows: [
            "Eyebrows"
        ],
        baked: true
    },
    "f-casual-b": {
        body: [
            "White"
        ],
        legs: [
            "Orange"
        ],
        feet: [
            "Grey"
        ],
        hair: [
            "Hair_Blond"
        ],
        brows: [
            "Hair_Brown"
        ],
        baked: true
    },
    "f-casual-a": {
        body: [
            "LimeGreen"
        ],
        legs: [
            "LimeGreen"
        ],
        feet: [
            "Red"
        ],
        hair: [
            "Red"
        ],
        brows: [],
        baked: true
    },
    "f-suit": {
        body: [
            "Black"
        ],
        legs: [
            "Black"
        ],
        feet: [],
        hair: [
            "Hair_Blond"
        ],
        brows: [
            "Hair_Brown"
        ],
        baked: true
    },
    "f-worker": {
        body: [
            "Worker_Vest"
        ],
        legs: [
            "Brown_02",
            "Brown2"
        ],
        feet: [],
        hair: [
            "DarkBrown"
        ],
        brows: [],
        hide: [
            "Worker_Yellow"
        ],
        baked: true
    }
};
const V = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"];
/* ------------------------------ small helpers ------------------------------ */ function smoothProfile(pts, samples = 32) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SplineCurve"](pts.map(([r, y])=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](r, y))).getPoints(samples).map((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](Math.max(0.001, p.x), p.y));
}
const textureCache = new Map();
function canvasTexture(key, draw, size = 256) {
    const hit = textureCache.get(key);
    if (hit) return hit;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    draw(c.getContext("2d"), size);
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    tex.anisotropy = 4;
    textureCache.set(key, tex);
    return tex;
}
/** A bold wax-print style pattern in the wearer's colours. */ function ankaraTexture(c1, c2) {
    return canvasTexture(`ankara|${c1}|${c2}`, (g, size)=>{
        g.fillStyle = c1;
        g.fillRect(0, 0, size, size);
        const cell = 64;
        for(let i = -1; i < 5; i++){
            for(let j = -1; j < 5; j++){
                const x = i * cell + (j % 2 ? cell / 2 : 0) + cell / 2;
                const y = j * cell + cell / 2;
                const ring = (r, col)=>{
                    g.fillStyle = col;
                    g.beginPath();
                    g.arc(x, y, r, 0, Math.PI * 2);
                    g.fill();
                };
                ring(25, c2);
                ring(19, "#fdf6e3");
                ring(13, c1);
                ring(6, "#f5b301");
                g.fillStyle = "#fdf6e3";
                for(let k = 0; k < 8; k++){
                    const a = k / 8 * Math.PI * 2;
                    g.beginPath();
                    g.arc(x + Math.cos(a) * 31, y + Math.sin(a) * 31, 2.6, 0, Math.PI * 2);
                    g.fill();
                }
                g.strokeStyle = c2;
                g.lineWidth = 3;
                g.beginPath();
                g.moveTo(x - 10, y + 36);
                g.quadraticCurveTo(x, y + 28, x + 10, y + 36);
                g.stroke();
            }
        }
    });
}
/** Isi agu: gold lion-face style medallions on a dark ground. */ function isiaguTexture(ground) {
    return canvasTexture(`isiagu|${ground}`, (g, size)=>{
        g.fillStyle = ground;
        g.fillRect(0, 0, size, size);
        const gold = "#d4a017";
        const cell = 64;
        for(let i = -1; i < 5; i++){
            for(let j = -1; j < 5; j++){
                const x = i * cell + (j % 2 ? cell / 2 : 0) + cell / 2;
                const y = j * cell + cell / 2;
                g.fillStyle = gold;
                for(let k = 0; k < 8; k++){
                    const a = k / 8 * Math.PI * 2;
                    g.beginPath();
                    g.ellipse(x + Math.cos(a) * 21, y + Math.sin(a) * 21, 8, 4.5, a, 0, Math.PI * 2);
                    g.fill();
                }
                g.beginPath();
                g.arc(x, y, 14, 0, Math.PI * 2);
                g.fill();
                g.fillStyle = ground;
                g.beginPath();
                g.arc(x, y, 9, 0, Math.PI * 2);
                g.fill();
                g.fillStyle = gold;
                g.beginPath();
                g.arc(x, y, 4, 0, Math.PI * 2);
                g.fill();
            }
        }
    });
}
/** Super Eagles style: green with white wing chevrons and collar band. */ function jerseyTexture(c1, c2) {
    return canvasTexture(`jersey|${c1}|${c2}`, (g, size)=>{
        g.fillStyle = c1;
        g.fillRect(0, 0, size, size);
        g.strokeStyle = c2;
        g.lineWidth = 9;
        for (const y of [
            150,
            172,
            194
        ]){
            g.beginPath();
            for(let x = 0; x <= size; x += 32){
                g.lineTo(x, y + (x / 32 % 2 ? 14 : -14));
            }
            g.stroke();
        }
        g.fillStyle = c2;
        g.fillRect(0, 0, size, 26); // collar band (top of the shell)
    });
}
/** Woven aso-oke: stripes with gold threads. */ function asookeTexture(c1, c2) {
    return canvasTexture(`asooke|${c1}|${c2}`, (g, size)=>{
        g.fillStyle = c1;
        g.fillRect(0, 0, size, size);
        for(let x = 0; x < size; x += 32){
            g.fillStyle = c2;
            g.fillRect(x, 0, 12, size);
            g.fillStyle = "#e8c15a";
            g.fillRect(x + 16, 0, 2, size);
            g.fillRect(x + 22, 0, 1.5, size);
        }
        g.fillStyle = "rgba(255,255,255,0.18)";
        for(let y = 0; y < size; y += 8)g.fillRect(0, y, size, 1.5);
    });
}
/** Cylinder between two world points; `a` end has radius r0, `b` end has radius r1. */ function tube(a, b, r0, r1, mat) {
    const dir = a.clone().sub(b);
    const len = dir.length();
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](r0, r1, len, 18, 1, true), mat);
    mesh.quaternion.setFromUnitVectors(new V(0, 1, 0), dir.normalize());
    mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
    return mesh;
}
function dressAvatar(root, look, base) {
    const roles = ROLES[base];
    const toDispose = [];
    const std = (color, rough = 0.7, extra = {})=>{
        const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            roughness: rough,
            metalness: 0.02,
            ...extra
        });
        toDispose.push(m);
        return m;
    };
    const keep = (o)=>{
        toDispose.push(o);
        return o;
    };
    const lighten = (hex, amt)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](hex).lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ffffff"), amt).getStyle();
    const fem = look.frame === "f";
    const skin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](look.skin);
    const skinDark = skin.clone().multiplyScalar(0.82);
    const style = look.hairStyle;
    const headwear = style === "gele" || style === "turban" || style === "hijab";
    const hats = !headwear && [
        "cap",
        "fila",
        "hula",
        "igbocap"
    ].includes(look.accessory);
    const hatOk = !headwear && ![
        "afro",
        "puffs",
        "locs"
    ].includes(style);
    const wearsHat = hats && hatOk;
    // the model's own hair stays only for "Natural" with no hat; otherwise we draw hair ourselves
    const hairBaked = style === "lowcut" && roles.baked && !wearsHat;
    const dressBase = base === "f-casual-a";
    const hideLegs = look.top === "ankara" || look.top === "gown" || look.top === "asooke";
    /* 1. recolour the model's own materials */ root.traverse((o)=>{
        const m = o;
        if (!m.isSkinnedMesh) return;
        m.frustumCulled = false;
        m.castShadow = true;
        const orig = m.material;
        const mat = keep(orig.clone());
        m.material = mat;
        const found = /_(Head|Body|Legs|Feet|Pants)/.exec(m.name)?.[1];
        const part = found === "Pants" ? "Legs" : found;
        const n = orig.name;
        if (n === "Skin") {
            mat.color.copy(skin);
            mat.roughness = 0.55;
        } else if (n === "Skin_Darker") {
            mat.color.copy(skinDark);
            mat.roughness = 0.55;
        } else if (part === "Head" && roles.hide?.includes(n)) {
            m.visible = false;
        } else if (part === "Head" && roles.hair.includes(n)) {
            if (hairBaked) mat.color.set(look.hairColor);
            else m.visible = false;
        } else if (part === "Head" && roles.brows.includes(n)) {
            mat.color.set(style === "bald" ? skinDark.getStyle() : look.hairColor);
        } else if (part === "Body" && roles.body.includes(n)) {
            mat.color.set(look.topColor);
        } else if (part === "Body" && roles.bodyBottom?.includes(n)) {
            mat.color.set(look.bottomColor);
        } else if (part === "Legs" && roles.legs.includes(n)) {
            mat.color.set(dressBase ? look.topColor : look.bottomColor);
            if (hideLegs) m.visible = false; // hidden under the long wrapper or gown
        } else if (part === "Feet" && roles.feet.includes(n)) {
            mat.color.set(look.shoeColor);
        }
    });
    /* 2. overlays attached to bones */ root.updateMatrixWorld(true);
    const bone = (name)=>root.getObjectByName(name) ?? undefined;
    const wpos = (name)=>bone(name)?.getWorldPosition(new V()) ?? new V();
    const mount = (obj, boneName)=>{
        root.add(obj);
        obj.updateMatrixWorld(true);
        obj.traverse((c)=>{
            const mesh = c;
            if (mesh.isMesh) {
                mesh.castShadow = true;
                keep(mesh.geometry);
            }
        });
        bone(boneName)?.attach(obj);
    };
    const head = wpos("Head");
    const abd = wpos("Abdomen");
    const hips = wpos("Hips");
    // Measured from the models' skulls: the women's heads sit a little lower than the men's.
    const hc = new V(head.x, fem ? 1.629 : 1.681, 0.101);
    const eyeY = fem ? 0.015 : -0.026;
    const w = fem ? 0.86 : 1;
    /* ---- hair & headwear ---- */ const hairMat = std(look.hairColor, 0.88);
    const cap = (r, theta, tilt, mat = hairMat)=>{
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](r, 36, 22, 0, Math.PI * 2, 0, theta), mat);
        mesh.rotation.x = tilt;
        return mesh;
    };
    const headGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    headGroup.position.copy(hc);
    let headHasStuff = false;
    const add = (o, x = 0, y = 0, z = 0, parent = headGroup)=>{
        o.position.set(x, y, z);
        parent.add(o);
        headHasStuff = true;
    };
    const crop = ()=>add(cap(0.115, Math.PI * 0.46, -0.32), 0, 0.005, -0.012);
    // models without usable baked hair get a neat crop for "Natural"
    if (style === "lowcut" && !roles.baked && !wearsHat) crop();
    switch(style){
        case "afro":
            {
                // a full, round mass that wraps the crown and sides; the face pokes out in front of it
                const fro = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.165, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.74), hairMat);
                fro.scale.set(1.02, 0.96, 0.98);
                add(fro, 0, 0.048, -0.06);
                break;
            }
        case "puffs":
            {
                crop();
                for (const s of [
                    -1,
                    1
                ]){
                    add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.082, 28, 20), hairMat), s * 0.088, 0.125, -0.03);
                    add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.05, 0.008, 8, 20), std("#f4f4f2", 0.5)), s * 0.07, 0.085, -0.03);
                }
                break;
            }
        case "braids":
            {
                crop();
                for(let i = 0; i < 11; i++){
                    const a = -1.35 + i / 10 * 2.7;
                    const braid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.0125, 0.3, 4, 8), hairMat);
                    add(braid, Math.sin(a) * 0.1, -0.18, -Math.cos(a) * 0.09 - 0.045);
                }
                break;
            }
        case "cornrows":
            {
                const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
                g.rotation.x = -0.3;
                g.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.115, 36, 22, 0, Math.PI * 2, 0, Math.PI * 0.46), hairMat));
                const ridge = std(lighten(look.hairColor, 0.16), 0.7);
                for(let k = -3; k <= 3; k++){
                    const x = k * 0.028;
                    const r = Math.sqrt(0.118 * 0.118 - x * x);
                    const pts = [];
                    for(let a = 0.25; a <= Math.PI - 0.45; a += 0.12)pts.push(new V(x, r * Math.sin(a), r * Math.cos(a)));
                    const row = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TubeGeometry"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](pts), 28, 0.0048, 6, false), ridge);
                    g.add(row);
                }
                add(g, 0, 0.005, -0.012);
                break;
            }
        case "locs":
            {
                crop();
                for(let i = 0; i < 28; i++){
                    const a = i / 28 * Math.PI * 2;
                    if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.75) continue; // keep the face clear (front = +z at a = 0)
                    const len = 0.2 + i * 37 % 11 * 0.012;
                    const loc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.019, len, 4, 8), hairMat);
                    add(loc, Math.sin(a) * 0.106, -len / 2 + 0.02, Math.cos(a) * 0.098 - 0.025);
                }
                break;
            }
        case "twists":
            {
                crop();
                for(let i = 0; i < 24; i++){
                    const t = 0.1 + i / 24 * 0.95;
                    const phi = i * 2.399;
                    const r = 0.12;
                    const coil = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.03, 12, 10), hairMat);
                    add(coil, Math.sin(t) * Math.cos(phi) * r, Math.cos(t) * r, Math.sin(t) * Math.sin(phi) * r - 0.02);
                }
                break;
            }
        case "bun":
            {
                crop();
                add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.058, 20, 16), hairMat), 0, 0.135, -0.07);
                break;
            }
        case "gele":
            {
                const wrap = std(look.topColor, 0.45, {
                    metalness: 0.15
                });
                const wrapLight = std(lighten(look.topColor, 0.12), 0.4, {
                    metalness: 0.2
                });
                const baseWrap = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.125, 32, 20), wrap);
                baseWrap.scale.set(1.25, 0.66, 1.1);
                add(baseWrap, 0, 0.1, -0.015);
                const fan = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.12, 28, 18), wrapLight);
                fan.scale.set(1.15, 1.0, 0.26);
                fan.rotation.set(0.15, 0.35, -0.25);
                add(fan, 0.05, 0.19, 0.04);
                const fan2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.09, 24, 16), wrap);
                fan2.scale.set(1.1, 0.95, 0.3);
                fan2.rotation.set(0.2, 0.2, 0.35);
                add(fan2, -0.07, 0.17, 0.05);
                const fold = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.1, 0.022, 10, 28), wrapLight);
                fold.rotation.set(Math.PI / 2 - 0.35, 0, 0);
                fold.scale.set(0.95, 1, 1);
                add(fold, 0, 0.045, 0.0);
                break;
            }
        case "turban":
            {
                const wrap = std(look.topColor, 0.55, {
                    metalness: 0.05
                });
                const wrapLight = std(lighten(look.topColor, 0.18), 0.5);
                const dome = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.125, 32, 20), wrap);
                dome.scale.set(1.08, 0.8, 1.12);
                add(dome, 0, 0.075, -0.012);
                for(let j = 0; j < 3; j++){
                    const band = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.112 - j * 0.004, 0.03, 12, 32), j % 2 ? wrapLight : wrap);
                    band.rotation.set(Math.PI / 2 - 0.18 - j * 0.1, 0, j % 2 ? 0.12 : -0.12);
                    band.scale.set(1.04, 1.06, 1);
                    add(band, 0, 0.03 + j * 0.036, -0.01);
                }
                const knot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.04, 16, 12), wrapLight);
                add(knot, 0.07, 0.15, 0.03);
                break;
            }
        case "hijab":
            {
                const veil = std(look.topColor, 0.62, {
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
                });
                const crown = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.128, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.86), veil);
                crown.scale.set(1.02, 1.1, 1.06);
                add(crown, 0, 0.0, -0.036);
                const drape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LatheGeometry"](smoothProfile([
                    [
                        0.235,
                        -0.4
                    ],
                    [
                        0.2,
                        -0.3
                    ],
                    [
                        0.15,
                        -0.21
                    ],
                    [
                        0.118,
                        -0.16
                    ]
                ], 20), 36), veil);
                drape.scale.set(1, 1, 0.9);
                add(drape, 0, 0, -0.02);
                break;
            }
        default:
            break;
    }
    if (!headwear) {
        switch(look.accessory){
            case "glasses":
            case "sunglasses":
                {
                    const frame = std("#1c1917", 0.35);
                    for (const s of [
                        -1,
                        1
                    ]){
                        const lens = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.03, 0.0026, 8, 28), frame);
                        add(lens, s * 0.04, eyeY, 0.121);
                        if (look.accessory === "sunglasses") {
                            const shade = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CircleGeometry"](0.03, 24), std("#0b0b0c", 0.15, {
                                metalness: 0.4
                            }));
                            add(shade, s * 0.04, eyeY, 0.122);
                        }
                        const arm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.0026, 0.12, 3, 6), frame);
                        arm.rotation.x = Math.PI / 2;
                        add(arm, s * 0.098, eyeY, 0.06);
                    }
                    const bridge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.0026, 0.026, 3, 6), frame);
                    bridge.rotation.z = Math.PI / 2;
                    add(bridge, 0, eyeY + 0.006, 0.122);
                    break;
                }
            case "cap":
                if (hatOk) {
                    const capMat = std(look.topColor, 0.7);
                    add(cap(0.125, Math.PI * 0.5, -0.18, capMat), 0, 0.012, -0.012);
                    const brim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.1, 0.1, 0.012, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9), capMat);
                    brim.scale.set(1, 1, 1.15);
                    brim.rotation.set(0.1, 0, 0);
                    add(brim, 0, 0.065, 0.1);
                }
                break;
            case "fila":
                if (hatOk) {
                    const filaMat = std(look.topColor, 0.8);
                    const hat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.115, 0.098, 0.15, 32), filaMat);
                    hat.rotation.x = -0.28;
                    add(hat, 0, 0.115, -0.03);
                    const band = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.1, 0.008, 8, 28), std("#f5d98a", 0.5, {
                        metalness: 0.4
                    }));
                    band.rotation.x = Math.PI / 2 - 0.28;
                    add(band, 0, 0.065, 0.0);
                }
                break;
            case "hula":
                if (hatOk) {
                    const kube = std(look.topColor, 0.75);
                    const goldM = std("#e8c15a", 0.4, {
                        metalness: 0.4
                    });
                    const hat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.092, 0.104, 0.13, 32), kube);
                    hat.rotation.x = -0.12;
                    add(hat, 0, 0.1, -0.012);
                    const bandLow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.103, 0.008, 8, 32), goldM);
                    bandLow.rotation.x = Math.PI / 2 - 0.12;
                    add(bandLow, 0, 0.045, -0.01);
                    const bandTop = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.09, 0.006, 8, 32), goldM);
                    bandTop.rotation.x = Math.PI / 2 - 0.12;
                    add(bandTop, 0, 0.158, -0.02);
                }
                break;
            case "igbocap":
                if (hatOk) {
                    const red = std("#b91c1c", 0.7);
                    const hat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.1, 0.108, 0.1, 32), red);
                    hat.rotation.set(-0.1, 0, 0.1);
                    add(hat, 0, 0.085, -0.012);
                    const bandLow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.107, 0.012, 8, 32), std("#111111", 0.6));
                    bandLow.rotation.set(Math.PI / 2 - 0.1, 0, 0.1);
                    add(bandLow, 0, 0.04, -0.01);
                    const feather = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.007, 0.17, 4, 8), std("#fafafa", 0.6));
                    feather.rotation.z = -0.9;
                    add(feather, 0.115, 0.16, -0.01);
                    const tip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.01, 8, 6), std("#b91c1c", 0.6));
                    add(tip, 0.17, 0.215, -0.01);
                }
                break;
            default:
                break;
        }
    }
    if (headHasStuff) mount(headGroup, "Head");
    /* ---- outfits ---- */ const trim = lighten(look.topColor, 0.55);
    const gold = std("#e8c15a", 0.4, {
        metalness: 0.45
    });
    const sleeve = (side, r0, r1, r2, mat)=>{
        const a = wpos("UpperArm" + side);
        const b = wpos("LowerArm" + side);
        const c = wpos("Wrist" + side);
        mount(tube(a.clone().add(new V(side === "L" ? -0.01 : 0.01, 0.03, 0)), b, r0, r1, mat), "UpperArm" + side);
        mount(tube(b, c, r1, r2, mat), "LowerArm" + side);
    };
    const capSleeve = (side, r0, r1, frac, mat)=>{
        const a = wpos("UpperArm" + side);
        const b = wpos("LowerArm" + side);
        const mid = a.clone().lerp(b, frac);
        mount(tube(a.clone().add(new V(side === "L" ? -0.005 : 0.005, 0.03, 0)), mid, r0, r1, mat), "UpperArm" + side);
    };
    const shell = (pts, mat, scaleZ, seg = 44)=>{
        const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LatheGeometry"](smoothProfile(pts, 40), seg), mat);
        m.scale.set(1, 1, scaleZ);
        return m;
    };
    const neckTop = [
        [
            0.085,
            1.465
        ],
        [
            0.062,
            1.49
        ]
    ];
    const place = (g, boneName, at, dz = 0.02)=>{
        g.position.set(at.x, 0, at.z + dz);
        mount(g, boneName);
    };
    if (look.top === "senator") {
        const cloth = std(look.topColor, 0.62);
        const trimMat = std(trim, 0.5, {
            metalness: 0.1
        });
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.215 * w,
                0.62
            ],
            [
                0.2 * w,
                0.78
            ],
            [
                0.178 * w,
                0.95
            ],
            [
                0.172 * w,
                1.08
            ],
            [
                0.19 * w,
                1.24
            ],
            [
                0.205 * w,
                1.34
            ],
            [
                0.17 * w,
                1.42
            ],
            ...neckTop
        ], cloth, 0.78, 40));
        const placket = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.022, 0.5, 0.01), trimMat);
        placket.position.set(0, 1.18, 0.158 * 0.78);
        g.add(placket);
        for (const y of [
            1.36,
            1.28,
            1.2
        ]){
            const btn = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.01, 10, 8), trimMat);
            btn.position.set(0, y, 0.161 * 0.78);
            g.add(btn);
        }
        const collar = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.066, 0.075, 0.04, 22, 1, true), cloth);
        collar.position.set(0, 1.5, 0);
        g.add(collar);
        place(g, "Abdomen", abd);
        sleeve("L", 0.068, 0.06, 0.05, cloth);
        sleeve("R", 0.068, 0.06, 0.05, cloth);
    }
    if (look.top === "buba") {
        const cloth = std(look.topColor, 0.62);
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.24 * w,
                0.72
            ],
            [
                0.215 * w,
                0.88
            ],
            [
                0.19 * w,
                1.06
            ],
            [
                0.2 * w,
                1.24
            ],
            [
                0.21 * w,
                1.34
            ],
            [
                0.17 * w,
                1.42
            ],
            ...neckTop
        ], cloth, 0.8, 40));
        const hem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.24 * w, 0.011, 8, 40), gold);
        hem.rotation.x = Math.PI / 2;
        hem.scale.set(1, 0.8, 1);
        hem.position.y = 0.73;
        g.add(hem);
        const vneck = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.075, 0.011, 8, 20, Math.PI), gold);
        vneck.rotation.set(Math.PI / 2 - 0.5, 0, 0);
        vneck.position.set(0, 1.455, 0.06);
        g.add(vneck);
        place(g, "Abdomen", abd);
        sleeve("L", 0.085, 0.115, 0.13, cloth);
        sleeve("R", 0.085, 0.115, 0.13, cloth);
    }
    if (look.top === "babariga") {
        const cloth = std(look.topColor, 0.6, {
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.36 * w,
                0.12
            ],
            [
                0.33 * w,
                0.4
            ],
            [
                0.29 * w,
                0.7
            ],
            [
                0.255 * w,
                1.0
            ],
            [
                0.235 * w,
                1.2
            ],
            [
                0.22 * w,
                1.33
            ],
            [
                0.175 * w,
                1.42
            ],
            ...neckTop
        ], cloth, 0.82, 44));
        const hem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.36 * w, 0.012, 8, 44), gold);
        hem.rotation.x = Math.PI / 2;
        hem.scale.set(1, 0.82, 1);
        hem.position.y = 0.13;
        g.add(hem);
        const neck = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.08, 0.014, 8, 22, Math.PI), gold);
        neck.rotation.set(Math.PI / 2 - 0.5, 0, 0);
        neck.position.set(0, 1.455, 0.06);
        g.add(neck);
        const pocket = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        for (const [px, py, sx, sy] of [
            [
                0,
                0.06,
                0.12,
                0.012
            ],
            [
                0,
                -0.06,
                0.12,
                0.012
            ],
            [
                -0.06,
                0,
                0.012,
                0.12
            ],
            [
                0.06,
                0,
                0.012,
                0.12
            ]
        ]){
            const bar = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](sx, sy, 0.008), gold);
            bar.position.set(px, py, 0);
            pocket.add(bar);
        }
        pocket.position.set(0.09 * w, 1.22, 0.205 * 0.82 * w + 0.015);
        g.add(pocket);
        const placket = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.02, 0.62, 0.008), gold);
        placket.position.set(0, 1.08, 0.24 * 0.82 * w);
        g.add(placket);
        place(g, "Abdomen", abd);
        sleeve("L", 0.095, 0.13, 0.14, cloth);
        sleeve("R", 0.095, 0.13, 0.14, cloth);
    }
    if (look.top === "isiagu") {
        const print = isiaguTexture(look.topColor);
        print.repeat.set(4, 2);
        const cloth = std("#ffffff", 0.62, {
            map: print,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.2 * w,
                0.8
            ],
            [
                0.19 * w,
                0.92
            ],
            [
                0.172 * w,
                1.06
            ],
            [
                0.185 * w,
                1.22
            ],
            [
                0.2 * w,
                1.33
            ],
            [
                0.17 * w,
                1.42
            ],
            ...neckTop
        ], cloth, 0.76, 40));
        const collar = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.068, 0.014, 8, 22), gold);
        collar.rotation.x = Math.PI / 2;
        collar.position.set(0, 1.49, 0);
        g.add(collar);
        place(g, "Abdomen", abd);
        capSleeve("L", 0.085, 0.1, 1.0, cloth);
        capSleeve("R", 0.085, 0.1, 1.0, cloth);
    }
    if (look.top === "jersey") {
        const print = jerseyTexture(look.topColor, "#fafafa");
        const cloth = std("#ffffff", 0.7, {
            map: print,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.172 * w,
                0.84
            ],
            [
                0.168 * w,
                0.95
            ],
            [
                0.174 * w,
                1.08
            ],
            [
                0.19 * w,
                1.22
            ],
            [
                0.205 * w,
                1.33
            ],
            [
                0.172 * w,
                1.42
            ],
            ...neckTop
        ], cloth, 0.74, 40));
        place(g, "Abdomen", abd);
        const white = std("#fafafa", 0.6);
        capSleeve("L", 0.066, 0.072, 0.6, white);
        capSleeve("R", 0.066, 0.072, 0.6, white);
    }
    if (look.top === "agbada") {
        const cloth = std(look.topColor, 0.6, {
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const inner = std(lighten(look.topColor, 0.65), 0.6);
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.43 * w,
                0.3
            ],
            [
                0.39 * w,
                0.5
            ],
            [
                0.33 * w,
                0.75
            ],
            [
                0.28 * w,
                1.0
            ],
            [
                0.25 * w,
                1.2
            ],
            [
                0.235 * w,
                1.34
            ],
            [
                0.18 * w,
                1.42
            ],
            ...neckTop
        ], cloth, 0.86, 44));
        const hem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.43 * w, 0.012, 8, 44), gold);
        hem.rotation.x = Math.PI / 2;
        hem.scale.set(1, 0.86, 1);
        hem.position.y = 0.3;
        g.add(hem);
        const front = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.16, 0.55, 0.01), inner);
        front.position.set(0, 1.12, 0.29 * 0.86 * w);
        g.add(front);
        const collar = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.08, 0.018, 8, 22, Math.PI), gold);
        collar.rotation.set(Math.PI / 2 - 0.5, 0, 0);
        collar.position.set(0, 1.455, 0.05);
        g.add(collar);
        place(g, "Abdomen", abd);
        sleeve("L", 0.09, 0.14, 0.16, cloth);
        sleeve("R", 0.09, 0.14, 0.16, cloth);
    }
    /** Long wrapper skirt for iro & buba / aso-oke. */ const iro = (print)=>{
        print.repeat.set(5, 2);
        const wrap = std("#ffffff", 0.65, {
            map: print,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        const skirt = shell([
            [
                0.31,
                0.16
            ],
            [
                0.255,
                0.4
            ],
            [
                0.195,
                0.66
            ],
            [
                0.15,
                0.88
            ],
            [
                0.128,
                1.0
            ]
        ], wrap, 0.86, 40);
        g.add(skirt);
        const sash = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](0.13, 0.016, 8, 30), std(look.topColor, 0.5));
        sash.rotation.x = Math.PI / 2;
        sash.scale.set(1.0, 0.86, 1);
        sash.position.y = 0.99;
        g.add(sash);
        g.position.set(hips.x, 0, hips.z + 0.01);
        mount(g, "Hips");
        capSleeve("L", 0.06, 0.07, 0.62, wrap);
        capSleeve("R", 0.06, 0.07, 0.62, wrap);
    };
    if (look.top === "ankara") iro(ankaraTexture(look.topColor, look.bottomColor));
    if (look.top === "asooke") {
        iro(asookeTexture(look.topColor, look.bottomColor));
        // ipele: a shawl worn diagonally from one shoulder to the opposite hip
        const sash = std(look.bottomColor, 0.5, {
            metalness: 0.1
        });
        const a = wpos("UpperArmL").add(new V(-0.02, 0.05, 0.11));
        const b = hips.clone().add(new V(-0.14, 0.12, 0.1));
        const dir = a.clone().sub(b);
        const strip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.115, dir.length(), 0.014), sash);
        strip.quaternion.setFromUnitVectors(new V(0, 1, 0), dir.clone().normalize());
        strip.position.copy(a.clone().add(b).multiplyScalar(0.5));
        mount(strip, "Chest");
        const edge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.012, dir.length(), 0.016), gold);
        edge.quaternion.copy(strip.quaternion);
        edge.position.copy(strip.position);
        mount(edge, "Chest");
    }
    if (look.top === "gown") {
        const print = ankaraTexture(look.topColor, look.bottomColor);
        print.repeat.set(4, 3);
        const cloth = std("#ffffff", 0.62, {
            map: print,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        g.add(shell([
            [
                0.3,
                0.08
            ],
            [
                0.235,
                0.3
            ],
            [
                0.17,
                0.55
            ],
            [
                0.155,
                0.75
            ],
            [
                0.148,
                0.9
            ],
            [
                0.138,
                1.05
            ],
            [
                0.152,
                1.2
            ],
            [
                0.158,
                1.32
            ],
            [
                0.14,
                1.4
            ],
            [
                0.085,
                1.46
            ],
            [
                0.06,
                1.49
            ]
        ], cloth, 0.82, 40));
        place(g, "Abdomen", abd);
        capSleeve("L", 0.06, 0.07, 0.55, cloth);
        capSleeve("R", 0.06, 0.07, 0.55, cloth);
    }
    return {
        dispose: ()=>toDispose.forEach((d)=>d.dispose())
    };
}
}),
"[project]/src/components/ui/ChatDock.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatDock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.mjs [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/net.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function ChatDock() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time value", "undefined") !== "undefined" && window.innerWidth >= 640);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const atPlace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.atPlace);
    const chat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.chat);
    const muted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.muted);
    const [menu, setMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const interior = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior);
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roomOf"])(atPlace, interior);
    const label = interior ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rt"].layout?.name : atPlace ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].find((p)=>p.id === atPlace)?.name : "The streets";
    const msgs = chat.filter((m)=>m.room === room && !(m.fromPid && muted.includes(m.fromPid))).slice(-40);
    const end = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        end.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [
        msgs.length,
        open
    ]);
    const submit = (e)=>{
        e.preventDefault();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].chat(text);
        setText("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-3 left-3 z-10 sm:bottom-5 sm:left-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            initial: false,
            children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 16,
                    scale: 0.97
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                exit: {
                    opacity: 0,
                    y: 16,
                    scale: 0.97
                },
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 26
                },
                className: "flex h-64 w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white/88 shadow-xl ring-1 ring-black/5 backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-stone-100 px-4 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-stone-900",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/ChatDock.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-stone-400",
                                        children: "Chat with everyone here"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/ChatDock.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/ChatDock.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen(false),
                                "aria-label": "Hide chat",
                                className: "rounded-full p-1 text-stone-400 hover:bg-stone-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                    lineNumber: 52,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ChatDock.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/ChatDock.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-1.5 overflow-y-auto px-4 py-2.5 text-[13px]",
                        children: [
                            msgs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "pt-6 text-center text-xs text-stone-400",
                                children: "No one has said anything yet. Say hello 👋"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ChatDock.tsx",
                                lineNumber: 56,
                                columnNumber: 37
                            }, this),
                            msgs.map((m)=>{
                                const canModerate = !m.self && !m.npc && !!m.fromId;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "leading-snug",
                                            children: [
                                                canModerate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setMenu(menu === m.id ? null : m.id),
                                                    className: "font-semibold text-indigo-600 hover:underline",
                                                    children: m.from
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-semibold ${m.self ? "text-emerald-700" : "text-stone-400"}`,
                                                    children: m.from
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-stone-700",
                                                    children: [
                                                        " ",
                                                        m.text
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/ChatDock.tsx",
                                            lineNumber: 61,
                                            columnNumber: 21
                                        }, this),
                                        menu === m.id && canModerate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1 flex gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (m.fromPid) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().mute(m.fromPid);
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast(`Muted ${m.from}`, "info");
                                                        setMenu(null);
                                                    },
                                                    className: "rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-600 transition hover:bg-stone-200",
                                                    children: "Mute"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].report(m.fromId, m.text.slice(0, 80));
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast("Reported. Thanks for keeping Ibadan friendly.", "info");
                                                        setMenu(null);
                                                    },
                                                    className: "rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-100",
                                                    children: "Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/ChatDock.tsx",
                                            lineNumber: 72,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, m.id, true, {
                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                    lineNumber: 60,
                                    columnNumber: 19
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: end
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ChatDock.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/ChatDock.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: submit,
                        className: "flex gap-2 border-t border-stone-100 p-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: text,
                                onChange: (e)=>setText(e.target.value),
                                maxLength: 200,
                                placeholder: "Say something…",
                                className: "min-w-0 flex-1 rounded-full bg-stone-100 px-4 py-2 text-sm outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-emerald-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ChatDock.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                "aria-label": "Send",
                                className: "grid size-9 place-items-center rounded-full bg-emerald-700 text-white transition active:scale-90 disabled:opacity-40",
                                disabled: !text.trim(),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ChatDock.tsx",
                                    lineNumber: 109,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ChatDock.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/ChatDock.tsx",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this)
                ]
            }, "open", true, {
                fileName: "[project]/src/components/ui/ChatDock.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].button, {
                initial: {
                    opacity: 0,
                    scale: 0.9
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                exit: {
                    opacity: 0,
                    scale: 0.9
                },
                onClick: ()=>setOpen(true),
                className: "flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ChatDock.tsx",
                        lineNumber: 122,
                        columnNumber: 13
                    }, this),
                    " Chat"
                ]
            }, "closed", true, {
                fileName: "[project]/src/components/ui/ChatDock.tsx",
                lineNumber: 114,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/ChatDock.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ChatDock.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Floating.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hint",
    ()=>Hint,
    "IncomingCall",
    ()=>IncomingCall,
    "Toasts",
    ()=>Toasts,
    "VoiceBar",
    ()=>VoiceBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-off.mjs [app-ssr] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/net.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/voice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/parts.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function roomLabel(room) {
    if (room.startsWith("place:")) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].find((p)=>p.id === room.slice(6))?.name ?? "Voice room";
    if (room.startsWith("home:")) return "House party";
    return "Call";
}
function VoiceBar() {
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.voice);
    const call = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.call);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: v.room && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 24,
                scale: 0.95
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: 24,
                scale: 0.95
            },
            className: "absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-stone-900/92 py-2 pl-4 pr-2 text-white shadow-2xl backdrop-blur-xl sm:bottom-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative flex size-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Floating.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative inline-flex size-2.5 rounded-full bg-emerald-500"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Floating.tsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-semibold",
                    children: call.phase === "live" ? `On a call with ${call.peerName}` : roomLabel(v.room)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-1 text-xs text-stone-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "size-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Floating.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this),
                        " ",
                        v.peers.length + 1
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 34,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MuteButton"], {}, void 0, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>call.phase !== "idle" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].hangup() : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].leave(),
                    className: "grid size-9 place-items-center rounded-full bg-rose-600 transition active:scale-90",
                    "aria-label": "Leave voice",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Floating.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Floating.tsx",
            lineNumber: 23,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Floating.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
function IncomingCall() {
    const inc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.incoming);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: inc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -30,
                scale: 0.95
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: -30
            },
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            },
            className: "absolute left-1/2 top-4 z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-3xl bg-stone-900 p-3 pr-3.5 text-white shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].span, {
                    animate: {
                        scale: [
                            1,
                            1.1,
                            1
                        ]
                    },
                    transition: {
                        repeat: Infinity,
                        duration: 1.2
                    },
                    className: "grid size-12 place-items-center rounded-full bg-emerald-500 text-lg font-bold",
                    children: inc.name.slice(0, 1).toUpperCase()
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "truncate text-sm font-bold",
                            children: inc.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Floating.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-stone-400",
                            children: "Incoming voice call…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Floating.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].answer(false),
                    className: "grid size-11 place-items-center rounded-full bg-rose-600 transition active:scale-90",
                    "aria-label": "Decline",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                        className: "size-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Floating.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].answer(true),
                    className: "grid size-11 place-items-center rounded-full bg-emerald-500 transition active:scale-90",
                    "aria-label": "Answer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                        className: "size-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Floating.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Floating.tsx",
            lineNumber: 56,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Floating.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
function Toasts() {
    const toasts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.toasts);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute left-1/2 top-4 z-40 flex -translate-x-1/2 flex-col items-center gap-2 max-sm:top-auto max-sm:bottom-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    layout: true,
                    initial: {
                        opacity: 0,
                        y: -14,
                        scale: 0.95
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: -8,
                        scale: 0.95
                    },
                    className: `rounded-full px-4 py-2 text-sm font-semibold shadow-xl ring-1 ${t.tone === "good" ? "bg-emerald-600 text-white ring-emerald-700" : t.tone === "bad" ? "bg-rose-600 text-white ring-rose-700" : "bg-stone-900 text-white ring-black"}`,
                    children: t.text
                }, t.id, false, {
                    fileName: "[project]/src/components/ui/Floating.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Floating.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Floating.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function Hint() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute bottom-5 right-5 z-10 hidden items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-stone-500 ring-1 ring-black/5 backdrop-blur-xl lg:flex",
        children: "Click to walk · WASD · drag to rotate · scroll to zoom"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Floating.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Hud.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drumstick$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drumstick$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/drumstick.mjs [app-ssr] (ecmascript) <export default as Drumstick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/door-open.mjs [app-ssr] (ecmascript) <export default as DoorOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-ssr] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-checks.mjs [app-ssr] (ecmascript) <export default as ListChecks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$party$2d$popper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PartyPopper$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/party-popper.mjs [app-ssr] (ecmascript) <export default as PartyPopper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.mjs [app-ssr] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.mjs [app-ssr] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap-off.mjs [app-ssr] (ecmascript) <export default as ZapOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi.mjs [app-ssr] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi-off.mjs [app-ssr] (ecmascript) <export default as WifiOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/titles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quests.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const NEEDS = [
    {
        key: "hunger",
        label: "Hunger",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drumstick$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drumstick$3e$__["Drumstick"],
        color: "bg-orange-500"
    },
    {
        key: "energy",
        label: "Energy",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        color: "bg-amber-400"
    },
    {
        key: "fun",
        label: "Fun",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$party$2d$popper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PartyPopper$3e$__["PartyPopper"],
        color: "bg-fuchsia-500"
    },
    {
        key: "social",
        label: "Social",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        color: "bg-sky-500"
    }
];
function Hud() {
    const needs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.needs);
    const money = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.money);
    const rep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.rep);
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile);
    const net = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.net);
    const online = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.online);
    const call = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.call.phase);
    const questsDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.questsDone);
    const inside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>!!s.interior);
    const setSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.setSheet);
    const { minutes, hour, day, nepa } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClock"])();
    const title = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLES"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(rep)];
    const nextQuest = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"].find((q)=>!questsDone.includes(q.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -16
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 22
                },
                className: "absolute left-3 top-3 z-10 w-[min(21rem,calc(100vw-5.5rem))] sm:w-[21rem] rounded-3xl bg-white/85 p-3.5 shadow-xl ring-1 ring-black/5 backdrop-blur-xl sm:left-5 sm:top-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSheet("profile"),
                                className: "flex min-w-0 items-center gap-2.5 text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grid size-9 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Hud.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block truncate text-sm font-bold leading-tight text-stone-900",
                                                children: profile?.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Hud.tsx",
                                                lineNumber: 49,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block truncate text-[11px] font-semibold text-amber-600",
                                                children: title.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Hud.tsx",
                                                lineNumber: 50,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base font-extrabold tabular-nums leading-tight text-stone-900",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(money)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] font-medium text-stone-400",
                                        children: [
                                            rep,
                                            " rep"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-2",
                        children: NEEDS.map(({ key, label, icon: Icon, color })=>{
                            const v = needs[key];
                            const low = v < 25;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                title: label,
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: `size-3.5 shrink-0 ${low ? "text-red-500" : "text-stone-400"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 flex-1 overflow-hidden rounded-full bg-stone-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                                            className: `h-full rounded-full ${low ? "bg-red-500" : color}`,
                                            animate: {
                                                width: `${v}%`
                                            },
                                            transition: {
                                                duration: 0.6,
                                                ease: "easeOut"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Hud.tsx",
                                            lineNumber: 67,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 text-xs font-medium text-stone-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    day > 0.5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                        className: "size-3.5 text-amber-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 76,
                                        columnNumber: 26
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                        className: "size-3.5 text-indigo-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 76,
                                        columnNumber: 72
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatClock"])(minutes),
                                    " · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["periodLabel"])(hour)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    net === "online" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                                        className: "size-3.5 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 80,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                                        className: "size-3.5 text-stone-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Hud.tsx",
                                        lineNumber: 80,
                                        columnNumber: 82
                                    }, this),
                                    net === "online" ? `${online} online` : net === "connecting" ? "connecting…" : "offline"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    nextQuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSheet("quests"),
                        className: "mt-2.5 flex w-full items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 text-left text-xs font-semibold text-amber-800 ring-1 ring-amber-100 transition hover:bg-amber-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                className: "size-3.5 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: [
                                    "Next goal: ",
                                    nextQuest.title
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    nepa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            height: 0
                        },
                        animate: {
                            opacity: 1,
                            height: "auto"
                        },
                        className: "mt-2.5 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__["ZapOff"], {
                                className: "size-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            " NEPA took light. Sleep restores half."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Hud.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -16
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 22
                },
                className: "absolute right-3 top-3 z-10 flex flex-col gap-2 sm:right-5 sm:top-5 sm:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>inside ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exitInterior"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enterInterior"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["homeRef"])()),
                        className: "grid size-11 place-items-center rounded-2xl bg-amber-500 text-white shadow-xl ring-1 ring-black/5 transition hover:bg-amber-600 active:scale-95",
                        "aria-label": inside ? "Leave the building" : "Go home",
                        title: inside ? "Leave" : "Go home",
                        children: inside ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Hud.tsx",
                            lineNumber: 118,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__["House"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Hud.tsx",
                            lineNumber: 118,
                            columnNumber: 55
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSheet("phone"),
                        className: "relative grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95",
                        "aria-label": "Phone",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            call !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute right-1.5 top-1.5 size-2.5 animate-pulse rounded-full bg-emerald-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Hud.tsx",
                                lineNumber: 126,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSheet("quests"),
                        className: "relative grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95",
                        "aria-label": "Goals",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Hud.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSheet("profile"),
                        className: "grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95",
                        "aria-label": "Profile",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Hud.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Hud.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Hud.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Hud.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/InteriorPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InteriorPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/door-open.mjs [app-ssr] (ecmascript) <export default as DoorOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.mjs [app-ssr] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap-off.mjs [app-ssr] (ecmascript) <export default as ZapOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/parts.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function InteriorPanel() {
    const interior = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior);
    const busy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.busy);
    const generatorUntil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.generatorUntil);
    const plots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.plots);
    const { now } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClock"])();
    const layout = interior ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rt"].layout : null;
    if (!interior || !layout) return null;
    const place = interior.kind === "place" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].find((p)=>p.id === interior.id) : undefined;
    const plot = interior.kind === "home" && interior.id !== "flat" ? plots[interior.id] : undefined;
    const power = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["powerOn"])();
    const genLeft = Math.max(0, Math.ceil((generatorUntil - now) / 1000));
    const genIndex = layout.items.findIndex((it)=>it.kind === "generator");
    const subtitle = place ? `${place.kind} · ${place.district}` : interior.id === "flat" ? "Your rented room and parlour" : plot ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["plotById"])(interior.id)?.district} · ${plot.ownerName}` : "Home";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid size-12 place-items-center rounded-2xl bg-amber-100 text-2xl",
                                children: place?.emoji ?? "🏠"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold leading-tight text-stone-900",
                                        children: layout.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold text-amber-700 first-letter:uppercase",
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exitInterior"],
                        className: "flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-stone-700 active:scale-95",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"], {
                                className: "size-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            " Leave"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 ${power ? "bg-emerald-50 ring-emerald-100" : "bg-amber-50 ring-amber-200"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            power ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                className: "size-4 text-emerald-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                lineNumber: 51,
                                columnNumber: 20
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__["ZapOff"], {
                                className: "size-4 text-amber-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                lineNumber: 51,
                                columnNumber: 72
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-sm font-semibold ${power ? "text-emerald-800" : "text-amber-800"}`,
                                        children: power ? "Light is on" : "NEPA took light"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-stone-500",
                                        children: genLeft > 0 ? `Generator running · ${Math.floor(genLeft / 60)}:${String(genLeft % 60).padStart(2, "0")} left` : power ? "Fans, TV and fridge work" : "TV, fridge and fans are off"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    !power && genIndex >= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkToFurn"])(genIndex),
                        className: "rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600 active:scale-95",
                        children: [
                            "Gen · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GENERATOR_FUEL"])
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 overflow-hidden rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-emerald-800",
                        children: [
                            busy.label,
                            "…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                            className: "h-full rounded-full bg-emerald-500",
                            initial: {
                                width: 0
                            },
                            animate: {
                                width: "100%"
                            },
                            transition: {
                                duration: busy.secs,
                                ease: "linear"
                            }
                        }, busy.start, false, {
                            fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 hidden text-sm text-stone-600 sm:block",
                children: "Tap furniture to use it: sofas and chairs to relax, beds to sleep, the stove to cook, the TV for a show."
            }, void 0, false, {
                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            place && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                children: place.actions.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionRow"], {
                            a: a,
                            enabled: !busy,
                            onRun: ()=>{
                                const err = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().runAction(a);
                                if (err) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast(err, "bad");
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                            lineNumber: 81,
                            columnNumber: 15
                        }, this)
                    }, a.id, false, {
                        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRoomCard"], {
                    room: place ? `place:${place.id}` : `home:${interior.id}`,
                    label: place ? `${place.name} voice` : "House party voice"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/InteriorPanel.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/InteriorPanel.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Minimap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Minimap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const SIZE = 148;
const SCALE = 2.6; // pixels per world unit
const ROADS = [
    -20,
    -10,
    0,
    10,
    20
];
/** Rotation that puts the camera's forward direction at the top of the minimap. */ const rotation = ()=>-Math.PI / 2 - Math.atan2(-Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].az), -Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].az));
function Minimap() {
    const inside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>!!s.interior);
    if (inside) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MinimapCanvas, {}, void 0, false, {
        fileName: "[project]/src/components/ui/Minimap.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
function MinimapCanvas() {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = ref.current;
        if (!canvas) return;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = SIZE * dpr;
        canvas.height = SIZE * dpr;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let raf = 0;
        let last = 0;
        const draw = (t)=>{
            raf = requestAnimationFrame(draw);
            if (t - last < 80) return;
            last = t;
            const phi = rotation();
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, SIZE, SIZE);
            ctx.save();
            ctx.beginPath();
            ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, Math.PI * 2);
            ctx.clip();
            ctx.fillStyle = "#e6eee0";
            ctx.fillRect(0, 0, SIZE, SIZE);
            ctx.translate(SIZE / 2, SIZE / 2);
            ctx.rotate(phi);
            ctx.scale(SCALE, SCALE);
            ctx.translate(-__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, -__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z);
            ctx.strokeStyle = "#b8bec7";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            for (const r of ROADS){
                ctx.moveTo(r, -26);
                ctx.lineTo(r, 26);
                ctx.moveTo(-26, r);
                ctx.lineTo(26, r);
            }
            ctx.stroke();
            for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOTS"]){
                const owned = st.plots[p.id];
                ctx.fillStyle = owned ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorFor"])(owned.ownerId) : "#a8dcb9";
                ctx.fillRect(p.pos[0] - 1.2, p.pos[1] - 1.2, 2.4, 2.4);
            }
            for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"]){
                ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KIND_COLORS"][p.kind];
                ctx.beginPath();
                ctx.arc(p.pos[0], p.pos[1], 1.55, 0, Math.PI * 2);
                ctx.fill();
                if (st.atPlace === p.id || st.selected?.type === "place" && st.selected.id === p.id) {
                    ctx.strokeStyle = "#f59e0b";
                    ctx.lineWidth = 0.55;
                    ctx.stroke();
                }
            }
            ctx.fillStyle = "#6366f1";
            for (const r of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].values()){
                ctx.beginPath();
                ctx.arc(r.x, r.z, 1.1, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            // you, always at the centre, pointing the way you face
            ctx.save();
            ctx.translate(SIZE / 2, SIZE / 2);
            ctx.rotate(Math.atan2(Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry), Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry)) + phi);
            ctx.fillStyle = "#059669";
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(7, 0);
            ctx.lineTo(-4.5, 4.2);
            ctx.lineTo(-4.5, -4.2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        };
        raf = requestAnimationFrame(draw);
        return ()=>cancelAnimationFrame(raf);
    }, []);
    const onClick = (e)=>{
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - rect.left - SIZE / 2;
        const dy = e.clientY - rect.top - SIZE / 2;
        const phi = rotation();
        const x = dx * Math.cos(phi) + dy * Math.sin(phi);
        const z = -dx * Math.sin(phi) + dy * Math.cos(phi);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().select(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkTo"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x + x / SCALE, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z + z / SCALE);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-3 right-3 z-10 rounded-full bg-white/80 p-1 shadow-xl ring-1 ring-black/5 backdrop-blur-xl max-sm:bottom-[4.5rem] sm:bottom-14 sm:right-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: ref,
            onClick: onClick,
            style: {
                width: SIZE,
                height: SIZE
            },
            className: "cursor-pointer rounded-full",
            "aria-label": "Minimap, click to walk"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Minimap.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Minimap.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/PlacePanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SidePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/door-open.mjs [app-ssr] (ecmascript) <export default as DoorOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/footprints.mjs [app-ssr] (ecmascript) <export default as Footprints>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/parts.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PlotPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PlotPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$InteriorPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/InteriorPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/layouts.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function PlaceBody({ id }) {
    const place = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].find((p)=>p.id === id);
    const at = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.atPlace === id);
    const busy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.busy);
    const select = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.select);
    const color = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KIND_COLORS"][place.kind];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid size-12 place-items-center rounded-2xl text-2xl",
                                style: {
                                    background: `${color}22`
                                },
                                children: place.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold leading-tight text-stone-900",
                                        children: place.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold capitalize",
                                        style: {
                                            color
                                        },
                                        children: [
                                            place.kind,
                                            " · ",
                                            place.district
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>select(null),
                        "aria-label": "Close",
                        className: "rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlacePanel.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm text-stone-600",
                children: place.blurb
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            !at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-[1fr_auto] gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkToPlace"])(id),
                        className: "flex items-center justify-center gap-2 rounded-2xl bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.98]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__["Footprints"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            " Walk here"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rideToPlace"])(id),
                        className: "rounded-2xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-200 transition hover:bg-amber-200 active:scale-[0.98]",
                        children: [
                            "🛺 Keke · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KEKE_FARE"])
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this),
            at && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["placeLayout"])(id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enterInterior"])({
                        kind: "place",
                        id
                    }),
                className: "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 active:scale-[0.98]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    " Go inside"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this),
            busy && at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 overflow-hidden rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-emerald-800",
                        children: [
                            busy.label,
                            "…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                            className: "h-full rounded-full bg-emerald-500",
                            initial: {
                                width: 0
                            },
                            animate: {
                                width: "100%"
                            },
                            transition: {
                                duration: busy.secs,
                                ease: "linear"
                            }
                        }, busy.start, false, {
                            fileName: "[project]/src/components/ui/PlacePanel.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                children: place.actions.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].li, {
                        initial: {
                            opacity: 0,
                            x: 12
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.06 + i * 0.05
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionRow"], {
                            a: a,
                            enabled: at && !busy,
                            onRun: ()=>{
                                const err = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().runAction(a);
                                if (err) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast(err, "bad");
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlacePanel.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this)
                    }, a.id, false, {
                        fileName: "[project]/src/components/ui/PlacePanel.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            place.voice && at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRoomCard"], {
                    room: `place:${id}`,
                    label: `${place.name} voice`
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/PlacePanel.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PlacePanel.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function SidePanel() {
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.selected);
    const interior = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClock"])();
    const shown = interior ? {
        type: "interior",
        id: `${interior.kind}:${interior.id}`
    } : selected;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: shown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].aside, {
            initial: {
                opacity: 0,
                y: 40,
                scale: 0.97
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: 40,
                scale: 0.97
            },
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 26
            },
            className: `absolute inset-x-3 bottom-3 z-20 ${interior ? "max-h-[44dvh]" : "max-h-[62dvh]"} overflow-y-auto rounded-3xl bg-white/92 p-5 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-20 sm:max-h-[calc(100dvh-7rem)] sm:w-[24rem]`,
            children: interior ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$InteriorPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 118,
                columnNumber: 23
            }, this) : selected?.type === "place" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceBody, {
                id: selected.id
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 118,
                columnNumber: 72
            }, this) : selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PlotPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: selected.id
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PlacePanel.tsx",
                lineNumber: 118,
                columnNumber: 116
            }, this) : null
        }, `${shown.type}:${shown.id}`, false, {
            fileName: "[project]/src/components/ui/PlacePanel.tsx",
            lineNumber: 110,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/PlacePanel.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/PlotPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlotPanelBody
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/door-open.mjs [app-ssr] (ecmascript) <export default as DoorOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/footprints.mjs [app-ssr] (ecmascript) <export default as Footprints>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hammer.mjs [app-ssr] (ecmascript) <export default as Hammer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key-round.mjs [app-ssr] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.mjs [app-ssr] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/parts.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
function PlotPanelBody({ id }) {
    const plot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["plotById"])(id);
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.plots[id]);
    const myId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile?.id);
    const money = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.money);
    const busy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.busy);
    const select = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.select);
    const sec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSecond"])();
    const mine = state?.ownerId === myId;
    const near = Math.hypot(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x - plot.pos[0], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z - (plot.pos[1] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOT_SIZE"] / 2 + 0.6)) < 3.6;
    const tier = state?.tier ?? 0;
    const next = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"][tier + 1];
    const rent = state && mine ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pendingRent"])(state, sec * 1000) : 0;
    const act = (fn)=>{
        const err = fn();
        if (err) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast(err, "bad");
    };
    const enterHome = ()=>{
        if (!near) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkTo"])(plot.pos[0], plot.pos[1] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOT_SIZE"] / 2 + 0.6);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enterInterior"])({
            kind: "home",
            id
        });
    };
    const enterButton = tier >= 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: enterHome,
        className: "mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 active:scale-[0.98]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this),
            " ",
            near ? mine ? "Go inside your home" : `Knock and go in` : "Walk to the door"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PlotPanel.tsx",
        lineNumber: 38,
        columnNumber: 7
    }, this) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid size-12 place-items-center rounded-2xl text-2xl",
                                style: {
                                    background: `${state ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorFor"])(state.ownerId) : "#10b981"}22`
                                },
                                children: state ? "🏠" : "🌱"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold leading-tight text-stone-900",
                                        children: state ? mine ? "Your land" : `${state.ownerName}'s land` : "Land for sale"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold text-emerald-700",
                                        children: [
                                            plot.district,
                                            " · ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"][tier].name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>select(null),
                        "aria-label": "Close",
                        className: "rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlotPanel.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            !state && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-sm text-stone-600",
                        children: [
                            "A clean plot in ",
                            plot.district,
                            ". Buy it, build on it, collect rent, and everyone in Ibadan will see your name on it."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-stone-500",
                                children: "Price"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-extrabold tabular-nums text-stone-900",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(plot.price)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>act(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().buyPlot(id)),
                        className: "mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-50",
                        disabled: money < plot.price,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            " ",
                            money < plot.price ? `Need ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(plot.price - money)} more` : "Buy this land"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            state && mine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-semibold uppercase tracking-wide text-stone-400",
                                        children: "Rent income"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-stone-900",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"][tier].rentPerMin),
                                            "/min"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().collectRent(id),
                                disabled: rent <= 0,
                                className: "rounded-2xl bg-emerald-50 p-3 text-left ring-1 ring-emerald-100 transition hover:bg-emerald-100 active:scale-95 disabled:opacity-60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-semibold uppercase tracking-wide text-emerald-700",
                                        children: "Collect"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-emerald-900",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(rent)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    next && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>act(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().upgradePlot(id)),
                        className: "mt-3 flex w-full items-center justify-between rounded-2xl bg-stone-900 px-4 py-3 text-left text-white transition hover:bg-stone-700 active:scale-[0.98]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2 text-sm font-semibold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__["Hammer"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 105,
                                        columnNumber: 17
                                    }, this),
                                    " Build a ",
                                    next.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-bold tabular-nums",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(next.cost)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this),
                    enterButton,
                    tier >= 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            !near && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkTo"])(plot.pos[0], plot.pos[1] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOT_SIZE"] / 2 + 0.6),
                                className: "mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-stone-700 ring-1 ring-black/10 transition hover:bg-stone-50 active:scale-[0.98]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__["Footprints"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 119,
                                        columnNumber: 19
                                    }, this),
                                    " Walk home to use it"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 115,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-3 space-y-2",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HOME_ACTIONS"].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionRow"], {
                                            a: a,
                                            enabled: near && !busy,
                                            onRun: ()=>act(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().runAction(a, {
                                                        gainScale: a.id === "sleep" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nepaOut"])(Date.now()) ? 0.5 : 1
                                                    }))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                            lineNumber: 125,
                                            columnNumber: 21
                                        }, this)
                                    }, a.id, false, {
                                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                        lineNumber: 124,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this),
                            near && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRoomCard"], {
                                    room: `home:${id}`,
                                    label: "House party voice"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                    lineNumber: 135,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 134,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 113,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this),
            state && !mine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center gap-2 font-semibold text-stone-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            " Owned by ",
                            state.ownerName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1",
                        children: "Ask them to host a house party, or just knock and go in."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    enterButton,
                    tier >= 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkTo"])(plot.pos[0], plot.pos[1] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOT_SIZE"] / 2 + 0.6),
                        className: "mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.98]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__["Footprints"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this),
                            " Visit"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 151,
                        columnNumber: 13
                    }, this),
                    tier >= 1 && near && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRoomCard"], {
                            room: `home:${id}`,
                            label: `${state.ownerName}'s house voice`
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlotPanel.tsx",
                            lineNumber: 160,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PlotPanel.tsx",
                        lineNumber: 159,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PlotPanel.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PlotPanel.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Sheets.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sheets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.mjs [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/footprints.mjs [app-ssr] (ecmascript) <export default as Footprints>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil-line.mjs [app-ssr] (ecmascript) <export default as PencilLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-call.mjs [app-ssr] (ecmascript) <export default as PhoneCall>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-off.mjs [app-ssr] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/net.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/titles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quests.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$AvatarPreview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/AvatarPreview.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/parts.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function Frame({ title, onClose, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        initial: {
            opacity: 0,
            x: 40
        },
        animate: {
            opacity: 1,
            x: 0
        },
        exit: {
            opacity: 0,
            x: 40
        },
        transition: {
            type: "spring",
            stiffness: 280,
            damping: 28
        },
        className: "absolute inset-x-3 bottom-3 top-20 z-30 flex flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:w-[24rem]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-b border-stone-100 px-5 py-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-bold text-stone-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        "aria-label": "Close",
                        className: "rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Sheets.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-5",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Sheets.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function PhoneSheet() {
    const remoteMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.remotes);
    const remotes = Object.values(remoteMap);
    const call = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.call);
    const netState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.net);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (call.phase !== "idle") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center py-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    animate: call.phase === "live" ? {
                        scale: 1
                    } : {
                        scale: [
                            1,
                            1.08,
                            1
                        ]
                    },
                    transition: {
                        repeat: Infinity,
                        duration: 1.4
                    },
                    className: "grid size-24 place-items-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700",
                    children: call.peerName.slice(0, 1).toUpperCase()
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-xl font-bold text-stone-900",
                    children: call.peerName
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-stone-500",
                    children: call.phase === "calling" ? "Calling…" : "Connected"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex items-center gap-3",
                    children: [
                        call.phase === "live" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$parts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MuteButton"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/Sheets.tsx",
                            lineNumber: 55,
                            columnNumber: 37
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].hangup(),
                            className: "grid size-14 place-items-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition active:scale-90",
                            "aria-label": "Hang up",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                                className: "size-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Sheets.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Sheets.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400",
                children: "People online"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            netState !== "online" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200",
                children: [
                    "You're offline. Start the game server (",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "font-mono text-xs",
                        children: "npm run server"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 69,
                        columnNumber: 55
                    }, this),
                    ") to see and call other players."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this),
            netState === "online" && remotes.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "No one else is online right now."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            navigator.clipboard?.writeText(location.origin + "/play").then(()=>{
                                setCopied(true);
                                setTimeout(()=>setCopied(false), 1800);
                            });
                        },
                        className: "mt-3 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition active:scale-95",
                        children: [
                            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "size-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 84,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                className: "size-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 84,
                                columnNumber: 56
                            }, this),
                            " ",
                            copied ? "Link copied" : "Copy invite link"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: remotes.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grid size-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700",
                                        children: r.name.slice(0, 1).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Sheets.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-stone-900",
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-400",
                                                children: r.room === "streets" ? "Out and about" : r.room.replace(/-/g, " ")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/Sheets.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].call(r.id, r.name),
                                className: "grid size-10 place-items-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:scale-90",
                                "aria-label": `Call ${r.name}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, r.id, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Sheets.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
function QuestsSheet() {
    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.questsDone);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.stats);
    const plots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.plots);
    const pid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile?.id);
    const qs = {
        stats,
        plots,
        pid
    };
    const nextId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"].find((q)=>!done.includes(q.id))?.id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-bold text-amber-900",
                        children: [
                            done.length,
                            " of ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"].length,
                            " goals complete"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-2 overflow-hidden rounded-full bg-amber-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                            className: "h-full rounded-full bg-amber-500",
                            animate: {
                                width: `${done.length / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"].length * 100}%`
                            },
                            transition: {
                                duration: 0.6
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Sheets.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-amber-800/80",
                        children: "Goals pay cash and reputation, and nudge you through everything Ibadan offers."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"].map((q)=>{
                    const isDone = done.includes(q.id);
                    const prog = q.progress?.(qs);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: `rounded-2xl p-3.5 ring-1 ${isDone ? "bg-emerald-50/60 ring-emerald-100" : q.id === nextId ? "bg-white ring-amber-300 shadow-sm" : "bg-stone-50 ring-black/5"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                isDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "mt-0.5 size-5 shrink-0 text-emerald-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                    lineNumber: 137,
                                    columnNumber: 27
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                    className: `mt-0.5 size-5 shrink-0 ${q.id === nextId ? "text-amber-500" : "text-stone-300"}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                    lineNumber: 137,
                                    columnNumber: 98
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-sm font-semibold ${isDone ? "text-stone-400 line-through" : "text-stone-900"}`,
                                            children: q.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Sheets.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: q.blurb
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Sheets.tsx",
                                            lineNumber: 140,
                                            columnNumber: 19
                                        }, this),
                                        prog && !isDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full rounded-full bg-amber-500",
                                                        style: {
                                                            width: `${prog.cur / prog.max * 100}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ui/Sheets.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] font-semibold text-stone-500",
                                                    children: [
                                                        prog.cur,
                                                        "/",
                                                        prog.max
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/Sheets.tsx",
                                            lineNumber: 142,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1.5 flex flex-wrap gap-1",
                                            children: [
                                                q.reward.money ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-emerald-700",
                                                    children: [
                                                        "+",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(q.reward.money)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 39
                                                }, this) : null,
                                                q.reward.rep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-md bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-amber-700",
                                                    children: [
                                                        "+",
                                                        q.reward.rep,
                                                        " rep"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 37
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/Sheets.tsx",
                                            lineNumber: 151,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/Sheets.tsx",
                                    lineNumber: 138,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/Sheets.tsx",
                            lineNumber: 136,
                            columnNumber: 15
                        }, this)
                    }, q.id, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 132,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Sheets.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
function ProfileSheet() {
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile);
    const rep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.rep);
    const money = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.money);
    const plots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.plots);
    const owned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownedBy"])(plots, profile.id);
    const prog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleProgress"])(rep);
    const muted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.muted);
    const clearMuted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.clearMuted);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative -mx-5 -mt-5 h-52 bg-gradient-to-b from-emerald-50 to-amber-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$AvatarPreview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    look: profile.look,
                    className: "absolute inset-0"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-bold text-stone-900",
                                children: profile.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-amber-600",
                                children: prog.cur.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().patch({
                                editingAvatar: true,
                                sheet: null
                            });
                        },
                        className: "flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-200 active:scale-95",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__["PencilLine"], {
                                className: "size-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            " Edit look"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-2xl bg-stone-50 p-4 ring-1 ring-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs font-semibold text-stone-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: prog.cur.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: prog.next ? prog.next.name : "Top of the ladder"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-2 overflow-hidden rounded-full bg-stone-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                            className: "h-full rounded-full bg-amber-500",
                            initial: {
                                width: 0
                            },
                            animate: {
                                width: `${prog.pct}%`
                            },
                            transition: {
                                duration: 0.8
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Sheets.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-stone-500",
                        children: [
                            rep,
                            " rep",
                            prog.next ? ` · ${prog.next.rep - rep} more to ${prog.next.name}` : "",
                            ". Work, volunteer, join town meetings and own land to climb."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-2 gap-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-extrabold tabular-nums text-stone-900",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(money)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold uppercase tracking-wide text-stone-400",
                                children: "Cash"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-extrabold tabular-nums text-stone-900",
                                children: owned.length
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold uppercase tracking-wide text-stone-400",
                                children: "Plots owned"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            owned.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400",
                        children: "Your land"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2",
                        children: owned.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-2.5 ring-1 ring-black/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-stone-900",
                                                children: p.district
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                                lineNumber: 226,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-400",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"][plots[p.id].tier].name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                                lineNumber: 227,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/Sheets.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const pl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["plotById"])(p.id);
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().patch({
                                                selected: {
                                                    type: "plot",
                                                    id: p.id
                                                },
                                                sheet: null
                                            });
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkTo"])(pl.pos[0], pl.pos[1] + 2.3);
                                        },
                                        className: "grid size-9 place-items-center rounded-full bg-white text-stone-700 ring-1 ring-black/10 transition hover:bg-stone-100 active:scale-90",
                                        "aria-label": "Go to plot",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__["Footprints"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Sheets.tsx",
                                            lineNumber: 238,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Sheets.tsx",
                                        lineNumber: 229,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 220,
                columnNumber: 9
            }, this),
            muted.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 text-sm ring-1 ring-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-stone-600",
                        children: [
                            muted.length,
                            " muted player",
                            muted.length > 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearMuted,
                        className: "rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 ring-1 ring-black/10 transition hover:bg-stone-100 active:scale-95",
                        children: "Unmute all"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 247,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400",
                children: "The ladder"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "space-y-1.5",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLES"].map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: `flex items-center justify-between rounded-xl px-3 py-2 text-sm ${i <= prog.index ? "bg-amber-50 font-semibold text-amber-800" : "text-stone-400"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: [
                                    t.rep,
                                    " rep"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Sheets.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.name, true, {
                        fileName: "[project]/src/components/ui/Sheets.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Sheets.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
function Sheets() {
    const sheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.sheet);
    const setSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.setSheet);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: [
            sheet === "phone" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
                title: "Phone",
                onClose: ()=>setSheet(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneSheet, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this)
            }, "phone", false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 276,
                columnNumber: 9
            }, this),
            sheet === "quests" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
                title: "Goals",
                onClose: ()=>setSheet(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestsSheet, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 282,
                    columnNumber: 11
                }, this)
            }, "quests", false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this),
            sheet === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
                title: "You",
                onClose: ()=>setSheet(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileSheet, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/Sheets.tsx",
                    lineNumber: 287,
                    columnNumber: 11
                }, this)
            }, "profile", false, {
                fileName: "[project]/src/components/ui/Sheets.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Sheets.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/parts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionRow",
    ()=>ActionRow,
    "Chips",
    ()=>Chips,
    "MuteButton",
    ()=>MuteButton,
    "VoiceRoomCard",
    ()=>VoiceRoomCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.mjs [app-ssr] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-off.mjs [app-ssr] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/voice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/titles.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const NEED_LABEL = {
    hunger: "hunger",
    energy: "energy",
    fun: "fun",
    social: "social"
};
function Chips({ a }) {
    const out = [];
    if (a.cost) out.push({
        t: `−${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(a.cost)}`,
        tone: "bad"
    });
    if (a.pay) out.push({
        t: `+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(a.pay)}`,
        tone: "good"
    });
    for (const k of Object.keys(a.gain ?? {})){
        const v = a.gain[k];
        out.push({
            t: `${v > 0 ? "+" : "−"}${Math.abs(v)} ${NEED_LABEL[k]}`,
            tone: v > 0 ? "good" : "bad"
        });
    }
    if (a.rep) out.push({
        t: `+${a.rep} rep`,
        tone: "good"
    });
    if (a.boostMs) out.push({
        t: "keke boost",
        tone: "good"
    });
    if (a.minRep) out.push({
        t: `needs ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLES"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(a.minRep)].name}`,
        tone: "lock"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "mt-1 flex flex-wrap gap-1",
        children: [
            out.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold ${c.tone === "good" ? "bg-emerald-50 text-emerald-700" : c.tone === "bad" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700"}`,
                    children: c.t
                }, i, false, {
                    fileName: "[project]/src/components/ui/parts.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded-md bg-stone-100 px-1.5 py-0.5 text-[10.5px] font-semibold text-stone-500",
                children: [
                    a.secs,
                    "s"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/parts.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/parts.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function ActionRow({ a, enabled, onRun }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: !enabled,
        onClick: onRun,
        className: "group flex w-full items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 text-left ring-1 ring-black/5 transition hover:bg-emerald-50 hover:ring-emerald-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-stone-50 disabled:hover:ring-black/5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block text-sm font-semibold text-stone-900",
                    children: a.label
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/parts.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chips, {
                    a: a
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/parts.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/parts.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/parts.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function VoiceRoomCard({ room, label }) {
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.voice);
    const inHere = v.room === room;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl bg-emerald-50 p-3.5 ring-1 ring-emerald-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "flex items-center gap-1.5 text-sm font-semibold text-emerald-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/parts.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                " ",
                                label
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/parts.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-emerald-700/80",
                            children: inHere ? v.peers.length ? `${v.peers.length} talking with you` : "You're the first one here" : "Talk live with people here"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/parts.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/parts.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                inHere ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].leave(),
                    className: "flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-rose-600 shadow-sm ring-1 ring-black/5 transition active:scale-95",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                            className: "size-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/parts.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this),
                        " Leave"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/parts.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].join(room),
                    className: "rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-95",
                    children: "Join voice"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/parts.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/parts.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/parts.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function MuteButton() {
    const muted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.voice.muted);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].setMuted(!muted),
        className: `grid size-9 place-items-center rounded-full transition active:scale-90 ${muted ? "bg-rose-100 text-rose-600" : "bg-white text-stone-700 ring-1 ring-black/5"}`,
        "aria-label": muted ? "Unmute" : "Mute",
        children: muted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/parts.tsx",
            lineNumber: 91,
            columnNumber: 16
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/parts.tsx",
            lineNumber: 91,
            columnNumber: 48
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/parts.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/world/Overlay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Overlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$overlay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/overlay.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$People$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/People.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/furniture.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Player.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Anchored({ id, get, maxDist, maxCam, minCam, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: (el)=>{
            if (el) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$overlay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anchors"].set(id, {
                el,
                get,
                maxDist,
                maxCam,
                minCam
            });
            else __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$overlay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anchors"].delete(id);
        },
        className: "absolute left-0 top-0 will-change-transform",
        style: {
            opacity: 0,
            visibility: "hidden"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function PlaceLabels() {
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.selected);
    const atPlace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.atPlace);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].map((p)=>{
            const sel = selected?.type === "place" && selected.id === p.id;
            const here = atPlace === p.id;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                id: `place:${p.id}`,
                get: (o)=>o.set(p.pos[0], p.size[1] + 0.9, p.pos[1]),
                maxCam: 46,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().select({
                            type: "place",
                            id: p.id
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkToPlace"])(p.id);
                    },
                    className: `pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold shadow-lg ring-1 backdrop-blur transition-all duration-300 hover:scale-105 ${sel ? "scale-110 bg-amber-500 text-white ring-amber-600" : here ? "scale-105 bg-emerald-600 text-white ring-emerald-700" : "bg-white/90 text-stone-800 ring-black/5"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: p.emoji
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Overlay.tsx",
                            lineNumber: 71,
                            columnNumber: 15
                        }, this),
                        p.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 58,
                    columnNumber: 13
                }, this)
            }, p.id, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 57,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function PlotLabels() {
    const plots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.plots);
    const myId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile?.id);
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOTS"].map((p)=>{
            const state = plots[p.id];
            const mine = state?.ownerId === myId;
            const sel = selected?.type === "plot" && selected.id === p.id;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                id: `plot:${p.id}`,
                get: (o)=>o.set(p.pos[0], state && state.tier > 0 ? 2.1 : 1.15, p.pos[1]),
                maxCam: 28,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().select({
                            type: "plot",
                            id: p.id
                        }),
                    className: `pointer-events-auto whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md ring-1 transition hover:scale-105 ${sel ? "bg-amber-500 text-white ring-amber-600" : state ? "text-white ring-black/10" : "bg-emerald-50 text-emerald-800 ring-emerald-200"}`,
                    style: state && !sel ? {
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorFor"])(state.ownerId)
                    } : undefined,
                    children: state ? `${mine ? "🏠 Yours" : `🏠 ${state.ownerName}`}` : `For sale · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(p.price).replace(/,000$/, "k")}`
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 93,
                    columnNumber: 13
                }, this)
            }, p.id, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 92,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function DistrictLabels() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DISTRICTS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                id: `district:${d.name}`,
                get: (o)=>o.set(d.pos[0], 0.1, d.pos[1]),
                minCam: 15,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900/35",
                    children: d.name
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this)
            }, d.name, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function Bubble({ id }) {
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.bubbles[id]);
    if (!b) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-full left-1/2 mb-1 w-max max-w-[11rem] -translate-x-1/2 rounded-2xl rounded-bl-md bg-white px-3 py-1.5 text-xs font-medium text-stone-800 shadow-lg ring-1 ring-black/5 animate-[pop_0.25s_ease-out]",
        children: b.text
    }, void 0, false, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
function NameTag({ name, bubbleId, speaking, tone = "me", dim = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Bubble, {
                id: bubbleId
            }, void 0, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold shadow ring-1 ${tone === "me" ? "bg-emerald-700 text-white ring-emerald-800" : dim ? "bg-white/70 text-stone-600 ring-black/5" : "bg-white text-stone-800 ring-black/5"} ${speaking ? "outline outline-2 outline-offset-2 outline-emerald-400" : ""}`,
                children: [
                    speaking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                        className: "size-3 text-emerald-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 140,
                        columnNumber: 22
                    }, this),
                    name
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
function PeopleTags() {
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile);
    const remotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.remotes);
    const speaking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.voice.speaking);
    const inside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>!!s.interior);
    const mine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interiorKey"])(s.interior) : null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            profile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                id: "me",
                get: (o)=>o.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_Y"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NameTag, {
                    name: profile.name,
                    bubbleId: "me",
                    speaking: speaking.me
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this),
            Object.values(remotes).filter((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$People$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sameSpace"])(r.room, mine)).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                    id: `peer:${r.id}`,
                    get: (o)=>{
                        const m = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].get(r.id);
                        o.set(m?.x ?? r.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_Y"], m?.z ?? r.z);
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NameTag, {
                        name: r.name,
                        bubbleId: r.id,
                        speaking: speaking[r.id],
                        tone: "other"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this)
                }, r.id, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)),
            !inside && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$People$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NPCS"].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                    id: n.id,
                    get: (o)=>o.set(n.st.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_Y"], n.st.z),
                    maxDist: 11,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NameTag, {
                        name: n.name,
                        bubbleId: n.id,
                        tone: "other",
                        dim: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 177,
                        columnNumber: 13
                    }, this)
                }, n.id, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
/** Exit sign, "what can I do here" prompts on usable furniture, and resident name tags. */ function InteriorLabels() {
    const interior = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior);
    const layout = interior ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rt"].layout : null;
    if (!layout) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                id: "exit",
                get: (o)=>o.set(layout.exitX * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], 1.3, (layout.d / 2 - 0.45) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkToExit"],
                    className: "pointer-events-auto whitespace-nowrap rounded-full bg-stone-900/90 px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg ring-1 ring-black/10 transition hover:scale-105",
                    children: "↩ Exit"
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            layout.items.map((it, i)=>{
                const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FURN"][it.kind];
                if (!def.use) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                    id: `furn:${i}`,
                    get: (o)=>o.set(it.x * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], ((def.h || 0.9) + 0.3) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], it.z * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]),
                    maxDist: 3.2,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walkToFurn"])(i),
                        className: "pointer-events-auto whitespace-nowrap rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold text-stone-800 shadow-md ring-1 ring-black/5 transition hover:scale-105 hover:bg-emerald-50",
                        children: it.verb ?? def.use.verb
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 204,
                        columnNumber: 13
                    }, this)
                }, `f${i}`, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this);
            }),
            (layout.residents ?? []).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Anchored, {
                    id: `res:${r.name}`,
                    get: (o)=>o.set(r.x * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_Y"], r.z * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]),
                    maxDist: 9,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NameTag, {
                        name: r.name,
                        bubbleId: `res:${r.name}`,
                        tone: "other",
                        dim: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this)
                }, `r${r.name}`, false, {
                    fileName: "[project]/src/components/world/Overlay.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
function Overlay() {
    const inside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>!!s.interior);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 z-[5] overflow-hidden",
        children: [
            inside ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InteriorLabels, {}, void 0, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DistrictLabels, {}, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlotLabels, {}, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceLabels, {}, void 0, false, {
                        fileName: "[project]/src/components/world/Overlay.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PeopleTags, {}, void 0, false, {
                fileName: "[project]/src/components/world/Overlay.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Overlay.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/world/People.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NPCS",
    ()=>NPCS,
    "Npcs",
    ()=>Npcs,
    "RemotePlayers",
    ()=>RemotePlayers,
    "sameSpace",
    ()=>sameSpace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-ssr] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/Avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Player.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pathing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
const angleDiff = (a, b)=>{
    let d = b - a;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return d;
};
/* ------------------------------ other players ------------------------------ */ function Remote({ id }) {
    const look = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.remotes[id]?.look);
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        speed: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((_, dt)=>{
        const r = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].get(id);
        if (!r || !g.current) return;
        const k = Math.min(1, dt * 9);
        r.x += (r.tx - r.x) * k;
        r.z += (r.tz - r.z) * k;
        r.ry += angleDiff(r.ry, r.tr) * k;
        const gap = Math.hypot(r.tx - r.x, r.tz - r.z);
        motion.current.speed = gap > 0.04 ? Math.max(r.speed, 1.5) : 0;
        g.current.position.set(r.x, 0, r.z);
        g.current.rotation.y = r.ry;
    });
    if (!look) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: g,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            look: look,
            motion: motion,
            scale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVATAR_SCALE"]
        }, void 0, false, {
            fileName: "[project]/src/components/world/People.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/People.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
const sameSpace = (peerRoom, mine)=>mine ? peerRoom === mine : !peerRoom.startsWith("in:");
function RemotePlayers() {
    const remotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.remotes);
    const mine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interiorKey"])(s.interior) : null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: Object.values(remotes).filter((r)=>sameSpace(r.room, mine)).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Remote, {
                id: r.id
            }, r.id, false, {
                fileName: "[project]/src/components/world/People.tsx",
                lineNumber: 59,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/People.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
const NAMES = [
    "Kunle",
    "Bisi",
    "Kemi",
    "Femi",
    "Ayo",
    "Sola",
    "Dami",
    "Ngozi",
    "Seun",
    "Yemi"
];
const LINES = {
    default: [
        "How far? Una dey alright?",
        "Ibadan is peace o.",
        "Abeg make NEPA no take light again.",
        "E kaaro o!",
        "Who wan chop?"
    ],
    "amala-skye": [
        "Ewedu soft die!",
        "Abeg add one more ponmo.",
        "Gbegiri don finish for the first pot."
    ],
    "bodija-market": [
        "Madam, last price?",
        "Tomatoes fresh o, come see!",
        "Oya buy, no dull yourself."
    ],
    dugbe: [
        "Customer, what you dey find?",
        "Cloth dey here, original."
    ],
    stadium: [
        "Shooting Stars go win today!",
        "Who dey call that offside?!"
    ],
    "cocoa-house": [
        "Meeting by 2pm, don't be late.",
        "This deal is big, trust me."
    ],
    ui: [
        "Exam don dey near o.",
        "Who get the lecture notes?"
    ],
    "agodi": [
        "This lake is so calm.",
        "Fresh air, finally."
    ]
};
const NPCS = NAMES.slice(0, 8).map((name, i)=>{
    const p = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"][i * 5 % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].length];
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doorOf"])(p);
    return {
        id: `npc-${i}`,
        name,
        look: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomLook"])(),
        st: {
            x: d.x,
            z: d.z + 0.5,
            ry: 0,
            speed: 0,
            path: [],
            waitUntil: Math.random() * 6000,
            place: p.id,
            nextChat: Date.now() + 8000 + Math.random() * 15000
        }
    };
});
function NpcActor({ index }) {
    const npcLook = NPCS[index].look;
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        speed: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((_, rawDt)=>{
        const dt = Math.min(rawDt, 0.05);
        const npc = NPCS[index];
        const st = npc.st;
        const now = Date.now();
        if (!st.path.length && now > st.waitUntil) {
            const dest = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"][Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].length)];
            if (dest.id !== st.place) {
                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doorOf"])(dest);
                const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findWorldPath"])(st.x, st.z, d.x + (Math.random() - 0.5), d.z + 0.2);
                if (path) {
                    st.path = path;
                    st.place = null;
                    st.dest = dest.id;
                }
            }
            st.waitUntil = now + 2000;
        }
        let moving = false;
        if (st.path.length) {
            const t = st.path[0];
            const dx = t.x - st.x;
            const dz = t.z - st.z;
            const dist = Math.hypot(dx, dz);
            if (dist < 0.15) {
                st.path.shift();
                if (!st.path.length) {
                    st.place = st.dest ?? null;
                    st.waitUntil = now + 9000 + Math.random() * 14000;
                }
            } else {
                const step = Math.min(dist, 2.0 * dt);
                st.x += dx / dist * step;
                st.z += dz / dist * step;
                st.ry += angleDiff(st.ry, Math.atan2(dx, dz)) * Math.min(1, dt * 10);
                moving = true;
            }
        }
        st.speed += ((moving ? 2.0 : 0) - st.speed) * Math.min(1, dt * 8);
        motion.current.speed = st.speed;
        if (g.current) {
            g.current.position.set(st.x, 0, st.z);
            g.current.rotation.y = st.ry;
        }
        // ambient chatter, only when the player is in this NPC's room
        if (now > st.nextChat) {
            st.nextChat = now + 20000 + Math.random() * 25000;
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
            if (st.place && s.atPlace === st.place) {
                const pool = LINES[st.place] ?? LINES.default;
                s.addChat({
                    room: st.place,
                    from: npc.name,
                    text: pool[Math.floor(Math.random() * pool.length)],
                    at: now,
                    npc: true
                }, npc.id);
            }
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: g,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            look: npcLook,
            motion: motion,
            scale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVATAR_SCALE"]
        }, void 0, false, {
            fileName: "[project]/src/components/world/People.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/People.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
function Npcs() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: NPCS.map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NpcActor, {
                index: i
            }, n.id, false, {
                fileName: "[project]/src/components/world/People.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/People.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/world/Player.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVATAR_SCALE",
    ()=>AVATAR_SCALE,
    "TAG_Y",
    ()=>TAG_Y,
    "default",
    ()=>Player
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-ssr] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/Avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pathing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/net.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/furniture.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
const AVATAR_SCALE = 0.56;
const TAG_Y = 1.2;
const KEY_MAP = {
    w: "f",
    arrowup: "f",
    s: "b",
    arrowdown: "b",
    a: "l",
    arrowleft: "l",
    d: "r",
    arrowright: "r"
};
const angleDiff = (a, b)=>{
    let d = b - a;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return d;
};
function Player() {
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile);
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        speed: 0,
        pose: null
    });
    const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const sent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        t: 0,
        x: 0,
        z: 0,
        s: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const typing = ()=>{
            const el = document.activeElement;
            return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
        };
        const down = (e)=>{
            const k = KEY_MAP[e.key.toLowerCase()];
            if (k && !typing()) keys.current.add(k);
        };
        const up = (e)=>{
            const k = KEY_MAP[e.key.toLowerCase()];
            if (k) keys.current.delete(k);
        };
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        return ()=>{
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])((state, rawDt)=>{
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        if (!s.profile || !group.current) return;
        const dt = Math.min(rawDt, 0.05);
        // seated or sleeping on furniture: hold the pose until the action finishes
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use) {
            if (!s.busy) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["endUse"])();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed = 0;
                motion.current.speed = 0;
                motion.current.pose = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use.pose;
                const u = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use;
                if (u.pose === "sit") {
                    group.current.position.set(u.x, (u.seatH + 0.04 - 0.865) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], u.z);
                    group.current.rotation.set(0, u.ry, 0);
                } else {
                    group.current.position.set(u.x + Math.sin(u.ry) * 0.85 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], (u.seatH + 0.12) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], u.z + Math.cos(u.ry) * 0.85 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]);
                    group.current.rotation.set(-Math.PI / 2, u.ry, 0, "YXZ");
                }
                return;
            }
        }
        motion.current.pose = null;
        const energy = s.needs.energy;
        const tired = energy < 3 ? 0.4 : energy < 15 ? 0.65 : 1;
        const base = s.interior ? 2.2 * tired : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride ? 8.5 : Date.now() < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boost"].until ? 6.5 : 3.1 * tired;
        let moving = false;
        let tx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry;
        const k = keys.current;
        const kf = (k.has("f") ? 1 : 0) - (k.has("b") ? 1 : 0);
        const kr = (k.has("r") ? 1 : 0) - (k.has("l") ? 1 : 0);
        if (s.busy) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = [];
        } else if (kf || kr) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = [];
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].goalPlace = null;
            const fx = -Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].az);
            const fz = -Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].az);
            let dx = fx * kf + -fz * kr;
            let dz = fz * kf + fx * kr;
            const len = Math.hypot(dx, dz) || 1;
            dx /= len;
            dz /= len;
            const step = base * dt;
            const nx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x + dx * step;
            const nz = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z + dz * step;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBlockedAt"])(nx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z)) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x = nx;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBlockedAt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, nz)) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z = nz;
            tx = Math.atan2(dx, dz);
            moving = true;
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path.length) {
            const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path[0];
            const dx = t.x - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x;
            const dz = t.z - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z;
            const dist = Math.hypot(dx, dz);
            if (dist < 0.12) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path.shift();
            } else {
                const step = Math.min(dist, base * dt);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x += dx / dist * step;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z += dz / dist * step;
                tx = Math.atan2(dx, dz);
                moving = true;
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry += angleDiff(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry, tx) * Math.min(1, dt * 12);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed += ((moving ? base : 0) - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed) * Math.min(1, dt * 10);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed < 0.02) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed = 0;
        motion.current.speed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed;
        group.current.position.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, 0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z);
        group.current.rotation.set(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry, 0);
        // which place are we standing at? (not while inside a building)
        if (!s.interior) {
            let near = null;
            let best = 1.7;
            for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"]){
                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doorOf"])(p);
                const dist = Math.hypot(d.x - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, d.z - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z);
                if (dist < best) {
                    best = dist;
                    near = p.id;
                }
            }
            if (near !== s.atPlace) s.setAtPlace(near);
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].goalPlace = null;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride = false;
            // arrived at a piece of furniture or the exit mat
            if (!s.busy && !moving) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse !== null) {
                    const idx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse = null;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startUse"])(idx);
                } else if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingExit) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingExit = false;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exitInterior"])();
                }
            }
        }
        // destination marker
        if (marker.current) {
            const last = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path.length - 1];
            marker.current.visible = !!last;
            if (last) {
                marker.current.position.set(last.x, 0.09, last.z);
                const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.12;
                marker.current.scale.set(pulse, pulse, 1);
            }
        }
        // network
        const now = performance.now();
        const o = sent.current;
        const changed = Math.abs(o.x - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x) > 0.01 || Math.abs(o.z - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z) > 0.01 || Math.abs(o.s - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed) > 0.3;
        if (s.net === "online" && now - o.t > 100 && changed) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].move(Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x * 100) / 100, Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z * 100) / 100, Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry * 100) / 100, Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed * 10) / 10);
            o.t = now;
            o.x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x;
            o.z = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z;
            o.s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].speed;
        }
    });
    if (!profile) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: group,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    look: profile.look,
                    motion: motion,
                    scale: AVATAR_SCALE
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Player.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Player.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: marker,
                "rotation-x": -Math.PI / 2,
                visible: false,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            0.22,
                            0.3,
                            28
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Player.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#10b981",
                        transparent: true,
                        opacity: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Player.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Player.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Player.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/world/WorldClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorldClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Hud$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Hud.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PlacePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PlacePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ChatDock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ChatDock.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Sheets$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Sheets.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Minimap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Minimap.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Floating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Floating.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$AvatarCreator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/AvatarCreator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Overlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quests.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/net.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/voice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const CityScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/world/CityScene.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-full place-items-center text-sm text-stone-500",
            children: "Loading Ibadan…"
        }, void 0, false, {
            fileName: "[project]/src/components/world/WorldClient.tsx",
            lineNumber: 26,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0))
});
/** Non-visual glue: needs decay, networking, room sync and test hooks. */ function Runtime() {
    const hasProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>!!s.profile);
    const lookKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile ? JSON.stringify([
            s.profile.name,
            s.profile.look
        ]) : "");
    const atPlace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.atPlace);
    const interior = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.interior);
    const net_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.net);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = setInterval(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().tick(1), 1000);
        const hour = new URLSearchParams(location.search).get("hour");
        if (hour !== null && !Number.isNaN(Number(hour))) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().patch({
            clockOverride: Number(hour)
        });
        return ()=>clearInterval(id);
    }, []);
    // goals: award anything newly completed whenever game state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const check = ()=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
            if (!s.profile) return;
            const qs = {
                stats: s.stats,
                plots: s.plots,
                pid: s.profile.id
            };
            for (const q of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"])if (!s.questsDone.includes(q.id) && q.done(qs)) s.awardQuest(q.id);
        };
        check();
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].subscribe(check);
    }, []);
    // welcome back: summarise time away and rent waiting
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        if (s.awaySecs > 60 && s.profile) {
            const mins = Math.round(s.awaySecs / 60);
            const pid = s.profile.id;
            const rent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownedBy"])(s.plots, pid).reduce((sum, p)=>sum + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pendingRent"])(s.plots[p.id], Date.now()), 0);
            setTimeout(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast(`Welcome back! Away ${mins} min${rent > 0 ? ` · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(rent)} rent waiting` : ""}.`, "info");
            }, 1200);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().patch({
            awaySecs: 0
        });
    }, []);
    // deep link: /play?enter=home or /play?enter=<place id> walks straight inside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasProfile) return;
        const target = new URLSearchParams(location.search).get("enter");
        if (!target) return;
        const t = setTimeout(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enterInterior"])(target === "home" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["homeRef"])() : target === "flat" ? {
                kind: "home",
                id: "flat"
            } : {
                kind: "place",
                id: target
            }), 1800);
        return ()=>clearTimeout(t);
    }, [
        hasProfile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasProfile) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].connect();
        return ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].disconnect();
    }, [
        hasProfile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (lookKey && net_ === "online") __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].hello();
    }, [
        lookKey,
        net_
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (net_ !== "online") return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["net"].room((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$net$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roomOf"])(atPlace, interior));
    }, [
        atPlace,
        interior,
        net_
    ]);
    // walking out of a venue drops you from its voice room (call rooms are unaffected)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const room = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().voice.room;
        if (room?.startsWith("place:") && room !== `place:${atPlace}`) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].leave();
        if (room?.startsWith("home:") && !interior) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].leave();
    }, [
        atPlace,
        interior
    ]);
    return null;
}
function WorldClient() {
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMounted"])();
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.profile);
    const editing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.editingAvatar);
    const setProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.setProfile);
    const patch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.patch);
    const fade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.fade);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-dvh w-full overflow-hidden bg-[#eef3ec]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CityScene, {}, void 0, false, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            mounted && profile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Hud$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PlacePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ChatDock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Sheets$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Floating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceBar"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Minimap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Floating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hint"], {}, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mounted && fade && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.25
                    },
                    className: "pointer-events-none absolute inset-0 z-[70] bg-stone-950"
                }, "fade", false, {
                    fileName: "[project]/src/components/world/WorldClient.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Floating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toasts"], {}, void 0, false, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 132,
                columnNumber: 19
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Floating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IncomingCall"], {}, void 0, false, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 133,
                columnNumber: 19
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Runtime, {}, void 0, false, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 134,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mounted && (!profile || editing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$AvatarCreator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    initialName: profile?.name,
                    initialLook: profile?.look,
                    isEdit: !!profile,
                    onCancel: profile ? ()=>patch({
                            editingAvatar: false
                        }) : undefined,
                    onDone: (name, look)=>{
                        const id = profile?.id ?? crypto.randomUUID().replace(/-/g, "").slice(0, 20);
                        setProfile({
                            id,
                            name,
                            look
                        });
                    }
                }, "creator", false, {
                    fileName: "[project]/src/components/world/WorldClient.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-stone-600 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white xl:inline-flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/WorldClient.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    " Home"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/WorldClient.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/WorldClient.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/furniture.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FURN",
    ()=>FURN,
    "S",
    ()=>S
]);
const S = 0.56;
const relax = {
    id: "sit",
    label: "Sit and relax",
    secs: 4,
    gain: {
        energy: 8,
        fun: 5
    }
};
const sleep = {
    id: "sleep",
    label: "Sleep",
    secs: 8,
    gain: {
        energy: 70,
        hunger: -10
    }
};
const sit = (seatH = 0.45, action = relax)=>({
        verb: "Sit",
        pose: "sit",
        seatH,
        action
    });
const FURN = {
    sofa: {
        w: 2.0,
        d: 0.9,
        h: 0.85,
        solid: true,
        use: sit()
    },
    loveseat: {
        w: 1.4,
        d: 0.85,
        h: 0.85,
        solid: true,
        use: sit()
    },
    armchair: {
        w: 0.85,
        d: 0.85,
        h: 0.9,
        solid: true,
        use: sit()
    },
    chair: {
        w: 0.45,
        d: 0.45,
        h: 0.9,
        solid: true,
        use: sit()
    },
    plasticchair: {
        w: 0.5,
        d: 0.5,
        h: 0.85,
        solid: true,
        use: sit()
    },
    stool: {
        w: 0.4,
        d: 0.4,
        h: 0.45,
        solid: true,
        use: sit()
    },
    barstool: {
        w: 0.4,
        d: 0.4,
        h: 0.75,
        solid: true,
        use: sit(0.75)
    },
    bench: {
        w: 1.6,
        d: 0.5,
        h: 0.45,
        solid: true,
        use: sit()
    },
    pew: {
        w: 2.2,
        d: 0.55,
        h: 0.9,
        solid: true,
        use: sit(0.45, {
            id: "pew",
            label: "Sit and reflect",
            secs: 4,
            gain: {
                energy: 6,
                fun: 4,
                social: 3
            }
        })
    },
    coffeetable: {
        w: 1.0,
        d: 0.6,
        h: 0.42,
        solid: true
    },
    diningtable: {
        w: 1.6,
        d: 0.9,
        h: 0.75,
        solid: true
    },
    roundtable: {
        w: 1.0,
        d: 1.0,
        h: 0.75,
        solid: true
    },
    desk: {
        w: 1.3,
        d: 0.65,
        h: 0.75,
        solid: true
    },
    pcdesk: {
        w: 1.3,
        d: 0.65,
        h: 1.1,
        solid: true,
        use: {
            verb: "Work at the desk",
            needsPower: true,
            action: {
                id: "deskwork",
                label: "Work at the desk",
                secs: 6,
                gain: {
                    energy: -18
                },
                pay: 3000,
                rep: 1
            }
        }
    },
    counter: {
        w: 1.6,
        d: 0.65,
        h: 1.0,
        solid: true
    },
    bar: {
        w: 2.4,
        d: 0.7,
        h: 1.1,
        solid: true
    },
    stall: {
        w: 1.8,
        d: 0.9,
        h: 0.95,
        solid: true,
        use: {
            verb: "Buy a snack",
            action: {
                id: "stallsnack",
                label: "Buy a snack",
                secs: 3,
                cost: 500,
                gain: {
                    hunger: 12,
                    fun: 2
                }
            }
        }
    },
    cabinet: {
        w: 0.9,
        d: 0.45,
        h: 0.95,
        solid: true
    },
    sidetable: {
        w: 0.5,
        d: 0.5,
        h: 0.55,
        solid: true
    },
    bed: {
        w: 1.5,
        d: 2.0,
        h: 0.55,
        solid: true,
        use: {
            verb: "Sleep",
            pose: "lie",
            seatH: 0.6,
            action: sleep
        }
    },
    singlebed: {
        w: 1.0,
        d: 2.0,
        h: 0.5,
        solid: true,
        use: {
            verb: "Sleep",
            pose: "lie",
            seatH: 0.55,
            action: sleep
        }
    },
    hospitalbed: {
        w: 1.0,
        d: 2.0,
        h: 0.6,
        solid: true,
        use: {
            verb: "Rest",
            pose: "lie",
            seatH: 0.65,
            action: {
                id: "wardrest",
                label: "Rest in the ward",
                secs: 8,
                cost: 2000,
                gain: {
                    energy: 40
                }
            }
        }
    },
    wardrobe: {
        w: 1.2,
        d: 0.6,
        h: 2.0,
        solid: true
    },
    bookshelf: {
        w: 1.0,
        d: 0.35,
        h: 1.9,
        solid: true,
        use: {
            verb: "Read a book",
            action: {
                id: "read",
                label: "Read a book",
                secs: 5,
                gain: {
                    fun: 10,
                    energy: -3
                },
                rep: 1
            }
        }
    },
    fridge: {
        w: 0.7,
        d: 0.7,
        h: 1.8,
        solid: true,
        use: {
            verb: "Grab a snack",
            needsPower: true,
            action: {
                id: "fridgesnack",
                label: "Grab a snack",
                secs: 3,
                cost: 300,
                gain: {
                    hunger: 15
                }
            }
        }
    },
    stove: {
        w: 0.65,
        d: 0.6,
        h: 0.9,
        solid: true,
        use: {
            verb: "Cook",
            action: {
                id: "cook",
                label: "Cook a meal",
                secs: 5,
                cost: 800,
                gain: {
                    hunger: 40,
                    fun: 3
                }
            }
        }
    },
    sink: {
        w: 0.8,
        d: 0.6,
        h: 0.9,
        solid: true
    },
    tv: {
        w: 1.2,
        d: 0.4,
        h: 1.1,
        solid: true,
        use: {
            verb: "Watch TV",
            needsPower: true,
            action: {
                id: "tv",
                label: "Watch TV",
                secs: 6,
                gain: {
                    fun: 22,
                    energy: -2
                }
            }
        }
    },
    rug: {
        w: 2.4,
        d: 1.6,
        h: 0.02,
        solid: false
    },
    plant: {
        w: 0.5,
        d: 0.5,
        h: 1.2,
        solid: true
    },
    lamp: {
        w: 0.35,
        d: 0.35,
        h: 1.5,
        solid: true
    },
    standingfan: {
        w: 0.4,
        d: 0.4,
        h: 1.2,
        solid: true
    },
    ceilingfan: {
        w: 1.2,
        d: 1.2,
        h: 0,
        solid: false
    },
    chandelier: {
        w: 1.0,
        d: 1.0,
        h: 0,
        solid: false
    },
    generator: {
        w: 0.7,
        d: 0.45,
        h: 0.6,
        solid: true,
        use: {
            verb: "Fuel the generator",
            special: "generator"
        }
    },
    lantern: {
        w: 0.2,
        d: 0.2,
        h: 0.3,
        solid: false
    },
    waterdispenser: {
        w: 0.35,
        d: 0.35,
        h: 1.1,
        solid: true,
        use: {
            verb: "Drink water",
            action: {
                id: "water",
                label: "Drink some water",
                secs: 2,
                gain: {
                    hunger: 3,
                    energy: 2
                }
            }
        }
    },
    toilet: {
        w: 0.4,
        d: 0.7,
        h: 0.8,
        solid: true
    },
    shower: {
        w: 0.9,
        d: 0.9,
        h: 2.0,
        solid: true,
        use: {
            verb: "Freshen up",
            action: {
                id: "shower",
                label: "Freshen up",
                secs: 4,
                gain: {
                    energy: 5,
                    fun: 4
                }
            }
        }
    },
    basin: {
        w: 0.5,
        d: 0.4,
        h: 0.9,
        solid: true
    },
    podium: {
        w: 0.6,
        d: 0.5,
        h: 1.1,
        solid: true
    },
    blackboard: {
        w: 3.0,
        d: 0.1,
        h: 1.3,
        solid: false
    },
    studentdesk: {
        w: 1.0,
        d: 0.55,
        h: 0.75,
        solid: true
    },
    altar: {
        w: 2.0,
        d: 0.9,
        h: 1.0,
        solid: true
    },
    pulpit: {
        w: 0.8,
        d: 0.7,
        h: 1.2,
        solid: true
    },
    mimbar: {
        w: 1.0,
        d: 0.8,
        h: 1.8,
        solid: true
    },
    prayermat: {
        w: 0.7,
        d: 1.1,
        h: 0.02,
        solid: false,
        use: {
            verb: "Pray",
            action: {
                id: "prayer",
                label: "Pray",
                secs: 4,
                gain: {
                    energy: 8,
                    fun: 4,
                    social: 4
                },
                rep: 1
            }
        }
    },
    displaycase: {
        w: 1.4,
        d: 0.5,
        h: 1.0,
        solid: true,
        use: {
            verb: "Browse the exhibits",
            action: {
                id: "browse",
                label: "Browse the exhibits",
                secs: 3,
                gain: {
                    fun: 6
                },
                rep: 1
            }
        }
    },
    arcade: {
        w: 0.7,
        d: 0.8,
        h: 1.8,
        solid: true,
        use: {
            verb: "Play",
            needsPower: true,
            action: {
                id: "arcadeplay",
                label: "Play an arcade game",
                secs: 4,
                cost: 200,
                gain: {
                    fun: 15
                }
            }
        }
    },
    clawmachine: {
        w: 0.8,
        d: 0.8,
        h: 1.9,
        solid: true,
        use: {
            verb: "Try your luck",
            needsPower: true,
            action: {
                id: "claw",
                label: "Try the claw machine",
                secs: 4,
                cost: 300,
                gain: {
                    fun: 12
                }
            }
        }
    },
    fountain: {
        w: 1.6,
        d: 1.6,
        h: 0.9,
        solid: true
    },
    stage: {
        w: 4.0,
        d: 2.2,
        h: 0.5,
        solid: false
    },
    drum: {
        w: 0.5,
        d: 0.5,
        h: 0.8,
        solid: true,
        use: {
            verb: "Play the talking drum",
            action: {
                id: "drum",
                label: "Play the talking drum",
                secs: 4,
                gain: {
                    fun: 12
                },
                rep: 1
            }
        }
    },
    rack: {
        w: 1.2,
        d: 0.5,
        h: 1.5,
        solid: true
    },
    crates: {
        w: 0.8,
        d: 0.6,
        h: 0.7,
        solid: true
    },
    sacks: {
        w: 0.7,
        d: 0.5,
        h: 0.7,
        solid: true
    },
    umbrella: {
        w: 2.2,
        d: 2.2,
        h: 0,
        solid: false
    },
    curtain: {
        w: 1.5,
        d: 0.08,
        h: 1.8,
        solid: false
    },
    flag: {
        w: 0.3,
        d: 0.3,
        h: 2.4,
        solid: true
    },
    trophycase: {
        w: 1.0,
        d: 0.4,
        h: 1.8,
        solid: true
    },
    goalpost: {
        w: 5.0,
        d: 0.2,
        h: 2.4,
        solid: false
    },
    ticketbooth: {
        w: 1.2,
        d: 1.2,
        h: 2.2,
        solid: true
    },
    tank: {
        w: 2.4,
        d: 0.9,
        h: 1.4,
        solid: true
    },
    stairs: {
        w: 1.1,
        d: 3.2,
        h: 2.4,
        solid: true
    },
    wallart: {
        w: 0.9,
        d: 0.06,
        h: 0.7,
        solid: false
    },
    clock: {
        w: 0.4,
        d: 0.05,
        h: 0.4,
        solid: false
    },
    pitch: {
        w: 8,
        d: 5,
        h: 0.02,
        solid: false
    },
    liftdoor: {
        w: 1.2,
        d: 0.1,
        h: 2.1,
        solid: false
    }
};
}),
"[project]/src/lib/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClock",
    ()=>useClock,
    "useMounted",
    ()=>useMounted,
    "useSecond",
    ()=>useSecond
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
;
;
;
const subscribe = (cb)=>{
    const id = setInterval(cb, 1000);
    return ()=>clearInterval(id);
};
const snapshot = ()=>Math.floor(Date.now() / 1000);
function useSecond() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, snapshot, ()=>0);
}
function useClock() {
    const sec = useSecond();
    const override = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"])((s)=>s.clockOverride);
    const now = sec * 1000;
    const minutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gameMinutes"])(now, override);
    return {
        minutes,
        hour: minutes / 60,
        day: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["daylight"])(minutes / 60),
        nepa: sec === 0 ? false : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nepaOut"])(now),
        now
    };
}
const noSub = ()=>()=>{};
function useMounted() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(noSub, ()=>true, ()=>false);
}
}),
"[project]/src/lib/interiorRuntime.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GENERATOR_FUEL",
    ()=>GENERATOR_FUEL,
    "endUse",
    ()=>endUse,
    "enterInterior",
    ()=>enterInterior,
    "exitInterior",
    ()=>exitInterior,
    "homeRef",
    ()=>homeRef,
    "powerOn",
    ()=>powerOn,
    "rt",
    ()=>rt,
    "startUse",
    ()=>startUse,
    "walkToExit",
    ()=>walkToExit,
    "walkToFurn",
    ()=>walkToFurn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/furniture.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/layouts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pathing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/time.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const rt = {
    layout: null,
    grid: null,
    ref: null,
    savedDist: 24
};
const plotInfo = (id)=>{
    const p = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().plots[id];
    return p ? {
        tier: p.tier,
        ownerId: p.ownerId,
        ownerName: p.ownerName
    } : undefined;
};
function homeRef() {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    const mine = Object.entries(s.plots).filter(([, p])=>p.ownerId === s.profile?.id && p.tier >= 1).sort((a, b)=>b[1].tier - a[1].tier);
    return mine.length ? {
        kind: "home",
        id: mine[0][0]
    } : {
        kind: "home",
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FLAT"].id
    };
}
const sameRef = (a, b)=>!!a && a.kind === b.kind && a.id === b.id;
function fadeThen(fn) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
        fade: true
    });
    setTimeout(()=>{
        fn();
        setTimeout(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                fade: false
            }), 140);
    }, 260);
}
const powerOn = ()=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nepaOut"])(Date.now()) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().generatorUntil > Date.now();
function enterInterior(ref) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (!s.profile || s.fade) return false;
    if (s.busy) {
        s.toast("Finish what you're doing first.", "info");
        return false;
    }
    if (sameRef(s.interior, ref)) return true;
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layoutFor"])(ref, plotInfo);
    if (!layout) {
        s.toast("That door is locked.", "bad");
        return false;
    }
    fadeThen(()=>{
        const was = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().interior;
        if (!was) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].worldReturn = {
            x: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x,
            z: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z
        };
        rt.layout = layout;
        rt.grid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildInteriorGrid"])(layout);
        rt.ref = ref;
        if (!was) rt.savedDist = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].dist;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setActiveGrid"])(rt.grid);
        const [sx, sz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spawnOf"])(layout);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x = sx * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"];
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z = sz * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"];
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry = Math.PI;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = [];
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].goalPlace = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingExit = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].dist = Math.min(16, Math.max(8, Math.max(layout.w, layout.d) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"] * 1.15));
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            interior: ref,
            selected: null,
            atPlace: ref.kind === "place" ? ref.id : null
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().recordStat("entered");
    });
    return true;
}
function exitInterior() {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (!s.interior || s.fade) return;
    if (s.busy) {
        s.toast("Finish what you're doing first.", "info");
        return;
    }
    fadeThen(()=>{
        const back = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].worldReturn ?? {
            x: 0.5,
            z: 8.2
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x = back.x;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z = back.z;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ry = 0;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = [];
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingExit = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setActiveGrid"])(null);
        rt.layout = null;
        rt.grid = null;
        rt.ref = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cam"].dist = rt.savedDist;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            interior: null,
            atPlace: null
        });
    });
}
function walkToExit() {
    const l = rt.layout;
    if (!l) return;
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (s.busy) {
        s.toast("Finish what you're doing first.", "info");
        return;
    }
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findPath"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z, l.exitX * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], (l.d / 2 - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]);
    if (!path) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = path;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingExit = true;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse = null;
}
function walkToFurn(index) {
    const l = rt.layout;
    const it = l?.items[index];
    if (!l || !it || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FURN"][it.kind].use) return false;
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (s.busy) {
        s.toast("Finish what you're doing first.", "info");
        return false;
    }
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findPath"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z, it.x * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], it.z * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]);
    if (!path) return false;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = path;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingUse = index;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].pendingExit = false;
    return true;
}
const GENERATOR_FUEL = 800;
function startUse(index) {
    const it = rt.layout?.items[index];
    if (!it) return;
    const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FURN"][it.kind].use;
    if (!def) return;
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (def.needsPower && !powerOn()) {
        s.toast("No light. Fuel the generator or wait for NEPA.", "bad");
        return;
    }
    if (def.special === "generator") {
        if (s.money < GENERATOR_FUEL) {
            s.toast(`Fuel costs ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(GENERATOR_FUEL)}.`, "bad");
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            money: s.money - GENERATOR_FUEL,
            generatorUntil: Math.max(Date.now(), s.generatorUntil) + 5 * 60 * 1000
        });
        s.toast(`Generator running for 5 minutes · −${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(GENERATOR_FUEL)}`, "good");
        return;
    }
    const action = it.action ?? def.action;
    if (!action) return;
    const sleeping = def.pose === "lie";
    const half = sleeping && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nepaOut"])(Date.now()) && s.generatorUntil <= Date.now();
    const err = s.runAction(action, {
        gainScale: half ? 0.5 : 1
    });
    if (err) {
        s.toast(err, "bad");
        return;
    }
    if (def.pose) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use = {
            pose: def.pose,
            x: it.x * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"],
            z: it.z * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"],
            ry: it.rot ?? 0,
            seatH: def.seatH ?? 0.45,
            standX: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x,
            standZ: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z
        };
    }
    s.recordStat("used");
    if (sleeping && action.id === "sleep") s.recordStat("slept");
}
function endUse() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use.standX;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use.standZ;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].use = null;
}
}),
"[project]/src/lib/interiors.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildInteriorGrid",
    ()=>buildInteriorGrid,
    "footprint",
    ()=>footprint,
    "interiorKey",
    ()=>interiorKey,
    "spawnOf",
    ()=>spawnOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/furniture.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pathing.ts [app-ssr] (ecmascript)");
;
;
const interiorKey = (ref)=>`in:${ref.kind}:${ref.id}`;
const spawnOf = (l)=>[
        l.exitX,
        l.d / 2 - 1.3
    ];
function footprint(it) {
    const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FURN"][it.kind];
    const w = it.w ?? def.w;
    const d = it.d ?? def.d;
    const quarter = Math.abs(Math.round((it.rot ?? 0) / (Math.PI / 2) % 2)) === 1;
    return quarter ? {
        w: d,
        d: w
    } : {
        w,
        d
    };
}
function buildInteriorGrid(l) {
    const cell = 0.24;
    const wu = l.w * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"];
    const du = l.d * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"];
    const nx = Math.ceil(wu / cell);
    const nz = Math.ceil(du / cell);
    const grid = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grid"](-nx * cell * 0.5, -nz * cell * 0.5, nx, nz, cell);
    const t = 0.1;
    // outer walls
    grid.blockRect(0, -du / 2, wu + t, t * 2, 0.04);
    grid.blockRect(-wu / 2, 0, t * 2, du + t, 0.04);
    grid.blockRect(wu / 2, 0, t * 2, du + t, 0.04);
    // the front wall, except the exit doorway
    const gap = 1.3 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"];
    const ex = l.exitX * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"];
    grid.blockRect((-wu / 2 + (ex - gap / 2)) / 2, du / 2, ex - gap / 2 + wu / 2, t * 2, 0.04);
    grid.blockRect((ex + gap / 2 + wu / 2) / 2, du / 2, wu / 2 - (ex + gap / 2), t * 2, 0.04);
    // partitions
    for (const wall of l.walls){
        const dx = wall.x2 - wall.x1;
        const dz = wall.z2 - wall.z1;
        const len = Math.hypot(dx, dz);
        const gapLen = wall.door !== undefined ? wall.doorW ?? 1.4 : 0;
        const at = (f)=>({
                x: (wall.x1 + dx * f) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"],
                z: (wall.z1 + dz * f) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]
            });
        const seg = (f0, f1)=>{
            if (f1 - f0 <= 0.001) return;
            const a = at(f0);
            const b = at(f1);
            const horizontal = Math.abs(dx) >= Math.abs(dz);
            grid.blockRect((a.x + b.x) / 2, (a.z + b.z) / 2, horizontal ? Math.abs(b.x - a.x) : t, horizontal ? t : Math.abs(b.z - a.z), 0.03);
        };
        if (wall.door === undefined) seg(0, 1);
        else {
            const half = gapLen / 2 / len;
            seg(0, Math.max(0, wall.door - half));
            seg(Math.min(1, wall.door + half), 1);
        }
    }
    // solid furniture
    for (const it of l.items){
        const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FURN"][it.kind];
        if (!def.solid) continue;
        const fp = footprint(it);
        grid.blockRect(it.x * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], it.z * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], fp.w * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"] * 0.92, fp.d * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"] * 0.92, 0.03);
    }
    return grid;
}
}),
"[project]/src/lib/layouts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_PLACE_LAYOUT_IDS",
    ()=>ALL_PLACE_LAYOUT_IDS,
    "FLAT",
    ()=>FLAT,
    "PALETTES",
    ()=>PALETTES,
    "homeLayout",
    ()=>homeLayout,
    "layoutFor",
    ()=>layoutFor,
    "placeLayout",
    ()=>placeLayout
]);
/* ------------------------------------------------------------------------------------------------
 * Interior layouts, authored in metres. x spans -w/2..w/2 (left..right), z spans -d/2..d/2
 * (back wall..front wall). The exit mat is on the front wall. rot 0 faces +z (towards the front),
 * PI faces the back wall, PI/2 faces +x, -PI/2 faces -x.
 * Ibadan look: rust and terracotta walls, red-oxide cement floors, adire-indigo rugs, ceiling fans.
 * ---------------------------------------------------------------------------------------------- */ const R = Math.PI;
const H = Math.PI / 2;
const I = (kind, x, z, rot = 0, o = {})=>({
        kind,
        x,
        z,
        rot,
        ...o
    });
const W = (x1, z1, x2, z2, door, doorW = 1.4)=>({
        x1,
        z1,
        x2,
        z2,
        door,
        doorW
    });
const row = (kind, x0, z, n, dx, rot = 0, o = {})=>Array.from({
        length: n
    }, (_, i)=>I(kind, x0 + i * dx, z, rot, o));
const col = (kind, x, z0, n, dz, rot = 0, o = {})=>Array.from({
        length: n
    }, (_, i)=>I(kind, x, z0 + i * dz, rot, o));
/** n items on a circle, all facing the centre */ const around = (kind, cx, cz, r, n, start = 0, o = {})=>Array.from({
        length: n
    }, (_, i)=>{
        const a = start + i / n * Math.PI * 2;
        const x = cx + Math.sin(a) * r;
        const z = cz + Math.cos(a) * r;
        return I(kind, x, z, Math.atan2(cx - x, cz - z), o);
    });
const grid = (kind, x0, z0, nx, nz, dx, dz, rot = 0, o = {})=>Array.from({
        length: nx * nz
    }, (_, k)=>I(kind, x0 + k % nx * dx, z0 + Math.floor(k / nx) * dz, rot, o));
const RUST = "#b5533c";
const OCHRE = "#d89b3c";
const COCOA = "#6b4a2f";
const INDIGO = "#2f3b82";
const TEAL = "#2f8f83";
const SAND = "#ead7b7";
const CREAM = "#f1e4c8";
const PALETTES = [
    {
        wall: SAND,
        trim: "#7a4a2c",
        accent: RUST,
        floor: "redoxide"
    },
    {
        wall: CREAM,
        trim: COCOA,
        accent: INDIGO,
        floor: "tile"
    },
    {
        wall: "#d9b08c",
        trim: "#5a3a24",
        accent: OCHRE,
        floor: "wood"
    },
    {
        wall: "#cfe0d0",
        trim: COCOA,
        accent: TEAL,
        floor: "tile"
    },
    {
        wall: "#efe6d8",
        trim: "#3b2a1d",
        accent: "#8a2f3c",
        floor: "marble"
    }
];
const lay = (l)=>({
        light: "warm",
        ...l
    });
/* ----------------------------------------------------------------------------------------------
 * Homes
 * -------------------------------------------------------------------------------------------- */ /** "Room and parlour": the rented starter flat every player has. */ function flat(p) {
    return lay({
        id: "flat",
        name: "Your flat",
        w: 10,
        d: 8,
        floor: p.floor,
        wall: p.wall,
        trim: p.trim,
        accent: p.accent,
        exitX: -0.4,
        walls: [
            W(1.5, -4, 1.5, 4, 0.72, 1.4),
            W(1.5, 0.2, 5, 0.2, 0.5, 1.4)
        ],
        zones: [
            {
                x: 3.25,
                z: 2.1,
                w: 3.5,
                d: 3.8,
                floor: "tile",
                color: "#e6e2d6"
            }
        ],
        items: [
            I("sofa", -4.45, -1.0, H),
            I("rug", -2.5, -0.9, 0, {
                w: 2.8,
                d: 2.2,
                c: p.accent
            }),
            I("coffeetable", -2.7, -0.9),
            I("tv", 1.15, -0.9, -H),
            I("armchair", -2.6, -3.1, 0),
            I("plant", -4.5, -3.3),
            I("wallart", -2.0, -3.93, 0, {
                y: 1.5,
                c: p.accent
            }),
            I("clock", -0.6, -3.93, 0, {
                y: 1.9
            }),
            I("ceilingfan", -2.5, -0.9),
            I("roundtable", -2.4, 2.4),
            ...around("plasticchair", -2.4, 2.4, 0.85, 3, 0.4),
            I("generator", -4.5, 3.4, H),
            I("lamp", -4.55, 1.3),
            I("bed", 3.6, -2.9, 0),
            I("sidetable", 2.4, -3.45),
            I("lantern", 2.4, -3.45, 0, {
                y: 0.55
            }),
            I("wardrobe", 4.65, -1.0, -H),
            I("rug", 3.6, -1.4, 0, {
                w: 1.8,
                d: 1.2,
                c: "#2f3b82"
            }),
            I("stove", 2.1, 3.55, R),
            I("counter", 3.0, 3.6, R, {
                w: 1.1
            }),
            I("sink", 3.95, 3.6, R),
            I("fridge", 4.65, 2.4, -H)
        ],
        lines: [
            "NEPA don take light again o.",
            "This flat na small but e be mine."
        ]
    });
}
/** Bungalow: parlour, kitchen, two bedrooms, bathroom. */ function bungalow(p, owner) {
    return lay({
        id: "bungalow",
        name: owner ? `${owner}'s bungalow` : "Bungalow",
        w: 12,
        d: 9,
        floor: p.floor,
        wall: p.wall,
        trim: p.trim,
        accent: p.accent,
        exitX: -2.8,
        walls: [
            W(-6, -0.8, -2, -0.8, 0.5),
            W(-2, -0.8, 2, -0.8, 0.5),
            W(2, -0.8, 6, -0.8, 0.5),
            W(-2, -4.5, -2, -0.8),
            W(2, -4.5, 2, -0.8),
            W(1, -0.8, 1, 4.5, 0.62, 1.0)
        ],
        zones: [
            {
                x: 4,
                z: -2.7,
                w: 3.9,
                d: 3.5,
                floor: "tile",
                color: "#dfe5e0"
            },
            {
                x: 3.5,
                z: 1.9,
                w: 4.9,
                d: 5.4,
                floor: "tile",
                color: "#e6e2d6"
            }
        ],
        items: [
            // bedroom 1
            I("bed", -4, -3.3, 0),
            I("sidetable", -5.3, -3.9),
            I("wardrobe", -2.6, -1.4, R, {
                w: 1.2
            }),
            I("rug", -4, -1.9, 0, {
                w: 2,
                d: 1.2,
                c: p.accent
            }),
            // bedroom 2
            I("singlebed", -0.9, -3.4, 0),
            I("singlebed", 0.9, -3.4, 0),
            I("wardrobe", 1.5, -1.4, R),
            // bathroom
            I("toilet", 3.2, -4.1, 0),
            I("shower", 5.2, -3.8, 0),
            I("basin", 4.2, -4.2, 0),
            // parlour
            I("sofa", -3.0, 3.9, R),
            I("loveseat", -5.3, 1.7, H),
            I("armchair", -0.4, 1.9, -H),
            I("rug", -3.0, 1.6, 0, {
                w: 3.2,
                d: 2.4,
                c: p.accent
            }),
            I("coffeetable", -3.0, 1.7),
            I("tv", -3.0, 0.1, 0),
            I("ceilingfan", -3.0, 1.6),
            I("plant", -5.4, 3.7),
            I("lamp", -5.4, 0.3),
            I("wallart", -3.0, -0.72, R, {
                y: 1.5,
                c: p.accent
            }),
            I("generator", -5.4, -0.2, H),
            // kitchen and dining
            I("stove", 2.0, 4.1, R),
            I("counter", 3.1, 4.15, R, {
                w: 1.2
            }),
            I("sink", 4.2, 4.15, R),
            I("fridge", 5.5, 3.3, -H),
            I("diningtable", 3.9, 1.0),
            ...around("chair", 3.9, 1.0, 0.95, 4, 0.8)
        ],
        lines: [
            "Ile mi, ile yin.",
            "Welcome, make yourself at home."
        ]
    });
}
/** Duplex: living room, dining, kitchen, study, master suite and two bedrooms. */ function duplex(p, owner) {
    return lay({
        id: "duplex",
        name: owner ? `${owner}'s duplex` : "Duplex",
        w: 16,
        d: 11,
        floor: p.floor,
        wall: p.wall,
        trim: p.trim,
        accent: p.accent,
        exitX: -4,
        walls: [
            W(-8, -1, -4.5, -1, 0.5),
            W(-4.5, -1, -0.5, -1, 0.5),
            W(-0.5, -1, 3, -1, 0.5),
            W(3, -1, 8, -1, 0.5),
            W(-4.5, -5.5, -4.5, -1),
            W(-0.5, -5.5, -0.5, -1),
            W(3, -5.5, 3, -1),
            W(0.5, -1, 0.5, 5.5, 0.7, 1.2)
        ],
        zones: [
            {
                x: -2.5,
                z: -3.2,
                w: 3.6,
                d: 4.2,
                floor: "tile",
                color: "#dfe5e0"
            },
            {
                x: 5.5,
                z: -3.2,
                w: 4.8,
                d: 4.2,
                floor: "wood"
            },
            {
                x: 4.2,
                z: 2.4,
                w: 7,
                d: 6,
                floor: "tile",
                color: "#e6e2d6"
            }
        ],
        items: [
            // master suite
            I("bed", -6.3, -3.6, 0, {
                w: 1.8
            }),
            I("sidetable", -7.6, -4.3),
            I("sidetable", -5.0, -4.3),
            I("wardrobe", -7.6, -1.8, H, {
                w: 1.4
            }),
            I("rug", -6.3, -2.2, 0, {
                w: 2.6,
                d: 1.4,
                c: p.accent
            }),
            I("lamp", -4.9, -1.6),
            // en-suite
            I("toilet", -3.4, -5.1),
            I("shower", -1.2, -4.8),
            I("basin", -2.3, -5.2),
            // bedroom 2
            I("bed", 1.2, -3.5, 0),
            I("wardrobe", 2.3, -1.6, R),
            I("sidetable", 2.4, -4.9),
            // study
            ...[
                I("pcdesk", 5.5, -4.7, 0, {
                    w: 1.5
                }),
                I("chair", 5.5, -3.9, R),
                I("bookshelf", 4.0, -5.1, 0),
                I("bookshelf", 5.1, -5.1, 0),
                I("bookshelf", 7.4, -3.6, -H),
                I("plant", 7.4, -1.6),
                I("armchair", 7.0, -2.2, -H),
                I("lamp", 3.6, -1.6)
            ],
            // living room
            I("sofa", -6.5, 4.8, R),
            I("loveseat", -4.0, 4.8, R, {
                w: 1.4
            }),
            I("sofa", -7.5, 1.6, H),
            I("armchair", -3.2, 1.2, -H),
            I("rug", -5.0, 2.0, 0, {
                w: 4,
                d: 3,
                c: p.accent
            }),
            I("coffeetable", -5.0, 2.1),
            I("tv", -5.0, 0.05, 0, {
                w: 1.5
            }),
            I("ceilingfan", -5.0, 2.0),
            I("ceilingfan", 4.5, 2.5),
            I("plant", -7.6, 3.8),
            I("plant", -1.5, 0.4),
            I("lamp", -1.5, 4.8),
            I("wallart", -5.0, -0.92, R, {
                y: 1.6,
                c: p.accent,
                w: 1.4
            }),
            I("generator", -7.6, 0.3, H),
            // dining
            I("diningtable", 4.0, 2.2, 0, {
                w: 2.2
            }),
            ...around("chair", 4.0, 2.2, 1.15, 6, 0.5),
            // kitchen
            I("stove", 1.4, 5.0, R),
            I("counter", 2.5, 5.05, R, {
                w: 1.5
            }),
            I("sink", 3.7, 5.05, R),
            I("fridge", 7.3, 4.4, -H),
            I("counter", 6.2, 5.05, R, {
                w: 1.6
            }),
            I("waterdispenser", 7.4, 1.4, -H)
        ],
        lines: [
            "Make yourself at home, abeg.",
            "The generator is behind the sofa."
        ]
    });
}
/** Mansion: grand parlour, home cinema, formal dining, big kitchen, study, master suite, guest rooms. */ function mansion(p, owner) {
    return lay({
        id: "mansion",
        name: owner ? `${owner}'s mansion` : "Mansion",
        w: 22,
        d: 14,
        floor: p.floor,
        wall: p.wall,
        trim: p.trim,
        accent: p.accent,
        exitX: -2,
        walls: [
            // back row: master suite | bath | guest 1 | guest 2 | study
            W(-11, -2, -6, -2, 0.5),
            W(-6, -2, -2.5, -2, 0.5),
            W(-2.5, -2, 1.5, -2, 0.5),
            W(1.5, -2, 5.5, -2, 0.5),
            W(5.5, -2, 11, -2, 0.5),
            W(-6, -7, -6, -2),
            W(-2.5, -7, -2.5, -2),
            W(1.5, -7, 1.5, -2),
            W(5.5, -7, 5.5, -2),
            // front row: cinema room on the right, kitchen mid-right
            W(5, -2, 5, 7, 0.222, 1.4),
            W(5, 2.2, 11, 2.2, 0.25, 1.4)
        ],
        zones: [
            {
                x: -8.5,
                z: -4.5,
                w: 5,
                d: 5,
                floor: "carpet",
                color: "#7a5a3a"
            },
            {
                x: -4.25,
                z: -4.5,
                w: 3.5,
                d: 5,
                floor: "tile",
                color: "#dfe5e0"
            },
            {
                x: 8.2,
                z: -4.5,
                w: 5.5,
                d: 5,
                floor: "wood"
            },
            {
                x: 8,
                z: 4.6,
                w: 6,
                d: 4.8,
                floor: "carpet",
                color: "#2b2540"
            },
            {
                x: 8,
                z: 0.1,
                w: 6,
                d: 4,
                floor: "tile",
                color: "#e6e2d6"
            }
        ],
        items: [
            // master suite
            I("bed", -8.5, -5.0, 0, {
                w: 2.0
            }),
            I("sidetable", -10.2, -5.8),
            I("sidetable", -6.8, -5.8),
            I("wardrobe", -10.4, -3.0, H, {
                w: 1.8
            }),
            I("armchair", -7.4, -2.8, R),
            I("rug", -8.5, -3.6, 0, {
                w: 3.2,
                d: 2,
                c: p.accent
            }),
            I("chandelier", -8.5, -4.5),
            I("lamp", -10.4, -6.2),
            // ensuite
            I("toilet", -5.0, -6.4),
            I("shower", -3.1, -6.2),
            I("basin", -4.1, -6.5),
            // guest 1 & 2
            I("bed", -0.5, -5.6, 0),
            I("wardrobe", 0.8, -2.7, R),
            I("sidetable", -1.8, -6.6),
            I("bed", 3.5, -5.6, 0),
            I("wardrobe", 4.9, -2.7, R),
            I("sidetable", 2.2, -6.6),
            // study / library
            I("pcdesk", 9.0, -6.2, 0, {
                w: 1.8
            }),
            I("chair", 9.0, -5.3, R),
            ...col("bookshelf", 10.6, -4.6, 3, 1.15, -H),
            ...row("bookshelf", 6.3, -6.8, 2, 1.15, 0),
            I("armchair", 6.6, -3.2, H),
            I("rug", 8.2, -3.7, 0, {
                w: 2.6,
                d: 1.6,
                c: "#2f3b82"
            }),
            I("plant", 9.8, -2.7),
            I("lamp", 6.3, -2.6),
            // grand parlour
            I("sofa", -8.5, 5.9, R, {
                w: 2.4
            }),
            I("sofa", -4.5, 5.9, R, {
                w: 2.4
            }),
            I("sofa", -9.8, 2.2, H),
            I("loveseat", -1.0, 3.2, -H),
            I("rug", -6.0, 3.0, 0, {
                w: 5,
                d: 3.6,
                c: p.accent
            }),
            I("coffeetable", -6.0, 3.0, 0, {
                w: 1.4
            }),
            I("tv", -6.0, -1.4, 0, {
                w: 2.0
            }),
            I("chandelier", -6, 3),
            I("chandelier", 0, 3),
            I("ceilingfan", -3, 4),
            I("plant", -10.2, 6.2),
            I("plant", -1.4, 6.2),
            I("plant", -10.3, -1.4),
            I("lamp", -1.6, 0.6),
            I("lamp", -10.3, 4.4),
            I("fountain", -0.2, 0.3, 0, {
                w: 1.4,
                d: 1.4
            }),
            I("wallart", -9.4, -1.9, 0, {
                y: 1.6,
                w: 1.4,
                c: p.accent
            }),
            I("generator", -10.4, 0.2, H),
            // formal dining
            I("diningtable", 1.2, 4.4, 0, {
                w: 3.2,
                d: 1.1
            }),
            ...row("chair", -0.1, 3.4, 3, 1.3, R),
            ...row("chair", -0.1, 5.4, 3, 1.3, 0),
            I("cabinet", 3.4, 6.6, R, {
                w: 1.4
            }),
            // kitchen
            I("stove", 10.45, -1.2, -H),
            I("counter", 10.45, -0.35, -H, {
                w: 1.0
            }),
            I("sink", 10.45, 0.55, -H),
            I("fridge", 10.45, 1.5, -H),
            I("counter", 7.9, -0.3, 0, {
                w: 2.2
            }),
            ...row("barstool", 7.0, 0.55, 3, 0.9, 0),
            I("waterdispenser", 6.0, 1.9, 0),
            // home cinema
            I("tv", 9.0, 2.75, R, {
                w: 3.0
            }),
            I("sofa", 7.0, 6.0, R, {
                w: 2.4
            }),
            I("sofa", 9.6, 6.0, R, {
                w: 2.4
            }),
            I("armchair", 6.0, 4.3, H),
            I("armchair", 10.4, 4.3, -H),
            I("coffeetable", 8.3, 4.3),
            I("plant", 5.6, 6.6)
        ],
        lines: [
            "Welcome, welcome. Sit down, let me bring you a drink.",
            "Chief is not around but make yourself comfortable."
        ]
    });
}
const FLAT_LAYOUT = flat(PALETTES[0]);
function homeLayout(plotTier, ownerSeed, ownerName) {
    let h = 0;
    for(let i = 0; i < ownerSeed.length; i++)h = h * 31 + ownerSeed.charCodeAt(i) >>> 0;
    const pal = PALETTES[h % PALETTES.length];
    if (plotTier === "flat") return flat(PALETTES[h % 3]);
    if (plotTier >= 3) return mansion(PALETTES[4 - h % 2], ownerName);
    if (plotTier === 2) return duplex(pal, ownerName);
    return bungalow(pal, ownerName);
}
const FLAT = FLAT_LAYOUT;
/* ----------------------------------------------------------------------------------------------
 * Public places
 * -------------------------------------------------------------------------------------------- */ const res = (name, x, z, o = {})=>({
        name,
        x,
        z,
        ...o
    });
const PLACE_LAYOUTS = {
    ui: lay({
        id: "ui",
        name: "Faculty Lecture Hall & Library",
        w: 18,
        d: 12,
        floor: "tile",
        wall: SAND,
        trim: COCOA,
        accent: INDIGO,
        light: "bright",
        exitX: -4,
        walls: [
            W(3, -6, 3, 6, 0.55, 1.4)
        ],
        zones: [
            {
                x: 6,
                z: 0,
                w: 6,
                d: 12,
                floor: "carpet",
                color: "#5a4636"
            }
        ],
        items: [
            I("blackboard", -3, -5.9, 0, {
                w: 4
            }),
            I("podium", -3, -4.6, 0),
            I("clock", 0.2, -5.9, 0, {
                y: 2
            }),
            ...grid("studentdesk", -7, -2.4, 4, 3, 2.0, 2.0, R),
            ...grid("chair", -7, -1.7, 4, 3, 2.0, 2.0, R),
            I("ceilingfan", -5, -1),
            I("ceilingfan", -1, -1),
            I("plant", -8.4, -5.2),
            I("plant", 1.6, 5.2),
            ...col("bookshelf", 8.8, -4.5, 4, 1.4, -H),
            ...row("bookshelf", 4.4, -5.8, 3, 1.15, 0),
            I("diningtable", 5.8, 0.4, 0, {
                w: 2.2
            }),
            ...around("chair", 5.8, 0.4, 1.2, 6, 0.4),
            I("lamp", 4.1, 4.8),
            I("wallart", 6.4, -5.9, 0, {
                y: 1.9,
                c: INDIGO,
                w: 1.2
            })
        ],
        residents: [
            res("Prof. Adebayo", -3, -3.6, {
                seed: "prof",
                lines: [
                    "Today we discuss the political economy of cocoa.",
                    "Silence, please."
                ]
            }),
            res("Dami", -5, -0.2, {
                pose: "sit",
                seatH: 0.45,
                seed: "dami"
            })
        ]
    }),
    zoo: lay({
        id: "zoo",
        name: "UI Zoo Visitor Centre",
        w: 14,
        d: 10,
        floor: "tile",
        wall: "#dcebc8",
        trim: COCOA,
        accent: TEAL,
        light: "bright",
        exitX: 0,
        walls: [],
        items: [
            ...row("tank", -4.6, -4.4, 3, 4.6, 0),
            I("rug", 0, 0.4, 0, {
                w: 4,
                d: 3,
                c: TEAL
            }),
            I("bench", -3, 1.2, 0),
            I("bench", 3, 1.2, 0),
            I("plant", -6.4, -4.6),
            I("plant", 6.4, -4.6),
            I("plant", -6.4, 3.8),
            I("plant", 6.4, 3.8),
            I("counter", 5.2, 3.8, R, {
                w: 2.2
            }),
            I("rack", 3.6, 3.6, R),
            I("displaycase", -5.4, 3.2, H, {
                w: 1.6
            }),
            I("ceilingfan", 0, 0),
            I("wallart", -6.9, 0, H, {
                y: 1.8,
                c: TEAL
            })
        ],
        residents: [
            res("Guide Emeka", 4.0, 2.4, {
                seed: "emeka",
                lines: [
                    "Our tortoise is older than Nigeria, you know."
                ]
            })
        ]
    }),
    "bodija-market": lay({
        id: "bodija-market",
        name: "Bodija Market Hall",
        w: 16,
        d: 11,
        floor: "concrete",
        wall: SAND,
        trim: COCOA,
        accent: RUST,
        exitX: 0,
        walls: [],
        items: [
            ...row("stall", -6, -3.8, 4, 4, 0),
            ...row("stall", -4, 0.4, 3, 4, 0),
            I("crates", -7.4, -5.0),
            I("crates", 7.2, -5.0, 0, {
                c: RUST
            }),
            I("sacks", -7.3, 3.5),
            I("sacks", 7.2, 3.6),
            I("sacks", 6.4, 3.6),
            I("umbrella", -2, -3.8),
            I("umbrella", 2, -3.8),
            I("umbrella", 6, -3.8),
            I("umbrella", -6, -3.8),
            I("rack", 6.5, 0.6, -H),
            I("crates", -7.2, 0.4),
            I("ceilingfan", -3, 2),
            I("ceilingfan", 3, 2)
        ],
        residents: [
            res("Mama Ngozi", -6, -2.7, {
                seed: "ngozi",
                lines: [
                    "Come buy tomato, fresh from farm!",
                    "Oga, last price!"
                ]
            }),
            res("Alhaji Musa", 0, 1.5, {
                seed: "musa",
                lines: [
                    "Pepper! Pepper!"
                ]
            })
        ]
    }),
    "amala-skye": lay({
        id: "amala-skye",
        name: "Amala Skye",
        w: 12,
        d: 9,
        floor: "redoxide",
        wall: "#d9a07a",
        trim: COCOA,
        accent: OCHRE,
        exitX: 0,
        walls: [
            W(-6, -2.2, 6, -2.2, 0.79, 1.4)
        ],
        zones: [
            {
                x: 0,
                z: -3.6,
                w: 12,
                d: 2.8,
                floor: "tile",
                color: "#e6e2d6"
            }
        ],
        items: [
            I("bar", -1.6, -1.7, 0, {
                w: 4.0
            }),
            I("stove", -3.5, -4.2, 0),
            I("stove", -2.5, -4.2, 0),
            I("sink", 0.2, -4.2, 0),
            I("fridge", 4.9, -3.9, R),
            I("counter", 2.2, -4.2, 0, {
                w: 1.6
            }),
            ...[
                [
                    -3.6,
                    0.8
                ],
                [
                    0,
                    1.0
                ],
                [
                    3.6,
                    0.8
                ],
                [
                    -3.0,
                    3.4
                ],
                [
                    3.0,
                    3.4
                ]
            ].flatMap(([x, z])=>[
                    I("roundtable", x, z),
                    ...around("plasticchair", x, z, 0.85, 3, 0.6)
                ]),
            I("tv", 5.75, 1.0, -H),
            I("ceilingfan", -2, 2),
            I("ceilingfan", 3, 2),
            I("plant", -5.4, 3.8),
            I("wallart", -5.9, 1.0, H, {
                y: 1.7,
                c: OCHRE
            })
        ],
        residents: [
            res("Mama Amala", 0, -2.8, {
                seed: "mamaamala",
                lines: [
                    "Gbegiri and ewedu, hot and fresh!",
                    "Abula for you?"
                ]
            }),
            res("Tolu", -3.6, 1.7, {
                pose: "sit",
                seatH: 0.45,
                seed: "tolu"
            })
        ]
    }),
    uch: lay({
        id: "uch",
        name: "UCH Outpatients",
        w: 16,
        d: 11,
        floor: "tile",
        wall: "#e4eef0",
        trim: "#5a7a8c",
        accent: "#d85a5a",
        light: "bright",
        exitX: -3,
        walls: [
            W(-1, -5.5, -1, 0, 0.8, 1.2),
            W(1, -5.5, 1, 0, 0.8, 1.2)
        ],
        zones: [
            {
                x: 4.5,
                z: -2.7,
                w: 7,
                d: 5.5,
                floor: "concrete",
                color: "#d8e0e4"
            }
        ],
        items: [
            I("desk", -5.5, -4.6, 0, {
                w: 1.6
            }),
            I("chair", -5.5, -3.8, R),
            I("chair", -4.2, -4.4, H),
            I("hospitalbed", -7.2, -2.2, 0, {
                w: 0.9
            }),
            I("cabinet", -2.2, -5.1, 0),
            I("curtain", -6.3, -1.6, 0),
            ...row("hospitalbed", 2.6, -4.3, 4, 1.6, 0),
            ...row("curtain", 3.4, -1.1, 3, 1.6, 0),
            I("cabinet", 7.4, -1.0, -H),
            I("counter", -5.5, 2.9, R, {
                w: 3
            }),
            I("pcdesk", -6.0, 4.1, R),
            I("chair", -6.0, 4.75, R),
            ...row("bench", 0.3, 4.2, 3, 1.9, R),
            ...row("bench", 0.3, 2.0, 3, 1.9, R),
            I("waterdispenser", 6.9, 4.6),
            I("plant", 7.2, 2.0),
            I("plant", -7.4, 1.0),
            I("clock", -0.2, -5.4, 0, {
                y: 2
            }),
            I("wallart", 5.0, 5.4, R, {
                y: 1.8,
                c: "#d85a5a"
            })
        ],
        residents: [
            res("Nurse Funke", -4.5, 3.8, {
                seed: "funke",
                lines: [
                    "Please take a seat, the doctor will see you."
                ]
            }),
            res("Dr. Ibrahim", -6.3, -3.2, {
                seed: "ibrahim"
            }),
            res("Patient", 4.8, -4.3, {
                pose: "lie",
                seatH: 0.65,
                seed: "patient"
            })
        ]
    }),
    agodi: lay({
        id: "agodi",
        name: "Agodi Gardens Pavilion",
        w: 12,
        d: 9,
        floor: "tile",
        wall: "#d6e8c8",
        trim: COCOA,
        accent: TEAL,
        light: "bright",
        exitX: 0,
        walls: [],
        zones: [
            {
                x: 0,
                z: 0,
                w: 12,
                d: 9,
                floor: "grass",
                color: "#9ad88f"
            },
            {
                x: 0,
                z: -0.3,
                w: 7,
                d: 5,
                floor: "tile",
                color: "#efe8d4"
            }
        ],
        items: [
            I("fountain", 0, -0.5, 0, {
                w: 2.2,
                d: 2.2
            }),
            ...around("bench", 0, -0.5, 2.4, 4, 0.8),
            I("diningtable", -4.3, 2.6),
            I("bench", -4.3, 1.8, 0, {
                w: 1.4
            }),
            I("bench", -4.3, 3.4, R, {
                w: 1.4
            }),
            I("diningtable", 4.3, 2.6),
            I("bench", 4.3, 1.8, 0, {
                w: 1.4
            }),
            I("bench", 4.3, 3.4, R, {
                w: 1.4
            }),
            I("plant", -5.4, -3.8),
            I("plant", 5.4, -3.8),
            I("plant", -5.4, 0),
            I("plant", 5.4, 0),
            I("plant", 0, -3.9),
            I("plant", -2.6, -3.6),
            I("plant", 2.6, -3.6)
        ],
        residents: [
            res("Jogger Kunle", 3.0, -2.2, {
                seed: "kunle"
            })
        ]
    }),
    amusement: lay({
        id: "amusement",
        name: "Trans-Amusement Arcade",
        w: 14,
        d: 10,
        floor: "carpet",
        wall: "#3a3470",
        trim: "#1d1a40",
        accent: "#e85d9a",
        light: "cool",
        exitX: 0,
        walls: [],
        zones: [
            {
                x: 0,
                z: 0,
                w: 14,
                d: 10,
                floor: "carpet",
                color: "#2b2540"
            }
        ],
        items: [
            ...row("arcade", -5.5, -4.5, 6, 2.2, 0),
            ...row("arcade", -3.3, -1.2, 4, 2.2, R),
            ...row("barstool", -3.3, -0.2, 4, 2.2, R),
            I("clawmachine", 5.6, 1.6, -H),
            I("clawmachine", 5.6, 3.2, -H),
            I("counter", -5.4, 3.4, R, {
                w: 2.4
            }),
            I("rack", -2.6, 3.9, R),
            I("bench", 2.6, 3.8, R),
            I("plant", 6.4, -4.6),
            I("plant", -6.4, 4.2),
            I("rug", 0, 2, 0, {
                w: 4,
                d: 2,
                c: "#e85d9a"
            })
        ],
        residents: [
            res("Attendant Bolu", -5.4, 2.4, {
                seed: "bolu",
                lines: [
                    "Tokens for the arcade, ₦200 each."
                ]
            })
        ]
    }),
    "mapo-hall": lay({
        id: "mapo-hall",
        name: "Mapo Council Hall",
        w: 18,
        d: 12,
        floor: "wood",
        wall: CREAM,
        trim: COCOA,
        accent: "#8a2f3c",
        light: "bright",
        exitX: 0,
        walls: [],
        items: [
            I("stage", 0, -4.6, 0, {
                w: 8,
                d: 2.6
            }),
            I("podium", 0, -4.8, 0, {
                y: 0.5
            }),
            I("flag", -3.6, -5.2),
            I("flag", 3.6, -5.2),
            I("chandelier", -4, 0),
            I("chandelier", 4, 0),
            ...grid("chair", -4.4, -2, 5, 5, 2.2, 1.45, R),
            I("wallart", -8.9, -2, H, {
                y: 1.8,
                c: "#8a2f3c"
            }),
            I("wallart", 8.9, -2, -H, {
                y: 1.8,
                c: "#8a2f3c"
            }),
            I("plant", -8.2, -5.2),
            I("plant", 8.2, -5.2),
            I("plant", -8.2, 5.0),
            I("plant", 8.2, 5.0),
            I("rug", 0, -3.0, 0, {
                w: 3,
                d: 6,
                c: "#8a2f3c"
            })
        ],
        residents: [
            res("Baale Ogundele", 0, -4.0, {
                seed: "baale",
                lines: [
                    "Order! Order in the hall.",
                    "We shall hear the next petition."
                ]
            })
        ]
    }),
    dugbe: lay({
        id: "dugbe",
        name: "Dugbe Cloth Market",
        w: 16,
        d: 11,
        floor: "concrete",
        wall: "#e0bd86",
        trim: COCOA,
        accent: INDIGO,
        exitX: 0,
        walls: [],
        items: [
            ...row("rack", -6.5, -4.5, 6, 2.6, 0),
            ...row("stall", -5, -1.2, 3, 5, 0),
            ...row("rack", -6, 2.2, 5, 3, R),
            I("umbrella", -5, -1.2),
            I("umbrella", 0, -1.2),
            I("umbrella", 5, -1.2),
            I("crates", 7.2, 4.4),
            I("crates", -7.4, 4.4),
            I("ceilingfan", -3, 3),
            I("ceilingfan", 3, 3),
            I("rug", 0, 4.2, 0, {
                w: 4,
                d: 1.4,
                c: INDIGO
            })
        ],
        residents: [
            res("Iya Alaso", -5, 0.0, {
                seed: "alaso",
                lines: [
                    "Adire, aso-oke, ankara! Come and see!"
                ]
            }),
            res("Customer", 1.5, 3.6, {
                seed: "cust"
            })
        ]
    }),
    ventura: lay({
        id: "ventura",
        name: "Ventura Mall Atrium",
        w: 18,
        d: 12,
        floor: "marble",
        wall: "#f4f1ec",
        trim: "#7c7a74",
        accent: "#c75c9a",
        light: "bright",
        exitX: 0,
        walls: [
            W(-9, -6, -3, -6)
        ],
        items: [
            ...row("rack", -8, -5.2, 3, 2.2, 0),
            ...row("rack", 3.4, -5.2, 3, 2.2, 0),
            ...row("counter", -7, -2.8, 2, 3.8, 0, {
                w: 1.8
            }),
            I("fountain", 0, 0, 0, {
                w: 2.4,
                d: 2.4
            }),
            ...around("bench", 0, 0, 2.2, 4, 0.8, {
                w: 1.2
            }),
            ...[
                [
                    -6.5,
                    3.2
                ],
                [
                    -3.2,
                    4
                ],
                [
                    4,
                    3.2
                ],
                [
                    7,
                    4
                ]
            ].flatMap(([x, z])=>[
                    I("roundtable", x, z),
                    ...around("barstool", x, z, 0.8, 3, 0.4)
                ]),
            I("liftdoor", 8.9, -3, -H),
            I("plant", -8.4, 5.2),
            I("plant", 8.4, 5.2),
            I("plant", -3.4, -2),
            I("plant", 3.4, -2),
            I("chandelier", -4, 0),
            I("chandelier", 4, 0),
            I("clawmachine", 8.3, 0.6, -H),
            I("arcade", 8.3, 1.8, -H)
        ],
        residents: [
            res("Shopper Bimpe", -6.6, -1.2, {
                seed: "bimpe",
                lines: [
                    "Ah, this sale is serious!"
                ]
            }),
            res("Cashier Uche", -7, -2.0, {
                seed: "uche"
            })
        ]
    }),
    premier: lay({
        id: "premier",
        name: "Premier Hotel Lobby",
        w: 14,
        d: 10,
        floor: "marble",
        wall: "#e6dcc6",
        trim: "#5a3a24",
        accent: "#2f6f66",
        light: "warm",
        exitX: 0,
        walls: [],
        items: [
            I("counter", 0, -3.4, 0, {
                w: 4
            }),
            I("pcdesk", -1.2, -4.5, 0),
            I("clock", 0, -4.95, 0, {
                y: 2.2
            }),
            I("wallart", -4.5, -4.95, 0, {
                y: 1.8,
                c: "#2f6f66",
                w: 1.3
            }),
            I("wallart", 4.5, -4.95, 0, {
                y: 1.8,
                c: "#2f6f66",
                w: 1.3
            }),
            I("rug", -3.5, 0.6, 0, {
                w: 3.6,
                d: 2.8,
                c: "#2f6f66"
            }),
            I("sofa", -3.5, 2.0, R),
            I("sofa", -5.6, 0.6, H),
            I("coffeetable", -3.5, 0.6),
            I("armchair", -1.6, 0.6, -H),
            I("bar", 4.6, 1.4, -H, {
                w: 3.4
            }),
            ...col("barstool", 3.5, -0.3, 4, 0.8, -H),
            I("liftdoor", 6.9, -3, -H),
            I("chandelier", 0, 0),
            I("chandelier", -3.5, 0.6),
            I("tv", 6.7, 3.4, -H),
            I("plant", -6.4, -4.5),
            I("plant", 6.2, -4.5),
            I("plant", -6.4, 4.2),
            I("plant", 3.0, 4.2)
        ],
        residents: [
            res("Receptionist Ayo", 0.8, -4.35, {
                seed: "ayo",
                lines: [
                    "Welcome to Premier. Do you have a reservation?"
                ]
            }),
            res("Guest", -3.5, 1.4, {
                pose: "sit",
                seatH: 0.45,
                seed: "guest"
            })
        ]
    }),
    cultural: lay({
        id: "cultural",
        name: "Cultural Centre Mokola",
        w: 14,
        d: 11,
        floor: "wood",
        wall: "#d9b08c",
        trim: COCOA,
        accent: INDIGO,
        exitX: 0,
        walls: [],
        items: [
            I("stage", 0, -4.2, 0, {
                w: 6.5,
                d: 2.8
            }),
            ...row("drum", -1.8, -4.4, 4, 1.2, 0, {
                y: 0.5
            }),
            I("rug", 0, -1.2, 0, {
                w: 4.5,
                d: 1.6,
                c: INDIGO
            }),
            ...col("displaycase", -6.4, -2.4, 3, 2.0, H, {
                w: 1.5
            }),
            ...col("displaycase", 6.4, -2.4, 3, 2.0, -H, {
                w: 1.5
            }),
            ...row("bench", -3, 1.2, 2, 3.6, 0, {
                w: 2.4
            }),
            ...row("bench", -3, 3.2, 2, 3.6, 0, {
                w: 2.4
            }),
            I("wallart", -6.9, 3.2, H, {
                y: 1.8,
                c: INDIGO
            }),
            I("wallart", 6.9, 3.2, -H, {
                y: 1.8,
                c: INDIGO
            }),
            I("wallart", -3.5, -5.4, 0, {
                y: 2,
                c: INDIGO,
                w: 1.4
            }),
            I("wallart", 3.5, -5.4, 0, {
                y: 2,
                c: RUST,
                w: 1.4
            }),
            I("plant", -6.4, -4.8),
            I("plant", 6.4, -4.8),
            I("ceilingfan", -3, 0),
            I("ceilingfan", 3, 0)
        ],
        residents: [
            res("Baba Alagbe", 0, -3.4, {
                seed: "alagbe",
                lines: [
                    "Gangan speaks. Listen with your heart.",
                    "My grandfather played for the Olubadan."
                ]
            })
        ]
    }),
    "cocoa-house": lay({
        id: "cocoa-house",
        name: "Cocoa House Offices",
        w: 16,
        d: 11,
        floor: "carpet",
        wall: "#ece8e0",
        trim: "#6b6a64",
        accent: "#d9a22b",
        light: "bright",
        exitX: -3,
        walls: [
            W(4.5, -5.5, 4.5, -0.5, 0.7, 1.2)
        ],
        zones: [
            {
                x: 0,
                z: 0,
                w: 16,
                d: 11,
                floor: "carpet",
                color: "#8a8c92"
            },
            {
                x: 6.5,
                z: -3,
                w: 4,
                d: 5,
                floor: "wood"
            }
        ],
        items: [
            ...grid("pcdesk", -6.5, -4.2, 4, 2, 3.0, 3.6, 0),
            ...grid("chair", -6.5, -3.4, 4, 2, 3.0, 3.6, R).map((c)=>({
                    ...c,
                    rot: R
                })),
            I("diningtable", 6.6, -3.0, 0, {
                w: 2.8
            }),
            ...row("chair", 5.5, -4.2, 3, 1.1, 0),
            ...row("chair", 5.5, -1.8, 3, 1.1, R),
            I("blackboard", 6.6, -5.4, 0, {
                w: 2.4
            }),
            I("counter", -5.8, 4.2, R, {
                w: 3
            }),
            I("pcdesk", -6.8, 5.0, R),
            ...row("bench", -1, 4.6, 2, 2.4, R),
            I("waterdispenser", 3.4, 4.8),
            I("plant", 7.2, 4.6),
            I("plant", -7.4, -1.0),
            I("plant", 3.6, -5.0),
            I("bookshelf", 3.9, -4.5, -H),
            I("ceilingfan", -3.5, -1.2),
            I("ceilingfan", 2, 1),
            I("wallart", 0, -5.4, 0, {
                y: 1.9,
                c: "#d9a22b",
                w: 1.6
            }),
            I("clock", 7.4, -5.4, 0, {
                y: 2
            })
        ],
        residents: [
            res("Mr. Adewale", -6.5, -3.4, {
                pose: "sit",
                seatH: 0.45,
                seed: "adewale",
                lines: [
                    "Another deadline, another day."
                ]
            }),
            res("Receptionist", -5.8, 5.0, {
                seed: "recep",
                lines: [
                    "Good morning, whom are you here to see?"
                ]
            })
        ]
    }),
    bowers: lay({
        id: "bowers",
        name: "Bower's Tower Gallery",
        w: 7,
        d: 7,
        floor: "wood",
        wall: "#c97a52",
        trim: "#5a3a24",
        accent: OCHRE,
        exitX: 0,
        walls: [],
        items: [
            I("stairs", -2.4, -1.6, H, {
                w: 3.0,
                d: 1.1
            }),
            I("displaycase", 2.2, -2.2, 0, {
                w: 1.4
            }),
            I("bench", 2.2, 0.8, -H, {
                w: 1.4
            }),
            I("plant", 2.8, -2.9),
            I("rug", 0, 1, 0, {
                w: 2.4,
                d: 1.4,
                c: OCHRE
            }),
            I("wallart", 0, -3.43, 0, {
                y: 1.7,
                c: RUST
            })
        ],
        residents: [
            res("Curator", -0.5, 0.2, {
                seed: "curator",
                lines: [
                    "From the top you can see all of Ibadan's rust roofs."
                ]
            })
        ]
    }),
    mosque: lay({
        id: "mosque",
        name: "Central Mosque",
        w: 14,
        d: 12,
        floor: "carpet",
        wall: "#f1ead7",
        trim: "#8a7a4a",
        accent: "#2f6f4f",
        light: "warm",
        exitX: 3,
        walls: [
            W(-7, 3.5, -2.5, 3.5, 0.5, 1.2)
        ],
        zones: [
            {
                x: 0,
                z: 0,
                w: 14,
                d: 12,
                floor: "carpet",
                color: "#2f6f4f"
            },
            {
                x: -4.7,
                z: 4.8,
                w: 4.5,
                d: 2.3,
                floor: "tile",
                color: "#e6e2d6"
            }
        ],
        items: [
            I("mimbar", 4, -5.3, 0),
            I("chandelier", 0, -1),
            I("chandelier", 0, 3.5),
            ...grid("prayermat", -4.5, -3.8, 5, 3, 2.2, 2.0, 0),
            ...row("basin", -6, 5.4, 4, 1.1, R),
            I("bench", -4.6, 4.3, 0, {
                w: 2
            }),
            I("wallart", -6.9, -1, H, {
                y: 1.9,
                c: "#2f6f4f",
                w: 1.2
            }),
            I("wallart", 6.9, -1, -H, {
                y: 1.9,
                c: "#2f6f4f",
                w: 1.2
            }),
            I("plant", -6.4, -5.2),
            I("plant", 6.4, 4.8),
            I("ceilingfan", -2.2, 0),
            I("ceilingfan", 2.2, 0)
        ],
        residents: [
            res("Imam Abdulsalam", 4, -4.2, {
                seed: "imam",
                lines: [
                    "Ṣalāh is the pillar of faith.",
                    "Peace be upon you."
                ]
            })
        ]
    }),
    cathedral: lay({
        id: "cathedral",
        name: "St. David's Cathedral",
        w: 14,
        d: 16,
        floor: "wood",
        wall: "#d8cdbb",
        trim: "#6b6458",
        accent: "#7a1f2e",
        light: "warm",
        exitX: 0,
        walls: [],
        items: [
            I("altar", 0, -7.0, 0),
            I("pulpit", -3.6, -5.8, H),
            I("flag", 4.6, -6.6),
            I("flag", -4.6, -7.4),
            I("rug", 0, -4.2, 0, {
                w: 2.2,
                d: 8,
                c: "#7a1f2e"
            }),
            ...row("pew", -3.2, -2.4, 1, 0, 0),
            ...[
                0,
                1,
                2,
                3,
                4
            ].flatMap((k)=>[
                    I("pew", -3.0, -3.2 + k * 2.0, 0, {
                        w: 2.6
                    }),
                    I("pew", 3.0, -3.2 + k * 2.0, 0, {
                        w: 2.6
                    })
                ]),
            I("chandelier", 0, -2),
            I("chandelier", 0, 3),
            I("plant", -6.2, -7.2),
            I("plant", 6.2, -7.2),
            I("wallart", -6.9, -1.5, H, {
                y: 1.9,
                c: "#7a1f2e"
            }),
            I("wallart", 6.9, -1.5, -H, {
                y: 1.9,
                c: "#7a1f2e"
            }),
            I("wallart", -6.9, 3.5, H, {
                y: 1.9,
                c: "#2f3b82"
            }),
            I("wallart", 6.9, 3.5, -H, {
                y: 1.9,
                c: "#2f3b82"
            }),
            I("ceilingfan", -3, 6),
            I("ceilingfan", 3, 6)
        ],
        residents: [
            res("Rev. Oyewole", 0, -5.8, {
                seed: "oyewole",
                lines: [
                    "The Lord is my shepherd.",
                    "Go in peace, my child."
                ]
            })
        ]
    }),
    stadium: lay({
        id: "stadium",
        name: "Lekan Salami Stadium Concourse",
        w: 18,
        d: 12,
        floor: "concrete",
        wall: "#8fc7c4",
        trim: "#3a6b68",
        accent: "#16a34a",
        light: "bright",
        exitX: -1.8,
        walls: [],
        zones: [
            {
                x: 0,
                z: -3.6,
                w: 12,
                d: 4.4,
                floor: "grass",
                color: "#58b66a"
            }
        ],
        items: [
            I("pitch", 0, -3.6, 0, {
                w: 12,
                d: 4.4
            }),
            I("goalpost", -5.4, -3.6, H, {
                w: 3.2
            }),
            I("goalpost", 5.4, -3.6, -H, {
                w: 3.2
            }),
            I("ticketbooth", -6, 3.6, R),
            I("ticketbooth", 6, 3.6, R),
            ...row("stall", -3.6, 4.6, 3, 3.6, R),
            ...row("rack", -2.4, 1.2, 2, 4.8, R),
            ...row("bench", -7.5, -0.6, 2, 15, 0, {
                w: 2
            }),
            I("flag", -8.4, 0.5),
            I("flag", 8.4, 0.5),
            I("flag", 0, 0.5, 0, {
                c: "#16a34a"
            }),
            I("wallart", -8.9, 3, H, {
                y: 1.9,
                c: "#16a34a"
            }),
            I("wallart", 8.9, 3, -H, {
                y: 1.9,
                c: "#16a34a"
            })
        ],
        residents: [
            res("Ultra Femi", -2, 0.4, {
                seed: "femi",
                lines: [
                    "Shooting Stars go win today!"
                ]
            }),
            res("Steward Ade", 6, 2.4, {
                seed: "steward"
            })
        ]
    }),
    "ring-road": lay({
        id: "ring-road",
        name: "Ring Road Motor Park Office",
        w: 14,
        d: 9,
        floor: "concrete",
        wall: "#f0cd6a",
        trim: "#7a5a1a",
        accent: "#2a2f3a",
        exitX: 0,
        walls: [],
        items: [
            I("counter", -2.5, -3.7, 0, {
                w: 3
            }),
            I("pcdesk", -5.4, -4.0, 0),
            I("counter", 3, -3.7, 0, {
                w: 3
            }),
            I("wallart", 0, -4.45, 0, {
                y: 1.7,
                c: "#2a2f3a",
                w: 2.4
            }),
            I("clock", 6, -4.45, 0, {
                y: 2
            }),
            ...row("bench", -4.5, 0.2, 3, 3.2, 0, {
                w: 2.4
            }),
            ...row("bench", -4.5, 2.4, 3, 3.2, 0, {
                w: 2.4
            }),
            I("stall", 5.2, 3.6, R),
            I("waterdispenser", 6.5, 0),
            I("ceilingfan", -3, 1),
            I("ceilingfan", 3, 1),
            I("plant", -6.4, 3.8)
        ],
        residents: [
            res("Conductor Wale", -2.5, -2.6, {
                seed: "wale",
                lines: [
                    "Challenge, Dugbe, Mokola! Enter, enter!"
                ]
            }),
            res("Passenger", -2, 2.8, {
                pose: "sit",
                seatH: 0.45,
                seed: "passenger"
            })
        ]
    }),
    golf: lay({
        id: "golf",
        name: "Ibadan Golf Club House",
        w: 14,
        d: 10,
        floor: "wood",
        wall: "#cfd9c4",
        trim: "#3f5a3a",
        accent: "#2f6f4f",
        exitX: 0,
        walls: [],
        items: [
            I("bar", 0, -3.8, 0, {
                w: 4.6
            }),
            ...row("barstool", -1.8, -2.9, 5, 0.9, 0),
            I("trophycase", -5.2, -4.5, 0),
            I("trophycase", 5.2, -4.5, 0),
            I("tv", 6.7, -1, -H),
            I("rug", -3.5, 1.0, 0, {
                w: 3.6,
                d: 2.6,
                c: "#2f6f4f"
            }),
            I("sofa", -3.5, 2.4, R),
            I("armchair", -5.4, 0.8, H),
            I("armchair", -1.6, 0.8, -H),
            I("coffeetable", -3.5, 0.9),
            I("diningtable", 3.8, 1.8, 0, {
                w: 1.6
            }),
            ...around("chair", 3.8, 1.8, 1.0, 4, 0.8),
            I("plant", -6.4, -4.2),
            I("plant", 6.4, 4.2),
            I("ceilingfan", -3.5, 1),
            I("ceilingfan", 3.8, 1.8),
            I("wallart", -6.9, 2.4, H, {
                y: 1.8,
                c: "#2f6f4f"
            })
        ],
        residents: [
            res("Barman Segun", 0, -4.7, {
                seed: "segun",
                lines: [
                    "Cold Chapman for you, sir?"
                ]
            }),
            res("Chief Balogun", -3.5, 1.3, {
                pose: "sit",
                seatH: 0.45,
                seed: "balogun",
                lines: [
                    "Eighteen holes and still I did not win."
                ]
            })
        ]
    }),
    "govt-house": lay({
        id: "govt-house",
        name: "Government House Reception",
        w: 16,
        d: 12,
        floor: "marble",
        wall: "#f1eee6",
        trim: "#8a7a5a",
        accent: "#1f7a46",
        light: "bright",
        exitX: 0,
        walls: [],
        items: [
            I("pcdesk", 0, -4.8, 0, {
                w: 2.0
            }),
            I("armchair", 0, -3.8, R),
            I("flag", -2.6, -5.2),
            I("flag", 2.6, -5.2),
            I("rug", 0, -1.4, 0, {
                w: 5,
                d: 3.6,
                c: "#1f7a46"
            }),
            I("diningtable", 0, -1.4, 0, {
                w: 4.4,
                d: 1.2
            }),
            ...row("chair", -1.9, -2.5, 4, 1.3, 0),
            ...row("chair", -1.9, -0.3, 4, 1.3, R),
            I("counter", -5.2, 4.4, R, {
                w: 3
            }),
            ...row("bench", 2.0, 4.6, 2, 2.4, R, {
                w: 1.8
            }),
            ...col("bookshelf", -7.7, -4.8, 3, 1.15, H),
            ...col("bookshelf", 7.7, -4.8, 3, 1.15, -H),
            I("wallart", -5, -5.9, 0, {
                y: 1.9,
                c: "#1f7a46",
                w: 1.2
            }),
            I("wallart", 5, -5.9, 0, {
                y: 1.9,
                c: "#1f7a46",
                w: 1.2
            }),
            I("chandelier", 0, -1.4),
            I("chandelier", 0, 3),
            I("plant", -7.2, 5.0),
            I("plant", 7.2, 5.0),
            I("clock", 0, -5.9, 0, {
                y: 2.4
            })
        ],
        residents: [
            res("Secretary Hauwa", -5.2, 5.1, {
                seed: "hauwa",
                lines: [
                    "His Excellency will see you shortly."
                ]
            }),
            res("Governor's aide", 0.2, -3.2, {
                seed: "aide"
            })
        ]
    })
};
function placeLayout(id) {
    return PLACE_LAYOUTS[id] ?? null;
}
const ALL_PLACE_LAYOUT_IDS = Object.keys(PLACE_LAYOUTS);
function layoutFor(ref, tierOf) {
    if (ref.kind === "place") return placeLayout(ref.id);
    if (ref.id === "flat") return FLAT_LAYOUT;
    const plot = tierOf?.(ref.id);
    if (!plot || plot.tier < 1) return null;
    const npc = plot.ownerId.startsWith("npc:");
    return {
        ...homeLayout(plot.tier, plot.ownerId, plot.ownerName),
        id: ref.id,
        residents: npc ? [
            {
                name: plot.ownerName,
                x: -2,
                z: 1.5,
                seed: plot.ownerName,
                lines: [
                    "Welcome, welcome! Please sit down.",
                    "You must be hungry. Have some pounded yam."
                ]
            }
        ] : undefined
    };
}
}),
"[project]/src/lib/look.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACCESSORIES",
    ()=>ACCESSORIES,
    "BUILDS",
    ()=>BUILDS,
    "CLOTH_COLORS",
    ()=>CLOTH_COLORS,
    "DEFAULT_LOOK",
    ()=>DEFAULT_LOOK,
    "FRAMES",
    ()=>FRAMES,
    "HAIR_COLORS",
    ()=>HAIR_COLORS,
    "HAIR_STYLES",
    ()=>HAIR_STYLES,
    "SKIN_TONES",
    ()=>SKIN_TONES,
    "TOP_STYLES",
    ()=>TOP_STYLES,
    "colorFor",
    ()=>colorFor,
    "randomLook",
    ()=>randomLook,
    "seededLook",
    ()=>seededLook,
    "topsFor",
    ()=>topsFor
]);
const SKIN_TONES = [
    "#b07a52",
    "#9a6642",
    "#85553a",
    "#704630",
    "#5c3a28",
    "#472c1f",
    "#33201a"
];
const HAIR_COLORS = [
    "#15110e",
    "#3b2a1d",
    "#6b4a2f",
    "#b8862b",
    "#c0392b",
    "#7b5cd6",
    "#e8e8e4"
];
const CLOTH_COLORS = [
    "#f4f4f2",
    "#1d2433",
    "#0f766e",
    "#16a34a",
    "#f59e0b",
    "#ec4899",
    "#6366f1",
    "#dc2626",
    "#0ea5e9",
    "#7c3aed"
];
const HAIR_STYLES = [
    {
        id: "lowcut",
        label: "Natural"
    },
    {
        id: "bald",
        label: "Bald"
    },
    {
        id: "afro",
        label: "Afro"
    },
    {
        id: "puffs",
        label: "Afro puffs"
    },
    {
        id: "braids",
        label: "Braids"
    },
    {
        id: "cornrows",
        label: "Cornrows"
    },
    {
        id: "locs",
        label: "Locs"
    },
    {
        id: "twists",
        label: "Twists"
    },
    {
        id: "bun",
        label: "Bun"
    },
    {
        id: "gele",
        label: "Gele"
    },
    {
        id: "turban",
        label: "Turban"
    },
    {
        id: "hijab",
        label: "Hijab"
    }
];
const TOP_STYLES = [
    {
        id: "tee",
        label: "T-shirt",
        frames: [
            "m",
            "f"
        ],
        group: "Everyday"
    },
    {
        id: "hoodie",
        label: "Hoodie",
        frames: [
            "m"
        ],
        group: "Everyday"
    },
    {
        id: "dress",
        label: "Dress",
        frames: [
            "f"
        ],
        group: "Everyday"
    },
    {
        id: "suit",
        label: "Office suit",
        frames: [
            "m",
            "f"
        ],
        group: "Everyday"
    },
    {
        id: "jersey",
        label: "Super Eagles jersey",
        frames: [
            "m",
            "f"
        ],
        group: "Everyday"
    },
    {
        id: "worker",
        label: "Hi-vis worker",
        frames: [
            "m",
            "f"
        ],
        group: "Everyday"
    },
    {
        id: "overalls",
        label: "Overalls",
        frames: [
            "m"
        ],
        group: "Everyday"
    },
    {
        id: "singlet",
        label: "Singlet & shorts",
        frames: [
            "m"
        ],
        group: "Everyday"
    },
    {
        id: "senator",
        label: "Senator kaftan",
        frames: [
            "m"
        ],
        group: "Nigerian"
    },
    {
        id: "buba",
        label: "Buba & sokoto",
        frames: [
            "m"
        ],
        group: "Nigerian"
    },
    {
        id: "babariga",
        label: "Babariga (Hausa gown)",
        frames: [
            "m",
            "f"
        ],
        group: "Nigerian"
    },
    {
        id: "isiagu",
        label: "Isi agu",
        frames: [
            "m",
            "f"
        ],
        group: "Nigerian"
    },
    {
        id: "agbada",
        label: "Agbada",
        frames: [
            "m",
            "f"
        ],
        group: "Nigerian"
    },
    {
        id: "ankara",
        label: "Ankara iro & buba",
        frames: [
            "f"
        ],
        group: "Nigerian"
    },
    {
        id: "asooke",
        label: "Aso-oke & ipele",
        frames: [
            "f"
        ],
        group: "Nigerian"
    },
    {
        id: "gown",
        label: "Ankara gown",
        frames: [
            "f"
        ],
        group: "Nigerian"
    }
];
const topsFor = (frame)=>TOP_STYLES.filter((t)=>t.frames.includes(frame ?? "m"));
const ACCESSORIES = [
    {
        id: "none",
        label: "None"
    },
    {
        id: "glasses",
        label: "Glasses"
    },
    {
        id: "sunglasses",
        label: "Sunglasses"
    },
    {
        id: "cap",
        label: "Cap"
    },
    {
        id: "fila",
        label: "Fila"
    },
    {
        id: "hula",
        label: "Hausa cap"
    },
    {
        id: "igbocap",
        label: "Igbo red cap"
    }
];
const BUILDS = [
    {
        id: "slim",
        label: "Slim"
    },
    {
        id: "regular",
        label: "Regular"
    },
    {
        id: "broad",
        label: "Broad"
    }
];
const FRAMES = [
    {
        id: "m",
        label: "Masculine"
    },
    {
        id: "f",
        label: "Feminine"
    }
];
const DEFAULT_LOOK = {
    skin: "#7a4a2c",
    frame: "m",
    build: "regular",
    hairStyle: "lowcut",
    hairColor: "#15110e",
    top: "tee",
    topColor: "#0f766e",
    bottomColor: "#1d2433",
    shoeColor: "#f4f4f2",
    accessory: "none"
};
function makeLook(r) {
    const pick = (a)=>a[Math.floor(r() * a.length)];
    const frame = pick(FRAMES).id;
    const hairStyle = pick(HAIR_STYLES).id;
    const headwear = hairStyle === "gele" || hairStyle === "turban" || hairStyle === "hijab" || hairStyle === "afro" || hairStyle === "puffs";
    return {
        skin: pick(SKIN_TONES.slice(1)),
        frame,
        build: pick(BUILDS).id,
        hairStyle,
        hairColor: pick(HAIR_COLORS.slice(0, 4)),
        top: pick(topsFor(frame)).id,
        topColor: pick(CLOTH_COLORS),
        bottomColor: pick([
            "#1d2433",
            "#3a3f4b",
            "#0f766e",
            "#7c5a3a",
            "#f4f4f2"
        ]),
        shoeColor: pick([
            "#f4f4f2",
            "#1d2433",
            "#dc2626",
            "#f59e0b"
        ]),
        accessory: headwear ? pick([
            "none",
            "none",
            "glasses",
            "sunglasses"
        ]) : pick(ACCESSORIES).id
    };
}
const randomLook = ()=>makeLook(Math.random);
function seededLook(seed) {
    let h = 2166136261;
    for(let i = 0; i < seed.length; i++)h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
    const r = ()=>{
        h = Math.imul(h ^ h >>> 15, 2246822507) >>> 0;
        h = Math.imul(h ^ h >>> 13, 3266489909) >>> 0;
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    };
    return makeLook(r);
}
function colorFor(id) {
    let h = 0;
    for(let i = 0; i < id.length; i++)h = (h * 31 + id.charCodeAt(i)) % 360;
    return `hsl(${h} 70% 50%)`;
}
}),
"[project]/src/lib/moderation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanChat",
    ()=>cleanChat
]);
/**
 * Basic chat hygiene, shared by client and server. This is a first line of defence only.
 * Extend BLOCKED with Yoruba / Pidgin terms from a native speaker before a public launch.
 */ const BLOCKED = [
    "fuck",
    "fucking",
    "shit",
    "bitch",
    "asshole",
    "bastard",
    "cunt",
    "dick",
    "pussy",
    "whore",
    "slut",
    "motherfucker",
    "ashawo",
    "oloshi",
    "oloriburuku"
];
/** Patterns for slurs and obfuscated forms (leetspeak, repeated letters). */ const PATTERNS = [
    /\bn+[i1!]+g+[ae3]+r?s?\b/gi,
    /\bf+[u*]+c+k+\w*/gi,
    /\bs+h+[i1!]+t+\w*/gi
];
const WORDS = new RegExp(`\\b(${BLOCKED.join("|")})\\b`, "gi");
const URLS = /(?:https?:\/\/|www\.)\S+|\b[\w-]+\.(?:com|net|org|ng|io|xyz|ly|me)\b\S*/gi;
const mask = (m)=>"*".repeat(m.length);
function cleanChat(text) {
    let t = String(text ?? "").replace(/[\u0000-\u001f<>]/g, " ");
    t = t.replace(URLS, "[link]");
    t = t.replace(WORDS, mask);
    for (const p of PATTERNS)t = t.replace(p, mask);
    t = t.replace(/(.)\1{5,}/g, "$1$1$1"); // aaaaaaaa -> aaa
    return t.replace(/\s+/g, " ").trim().slice(0, 200);
}
}),
"[project]/src/lib/movement.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KEKE_FARE",
    ()=>KEKE_FARE,
    "rideToPlace",
    ()=>rideToPlace,
    "stopWalking",
    ()=>stopWalking,
    "walkTo",
    ()=>walkTo,
    "walkToPlace",
    ()=>walkToPlace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pathing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
;
;
;
;
function walkTo(x, z) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (!s.profile) return false;
    if (s.busy) {
        s.toast("Finish what you're doing first.", "info");
        return false;
    }
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findPath"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z, x, z);
    if (!path) return false;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = path;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].goalPlace = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride = false;
    return true;
}
function walkToPlace(id) {
    const place = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].find((p)=>p.id === id);
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (!place || !s.profile) return false;
    if (s.atPlace === id) return true;
    if (s.busy) return false;
    const door = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doorOf"])(place);
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findPath"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].z, door.x, door.z);
    if (!path) return false;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = path;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].goalPlace = id;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride = false;
    return true;
}
const KEKE_FARE = 300;
function rideToPlace(id) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (s.money < KEKE_FARE) {
        s.toast(`A keke costs ₦${KEKE_FARE}.`, "bad");
        return false;
    }
    if (s.atPlace === id) return true;
    if (!walkToPlace(id)) return false;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride = true;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
        money: s.money - KEKE_FARE
    });
    s.toast(`Keke! −₦${KEKE_FARE}`, "info");
    return true;
}
function stopWalking() {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].path = [];
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].goalPlace = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["me"].ride = false;
}
}),
"[project]/src/lib/net.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callRoom",
    ()=>callRoom,
    "net",
    ()=>net,
    "roomOf",
    ()=>roomOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/voice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$moderation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/moderation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiors.ts [app-ssr] (ecmascript)");
;
;
;
;
;
let ws = null;
let want = false;
let retry = 0;
let timer = null;
const wsUrl = ()=>process.env.NEXT_PUBLIC_WS_URL || `${location.protocol === "https:" ? "wss" : "ws"}://${location.hostname}:8787`;
function send(m) {
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(m));
}
__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].init(send);
__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hooks"].plotSet = (plotId, plot)=>send({
        t: "plotSet",
        plotId,
        plot
    });
const roomOf = (atPlace, interior)=>interior ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interiorKey"])(interior) : atPlace ?? "streets";
const callRoom = (a, b)=>`call:${[
        a,
        b
    ].sort().join(":")}`;
function upsert(p) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (p.id === s.connId) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
        remotes: {
            ...s.remotes,
            [p.id]: p
        }
    });
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].has(p.id)) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].set(p.id, {
        x: p.x,
        z: p.z,
        ry: p.ry,
        speed: 0,
        tx: p.x,
        tz: p.z,
        tr: p.ry
    });
}
function handle(m) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    switch(m.t){
        case "welcome":
            {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                    connId: m.id,
                    net: "online"
                });
                const mine = Object.entries(s.plots).filter(([id, p])=>p.ownerId === s.profile?.id && !m.plots[id]);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().setPlots(m.plots);
                for (const [id, p] of mine){
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().setPlot(id, p);
                    send({
                        t: "plotSet",
                        plotId: id,
                        plot: p
                    });
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].clear();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                    remotes: {}
                });
                m.peers.forEach(upsert);
                send({
                    t: "room",
                    room: roomOf(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().atPlace, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().interior)
                });
                break;
            }
        case "join":
            upsert(m.peer);
            break;
        case "leave":
            {
                const next = {
                    ...s.remotes
                };
                delete next[m.id];
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].delete(m.id);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                    remotes: next
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].peerLeft(m.id);
                if (s.call.peerId === m.id) endCallLocal();
                break;
            }
        case "moves":
            for (const [id, x, z, ry, sp] of m.m){
                const r = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].get(id);
                if (r) {
                    r.tx = x;
                    r.tz = z;
                    r.tr = ry;
                    r.speed = sp;
                }
            }
            break;
        case "chat":
            {
                const self = m.id === s.connId;
                const pid = s.remotes[m.id]?.pid;
                if (!self && pid && s.muted.includes(pid)) break;
                s.addChat({
                    room: m.room,
                    from: m.name,
                    text: m.text,
                    at: m.at,
                    self,
                    fromId: m.id,
                    fromPid: pid
                }, self ? "me" : m.id);
                break;
            }
        case "plots":
            s.setPlots(m.plots);
            break;
        case "plot":
            s.setPlot(m.plotId, m.plot);
            break;
        case "reject":
            break; // the server follows up with the authoritative `plots` snapshot
        case "online":
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                online: m.n
            });
            break;
        case "voiceMembers":
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].members(m.room, m.ids);
            break;
        case "voicePeerJoined":
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].peerJoined(m.room, m.id);
            break;
        case "voicePeerLeft":
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].peerLeft(m.id);
            break;
        case "signal":
            void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].signal(m.from, m.data);
            break;
        case "incomingCall":
            if (s.call.phase !== "idle" || s.incoming) send({
                t: "callReply",
                to: m.from,
                accept: false
            });
            else __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                incoming: {
                    from: m.from,
                    name: m.name
                }
            });
            break;
        case "callReply":
            if (m.accept && s.call.phase === "calling" && s.call.peerId === m.from) {
                const room = callRoom(s.connId ?? "", m.from);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                    call: {
                        ...s.call,
                        phase: "live",
                        room
                    }
                });
                s.recordStat("calls");
                void joinCallVoice(room);
            } else {
                s.toast(`${s.call.peerName || "They"} can't talk right now.`, "info");
                endCallLocal();
            }
            break;
        case "hangup":
            if (s.call.peerId === m.from) {
                s.toast(`${s.call.peerName} ended the call.`, "info");
                endCallLocal();
            }
            if (s.incoming?.from === m.from) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                incoming: null
            });
            break;
    }
}
/** A call without a working microphone is pointless, so hang up if we can't start voice. */ async function joinCallVoice(room) {
    const ok = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].join(room);
    if (!ok && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().call.room === room) net.hangup();
}
function endCallLocal() {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].leave();
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
        call: {
            phase: "idle",
            peerId: null,
            peerName: "",
            room: null
        }
    });
}
function connect() {
    const { profile } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
    if (!profile || ws) return;
    want = true;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
        net: "connecting"
    });
    try {
        ws = new WebSocket(wsUrl());
    } catch  {
        ws = null;
        return;
    }
    ws.onopen = ()=>{
        retry = 0;
        send({
            t: "hello",
            pid: profile.id,
            name: profile.name,
            look: profile.look
        });
    };
    ws.onmessage = (e)=>{
        try {
            handle(JSON.parse(String(e.data)));
        } catch  {
        /* ignore malformed frames */ }
    };
    ws.onerror = ()=>ws?.close();
    ws.onclose = ()=>{
        ws = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remoteMotion"].clear();
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().call.phase !== "idle") endCallLocal();
        else __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$voice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voice"].leave();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            net: "offline",
            connId: null,
            remotes: {},
            online: 0,
            incoming: null
        });
        if (want) {
            timer = setTimeout(connect, Math.min(10000, 1000 * 2 ** retry++));
        }
    };
}
const net = {
    connect,
    disconnect () {
        want = false;
        if (timer) clearTimeout(timer);
        ws?.close();
        ws = null;
    },
    /** Re-announce name/look after the avatar is edited. */ hello () {
        const { profile } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        if (profile) send({
            t: "hello",
            pid: profile.id,
            name: profile.name,
            look: profile.look
        });
    },
    move (x, z, ry, s) {
        send({
            t: "move",
            x,
            z,
            ry,
            s
        });
    },
    room (room) {
        send({
            t: "room",
            room
        });
    },
    chat (text) {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        const clean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$moderation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanChat"])(text);
        if (!clean) return;
        s.recordStat("chats");
        const room = roomOf(s.atPlace, s.interior);
        if (s.net === "online") send({
            t: "chat",
            text: clean
        });
        else s.addChat({
            room,
            from: s.profile?.name ?? "me",
            text: clean,
            at: Date.now(),
            self: true
        }, "me");
    },
    call (to, name) {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        if (s.call.phase !== "idle") return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            call: {
                phase: "calling",
                peerId: to,
                peerName: name,
                room: null
            }
        });
        send({
            t: "call",
            to
        });
    },
    answer (accept) {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        const inc = s.incoming;
        if (!inc) return;
        send({
            t: "callReply",
            to: inc.from,
            accept
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            incoming: null
        });
        if (accept) {
            const room = callRoom(s.connId ?? "", inc.from);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
                call: {
                    phase: "live",
                    peerId: inc.from,
                    peerName: inc.name,
                    room
                }
            });
            s.recordStat("calls");
            void joinCallVoice(room);
        }
    },
    /** Flag a player to the moderators (logged server-side). */ report (id, reason) {
        send({
            t: "report",
            id,
            reason: reason.slice(0, 120)
        });
    },
    hangup () {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState();
        if (s.call.peerId) send({
            t: "hangup",
            to: s.call.peerId
        });
        endCallLocal();
    }
};
}),
"[project]/src/lib/overlay.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** DOM overlay anchors: elements whose screen position tracks a 3D point (see LabelProjector). */ __turbopack_context__.s([
    "anchors",
    ()=>anchors
]);
const anchors = new Map();
}),
"[project]/src/lib/pathing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Grid",
    ()=>Grid,
    "findPath",
    ()=>findPath,
    "findWorldPath",
    ()=>findWorldPath,
    "getWorldGrid",
    ()=>getWorldGrid,
    "isBlockedAt",
    ()=>isBlockedAt,
    "rebuildGrid",
    ()=>rebuildGrid,
    "setActiveGrid",
    ()=>setActiveGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
;
;
class Grid {
    minX;
    minZ;
    nx;
    nz;
    cell;
    blocked;
    constructor(minX, minZ, nx, nz, cell){
        this.minX = minX;
        this.minZ = minZ;
        this.nx = nx;
        this.nz = nz;
        this.cell = cell;
        this.ci = (x)=>Math.floor((x - this.minX) / this.cell);
        this.cj = (z)=>Math.floor((z - this.minZ) / this.cell);
        this.cx = (i)=>this.minX + (i + 0.5) * this.cell;
        this.cz = (j)=>this.minZ + (j + 0.5) * this.cell;
        this.inside = (i, j)=>i >= 0 && j >= 0 && i < this.nx && j < this.nz;
        this.blocked = new Uint8Array(nx * nz);
    }
    ci;
    cj;
    cx;
    cz;
    inside;
    /** Block a centred rectangle, grown by `margin` on every side. */ blockRect(x, z, w, d, margin = 0) {
        const i0 = this.ci(x - w / 2 - margin);
        const i1 = this.ci(x + w / 2 + margin);
        const j0 = this.cj(z - d / 2 - margin);
        const j1 = this.cj(z + d / 2 + margin);
        for(let i = i0; i <= i1; i++)for(let j = j0; j <= j1; j++)if (this.inside(i, j)) this.blocked[j * this.nx + i] = 1;
    }
    isBlockedAt(x, z) {
        const i = this.ci(x);
        const j = this.cj(z);
        return !this.inside(i, j) || this.blocked[j * this.nx + i] === 1;
    }
    /** Nearest free cell to (i, j), searching outwards (used for the start point). */ nearestFree(i, j) {
        if (this.inside(i, j) && !this.blocked[j * this.nx + i]) return [
            i,
            j
        ];
        for(let r = 1; r < 14; r++){
            for(let di = -r; di <= r; di++){
                for(let dj = -r; dj <= r; dj++){
                    if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
                    const a = i + di;
                    const b = j + dj;
                    if (this.inside(a, b) && !this.blocked[b * this.nx + a]) return [
                        a,
                        b
                    ];
                }
            }
        }
        return null;
    }
    /** Cells reachable from `start` (flood fill), so goals never land in a walled-off pocket. */ reachableFrom(start) {
        const { nx, nz, blocked } = this;
        const seen = new Uint8Array(nx * nz);
        const queue = [
            start
        ];
        seen[start] = 1;
        for(let q = 0; q < queue.length; q++){
            const cur = queue[q];
            const ci = cur % nx;
            const cj = Math.floor(cur / nx);
            for(let di = -1; di <= 1; di++){
                for(let dj = -1; dj <= 1; dj++){
                    if (!di && !dj) continue;
                    const ni = ci + di;
                    const nj = cj + dj;
                    if (!this.inside(ni, nj)) continue;
                    const n = nj * nx + ni;
                    if (seen[n] || blocked[n]) continue;
                    if (di && dj && (blocked[cj * nx + ni] || blocked[nj * nx + ci])) continue;
                    seen[n] = 1;
                    queue.push(n);
                }
            }
        }
        return seen;
    }
    /** The reachable cell closest to the world point (tx, tz). */ nearestReachable(reach, tx, tz) {
        let best = -1;
        let bestD = Infinity;
        for(let n = 0; n < reach.length; n++){
            if (!reach[n]) continue;
            const dx = this.cx(n % this.nx) - tx;
            const dz = this.cz(Math.floor(n / this.nx)) - tz;
            const d = dx * dx + dz * dz;
            if (d < bestD) {
                bestD = d;
                best = n;
            }
        }
        return best;
    }
    lineClear(a, b) {
        const dist = Math.hypot(b.x - a.x, b.z - a.z);
        const steps = Math.ceil(dist / (this.cell * 0.6));
        for(let k = 1; k < steps; k++){
            const f = k / steps;
            if (this.isBlockedAt(a.x + (b.x - a.x) * f, a.z + (b.z - a.z) * f)) return false;
        }
        return true;
    }
    /** A* over the 8-connected grid. Returns world waypoints (excluding the start). */ find(sx, sz, tx, tz) {
        const { nx, nz, blocked } = this;
        const s = this.nearestFree(this.ci(sx), this.cj(sz));
        if (!s) return null;
        const start = s[1] * nx + s[0];
        const goal = this.nearestReachable(this.reachableFrom(start), tx, tz);
        if (goal < 0) return null;
        const g = new Float32Array(nx * nz).fill(Infinity);
        const from = new Int32Array(nx * nz).fill(-1);
        const closed = new Uint8Array(nx * nz);
        const open = [];
        g[start] = 0;
        open.push([
            0,
            start
        ]);
        const h = (idx)=>{
            const dx = Math.abs(idx % nx - goal % nx);
            const dz = Math.abs(Math.floor(idx / nx) - Math.floor(goal / nx));
            return Math.max(dx, dz) + 0.414 * Math.min(dx, dz);
        };
        while(open.length){
            let best = 0;
            for(let k = 1; k < open.length; k++)if (open[k][0] < open[best][0]) best = k;
            const [, cur] = open.splice(best, 1)[0];
            if (cur === goal) break;
            if (closed[cur]) continue;
            closed[cur] = 1;
            const ci = cur % nx;
            const cj = Math.floor(cur / nx);
            for(let di = -1; di <= 1; di++){
                for(let dj = -1; dj <= 1; dj++){
                    if (!di && !dj) continue;
                    const ni = ci + di;
                    const nj = cj + dj;
                    if (!this.inside(ni, nj) || blocked[nj * nx + ni]) continue;
                    if (di && dj && (blocked[cj * nx + ni] || blocked[nj * nx + ci])) continue;
                    const n = nj * nx + ni;
                    const cost = g[cur] + (di && dj ? 1.414 : 1);
                    if (cost < g[n]) {
                        g[n] = cost;
                        from[n] = cur;
                        open.push([
                            cost + h(n),
                            n
                        ]);
                    }
                }
            }
        }
        if (from[goal] === -1 && goal !== start) return null;
        const pts = [];
        for(let c = goal; c !== start && c !== -1; c = from[c])pts.push({
            x: this.cx(c % nx),
            z: this.cz(Math.floor(c / nx))
        });
        pts.reverse();
        // string-pull: drop waypoints that sit on a straight clear line
        const out = [];
        let anchor = {
            x: sx,
            z: sz
        };
        for(let k = 0; k < pts.length; k++){
            const next = pts[k + 1];
            if (next && this.lineClear(anchor, next)) continue;
            out.push(pts[k]);
            anchor = pts[k];
        }
        return out;
    }
}
/* ------------------------------- city grid ------------------------------- */ const MARGIN = 0.45;
let world = new Grid(-27, -27, 54, 54, 1);
let active = world;
function baseRects() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLACES"].filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSolid"]).map((p)=>({
            x: p.pos[0],
            z: p.pos[1],
            w: p.size[0],
            d: p.size[2]
        }));
}
function rebuildGrid(builtPlots) {
    const grid = new Grid(-27, -27, 54, 54, 1);
    const built = new Set(builtPlots);
    const rects = baseRects();
    for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOTS"])if (built.has(p.id)) rects.push({
        x: p.pos[0],
        z: p.pos[1],
        w: 1.9,
        d: 1.9
    });
    for (const r of rects)grid.blockRect(r.x, r.z, r.w, r.d, MARGIN);
    const wasActive = active === world;
    world = grid;
    if (wasActive) active = world;
}
rebuildGrid([]);
function setActiveGrid(grid) {
    active = grid ?? world;
}
const getWorldGrid = ()=>world;
const isBlockedAt = (x, z)=>active.isBlockedAt(x, z);
const findPath = (sx, sz, tx, tz)=>active.find(sx, sz, tx, tz);
const findWorldPath = (sx, sz, tx, tz)=>world.find(sx, sz, tx, tz);
}),
"[project]/src/lib/places.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DISTRICTS",
    ()=>DISTRICTS,
    "KIND_COLORS",
    ()=>KIND_COLORS,
    "PLACES",
    ()=>PLACES,
    "WORLD_HALF",
    ()=>WORLD_HALF,
    "doorOf",
    ()=>doorOf,
    "isSolid",
    ()=>isSolid
]);
const PLACES = [
    {
        id: "ui",
        name: "University of Ibadan",
        emoji: "🎓",
        kind: "learn",
        district: "UI",
        blurb: "Nigeria's first university. Lectures, libraries and late-night reading.",
        pos: [
            -14.5,
            -16.5
        ],
        size: [
            5,
            2.4,
            3
        ],
        color: "#7c8de8",
        style: "campus",
        voice: true,
        actions: [
            {
                id: "lecture",
                label: "Attend a lecture",
                secs: 6,
                gain: {
                    energy: -18,
                    fun: -4
                },
                rep: 3
            },
            {
                id: "tutor",
                label: "Tutor students",
                secs: 7,
                gain: {
                    energy: -25
                },
                pay: 4500,
                rep: 2
            },
            {
                id: "study",
                label: "Study group",
                secs: 6,
                gain: {
                    social: 18,
                    energy: -10
                },
                rep: 2
            }
        ]
    },
    {
        id: "zoo",
        name: "UI Zoo",
        emoji: "🦁",
        kind: "fun",
        district: "UI",
        blurb: "Peacocks, monkeys and a very smug tortoise.",
        pos: [
            -17,
            -12.2
        ],
        size: [
            3,
            0.9,
            2.2
        ],
        color: "#8fc77b",
        style: "zoo",
        voice: true,
        actions: [
            {
                id: "animals",
                label: "See the animals",
                secs: 5,
                cost: 500,
                gain: {
                    fun: 30
                }
            },
            {
                id: "picnic",
                label: "Picnic",
                secs: 6,
                cost: 1500,
                gain: {
                    fun: 20,
                    hunger: 25,
                    social: 8
                }
            }
        ]
    },
    {
        id: "bodija-market",
        name: "Bodija Market",
        emoji: "🛒",
        kind: "shop",
        district: "Bodija",
        blurb: "Foodstuff, fabric and fierce bargaining.",
        pos: [
            -6.5,
            -16.5
        ],
        size: [
            4,
            1.3,
            3
        ],
        color: "#e0663a",
        style: "market",
        voice: true,
        actions: [
            {
                id: "foodstuff",
                label: "Buy foodstuff",
                secs: 4,
                cost: 2500,
                gain: {
                    hunger: 35
                }
            },
            {
                id: "trade",
                label: "Run a trading stall",
                secs: 6,
                gain: {
                    energy: -25
                },
                pay: 4000,
                rep: 1
            }
        ]
    },
    {
        id: "amala-skye",
        name: "Amala Skye",
        emoji: "🍲",
        kind: "food",
        district: "Bodija",
        blurb: "Gbegiri, ewedu and a long queue. Worth it.",
        pos: [
            -2.8,
            -12.6
        ],
        size: [
            2.4,
            1.5,
            2
        ],
        color: "#3f9b6a",
        style: "eatery",
        voice: true,
        actions: [
            {
                id: "amala",
                label: "Eat amala",
                secs: 4,
                cost: 1800,
                gain: {
                    hunger: 60,
                    fun: 5
                }
            },
            {
                id: "combo",
                label: "Full combo with assorted",
                secs: 5,
                cost: 3500,
                gain: {
                    hunger: 80,
                    fun: 10
                }
            }
        ]
    },
    {
        id: "uch",
        name: "UCH",
        emoji: "🏥",
        kind: "health",
        district: "Agbowo",
        blurb: "University College Hospital. Patch yourself up.",
        pos: [
            -16,
            -7.2
        ],
        size: [
            4,
            2.4,
            2.8
        ],
        color: "#dbe7ef",
        style: "hospital",
        actions: [
            {
                id: "ward",
                label: "Rest in the ward",
                secs: 8,
                cost: 2000,
                gain: {
                    energy: 40
                }
            },
            {
                id: "checkup",
                label: "Full check-up",
                secs: 6,
                cost: 3000,
                gain: {
                    energy: 15,
                    fun: 5,
                    hunger: 10
                }
            },
            {
                id: "volunteer",
                label: "Volunteer",
                secs: 6,
                gain: {
                    energy: -20
                },
                rep: 4
            }
        ]
    },
    {
        id: "agodi",
        name: "Agodi Gardens",
        emoji: "🌳",
        kind: "fun",
        district: "Agodi",
        blurb: "Lakes, shade trees and a little peace.",
        pos: [
            -6.8,
            -5.8
        ],
        size: [
            5,
            0.25,
            4.6
        ],
        color: "#8fd08b",
        style: "park",
        voice: true,
        actions: [
            {
                id: "relax",
                label: "Relax by the lake",
                secs: 6,
                gain: {
                    energy: 25,
                    fun: 20
                }
            },
            {
                id: "jog",
                label: "Go for a jog",
                secs: 5,
                gain: {
                    energy: -15,
                    fun: 15,
                    hunger: -10
                },
                rep: 1
            }
        ]
    },
    {
        id: "amusement",
        name: "Trans-Amusement Park",
        emoji: "🎡",
        kind: "fun",
        district: "Agodi",
        blurb: "Ferris wheel, arcade and screaming friends.",
        pos: [
            -2.6,
            -2.8
        ],
        size: [
            2.6,
            3.4,
            2.4
        ],
        color: "#e85d9a",
        style: "amusement",
        voice: true,
        actions: [
            {
                id: "wheel",
                label: "Ride the ferris wheel",
                secs: 6,
                cost: 2500,
                gain: {
                    fun: 45
                }
            },
            {
                id: "arcade",
                label: "Arcade with friends",
                secs: 5,
                cost: 1000,
                gain: {
                    fun: 25,
                    social: 10
                }
            }
        ]
    },
    {
        id: "mapo-hall",
        name: "Mapo Hall",
        emoji: "🏛️",
        kind: "culture",
        district: "Mapo",
        blurb: "The hilltop city hall with the best view of Ibadan's rooftops.",
        pos: [
            3.2,
            -7
        ],
        size: [
            3,
            2.8,
            2.4
        ],
        color: "#f0ede6",
        style: "hall",
        voice: true,
        actions: [
            {
                id: "meeting",
                label: "Join the town meeting",
                secs: 8,
                gain: {
                    social: 20,
                    energy: -8
                },
                rep: 4
            },
            {
                id: "view",
                label: "Enjoy the view",
                secs: 4,
                gain: {
                    fun: 15,
                    energy: 5
                }
            }
        ]
    },
    {
        id: "dugbe",
        name: "Dugbe Market",
        emoji: "🧺",
        kind: "shop",
        district: "Dugbe",
        blurb: "Old city trade. Everything is available if you ask loudly.",
        pos: [
            6.2,
            -3
        ],
        size: [
            4,
            1.3,
            2.6
        ],
        color: "#d9a23a",
        style: "market",
        voice: true,
        actions: [
            {
                id: "provisions",
                label: "Buy provisions",
                secs: 4,
                cost: 1500,
                gain: {
                    hunger: 25
                }
            },
            {
                id: "stall",
                label: "Run a stall shift",
                secs: 7,
                gain: {
                    energy: -28
                },
                pay: 5000,
                rep: 2
            }
        ]
    },
    {
        id: "ventura",
        name: "Ventura Mall",
        emoji: "🛍️",
        kind: "shop",
        district: "Jericho",
        blurb: "Shops, cinema and an air-conditioned food court.",
        pos: [
            15.5,
            -7
        ],
        size: [
            4,
            1.9,
            2.8
        ],
        color: "#c75c9a",
        style: "mall",
        voice: true,
        actions: [
            {
                id: "shop",
                label: "Shop for clothes",
                secs: 5,
                cost: 8000,
                gain: {
                    fun: 25
                },
                rep: 1
            },
            {
                id: "cinema",
                label: "Watch a film",
                secs: 7,
                cost: 3500,
                gain: {
                    fun: 40,
                    energy: -5
                }
            }
        ]
    },
    {
        id: "premier",
        name: "Premier Hotel",
        emoji: "🏨",
        kind: "food",
        district: "Jericho",
        blurb: "Rooftop dinners and a very polite front desk.",
        pos: [
            15,
            -2.8
        ],
        size: [
            3,
            3.6,
            2.4
        ],
        color: "#5a7a9c",
        style: "hotel",
        voice: true,
        actions: [
            {
                id: "dinner",
                label: "Rooftop dinner",
                secs: 8,
                cost: 12000,
                gain: {
                    hunger: 70,
                    fun: 25,
                    social: 20
                },
                rep: 2
            },
            {
                id: "desk",
                label: "Front desk shift",
                secs: 7,
                gain: {
                    energy: -30
                },
                pay: 7000,
                rep: 2
            }
        ]
    },
    {
        id: "cultural",
        name: "Cultural Centre Mokola",
        emoji: "🥁",
        kind: "culture",
        district: "Mokola",
        blurb: "Drumming, dance and the stories of old Ibadan.",
        pos: [
            -16,
            7.2
        ],
        size: [
            3.4,
            1.6,
            2.6
        ],
        color: "#d9763a",
        style: "cultural",
        voice: true,
        actions: [
            {
                id: "show",
                label: "Watch a cultural show",
                secs: 6,
                cost: 1500,
                gain: {
                    fun: 35,
                    social: 10
                },
                rep: 2
            },
            {
                id: "drum",
                label: "Learn the talking drum",
                secs: 6,
                cost: 800,
                gain: {
                    fun: 20,
                    energy: -8
                },
                rep: 3
            }
        ]
    },
    {
        id: "cocoa-house",
        name: "Cocoa House",
        emoji: "🏢",
        kind: "work",
        district: "Dugbe",
        blurb: "Ibadan's first skyscraper. Offices, deals and ambition.",
        pos: [
            -7,
            7.2
        ],
        size: [
            2.4,
            6,
            2.4
        ],
        color: "#c8a24a",
        style: "tower",
        voice: true,
        actions: [
            {
                id: "shift",
                label: "Work an office shift",
                secs: 6,
                gain: {
                    energy: -30,
                    hunger: -10
                },
                pay: 6000,
                rep: 3
            },
            {
                id: "network",
                label: "Network at the lobby",
                secs: 4,
                gain: {
                    social: 20,
                    energy: -8
                },
                rep: 2
            },
            {
                id: "pitch",
                label: "Pitch to investors",
                secs: 9,
                gain: {
                    energy: -40,
                    hunger: -12
                },
                pay: 10000,
                rep: 5,
                minRep: 25
            }
        ]
    },
    {
        id: "bowers",
        name: "Bower's Tower",
        emoji: "🗼",
        kind: "culture",
        district: "Dugbe",
        blurb: "Climb it and see the whole city of rusted roofs.",
        pos: [
            -2.5,
            3.2
        ],
        size: [
            1.2,
            4.4,
            1.2
        ],
        color: "#b9855a",
        style: "lookout",
        actions: [
            {
                id: "climb",
                label: "Climb to the top",
                secs: 5,
                cost: 300,
                gain: {
                    fun: 30,
                    energy: -10
                }
            }
        ]
    },
    {
        id: "mosque",
        name: "Central Mosque",
        emoji: "🕌",
        kind: "faith",
        district: "Dugbe",
        blurb: "A quiet place to pause between prayers.",
        pos: [
            3.3,
            7.4
        ],
        size: [
            2.4,
            2.2,
            2.4
        ],
        color: "#efe6cb",
        style: "mosque",
        actions: [
            {
                id: "pray",
                label: "Pray",
                secs: 4,
                gain: {
                    energy: 10,
                    fun: 5,
                    social: 5
                },
                rep: 1
            }
        ]
    },
    {
        id: "cathedral",
        name: "St. David's Cathedral",
        emoji: "⛪",
        kind: "faith",
        district: "Kudeti",
        blurb: "Old stone, tall tower, long hymns.",
        pos: [
            7.5,
            3.4
        ],
        size: [
            2.6,
            2.8,
            3.2
        ],
        color: "#d8cdbb",
        style: "church",
        actions: [
            {
                id: "service",
                label: "Attend service",
                secs: 6,
                gain: {
                    fun: 10,
                    social: 15,
                    energy: 5
                },
                rep: 2
            }
        ]
    },
    {
        id: "stadium",
        name: "Lekan Salami Stadium",
        emoji: "🏟️",
        kind: "fun",
        district: "Adamasingba",
        blurb: "Match day. Shooting Stars and very loud fans.",
        pos: [
            15,
            5
        ],
        size: [
            6.5,
            1.7,
            6
        ],
        color: "#4aa3a0",
        style: "stadium",
        voice: true,
        actions: [
            {
                id: "match",
                label: "Watch the match",
                secs: 7,
                cost: 1000,
                gain: {
                    fun: 40,
                    social: 15
                }
            },
            {
                id: "chant",
                label: "Chant with the ultras",
                secs: 6,
                gain: {
                    fun: 25,
                    social: 25,
                    energy: -12
                },
                rep: 1
            }
        ]
    },
    {
        id: "ring-road",
        name: "Ring Road Motor Park",
        emoji: "🚌",
        kind: "transport",
        district: "Challenge",
        blurb: "Danfo, keke and okada. Everyone passes through here.",
        pos: [
            -15,
            12.8
        ],
        size: [
            4.2,
            0.9,
            3.2
        ],
        color: "#f2b632",
        style: "terminal",
        voice: true,
        actions: [
            {
                id: "hustle",
                label: "Conductor hustle",
                secs: 6,
                gain: {
                    energy: -25
                },
                pay: 3500,
                rep: 1
            },
            {
                id: "kekepass",
                label: "Keke fast pass (5 min)",
                secs: 2,
                cost: 1500,
                boostMs: 5 * 60 * 1000
            }
        ]
    },
    {
        id: "golf",
        name: "Ibadan Golf Club",
        emoji: "⛳",
        kind: "fun",
        district: "Oluyole",
        blurb: "Manicured greens, cold drinks and quiet deals.",
        pos: [
            4.5,
            13
        ],
        size: [
            3.8,
            0.4,
            3.2
        ],
        color: "#7cc46a",
        style: "golf",
        voice: true,
        actions: [
            {
                id: "round",
                label: "Play a round",
                secs: 7,
                cost: 6000,
                gain: {
                    fun: 40,
                    energy: -10,
                    social: 10
                },
                rep: 2
            },
            {
                id: "caddie",
                label: "Caddie for a member",
                secs: 6,
                gain: {
                    energy: -22
                },
                pay: 4000,
                rep: 1
            }
        ]
    },
    {
        id: "govt-house",
        name: "Government House",
        emoji: "🏛️",
        kind: "gov",
        district: "Iyaganku",
        blurb: "Where the state is run. Earn your seat at the table.",
        pos: [
            15,
            12.8
        ],
        size: [
            4,
            2.4,
            2.8
        ],
        color: "#f2efe8",
        style: "govt",
        actions: [
            {
                id: "gallery",
                label: "Sit in the public gallery",
                secs: 5,
                gain: {
                    energy: -5
                },
                rep: 3
            },
            {
                id: "council",
                label: "Council session",
                secs: 8,
                gain: {
                    energy: -15,
                    social: 12
                },
                rep: 8,
                minRep: 70
            }
        ]
    }
];
const KIND_COLORS = {
    food: "#3f9b6a",
    work: "#d9a22b",
    fun: "#2fa3a0",
    culture: "#8b6bd6",
    health: "#e25a5a",
    learn: "#4c6ad6",
    shop: "#d9568e",
    faith: "#a68a4f",
    gov: "#5b7088",
    transport: "#d98a1f"
};
const isSolid = (p)=>p.style !== "park" && p.style !== "golf" && p.style !== "zoo";
const doorOf = (p)=>({
        x: p.pos[0],
        z: p.pos[1] + p.size[2] / 2 + 0.9
    });
const DISTRICTS = [
    {
        name: "UI",
        pos: [
            -15,
            -19.2
        ]
    },
    {
        name: "Bodija",
        pos: [
            -5,
            -19.2
        ]
    },
    {
        name: "Bodija Estate",
        pos: [
            5,
            -19.4
        ]
    },
    {
        name: "Jericho GRA",
        pos: [
            15,
            -19.4
        ]
    },
    {
        name: "Agbowo",
        pos: [
            -15,
            -10.4
        ]
    },
    {
        name: "Agodi",
        pos: [
            -5,
            -9.6
        ]
    },
    {
        name: "Mapo",
        pos: [
            5,
            -9.6
        ]
    },
    {
        name: "Jericho",
        pos: [
            15,
            -9.6
        ]
    },
    {
        name: "Mokola",
        pos: [
            -15,
            0.4
        ]
    },
    {
        name: "Dugbe",
        pos: [
            -5,
            0.4
        ]
    },
    {
        name: "Kudeti",
        pos: [
            5,
            0.4
        ]
    },
    {
        name: "Adamasingba",
        pos: [
            15,
            0.4
        ]
    },
    {
        name: "Challenge",
        pos: [
            -15,
            10.4
        ]
    },
    {
        name: "Oluyole Estate",
        pos: [
            -5,
            10.4
        ]
    },
    {
        name: "Oluyole",
        pos: [
            5,
            10.4
        ]
    },
    {
        name: "Iyaganku GRA",
        pos: [
            15,
            10.4
        ]
    }
];
const WORLD_HALF = 24;
}),
"[project]/src/lib/playerState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boost",
    ()=>boost,
    "cam",
    ()=>cam,
    "me",
    ()=>me,
    "remoteMotion",
    ()=>remoteMotion
]);
const me = {
    x: 0.5,
    z: 8.2,
    ry: 0,
    /** current speed in units/s (smoothed), drives the walk animation */ speed: 0,
    path: [],
    /** place id the path is leading to (so we can flag arrival) */ goalPlace: null,
    /** riding a keke for the current trip (fast, costs money) */ ride: false,
    /** world position to return to when leaving an interior */ worldReturn: null,
    /** furniture index to use once we arrive */ pendingUse: null,
    /** leave the interior once we reach the exit mat */ pendingExit: false,
    /** currently seated or lying on furniture (positions in world units) */ use: null
};
const remoteMotion = new Map();
const cam = {
    az: Math.PI / 4,
    dist: 24
};
const boost = {
    until: 0
};
}),
"[project]/src/lib/plots.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HOME_ACTIONS",
    ()=>HOME_ACTIONS,
    "NPC_HOMES",
    ()=>NPC_HOMES,
    "NPC_PLOTS",
    ()=>NPC_PLOTS,
    "PLOTS",
    ()=>PLOTS,
    "PLOT_SIZE",
    ()=>PLOT_SIZE,
    "RENT_CAP_MIN",
    ()=>RENT_CAP_MIN,
    "TIERS",
    ()=>TIERS,
    "naira",
    ()=>naira,
    "plotById",
    ()=>plotById
]);
const PLOT_SIZE = 3.4;
const TIERS = [
    {
        name: "Empty land",
        cost: 0,
        rentPerMin: 0
    },
    {
        name: "Bungalow",
        cost: 15000,
        rentPerMin: 400
    },
    {
        name: "Duplex",
        cost: 60000,
        rentPerMin: 1500
    },
    {
        name: "Mansion",
        cost: 180000,
        rentPerMin: 5000
    }
];
const RENT_CAP_MIN = 30;
const ZONES = [
    {
        district: "Bodija Estate",
        price: 180000,
        centers: [
            [
                3,
                -17
            ],
            [
                7,
                -17
            ],
            [
                3,
                -13
            ],
            [
                7,
                -13
            ]
        ]
    },
    {
        district: "Jericho GRA",
        price: 260000,
        centers: [
            [
                13,
                -17
            ],
            [
                17,
                -17
            ],
            [
                13,
                -13
            ],
            [
                17,
                -13
            ]
        ]
    },
    {
        district: "Agbowo",
        price: 45000,
        centers: [
            [
                -17.5,
                -2.8
            ],
            [
                -13,
                -2.8
            ]
        ]
    },
    {
        district: "Mokola",
        price: 85000,
        centers: [
            [
                -17.5,
                3
            ],
            [
                -13,
                3
            ]
        ]
    },
    {
        district: "Dugbe",
        price: 320000,
        centers: [
            [
                -6.5,
                3
            ]
        ]
    },
    {
        district: "Challenge",
        price: 60000,
        centers: [
            [
                -17.5,
                17
            ],
            [
                -13,
                17
            ]
        ]
    },
    {
        district: "Oluyole Estate",
        price: 220000,
        centers: [
            [
                -7,
                13
            ],
            [
                -3,
                13
            ],
            [
                -7,
                17
            ],
            [
                -3,
                17
            ]
        ]
    },
    {
        district: "Oluyole",
        price: 150000,
        centers: [
            [
                3,
                17
            ],
            [
                7,
                17
            ]
        ]
    },
    {
        district: "Iyaganku GRA",
        price: 200000,
        centers: [
            [
                13,
                17
            ],
            [
                17,
                17
            ]
        ]
    }
];
const PLOTS = ZONES.flatMap((z)=>z.centers.map((pos, i)=>({
            id: `${z.district.toLowerCase().replace(/[^a-z]+/g, "-")}-${i + 1}`,
            district: z.district,
            pos,
            price: z.price
        })));
const plotById = (id)=>PLOTS.find((p)=>p.id === id);
const naira = (n)=>`₦${Math.round(n).toLocaleString("en-NG")}`;
const HOME_ACTIONS = [
    {
        id: "sleep",
        label: "Sleep",
        secs: 8,
        gain: {
            energy: 70,
            hunger: -10
        }
    },
    {
        id: "cook",
        label: "Cook at home",
        secs: 5,
        cost: 800,
        gain: {
            hunger: 40,
            fun: 5
        }
    },
    {
        id: "host",
        label: "Host friends",
        secs: 6,
        gain: {
            social: 25,
            fun: 15
        },
        rep: 2
    }
];
const NPC_HOMES = {
    "bodija-estate-1": {
        ownerName: "Chief Adeyemi",
        tier: 3
    },
    "bodija-estate-2": {
        ownerName: "Alhaji Rasheed",
        tier: 2
    },
    "jericho-gra-1": {
        ownerName: "Mrs Folake",
        tier: 3
    },
    "oluyole-estate-1": {
        ownerName: "Dr. Okafor",
        tier: 2
    },
    "iyaganku-gra-1": {
        ownerName: "Engr. Bello",
        tier: 3
    },
    "agbowo-1": {
        ownerName: "Mama Bisi",
        tier: 1
    },
    "mokola-1": {
        ownerName: "Mr Seun",
        tier: 1
    }
};
const NPC_PLOTS = Object.fromEntries(Object.entries(NPC_HOMES).map(([id, h])=>[
        id,
        {
            ownerId: `npc:${h.ownerName.toLowerCase().replace(/[^a-z]+/g, "-")}`,
            ownerName: h.ownerName,
            tier: h.tier,
            collectedAt: 0
        }
    ]));
}),
"[project]/src/lib/quests.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPTY_STATS",
    ()=>EMPTY_STATS,
    "QUESTS",
    ()=>QUESTS
]);
const EMPTY_STATS = {
    visited: [],
    worked: 0,
    ate: 0,
    chats: 0,
    voiceJoins: 0,
    calls: 0,
    entered: 0,
    slept: 0,
    used: 0
};
const mine = (s)=>Object.values(s.plots).filter((p)=>p.ownerId === s.pid);
const has = (s, ids)=>ids.every((id)=>s.stats.visited.includes(id));
const QUESTS = [
    {
        id: "explore",
        title: "Explore Ibadan",
        blurb: "Walk to 3 different places.",
        reward: {
            money: 3000,
            rep: 3
        },
        done: (s)=>s.stats.visited.length >= 3,
        progress: (s)=>({
                cur: Math.min(3, s.stats.visited.length),
                max: 3
            })
    },
    {
        id: "inside",
        title: "Step inside",
        blurb: "Walk through a door. Every building has an interior, and you have a flat of your own.",
        reward: {
            money: 1500,
            rep: 1
        },
        done: (s)=>(s.stats.entered ?? 0) >= 1
    },
    {
        id: "earn",
        title: "Earn your first naira",
        blurb: "Finish a job shift anywhere (Cocoa House, a market stall, the motor park).",
        reward: {
            money: 2000,
            rep: 2
        },
        done: (s)=>s.stats.worked >= 1
    },
    {
        id: "eat",
        title: "Grab a meal",
        blurb: "Eat something filling. Amala Skye is a classic.",
        reward: {
            money: 1000
        },
        done: (s)=>s.stats.ate >= 1
    },
    {
        id: "hello",
        title: "Say hello",
        blurb: "Send a message in the chat.",
        reward: {
            rep: 2
        },
        done: (s)=>s.stats.chats >= 1
    },
    {
        id: "rest",
        title: "A good night's sleep",
        blurb: "Sleep in a bed, at home or anywhere with one.",
        reward: {
            money: 2000,
            rep: 2
        },
        done: (s)=>(s.stats.slept ?? 0) >= 1
    },
    {
        id: "culture",
        title: "Culture trail",
        blurb: "Visit Mapo Hall, Bower's Tower and Cocoa House.",
        reward: {
            money: 8000,
            rep: 6
        },
        done: (s)=>has(s, [
                "mapo-hall",
                "bowers",
                "cocoa-house"
            ]),
        progress: (s)=>({
                cur: [
                    "mapo-hall",
                    "bowers",
                    "cocoa-house"
                ].filter((id)=>s.stats.visited.includes(id)).length,
                max: 3
            })
    },
    {
        id: "voice",
        title: "Find your voice",
        blurb: "Join a voice room at any venue.",
        reward: {
            rep: 5
        },
        done: (s)=>s.stats.voiceJoins >= 1
    },
    {
        id: "land",
        title: "Own a piece of Ibadan",
        blurb: "Buy your first plot of land.",
        reward: {
            money: 10000,
            rep: 5
        },
        done: (s)=>mine(s).length >= 1
    },
    {
        id: "home",
        title: "Home sweet home",
        blurb: "Build a house on your land.",
        reward: {
            money: 15000,
            rep: 5
        },
        done: (s)=>mine(s).some((p)=>p.tier >= 1)
    },
    {
        id: "call",
        title: "Ring a friend",
        blurb: "Make or take a phone call.",
        reward: {
            rep: 5
        },
        done: (s)=>s.stats.calls >= 1
    },
    {
        id: "landlord",
        title: "Landlord",
        blurb: "Own 3 plots of land.",
        reward: {
            money: 50000,
            rep: 15
        },
        done: (s)=>mine(s).length >= 3,
        progress: (s)=>({
                cur: Math.min(3, mine(s).length),
                max: 3
            })
    }
];
}),
"[project]/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hooks",
    ()=>hooks,
    "ownedBy",
    ()=>ownedBy,
    "pendingRent",
    ()=>pendingRent,
    "useGame",
    ()=>useGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/titles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pathing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quests.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const START_MONEY = 25000;
const START_NEEDS = {
    hunger: 80,
    energy: 90,
    fun: 65,
    social: 55
};
const clamp = (n)=>Math.max(0, Math.min(100, n));
const decayNeeds = (n, secs)=>({
        hunger: clamp(n.hunger - 0.12 * secs),
        energy: clamp(n.energy - 0.08 * secs),
        fun: clamp(n.fun - 0.07 * secs),
        social: clamp(n.social - 0.05 * secs)
    });
const WARN = {
    hunger: "Your stomach is growling. Find something to eat.",
    energy: "You're getting tired. Rest or sleep soon.",
    fun: "You're bored. Do something fun.",
    social: "You feel lonely. Chat or join a voice room."
};
const warned = {
    hunger: false,
    energy: false,
    fun: false,
    social: false
};
const hooks = {
    plotSet: null
};
const noopStorage = {
    getItem: ()=>null,
    setItem: ()=>{},
    removeItem: ()=>{}
};
let toastId = 1;
let chatId = 1;
let busyTimer = null;
const pendingRent = (plot, now)=>{
    const mins = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RENT_CAP_MIN"], Math.max(0, (now - plot.collectedAt) / 60000));
    return Math.floor(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"][plot.tier].rentPerMin * mins);
};
const useGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        profile: null,
        money: START_MONEY,
        needs: START_NEEDS,
        rep: 0,
        plots: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NPC_PLOTS"],
        stats: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_STATS"],
        questsDone: [],
        muted: [],
        savedAt: 0,
        awaySecs: 0,
        interior: null,
        fade: false,
        generatorUntil: 0,
        selected: null,
        atPlace: null,
        busy: null,
        toasts: [],
        clockOverride: null,
        editingAvatar: false,
        sheet: null,
        net: "offline",
        connId: null,
        online: 0,
        remotes: {},
        chat: [],
        bubbles: {},
        call: {
            phase: "idle",
            peerId: null,
            peerName: "",
            room: null
        },
        voice: {
            room: null,
            muted: false,
            peers: [],
            speaking: {}
        },
        incoming: null,
        setProfile: (profile)=>set({
                profile,
                editingAvatar: false
            }),
        select: (selected)=>set({
                selected
            }),
        setAtPlace: (atPlace)=>set((s)=>({
                    atPlace,
                    stats: atPlace && !s.stats.visited.includes(atPlace) ? {
                        ...s.stats,
                        visited: [
                            ...s.stats.visited,
                            atPlace
                        ]
                    } : s.stats
                })),
        setSheet: (sheet)=>set({
                sheet
            }),
        patch: (p)=>set(p),
        toast: (text, tone = "info")=>{
            const id = toastId++;
            set((s)=>({
                    toasts: [
                        ...s.toasts.slice(-3),
                        {
                            id,
                            text,
                            tone
                        }
                    ]
                }));
            setTimeout(()=>set((s)=>({
                        toasts: s.toasts.filter((t)=>t.id !== id)
                    })), 3400);
        },
        tick: (dt)=>{
            const s = get();
            const inVoice = s.voice.room !== null && s.voice.peers.length > 0;
            const starving = s.needs.hunger < 15;
            const next = {
                hunger: clamp(s.needs.hunger - 0.12 * dt),
                energy: clamp(s.needs.energy - (starving ? 0.16 : 0.08) * dt),
                fun: clamp(s.needs.fun - 0.07 * dt),
                social: clamp(s.needs.social - 0.05 * dt + (inVoice ? 0.5 * dt : 0))
            };
            set({
                needs: next,
                savedAt: Date.now()
            });
            for (const k of Object.keys(next)){
                if (next[k] < 20 && s.needs[k] >= 20 && !warned[k]) {
                    warned[k] = true;
                    get().toast(WARN[k], "bad");
                } else if (next[k] > 40) warned[k] = false;
            }
        },
        runAction: (a, opts)=>{
            const s = get();
            if (s.busy) return "You're already busy.";
            if (a.minRep && s.rep < a.minRep) return `Needs ${a.minRep} reputation (${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLES"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(a.minRep)].name}).`;
            if (a.cost && s.money < a.cost) return `You need ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(a.cost)}.`;
            if (a.gain?.energy && a.gain.energy < 0 && s.needs.energy + a.gain.energy < 0) return "Too tired. Eat or rest first.";
            const scale = opts?.gainScale ?? 1;
            set({
                busy: {
                    label: a.label,
                    start: Date.now(),
                    secs: a.secs
                },
                money: s.money - (a.cost ?? 0)
            });
            if (busyTimer) clearTimeout(busyTimer);
            busyTimer = setTimeout(()=>{
                const cur = get();
                const needs = {
                    ...cur.needs
                };
                const parts = [];
                for (const k of Object.keys(a.gain ?? {})){
                    const d = (a.gain[k] ?? 0) * (a.gain[k] > 0 ? scale : 1);
                    needs[k] = clamp(needs[k] + d);
                }
                let money = cur.money;
                if (a.pay) {
                    const pay = Math.round(a.pay * (1 + 0.08 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(cur.rep)));
                    money += pay;
                    parts.push(`+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(pay)}`);
                }
                const beforeTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(cur.rep);
                const rep = cur.rep + (a.rep ?? 0);
                if (a.rep) parts.push(`+${a.rep} rep`);
                if (a.boostMs) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boost"].until = Date.now() + a.boostMs;
                    parts.push("keke boost on");
                }
                const stats = {
                    ...cur.stats,
                    worked: cur.stats.worked + (a.pay ? 1 : 0),
                    ate: cur.stats.ate + ((a.gain?.hunger ?? 0) >= 25 ? 1 : 0)
                };
                set({
                    busy: null,
                    needs,
                    money,
                    rep,
                    stats
                });
                get().toast(`${a.label}${parts.length ? ` · ${parts.join(" · ")}` : ""}`, "good");
                const afterTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(rep);
                if (afterTitle > beforeTitle) get().toast(`New title: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLES"][afterTitle].name}!`, "good");
            }, a.secs * 1000);
            return null;
        },
        buyPlot: (id)=>{
            const s = get();
            const plot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["plotById"])(id);
            if (!plot || !s.profile) return "Can't buy that.";
            if (s.plots[id]) return "Already sold.";
            if (s.money < plot.price) return `You need ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(plot.price)}.`;
            const state = {
                ownerId: s.profile.id,
                ownerName: s.profile.name,
                tier: 0,
                collectedAt: Date.now()
            };
            set({
                money: s.money - plot.price,
                plots: {
                    ...s.plots,
                    [id]: state
                },
                rep: s.rep + 10
            });
            hooks.plotSet?.(id, state);
            get().toast(`You bought land in ${plot.district}! +10 rep`, "good");
            return null;
        },
        upgradePlot: (id)=>{
            const s = get();
            const cur = s.plots[id];
            if (!cur || cur.ownerId !== s.profile?.id) return "Not your land.";
            if (cur.tier >= 3) return "Already a mansion.";
            const next = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"][cur.tier + 1];
            const pending = pendingRent(cur, Date.now());
            if (s.money + pending < next.cost) return `You need ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(next.cost)}.`;
            const state = {
                ...cur,
                tier: cur.tier + 1,
                collectedAt: Date.now()
            };
            set({
                money: s.money + pending - next.cost,
                plots: {
                    ...s.plots,
                    [id]: state
                },
                rep: s.rep + 8 * state.tier
            });
            hooks.plotSet?.(id, state);
            get().toast(`Built a ${next.name}! +${8 * state.tier} rep`, "good");
            return null;
        },
        collectRent: (id)=>{
            const s = get();
            const cur = s.plots[id];
            if (!cur || cur.ownerId !== s.profile?.id) return;
            const amount = pendingRent(cur, Date.now());
            if (amount <= 0) return get().toast("No rent to collect yet.", "info");
            const state = {
                ...cur,
                collectedAt: Date.now()
            };
            set({
                money: s.money + amount,
                plots: {
                    ...s.plots,
                    [id]: state
                }
            });
            hooks.plotSet?.(id, state);
            get().toast(`Collected ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(amount)} rent`, "good");
        },
        setPlots: (incoming)=>{
            const s = get();
            let refund = 0;
            for (const [id, mine] of Object.entries(s.plots)){
                const server = incoming[id];
                if (mine.ownerId === s.profile?.id && server && server.ownerId !== mine.ownerId) {
                    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["plotById"])(id);
                    refund += (p?.price ?? 0) + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"].slice(1, mine.tier + 1).reduce((a, t)=>a + t.cost, 0);
                }
            }
            const merged = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NPC_PLOTS"],
                ...incoming
            };
            set({
                plots: merged,
                money: s.money + refund
            });
            if (refund > 0) get().toast(`That land was already taken. Refunded ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(refund)}.`, "bad");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rebuildGrid"])(Object.entries(merged).filter(([, p])=>p.tier > 0).map(([id])=>id));
        },
        setPlot: (id, plot)=>{
            set((s)=>({
                    plots: {
                        ...s.plots,
                        [id]: plot
                    }
                }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rebuildGrid"])(Object.entries(get().plots).filter(([, p])=>p.tier > 0).map(([pid])=>pid));
        },
        addChat: (m, bubbleKey)=>{
            const id = String(chatId++);
            set((s)=>({
                    chat: [
                        ...s.chat.slice(-199),
                        {
                            ...m,
                            id
                        }
                    ]
                }));
            if (bubbleKey) {
                const until = Date.now() + 5000;
                set((s)=>({
                        bubbles: {
                            ...s.bubbles,
                            [bubbleKey]: {
                                text: m.text,
                                until
                            }
                        }
                    }));
                setTimeout(()=>{
                    set((s)=>{
                        if (s.bubbles[bubbleKey]?.until !== until) return s;
                        const next = {
                            ...s.bubbles
                        };
                        delete next[bubbleKey];
                        return {
                            bubbles: next
                        };
                    });
                }, 5100);
            }
        },
        setRemotes: (remotes)=>set({
                remotes
            }),
        recordStat: (k, n = 1)=>set((s)=>({
                    stats: {
                        ...s.stats,
                        [k]: (s.stats[k] ?? 0) + n
                    }
                })),
        mute: (pid)=>set((s)=>s.muted.includes(pid) ? s : {
                    muted: [
                        ...s.muted,
                        pid
                    ]
                }),
        clearMuted: ()=>set({
                muted: []
            }),
        awardQuest: (id)=>{
            const q = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quests$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTS"].find((x)=>x.id === id);
            const s = get();
            if (!q || s.questsDone.includes(id)) return;
            const before = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(s.rep);
            const rep = s.rep + (q.reward.rep ?? 0);
            set({
                questsDone: [
                    ...s.questsDone,
                    id
                ],
                money: s.money + (q.reward.money ?? 0),
                rep
            });
            const bits = [
                q.reward.money ? `+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["naira"])(q.reward.money)}` : "",
                q.reward.rep ? `+${q.reward.rep} rep` : ""
            ].filter(Boolean).join(" · ");
            get().toast(`Goal complete: ${q.title}${bits ? ` · ${bits}` : ""}`, "good");
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(rep) > before) get().toast(`New title: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLES"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$titles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleIndex"])(rep)].name}!`, "good");
        }
    }), {
    name: "omo-ibadan-v1",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>("TURBOPACK compile-time truthy", 1) ? noopStorage : "TURBOPACK unreachable"),
    partialize: (s)=>({
            profile: s.profile,
            money: s.money,
            needs: s.needs,
            rep: s.rep,
            plots: s.plots,
            stats: s.stats,
            questsDone: s.questsDone,
            muted: s.muted,
            savedAt: s.savedAt
        }),
    // while you were away your needs keep dropping, at a gentler rate (capped at 20 minutes)
    merge: (persisted, current)=>{
        const p = persisted;
        if (!p) return current;
        const merged = {
            ...current,
            ...p
        };
        merged.plots = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NPC_PLOTS"],
            ...p.plots ?? {}
        };
        const away = p.savedAt ? Math.min(1200, (Date.now() - p.savedAt) / 1000) : 0;
        if (away > 30 && p.needs) {
            merged.needs = decayNeeds(p.needs, away * 0.4);
            merged.awaySecs = away;
        }
        return merged;
    },
    onRehydrateStorage: ()=>(state)=>{
            if (!state) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rebuildGrid"])(Object.entries(state.plots).filter(([, p])=>p.tier > 0).map(([id])=>id));
        }
}));
const ownedBy = (plots, pid)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLOTS"].filter((p)=>plots[p.id]?.ownerId === pid);
// make sure NPC-owned houses are solid for pathfinding from the first frame
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pathing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rebuildGrid"])(Object.entries(useGame.getState().plots).filter(([, p])=>p.tier > 0).map(([id])=>id));
}),
"[project]/src/lib/time.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared world clock. One game day = one real hour, derived from wall-clock time,
 * so every player sees the same hour without a server.
 */ __turbopack_context__.s([
    "DAY_REAL_MS",
    ()=>DAY_REAL_MS,
    "NEPA_SLOT_MS",
    ()=>NEPA_SLOT_MS,
    "daylight",
    ()=>daylight,
    "formatClock",
    ()=>formatClock,
    "gameMinutes",
    ()=>gameMinutes,
    "nepaOut",
    ()=>nepaOut,
    "periodLabel",
    ()=>periodLabel
]);
const DAY_REAL_MS = 60 * 60 * 1000;
const NEPA_SLOT_MS = 3 * 60 * 1000;
function gameMinutes(now, override = null) {
    if (override !== null) return override * 60;
    return now % DAY_REAL_MS / DAY_REAL_MS * 1440;
}
function formatClock(minutes) {
    const h = Math.floor(minutes / 60) % 24;
    const m = Math.floor(minutes % 60);
    const suffix = h >= 12 ? "pm" : "am";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}
const smooth = (a, b, x)=>{
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
};
function daylight(hour) {
    return smooth(5.5, 7.5, hour) * (1 - smooth(17.5, 19.5, hour));
}
function nepaOut(now) {
    const slot = Math.floor(now / NEPA_SLOT_MS);
    let x = slot * 2654435761 >>> 0;
    x ^= x >>> 13;
    x = Math.imul(x, 1274126177) >>> 0;
    return x % 100 < 28;
}
function periodLabel(hour) {
    if (hour < 5) return "Late night";
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 20) return "Evening";
    return "Night";
}
}),
"[project]/src/lib/titles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Chieftaincy-inspired ladder. Reputation is earned by working, serving the community,
 * and owning land. NOTE: titles and order are simplified for gameplay; confirm the
 * real Ibadan line of succession with a local before using these in marketing.
 */ __turbopack_context__.s([
    "TITLES",
    ()=>TITLES,
    "titleIndex",
    ()=>titleIndex,
    "titleProgress",
    ()=>titleProgress
]);
const TITLES = [
    {
        name: "Omo Ibadan",
        rep: 0,
        blurb: "Newcomer finding your feet"
    },
    {
        name: "Mogaji",
        rep: 25,
        blurb: "Head of your own compound"
    },
    {
        name: "Jagun",
        rep: 70,
        blurb: "Trusted in the community"
    },
    {
        name: "Osi",
        rep: 140,
        blurb: "A voice at the table"
    },
    {
        name: "Otun",
        rep: 240,
        blurb: "Right hand of the leaders"
    },
    {
        name: "Balogun",
        rep: 380,
        blurb: "Commander of the people"
    },
    {
        name: "Maye",
        rep: 560,
        blurb: "Counsellor to the crown"
    },
    {
        name: "Olubadan",
        rep: 800,
        blurb: "Ruler of Ibadan"
    }
];
function titleIndex(rep) {
    let idx = 0;
    for(let i = 0; i < TITLES.length; i++)if (rep >= TITLES[i].rep) idx = i;
    return idx;
}
function titleProgress(rep) {
    const i = titleIndex(rep);
    const cur = TITLES[i];
    const next = TITLES[i + 1];
    if (!next) return {
        index: i,
        cur,
        next: null,
        pct: 100
    };
    return {
        index: i,
        cur,
        next,
        pct: Math.round((rep - cur.rep) / (next.rep - cur.rep) * 100)
    };
}
}),
"[project]/src/lib/voice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "voice",
    ()=>voice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
;
/**
 * Peer-to-peer voice using WebRTC, with the game server as the signalling channel.
 * A full mesh is fine for small rooms (a venue, a house party, a 1:1 call).
 * To scale to big rooms later, swap this for an SFU such as LiveKit behind the same API.
 */ const ICE = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: "stun:stun1.l.google.com:19302"
        }
    ]
};
class Voice {
    send = ()=>{};
    room = null;
    stream = null;
    peers = new Map();
    ctx = null;
    local = null;
    poll = null;
    muted = false;
    init(send) {
        this.send = send;
    }
    publish() {
        const prev = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().voice;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            voice: {
                ...prev,
                room: this.room,
                muted: this.muted,
                peers: [
                    ...this.peers.keys()
                ]
            }
        });
    }
    async join(room) {
        if (this.room === room) return true;
        if (this.room) this.leave();
        if (!navigator.mediaDevices?.getUserMedia) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast("Voice needs a secure (https) page and a microphone.", "bad");
            return false;
        }
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().toast("Microphone blocked. Allow it in your browser to talk.", "bad");
            return false;
        }
        this.room = room;
        this.muted = false;
        this.ctx = new AudioContext();
        this.local = this.analyse(this.stream);
        this.poll = setInterval(()=>this.checkSpeaking(), 160);
        this.send({
            t: "voiceJoin",
            room
        });
        this.publish();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().recordStat("voiceJoins");
        return true;
    }
    leave() {
        if (!this.room && !this.stream) return;
        this.send({
            t: "voiceLeave"
        });
        for (const id of [
            ...this.peers.keys()
        ])this.drop(id);
        this.stream?.getTracks().forEach((t)=>t.stop());
        this.stream = null;
        if (this.poll) clearInterval(this.poll);
        this.poll = null;
        this.ctx?.close().catch(()=>{});
        this.ctx = null;
        this.local = null;
        this.room = null;
        this.muted = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            voice: {
                room: null,
                muted: false,
                peers: [],
                speaking: {}
            }
        });
    }
    setMuted(m) {
        this.muted = m;
        this.stream?.getAudioTracks().forEach((t)=>t.enabled = !m);
        this.publish();
    }
    /** Server told us who is already in the room: we are the newcomer, so we make the offers. */ members(room, ids) {
        if (room !== this.room) return;
        for (const id of ids)void this.connect(id, true);
    }
    peerJoined(room, id) {
        if (room !== this.room) return;
        void this.connect(id, false);
    }
    peerLeft(id) {
        this.drop(id);
    }
    async signal(from, data) {
        if (!this.room) return;
        const d = data;
        let peer = this.peers.get(from);
        if (!peer) peer = await this.connect(from, false);
        if (!peer) return;
        const { pc } = peer;
        try {
            if (d.sdp) {
                await pc.setRemoteDescription(d.sdp);
                for (const c of peer.pending.splice(0))await pc.addIceCandidate(c).catch(()=>{});
                if (d.sdp.type === "offer") {
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    this.send({
                        t: "signal",
                        to: from,
                        data: {
                            sdp: pc.localDescription
                        }
                    });
                }
            } else if (d.candidate) {
                if (pc.remoteDescription) await pc.addIceCandidate(d.candidate).catch(()=>{});
                else peer.pending.push(d.candidate);
            }
        } catch  {
        /* a failed negotiation just means that peer stays silent; the next join retries */ }
    }
    async connect(id, initiator) {
        if (this.peers.has(id) || !this.stream) return this.peers.get(id);
        const pc = new RTCPeerConnection(ICE);
        const audio = new Audio();
        audio.autoplay = true;
        const peer = {
            pc,
            audio,
            pending: []
        };
        this.peers.set(id, peer);
        this.stream.getTracks().forEach((t)=>pc.addTrack(t, this.stream));
        pc.onicecandidate = (e)=>{
            if (e.candidate) this.send({
                t: "signal",
                to: id,
                data: {
                    candidate: e.candidate.toJSON()
                }
            });
        };
        pc.ontrack = (e)=>{
            audio.srcObject = e.streams[0];
            audio.play().catch(()=>{});
            peer.analyser = this.analyse(e.streams[0]) ?? undefined;
        };
        pc.onconnectionstatechange = ()=>{
            if (pc.connectionState === "failed" || pc.connectionState === "closed") this.drop(id);
        };
        this.publish();
        if (initiator) {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            this.send({
                t: "signal",
                to: id,
                data: {
                    sdp: pc.localDescription
                }
            });
        }
        return peer;
    }
    drop(id) {
        const p = this.peers.get(id);
        if (!p) return;
        p.pc.close();
        p.audio.srcObject = null;
        this.peers.delete(id);
        if (this.room) this.publish();
    }
    analyse(stream) {
        if (!this.ctx) return null;
        const src = this.ctx.createMediaStreamSource(stream);
        const an = this.ctx.createAnalyser();
        an.fftSize = 256;
        src.connect(an);
        return an;
    }
    level(an) {
        if (!an) return 0;
        const buf = new Uint8Array(an.fftSize);
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (const v of buf)sum += ((v - 128) / 128) ** 2;
        return Math.sqrt(sum / buf.length);
    }
    checkSpeaking() {
        const next = {};
        if (!this.muted && this.level(this.local) > 0.03) next.me = true;
        for (const [id, p] of this.peers)if (this.level(p.analyser) > 0.03) next[id] = true;
        const prev = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].getState().voice;
        const same = Object.keys(next).length === Object.keys(prev.speaking).length && Object.keys(next).every((k)=>prev.speaking[k]);
        if (!same) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGame"].setState({
            voice: {
                ...prev,
                speaking: next
            }
        });
    }
}
const voice = new Voice();
}),
];

//# sourceMappingURL=src_0gkllhp._.js.map