import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Joseph Barasa - Freelance React & Golang Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "linear-gradient(135deg, #1e3a8a 0%, #0f172a 50%, #1e1b4b 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 24,
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
            marginBottom: 40,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
            }}
          >
            J
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Jbarasa
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#94a3b8",
              margin: "16px 0 0 0",
              textAlign: "center",
            }}
          >
            Freelance React & Golang Developer
          </p>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["Bug Fixes", "Feature Completion", "Documentation"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "12px 24px",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                borderRadius: 12,
                color: "#60a5fa",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 40,
            color: "#64748b",
            fontSize: 18,
          }}
        >
          <span>📧 jbarasa.ke@gmail.com</span>
          <span>📱 +254745536182</span>
        </div>

        {/* Available Badge */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            borderRadius: 100,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#22c55e",
              borderRadius: "50%",
            }}
          />
          <span style={{ color: "#4ade80", fontSize: 16, fontWeight: 500 }}>
            Available Now
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
