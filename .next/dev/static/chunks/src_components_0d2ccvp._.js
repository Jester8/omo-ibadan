(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/interior/Furniture.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FurnitureItem,
    "glow",
    ()=>glow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/furniture.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/materials.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interior/textures.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$power$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interior/power.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const WOOD = "#8a5a3c";
const DARK = "#5a3a24";
const LIGHT = "#b8895a";
const METAL = "#8c9096";
const WHITE = "#efece4";
const glow = {
    screen: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#1b2a3a",
        emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#8fc8ff"),
        emissiveIntensity: 0,
        roughness: 0.3
    }),
    bulb: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#fff4d6",
        emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffd98a"),
        emissiveIntensity: 0,
        roughness: 0.4
    }),
    lantern: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#ffe2a8",
        emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffb347"),
        emissiveIntensity: 0.4,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9
    }),
    neon: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#ffffff",
        emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ff6fb1"),
        emissiveIntensity: 0,
        roughness: 0.4
    })
};
const glass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: "#bfe0f2",
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.28
});
const water = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: "#5fb8e6",
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85
});
const artCache = new Map();
function artMat(color) {
    let m = artCache.get(color);
    if (!m) {
        m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            map: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adireTexture"])(color),
            roughness: 0.85
        });
        artCache.set(color, m);
    }
    return m;
}
/* ---- primitives: bottom-based boxes and cylinders ---- */ function Bx({ p = [
    0,
    0,
    0
], s, c, r = 0.75, rot, m }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            p[0],
            p[1] + s[1] / 2,
            p[2]
        ],
        rotation: rot,
        material: m ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c ?? WOOD, r),
        castShadow: true,
        receiveShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
            args: s
        }, void 0, false, {
            fileName: "[project]/src/components/interior/Furniture.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = Bx;
function Cy({ p = [
    0,
    0,
    0
], r, r2, h, c, seg = 18, rough = 0.75, m, rot }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            p[0],
            p[1] + h / 2,
            p[2]
        ],
        rotation: rot,
        material: m ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c ?? WOOD, rough),
        castShadow: true,
        receiveShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
            args: [
                r2 ?? r,
                r,
                h,
                seg
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/interior/Furniture.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c1 = Cy;
function Sp({ p, r, c, sc, rough = 0.7 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: p,
        scale: sc,
        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c, rough),
        castShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
            args: [
                r,
                16,
                12
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/interior/Furniture.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c2 = Sp;
/** Four legs at the corners of a w x d footprint. */ function Legs({ w, d, h, c = DARK, r = 0.025 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            -1,
            1
        ].flatMap((sx)=>[
                -1,
                1
            ].map((sz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                    p: [
                        sx * (w / 2 - r * 2),
                        0,
                        sz * (d / 2 - r * 2)
                    ],
                    r: r,
                    h: h,
                    c: c,
                    seg: 8
                }, `${sx}${sz}`, false, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 71,
                    columnNumber: 52
                }, this)))
    }, void 0, false, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c3 = Legs;
/* ---- animated bits ---- */ function Blades({ y, r = 0.55, n = 4, c = "#e8e2d2" }) {
    _s();
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const speed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Blades.useFrame": (_, dt)=>{
            speed.current += ((__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$power$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interiorState"].power ? 7 : 0) - speed.current) * Math.min(1, dt * 1.5);
            if (g.current) g.current.rotation.y += speed.current * dt;
        }
    }["Blades.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            y,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                p: [
                    0,
                    0.02,
                    0
                ],
                r: 0.09,
                h: 0.1,
                c: DARK,
                seg: 12
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                p: [
                    0,
                    0.12,
                    0
                ],
                r: 0.015,
                h: 0.2,
                c: METAL,
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: g,
                children: Array.from({
                    length: n
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                        rotation: [
                            0,
                            i / n * Math.PI * 2,
                            0
                        ],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                r / 2 + 0.08,
                                0.0,
                                0
                            ],
                            s: [
                                r,
                                0.015,
                                0.14
                            ],
                            c: c,
                            rot: [
                                0,
                                0,
                                0.06
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(Blades, "Iu9blBtC0p4WXUu9KjNdMzoosh0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c4 = Blades;
/* ---- builders ---- */ function Sofa({ W, D, c, arms = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                s: [
                    W,
                    0.3,
                    D
                ],
                c: DARK
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    0,
                    0.3,
                    0.06
                ],
                s: [
                    W - 0.06,
                    0.14,
                    D - 0.2
                ],
                c: c,
                r: 0.9
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    0,
                    0.3,
                    -D / 2 + 0.13
                ],
                s: [
                    W,
                    0.52,
                    0.24
                ],
                c: c,
                r: 0.9
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            arms && [
                -1,
                1
            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                    p: [
                        s * (W / 2 - 0.1),
                        0.3,
                        0.02
                    ],
                    s: [
                        0.2,
                        0.26,
                        D - 0.08
                    ],
                    c: c,
                    r: 0.9
                }, s, false, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 109,
                    columnNumber: 28
                }, this)),
            [
                -1,
                1
            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                    p: [
                        s * (W / 2 - 0.35),
                        0.44,
                        -D / 2 + 0.32
                    ],
                    s: [
                        0.34,
                        0.28,
                        0.12
                    ],
                    c: s < 0 ? "#d89b3c" : "#2f3b82",
                    r: 0.9,
                    rot: [
                        -0.2,
                        0,
                        0
                    ]
                }, `p${s}`, false, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_c5 = Sofa;
function Bed({ W, D, c, hospital = false }) {
    const frame = hospital ? "#b8c0c6" : DARK;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                s: [
                    W,
                    0.28,
                    D
                ],
                c: frame,
                r: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    0,
                    0.28,
                    0.02
                ],
                s: [
                    W - 0.08,
                    0.2,
                    D - 0.1
                ],
                c: hospital ? "#f2f4f5" : "#f0e8d6",
                r: 0.9
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    0,
                    0.48,
                    D * 0.2
                ],
                s: [
                    W - 0.08,
                    0.07,
                    D * 0.6
                ],
                c: hospital ? "#7aa7c7" : c,
                r: 0.9
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            [
                -1,
                1
            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                    p: [
                        s * (W / 4 + (hospital ? 0 : 0)),
                        0.48,
                        -D / 2 + 0.3
                    ],
                    s: [
                        W / 2 - 0.15,
                        0.1,
                        0.34
                    ],
                    c: "#fbf8f0",
                    r: 0.95
                }, s, false, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    0,
                    0,
                    -D / 2 + 0.04
                ],
                s: [
                    W,
                    hospital ? 0.75 : 0.95,
                    0.08
                ],
                c: frame,
                r: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            hospital && [
                -1,
                1
            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                    p: [
                        s * (W / 2 - 0.02),
                        0.5,
                        0
                    ],
                    s: [
                        0.03,
                        0.3,
                        D * 0.7
                    ],
                    c: METAL,
                    r: 0.4
                }, `r${s}`, false, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 128,
                    columnNumber: 39
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_c6 = Bed;
function Plant({ big = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                r: 0.2,
                r2: 0.16,
                h: 0.32,
                c: "#b5533c",
                seg: 14
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                p: [
                    0,
                    0.32,
                    0
                ],
                r: 0.02,
                h: 0.45,
                c: "#4a7a3a",
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                p: [
                    0,
                    0.85,
                    0
                ],
                r: 0.28,
                c: "#4f9a4d",
                sc: [
                    1,
                    1.1,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                p: [
                    0.14,
                    0.6,
                    0.05
                ],
                r: 0.2,
                c: "#5fae58"
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                p: [
                    -0.13,
                    0.7,
                    -0.06
                ],
                r: 0.2,
                c: "#3f8f56"
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            big && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                p: [
                    0,
                    1.15,
                    0
                ],
                r: 0.22,
                c: "#5fae58"
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 141,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_c7 = Plant;
function Books({ W, shelves, h }) {
    const colors = [
        "#8a2f3c",
        "#2f3b82",
        "#d89b3c",
        "#2f8f83",
        "#5a3a24",
        "#b5533c",
        "#efe0c4"
    ];
    const out = [];
    for(let s = 0; s < shelves; s++){
        let x = -W / 2 + 0.08;
        let k = 0;
        while(x < W / 2 - 0.1){
            const w = 0.04 + (s * 7 + k * 13) % 5 * 0.012;
            const bh = 0.2 + (s * 5 + k * 11) % 4 * 0.035;
            out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    x + w / 2,
                    0.12 + s * (h - 0.2) / shelves,
                    0.02
                ],
                s: [
                    w,
                    bh,
                    0.22
                ],
                c: colors[(s + k) % colors.length],
                r: 0.9
            }, `${s}-${k}`, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 155,
                columnNumber: 16
            }, this));
            x += w + 0.004;
            k++;
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: out
    }, void 0, false, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 160,
        columnNumber: 10
    }, this);
}
_c8 = Books;
/* ---- the catalogue ---- */ function Body({ item, W, D, c, c2 }) {
    const H = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FURN"][item.kind].h;
    switch(item.kind){
        case "sofa":
        case "loveseat":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sofa, {
                W: W,
                D: D,
                c: c
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 170,
                columnNumber: 14
            }, this);
        case "armchair":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sofa, {
                W: W,
                D: D,
                c: c
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 172,
                columnNumber: 14
            }, this);
        case "chair":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.42,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.47,
                            -D / 2 + 0.03
                        ],
                        s: [
                            W,
                            0.42,
                            0.05
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legs, {
                        w: W,
                        d: D,
                        h: 0.42
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, this);
        case "plasticchair":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.4,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: item.c ?? "#e8e4da",
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.45,
                            -D / 2 + 0.03
                        ],
                        s: [
                            W - 0.04,
                            0.4,
                            0.04
                        ],
                        c: item.c ?? "#e8e4da",
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legs, {
                        w: W,
                        d: D,
                        h: 0.4,
                        c: "#c9c5ba",
                        r: 0.018
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 183,
                columnNumber: 9
            }, this);
        case "stool":
        case "barstool":
            {
                const sh = item.kind === "stool" ? 0.45 : 0.75;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                0,
                                sh - 0.05,
                                0
                            ],
                            r: 0.2,
                            h: 0.06,
                            c: WOOD
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        [
                            0,
                            1,
                            2
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                p: [
                                    Math.sin(i / 3 * 6.28) * 0.14,
                                    0,
                                    Math.cos(i / 3 * 6.28) * 0.14
                                ],
                                r: 0.02,
                                h: sh - 0.05,
                                c: DARK,
                                seg: 6
                            }, i, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this);
            }
        case "bench":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.4,
                            0
                        ],
                        s: [
                            W,
                            0.06,
                            D
                        ],
                        c: LIGHT
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                s * (W / 2 - 0.08),
                                0,
                                0
                            ],
                            s: [
                                0.07,
                                0.4,
                                D - 0.06
                            ],
                            c: DARK
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 205,
                            columnNumber: 31
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, this);
        case "pew":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.4,
                            0.04
                        ],
                        s: [
                            W,
                            0.06,
                            D - 0.12
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.46,
                            -D / 2 + 0.03
                        ],
                        s: [
                            W,
                            0.5,
                            0.06
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                s * (W / 2 - 0.04),
                                0,
                                0
                            ],
                            s: [
                                0.08,
                                0.9,
                                D
                            ],
                            c: DARK
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 213,
                            columnNumber: 31
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this);
        case "coffeetable":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.36,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: DARK,
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.41,
                            0
                        ],
                        s: [
                            W * 0.55,
                            0.012,
                            D * 0.4
                        ],
                        c: c,
                        r: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legs, {
                        w: W,
                        d: D,
                        h: 0.36
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, this);
        case "diningtable":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.7,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.75,
                            0
                        ],
                        s: [
                            W * 0.6,
                            0.012,
                            D * 0.28
                        ],
                        c: c,
                        r: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legs, {
                        w: W,
                        d: D,
                        h: 0.7,
                        r: 0.035
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 226,
                columnNumber: 9
            }, this);
        case "roundtable":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.7,
                            0
                        ],
                        r: W / 2,
                        h: 0.05,
                        c: item.c ?? LIGHT
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.05,
                        h: 0.7,
                        c: DARK,
                        seg: 8
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.3,
                        r2: 0.3,
                        h: 0.04,
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 234,
                columnNumber: 9
            }, this);
        case "desk":
        case "studentdesk":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.7,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: item.kind === "desk" ? WOOD : LIGHT
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    item.kind === "desk" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.22,
                            0,
                            0
                        ],
                        s: [
                            0.4,
                            0.7,
                            D - 0.06
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 245,
                        columnNumber: 36
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legs, {
                        w: W,
                        d: D,
                        h: 0.7
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this);
        case "pcdesk":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.7,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: "#d8d4c8",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.2,
                            0,
                            0
                        ],
                        s: [
                            0.35,
                            0.7,
                            D - 0.06
                        ],
                        c: "#b8b4a8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legs, {
                        w: W,
                        d: D,
                        h: 0.7,
                        c: METAL,
                        r: 0.022
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.75,
                            -D / 2 + 0.2
                        ],
                        s: [
                            0.55,
                            0.34,
                            0.04
                        ],
                        c: "#17181c",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.92,
                            -D / 2 + 0.225
                        ],
                        material: glow.screen,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.5,
                                0.29,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.75,
                            -D / 2 + 0.2
                        ],
                        r: 0.04,
                        r2: 0.06,
                        h: 0.06,
                        c: "#17181c",
                        seg: 8
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.75,
                            0.05
                        ],
                        s: [
                            0.42,
                            0.02,
                            0.14
                        ],
                        c: "#2a2c32"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 251,
                columnNumber: 9
            }, this);
        case "counter":
        case "bar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H - 0.05,
                            D
                        ],
                        c: c2,
                        r: 0.6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.05,
                            0.02
                        ],
                        s: [
                            W + 0.04,
                            0.06,
                            D + 0.08
                        ],
                        c: DARK,
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.12,
                            D / 2 + 0.005
                        ],
                        s: [
                            W - 0.1,
                            0.06,
                            0.02
                        ],
                        c: c,
                        r: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    item.kind === "bar" && [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                s * (W / 2 - 0.1),
                                0.05,
                                D / 2 + 0.1
                            ],
                            r: 0.02,
                            h: 0.15,
                            c: METAL,
                            seg: 6
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 270,
                            columnNumber: 54
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this);
        case "stall":
            {
                const goods = [
                    "#d94a3a",
                    "#e2a233",
                    "#4f9a4d",
                    "#f0e8d6",
                    "#b5533c"
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            s: [
                                W,
                                0.75,
                                D
                            ],
                            c: DARK
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0,
                                0.75,
                                0
                            ],
                            s: [
                                W + 0.06,
                                0.05,
                                D + 0.06
                            ],
                            c: c,
                            r: 0.9
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this),
                        Array.from({
                            length: 6
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                                p: [
                                    -W / 2 + 0.3 + i * (W / 6.4),
                                    0.88,
                                    (i % 2 - 0.5) * 0.3
                                ],
                                r: 0.1 + i % 3 * 0.02,
                                c: goods[(i + Math.round(item.x)) % goods.length]
                            }, i, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0,
                                0.8,
                                -D / 2 + 0.05
                            ],
                            s: [
                                W * 0.9,
                                0.22,
                                0.12
                            ],
                            c: goods[(Math.round(item.z) + 2) % goods.length],
                            r: 0.9
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 276,
                    columnNumber: 9
                }, this);
            }
        case "cabinet":
        case "sidetable":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H - 0.05,
                            D
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.05,
                            0
                        ],
                        s: [
                            W + 0.03,
                            0.05,
                            D + 0.03
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.1,
                            D / 2 + 0.005
                        ],
                        s: [
                            0.02,
                            H - 0.3,
                            0.012
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, this);
        case "bed":
        case "singlebed":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bed, {
                W: W,
                D: D,
                c: c
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 297,
                columnNumber: 14
            }, this);
        case "hospitalbed":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bed, {
                W: W,
                D: D,
                c: c,
                hospital: true
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 299,
                columnNumber: 14
            }, this);
        case "wardrobe":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                                    p: [
                                        s * (W / 4),
                                        0.1,
                                        D / 2 + 0.005
                                    ],
                                    s: [
                                        W / 2 - 0.05,
                                        H - 0.2,
                                        0.015
                                    ],
                                    c: LIGHT,
                                    r: 0.6
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                                    p: [
                                        s * 0.04,
                                        0.9,
                                        D / 2 + 0.02
                                    ],
                                    s: [
                                        0.025,
                                        0.16,
                                        0.025
                                    ],
                                    c: DARK
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 307,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s, true, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 305,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 302,
                columnNumber: 9
            }, this);
        case "bookshelf":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.04,
                            0.02
                        ],
                        s: [
                            W - 0.08,
                            H - 0.1,
                            D - 0.04
                        ],
                        c: "#3a2618"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Books, {
                        W: W,
                        shelves: 5,
                        h: H
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this);
        case "fridge":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: WHITE,
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 323,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.15,
                            D / 2 + 0.005
                        ],
                        s: [
                            W - 0.02,
                            0.012,
                            0.012
                        ],
                        c: METAL
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.1,
                            0.5,
                            D / 2 + 0.02
                        ],
                        s: [
                            0.025,
                            0.5,
                            0.03
                        ],
                        c: METAL
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 325,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.1,
                            1.3,
                            D / 2 + 0.02
                        ],
                        s: [
                            0.025,
                            0.3,
                            0.03
                        ],
                        c: METAL
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -W / 2 + 0.12,
                            1.5,
                            D / 2 + 0.01
                        ],
                        material: glow.bulb,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.04,
                                0.02,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 322,
                columnNumber: 9
            }, this);
        case "stove":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: WHITE,
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.2,
                            D / 2 + 0.005
                        ],
                        s: [
                            W - 0.1,
                            0.45,
                            0.015
                        ],
                        c: "#2a2c32",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].flatMap((sx)=>[
                            -1,
                            1
                        ].map((sz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                p: [
                                    sx * 0.15,
                                    H,
                                    sz * 0.14
                                ],
                                r: 0.08,
                                h: 0.012,
                                c: "#2a2c32",
                                seg: 16
                            }, `${sx}${sz}`, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 337,
                                columnNumber: 56
                            }, this)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 334,
                columnNumber: 9
            }, this);
        case "sink":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H - 0.04,
                            D
                        ],
                        c: "#d8d4c8",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.04,
                            0
                        ],
                        s: [
                            W + 0.02,
                            0.04,
                            D + 0.02
                        ],
                        c: METAL,
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H,
                            0
                        ],
                        s: [
                            W * 0.6,
                            0.012,
                            D * 0.6
                        ],
                        c: "#6a6e74",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            H,
                            -D / 2 + 0.08
                        ],
                        r: 0.015,
                        h: 0.25,
                        c: METAL,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 346,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 342,
                columnNumber: 9
            }, this);
        case "tv":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.45,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.45,
                            0
                        ],
                        s: [
                            W * 0.92,
                            0.66,
                            0.07
                        ],
                        c: "#111216",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 353,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.78,
                            0.04
                        ],
                        material: glow.screen,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W * 0.86,
                                0.58,
                                0.012
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 354,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 351,
                columnNumber: 9
            }, this);
        case "rug":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.012,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                material: artMat(c),
                receiveShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                    args: [
                        W,
                        D
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 362,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 361,
                columnNumber: 9
            }, this);
        case "plant":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Plant, {
                big: true
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 366,
                columnNumber: 14
            }, this);
        case "lamp":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.12,
                        r2: 0.14,
                        h: 0.03,
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.012,
                        h: 1.2,
                        c: METAL,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            1.15,
                            0
                        ],
                        r: 0.12,
                        r2: 0.19,
                        h: 0.22,
                        m: glow.bulb,
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 369,
                columnNumber: 9
            }, this);
        case "standingfan":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.16,
                        h: 0.03,
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.014,
                        h: 1.0,
                        c: METAL,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Blades, {
                        y: 1.05,
                        r: 0.2,
                        n: 3,
                        c: "#cfd4d8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            1.04,
                            0.0
                        ],
                        r: 0.26,
                        h: 0.01,
                        c: "#9aa0a6",
                        seg: 20,
                        rot: [
                            Math.PI / 2,
                            0,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 377,
                columnNumber: 9
            }, this);
        case "ceilingfan":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Blades, {
                y: 2.45
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 385,
                columnNumber: 14
            }, this);
        case "chandelier":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    2.2,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.2,
                            0
                        ],
                        r: 0.01,
                        h: 0.35,
                        c: METAL,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.1,
                            0
                        ],
                        "rotation-x": Math.PI / 2,
                        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#c9a24a", 0.3),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                            args: [
                                0.28,
                                0.02,
                                8,
                                24
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 391,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 390,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 6
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                Math.sin(i / 6 * 6.28) * 0.28,
                                0.14,
                                Math.cos(i / 6 * 6.28) * 0.28
                            ],
                            material: glow.bulb,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.04,
                                    8,
                                    6
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 395,
                                columnNumber: 15
                            }, this)
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 394,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 388,
                columnNumber: 9
            }, this);
        case "generator":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.45,
                            D
                        ],
                        c: "#d94a3a",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 403,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.45,
                            0
                        ],
                        s: [
                            W - 0.1,
                            0.12,
                            D - 0.06
                        ],
                        c: "#2a2c32"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 404,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            W / 2 - 0.08,
                            0.5,
                            -0.05
                        ],
                        r: 0.035,
                        h: 0.22,
                        c: METAL,
                        seg: 8
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 405,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                s * (W / 2 - 0.05),
                                0,
                                0
                            ],
                            r: 0.05,
                            h: 0.08,
                            c: "#17181c",
                            seg: 10,
                            rot: [
                                0,
                                0,
                                Math.PI / 2
                            ]
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 406,
                            columnNumber: 31
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -W / 2 + 0.15,
                            0.2,
                            D / 2 + 0.005
                        ],
                        s: [
                            0.2,
                            0.1,
                            0.01
                        ],
                        c: "#f4f4f2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 407,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 402,
                columnNumber: 9
            }, this);
        case "lantern":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.07,
                        h: 0.02,
                        c: METAL,
                        seg: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 413,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.02,
                            0
                        ],
                        r: 0.055,
                        h: 0.16,
                        m: glow.lantern,
                        seg: 12
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 414,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.18,
                            0
                        ],
                        r: 0.065,
                        r2: 0.04,
                        h: 0.04,
                        c: METAL,
                        seg: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 415,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 412,
                columnNumber: 9
            }, this);
        case "waterdispenser":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.95,
                            D
                        ],
                        c: WHITE,
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 421,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.95,
                            0
                        ],
                        r: 0.14,
                        h: 0.34,
                        c: "#7fc4e8",
                        seg: 14,
                        rough: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 422,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.5,
                            D / 2 + 0.005
                        ],
                        s: [
                            0.18,
                            0.05,
                            0.02
                        ],
                        c: "#3a7ab8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 423,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 420,
                columnNumber: 9
            }, this);
        case "toilet":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0,
                            -D / 2 + 0.12
                        ],
                        s: [
                            0.4,
                            0.8,
                            0.22
                        ],
                        c: WHITE,
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 429,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.2,
                            0.05
                        ],
                        scale: [
                            1,
                            0.8,
                            1.35
                        ],
                        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(WHITE, 0.3),
                        castShadow: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                            args: [
                                0.2,
                                14,
                                10
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 431,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 428,
                columnNumber: 9
            }, this);
        case "shower":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.08,
                            D
                        ],
                        c: WHITE,
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 438,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.4,
                            1.0,
                            0
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.02,
                                1.9,
                                D
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 440,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.0,
                            D / 2 - 0.02
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W,
                                1.9,
                                0.02
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 443,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            -W / 2 + 0.1,
                            1.8,
                            -D / 2 + 0.1
                        ],
                        r: 0.08,
                        h: 0.03,
                        c: METAL,
                        seg: 12
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 437,
                columnNumber: 9
            }, this);
        case "basin":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.05,
                        h: 0.75,
                        c: WHITE,
                        seg: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 451,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.75,
                            0
                        ],
                        s: [
                            W,
                            0.12,
                            D
                        ],
                        c: WHITE,
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 452,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.86,
                            -D / 2 + 0.06
                        ],
                        r: 0.012,
                        h: 0.14,
                        c: METAL,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 453,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 450,
                columnNumber: 9
            }, this);
        case "podium":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H - 0.1,
                            D
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.1,
                            0
                        ],
                        s: [
                            W + 0.04,
                            0.05,
                            D + 0.04
                        ],
                        c: DARK,
                        rot: [
                            -0.2,
                            0,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 460,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 458,
                columnNumber: 9
            }, this);
        case "blackboard":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 0.9,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W + 0.1,
                            H + 0.1,
                            0.06
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.05,
                            0.035
                        ],
                        s: [
                            W,
                            H,
                            0.01
                        ],
                        c: "#2a4a3a",
                        r: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 467,
                        columnNumber: 11
                    }, this),
                    [
                        0.2,
                        0.5,
                        0.8
                    ].map((y, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                -W / 2 + 0.4 + i * 0.1,
                                y,
                                0.045
                            ],
                            s: [
                                W * (0.5 - i * 0.1),
                                0.02,
                                0.004
                            ],
                            c: "#e8e4da"
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 468,
                            columnNumber: 42
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 465,
                columnNumber: 9
            }, this);
        case "altar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: "#e8e0cc",
                        r: 0.7
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 474,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H,
                            0
                        ],
                        s: [
                            W + 0.1,
                            0.05,
                            D + 0.1
                        ],
                        c: c,
                        r: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 475,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H + 0.05,
                            -D / 2 + 0.2
                        ],
                        s: [
                            0.05,
                            0.6,
                            0.05
                        ],
                        c: "#c9a24a",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 476,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H + 0.4,
                            -D / 2 + 0.2
                        ],
                        s: [
                            0.3,
                            0.05,
                            0.05
                        ],
                        c: "#c9a24a",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 477,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                s * 0.6,
                                H + 0.05,
                                0
                            ],
                            r: 0.035,
                            h: 0.25,
                            c: "#f4f0e4",
                            seg: 8
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 478,
                            columnNumber: 31
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 473,
                columnNumber: 9
            }, this);
        case "pulpit":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H - 0.1,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 484,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.1,
                            0
                        ],
                        s: [
                            W + 0.08,
                            0.06,
                            D + 0.08
                        ],
                        c: WOOD,
                        rot: [
                            -0.15,
                            0,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 485,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 483,
                columnNumber: 9
            }, this);
        case "mimbar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0,
                                0,
                                D / 2 - i * 0.22
                            ],
                            s: [
                                W - 0.1 * i,
                                0.3 + i * 0.3,
                                0.22
                            ],
                            c: "#e8e0cc"
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 491,
                            columnNumber: 36
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.2,
                            -D / 2 + 0.1
                        ],
                        s: [
                            W - 0.3,
                            0.1,
                            0.5
                        ],
                        c: "#2f6f4f"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -W / 2 + 0.15,
                            0,
                            -D / 2 + 0.2
                        ],
                        s: [
                            0.1,
                            1.8,
                            0.5
                        ],
                        c: "#e8e0cc"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 493,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.15,
                            0,
                            -D / 2 + 0.2
                        ],
                        s: [
                            0.1,
                            1.8,
                            0.5
                        ],
                        c: "#e8e0cc"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 494,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.75,
                            -D / 2 + 0.2
                        ],
                        s: [
                            W,
                            0.12,
                            0.55
                        ],
                        c: "#c9a24a",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 495,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 490,
                columnNumber: 9
            }, this);
        case "prayermat":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.02,
                            D
                        ],
                        c: "#2f6f4f",
                        r: 0.95
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.02,
                            0
                        ],
                        s: [
                            W - 0.12,
                            0.004,
                            D - 0.12
                        ],
                        c: "#d9c98a",
                        r: 0.95
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.024,
                            -D / 2 + 0.3
                        ],
                        s: [
                            0.2,
                            0.004,
                            0.3
                        ],
                        c: "#2f6f4f",
                        r: 0.95
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 500,
                columnNumber: 9
            }, this);
        case "displaycase":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.35,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 509,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.35 + (H - 0.4) / 2,
                            0
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.04,
                                H - 0.4,
                                D - 0.04
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 511,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 510,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.05,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 513,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        0,
                        1
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                            p: [
                                i * (W / 3.4),
                                0.5,
                                0
                            ],
                            r: 0.08,
                            c: [
                                "#c9a24a",
                                "#b5533c",
                                "#2f3b82"
                            ][i + 1]
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 514,
                            columnNumber: 34
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 508,
                columnNumber: 9
            }, this);
        case "arcade":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: item.c ?? "#3a3470",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 520,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.15,
                            D / 2 + 0.005
                        ],
                        material: glow.screen,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.15,
                                0.4,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 522,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 521,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.85,
                            D / 2 + 0.05
                        ],
                        s: [
                            W - 0.1,
                            0.05,
                            0.25
                        ],
                        c: "#1a1830"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 524,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.7,
                            D / 2 + 0.005
                        ],
                        material: glow.neon,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.15,
                                0.14,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 525,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            -0.1,
                            0.88,
                            D / 2 + 0.12
                        ],
                        r: 0.015,
                        h: 0.1,
                        c: "#d94a3a",
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 528,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 519,
                columnNumber: 9
            }, this);
        case "clawmachine":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.7,
                            D
                        ],
                        c: "#e85d9a",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 534,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.7 + 0.5,
                            0
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.06,
                                1.0,
                                D - 0.06
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 536,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 535,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.7,
                            0
                        ],
                        s: [
                            W,
                            0.2,
                            D
                        ],
                        c: "#e85d9a",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 538,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 6
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                            p: [
                                (i % 3 - 1) * 0.2,
                                0.78,
                                (i % 2 - 0.5) * 0.3
                            ],
                            r: 0.08,
                            c: [
                                "#ffd166",
                                "#06d6a0",
                                "#ef476f"
                            ][i % 3]
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 539,
                            columnNumber: 52
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 533,
                columnNumber: 9
            }, this);
        case "fountain":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: W / 2,
                        h: 0.35,
                        c: "#d6d0c0",
                        seg: 28
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 545,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.32,
                            0
                        ],
                        material: water,
                        "rotation-x": -Math.PI / 2,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                            args: [
                                W / 2 - 0.1,
                                28
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 547,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.3,
                            0
                        ],
                        r: 0.07,
                        h: 0.55,
                        c: "#d6d0c0",
                        seg: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 549,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.85,
                            0
                        ],
                        r: 0.3,
                        r2: 0.05,
                        h: 0.12,
                        c: "#d6d0c0",
                        seg: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 550,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                        p: [
                            0,
                            1.0,
                            0
                        ],
                        r: 0.08,
                        c: "#7fc4e8",
                        rough: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 551,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 544,
                columnNumber: 9
            }, this);
        case "stage":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.3,
                            D
                        ],
                        c: LIGHT
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 557,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.3,
                            D / 2 - 0.04
                        ],
                        s: [
                            W,
                            0.02,
                            0.08
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 556,
                columnNumber: 9
            }, this);
        case "drum":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.45,
                            0
                        ],
                        r: 0.2,
                        r2: 0.07,
                        h: 0.2,
                        c: "#a8483a",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 564,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.25,
                            0
                        ],
                        r: 0.07,
                        r2: 0.2,
                        h: 0.2,
                        c: "#a8483a",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.65,
                            0
                        ],
                        r: 0.2,
                        h: 0.03,
                        c: "#e8d9b0",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.2,
                            0
                        ],
                        r: 0.2,
                        h: 0.03,
                        c: "#e8d9b0",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 567,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0,
                            0
                        ],
                        r: 0.02,
                        h: 0.2,
                        c: DARK,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 568,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 563,
                columnNumber: 9
            }, this);
        case "rack":
            {
                const cols = [
                    "#d94a3a",
                    "#2f3b82",
                    "#e2a233",
                    "#2f8f83",
                    "#8a2f3c",
                    "#f0e8d6",
                    "#7c3aed"
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        [
                            -1,
                            1
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                p: [
                                    s * (W / 2 - 0.05),
                                    0,
                                    0
                                ],
                                r: 0.02,
                                h: H,
                                c: METAL,
                                seg: 6
                            }, s, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 575,
                                columnNumber: 31
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                0,
                                H - 0.05,
                                0
                            ],
                            r: 0.015,
                            h: W - 0.06,
                            c: METAL,
                            seg: 6,
                            rot: [
                                0,
                                0,
                                Math.PI / 2
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 576,
                            columnNumber: 11
                        }, this),
                        Array.from({
                            length: 9
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                                p: [
                                    -W / 2 + 0.14 + i * ((W - 0.28) / 8),
                                    0.45,
                                    0
                                ],
                                s: [
                                    0.08,
                                    H - 0.55,
                                    0.3
                                ],
                                c: cols[(i + Math.round(item.x)) % cols.length],
                                r: 0.9
                            }, i, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 577,
                                columnNumber: 52
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 574,
                    columnNumber: 9
                }, this);
            }
        case "crates":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.3,
                            D
                        ],
                        c: LIGHT
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 584,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0.05,
                            0.3,
                            0
                        ],
                        s: [
                            W - 0.15,
                            0.3,
                            D - 0.1
                        ],
                        c: WOOD
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 585,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 7
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                            p: [
                                -0.25 + i % 4 * 0.17,
                                0.66,
                                -0.12 + Math.floor(i / 4) * 0.2
                            ],
                            r: 0.09,
                            c: item.c ?? "#d94a3a"
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 586,
                            columnNumber: 52
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 583,
                columnNumber: 9
            }, this);
        case "sacks":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                        p: [
                            -0.2 + i * 0.22,
                            0.2 + (i === 1 ? 0.3 : 0),
                            0
                        ],
                        r: 0.22,
                        c: "#d8c9a0",
                        sc: [
                            1,
                            1.2,
                            1
                        ]
                    }, i, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 592,
                        columnNumber: 33
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 591,
                columnNumber: 9
            }, this);
        case "umbrella":
            {
                const stripes = [
                    "#d94a3a",
                    "#f0e8d6",
                    "#2f8f83",
                    "#e2a233"
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            r: 0.03,
                            h: 2.1,
                            c: METAL,
                            seg: 6
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 599,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                0,
                                2.2,
                                0
                            ],
                            castShadow: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                                    args: [
                                        W / 2,
                                        0.35,
                                        12
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 601,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: stripes[Math.abs(Math.round(item.x + item.z)) % 4],
                                    roughness: 0.8,
                                    transparent: true,
                                    opacity: 0.72
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 602,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 600,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 598,
                    columnNumber: 9
                }, this);
            }
        case "mortar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.2,
                        r2: 0.14,
                        h: 0.5,
                        c: "#6b4a2f",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 610,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.5,
                            0
                        ],
                        r: 0.24,
                        r2: 0.2,
                        h: 0.12,
                        c: "#7a5436",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 611,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0.18,
                            0.2,
                            0.05
                        ],
                        r: 0.035,
                        h: 0.85,
                        c: "#a8794a",
                        seg: 8,
                        rot: [
                            0.1,
                            0,
                            -0.25
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 612,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 609,
                columnNumber: 9
            }, this);
        case "calabash":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                        p: [
                            0,
                            0.16,
                            0
                        ],
                        r: 0.22,
                        c: "#c9a24a",
                        sc: [
                            1,
                            0.7,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 618,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                        p: [
                            0.3,
                            0.1,
                            0.1
                        ],
                        r: 0.14,
                        c: "#b8893a",
                        sc: [
                            1,
                            0.7,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 619,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 617,
                columnNumber: 9
            }, this);
        case "ibeji":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            0.4,
                            0.06,
                            0.3
                        ],
                        c: "#3b2a1d"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 625,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            position: [
                                s * 0.1,
                                0.06,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                    r: 0.07,
                                    r2: 0.05,
                                    h: 0.3,
                                    c: "#6b4a2f",
                                    seg: 10
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 628,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                                    p: [
                                        0,
                                        0.4,
                                        0
                                    ],
                                    r: 0.075,
                                    c: "#6b4a2f"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 629,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                                    p: [
                                        0,
                                        0.12,
                                        0.05
                                    ],
                                    s: [
                                        0.1,
                                        0.02,
                                        0.03
                                    ],
                                    c: "#c9a24a"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s, true, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 627,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 624,
                columnNumber: 9
            }, this);
        case "mannequin":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.18,
                        h: 0.03,
                        c: DARK,
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 638,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.015,
                        h: 1.0,
                        c: METAL,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 639,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.85,
                            0
                        ],
                        r: 0.2,
                        r2: 0.14,
                        h: 0.55,
                        c: c,
                        seg: 14,
                        rough: 0.8
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 640,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                        p: [
                            0,
                            1.5,
                            0
                        ],
                        r: 0.09,
                        c: "#e8d9b0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 641,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.85,
                            0.12
                        ],
                        s: [
                            0.3,
                            0.45,
                            0.01
                        ],
                        m: artMat(c)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 642,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 637,
                columnNumber: 9
            }, this);
        case "carvedstool":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.34,
                            0
                        ],
                        r: 0.22,
                        h: 0.07,
                        c: "#6b4a2f",
                        seg: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 648,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.07,
                            0
                        ],
                        r: 0.09,
                        h: 0.27,
                        c: "#5a3a24",
                        seg: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 649,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.2,
                        h: 0.07,
                        c: "#6b4a2f",
                        seg: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 650,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 647,
                columnNumber: 9
            }, this);
        case "gascooker":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.85,
                            D
                        ],
                        c: WHITE,
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 656,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.85,
                            0
                        ],
                        s: [
                            W - 0.04,
                            0.04,
                            D - 0.04
                        ],
                        c: "#2a2c32"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 657,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                s * 0.17,
                                0.89,
                                0
                            ],
                            r: 0.08,
                            h: 0.015,
                            c: METAL,
                            seg: 14
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 658,
                            columnNumber: 31
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.2,
                            D / 2 + 0.005
                        ],
                        s: [
                            W - 0.12,
                            0.4,
                            0.015
                        ],
                        c: "#2a2c32",
                        r: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 659,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            W / 2 + 0.2,
                            0,
                            0
                        ],
                        r: 0.13,
                        h: 0.55,
                        c: "#c24a3a",
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 660,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            W / 2 + 0.2,
                            0.55,
                            0
                        ],
                        r: 0.05,
                        h: 0.08,
                        c: METAL,
                        seg: 8
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 661,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 655,
                columnNumber: 9
            }, this);
        case "radio":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.26,
                            D
                        ],
                        c: "#3b2a1d",
                        r: 0.6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 667,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -0.08,
                            0.05,
                            D / 2 + 0.005
                        ],
                        s: [
                            0.18,
                            0.14,
                            0.01
                        ],
                        c: "#d9c98a"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 668,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0.12,
                            0.05,
                            D / 2
                        ],
                        r: 0.04,
                        h: 0.02,
                        c: METAL,
                        seg: 10,
                        rot: [
                            Math.PI / 2,
                            0,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 669,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0.15,
                            0.26,
                            0
                        ],
                        r: 0.006,
                        h: 0.4,
                        c: METAL,
                        seg: 5,
                        rot: [
                            0,
                            0,
                            -0.5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 670,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 666,
                columnNumber: 9
            }, this);
        case "sewingmachine":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.55,
                            0
                        ],
                        s: [
                            W,
                            0.04,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 676,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -W / 2 + 0.05,
                            0,
                            0
                        ],
                        s: [
                            0.05,
                            0.55,
                            D - 0.1
                        ],
                        c: "#2a2c32"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 677,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.05,
                            0,
                            0
                        ],
                        s: [
                            0.05,
                            0.55,
                            D - 0.1
                        ],
                        c: "#2a2c32"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 678,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0.2,
                            0.59,
                            0
                        ],
                        s: [
                            0.3,
                            0.2,
                            0.14
                        ],
                        c: "#1b1d22"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 679,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -0.05,
                            0.59,
                            -0.05
                        ],
                        s: [
                            0.4,
                            0.18,
                            0.08
                        ],
                        c: "#1b1d22"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 680,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            -0.25,
                            0.7,
                            -0.02
                        ],
                        r: 0.05,
                        h: 0.04,
                        c: METAL,
                        seg: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.6,
                            0.18
                        ],
                        s: [
                            0.4,
                            0.01,
                            0.1
                        ],
                        m: artMat(c)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 682,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 675,
                columnNumber: 9
            }, this);
        case "meterbox":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 1.3,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: "#8c9096",
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 688,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.3,
                            D / 2 + 0.005
                        ],
                        material: glow.bulb,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.2,
                                0.07,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 690,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 689,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.08,
                            D / 2
                        ],
                        s: [
                            0.2,
                            0.12,
                            0.01
                        ],
                        c: "#2a2c32"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 692,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 687,
                columnNumber: 9
            }, this);
        case "calendar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 1.5,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H,
                            D
                        ],
                        c: "#f4f0e4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 698,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.12,
                            D / 2
                        ],
                        s: [
                            W,
                            0.12,
                            0.01
                        ],
                        c: "#b5533c"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 699,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.1,
                            D / 2
                        ],
                        s: [
                            W - 0.1,
                            0.26,
                            0.01
                        ],
                        m: artMat(c)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 700,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 697,
                columnNumber: 9
            }, this);
        case "provisions":
            {
                const cols = [
                    "#d94a3a",
                    "#e2a233",
                    "#2f8f83",
                    "#f0e8d6",
                    "#2f3b82",
                    "#8a2f3c"
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            s: [
                                W,
                                H,
                                D
                            ],
                            c: DARK
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 707,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0,
                                0.04,
                                0.03
                            ],
                            s: [
                                W - 0.06,
                                H - 0.1,
                                D - 0.04
                            ],
                            c: "#3a2618"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 708,
                            columnNumber: 11
                        }, this),
                        [
                            0.15,
                            0.55,
                            0.95,
                            1.35
                        ].flatMap((y)=>Array.from({
                                length: 7
                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                                    p: [
                                        -W / 2 + 0.12 + i * ((W - 0.24) / 6),
                                        y + 0.03,
                                        0.03
                                    ],
                                    s: [
                                        0.1,
                                        0.18 + i % 3 * 0.04,
                                        0.1
                                    ],
                                    c: cols[(i + Math.round(y * 5)) % cols.length],
                                    r: 0.6
                                }, `${y}${i}`, false, {
                                    fileName: "[project]/src/components/interior/Furniture.tsx",
                                    lineNumber: 710,
                                    columnNumber: 53
                                }, this)))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 706,
                    columnNumber: 9
                }, this);
            }
        case "cooler":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            H - 0.05,
                            D
                        ],
                        c: "#2f6fb8",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 718,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.05,
                            0
                        ],
                        s: [
                            W + 0.02,
                            0.05,
                            D + 0.02
                        ],
                        c: "#f4f4f2",
                        r: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.2,
                            D / 2
                        ],
                        s: [
                            0.12,
                            0.04,
                            0.03
                        ],
                        c: "#d8d4c8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 720,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 717,
                columnNumber: 9
            }, this);
        case "watertank":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.4,
                        h: 1.15,
                        c: "#2f6fb8",
                        seg: 20,
                        rough: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 726,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            1.15,
                            0
                        ],
                        r: 0.36,
                        r2: 0.3,
                        h: 0.15,
                        c: "#2f6fb8",
                        seg: 20,
                        rough: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 727,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            1.3,
                            0
                        ],
                        r: 0.1,
                        h: 0.04,
                        c: "#f4f4f2",
                        seg: 12
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 728,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 725,
                columnNumber: 9
            }, this);
        case "agbadastand":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.2,
                        h: 0.03,
                        c: DARK,
                        seg: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 734,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.015,
                        h: 1.6,
                        c: DARK,
                        seg: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 735,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.4,
                            0
                        ],
                        s: [
                            0.7,
                            0.03,
                            0.03
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 736,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.25,
                            0
                        ],
                        r: 0.36,
                        r2: 0.1,
                        h: 1.1,
                        c: c,
                        seg: 18,
                        rough: 0.8
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 737,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.2,
                            0.0
                        ],
                        s: [
                            0.1,
                            0.18,
                            0.2
                        ],
                        c: "#f4f0e4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 738,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 733,
                columnNumber: 9
            }, this);
        case "curtain":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                p: [
                    0,
                    0,
                    0
                ],
                s: [
                    W,
                    H,
                    0.04
                ],
                c: "#bcd7e2",
                r: 0.9
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 742,
                columnNumber: 14
            }, this);
        case "flag":
            {
                const g = item.c ?? "#1f9d55";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            r: 0.03,
                            h: 2.4,
                            c: METAL,
                            seg: 6
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 747,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0.2,
                                1.6,
                                0
                            ],
                            s: [
                                0.12,
                                0.5,
                                0.015
                            ],
                            c: g,
                            r: 0.9
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 748,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0.32,
                                1.6,
                                0
                            ],
                            s: [
                                0.12,
                                0.5,
                                0.015
                            ],
                            c: "#f4f4f2",
                            r: 0.9
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 749,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0.44,
                                1.6,
                                0
                            ],
                            s: [
                                0.12,
                                0.5,
                                0.015
                            ],
                            c: g,
                            r: 0.9
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 750,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interior/Furniture.tsx",
                    lineNumber: 746,
                    columnNumber: 9
                }, this);
            }
        case "trophycase":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.4,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 757,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.4 + (H - 0.5) / 2,
                            0
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.04,
                                H - 0.5,
                                D - 0.04
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 759,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 758,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.1,
                            0
                        ],
                        s: [
                            W,
                            0.1,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 761,
                        columnNumber: 11
                    }, this),
                    [
                        0,
                        1
                    ].flatMap((r)=>[
                            -1,
                            0,
                            1
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                                position: [
                                    i * 0.3,
                                    0.55 + r * 0.55,
                                    0
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                        r: 0.05,
                                        r2: 0.03,
                                        h: 0.04,
                                        c: "#c9a24a",
                                        seg: 10
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interior/Furniture.tsx",
                                        lineNumber: 764,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                        p: [
                                            0,
                                            0.04,
                                            0
                                        ],
                                        r: 0.02,
                                        h: 0.08,
                                        c: "#c9a24a",
                                        seg: 8
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interior/Furniture.tsx",
                                        lineNumber: 765,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                                        p: [
                                            0,
                                            0.12,
                                            0
                                        ],
                                        r: 0.07,
                                        r2: 0.04,
                                        h: 0.12,
                                        c: "#e8c15a",
                                        seg: 12,
                                        rough: 0.3
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interior/Furniture.tsx",
                                        lineNumber: 766,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, `${r}${i}`, true, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 763,
                                columnNumber: 13
                            }, this)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 756,
                columnNumber: 9
            }, this);
        case "goalpost":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                            p: [
                                s * (W / 2),
                                0,
                                0
                            ],
                            r: 0.05,
                            h: H,
                            c: "#f4f4f2",
                            seg: 8
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 774,
                            columnNumber: 31
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            H - 0.05,
                            0
                        ],
                        r: 0.05,
                        h: W,
                        c: "#f4f4f2",
                        seg: 8,
                        rot: [
                            0,
                            0,
                            Math.PI / 2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 775,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            H / 2,
                            -0.4
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W,
                                H,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 777,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 776,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 773,
                columnNumber: 9
            }, this);
        case "ticketbooth":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            1.2,
                            D
                        ],
                        c: "#c75c3a"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 784,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.5,
                            D / 2 - 0.1
                        ],
                        material: glass,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.2,
                                0.6,
                                0.02
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 786,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 785,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.2,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 788,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            1.8,
                            0
                        ],
                        s: [
                            W + 0.2,
                            0.08,
                            D + 0.2
                        ],
                        c: "#e2a233"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 789,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -W / 2 + 0.05,
                            1.2,
                            0
                        ],
                        s: [
                            0.05,
                            0.6,
                            D
                        ],
                        c: "#c75c3a"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 790,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            W / 2 - 0.05,
                            1.2,
                            0
                        ],
                        s: [
                            0.05,
                            0.6,
                            D
                        ],
                        c: "#c75c3a"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 791,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 783,
                columnNumber: 9
            }, this);
        case "tank":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W,
                            0.4,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 797,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.4 + 0.5,
                            0
                        ],
                        material: water,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                W - 0.06,
                                1.0,
                                D - 0.06
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 799,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 798,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            H - 0.05,
                            0
                        ],
                        s: [
                            W,
                            0.05,
                            D
                        ],
                        c: DARK
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 801,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 7
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sp, {
                            p: [
                                -W / 2 + 0.4 + i * (W / 8),
                                0.7 + i % 3 * 0.2,
                                (i % 2 - 0.5) * 0.3
                            ],
                            r: 0.05,
                            c: [
                                "#ffb347",
                                "#ff6b6b",
                                "#ffd166"
                            ][i % 3],
                            sc: [
                                1.6,
                                1,
                                0.6
                            ]
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 802,
                            columnNumber: 52
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.4,
                            0
                        ],
                        s: [
                            W - 0.3,
                            0.1,
                            D - 0.3
                        ],
                        c: "#c9b88a"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 803,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 796,
                columnNumber: 9
            }, this);
        case "stairs":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    Array.from({
                        length: 8
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                0,
                                0,
                                D / 2 - (i + 0.5) * (D / 8)
                            ],
                            s: [
                                W,
                                0.3 * (i + 1),
                                D / 8
                            ],
                            c: i % 2 ? WOOD : LIGHT
                        }, i, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 809,
                            columnNumber: 52
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            -W / 2 + 0.02,
                            0,
                            0
                        ],
                        s: [
                            0.05,
                            2.4,
                            D
                        ],
                        c: "#00000000",
                        m: glass
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 810,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 808,
                columnNumber: 9
            }, this);
        case "wallart":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 1.5,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            -H / 2,
                            0
                        ],
                        s: [
                            W + 0.08,
                            H + 0.08,
                            0.05
                        ],
                        c: "#3b2a1d"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 816,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0,
                            0.03
                        ],
                        material: artMat(c),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                            args: [
                                W,
                                H
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 818,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 817,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 815,
                columnNumber: 9
            }, this);
        case "clock":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    item.y ?? 1.9,
                    0
                ],
                "rotation-x": Math.PI / 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        r: 0.2,
                        h: 0.04,
                        c: "#3b2a1d",
                        seg: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 825,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cy, {
                        p: [
                            0,
                            0.04,
                            0
                        ],
                        r: 0.17,
                        h: 0.01,
                        c: "#f4f0e4",
                        seg: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 826,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.05,
                            0.05
                        ],
                        s: [
                            0.012,
                            0.004,
                            0.1
                        ],
                        c: "#111"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 827,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0.04,
                            0.05,
                            0
                        ],
                        s: [
                            0.08,
                            0.004,
                            0.012
                        ],
                        c: "#111"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 828,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 824,
                columnNumber: 9
            }, this);
        case "pitch":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.015,
                            0
                        ],
                        "rotation-x": -Math.PI / 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                                args: [
                                    W,
                                    D
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 835,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: "#58b66a",
                                roughness: 1
                            }, void 0, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 836,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 834,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        p: [
                            0,
                            0.02,
                            0
                        ],
                        s: [
                            0.05,
                            0.004,
                            D
                        ],
                        c: "#e9f7ec"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 838,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.025,
                            0
                        ],
                        "rotation-x": -Math.PI / 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                                args: [
                                    0.8,
                                    0.85,
                                    32
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 840,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: "#e9f7ec"
                            }, void 0, false, {
                                fileName: "[project]/src/components/interior/Furniture.tsx",
                                lineNumber: 841,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 839,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 833,
                columnNumber: 9
            }, this);
        case "liftdoor":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                        s: [
                            W + 0.1,
                            H + 0.05,
                            0.08
                        ],
                        c: "#6b6e74",
                        r: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/Furniture.tsx",
                        lineNumber: 848,
                        columnNumber: 11
                    }, this),
                    [
                        -1,
                        1
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                            p: [
                                s * (W / 4),
                                0.02,
                                0.05
                            ],
                            s: [
                                W / 2 - 0.02,
                                H - 0.05,
                                0.02
                            ],
                            c: "#b8bcc2",
                            r: 0.3
                        }, s, false, {
                            fileName: "[project]/src/components/interior/Furniture.tsx",
                            lineNumber: 849,
                            columnNumber: 31
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 847,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bx, {
                s: [
                    W,
                    H || 0.5,
                    D
                ],
                c: WOOD
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 853,
                columnNumber: 14
            }, this);
    }
}
_c9 = Body;
function FurnitureItem({ item, accent, trim, onUse }) {
    _s1();
    const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FURN"][item.kind];
    const W = item.w ?? def.w;
    const D = item.d ?? def.d;
    const c = item.c ?? accent;
    const c2 = item.c2 ?? trim;
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FurnitureItem.useMemo[body]": ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                item: item,
                W: W,
                D: D,
                c: c,
                c2: c2
            }, void 0, false, {
                fileName: "[project]/src/components/interior/Furniture.tsx",
                lineNumber: 863,
                columnNumber: 30
            }, this)
    }["FurnitureItem.useMemo[body]"], [
        item,
        W,
        D,
        c,
        c2
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            item.x,
            item.kind === "radio" || item.kind === "calabash" || item.kind === "ibeji" ? item.y ?? 0 : 0,
            item.z
        ],
        "rotation-y": item.rot ?? 0,
        onClick: onUse && def.use ? (e)=>{
            if (e.delta > 6) return;
            e.stopPropagation();
            onUse();
        } : undefined,
        onPointerOver: onUse && def.use ? (e)=>{
            e.stopPropagation();
            document.body.style.cursor = "pointer";
        } : undefined,
        onPointerOut: ()=>{
            document.body.style.cursor = "auto";
        },
        children: body
    }, void 0, false, {
        fileName: "[project]/src/components/interior/Furniture.tsx",
        lineNumber: 865,
        columnNumber: 5
    }, this);
}
_s1(FurnitureItem, "yELrB/E2TLfiU6I8Pw+1hJLtnzY=");
_c10 = FurnitureItem;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "Bx");
__turbopack_context__.k.register(_c1, "Cy");
__turbopack_context__.k.register(_c2, "Sp");
__turbopack_context__.k.register(_c3, "Legs");
__turbopack_context__.k.register(_c4, "Blades");
__turbopack_context__.k.register(_c5, "Sofa");
__turbopack_context__.k.register(_c6, "Bed");
__turbopack_context__.k.register(_c7, "Plant");
__turbopack_context__.k.register(_c8, "Books");
__turbopack_context__.k.register(_c9, "Body");
__turbopack_context__.k.register(_c10, "FurnitureItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interior/InteriorScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InteriorScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/avatar/Avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/furniture.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interiorRuntime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/materials.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$Furniture$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interior/Furniture.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interior/textures.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$power$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interior/power.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
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
const WALL_H = 2.7;
const T = 0.18;
const PART_H = 1.15;
const windowMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    roughness: 0.4,
    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#dff3ff"),
    emissiveIntensity: 0.4
});
/* ---------------------------------- lights ---------------------------------- */ function Lights({ layout }) {
    _s();
    const amb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const torch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bulbs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const spots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Lights.useMemo[spots]": ()=>{
            const nx = Math.max(1, Math.round(layout.w / 5));
            const nz = Math.max(1, Math.round(layout.d / 5));
            const out = [];
            for(let i = 0; i < nx; i++)for(let j = 0; j < nz; j++)out.push([
                ((i + 0.5) / nx - 0.5) * layout.w * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"],
                ((j + 0.5) / nz - 0.5) * layout.d * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"]
            ]);
            return out;
        }
    }["Lights.useMemo[spots]"], [
        layout
    ]);
    const tint = layout.light === "cool" ? "#cfd8ff" : layout.light === "bright" ? "#fff8ec" : "#ffdca8";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Lights.useFrame": ({ scene })=>{
            const now = Date.now();
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState();
            const day = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["daylight"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gameMinutes"])(now, state.clockOverride) / 60);
            const power = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["powerOn"])();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$power$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interiorState"].power = power;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$power$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interiorState"].night = 1 - day;
            scene.background = scene.background instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"] ? scene.background.set("#1d1713") : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#1d1713");
            scene.fog = null;
            if (amb.current) amb.current.intensity = 0.32 + day * 0.5 + (power ? 0.18 : 0);
            if (sun.current) sun.current.intensity = 0.25 + day * 0.9;
            const bulb = power ? 0.8 + (1 - day) * 0.9 : 0;
            for (const l of bulbs.current)if (l) l.intensity = bulb;
            if (torch.current) {
                torch.current.position.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].x, 1.2, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].z);
                torch.current.intensity = power ? 0 : 0.5 + (1 - day) * 1.6;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$Furniture$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["glow"].screen.emissiveIntensity = power ? 1.1 : 0;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$Furniture$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["glow"].bulb.emissiveIntensity = power ? 0.7 + (1 - day) * 1.6 : 0;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$Furniture$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["glow"].neon.emissiveIntensity = power ? 1.6 : 0;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$Furniture$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["glow"].lantern.emissiveIntensity = power ? 0.25 : 1.4;
            windowMat.emissiveIntensity = 0.1 + day * 0.9;
        }
    }["Lights.useFrame"]);
    const W = layout.w * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"];
    const D = layout.d * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                ref: amb,
                color: tint,
                intensity: 0.7
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                args: [
                    "#fff2dc",
                    "#6b4a2f",
                    0.35
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                ref: sun,
                position: [
                    -W * 0.4,
                    7,
                    -D * 0.2
                ],
                color: "#fff1d6",
                intensity: 1,
                castShadow: true,
                "shadow-mapSize": [
                    1024,
                    1024
                ],
                "shadow-camera-left": -W / 2 - 2,
                "shadow-camera-right": W / 2 + 2,
                "shadow-camera-top": D / 2 + 2,
                "shadow-camera-bottom": -D / 2 - 2,
                "shadow-camera-near": 1,
                "shadow-camera-far": 20,
                "shadow-bias": -0.0006
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            spots.map(([x, z], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    ref: (el)=>{
                        bulbs.current[i] = el;
                    },
                    position: [
                        x,
                        1.25,
                        z
                    ],
                    color: tint,
                    distance: 9,
                    decay: 1.4,
                    intensity: 1
                }, i, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: torch,
                color: "#fff3d0",
                distance: 5,
                decay: 1.4,
                intensity: 0
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(Lights, "FT0krdY0i4Yy9DmFff1jqWJbTM0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Lights;
/* ----------------------------------- floor ----------------------------------- */ function Floor({ layout }) {
    _s1();
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Floor.useMemo[base]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floorMaterial"])(layout.floor, layout.w, layout.d)
    }["Floor.useMemo[base]"], [
        layout
    ]);
    const zones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Floor.useMemo[zones]": ()=>(layout.zones ?? []).map({
                "Floor.useMemo[zones]": (z)=>({
                        z,
                        m: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floorMaterial"])(z.floor, z.w, z.d, z.color)
                    })
            }["Floor.useMemo[zones]"])
    }["Floor.useMemo[zones]"], [
        layout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.05,
                    0
                ],
                material: base,
                receiveShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        layout.w + T * 2,
                        0.1,
                        layout.d + T * 2
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            zones.map(({ z, m }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        z.x,
                        0.004,
                        z.z
                    ],
                    "rotation-x": -Math.PI / 2,
                    material: m,
                    receiveShadow: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            z.w,
                            z.d
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, i, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s1(Floor, "+id2huGCTt/W/bGWukyzE1iFeMk=");
_c1 = Floor;
/* ----------------------------------- walls ----------------------------------- */ /** An outer wall that drops to a low cutaway when it faces the camera. */ function CutawayWall({ x, z, nx, nz, children }) {
    _s2();
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "CutawayWall.useFrame": (_, dt)=>{
            if (!g.current) return;
            const facing = Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].az) * nx + Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].az) * nz > 0.2;
            const target = facing ? 0.1 : 1;
            g.current.scale.y += (target - g.current.scale.y) * Math.min(1, dt * 9);
        }
    }["CutawayWall.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: g,
        position: [
            x,
            0,
            z
        ],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s2(CutawayWall, "oGpTFNp4GSby0bHzkAWZQHetE7I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = CutawayWall;
function WallBlock({ len, axis, color, trim, withCap = true }) {
    const s = axis === "x" ? [
        len,
        WALL_H,
        T
    ] : [
        T,
        WALL_H,
        len
    ];
    const base = axis === "x" ? [
        len,
        0.14,
        T + 0.04
    ] : [
        T + 0.04,
        0.14,
        len
    ];
    const cap = axis === "x" ? [
        len + 0.02,
        0.06,
        T + 0.06
    ] : [
        T + 0.06,
        0.06,
        len + 0.02
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    WALL_H / 2,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(color, 0.9),
                castShadow: true,
                receiveShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: s
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.07,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(trim, 0.7),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: base
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            withCap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    WALL_H + 0.03,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(trim, 0.7),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: cap
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_c3 = WallBlock;
/** One shared pane material for every window; Lights dims its glow with the time of day. */ function paneMaterial() {
    if (!windowMat.map) {
        const tex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["louvreTexture"])();
        windowMat.map = tex;
        windowMat.emissiveMap = tex;
        windowMat.needsUpdate = true;
    }
    return windowMat;
}
function Window({ along, axis, trim }) {
    const pane = paneMaterial();
    // windows sit on the inner face of back (axis x) and left (axis z) walls
    const rot = axis === "x" ? [
        0,
        0,
        0
    ] : [
        0,
        Math.PI / 2,
        0
    ];
    const inner = T / 2 + 0.012;
    const pos = axis === "x" ? [
        along,
        1.5,
        inner
    ] : [
        inner,
        1.5,
        along
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: pos,
        rotation: rot,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                material: pane,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                    args: [
                        1.1,
                        0.95
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            [
                [
                    0,
                    0.5,
                    1.18,
                    0.07
                ],
                [
                    0,
                    -0.5,
                    1.18,
                    0.07
                ],
                [
                    -0.57,
                    0,
                    0.07,
                    1.0
                ],
                [
                    0.57,
                    0,
                    0.07,
                    1.0
                ]
            ].map(([x, y, w, h], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        x,
                        y,
                        0.01
                    ],
                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(trim, 0.7),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            w,
                            h,
                            0.05
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                }, i, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_c4 = Window;
function windowSpots(layout, side) {
    const len = side === "back" ? layout.w : layout.d;
    const n = Math.max(1, Math.floor(len / 3.4));
    const spots = [];
    for(let i = 0; i < n; i++){
        const pos = ((i + 0.5) / n - 0.5) * len;
        const blocked = layout.items.some((it)=>{
            const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FURN"][it.kind];
            const tall = def.h > 0.8 || it.kind === "wallart" || it.kind === "clock" || it.kind === "blackboard";
            if (!tall) return false;
            const near = side === "back" ? it.z < -layout.d / 2 + 1.1 && Math.abs(it.x - pos) < 1.2 : it.x < -layout.w / 2 + 1.1 && Math.abs(it.z - pos) < 1.2;
            return near;
        });
        if (!blocked) spots.push(pos);
    }
    return spots;
}
function Walls({ layout }) {
    _s3();
    const { w, d, wall, trim } = layout;
    const gap = 1.3;
    const left = layout.exitX - gap / 2 + w / 2;
    const right = w / 2 - (layout.exitX + gap / 2);
    const backWin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Walls.useMemo[backWin]": ()=>windowSpots(layout, "back")
    }["Walls.useMemo[backWin]"], [
        layout
    ]);
    const leftWin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Walls.useMemo[leftWin]": ()=>windowSpots(layout, "left")
    }["Walls.useMemo[leftWin]"], [
        layout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CutawayWall, {
                x: 0,
                z: -d / 2 - T / 2,
                nx: 0,
                nz: -1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallBlock, {
                        len: w + T * 2,
                        axis: "x",
                        color: wall,
                        trim: trim
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this),
                    backWin.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Window, {
                            along: a,
                            axis: "x",
                            trim: trim
                        }, a, false, {
                            fileName: "[project]/src/components/interior/InteriorScene.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CutawayWall, {
                x: -w / 2 - T / 2,
                z: 0,
                nx: -1,
                nz: 0,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallBlock, {
                        len: d,
                        axis: "z",
                        color: wall,
                        trim: trim
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    leftWin.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Window, {
                            along: a,
                            axis: "z",
                            trim: trim
                        }, a, false, {
                            fileName: "[project]/src/components/interior/InteriorScene.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CutawayWall, {
                x: w / 2 + T / 2,
                z: 0,
                nx: 1,
                nz: 0,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallBlock, {
                    len: d,
                    axis: "z",
                    color: wall,
                    trim: trim
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CutawayWall, {
                x: (-w / 2 + layout.exitX - gap / 2) / 2,
                z: d / 2 + T / 2,
                nx: 0,
                nz: 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallBlock, {
                    len: Math.max(0.2, left),
                    axis: "x",
                    color: wall,
                    trim: trim
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CutawayWall, {
                x: (layout.exitX + gap / 2 + w / 2) / 2,
                z: d / 2 + T / 2,
                nx: 0,
                nz: 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallBlock, {
                    len: Math.max(0.2, right),
                    axis: "x",
                    color: wall,
                    trim: trim
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            layout.walls.map((pw, i)=>{
                const dx = pw.x2 - pw.x1;
                const dz = pw.z2 - pw.z1;
                const len = Math.hypot(dx, dz);
                const horizontal = Math.abs(dx) >= Math.abs(dz);
                const gapLen = pw.door !== undefined ? pw.doorW ?? 1.4 : 0;
                const at = (f)=>({
                        x: pw.x1 + dx * f,
                        z: pw.z1 + dz * f
                    });
                const segs = pw.door === undefined ? [
                    [
                        0,
                        1
                    ]
                ] : [
                    [
                        0,
                        Math.max(0, pw.door - gapLen / 2 / len)
                    ],
                    [
                        Math.min(1, pw.door + gapLen / 2 / len),
                        1
                    ]
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: segs.map(([f0, f1], k)=>{
                        if (f1 - f0 < 0.001) return null;
                        const a = at(f0);
                        const b = at(f1);
                        const L = Math.hypot(b.x - a.x, b.z - a.z);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            position: [
                                (a.x + b.x) / 2,
                                0,
                                (a.z + b.z) / 2
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        0,
                                        PART_H / 2,
                                        0
                                    ],
                                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(wall, 0.9),
                                    castShadow: true,
                                    receiveShadow: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                        args: horizontal ? [
                                            L,
                                            PART_H,
                                            0.14
                                        ] : [
                                            0.14,
                                            PART_H,
                                            L
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                                        lineNumber: 272,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                                    lineNumber: 271,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        0,
                                        PART_H + 0.025,
                                        0
                                    ],
                                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(trim, 0.7),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                        args: horizontal ? [
                                            L + 0.02,
                                            0.05,
                                            0.18
                                        ] : [
                                            0.18,
                                            0.05,
                                            L + 0.02
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                                        lineNumber: 275,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                                    lineNumber: 274,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, k, true, {
                            fileName: "[project]/src/components/interior/InteriorScene.tsx",
                            lineNumber: 270,
                            columnNumber: 17
                        }, this);
                    })
                }, i, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_s3(Walls, "V+hxy5Xfas2qvDlVxU83BE2X9KY=");
_c5 = Walls;
/* ------------------------------ exit mat and door ------------------------------ */ function ExitMat({ layout }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            layout.exitX,
            0,
            layout.d / 2 - 0.45
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.012,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(layout.accent, 0.9),
                onClick: (e)=>{
                    if (e.delta > 6) return;
                    e.stopPropagation();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walkToExit"])();
                },
                onPointerOver: (e)=>{
                    e.stopPropagation();
                    document.body.style.cursor = "pointer";
                },
                onPointerOut: ()=>document.body.style.cursor = "auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                    args: [
                        1.2,
                        0.7
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.016,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#f3e9d0", 0.9),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                    args: [
                        1.05,
                        0.55
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 310,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            [
                -0.65,
                0.65
            ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        x,
                        1.05,
                        0.45
                    ],
                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(layout.trim, 0.6),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.1,
                            2.1,
                            0.12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this)
                }, x, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    2.1,
                    0.45
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(layout.trim, 0.6),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        1.4,
                        0.1,
                        0.12
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 318,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
_c6 = ExitMat;
/* ---------------------------------- residents ---------------------------------- */ const CHATTER = [
    "How far?",
    "E kaaro!",
    "Abeg, make yourself comfortable.",
    "Wetin dey happen?"
];
function ResidentActor({ r, layout }) {
    _s4();
    const look = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ResidentActor.useMemo[look]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seededLook"])(r.seed ?? r.name)
    }["ResidentActor.useMemo[look]"], [
        r.seed,
        r.name
    ]);
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        speed: 0,
        pose: r.pose ?? null
    });
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const ry = r.ry ?? Math.atan2(-r.x, -r.z);
    const lines = r.lines ?? layout.lines ?? CHATTER;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "ResidentActor.useFrame": ()=>{
            const now = Date.now();
            if (next.current === 0) next.current = now + 12000 + Math.random() * 20000;
            if (now < next.current) return;
            next.current = now + 22000 + Math.random() * 25000;
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState();
            if (!s.interior) return;
            s.addChat({
                room: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interiorKey"])(s.interior),
                from: r.name,
                text: lines[Math.floor(Math.random() * lines.length)],
                at: now,
                npc: true
            }, `res:${r.name}`);
        }
    }["ResidentActor.useFrame"]);
    const lying = r.pose === "lie";
    const sitting = r.pose === "sit";
    const seatH = r.seatH ?? 0.45;
    const y = lying ? (seatH + 0.12) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"] : sitting ? (seatH + 0.04 - 0.865) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"] : 0;
    const ox = lying ? Math.sin(ry) * 0.85 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"] : 0;
    const oz = lying ? Math.cos(ry) * 0.85 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"] : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            r.x * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"] + ox,
            y,
            r.z * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"] + oz
        ],
        rotation: lying ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](-Math.PI / 2, ry, 0, "YXZ") : [
            0,
            ry,
            0
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$avatar$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            look: look,
            motion: motion,
            scale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"]
        }, void 0, false, {
            fileName: "[project]/src/components/interior/InteriorScene.tsx",
            lineNumber: 353,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 352,
        columnNumber: 5
    }, this);
}
_s4(ResidentActor, "5/BMn5xgBjuvEnGSAVy2rAPR6m0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c7 = ResidentActor;
/* ----------------------------------- scene ----------------------------------- */ function Room({ layout }) {
    _s5();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Room.useEffect": ()=>{
            const prev = document.body.style.cursor;
            return ({
                "Room.useEffect": ()=>{
                    document.body.style.cursor = prev || "auto";
                }
            })["Room.useEffect"];
        }
    }["Room.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {
                layout: layout
            }, void 0, false, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                scale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Floor, {
                        layout: layout
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Walls, {
                        layout: layout
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    layout.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$Furniture$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            item: it,
                            accent: layout.accent,
                            trim: layout.trim,
                            onUse: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walkToFurn"])(i)
                        }, i, false, {
                            fileName: "[project]/src/components/interior/InteriorScene.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExitMat, {
                        layout: layout
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            (layout.residents ?? []).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResidentActor, {
                    r: r,
                    layout: layout
                }, r.name, false, {
                    fileName: "[project]/src/components/interior/InteriorScene.tsx",
                    lineNumber: 379,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.006,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                onClick: (e)=>{
                    if (e.delta > 6) return;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().select(null);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walkTo"])(e.point.x, e.point.z);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            layout.w * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"],
                            layout.d * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$furniture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"]
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        transparent: true,
                        opacity: 0,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/interior/InteriorScene.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interior/InteriorScene.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 368,
        columnNumber: 5
    }, this);
}
_s5(Room, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c8 = Room;
function InteriorScene() {
    _s6();
    const interior = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "InteriorScene.useGame[interior]": (s)=>s.interior
    }["InteriorScene.useGame[interior]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "InteriorScene.useGame": (s)=>s.decorRev
    }["InteriorScene.useGame"]);
    if (!interior || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rt"].layout) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Room, {
        layout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiorRuntime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rt"].layout
    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interiors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interiorKey"])(interior), false, {
        fileName: "[project]/src/components/interior/InteriorScene.tsx",
        lineNumber: 402,
        columnNumber: 10
    }, this);
}
_s6(InteriorScene, "zDs1cYtwv7LtBXFvdCA80d84axE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c9 = InteriorScene;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Lights");
__turbopack_context__.k.register(_c1, "Floor");
__turbopack_context__.k.register(_c2, "CutawayWall");
__turbopack_context__.k.register(_c3, "WallBlock");
__turbopack_context__.k.register(_c4, "Window");
__turbopack_context__.k.register(_c5, "Walls");
__turbopack_context__.k.register(_c6, "ExitMat");
__turbopack_context__.k.register(_c7, "ResidentActor");
__turbopack_context__.k.register(_c8, "Room");
__turbopack_context__.k.register(_c9, "InteriorScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interior/power.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Shared, per-frame interior state (kept outside React so furniture reads it without re-rendering). */ __turbopack_context__.s([
    "interiorState",
    ()=>interiorState
]);
const interiorState = {
    /** mains or generator power available */ power: true,
    /** 0 = broad daylight, 1 = night */ night: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interior/textures.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FLOOR_COLORS",
    ()=>FLOOR_COLORS,
    "adireTexture",
    ()=>adireTexture,
    "floorMaterial",
    ()=>floorMaterial,
    "louvreTexture",
    ()=>louvreTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const cache = new Map();
function canvas(key, size, draw) {
    const hit = cache.get(key);
    if (hit) return hit;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    draw(c.getContext("2d"), size);
    const t = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    t.wrapS = t.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    t.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    t.anisotropy = 4;
    cache.set(key, t);
    return t;
}
let seed = 7;
const rnd = ()=>(seed = seed * 16807 % 2147483647) / 2147483647;
const shade = (hex, amt)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](hex).multiplyScalar(amt).getStyle();
/** One tile of floor texture covers 2 m x 2 m. */ function floorTexture(kind, color) {
    return canvas(`floor|${kind}|${color}`, 256, (g, s)=>{
        seed = 11;
        g.fillStyle = color;
        g.fillRect(0, 0, s, s);
        switch(kind){
            case "tile":
                {
                    const n = 4;
                    for(let i = 0; i < n; i++){
                        for(let j = 0; j < n; j++){
                            g.fillStyle = shade(color, 0.97 + rnd() * 0.06);
                            g.fillRect(i * s / n + 2, j * s / n + 2, s / n - 4, s / n - 4);
                        }
                    }
                    break;
                }
            case "wood":
                {
                    const planks = 8;
                    for(let j = 0; j < planks; j++){
                        g.fillStyle = shade(color, 0.88 + rnd() * 0.22);
                        g.fillRect(0, j * s / planks, s, s / planks - 1.5);
                        g.fillStyle = "rgba(0,0,0,0.08)";
                        for(let k = 0; k < 3; k++)g.fillRect(rnd() * s, j * s / planks + rnd() * (s / planks), 30 + rnd() * 60, 1);
                        g.fillStyle = "rgba(0,0,0,0.25)";
                        g.fillRect(rnd() * s, j * s / planks, 1.5, s / planks);
                    }
                    break;
                }
            case "redoxide":
                {
                    for(let k = 0; k < 900; k++){
                        g.fillStyle = `rgba(${rnd() > 0.5 ? "255,255,255" : "0,0,0"},${0.02 + rnd() * 0.04})`;
                        g.fillRect(rnd() * s, rnd() * s, 2 + rnd() * 5, 2 + rnd() * 5);
                    }
                    g.strokeStyle = "rgba(0,0,0,0.12)";
                    g.lineWidth = 1.5;
                    g.strokeRect(0, 0, s, s);
                    break;
                }
            case "concrete":
                {
                    for(let k = 0; k < 1400; k++){
                        g.fillStyle = `rgba(${rnd() > 0.5 ? "255,255,255" : "0,0,0"},${0.03 + rnd() * 0.05})`;
                        g.fillRect(rnd() * s, rnd() * s, 1 + rnd() * 3, 1 + rnd() * 3);
                    }
                    g.strokeStyle = "rgba(0,0,0,0.1)";
                    g.strokeRect(0, 0, s, s);
                    break;
                }
            case "carpet":
                {
                    for(let k = 0; k < 2500; k++){
                        g.fillStyle = `rgba(${rnd() > 0.5 ? "255,255,255" : "0,0,0"},${0.05 + rnd() * 0.07})`;
                        g.fillRect(rnd() * s, rnd() * s, 1, 3);
                    }
                    break;
                }
            case "marble":
                {
                    g.fillStyle = shade(color, 1.02);
                    g.fillRect(0, 0, s, s);
                    g.strokeStyle = "rgba(120,120,130,0.18)";
                    for(let k = 0; k < 7; k++){
                        g.lineWidth = 1 + rnd() * 1.5;
                        g.beginPath();
                        g.moveTo(rnd() * s, 0);
                        g.bezierCurveTo(rnd() * s, s * 0.3, rnd() * s, s * 0.6, rnd() * s, s);
                        g.stroke();
                    }
                    g.strokeStyle = "rgba(0,0,0,0.12)";
                    g.lineWidth = 2;
                    g.strokeRect(0, 0, s, s);
                    g.beginPath();
                    g.moveTo(s / 2, 0);
                    g.lineTo(s / 2, s);
                    g.moveTo(0, s / 2);
                    g.lineTo(s, s / 2);
                    g.stroke();
                    break;
                }
            case "grass":
                {
                    for(let k = 0; k < 1800; k++){
                        g.fillStyle = `rgba(${rnd() > 0.5 ? "40,110,50" : "130,200,110"},${0.1 + rnd() * 0.12})`;
                        g.fillRect(rnd() * s, rnd() * s, 1.5, 4 + rnd() * 4);
                    }
                    break;
                }
        }
    });
}
const FLOOR_COLORS = {
    tile: "#e6e0d0",
    wood: "#9a6a42",
    concrete: "#b9b6ae",
    redoxide: "#a8483a",
    carpet: "#7a6a5a",
    marble: "#f1eee8",
    grass: "#7cc46a"
};
function floorMaterial(kind, w, d, color) {
    const base = floorTexture(kind, color ?? FLOOR_COLORS[kind]).clone();
    base.repeat.set(w / 2, d / 2);
    base.needsUpdate = true;
    const glossy = kind === "marble" || kind === "redoxide" || kind === "tile";
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        map: base,
        roughness: glossy ? 0.45 : 0.9,
        metalness: kind === "marble" ? 0.08 : 0
    });
}
function adireTexture(ground) {
    return canvas(`adire|${ground}`, 256, (g, s)=>{
        seed = 3;
        g.fillStyle = ground;
        g.fillRect(0, 0, s, s);
        const cell = 64;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                const x = i * cell + cell / 2;
                const y = j * cell + cell / 2;
                g.strokeStyle = "rgba(245,240,225,0.9)";
                g.lineWidth = 3;
                for (const r of [
                    24,
                    16,
                    8
                ]){
                    g.beginPath();
                    g.arc(x, y, r, 0, Math.PI * 2);
                    g.stroke();
                }
                g.fillStyle = "rgba(245,240,225,0.9)";
                g.beginPath();
                g.arc(x, y, 3, 0, Math.PI * 2);
                g.fill();
                for(let k = 0; k < 8; k++){
                    const a = k / 8 * Math.PI * 2;
                    g.fillRect(x + Math.cos(a) * 29 - 1.5, y + Math.sin(a) * 29 - 1.5, 3, 3);
                }
            }
        }
        g.strokeStyle = "rgba(245,240,225,0.35)";
        g.lineWidth = 2;
        g.strokeRect(2, 2, s - 4, s - 4);
    });
}
function louvreTexture() {
    return canvas("louvre", 128, (g, s)=>{
        g.fillStyle = "#cfe6f2";
        g.fillRect(0, 0, s, s);
        const slats = 8;
        for(let k = 0; k < slats; k++){
            const y = k * s / slats;
            g.fillStyle = "rgba(255,255,255,0.6)";
            g.fillRect(4, y + 2, s - 8, s / slats - 4);
            g.fillStyle = "rgba(60,90,110,0.25)";
            g.fillRect(4, y + s / slats - 4, s - 8, 2);
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/world/Buildings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Buildings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/materials.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
/* ------------------------------ primitives ------------------------------ */ /* All positions are the BOTTOM-centre of the shape unless noted. */ function Box({ p = [
    0,
    0,
    0
], s, c, rough, rot }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            p[0],
            p[1] + s[1] / 2,
            p[2]
        ],
        rotation: rot,
        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c, rough),
        castShadow: true,
        receiveShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
            args: s
        }, void 0, false, {
            fileName: "[project]/src/components/world/Buildings.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Box;
function Cyl({ p = [
    0,
    0,
    0
], r, r2, h, c, seg = 28, open = false, rough }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            p[0],
            p[1] + h / 2,
            p[2]
        ],
        material: open ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: c,
            roughness: 0.8,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c, rough),
        castShadow: true,
        receiveShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
            args: [
                r2 ?? r,
                r,
                h,
                seg,
                1,
                open
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/world/Buildings.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = Cyl;
function Ball({ p, r, c, scale, half = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: p,
        scale: scale,
        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c, 0.6),
        castShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
            args: [
                r,
                28,
                18,
                0,
                Math.PI * 2,
                0,
                half ? Math.PI / 2 : Math.PI
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/world/Buildings.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c2 = Ball;
function Facade({ p = [
    0,
    0,
    0
], w, h, d, tint }) {
    _s();
    const mats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Facade.useMemo[mats]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["facadeMaterials"])(w, h, d, tint)
    }["Facade.useMemo[mats]"], [
        w,
        h,
        d,
        tint
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Facade.useEffect": ()=>{
            const glow = mats.filter({
                "Facade.useEffect.glow": (m)=>!!m.emissiveMap
            }["Facade.useEffect.glow"]);
            glow.forEach({
                "Facade.useEffect": (m)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["windowMats"].add(m)
            }["Facade.useEffect"]);
            return ({
                "Facade.useEffect": ()=>glow.forEach({
                        "Facade.useEffect": (m)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["windowMats"].delete(m)
                    }["Facade.useEffect"])
            })["Facade.useEffect"];
        }
    }["Facade.useEffect"], [
        mats
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            p[0],
            p[1] + h / 2,
            p[2]
        ],
        material: mats,
        castShadow: true,
        receiveShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
            args: [
                w,
                h,
                d
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/world/Buildings.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Facade, "KewPYA+jq2Wc2xuKddhfYLmXXC0=");
_c3 = Facade;
function Glow({ p, s, c }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: p,
        material: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signMat"],
        castShadow: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                args: s
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                attach: "material",
                color: c,
                emissive: c,
                emissiveIntensity: 0.4
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c4 = Glow;
function Awning({ p, w, colors }) {
    const n = Math.max(2, Math.round(w / 0.28));
    const seg = w / n;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: p,
        rotation: [
            0.35,
            0,
            0
        ],
        children: Array.from({
            length: n
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -w / 2 + seg * (i + 0.5),
                    0,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(colors[i % 2]),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        seg,
                        0.05,
                        0.5
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c5 = Awning;
function Column({ p, h = 0.9, r = 0.07 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
        p: p,
        r: r,
        h: h,
        c: "#f6f3ec",
        seg: 14
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, this);
}
_c6 = Column;
function Tower({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.5,
                    0.15,
                    d + 0.5
                ],
                c: "#d9d4c7"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    0,
                    0.15,
                    0
                ],
                w: w,
                h: h * 0.72,
                d: d,
                tint: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    0,
                    0.15 + h * 0.72,
                    0
                ],
                w: w * 0.72,
                h: h * 0.26,
                d: d * 0.72,
                tint: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.15 + h * 0.98,
                    0
                ],
                s: [
                    w * 0.8,
                    0.1,
                    d * 0.8
                ],
                c: "#f1ede2"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.15 + h * 0.98,
                    0
                ],
                r: 0.035,
                h: 0.9,
                c: "#b9b3a3",
                seg: 8
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glow, {
                p: [
                    0,
                    0.15 + h * 0.5,
                    d / 2 + 0.02
                ],
                s: [
                    w * 0.55,
                    0.16,
                    0.04
                ],
                c: "#e8b04a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_c7 = Tower;
function Hall({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.3,
                    0.14,
                    d + 0.3
                ],
                c: "#e6e1d4"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.14,
                    0
                ],
                s: [
                    w,
                    h * 0.55,
                    d * 0.85
                ],
                c: color,
                rough: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            [
                -1,
                -0.6,
                -0.2,
                0.2,
                0.6,
                1
            ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Column, {
                    p: [
                        k * w / 2.3,
                        0.14,
                        d / 2 - 0.1
                    ],
                    h: h * 0.55
                }, k, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.14 + h * 0.55,
                    0.05
                ],
                s: [
                    w + 0.15,
                    0.1,
                    d * 0.95
                ],
                c: "#efeadc"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.14 + h * 0.55 + 0.1 + 0.2,
                    d / 2 - 0.1
                ],
                rotation: [
                    Math.PI / 2,
                    Math.PI / 2,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#efeadc"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                    args: [
                        0.38,
                        0.38,
                        w * 0.78,
                        3
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.14 + h * 0.65,
                    -0.2
                ],
                r: 0.5,
                h: 0.3,
                c: "#efeadc"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    0,
                    0.14 + h * 0.65 + 0.3,
                    -0.2
                ],
                r: 0.5,
                c: "#4aa39b",
                half: true
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.14 + h * 0.65 + 0.8,
                    -0.2
                ],
                r: 0.02,
                h: 0.35,
                c: "#d6b44a",
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c8 = Hall;
function Market({ size: [w, h, d], color }) {
    const n = Math.max(3, Math.round(w / 0.85));
    const stripes = [
        color,
        "#f6efe2"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.3,
                    0.1,
                    d + 0.3
                ],
                c: "#cdbfa9"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            Array.from({
                length: n
            }).map((_, i)=>{
                const x = -w / 2 + w / n * (i + 0.5);
                const tone = [
                    "#e0663a",
                    "#2f9d77",
                    "#e0a62a",
                    "#6c7ae0",
                    "#d9568e"
                ][i % 5];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x,
                        0.1,
                        d / 2 - 0.7
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            s: [
                                w / n - 0.12,
                                0.35,
                                0.55
                            ],
                            c: "#8a5a3c"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            p: [
                                0,
                                0.35,
                                0
                            ],
                            s: [
                                w / n - 0.2,
                                0.12,
                                0.35
                            ],
                            c: tone
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            p: [
                                w / n * 0.2,
                                0.35,
                                0.08
                            ],
                            s: [
                                0.18,
                                0.2,
                                0.18
                            ],
                            c: "#f1d27a"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Awning, {
                            p: [
                                0,
                                h * 0.85,
                                0.15
                            ],
                            w: w / n - 0.06,
                            colors: [
                                tone,
                                "#f8f3e8"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 127,
                    columnNumber: 11
                }, this);
            }),
            Array.from({
                length: n
            }).map((_, i)=>{
                const x = -w / 2 + w / n * (i + 0.5);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x,
                        0.1,
                        -d / 2 + 0.7
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            s: [
                                w / n - 0.12,
                                h * 0.8,
                                0.9
                            ],
                            c: i % 2 ? "#f2e6cf" : "#e9d9ba"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Awning, {
                            p: [
                                0,
                                h * 0.8,
                                0.5
                            ],
                            w: w / n - 0.06,
                            colors: stripes
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    ]
                }, `b${i}`, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 138,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_c9 = Market;
function Campus({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.5,
                    0.1,
                    d + 0.5
                ],
                c: "#dcd6c6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    0,
                    0.1,
                    0
                ],
                w: w * 0.72,
                h: h,
                d: d,
                tint: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    -w * 0.4,
                    0.1,
                    0.2
                ],
                w: w * 0.3,
                h: h * 0.65,
                d: d * 0.75,
                tint: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1 + h,
                    0
                ],
                s: [
                    w * 0.74,
                    0.08,
                    d + 0.08
                ],
                c: "#f3efe5"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w * 0.2,
                    0.1 + h,
                    0
                ],
                s: [
                    0.8,
                    1.5,
                    0.8
                ],
                c: "#e9e1cf"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    w * 0.2,
                    0.1 + h + 1.5,
                    0
                ],
                r: 0.62,
                r2: 0,
                h: 0.75,
                c: "#4c5fb5",
                seg: 4
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glow, {
                p: [
                    w * 0.2,
                    0.1 + h + 1.0,
                    0.42
                ],
                s: [
                    0.36,
                    0.36,
                    0.04
                ],
                c: "#fff1c4"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            [
                -0.7,
                -0.35,
                0,
                0.35
            ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Column, {
                    p: [
                        k * w * 0.6,
                        0.1,
                        d / 2 + 0.05
                    ],
                    h: h * 0.5,
                    r: 0.05
                }, k, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c10 = Campus;
function Hospital({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.4,
                    0.1,
                    d + 0.4
                ],
                c: "#dfe5e8"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    0,
                    0.1,
                    0
                ],
                w: w,
                h: h,
                d: d,
                tint: "#eef3f6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    w * 0.3,
                    0.1 + h,
                    0
                ],
                w: w * 0.4,
                h: h * 0.5,
                d: d * 0.7,
                tint: "#eef3f6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    h + 0.1,
                    0
                ],
                s: [
                    w + 0.1,
                    0.08,
                    d + 0.1
                ],
                c: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -w * 0.2,
                    h * 0.55,
                    d / 2 + 0.03
                ],
                s: [
                    0.12,
                    0.56,
                    0.04
                ],
                c: "#e04848"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -w * 0.2 - 0.22,
                    h * 0.55 + 0.22,
                    d / 2 + 0.03
                ],
                s: [
                    0.56,
                    0.12,
                    0.04
                ],
                c: "#e04848"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w * 0.2,
                    0.1,
                    d / 2 + 0.1
                ],
                s: [
                    0.9,
                    0.5,
                    0.5
                ],
                c: "#f7f7f7"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_c11 = Hospital;
