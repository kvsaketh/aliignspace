// Inline SVG illustrations for the 5-step ALIIGNSPACE process.
// Palette: #D46546 (terracotta), #1C1917 (dark), #F9F5ED (cream), white.

export function IllustrationMeetDesigner() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Cream background */}
      <rect width="800" height="600" fill="#F9F5ED" />
      {/* Floor */}
      <rect y="460" width="800" height="140" fill="#EAE2D8" />
      <line x1="0" y1="460" x2="800" y2="460" stroke="#D0C4B4" strokeWidth="1.5" />
      {/* Subtle floor tiles */}
      {[80,160,240,320,400,480,560,640,720].map((x, i) => (
        <line key={i} x1={x} y1="460" x2={400 + (x - 400) * 0.6} y2="600" stroke="#D0C4B4" strokeWidth="0.5" opacity="0.5" />
      ))}
      <line x1="0" y1="515" x2="800" y2="515" stroke="#D0C4B4" strokeWidth="0.5" opacity="0.5" />
      <line x1="0" y1="562" x2="800" y2="562" stroke="#D0C4B4" strokeWidth="0.5" opacity="0.4" />

      {/* Background floor plan (top-left, very subtle) */}
      <rect x="28" y="28" width="195" height="145" stroke="#BEB0A0" strokeWidth="0.8" fill="none" opacity="0.35" />
      <line x1="28" y1="88" x2="223" y2="88" stroke="#BEB0A0" strokeWidth="0.8" opacity="0.35" />
      <line x1="118" y1="28" x2="118" y2="173" stroke="#BEB0A0" strokeWidth="0.8" opacity="0.35" />
      <rect x="34" y="34" width="78" height="48" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.25" />
      <rect x="124" y="34" width="93" height="48" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.25" />
      <rect x="34" y="94" width="78" height="73" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.2" />

      {/* Window – right wall */}
      <rect x="610" y="55" width="160" height="230" stroke="#1C1917" strokeWidth="2" fill="none" />
      <line x1="690" y1="55" x2="690" y2="285" stroke="#1C1917" strokeWidth="1.5" />
      <line x1="610" y1="170" x2="770" y2="170" stroke="#1C1917" strokeWidth="1.5" />
      <rect x="612" y="57" width="77" height="112" fill="#FFF3E0" opacity="0.5" />
      <rect x="692" y="57" width="77" height="112" fill="#FFF3E0" opacity="0.4" />
      <rect x="612" y="172" width="77" height="112" fill="#FFF3E0" opacity="0.3" />
      <rect x="692" y="172" width="77" height="112" fill="#FFF3E0" opacity="0.35" />
      {/* Window frame shadow line */}
      <rect x="610" y="55" width="4" height="230" fill="#1C1917" opacity="0.08" />

      {/* Round meeting table */}
      <ellipse cx="400" cy="445" rx="145" ry="52" fill="#C8A87C" stroke="#A07840" strokeWidth="2" />
      <ellipse cx="400" cy="445" rx="135" ry="44" fill="#D4B888" opacity="0.4" />
      <rect x="388" y="448" width="24" height="72" rx="4" fill="#A07840" />
      <ellipse cx="400" cy="520" rx="38" ry="11" fill="#90683A" opacity="0.5" />

      {/* Chair 1 – left, client, dark */}
      <ellipse cx="222" cy="445" rx="70" ry="27" fill="#1C1917" />
      <path d="M155 445 L155 308 C155 286 222 280 222 280 C222 280 289 286 289 308 L289 445" fill="none" stroke="#1C1917" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="168" y1="445" x2="162" y2="492" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
      <line x1="276" y1="445" x2="282" y2="492" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
      {/* Back cushion detail */}
      <path d="M168 380 L168 340 C168 330 222 327 222 327 C222 327 276 330 276 340 L276 380" fill="#2C2520" opacity="0.5" />

      {/* Chair 2 – right, designer, terracotta */}
      <ellipse cx="578" cy="445" rx="70" ry="27" fill="#D46546" />
      <path d="M511 445 L511 308 C511 286 578 280 578 280 C578 280 645 286 645 308 L645 445" fill="none" stroke="#D46546" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="524" y1="445" x2="518" y2="492" stroke="#D46546" strokeWidth="6" strokeLinecap="round" />
      <line x1="632" y1="445" x2="638" y2="492" stroke="#D46546" strokeWidth="6" strokeLinecap="round" />
      <path d="M524 380 L524 340 C524 330 578 327 578 327 C578 327 632 330 632 340 L632 380" fill="#C04030" opacity="0.3" />

      {/* Open notebook on table */}
      <rect x="342" y="395" width="116" height="84" rx="3" fill="white" stroke="#D46546" strokeWidth="2" />
      <line x1="400" y1="397" x2="400" y2="477" stroke="#E8D8C8" strokeWidth="1.5" />
      {/* Left page lines */}
      <line x1="350" y1="410" x2="396" y2="410" stroke="#D46546" strokeWidth="1" opacity="0.4" />
      <line x1="350" y1="421" x2="396" y2="421" stroke="#D46546" strokeWidth="1" opacity="0.4" />
      <line x1="350" y1="432" x2="396" y2="432" stroke="#D46546" strokeWidth="1" opacity="0.4" />
      <line x1="350" y1="443" x2="388" y2="443" stroke="#D46546" strokeWidth="1" opacity="0.4" />
      <line x1="350" y1="454" x2="393" y2="454" stroke="#D46546" strokeWidth="1" opacity="0.4" />
      {/* Right page – tiny room sketch */}
      <rect x="407" y="404" width="45" height="35" stroke="#1C1917" strokeWidth="0.8" fill="none" opacity="0.45" />
      <rect x="411" y="408" width="14" height="12" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.55" />
      <rect x="430" y="408" width="17" height="26" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.55" />
      <line x1="407" y1="420" x2="452" y2="420" stroke="#1C1917" strokeWidth="0.5" opacity="0.35" />
      {/* Dimension tick */}
      <line x1="407" y1="444" x2="452" y2="444" stroke="#D46546" strokeWidth="0.7" opacity="0.4" />
      <line x1="407" y1="440" x2="407" y2="448" stroke="#D46546" strokeWidth="0.7" opacity="0.4" />
      <line x1="452" y1="440" x2="452" y2="448" stroke="#D46546" strokeWidth="0.7" opacity="0.4" />
      <line x1="407" y1="460" x2="440" y2="460" stroke="#D46546" strokeWidth="0.7" opacity="0.4" />

      {/* Pen on notebook */}
      <rect x="454" y="395" width="5" height="74" rx="2.5" fill="#1C1917" transform="rotate(-7 454 395)" />
      <circle cx="451" cy="466" r="3.5" fill="#D46546" />

      {/* Coffee cup left of table */}
      <path d="M310 415 L310 448 Q310 458 320 458 Q330 458 330 448 L330 415" fill="white" stroke="#1C1917" strokeWidth="1.5" />
      <ellipse cx="320" cy="415" rx="17" ry="6" fill="white" stroke="#1C1917" strokeWidth="1.5" />
      <ellipse cx="320" cy="415" rx="10" ry="3.5" fill="#C0894A" opacity="0.5" />
      <path d="M330 425 Q345 425 345 434 Q345 443 330 443" fill="none" stroke="#1C1917" strokeWidth="1.5" />
      <ellipse cx="320" cy="459" rx="23" ry="7" fill="white" stroke="#1C1917" strokeWidth="1" />
      <path d="M314 412 Q312 402 316 394" stroke="#C8BEB2" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M322 411 Q320 399 324 390" stroke="#C8BEB2" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Corner plant */}
      <rect x="42" y="370" width="22" height="45" rx="4" fill="#A07840" />
      <ellipse cx="53" cy="348" rx="36" ry="32" fill="#5A8A58" />
      <ellipse cx="53" cy="362" rx="27" ry="22" fill="#487246" />
      <circle cx="70" cy="326" r="14" fill="#487246" />
      <circle cx="36" cy="332" r="12" fill="#5A8A58" />
      {/* Pot detail */}
      <rect x="42" y="378" width="22" height="4" rx="2" fill="#8A6030" opacity="0.5" />

      {/* Left accent strip */}
      <rect x="0" y="0" width="6" height="600" fill="#D46546" opacity="0.3" />
    </svg>
  );
}

