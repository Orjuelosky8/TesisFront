import "./globals.css";
import Providers from "./providers";
import Navbar from "./../components/layout/Navbar";
import Shell from "./../components/layout/Shell";
import Footer from "./../components/layout/Footer";

export const metadata = {
  title: "SECOP AI — Control Inteligente",
  description: "Frontend Next + RAG",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 👇 Evita que React marque como error diferencias de atributos (ej. darkreader)
    <html lang="es" className="w-full" suppressHydrationWarning>
      {/* opcional: también en body por si alguna extensión inyecta ahí */}
      <body className="bg-gray-50 text-slate-900 w-full" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <Shell>{children}</Shell>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="es" suppressHydrationWarning>
//       <body className="bg-gray-50 text-slate-900" suppressHydrationWarning>
//         {/* ... */}
//         {children}
//       </body>
//     </html>
//   );
// }