function Mosque({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.4,
                    0.1,
                    d + 0.4
                ],
                c: "#e4dcc6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1,
                    0
                ],
                s: [
                    w,
                    h * 0.55,
                    d
                ],
                c: color,
                rough: 0.7
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.1 + h * 0.55,
                    0
                ],
                r: w * 0.38,
                h: 0.18,
                c: "#f3ecd6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    0,
                    0.1 + h * 0.55 + 0.18,
                    0
                ],
                r: w * 0.38,
                c: "#3f9b8f",
                half: true
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.1 + h * 0.55 + 0.18 + w * 0.38,
                    0
                ],
                r: 0.02,
                h: 0.3,
                c: "#d6b44a",
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    w / 2 - 0.05,
                    0.1,
                    d / 2 - 0.05
                ],
                r: 0.17,
                r2: 0.13,
                h: h * 1.25,
                c: "#f3ecd6",
                seg: 14
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    w / 2 - 0.05,
                    0.1 + h * 1.25 + 0.05,
                    d / 2 - 0.05
                ],
                r: 0.17,
                c: "#3f9b8f",
                half: true
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1,
                    d / 2 + 0.01
                ],
                s: [
                    0.5,
                    0.65,
                    0.04
                ],
                c: "#5c7f78"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_c12 = Mosque;
