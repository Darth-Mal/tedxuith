// lib/ticket-pdf.tsx
import fs from "fs";
import path from "path";

import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { registerFonts } from "./font";

registerFonts();

// 🔁 Helper: image → base64 (AUTO detects type)
function getImageBase64(filePath: string) {
  const image = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  const mime = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

  return `data:${mime};base64,${image.toString("base64")}`;
}

// 🔁 SAFE rotated text (no undefined transform)
function RotatedText({
  children,
  style,
  rotate,
}: {
  children: React.ReactNode;
  style?: any;
  rotate?: number;
}) {
  const safeRotate = typeof rotate === "number" ? rotate : 0;

  return (
    <Text
      style={{
        ...style,
        transform: [{ rotate: `${safeRotate}deg` }],
      }}
    >
      {children}
    </Text>
  );
}

export function TicketPDF({
  name,
  ticketSerial,
  qrCode,
  ticketType,
}: {
  name: string;
  ticketSerial: string;
  qrCode: string;
  ticketType: "REGULAR" | "VIP";
}) {
  const isVIP = ticketType === "VIP";

  // ✅ USE JPG if possible (lighter than PNG)
  const imagePath = path.join(
    process.cwd(),
    isVIP ? "public/tickets/vipticket.jpg" : "public/tickets/stdticket.jpg",
  );

  const background = getImageBase64(imagePath);

  const styles = StyleSheet.create({
    page: {
      position: "relative",
      fontFamily: "Sans",
    },

    bg: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },

    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },

    name: {
      position: "absolute",
      top: 140,
      left: 40,
      fontSize: 16,
      color: "#ffffff",
      fontFamily: "Heading",
    },

    ticketId: {
      position: "absolute",
      bottom: 40,
      left: 40,
      fontSize: 12,
      color: "#ffffff",
      letterSpacing: 2,
    },

    type: {
      position: "absolute",
      top: 70,
      right: 25,
      fontSize: 12,
      color: isVIP ? "#FFD700" : "#ffffff",
      letterSpacing: 1,
    },

    qr: {
      position: "absolute",
      bottom: 30,
      right: 40,
      width: 50, // 🔥 reduced more to save size
      height: 50,
    },
  });

  return (
    <Document>
      <Page size={{ width: 600, height: 250 }} style={styles.page}>
        {/* Background */}
        <Image src={background} style={styles.bg} />

        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Name */}
          <Text style={styles.name}>{name}</Text>

          {/* Ticket ID */}
          <Text style={styles.ticketId}>{ticketSerial}</Text>

          {/* Rotated Type */}
          <RotatedText style={styles.type} rotate={90}>
            {isVIP ? "VIP ACCESS" : "REGULAR"}
          </RotatedText>

          {/* QR */}
          <Image src={qrCode} style={styles.qr} />
        </View>
      </Page>
    </Document>
  );
}
