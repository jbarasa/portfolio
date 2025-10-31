import NavbarMenu from "@/components/ui/navbar-menu";

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "My Work", path: "/my-work" },
  { name: "Compendium", path: "/compendium" },
];

export default function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavbarMenu pages={pages} />
      <main>{children}</main>
    </>
  );
}