function Church({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.4,
                    0.1,
                    d + 0.4
                ],
                c: "#d7cdb9"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1,
                    0.3
                ],
                s: [
                    w * 0.75,
                    h * 0.55,
                    d * 0.7
                ],
                c: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.1 + h * 0.55 + 0.28,
                    0.3
                ],
                rotation: [
                    0,
                    0,
                    Math.PI / 2
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#a85a3c"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                    args: [
                        0.55,
                        0.55,
                        d * 0.72,
                        3
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1,
                    -d / 2 + 0.55
                ],
                s: [
                    0.95,
                    h * 1.15,
                    0.95
                ],
                c: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.1 + h * 1.15,
                    -d / 2 + 0.55
                ],
                r: 0.7,
                r2: 0,
                h: 0.95,
                c: "#a85a3c",
                seg: 4
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1 + h * 1.15 + 0.9,
                    -d / 2 + 0.55
                ],
                s: [
                    0.04,
                    0.3,
                    0.04
                ],
                c: "#f5f1e6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -0.1,
                    0.1 + h * 1.15 + 1.05,
                    -d / 2 + 0.55
                ],
                s: [
                    0.24,
                    0.04,
                    0.04
                ],
                c: "#f5f1e6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1,
                    d / 2 + 0.28
                ],
                s: [
                    0.5,
                    0.8,
                    0.04
                ],
                c: "#7a5a40"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