export function IllustrationVisualise() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dark background */}
      <rect width="800" height="600" fill="#1C1917" />
      {/* Subtle grid */}
      {[80,160,240,320,400,480,560,640,720].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="0" x2={x} y2="600" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.04" />
      ))}
      {[60,120,180,240,300,360,420,480,540].map((y, i) => (
        <line key={`h${i}`} x1="0" y1={y} x2="800" y2={y} stroke="#FFFFFF" strokeWidth="0.3" opacity="0.04" />
      ))}

      {/* Monitor stand */}
      <rect x="358" y="462" width="84" height="18" rx="4" fill="#2E2825" stroke="#3C3330" strokeWidth="1.5" />
      <rect x="330" y="476" width="140" height="12" rx="4" fill="#2E2825" stroke="#3C3330" strokeWidth="1.5" />

      {/* Monitor body */}
      <rect x="90" y="80" width="620" height="380" rx="10" fill="#2A2420" stroke="#3A3028" strokeWidth="2" />
      <rect x="96" y="86" width="608" height="368" rx="8" fill="#0F0D0C" />

      {/* Screen glow */}
      <rect x="98" y="88" width="604" height="364" rx="7" fill="#F9F5ED" opacity="0.92" />

      {/* === Room on screen === */}
      {/* Sky/wall background in room */}
      <rect x="98" y="88" width="604" height="200" fill="#F0E8DC" />
      <rect x="98" y="288" width="604" height="164" fill="#E8DDD0" />
      {/* Floor perspective */}
      <polygon points="98,288 702,288 702,452 98,452" fill="#DDD0BC" />
      <line x1="98" y1="288" x2="702" y2="288" stroke="#C8B89C" strokeWidth="1.5" />

      {/* Back wall – left panel */}
      <rect x="98" y="88" width="200" height="200" fill="#EDE5D8" />
      <line x1="298" y1="88" x2="298" y2="288" stroke="#C8B89C" strokeWidth="1" />

      {/* Window on back wall */}
      <rect x="320" y="100" width="160" height="160" stroke="#1C1917" strokeWidth="2" fill="#FFF8E8" opacity="0.9" />
      <line x1="400" y1="100" x2="400" y2="260" stroke="#1C1917" strokeWidth="1.5" />
      <line x1="320" y1="180" x2="480" y2="180" stroke="#1C1917" strokeWidth="1.5" />
      {/* Window light patch on floor */}
      <polygon points="320,260 480,260 520,380 280,380" fill="#F5EDD8" opacity="0.5" />

      {/* Sofa (terracotta) */}
      <rect x="150" y="300" width="280" height="100" rx="8" fill="#D46546" />
      <rect x="150" y="300" width="280" height="30" rx="8" fill="#C4503A" />
      {/* Sofa arms */}
      <rect x="140" y="300" width="25" height="85" rx="5" fill="#C4503A" />
      <rect x="415" y="300" width="25" height="85" rx="5" fill="#C4503A" />
      {/* Sofa cushions */}
      <rect x="156" y="312" width="82" height="60" rx="5" fill="#E05A48" opacity="0.7" />
      <rect x="247" y="312" width="82" height="60" rx="5" fill="#E05A48" opacity="0.7" />
      <rect x="338" y="312" width="73" height="60" rx="5" fill="#E05A48" opacity="0.7" />
      {/* Sofa legs */}
      <rect x="160" y="385" width="10" height="20" rx="3" fill="#8C6030" />
      <rect x="280" y="385" width="10" height="20" rx="3" fill="#8C6030" />
      <rect x="410" y="385" width="10" height="20" rx="3" fill="#8C6030" />

      {/* Coffee table */}
      <rect x="200" y="400" width="200" height="40" rx="4" fill="#C8A870" stroke="#A07840" strokeWidth="1.5" />
      {/* Small vase on table */}
      <rect x="285" y="388" width="16" height="18" rx="3" fill="#D46546" opacity="0.8" />
      <ellipse cx="293" cy="388" rx="10" ry="4" fill="#D46546" opacity="0.9" />

      {/* Side lamp (right) */}
      <rect x="560" y="360" width="10" height="80" fill="#8C6830" />
      <polygon points="520,280 600,280 582,360 538,360" fill="#F5EDD8" opacity="0.85" stroke="#C8A870" strokeWidth="1" />
      {/* Lamp shade seam */}
      <line x1="560" y1="280" x2="560" y2="360" stroke="#C8A870" strokeWidth="0.8" opacity="0.5" />
      {/* Lamp glow */}
      <circle cx="560" cy="300" r="40" fill="#FFF4DC" opacity="0.12" />

      {/* Plant (left corner) */}
      <rect x="110" y="380" width="18" height="38" rx="3" fill="#A07840" />
      <circle cx="119" cy="368" r="22" fill="#4A7A48" />
      <circle cx="108" cy="360" r="15" fill="#3C6838" />
      <circle cx="130" cy="362" r="14" fill="#3C6838" />

      {/* Monitor bezel shine */}
      <rect x="96" y="86" width="608" height="4" rx="2" fill="#FFFFFF" opacity="0.06" />

      {/* === Color swatches panel below screen === */}
      <rect x="90" y="464" width="620" height="14" rx="3" fill="#2A2420" />
      <text x="400" y="474" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#888" letterSpacing="2">MATERIAL PALETTE</text>

      {/* Swatches row */}
      {[
        { x: 108, color: "#D46546" },
        { x: 174, color: "#C4503A" },
        { x: 240, color: "#E8D5BE" },
        { x: 306, color: "#F9F5ED" },
        { x: 372, color: "#1C1917" },
        { x: 438, color: "#A07840" },
        { x: 504, color: "#8C6E56" },
        { x: 570, color: "#C8B89C" },
        { x: 636, color: "#5A8A58" },
      ].map((s, i) => (
        <rect key={i} x={s.x} y="484" width="52" height="44" rx="4" fill={s.color} />
      ))}
      {/* Selected swatch indicator */}
      <rect x="106" y="482" width="56" height="48" rx="5" fill="none" stroke="#D46546" strokeWidth="2.5" />
      <circle cx="134" cy="542" r="4" fill="#D46546" />

      {/* 3D grid lines on screen (perspective suggestion) */}
      <line x1="400" y1="452" x2="150" y2="288" stroke="#1C1917" strokeWidth="0.5" opacity="0.2" />
      <line x1="400" y1="452" x2="650" y2="288" stroke="#1C1917" strokeWidth="0.5" opacity="0.2" />

      {/* Top accent strip */}
      <rect x="0" y="0" width="800" height="6" fill="#D46546" opacity="0.3" />
    </svg>
  );
}

