import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "위례 시민공원 — 93만㎡ 성남골프클럽을 시민의 공원으로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "48px" }}>🌳</span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#15803d",
            }}
          >
            위례 시민공원
          </span>
        </div>

        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          93만㎡, 소수의 골프장이 아닌
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#16a34a",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          12만 위례 시민의 공원으로
        </div>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "32px",
            fontSize: "20px",
            color: "#4b5563",
          }}
        >
          <span>투자금 회수 132년</span>
          <span>·</span>
          <span>83%는 골프를 안 침</span>
          <span>·</span>
          <span>선거일 6월 3일</span>
        </div>

        <div
          style={{
            marginTop: "40px",
            background: "#16a34a",
            color: "white",
            fontSize: "24px",
            fontWeight: 700,
            padding: "16px 48px",
            borderRadius: "16px",
          }}
        >
          지금 서명하기
        </div>
      </div>
    ),
    { ...size }
  );
}