_c13 = Church;
function Stadium({ size: [w, h], color }) {
    const r = w / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                r: r + 0.2,
                h: 0.1,
                c: "#cfd8d6",
                seg: 48
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.12,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            r - 0.9,
                            48
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#58b66a",
                        roughness: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.125,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            0.55,
                            0.6,
                            40
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#e9f7ec"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.1,
                    0
                ],
                r: r,
                h: h * 0.6,
                c: color,
                seg: 48,
                open: true
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.1,
                    0
                ],
                r: r - 0.8,
                h: h * 0.25,
                c: "#e9efef",
                seg: 48,
                open: true
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.1 + h * 0.6,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#3b4a52"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                    args: [
                        r - 0.8,
                        r,
                        48
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            [
                0,
                1,
                2,
                3
            ].map((i)=>{
                const a = i / 4 * Math.PI * 2 + Math.PI / 4;
                const x = Math.cos(a) * (r + 0.15);
                const z = Math.sin(a) * (r + 0.15);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x,
                        0,
                        z
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            r: 0.05,
                            h: h * 1.9,
                            c: "#9aa6ab",
                            seg: 8
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            p: [
                                0,
                                h * 1.9,
                                0
                            ],
                            s: [
                                0.42,
                                0.14,
                                0.2
                            ],
                            c: "#fffbe6"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                0,
                                h * 1.9 + 0.07,
                                0.11
                            ],
                            material: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lampMat"],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.36,
                                    0.1,
                                    0.02
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/Buildings.tsx",
                                lineNumber: 238,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 234,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
_c14 = Stadium;
function Park({ size: [w, , d] }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    w / 2,
                    d / 2,
                    1
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            1,
                            48
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#9ad88f",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.6,
                    0.075,
                    -0.2
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    w * 0.28,
                    d * 0.22,
                    1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            1,
                            40
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#6fb7de",
                        roughness: 0.2,
                        metalness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.08,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    w * 0.42,
                    d * 0.42,
                    1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            0.985,
                            1,
                            64
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#efe8d4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            [
                [
                    -1.5,
                    1.0,
                    1
                ],
                [
                    1.7,
                    1.2,
                    0.8
                ],
                [
                    -0.4,
                    -1.5,
                    1.1
                ],
                [
                    -1.9,
                    -0.7,
                    0.8
                ],
                [
                    1.5,
                    -1.3,
                    0.9
                ]
            ].map(([x, z, s], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x,
                        0.06,
                        z
                    ],
                    scale: s,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            r: 0.07,
                            h: 0.55,
                            c: "#7a5a3c",
                            seg: 8
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                            p: [
                                0,
                                0.85,
                                0
                            ],
                            r: 0.5,
                            c: i % 2 ? "#4f9a4d" : "#5fae58"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 269,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -0.2,
                    0.06,
                    1.6
                ],
                s: [
                    0.8,
                    0.22,
                    0.2
                ],
                c: "#9a6a45"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_c15 = Park;
function Mall({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.4,
                    0.1,
                    d + 0.4
                ],
                c: "#d9d6d2"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    0,
                    0.1,
                    0
                ],
                w: w,
                h: h,
                d: d,
                tint: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1 + h,
                    0
                ],
                s: [
                    w + 0.1,
                    0.1,
                    d + 0.1
                ],
                c: "#f4eef2"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glow, {
                p: [
                    0,
                    0.1 + h + 0.38,
                    d / 2 - 0.1
                ],
                s: [
                    w * 0.6,
                    0.4,
                    0.1
                ],
                c: "#ff6fb1"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1,
                    d / 2 + 0.3
                ],
                s: [
                    1.5,
                    0.08,
                    0.6
                ],
                c: "#2a2f3a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -w * 0.35,
                    0.1,
                    d / 2 + 0.22
                ],
                s: [
                    0.1,
                    0.9,
                    0.1
                ],
                c: "#2a2f3a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w * 0.35,
                    0.1,
                    d / 2 + 0.22
                ],
                s: [
                    0.1,
                    0.9,
                    0.1
                ],
                c: "#2a2f3a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