export function IllustrationFreezeDesign() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Cream background */}
      <rect width="800" height="600" fill="#F9F5ED" />

      {/* Architectural drawing underneath – floor plan */}
      <rect x="40" y="50" width="340" height="260" stroke="#C8BEB0" strokeWidth="0.8" fill="none" opacity="0.3" />
      <line x1="40" y1="160" x2="380" y2="160" stroke="#C8BEB0" strokeWidth="0.8" opacity="0.3" />
      <line x1="210" y1="50" x2="210" y2="310" stroke="#C8BEB0" strokeWidth="0.8" opacity="0.3" />
      <rect x="50" y="60" width="150" height="90" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.2" />
      <rect x="220" y="60" width="150" height="90" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.2" />
      <rect x="50" y="170" width="320" height="130" stroke="#D46546" strokeWidth="0.7" fill="none" opacity="0.2" />
      {/* Dimension lines */}
      <line x1="40" y1="330" x2="380" y2="330" stroke="#C8BEB0" strokeWidth="0.7" opacity="0.3" />
      <line x1="40" y1="326" x2="40" y2="334" stroke="#C8BEB0" strokeWidth="0.7" opacity="0.3" />
      <line x1="380" y1="326" x2="380" y2="334" stroke="#C8BEB0" strokeWidth="0.7" opacity="0.3" />
      <line x1="410" y1="50" x2="410" y2="310" stroke="#C8BEB0" strokeWidth="0.7" opacity="0.3" />
      <line x1="406" y1="50" x2="414" y2="50" stroke="#C8BEB0" strokeWidth="0.7" opacity="0.3" />
      <line x1="406" y1="310" x2="414" y2="310" stroke="#C8BEB0" strokeWidth="0.7" opacity="0.3" />

      {/* Main BOQ document – shadow */}
      <rect x="272" y="72" width="440" height="490" rx="5" fill="#1C1917" opacity="0.08" />
      {/* Document body */}
      <rect x="264" y="64" width="440" height="490" rx="5" fill="white" stroke="#E0D8CC" strokeWidth="1.5" />
      {/* Document header – terracotta band */}
      <rect x="264" y="64" width="440" height="52" rx="5" fill="#D46546" />
      <rect x="264" y="96" width="440" height="20" fill="#D46546" />
      <text x="290" y="95" fontFamily="serif" fontSize="16" fill="white" letterSpacing="1">BILL OF QUANTITIES</text>
      <text x="290" y="112" fontFamily="sans-serif" fontSize="9" fill="white" opacity="0.75" letterSpacing="2">ALIIGNSPACE · PROJECT APPROVAL</text>

      {/* Document content rows */}
      {[
        { y: 136, label: "Initial consultation & site measurement", checked: true },
        { y: 172, label: "3D renders — all rooms", checked: true },
        { y: 208, label: "Material & finish specifications", checked: true },
        { y: 244, label: "Electrical & lighting plan", checked: true },
        { y: 280, label: "Carpentry & modular items BOQ", checked: true },
        { y: 316, label: "Civil work & flooring estimate", checked: true },
        { y: 352, label: "Project timeline & milestones", checked: true },
      ].map((row, i) => (
        <g key={i}>
          <line x1="282" y1={row.y + 22} x2="692" y2={row.y + 22} stroke="#F0E8E0" strokeWidth="1" />
          {/* Line item text */}
          <rect x="282" y={row.y + 4} width="350" height="12" rx="3" fill="#EDE5DC" />
          {row.checked && (
            <>
              {/* Check circle */}
              <circle cx="668" cy={row.y + 10} r="10" fill="#D46546" opacity="0.15" />
              <circle cx="668" cy={row.y + 10} r="10" stroke="#D46546" strokeWidth="1.5" fill="none" />
              {/* Checkmark */}
              <path d={`M661 ${row.y + 10} L666 ${row.y + 15} L676 ${row.y + 5}`} stroke="#D46546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
          {/* Row number */}
          <text x="282" y={row.y + 2} fontFamily="sans-serif" fontSize="8" fill="#C8BEB0">{String(i + 1).padStart(2, "0")}</text>
        </g>
      ))}

      {/* Total row */}
      <rect x="264" y="386" width="440" height="1.5" fill="#D46546" opacity="0.4" />
      <rect x="510" y="392" width="180" height="36" rx="3" fill="#D46546" opacity="0.1" />
      <rect x="512" y="394" width="176" height="32" rx="2" fill="none" stroke="#D46546" strokeWidth="1" />
      <text x="540" y="415" fontFamily="sans-serif" fontSize="10" fill="#1C1917">APPROVED TOTAL</text>

      {/* Signature area */}
      <line x1="282" y1="460" x2="500" y2="460" stroke="#C8BEB0" strokeWidth="1" />
      <text x="282" y="475" fontFamily="sans-serif" fontSize="9" fill="#C8BEB0" letterSpacing="1">CLIENT SIGNATURE</text>
      {/* Signature SVG path (decorative cursive stroke) */}
      <path d="M290 455 Q310 438 330 445 Q355 454 360 440 Q368 425 375 438 Q382 452 395 445 Q405 438 410 448" stroke="#1C1917" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Date */}
      <line x1="530" y1="460" x2="690" y2="460" stroke="#C8BEB0" strokeWidth="1" />
      <text x="530" y="475" fontFamily="sans-serif" fontSize="9" fill="#C8BEB0" letterSpacing="1">DATE</text>

      {/* Official seal */}
      <circle cx="656" cy="488" r="34" stroke="#D46546" strokeWidth="1.5" fill="none" opacity="0.35" />
      <circle cx="656" cy="488" r="28" stroke="#D46546" strokeWidth="1" fill="none" opacity="0.25" />
      <text x="656" y="483" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#D46546" opacity="0.55" letterSpacing="1">ALIIGN</text>
      <text x="656" y="495" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#D46546" opacity="0.55" letterSpacing="1">SPACE</text>
      {/* Seal star decoration */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return <line key={i} x1={656 + Math.cos(rad) * 22} y1={488 + Math.sin(rad) * 22} x2={656 + Math.cos(rad) * 29} y2={488 + Math.sin(rad) * 29} stroke="#D46546" strokeWidth="1" opacity="0.3" />;
      })}

      {/* Pen resting over document */}
      <rect x="690" y="130" width="8" height="220" rx="4" fill="#1C1917" transform="rotate(15 690 130)" />
      <rect x="700" y="128" width="8" height="14" rx="2" fill="#D46546" transform="rotate(15 700 128)" />
      <circle cx="725" cy="342" r="5" fill="#D46546" />

      {/* Top accent strip */}
      <rect x="0" y="0" width="800" height="6" fill="#D46546" opacity="0.3" />
    </svg>
  );
}