_c16 = Mall;
function Hotel({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.4,
                    0.1,
                    d + 0.4
                ],
                c: "#d6dde4"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Facade, {
                p: [
                    0,
                    0.1,
                    0
                ],
                w: w,
                h: h,
                d: d,
                tint: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1 + h,
                    0
                ],
                s: [
                    w * 0.6,
                    0.35,
                    d * 0.6
                ],
                c: "#2f3e4f"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.1 + h,
                    d * 0.2
                ],
                s: [
                    w * 0.7,
                    0.08,
                    d * 0.3
                ],
                c: "#7cc4e8"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Awning, {
                p: [
                    0,
                    0.85,
                    d / 2 + 0.28
                ],
                w: 1.6,
                colors: [
                    "#2f3e4f",
                    "#f1e7cf"
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glow, {
                p: [
                    0,
                    h * 0.8,
                    d / 2 + 0.03
                ],
                s: [
                    1.3,
                    0.2,
                    0.04
                ],
                c: "#ffd27a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_c17 = Hotel;
function Lookout({ size: [w, h], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                r: w * 0.95,
                h: 0.16,
                c: "#d9d1c0",
                seg: 20
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.16,
                    0
                ],
                r: w * 0.5,
                r2: w * 0.34,
                h: h * 0.8,
                c: color,
                seg: 20
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.16 + h * 0.8,
                    0
                ],
                r: w * 0.62,
                h: 0.34,
                c: "#cdb48f",
                seg: 20
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.16 + h * 0.8 + 0.34,
                    0
                ],
                r: w * 0.7,
                r2: 0,
                h: 0.5,
                c: "#a85a3c",
                seg: 20
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.16 + h * 0.8 + 0.84,
                    0
                ],
                r: 0.015,
                h: 0.4,
                c: "#5a5a5a",
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0.1,
                    0.16 + h * 0.8 + 1.05,
                    0
                ],
                s: [
                    0.22,
                    0.14,
                    0.02
                ],
                c: "#2f9d77"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_c18 = Lookout;
function Eatery({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.6,
                    0.08,
                    d + 0.9
                ],
                c: "#e8dcc4"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.08,
                    -0.2
                ],
                s: [
                    w,
                    h,
                    d * 0.7
                ],
                c: "#f4ead3"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.08 + h,
                    -0.2
                ],
                s: [
                    w + 0.15,
                    0.1,
                    d * 0.7 + 0.15
                ],
                c: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 324,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Awning, {
                p: [
                    0,
                    h * 0.8,
                    d / 2 - 0.2
                ],
                w: w - 0.2,
                colors: [
                    color,
                    "#f8f3e8"
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glow, {
                p: [
                    0,
                    h * 0.5,
                    d / 2 - 0.25
                ],
                s: [
                    w * 0.5,
                    0.2,
                    0.04
                ],
                c: "#ffb347"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            [
                -0.9,
                0.9
            ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x,
                        0.08,
                        d / 2 + 0.55
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            r: 0.02,
                            h: 0.85,
                            c: "#8a7a64",
                            seg: 6
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            p: [
                                0,
                                0.85,
                                0
                            ],
                            r: 0.42,
                            r2: 0.02,
                            h: 0.22,
                            c: x < 0 ? "#e0663a" : color,
                            seg: 12
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            p: [
                                0,
                                0,
                                0
                            ],
                            r: 0.22,
                            h: 0.03,
                            c: "#f2ebd9",
                            seg: 14
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    ]
                }, x, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 328,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 321,
        columnNumber: 5
    }, this);
}
_c19 = Eatery;
function Amusement({ size: [w, h], color }) {
    _s1();
    const wheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const R = h * 0.4;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Amusement.useFrame": (_, dt)=>{
            if (!wheel.current) return;
            wheel.current.rotation.z -= dt * 0.35;
            for (const p of pods.current)if (p) p.rotation.z = -wheel.current.rotation.z;
        }
    }["Amusement.useFrame"]);
    const podColors = [
        "#e85d9a",
        "#f0b429",
        "#4cc2b0",
        "#6c7ae0",
        "#e0663a",
        "#8bd45a"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w,
                    0.08,
                    w * 0.9
                ],
                c: "#e8d9ea"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    R + 0.45,
                    -0.1
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    ref: wheel,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(color, 0.5),
                            castShadow: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                                args: [
                                    R,
                                    0.045,
                                    10,
                                    48
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/Buildings.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 353,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#f4ecf1", 0.5),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                                args: [
                                    R * 0.55,
                                    0.03,
                                    8,
                                    40
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/Buildings.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 356,
                            columnNumber: 11
                        }, this),
                        Array.from({
                            length: 6
                        }).map((_, i)=>{
                            const a = i / 6 * Math.PI * 2;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                        rotation: [
                                            0,
                                            0,
                                            a
                                        ],
                                        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#f4ecf1"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                R * 2,
                                                0.025,
                                                0.025
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/world/Buildings.tsx",
                                            lineNumber: 364,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/world/Buildings.tsx",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                                        ref: (el)=>{
                                            pods.current[i] = el;
                                        },
                                        position: [
                                            Math.cos(a) * R,
                                            Math.sin(a) * R,
                                            0
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                            position: [
                                                0,
                                                -0.14,
                                                0
                                            ],
                                            material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(podColors[i]),
                                            castShadow: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                                args: [
                                                    0.26,
                                                    0.22,
                                                    0.26
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/world/Buildings.tsx",
                                                lineNumber: 368,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/world/Buildings.tsx",
                                            lineNumber: 367,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/world/Buildings.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/world/Buildings.tsx",
                                lineNumber: 362,
                                columnNumber: 15
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#f4ecf1"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.08,
                                    0.08,
                                    0.3,
                                    12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/Buildings.tsx",
                                lineNumber: 375,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 352,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -R * 0.55,
                    0,
                    -0.1
                ],
                s: [
                    0.07,
                    R + 0.45,
                    0.07
                ],
                c: "#f4ecf1",
                rot: [
                    0,
                    0,
                    -0.35
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    R * 0.55,
                    0,
                    -0.1
                ],
                s: [
                    0.07,
                    R + 0.45,
                    0.07
                ],
                c: "#f4ecf1",
                rot: [
                    0,
                    0,
                    0.35
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w * 0.28,
                    0.08,
                    w * 0.3
                ],
                s: [
                    0.55,
                    0.5,
                    0.45
                ],
                c: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Awning, {
                p: [
                    w * 0.28,
                    0.5,
                    w * 0.3 + 0.28
                ],
                w: 0.55,
                colors: [
                    "#f4ecf1",
                    color
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
_s1(Amusement, "RxgePUJc6n6ooJ+w4qrCszKclyc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c20 = Amusement;
function Zoo({ size: [w, , d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.05,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            w,
                            d
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: color,
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 390,
                columnNumber: 7
            }, this),
            [
                -1,
                1
            ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            p: [
                                0,
                                0.05,
                                k * d / 2
                            ],
                            s: [
                                w,
                                0.35,
                                0.05
                            ],
                            c: "#8a6a48"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                            p: [
                                k * w / 2,
                                0.05,
                                0
                            ],
                            s: [
                                0.05,
                                0.35,
                                d
                            ],
                            c: "#8a6a48"
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this)
                    ]
                }, k, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 395,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    -0.8,
                    0.45,
                    0
                ],
                r: 0.36,
                c: "#9aa0a6",
                scale: [
                    1.2,
                    1,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    -0.35,
                    0.3,
                    0.1
                ],
                r: 0.06,
                r2: 0.04,
                h: 0.3,
                c: "#9aa0a6",
                seg: 8
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    0.7,
                    0.3,
                    0.4
                ],
                r: 0.22,
                c: "#d9a23a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    0.95,
                    0.24,
                    -0.35
                ],
                r: 0.16,
                c: "#6b4a2f"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0.2,
                    0.05,
                    -0.6
                ],
                r: 0.3,
                h: 0.03,
                c: "#6fb7de",
                seg: 20
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 404,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 389,
        columnNumber: 5
    }, this);
}
_c21 = Zoo;
function Terminal({ size: [w, , d], color }) {
    const bus = (x, z, c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
            position: [
                x,
                0,
                z
            ],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                    p: [
                        0,
                        0.1,
                        0
                    ],
                    s: [
                        1.5,
                        0.5,
                        0.6
                    ],
                    c: c
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 412,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                    p: [
                        0,
                        0.6,
                        0
                    ],
                    s: [
                        1.4,
                        0.04,
                        0.55
                    ],
                    c: "#2a2f3a"
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 413,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                    p: [
                        0,
                        0.3,
                        0.301
                    ],
                    s: [
                        1.5,
                        0.08,
                        0.01
                    ],
                    c: "#1e222b"
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 414,
                    columnNumber: 7
                }, this),
                [
                    -0.5,
                    0.5
                ].map((wx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            wx,
                            0.1,
                            0.3
                        ],
                        "rotation-x": Math.PI / 2,
                        material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#1e222b"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                            args: [
                                0.1,
                                0.1,
                                0.06,
                                14
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 417,
                            columnNumber: 11
                        }, this)
                    }, wx, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this))
            ]
        }, i, true, {
            fileName: "[project]/src/components/world/Buildings.tsx",
            lineNumber: 411,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w,
                    0.06,
                    d
                ],
                c: "#59606b"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            [
                -w / 2 + 0.2,
                w / 2 - 0.2
            ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                    p: [
                        x,
                        0.06,
                        -d / 2 + 0.2
                    ],
                    s: [
                        0.07,
                        1.1,
                        0.07
                    ],
                    c: "#8c8f95"
                }, x, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 426,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    1.16,
                    -d / 2 + 0.2
                ],
                s: [
                    w - 0.2,
                    0.08,
                    0.8
                ],
                c: color
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this),
            bus(-0.8, 0.5, "#f2b632", 0),
            bus(0.9, -0.3, "#f2b632", 1),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    w / 2 - 0.5,
                    0,
                    d / 2 - 0.35
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                        p: [
                            0,
                            0.08,
                            0
                        ],
                        s: [
                            0.45,
                            0.28,
                            0.3
                        ],
                        c: "#2f9d77"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 432,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                        p: [
                            0,
                            0.34,
                            0
                        ],
                        s: [
                            0.5,
                            0.05,
                            0.34
                        ],
                        c: "#f4f4f2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 433,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glow, {
                p: [
                    0,
                    1.4,
                    -d / 2 + 0.2
                ],
                s: [
                    w * 0.6,
                    0.18,
                    0.05
                ],
                c: "#ffd27a"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
}
_c22 = Terminal;
function Golf({ size: [w, , d] }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    w / 2,
                    d / 2,
                    1
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            1,
                            40
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#7cc46a",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 443,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.5,
                    0.075,
                    0.3
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    0.7,
                    0.55,
                    1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            1,
                            28
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#9bde86",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 447,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.9,
                    0.08,
                    0.6
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    0.4,
                    0.3,
                    1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            1,
                            20
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#efe2b4",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0.5,
                    0.07,
                    0.3
                ],
                r: 0.012,
                h: 0.8,
                c: "#f4f4f2",
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0.55,
                    0.7,
                    0.3
                ],
                s: [
                    0.22,
                    0.14,
                    0.01
                ],
                c: "#e04848"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 456,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -w / 2 + 0.7,
                    0.06,
                    -d / 2 + 0.6
                ],
                s: [
                    0.9,
                    0.45,
                    0.6
                ],
                c: "#f4efe3"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    -w / 2 + 0.7,
                    0.51,
                    -d / 2 + 0.6
                ],
                s: [
                    1,
                    0.08,
                    0.7
                ],
                c: "#a85a3c"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 442,
        columnNumber: 5
    }, this);
}
_c23 = Golf;
function Govt({ size: [w, h, d], color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                s: [
                    w + 0.5,
                    0.12,
                    d + 0.5
                ],
                c: "#dedbd2"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.12,
                    0
                ],
                s: [
                    w,
                    h * 0.7,
                    d * 0.8
                ],
                c: color,
                rough: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 467,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    0,
                    0.12 + h * 0.7,
                    0
                ],
                s: [
                    w + 0.1,
                    0.1,
                    d * 0.85
                ],
                c: "#e4ded0"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this),
            [
                -0.4,
                -0.2,
                0,
                0.2,
                0.4
            ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Column, {
                    p: [
                        k * w,
                        0.12,
                        d / 2 - 0.15
                    ],
                    h: h * 0.7,
                    r: 0.08
                }, k, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.12 + h * 0.7 + 0.3,
                    d / 2 - 0.2
                ],
                rotation: [
                    Math.PI / 2,
                    Math.PI / 2,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#e4ded0"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                    args: [
                        0.32,
                        0.32,
                        w * 0.6,
                        3
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 473,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 472,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ball, {
                p: [
                    0,
                    0.12 + h * 0.8,
                    -0.2
                ],
                r: 0.5,
                c: "#e4ded0",
                half: true
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 475,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    w / 2 + 0.1,
                    0.12,
                    d / 2
                ],
                r: 0.02,
                h: 1.6,
                c: "#bfc3c7",
                seg: 6
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 476,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w / 2 + 0.2,
                    1.45,
                    d / 2
                ],
                s: [
                    0.18,
                    0.28,
                    0.02
                ],
                c: "#1f9d55"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w / 2 + 0.38,
                    1.45,
                    d / 2
                ],
                s: [
                    0.18,
                    0.28,
                    0.02
                ],
                c: "#f4f4f2"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Box, {
                p: [
                    w / 2 + 0.56,
                    1.45,
                    d / 2
                ],
                s: [
                    0.18,
                    0.28,
                    0.02
                ],
                c: "#1f9d55"
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 465,
        columnNumber: 5
    }, this);
}
_c24 = Govt;
function Cultural({ size: [w, h, d], color }) {
    const r = Math.min(w, d) * 0.46;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                r: r + 0.3,
                h: 0.08,
                c: "#e8d8bd",
                seg: 36
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 488,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.08,
                    0
                ],
                r: r,
                h: h * 0.65,
                c: "#f1e2c6",
                seg: 36
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.08 + h * 0.3,
                    0
                ],
                r: r + 0.02,
                h: 0.12,
                c: color,
                seg: 36
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.08 + h * 0.55,
                    0
                ],
                r: r + 0.02,
                h: 0.1,
                c: "#2f9d77",
                seg: 36
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                p: [
                    0,
                    0.08 + h * 0.65,
                    0
                ],
                r: r + 0.25,
                r2: 0.05,
                h: h * 0.7,
                c: "#d9a23a",
                seg: 36
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this),
            [
                -0.9,
                0.9
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x * 0.8,
                        0.08,
                        d / 2 + 0.2
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            r: 0.17,
                            r2: 0.12,
                            h: 0.4,
                            c: i ? "#e0663a" : "#8a5a3c",
                            seg: 14
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 495,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cyl, {
                            p: [
                                0,
                                0.4,
                                0
                            ],
                            r: 0.17,
                            h: 0.03,
                            c: "#f1e2c6",
                            seg: 14
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Buildings.tsx",
                            lineNumber: 496,
                            columnNumber: 11
                        }, this)
                    ]
                }, x, true, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 494,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 487,
        columnNumber: 5
    }, this);
}
_c25 = Cultural;
const STYLES = {
    tower: Tower,
    hall: Hall,
    market: Market,
    campus: Campus,
    hospital: Hospital,
    mosque: Mosque,
    church: Church,
    stadium: Stadium,
    park: Park,
    mall: Mall,
    hotel: Hotel,
    lookout: Lookout,
    eatery: Eatery,
    amusement: Amusement,
    zoo: Zoo,
    terminal: Terminal,
    golf: Golf,
    govt: Govt,
    cultural: Cultural
};
/* ------------------------------- wrapper -------------------------------- */ function PlaceBuilding({ place }) {
    _s2();
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "PlaceBuilding.useGame[selected]": (s)=>s.selected
    }["PlaceBuilding.useGame[selected]"]);
    const atPlace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "PlaceBuilding.useGame[atPlace]": (s)=>s.atPlace
    }["PlaceBuilding.useGame[atPlace]"]);
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isSel = selected?.type === "place" && selected.id === place.id;
    const Style = STYLES[place.style];
    const [w, , d] = place.size;
    const ring = Math.max(w, d) * 0.62 + 0.5;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "PlaceBuilding.useFrame": (_, dt)=>{
            if (!group.current) return;
            const target = hovered.current ? 0.12 : 0;
            group.current.position.y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(group.current.position.y, target, 10, dt);
        }
    }["PlaceBuilding.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            place.pos[0],
            0,
            place.pos[1]
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: group,
                onPointerOver: (e)=>{
                    e.stopPropagation();
                    hovered.current = true;
                    document.body.style.cursor = "pointer";
                },
                onPointerOut: ()=>{
                    hovered.current = false;
                    document.body.style.cursor = "auto";
                },
                onClick: (e)=>{
                    if (e.delta > 6) return;
                    e.stopPropagation();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().select({
                        type: "place",
                        id: place.id
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walkToPlace"])(place.id);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Style, {
                    size: place.size,
                    color: place.color
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Buildings.tsx",
                    lineNumber: 563,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 545,
                columnNumber: 7
            }, this),
            (isSel || atPlace === place.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.05,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            ring,
                            ring + 0.09,
                            56
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 567,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: atPlace === place.id ? "#10b981" : "#f59e0b",
                        transparent: true,
                        opacity: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Buildings.tsx",
                        lineNumber: 568,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 566,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 544,
        columnNumber: 5
    }, this);
}
_s2(PlaceBuilding, "Y/YZe47t1Y29/EV7dhyrNEYfiKc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c26 = PlaceBuilding;
function Buildings() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLACES"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceBuilding, {
                place: p
            }, p.id, false, {
                fileName: "[project]/src/components/world/Buildings.tsx",
                lineNumber: 579,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/Buildings.tsx",
        lineNumber: 577,
        columnNumber: 5
    }, this);
}
_c27 = Buildings;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27;
__turbopack_context__.k.register(_c, "Box");
__turbopack_context__.k.register(_c1, "Cyl");
__turbopack_context__.k.register(_c2, "Ball");
__turbopack_context__.k.register(_c3, "Facade");
__turbopack_context__.k.register(_c4, "Glow");
__turbopack_context__.k.register(_c5, "Awning");
__turbopack_context__.k.register(_c6, "Column");
__turbopack_context__.k.register(_c7, "Tower");
__turbopack_context__.k.register(_c8, "Hall");
__turbopack_context__.k.register(_c9, "Market");
__turbopack_context__.k.register(_c10, "Campus");
__turbopack_context__.k.register(_c11, "Hospital");
__turbopack_context__.k.register(_c12, "Mosque");
__turbopack_context__.k.register(_c13, "Church");
__turbopack_context__.k.register(_c14, "Stadium");
__turbopack_context__.k.register(_c15, "Park");
__turbopack_context__.k.register(_c16, "Mall");
__turbopack_context__.k.register(_c17, "Hotel");
__turbopack_context__.k.register(_c18, "Lookout");
__turbopack_context__.k.register(_c19, "Eatery");
__turbopack_context__.k.register(_c20, "Amusement");
__turbopack_context__.k.register(_c21, "Zoo");
__turbopack_context__.k.register(_c22, "Terminal");
__turbopack_context__.k.register(_c23, "Golf");
__turbopack_context__.k.register(_c24, "Govt");
__turbopack_context__.k.register(_c25, "Cultural");
__turbopack_context__.k.register(_c26, "PlaceBuilding");
__turbopack_context__.k.register(_c27, "Buildings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/world/CityScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CityScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Lighting$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Lighting.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Terrain$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Terrain.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Buildings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Buildings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$PlotsLayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/PlotsLayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/Player.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$People$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/People.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/overlay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/playerState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/movement.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$InteriorScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interior/InteriorScene.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
const clamp = (v, a, b)=>Math.min(b, Math.max(a, v));
const limits = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().interior ? [
        4,
        30
    ] : [
        9,
        44
    ];
function CameraRig() {
    _s();
    const { camera, gl, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].x, 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].z));
    const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(36);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraRig.useEffect": ()=>{
            const el = gl.domElement;
            const pts = new Map();
            let pinch = 0;
            const down = {
                "CameraRig.useEffect.down": (e)=>pts.set(e.pointerId, {
                        x: e.clientX,
                        y: e.clientY
                    })
            }["CameraRig.useEffect.down"];
            const move = {
                "CameraRig.useEffect.move": (e)=>{
                    const p = pts.get(e.pointerId);
                    if (!p) return;
                    if (pts.size === 1) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].az -= (e.clientX - p.x) * 0.006;
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].el = clamp(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].el + (e.clientY - p.y) * 0.004, 0.35, 1.25);
                    } else if (pts.size === 2) {
                        const [a, b] = [
                            ...pts.values()
                        ];
                        const d = Math.hypot(a.x - b.x, a.y - b.y);
                        if (pinch) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist = clamp(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist * (pinch / d), ...limits());
                        pinch = d;
                    }
                    p.x = e.clientX;
                    p.y = e.clientY;
                }
            }["CameraRig.useEffect.move"];
            const up = {
                "CameraRig.useEffect.up": (e)=>{
                    pts.delete(e.pointerId);
                    pinch = 0;
                }
            }["CameraRig.useEffect.up"];
            const wheel = {
                "CameraRig.useEffect.wheel": (e)=>{
                    e.preventDefault();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist = clamp(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist + e.deltaY * 0.02, ...limits());
                }
            }["CameraRig.useEffect.wheel"];
            el.addEventListener("pointerdown", down);
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerup", up);
            el.addEventListener("pointercancel", up);
            el.addEventListener("wheel", wheel, {
                passive: false
            });
            return ({
                "CameraRig.useEffect": ()=>{
                    el.removeEventListener("pointerdown", down);
                    el.removeEventListener("pointermove", move);
                    el.removeEventListener("pointerup", up);
                    el.removeEventListener("pointercancel", up);
                    el.removeEventListener("wheel", wheel);
                }
            })["CameraRig.useEffect"];
        }
    }["CameraRig.useEffect"], [
        gl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "CameraRig.useFrame": (_, dt)=>{
            const k = 1 - Math.exp(-6 * dt);
            const hasProfile = !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().profile;
            if (!hasProfile) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].az += dt * 0.05;
                target.current.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0), k);
            } else {
                target.current.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].use ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].use.x : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].x, 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].use ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].use.z : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].z), k);
            }
            const wantDist = hasProfile ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist : 40;
            dist.current += (wantDist - dist.current) * (1 - Math.exp(-3 * dt));
            const el = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].el;
            const d = dist.current;
            camera.position.set(target.current.x + Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].az) * Math.cos(el) * d, target.current.y + Math.sin(el) * d, target.current.z + Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].az) * Math.cos(el) * d);
            camera.lookAt(target.current);
            // phones: the status card covers the top of the screen, so push the scene down a little
            const cam_ = camera;
            const w = size.width;
            const h = size.height;
            if (w < 640 && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().profile) cam_.setViewOffset(w, h, 0, -h * 0.1, w, h);
            else if (cam_.view?.enabled) cam_.clearViewOffset();
        }
    }["CameraRig.useFrame"]);
    return null;
}
_s(CameraRig, "ubEso31BfFtqPb1wfgvI4uq49hw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = CameraRig;
const _v = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
/** Moves DOM overlay elements (labels, name tags, bubbles) to the screen position of 3D anchors. */ function LabelProjector() {
    _s1();
    const { camera, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "LabelProjector.useFrame": ()=>{
            for (const a of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anchors"].values()){
                a.get(_v);
                const far = a.maxDist !== undefined && Math.hypot(_v.x - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].x, _v.z - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"].z) > a.maxDist;
                const zoomHidden = a.maxCam !== undefined && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist > a.maxCam || a.minCam !== undefined && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$playerState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cam"].dist < a.minCam;
                _v.project(camera);
                const hidden = far || zoomHidden || _v.z > 1 || Math.abs(_v.x) > 1.15 || Math.abs(_v.y) > 1.15;
                a.el.style.opacity = hidden ? "0" : "1";
                a.el.style.visibility = hidden ? "hidden" : "visible";
                if (hidden) continue;
                const x = (_v.x * 0.5 + 0.5) * size.width;
                const y = (-_v.y * 0.5 + 0.5) * size.height;
                a.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
                a.el.style.zIndex = String(Math.round((1 - _v.z) * 10000));
            }
        }
    }["LabelProjector.useFrame"]);
    return null;
}
_s1(LabelProjector, "X8dctQS+5HFLpO8EhP/G6dKQ3ZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = LabelProjector;
/** Everything outside: streets, buildings, plots, citizens, click-to-walk ground. */ function WorldContent() {
    _s2();
    const placesOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "WorldContent.useGame[placesOnly]": (s)=>s.placesOnly
    }["WorldContent.useGame[placesOnly]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Lighting$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Terrain$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                placesOnly: placesOnly
            }, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Buildings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            !placesOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$PlotsLayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 129,
                columnNumber: 23
            }, this),
            !placesOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$People$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Npcs"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 130,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                "rotation-x": -Math.PI / 2,
                "position-y": 0.002,
                onClick: (e)=>{
                    if (e.delta > 6) return;
                    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState();
                    s.select(null);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walkTo"])(e.point.x, e.point.z);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            140,
                            140
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/CityScene.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        transparent: true,
                        opacity: 0,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/CityScene.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/CityScene.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s2(WorldContent, "3Ybdz//3Ua5P4hhXK4z6v3KvZI8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c2 = WorldContent;
function CityScene() {
    _s3();
    const inside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "CityScene.useGame[inside]": (s)=>!!s.interior
    }["CityScene.useGame[inside]"]);
    const placesOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "CityScene.useGame[placesOnly]": (s)=>s.placesOnly
    }["CityScene.useGame[placesOnly]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        dpr: [
            1,
            2
        ],
        shadows: "percentage",
        camera: {
            fov: 30,
            near: 0.5,
            far: 300,
            position: [
                24,
                28,
                24
            ]
        },
        gl: {
            antialias: true
        },
        className: "!absolute inset-0 touch-none",
        children: [
            inside ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interior$2f$InteriorScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 160,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WorldContent, {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 160,
                columnNumber: 37
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$Player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            !placesOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$People$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RemotePlayers"], {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 162,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraRig, {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LabelProjector, {}, void 0, false, {
                fileName: "[project]/src/components/world/CityScene.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/CityScene.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s3(CityScene, "8g9+Ooqdvu3Ixdpx+pVLWcgeLU0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c3 = CityScene;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CameraRig");
__turbopack_context__.k.register(_c1, "LabelProjector");
__turbopack_context__.k.register(_c2, "WorldContent");
__turbopack_context__.k.register(_c3, "CityScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/world/CityScene.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/world/CityScene.tsx [app-client] (ecmascript)"));
}),
"[project]/src/components/world/Lighting.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Lighting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/materials.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SKY = [
    [
        0,
        "#10162b"
    ],
    [
        5,
        "#28304f"
    ],
    [
        6.5,
        "#f0b48a"
    ],
    [
        8.5,
        "#eaf2e6"
    ],
    [
        16,
        "#eaf2e6"
    ],
    [
        18,
        "#f2a878"
    ],
    [
        19.7,
        "#232a4a"
    ],
    [
        24,
        "#10162b"
    ]
];
const _a = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
const _b = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
function skyAt(h, out) {
    for(let i = 0; i < SKY.length - 1; i++){
        const [h0, c0] = SKY[i];
        const [h1, c1] = SKY[i + 1];
        if (h >= h0 && h <= h1) return out.set(c0).lerp(_b.set(c1), (h - h0) / (h1 - h0));
    }
    return out.set(SKY[0][1]);
}
function Lighting() {
    _s();
    const sun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const amb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Lighting.useFrame": ({ scene })=>{
            const now = Date.now();
            const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gameMinutes"])(now, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().clockOverride) / 60;
            const day = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["daylight"])(h);
            const nepa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nepaOut"])(now);
            skyAt(h, _a);
            scene.background = scene.background instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"] ? scene.background.copy(_a) : _a.clone();
            if (scene.fog instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"]) scene.fog.color.copy(_a);
            else scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"](_a.clone(), 40, 85);
            const ang = (h - 6) / 12 * Math.PI;
            if (sun.current) {
                const up = Math.max(Math.sin(ang), 0.18);
                sun.current.position.set(Math.cos(ang) * 22, up * 24 + 4, 12);
                sun.current.intensity = 0.75 + day * 1.6;
                const warm = 1 - Math.min(1, Math.abs(Math.sin(ang)) * 2.2);
                sun.current.color.set(day > 0.1 ? "#ffffff" : "#a9bcff").lerp(_b.set("#ffb27a"), warm * day);
            }
            if (amb.current) {
                amb.current.intensity = 0.8 + day * 0.5;
                amb.current.color.set(day > 0.1 ? "#ffffff" : "#7c8cc7");
            }
            const dark = 1 - day;
            const k = nepa ? 0.08 : 1;
            const glow = dark * 1.3 * k;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["windowMats"].forEach({
                "Lighting.useFrame": (m)=>m.emissiveIntensity = glow
            }["Lighting.useFrame"]);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lampMat"].emissiveIntensity = dark * 2.4 * (nepa ? 0.1 : 1);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signMat"].emissiveIntensity = dark * 1.4 * (nepa ? 0.35 : 1) + 0.03;
        }
    }["Lighting.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                ref: amb,
                intensity: 1
            }, void 0, false, {
                fileName: "[project]/src/components/world/Lighting.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                ref: sun,
                position: [
                    10,
                    24,
                    12
                ],
                intensity: 2,
                castShadow: true,
                "shadow-mapSize": [
                    2048,
                    2048
                ],
                "shadow-camera-left": -32,
                "shadow-camera-right": 32,
                "shadow-camera-top": 32,
                "shadow-camera-bottom": -32,
                "shadow-camera-near": 1,
                "shadow-camera-far": 90,
                "shadow-bias": -0.0004
            }, void 0, false, {
                fileName: "[project]/src/components/world/Lighting.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Lighting.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(Lighting, "Hof8EkGkaLn1naDrTV4gBu/pbMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Lighting;
var _c;
__turbopack_context__.k.register(_c, "Lighting");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/world/PlotsLayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlotsLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/RoundedBox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/look.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/materials.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Wall({ tint, w, h, d, p }) {
    _s();
    const mats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Wall.useMemo[mats]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["facadeMaterials"])(w, h, d, tint)
    }["Wall.useMemo[mats]"], [
        w,
        h,
        d,
        tint
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Wall.useEffect": ()=>{
            const glow = mats.filter({
                "Wall.useEffect.glow": (m)=>!!m.emissiveMap
            }["Wall.useEffect.glow"]);
            glow.forEach({
                "Wall.useEffect": (m)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["windowMats"].add(m)
            }["Wall.useEffect"]);
            return ({
                "Wall.useEffect": ()=>glow.forEach({
                        "Wall.useEffect": (m)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["windowMats"].delete(m)
                    }["Wall.useEffect"])
            })["Wall.useEffect"];
        }
    }["Wall.useEffect"], [
        mats
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            p[0],
            p[1] + h / 2,
            p[2]
        ],
        material: mats,
        castShadow: true,
        receiveShadow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
            args: [
                w,
                h,
                d
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/world/PlotsLayer.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(Wall, "KewPYA+jq2Wc2xuKddhfYLmXXC0=");
_c = Wall;
function Fence({ s = 2.9, c = "#f3efe6" }) {
    const h = 0.18;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            [
                0,
                -s / 2,
                s,
                0.05
            ],
            [
                0,
                s / 2,
                s,
                0.05
            ],
            [
                -s / 2,
                0,
                0.05,
                s
            ],
            [
                s / 2,
                0,
                0.05,
                s
            ]
        ].map(([x, z, w, d], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    x,
                    h / 2 + 0.06,
                    z
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(c),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        w,
                        h,
                        d
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c1 = Fence;
function House({ tier, accent }) {
    if (tier === 1) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fence, {}, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06 + 0.3,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#f4ead7"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        1.5,
                        0.6,
                        1.2
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06 + 0.6 + 0.28,
                    0
                ],
                "rotation-y": Math.PI / 4,
                scale: [
                    1.25,
                    1,
                    1
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(accent, 0.6),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                    args: [
                        1.0,
                        0.56,
                        4
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06 + 0.24,
                    0.61
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#7a5a40"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.3,
                        0.42,
                        0.03
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.45,
                    0.06 + 0.34,
                    0.61
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#8fb6d6"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.26,
                        0.22,
                        0.03
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 50,
        columnNumber: 7
    }, this);
    if (tier === 2) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fence, {}, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wall, {
                tint: "#f2ecdf",
                w: 1.7,
                h: 1.25,
                d: 1.3,
                p: [
                    0,
                    0.06,
                    -0.1
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06 + 1.25 + 0.04,
                    -0.1
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(accent),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        1.8,
                        0.09,
                        1.4
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06 + 0.7,
                    0.62
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#e9e3d4"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        1.2,
                        0.05,
                        0.4
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.95,
                    0.06 + 0.25,
                    0.4
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#d8d2c4"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.55,
                        0.5,
                        0.9
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    1.1,
                    0.06 + 0.3,
                    0.8
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#2a2f3a"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.4,
                        0.4,
                        0.02
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 68,
        columnNumber: 7
    }, this);
    if (tier >= 3) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fence, {
                c: "#e8e3d6"
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wall, {
                tint: "#eef0f3",
                w: 2.0,
                h: 1.5,
                d: 1.35,
                p: [
                    -0.2,
                    0.06,
                    -0.35
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wall, {
                tint: "#eef0f3",
                w: 1.1,
                h: 0.85,
                d: 1.0,
                p: [
                    0.8,
                    0.06,
                    0.15
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.2,
                    0.06 + 1.5 + 0.04,
                    -0.35
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(accent),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        2.1,
                        0.09,
                        1.45
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            [
                -0.45,
                -0.15,
                0.15
            ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        x,
                        0.06 + 0.4,
                        0.4
                    ],
                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#fbf9f4"),
                    castShadow: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.04,
                            0.04,
                            0.8,
                            10
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this)
                }, x, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.3,
                    0.06 + 0.83,
                    0.4
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#fbf9f4"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.95,
                        0.06,
                        0.4
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.75,
                    0.075,
                    1.0
                ],
                "rotation-x": -Math.PI / 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            0.9,
                            0.5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#59c2e6",
                        roughness: 0.15
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    1.05,
                    0.06 + 0.55,
                    1.0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#4f9a4d"),
                castShadow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                    args: [
                        0.28,
                        0
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 87,
        columnNumber: 7
    }, this);
    return null;
}
_c2 = House;
function PlotMesh({ plot }) {
    _s1();
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "PlotMesh.useGame[state]": (s)=>s.plots[plot.id]
    }["PlotMesh.useGame[state]"]);
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "PlotMesh.useGame[selected]": (s)=>s.selected
    }["PlotMesh.useGame[selected]"]);
    const me = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])({
        "PlotMesh.useGame[me]": (s)=>s.profile?.id
    }["PlotMesh.useGame[me]"]);
    const hovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lift = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isSel = selected?.type === "plot" && selected.id === plot.id;
    const mine = state && state.ownerId === me;
    const accent = state ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$look$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorFor"])(state.ownerId) : "#10b981";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "PlotMesh.useFrame": (_, dt)=>{
            if (!lift.current) return;
            lift.current.position.y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(lift.current.position.y, hovered.current ? 0.1 : 0, 10, dt);
        }
    }["PlotMesh.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            plot.pos[0],
            0,
            plot.pos[1]
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: lift,
                onPointerOver: (e)=>{
                    e.stopPropagation();
                    hovered.current = true;
                    document.body.style.cursor = "pointer";
                },
                onPointerOut: ()=>{
                    hovered.current = false;
                    document.body.style.cursor = "auto";
                },
                onClick: (e)=>{
                    if (e.delta > 6) return;
                    e.stopPropagation();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"].getState().select({
                        type: "plot",
                        id: plot.id
                    });
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBox"], {
                        args: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOT_SIZE"] - 0.2,
                            0.06,
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOT_SIZE"] - 0.2
                        ],
                        radius: 0.04,
                        smoothness: 3,
                        position: [
                            0,
                            0.03,
                            0
                        ],
                        receiveShadow: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: state ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](accent).lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffffff"), 0.75) : "#f5f2e6",
                            roughness: 0.95
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/PlotsLayer.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    state && state.tier >= 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(House, {
                        tier: state.tier,
                        accent: accent
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 151,
                        columnNumber: 38
                    }, this),
                    state && state.tier === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            [
                                [
                                    -1.35,
                                    -1.35
                                ],
                                [
                                    1.35,
                                    -1.35
                                ],
                                [
                                    -1.35,
                                    1.35
                                ],
                                [
                                    1.35,
                                    1.35
                                ]
                            ].map(([x, z], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        x,
                                        0.2,
                                        z
                                    ],
                                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(accent),
                                    castShadow: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                        args: [
                                            0.07,
                                            0.28,
                                            0.07
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    0,
                                    0.5,
                                    0
                                ],
                                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#7a6a54"),
                                castShadow: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                    args: [
                                        0.015,
                                        0.015,
                                        0.9,
                                        6
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    0.2,
                                    0.82,
                                    0
                                ],
                                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(accent),
                                castShadow: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.38,
                                        0.22,
                                        0.02
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    !state && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                        position: [
                            0.9,
                            0,
                            1.0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    0,
                                    0.3,
                                    0
                                ],
                                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#7a6a54"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                    args: [
                                        0.02,
                                        0.02,
                                        0.6,
                                        6
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    0,
                                    0.62,
                                    0
                                ],
                                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#10b981"),
                                castShadow: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.5,
                                        0.26,
                                        0.03
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    0,
                                    0.62,
                                    0.02
                                ],
                                material: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lampMat"],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.38,
                                        0.1,
                                        0.01
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            (isSel || mine) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.07,
                    0
                ],
                "rotation-x": -Math.PI / 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOT_SIZE"] * 0.6,
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOT_SIZE"] * 0.6 + 0.07,
                            4,
                            1,
                            Math.PI / 4
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: isSel ? "#f59e0b" : "#10b981",
                        transparent: true,
                        opacity: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/PlotsLayer.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s1(PlotMesh, "euD3BrmC8uR9cyEgWGXHHyLwFFU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c3 = PlotMesh;
function PlotsLayer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOTS"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlotMesh, {
                plot: p
            }, p.id, false, {
                fileName: "[project]/src/components/world/PlotsLayer.tsx",
                lineNumber: 200,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/PlotsLayer.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c4 = PlotsLayer;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Wall");
__turbopack_context__.k.register(_c1, "Fence");
__turbopack_context__.k.register(_c2, "House");
__turbopack_context__.k.register(_c3, "PlotMesh");
__turbopack_context__.k.register(_c4, "PlotsLayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/world/Terrain.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Terrain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/RoundedBox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/places.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plots.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/world/materials.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const noRaycast = ()=>null;
const ROADS = [
    -20,
    -10,
    0,
    10,
    20
];
const BLOCKS = [
    {
        c: [
            -15,
            -15
        ],
        tint: "#dfe6f4"
    },
    {
        c: [
            -5,
            -15
        ],
        tint: "#f1e6d6"
    },
    {
        c: [
            5,
            -15
        ],
        tint: "#e3eed9"
    },
    {
        c: [
            15,
            -15
        ],
        tint: "#e3eed9"
    },
    {
        c: [
            -15,
            -5
        ],
        tint: "#ebe9de"
    },
    {
        c: [
            -5,
            -5
        ],
        tint: "#d6eed0"
    },
    {
        c: [
            5,
            -5
        ],
        tint: "#f0ead8"
    },
    {
        c: [
            15,
            -5
        ],
        tint: "#ece6ef"
    },
    {
        c: [
            -15,
            5
        ],
        tint: "#f0e5d3"
    },
    {
        c: [
            -5,
            5
        ],
        tint: "#e9e7e1"
    },
    {
        c: [
            5,
            5
        ],
        tint: "#ebe7dc"
    },
    {
        c: [
            15,
            5
        ],
        tint: "#e0eee4"
    },
    {
        c: [
            -15,
            15
        ],
        tint: "#f0e8d0"
    },
    {
        c: [
            -5,
            15
        ],
        tint: "#e3eed9"
    },
    {
        c: [
            5,
            15
        ],
        tint: "#d9eed2"
    },
    {
        c: [
            15,
            15
        ],
        tint: "#e3eed9"
    }
];
let roadTexture = null;
function getRoadTexture() {
    if (roadTexture) return roadTexture;
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#454b55";
    g.fillRect(0, 0, 64, 128);
    g.fillStyle = "#f3d46b";
    g.fillRect(30, 12, 4, 50);
    g.fillStyle = "rgba(255,255,255,0.35)";
    g.fillRect(3, 0, 2, 128);
    g.fillRect(59, 0, 2, 128);
    roadTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    roadTexture.wrapS = roadTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    roadTexture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    roadTexture.anisotropy = 8;
    return roadTexture;
}
function Roads() {
    _s();
    const mats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Roads.useMemo[mats]": ()=>{
            const t = getRoadTexture().clone();
            t.repeat.set(1, 52 / 4);
            t.needsUpdate = true;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                map: t,
                roughness: 0.95
            });
        }
    }["Roads.useMemo[mats]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: ROADS.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            r,
                            0.07,
                            0
                        ],
                        "rotation-x": -Math.PI / 2,
                        material: mats,
                        receiveShadow: true,
                        raycast: noRaycast,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                            args: [
                                1.7,
                                52
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Terrain.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.072,
                            r
                        ],
                        rotation: [
                            -Math.PI / 2,
                            0,
                            Math.PI / 2
                        ],
                        material: mats,
                        receiveShadow: true,
                        raycast: noRaycast,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                            args: [
                                1.7,
                                52
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/world/Terrain.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                ]
            }, r, true, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(Roads, "F2ic2SKyaXB4XChDBKvwXVTZFFc=");