export function IllustrationExecution() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Warm white background */}
      <rect width="800" height="600" fill="#F5EFE8" />

      {/* Floor */}
      <rect y="480" width="800" height="120" fill="#EAE2D6" />
      <line x1="0" y1="480" x2="800" y2="480" stroke="#D0C8B8" strokeWidth="1.5" />

      {/* Room framing – vertical studs */}
      {[120, 240, 360, 480, 600, 680].map((x, i) => (
        <rect key={i} x={x - 6} y="80" width="12" height="400" rx="4" fill="#B8987A" stroke="#A07848" strokeWidth="1" />
      ))}
      {/* Top horizontal beam */}
      <rect x="110" y="72" width="582" height="20" rx="4" fill="#A07848" stroke="#8C6030" strokeWidth="1.5" />
      {/* Bottom horizontal beam */}
      <rect x="110" y="468" width="582" height="18" rx="4" fill="#A07848" stroke="#8C6030" strokeWidth="1.5" />
      {/* Mid horizontal nogging */}
      <rect x="110" y="278" width="582" height="12" rx="3" fill="#B8987A" stroke="#A07848" strokeWidth="1" opacity="0.8" />

      {/* Diagonal cross-brace */}
      <line x1="120" y1="80" x2="360" y2="480" stroke="#C8A870" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
      <line x1="480" y1="80" x2="240" y2="480" stroke="#C8A870" strokeWidth="6" strokeLinecap="round" opacity="0.4" />

      {/* Rear wall panels being attached */}
      <rect x="126" y="92" width="108" height="180" rx="2" fill="#EDE5D8" stroke="#C8B8A0" strokeWidth="1.5" opacity="0.6" />
      <rect x="246" y="92" width="108" height="180" rx="2" fill="#EDE5D8" stroke="#C8B8A0" strokeWidth="1.5" opacity="0.7" />
      <rect x="366" y="92" width="108" height="180" rx="2" fill="#F5EFE8" stroke="#C8B8A0" strokeWidth="1.5" opacity="0.9" />
      {/* Last panel half-fitted */}
      <rect x="486" y="92" width="108" height="100" rx="2" fill="#F5EFE8" stroke="#D46546" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.7" />

      {/* Measuring tape – stretched horizontally */}
      <rect x="80" y="370" width="640" height="22" rx="4" fill="#F0C840" stroke="#C8A020" strokeWidth="1.5" />
      {/* Tape markings */}
      {Array.from({ length: 32 }, (_, i) => (
        <g key={i}>
          <line x1={80 + i * 20} y1="370" x2={80 + i * 20} y2={i % 2 === 0 ? 382 : 378} stroke="#8C6010" strokeWidth="1" />
        </g>
      ))}
      {/* Tape case (left end) */}
      <rect x="52" y="362" width="36" height="38" rx="6" fill="#C8A020" stroke="#A07810" strokeWidth="2" />
      <circle cx="70" cy="381" r="8" fill="#A07810" />
      <circle cx="70" cy="381" r="4" fill="#C8A020" />

      {/* Spirit level */}
      <rect x="120" y="418" width="400" height="28" rx="6" fill="#1C1917" stroke="#3C3028" strokeWidth="2" />
      {/* Level bubble tube */}
      <rect x="260" y="424" width="120" height="16" rx="8" fill="#2C2420" stroke="#C8A870" strokeWidth="1" />
      {/* Bubble */}
      <circle cx="318" cy="432" r="7" fill="#5ABCD0" opacity="0.85" stroke="#4090A0" strokeWidth="1" />
      {/* Centre mark */}
      <line x1="320" y1="424" x2="320" y2="440" stroke="#C8A870" strokeWidth="1" opacity="0.6" />
      {/* Level markings (left) */}
      <line x1="160" y1="426" x2="160" y2="440" stroke="#C8A870" strokeWidth="1" opacity="0.4" />
      <line x1="200" y1="428" x2="200" y2="438" stroke="#C8A870" strokeWidth="1" opacity="0.3" />
      {/* Level markings (right) */}
      <line x1="480" y1="426" x2="480" y2="440" stroke="#C8A870" strokeWidth="1" opacity="0.4" />
      <line x1="440" y1="428" x2="440" y2="438" stroke="#C8A870" strokeWidth="1" opacity="0.3" />
      {/* End caps */}
      <rect x="118" y="420" width="10" height="24" rx="4" fill="#D46546" />
      <rect x="512" y="420" width="10" height="24" rx="4" fill="#D46546" />

      {/* Carpenter's square (bottom right) */}
      <g transform="translate(600, 430) rotate(-10)">
        <rect x="0" y="0" width="12" height="120" rx="3" fill="#C8A870" stroke="#A07840" strokeWidth="1.5" />
        <rect x="0" y="0" width="90" height="12" rx="3" fill="#C8A870" stroke="#A07840" strokeWidth="1.5" />
        {[20,40,60].map((y, i) => <line key={i} x1="0" y1={y} x2="8" y2={y} stroke="#A07840" strokeWidth="1" />)}
        {[20,40,60,80].map((x, i) => <line key={i} x1={x} y1="0" x2={x} y2="8" stroke="#A07840" strokeWidth="1" />)}
      </g>

      {/* Hammer (top right area) */}
      <g transform="translate(630, 100) rotate(35)">
        {/* Handle */}
        <rect x="-5" y="0" width="10" height="120" rx="4" fill="#8C6030" stroke="#6A4A20" strokeWidth="1.5" />
        {/* Head */}
        <rect x="-22" y="-18" width="44" height="32" rx="4" fill="#1C1917" stroke="#3C3028" strokeWidth="2" />
        {/* Head face */}
        <rect x="-20" y="-16" width="16" height="28" rx="2" fill="#2C2420" />
        {/* Striking face */}
        <rect x="4" y="-14" width="18" height="24" rx="2" fill="#3C3028" />
      </g>

      {/* Pencil mark on wall panel */}
      <line x1="366" y1="92" x2="474" y2="272" stroke="#1C1917" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
      {/* Measurement annotation */}
      <line x1="366" y1="182" x2="474" y2="182" stroke="#D46546" strokeWidth="1" opacity="0.5" />
      <line x1="366" y1="178" x2="366" y2="186" stroke="#D46546" strokeWidth="1" opacity="0.5" />
      <line x1="474" y1="178" x2="474" y2="186" stroke="#D46546" strokeWidth="1" opacity="0.5" />
      <rect x="390" y="170" width="60" height="16" rx="3" fill="#D46546" opacity="0.12" />
      <text x="420" y="181" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#D46546" opacity="0.7">1080 mm</text>

      {/* Worker silhouette (far left) */}
      <circle cx="90" cy="330" r="20" fill="#1C1917" opacity="0.6" />
      <path d="M65 390 Q65 358 90 358 Q115 358 115 390" fill="#1C1917" opacity="0.6" />
      <rect x="80" y="388" width="8" height="50" rx="3" fill="#1C1917" opacity="0.5" />
      <rect x="92" y="388" width="8" height="50" rx="3" fill="#1C1917" opacity="0.5" />
      {/* Hard hat */}
      <path d="M70 328 Q70 308 90 305 Q110 308 110 328" fill="#D46546" opacity="0.7" />

      {/* Left accent strip */}
      <rect x="0" y="0" width="6" height="600" fill="#D46546" opacity="0.3" />
    </svg>
  );
}