_c = Roads;
function Lots() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: BLOCKS.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBox"], {
                args: [
                    8.8,
                    0.04,
                    8.8
                ],
                radius: 0.02,
                position: [
                    b.c[0],
                    0.02,
                    b.c[1]
                ],
                receiveShadow: true,
                raycast: noRaycast,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                    color: b.tint,
                    roughness: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this)
            }, b.c.join(), false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_c1 = Lots;
/* ------------------------------ instanced trees ------------------------------ */ function makeTrees() {
    const rects = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$places$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLACES"].map((p)=>({
                x: p.pos[0],
                z: p.pos[1],
                hw: p.size[0] / 2 + 0.9,
                hd: p.size[2] / 2 + 1.5
            })),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOTS"].map((p)=>({
                x: p.pos[0],
                z: p.pos[1],
                hw: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOT_SIZE"] / 2 + 0.4,
                hd: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLOT_SIZE"] / 2 + 0.4
            }))
    ];
    let seed = 42;
    const rnd = ()=>{
        seed = seed * 16807 % 2147483647;
        return seed / 2147483647;
    };
    const out = [];
    for (const b of BLOCKS){
        for(let k = 0; k < 40 && out.length < 150; k++){
            const x = b.c[0] + (rnd() - 0.5) * 8.2;
            const z = b.c[1] + (rnd() - 0.5) * 8.2;
            if (rects.some((r)=>Math.abs(x - r.x) < r.hw && Math.abs(z - r.z) < r.hd)) continue;
            if (out.filter((t)=>Math.hypot(t.x - x, t.z - z) < 1.6).length) continue;
            out.push({
                x,
                z,
                s: 0.7 + rnd() * 0.7
            });
        }
    }
    return out;
}
function Trees() {
    _s1();
    const trees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Trees.useMemo[trees]": ()=>makeTrees()
    }["Trees.useMemo[trees]"], []);
    const trunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const crowns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Trees.useLayoutEffect": ()=>{
            const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
            const col = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
            trees.forEach({
                "Trees.useLayoutEffect": (t, i)=>{
                    m.compose(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](t.x, 0.3 * t.s, t.z), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](t.s, t.s, t.s));
                    trunks.current.setMatrixAt(i, m);
                    m.compose(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](t.x, 0.95 * t.s, t.z), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, t.x, 0)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](t.s, t.s * 1.05, t.s));
                    crowns.current.setMatrixAt(i, m);
                    crowns.current.setColorAt(i, col.set([
                        "#58a853",
                        "#4f9a4d",
                        "#69b45c",
                        "#3f8f56"
                    ][i % 4]));
                }
            }["Trees.useLayoutEffect"]);
            trunks.current.instanceMatrix.needsUpdate = true;
            crowns.current.instanceMatrix.needsUpdate = true;
            if (crowns.current.instanceColor) crowns.current.instanceColor.needsUpdate = true;
        }
    }["Trees.useLayoutEffect"], [
        trees
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: trunks,
                args: [
                    undefined,
                    undefined,
                    trees.length
                ],
                castShadow: true,
                raycast: noRaycast,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.07,
                            0.1,
                            0.6,
                            7
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#7a5a3c",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: crowns,
                args: [
                    undefined,
                    undefined,
                    trees.length
                ],
                castShadow: true,
                raycast: noRaycast,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                        args: [
                            0.5,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        roughness: 0.9,
                        flatShading: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_s1(Trees, "/liFnQ4ALGRhAgJ9QRKC4768zGo=");
_c2 = Trees;
/* ------------------------------- street lamps ------------------------------- */ function Lamps() {
    _s2();
    const poles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bulbs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const spots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Lamps.useMemo[spots]": ()=>{
            const out = [];
            for (const r of ROADS){
                for(let t = -22; t <= 22; t += 5.5){
                    if (ROADS.some({
                        "Lamps.useMemo[spots]": (q)=>Math.abs(t - q) < 1.8
                    }["Lamps.useMemo[spots]"])) continue;
                    out.push([
                        r + 1.15,
                        t
                    ]);
                    out.push([
                        t,
                        r - 1.15
                    ]);
                }
            }
            return out;
        }
    }["Lamps.useMemo[spots]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Lamps.useLayoutEffect": ()=>{
            const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
            spots.forEach({
                "Lamps.useLayoutEffect": ([x, z], i)=>{
                    poles.current.setMatrixAt(i, m.makeTranslation(x, 0.55, z));
                    bulbs.current.setMatrixAt(i, m.makeTranslation(x, 1.15, z));
                }
            }["Lamps.useLayoutEffect"]);
            poles.current.instanceMatrix.needsUpdate = true;
            bulbs.current.instanceMatrix.needsUpdate = true;
        }
    }["Lamps.useLayoutEffect"], [
        spots
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: poles,
                args: [
                    undefined,
                    undefined,
                    spots.length
                ],
                raycast: noRaycast,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.025,
                            0.035,
                            1.1,
                            6
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#6b7380",
                        roughness: 0.6
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
                ref: bulbs,
                args: [
                    undefined,
                    undefined,
                    spots.length
                ],
                material: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lampMat"],
                raycast: noRaycast,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                    args: [
                        0.09,
                        10,
                        8
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s2(Lamps, "evKMPulYpivowboIKFTRw8MxXSQ=");
_c3 = Lamps;
/* ------------------------------ hills and lake ------------------------------ */ function Surroundings() {
    _s3();
    const hills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Surroundings.useMemo[hills]": ()=>{
            const out = [];
            for(let i = 0; i < 20; i++){
                const a = i / 20 * Math.PI * 2;
                const rad = 38 + i * 7 % 5 * 2.2;
                out.push({
                    x: Math.cos(a) * rad,
                    z: Math.sin(a) * rad,
                    r: 6 + i * 3 % 4 * 1.4,
                    h: 2.2 + i * 5 % 3 * 0.9,
                    c: [
                        "#b8d6a4",
                        "#a9cd98",
                        "#c3dcae"
                    ][i % 3]
                });
            }
            return out;
        }
    }["Surroundings.useMemo[hills]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            hills.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        h.x,
                        0,
                        h.z
                    ],
                    scale: [
                        h.r,
                        h.h,
                        h.r
                    ],
                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(h.c, 1),
                    raycast: noRaycast,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            1,
                            24,
                            12,
                            0,
                            Math.PI * 2,
                            0,
                            Math.PI / 2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                }, i, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -33,
                    0.02,
                    -2
                ],
                "rotation-x": -Math.PI / 2,
                scale: [
                    7,
                    11,
                    1
                ],
                raycast: noRaycast,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            1,
                            48
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#79c3e6",
                        roughness: 0.15,
                        metalness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_s3(Surroundings, "8VWP8cH2ZRXhNTxgyUX7XOcC61g=");