export function IllustrationHandover() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dark background */}
      <rect width="800" height="600" fill="#1C1917" />

      {/* Radial glow behind key */}
      <radialGradient id="glow" cx="50%" cy="48%" r="42%">
        <stop offset="0%" stopColor="#D46546" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#D46546" stopOpacity="0" />
      </radialGradient>
      <rect width="800" height="600" fill="url(#glow)" />

      {/* House outline (large, centered, subtle) */}
      <path d="M250 440 L250 250 L400 130 L550 250 L550 440 Z" stroke="#D46546" strokeWidth="1.5" fill="none" opacity="0.18" />
      {/* House door */}
      <rect x="365" y="360" width="70" height="80" rx="3" stroke="#D46546" strokeWidth="1" fill="none" opacity="0.18" />
      {/* House window left */}
      <rect x="272" y="290" width="55" height="55" rx="3" stroke="#D46546" strokeWidth="1" fill="none" opacity="0.18" />
      <line x1="299" y1="290" x2="299" y2="345" stroke="#D46546" strokeWidth="0.8" opacity="0.18" />
      <line x1="272" y1="318" x2="327" y2="318" stroke="#D46546" strokeWidth="0.8" opacity="0.18" />
      {/* House window right */}
      <rect x="474" y="290" width="55" height="55" rx="3" stroke="#D46546" strokeWidth="1" fill="none" opacity="0.18" />
      <line x1="501" y1="290" x2="501" y2="345" stroke="#D46546" strokeWidth="0.8" opacity="0.18" />
      <line x1="474" y1="318" x2="529" y2="318" stroke="#D46546" strokeWidth="0.8" opacity="0.18" />

      {/* Main key – bow (round head) */}
      <circle cx="400" cy="210" r="95" stroke="#D46546" strokeWidth="6" fill="none" />
      <circle cx="400" cy="210" r="65" stroke="#D46546" strokeWidth="3" fill="none" opacity="0.4" />
      {/* Key hole */}
      <circle cx="400" cy="210" r="28" fill="#1C1917" stroke="#D46546" strokeWidth="3" />
      <rect x="393" y="222" width="14" height="28" rx="3" fill="#1C1917" stroke="#D46546" strokeWidth="2" />

      {/* Key shaft */}
      <rect x="392" y="300" width="16" height="230" rx="4" fill="#D46546" />
      {/* Key teeth */}
      <rect x="408" y="340" width="28" height="14" rx="3" fill="#D46546" />
      <rect x="408" y="376" width="20" height="14" rx="3" fill="#D46546" />
      <rect x="408" y="412" width="28" height="14" rx="3" fill="#D46546" />
      <rect x="408" y="448" width="16" height="14" rx="3" fill="#D46546" />
      {/* Key shaft detail line */}
      <line x1="396" y1="305" x2="396" y2="525" stroke="#C4503A" strokeWidth="2" opacity="0.4" />

      {/* Top of bow – decorative flourish */}
      <path d="M344 168 Q360 128 400 115 Q440 128 456 168" stroke="#D46546" strokeWidth="2" fill="none" opacity="0.4" />
      <circle cx="400" cy="112" r="6" fill="#D46546" opacity="0.5" />

      {/* Sparkle elements */}
      {[
        { cx: 200, cy: 140, r: 3, opacity: 0.7 },
        { cx: 590, cy: 160, r: 4, opacity: 0.6 },
        { cx: 160, cy: 300, r: 2.5, opacity: 0.5 },
        { cx: 640, cy: 280, r: 3.5, opacity: 0.65 },
        { cx: 220, cy: 430, r: 2, opacity: 0.4 },
        { cx: 580, cy: 420, r: 3, opacity: 0.5 },
        { cx: 120, cy: 200, r: 2, opacity: 0.35 },
        { cx: 670, cy: 370, r: 2.5, opacity: 0.45 },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill="#D46546" opacity={s.opacity} />
          <line x1={s.cx - s.r * 2.5} y1={s.cy} x2={s.cx + s.r * 2.5} y2={s.cy} stroke="#D46546" strokeWidth="1" opacity={s.opacity * 0.6} />
          <line x1={s.cx} y1={s.cy - s.r * 2.5} x2={s.cx} y2={s.cy + s.r * 2.5} stroke="#D46546" strokeWidth="1" opacity={s.opacity * 0.6} />
        </g>
      ))}

      {/* Star shapes (larger) */}
      {[{ cx: 168, cy: 180 }, { cx: 620, cy: 142 }, { cx: 640, cy: 460 }].map((s, i) => (
        <g key={i}>
          {[0, 45, 90, 135].map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            const len = 12;
            return <line key={j} x1={s.cx - Math.cos(rad) * len} y1={s.cy - Math.sin(rad) * len} x2={s.cx + Math.cos(rad) * len} y2={s.cy + Math.sin(rad) * len} stroke="#D46546" strokeWidth="1.5" opacity="0.45" />;
          })}
        </g>
      ))}

      {/* Confetti dots */}
      {[
        [140, 380, "#D46546"], [680, 320, "#D46546"], [100, 460, "#F9F5ED"],
        [700, 180, "#F9F5ED"], [180, 500, "#D46546"], [620, 500, "#F9F5ED"],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={x as number} cy={y as number} r="4" fill={c as string} opacity="0.3" />
      ))}

      {/* "COMPLETE" text at bottom */}
      <text x="400" y="572" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#D46546" opacity="0.45" letterSpacing="6">HAPPY HANDOVER</text>
      <line x1="240" y1="578" x2="360" y2="578" stroke="#D46546" strokeWidth="0.8" opacity="0.3" />
      <line x1="440" y1="578" x2="560" y2="578" stroke="#D46546" strokeWidth="0.8" opacity="0.3" />

      {/* Subtle horizontal lines (ambient) */}
      {[80, 140, 500, 545].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="800" y2={y} stroke="#D46546" strokeWidth="0.4" opacity="0.06" />
      ))}

      {/* Bottom accent strip */}
      <rect x="0" y="594" width="800" height="6" fill="#D46546" opacity="0.3" />
    </svg>
  );
}