_c4 = Surroundings;
const CARS = [
    {
        hx: 10,
        hz: 10,
        speed: 2.4,
        offset: 0,
        color: "#f2b632",
        danfo: true,
        ccw: false
    },
    {
        hx: 10,
        hz: 10,
        speed: 2.4,
        offset: 40,
        color: "#e85d4a",
        danfo: false,
        ccw: false
    },
    {
        hx: 10,
        hz: 10,
        speed: 2.1,
        offset: 20,
        color: "#4a90e2",
        danfo: false,
        ccw: true
    },
    {
        hx: 20,
        hz: 20,
        speed: 3.0,
        offset: 0,
        color: "#f2b632",
        danfo: true,
        ccw: false
    },
    {
        hx: 20,
        hz: 20,
        speed: 3.0,
        offset: 80,
        color: "#f4f4f2",
        danfo: false,
        ccw: false
    },
    {
        hx: 20,
        hz: 20,
        speed: 2.8,
        offset: 40,
        color: "#3aa57a",
        danfo: false,
        ccw: true
    },
    {
        hx: 0,
        hz: 10,
        speed: 2.0,
        offset: 5,
        color: "#f2b632",
        danfo: true,
        ccw: false
    },
    {
        hx: 10,
        hz: 0,
        speed: 2.2,
        offset: 12,
        color: "#8a5adf",
        danfo: false,
        ccw: false
    }
];
function Vehicle({ car }) {
    _s4();
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lane = 0.42;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Vehicle.useFrame": (state)=>{
            const { hx, hz } = car;
            const w = (hx - lane) * 2;
            const h = (hz - lane) * 2;
            const per = 2 * (w + h);
            let s = (state.clock.elapsedTime * car.speed + car.offset) % per;
            if (car.ccw) s = per - s;
            let x;
            let z;
            let ry;
            const x0 = -(hx - lane);
            const z0 = -(hz - lane);
            if (s < w) {
                x = x0 + s;
                z = z0;
                ry = Math.PI / 2;
            } else if (s < w + h) {
                x = x0 + w;
                z = z0 + (s - w);
                ry = 0;
            } else if (s < 2 * w + h) {
                x = x0 + w - (s - w - h);
                z = z0 + h;
                ry = -Math.PI / 2;
            } else {
                x = x0;
                z = z0 + h - (s - 2 * w - h);
                ry = Math.PI;
            }
            if (car.ccw) ry += Math.PI;
            if (g.current) {
                g.current.position.set(x, 0.08, z);
                g.current.rotation.y = ry;
            }
        }
    }["Vehicle.useFrame"]);
    const len = car.danfo ? 0.95 : 0.8;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: g,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.17,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(car.color, 0.5),
                castShadow: true,
                raycast: noRaycast,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.42,
                        0.22,
                        len
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.34,
                    car.danfo ? 0 : -0.04
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])(car.danfo ? car.color : "#dfe9f2", 0.35),
                castShadow: true,
                raycast: noRaycast,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.38,
                        0.17,
                        car.danfo ? len - 0.05 : 0.42
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            car.danfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.22,
                    0
                ],
                material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#1f232b"),
                raycast: noRaycast,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        0.435,
                        0.05,
                        len + 0.01
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 275,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this),
            [
                [
                    -0.2,
                    0.28
                ],
                [
                    0.2,
                    0.28
                ],
                [
                    -0.2,
                    -0.28
                ],
                [
                    0.2,
                    -0.28
                ]
            ].map(([x, z], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        x,
                        0.07,
                        z
                    ],
                    "rotation-z": Math.PI / 2,
                    material: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$world$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat"])("#1b1e24"),
                    raycast: noRaycast,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.07,
                            0.07,
                            0.06,
                            10
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, this)
                }, i, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
_s4(Vehicle, "oGpTFNp4GSby0bHzkAWZQHetE7I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = Vehicle;
function Terrain({ placesOnly = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                "rotation-x": -Math.PI / 2,
                receiveShadow: true,
                raycast: noRaycast,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            220,
                            220
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#cfe3c2",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/world/Terrain.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lots, {}, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Roads, {}, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            !placesOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Trees, {}, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 301,
                columnNumber: 23
            }, this),
            !placesOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lamps, {}, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 302,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Surroundings, {}, void 0, false, {
                fileName: "[project]/src/components/world/Terrain.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, this),
            !placesOnly && CARS.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Vehicle, {
                    car: c
                }, i, false, {
                    fileName: "[project]/src/components/world/Terrain.tsx",
                    lineNumber: 304,
                    columnNumber: 42
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/world/Terrain.tsx",
        lineNumber: 294,
        columnNumber: 5
    }, this);
}
_c6 = Terrain;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Roads");
__turbopack_context__.k.register(_c1, "Lots");
__turbopack_context__.k.register(_c2, "Trees");
__turbopack_context__.k.register(_c3, "Lamps");
__turbopack_context__.k.register(_c4, "Surroundings");
__turbopack_context__.k.register(_c5, "Vehicle");
__turbopack_context__.k.register(_c6, "Terrain");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/world/materials.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "facadeMaterials",
    ()=>facadeMaterials,
    "lampMat",
    ()=>lampMat,
    "mat",
    ()=>mat,
    "signMat",
    ()=>signMat,
    "windowMats",
    ()=>windowMats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const cache = new Map();
function mat(color, rough = 0.75) {
    const key = `${color}|${rough}`;
    let m = cache.get(key);
    if (!m) {
        m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            roughness: rough,
            metalness: 0.02
        });
        cache.set(key, m);
    }
    return m;
}
const windowMats = new Set();
const lampMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: "#fff4d6",
    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffd27a"),
    emissiveIntensity: 0,
    roughness: 0.4
});
const signMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: "#ffffff",
    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffb347"),
    emissiveIntensity: 0,
    roughness: 0.5
});
let tiles = null;
function makeTiles() {
    const CELL = 64;
    const N = 4;
    const mk = ()=>{
        const c = document.createElement("canvas");
        c.width = c.height = CELL * N;
        return c;
    };
    const base = mk();
    const lit = mk();
    const b = base.getContext("2d");
    const l = lit.getContext("2d");
    b.fillStyle = "#f3f4f6";
    b.fillRect(0, 0, base.width, base.height);
    l.fillStyle = "#000";
    l.fillRect(0, 0, lit.width, lit.height);
    let seed = 11;
    const rnd = ()=>(seed = seed * 16807 % 2147483647) / 2147483647;
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            const x = i * CELL + 10;
            const y = j * CELL + 12;
            const w = CELL - 20;
            const h = CELL - 24;
            const g = b.createLinearGradient(x, y, x, y + h);
            g.addColorStop(0, "#9db3c9");
            g.addColorStop(1, "#5f7a93");
            b.fillStyle = g;
            b.beginPath();
            b.roundRect(x, y, w, h, 5);
            b.fill();
            if (rnd() < 0.58) {
                l.fillStyle = rnd() < 0.8 ? "#ffcf75" : "#bfe2ff";
                l.beginPath();
                l.roundRect(x, y, w, h, 5);
                l.fill();
            }
        }
    }
    const tb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](base);
    const tl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](lit);
    tb.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    tl.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    return {
        base: tb,
        lit: tl
    };
}
function faceMat(tint, cols, rows) {
    tiles ??= makeTiles();
    const b = tiles.base.clone();
    const l = tiles.lit.clone();
    for (const t of [
        b,
        l
    ]){
        t.wrapS = t.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
        t.repeat.set(Math.max(1, cols) / 4, Math.max(1, rows) / 4);
        t.anisotropy = 4;
        t.needsUpdate = true;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: tint,
        map: b,
        roughness: 0.45,
        metalness: 0.1,
        emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffffff"),
        emissiveMap: l,
        emissiveIntensity: 0
    });
}
function facadeMaterials(w, h, d, tint) {
    const rows = Math.round(h / 0.62);
    const sideW = faceMat(tint, Math.round(w / 0.62), rows);
    const sideD = faceMat(tint, Math.round(d / 0.62), rows);
    const roof = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](tint).multiplyScalar(0.8),
        roughness: 0.8
    });
    return [
        sideD,
        sideD,
        roof,
        roof,
        sideW,
        sideW
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_0d2ccvp._.js.map